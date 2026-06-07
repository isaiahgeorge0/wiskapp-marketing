"use client";

import { motion, useReducedMotion } from "framer-motion";

import { HeroBackground } from "@/components/HeroBackground";
import { HeroCardStrip } from "@/components/hero/HeroCardStrip";
import { CalendarCard } from "@/components/hero/cards/CalendarCard";
import { ContentCard } from "@/components/hero/cards/ContentCard";
import { GoalsCard } from "@/components/hero/cards/GoalsCard";
import { LeadsCard } from "@/components/hero/cards/LeadsCard";
import { ProjectsCard } from "@/components/hero/cards/ProjectsCard";
import { TasksCard } from "@/components/hero/cards/TasksCard";
import { Button } from "@/components/ui/Button";

const cards = [
  <ProjectsCard key="projects" />,
  <TasksCard key="tasks" />,
  <GoalsCard key="goals" />,
  <ContentCard key="content" />,
  <LeadsCard key="leads" />,
  <CalendarCard key="calendar" />,
];

const ease = [0.22, 1, 0.36, 1] as const;

const whiskedLetters = "whisked".split("");

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const whiskedContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.03 },
  },
};

const letterVariants = {
  hidden: (i: number) => ({ opacity: 0, x: i % 2 === 0 ? -10 : 10 }),
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export function Hero() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.wiskapp.com";
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-28 md:pb-20 md:pt-32">
      <HeroBackground />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center">
        {/* Invite-only pill */}
        <motion.span
          variants={reduce ? undefined : fadeUp}
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "visible"}
          className="mb-8 inline-flex rounded-full border border-wisk-border bg-white/5 px-4 py-1.5 text-xs font-medium tracking-widest text-wisk-muted uppercase"
        >
          Invite only — request access below
        </motion.span>

        {/* Headline */}
        {reduce ? (
          <h1
            className="text-5xl font-extrabold tracking-tight leading-[1.1] md:text-6xl lg:text-7xl"
            style={{ textShadow: "0 0 80px rgba(124,58,237,0.25)" }}
          >
            Your business,{" "}
            <span className="bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text text-transparent">
              whisked
            </span>{" "}
            together.
          </h1>
        ) : (
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl font-extrabold tracking-tight leading-[1.1] md:text-6xl lg:text-7xl"
            style={{ textShadow: "0 0 80px rgba(124,58,237,0.25)" }}
          >
            <motion.span variants={wordVariants} className="inline-block">
              Your{"\u00A0"}
            </motion.span>
            <motion.span variants={wordVariants} className="inline-block">
              business,{"\u00A0"}
            </motion.span>
            {/* "whisked" with per-letter animation + gradient */}
            <motion.span variants={wordVariants} className="inline-block">
              <motion.span
                variants={whiskedContainerVariants}
                className="inline-block bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text text-transparent"
              >
                {whiskedLetters.map((letter, i) => (
                  <motion.span
                    key={`${letter}-${i}`}
                    custom={i}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.span>
              {"\u00A0"}
            </motion.span>
            <motion.span variants={wordVariants} className="inline-block">
              together.
            </motion.span>
          </motion.h1>
        )}

        {/* Sub-line */}
        <motion.p
          variants={reduce ? undefined : fadeUp}
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "visible"}
          transition={{ delay: reduce ? 0 : 0.65 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-wisk-muted md:text-xl"
        >
          One command centre for ambitious people.
          <br className="hidden sm:block" />
          Built on wisdom, integrity, strength, and knowledge.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={reduce ? undefined : fadeUp}
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "visible"}
          transition={{ delay: reduce ? 0 : 0.78 }}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <Button href="#request-access">Request access</Button>
          <Button variant="outline" href={`${appUrl}/sign-in`}>
            Sign in
          </Button>
        </motion.div>
      </div>

      {/* Card strip — full hero width, below the text */}
      <motion.div
        variants={reduce ? undefined : fadeUp}
        initial={reduce ? false : "hidden"}
        animate={reduce ? undefined : "visible"}
        transition={{ delay: reduce ? 0 : 0.92 }}
        className="relative z-10 mt-16 w-full md:mt-20"
      >
        <HeroCardStrip cards={cards} />
      </motion.div>
    </section>
  );
}
