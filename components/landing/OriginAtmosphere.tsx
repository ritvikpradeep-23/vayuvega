"use client";

import { motion } from "framer-motion";

export function OriginAtmosphere({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 500" className={className} preserveAspectRatio="xMidYMax slice" aria-hidden>
      <defs>
        <linearGradient id="oa-sky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0b1622" />
          <stop offset="55%" stopColor="#13233a" />
          <stop offset="100%" stopColor="#1a2c40" />
        </linearGradient>
        <radialGradient id="oa-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C99A4A" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#C99A4A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="oa-water" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0d2233" />
          <stop offset="100%" stopColor="#040b12" />
        </linearGradient>
        <linearGradient id="oa-reflection" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C99A4A" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#C99A4A" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="400" height="500" fill="url(#oa-sky)" />

      {/* distant glow, low on the horizon */}
      <circle cx="150" cy="300" r="120" fill="url(#oa-glow)" />

      {/* storm cloud masses */}
      <g fill="#0b1622" opacity="0.55">
        <ellipse cx="90" cy="70" rx="140" ry="48" />
        <ellipse cx="260" cy="45" rx="160" ry="55" />
        <ellipse cx="330" cy="110" rx="110" ry="40" />
      </g>

      {/* distant tree/hill line */}
      <path
        d="M0 300 L20 288 L45 296 L70 280 L95 292 L120 278 L150 290 L180 282 L210 294 L240 280 L270 290 L300 276 L330 288 L360 280 L400 292 L400 320 L0 320 Z"
        fill="#0a1826"
        opacity="0.85"
      />

      {/* bent palm silhouettes */}
      <g stroke="#0a1826" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.9">
        <path d="M55 300 C50 250 70 210 100 190" />
        <path d="M100 190 C80 185 60 178 42 185" />
        <path d="M100 190 C82 198 62 200 44 210" />
        <path d="M100 190 C90 172 78 158 64 150" />
        <path d="M100 190 C104 170 108 152 118 138" />
      </g>
      <g stroke="#0a1826" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.85">
        <path d="M338 302 C346 256 330 222 302 205" />
        <path d="M302 205 C320 198 340 194 356 202" />
        <path d="M302 205 C318 214 336 218 352 228" />
        <path d="M302 205 C296 188 292 172 300 156" />
      </g>

      {/* flood water */}
      <rect x="0" y="300" width="400" height="200" fill="url(#oa-water)" />
      <rect x="130" y="300" width="40" height="200" fill="url(#oa-reflection)" opacity="0.5" />

      {/* ripple lines on the water */}
      <g stroke="#4a6a80" strokeWidth="1.5" opacity="0.35" fill="none">
        <path d="M20 340 Q80 334 140 340 T260 340 T400 340" />
        <path d="M0 372 Q70 366 140 372 T280 372 T400 372" />
        <path d="M30 408 Q100 402 170 408 T320 408 T400 408" />
        <path d="M0 448 Q90 442 180 448 T360 448 T400 448" />
      </g>

      {/* rain streaks */}
      {[
        [40, 20], [95, 60], [150, 10], [205, 45], [260, 15], [315, 55], [360, 25], [20, 110], [180, 120], [330, 130],
      ].map(([x, delay], i) => (
        <motion.line
          key={i}
          x1={x}
          y1={-20}
          x2={x - 18}
          y2={60}
          stroke="#8FA3B8"
          strokeWidth="1.4"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ y1: [-20, 480], y2: [60, 560], opacity: [0, 0.5, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear", delay: (delay as number) / 40 }}
        />
      ))}
    </svg>
  );
}
