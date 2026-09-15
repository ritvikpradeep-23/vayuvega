export type TrackerSuitId =
  | "monsoon-weave"
  | "kayal-stealth"
  | "onam-festival"
  | "signal-storm"
  | "backup-stitch";

export interface TrackerSuit {
  id: TrackerSuitId;
  suitName: string;
  usedFor: string;
  caption: string;
}

export const trackerSuitsData: TrackerSuit[] = [
  {
    id: "monsoon-weave",
    suitName: "Monsoon Weave",
    usedFor: "First confirmed sighting, Kochi backwaters, monsoon season.",
    caption: "First logged appearance. Built to be seen through a downpour, not to be missed.",
  },
  {
    id: "kayal-stealth",
    suitName: "Kayal Stealth",
    usedFor: "Night operations tracking smuggling activity along the backwaters.",
    caption: "No shine, no signal — until there's a reason for one.",
  },
  {
    id: "onam-festival",
    suitName: "Onam Festival Suit",
    usedFor: "Public appearance at an Onam celebration, Thrissur.",
    caption: "Made for a parade, not a punch-up.",
  },
  {
    id: "signal-storm",
    suitName: "Signal Storm",
    usedFor: "Rooftop chase during a lightning storm, Kozhikode.",
    caption: "Built the week the signal kept cutting out.",
  },
  {
    id: "backup-stitch",
    suitName: "Backup Stitch",
    usedFor: "Emergency patch-up after Monsoon Weave was torn mid-fight; worn for two weeks before a proper replacement was ready.",
    caption: "Held together with duct tape and stubbornness. Retired the day the real fix arrived.",
  },
];
