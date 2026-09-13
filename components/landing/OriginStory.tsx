"use client";

import { motion } from "framer-motion";
import { heroContent } from "@/lib/heroContent";
import { HUDPanel } from "@/components/ui/HUDPanel";

export function OriginStory() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center font-display text-3xl tracking-widest text-kasavu"
      >
        ORIGIN
      </motion.h2>
      <HUDPanel className="space-y-5">
        {heroContent.originStory.map((paragraph, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-zinc-300 leading-relaxed"
          >
            {paragraph}
          </motion.p>
        ))}
      </HUDPanel>
    </section>
  );
}
