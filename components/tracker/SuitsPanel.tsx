"use client";

import { useState } from "react";
import { costumeData, type CostumeEra } from "@/lib/costumeData";
import { CostumeBadge } from "@/components/costumes/CostumeBadge";
import styles from "./tracker.module.css";

function SuitDetail({ era }: { era: CostumeEra }) {
  const suit = costumeData.find((c) => c.era === era);
  if (!suit) return null;
  return (
    <div>
      <div className={styles.dossierPortraitSmall} style={{ aspectRatio: "3 / 4", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
        <CostumeBadge era={suit.era} id={`compare-${suit.era}`} className="h-2/3 w-2/3" />
      </div>
      <p className={styles.dossierNamePlate} style={{ marginTop: "0.6rem" }}>
        {suit.suitName} · {suit.year}
      </p>
      <p style={{ fontSize: "0.7rem", color: "var(--text-dim)", margin: "0.4rem 0" }}>{suit.description}</p>
      <ul className={styles.detailList}>
        {suit.details.map((d) => (
          <li key={d}>▸ {d}</li>
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
                <CostumeBadge era={c.era} id={`suit-grid-${c.era}`} className="h-4/5 w-4/5" />
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
            {selected[0] && <SuitDetail era={selected[0]} />}
            {selected[1] && <SuitDetail era={selected[1]} />}
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
