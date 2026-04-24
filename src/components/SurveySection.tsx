import { useState, useMemo } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plane,
  Brain,
  ShieldCheck,
  Rocket,
  Heart,
  RotateCcw,
  Share2,
  Check,
  Radio,
  Gauge,
  Radar,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

/* ---------- Mission Definition ---------- */

type Mission =
  | {
      id: string;
      kind: "dial";
      icon: React.ElementType;
      callsign: string;
      prompt: string;
      hint: string;
      lowLabel: string;
      highLabel: string;
    }
  | {
      id: string;
      kind: "swipe";
      icon: React.ElementType;
      callsign: string;
      prompt: string;
      hint: string;
      cards: { value: string; emoji: string; title: string; tag: string }[];
    }
  | {
      id: string;
      kind: "grid";
      icon: React.ElementType;
      callsign: string;
      prompt: string;
      hint: string;
      cards: { value: string; emoji: string; title: string; desc: string }[];
    }
  | {
      id: string;
      kind: "tags";
      icon: React.ElementType;
      callsign: string;
      prompt: string;
      hint: string;
      tags: { value: string; label: string }[];
    };

const missions: Mission[] = [
  {
    id: "trust",
    kind: "dial",
    icon: ShieldCheck,
    callsign: "MISSION 01 · TRUST CALIBRATION",
    prompt: "How much do you trust AI to fly an aircraft?",
    hint: "Rotate the dial — tap the arc to set thrust",
    lowLabel: "Manual only",
    highLabel: "Full autonomy",
  },
  {
    id: "excitement",
    kind: "swipe",
    icon: Rocket,
    callsign: "MISSION 02 · SIGNAL CHECK",
    prompt: "What's your gut reaction to AI in aerospace?",
    hint: "Swipe the card left or right · or tap a vibe",
    cards: [
      { value: "skeptical", emoji: "🤨", title: "Skeptical", tag: "Show me proof" },
      { value: "curious", emoji: "🤔", title: "Curious", tag: "Tell me more" },
      { value: "excited", emoji: "🚀", title: "Excited", tag: "Let's fly" },
      { value: "blown", emoji: "🤯", title: "Mind Blown", tag: "Future is now" },
    ],
  },
  {
    id: "biggest_impact",
    kind: "grid",
    icon: Brain,
    callsign: "MISSION 03 · IMPACT ZONE",
    prompt: "Where will AI reshape aerospace first?",
    hint: "Tap the sector you'd bet on",
    cards: [
      { value: "maintenance", emoji: "🛠️", title: "Predictive Maintenance", desc: "Engines that warn before they fail" },
      { value: "autonomy", emoji: "🛩️", title: "Autonomous Flight", desc: "Pilotless decision-making" },
      { value: "atc", emoji: "🗼", title: "Air Traffic Control", desc: "Smarter skies, fewer delays" },
      { value: "design", emoji: "🧪", title: "Design & Simulation", desc: "AI-generated airframes" },
    ],
  },
  {
    id: "concerns",
    kind: "tags",
    icon: Radar,
    callsign: "MISSION 04 · RISK SWEEP",
    prompt: "What concerns ping your radar?",
    hint: "Tap every concern that lights up for you",
    tags: [
      { value: "safety", label: "Safety & reliability" },
      { value: "jobs", label: "Loss of human jobs" },
      { value: "cyber", label: "Cybersecurity" },
      { value: "transparency", label: "Black-box decisions" },
      { value: "regulation", label: "Slow regulation" },
      { value: "ethics", label: "Ethics & accountability" },
    ],
  },
  {
    id: "future",
    kind: "grid",
    icon: Plane,
    callsign: "MISSION 05 · FORECAST",
    prompt: "When will fully autonomous passenger flights be normal?",
    hint: "Lock in your prediction",
    cards: [
      { value: "10y", emoji: "⚡", title: "Within 10 years", desc: "Already taxiing" },
      { value: "25y", emoji: "🛫", title: "10–25 years", desc: "One generation away" },
      { value: "50y", emoji: "🌅", title: "25–50 years", desc: "Long-haul horizon" },
      { value: "never", emoji: "🚫", title: "Never", desc: "Humans stay in the loop" },
    ],
  },
  {
    id: "optimism",
    kind: "dial",
    icon: Heart,
    callsign: "MISSION 06 · ALTITUDE CHECK",
    prompt: "Overall, how optimistic are you about AI + Aerospace?",
    hint: "Set your final altitude",
    lowLabel: "Grounded",
    highLabel: "Sky-high",
  },
];

