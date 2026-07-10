"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const TOTAL = 6;
const PEAK_START = 2;
const PEAK_END = 4;
const EASE = [0.37, 0, 0.63, 1] as const;

function easeIO(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

type Stage = {
  label: string;
  // resting and peak bar widths (%)
  restW: number;
  peakW: number;
  // resting and peak counts
  restCount: number;
  peakCount: number;
  depth: number; // opacity tier for the bar fill
};

const STAGES: Stage[] = [
  { label: "New",       restW: 80, peakW: 80, restCount: 3, peakCount: 3, depth: 1 },
  { label: "Contacted", restW: 65, peakW: 65, restCount: 2, peakCount: 2, depth: 2 },
  { label: "Qualified", restW: 45, peakW: 35, restCount: 2, peakCount: 1, depth: 3 },
  { label: "Proposal",  restW: 30, peakW: 45, restCount: 1, peakCount: 2, depth: 4 },
  { label: "Won",       restW: 20, peakW: 20, restCount: 1, peakCount: 1, depth: 5 },
] as const;

// Teal opacity scale for bar fills
const DEPTH_COLOR = [
  "rgba(255,93,0,0.28)",
  "rgba(255,93,0,0.40)",
  "rgba(255,93,0,0.52)",
  "rgba(255,93,0,0.65)",
  "rgba(255,93,0,0.85)",
];

// Animated count badge
function AnimCount({
  rest, peak, atPeak,
}: { rest: number; peak: number; atPeak: boolean }) {
  const key = atPeak ? String(peak) : String(rest);
  const val = atPeak ? peak : rest;
  if (rest === peak) return <span className="w-6 text-right text-xs text-white/40">{val}</span>;
  return (
    <div className="w-6 overflow-hidden text-right">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={key}
          className="block text-xs text-white/40 tabular-nums"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.15 }}
        >
          {val}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// Animated stage label on the active lead card
function StageLabel({
  atPeak, reduce,
}: { atPeak: boolean; reduce: boolean | null }) {
  const label = atPeak ? "Proposal" : "Qualified";
  return (
    <div className="overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={label}
          className="block text-xs text-white/50"
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// Animated value pill
function ValuePill({
  value, reduce,
}: { value: number; reduce: boolean | null }) {
  const formatted = `£${value.toLocaleString("en-GB")}`;
  return (
    <span className="shrink-0 rounded-md bg-[#ff5d00]/15 px-2.5 py-1 text-xs font-medium text-[#ff8a4d] tabular-nums">
      {formatted}
    </span>
  );
}

export function LeadsModuleCard() {
  const reduce = useReducedMotion();
  const [frac, setFrac] = useState(reduce ? 1 : 0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduce) { setFrac(1); return; }

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = ((now - startRef.current) / 1000) % TOTAL;

      let f: number;
      if (elapsed < PEAK_START)      f = easeIO(elapsed / PEAK_START);
      else if (elapsed < PEAK_END)   f = 1;
      else                           f = 1 - easeIO((elapsed - PEAK_END) / (TOTAL - PEAK_END));

      setFrac(f);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, [reduce]);

  // Discrete threshold — stage label / counts swap at ~1s into A→B
  const atPeak = frac > 0.45;

  // Continuous — bar widths and value animate smoothly
  const qualW = `${Math.round(45 - frac * 10)}%`;
  const propW = `${Math.round(30 + frac * 15)}%`;
  const value = Math.round(14200 + frac * 3200); // 14200 → 17400

  // Subtle pickup motion: bell curves around transition midpoints
  const pickupY =
    -(Math.exp(-Math.pow((frac - 0.30) / 0.12, 2)) +
      Math.exp(-Math.pow((frac - 0.75) / 0.12, 2))) * 4;

  return (
    <motion.div
      className="relative flex aspect-auto flex-col overflow-hidden rounded-2xl border border-wisk-border bg-wisk-card p-7 md:aspect-[5/4] md:p-8"
      style={{ boxShadow: "0 30px 80px -25px rgba(255,93,0,0.28)" }}
      whileHover={reduce ? undefined : {
        y: -4,
        boxShadow: "0 40px 100px -25px rgba(255,93,0,0.42)",
        transition: { duration: 0.25, ease: EASE },
      }}
      role="img"
      aria-label="Preview of the WISK lead pipeline showing a deal moving from Qualified to Proposal stage"
    >
      {/* ── Header ── */}
      <div className="flex items-start gap-3">
        <div className="mt-0.5 h-10 w-10 shrink-0 rounded-md bg-[#ff5d00]" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-semibold text-white">Lead pipeline</p>
          <p className="text-sm text-white/50">This month · 8 active</p>
        </div>
        <ValuePill value={value} reduce={reduce} />
      </div>

      {/* ── Pipeline stage bars ── */}
      <div className="mt-7 space-y-2.5">
        {STAGES.map((s, i) => {
          const isQual = s.label === "Qualified";
          const isProp = s.label === "Proposal";
          const width = isQual ? qualW : isProp ? propW : `${s.restW}%`;
          const isAnim = isQual || isProp;

          return (
            <div key={s.label} className="flex items-center gap-3">
              <span className="w-20 shrink-0 text-xs text-white/55">{s.label}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: DEPTH_COLOR[i] }}
                  animate={{ width }}
                  transition={isAnim && !reduce ? { duration: 0.08 } : undefined}
                />
              </div>
              <AnimCount
                rest={s.restCount}
                peak={s.peakCount}
                atPeak={atPeak}
              />
            </div>
          );
        })}
      </div>

      {/* ── Active lead card ── */}
      <motion.div
        className="mt-5 flex items-center gap-3 rounded-lg border border-white/8 bg-white/[0.03] p-3"
        animate={reduce ? undefined : { y: pickupY }}
        transition={reduce ? undefined : { duration: 0.05 }}
      >
        {/* Avatar */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ff5d00]/20">
          <span className="text-xs font-semibold text-[#ff8a4d]">M</span>
        </div>
        {/* Details */}
        <div className="min-w-0 flex-1">
          <p className="text-sm text-white/85">Maya Chen</p>
          <StageLabel atPeak={atPeak} reduce={reduce} />
        </div>
        <span className="shrink-0 text-sm text-white/70">£3,200</span>
      </motion.div>

      {/* ── Footer ── */}
      <div className="mt-auto border-t border-white/5 pt-5">
        <p className="text-xs text-white/40">
          Every stage change updates your pipeline value automatically.
        </p>
      </div>
    </motion.div>
  );
}
