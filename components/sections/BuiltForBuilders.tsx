"use client";

import { motion, useReducedMotion } from "framer-motion";

import { BuilderCard } from "./builders/BuilderCard";

export function BuiltForBuilders() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24">
      {/* Atmospheric glow — mixed purple/teal, centered behind the cards */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.08) 0%, rgba(20,184,166,0.08) 50%, transparent 70%)",
            filter: "blur(72px)",
            mixBlendMode: "screen",
          }}
          animate={
            shouldReduceMotion ? undefined : { opacity: [0.05, 0.12, 0.05] }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 9, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-purple-300/70">
            Who it&apos;s for
          </p>
          <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-[1.15] tracking-tight text-white md:text-4xl lg:text-5xl">
            Built for builders.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            Ambitious people running ambitious operations. If you&apos;re one of
            these, you&apos;ll feel at home.
          </p>
        </div>

        {/* Three builder cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          <BuilderCard
            accentColor="#A78BFA"
            icon="Briefcase"
            type="Freelancers & solo operators"
            description="Developers, designers, consultants. Anyone juggling client work, deadlines, and the business behind it."
            tagline="Client work, organised."
          />
          <BuilderCard
            accentColor="#F97066"
            icon="Sparkles"
            type="Content creators"
            description="Social-first founders building audiences across multiple platforms. Plan, publish, and see what actually works."
            tagline="Audience, deliberately built."
          />
          <BuilderCard
            accentColor="#34D399"
            icon="Users"
            type="Small agencies & studios"
            description="Teams managing client projects, content, and leads at scale. Visibility without the chaos."
            tagline="A team, in sync."
          />
        </div>
      </div>
    </section>
  );
}
