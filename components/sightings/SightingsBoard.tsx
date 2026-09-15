"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { sightingsData, type SightingStatus } from "@/lib/sightingsData";
import { villainsData } from "@/lib/villainsData";
import { HUDPanel } from "@/components/ui/HUDPanel";
import { LiveClock } from "./LiveClock";
import { useChatWidget } from "@/components/chat/ChatWidgetProvider";

const STATUS_DOT: Record<SightingStatus, string> = {
  Reported: "bg-status-amber",
  "On It": "bg-status-blue",
  Resolved: "bg-status-green",
};

const STATUS_PILL: Record<SightingStatus, string> = {
  Reported: "border-status-amber/40 text-status-amber",
  "On It": "border-status-blue/40 text-status-blue",
  Resolved: "border-status-green/40 text-status-green",
};

export function SightingsBoard() {
  const resolved = sightingsData.filter((s) => s.status === "Resolved").length;
  const onIt = sightingsData.filter((s) => s.status === "On It").length;
  const reported = sightingsData.filter((s) => s.status === "Reported").length;
  const atLarge = villainsData.filter((v) => v.status === "At Large").length;
  const { openChat } = useChatWidget();

  return (
    <section id="sightings" className="mx-auto max-w-6xl px-6 py-24 scroll-mt-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.25em] text-kasavu">FIELD OPS · LIVE TRACKER</p>
          <h2 className="mt-2 font-display text-4xl font-extrabold text-cream sm:text-5xl">
            Track It <span className="text-kasavu">Live</span>
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
              <p className="font-display text-sm font-bold text-cream">FIELD OPS TRACKER</p>
              <p className="text-[11px] font-semibold tracking-widest text-mist">
                KERALA REGION · MAP · SUITS · VILLAINS · FEED
              </p>
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

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="flex flex-wrap content-start gap-2.5">
            {sightingsData.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center gap-2 rounded-full border border-card-border bg-void px-3 py-1.5 text-xs"
              >
                <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[s.status]}`} />
                <span className="font-semibold text-cream">{s.location}</span>
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${STATUS_PILL[s.status]}`}>
                  {s.status}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col justify-between gap-4 rounded-[20px] border border-card-border bg-void p-6">
            <div>
              <p className="text-xs font-bold tracking-widest text-kasavu">FULL FIELD OPS TRACKER</p>
              <p className="mt-2 text-sm text-mist">
                A live Kerala map with hero sightings, {atLarge} rogue{atLarge === 1 ? "" : "s"} still at large, the
                full suit archive, and HQ Radio dispatch — updated in real time.
              </p>
            </div>
            <Link
              href="/tracker"
              className="rounded-full bg-gradient-to-r from-kasavu to-kasavu-soft px-6 py-3 text-center text-xs font-bold tracking-widest text-void"
            >
              OPEN FIELD OPS TRACKER →
            </Link>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-card-border pt-6">
          <p className="text-xs font-semibold tracking-wide text-mist">
            {resolved} RESOLVED · {onIt} ACTIVE · {reported} REPORTED
          </p>
          <button
            onClick={openChat}
            className="rounded-full border border-kasavu/50 px-5 py-2 text-xs font-bold tracking-widest text-cream hover:bg-kasavu/10"
          >
            + REPORT INCIDENT
          </button>
        </div>
      </HUDPanel>
    </section>
  );
}
