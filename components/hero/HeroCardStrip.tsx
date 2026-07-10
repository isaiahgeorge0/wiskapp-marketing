"use client";

import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const SHIFT_INTERVAL_MS = 4000;
const TRANSITION_S = 0.8;
const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

function getSizes(containerWidth: number): [number, number] {
  if (containerWidth >= 1024) return [280, 24];
  if (containerWidth >= 768) return [260, 20];
  if (containerWidth >= 480) return [240, 16];
  return [220, 12];
}

type HeroCardStripProps = {
  cards: ReactNode[];
};

export function HeroCardStrip({ cards }: HeroCardStripProps) {
  const reduce = useReducedMotion();
  const count = cards.length;
  const controls = useAnimationControls();
  const containerRef = useRef<HTMLDivElement>(null);
  const [sizes, setSizes] = useState<[number, number]>([280, 24]);

  // Starts at count so we're showing copy 2, with copy 1 as back-buffer and
  // copy 3 as forward-buffer. Loop snaps from copy-3 → copy-2 invisibly.
  const offsetRef = useRef(count);

  const [cardW, gap] = sizes;
  const step = cardW + gap;
  // Keep a mutable ref so the stable interval closure always reads the latest step
  const stepRef = useRef(step);
  stepRef.current = step;

  // Pause flags — written by hover/touch events, read inside the interval tick.
  // Using refs means the interval never needs to be recreated when pause changes.
  const hoveredRef = useRef(false);
  const touchPausedRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Expose reduce as a ref so the interval closure reads the live value
  const reduceRef = useRef<boolean>(reduce ?? false);
  reduceRef.current = reduce ?? false;

  const touchStartX = useRef<number | null>(null);

  // ── Container measurement ───────────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setSizes(getSizes(el.offsetWidth));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ── Position sync on resize (before paint) ──────────────────────────────
  useLayoutEffect(() => {
    controls.set({ x: -(offsetRef.current * step) });
  }, [step, controls]);

  // ── Loop-reset: after animating into copy 3, silently snap to copy 2 ────
  const handleAnimationComplete = useCallback(() => {
    if (offsetRef.current >= count * 2) {
      offsetRef.current = count;
      controls.set({ x: -(count * stepRef.current) });
    }
  }, [controls, count]);

  // ── Auto-advance interval ───────────────────────────────────────────────
  // Created once on mount and never recreated. All dynamic values are read
  // through refs so there are no stale-closure issues.
  useEffect(() => {
    const id = setInterval(() => {
      if (hoveredRef.current || touchPausedRef.current || reduceRef.current) {
        return;
      }
      const next = offsetRef.current + 1;
      offsetRef.current = next;
      void controls.start({
        x: -(next * stepRef.current),
        transition: { duration: TRANSITION_S, ease: EASE },
      });
    }, SHIFT_INTERVAL_MS);

    return () => {
      clearInterval(id);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty — reads live state via refs

  // ── Render ──────────────────────────────────────────────────────────────
  const looped = [...cards, ...cards, ...cards];

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      const next = offsetRef.current + (dx < 0 ? 1 : -1);
      const clamped = Math.max(1, Math.min(count * 2 - 1, next));
      offsetRef.current = clamped;
      void controls.start({
        x: -(clamped * stepRef.current),
        transition: { duration: TRANSITION_S, ease: EASE },
      });
      touchPausedRef.current = true;
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = setTimeout(() => {
        touchPausedRef.current = false;
      }, 6000);
    }
    touchStartX.current = null;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none"
      onMouseEnter={() => { hoveredRef.current = true; }}
      onMouseLeave={() => { hoveredRef.current = false; }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label="WISK product features"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-28"
        style={{ background: "linear-gradient(to right, #141b27, transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-28"
        style={{ background: "linear-gradient(to left, #141b27, transparent)" }}
      />

      <div className="overflow-hidden">
        <motion.div
          className="flex"
          style={{ gap }}
          animate={controls}
          onAnimationComplete={handleAnimationComplete}
        >
          {looped.map((card, i) => (
            <div
              key={i}
              style={{ width: cardW, flexShrink: 0 }}
              aria-hidden={i >= count}
            >
              {card}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
