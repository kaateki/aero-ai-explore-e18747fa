import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, BrainCircuit, BarChart3, ArrowRight, Activity } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, Legend,
} from "recharts";

const sensorData = Array.from({ length: 30 }, (_, i) => ({
  cycle: i * 10 + 1,
  sensor2: 642 - i * 0.5 + Math.random() * 3,
  sensor3: 1590 + i * 0.3 + Math.random() * 5,
  sensor4: 1400 - i * 2 + Math.random() * 10,
}));

const modelComparison = [
  { model: "Random Forest", rmse: 28.4, r2: 0.82, color: "hsl(24, 95%, 55%)" },
  { model: "XGBoost", rmse: 22.1, r2: 0.88, color: "hsl(180, 65%, 45%)" },
  { model: "Neural Network", rmse: 18.7, r2: 0.92, color: "hsl(260, 70%, 60%)" },
];

const rulPredictions = Array.from({ length: 20 }, (_, i) => ({
  engine: `E${i + 1}`,
  actual: Math.floor(Math.random() * 150 + 50),
  predicted: 0,
})).map((d) => ({ ...d, predicted: d.actual + Math.floor(Math.random() * 30 - 15) }));

const ProjectSection = () => {
  const [activeModel, setActiveModel] = useState(2);

  return (
    <section id="project" className="py-24 bg-gradient-section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gradient">
            The Project — Engine Life Prediction
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Using machine learning to predict the Remaining Useful Life (RUL) of aircraft turbofan engines.
          </p>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="font-display text-2xl font-semibold text-center mb-8">How It Works</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            {[
              { icon: Database, label: "Data Collection", desc: "NASA C-MAPSS Dataset", color: "border-primary" },
              { icon: BrainCircuit, label: "ML Training", desc: "RF, XGBoost, NN", color: "border-secondary" },
              { icon: BarChart3, label: "Predictions", desc: "RUL Estimation", color: "border-aero-purple" },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center">
                <Card className={`bg-gradient-card border-2 ${step.color} w-56 text-center hover:scale-105 transition-transform`}>
                  <CardContent className="pt-6">
                    <step.icon className="h-10 w-10 mx-auto mb-3 text-primary" />
                    <h4 className="font-display text-sm font-semibold">{step.label}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{step.desc}</p>
                  </CardContent>
                </Card>
                {i < 2 && <ArrowRight className="h-6 w-6 text-muted-foreground mx-2 hidden md:block" />}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dataset info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="bg-gradient-card border-border max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                NASA Turbofan Engine Degradation Dataset
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { value: "249", label: "Engines" },
                  { value: "21", label: "Sensors" },
                  { value: "3", label: "Operational Settings" },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 bg-muted rounded-lg">
                    <div className="font-display text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                The C-MAPSS dataset simulates turbofan engine degradation from healthy to failure, providing run-to-failure sensor readings used to train predictive models.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* ML Models Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="font-display text-2xl font-semibold text-center mb-8">ML Model Comparison</h3>
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
            {modelComparison.map((m, i) => (
              <Card
                key={m.model}
                onClick={() => setActiveModel(i)}
                className={`bg-gradient-card cursor-pointer transition-all hover:scale-105 ${
                  activeModel === i ? "border-primary glow-orange" : "border-border"
                }`}
              >
                <CardContent className="pt-6 text-center">
                  <h4 className="font-display text-sm font-semibold mb-2">{m.model}</h4>
                  <div className="text-2xl font-bold text-primary">{m.r2}</div>
                  <div className="text-xs text-muted-foreground">R² Score</div>
                  <div className="text-lg font-semibold text-secondary mt-1">{m.rmse}</div>
                  <div className="text-xs text-muted-foreground">RMSE</div>
                  {activeModel === i && (
                    <div className="mt-2 text-xs text-primary font-medium">▲ Selected</div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Tabs defaultValue="sensor" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-muted">
              <TabsTrigger value="sensor">Sensor Trends</TabsTrigger>
              <TabsTrigger value="accuracy">Model Accuracy</TabsTrigger>
              <TabsTrigger value="rul">RUL Predictions</TabsTrigger>
            </TabsList>

            <TabsContent value="sensor">
              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle className="font-display text-lg flex items-center gap-2">
                    <Activity className="h-5 w-5 text-secondary" /> Sensor Data Over Engine Cycles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={sensorData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
                      <XAxis dataKey="cycle" stroke="hsl(215, 20%, 60%)" fontSize={12} />
                      <YAxis stroke="hsl(215, 20%, 60%)" fontSize={12} />
                      <Tooltip contentStyle={{ background: "hsl(220, 20%, 10%)", border: "1px solid hsl(220, 15%, 18%)", borderRadius: 8 }} />
                      <Legend />
                      <Line type="monotone" dataKey="sensor2" stroke="hsl(24, 95%, 55%)" strokeWidth={2} dot={false} name="Sensor 2" />
                      <Line type="monotone" dataKey="sensor4" stroke="hsl(180, 65%, 45%)" strokeWidth={2} dot={false} name="Sensor 4" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="accuracy">
              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle className="font-display text-lg">Model R² Score Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={modelComparison}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
                      <XAxis dataKey="model" stroke="hsl(215, 20%, 60%)" fontSize={12} />
                      <YAxis stroke="hsl(215, 20%, 60%)" fontSize={12} domain={[0, 1]} />
                      <Tooltip contentStyle={{ background: "hsl(220, 20%, 10%)", border: "1px solid hsl(220, 15%, 18%)", borderRadius: 8 }} />
                      <Bar dataKey="r2" name="R² Score" radius={[6, 6, 0, 0]} fill="hsl(24, 95%, 55%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rul">
              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle className="font-display text-lg">Actual vs Predicted RUL</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={rulPredictions}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
                      <XAxis dataKey="engine" stroke="hsl(215, 20%, 60%)" fontSize={12} />
                      <YAxis stroke="hsl(215, 20%, 60%)" fontSize={12} />
                      <Tooltip contentStyle={{ background: "hsl(220, 20%, 10%)", border: "1px solid hsl(220, 15%, 18%)", borderRadius: 8 }} />
                      <Legend />
                      <Area type="monotone" dataKey="actual" stroke="hsl(24, 95%, 55%)" fill="hsl(24, 95%, 55%)" fillOpacity={0.2} name="Actual RUL" />
                      <Area type="monotone" dataKey="predicted" stroke="hsl(180, 65%, 45%)" fill="hsl(180, 65%, 45%)" fillOpacity={0.2} name="Predicted RUL" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectSection;
