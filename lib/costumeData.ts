export type CostumeEra = "flood-coat" | "windbreaker" | "waymark" | "eye-form" | "storm-skin";

export interface CostumeEntry {
  year: number;
  era: CostumeEra;
  suitName: string;
  material: string;
  description: string;
  details: string[];
  isNewCopy: boolean;
}

export const costumeData: CostumeEntry[] = [
  {
    year: 2006,
    era: "flood-coat",
    suitName: "The Flood Coat",
    material: "Traditional kambali canvas",
    description:
      "Improvised from a traditional Kerala fisherman's waterproof coat (kambali). Dark navy canvas, no insignia. The gold kasavu border of his mother's mundu sewn inside the collar — a private talisman.",
    details: [
      "Navy canvas kambali base",
      "No external markings",
      "Kasavu border hidden inside collar",
      "Practical, anonymous",
    ],
    isNewCopy: false,
  },
  {
    year: 2011,
    era: "windbreaker",
    suitName: "The Windbreaker",
    material: "Reinforced monsoon-weave jacket",
    description:
      "Built after five years of fieldwork, once improvisation stopped being enough — this is the suit he wore for the Cyclone Phyan response. A cut-resistant, moisture-wicking jacket replaces the old kambali coat; for the first time, a thin line of kasavu gold is left visible on the cuffs instead of hidden in the lining.",
    details: [
      "Reinforced monsoon-weave shell",
      "Gold piping visible at cuffs for the first time",
      "Lighter build for sustained high-speed flight",
      "Still no emblem or insignia",
    ],
    isNewCopy: true,
  },
  {
    year: 2016,
    era: "waymark",
    suitName: "The Waymark",
    material: "Synthetic-canvas hybrid with chest band",
    description:
      "Made in the aftermath of the Nilgiris landslide, when trapped workers needed to trust a voice in the dark before they could trust anything else. The kasavu border grows into a full chest band — still not a logo, but enough that people who'd been helped before could recognize him again.",
    details: [
      "Synthetic-canvas hybrid shell for structural debris work",
      "Kasavu gold as a chest band, not just trim",
      "Reinforced gloves and boots for climbing/extraction work",
      "First suit meant to be recognized, not just functional",
    ],
    isNewCopy: true,
  },
  {
    year: 2021,
    era: "eye-form",
    suitName: "The Eye Form",
    material: "High-altitude synthetic + kasavu trim",
    description:
      "Refined for high-altitude and long-range response work, this suit brought the kasavu border out of the chest band and into a full trim line running the length of the suit — the calm at the center of the storm, made visible in the cut of the fabric itself.",
    details: [
      "High-altitude synthetic weave",
      "Kasavu trim runs the full seam line, not just the chest",
      "Built for sustained long-range response",
      "The most refined the suit had been up to this point",
    ],
    isNewCopy: false,
  },
  {
    year: 2026,
    era: "storm-skin",
    suitName: "Storm Skin",
    material: "Phase-shift composite",
    description:
      "The current suit, built for offshore and maritime rescue work like the Biparjoy response. An adaptive composite that changes texture and opacity with wind speed — closer to a second skin than a garment. The kasavu gold is no longer trim at all; it's woven through the suit's structural seams, chest to sleeve.",
    details: [
      "Adaptive phase-shift composite",
      "Gold kasavu integrated into structural seams, not applied as trim",
      "Built for sustained offshore/maritime conditions",
      "The most visible the suit has ever been, and the most anonymous he's ever felt wearing it",
    ],
    isNewCopy: true,
  },
];
