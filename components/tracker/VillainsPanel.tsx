"use client";

import { useState } from "react";
import { villainsData, type Villain } from "@/lib/villainsData";
import { VillainBust } from "./VillainBust";
import styles from "./tracker.module.css";

export default function VillainsPanel({
  onShowOnMap,
  revealed,
  onReveal,
}: {
  onShowOnMap: (villain: Villain) => void;
  revealed: Set<string>;
  onReveal: (id: string) => void;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const expanded = villainsData.find((v) => v.id === expandedId) ?? null;

  function openDossier(v: Villain) {
    setExpandedId(v.id);
    onReveal(v.id);
  }

  return (
    <div className={styles.panelBody}>
      <p className={styles.panelTitle}>ROGUES GALLERY · {villainsData.length} CASE FILES</p>
      <div className={styles.dossierGrid}>
        {villainsData.map((v) => {
          const isRevealed = revealed.has(v.id);
          return (
            <button key={v.id} onClick={() => openDossier(v)} className={styles.dossierCard}>
              <VillainBust revealed={isRevealed} className={styles.dossierPortraitSmall} />
              <p className={`${styles.dossierNamePlate} ${!isRevealed ? styles.dossierNamePlateHidden : ""}`}>
                {isRevealed ? v.codename : "UNIDENTIFIED"}
              </p>
            </button>
          );
        })}
      </div>

      {expanded && (
        <div className={styles.dossierDetail}>
          <VillainBust revealed={revealed.has(expanded.id)} className={styles.dossierDetailPortrait} />
          <div>
            <p className={styles.dossierTitle}>{revealed.has(expanded.id) ? expanded.codename : "UNIDENTIFIED"}</p>
            <p className={styles.dossierEpithet}>{expanded.power}</p>
            <p className={styles.dossierBio}>{expanded.defeatedSummary}</p>
            <button onClick={() => onShowOnMap(expanded)} className={styles.showOnMapBtn}>
              SHOW ON MAP →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
