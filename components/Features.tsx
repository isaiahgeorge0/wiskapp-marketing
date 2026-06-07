"use client";

import { motion, useReducedMotion } from "framer-motion";

import { features } from "@/lib/features";

const ease = [0.22, 1, 0.36, 1] as const;

const headingVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const cardsContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

export function Features() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          variants={shouldReduceMotion ? undefined : headingVariant}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center text-3xl font-semibold tracking-tight md:text-4xl"
        >
          Everything you need. Nothing you don&apos;t.
        </motion.h2>

        <motion.div
          variants={shouldReduceMotion ? undefined : cardsContainer}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.name}
                variants={shouldReduceMotion ? undefined : cardVariant}
                className="rounded-xl border border-wisk-border bg-wisk-card p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-wisk-purple/15">
                  <Icon className="h-5 w-5 text-wisk-purple" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-medium">{feature.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-wisk-muted">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
