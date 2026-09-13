export function Emblem({ className = "", id = "emblem" }: { className?: string; id?: string }) {
  const gradId = `${id}-grad`;
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#16a672" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="none" stroke={`url(#${gradId})`} strokeWidth="2" opacity="0.6" />
      {/* cloud */}
      <path
        d="M30 44 a12 12 0 0 1 22 -8 a10 10 0 0 1 16 8 a9 9 0 0 1 -2 18 H32 a10 10 0 0 1 -2 -18Z"
        fill={`url(#${gradId})`}
      />
      {/* wind / lightning swirl beneath */}
      <path
        d="M28 64 Q42 58 50 66 Q58 74 72 68"
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M50 66 L46 78 L54 76 L49 88" fill="none" stroke={`url(#${gradId})`} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
