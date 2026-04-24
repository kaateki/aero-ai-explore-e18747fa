import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Plane,
  Brain,
  ShieldCheck,
  Rocket,
  Heart,
} from "lucide-react";

type Step =
  | {
      id: string;
      type: "choice";
      icon: React.ElementType;
      title: string;
      subtitle: string;
      options: { label: string; emoji: string; value: string }[];
    }
  | {
      id: string;
      type: "scale";
      icon: React.ElementType;
      title: string;
      subtitle: string;
      min: number;
      max: number;
      minLabel: string;
      maxLabel: string;
    }
  | {
      id: string;
      type: "emoji";
      icon: React.ElementType;
      title: string;
      subtitle: string;
      options: { label: string; emoji: string; value: string }[];
    }
  | {
      id: string;
      type: "multi";
      icon: React.ElementType;
      title: string;
      subtitle: string;
      options: { label: string; value: string }[];
    };

const steps: Step[] = [
  {
    id: "trust",
    type: "scale",
    icon: ShieldCheck,
    title: "How much do you trust AI to fly an aircraft?",
    subtitle: "Drag the slider — 0 means no trust, 100 means full autonomy",
    min: 0,
    max: 100,
    minLabel: "Not at all",
    maxLabel: "Fully trust",
  },
  {
    id: "excitement",
    type: "emoji",
    icon: Rocket,
    title: "How excited are you about AI in aerospace?",
    subtitle: "Pick the emoji that fits best",
    options: [
      { label: "Skeptical", emoji: "🤨", value: "skeptical" },
      { label: "Curious", emoji: "🤔", value: "curious" },
      { label: "Excited", emoji: "🚀", value: "excited" },
      { label: "Mind Blown", emoji: "🤯", value: "blown" },
    ],
  },
  {
    id: "biggest_impact",
    type: "choice",
    icon: Brain,
    title: "Where will AI impact aerospace the most?",
    subtitle: "Choose the area you think will change the fastest",
    options: [
      { label: "Predictive Maintenance", emoji: "🛠️", value: "maintenance" },
      { label: "Autonomous Flight", emoji: "🛩️", value: "autonomy" },
      { label: "Air Traffic Control", emoji: "🗼", value: "atc" },
      { label: "Design & Simulation", emoji: "🧪", value: "design" },
    ],
  },
  {
    id: "concerns",
    type: "multi",
    icon: ShieldCheck,
    title: "What concerns you most about AI in aviation?",
    subtitle: "Select all that apply",
    options: [
      { label: "Safety & reliability", value: "safety" },
      { label: "Loss of human jobs", value: "jobs" },
      { label: "Cybersecurity risks", value: "cyber" },
      { label: "Lack of transparency", value: "transparency" },
      { label: "Regulation lagging behind", value: "regulation" },
    ],
  },
  {
    id: "future",
    type: "choice",
    icon: Plane,
    title: "When will fully autonomous passenger flights be common?",
    subtitle: "Make your prediction",
    options: [
      { label: "Within 10 years", emoji: "⚡", value: "10y" },
      { label: "10–25 years", emoji: "🛫", value: "25y" },
      { label: "25–50 years", emoji: "🌅", value: "50y" },
      { label: "Never", emoji: "🚫", value: "never" },
    ],
  },
  {
    id: "optimism",
    type: "scale",
    icon: Heart,
    title: "Overall, how optimistic are you about AI + Aerospace?",
    subtitle: "0 = pessimistic, 100 = very optimistic",
    min: 0,
    max: 100,
    minLabel: "Pessimistic",
    maxLabel: "Optimistic",
  },
];

type Answers = Record<string, string | number | string[]>;

