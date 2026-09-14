export interface TimelineEntry {
  year: number;
  era: string;
  icon: string;
  title: string;
  blurb: string;
  tag: string;
  stat: string;
}

export const timelineData: TimelineEntry[] = [
  {
    year: 2006,
    era: "Era I",
    icon: "🌊",
    title: "The First Flood",
    blurb:
      "Thrissur district, 340 residents evacuated from submerged lowlands before dawn. No official record — only a rumor of wind moving against the current.",
    tag: "FLOOD RESPONSE",
    stat: "340 evacuated",
  },
  {
    year: 2011,
    era: "Era II",
    icon: "🌀",
    title: "Cyclone Phyan Response",
    blurb:
      'Redirected the storm surge away from three coastal fishing villages near Kozhikode. The meteorology department logged an "anomalous wind pattern" they could not explain.',
    tag: "CYCLONE DEFLECTION",
    stat: "3 villages protected",
  },
  {
    year: 2016,
    era: "Era III",
    icon: "⛰️",
    title: "Nilgiris Landslide",
    blurb:
      "Extracted 28 trapped workers from a collapsed tea estate road in under 90 seconds. Workers reported hearing only the sound of rain before finding themselves on safe ground.",
    tag: "RESCUE OPERATION",
    stat: "28 workers rescued",
  },
  {
    year: 2019,
    era: "Era IV",
    icon: "🏚️",
    title: "Kerala Floods — Operation Monsoon",
    blurb:
      "The worst floods in a century. Vayuvega worked for 72 hours without rest across Ernakulam, Idukki, and Pathanamthitta districts. Over 1,200 direct rescues documented.",
    tag: "MASS DISASTER RESPONSE",
    stat: "1,200+ rescued",
  },
  {
    year: 2023,
    era: "Era V",
    icon: "🌿",
    title: "Wayanad Crisis",
    blurb:
      "Mountain rescue following a landslide that cut off six villages. Coordinated with NDRF teams invisibly — they noticed supply caches appearing in inaccessible locations overnight.",
    tag: "MOUNTAIN RESCUE",
    stat: "6 villages reached",
  },
  {
    year: 2026,
    era: "Era V+",
    icon: "⚓",
    title: "Cyclone Biparjoy — Offshore Rescue",
    blurb:
      "Fourteen fishing boats capsized 40 km off the Lakshadweep coast during Biparjoy. All 67 crew members reached shore before the coast guard was deployed. Ongoing.",
    tag: "MARITIME RESCUE",
    stat: "67 crew returned",
  },
];
