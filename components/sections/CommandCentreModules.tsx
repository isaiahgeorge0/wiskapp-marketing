"use client";

import { motion, useReducedMotion } from "framer-motion";

import { ModuleRow } from "@/components/sections/modules/ModuleRow";
import { ModuleTextBlock } from "@/components/sections/modules/ModuleTextBlock";
import { ContentModuleCard } from "@/components/sections/modules/cards/ContentModuleCard";
import { LeadsModuleCard } from "@/components/sections/modules/cards/LeadsModuleCard";
import { ProjectsModuleCard } from "@/components/sections/modules/cards/ProjectsModuleCard";

export function CommandCentreModules() {
  const reduce = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24">
      {/* Atmospheric glow — teal left, distinct from OverviewSpotlight's purple */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute left-[-15%] top-1/2 h-[700px] w-[700px] -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(1,108,129,0.18) 0%, transparent 70%)",
            filter: "blur(72px)",
          }}
          animate={reduce ? undefined : { opacity: [0.10, 0.20, 0.10] }}
          transition={reduce ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          className="mb-10 text-center md:mb-14"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-wisk-lime/70">
            Inside your command centre
          </p>
          <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-[1.15] tracking-tight text-white md:text-4xl lg:text-5xl">
            Three modules that make the{" "}
            <span className="text-wisk-lime">Overview</span> possible.
          </h2>
        </motion.div>

        {/* Module rows */}
        <div className="space-y-20 md:space-y-24">
          <ModuleRow
            card={<ProjectsModuleCard />}
            textBlock={
              <ModuleTextBlock
                eyebrow="Projects"
                headline="Every client. Every milestone. One place."
                body="Track project status, milestones, tasks, and next actions across all your client work. The progress you see on your overview comes from here."
              />
            }
            orientation="card-left"
          />

          <ModuleRow
            card={<ContentModuleCard />}
            textBlock={
              <ModuleTextBlock
                eyebrow="Content"
                headline="Plan, schedule, and ship across every platform."
                body="Build out your content calendar across TikTok, Instagram, YouTube, and more. Watch your streak grow as you ship."
              />
            }
            orientation="card-right"
          />

          <ModuleRow
            card={<LeadsModuleCard />}
            textBlock={
              <ModuleTextBlock
                eyebrow="Leads"
                headline="From first touch to signed deal."
                body="Move leads through your pipeline, track conversion, and see exactly where your revenue is coming from."
              />
            }
            orientation="card-left"
          />
        </div>
      </div>
    </section>
  );
}
