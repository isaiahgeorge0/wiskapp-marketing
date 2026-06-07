"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

type Speckle = {
  id: number;
  cx: string;
  cy: string;
  r: number;
  opacity: number;
  twinkleDuration: number;
  twinkleDelay: number;
  drift: boolean;
  driftX: number;
  driftY: number;
  driftDuration: number;
};

// Deterministic pseudo-random using index — no Math.random() so SSR matches client
function generateSpeckles(count: number): Speckle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    cx: `${((i * 137.508 + 17.3) % 100).toFixed(2)}%`,
    cy: `${((i * 97.31 + 23.1) % 100).toFixed(2)}%`,
    r: 0.6 + ((i * 13.7) % 1.4),
    opacity: 0.25 + ((i * 0.137) % 0.55),
    twinkleDuration: 2 + ((i * 1.23) % 3),
    twinkleDelay: (i * 0.37) % 5,
    drift: i % 3 === 0,
    driftX: ((i * 7.3 + 5) % 40) - 20,
    driftY: ((i * 11.7 + 8) % 40) - 20,
    driftDuration: 60 + ((i * 23.1) % 30),
  }));
}

export function Speckles() {
  const reduce = useReducedMotion();
  const speckles = useMemo(() => generateSpeckles(45), []);

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      {speckles.map((s) => {
        if (reduce) {
          return (
            <circle
              key={s.id}
              cx={s.cx}
              cy={s.cy}
              r={s.r}
              fill="white"
              opacity={s.opacity * 0.7}
            />
          );
        }

        const twinkleAnim = {
          opacity: [s.opacity, s.opacity * 0.3, s.opacity],
        };
        const twinkleTrans = {
          duration: s.twinkleDuration,
          repeat: Infinity,
          ease: "easeInOut" as const,
          delay: s.twinkleDelay,
        };

        if (s.drift) {
          return (
            <motion.circle
              key={s.id}
              cx={s.cx}
              cy={s.cy}
              r={s.r}
              fill="white"
              opacity={s.opacity}
              animate={{
                ...twinkleAnim,
                x: [0, s.driftX, 0],
                y: [0, s.driftY, 0],
              }}
              transition={{
                opacity: twinkleTrans,
                x: {
                  duration: s.driftDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                y: {
                  duration: s.driftDuration * 0.85,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            />
          );
        }

        return (
          <motion.circle
            key={s.id}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill="white"
            opacity={s.opacity}
            animate={twinkleAnim}
            transition={twinkleTrans}
          />
        );
      })}
    </svg>
  );
}
