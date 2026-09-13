"use client";

import { motion } from "framer-motion";
import { heroContent } from "@/lib/heroContent";
import { HUDPanel } from "@/components/ui/HUDPanel";

export function Powers() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center font-display text-3xl tracking-widest text-kasavu"
      >
        POWERS
      </motion.h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {heroContent.powers.map((power, i) => (
          <motion.div
            key={power.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <HUDPanel>
              <h3 className="mb-2 font-display text-lg tracking-wide text-monsoon">{power.title}</h3>
              <p className="text-sm text-zinc-400">{power.description}</p>
            </HUDPanel>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
