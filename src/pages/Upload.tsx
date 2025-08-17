import { useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { Upload, X, FileImage, AlertCircle, CheckCircle, Brain } from "lucide-react"
import { MedicalHeader } from "@/components/medical/header"
import { MedicalButton } from "@/components/ui/medical-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

// Mock user data
const mockUser = {
  name: "Dr. Sarah Johnson",
  email: "sarah.johnson@hospital.com",
  role: "Radiologist"
}

export default function UploadPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [user] = useState(mockUser)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)

  const handleLogout = () => {
    navigate("/")
  }

  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith('image/')) {
      return "Please upload an image file (JPG, PNG)"
    }
    if (file.size > 5 * 1024 * 1024) {
      return "File size must be less than 5MB"
    }
    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
      return "Only JPG and PNG files are supported"
    }
    return null
  }

  const handleFileSelect = (file: File) => {
    const error = validateFile(file)
    if (error) {
      toast({
        title: "Invalid File",
        description: error,
        variant: "destructive",
      })
      return
    }

    setUploadedFile(file)
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0])
    }
  }

  const removeFile = () => {
    setUploadedFile(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setPreviewUrl(null)
  }

  const processImage = async () => {
    if (!uploadedFile) return

    setIsProcessing(true)
    setProgress(0)

    // Simulate AI processing with progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval)
          return 95
        }
        return prev + Math.random() * 15
      })
    }, 200)

    // Mock processing time
    setTimeout(() => {
      clearInterval(interval)
      setProgress(100)
      
      // Mock result - replace with actual AI inference
      const mockResult = {
        prediction: Math.random() > 0.5 ? "Fractured" : "Normal",
        confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
        processingTime: Math.floor(Math.random() * 15) + 15, // 15-30 seconds
        imageData: previewUrl
      }

      setTimeout(() => {
        navigate("/results", { state: { result: mockResult, filename: uploadedFile.name } })
      }, 500)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-bg">
      <MedicalHeader user={user} onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              X-ray Analysis
            </h1>
            <p className="text-muted-foreground">
              Upload an X-ray image for AI-powered bone fracture detection
            </p>
          </div>

          {!isProcessing ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upload Area */}
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-primary" />
                    Upload X-ray Image
                  </CardTitle>
                  <CardDescription>
                    Drag and drop your X-ray image or click to browse
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!uploadedFile ? (
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer ${
                        dragActive 
                          ? 'border-primary bg-primary/5 scale-105' 
                          : 'border-border hover:border-primary hover:bg-primary/5'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => document.getElementById('file-input')?.click()}
                    >
                      <FileImage className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <div className="space-y-2">
                        <p className="text-foreground font-medium">
                          Drop your X-ray image here
                        </p>
                        <p className="text-sm text-muted-foreground">
                          or click to browse files
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Supports JPG, PNG up to 5MB
                        </p>
                      </div>
                      <input
                        id="file-input"
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handleFileInput}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* File Preview */}
                      <div className="relative border border-border rounded-lg overflow-hidden">
                        {previewUrl && (
                          <img
                            src={previewUrl}
                            alt="X-ray preview"
                            className="w-full h-64 object-contain bg-muted"
                          />
                        )}
                        <button
                          onClick={removeFile}
                          className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      {/* File Info */}
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileImage className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {uploadedFile.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <CheckCircle className="h-5 w-5 text-medical-success" />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Analysis Panel */}
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-accent" />
                    AI Analysis
                  </CardTitle>
                  <CardDescription>
                    Advanced deep learning model for fracture detection
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert className="border-primary/20 bg-primary/5">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Our AI model has been trained on thousands of X-ray images and 
                      achieves 99.2% accuracy in detecting bone fractures.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Model Version</span>
                      <span className="text-sm font-medium">CNN-v2.1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Expected Time</span>
                      <span className="text-sm font-medium">15-30 seconds</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Confidence Range</span>
                      <span className="text-sm font-medium">85-99%</span>
                    </div>
                  </div>

                  <MedicalButton
                    onClick={processImage}
                    disabled={!uploadedFile}
                    className="w-full"
                    size="lg"
                  >
                    <Brain className="h-5 w-5 mr-2" />
                    Start Analysis
                  </MedicalButton>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* Processing State */
            <Card className="medical-card max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Analyzing X-ray Image</CardTitle>
                <CardDescription>
                  Our AI is processing your image for fracture detection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 border-4 border-primary/20 rounded-full animate-pulse-medical" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Brain className="h-16 w-16 text-primary animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Processing Progress</span>
                    <span className="font-medium">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {progress < 30 && "Preprocessing image data..."}
                    {progress >= 30 && progress < 60 && "Running neural network inference..."}
                    {progress >= 60 && progress < 90 && "Analyzing bone structure..."}
                    {progress >= 90 && "Finalizing results..."}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}