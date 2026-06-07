"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ACCENT_COLORS = {
  purple: { dot: "#7C3AED", subtext: "#a78bfa", glow: "rgba(124,58,237,0.35)" },
  teal:   { dot: "#14B8A6", subtext: "#2dd4bf", glow: "rgba(20,184,166,0.35)" },
  amber:  { dot: "#F59E0B", subtext: "#fbbf24", glow: "rgba(245,158,11,0.35)"  },
  coral:  { dot: "#F97316", subtext: "#fb923c", glow: "rgba(249,115,22,0.35)"  },
} as const;

type Accent = keyof typeof ACCENT_COLORS;

type StatCardProps = {
  label: string;
  value: string;
  accent: Accent;
  subtext?: string;
  countUp?: boolean;
  /** Value to display when hovered — creates a live-data illusion */
  hoverValue?: string;
};

function useCountUp(target: number, enabled: boolean, inView: boolean) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!enabled || !inView || started.current) return;
    started.current = true;

    const duration = 1200;
    const steps = 40;
    const interval = duration / steps;
    let step = 0;

    const id = setInterval(() => {
      step++;
      const eased = 1 - Math.pow(1 - step / steps, 3);
      setCount(Math.round(eased * target));
      if (step >= steps) {
        clearInterval(id);
        setCount(target);
      }
    }, interval);

    return () => clearInterval(id);
  }, [target, enabled, inView]);

  return count;
}

export function StatCard({
  label,
  value,
  accent,
  subtext,
  countUp = false,
  hoverValue,
}: StatCardProps) {
  const reduce = useReducedMotion();
  const colors = ACCENT_COLORS[accent];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [isHovered, setIsHovered] = useState(false);

  const numericTarget = parseInt(value, 10);
  const isNumeric = !isNaN(numericTarget) && countUp;
  const displayCount = useCountUp(numericTarget, isNumeric && !reduce, inView);
  const baseValue = isNumeric && !reduce ? String(displayCount) : value;

  // Only show hover value when hovering, has a value, and motion is allowed
  const showHover = !reduce && isHovered && hoverValue !== undefined;
  const displayValue = showHover ? hoverValue! : baseValue;
  const valueKey = showHover ? "hover" : "base";

  const isPulse = accent === "teal" && !reduce;

  const hoverCard = reduce
    ? undefined
    : {
        y: -4,
        boxShadow: `0 12px 40px -12px ${colors.glow}`,
        transition: { duration: 0.2, ease: "easeOut" as const },
      };

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-1 rounded-xl border border-white/6 bg-[#111118] p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
      whileHover={hoverCard}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Accent dot */}
      <div className="mb-1 flex items-center gap-2">
        {isPulse ? (
          <motion.div
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ background: colors.dot }}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : (
          <div className="h-2 w-2 shrink-0 rounded-full" style={{ background: colors.dot }} />
        )}
      </div>

      {/* Value — AnimatePresence for hover number swap */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={valueKey}
          className="text-3xl font-bold leading-none text-white tabular-nums"
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          {displayValue}
        </motion.p>
      </AnimatePresence>

      {/* Label */}
      <p className="mt-0.5 text-xs text-white/55">{label}</p>

      {/* Subtext */}
      {subtext && (
        <p className="mt-1 text-xs font-medium" style={{ color: colors.subtext }}>
          {subtext}
        </p>
      )}
    </motion.div>
  );
}
