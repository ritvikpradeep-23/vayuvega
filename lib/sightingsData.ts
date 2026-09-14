export type SightingStatus = "Reported" | "On It" | "Resolved";

export interface Sighting {
  id: string;
  location: string;
  status: SightingStatus;
  type: string;
  timestamp: string;
  district: string;
  /** Position on the stylized Kerala outline map, as a % of the map's width/height. */
  x: number;
  y: number;
}

export const sightingsData: Sighting[] = [
  { id: "s1", location: "Periyar River Basin", status: "On It", type: "Flash Flood Warning", timestamp: "14:32 IST", district: "Ernakulam", x: 58, y: 46 },
  { id: "s2", location: "Wayanad Highlands", status: "Resolved", type: "Landslide Risk", timestamp: "09:17 IST", district: "Wayanad", x: 68, y: 22 },
  { id: "s3", location: "Kozhikode Coast", status: "Resolved", type: "Fishing Boat Distress", timestamp: "06:44 IST", district: "Kozhikode", x: 40, y: 26 },
  { id: "s4", location: "Thrissur City", status: "Reported", type: "Structural Collapse", timestamp: "15:08 IST", district: "Thrissur", x: 50, y: 36 },
  { id: "s5", location: "Idukki Reservoir", status: "Resolved", type: "Dam Overflow Alert", timestamp: "Yesterday", district: "Idukki", x: 65, y: 52 },
  { id: "s6", location: "Varkala Cliffs", status: "Reported", type: "Cliff Erosion", timestamp: "11:22 IST", district: "Thiruvananthapuram", x: 44, y: 86 },
  { id: "s7", location: "Lakshadweep Offshore", status: "On It", type: "Maritime Rescue", timestamp: "08:55 IST", district: "Lakshadweep", x: 12, y: 34 },
];

/** Vayuvega's current on-patrol marker position on the same map. */
export const vayuvegaPosition = { x: 46, y: 42 };
