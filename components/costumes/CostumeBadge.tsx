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
          <rect width="6" height="6" fill="#2c3f56" />
          <line x1="0" y1="0" x2="0" y2="6" stroke="#3f5468" strokeWidth="1.5" />
        </pattern>
      </defs>

      <path d={SUIT_PATH} fill={era === "flood-coat" ? `url(#${id}-hatch)` : `url(#${id}-fill)`} />
      <path d={SUIT_PATH} fill="none" stroke={eraStrokeColor(era)} strokeWidth="2" opacity="0.85" />

      {era === "flood-coat" && (
        <path
          d="M40 20 h20 v10 h-20 Z"
          fill="none"
          stroke="#C99A4A"
          strokeWidth="2"
          opacity="0.9"
        />
      )}

      {era === "windbreaker" && (
        <g stroke="#C99A4A" strokeWidth="2.5" opacity="0.9">
          <line x1="20" y1="95" x2="34" y2="95" />
          <line x1="66" y1="95" x2="80" y2="95" />
        </g>
      )}

      {era === "waymark" && (
        <rect x="34" y="48" width="32" height="14" rx="3" fill="none" stroke="#C99A4A" strokeWidth="2.5" opacity="0.9" />
      )}

      {era === "eye-form" && (
        <path
          d={SUIT_PATH}
          fill="none"
          stroke="#C99A4A"
          strokeWidth="2"
          opacity="0.7"
          transform="scale(0.9) translate(5.5 6.5)"
        />
      )}

      {era === "storm-skin" && (
        <>
          <path
            d={SUIT_PATH}
            fill="none"
            stroke="#C99A4A"
            strokeWidth="2.5"
            strokeDasharray="2 3"
            opacity="0.9"
            transform="scale(0.92) translate(4.3 5.3)"
          />
          <path d="M50 8 V116" stroke="#C99A4A" strokeWidth="1.5" opacity="0.6" />
        </>
      )}
    </svg>
  );
}

function eraGradientStops(era: CostumeEra) {
  switch (era) {
    case "windbreaker":
      return (
        <>
          <stop offset="0%" stopColor="#1f3348" />
          <stop offset="100%" stopColor="#2c4560" />
        </>
      );
    case "waymark":
      return (
        <>
          <stop offset="0%" stopColor="#1a2c40" />
          <stop offset="100%" stopColor="#324e6b" />
        </>
      );
    case "eye-form":
      return (
        <>
          <stop offset="0%" stopColor="#12202e" />
          <stop offset="100%" stopColor="#22374f" />
        </>
      );
    case "storm-skin":
      return (
        <>
          <stop offset="0%" stopColor="#0b1622" />
          <stop offset="100%" stopColor="#1c3049" />
        </>
      );
    default:
      return (
        <>
          <stop offset="0%" stopColor="#2c3f56" />
          <stop offset="100%" stopColor="#3a5068" />
        </>
      );
  }
}

function eraStrokeColor(era: CostumeEra): string {
  switch (era) {
    case "flood-coat":
      return "#5a6f85";
    default:
      return "#C99A4A";
  }
}
