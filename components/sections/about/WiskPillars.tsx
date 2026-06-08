"use client";

import { motion, useReducedMotion } from "framer-motion";

type Pillar = {
  letter: string;
  name: string;
  accent: string;
  description: string;
  orbit: {
    x: number[];
    y: number[];
    duration: number;
    delay: number;
  };
  ariaLabel: string;
};

const pillars: Pillar[] = [
  {
    letter: "W",
    name: "WISDOM",
    accent: "#A78BFA",
    description: "Data is not understanding.",
    orbit: { x: [0, 6, 0, -6, 0], y: [0, -4, 0, 4, 0], duration: 6, delay: 0 },
    ariaLabel: "Wisdom. Data is not understanding.",
  },
  {
    letter: "I",
    name: "INTEGRITY",
    accent: "#7DD3FC",
    description: "Tools we trust with our work should be worth that trust.",
    orbit: { x: [0, -5, 0, 5, 0], y: [0, 5, 0, -5, 0], duration: 7.2, delay: 0.8 },
    ariaLabel: "Integrity. Tools we trust with our work should be worth that trust.",
  },
  {
    letter: "S",
    name: "STRENGTH",
    accent: "#5EEAD4",
    description: "Ambition is heavy. The things that hold it must be built properly.",
    orbit: { x: [0, 7, 0, -7, 0], y: [0, 6, 0, -6, 0], duration: 5.5, delay: 1.5 },
    ariaLabel: "Strength. Ambition is heavy. The things that hold it must be built properly.",
  },
  {
    letter: "K",
    name: "KNOWLEDGE",
    accent: "#FCD34D",
    description: "The longer it pays attention, the more it should have to say.",
    orbit: { x: [0, -6, 0, 6, 0], y: [0, -5, 0, 5, 0], duration: 6.8, delay: 0.4 },
    ariaLabel: "Knowledge. The longer it pays attention, the more it should have to say.",
  },
];

type PillarUnitProps = {
  pillar: Pillar;
  reduce: boolean | null;
};

function PillarUnit({ pillar, reduce }: PillarUnitProps) {
  return (
    <div
      role="listitem"
      aria-label={pillar.ariaLabel}
      className="flex flex-col items-center gap-3"
    >
      {/* Orbital stage — invisible bounding box the circle drifts within */}
      <motion.div
        aria-hidden
        className="relative flex items-center justify-center"
        style={{ width: 88, height: 88 }}
        animate={
          reduce
            ? undefined
            : { x: pillar.orbit.x, y: pillar.orbit.y }
        }
        transition={
          reduce
            ? undefined
            : {
                duration: pillar.orbit.duration,
                delay: pillar.orbit.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        whileHover={
          reduce
            ? undefined
            : { scale: 1.05, transition: { duration: 0.2, ease: "easeOut" } }
        }
      >
        {/* Circle */}
        <div
          className="flex h-[88px] w-[88px] items-center justify-center rounded-full md:h-[88px] md:w-[88px]"
          style={{
            border: `1px solid ${pillar.accent}66`, // 40% opacity
            background: `radial-gradient(circle at 50% 50%, ${pillar.accent}26 0%, transparent 70%)`,
          }}
        >
          <span
            className="text-3xl font-bold text-white md:text-4xl"
            aria-hidden
          >
            {pillar.letter}
          </span>
        </div>
      </motion.div>

      {/* Name */}
      <p
        className="mt-1 text-xs font-medium tracking-[0.2em] md:text-sm"
        style={{ color: `${pillar.accent}CC` }} // 80% opacity
        aria-hidden
      >
        {pillar.name}
      </p>

      {/* Description */}
      <p
        className="mx-auto max-w-[180px] text-center text-xs leading-relaxed text-white/50 md:text-sm"
        aria-hidden
      >
        {pillar.description}
      </p>
    </div>
  );
}

export function WiskPillars() {
  const reduce = useReducedMotion();

  return (
    <div
      role="list"
      aria-label="The four pillars of WISK"
      className="mx-auto my-16 grid max-w-3xl grid-cols-2 gap-10 md:my-20 md:grid-cols-4 md:gap-6"
    >
      {pillars.map((pillar) => (
        <PillarUnit key={pillar.letter} pillar={pillar} reduce={reduce} />
      ))}
    </div>
  );
}
