"use client";

import { useState } from "react";
import { trackerSuitsData, type TrackerSuitId } from "@/lib/trackerSuitsData";
import { TrackerSuitBadge } from "./TrackerSuitBadge";
import styles from "./tracker.module.css";

function SuitDetail({ suitId }: { suitId: TrackerSuitId }) {
  const suit = trackerSuitsData.find((s) => s.id === suitId);
  if (!suit) return null;
  return (
    <div>
      <div className={styles.dossierPortraitSmall} style={{ aspectRatio: "3 / 4", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
        <TrackerSuitBadge suitId={suit.id} id={`compare-${suit.id}`} className="h-2/3 w-2/3" />
      </div>
      <p className={styles.dossierNamePlate} style={{ marginTop: "0.6rem" }}>
        {suit.suitName}
      </p>
      <p style={{ fontSize: "0.7rem", color: "var(--cyan-dim)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0.5rem 0 0.2rem" }}>
        Used For
      </p>
      <p style={{ fontSize: "0.75rem", color: "var(--text-dim)", margin: "0 0 0.6rem" }}>{suit.usedFor}</p>
      <p style={{ fontSize: "0.75rem", color: "var(--cyan)", fontStyle: "italic", borderLeft: "2px solid var(--cyan-dim)", paddingLeft: "0.6rem" }}>
        &ldquo;{suit.caption}&rdquo;
      </p>
    </div>
  );
}

export default function SuitsPanel() {
  const [compareMode, setCompareMode] = useState(false);
  const [selected, setSelected] = useState<TrackerSuitId[]>([trackerSuitsData[0]?.id]);

  function handleCardClick(suitId: TrackerSuitId) {
    if (!compareMode) {
      setSelected([suitId]);
      return;
    }
    setSelected((prev) => {
      if (prev.includes(suitId)) return prev.filter((s) => s !== suitId);
      if (prev.length >= 2) return [prev[1], suitId];
      return [...prev, suitId];
    });
  }

  return (
    <div className={styles.panelBody}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        <p className={styles.panelTitle}>SUIT ARCHIVE · {trackerSuitsData.length} ENTRIES</p>
        <button
          onClick={() => {
            setCompareMode((c) => !c);
            setSelected([trackerSuitsData[0]?.id]);
          }}
          className={styles.tabBtn}
          style={compareMode ? { color: "var(--cyan)", borderColor: "var(--cyan)" } : undefined}
        >
          {compareMode ? "EXIT COMPARE" : "COMPARE MODE"}
        </button>
      </div>

      <div className={styles.dossierGrid} style={{ marginTop: "0.9rem" }}>
        {trackerSuitsData.map((s) => {
          const isSel = selected.includes(s.id);
          return (
            <button
              key={s.id}
              onClick={() => handleCardClick(s.id)}
              className={styles.dossierCard}
              style={isSel ? { borderColor: "var(--cyan)" } : undefined}
            >
              <div
                className={styles.dossierPortraitSmall}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}
              >
                <TrackerSuitBadge suitId={s.id} id={`suit-grid-${s.id}`} className="h-4/5 w-4/5" />
              </div>
              <p className={styles.dossierNamePlate}>{s.suitName}</p>
              <p className={styles.cardMeta} style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                {s.usedFor}
              </p>
            </button>
          );
        })}
      </div>

      {compareMode ? (
        <div className={styles.detailPanel}>
          <p className={styles.panelTitle}>COMPARE {selected.length < 2 ? "— select one more suit" : ""}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "0.6rem" }}>
            {selected[0] && <SuitDetail suitId={selected[0]} />}
            {selected[1] && <SuitDetail suitId={selected[1]} />}
          </div>
        </div>
      ) : (
        selected[0] && (
          <div className={styles.detailPanel}>
            <p className={styles.panelTitle}>EQUIPMENT READOUT</p>
            <SuitDetail suitId={selected[0]} />
          </div>
        )
      )}
    </div>
  );
}
