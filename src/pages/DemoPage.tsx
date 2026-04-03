import Navbar from "@/components/Navbar";
import DemoSection from "@/components/DemoSection";
import FooterSection from "@/components/FooterSection";

const DemoPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-16">
      <DemoSection />
    </main>
    <FooterSection />
  </div>
);

export default DemoPage;
