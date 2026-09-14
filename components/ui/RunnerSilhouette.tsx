"use client";

import { motion } from "framer-motion";

export function RunnerSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 320" className={className} aria-hidden>
      <defs>
        <linearGradient id="cape-grad" x1="0%" y1="0%" x2="100%" y2="60%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.05" />
          <stop offset="55%" stopColor="#8FA3B8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#C99A4A" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="body-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2c3f56" />
          <stop offset="100%" stopColor="#152534" />
        </linearGradient>
      </defs>

      <motion.path
        d="M150 90 C200 110 225 150 232 210 C210 190 190 165 165 150 C185 175 200 205 205 240 C180 210 155 185 130 172"
        fill="none"
        stroke="url(#cape-grad)"
        strokeWidth="10"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />

      <g>
        <circle cx="118" cy="72" r="16" fill="url(#body-grad)" />
        <path
          d="M110 86 C95 100 88 120 92 145 L108 210 L100 260 L118 260 L128 212 L138 172 L150 215 L146 260 L164 260 L162 200 L150 150 C158 130 150 108 132 92 C124 87 116 85 110 86Z"
          fill="url(#body-grad)"
        />
        <path d="M110 86 C124 87 132 92 132 92" stroke="#C99A4A" strokeWidth="2.5" fill="none" opacity="0.8" />
        <path d="M100 260 L118 260" stroke="#C99A4A" strokeWidth="3" opacity="0.6" />
        <path d="M146 260 L164 260" stroke="#C99A4A" strokeWidth="3" opacity="0.6" />
      </g>

      <motion.g
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="120" cy="230" r="26" fill="#0b1622" stroke="#C99A4A" strokeWidth="2" />
        <text x="120" y="239" textAnchor="middle" fontSize="24" fontWeight="700" fill="#C99A4A" fontFamily="var(--font-body)">
          V
        </text>
      </motion.g>
    </svg>
  );
}