const SurveySection = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [finished, setFinished] = useState(false);

  const step = steps[current];
  const progress = ((current + (finished ? 1 : 0)) / steps.length) * 100;

  const setAnswer = (value: string | number | string[]) => {
    setAnswers((prev) => ({ ...prev, [step.id]: value }));
  };

  const toggleMulti = (value: string) => {
    const existing = (answers[step.id] as string[]) || [];
    if (existing.includes(value)) {
      setAnswer(existing.filter((v) => v !== value));
    } else {
      setAnswer([...existing, value]);
    }
  };

  const canProceed = () => {
    const a = answers[step.id];
    if (step.type === "multi") return Array.isArray(a) && a.length > 0;
    if (step.type === "scale") return typeof a === "number";
    return a !== undefined && a !== "";
  };

  const next = () => {
    if (current < steps.length - 1) setCurrent((c) => c + 1);
    else setFinished(true);
  };

  const back = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  const restart = () => {
    setAnswers({});
    setCurrent(0);
    setFinished(false);
  };

  const renderStep = () => {
    const Icon = step.icon;
    return (
      <motion.div
        key={step.id}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.35 }}
      >
        <Card className="bg-gradient-card border-border overflow-hidden">
          <div className="h-1 bg-muted">
            <motion.div
              className="h-full bg-primary"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <CardContent className="pt-8 pb-8 px-6 md:px-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center glow-orange">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <Badge variant="outline" className="text-xs border-primary/40 text-primary">
                  Step {current + 1} of {steps.length}
                </Badge>
              </div>
            </div>

            <h3 className="font-display text-2xl md:text-3xl font-bold mb-2 text-foreground">
              {step.title}
            </h3>
            <p className="text-muted-foreground mb-8">{step.subtitle}</p>

            {step.type === "choice" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {step.options.map((opt) => {
                  const active = answers[step.id] === opt.value;
                  return (
                    <motion.button
                      key={opt.value}
                      onClick={() => setAnswer(opt.value)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`text-left p-4 rounded-xl border transition-all flex items-center gap-3 ${
                        active
                          ? "border-primary bg-primary/10 glow-orange"
                          : "border-border hover:border-primary/50 hover:bg-muted"
                      }`}
                    >
                      <span className="text-2xl">{opt.emoji}</span>
                      <span className="font-medium text-foreground">{opt.label}</span>
                      {active && (
                        <CheckCircle2 className="h-5 w-5 text-primary ml-auto" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {step.type === "emoji" && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {step.options.map((opt) => {
                  const active = answers[step.id] === opt.value;
                  return (
                    <motion.button
                      key={opt.value}
                      onClick={() => setAnswer(opt.value)}
                      whileHover={{ scale: 1.05, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-5 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                        active
                          ? "border-primary bg-primary/10 glow-orange"
                          : "border-border hover:border-primary/50 hover:bg-muted"
                      }`}
                    >
                      <span className="text-4xl">{opt.emoji}</span>
                      <span className="text-sm font-medium text-foreground">{opt.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {step.type === "scale" && (
              <div className="py-4">
                <div className="flex items-end justify-center mb-6">
                  <motion.span
                    key={String(answers[step.id] ?? 50)}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="font-display text-6xl md:text-7xl font-bold text-gradient"
                  >
                    {(answers[step.id] as number) ?? 50}
                  </motion.span>
                  <span className="text-muted-foreground text-xl ml-2 mb-2">/ {step.max}</span>
                </div>
                <Slider
                  min={step.min}
                  max={step.max}
                  step={1}
                  value={[(answers[step.id] as number) ?? 50]}
                  onValueChange={(v) => setAnswer(v[0])}
                  className="mb-3"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{step.minLabel}</span>
                  <span>{step.maxLabel}</span>
                </div>
              </div>
            )}

            {step.type === "multi" && (
              <div className="grid grid-cols-1 gap-2">
                {step.options.map((opt) => {
                  const selected = (answers[step.id] as string[]) || [];
                  const active = selected.includes(opt.value);
                  return (
                    <motion.button
                      key={opt.value}
                      onClick={() => toggleMulti(opt.value)}
                      whileTap={{ scale: 0.98 }}
                      className={`text-left p-3 rounded-lg border transition-all flex items-center gap-3 ${
                        active
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50 hover:bg-muted"
                      }`}
                    >
                      <span
                        className={`h-5 w-5 rounded border flex items-center justify-center flex-shrink-0 ${
                          active ? "bg-primary border-primary" : "border-muted-foreground"
                        }`}
                      >
                        {active && <CheckCircle2 className="h-4 w-4 text-primary-foreground" />}
                      </span>
                      <span className="text-sm text-foreground">{opt.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            )}

            <div className="flex justify-between items-center mt-8 pt-4 border-t border-border">
              <Button
                variant="ghost"
                onClick={back}
                disabled={current === 0}
                className="text-muted-foreground"
              >
                <ChevronLeft className="mr-1 h-4 w-4" /> Back
              </Button>
              <span className="text-xs text-muted-foreground">
                {Math.round(progress)}% complete
              </span>
              <Button
                onClick={next}
                disabled={!canProceed()}
                className="glow-orange hover:scale-105 transition-transform"
              >
                {current < steps.length - 1 ? (
                  <>
                    Next <ChevronRight className="ml-1 h-4 w-4" />
                  </>
                ) : (
                  <>
                    See Results <Sparkles className="ml-1 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const renderSummary = () => {
    const trust = (answers.trust as number) ?? 0;
    const optimism = (answers.optimism as number) ?? 0;
    const excitement = steps[1].type === "emoji"
      ? steps[1].options.find((o) => o.value === answers.excitement)
      : null;
    const impact = steps[2].type === "choice"
      ? steps[2].options.find((o) => o.value === answers.biggest_impact)
      : null;
    const future = steps[4].type === "choice"
      ? steps[4].options.find((o) => o.value === answers.future)
      : null;
    const concerns = (answers.concerns as string[]) || [];
    const concernLabels =
      steps[3].type === "multi"
        ? steps[3].options.filter((o) => concerns.includes(o.value)).map((o) => o.label)
        : [];

    return (
      <motion.div
        key="summary"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-card border-border overflow-hidden">
          <div className="h-1 bg-primary" />
          <CardContent className="pt-10 pb-10 px-6 md:px-10">
            <div className="text-center mb-10">
              <motion.div
                initial={{ rotate: -10, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-flex h-16 w-16 rounded-2xl bg-primary/10 border border-primary/30 items-center justify-center glow-orange mb-4"
              >
                <Sparkles className="h-8 w-8 text-primary" />
              </motion.div>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-2">
                Thanks for sharing!
              </h3>
              <p className="text-muted-foreground">Here's a snapshot of your perspective</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <SummaryStat label="Trust in AI pilots" value={`${trust}%`} icon={ShieldCheck} />
              <SummaryStat label="Optimism" value={`${optimism}%`} icon={Heart} />
              <SummaryCard label="Vibe" content={excitement ? `${excitement.emoji} ${excitement.label}` : "—"} />
              <SummaryCard label="Biggest impact" content={impact ? `${impact.emoji} ${impact.label}` : "—"} />
              <SummaryCard
                label="Autonomous flights timeline"
                content={future ? `${future.emoji} ${future.label}` : "—"}
                fullWidth
              />
              <div className="md:col-span-2 p-4 rounded-xl border border-border bg-background/40">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Top concerns
                </p>
                {concernLabels.length ? (
                  <div className="flex flex-wrap gap-2">
                    {concernLabels.map((c) => (
                      <Badge key={c} variant="outline" className="border-primary/40 text-foreground">
                        {c}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No concerns selected</p>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={restart} variant="outline" className="hover:scale-105 transition-transform">
                <RotateCcw className="mr-2 h-4 w-4" /> Take Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <section id="survey" className="py-24 bg-gradient-section min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 border-primary/40 text-primary">
            Interactive Survey
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Your Take on AI in Aerospace
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A short, animated survey to capture how you feel about the future of intelligent flight.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {finished ? renderSummary() : renderStep()}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const SummaryStat = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
}) => (
  <div className="p-4 rounded-xl border border-border bg-background/40 flex items-center gap-3">
    <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <div>
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="font-display text-2xl font-bold text-foreground">{value}</p>
    </div>
  </div>
);

const SummaryCard = ({
  label,
  content,
  fullWidth,
}: {
  label: string;
  content: string;
  fullWidth?: boolean;
}) => (
  <div
    className={`p-4 rounded-xl border border-border bg-background/40 ${
      fullWidth ? "md:col-span-2" : ""
    }`}
  >
    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
    <p className="font-display text-lg font-semibold text-foreground">{content}</p>
  </div>
);

export default SurveySection;
