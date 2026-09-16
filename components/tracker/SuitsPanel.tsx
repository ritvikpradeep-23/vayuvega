"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { costumeData, type CostumeEra } from "@/lib/costumeData";
import { CostumeBadge } from "@/components/costumes/CostumeBadge";
import styles from "./tracker.module.css";

const CostumeModel3D = dynamic(() => import("@/components/costumes/CostumeModel3D"), {
  ssr: false,
  loading: () => (
    <div style={{ display: "flex", height: "100%", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", color: "var(--text-dim)" }}>
      Loading 3D model…
    </div>
  ),
});

function SuitDetail({ era, compact = false }: { era: CostumeEra; compact?: boolean }) {
  const suit = costumeData.find((c) => c.era === era);
  if (!suit) return null;
  return (
    <div>
      <div
        style={{
          height: compact ? "220px" : "340px",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid var(--panel-border)",
          background: "var(--bg)",
        }}
      >
        <CostumeModel3D era={suit.era} />
      </div>
      <p className={styles.dossierNamePlate} style={{ marginTop: "0.6rem" }}>
        {suit.suitName} · {suit.year}
      </p>
      <p style={{ fontSize: "0.7rem", color: "var(--cyan-dim)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0.5rem 0 0.2rem" }}>
        {suit.material}
      </p>
      <p style={{ fontSize: "0.75rem", color: "var(--text-dim)", margin: "0 0 0.6rem" }}>{suit.description}</p>
      <ul style={{ margin: 0, paddingLeft: "1rem", fontSize: "0.7rem", color: "var(--cyan)" }}>
        {suit.details.map((d) => (
          <li key={d} style={{ marginBottom: "0.2rem" }}>
            {d}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SuitsPanel() {
  const [compareMode, setCompareMode] = useState(false);
  const [selected, setSelected] = useState<CostumeEra[]>([costumeData[0]?.era]);

  function handleCardClick(era: CostumeEra) {
    if (!compareMode) {
      setSelected([era]);
      return;
    }
    setSelected((prev) => {
      if (prev.includes(era)) return prev.filter((e) => e !== era);
      if (prev.length >= 2) return [prev[1], era];
      return [...prev, era];
    });
  }

  return (
    <div className={styles.panelBody}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        <p className={styles.panelTitle}>SUIT ARCHIVE · {costumeData.length} ENTRIES</p>
        <button
          onClick={() => {
            setCompareMode((c) => !c);
            setSelected([costumeData[0]?.era]);
          }}
          className={styles.tabBtn}
          style={compareMode ? { color: "var(--cyan)", borderColor: "var(--cyan)" } : undefined}
        >
          {compareMode ? "EXIT COMPARE" : "COMPARE MODE"}
        </button>
      </div>

      <div className={styles.dossierGrid} style={{ marginTop: "0.9rem" }}>
        {costumeData.map((c) => {
          const isSel = selected.includes(c.era);
          return (
            <button
              key={c.era}
              onClick={() => handleCardClick(c.era)}
              className={styles.dossierCard}
              style={isSel ? { borderColor: "var(--cyan)" } : undefined}
            >
              <div
                className={styles.dossierPortraitSmall}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}
              >
                <CostumeBadge era={c.era} id={`tracker-suit-grid-${c.era}`} className="h-4/5 w-4/5" />
              </div>
              <p className={styles.dossierNamePlate}>{c.suitName}</p>
              <p className={styles.cardMeta}>{c.year}</p>
            </button>
          );
        })}
      </div>

      {compareMode ? (
        <div className={styles.detailPanel}>
          <p className={styles.panelTitle}>COMPARE {selected.length < 2 ? "— select one more suit" : ""}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "0.6rem" }}>
            {selected[0] && <SuitDetail era={selected[0]} compact />}
            {selected[1] && <SuitDetail era={selected[1]} compact />}
          </div>
        </div>
      ) : (
        selected[0] && (
          <div className={styles.detailPanel}>
            <p className={styles.panelTitle}>EQUIPMENT READOUT</p>
            <SuitDetail era={selected[0]} />
          </div>
        )
      )}
    </div>
  );
}
