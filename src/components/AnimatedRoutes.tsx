import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./PageTransition";
import Index from "@/pages/Index";
import AerospacePage from "@/pages/AerospacePage";
import AIImpactPage from "@/pages/AIImpactPage";
import ProjectPage from "@/pages/ProjectPage";
import QuizPage from "@/pages/QuizPage";
import TeamPage from "@/pages/TeamPage";
import TechStackPage from "@/pages/TechStackPage";
import ContactPage from "@/pages/ContactPage";
import DemoPage from "@/pages/DemoPage";
import NotFound from "@/pages/NotFound";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/aerospace" element={<PageTransition><AerospacePage /></PageTransition>} />
        <Route path="/ai-impact" element={<PageTransition><AIImpactPage /></PageTransition>} />
        <Route path="/project" element={<PageTransition><ProjectPage /></PageTransition>} />
        <Route path="/demo" element={<PageTransition><DemoPage /></PageTransition>} />
        <Route path="/quiz" element={<PageTransition><QuizPage /></PageTransition>} />
        <Route path="/tech-stack" element={<PageTransition><TechStackPage /></PageTransition>} />
        <Route path="/team" element={<PageTransition><TeamPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
