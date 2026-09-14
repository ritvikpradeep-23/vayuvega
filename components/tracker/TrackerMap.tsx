"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type L from "leaflet";
import "leaflet/dist/leaflet.css";
import { sightingsData, type Sighting } from "@/lib/sightingsData";
import { villainsData, type Villain } from "@/lib/villainsData";
import styles from "./tracker.module.css";

const KERALA_CENTER: [number, number] = [10.4, 76.4];
const MIN_ZOOM = 6.5;
const MAX_ZOOM = 12;

const STATUS_BAND_KEY: Record<Sighting["status"], "good" | "moderate" | "poor"> = {
  Resolved: "good",
  Reported: "moderate",
  "On It": "poor",
};

const STATUS_MARKER_CLASS: Record<Sighting["status"], string> = {
  Reported: styles.bandModerate,
  "On It": styles.bandPoor,
  Resolved: styles.bandGood,
};

export type SelectedEntity = { kind: "hero"; data: Sighting } | { kind: "villain"; data: Villain };

export interface FlyToRequest {
  lat: number;
  lng: number;
  token: number;
}

export default function TrackerMap({
  selected,
  onSelect,
  flyTo,
  revealed,
  onReveal,
}: {
  selected: SelectedEntity | null;
  onSelect: (entity: SelectedEntity | null) => void;
  flyTo: FlyToRequest | null;
  revealed: Set<string>;
  onReveal: (id: string) => void;
}) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const heroLayerRef = useRef<L.LayerGroup | null>(null);
  const villainLayerRef = useRef<L.LayerGroup | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    let cancelled = false;

    import("leaflet").then((L) => {
      if (cancelled || !mapContainerRef.current || mapRef.current) return;

      const bounds = L.latLngBounds([7.7, 71.8], [12.9, 78.2]);
      const map = L.map(mapContainerRef.current, {
        center: KERALA_CENTER,
        zoom: 8,
        minZoom: MIN_ZOOM,
        maxZoom: MAX_ZOOM,
        maxBounds: bounds.pad(0.3),
        maxBoundsViscosity: 0.7,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: "abc",
        maxZoom: 19,
      }).addTo(map);

      // Clip the map to Kerala's real boundary: a dark inverse mask hides
      // everything outside the state, plus a glowing outline of the state itself.
      Promise.all([fetch("/data/kerala-boundary.json").then((r) => r.json()), import("@turf/turf")]).then(
        ([boundary, turf]) => {
          if (cancelled || !mapRef.current) return;
          try {
            const maskFeature = turf.mask(boundary);
            L.geoJSON(maskFeature, {
              style: { fillColor: "#071012", fillOpacity: 1, color: "transparent", weight: 0 },
              interactive: false,
            }).addTo(map);
            L.geoJSON(boundary, {
              style: { fillColor: "transparent", fillOpacity: 0, color: "#4dfff0", weight: 1.5, opacity: 0.6 },
              interactive: false,
            }).addTo(map);
          } catch {
            // Mask/outline are cosmetic — if this fails, the plain tile map still works.
          }
        }
      );

      heroLayerRef.current = L.layerGroup().addTo(map);
      villainLayerRef.current = L.layerGroup().addTo(map);
      mapRef.current = map;
      setReady(true);
    });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // hero sighting markers
  useEffect(() => {
    if (!ready || !heroLayerRef.current) return;
    let cancelled = false;
    import("leaflet").then((L) => {
      if (cancelled || !heroLayerRef.current) return;
      heroLayerRef.current.clearLayers();
      sightingsData.forEach((s) => {
        const isSel = selected?.kind === "hero" && selected.data.id === s.id;
        const icon = L.divIcon({
          className: "",
          html: `<div class="${styles.stationMarker} ${STATUS_MARKER_CLASS[s.status]}${isSel ? ` ${styles.selected}` : ""}"></div>`,
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        });
        L.marker([s.lat, s.lng], { icon, alt: s.location })
          .on("click", () => onSelect({ kind: "hero", data: s }))
          .addTo(heroLayerRef.current!);
      });
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, selected]);

  // villain markers
  useEffect(() => {
    if (!ready || !villainLayerRef.current) return;
    let cancelled = false;
    import("leaflet").then((L) => {
      if (cancelled || !villainLayerRef.current) return;
      villainLayerRef.current.clearLayers();
      villainsData.forEach((v) => {
        const isSel = selected?.kind === "villain" && selected.data.id === v.id;
        const isActive = v.status === "At Large";
        const baseClass = isActive ? styles.villainMarker : styles.villainMarkerDim;
        const icon = L.divIcon({
          className: "",
          html: `<div class="${baseClass}${isSel ? ` ${styles.selected}` : ""}"></div>`,
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        });
        L.marker([v.defeatedLocation.lat, v.defeatedLocation.lng], { icon, alt: v.codename })
          .on("click", () => {
            onSelect({ kind: "villain", data: v });
            onReveal(v.id);
          })
          .addTo(villainLayerRef.current!);
      });
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, selected]);

  // geolocation "you are here"
  useEffect(() => {
    if (!ready || !mapRef.current || !("geolocation" in navigator)) return;
    let cancelled = false;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (cancelled || !mapRef.current) return;
        import("leaflet").then((L) => {
          if (cancelled || !mapRef.current) return;
          const icon = L.divIcon({
            className: "",
            html: `<div class="${styles.youAreHere}"></div>`,
            iconSize: [18, 18],
            iconAnchor: [9, 9],
          });
          L.marker([pos.coords.latitude, pos.coords.longitude], { icon, zIndexOffset: 1000 })
            .addTo(mapRef.current!)
            .bindTooltip("YOU ARE HERE", { direction: "top", offset: [0, -6] });
        });
      },
      () => {
        // Permission denied or unavailable — skip silently, no error dialog.
      },
      { timeout: 8000 }
    );
    return () => {
      cancelled = true;
    };
  }, [ready]);

  // external "show on map" fly-to requests
  useEffect(() => {
    if (!flyTo || !mapRef.current) return;
    mapRef.current.flyTo([flyTo.lat, flyTo.lng], 10, { duration: 1.2 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flyTo?.token]);

  const tickerLine = useMemo(() => {
    const heroLines = sightingsData.map((s) => `${s.location.toUpperCase()}: ${s.status.toUpperCase()}`);
    const villainLines = villainsData
      .filter((v) => v.status === "At Large")
      .map((v) => `${v.codename.toUpperCase()} LAST SEEN NEAR ${v.defeatedLocation.name.toUpperCase()}`);
    const line = [...heroLines, ...villainLines].join("   ·   ");
    return `${line}   ·   ${line}`;
  }, []);

  return (
    <div>
      <div className={styles.mapWrap}>
        <div ref={mapContainerRef} className={styles.map} />

        <aside className={`${styles.panel} ${styles.legend}`}>
          <p className={styles.panelTitle}>MARKER LEGEND</p>
          <ul className={styles.legendList}>
            <li><span className={`${styles.dot} ${styles.dotGood}`} /> HERO · Resolved</li>
            <li><span className={`${styles.dot} ${styles.dotPoor}`} /> HERO · On It</li>
            <li><span className={`${styles.dot} ${styles.dotModerate}`} /> HERO · Reported</li>
            <li><span className={`${styles.dot} ${styles.dotSevere}`} /> VILLAIN · At Large</li>
            <li><span className={styles.dot} style={{ background: "var(--text-dim)" }} /> VILLAIN · Resolved</li>
          </ul>
        </aside>

        <div className={`${styles.panel} ${styles.radar}`} aria-hidden="true">
          <div className={styles.radarFace}>
            <div className={styles.radarSweep} />
            <div className={styles.radarRing} />
          </div>
        </div>

        {selected && (
          <section
            className={`${styles.panel} ${styles.readout}`}
            data-band={selected.kind === "villain" ? "severe" : STATUS_BAND_KEY[selected.data.status]}
          >
            <button onClick={() => onSelect(null)} aria-label="Close readout" className={`${styles.iconBtn} ${styles.readoutClose}`}>
              ✕
            </button>
            {selected.kind === "hero" ? (
              <>
                <p className={styles.panelTitle}>HERO SIGHTING</p>
                <h3 className={styles.readoutName}>{selected.data.location.toUpperCase()}</h3>
                <div className={styles.readoutGrid}>
                  <div>
                    <span className={styles.readoutLabel}>STATUS</span>
                    <span className={styles.readoutValue}>{selected.data.status}</span>
                  </div>
                  <div>
                    <span className={styles.readoutLabel}>TYPE</span>
                    <span className={styles.readoutValue}>{selected.data.type}</span>
                  </div>
                </div>
                <p className={styles.readoutUpdated}>
                  {selected.data.district} <span>{selected.data.timestamp}</span>
                </p>
              </>
            ) : (
              <>
                <p className={styles.panelTitle}>VILLAIN SIGHTING</p>
                <h3 className={styles.readoutName}>
                  {revealed.has(selected.data.id) ? selected.data.codename.toUpperCase() : "UNIDENTIFIED"}
                </h3>
                <p className="text-xs" style={{ color: "var(--text-dim)", margin: "0.4rem 0" }}>
                  {selected.data.defeatedSummary}
                </p>
                <p className={styles.readoutUpdated}>
                  {selected.data.defeatedLocation.name} <span>{selected.data.status}</span>
                </p>
              </>
            )}
          </section>
        )}
      </div>

      <div className={styles.tickerBar}>
        <div className={styles.tickerTrack}>{tickerLine}</div>
      </div>
    </div>
  );
}
