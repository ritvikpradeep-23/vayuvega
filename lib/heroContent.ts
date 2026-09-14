export const heroContent = {
  name: "Vayuvega",
  malayalamName: "വായുവേഗ",
  eyebrow: "KERALA · MONSOON SPEEDSTER · EST. 2006",
  tagline: "The eye of the storm doesn't shout. It listens, arrives, and is gone before the thunder.",
  ctaPrimary: "ASK FOR HELP",
  ctaSecondary: "VIEW CASE HISTORY",
  stats: [
    { value: "847", label: "CASES RESOLVED" },
    { value: "20yr", label: "ACTIVE SERVICE" },
    { value: "∞", label: "SPEED CLASS" },
  ],
  windSpeedBadge: "WIND SPEED — Mach 4+",
  statusBadge: {
    label: "CURRENT STATUS",
    status: "On Patrol",
    location: "Kerala Coast Region",
  },
} as const;

export const originContent = {
  eyebrow: "ORIGIN · 2006 · THRISSUR, KERALA",
  headlinePrefix: "Born in the ",
  headlineGold: "Heart of the Monsoon",
  paragraphs: [
    "During the catastrophic Thrissur floods of 2006, seventeen-year-old Arjun Menon was swept into the swollen Periyar river. For three minutes, he was submerged in the full force of the monsoon — and emerged changed.",
    "The atmospheric pressure event that nearly killed him had instead bonded him with the storm itself. He didn't gain lightning. He gained the wind's patience — the calm, listening quality of the eye at the center of chaos.",
    "He spent two years learning to move without disturbing. To arrive without announcing. To help without headlines. By 2008, Kerala had a guardian it didn't know it had.",
  ],
  credit: {
    name: "Arjun Menon",
    meta: "METEOROLOGY STUDENT · THRISSUR · BORN 1989",
  },
  eventCard: {
    label: "ORIGIN EVENT",
    title: "Thrissur Flood · August 2006",
    detail: "Periyar River, 3-minute submersion at peak monsoon surge",
  },
} as const;

export const missionContent = {
  eyebrow: "MISSION",
  headline: "Protect the Vulnerable. Leave No Trace.",
  subcopy:
    "Flood evacuation, cyclone response, search and rescue — Vayuvega operates where speed is the difference between life and loss. He does not seek recognition. The only evidence of his presence is that people are safe.",
} as const;

export interface Power {
  icon: string;
  title: string;
  description: string;
  stat: string;
}

export const powers: Power[] = [
  {
    icon: "🌪️",
    title: "Storm Velocity",
    description:
      "Sustained speeds exceeding Mach 4 within Kerala's coastal air corridors. Wind pressure alone can redirect flood channels.",
    stat: "Mach 4.2 sustained",
  },
  {
    icon: "👁️",
    title: "Eye of the Storm",
    description:
      "A zone of perfect calm surrounds Vayuvega in motion — bystanders feel only a warm breeze as he passes at full speed.",
    stat: "Zero collateral disturbance",
  },
  {
    icon: "🌧️",
    title: "Monsoon Reading",
    description:
      "Can sense atmospheric pressure changes up to 80 km away, predicting weather events and locating crisis zones before they escalate.",
    stat: "80km sensory radius",
  },
  {
    icon: "💨",
    title: "Wind Shaping",
    description:
      "Precise manipulation of air currents — from redirecting debris fields to creating windbreaks that protect coastal villages during cyclones.",
    stat: "Category 5 redirect capable",
  },
  {
    icon: "🌊",
    title: "Rain Resonance",
    description:
      "Heightened endurance and recovery during monsoon season. Strength peaks during the June–September window each year.",
    stat: "Seasonal power amplification",
  },
  {
    icon: "🤫",
    title: "Subsonic Silence",
    description:
      "Movement so precise that arrival produces no sonic boom. The only sound is the distant smell of rain — his calling card.",
    stat: "No acoustic signature",
  },
];
