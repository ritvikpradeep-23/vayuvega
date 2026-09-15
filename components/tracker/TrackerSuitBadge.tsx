import type { TrackerSuitId } from "@/lib/trackerSuitsData";

const SUIT_PATH = "M50 8 L86 26 V60 C86 90 68 106 50 116 C32 106 14 90 14 60 V26 Z";
const SPIRAL_PATH = "M50 34 a10 10 0 1 1 -7 17 a5 5 0 1 0 3.5 -8.5";

export function TrackerSuitBadge({ id, className = "", suitId }: { id: string; className?: string; suitId: TrackerSuitId }) {
  return (
    <svg viewBox="0 0 100 124" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}-fill`} x1="0%" y1="0%" x2="100%" y2="100%">
          {fillStops(suitId)}
        </linearGradient>
        <pattern id={`${id}-dots`} width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.7" fill="#2a3336" />
        </pattern>
      </defs>

      <path d={SUIT_PATH} fill={suitId === "kayal-stealth" ? `url(#${id}-dots)` : `url(#${id}-fill)`} />
      <path d={SUIT_PATH} fill="none" stroke={strokeColor(suitId)} strokeWidth="2" opacity="0.85" />

      {suitId === "monsoon-weave" && (
        <>
          <g stroke="#4dfff0" strokeWidth="1.2" opacity="0.55">
            <line x1="20" y1="40" x2="80" y2="40" />
            <line x1="20" y1="58" x2="80" y2="58" />
            <line x1="20" y1="76" x2="80" y2="76" />
          </g>
          <path d={SPIRAL_PATH} fill="none" stroke="#4dfff0" strokeWidth="2.5" opacity="0.9" />
        </>
      )}

      {suitId === "kayal-stealth" && (
        <circle cx="50" cy="68" r="4" fill="#f5a623" opacity="0.9">
          <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2.2s" repeatCount="indefinite" />
        </circle>
      )}

      {suitId === "onam-festival" && (
        <g stroke="#d4af37" strokeWidth="2" opacity="0.9">
          <line x1="18" y1="30" x2="18" y2="90" />
          <line x1="82" y1="30" x2="82" y2="90" />
          <line x1="24" y1="20" x2="76" y2="20" />
          <path d={SPIRAL_PATH} stroke="#d4af37" fill="none" strokeWidth="2.5" />
        </g>
      )}

      {suitId === "signal-storm" && (
        <>
          <path d="M58 14 L40 62 L54 62 L44 112 L74 54 L58 54 Z" fill="#ff7a30" opacity="0.85" />
          <g stroke="#ff7a30" strokeWidth="1" opacity="0.5">
            <line x1="14" y1="48" x2="30" y2="48" />
            <line x1="14" y1="66" x2="30" y2="66" />
            <line x1="14" y1="84" x2="30" y2="84" />
          </g>
          <circle cx="24" cy="100" r="5" fill="none" stroke="#ff7a30" strokeWidth="1.5" />
          <circle cx="76" cy="100" r="5" fill="none" stroke="#ff7a30" strokeWidth="1.5" />
        </>
      )}

      {suitId === "backup-stitch" && (
        <>
          <rect x="30" y="44" width="26" height="22" fill="#2a4a46" opacity="0.9" />
          <rect
            x="30"
            y="44"
            width="26"
            height="22"
            fill="none"
            stroke="#7fb8b0"
            strokeWidth="1.5"
            strokeDasharray="2 2"
            opacity="0.9"
          />
          <line x1="30" y1="55" x2="56" y2="55" stroke="#7fb8b0" strokeWidth="1" strokeDasharray="1.5 1.5" opacity="0.7" />
        </>
      )}
    </svg>
  );
}

function fillStops(suitId: TrackerSuitId) {
  switch (suitId) {
    case "monsoon-weave":
      return (
        <>
          <stop offset="0%" stopColor="#20282a" />
          <stop offset="100%" stopColor="#2d3a3c" />
        </>
      );
    case "onam-festival":
      return (
        <>
          <stop offset="0%" stopColor="#7a1f26" />
          <stop offset="100%" stopColor="#9c2b33" />
        </>
      );
    case "signal-storm":
      return (
        <>
          <stop offset="0%" stopColor="#211a45" />
          <stop offset="100%" stopColor="#2c2560" />
        </>
      );
    case "backup-stitch":
      return (
        <>
          <stop offset="0%" stopColor="#20282a" />
          <stop offset="100%" stopColor="#2d3a3c" />
        </>
      );
    default:
      return (
        <>
          <stop offset="0%" stopColor="#101314" />
          <stop offset="100%" stopColor="#1a1f21" />
        </>
      );
  }
}

function strokeColor(suitId: TrackerSuitId): string {
  switch (suitId) {
    case "monsoon-weave":
      return "#4dfff0";
    case "kayal-stealth":
      return "#6f9a95";
    case "onam-festival":
      return "#d4af37";
    case "signal-storm":
      return "#ff7a30";
    case "backup-stitch":
      return "#7fb8b0";
  }
}
