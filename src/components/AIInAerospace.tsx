import { motion } from "framer-motion";
import { Brain, PlaneTakeoff, Cog, FlaskConical } from "lucide-react";

const useCases = [
  {
    icon: Cog,
    title: "Predictive Maintenance",
    description: "AI analyzes sensor data from engines in real-time to predict failures before they happen, reducing downtime by up to 30% and saving airlines billions annually.",
    color: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: PlaneTakeoff,
    title: "Flight Optimization",
    description: "Machine learning algorithms optimize flight routes, fuel consumption, and scheduling. AI can reduce fuel usage by 5-10% per flight through smart route planning.",
    color: "from-secondary/20 to-secondary/5",
    iconColor: "text-secondary",
  },
  {
    icon: Brain,
    title: "Autonomous Systems",
    description: "From autopilot enhancements to fully autonomous drones, AI is enabling aircraft to make decisions independently, improving safety and opening new possibilities.",
    color: "from-aero-purple/20 to-aero-purple/5",
    iconColor: "text-aero-purple",
  },
  {
    icon: FlaskConical,
    title: "Materials Analysis",
    description: "AI accelerates the discovery of new materials for aircraft — lighter, stronger composites that improve fuel efficiency and structural integrity.",
    color: "from-aero-pink/20 to-aero-pink/5",
    iconColor: "text-aero-pink",
  },
];

const AIInAerospace = () => {
  return (
    <section id="ai-impact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gradient">
            AI in Aerospace — Why It Matters
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Artificial intelligence is revolutionizing every aspect of aerospace engineering, from design to operations.
          </p>
        </motion.div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`flex flex-col md:flex-row items-start gap-6 p-6 rounded-xl bg-gradient-to-r ${uc.color} border border-border hover:border-primary/30 transition-all group`}
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-muted flex items-center justify-center group-hover:scale-110 transition-transform">
                <uc.icon className={`h-7 w-7 ${uc.iconColor}`} />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold mb-2">{uc.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{uc.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIInAerospace;
