import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Trophy, RotateCcw } from "lucide-react";

const questions = [
  {
    question: "What does 'RUL' stand for in predictive maintenance?",
    options: ["Relative Unit Load", "Remaining Useful Life", "Random Utility Layer", "Real-time Update Log"],
    correct: 1,
  },
  {
    question: "Which force keeps an aircraft in the air?",
    options: ["Thrust", "Drag", "Lift", "Weight"],
    correct: 2,
  },
  {
    question: "What is the primary purpose of a turbofan engine?",
    options: ["Generate electricity", "Produce thrust", "Cool the cabin", "Navigate the aircraft"],
    correct: 1,
  },
  {
    question: "Which ML technique is commonly used for time-series prediction?",
    options: ["K-means clustering", "Linear regression only", "Recurrent Neural Networks", "Decision stumps"],
    correct: 2,
  },
  {
    question: "How many sensors does the NASA C-MAPSS dataset have per engine?",
    options: ["5", "10", "15", "21"],
    correct: 3,
  },
  {
    question: "What does CFD stand for in aerodynamics?",
    options: ["Central Flight Data", "Computational Fluid Dynamics", "Critical Force Distribution", "Calibrated Flight Drag"],
    correct: 1,
  },
  {
    question: "Which material is increasingly used in modern aircraft for its strength-to-weight ratio?",
    options: ["Steel", "Aluminum only", "Carbon fiber composites", "Concrete"],
    correct: 2,
  },
  {
    question: "What is the Mach number?",
    options: ["Engine RPM rating", "Ratio of speed to speed of sound", "Wing span measurement", "Fuel efficiency index"],
    correct: 1,
  },
];

const QuizSection = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === questions[current].correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setAnswered(false);
    setFinished(false);
  };

  const getScoreMessage = () => {
    const pct = score / questions.length;
    if (pct === 1) return "Perfect! You're an aerospace genius! 🚀";
    if (pct >= 0.75) return "Great job! You know your aerospace! ✈️";
    if (pct >= 0.5) return "Not bad! Keep learning! 🛩️";
    return "Keep exploring aerospace engineering! 📚";
  };

  return (
    <section id="quiz" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Test Your Knowledge
          </h2>
          <p className="text-muted-foreground text-lg">How well do you know aerospace engineering and AI?</p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {finished ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card className="bg-gradient-card border-border text-center">
                  <CardContent className="pt-10 pb-10">
                    <Trophy className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h3 className="font-display text-3xl font-bold mb-2">
                      {score} / {questions.length}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6">{getScoreMessage()}</p>
                    <div className="w-full bg-muted rounded-full h-4 mb-6">
                      <motion.div
                        className="bg-primary h-4 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(score / questions.length) * 100}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>
                    <Button onClick={handleRestart} className="glow-orange hover:scale-105 transition-transform">
                      <RotateCcw className="mr-2 h-4 w-4" /> Try Again
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
              >
                <Card className="bg-gradient-card border-border">
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">
                        Question {current + 1} of {questions.length}
                      </span>
                      <span className="text-sm text-primary font-semibold">Score: {score}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mb-4">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${((current + 1) / questions.length) * 100}%` }}
                      />
                    </div>
                    <CardTitle className="font-display text-xl">{questions[current].question}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {questions[current].options.map((opt, idx) => {
                      let extra = "";
                      if (answered) {
                        if (idx === questions[current].correct) extra = "border-secondary bg-secondary/10";
                        else if (idx === selected) extra = "border-destructive bg-destructive/10";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelect(idx)}
                          disabled={answered}
                          className={`w-full text-left p-4 rounded-lg border transition-all flex items-center gap-3 ${
                            answered ? extra : "border-border hover:border-primary/50 hover:bg-muted"
                          } ${!answered ? "cursor-pointer" : "cursor-default"}`}
                        >
                          {answered && idx === questions[current].correct && (
                            <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0" />
                          )}
                          {answered && idx === selected && idx !== questions[current].correct && (
                            <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                          )}
                          {!answered && (
                            <span className="w-5 h-5 rounded-full border border-muted-foreground flex-shrink-0 flex items-center justify-center text-xs">
                              {String.fromCharCode(65 + idx)}
                            </span>
                          )}
                          <span className="text-sm">{opt}</span>
                        </button>
                      );
                    })}

                    {answered && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-4">
                        <Button onClick={handleNext} className="w-full glow-orange hover:scale-[1.02] transition-transform">
                          {current < questions.length - 1 ? "Next Question →" : "See Results 🏆"}
                        </Button>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default QuizSection;
