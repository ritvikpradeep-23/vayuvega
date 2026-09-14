import type { ReactNode } from "react";

export function HUDPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[24px] border border-card-border bg-card p-6 transition-shadow hover:shadow-[0_0_30px_-10px_rgba(201,154,74,0.25)] ${className}`}
    >
      {children}
    </div>
  );
}
