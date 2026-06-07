"use client";

import { motion } from "framer-motion";
import { Calendar, ChevronRight } from "lucide-react";

const days = [
  {
    label: "Today",
    items: ["Client call · 2pm", "Publish reel · 6pm"],
  },
  {
    label: "Tomorrow",
    items: ["Review designs · Brand project"],
  },
  {
    label: "Friday",
    items: ["Q3 goal check-in"],
  },
];

export function ThisWeek() {
  return (
    <div className="rounded-xl border border-white/6 bg-[#111118] p-5">
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-[#14B8A6]" aria-hidden />
        <p className="text-sm font-semibold text-white">This week</p>
      </div>

      <div className="mt-4 space-y-4">
        {days.map((day) => (
          <div key={day.label}>
            <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-white/35">
              {day.label}
            </p>
            <ul className="space-y-0.5">
              {day.items.map((item) => (
                <motion.li
                  key={item}
                  className="group/row -mx-3 flex items-center gap-2 rounded-md px-3 py-1.5"
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  transition={{ duration: 0.15 }}
                >
                  <span className="h-1 w-1 shrink-0 rounded-full bg-white/30" />
                  <span className="flex-1 text-sm text-white/75">{item}</span>
                  <ChevronRight
                    className="h-3.5 w-3.5 shrink-0 text-white opacity-0 transition-opacity duration-150 group-hover/row:opacity-60"
                    aria-hidden
                  />
                </motion.li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
