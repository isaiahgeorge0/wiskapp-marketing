"use client";

import { motion, useReducedMotion } from "framer-motion";

import { BrowserChrome } from "@/components/sections/overview-mock/BrowserChrome";
import { NeedsAttention } from "@/components/sections/overview-mock/NeedsAttention";
import { StatCard } from "@/components/sections/overview-mock/StatCard";
import { ThisWeek } from "@/components/sections/overview-mock/ThisWeek";

const REST_SHADOW =
  "0 40px 120px -30px rgba(195,255,50,0.25), 0 0 0 1px rgba(255,255,255,0.04)";
const LIFT_SHADOW =
  "0 50px 140px -30px rgba(195,255,50,0.20), 0 0 0 1px rgba(255,255,255,0.06)";

export function OverviewMock() {
  const reduce = useReducedMotion();

  return (
    // group class lets the inner glow overlay use group-hover via CSS
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-wisk-border bg-wisk-card"
      style={{ boxShadow: REST_SHADOW }}
      // Continuous float — y + rotation + shadow shift, all on the same 4.5s loop
      animate={
        reduce
          ? undefined
          : {
              y: [0, -10, 0],
              rotate: [0, 0.3, 0, -0.3, 0],
              boxShadow: [REST_SHADOW, LIFT_SHADOW, REST_SHADOW],
            }
      }
      transition={
        reduce
          ? undefined
          : {
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
              boxShadow: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
            }
      }
      // Hover: pause by snapping to rest position; resume naturally on leave
      whileHover={
        reduce
          ? undefined
          : {
              y: 0,
              rotate: 0,
              boxShadow: LIFT_SHADOW,
              transition: { duration: 0.4, ease: "easeOut" },
            }
      }
      role="img"
      aria-label="Preview of the WISK Overview dashboard"
    >
      {/* Inner glow — fades in on hover via CSS group-hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at 50% -10%, rgba(195,255,50,0.15) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10">
        <BrowserChrome />

        <div className="p-6 md:p-10">
          {/* Greeting */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white md:text-3xl" aria-hidden="true">
              Good evening, Isaiah
            </h3>
            <p className="mt-1 text-sm text-white/50">Friday, 7 June 2025</p>
          </div>

          {/* Stat cards */}
          <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            <StatCard
              label="Active projects"
              value="12"
              accent="purple"
              countUp
              hoverValue="13"
            />
            <StatCard
              label="Tasks due today"
              value="7"
              accent="teal"
              subtext="2 overdue"
              hoverValue="6"
            />
            <StatCard
              label="Goals in progress"
              value="5"
              accent="amber"
            />
            <StatCard
              label="Ideas in bank"
              value="23"
              accent="coral"
              hoverValue="24"
            />
          </div>

          {/* Two-column detail panels */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            <NeedsAttention />
            <ThisWeek />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
