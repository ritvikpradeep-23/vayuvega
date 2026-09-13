import { sightingsData } from "@/lib/sightingsData";
import { SightingCard } from "./SightingCard";

export function SightingsBoard() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <h2 className="mb-2 text-center font-display text-3xl tracking-widest text-kasavu">FIELD REPORTS</h2>
      <p className="mb-10 text-center text-sm text-zinc-500">
        Archive — a sample of past cases from the field. Not a live feed of current submissions.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {sightingsData.map((s) => (
          <SightingCard key={s.id} sighting={s} />
        ))}
      </div>
    </section>
  );
}
