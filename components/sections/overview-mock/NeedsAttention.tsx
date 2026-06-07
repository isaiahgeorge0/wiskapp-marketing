"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ChevronRight } from "lucide-react";

const items = [
  {
    color: "#ef4444",
    hoverBg: "rgba(239,68,68,0.07)",
    title: "Send proposal to TechCorp",
    meta: "2d ago",
  },
  {
    color: "#F59E0B",
    hoverBg: "rgba(245,158,11,0.07)",
    title: "Brand identity project",
    meta: "Needs review",
  },
  {
    color: "#7C3AED",
    hoverBg: "rgba(124,58,237,0.07)",
    title: "Q3 revenue goal",
    meta: "23d left",
  },
];

export function NeedsAttention() {
  return (
    <div className="rounded-xl border border-white/6 bg-[#111118] p-5">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-[#F97316]" aria-hidden />
        <p className="text-sm font-semibold text-white">Needs attention</p>
      </div>

      <ul className="mt-4 space-y-0.5">
        {items.map((item) => (
          <motion.li
            key={item.title}
            className="group/row -mx-3 flex items-center gap-3 rounded-md px-3 py-2"
            whileHover={{ backgroundColor: item.hoverBg }}
            transition={{ duration: 0.15 }}
          >
            <div
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ background: item.color }}
            />
            <span className="flex-1 truncate text-sm text-white/75">{item.title}</span>
            <span className="shrink-0 text-xs text-white/35">{item.meta}</span>
            <ChevronRight
              className="h-3.5 w-3.5 shrink-0 text-white opacity-0 transition-opacity duration-150 group-hover/row:opacity-60"
              aria-hidden
            />
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
