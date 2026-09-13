"use client";

import { motion } from "framer-motion";
import { heroContent } from "@/lib/heroContent";
import { WindTrail } from "@/components/ui/WindTrail";
import { HeroSilhouette } from "@/components/ui/HeroSilhouette";
import { CTAButton } from "./CTAButton";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <WindTrail className="opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/95 to-void" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mb-6 h-64 w-64 sm:h-80 sm:w-80"
      >
        <HeroSilhouette className="h-full w-full" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 font-display text-5xl font-bold tracking-[0.2em] text-kasavu sm:text-7xl"
      >
        {heroContent.name.toUpperCase()}
      </motion.h1>
      <p className="relative z-10 mt-2 text-sm tracking-[0.3em] text-monsoon">{heroContent.malayalamName}</p>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="relative z-10 mt-6 max-w-xl text-lg text-zinc-200"
      >
        {heroContent.tagline}
      </motion.p>
      <p className="relative z-10 mt-2 max-w-lg text-sm text-zinc-400">{heroContent.subtagline}</p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative z-10 mt-10"
      >
        <CTAButton label={heroContent.ctaPrimary} />
      </motion.div>
    </section>
  );
}
