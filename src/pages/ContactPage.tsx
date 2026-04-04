import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const ContactPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-16">
      <ContactSection />
    </main>
    <FooterSection />
  </div>
);

export default ContactPage;
