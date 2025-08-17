import { useNavigate } from "react-router-dom"
import { MedicalHeader } from "@/components/medical/header"
import { HeroSection } from "@/components/medical/hero-section"
import { FeaturesSection } from "@/components/medical/features-section"
import { MedicalFooter } from "@/components/medical/footer"

const Index = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-bg">
      <MedicalHeader />
      <HeroSection onGetStarted={handleGetStarted} />
      <FeaturesSection />
      <MedicalFooter />
    </div>
  );
};

export default Index;
