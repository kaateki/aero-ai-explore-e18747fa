import { useState, useEffect } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AerospaceSection from "@/components/AerospaceSection";
import AIInAerospace from "@/components/AIInAerospace";
import ProjectSection from "@/components/ProjectSection";
import QuizSection from "@/components/QuizSection";
import TeamSection from "@/components/TeamSection";
import TechStackSection from "@/components/TechStackSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Preloader isLoading={loading} />
      <Navbar />
      <HeroSection />
      <AerospaceSection />
      <AIInAerospace />
      <ProjectSection />
      <QuizSection />
      <TeamSection />
      <TechStackSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default Index;
