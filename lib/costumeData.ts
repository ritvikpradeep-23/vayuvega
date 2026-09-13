export type CostumeEra = "poncho" | "first-emblem" | "storm-runner" | "hud-era" | "kasavu-line";

export interface CostumeEntry {
  year: number;
  era: CostumeEra;
  eraName: string;
  description: string;
}

export const costumeData: CostumeEntry[] = [
  {
    year: 2006,
    era: "poncho",
    eraName: "The Poncho",
    description:
      "Homemade — a coir-textured rain poncho over a bare mask, muted blue-grey. No emblem yet, just instinct and whatever was in the house that night.",
  },
  {
    year: 2011,
    era: "first-emblem",
    eraName: "The First Emblem",
    description:
      "A sturdier, community-made suit. Neighbors who'd seen him work chipped in materials. This is where the monsoon-cloud insignia first appears, in gold and green.",
  },
  {
    year: 2016,
    era: "storm-runner",
    eraName: "Storm-Runner",
    description:
      "Sleeker, sponsor-grade materials after his profile grew. Glowing wind-trail piping along the seams, more expressive mask lenses — built for speed, not just survival.",
  },
  {
    year: 2021,
    era: "hud-era",
    eraName: "HUD Era",
    description:
      "Tech finally caught up to him. A visor HUD, modular quick-change parts, deep indigo and gold. This is also the suit behind his 2024 case-tracking protocol.",
  },
  {
    year: 2026,
    era: "kasavu-line",
    eraName: "Kasavu Line",
    description:
      "His most refined suit yet — adaptive fabric with gold kasavu-inspired trim, the same gold border found on traditional Kerala cream-and-white cloth. Minimal emblem. Maximum trust.",
  },
];
