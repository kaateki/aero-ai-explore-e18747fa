import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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

const sensorChartConfig: ChartConfig = {
  s3: { label: "Sensor 3 (HPC outlet temp)", color: "hsl(var(--primary))" },
  s4: { label: "Sensor 4 (LPT outlet temp)", color: "hsl(var(--accent))" },
};

const modelChartConfig: ChartConfig = {
  score: { label: "Accuracy %", color: "hsl(var(--primary))" },
};

const techStack = ["Python", "Scikit-learn", "XGBoost", "Keras", "Pandas", "Django", "Angular"];

const ProjectSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="project" className="py-24">
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

        <div className={`flex flex-wrap justify-center gap-2 mb-12 scroll-animate scroll-animate-delay-1 ${isVisible ? "visible" : ""}`}>
          {techStack.map((t) => (
            <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
          ))}
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
            </CardHeader>
            <CardContent>
              <ChartContainer config={sensorChartConfig} className="h-[280px] w-full">
                <LineChart data={sensorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="cycle" fontSize={12} />
                  <YAxis fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="s3" stroke="var(--color-s3)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="s4" stroke="var(--color-s4)" strokeWidth={2} dot={false} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Model Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={modelChartConfig} className="h-[280px] w-full">
                <BarChart data={modelPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="model" fontSize={12} />
                  <YAxis fontSize={12} domain={[0, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="score" fill="var(--color-score)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
