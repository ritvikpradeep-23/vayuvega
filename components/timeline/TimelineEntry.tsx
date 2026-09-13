"use client";

import { motion } from "framer-motion";
import type { TimelineEntry as TimelineEntryData } from "@/lib/timelineData";
import { CostumeBadge } from "@/components/costumes/CostumeBadge";
import { HUDPanel } from "@/components/ui/HUDPanel";

export function TimelineEntry({ entry, align }: { entry: TimelineEntryData; align: "left" | "right" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className={`relative flex items-center gap-6 ${align === "right" ? "sm:flex-row-reverse" : ""}`}
    >
      <div className="hidden sm:block sm:w-1/2" />
      <span className="absolute left-1/2 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-kasavu sm:block" />
      <div className="w-full sm:w-1/2">
        <HUDPanel className="flex items-start gap-4">
          <CostumeBadge era={entry.costumeEra} id={`timeline-${entry.year}`} className="h-12 w-12 flex-shrink-0" />
          <div>
            <p className="font-display text-sm tracking-widest text-monsoon">{entry.year}</p>
            <h3 className="mb-1 font-display text-lg tracking-wide text-kasavu">{entry.title}</h3>
            <p className="text-sm text-zinc-400">{entry.blurb}</p>
          </div>
        </HUDPanel>
      </div>
    </motion.div>
  );
}
