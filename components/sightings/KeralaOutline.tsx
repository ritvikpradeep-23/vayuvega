export function KeralaOutline({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="kerala-fill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#13233A" />
          <stop offset="100%" stopColor="#0d1c2e" />
        </linearGradient>
      </defs>
      {/* Stylized, non-literal outline of the Kerala coastal strip (north top, south bottom). */}
      <path
        d="M52 4
           C62 10 66 18 62 26
           C58 33 72 30 74 40
           C76 50 62 52 66 60
           C70 68 58 70 56 78
           C54 85 48 92 42 96
           C38 90 40 82 36 76
           C30 70 32 62 28 56
           C24 50 30 44 26 38
           C22 32 30 26 28 20
           C26 13 40 6 52 4Z"
        fill="url(#kerala-fill)"
        stroke="#22374f"
        strokeWidth="0.6"
      />
      {/* faint coastline contour line */}
      <path
        d="M52 4 C62 10 66 18 62 26 C58 33 72 30 74 40 C76 50 62 52 66 60 C70 68 58 70 56 78 C54 85 48 92 42 96"
        fill="none"
        stroke="#3b82f6"
        strokeOpacity="0.25"
        strokeWidth="0.5"
      />
    </svg>
  );
}
