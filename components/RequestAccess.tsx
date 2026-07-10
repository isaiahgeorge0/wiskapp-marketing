"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;

export function RequestAccess() {
  const shouldReduceMotion = useReducedMotion();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.wiskapp.com";

  return (
    <section
      id="get-started"
      className="relative overflow-hidden px-6 py-16 md:py-24"
    >
      {/* Atmospheric orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -right-48 -top-32 h-[700px] w-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(195,255,50,0.08) 0%, transparent 70%)",
            filter: "blur(72px)",
            mixBlendMode: "screen",
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : { x: [0, -40, 0], y: [0, 30, 0] }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 30, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(1,108,129,0.10) 0%, transparent 70%)",
            filter: "blur(64px)",
            mixBlendMode: "screen",
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : { x: [0, 50, 0], y: [0, -30, 0] }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 40, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </div>

      <div className="relative mx-auto max-w-xl text-center">
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease }}
          className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-wisk-lime/70"
        >
          Get started
        </motion.p>

        <motion.h2
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.05, ease }}
          className="text-3xl font-semibold tracking-tight md:text-4xl"
        >
          Ready to centralise your business?
        </motion.h2>

        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="mt-4 text-wisk-muted"
        >
          Join ambitious entrepreneurs and landlords already using WISK.
        </motion.p>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15, ease }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:mt-14"
        >
          <Button href={`${appUrl}/sign-up`}>Get started free</Button>
          <Button variant="outline" href={`${appUrl}/sign-in`}>
            Sign in
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
