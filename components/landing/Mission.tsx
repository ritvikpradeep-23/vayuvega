"use client";

import { motion } from "framer-motion";
import { missionContent } from "@/lib/heroContent";
import { Powers } from "./Powers";

export function Mission() {
  return (
    <section className="bg-void-deep px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-bold tracking-[0.25em] text-kasavu"
        >
          {missionContent.eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 font-display text-4xl font-extrabold text-cream sm:text-5xl"
        >
          {missionContent.headline}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-mist"
        >
          {missionContent.subcopy}
        </motion.p>
      </div>

      <Powers />
    </section>
  );
}
