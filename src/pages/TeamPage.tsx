import Navbar from "@/components/Navbar";
import TeamSection from "@/components/TeamSection";
import FooterSection from "@/components/FooterSection";

const TeamPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-16">
      <TeamSection />
    </main>
    <FooterSection />
  </div>
);

export default TeamPage;
