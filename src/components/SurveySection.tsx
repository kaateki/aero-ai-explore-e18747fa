import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";

type Question =
  | { id: string; type: "choice"; title: string; subtitle?: string; options: string[] }
  | { id: string; type: "scale"; title: string; subtitle?: string; min: number; max: number; minLabel: string; maxLabel: string; suffix?: string }
  | { id: string; type: "multi"; title: string; subtitle?: string; options: string[] };

const questions: Question[] = [
  {
    id: "trust",
    type: "scale",
    title: "How much do you trust AI in aviation?",
    subtitle: "0 means not at all, 100 means fully",
    min: 0,
    max: 100,
    minLabel: "No trust",
    maxLabel: "Full trust",
    suffix: "%",
  },
  {
    id: "excitement",
    type: "choice",
    title: "How do you feel about AI in aerospace?",
    options: ["Skeptical", "Curious", "Excited", "Mind blown"],
  },
  {
    id: "impact",
    type: "choice",
    title: "Where will AI make the biggest impact?",
    options: ["Predictive Maintenance", "Autonomous Flight", "Air Traffic Control", "Aircraft Design"],
  },
  {
    id: "concerns",
    type: "multi",
    title: "What concerns you most?",
    subtitle: "Select all that apply",
    options: ["Safety", "Job displacement", "Cybersecurity", "Over-reliance", "Regulation", "None"],
  },
  {
    id: "timeline",
    type: "choice",
    title: "When will fully autonomous passenger flights happen?",
    options: ["Within 10 years", "10–25 years", "25–50 years", "Never"],
  },
  {
    id: "optimism",
    type: "scale",
    title: "Overall, how optimistic are you about AI in aerospace?",
    min: 0,
    max: 100,
    minLabel: "Pessimistic",
    maxLabel: "Optimistic",
    suffix: "%",
  },
];

const SurveySection = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({
    trust: 50,
    optimism: 50,
    concerns: [],
  });
  const [done, setDone] = useState(false);

  const total = questions.length;
  const current = questions[step];
  const progress = ((step + (done ? 1 : 0)) / total) * 100;

  const isAnswered = () => {
    const a = answers[current?.id];
    if (current?.type === "scale") return typeof a === "number";
    if (current?.type === "multi") return Array.isArray(a) && a.length > 0;
    return !!a;
  };

  const next = () => {
    if (step < total - 1) setStep(step + 1);
    else setDone(true);
  };
  const prev = () => step > 0 && setStep(step - 1);
  const reset = () => {
    setStep(0);
    setAnswers({ trust: 50, optimism: 50, concerns: [] });
    setDone(false);
  };

  const setAnswer = (id: string, value: any) => setAnswers((p) => ({ ...p, [id]: value }));

  const toggleMulti = (id: string, opt: string) => {
    const arr: string[] = answers[id] || [];
    setAnswer(id, arr.includes(opt) ? arr.filter((o) => o !== opt) : [...arr, opt]);
  };

  return (
    <section className="min-h-screen py-16 px-4 bg-gradient-section">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="text-gradient">Aerospace AI Survey</span>
          </h1>
          <p className="text-muted-foreground">
            Share your thoughts on AI in aviation — takes about a minute.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>{done ? "Complete" : `Question ${step + 1} of ${total}`}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        <Card className="bg-gradient-card border-border p-8 min-h-[420px] flex flex-col">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                <h2 className="text-2xl font-bold mb-2">{current.title}</h2>
                {current.subtitle && (
                  <p className="text-muted-foreground mb-6">{current.subtitle}</p>
                )}

                <div className="flex-1 flex flex-col justify-center">
                  {current.type === "choice" && (
                    <div className="grid gap-3">
                      {current.options.map((opt) => {
                        const selected = answers[current.id] === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => setAnswer(current.id, opt)}
                            className={`text-left px-5 py-4 rounded-lg border-2 transition-all ${
                              selected
                                ? "border-primary bg-primary/10 text-foreground"
                                : "border-border bg-muted/30 hover:border-primary/50 text-foreground"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{opt}</span>
                              {selected && <CheckCircle2 className="w-5 h-5 text-primary" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {current.type === "scale" && (
                    <div className="py-6">
                      <div className="text-center mb-8">
                        <motion.div
                          key={answers[current.id]}
                          initial={{ scale: 0.9, opacity: 0.5 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-6xl font-bold text-gradient"
                        >
                          {answers[current.id]}
                          {current.suffix}
                        </motion.div>
                      </div>
                      <Slider
                        value={[answers[current.id]]}
                        onValueChange={(v) => setAnswer(current.id, v[0])}
                        min={current.min}
                        max={current.max}
                        step={1}
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-3">
                        <span>{current.minLabel}</span>
                        <span>{current.maxLabel}</span>
                      </div>
                    </div>
                  )}

                  {current.type === "multi" && (
                    <div className="flex flex-wrap gap-2">
                      {current.options.map((opt) => {
                        const selected = (answers[current.id] || []).includes(opt);
                        return (
                          <button
                            key={opt}
                            onClick={() => toggleMulti(current.id, opt)}
                            className={`px-4 py-2 rounded-full border-2 transition-all text-sm font-medium ${
                              selected
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border bg-muted/30 hover:border-primary/50 text-foreground"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
                  <Button variant="ghost" onClick={prev} disabled={step === 0}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  <Button onClick={next} disabled={!isAnswered()} className="glow-orange">
                    {step === total - 1 ? "Finish" : "Next"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="summary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1"
              >
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4"
                  >
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h2 className="text-3xl font-bold mb-2">Thanks for sharing!</h2>
                  <p className="text-muted-foreground">Here's a summary of your responses.</p>
                </div>

                <div className="space-y-3">
                  {questions.map((q) => {
                    const a = answers[q.id];
                    const display = Array.isArray(a)
                      ? a.length
                        ? a.join(", ")
                        : "—"
                      : q.type === "scale"
                      ? `${a}${(q as any).suffix || ""}`
                      : a || "—";
                    return (
                      <div
                        key={q.id}
                        className="flex justify-between items-start gap-4 p-4 rounded-lg bg-muted/30 border border-border"
                      >
                        <span className="text-sm text-muted-foreground flex-1">{q.title}</span>
                        <span className="text-sm font-semibold text-primary text-right max-w-[50%]">
                          {display}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-center mt-8">
                  <Button onClick={reset} variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" /> Take again
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </section>
  );
};

export default SurveySection;
