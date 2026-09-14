"use client";

import { motion } from "framer-motion";
import { powers } from "@/lib/heroContent";
import { HUDPanel } from "@/components/ui/HUDPanel";

export function Powers() {
  return (
    <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {powers.map((power, i) => (
        <motion.div
          key={power.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
        >
          <HUDPanel className="h-full">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-void text-2xl">
              {power.icon}
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-cream">{power.title}</h3>
            <p className="mt-2 text-sm text-mist">{power.description}</p>
            <p className="mt-4 text-xs font-bold tracking-wide text-kasavu">→ {power.stat}</p>
          </HUDPanel>
        </motion.div>
      ))}
    </div>
  );
}
