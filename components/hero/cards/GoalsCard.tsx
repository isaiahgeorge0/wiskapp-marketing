"use client";

import { motion, useReducedMotion } from "framer-motion";

import { CardShell } from "@/components/hero/CardShell";

const ACCENT = "#baf7e1";

const POINTS = [[0,30],[20,24],[40,20],[60,22],[80,12],[100,8],[120,2]];
const PATH = POINTS.map(([x,y],i) => `${i===0?"M":"L"} ${x} ${y}`).join(" ");

export function GoalsCard() {
  const reduce = useReducedMotion();

  return (
    <CardShell>
      <div className="flex items-start gap-2.5">
        <div className="mt-0.5 h-6 w-6 shrink-0 rounded-md" style={{ background: ACCENT }} />
        <div>
          <p className="text-sm font-semibold text-white">Q3 revenue goal</p>
          <p className="text-xs text-wisk-muted">£12,400 of £20,000</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-1 flex justify-between text-xs text-wisk-muted">
          <span>Progress</span>
          <span>62%</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full"
            style={{ background: ACCENT }}
            initial={{ width: "58%" }}
            animate={{ width: reduce ? "62%" : ["58%", "58%", "62%"] }}
            transition={
              reduce ? undefined : { duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.6, 1] }
            }
          />
        </div>
        <p className="mt-2 text-xs text-wisk-muted">23 days remaining</p>
      </div>

      <div className="mt-3">
        <svg viewBox="0 0 120 32" width={100} height={24} fill="none" aria-hidden>
          {reduce ? (
            <path d={PATH} stroke={ACCENT} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.8} />
          ) : (
            <motion.path
              d={PATH}
              stroke={ACCENT}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0.5 }}
              animate={{ pathLength: 1, opacity: 0.9 }}
              transition={{ duration: 1.2, ease: [0.22,1,0.36,1] }}
            />
          )}
          {POINTS.map(([x,y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={1.5} fill={ACCENT} opacity={0.6} />
          ))}
        </svg>
      </div>

      <div className="mt-auto border-t border-white/8 pt-3">
        <p className="text-xs text-wisk-muted/70">Set targets, track progress.</p>
      </div>
    </CardShell>
  );
}
