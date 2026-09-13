import type { CostumeEra } from "./costumeData";

export interface TimelineEntry {
  year: number;
  title: string;
  blurb: string;
  costumeEra: CostumeEra;
}

export const timelineData: TimelineEntry[] = [
  {
    year: 2006,
    title: "The First Storm",
    blurb:
      "His debut, if you can call it that. A flood hit his hometown at night and he moved before he'd decided to. No plan, no suit worth the name — just three neighbors carried to higher ground before sunrise.",
    costumeEra: "poncho",
  },
  {
    year: 2011,
    title: "The Backwater Blackout",
    blurb:
      "The first time he worked with anyone else — local fishermen and volunteers who knew the canals better than he did. He learned that showing up isn't the same as helping; listening to people who know the ground is.",
    costumeEra: "first-emblem",
  },
  {
    year: 2016,
    title: "Onam Eve Landslide",
    blurb:
      "A large-scale response, and his first real coordination with emergency services. This is where the public started to trust the name Vayuvega instead of just the rumor of him.",
    costumeEra: "storm-runner",
  },
  {
    year: 2021,
    title: "The Silent Ward",
    blurb:
      "A pivot point. He was called to what looked like nothing — no flood, no headline — and found someone who just needed to be heard. He never went back to only answering disasters after that.",
    costumeEra: "hud-era",
  },
  {
    year: 2024,
    title: "Flood Season Protocol",
    blurb:
      "So many requests were reaching him by then that he built a system to track them — case by case, status by status. The seed of the sightings board you'll find further down this page.",
    costumeEra: "hud-era",
  },
  {
    year: 2026,
    title: "Present Day",
    blurb:
      "This website is his most organized effort yet — a direct line, instead of waiting for the wind to carry word of who needs him. If that's you, the signal's already open above.",
    costumeEra: "kasavu-line",
  },
];
