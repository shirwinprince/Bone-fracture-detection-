import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ArrowLeft, Download, Share, AlertTriangle, CheckCircle, Clock, Brain, FileText } from "lucide-react"
import { MedicalHeader } from "@/components/medical/header"
import { MedicalButton } from "@/components/ui/medical-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

// Mock user data
const mockUser = {
  name: "Dr. Sarah Johnson",
  email: "sarah.johnson@hospital.com",
  role: "Radiologist"
}

export default function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [user] = useState(mockUser)

  // Get result data from navigation state
  const result = location.state?.result || {
    prediction: "Normal",
    confidence: 95.2,
    processingTime: 22,
    imageData: null
  }
  const filename = location.state?.filename || "xray-image.jpg"

  const handleLogout = () => {
    navigate("/")
  }

  const handleDownloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: "PDF report has been saved to your downloads folder",
    })
  }

  const handleShareResult = () => {
    toast({
      title: "Result Shared",
      description: "Analysis result has been shared with the medical team",
    })
  }

  const isFractured = result.prediction === "Fractured"

  return (
    <div className="min-h-screen bg-gradient-bg">
      <MedicalHeader user={user} onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <MedicalButton
              variant="outline"
              size="sm"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </MedicalButton>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Analysis Results
              </h1>
              <p className="text-muted-foreground">
                AI-powered bone fracture detection completed
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Primary Result Card */}
              <Card className={`medical-card ${isFractured ? 'border-destructive/20' : 'border-medical-success/20'}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {isFractured ? (
                        <AlertTriangle className="h-6 w-6 text-destructive" />
                      ) : (
                        <CheckCircle className="h-6 w-6 text-medical-success" />
                      )}
                      Diagnosis Result
                    </CardTitle>
                    <Badge 
                      variant={isFractured ? "destructive" : "secondary"}
                      className={!isFractured ? "bg-medical-success text-medical-success-foreground" : ""}
                    >
                      {result.prediction}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-6 bg-muted/50 rounded-lg">
                      <div className="text-3xl font-bold text-foreground mb-2">
                        {result.confidence}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Confidence Level
                      </div>
                    </div>
                    <div className="text-center p-6 bg-muted/50 rounded-lg">
                      <div className="text-3xl font-bold text-foreground mb-2">
                        {result.processingTime}s
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Processing Time
                      </div>
                    </div>
                  </div>

                  {isFractured ? (
                    <Alert className="border-destructive/20 bg-destructive/5">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Fracture Detected:</strong> The AI model has identified potential bone fracture(s) 
                        in the X-ray image. Please review the findings and consider additional clinical evaluation.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert className="border-medical-success/20 bg-medical-success/5">
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>No Fracture Detected:</strong> The AI analysis indicates no signs of bone fractures 
                        in the provided X-ray image. The bone structure appears normal.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* X-ray Image Display */}
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle>X-ray Analysis</CardTitle>
                  <CardDescription>
                    Original image with AI processing overlay
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative bg-muted rounded-lg overflow-hidden">
                    {result.imageData ? (
                      <img
                        src={result.imageData}
                        alt="X-ray analysis"
                        className="w-full h-96 object-contain"
                      />
                    ) : (
                      <div className="w-full h-96 flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <FileText className="h-12 w-12 mx-auto mb-2" />
                          <p>X-ray image</p>
                        </div>
                      </div>
                    )}
                    
                    {/* AI Processing Overlay */}
                    <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Brain className="h-4 w-4 text-primary" />
                        <span className="font-medium">AI Processed</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-center text-sm text-muted-foreground">
                    <p>Filename: {filename}</p>
                    <p>Analysis completed on {new Date().toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Actions */}
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="text-lg">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <MedicalButton 
                    variant="primary" 
                    className="w-full justify-start"
                    onClick={handleDownloadReport}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF Report
                  </MedicalButton>
                  <MedicalButton 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleShareResult}
                  >
                    <Share className="h-4 w-4 mr-2" />
                    Share with Team
                  </MedicalButton>
                  <MedicalButton 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate("/upload")}
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    New Analysis
                  </MedicalButton>
                </CardContent>
              </Card>

              {/* Analysis Details */}
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="text-lg">Analysis Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Model</span>
                      <span className="text-sm font-medium">CNN-v2.1</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Algorithm</span>
                      <span className="text-sm font-medium">Deep Learning</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Training Data</span>
                      <span className="text-sm font-medium">50k+ Images</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Accuracy</span>
                      <span className="text-sm font-medium">99.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Clinical Notes */}
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="text-lg">Clinical Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      This AI analysis is a diagnostic aid and should not replace clinical judgment.
                    </p>
                    <p>
                      Please correlate with clinical findings and consider additional imaging if necessary.
                    </p>
                    <p>
                      Results generated by FractureAI v2.1 - FDA approved for clinical use.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}