"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { costumeData } from "@/lib/costumeData";
import { CostumeBadge } from "./CostumeBadge";
import { HUDPanel } from "@/components/ui/HUDPanel";

const CostumeModel3D = dynamic(() => import("./CostumeModel3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-xs text-mist">Loading 3D model…</div>
  ),
});

export function CostumeSlider() {
  const [index, setIndex] = useState(0);
  const current = costumeData[index];

  return (
    <section id="costumes" className="mx-auto max-w-6xl px-6 py-24 scroll-mt-20">
      <div className="text-center">
        <p className="text-xs font-bold tracking-[0.25em] text-kasavu">COSTUME EVOLUTION · 5 ERAS · 20 YEARS</p>
        <h2 className="mt-4 font-display text-4xl font-extrabold text-cream sm:text-5xl">
          The Suit Evolves. <span className="text-kasavu">The Kasavu Remains.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-mist">
          From a fisherman&apos;s coat to phase-shift composite — each iteration reflects a lesson learned in the
          field. The gold border has never left.
        </p>
      </div>

      <div className="mt-10 flex justify-center gap-2">
        {costumeData.map((c, i) => (
          <button
            key={c.year}
            onClick={() => setIndex(i)}
            className={`rounded-full px-4 py-2 text-xs font-bold tracking-widest transition-colors ${
              i === index ? "bg-gradient-to-r from-kasavu to-kasavu-soft text-void" : "border border-card-border text-mist hover:text-cream"
            }`}
          >
            {c.year}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`portrait-${current.year}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-card-border bg-gradient-to-b from-[#152534] to-[#0b1622]">
              <div className="absolute left-4 top-4 z-10 rounded-full border border-card-border bg-void/70 px-2.5 py-1 text-[9px] font-semibold tracking-wide text-mist backdrop-blur">
                {current.suitName.toUpperCase()} — 3D MODEL
              </div>
              <CostumeModel3D era={current.era} />
            </div>
            <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-card-border bg-void/90 p-4 backdrop-blur">
              <p className="text-xs font-semibold text-mist">{current.year} · {current.material}</p>
              <p className="font-display text-lg font-bold text-cream">{current.suitName}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`lore-${current.year}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xs font-bold tracking-widest text-kasavu">ERA {index + 1} OF {costumeData.length}</p>
            <h3 className="mt-2 font-display text-2xl font-extrabold text-cream">
              {current.suitName} <span className="text-mist font-medium">· {current.year}</span>
            </h3>
            <p className="mt-4 text-mist leading-relaxed">{current.description}</p>

            <HUDPanel className="mt-6">
              <p className="text-[10px] font-bold tracking-widest text-kasavu">DESIGN DETAILS</p>
              <ul className="mt-3 space-y-2">
                {current.details.map((d) => (
                  <li key={d} className="flex gap-2 text-sm text-mist">
                    <span className="text-kasavu">•</span>
                    {d}
                  </li>
                ))}
              </ul>
            </HUDPanel>

            <div className="mt-6">
              <p className="text-[10px] font-bold tracking-widest text-mist">EVOLUTION PROGRESS</p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-card">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-kasavu to-kasavu-soft"
                  animate={{ width: `${((index + 1) / costumeData.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                disabled={index === 0}
                className="rounded-full border border-kasavu/40 px-5 py-2 text-xs font-bold tracking-widest text-cream disabled:opacity-30"
              >
                ← Previous Era
              </button>
              <button
                onClick={() => setIndex((i) => Math.min(costumeData.length - 1, i + 1))}
                disabled={index === costumeData.length - 1}
                className="rounded-full border border-kasavu/40 px-5 py-2 text-xs font-bold tracking-widest text-cream disabled:opacity-30"
              >
                Next Era →
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex justify-center gap-4">
        {costumeData.map((c, i) => (
          <button
            key={c.year}
            onClick={() => setIndex(i)}
            aria-label={`Show ${c.suitName}`}
            className={`h-16 w-16 overflow-hidden rounded-xl border p-2 transition-colors ${
              i === index ? "border-kasavu bg-card" : "border-card-border bg-void-deep"
            }`}
          >
            <CostumeBadge era={c.era} id={`costume-thumb-${c.year}`} className="h-full w-full" />
          </button>
        ))}
      </div>
    </section>
  );
}
