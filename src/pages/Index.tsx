import { useState, useEffect } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
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
      <main className="pt-16">
        <HeroSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default Index;
