import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectSection from "@/components/ProjectSection";
import DemoSection from "@/components/DemoSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import TeamSection from "@/components/TeamSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectSection />
      <DemoSection />
      <ArchitectureSection />
      <TeamSection />
    </div>
  );
};

export default Index;
