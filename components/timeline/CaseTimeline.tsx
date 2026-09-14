"use client";

import { motion } from "framer-motion";
import { timelineData } from "@/lib/timelineData";
import { TimelineEntry } from "./TimelineEntry";

export function CaseTimeline() {
  return (
    <section id="cases" className="mx-auto max-w-6xl px-6 py-24 scroll-mt-20">
      <div className="text-center">
        <p className="text-xs font-bold tracking-[0.25em] text-kasavu">CASE HISTORY · 2006 – 2026</p>
        <h2 className="mt-4 font-display text-4xl font-extrabold text-cream sm:text-5xl">
          Twenty Years, <span className="text-kasavu">847 Cases</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-mist">
          A partial record. Most interventions remain unlogged by design — the only measure is that people went
          home.
        </p>
      </div>

      <div className="relative mt-14 hidden items-center justify-between sm:flex">
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-card-border" />
        {timelineData.map((entry, i) => (
          <div key={entry.year} className="relative z-10 flex flex-col items-center gap-2">
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`h-3 w-3 rounded-full ${i === 0 ? "bg-kasavu" : "border-2 border-mist bg-void"}`}
            />
            <span className="text-xs font-semibold text-mist">{entry.year}</span>
          </div>
        ))}
      </div>

      <div className="scrollbar-none mt-10 flex snap-x gap-6 overflow-x-auto pb-4">
        {timelineData.map((entry, i) => (
          <TimelineEntry key={entry.year} entry={entry} index={i} />
        ))}
      </div>
    </section>
  );
}
