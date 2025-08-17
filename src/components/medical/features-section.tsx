import { Upload, Brain, FileText, Shield, Clock, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Upload,
    title: "Easy Upload",
    description: "Simply upload X-ray images in JPG or PNG format. Our system supports images up to 5MB.",
    color: "text-primary"
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Advanced CNN deep learning model trained on thousands of X-ray images for accurate fracture detection.",
    color: "text-accent"
  },
  {
    icon: FileText,
    title: "Detailed Reports",
    description: "Get comprehensive PDF reports with confidence scores and visual annotations for clinical documentation.",
    color: "text-medical-success"
  },
  {
    icon: Clock,
    title: "Instant Results",
    description: "Receive diagnosis results in under 30 seconds, enabling faster patient care and treatment decisions.",
    color: "text-primary"
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Fully compliant with healthcare privacy regulations. Your patient data is secure and encrypted.",
    color: "text-destructive"
  },
  {
    icon: Users,
    title: "Multi-User Support",
    description: "Role-based access for doctors, radiologists, and patients with secure authentication and data management.",
    color: "text-accent"
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose FractureAI?
          </h2>
          <p className="text-lg text-muted-foreground">
            Our advanced AI technology provides healthcare professionals with the tools they need 
            for accurate, fast, and reliable bone fracture detection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card 
                key={index} 
                className="medical-card hover:shadow-medical transition-all duration-300 group cursor-pointer"
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto p-4 rounded-full bg-card mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}