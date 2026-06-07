"use client";

import { motion, useReducedMotion } from "framer-motion";

const paragraphs = [
  "Somewhere right now a person is trying to remember where they wrote something down. A note about a client. An idea that woke them up at two in the morning. The name of someone they were supposed to follow up with three weeks ago.",
  "They have a calendar in one place, a list of tasks in another, a folder of half-finished documents on their desktop, and a notebook they keep meaning to open. Their business is real. It is just not in any one place.",
  "This is the person WISK is built for.",
  "The word itself is an acronym, but the meaning came first. Wisdom, because data is not understanding. Integrity, because the tools we trust with our work should be worth that trust. Strength, because ambition is heavy and the things that hold it have to be built properly. Knowledge, because the longer a system pays attention to your business, the more it should have to say.",
  "A whisk is a small object that does something quietly powerful. It takes ingredients that would never come together on their own and combines them into something none of them could be alone. Eggs and flour and butter are not a cake. They are the possibility of one.",
  "A project is not a business. A lead is not a business. A piece of content is not a business. They are the ingredients. The business is what happens when they move together.",
  "We are not trying to build another productivity tool. There are already more of those than the world knows what to do with. We are building something else. The place ambitious people put the version of their life that is too big for any single tool to hold.",
];

const closingLine = "If that sounds like you, you already know.";

const paragraphVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const containerVariant = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export function AboutWisk() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="border-y border-wisk-border bg-white/[0.02] px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
          What WISK means
        </h2>

        {shouldReduceMotion ? (
          <div className="mt-12 text-lg leading-relaxed text-wisk-muted md:text-xl">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="mb-6 last:mb-0">
                {paragraph}
              </p>
            ))}
            <p className="mt-12 mb-8 text-center text-xl font-medium text-white">
              {closingLine}
            </p>
          </div>
        ) : (
          <motion.div
            className="mt-12 text-lg leading-relaxed text-wisk-muted md:text-xl"
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {paragraphs.map((paragraph) => (
              <motion.p
                key={paragraph.slice(0, 32)}
                variants={paragraphVariant}
                className="mb-6 last:mb-0"
              >
                {paragraph}
              </motion.p>
            ))}
            <motion.p
              variants={paragraphVariant}
              className="mt-12 mb-8 text-center text-xl font-medium text-white"
            >
              {closingLine}
            </motion.p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
