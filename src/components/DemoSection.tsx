import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertTriangle, CheckCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const defaultSensors: Record<string, number> = {
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

type PredictionResult = {
  rul: number;
  health: "Good" | "Warning" | "Critical";
  models: { name: string; rul: number; confidence: number }[];
};

function simulatePrediction(sensors: Record<string, number>): PredictionResult {
  const s3 = sensors["Sensor 3 (HPC outlet temp)"] || 1589.7;
  const s4 = sensors["Sensor 4 (LPT outlet temp)"] || 1400.6;
  const deviation = Math.abs(1589.7 - s3) + Math.abs(1400.6 - s4);
  const baseRul = Math.max(5, Math.round(180 - deviation * 1.5 + (Math.random() * 20 - 10)));

  return {
    rul: baseRul,
    health: baseRul > 100 ? "Good" : baseRul > 40 ? "Warning" : "Critical",
    models: [
      { name: "Random Forest", rul: baseRul + Math.round(Math.random() * 15 - 7), confidence: 78 + Math.round(Math.random() * 5) },
      { name: "XGBoost", rul: baseRul + Math.round(Math.random() * 10 - 5), confidence: 84 + Math.round(Math.random() * 4) },
      { name: "Neural Network", rul: baseRul + Math.round(Math.random() * 6 - 3), confidence: 89 + Math.round(Math.random() * 3) },
    ],
  };
}

const DemoSection = () => {
  const [sensors, setSensors] = useState(defaultSensors);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  const handlePredict = () => {
    setLoading(true);
    setTimeout(() => {
      setResult(simulatePrediction(sensors));
      setLoading(false);
    }, 800);
  };

  const healthColor = result?.health === "Good" ? "text-green-600" : result?.health === "Warning" ? "text-yellow-600" : "text-red-600";
  const HealthIcon = result?.health === "Good" ? CheckCircle : AlertTriangle;

  return (
    <section id="demo" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4" ref={ref}>
        <div className={`text-center mb-12 scroll-animate ${isVisible ? "visible" : ""}`}>
          <p className="text-primary font-medium text-sm mb-2 tracking-wide uppercase">Demo</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Simulated RUL Prediction
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Adjust engine sensor readings below and click "Predict" to see a simulated Remaining Useful Life estimate.
          </p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto scroll-animate scroll-animate-delay-2 ${isVisible ? "visible" : ""}`}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Engine Sensor Readings</CardTitle>
              <CardDescription>Modify values to simulate different engine conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-2">
                {Object.entries(sensors).map(([key, val]) => (
                  <div key={key}>
                    <Label className="text-xs text-muted-foreground">{key}</Label>
                    <Input
                      type="number"
                      step="any"
                      value={val}
                      onChange={(e) => setSensors({ ...sensors, [key]: parseFloat(e.target.value) || 0 })}
                      className="h-8 text-sm"
                    />
                  </div>
                ))}
              </div>
              <Button onClick={handlePredict} className="w-full mt-4" disabled={loading}>
                {loading ? "Predicting..." : "Predict RUL"}
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {result ? (
              <>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      Prediction Result
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center py-4">
                      <div className="text-5xl font-bold text-foreground">{result.rul}</div>
                      <div className="text-sm text-muted-foreground mt-1">Remaining Cycles</div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <HealthIcon className={`h-5 w-5 ${healthColor}`} />
                      <span className={`font-semibold ${healthColor}`}>Engine Health: {result.health}</span>
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

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Model Comparison</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {result.models.map((m) => (
                      <div key={m.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/70">
                        <div>
                          <div className="font-medium text-sm text-foreground">{m.name}</div>
                          <div className="text-xs text-muted-foreground">Confidence: {m.confidence}%</div>
                        </div>
                        <Badge variant="outline" className="text-sm font-semibold">{m.rul} cycles</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="flex items-center justify-center min-h-[300px]">
                <CardContent className="text-center text-muted-foreground">
                  <Activity className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Adjust sensor values and click "Predict RUL" to see results.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
