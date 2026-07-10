"use client";

import { useReducedMotion } from "framer-motion";

import { Speckles } from "@/components/hero/Speckles";

export function HeroBackground() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-wisk-bg"
    >
      {/* Layer 1 — drifting orbs (or static radial gradient fallback) */}
      {reduce ? (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_15%,rgba(195,255,50,0.22)_0%,transparent_55%),radial-gradient(ellipse_at_80%_85%,rgba(1,108,129,0.18)_0%,transparent_50%),radial-gradient(ellipse_at_55%_45%,rgba(195,255,50,0.14)_0%,transparent_45%)]" />
      ) : (
        <>
          <div className="hero-orb-lg hero-orb-lg-1" />
          <div className="hero-orb-lg hero-orb-lg-2" />
          <div className="hero-orb-lg hero-orb-lg-3" />
        </>
      )}

      {/* Layer 2 — drifting/twinkling speckles (star field) */}
      <Speckles />

      {/* Layer 3 — dot-grid texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(195,255,50,0.10) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Layer 4 — soft glow band behind the card strip */}
      <div
        className="absolute bottom-0 left-0 right-0 h-72"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(195,255,50,0.08) 40%, rgba(1,108,129,0.06) 70%, transparent)",
          filter: "blur(32px)",
        }}
      />
    </div>
  );
}
