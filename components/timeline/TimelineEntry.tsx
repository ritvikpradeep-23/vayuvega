"use client";

import { motion } from "framer-motion";
import type { TimelineEntry as TimelineEntryData } from "@/lib/timelineData";

export function TimelineEntry({ entry, index }: { entry: TimelineEntryData; index: number }) {
  const intensity = index / 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="w-[300px] flex-shrink-0 snap-start rounded-[24px] border p-6"
      style={{
        borderColor: `rgba(201, 154, 74, ${0.15 + intensity * 0.35})`,
        background: "var(--color-card)",
        boxShadow: intensity > 0.5 ? `0 0 ${30 * intensity}px rgba(201, 154, 74, ${intensity * 0.15})` : undefined,
      }}
    >
      <div className="flex items-center gap-2">
        <span className="font-display text-sm font-bold text-cream">{entry.year}</span>
        <span className="rounded-full bg-void px-2 py-0.5 text-[10px] font-bold tracking-wide text-kasavu">
          {entry.era}
        </span>
      </div>
      <div className="mt-4 flex h-11 w-11 items-center justify-center rounded-full bg-void text-xl">
        {entry.icon}
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-cream">{entry.title}</h3>
      <p className="mt-2 text-sm text-mist">{entry.blurb}</p>
      <p className="mt-4 text-[10px] font-bold tracking-widest text-mist">{entry.tag}</p>
      <p className="mt-1 font-display text-sm font-extrabold text-kasavu">{entry.stat}</p>
    </motion.div>
  );
}
