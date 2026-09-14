export interface Villain {
  id: string;
  codename: string;
  power: string;
  blurb: string;
  status: "Defeated" | "At Large";
}

export const villainsData: Villain[] = [
  {
    id: "undertow",
    codename: "The Undertow",
    power: "Controls flood surges",
    blurb: "Tried to drown Vayuvega's hometown during his very first fight in 2006.",
    status: "Defeated",
  },
  {
    id: "blackout-baron",
    codename: "Blackout Baron",
    power: "Rogue power-grid engineer",
    blurb: "Held the backwater power grid hostage in 2011 until Vayuvega restored it.",
    status: "Defeated",
  },
  {
    id: "the-landslide",
    codename: "The Landslide",
    power: "Earth manipulation",
    blurb: "Triggered the Onam Eve landslide in 2016. Defeated — city rebuilt with his help.",
    status: "Defeated",
  },
  {
    id: "static",
    codename: "Static",
    power: "Jams radios and phone lines",
    blurb:
      "Cuts communications during emergencies so no one can call for help — the reason Vayuvega eventually built his own case-tracking system.",
    status: "At Large",
  },
  {
    id: "ushna",
    codename: "Ushna, the Parched One",
    power: "Heat-wraith, dries wells and scatters clouds",
    blurb: "Vayuvega's opposite-element rival. A recurring threat.",
    status: "At Large",
  },
];
