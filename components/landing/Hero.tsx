"use client";

import { motion } from "framer-motion";
import { heroContent } from "@/lib/heroContent";
import { RunnerSilhouette } from "@/components/ui/RunnerSilhouette";
import { CTAButton } from "./CTAButton";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-16 sm:pt-24">
      <div className="rain-texture absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void to-void-deep" />

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-[0.25em] text-kasavu"
          >
            {heroContent.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-display text-6xl font-extrabold tracking-tight text-cream sm:text-7xl"
          >
            {heroContent.name.toUpperCase()}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-5xl font-extrabold tracking-tight text-kasavu sm:text-6xl"
          >
            {heroContent.malayalamName}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-lg text-lg text-mist"
          >
            {heroContent.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <CTAButton label={heroContent.ctaPrimary} />
            <a
              href="#cases"
              className="inline-flex items-center justify-center rounded-full border border-kasavu/50 px-8 py-3 text-sm font-bold tracking-widest text-cream hover:bg-kasavu/10"
            >
              {heroContent.ctaSecondary}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex gap-10"
          >
            {heroContent.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl font-extrabold text-kasavu">{stat.value}</p>
                <p className="mt-1 text-[11px] font-semibold tracking-widest text-mist">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="rain-texture relative aspect-[3/4] overflow-hidden rounded-[28px] border border-card-border bg-gradient-to-b from-[#152534] to-[#0b1622] p-6">
            <RunnerSilhouette className="h-full w-full" />

            <div className="absolute left-4 top-4 rounded-full border border-card-border bg-void/70 px-2.5 py-1 text-[9px] font-semibold tracking-wide text-mist backdrop-blur">
              HERO ILLUSTRATION — PLACEHOLDER
            </div>

            <div className="absolute right-4 top-4 rounded-full bg-void/80 px-3 py-1.5 text-[10px] font-bold tracking-widest text-kasavu backdrop-blur">
              {heroContent.windSpeedBadge}
            </div>

            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-card-border bg-void/90 p-3 backdrop-blur">
              <p className="text-[10px] font-semibold tracking-widest text-mist">{heroContent.statusBadge.label}</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-status-green" />
                <p className="text-sm font-bold text-cream">{heroContent.statusBadge.status}</p>
              </div>
              <p className="text-xs text-mist">{heroContent.statusBadge.location}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
