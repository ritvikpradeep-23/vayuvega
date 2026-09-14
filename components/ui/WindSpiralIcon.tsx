export function WindSpiralIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <circle cx="20" cy="20" r="19" fill="#13233A" stroke="#3b82f6" strokeWidth="1.5" opacity="0.9" />
      <path
        d="M11 16c0-3 2.5-5.5 5.5-5.5S22 13 22 16"
        fill="none"
        stroke="#8FA3B8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 21c0-4.5 3.5-8 8-8s8 3.5 8 8"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M13 26c0-2.5 2-4.5 4.5-4.5S22 23.5 22 26"
        fill="none"
        stroke="#C99A4A"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
