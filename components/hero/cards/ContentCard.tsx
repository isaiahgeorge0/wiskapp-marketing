"use client";

import { motion, useReducedMotion } from "framer-motion";

import { CardShell } from "@/components/hero/CardShell";

const ACCENT = "#0066ff";
const DAYS = ["M","T","W","T","F","S","S"];
const DOTS: Record<number, string> = { 1:"#aca0ff", 2:ACCENT, 4:"#016c81", 5:"#aca0ff" };

export function ContentCard() {
  const reduce = useReducedMotion();

  return (
    <CardShell>
      <div className="flex items-start gap-2.5">
        <div className="mt-0.5 h-6 w-6 shrink-0 rounded-md" style={{ background: ACCENT }} />
        <div>
          <p className="text-sm font-semibold text-white">Content calendar</p>
          <p className="text-xs text-wisk-muted">This week</p>
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        {DAYS.map((day, i) => (
          <div key={`${day}-${i}`} className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-wisk-muted">{day}</span>
            <div className="flex h-3.5 w-3.5 items-center justify-center">
              {DOTS[i] ? (
                <motion.span
                  className="block h-2 w-2 rounded-full"
                  style={{ background: DOTS[i] }}
                  animate={!reduce && (i===2||i===4) ? { scale:[1,1.4,1], opacity:[0.8,1,0.8] } : undefined}
                  transition={!reduce ? { duration:2.5, repeat:Infinity, ease:"easeInOut", delay: i===4 ? 1.2 : 0 } : undefined}
                />
              ) : (
                <span className="block h-1 w-1 rounded-full bg-white/15" />
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-wisk-muted">3 posts scheduled</p>

      <div className="mt-auto border-t border-white/8 pt-3">
        <p className="text-xs text-wisk-muted/70">Plan across every platform.</p>
      </div>
    </CardShell>
  );
}
