import { ArrowRight, Shield, Zap, Brain } from "lucide-react"
import { MedicalButton } from "@/components/ui/medical-button"
import { Card, CardContent } from "@/components/ui/card"
import medicalHero from "@/assets/medical-hero.jpg"

interface HeroSectionProps {
  onGetStarted?: () => void
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${medicalHero})` }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              AI-Powered
              <span className="block bg-gradient-medical bg-clip-text text-transparent">
                Bone Fracture
              </span>
              Detection
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Revolutionary deep learning technology for instant, accurate diagnosis of bone fractures 
              from X-ray images. Trusted by healthcare professionals worldwide.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MedicalButton 
              variant="medical" 
              size="xl" 
              onClick={onGetStarted}
              className="min-w-48"
            >
              Start Diagnosis
              <ArrowRight className="h-5 w-5" />
            </MedicalButton>
            <MedicalButton variant="outline" size="xl" className="min-w-48">
              Learn More
            </MedicalButton>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <Card className="medical-card bg-card/50 backdrop-blur-sm border-primary/20">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="p-3 rounded-full bg-primary/10 mb-3">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">99.2%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </CardContent>
            </Card>

            <Card className="medical-card bg-card/50 backdrop-blur-sm border-accent/20">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="p-3 rounded-full bg-accent/10 mb-3">
                  <Zap className="h-8 w-8 text-accent" />
                </div>
                <div className="text-2xl font-bold text-foreground">&lt;30s</div>
                <div className="text-sm text-muted-foreground">Analysis Time</div>
              </CardContent>
            </Card>

            <Card className="medical-card bg-card/50 backdrop-blur-sm border-medical-success/20">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="p-3 rounded-full bg-medical-success/10 mb-3">
                  <Shield className="h-8 w-8 text-medical-success" />
                </div>
                <div className="text-2xl font-bold text-foreground">HIPAA</div>
                <div className="text-sm text-muted-foreground">Compliant</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-medical" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-medical" style={{ animationDelay: '1s' }} />
      </div>
    </section>
  )
}