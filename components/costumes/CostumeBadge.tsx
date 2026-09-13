import type { CostumeEra } from "@/lib/costumeData";

const SUIT_PATH = "M50 8 L86 26 V60 C86 90 68 106 50 116 C32 106 14 90 14 60 V26 Z";

export function CostumeBadge({ era, className = "", id }: { era: CostumeEra; className?: string; id: string }) {
  return (
    <svg viewBox="0 0 100 124" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}-fill`} x1="0%" y1="0%" x2="100%" y2="100%">
          {eraGradientStops(era)}
        </linearGradient>
        <pattern id={`${id}-hatch`} width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill="#52525b" />
          <line x1="0" y1="0" x2="0" y2="6" stroke="#71717a" strokeWidth="1.5" />
        </pattern>
      </defs>

      <path d={SUIT_PATH} fill={era === "poncho" ? `url(#${id}-hatch)` : `url(#${id}-fill)`} opacity={era === "poncho" ? 0.9 : 1} />
      <path d={SUIT_PATH} fill="none" stroke={eraStrokeColor(era)} strokeWidth="2" opacity="0.8" />

      {era === "kasavu-line" && (
        <path
          d={SUIT_PATH}
          fill="none"
          stroke="#d4af37"
          strokeWidth="2.5"
          strokeDasharray="3 3"
          opacity="0.9"
          transform="scale(0.92) translate(4.3 5.3)"
        />
      )}

      {era === "hud-era" && (
        <g stroke="#d4af37" strokeOpacity="0.5" strokeWidth="0.8">
          <line x1="26" y1="40" x2="74" y2="40" />
          <line x1="24" y1="55" x2="76" y2="55" />
          <line x1="26" y1="70" x2="74" y2="70" />
          <line x1="40" y1="26" x2="40" y2="100" />
          <line x1="60" y1="26" x2="60" y2="100" />
        </g>
      )}

      {era === "storm-runner" && (
        <g stroke="#16a672" strokeWidth="2" strokeLinecap="round" opacity="0.85">
          <path d="M18 40 L14 60 L18 90" fill="none" />
          <path d="M82 40 L86 60 L82 90" fill="none" />
        </g>
      )}

      {era !== "poncho" && (
        <g transform="translate(50 52)">
          <path
            d="M-8 0 a8 8 0 0 1 15 -5 a6.5 6.5 0 0 1 10 5 a6 6 0 0 1 -1 12 H-7 a6.5 6.5 0 0 1 -1 -12Z"
            fill="#0a0a17"
            opacity="0.85"
          />
        </g>
      )}
    </svg>
  );
}

function eraGradientStops(era: CostumeEra) {
  switch (era) {
    case "first-emblem":
      return (
        <>
          <stop offset="0%" stopColor="#3f5d3f" />
          <stop offset="100%" stopColor="#8a7328" />
        </>
      );
    case "storm-runner":
      return (
        <>
          <stop offset="0%" stopColor="#12253a" />
          <stop offset="100%" stopColor="#155e42" />
        </>
      );
    case "hud-era":
      return (
        <>
          <stop offset="0%" stopColor="#0e0e28" />
          <stop offset="100%" stopColor="#2a2456" />
        </>
      );
    case "kasavu-line":
      return (
        <>
          <stop offset="0%" stopColor="#0a0a17" />
          <stop offset="100%" stopColor="#1c1c33" />
        </>
      );
    default:
      return (
        <>
          <stop offset="0%" stopColor="#3f3f46" />
          <stop offset="100%" stopColor="#52525b" />
        </>
      );
  }
}

function eraStrokeColor(era: CostumeEra): string {
  switch (era) {
    case "poncho":
      return "#71717a";
    case "first-emblem":
      return "#d4af37";
    case "storm-runner":
      return "#16a672";
    case "hud-era":
      return "#d4af37";
    case "kasavu-line":
      return "#d4af37";
  }
}
