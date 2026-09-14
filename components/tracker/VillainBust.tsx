export function VillainBust({ revealed, className = "" }: { revealed: boolean; className?: string }) {
  return (
    <div className={className} style={{ position: "relative", overflow: "hidden" }}>
      <svg viewBox="0 0 100 120" style={{ width: "100%", height: "100%", filter: revealed ? "none" : "blur(6px)", transition: "filter 0.4s ease" }}>
        <defs>
          <radialGradient id="bust-grad" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor={revealed ? "#3a1414" : "#1a1f24"} />
            <stop offset="100%" stopColor={revealed ? "#0d0605" : "#08090a"} />
          </radialGradient>
        </defs>
        <rect width="100" height="120" fill="url(#bust-grad)" />
        {/* faceless head + shoulders silhouette */}
        <ellipse cx="50" cy="42" rx="20" ry="24" fill={revealed ? "#ef4444" : "#3a4048"} opacity={revealed ? 0.5 : 0.7} />
        <path d="M14 118 C14 88 30 74 50 74 C70 74 86 88 86 118 Z" fill={revealed ? "#ef4444" : "#3a4048"} opacity={revealed ? 0.5 : 0.7} />
      </svg>
      {!revealed && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-press-start)",
            fontSize: "1.4rem",
            color: "var(--text-dim)",
          }}
        >
          ?
        </div>
      )}
    </div>
  );
}
