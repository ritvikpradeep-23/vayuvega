"use client";

import { motion } from "framer-motion";
import { Emblem } from "./Emblem";

export function HeroSilhouette({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 300 300" className="h-full w-full" aria-hidden>
        <defs>
          <radialGradient id="hud-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="150" cy="150" r="140" fill="url(#hud-glow)" />
        {[140, 115, 90].map((r) => (
          <circle key={r} cx="150" cy="150" r={r} fill="none" stroke="#d4af37" strokeOpacity="0.25" strokeWidth="1" />
        ))}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ originX: "150px", originY: "150px" }}
        >
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * Math.PI * 2;
            const round = (n: number) => Math.round(n * 100) / 100;
            const x1 = round(150 + Math.cos(angle) * 140);
            const y1 = round(150 + Math.sin(angle) * 140);
            const x2 = round(150 + Math.cos(angle) * (i % 6 === 0 ? 130 : 135));
            const y2 = round(150 + Math.sin(angle) * (i % 6 === 0 ? 130 : 135));
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#16a672" strokeOpacity="0.5" strokeWidth="1.5" />
            );
          })}
        </motion.g>
        <motion.path
          d="M40 190 C90 150 120 220 170 180 S250 140 280 160"
          fill="none"
          stroke="#16a672"
          strokeOpacity="0.5"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M20 130 C80 100 110 160 160 120 S230 90 290 110"
          fill="none"
          stroke="#d4af37"
          strokeOpacity="0.4"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.2, ease: "easeInOut" }}
        />
      </svg>
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_30px_rgba(212,175,55,0.5)] sm:h-36 sm:w-36"
      >
        <Emblem id="hero-emblem" className="h-full w-full" />
      </motion.div>
    </div>
  );
}
