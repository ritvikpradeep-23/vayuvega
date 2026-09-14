"use client";

import { motion } from "framer-motion";
import { originContent } from "@/lib/heroContent";

export function OriginStory() {
  return (
    <section id="origin" className="mx-auto max-w-6xl px-6 py-24 scroll-mt-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold tracking-[0.25em] text-kasavu">{originContent.eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl font-extrabold text-cream sm:text-5xl">
            {originContent.headlinePrefix}
            <span className="text-kasavu">{originContent.headlineGold}</span>
          </h2>

          <div className="mt-6 space-y-4">
            {originContent.paragraphs.map((p, i) => (
              <p key={i} className="text-mist leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-8 flex gap-4 border-l-2 border-kasavu pl-4">
            <div>
              <p className="font-display text-lg font-bold text-cream">{originContent.credit.name}</p>
              <p className="text-xs font-semibold tracking-widest text-mist">{originContent.credit.meta}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="rain-texture relative aspect-[4/5] rounded-[28px] border border-card-border bg-gradient-to-b from-[#1a2c40] via-[#13233a] to-[#0b1622]">
            <div className="absolute left-4 top-4 rounded-full border border-card-border bg-void/70 px-2.5 py-1 text-[9px] font-semibold tracking-wide text-mist backdrop-blur">
              ATMOSPHERIC PHOTO — PLACEHOLDER
            </div>
          </div>
          <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-card-border bg-void/90 p-4 backdrop-blur">
            <p className="text-[10px] font-semibold tracking-widest text-kasavu">{originContent.eventCard.label}</p>
            <p className="mt-1 font-display text-base font-bold text-cream">{originContent.eventCard.title}</p>
            <p className="text-xs text-mist">{originContent.eventCard.detail}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
