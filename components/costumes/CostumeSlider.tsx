"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { costumeData } from "@/lib/costumeData";
import { CostumeBadge } from "./CostumeBadge";
import { HUDPanel } from "@/components/ui/HUDPanel";

export function CostumeSlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const current = costumeData[index];

  const go = (next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  };

  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <h2 className="mb-12 text-center font-display text-3xl tracking-widest text-kasavu">COSTUME EVOLUTION</h2>

      <HUDPanel className="overflow-hidden">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => go(Math.max(0, index - 1))}
            disabled={index === 0}
            aria-label="Previous era"
            className="rounded-full border border-kasavu/30 p-2 text-kasavu disabled:opacity-30"
          >
            ←
          </button>

          <div className="relative h-64 flex-1 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.year}
                custom={direction}
                initial={{ x: direction >= 0 ? 60 : -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction >= 0 ? -60 : 60, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center"
              >
                <CostumeBadge era={current.era} id={`costume-${current.year}`} className="h-28 w-28" />
                <p className="font-display text-sm tracking-widest text-monsoon">{current.year}</p>
                <h3 className="font-display text-xl tracking-wide text-kasavu">{current.eraName}</h3>
                <p className="max-w-md text-sm text-zinc-400">{current.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={() => go(Math.min(costumeData.length - 1, index + 1))}
            disabled={index === costumeData.length - 1}
            aria-label="Next era"
            className="rounded-full border border-kasavu/30 p-2 text-kasavu disabled:opacity-30"
          >
            →
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {costumeData.map((c, i) => (
            <button
              key={c.year}
              onClick={() => go(i)}
              aria-label={`Show ${c.year} era`}
              className={`h-2 w-2 rounded-full transition-colors ${i === index ? "bg-kasavu" : "bg-zinc-600"}`}
            />
          ))}
        </div>
      </HUDPanel>
    </section>
  );
}
