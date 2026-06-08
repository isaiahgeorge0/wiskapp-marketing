"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ── Boomerang timing (seconds) ─────────────────────────────────────────
const TOTAL = 6;       // full loop duration
const PEAK_START = 2.5;
const PEAK_END = 3.5;
// Ease helpers — sine in-out approximation via cubic-bezier steps
const EASE = [0.37, 0, 0.63, 1] as const;

// ── Static checked task ─────────────────────────────────────────────────
function StaticTask({ label, checked }: { label: string; checked: boolean }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div
        className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-sm"
        style={
          checked
            ? { background: "#7C3AED" }
            : { border: "1px solid rgba(255,255,255,0.2)", background: "transparent" }
        }
      >
        {checked && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}
      </div>
      <span
        className="text-sm"
        style={
          checked
            ? { textDecoration: "line-through", opacity: 0.45, color: "rgba(255,255,255,0.8)" }
            : { color: "rgba(255,255,255,0.8)" }
        }
      >
        {label}
      </span>
    </div>
  );
}

// ── Animated task (the boomerang task) ─────────────────────────────────
function AnimatedTask({ checked, reduce }: { checked: boolean; reduce: boolean | null }) {
  return (
    <div className="flex items-center gap-3 py-2">
      {/* Checkbox */}
      <div className="relative h-[18px] w-[18px] shrink-0">
        {/* Unchecked border — fades out when checked */}
        <motion.div
          className="absolute inset-0 rounded-sm"
          style={{ border: "1px solid rgba(255,255,255,0.2)" }}
          animate={{ opacity: checked ? 0 : 1 }}
          transition={reduce ? undefined : { duration: 0.2, ease: "easeInOut" }}
        />
        {/* Checked fill — fades in when checked */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center rounded-sm"
          style={{ background: "#7C3AED" }}
          animate={{ opacity: checked ? 1 : 0, scale: checked ? 1 : 0.7 }}
          transition={
            reduce
              ? undefined
              : {
                  opacity: { duration: 0.2, ease: "easeInOut" },
                  scale: { duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }, // slight bounce
                }
          }
        >
          <motion.div
            animate={{ scale: checked ? 1 : 0 }}
            transition={
              reduce ? undefined : { duration: 0.2, delay: 0.05, ease: [0.34, 1.56, 0.64, 1] }
            }
          >
            <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
          </motion.div>
        </motion.div>
      </div>

      {/* Label */}
      <motion.span
        className="text-sm"
        animate={
          checked
            ? { opacity: 0.45, textDecoration: "line-through" as const }
            : { opacity: 0.8, textDecoration: "none" as const }
        }
        transition={reduce ? undefined : { duration: 0.25, delay: checked ? 0.1 : 0 }}
        style={{ color: "rgba(255,255,255,0.8)" }}
      >
        Final delivery
      </motion.span>
    </div>
  );
}

// ── Main card ───────────────────────────────────────────────────────────
export function ProjectsModuleCard() {
  const reduce = useReducedMotion();

  // Progress: 0–100 (we'll display 50 + progress*25 mapped to 50–75)
  const [progress, setProgress] = useState(reduce ? 75 : 50);
  const [checked, setChecked] = useState(reduce ? true : false);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduce) {
      setProgress(75);
      setChecked(true);
      return;
    }

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = ((now - startRef.current) / 1000) % TOTAL; // 0..TOTAL

      // Compute progress fraction (0=50%, 1=75%) using a smooth curve
      let frac: number;
      if (elapsed < PEAK_START) {
        // Ease A→B over 2.5s
        const t = elapsed / PEAK_START;
        frac = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; // ease-in-out-cubic
      } else if (elapsed < PEAK_END) {
        // Hold at B
        frac = 1;
      } else {
        // Ease B→A over 2.5s
        const t = (elapsed - PEAK_END) / (TOTAL - PEAK_END);
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        frac = 1 - ease;
      }

      setProgress(Math.round(50 + frac * 25)); // 50–75

      // Checkbox: checked when fraction > 0.35 (corresponds to ~1s)
      setChecked(frac > 0.35);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [reduce]);

  const barWidth = `${progress}%`;
  const percentLabel = `${progress}%`;

  return (
    <motion.div
      className="relative flex aspect-auto flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#0a0a0f] p-7 md:aspect-[5/4] md:p-8"
      style={{
        boxShadow: "0 30px 80px -25px rgba(124,58,237,0.30)",
      }}
      whileHover={
        reduce
          ? undefined
          : {
              y: -4,
              boxShadow: "0 40px 100px -25px rgba(124,58,237,0.42)",
              transition: { duration: 0.25, ease: EASE },
            }
      }
      role="img"
      aria-label="Preview of a WISK project card showing progress and tasks"
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="mt-0.5 h-10 w-10 shrink-0 rounded-md bg-[#7C3AED]" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-semibold text-white">Brand identity project</p>
          <p className="text-sm text-white/50">Client project · Active</p>
        </div>
        <span className="shrink-0 rounded-md bg-purple-500/15 px-2.5 py-1 text-xs font-medium text-purple-300">
          Active
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm text-white/60">Progress</span>
          <span className="text-sm font-medium text-white tabular-nums">{percentLabel}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-purple-600 to-purple-400"
            animate={{ width: barWidth }}
            transition={reduce ? undefined : { duration: 0.05 }} // driven by rAF, keep transition near-instant
          />
        </div>
      </div>

      {/* Task list */}
      <div className="mt-7">
        <StaticTask label="Initial concepts" checked />
        <StaticTask label="Color palette" checked />
        <AnimatedTask checked={checked} reduce={reduce} />
        <StaticTask label="Send to client" checked={false} />
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-white/5 pt-5">
        <p className="text-xs text-white/40">
          Each project rolls up into your overview&apos;s stats and attention list.
        </p>
      </div>
    </motion.div>
  );
}
