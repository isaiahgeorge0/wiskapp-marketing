"use client";

import { Briefcase, Sparkles, Users } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const iconMap = {
  Briefcase,
  Sparkles,
  Users,
};

interface BuilderCardProps {
  accentColor: string;
  icon: keyof typeof iconMap;
  type: string;
  description: string;
  tagline: string;
}

export function BuilderCard({
  accentColor,
  icon,
  type,
  description,
  tagline,
}: BuilderCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const IconComponent = iconMap[icon];

  return (
    <motion.div
      className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-6 md:p-7"
      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Radial glow from top center on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${accentColor}15, transparent 70%)`,
        }}
      />

      <div className="relative">
        {/* Icon circle */}
        <div
          aria-hidden
          className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl"
          style={{
            background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}08)`,
            border: `1px solid ${accentColor}30`,
          }}
        >
          <IconComponent size={22} style={{ color: accentColor }} strokeWidth={1.75} />
        </div>

        {/* User type headline */}
        <h3 className="mb-3 text-lg font-semibold text-white md:text-xl">
          {type}
        </h3>

        {/* Description */}
        <p className="mb-5 text-sm leading-relaxed text-white/60 md:text-base">
          {description}
        </p>

        {/* Accent tagline */}
        <p className="text-sm font-medium" style={{ color: accentColor }}>
          {tagline}
        </p>
      </div>
    </motion.div>
  );
}
