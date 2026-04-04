import Navbar from "@/components/Navbar";
import ProjectSection from "@/components/ProjectSection";
import FooterSection from "@/components/FooterSection";

const ProjectPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-16">
      <ProjectSection />
    </main>
    <FooterSection />
  </div>
);

export default ProjectPage;
