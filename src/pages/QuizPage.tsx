import Navbar from "@/components/Navbar";
import QuizSection from "@/components/QuizSection";
import FooterSection from "@/components/FooterSection";

const QuizPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-16">
      <QuizSection />
    </main>
    <FooterSection />
  </div>
);

export default QuizPage;
