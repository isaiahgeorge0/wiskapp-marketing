"use client";

import { motion, useReducedMotion } from "framer-motion";

import { CardShell } from "@/components/hero/CardShell";

const ACCENT = "#aca0ff";

export function ProjectsCard() {
  const reduce = useReducedMotion();

  return (
    <CardShell>
      <div className="flex items-start gap-2.5">
        <div className="mt-0.5 h-6 w-6 shrink-0 rounded-md" style={{ background: ACCENT }} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">Brand identity project</p>
          <p className="text-xs text-wisk-muted">Client project · Active</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-1 flex justify-between text-xs text-wisk-muted">
          <span>Progress</span>
          <span>70%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full"
            style={{ background: ACCENT }}
            initial={{ width: "60%" }}
            animate={{ width: reduce ? "70%" : ["60%", "60%", "70%"] }}
            transition={
              reduce ? undefined : { duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.65, 1] }
            }
          />
        </div>
        <p className="mt-2 text-xs text-wisk-muted">3 of 4 tasks complete</p>
      </div>

      <div className="mt-auto border-t border-white/8 pt-3">
        <p className="text-xs text-wisk-muted/70">Manage every project in one place.</p>
      </div>
    </CardShell>
  );
}
