import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Database, BrainCircuit, BarChart3, ArrowRight, Activity,
  Gauge, AlertTriangle, CheckCircle2, Play, Pause, RotateCcw,
  Cpu, Zap, ThermometerSun, Wind, TrendingDown,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, Legend, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Cell, PieChart, Pie,
} from "recharts";

/* ── static data ── */
const modelComparison = [
  { model: "Random Forest", rmse: 28.4, r2: 0.82, precision: 0.79, recall: 0.81, f1: 0.80, trainTime: 12 },
  { model: "XGBoost", rmse: 22.1, r2: 0.88, precision: 0.86, recall: 0.87, f1: 0.86, trainTime: 8 },
  { model: "Neural Network", rmse: 18.7, r2: 0.92, precision: 0.91, recall: 0.90, f1: 0.91, trainTime: 45 },
];

const radarData = [
  { metric: "Accuracy", RF: 82, XGB: 88, NN: 92 },
  { metric: "Speed", RF: 90, XGB: 95, NN: 55 },
  { metric: "Interpretability", RF: 85, XGB: 70, NN: 40 },
  { metric: "Scalability", RF: 75, XGB: 88, NN: 95 },
  { metric: "Robustness", RF: 70, XGB: 82, NN: 88 },
];

const pieData = [
  { name: "Training", value: 60, fill: "hsl(24, 95%, 55%)" },
  { name: "Validation", value: 20, fill: "hsl(180, 65%, 45%)" },
  { name: "Testing", value: 20, fill: "hsl(260, 70%, 60%)" },
];

/* ── animated counter hook ── */
function useCounter(end: number, duration = 2000, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setValue(Math.floor(p * end));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, start]);
  return value;
}

