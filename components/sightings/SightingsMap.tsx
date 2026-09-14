"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sightingsData, vayuvegaPosition, type Sighting } from "@/lib/sightingsData";
import { KeralaOutline } from "./KeralaOutline";

const STATUS_DOT: Record<Sighting["status"], string> = {
  Reported: "bg-status-amber",
  "On It": "bg-status-blue",
  Resolved: "bg-status-green",
};

const STATUS_PILL: Record<Sighting["status"], string> = {
  Reported: "bg-status-amber/15 text-status-amber border-status-amber/40",
  "On It": "bg-status-blue/15 text-status-blue border-status-blue/40",
  Resolved: "bg-status-green/15 text-status-green border-status-green/40",
};

export function SightingsMap() {
  const [selectedId, setSelectedId] = useState<string>(sightingsData[0].id);
  const selected = sightingsData.find((s) => s.id === selectedId) ?? sightingsData[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] border border-card-border bg-void-deep">
        <KeralaOutline className="absolute inset-0 h-full w-full" />

        {sightingsData.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedId(s.id)}
            aria-label={s.location}
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <span className="relative flex h-4 w-4 items-center justify-center">
              <motion.span
                animate={{ scale: [1, 2], opacity: [0.6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                className={`absolute h-full w-full rounded-full ${STATUS_DOT[s.status]}`}
              />
              <span
                className={`h-2.5 w-2.5 rounded-full border-2 ${STATUS_DOT[s.status]} ${
                  selectedId === s.id ? "border-cream" : "border-void"
                }`}
              />
            </span>
          </button>
        ))}

        <div
          style={{ left: `${vayuvegaPosition.x}%`, top: `${vayuvegaPosition.y}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
        >
          <span className="relative flex h-8 w-8 items-center justify-center">
            <motion.span
              animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              className="absolute h-full w-full rounded-full bg-kasavu"
            />
            <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-kasavu bg-void font-display text-[11px] font-bold text-kasavu shadow-[0_0_12px_rgba(201,154,74,0.6)]">
              V
            </span>
          </span>
        </div>

        <div className="absolute bottom-3 left-3 rounded-full border border-card-border bg-void/80 px-3 py-1 text-[10px] font-semibold text-mist backdrop-blur">
          KERALA REGION · STYLIZED MAP
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {sightingsData.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedId(s.id)}
              className={`rounded-full border px-3 py-1 text-[11px] font-semibold transition-colors ${
                selectedId === s.id ? "border-kasavu text-cream" : "border-card-border text-mist hover:text-cream"
              }`}
            >
              {s.location}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex-1 rounded-[20px] border border-card-border bg-card p-6"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-kasavu/40 bg-void font-display text-sm font-bold text-kasavu">
                V
              </span>
              <span className={`rounded-full border px-3 py-1 text-[11px] font-bold ${STATUS_PILL[selected.status]}`}>
                {selected.status}
              </span>
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-cream">{selected.location}</h3>
            <p className="mt-1 text-sm text-mist">{selected.type}</p>
            <div className="mt-4 space-y-1 text-xs text-mist">
              <p>Timestamp: {selected.timestamp}</p>
              <p>District: {selected.district}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
