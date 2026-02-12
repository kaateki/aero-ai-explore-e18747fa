import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const pipelineSteps = [
  { title: "Raw Sensor Data", desc: "NASA C-MAPSS dataset with 21 sensor readings across engine run-to-failure trajectories" },
  { title: "Data Cleaning", desc: "Remove constant/near-constant sensors, handle NaN values, normalize features" },
  { title: "Feature Engineering", desc: "Rolling averages, trend extraction, RUL label generation with piecewise linear degradation" },
  { title: "Model Training", desc: "Train Random Forest, XGBoost, and Neural Network models with cross-validation" },
  { title: "RUL Prediction", desc: "Ensemble predictions with confidence scoring and engine health classification" },
];

const technologies = [
  { category: "ML / Data", items: ["Python", "Scikit-learn", "XGBoost", "Keras/TensorFlow", "Pandas", "NumPy"] },
  { category: "Backend", items: ["Django", "Django REST Framework", "SQLite"] },
  { category: "Frontend", items: ["Angular 4", "TypeScript", "Bootstrap"] },
  { category: "Dataset", items: ["NASA C-MAPSS", "FD001 subset", "Run-to-failure data"] },
];

const ArchitectureSection = () => {
  return (
    <section id="architecture" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-medium text-sm mb-2 tracking-wide uppercase">Architecture</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The AirML pipeline transforms raw engine telemetry into actionable remaining useful life predictions.
          </p>
        </div>

        {/* Pipeline */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="space-y-4">
            {pipelineSteps.map((step, i) => (
              <div key={step.title} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  {i < pipelineSteps.length - 1 && (
                    <div className="w-px h-8 bg-border mt-1" />
                  )}
                </div>
                <div className="pb-2">
                  <h3 className="font-semibold text-foreground text-sm">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {technologies.map((tech) => (
            <Card key={tech.category}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-primary">{tech.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {tech.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
