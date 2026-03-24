import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Github } from "lucide-react";

const sensorData = [
  { cycle: 1, s2: 642.15, s3: 1589.70, s4: 1400.60, s7: 554.36 },
  { cycle: 25, s2: 642.03, s3: 1587.20, s4: 1398.21, s7: 553.89 },
  { cycle: 50, s2: 641.82, s3: 1582.85, s4: 1394.50, s7: 552.15 },
  { cycle: 75, s2: 641.55, s3: 1577.04, s4: 1389.73, s7: 550.42 },
  { cycle: 100, s2: 641.12, s3: 1569.45, s4: 1383.20, s7: 548.08 },
  { cycle: 125, s2: 640.50, s3: 1559.87, s4: 1375.10, s7: 545.30 },
  { cycle: 150, s2: 639.70, s3: 1548.32, s4: 1365.45, s7: 541.90 },
  { cycle: 175, s2: 638.65, s3: 1534.80, s4: 1353.60, s7: 537.85 },
  { cycle: 192, s2: 637.30, s3: 1518.90, s4: 1339.20, s7: 533.10 },
];

const modelPerformance = [
  { model: "Random Forest", rmse: 31.5, score: 78 },
  { model: "XGBoost", rmse: 26.8, score: 84 },
  { model: "Neural Network", rmse: 23.2, score: 89 },
];

type SensorKey = "s2" | "s3" | "s4" | "s7";

const allSensors: { key: SensorKey; label: string; color: string }[] = [
  { key: "s2", label: "Sensor 2 (Fan inlet temp)", color: "hsl(var(--primary))" },
  { key: "s3", label: "Sensor 3 (HPC outlet temp)", color: "hsl(142 71% 45%)" },
  { key: "s4", label: "Sensor 4 (LPT outlet temp)", color: "hsl(var(--accent))" },
  { key: "s7", label: "Sensor 7 (Total P at HPC)", color: "hsl(38 92% 50%)" },
];

const techStack = ["Python", "Scikit-learn", "XGBoost", "Keras", "Pandas", "Django", "Angular"];

const ProjectSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [activeSensors, setActiveSensors] = useState<Set<SensorKey>>(new Set(["s3", "s4"]));
  const [activeModel, setActiveModel] = useState<string | null>(null);

  const toggleSensor = (key: SensorKey) => {
    setActiveSensors((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        if (next.size > 1) next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const sensorChartConfig: ChartConfig = Object.fromEntries(
    allSensors.filter((s) => activeSensors.has(s.key)).map((s) => [s.key, { label: s.label, color: s.color }])
  );

  const modelChartConfig: ChartConfig = {
    score: { label: "Accuracy %", color: "hsl(var(--primary))" },
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-4" ref={ref}>
        <div className={`text-center mb-16 scroll-animate ${isVisible ? "visible" : ""}`}>
          <p className="text-primary font-medium text-sm mb-2 tracking-wide uppercase">Project</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            The AirML Project
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            AirML predicts the Remaining Useful Life of turbofan engines using the NASA C-MAPSS dataset,
            comparing Random Forest, XGBoost, and Neural Network approaches.
          </p>
        </div>

        <div className={`flex flex-wrap justify-center gap-2 mb-8 scroll-animate scroll-animate-delay-1 ${isVisible ? "visible" : ""}`}>
          {techStack.map((t) => (
            <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
          ))}
        </div>

        <div className={`flex justify-center mb-12 scroll-animate scroll-animate-delay-1 ${isVisible ? "visible" : ""}`}>
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com/adesgautam/AirML" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              View on GitHub
            </a>
          </Button>
        </div>

        <div className={`grid sm:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto scroll-animate scroll-animate-delay-2 ${isVisible ? "visible" : ""}`}>
          {["Data Cleaning", "Feature Engineering", "Model Training", "RUL Prediction"].map((step, i) => (
            <div key={step} className="text-center">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                {i + 1}
              </div>
              <p className="text-sm font-medium text-foreground">{step}</p>
            </div>
          ))}
        </div>

        <div className={`grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto scroll-animate scroll-animate-delay-3 ${isVisible ? "visible" : ""}`}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sensor Degradation Over Cycles</CardTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                {allSensors.map((s) => (
                  <Badge
                    key={s.key}
                    variant={activeSensors.has(s.key) ? "default" : "outline"}
                    className="cursor-pointer text-xs select-none"
                    onClick={() => toggleSensor(s.key)}
                  >
                    {s.key.toUpperCase()}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={sensorChartConfig} className="h-[280px] w-full">
                <LineChart data={sensorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="cycle" fontSize={12} />
                  <YAxis fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  {allSensors.filter((s) => activeSensors.has(s.key)).map((s) => (
                    <Line key={s.key} type="monotone" dataKey={s.key} stroke={s.color} strokeWidth={2} dot={false} />
                  ))}
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Model Performance Comparison</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">Click a bar to highlight a model</p>
            </CardHeader>
            <CardContent>
              <ChartContainer config={modelChartConfig} className="h-[280px] w-full">
                <BarChart
                  data={modelPerformance}
                  onClick={(data) => {
                    if (data?.activeLabel) {
                      setActiveModel((prev) => (prev === data.activeLabel ? null : (data.activeLabel as string)));
                    }
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="model" fontSize={12} />
                  <YAxis fontSize={12} domain={[0, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="score"
                    radius={[4, 4, 0, 0]}
                    cursor="pointer"
                    fill="hsl(var(--primary))"
                    shape={(props: any) => {
                      const isActive = !activeModel || props.model === activeModel;
                      return (
                        <rect
                          x={props.x}
                          y={props.y}
                          width={props.width}
                          height={props.height}
                          rx={4}
                          ry={4}
                          fill="hsl(var(--primary))"
                          opacity={isActive ? 1 : 0.25}
                          className="transition-opacity"
                        />
                      );
                    }}
                  />
                </BarChart>
              </ChartContainer>
              {activeModel && (
                <div className="mt-3 p-3 rounded-md bg-secondary text-sm">
                  <p className="font-semibold text-foreground">{activeModel}</p>
                  <p className="text-muted-foreground">
                    RMSE: {modelPerformance.find((m) => m.model === activeModel)?.rmse} · Accuracy: {modelPerformance.find((m) => m.model === activeModel)?.score}%
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