type Answers = Record<string, string | number | string[]>;

/* ---------- Radial Dial ---------- */

const RadialDial = ({
  value,
  onChange,
  lowLabel,
  highLabel,
}: {
  value: number;
  onChange: (v: number) => void;
  lowLabel: string;
  highLabel: string;
}) => {
  const size = 240;
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = Math.PI * radius; // half circle
  const offset = circumference - (value / 100) * circumference;

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    let angle = Math.atan2(-y, x) * (180 / Math.PI); // 0 right, 90 up
    if (angle < 0) angle = 0;
    if (angle > 180) angle = 180;
    const v = Math.round(((180 - angle) / 180) * 100);
    onChange(Math.max(0, Math.min(100, v)));
  };

  // Knob position
  const angle = (value / 100) * 180;
  const rad = (angle * Math.PI) / 180;
  const knobX = size / 2 + Math.cos(Math.PI - rad) * radius;
  const knobY = size / 2 - Math.sin(Math.PI - rad) * radius;

  return (
    <div className="flex flex-col items-center select-none">
      <svg
        width={size}
        height={size / 2 + 30}
        viewBox={`0 0 ${size} ${size / 2 + 30}`}
        onClick={handleClick}
        className="cursor-pointer touch-none"
      >
        <defs>
          <linearGradient id="dialGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--secondary))" />
            <stop offset="60%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
        {/* tick marks */}
        {Array.from({ length: 21 }).map((_, i) => {
          const a = (i / 20) * Math.PI;
          const r1 = radius + 4;
          const r2 = radius + (i % 5 === 0 ? 12 : 8);
          const x1 = size / 2 - Math.cos(a) * r1;
          const y1 = size / 2 - Math.sin(a) * r1;
          const x2 = size / 2 - Math.cos(a) * r2;
          const y2 = size / 2 - Math.sin(a) * r2;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="hsl(var(--muted-foreground))"
              strokeOpacity={i % 5 === 0 ? 0.6 : 0.25}
              strokeWidth={1}
            />
          );
        })}
        {/* track */}
        <path
          d={`M ${stroke / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - stroke / 2} ${size / 2}`}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        {/* progress */}
        <path
          d={`M ${stroke / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - stroke / 2} ${size / 2}`}
          fill="none"
          stroke="url(#dialGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.25s ease-out" }}
        />
        {/* knob */}
        <circle
          cx={knobX}
          cy={knobY}
          r={12}
          fill="hsl(var(--background))"
          stroke="hsl(var(--primary))"
          strokeWidth={3}
          style={{ filter: "drop-shadow(0 0 8px hsl(var(--primary) / 0.8))" }}
        />
      </svg>
      <div className="-mt-16 text-center pointer-events-none">
        <motion.div
          key={value}
          initial={{ scale: 0.85, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          className="font-display text-5xl font-bold text-gradient leading-none"
        >
          {value}
        </motion.div>
        <div className="text-xs text-muted-foreground mt-1 tracking-widest">
          / 100
        </div>
      </div>
      <div className="flex justify-between w-full max-w-xs mt-4 text-xs text-muted-foreground">
        <span>← {lowLabel}</span>
        <span>{highLabel} →</span>
      </div>
    </div>
  );
};

/* ---------- Swipe Stack ---------- */

