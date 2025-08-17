import { useState } from "react"
import { Upload, FileText, Clock, TrendingUp, Users, Activity } from "lucide-react"
import { MedicalHeader } from "@/components/medical/header"
import { MedicalButton } from "@/components/ui/medical-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"

// Mock user data
const mockUser = {
  name: "Dr. Sarah Johnson",
  email: "sarah.johnson@hospital.com",
  role: "Radiologist"
}

// Mock recent analyses
const recentAnalyses = [
  {
    id: "1",
    patientId: "P-2024-001",
    timestamp: "2024-01-20 14:30",
    result: "Fractured",
    confidence: 94.2,
    bodyPart: "Wrist"
  },
  {
    id: "2",
    patientId: "P-2024-002",
    timestamp: "2024-01-20 13:15",
    result: "Normal",
    confidence: 98.7,
    bodyPart: "Ankle"
  },
  {
    id: "3",
    patientId: "P-2024-003",
    timestamp: "2024-01-20 11:45",
    result: "Fractured",
    confidence: 91.8,
    bodyPart: "Radius"
  },
  {
    id: "4",
    patientId: "P-2024-004",
    timestamp: "2024-01-20 10:20",
    result: "Normal",
    confidence: 96.3,
    bodyPart: "Femur"
  }
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [user] = useState(mockUser)

  const handleLogout = () => {
    navigate("/")
  }

  const handleNewAnalysis = () => {
    navigate("/upload")
  }

  return (
    <div className="min-h-screen bg-gradient-bg">
      <MedicalHeader user={user} onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user.name.split(' ')[1]}!
          </h1>
          <p className="text-muted-foreground">
            Ready to analyze X-ray images with AI-powered fracture detection
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="medical-card">
            <CardContent className="flex items-center p-6">
              <div className="p-3 rounded-full bg-primary/10 mr-4">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">127</div>
                <div className="text-sm text-muted-foreground">Total Scans</div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="flex items-center p-6">
              <div className="p-3 rounded-full bg-accent/10 mr-4">
                <Activity className="h-6 w-6 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">23</div>
                <div className="text-sm text-muted-foreground">This Week</div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="flex items-center p-6">
              <div className="p-3 rounded-full bg-medical-success/10 mr-4">
                <TrendingUp className="h-6 w-6 text-medical-success" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">96.8%</div>
                <div className="text-sm text-muted-foreground">Avg Confidence</div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="flex items-center p-6">
              <div className="p-3 rounded-full bg-destructive/10 mr-4">
                <Clock className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">18s</div>
                <div className="text-sm text-muted-foreground">Avg Time</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Action */}
          <div className="lg:col-span-2">
            <Card className="medical-card bg-gradient-medical text-primary-foreground mb-6">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Start New Analysis</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Upload an X-ray image to get instant AI-powered fracture detection results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MedicalButton 
                  variant="secondary" 
                  size="lg" 
                  onClick={handleNewAnalysis}
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Upload X-ray Image
                </MedicalButton>
              </CardContent>
            </Card>

            {/* Recent Analyses */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Recent Analyses
                </CardTitle>
                <CardDescription>
                  Your latest X-ray fracture detection results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAnalyses.map((analysis) => (
                    <div
                      key={analysis.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Activity className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">
                            {analysis.patientId} - {analysis.bodyPart}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {analysis.timestamp}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <Badge 
                            variant={analysis.result === "Fractured" ? "destructive" : "secondary"}
                            className="mb-1"
                          >
                            {analysis.result}
                          </Badge>
                          <div className="text-xs text-muted-foreground">
                            {analysis.confidence}% confidence
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <MedicalButton variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  View All Results
                </MedicalButton>
                <MedicalButton variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Patient Records
                </MedicalButton>
                <MedicalButton variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analytics
                </MedicalButton>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-lg">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">AI Model</span>
                  <Badge variant="secondary" className="bg-medical-success text-medical-success-foreground">
                    Online
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Processing</span>
                  <Badge variant="secondary" className="bg-medical-success text-medical-success-foreground">
                    Fast
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Queue</span>
                  <Badge variant="secondary">
                    0 pending
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}