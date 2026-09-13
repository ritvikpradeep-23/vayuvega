"use client";

import { motion } from "framer-motion";
import { heroContent } from "@/lib/heroContent";

export function Mission() {
  return (
    <section className="relative overflow-hidden bg-void-deep px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-8 font-display text-3xl tracking-widest text-kasavu"
        >
          MISSION
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-lg leading-relaxed text-zinc-300"
        >
          {heroContent.missionText}
        </motion.p>
      </div>
    </section>
  );
}
