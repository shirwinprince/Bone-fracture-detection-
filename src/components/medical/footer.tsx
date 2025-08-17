import { Activity, Heart } from "lucide-react"

export function MedicalFooter() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-8 w-8 text-sidebar-primary" />
              <span className="font-bold text-xl">FractureAI</span>
            </div>
            <p className="text-sidebar-foreground/80 mb-4 max-w-md">
              Revolutionizing bone fracture detection with advanced AI technology. 
              Empowering healthcare professionals with instant, accurate diagnoses.
            </p>
            <div className="flex items-center gap-2 text-sm text-sidebar-foreground/60">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>for healthcare professionals</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sidebar-primary-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-sidebar-foreground/80">
              <li><a href="#" className="hover:text-sidebar-primary transition-colors">Dashboard</a></li>
              <li><a href="#" className="hover:text-sidebar-primary transition-colors">Upload X-ray</a></li>
              <li><a href="#" className="hover:text-sidebar-primary transition-colors">Results History</a></li>
              <li><a href="#" className="hover:text-sidebar-primary transition-colors">Settings</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-sidebar-primary-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-sidebar-foreground/80">
              <li><a href="#" className="hover:text-sidebar-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-sidebar-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-sidebar-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-sidebar-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sidebar-border mt-8 pt-8 text-center text-sm text-sidebar-foreground/60">
          <p>&copy; 2024 FractureAI. All rights reserved. | Designed for healthcare excellence.</p>
        </div>
      </div>
    </footer>
  )
}