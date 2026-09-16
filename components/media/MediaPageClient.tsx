"use client";

import { useMemo, useState } from "react";
import { mediaData, type MediaType } from "@/lib/mediaData";
import { MediaCard } from "@/components/media/MediaCard";
import { useChatWidget } from "@/components/chat/ChatWidgetProvider";

const TYPE_TABS: Array<MediaType | "All"> = ["All", "News", "Video", "Press", "Photos"];

const ERAS = [
  { label: "All Years", min: 0, max: 9999 },
  { label: "2006–2010", min: 2006, max: 2010 },
  { label: "2011–2015", min: 2011, max: 2015 },
  { label: "2016–2020", min: 2016, max: 2020 },
  { label: "2021–2026", min: 2021, max: 2026 },
];

export function MediaPageClient() {
  const { openChat } = useChatWidget();
  const [activeType, setActiveType] = useState<MediaType | "All">("All");
  const [activeEra, setActiveEra] = useState(ERAS[0].label);

  const era = ERAS.find((e) => e.label === activeEra) ?? ERAS[0];

  const filtered = useMemo(
    () =>
      mediaData.filter((item) => {
        const typeMatch = activeType === "All" || item.type === activeType;
        const eraMatch = item.year >= era.min && item.year <= era.max;
        return typeMatch && eraMatch;
      }),
    [activeType, era]
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: mediaData.length };
    for (const t of ["News", "Video", "Press", "Photos"] as MediaType[]) {
      c[t] = mediaData.filter((m) => m.type === t).length;
    }
    return c;
  }, []);

  return (
    <div className="min-h-screen px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold tracking-[0.25em] text-kasavu">MEDIA</p>
        <h1 className="mt-4 font-display text-4xl font-extrabold text-cream sm:text-5xl">Press &amp; Media Room</h1>
        <p className="mt-4 max-w-xl text-mist">
          Twenty years of scattered evidence — news clippings, leaked footage, official statements, and photographs
          no one can quite explain.
        </p>

        <div className="sticky top-[73px] z-20 -mx-6 mt-10 border-b border-card-border bg-void/95 px-6 py-4 backdrop-blur-md">
          <div className="flex flex-wrap items-center gap-2">
            {TYPE_TABS.map((t) => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold tracking-wide transition-colors ${
                  activeType === t ? "bg-gradient-to-r from-kasavu to-kasavu-soft text-void" : "border border-card-border text-mist hover:text-cream"
                }`}
              >
                {t} ({counts[t]})
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {ERAS.map((e) => (
              <button
                key={e.label}
                onClick={() => setActiveEra(e.label)}
                className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${
                  activeEra === e.label ? "bg-card-border text-cream" : "text-mist hover:text-cream"
                }`}
              >
                {e.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <MediaCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {filtered.length === 0 && <p className="mt-10 text-center text-mist">No archive items match those filters.</p>}

        <div className="mt-16 rounded-[24px] border border-kasavu/30 bg-gradient-to-r from-card to-void-deep p-8 text-center">
          <h2 className="font-display text-xl font-bold text-cream">Press &amp; Media Inquiries</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-mist">
            For verified press access to Vayuvega incident reports, reach out through the official contact line.
          </p>
          <button
            onClick={openChat}
            className="mt-5 rounded-full bg-gradient-to-r from-kasavu to-kasavu-soft px-6 py-2.5 text-xs font-bold tracking-widest text-void"
          >
            REQUEST PRESS ACCESS
          </button>
        </div>
      </div>
    </div>
  );
}
