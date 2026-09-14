"use client";

import styles from "./tracker.module.css";

const TABS = [
  { key: "map", label: "MAP" },
  { key: "suits", label: "SUITS" },
  { key: "villains", label: "VILLAINS" },
  { key: "feed", label: "FEED" },
] as const;

export type TrackerTab = (typeof TABS)[number]["key"];

export default function TabBar({ active, onChange }: { active: TrackerTab; onChange: (tab: TrackerTab) => void }) {
  return (
    <div className={styles.tabBar}>
      {TABS.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`${styles.tabBtn} ${active === t.key ? styles.tabBtnActive : ""}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
