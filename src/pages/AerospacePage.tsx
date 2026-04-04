import Navbar from "@/components/Navbar";
import AerospaceSection from "@/components/AerospaceSection";
import FooterSection from "@/components/FooterSection";

const AerospacePage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-16">
      <AerospaceSection />
    </main>
    <FooterSection />
  </div>
);

export default AerospacePage;
