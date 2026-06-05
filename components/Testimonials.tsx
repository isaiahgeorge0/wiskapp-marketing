"use client";

import { motion } from "framer-motion";

import { testimonials } from "@/lib/testimonials";

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Testimonials() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center text-3xl font-semibold tracking-tight md:text-4xl"
        >
          Built for people who build things
        </motion.h2>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <motion.blockquote
              key={item.attribution}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1 }}
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
        </div>
      </div>
    </section>
  );
}
