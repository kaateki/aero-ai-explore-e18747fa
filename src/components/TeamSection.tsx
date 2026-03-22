import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, User } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const team = [
  { name: "Adesh Gautam", role: "ML Engineer & Lead Developer" },
  { name: "Kunal Sharma", role: "Backend Developer" },
  { name: "Shreya Gupta", role: "Frontend Developer" },
];

const TeamSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4" ref={ref}>
        <div className={`text-center mb-12 scroll-animate ${isVisible ? "visible" : ""}`}>
          <p className="text-primary font-medium text-sm mb-2 tracking-wide uppercase">Team</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Team & Credits
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            AirML was developed as an academic project exploring machine learning applications in aerospace predictive maintenance.
          </p>
        </div>

        <div className={`grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12 scroll-animate scroll-animate-delay-1 ${isVisible ? "visible" : ""}`}>
          {team.map((member) => (
            <Card key={member.name} className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <User className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className={`text-center space-y-4 scroll-animate scroll-animate-delay-2 ${isVisible ? "visible" : ""}`}>
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com/adesgautam/AirML" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              View on GitHub
            </a>
          </Button>
          <p className="text-xs text-muted-foreground">
            Dataset: NASA C-MAPSS Turbofan Engine Degradation Simulation
          </p>
        </div>

        <div className="mt-20 pt-8 border-t text-center text-xs text-muted-foreground">
          <p>AirML — AI-Powered Aircraft Predictive Maintenance · Academic Portfolio Project</p>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
