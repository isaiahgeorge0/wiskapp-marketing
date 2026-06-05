"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/Button";

const headline = "Your business. Centralised.";
const words = headline.split(" ");

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const wordVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.wiskapp.com";

  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-32 md:pb-32 md:pt-40">
      <div
        aria-hidden
        className="hero-glow-a pointer-events-none absolute -left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(127,119,221,0.12)_0%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="hero-glow-b pointer-events-none absolute -right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(29,158,117,0.1)_0%,transparent_70%)]"
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.span
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-6 inline-flex rounded-full border border-wisk-border bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-wisk-muted uppercase"
        >
          Invite only — request access below
        </motion.span>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="visible"
          className="text-5xl font-semibold tracking-tight md:text-7xl"
        >
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              variants={wordVariant}
              className="inline-block"
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.45 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-wisk-muted md:text-xl"
        >
          The command centre for freelancers, creators, and small business
          owners. Manage projects, tasks, goals, leads, and content — all in one
          place.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.55 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Button href="#request-access">Request access</Button>
          <Button variant="outline" href={`${appUrl}/sign-in`}>
            Sign in
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
