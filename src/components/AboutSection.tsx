import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, BarChart3, AlertTriangle, Database } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const useCases = [
  {
    icon: Wrench,
    title: "Predictive Maintenance",
    description: "ML models analyze sensor data to predict equipment failures before they occur, reducing unplanned downtime and maintenance costs.",
  },
  {
    icon: BarChart3,
    title: "Engine Health Monitoring",
    description: "Real-time monitoring of turbofan engine parameters detects degradation patterns and estimates remaining useful life.",
  },
  {
    icon: AlertTriangle,
    title: "Flight Safety Enhancement",
    description: "AI-driven diagnostics provide early warnings for component wear, enabling proactive maintenance scheduling.",
  },
  {
    icon: Database,
    title: "NASA C-MAPSS Dataset",
    description: "The Commercial Modular Aero-Propulsion System Simulation dataset provides run-to-failure engine degradation trajectories.",
  },
];

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4" ref={ref}>
        <div className={`text-center mb-16 scroll-animate ${isVisible ? "visible" : ""}`}>
          <p className="text-primary font-medium text-sm mb-2 tracking-wide uppercase">About</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            AI in Aerospace Engineering
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Artificial intelligence and machine learning are transforming aerospace engineering — from
            predicting engine failures to optimizing flight operations and improving safety across the industry.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {useCases.map((uc, i) => (
            <Card key={uc.title} className={`border bg-card hover:shadow-lg transition-all scroll-animate scroll-animate-delay-${Math.min(i, 3)} ${isVisible ? "visible" : ""}`}>
              <CardHeader className="flex flex-row items-start gap-4 pb-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <uc.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{uc.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{uc.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
