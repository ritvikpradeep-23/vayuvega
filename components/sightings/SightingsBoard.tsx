import { sightingsData } from "@/lib/sightingsData";
import { SightingsMap } from "./SightingsMap";
import { LiveClock } from "./LiveClock";
import { HUDPanel } from "@/components/ui/HUDPanel";

export function SightingsBoard() {
  const resolved = sightingsData.filter((s) => s.status === "Resolved").length;
  const onIt = sightingsData.filter((s) => s.status === "On It").length;
  const reported = sightingsData.filter((s) => s.status === "Reported").length;

  return (
    <section id="sightings" className="mx-auto max-w-6xl px-6 py-24 scroll-mt-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.25em] text-kasavu">INCIDENT BOARD · LIVE FEED</p>
          <h2 className="mt-2 font-display text-4xl font-extrabold text-cream sm:text-5xl">
            Active <span className="text-kasavu">Sightings</span>
          </h2>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-card-border px-4 py-2 text-xs font-semibold text-mist">
          <span className="h-2 w-2 animate-pulse rounded-full bg-status-green" />
          SYSTEM ONLINE · <LiveClock />
        </div>
      </div>

      <HUDPanel className="mt-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-card-border pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-kasavu bg-void font-display text-sm font-bold text-kasavu">
              V
            </div>
            <div>
              <p className="font-display text-sm font-bold text-cream">VAYUVEGA INCIDENT COMMAND</p>
              <p className="text-[11px] font-semibold tracking-widest text-mist">KERALA REGION · ALL SECTORS</p>
            </div>
          </div>
          <div className="flex gap-4 text-[11px] font-semibold text-mist">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-status-blue" /> On It
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-status-amber" /> Reported
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-status-green" /> Resolved
            </span>
          </div>
        </div>

        <div className="mt-6">
          <SightingsMap />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-card-border pt-6">
          <p className="text-xs font-semibold tracking-wide text-mist">
            {resolved} RESOLVED · {onIt} ACTIVE · {reported} REPORTED
          </p>
          <button className="rounded-full border border-kasavu/50 px-5 py-2 text-xs font-bold tracking-widest text-cream hover:bg-kasavu/10">
            + REPORT INCIDENT
          </button>
        </div>
      </HUDPanel>
    </section>
  );
}
