export interface Villain {
  id: string;
  codename: string;
  power: string;
  blurb: string;
  status: "Defeated" | "At Large";
  defeatedLocation: { name: string; lat: number; lng: number };
  defeatedSummary: string;
}

export const villainsData: Villain[] = [
  {
    id: "undertow",
    codename: "The Undertow",
    power: "Controls flood surges",
    blurb: "Tried to drown Vayuvega's hometown during his very first fight in 2006.",
    status: "Defeated",
    defeatedLocation: { name: "Thrissur", lat: 10.5276, lng: 76.2144 },
    defeatedSummary:
      "Cornered in the Periyar's flooded lowlands and forced to release the surge he'd been holding back — the same water that gave Vayuvega his start.",
  },
  {
    id: "blackout-baron",
    codename: "Blackout Baron",
    power: "Rogue power-grid engineer",
    blurb: "Held the backwater power grid hostage in 2011 until Vayuvega restored it.",
    status: "Defeated",
    defeatedLocation: { name: "Alappuzha Backwaters", lat: 9.4981, lng: 76.3388 },
    defeatedSummary:
      "Traced to a houseboat control rig in the backwaters and disarmed before the blackout could spread past a single district.",
  },
  {
    id: "the-landslide",
    codename: "The Landslide",
    power: "Earth manipulation",
    blurb: "Triggered the Onam Eve landslide in 2016. Defeated — city rebuilt with his help.",
    status: "Defeated",
    defeatedLocation: { name: "Nilgiris Foothills", lat: 11.4, lng: 76.7 },
    defeatedSummary:
      "Buried his own escape route trying to bring down a second slope — Vayuvega dug him out and handed him to NDRF at the scene.",
  },
  {
    id: "static",
    codename: "Static",
    power: "Jams radios and phone lines",
    blurb:
      "Cuts communications during emergencies so no one can call for help — the reason Vayuvega eventually built his own case-tracking system.",
    status: "At Large",
    defeatedLocation: { name: "Kochi (last known)", lat: 9.9312, lng: 76.2673 },
    defeatedSummary: "Still active. Last signal jamming traced to the Kochi metro corridor — unconfirmed.",
  },
  {
    id: "ushna",
    codename: "Ushna, the Parched One",
    power: "Heat-wraith, dries wells and scatters clouds",
    blurb: "Vayuvega's opposite-element rival. A recurring threat.",
    status: "At Large",
    defeatedLocation: { name: "Palakkad Gap", lat: 10.7867, lng: 76.6548 },
    defeatedSummary: "Surfaces during dry spells near the Palakkad gap, where the monsoon reaches thinnest.",
  },
];
