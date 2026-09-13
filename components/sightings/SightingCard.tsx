"use client";

import { motion } from "framer-motion";
import type { Sighting } from "@/lib/sightingsData";
import { Emblem } from "@/components/ui/Emblem";
import { HUDPanel } from "@/components/ui/HUDPanel";

const STATUS_STYLES: Record<Sighting["status"], string> = {
  Reported: "bg-red-500/15 text-red-300 border-red-500/40",
  "On It": "bg-kasavu/15 text-kasavu border-kasavu/40",
  Resolved: "bg-monsoon/15 text-monsoon border-monsoon/40",
};

export function SightingCard({ sighting }: { sighting: Sighting }) {
  return (
    <HUDPanel className="flex items-center gap-4">
      <div className="relative h-10 w-10 flex-shrink-0">
        <motion.span
          animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-kasavu/40"
        />
        <Emblem id={`sighting-${sighting.id}`} className="relative h-10 w-10" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-zinc-200">{sighting.area}</p>
        <p className="truncate text-xs text-zinc-500">{sighting.caseType}</p>
      </div>
      <span className={`flex-shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${STATUS_STYLES[sighting.status]}`}>
        {sighting.status}
      </span>
    </HUDPanel>
  );
}
