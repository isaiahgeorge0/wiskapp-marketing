"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { WiskPillars } from "@/components/sections/about/WiskPillars";

// ── Prose copy ──────────────────────────────────────────────────────────────

const openingParagraphs = [
  "Somewhere right now a person is trying to remember where they wrote something down. A note about a client. An idea that woke them up at two in the morning. The name of someone they were supposed to follow up with three weeks ago.",
  "They have a calendar in one place, a list of tasks in another, a folder of half-finished documents on their desktop, and a notebook they keep meaning to open. Their business is real. It is just not in any one place.",
  "This is the person WISK is built for.",
];

const closingParagraphs = [
  "A whisk is a small object that does something quietly powerful. It takes ingredients that would never come together on their own and combines them into something none of them could be alone. Eggs and flour and butter are not a cake. They are the possibility of one.",
  "A project is not a business. A lead is not a business. A piece of content is not a business. They are the ingredients. The business is what happens when they move together.",
  "We are not trying to build another productivity tool. There are already more of those than the world knows what to do with. We are building something else. The place ambitious people put the version of their life that is too big for any single tool to hold.",
];

const closingLine = "If that sounds like you, you already know.";

// ── Animations ──────────────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as const;

const paragraphVariant = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.8, ease } },
};

const staticParagraphVariant = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

// ── AnimatedParagraph ───────────────────────────────────────────────────────

type AnimatedParagraphProps = {
  children: React.ReactNode;
  className?: string;
  reduceMotion: boolean | null;
};

function AnimatedParagraph({ children, className, reduceMotion }: AnimatedParagraphProps) {
  return (
    <motion.p
      variants={reduceMotion ? staticParagraphVariant : paragraphVariant}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.p>
  );
}


// ── Main export ─────────────────────────────────────────────────────────────

export function AboutWisk() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-6 py-16 sm:py-24">
      {/* ── Atmospheric orbs ────────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(195,255,50,0.12) 0%, transparent 70%)",
            filter: "blur(72px)",
            mixBlendMode: "screen",
          }}
          animate={shouldReduceMotion ? undefined : { x: [0, -45, 15, -20, 0], y: [0, 30, -20, 40, 0] }}
          transition={shouldReduceMotion ? undefined : { duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-28 -left-28 h-[500px] w-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(1,108,129,0.10) 0%, transparent 70%)",
            filter: "blur(64px)",
            mixBlendMode: "screen",
          }}
          animate={shouldReduceMotion ? undefined : { x: [0, 40, -15, 30, 0], y: [0, -35, 20, -15, 0] }}
          transition={shouldReduceMotion ? undefined : { duration: 40, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ── Edge seams ──────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)" }}
      />

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div className="relative mx-auto max-w-3xl">
        {/* Eyebrow */}
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-wisk-lime/70">
          The origin
        </p>

        {/* Title */}
        <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
          What{" "}
          <span className="text-wisk-lime">
            WISK
          </span>
          {" "}means
        </h2>

        {/* Prose column — relative so accent line can be absolute inside */}
        <div className="relative mt-12 text-lg leading-relaxed text-white/80 md:text-xl">
          {/* Vertical accent line — left edge, desktop only */}
          <div
            aria-hidden
            className="pointer-events-none absolute hidden lg:block"
            style={{
              left: -32,
              top: 0,
              bottom: 0,
              width: 2,
              background:
                "linear-gradient(to bottom, rgba(195,255,50,0) 0%, rgba(195,255,50,0.45) 20%, rgba(1,108,129,0.45) 80%, rgba(1,108,129,0) 100%)",
              boxShadow: "3px 0 10px -2px rgba(195,255,50,0.18)",
              borderRadius: 1,
            }}
          />

          {/* Opening prose */}
          {openingParagraphs.map((p) => (
            <AnimatedParagraph
              key={p.slice(0, 32)}
              reduceMotion={shouldReduceMotion}
              className="mb-6 last:mb-0"
            >
              {p}
            </AnimatedParagraph>
          ))}

          {/* W·I·S·K visual pillars */}
          <WiskPillars />

          {/* Closing prose */}
          {closingParagraphs.map((p) => (
            <AnimatedParagraph
              key={p.slice(0, 32)}
              reduceMotion={shouldReduceMotion}
              className="mb-6 last:mb-0"
            >
              {p}
            </AnimatedParagraph>
          ))}

          {/* Closing line */}
          <AnimatedParagraph
            reduceMotion={shouldReduceMotion}
            className="mt-12 text-center text-xl font-medium text-white"
          >
            {closingLine}
          </AnimatedParagraph>

          {/* CTA */}
          <div className="mb-2 mt-10 flex justify-center">
            <Button href="https://app.wiskapp.com/sign-in">Get started</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
