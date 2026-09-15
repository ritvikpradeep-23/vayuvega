import type { TrackerSuitId } from "@/lib/trackerSuitsData";

const SUIT_PATH = "M50 8 L86 26 V60 C86 90 68 106 50 116 C32 106 14 90 14 60 V26 Z";

export function TrackerSuitBadge({ id, className = "", suitId }: { id: string; className?: string; suitId: TrackerSuitId }) {
  return (
    <svg viewBox="0 0 100 124" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}-fill`} x1="0%" y1="0%" x2="100%" y2="100%">
          {fillStops(suitId)}
        </linearGradient>
        <pattern id={`${id}-dots`} width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.7" fill="#20302f" />
        </pattern>
      </defs>

      <path d={SUIT_PATH} fill={suitId === "kayal-stealth" ? `url(#${id}-dots)` : `url(#${id}-fill)`} />
      <path d={SUIT_PATH} fill="none" stroke={strokeColor(suitId)} strokeWidth="2" opacity="0.85" />

      {suitId === "thattu" && (
        <>
          <g stroke="#8b8aa8" strokeWidth="1" opacity="0.6">
            <line x1="26" y1="34" x2="66" y2="70" />
            <line x1="34" y1="34" x2="74" y2="70" />
            <line x1="66" y1="34" x2="26" y2="70" />
            <line x1="74" y1="34" x2="34" y2="70" />
          </g>
          <circle cx="24" cy="72" r="3" fill="none" stroke="#8b8aa8" strokeWidth="1.5" />
          <circle cx="76" cy="72" r="3" fill="none" stroke="#8b8aa8" strokeWidth="1.5" />
          <circle cx="30" cy="98" r="3" fill="none" stroke="#8b8aa8" strokeWidth="1.5" />
          <circle cx="70" cy="98" r="3" fill="none" stroke="#8b8aa8" strokeWidth="1.5" />
        </>
      )}

      {suitId === "kera-tech" && (
        <>
          <line x1="50" y1="20" x2="50" y2="108" stroke="#4dfff0" strokeWidth="1.5" opacity="0.75" />
          <path d="M18 44 Q4 40 6 54 Q16 56 24 48 Z" fill="none" stroke="#4dfff0" strokeWidth="1.5" opacity="0.85" />
          <path d="M82 44 Q96 40 94 54 Q84 56 76 48 Z" fill="none" stroke="#4dfff0" strokeWidth="1.5" opacity="0.85" />
        </>
      )}

      {suitId === "kayal-stealth" && (
        <>
          <circle cx="74" cy="66" r="6" fill="none" stroke="#1f6b6b" strokeWidth="1.5" opacity="0.9" />
          <circle cx="74" cy="66" r="2" fill="#1f6b6b" opacity="0.9" />
          <path d="M30 108 l-6 8 M42 112 l-4 8" stroke="#1f6b6b" strokeWidth="1.5" opacity="0.7" />
        </>
      )}

      {suitId === "kaithapoo-storm" && (
        <>
          <path d="M22 30 Q50 12 78 30" fill="none" stroke="#ffe14d" strokeWidth="2" opacity="0.85" />
          <path d="M52 22 L42 56 L52 56 L46 96 L64 50 L52 50 Z" fill="#ffe14d" opacity="0.85" />
          <circle cx="20" cy="62" r="4" fill="none" stroke="#ffe14d" strokeWidth="1.5" opacity="0.8" />
          <circle cx="80" cy="62" r="4" fill="none" stroke="#ffe14d" strokeWidth="1.5" opacity="0.8" />
        </>
      )}

      {suitId === "theyyam-integrated" && (
        <g stroke="#d4af37" strokeWidth="1.5" opacity="0.9">
          <line x1="50" y1="10" x2="50" y2="-6" />
          <line x1="50" y1="10" x2="36" y2="-2" />
          <line x1="50" y1="10" x2="64" y2="-2" />
          <line x1="50" y1="10" x2="26" y2="10" />
          <line x1="50" y1="10" x2="74" y2="10" />
          <circle cx="44" cy="24" r="1.6" fill="#d4af37" stroke="none" />
          <circle cx="56" cy="24" r="1.6" fill="#d4af37" stroke="none" />
          <circle cx="18" cy="34" r="2.5" fill="none" />
          <circle cx="82" cy="34" r="2.5" fill="none" />
        </g>
      )}
    </svg>
  );
}

function fillStops(suitId: TrackerSuitId) {
  switch (suitId) {
    case "thattu":
      return (
        <>
          <stop offset="0%" stopColor="#2a2419" />
          <stop offset="100%" stopColor="#3a3226" />
        </>
      );
    case "kera-tech":
      return (
        <>
          <stop offset="0%" stopColor="#3a2a18" />
          <stop offset="100%" stopColor="#4a3420" />
        </>
      );
    case "kaithapoo-storm":
      return (
        <>
          <stop offset="0%" stopColor="#3a3d42" />
          <stop offset="100%" stopColor="#4a4d52" />
        </>
      );
    case "theyyam-integrated":
      return (
        <>
          <stop offset="0%" stopColor="#5a1a20" />
          <stop offset="100%" stopColor="#6e1e24" />
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
    case "thattu":
      return "#8b8aa8";
    case "kera-tech":
      return "#4dfff0";
    case "kayal-stealth":
      return "#1f6b6b";
    case "kaithapoo-storm":
      return "#ffe14d";
    case "theyyam-integrated":
      return "#d4af37";
  }
}
