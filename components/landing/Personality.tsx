"use client";

import { motion } from "framer-motion";
import { heroContent } from "@/lib/heroContent";
import { HUDPanel } from "@/components/ui/HUDPanel";
import { CTAButton } from "./CTAButton";

export function Personality() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="mb-8 font-display text-3xl tracking-widest text-kasavu"
      >
        {heroContent.personality.trait.toUpperCase()}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <HUDPanel>
          <p className="mb-6 text-zinc-300">{heroContent.personality.description}</p>
          <p className="font-display text-xl italic text-monsoon">&ldquo;{heroContent.personality.quote}&rdquo;</p>
        </HUDPanel>
      </motion.div>
      <div className="mt-12">
        <CTAButton label={heroContent.ctaSecondary} variant="secondary" />
      </div>
    </section>
  );
}
