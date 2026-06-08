"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type VisionRowProps = {
  card: ReactNode;
  textBlock: ReactNode;
  orientation: "card-left" | "card-right";
};

export function VisionRow({ card, textBlock, orientation }: VisionRowProps) {
  const reduce = useReducedMotion();
  const cardLeft = orientation === "card-left";

  return (
    <motion.div
      className="grid grid-cols-1 items-center gap-8 md:grid-cols-[55fr_45fr] md:gap-12 lg:gap-20"
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Card column */}
      <div className={cardLeft ? "md:order-1" : "md:order-2"}>
        {card}
      </div>

      {/* Text column */}
      <div className={cardLeft ? "md:order-2" : "md:order-1"}>
        {textBlock}
      </div>
    </motion.div>
  );
}
