"use client";

import { motion } from "framer-motion";
import type { Villain } from "@/lib/villainsData";

export function VillainCard({ villain, index }: { villain: Villain; index: number }) {
  const isAtLarge = villain.status === "At Large";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-[20px] border border-white/10 bg-[#0d0d0f] p-6 transition-colors hover:border-red-900/50"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-red-950/10 opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold text-zinc-100">{villain.codename}</h3>
        <span
          className={`flex-shrink-0 rounded-full border px-3 py-1 text-[10px] font-bold tracking-widest ${
            isAtLarge
              ? "border-red-500/50 bg-red-500/10 text-red-400"
              : "border-zinc-600 bg-zinc-800/50 text-zinc-400"
          }`}
        >
          {villain.status.toUpperCase()}
        </span>
      </div>
      <p className="relative mt-2 text-xs font-semibold tracking-wide text-kasavu/80">{villain.power}</p>
      <p className="relative mt-4 text-sm text-zinc-400 opacity-70 transition-opacity group-hover:opacity-100">
        {villain.blurb}
      </p>
    </motion.div>
  );
}