/* ── live engine simulator ── */
function useEngineSimulator() {
  const [running, setRunning] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [rul, setRul] = useState(200);
  const [sensorStream, setSensorStream] = useState<
    { cycle: number; temp: number; pressure: number; vibration: number; rul: number }[]
  >([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setCycle(0);
    setRul(200);
    setSensorStream([]);
  };

  useEffect(() => {
    if (!running) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setCycle((c) => {
        const next = c + 1;
        const newRul = Math.max(0, 200 - next * 0.8 + (Math.random() - 0.5) * 5);
        setRul(newRul);
        setSensorStream((prev) => [
          ...prev.slice(-40),
          {
            cycle: next,
            temp: 520 + next * 1.2 + (Math.random() - 0.5) * 15,
            pressure: 30 - next * 0.05 + (Math.random() - 0.5) * 2,
            vibration: 0.3 + next * 0.008 + Math.random() * 0.05,
            rul: newRul,
          },
        ]);
        if (newRul <= 0) setRunning(false);
        return next;
      });
    }, 200);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  return { running, cycle, rul, sensorStream, start, pause, reset };
}

/* ── health status helper ── */
function getHealthStatus(rul: number) {
  if (rul > 120) return { label: "Healthy", color: "text-green-400", bg: "bg-green-400/10 border-green-400/30", icon: CheckCircle2 };
  if (rul > 50) return { label: "Warning", color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/30", icon: AlertTriangle };
  return { label: "Critical", color: "text-red-400", bg: "bg-red-400/10 border-red-400/30", icon: AlertTriangle };
}

/* ── training progress simulator ── */
function TrainingProgress() {
  const [epoch, setEpoch] = useState(0);
  const [losses, setLosses] = useState<{ epoch: number; loss: number; valLoss: number }[]>([]);
  const [training, setTraining] = useState(false);

  useEffect(() => {
    if (!training || epoch >= 50) { setTraining(false); return; }
    const t = setTimeout(() => {
      const loss = 1.5 * Math.exp(-epoch * 0.08) + Math.random() * 0.05;
      const valLoss = 1.6 * Math.exp(-epoch * 0.07) + Math.random() * 0.08;
      setLosses((p) => [...p, { epoch, loss, valLoss }]);
      setEpoch((e) => e + 1);
    }, 150);
    return () => clearTimeout(t);
  }, [training, epoch]);

  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle className="font-display text-lg flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-accent" /> Live Training Simulation
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={training ? "secondary" : "default"}
              onClick={() => { if (!training) { setEpoch(0); setLosses([]); } setTraining(!training); }}
            >
              {training ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span className="ml-1">{training ? "Pause" : "Train"}</span>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-sm text-muted-foreground">Epoch {epoch}/50</span>
          <Progress value={(epoch / 50) * 100} className="flex-1 h-2" />
          <span className="text-sm font-mono text-primary">{((epoch / 50) * 100).toFixed(0)}%</span>
        </div>
        {losses.length > 0 && (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={losses}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
              <XAxis dataKey="epoch" stroke="hsl(215, 20%, 60%)" fontSize={11} />
              <YAxis stroke="hsl(215, 20%, 60%)" fontSize={11} />
              <Tooltip contentStyle={{ background: "hsl(220, 20%, 10%)", border: "1px solid hsl(220, 15%, 18%)", borderRadius: 8 }} />
              <Legend />
              <Line type="monotone" dataKey="loss" stroke="hsl(24, 95%, 55%)" strokeWidth={2} dot={false} name="Train Loss" />
              <Line type="monotone" dataKey="valLoss" stroke="hsl(180, 65%, 45%)" strokeWidth={2} dot={false} name="Val Loss" />
            </LineChart>
          </ResponsiveContainer>
        )}
        {losses.length === 0 && (
          <div className="h-[220px] flex items-center justify-center text-muted-foreground text-sm">
            Click "Train" to start the neural network training simulation
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* ── main component ── */
const ProjectSection = () => {
  const [activeModel, setActiveModel] = useState(2);
  const [countersVisible, setCountersVisible] = useState(false);
  const engine = useEngineSimulator();
  const health = getHealthStatus(engine.rul);
  const HealthIcon = health.icon;

  const engines = useCounter(249, 1500, countersVisible);
  const sensors = useCounter(21, 1200, countersVisible);
  const cycles = useCounter(26000, 2000, countersVisible);
  const accuracy = useCounter(92, 1800, countersVisible);

  const rulPredictions = Array.from({ length: 20 }, (_, i) => {
    const actual = Math.floor(50 + ((i * 7 + 13) % 150));
    return {
      engine: `E${i + 1}`,
      actual,
      predicted: actual + Math.floor(((i * 3 + 5) % 30) - 15),
    };
  });

  return (
    <section id="project" className="py-24 bg-gradient-section">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Badge variant="outline" className="mb-4 border-primary text-primary px-4 py-1 font-display text-xs tracking-widest uppercase">
            Machine Learning Project
          </Badge>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 text-gradient leading-tight">
            Engine Life Prediction
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Predicting Remaining Useful Life (RUL) of turbofan engines using deep learning on NASA's C-MAPSS dataset.
          </p>
        </motion.div>

        {/* Animated stats counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onViewportEnter={() => setCountersVisible(true)}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 max-w-4xl mx-auto"
        >
          {[
            { value: engines, label: "Engines Analyzed", suffix: "", icon: Zap },
            { value: sensors, label: "Sensor Channels", suffix: "", icon: Activity },
            { value: cycles, label: "Flight Cycles", suffix: "+", icon: TrendingDown },
            { value: accuracy, label: "Best Accuracy", suffix: "%", icon: Gauge },
          ].map((stat) => (
            <Card key={stat.label} className="bg-gradient-card border-border text-center hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="font-display text-3xl font-bold text-foreground">
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Pipeline */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
          <h3 className="font-display text-2xl font-semibold text-center mb-8">ML Pipeline</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            {[
              { icon: Database, label: "Ingest", desc: "NASA C-MAPSS", color: "border-primary", glow: "glow-orange" },
              { icon: ThermometerSun, label: "Preprocess", desc: "Normalize & Window", color: "border-secondary", glow: "" },
              { icon: BrainCircuit, label: "Train", desc: "RF · XGB · NN", color: "border-accent", glow: "" },
              { icon: BarChart3, label: "Evaluate", desc: "RMSE · R²", color: "border-primary", glow: "" },
              { icon: Gauge, label: "Deploy", desc: "RUL Monitor", color: "border-secondary", glow: "" },
            ].map((step, i) => (
              <motion.div
                key={step.label}
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Card className={`bg-gradient-card border-2 ${step.color} w-40 text-center hover:scale-110 transition-transform duration-300 ${step.glow}`}>
                  <CardContent className="py-4 px-3">
                    <step.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h4 className="font-display text-xs font-semibold">{step.label}</h4>
                    <p className="text-[10px] text-muted-foreground mt-1">{step.desc}</p>
                  </CardContent>
                </Card>
                {i < 4 && (
                  <motion.div
                    animate={{ x: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                  >
                    <ArrowRight className="h-5 w-5 text-primary/60 mx-1 hidden md:block" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Live Engine Simulator */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
          <h3 className="font-display text-2xl font-semibold text-center mb-8">
            🔴 Live Engine Health Simulator
          </h3>
          <div className="max-w-5xl mx-auto">
            <Card className="bg-gradient-card border-border overflow-hidden">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center justify-between flex-wrap gap-3">
                  <span className="flex items-center gap-2">
                    <Wind className="h-5 w-5 text-secondary" /> Turbofan Engine Monitor
                  </span>
                  <div className="flex items-center gap-2">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={health.label}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                      >
                        <Badge className={`${health.bg} ${health.color} border`}>
                          <HealthIcon className="h-3 w-3 mr-1" />
                          {health.label}
                        </Badge>
                      </motion.div>
                    </AnimatePresence>
                    <Button size="sm" variant="outline" onClick={engine.reset}><RotateCcw className="h-4 w-4" /></Button>
                    <Button size="sm" onClick={engine.running ? engine.pause : engine.start}>
                      {engine.running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      <span className="ml-1">{engine.running ? "Pause" : "Start"}</span>
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* gauges row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {[
                    { label: "Cycle", value: engine.cycle, unit: "", max: 250 },
                    { label: "RUL", value: Math.round(engine.rul), unit: " cycles", max: 200 },
                    { label: "Temp", value: engine.sensorStream.length ? Math.round(engine.sensorStream.at(-1)!.temp) : 520, unit: "°C", max: 900 },
                    { label: "Vibration", value: engine.sensorStream.length ? engine.sensorStream.at(-1)!.vibration.toFixed(2) : "0.30", unit: " g", max: 2 },
                  ].map((g) => (
                    <div key={g.label} className="bg-muted rounded-lg p-3 text-center">
                      <div className="text-xs text-muted-foreground mb-1">{g.label}</div>
                      <div className="font-display text-xl font-bold text-foreground">
                        {g.value}{g.unit}
                      </div>
                      <Progress
                        value={Math.min((Number(g.value) / g.max) * 100, 100)}
                        className="h-1.5 mt-2"
                      />
                    </div>
                  ))}
                </div>

                {/* live chart */}
                {engine.sensorStream.length > 1 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={engine.sensorStream}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
                      <XAxis dataKey="cycle" stroke="hsl(215, 20%, 60%)" fontSize={11} />
                      <YAxis yAxisId="temp" stroke="hsl(24, 95%, 55%)" fontSize={11} />
                      <YAxis yAxisId="rul" orientation="right" stroke="hsl(180, 65%, 45%)" fontSize={11} />
                      <Tooltip contentStyle={{ background: "hsl(220, 20%, 10%)", border: "1px solid hsl(220, 15%, 18%)", borderRadius: 8 }} />
                      <Legend />
                      <Line yAxisId="temp" type="monotone" dataKey="temp" stroke="hsl(24, 95%, 55%)" strokeWidth={2} dot={false} name="Temperature (°C)" />
                      <Line yAxisId="rul" type="monotone" dataKey="rul" stroke="hsl(180, 65%, 45%)" strokeWidth={2} dot={false} name="RUL (cycles)" />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                    Press "Start" to simulate engine degradation in real-time
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Training simulation */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20 max-w-4xl mx-auto">
          <TrainingProgress />
        </motion.div>

        {/* Model comparison */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
          <h3 className="font-display text-2xl font-semibold text-center mb-8">Model Battle</h3>
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
            {modelComparison.map((m, i) => (
              <motion.div key={m.model} whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card
                  onClick={() => setActiveModel(i)}
                  className={`bg-gradient-card cursor-pointer transition-all ${
                    activeModel === i ? "border-primary glow-orange ring-1 ring-primary/30" : "border-border"
                  }`}
                >
                  <CardContent className="pt-6 text-center">
                    {i === 2 && <Badge className="mb-2 bg-primary/20 text-primary border-primary/30">Best</Badge>}
                    <h4 className="font-display text-sm font-semibold mb-3">{m.model}</h4>
                    <div className="text-3xl font-bold text-primary">{m.r2}</div>
                    <div className="text-xs text-muted-foreground mb-2">R² Score</div>
                    <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                      <div className="bg-muted rounded p-2">
                        <div className="font-semibold text-foreground">{m.rmse}</div>
                        <div className="text-muted-foreground">RMSE</div>
                      </div>
                      <div className="bg-muted rounded p-2">
                        <div className="font-semibold text-foreground">{m.f1}</div>
                        <div className="text-muted-foreground">F1</div>
                      </div>
                    </div>
                    {activeModel === i && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 text-xs text-primary font-medium"
                      >
                        ▲ Selected
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Charts tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Tabs defaultValue="radar" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-muted">
              <TabsTrigger value="radar">Radar</TabsTrigger>
              <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
              <TabsTrigger value="rul">RUL</TabsTrigger>
              <TabsTrigger value="split">Data Split</TabsTrigger>
            </TabsList>

            <TabsContent value="radar">
              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle className="font-display text-lg">Model Capabilities Radar</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="hsl(220, 15%, 22%)" />
                      <PolarAngleAxis dataKey="metric" stroke="hsl(215, 20%, 60%)" fontSize={12} />
                      <PolarRadiusAxis stroke="hsl(215, 20%, 40%)" fontSize={10} />
                      <Radar name="Random Forest" dataKey="RF" stroke="hsl(24, 95%, 55%)" fill="hsl(24, 95%, 55%)" fillOpacity={0.15} />
                      <Radar name="XGBoost" dataKey="XGB" stroke="hsl(180, 65%, 45%)" fill="hsl(180, 65%, 45%)" fillOpacity={0.15} />
                      <Radar name="Neural Network" dataKey="NN" stroke="hsl(260, 70%, 60%)" fill="hsl(260, 70%, 60%)" fillOpacity={0.15} />
                      <Legend />
                      <Tooltip contentStyle={{ background: "hsl(220, 20%, 10%)", border: "1px solid hsl(220, 15%, 18%)", borderRadius: 8 }} />
                    </RadarChart>
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

            <TabsContent value="split">
              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle className="font-display text-lg">Dataset Split</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={110}
                        paddingAngle={4}
                        dataKey="value"
                        label={({ name, value }) => `${name} ${value}%`}
                      >
                        {pieData.map((entry, i) => (
                          <Cell key={i} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: "hsl(220, 20%, 10%)", border: "1px solid hsl(220, 15%, 18%)", borderRadius: 8 }} />
                    </PieChart>
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
