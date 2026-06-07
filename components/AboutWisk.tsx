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

const ease = [0.22, 1, 0.36, 1] as const;

const paragraphVariant = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease },
  },
};

const staticParagraphVariant = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

type AnimatedParagraphProps = {
  children: React.ReactNode;
  className?: string;
  reduceMotion: boolean | null;
};

function AnimatedParagraph({
  children,
  className,
  reduceMotion,
}: AnimatedParagraphProps) {
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

export function AboutWisk() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="border-y border-wisk-border bg-white/[0.02] px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
          What WISK means
        </h2>

        <div className="mt-12 text-lg leading-relaxed text-wisk-muted md:text-xl">
          {paragraphs.map((paragraph) => (
            <AnimatedParagraph
              key={paragraph.slice(0, 32)}
              reduceMotion={shouldReduceMotion}
              className="mb-6 last:mb-0"
            >
              {paragraph}
            </AnimatedParagraph>
          ))}

          <AnimatedParagraph
            reduceMotion={shouldReduceMotion}
            className="mt-12 mb-8 text-center text-xl font-medium text-white"
          >
            {closingLine}
          </AnimatedParagraph>
        </div>
      </div>
    </section>
  );
}
