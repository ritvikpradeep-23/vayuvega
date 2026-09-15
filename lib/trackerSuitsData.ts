export type TrackerSuitId = "thattu" | "kera-tech" | "kayal-stealth" | "kaithapoo-storm" | "theyyam-integrated";

export interface TrackerSuit {
  id: TrackerSuitId;
  suitName: string;
  usedFor: string;
  caption: string;
}

export const trackerSuitsData: TrackerSuit[] = [
  {
    id: "thattu",
    suitName: "Thattu Suit",
    usedFor: "His first few weeks, before anyone was backing him — built from whatever was on hand.",
    caption: "Coir-rope webbing, salvaged bicycle-chain joints. No power source. Everything manual.",
  },
  {
    id: "kera-tech",
    suitName: "Kera Tech Suit",
    usedFor: "After a local college robotics lab started quietly supplying him gear.",
    caption: "Coconut-fiber composite plating, retractable palm-frond glider fins, bioluminescent night piping.",
  },
  {
    id: "kayal-stealth",
    suitName: "Kayal Stealth Suit",
    usedFor: "Night operations over the backwaters, where he needed to not be seen or heard.",
    caption: "Wrist sonar unit, silent ankle thrusters, matte moisture-wicking weave.",
  },
  {
    id: "kaithapoo-storm",
    suitName: "Kaithapoo Storm Suit",
    usedFor: "Monsoon season, when every other suit failed in the rain.",
    caption: "Fold-out umbrella-carapace, forearm wind-turbine chargers, a spinal lightning-rod ground strip.",
  },
  {
    id: "theyyam-integrated",
    suitName: "Theyyam Integrated Suit",
    usedFor: "Now — his most advanced suit, fusing tech from every suit before it.",
    caption: "Theyyam-inspired headdress silhouette, temple-brass joints, integrated HUD lenses, fire-resistant coating.",
  },
];
