import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Rocket } from "lucide-react";

const FloatingParticle = ({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-primary/20"
    style={{ left: x, top: y, width: size, height: size }}
    animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
    transition={{ duration: 4 + delay, repeat: Infinity, delay }}
  />
);

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      <FloatingParticle delay={0} x="10%" y="20%" size={8} />
      <FloatingParticle delay={1} x="80%" y="30%" size={12} />
      <FloatingParticle delay={2} x="60%" y="70%" size={6} />
      <FloatingParticle delay={0.5} x="30%" y="80%" size={10} />
      <FloatingParticle delay={1.5} x="90%" y="60%" size={14} />
      <FloatingParticle delay={3} x="20%" y="50%" size={8} />
      <FloatingParticle delay={2.5} x="70%" y="15%" size={10} />

      <div className="absolute w-[600px] h-[600px] border border-primary/10 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" />
      <div className="absolute w-[400px] h-[400px] border border-secondary/10 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Rocket className="h-8 w-8 text-primary animate-float" />
            <span className="text-sm font-medium text-primary tracking-widest uppercase">By Aditya & Divyanshu</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="text-gradient">AI Meets</span>
            <br />
            <span className="text-foreground">Aerospace Engineering</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Exploring how machine learning predicts aircraft engine life — a deep dive into the future of aerospace maintenance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => scrollTo("#project")}
              className="text-base px-8 py-6 glow-orange hover:scale-105 transition-transform"
            >
              Explore the Project
              <Rocket className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="text-base px-8 py-6 border-primary/30 hover:bg-primary/10 hover:scale-105 transition-transform"
            >
              <a href="/aerospace">About Aerospace Engineering</a>
            </Button>
          </div>
        </motion.div>

        <motion.button
          onClick={() => scrollTo("#aerospace")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-8 w-8 text-muted-foreground" />
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
