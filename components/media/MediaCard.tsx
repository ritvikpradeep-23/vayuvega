"use client";

import { motion } from "framer-motion";
import type { MediaItem } from "@/lib/mediaData";

const TYPE_STYLES: Record<MediaItem["type"], string> = {
  News: "bg-status-blue/15 text-status-blue border-status-blue/40",
  Video: "bg-red-500/15 text-red-400 border-red-500/40",
  Press: "bg-kasavu/15 text-kasavu border-kasavu/40",
  Photos: "bg-status-green/15 text-status-green border-status-green/40",
};

export function MediaCard({ item, index }: { item: MediaItem; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
      className="group overflow-hidden rounded-[20px] border border-card-border bg-card"
    >
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#1a2c40] to-[#0b1622]">
        <div className="rain-texture absolute inset-0 transition-transform duration-500 group-hover:scale-110" />
        <span className={`absolute left-3 top-3 rounded-full border px-2.5 py-1 text-[10px] font-bold ${TYPE_STYLES[item.type]}`}>
          {item.type}
        </span>
        <span className="absolute right-3 top-3 text-[10px] font-semibold text-mist/80">{item.year}</span>
        {item.duration && (
          <span className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-cream">
            {item.duration}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display text-sm font-bold text-cream">{item.title}</h3>
        <p className="mt-2 max-h-0 overflow-hidden text-xs text-mist opacity-0 transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100">
          {item.blurb}
        </p>
      </div>
    </motion.div>
  );
}
