import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AerospacePage from "./pages/AerospacePage";
import AIImpactPage from "./pages/AIImpactPage";
import ProjectPage from "./pages/ProjectPage";
import QuizPage from "./pages/QuizPage";
import TeamPage from "./pages/TeamPage";
import TechStackPage from "./pages/TechStackPage";
import ContactPage from "./pages/ContactPage";
import DemoPage from "./pages/DemoPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/aerospace" element={<AerospacePage />} />
          <Route path="/ai-impact" element={<AIImpactPage />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/tech-stack" element={<TechStackPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
