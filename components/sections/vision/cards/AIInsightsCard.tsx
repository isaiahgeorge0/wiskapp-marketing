"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { VisionCardShell } from "@/components/sections/vision/VisionCardShell";

// ── Conversation data ────────────────────────────────────────────────────────

const CONVERSATIONS = [
  {
    user: "Why did my last Instagram reel underperform?",
    ai: "Three things stand out. The hook took 4.2 seconds to land. Your top performers all hook in under 2 seconds. You posted at 2pm Tuesday; your audience peaks at 7pm on weekdays. And the topic (client testimonials) historically underperforms your educational content by 60%.",
  },
  {
    user: "Which lead should I follow up with first this week?",
    ai: "Maya Chen moved to Proposal stage 4 days ago, viewed your portfolio twice yesterday, and her company just announced a funding round. The buying signal is strong. Your other proposal-stage leads have been quiet for over two weeks.",
  },
  {
    user: "Should I take on this new client project?",
    ai: "Your current workload runs you to 87% capacity through next month. Adding this would push you to 105%, and the deadline overlaps with your two highest-value active projects. Recommend negotiating a start date two weeks out, or it'll cost the work that's already paying.",
  },
] as const;

const CYCLE_MS = 10_000;

const ease = [0.22, 1, 0.36, 1] as const;

// ── Sub-components ───────────────────────────────────────────────────────────

function UserBubble({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.div
      className="ml-auto max-w-[75%]"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease }}
    >
      <div className="rounded-2xl rounded-tr-md bg-white/8 px-4 py-2.5">
        <p className="text-sm leading-relaxed text-white/85">{text}</p>
      </div>
    </motion.div>
  );
}

function AIBubble({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.div
      className="max-w-[90%]"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease }}
    >
      <div
        className="relative rounded-2xl rounded-tl-md px-4 py-3"
        style={{
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(167,139,250,0.10) 100%)",
        }}
      >
        {/* AI indicator dot */}
        <span
          aria-hidden
          className="absolute left-3 top-3 h-1 w-1 rounded-full bg-violet-400"
        />
        <p className="pl-3 text-sm leading-relaxed text-white/85">{text}</p>
      </div>
    </motion.div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export function AIInsightsCard() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % CONVERSATIONS.length),
      CYCLE_MS,
    );
    return () => clearInterval(id);
  }, [reduce]);

  const convo = CONVERSATIONS[reduce ? 0 : index];

  return (
    <VisionCardShell
      badge={{ text: "Coming with WISK Growth", accent: "#A78BFA" }}
      footer={{ package: "WISK Growth", timing: "Coming soon" }}
      accentColor="#A78BFA"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-500/20">
          <Sparkles className="h-4 w-4 text-violet-300" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">WISK AI</p>
          <p className="text-xs text-white/50">Your business advisor</p>
        </div>
      </div>

      {/* Conversation area */}
      <div
        className="mt-6 flex-1"
        aria-live="polite"
        aria-label="Preview of WISK AI providing business insights through conversation"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="flex flex-col gap-3"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease }}
          >
            <UserBubble text={convo.user} delay={0} />
            <AIBubble text={convo.ai} delay={reduce ? 0 : 0.4} />
          </motion.div>
        </AnimatePresence>
      </div>
    </VisionCardShell>
  );
}
