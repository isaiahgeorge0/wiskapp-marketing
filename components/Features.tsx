"use client";

import { motion } from "framer-motion";

import { features } from "@/lib/features";

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Features() {
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
          Everything you need. Nothing you don&apos;t.
        </motion.h2>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.name}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08 }}
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
        </div>
      </div>
    </section>
  );
}
