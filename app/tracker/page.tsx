import type { Metadata } from "next";
import { TrackerWidget } from "@/components/tracker/TrackerWidget";

export const metadata: Metadata = {
  title: "Field Ops Tracker — Vayuvega",
  description:
    "A retro CRT-styled field terminal tracking Vayuvega's sightings and rogues across Kerala, with a live \"you are here\" marker.",
};

export default function TrackerPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <p className="text-xs font-bold tracking-[0.25em] text-kasavu">FIELD INSTRUMENTS</p>
      <h1 className="mt-4 font-display text-4xl font-extrabold text-cream sm:text-5xl">
        Field Ops <span className="text-kasavu">Tracker</span>
      </h1>
      <p className="mt-4 max-w-xl text-mist">
        An old instrument panel from Vayuvega&apos;s field kit — live sightings, the suit archive, the rogues
        gallery, and a dispatch line to HQ. Mock data for now, built to swap in something real later.
      </p>

      <div className="mt-10">
        <TrackerWidget />
      </div>
    </div>
  );
}
