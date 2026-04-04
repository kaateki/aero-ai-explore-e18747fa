import Navbar from "@/components/Navbar";
import TechStackSection from "@/components/TechStackSection";
import FooterSection from "@/components/FooterSection";

const TechStackPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-16">
      <TechStackSection />
    </main>
    <FooterSection />
  </div>
);

export default TechStackPage;
