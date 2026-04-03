import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Database, BrainCircuit, Server, Monitor, Gauge } from "lucide-react";

const techItems = [
  { icon: Database, label: "NASA C-MAPSS Data", color: "text-primary" },
  { icon: BrainCircuit, label: "ML Models (Python)", color: "text-aero-purple" },
  { icon: Server, label: "Django Backend", color: "text-secondary" },
  { icon: Monitor, label: "Frontend Dashboard", color: "text-aero-blue" },
  { icon: Gauge, label: "RUL Predictions", color: "text-aero-pink" },
];

const TechStackSection = () => (
  <section id="tech-stack" className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gradient">
          Tech Stack & Architecture
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          The complete data pipeline from raw sensor data to actionable predictions.
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-3 max-w-5xl mx-auto mb-16 flex-wrap">
        {techItems.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="flex items-center gap-3"
          >
            <Card className="bg-gradient-card border-border hover:border-primary/40 transition-all hover:scale-105">
              <CardContent className="flex items-center gap-3 p-4">
                <item.icon className={`h-6 w-6 ${item.color}`} />
                <span className="font-display text-sm font-semibold whitespace-nowrap">{item.label}</span>
              </CardContent>
            </Card>
            {i < techItems.length - 1 && (
              <ArrowRight className="h-5 w-5 text-muted-foreground hidden md:block" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {[
          { title: "Machine Learning", desc: "Random Forest, XGBoost, and Neural Networks trained on 21 sensor features to predict Remaining Useful Life.", color: "border-primary" },
          { title: "Backend API", desc: "Django REST framework serving model predictions via API endpoints, handling data preprocessing and model inference.", color: "border-secondary" },
          { title: "Frontend Dashboard", desc: "Interactive dashboard visualizing sensor data, model predictions, and engine health status in real-time.", color: "border-aero-purple" },
        ].map((tech, i) => (
          <motion.div
            key={tech.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className={`bg-gradient-card border-2 ${tech.color} h-full hover:scale-105 transition-transform`}>
              <CardContent className="pt-6">
                <h4 className="font-display text-lg font-semibold mb-2">{tech.title}</h4>
                <p className="text-sm text-muted-foreground">{tech.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TechStackSection;
