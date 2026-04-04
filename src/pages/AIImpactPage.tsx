import Navbar from "@/components/Navbar";
import AIInAerospace from "@/components/AIInAerospace";
import FooterSection from "@/components/FooterSection";

const AIImpactPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-16">
      <AIInAerospace />
    </main>
    <FooterSection />
  </div>
);

export default AIImpactPage;
