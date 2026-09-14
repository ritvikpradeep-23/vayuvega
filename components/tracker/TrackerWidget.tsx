"use client";

import dynamic from "next/dynamic";

const TrackerApp = dynamic(() => import("./TrackerApp"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[600px] items-center justify-center rounded-[20px] border border-card-border bg-void-deep text-sm text-mist">
      Loading tracker…
    </div>
  ),
});

export function TrackerWidget() {
  return <TrackerApp />;
}
