"use client";

import { motion, useReducedMotion } from "framer-motion";

import { OverviewMock } from "@/components/sections/overview-mock/OverviewMock";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export function OverviewSpotlight() {
  const reduce = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden py-28 md:py-40">
      {/* Atmospheric glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* Purple glow — center-top, behind the mock */}
        <motion.div
          className="absolute left-1/2 top-[15%] h-[700px] w-[700px] -translate-x-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={reduce ? undefined : { opacity: [0.15, 0.28, 0.15] }}
          transition={reduce ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Teal accent — bottom-right */}
        <div
          className="absolute bottom-[5%] right-[5%] h-[400px] w-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(20,184,166,0.14) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Eyebrow */}
        <motion.p
          variants={reduce ? undefined : fadeUp}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "visible"}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-5 text-center text-xs font-medium uppercase tracking-[0.2em] text-purple-300/70"
        >
          The command centre
        </motion.p>

        {/* Headline */}
        <motion.h2
          variants={reduce ? undefined : fadeUp}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "visible"}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: reduce ? 0 : 0.1 }}
          className="mb-5 text-center text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl"
        >
          Everything in one place.{" "}
          <span className="bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text text-transparent">
            Finally.
          </span>
        </motion.h2>

        {/* Supporting line */}
        <motion.p
          variants={reduce ? undefined : fadeUp}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "visible"}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: reduce ? 0 : 0.2 }}
          className="mx-auto mb-10 max-w-2xl text-center text-lg text-white/60 md:mb-12 md:text-xl"
        >
          Your projects, tasks, goals, content, and leads — all in one view, working together.
        </motion.p>

        {/* Mock */}
        <motion.div
          variants={reduce ? undefined : fadeUp}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "visible"}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: reduce ? 0 : 0.3 }}
          className="mx-auto max-w-[1100px]"
        >
          <OverviewMock />
        </motion.div>
      </div>
    </section>
  );
}
