import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Code, BrainCircuit } from "lucide-react";

const team = [
  {
    name: "Divyanshu",
    role: "ML Engineer & Backend Developer",
    contributions: [
      "Designed and trained ML models (RF, XGBoost, Neural Network)",
      "Built data preprocessing pipelines",
      "Developed the Django REST API backend",
      "Performed model evaluation and optimization",
    ],
    icon: BrainCircuit,
    gradient: "from-primary/30 to-aero-purple/30",
  },
  {
    name: "Aditya",
    role: "Frontend Developer & Data Analyst",
    contributions: [
      "Built the interactive frontend dashboard",
      "Created data visualizations and charts",
      "Performed exploratory data analysis",
      "Designed the user experience flow",
    ],
    icon: Code,
    gradient: "from-secondary/30 to-aero-blue/30",
  },
];

const TeamSection = () => (
  <section id="team" className="py-24 bg-gradient-section">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gradient">Meet the Team</h2>
        <p className="text-muted-foreground text-lg">The minds behind this project</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
          >
            <Card className="bg-gradient-card border-border hover:border-primary/40 transition-all group hover:scale-[1.03] hover:glow-orange">
              <CardContent className="pt-8">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <member.icon className="h-10 w-10 text-foreground" />
                </div>
                <h3 className="font-display text-2xl font-bold text-center mb-1">{member.name}</h3>
                <p className="text-primary text-sm text-center mb-4">{member.role}</p>
                <ul className="space-y-2">
                  {member.contributions.map((c) => (
                    <li key={c} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">▸</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TeamSection;
