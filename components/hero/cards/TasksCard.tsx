"use client";

import { motion, useReducedMotion } from "framer-motion";

import { CardShell } from "@/components/hero/CardShell";

const ACCENT = "#2dd4bf";

const tasks = [
  { priority: "high" as const, label: "Send proposal" },
  { priority: "med" as const, label: "Review feedback" },
  { priority: "low" as const, label: "Update portfolio" },
];

const badge = {
  high: { bg: "#F97316", text: "#fff", label: "High" },
  med: { bg: "#F59E0B", text: "#1a1a1a", label: "Med" },
  low: { bg: "rgba(255,255,255,0.12)", text: "#94a3b8", label: "Low" },
};

export function TasksCard() {
  const reduce = useReducedMotion();

  return (
    <CardShell>
      <div className="flex items-start gap-2.5">
        <div className="mt-0.5 h-6 w-6 shrink-0 rounded-md" style={{ background: ACCENT }} />
        <div>
          <p className="text-sm font-semibold text-white">Today</p>
          <p className="text-xs text-wisk-muted">3 due · 1 overdue</p>
        </div>
      </div>

      <ul className="mt-4 space-y-2.5">
        {tasks.map((t) => {
          const b = badge[t.priority];
          return (
            <li key={t.label} className="flex items-center gap-2">
              {t.priority === "high" && !reduce ? (
                <motion.span
                  className="shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-medium"
                  style={{ background: b.bg, color: b.text }}
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {b.label}
                </motion.span>
              ) : (
                <span
                  className="shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-medium"
                  style={{ background: b.bg, color: b.text }}
                >
                  {b.label}
                </span>
              )}
              <span className="truncate text-xs text-wisk-muted">{t.label}</span>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto border-t border-white/8 pt-3">
        <p className="text-xs text-wisk-muted/70">Track what needs doing.</p>
      </div>
    </CardShell>
  );
}
