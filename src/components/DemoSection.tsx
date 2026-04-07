import { useState, useEffect, useMemo, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Activity, AlertTriangle, CheckCircle, Gauge, RotateCcw } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const healthySensors: Record<string, number> = {
  "Operational Setting 1": 0.0023,
  "Operational Setting 2": 0.0003,
  "Operational Setting 3": 100.0,
  "Sensor 1 (Fan inlet temp)": 518.67,
  "Sensor 2 (LPC outlet temp)": 642.15,
  "Sensor 3 (HPC outlet temp)": 1589.70,
  "Sensor 4 (LPT outlet temp)": 1400.60,
  "Sensor 7 (Total HPC outlet)": 554.36,
  "Sensor 8 (Physical fan speed)": 2388.06,
  "Sensor 9 (Physical core speed)": 9046.19,
  "Sensor 11 (Static HPC outlet)": 47.47,
  "Sensor 12 (Fuel flow ratio)": 521.66,
  "Sensor 13 (Corrected fan speed)": 2388.02,
  "Sensor 14 (Corrected core speed)": 8138.62,
  "Sensor 15 (Bypass ratio)": 8.4195,
  "Sensor 17 (Bleed enthalpy)": 392.0,
  "Sensor 20 (HPT coolant bleed)": 38.86,
  "Sensor 21 (LPT coolant bleed)": 23.42,
};

const criticalOffsets: Record<string, number> = {
  "Operational Setting 1": 0.012,
  "Operational Setting 2": 0.005,
  "Operational Setting 3": -15.0,
  "Sensor 1 (Fan inlet temp)": -6.5,
  "Sensor 2 (LPC outlet temp)": 18.0,
  "Sensor 3 (HPC outlet temp)": 85.0,
  "Sensor 4 (LPT outlet temp)": 65.0,
  "Sensor 7 (Total HPC outlet)": -12.0,
  "Sensor 8 (Physical fan speed)": -45.0,
  "Sensor 9 (Physical core speed)": -120.0,
  "Sensor 11 (Static HPC outlet)": 3.5,
  "Sensor 12 (Fuel flow ratio)": -18.0,
  "Sensor 13 (Corrected fan speed)": -42.0,
  "Sensor 14 (Corrected core speed)": -95.0,
  "Sensor 15 (Bypass ratio)": -0.85,
  "Sensor 17 (Bleed enthalpy)": -15.0,
  "Sensor 20 (HPT coolant bleed)": 4.2,
  "Sensor 21 (LPT coolant bleed)": 2.8,
};

type PredictionResult = {
  rul: number;
  health: "Good" | "Warning" | "Critical";
  models: { name: string; rul: number; confidence: number }[];
};

function computePrediction(sensors: Record<string, number>): PredictionResult {
  const s3 = sensors["Sensor 3 (HPC outlet temp)"] || 1589.7;
  const s4 = sensors["Sensor 4 (LPT outlet temp)"] || 1400.6;
  const s8 = sensors["Sensor 8 (Physical fan speed)"] || 2388.06;
  const s14 = sensors["Sensor 14 (Corrected core speed)"] || 8138.62;

  const deviation =
    Math.abs(1589.7 - s3) * 0.8 +
    Math.abs(1400.6 - s4) * 0.6 +
    Math.abs(2388.06 - s8) * 0.02 +
    Math.abs(8138.62 - s14) * 0.01;

  const baseRul = Math.max(5, Math.round(180 - deviation * 1.2));

  return {
    rul: baseRul,
    health: baseRul > 100 ? "Good" : baseRul > 40 ? "Warning" : "Critical",
    models: [
      { name: "Random Forest", rul: Math.max(3, baseRul + Math.round(Math.random() * 10 - 5)), confidence: Math.min(95, 78 + Math.round((baseRul / 180) * 10)) },
      { name: "XGBoost", rul: Math.max(3, baseRul + Math.round(Math.random() * 8 - 4)), confidence: Math.min(97, 84 + Math.round((baseRul / 180) * 8)) },
      { name: "Neural Network", rul: Math.max(3, baseRul + Math.round(Math.random() * 5 - 2)), confidence: Math.min(99, 89 + Math.round((baseRul / 180) * 6)) },
    ],
  };
}

function interpolateSensors(degradation: number): Record<string, number> {
  const result: Record<string, number> = {};
  for (const key of Object.keys(healthySensors)) {
    const base = healthySensors[key];
    const offset = criticalOffsets[key] || 0;
    result[key] = Math.round((base + offset * (degradation / 100)) * 10000) / 10000;
  }
  return result;
}

function useAnimatedNumber(target: number, duration = 400) {
  const [display, setDisplay] = useState(target);
  const rafRef = useRef<number>();
  const startRef = useRef({ value: target, time: 0 });

  useEffect(() => {
    const start = display;
    const startTime = performance.now();
    startRef.current = { value: start, time: startTime };

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (target - start) * eased);
      setDisplay(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration]);

  return display;
}

