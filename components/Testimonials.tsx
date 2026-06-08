"use client";

import { motion, useReducedMotion } from "framer-motion";

import { testimonials } from "@/lib/testimonials";

const ease = [0.22, 1, 0.36, 1] as const;

const cardsContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease },
  },
};

export function Testimonials() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease }}
          className="text-center text-3xl font-semibold tracking-tight md:text-4xl"
        >
          Built for people who build things
        </motion.h2>

        <motion.div
          variants={shouldReduceMotion ? undefined : cardsContainer}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {testimonials.map((item) => (
            <motion.blockquote
              key={item.attribution}
              variants={shouldReduceMotion ? undefined : cardVariant}
              className="rounded-xl border border-wisk-border bg-wisk-card p-6"
            >
              <p className="text-sm leading-relaxed md:text-base">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-4 text-sm text-wisk-muted">
                — {item.attribution}
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
