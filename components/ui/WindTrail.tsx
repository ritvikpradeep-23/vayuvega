"use client";

import { motion } from "framer-motion";

export function WindTrail({ className = "" }: { className?: string }) {
  const paths = [
    "M0,80 C150,20 350,140 600,60 S900,20 1200,90",
    "M0,140 C200,90 380,190 620,120 S920,80 1200,150",
    "M0,200 C180,160 400,240 640,180 S940,150 1200,210",
  ];

  return (
    <svg
      viewBox="0 0 1200 260"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      {paths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke="url(#wind-gradient)"
          strokeWidth={1.5}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2.4, delay: i * 0.3, ease: "easeInOut" }}
        />
      ))}
      <defs>
        <linearGradient id="wind-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#16a672" stopOpacity="0" />
          <stop offset="50%" stopColor="#d4af37" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#16a672" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
