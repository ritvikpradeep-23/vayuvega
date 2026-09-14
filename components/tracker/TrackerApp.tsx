"use client";

import { useEffect, useRef, useState } from "react";
import { Press_Start_2P, Share_Tech_Mono } from "next/font/google";
import { buildDispatchLine } from "@/lib/trackerReplies";
import { loadRevealed, saveRevealed } from "@/lib/villainReveal";
import { playJingle, speak, speechSupported } from "./audio";
import TabBar, { type TrackerTab } from "./TabBar";
import TrackerMap, { type SelectedEntity, type FlyToRequest } from "./TrackerMap";
import SuitsPanel from "./SuitsPanel";
import VillainsPanel from "./VillainsPanel";
import HeroFeed from "./HeroFeed";
import TrackerChatWidget from "./TrackerChatWidget";
import type { Villain } from "@/lib/villainsData";
import styles from "./tracker.module.css";

const pressStart = Press_Start_2P({ weight: "400", subsets: ["latin"], variable: "--font-press-start" });
const shareTechMono = Share_Tech_Mono({ weight: "400", subsets: ["latin"], variable: "--font-share-tech" });

const MIN_INTERVAL_MS = 20_000;
const MAX_INTERVAL_MS = 40_000;
const BROADCAST_VISIBLE_MS = 7_000;

export default function TrackerApp() {
  const [tab, setTab] = useState<TrackerTab>("map");
  const [selected, setSelected] = useState<SelectedEntity | null>(null);
  const [flyTo, setFlyTo] = useState<FlyToRequest | null>(null);
  const [muted, setMuted] = useState(false);
  const [broadcastLine, setBroadcastLine] = useState<string | null>(null);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const mutedRef = useRef(muted);
  mutedRef.current = muted;

  useEffect(() => {
    setRevealed(loadRevealed());
  }, []);

  function handleReveal(id: string) {
    setRevealed((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      saveRevealed(next);
      return next;
    });
  }

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let hideId: ReturnType<typeof setTimeout>;

    function scheduleNext() {
      const delay = MIN_INTERVAL_MS + Math.random() * (MAX_INTERVAL_MS - MIN_INTERVAL_MS);
      timeoutId = setTimeout(() => {
        const line = buildDispatchLine();
        setBroadcastLine(line);
        if (!mutedRef.current) {
          const spoke = speechSupported() ? speak(line, { rate: 0.9, volume: 0.5 }) : false;
          if (!spoke) {
            // Text-only fallback already shown via setBroadcastLine above.
          }
        }
        hideId = setTimeout(() => setBroadcastLine(null), BROADCAST_VISIBLE_MS);
        scheduleNext();
      }, delay);
    }

    scheduleNext();
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(hideId);
    };
  }, []);

  function handleShowOnMap(villain: Villain) {
    setSelected({ kind: "villain", data: villain });
    setFlyTo({ lat: villain.defeatedLocation.lat, lng: villain.defeatedLocation.lng, token: Date.now() });
    setTab("map");
  }

  return (
    <div className={`${styles.trackerRoot} ${pressStart.variable} ${shareTechMono.variable}`}>
      <div className={styles.scanlineOverlay} aria-hidden="true" />

      <div className={styles.header}>
        <div>
          <p className={styles.headerTitle}>VAYUVEGA</p>
          <p className={styles.headerTag}>FIELD OPS TRACKER</p>
        </div>
        <div className={styles.headerControls}>
          <button onClick={playJingle} aria-label="Play theme jingle" className={styles.iconBtn} title="Power on">
            ⏻
          </button>
          <button
            onClick={() => setMuted((m) => !m)}
            aria-label="Mute HQ radio and audio"
            aria-pressed={muted}
            className={styles.iconBtn}
          >
            {muted ? "🔇" : "🔊"}
          </button>
        </div>
      </div>

      {broadcastLine && (
        <div className={styles.broadcastBar}>
          <span className={styles.broadcastDot} />
          NOW BROADCASTING: {broadcastLine}
        </div>
      )}

      <TabBar active={tab} onChange={setTab} />

      {tab === "map" && (
        <TrackerMap
          selected={selected}
          onSelect={setSelected}
          flyTo={flyTo}
          revealed={revealed}
          onReveal={handleReveal}
        />
      )}
      {tab === "suits" && <SuitsPanel />}
      {tab === "villains" && (
        <VillainsPanel onShowOnMap={handleShowOnMap} revealed={revealed} onReveal={handleReveal} />
      )}
      {tab === "feed" && <HeroFeed />}

      <TrackerChatWidget />
    </div>
  );
}