const DemoSection = () => {
  const [degradation, setDegradation] = useState(0);
  const { ref, isVisible } = useScrollAnimation();

  const sensors = useMemo(() => interpolateSensors(degradation), [degradation]);
  const result = useMemo(() => computePrediction(sensors), [sensors]);
  const animatedRul = useAnimatedNumber(result.rul);

  const healthColor = result.health === "Good" ? "text-secondary" : result.health === "Warning" ? "text-primary" : "text-destructive";
  const healthBg = result.health === "Good" ? "bg-secondary/10 border-secondary/30" : result.health === "Warning" ? "bg-primary/10 border-primary/30" : "bg-destructive/10 border-destructive/30";
  const HealthIcon = result.health === "Good" ? CheckCircle : AlertTriangle;

  const degradationLabel = degradation < 30 ? "Healthy" : degradation < 70 ? "Degrading" : "Critical";
  const degradationColor = degradation < 30 ? "text-secondary" : degradation < 70 ? "text-primary" : "text-destructive";

  return (
    <section className="py-24 bg-gradient-section min-h-screen">
      <div className="container mx-auto px-4" ref={ref}>
        <div className={`text-center mb-12 scroll-animate ${isVisible ? "visible" : ""}`}>
          <p className="text-primary font-medium text-sm mb-2 tracking-wide uppercase font-display">Demo</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 font-display">
            Simulated <span className="text-gradient">RUL Prediction</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Drag the degradation slider to simulate engine wear — sensor readings and predictions update in real time.
          </p>
        </div>

        {/* Degradation Slider */}
        <div className={`max-w-2xl mx-auto mb-10 scroll-animate scroll-animate-delay-1 ${isVisible ? "visible" : ""}`}>
          <Card className="bg-gradient-card border-border/50 glow-orange">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-primary" />
                  <Label className="text-base font-semibold font-display">Engine Degradation</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`${degradationColor} font-semibold border-border/50`}>
                    {degradation}% — {degradationLabel}
                  </Badge>
                  {degradation > 0 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDegradation(0)}
                      className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                      title="Reset to healthy"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              <Slider
                value={[degradation]}
                onValueChange={(v) => setDegradation(v[0])}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span className="text-secondary">● Healthy</span>
                <span className="text-primary">● Degrading</span>
                <span className="text-destructive">● Critical</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className={`grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto scroll-animate scroll-animate-delay-2 ${isVisible ? "visible" : ""}`}>
          {/* Sensor Readings */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-display">Engine Sensor Readings</CardTitle>
              <CardDescription>Values shift in real time as degradation increases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-2 scrollbar-thin">
                {Object.entries(sensors).map(([key, val]) => {
                  const base = healthySensors[key];
                  const diff = Math.abs(val - base);
                  const maxDiff = Math.abs(criticalOffsets[key] || 1);
                  const pct = Math.min(1, diff / maxDiff);
                  const barColor = pct < 0.3 ? "bg-secondary" : pct < 0.7 ? "bg-primary" : "bg-destructive";

                  return (
                    <div key={key} className="p-2 rounded-lg bg-muted/40 border border-border/30 space-y-1">
                      <Label className="text-xs text-muted-foreground leading-tight">{key}</Label>
                      <div className="text-sm font-mono font-semibold text-foreground">{val}</div>
                      <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                        <div className={`h-full ${barColor} transition-all duration-300`} style={{ width: `${pct * 100}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Live Prediction Results */}
          <div className="space-y-6">
            <Card className={`${healthBg} border transition-all duration-500 bg-gradient-card`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2 font-display">
                  <Activity className="h-5 w-5 text-primary" />
                  Live Prediction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-4">
                  <div className="text-6xl font-bold text-foreground transition-all duration-300 font-display glow-text tabular-nums">
                    {animatedRul}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Remaining Cycles</div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <HealthIcon className={`h-5 w-5 ${healthColor} transition-colors duration-300`} />
                  <span className={`font-semibold ${healthColor} transition-colors duration-300`}>Engine Health: {result.health}</span>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Critical</span>
                    <span>Good</span>
                  </div>
                  <Progress value={Math.min(100, (result.rul / 200) * 100)} className="h-3" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-display">Model Comparison</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.models.map((m) => (
                  <div key={m.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/40 border border-border/30">
                    <div>
                      <div className="font-medium text-sm text-foreground">{m.name}</div>
                      <div className="text-xs text-muted-foreground">Confidence: {m.confidence}%</div>
                    </div>
                    <Badge variant="outline" className="text-sm font-semibold border-primary/50 text-primary">{m.rul} cycles</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
