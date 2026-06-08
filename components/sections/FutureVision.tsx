"use client";

import { motion, useReducedMotion } from "framer-motion";

import { VisionRow } from "@/components/sections/vision/VisionRow";
import { VisionTextBlock } from "@/components/sections/vision/VisionTextBlock";
import { AIInsightsCard } from "@/components/sections/vision/cards/AIInsightsCard";
import { CommerceCard } from "@/components/sections/vision/cards/CommerceCard";
import { SocialMediaCard } from "@/components/sections/vision/cards/SocialMediaCard";

export function FutureVision() {
  const reduce = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24">
      {/* ── Atmospheric glow — amber/gold, distinct from teal-tinted modules above ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -right-40 top-1/2 h-[700px] w-[700px] -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
            mixBlendMode: "screen",
          }}
          animate={
            reduce
              ? undefined
              : { opacity: [0.08, 0.16, 0.08] }
          }
          transition={
            reduce
              ? undefined
              : { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }
        />
        {/* Secondary purple orb — left, lower — ties back to the brand palette */}
        <div
          className="absolute -left-32 bottom-0 h-[500px] w-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 70%)",
            filter: "blur(72px)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-amber-300/70">
            On the horizon
          </p>
          <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-[1.15] tracking-tight text-white md:text-4xl lg:text-5xl">
            The next twelve months.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            What WISK becomes as it grows. These are the next capabilities, built
            on the same foundation you&apos;ve just seen.
          </p>
        </div>

        {/* Vision rows */}
        <div className="space-y-20 md:space-y-24">
          {/* Row 1: AI Insights */}
          <VisionRow
            orientation="card-left"
            card={<AIInsightsCard />}
            textBlock={
              <VisionTextBlock
                eyebrow="AI Insights"
                headline="An advisor that knows your business."
                     body="Ask WISK anything about your content, leads, or performance. Get specific, multi-factor answers that explain the why, not just the what."
              />
            }
          />

          {/* Row 2: Social Media */}
          <VisionRow
            orientation="card-right"
            card={<SocialMediaCard />}
            textBlock={
              <VisionTextBlock
                eyebrow="Social Media"
                headline="Every platform. One dashboard."
                body="Track performance across YouTube, Instagram, TikTok, and LinkedIn from a single view. See what's working, what needs attention, and where to focus next."
              />
            }
          />

          {/* Row 3: Commerce */}
          <VisionRow
            orientation="card-left"
            card={<CommerceCard />}
            textBlock={
              <VisionTextBlock
                eyebrow="Commerce"
                headline="From content to revenue, connected."
                body="Connect Shopify, Stripe, and your favorite commerce tools. See exactly how your content drives sales: which post sold what, which campaign converted, where revenue actually comes from."
              />
            }
          />
        </div>

        {/* ── Section footer ──────────────────────────────────────── */}
        <div className="mx-auto mt-24 max-w-3xl text-center md:mt-32">
          <p className="text-xl font-medium leading-relaxed text-white/90 md:text-2xl">
            WISK today is genuinely useful.{" "}
            <span className="bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text text-transparent">
              WISK in twelve months will be unmissable.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