const SwipeStack = ({
  cards,
  selected,
  onSelect,
}: {
  cards: { value: string; emoji: string; title: string; tag: string }[];
  selected?: string;
  onSelect: (v: string) => void;
}) => {
  const [index, setIndex] = useState(0);
  const visible = cards.slice(index, index + 3);

  const handleDrag = (_: unknown, info: PanInfo, value: string) => {
    if (Math.abs(info.offset.x) > 100) {
      onSelect(value);
      if (index < cards.length - 1) setIndex((i) => i + 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative h-72 w-full max-w-xs">
        <AnimatePresence>
          {visible.map((card, i) => {
            const isTop = i === 0;
            const active = selected === card.value;
            return (
              <motion.div
                key={card.value}
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => handleDrag(_, info, card.value)}
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{
                  scale: 1 - i * 0.05,
                  y: i * 12,
                  opacity: 1,
                  zIndex: 10 - i,
                }}
                exit={{ x: 300, opacity: 0, rotate: 20 }}
                whileDrag={{ rotate: 0 }}
                style={{ originY: 1 }}
                className={`absolute inset-0 rounded-2xl border bg-gradient-card flex flex-col items-center justify-center p-6 ${
                  active ? "border-primary glow-orange" : "border-border"
                } ${isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"}`}
              >
                <div className="text-7xl mb-4">{card.emoji}</div>
                <div className="font-display text-2xl font-bold text-foreground mb-1">
                  {card.title}
                </div>
                <div className="text-sm text-muted-foreground italic">"{card.tag}"</div>
                {active && (
                  <Badge className="mt-3 bg-primary text-primary-foreground">
                    <Check className="h-3 w-3 mr-1" /> Locked
                  </Badge>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {cards.map((c) => {
          const active = selected === c.value;
          return (
            <button
              key={c.value}
              onClick={() => onSelect(c.value)}
              className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                active
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {c.emoji} {c.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ---------- Persona Logic ---------- */

const computePersona = (a: Answers) => {
  const trust = (a.trust as number) ?? 50;
  const optimism = (a.optimism as number) ?? 50;
  const score = (trust + optimism) / 2;
  const concerns = (a.concerns as string[])?.length ?? 0;

  if (score >= 75 && concerns <= 1)
    return {
      name: "AI Co-Pilot",
      emoji: "🚀",
      color: "from-primary to-secondary",
      tagline: "Bold, future-forward, ready to hand the yoke to the algorithm.",
    };
  if (score >= 55)
    return {
      name: "Pragmatic Captain",
      emoji: "🧭",
      color: "from-secondary to-accent",
      tagline: "Optimistic but grounded — trust earned through evidence.",
    };
  if (score >= 35)
    return {
      name: "Cautious Engineer",
      emoji: "🛠️",
      color: "from-accent to-primary",
      tagline: "Curious about AI, but you want every safety check ticked.",
    };
  return {
    name: "Skeptical Veteran",
    emoji: "🛡️",
    color: "from-muted to-accent",
    tagline: "Humans first. AI proves itself one flight at a time.",
  };
};

/* ---------- Main Component ---------- */

const SurveySection = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ trust: 50, optimism: 50 });
  const [done, setDone] = useState(false);

  const mission = missions[step];
  const total = missions.length;
  const progress = done ? 100 : (step / total) * 100;

  const setAnswer = (value: string | number | string[]) =>
    setAnswers((p) => ({ ...p, [mission.id]: value }));

  const toggleTag = (v: string) => {
    const cur = (answers[mission.id] as string[]) ?? [];
    setAnswer(cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]);
  };

  const canProceed = () => {
    const a = answers[mission.id];
    if (mission.kind === "tags") return Array.isArray(a) && a.length > 0;
    if (mission.kind === "dial") return typeof a === "number";
    return a !== undefined && a !== "";
  };

  const next = () => {
    if (step < total - 1) setStep((s) => s + 1);
    else setDone(true);
  };
  const back = () => step > 0 && setStep((s) => s - 1);
  const restart = () => {
    setAnswers({ trust: 50, optimism: 50 });
    setStep(0);
    setDone(false);
  };

  const persona = useMemo(() => computePersona(answers), [answers]);

  /* ---------- Mission UI ---------- */

  const renderMission = () => {
    const Icon = mission.icon;
    return (
      <motion.div
        key={mission.id}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="bg-gradient-card border-border overflow-hidden relative">
          {/* corner ticks */}
          <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
          <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-primary/60" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-primary/60" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-primary/60" />

          <CardContent className="pt-8 pb-8 px-6 md:px-10">
            <div className="flex items-center gap-3 mb-2">
              <Radio className="h-3 w-3 text-primary animate-pulse" />
              <span className="text-[10px] tracking-[0.3em] text-primary font-mono">
                {mission.callsign}
              </span>
            </div>

            <div className="flex items-start gap-4 mb-8">
              <div className="h-14 w-14 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center glow-orange flex-shrink-0">
                <Icon className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight">
                  {mission.prompt}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{mission.hint}</p>
              </div>
            </div>

            {/* Mission body */}
            <div className="min-h-[18rem] flex items-center justify-center">
              {mission.kind === "dial" && (
                <RadialDial
                  value={(answers[mission.id] as number) ?? 50}
                  onChange={(v) => setAnswer(v)}
                  lowLabel={mission.lowLabel}
                  highLabel={mission.highLabel}
                />
              )}

              {mission.kind === "swipe" && (
                <SwipeStack
                  cards={mission.cards}
                  selected={answers[mission.id] as string}
                  onSelect={(v) => setAnswer(v)}
                />
              )}

              {mission.kind === "grid" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                  {mission.cards.map((c) => {
                    const active = answers[mission.id] === c.value;
                    return (
                      <motion.button
                        key={c.value}
                        onClick={() => setAnswer(c.value)}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.97 }}
                        className={`text-left p-4 rounded-xl border transition-all relative overflow-hidden ${
                          active
                            ? "border-primary bg-primary/10 glow-orange"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="text-3xl mb-2">{c.emoji}</div>
                        <div className="font-display font-bold text-foreground">
                          {c.title}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {c.desc}
                        </div>
                        {active && (
                          <Check className="absolute top-3 right-3 h-4 w-4 text-primary" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {mission.kind === "tags" && (
                <div className="flex flex-wrap gap-2 justify-center w-full">
                  {mission.tags.map((t) => {
                    const sel = (answers[mission.id] as string[]) ?? [];
                    const active = sel.includes(t.value);
                    return (
                      <motion.button
                        key={t.value}
                        onClick={() => toggleTag(t.value)}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2.5 rounded-full border text-sm font-medium transition-all ${
                          active
                            ? "border-primary bg-primary/15 text-primary glow-orange"
                            : "border-border text-foreground hover:border-primary/50"
                        }`}
                      >
                        {active && <Check className="inline h-3 w-3 mr-1" />}
                        {t.label}
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Flight-path progress */}
            <div className="mt-8 mb-6">
              <div className="relative h-1 bg-muted rounded-full">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-secondary via-primary to-accent rounded-full"
                  animate={{ width: `${((step + 1) / total) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  className="absolute -top-2 -translate-x-1/2"
                  animate={{ left: `${((step + 1) / total) * 100}%` }}
                  transition={{ duration: 0.5 }}
                >
                  <Plane className="h-5 w-5 text-primary rotate-90" />
                </motion.div>
              </div>
              <div className="flex justify-between mt-3 text-[10px] font-mono text-muted-foreground tracking-widest">
                <span>T-{String(step + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
                <span>{Math.round(((step + 1) / total) * 100)}% TRANSMITTED</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-border">
              <Button
                variant="ghost"
                onClick={back}
                disabled={step === 0}
                className="text-muted-foreground"
              >
                <ArrowLeft className="mr-1 h-4 w-4" /> Prev
              </Button>
              <Button
                onClick={next}
                disabled={!canProceed()}
                className="glow-orange hover:scale-105 transition-transform"
              >
                {step < total - 1 ? "Transmit & Continue" : "Reveal My Profile"}
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  /* ---------- Result UI ---------- */

  const renderResult = () => {
    const trust = (answers.trust as number) ?? 0;
    const optimism = (answers.optimism as number) ?? 0;
    const concerns = (answers.concerns as string[]) ?? [];
    const concernLabels =
      missions[3].kind === "tags"
        ? missions[3].tags.filter((t) => concerns.includes(t.value)).map((t) => t.label)
        : [];
    const future =
      missions[4].kind === "grid"
        ? missions[4].cards.find((c) => c.value === answers.future)
        : null;
    const impact =
      missions[2].kind === "grid"
        ? missions[2].cards.find((c) => c.value === answers.biggest_impact)
        : null;
    const vibe =
      missions[1].kind === "swipe"
        ? missions[1].cards.find((c) => c.value === answers.excitement)
        : null;

    return (
      <motion.div
        key="result"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Persona Card */}
        <Card className="bg-gradient-card border-border overflow-hidden relative">
          <div
            className={`absolute inset-0 opacity-20 bg-gradient-to-br ${persona.color}`}
          />
          <CardContent className="relative pt-10 pb-10 px-6 md:px-10 text-center">
            <Badge variant="outline" className="mb-4 border-primary/40 text-primary tracking-widest text-[10px] font-mono">
              MISSION COMPLETE · PROFILE GENERATED
            </Badge>
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 180, delay: 0.1 }}
              className="text-7xl mb-4"
            >
              {persona.emoji}
            </motion.div>
            <h3 className="font-display text-4xl md:text-5xl font-bold text-gradient mb-3">
              {persona.name}
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto italic">
              "{persona.tagline}"
            </p>
          </CardContent>
        </Card>

        {/* Telemetry Grid */}
        <div className="grid grid-cols-2 gap-3">
          <TelemetryCard icon={ShieldCheck} label="TRUST" value={trust} suffix="%" />
          <TelemetryCard icon={Heart} label="OPTIMISM" value={optimism} suffix="%" />
        </div>

        <Card className="bg-gradient-card border-border">
          <CardContent className="p-5 space-y-4">
            <ReadoutRow label="Vibe" value={vibe ? `${vibe.emoji} ${vibe.title}` : "—"} />
            <ReadoutRow label="Top impact zone" value={impact ? `${impact.emoji} ${impact.title}` : "—"} />
            <ReadoutRow label="Forecast" value={future ? `${future.emoji} ${future.title}` : "—"} />
            <div>
              <div className="text-[10px] font-mono text-muted-foreground tracking-widest mb-2">
                RADAR PINGS
              </div>
              <div className="flex flex-wrap gap-2">
                {concernLabels.length ? (
                  concernLabels.map((c) => (
                    <Badge key={c} variant="outline" className="border-primary/40 text-foreground">
                      <Radar className="h-3 w-3 mr-1 text-primary" /> {c}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">All clear</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={restart} variant="outline" className="hover:scale-105 transition-transform">
            <RotateCcw className="mr-2 h-4 w-4" /> Run Again
          </Button>
          <Button
            onClick={() => {
              const text = `I'm a ${persona.name} ${persona.emoji} on AeroAI's Aerospace + AI survey.`;
              if (navigator.share) navigator.share({ title: "AeroAI", text }).catch(() => {});
              else navigator.clipboard.writeText(text);
            }}
            className="glow-orange hover:scale-105 transition-transform"
          >
            <Share2 className="mr-2 h-4 w-4" /> Share My Profile
          </Button>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="survey" className="py-24 bg-gradient-section min-h-[calc(100vh-4rem)] relative overflow-hidden">
      {/* ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary/40"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 border-primary/40 text-primary tracking-[0.3em] text-[10px] font-mono">
            <Gauge className="h-3 w-3 mr-2" /> FLIGHT DECK · INTERACTIVE SURVEY
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Mission Briefing: AI in Aerospace
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Six missions. Dials, swipes, and signals. End with your own aerospace persona.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* mission dots */}
          {!done && (
            <div className="flex justify-center gap-2 mb-6">
              {missions.map((_, i) => (
                <motion.div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === step
                      ? "w-8 bg-primary"
                      : i < step
                        ? "w-4 bg-primary/60"
                        : "w-4 bg-muted"
                  }`}
                  layout
                />
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {done ? renderResult() : renderMission()}
          </AnimatePresence>
        </div>

        <div className="text-center mt-6 text-[10px] font-mono text-muted-foreground tracking-widest">
          {done ? "TRANSMISSION COMPLETE" : `LIVE · ${Math.round(progress)}% UPLINK`}
        </div>
      </div>
    </section>
  );
};

/* ---------- Result subcomponents ---------- */

const TelemetryCard = ({
  icon: Icon,
  label,
  value,
  suffix,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  suffix?: string;
}) => (
  <Card className="bg-gradient-card border-border relative overflow-hidden">
    <CardContent className="p-5">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4 text-primary" />
        <span className="text-[10px] font-mono tracking-widest text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="font-display text-3xl font-bold text-gradient">
        {value}
        {suffix}
      </div>
      <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-secondary to-primary"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </CardContent>
  </Card>
);

const ReadoutRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between gap-3 py-1 border-b border-border last:border-0">
    <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
      {label}
    </span>
    <span className="font-display text-sm font-semibold text-foreground text-right">
      {value}
    </span>
  </div>
);

export default SurveySection;
