"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BarChart3, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { VisionCardShell } from "@/components/sections/vision/VisionCardShell";

// ── Data ─────────────────────────────────────────────────────────────────────

const YT_COLOR = "#FF0033";
const IG_COLOR = "#E1306C";

const PLATFORMS = [
  { id: "youtube",   label: "YouTube",   color: YT_COLOR },
  { id: "instagram", label: "Instagram", color: IG_COLOR },
  { id: "tiktok",    label: "TikTok",    color: "#00F2EA" },
  { id: "linkedin",  label: "LinkedIn",  color: "#0A66C2" },
] as const;

type PlatformId = (typeof PLATFORMS)[number]["id"];

const PLATFORM_DATA = {
  youtube: {
    color:    YT_COLOR,
    stat1:    { value: "12.4K", label: "Subscribers" },
    stat2:    "+340 this week",
    insight:  "Your tutorial videos outperform shorts by 3.2×. Focus the next batch on educational content.",
    pipelineIdx: 1, // "Scheduled"
  },
  instagram: {
    color:    IG_COLOR,
    stat1:    { value: "8.7K", label: "Followers" },
    stat2:    "+520 this week",
    insight:  "Your morning Reels peak at 2.4× engagement vs evening posts. Schedule the next launch for 9am.",
    pipelineIdx: 2, // "Published"
  },
} as const;

const PIPELINE_STAGES = ["Plan", "Sched", "Live", "Track"] as const;

// Left position of each pipeline stage as a percentage of the track width.
// Stage i sits at (i / (N-1)) * 100 % — dots are centred with -translate-x-1/2.
const stagePct = (i: number) => `${(i / (PIPELINE_STAGES.length - 1)) * 100}%`;

const CYCLE_MS = 3_000; // toggle every 3 s → 6 s full cycle

const ease = [0.22, 1, 0.36, 1] as const;

// ── Component ─────────────────────────────────────────────────────────────────

export function SocialMediaCard() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<PlatformId>("youtube");

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(
      () => setActive((p) => (p === "youtube" ? "instagram" : "youtube")),
      CYCLE_MS,
    );
    return () => clearInterval(id);
  }, [reduce]);

  const data = PLATFORM_DATA[active as "youtube" | "instagram"];

  // Pipeline thumbnail slides between "Scheduled" (idx 1) and "Published" (idx 2)
  const thumbLeft = stagePct(data.pipelineIdx);

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -4 }}
      style={{
        boxShadow: "0 30px 80px -25px #baf7e14D",
        borderRadius: "1rem",
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <VisionCardShell
        badge={{ text: "Coming with WISK Growth", accent: "#baf7e1" }}
        footer={{ package: "WISK Growth", timing: "Late 2026" }}
        accentColor="#baf7e1"
      >
        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20">
            <BarChart3 className="h-4 w-4 text-emerald-300" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Social analytics</p>
            <p className="text-xs text-white/50">All your platforms in one place</p>
          </div>
        </div>

        {/* ── Platform tabs ─────────────────────────────────────────── */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {PLATFORMS.map((p) => {
            const isActive = p.id === active;
            return (
              <div
                key={p.id}
                aria-current={isActive ? "true" : undefined}
                className="rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-500"
                style={
                  isActive
                    ? {
                        backgroundColor: `${p.color}26`,
                        color: p.color,
                        border: `1px solid ${p.color}60`,
                      }
                    : {
                        backgroundColor: "transparent",
                        color: "rgba(255,255,255,0.4)",
                        border: "1px solid rgba(255,255,255,0.10)",
                      }
                }
              >
                {p.label}
              </div>
            );
          })}
        </div>

        {/* ── Stats ────────────────────────────────────────────────── */}
        <div className="mt-4 flex items-start gap-6">
          {/* Follower / subscriber count */}
          <div>
            <AnimatePresence mode="wait">
              <motion.p
                key={`count-${active}`}
                className="text-2xl font-bold text-white"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease }}
              >
                {data.stat1.value}
              </motion.p>
            </AnimatePresence>
            <p className="text-xs text-white/50">{data.stat1.label}</p>
          </div>

          {/* Weekly growth */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={`growth-${active}`}
                className="flex items-center gap-1"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease }}
              >
                <ArrowUpRight className="h-4 w-4 text-emerald-400" />
                <p className="text-sm font-medium text-emerald-400">{data.stat2}</p>
              </motion.div>
            </AnimatePresence>
            <p className="text-xs text-white/50">Growing</p>
          </div>
        </div>

        {/* ── Content pipeline ─────────────────────────────────────── */}
        <div className="mt-5 px-3">
          {/* Track — absolute-positioned elements relative to this container */}
          <div className="relative pb-6" style={{ height: 40 }}>
            {/* Horizontal connector */}
            <div className="absolute left-0 right-0 top-[3px] h-px bg-white/15" />

            {/* Stage dots + labels */}
            {PIPELINE_STAGES.map((stage, i) => (
              <div
                key={stage}
                className="absolute top-0 flex -translate-x-1/2 flex-col items-center gap-1.5"
                style={{ left: stagePct(i) }}
              >
                <div
                  className="h-2 w-2 rounded-full border transition-colors duration-500"
                  style={{
                    backgroundColor: `${data.color}99`,
                    borderColor: data.color,
                  }}
                />
                <span className="whitespace-nowrap text-[9px] uppercase tracking-wide text-white/40">
                  {stage}
                </span>
              </div>
            ))}

            {/* Sliding thumbnail — CSS transition for the "left" property */}
            <div
              className="-translate-x-1/2 absolute top-[-2px] h-5 w-5 overflow-hidden rounded-sm border-2"
              style={{
                left: thumbLeft,
                borderColor: data.color,
                transition: "left 700ms cubic-bezier(0.34,1.56,0.64,1), border-color 500ms ease",
              }}
            >
              <div
                className="h-full w-full opacity-60 transition-colors duration-500"
                style={{ backgroundColor: data.color }}
              />
            </div>
          </div>
        </div>

        {/* ── AI insight callout ────────────────────────────────────── */}
        <div className="mt-3">
          <div
            className="rounded-lg border p-3"
            style={{
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.10) 0%, rgba(167,139,250,0.05) 100%)",
              borderColor: "rgba(139,92,246,0.20)",
            }}
          >
            <div className="flex items-start gap-2">
              <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-400" />
              <div aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`insight-${active}`}
                    className="text-xs leading-relaxed text-white/75"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {data.insight}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </VisionCardShell>
    </motion.div>
  );
}
