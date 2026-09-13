import { timelineData } from "@/lib/timelineData";
import { TimelineEntry } from "./TimelineEntry";

export function CaseTimeline() {
  return (
    <section className="relative mx-auto max-w-4xl px-6 py-24">
      <h2 className="mb-16 text-center font-display text-3xl tracking-widest text-kasavu">CASE HISTORY</h2>
      <div className="relative space-y-10">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-kasavu/40 to-transparent sm:block" />
        {timelineData.map((entry, i) => (
          <TimelineEntry key={entry.year} entry={entry} align={i % 2 === 0 ? "left" : "right"} />
        ))}
      </div>
    </section>
  );
}
