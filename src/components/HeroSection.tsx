import { ArrowDown, Activity, Shield, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const HeroSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.05);

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="container mx-auto px-4 text-center relative z-10" ref={ref}>
        <div className={`scroll-animate ${isVisible ? "visible" : ""}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Activity className="h-4 w-4" />
            Machine Learning for Aviation Safety
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 max-w-4xl mx-auto">
            AI-Powered Aircraft
            <span className="text-primary block mt-1">Predictive Maintenance</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Predicting aircraft engine Remaining Useful Life (RUL) using machine learning
            on NASA's C-MAPSS turbofan engine degradation dataset.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="lg" asChild>
              <a href="#demo">Try Simulated Demo</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#about">Learn More</a>
            </Button>
          </div>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto scroll-animate scroll-animate-delay-2 ${isVisible ? "visible" : ""}`}>
          {[
            { icon: Cpu, label: "3 ML Models", desc: "RF, XGBoost, Neural Net" },
            { icon: Activity, label: "21 Sensors", desc: "Engine telemetry data" },
            { icon: Shield, label: "RUL Prediction", desc: "Remaining useful life" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 p-4 rounded-lg bg-card border">
              <stat.icon className="h-8 w-8 text-primary shrink-0" />
              <div className="text-left">
                <div className="font-semibold text-foreground text-sm">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <a href="#about" className="inline-block mt-12 animate-bounce">
          <ArrowDown className="h-5 w-5 text-muted-foreground" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
