"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ShoppingBag, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { VisionCardShell } from "@/components/sections/vision/VisionCardShell";

// ── Data ─────────────────────────────────────────────────────────────────────

const SHOPIFY_COLOR  = "#95BF47";
const STRIPE_COLOR   = "#635BFF";

const CHANNELS = [
  { id: "shopify",      label: "Shopify",      color: SHOPIFY_COLOR },
  { id: "stripe",       label: "Stripe",       color: STRIPE_COLOR  },
  { id: "gumroad",      label: "Gumroad",      color: "#FF90E8"     },
  { id: "woocommerce",  label: "WooCommerce",  color: "#7F54B3"     },
] as const;

type ChannelId = (typeof CHANNELS)[number]["id"];

// Content items with small platform color dot + revenue per row
const CONNECTIONS = [
  { dotColor: "#E1306C", content: "Brand reel · Tue", revenue: "+£480"   },
  { dotColor: "#FF0033", content: "Tutorial · Mon",   revenue: "+£1,240" },
  { dotColor: "#00F2EA", content: "Story · Wed",      revenue: "+£220"   },
] as const;

const CHANNEL_DATA = {
  shopify: {
    color:        SHOPIFY_COLOR,
    stat1:        { value: "£8,420", label: "This month" },
    stat2:        "+24% vs last month",
    insight:      "Your Instagram Reel about the new collection drove 12 orders this week. Posts featuring product close-ups convert 3× better.",
    activePulse:  0, // top connection line pulses
  },
  stripe: {
    color:        STRIPE_COLOR,
    stat1:        { value: "£3,180", label: "This month" },
    stat2:        "+18% vs last month",
    insight:      "Your tutorial videos generate the highest-value subscribers. Consider a paid course tier. Your audience signals demand.",
    activePulse:  1, // middle connection line pulses
  },
} as const;

const CYCLE_MS = 3_000;
const ease = [0.22, 1, 0.36, 1] as const;

// ── Component ─────────────────────────────────────────────────────────────────

export function CommerceCard() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<ChannelId>("shopify");

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(
      () => setActive((c) => (c === "shopify" ? "stripe" : "shopify")),
      CYCLE_MS,
    );
    return () => clearInterval(id);
  }, [reduce]);

  const data = CHANNEL_DATA[active as "shopify" | "stripe"];

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -4 }}
      style={{ boxShadow: "0 30px 80px -25px #60A5FA4D", borderRadius: "1rem" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <VisionCardShell
        badge={{ text: "Coming with WISK Commerce", accent: "#60A5FA" }}
        footer={{ package: "WISK Commerce", timing: "Late 2026" }}
        accentColor="#60A5FA"
      >
        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/20">
            <ShoppingBag className="h-4 w-4 text-blue-300" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Revenue overview</p>
            <p className="text-xs text-white/50">All your sales channels, connected</p>
          </div>
        </div>

        {/* ── Channel tabs ──────────────────────────────────────────── */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {CHANNELS.map((ch) => {
            const isActive = ch.id === active;
            return (
              <div
                key={ch.id}
                aria-current={isActive ? "true" : undefined}
                className="rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-500"
                style={
                  isActive
                    ? {
                        backgroundColor: `${ch.color}26`,
                        color: ch.color,
                        border: `1px solid ${ch.color}60`,
                      }
                    : {
                        backgroundColor: "transparent",
                        color: "rgba(255,255,255,0.4)",
                        border: "1px solid rgba(255,255,255,0.10)",
                      }
                }
              >
                {ch.label}
              </div>
            );
          })}
        </div>

        {/* ── Stats ─────────────────────────────────────────────────── */}
        <div className="mt-4 flex items-start gap-6">
          <div>
            <AnimatePresence mode="wait">
              <motion.p
                key={`rev-${active}`}
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
                <ArrowUpRight className="h-4 w-4 text-blue-400" />
                <p className="text-sm font-medium text-blue-400">{data.stat2}</p>
              </motion.div>
            </AnimatePresence>
            <p className="text-xs text-white/50">Trending up</p>
          </div>
        </div>

        {/* ── Content-to-revenue connection map ─────────────────────── */}
        <div className="mt-4 space-y-2.5">
          {CONNECTIONS.map((conn, i) => {
            const isPulseActive = !reduce && i === data.activePulse;
            return (
              <div key={i} className="flex items-center gap-2">
                {/* Content item */}
                <div className="flex w-[44%] shrink-0 items-center gap-1.5 overflow-hidden">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: conn.dotColor }}
                  />
                  <span className="truncate text-[10px] text-white/60">{conn.content}</span>
                </div>

                {/* Connection line with traveling pulse */}
                <div className="relative h-px flex-1 overflow-hidden rounded-full">
                  {/* Base gradient line */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to right, ${conn.dotColor}40, #60A5FA40)`,
                    }}
                  />
                  {/* Traveling pulse streak */}
                  {isPulseActive && (
                    <motion.div
                      className="absolute top-1/2 h-4 w-8 -translate-y-1/2 rounded-full"
                      style={{
                        background:
                          "linear-gradient(to right, transparent, #93C5FD, transparent)",
                      }}
                      animate={{ left: ["-10%", "110%"] }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        ease: "linear",
                        repeatDelay: 0.2,
                      }}
                    />
                  )}
                </div>

                {/* Revenue item */}
                <div className="flex w-[18%] shrink-0 items-center justify-end gap-0.5">
                  <ArrowUpRight className="h-2.5 w-2.5 shrink-0 text-blue-400" />
                  <span className="text-[10px] font-medium text-white/80">{conn.revenue}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── AI insight callout ────────────────────────────────────── */}
        <div className="mt-4">
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
