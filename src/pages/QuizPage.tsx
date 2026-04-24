import Navbar from "@/components/Navbar";
import SurveySection from "@/components/SurveySection";
import FooterSection from "@/components/FooterSection";

const QuizPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-16">
      <SurveySection />
    </main>
    <FooterSection />
  </div>
);

export default QuizPage;
