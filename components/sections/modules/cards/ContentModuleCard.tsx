"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Clock, Flame } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TOTAL = 6;
const PEAK_START = 2;
const PEAK_END = 4;
const EASE = [0.37, 0, 0.63, 1] as const;

function easeIO(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const PLATFORMS = ["TikTok", "Instagram", "YouTube", "LinkedIn"] as const;

// Animated status dot for the boomerang post
function StatusDot({ published, reduce }: { published: boolean; reduce: boolean | null }) {
  return (
    <div className="relative h-2.5 w-2.5 shrink-0">
      <motion.div
        className="absolute inset-0 flex items-center justify-center rounded-full"
        style={{ background: "#F97066" }}
        animate={{ opacity: published ? 0 : 1, scale: published ? 0.7 : 1 }}
        transition={reduce ? undefined : { duration: 0.3, ease: "easeInOut" }}
      >
        <Clock className="h-[6px] w-[6px] text-white" strokeWidth={2.5} />
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center rounded-full"
        style={{ background: "#22C55E" }}
        animate={{ opacity: published ? 1 : 0, scale: published ? 1 : 0.6 }}
        transition={reduce ? undefined : { duration: 0.3, ease: [0.34, 1.2, 0.64, 1] as const }}
      >
        <Check className="h-[6px] w-[6px] text-white" strokeWidth={3} />
      </motion.div>
    </div>
  );
}

export function ContentModuleCard() {
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

  // Derived display state
  const published   = frac > 0.50;   // status dot morphs at ~1s into A→B
  const tikHighlight = frac > 0.35;   // TikTok pill lights up slightly earlier
  const streakUp    = frac > 0.65;   // streak increments slightly after publish
  const streakKey   = streakUp ? "13" : "12";
  const streakNum   = streakUp ? 13 : 12;

  return (
    <motion.div
      className="relative flex aspect-[5/4] flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#0a0a0f] p-7 md:p-8"
      style={{ boxShadow: "0 30px 80px -25px rgba(249,112,102,0.28)" }}
      whileHover={reduce ? undefined : {
        y: -4,
        boxShadow: "0 40px 100px -25px rgba(249,112,102,0.42)",
        transition: { duration: 0.25, ease: EASE },
      }}
      role="img"
      aria-label="Preview of the WISK content calendar showing a scheduled post being published"
    >
      {/* ── Header ── */}
      <div className="flex items-start gap-3">
        <div className="mt-0.5 h-10 w-10 shrink-0 rounded-md bg-[#F97066]" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-semibold text-white">Content calendar</p>
          <p className="text-sm text-white/50">This week · 5 scheduled</p>
        </div>
        {/* Streak pill */}
        <div className="flex shrink-0 items-center gap-1.5 rounded-md bg-[rgba(249,112,102,0.15)] px-2.5 py-1">
          <motion.div
            animate={!reduce && streakUp ? { scale: [1, 1.25, 1] } : { scale: 1 }}
            transition={!reduce ? { duration: 0.3, ease: "easeOut" as const } : undefined}
          >
            <Flame className="h-3 w-3 text-[#F97066]" aria-hidden />
          </motion.div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={streakKey}
              className="tabular-nums text-xs font-medium text-[#fca79a]"
              initial={reduce ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              {streakNum}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Platform pills ── */}
      <div className="mt-6 flex flex-wrap gap-2">
        {PLATFORMS.map((p) => (
          <motion.span
            key={p}
            className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-white/60"
            animate={
              p === "TikTok" && !reduce
                ? { backgroundColor: tikHighlight ? "rgba(249,112,102,0.20)" : "rgba(0,0,0,0)" }
                : undefined
            }
            transition={!reduce ? { duration: 0.4 } : undefined}
          >
            {p}
          </motion.span>
        ))}
      </div>

      {/* ── Post list ── */}
      <div className="mt-4 space-y-0.5">
        {/* Static: Published */}
        <div className="flex items-center gap-3 py-1.5">
          <div
            className="flex h-2.5 w-2.5 shrink-0 items-center justify-center rounded-full"
            style={{ background: "#22C55E" }}
          >
            <Check className="h-[6px] w-[6px] text-white" strokeWidth={3} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm text-white/85">Brand identity case study</p>
            <p className="text-xs text-white/40">Instagram · Mon</p>
          </div>
        </div>

        {/* Animated: Scheduled ↔ Published */}
        <div className="flex items-center gap-3 py-1.5">
          <StatusDot published={published} reduce={reduce} />
          <div className="min-w-0 flex-1">
            <p className="text-sm text-white/85">Behind the scenes of WISK</p>
            <p className="text-xs text-white/40">TikTok · Wed</p>
          </div>
        </div>

        {/* Static: Draft */}
        <div className="flex items-center gap-3 py-1.5">
          <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#6B7280]" />
          <div className="min-w-0 flex-1">
            <p className="text-sm text-white/85">Why we built WISK</p>
            <p className="text-xs text-white/40">YouTube · Fri</p>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="mt-auto border-t border-white/5 pt-5">
        <p className="text-xs text-white/40">Every scheduled post flows into your weekly view.</p>
      </div>
    </motion.div>
  );
}
