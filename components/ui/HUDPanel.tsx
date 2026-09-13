import type { ReactNode } from "react";

export function HUDPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-lg border border-kasavu/25 bg-void-deep/60 p-6 backdrop-blur-sm ${className}`}
    >
      <span className="absolute -left-px -top-px h-3 w-3 border-l-2 border-t-2 border-kasavu" />
      <span className="absolute -right-px -top-px h-3 w-3 border-r-2 border-t-2 border-kasavu" />
      <span className="absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 border-kasavu" />
      <span className="absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-kasavu" />
      {children}
    </div>
  );
}
