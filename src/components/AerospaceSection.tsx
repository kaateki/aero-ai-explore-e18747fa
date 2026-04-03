import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wind, Zap, Shield, Cpu, Gauge, Globe } from "lucide-react";

const disciplines = [
  {
    icon: Wind,
    title: "Aerodynamics",
    short: "Study of air flow around aircraft",
    detail: "Aerodynamics is the branch of physics that deals with the motion of air and its interaction with solid bodies like aircraft wings. Engineers use computational fluid dynamics (CFD) to design wing profiles that maximize lift while minimizing drag, enabling fuel-efficient flight.",
    color: "text-aero-blue",
    diagram: {
      label: "Wing Cross-Section Forces",
      items: [
        { name: "Lift ↑", desc: "Low pressure above wing" },
        { name: "Drag ←", desc: "Air resistance opposing motion" },
        { name: "Thrust →", desc: "Engine propulsion force" },
        { name: "Weight ↓", desc: "Gravity pulling down" },
      ],
    },
    stats: [
      { label: "Lift-to-Drag", value: "17:1", unit: "ratio (Boeing 787)" },
      { label: "Cruise Speed", value: "Mach 0.85", unit: "~900 km/h" },
    ],
  },
  {
    icon: Zap,
    title: "Propulsion",
    short: "Engines that power flight",
    detail: "Propulsion systems generate the thrust needed to overcome drag. From turbofan engines in commercial jets to scramjets for hypersonic flight, propulsion engineering pushes the boundaries of speed and efficiency. Modern engines can produce over 100,000 pounds of thrust.",
    color: "text-primary",
    diagram: {
      label: "Turbofan Engine Stages",
      items: [
        { name: "Fan", desc: "Intake & bypass air" },
        { name: "Compressor", desc: "Pressurize air 30:1" },
        { name: "Combustion", desc: "Fuel ignition ~1,700°C" },
        { name: "Turbine", desc: "Extract energy, drive fan" },
      ],
    },
    stats: [
      { label: "Max Thrust", value: "110,000", unit: "lbs (GE9X)" },
      { label: "Bypass Ratio", value: "10:1", unit: "modern turbofan" },
    ],
  },
  {
    icon: Shield,
    title: "Structures",
    short: "Building airframes that last",
    detail: "Structural engineers design aircraft to withstand extreme forces — turbulence, pressure differentials, and temperature swings from -60°C at altitude to scorching runway surfaces. Advanced composites like carbon fiber now make up over 50% of modern aircraft bodies.",
    color: "text-secondary",
    diagram: {
      label: "Material Composition (Modern Jet)",
      items: [
        { name: "Carbon Fiber", desc: "50% — lightweight, strong" },
        { name: "Aluminum", desc: "20% — traditional, proven" },
        { name: "Titanium", desc: "15% — heat resistant" },
        { name: "Steel & Other", desc: "15% — landing gear, bolts" },
      ],
    },
    stats: [
      { label: "Wing Flex", value: "±8m", unit: "under load (A350)" },
      { label: "Fatigue Life", value: "90,000", unit: "flight cycles" },
    ],
  },
  {
    icon: Cpu,
    title: "Avionics",
    short: "Electronic brain of the aircraft",
    detail: "Avionics encompasses all electronic systems aboard an aircraft: flight management computers, navigation systems, communication, radar, and autopilot. Modern fly-by-wire systems replace mechanical controls with electronic signals for more precise maneuvers.",
    color: "text-aero-purple",
    diagram: {
      label: "Avionics Architecture",
      items: [
        { name: "FMC", desc: "Flight Management Computer" },
        { name: "INS/GPS", desc: "Navigation & positioning" },
        { name: "TCAS", desc: "Traffic collision avoidance" },
        { name: "FBW", desc: "Fly-by-wire control" },
      ],
    },
    stats: [
      { label: "Sensors", value: "10,000+", unit: "per aircraft" },
      { label: "Code Lines", value: "100M+", unit: "in flight systems" },
    ],
  },
  {
    icon: Gauge,
    title: "Flight Mechanics",
    short: "Physics of aircraft motion",
    detail: "Flight mechanics studies stability, control, and performance of aircraft. Engineers analyze how aircraft respond to control inputs and disturbances, ensuring safe and predictable behavior across all flight conditions from takeoff to landing.",
    color: "text-aero-pink",
    diagram: {
      label: "Three Axes of Flight",
      items: [
        { name: "Pitch", desc: "Nose up/down — Elevators" },
        { name: "Roll", desc: "Wing tilt — Ailerons" },
        { name: "Yaw", desc: "Nose left/right — Rudder" },
        { name: "Trim", desc: "Fine-tuning stability" },
      ],
    },
    stats: [
      { label: "Max G-Force", value: "2.5g", unit: "commercial limit" },
      { label: "Takeoff Speed", value: "250", unit: "km/h (A320)" },
    ],
  },
  {
    icon: Globe,
    title: "Space Systems",
    short: "Beyond Earth's atmosphere",
    detail: "Aerospace extends beyond our atmosphere. Space systems engineering covers satellite design, orbital mechanics, launch vehicle engineering, and life support systems. From GPS satellites to Mars rovers, aerospace engineers push humanity's reach.",
    color: "text-aero-teal",
    diagram: {
      label: "Orbital Mechanics Essentials",
      items: [
        { name: "LEO", desc: "160–2,000 km — ISS, Starlink" },
        { name: "MEO", desc: "2,000–35,786 km — GPS" },
        { name: "GEO", desc: "35,786 km — comm satellites" },
        { name: "Escape", desc: "11.2 km/s — leave Earth" },
      ],
    },
    stats: [
      { label: "ISS Speed", value: "27,600", unit: "km/h" },
      { label: "Active Sats", value: "7,500+", unit: "in orbit" },
    ],
  },
];

const AerospaceSection = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="aerospace" className="py-24 bg-gradient-section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gradient">
            What is Aerospace Engineering?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A multidisciplinary field that designs, builds, and maintains aircraft, spacecraft, and related systems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {disciplines.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card
                className="bg-gradient-card border-border hover:border-primary/40 transition-all duration-300 cursor-pointer group hover:scale-[1.02]"
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <d.icon className={`h-8 w-8 ${d.color} group-hover:scale-110 transition-transform`} />
                    <CardTitle className="font-display text-lg">{d.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-2">{d.short}</p>

                  <AnimatePresence>
                    {expanded === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-foreground/80 mt-3 border-t border-border pt-3">
                          {d.detail}
                        </p>

                        <div className="mt-4 p-3 rounded-lg bg-background/50 border border-border">
                          <p className="text-xs font-semibold text-primary mb-2 font-display">{d.diagram.label}</p>
                          <div className="grid grid-cols-2 gap-2">
                            {d.diagram.items.map((item) => (
                              <div key={item.name} className="text-xs p-2 rounded bg-muted/50">
                                <span className="font-semibold text-foreground">{item.name}</span>
                                <br />
                                <span className="text-muted-foreground">{item.desc}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-3 flex gap-3">
                          {d.stats.map((s) => (
                            <div key={s.label} className="flex-1 p-2 rounded-lg bg-primary/5 border border-primary/10 text-center">
                              <p className="text-lg font-bold text-primary font-display">{s.value}</p>
                              <p className="text-[10px] text-muted-foreground">{s.label}</p>
                              <p className="text-[10px] text-muted-foreground/70">{s.unit}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button className="text-xs text-primary mt-2 hover:underline">
                    {expanded === i ? "Show Less" : "Learn More →"}
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AerospaceSection;
