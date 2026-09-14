export type SightingStatus = "Reported" | "On It" | "Resolved";

export interface Sighting {
  id: string;
  location: string;
  status: SightingStatus;
  type: string;
  timestamp: string;
  district: string;
  /** Position on the stylized Kerala outline map (homepage Sightings HUD), as a % of the map's width/height. */
  x: number;
  y: number;
  /** Real approximate coordinates, for the Leaflet-based tracker map. */
  lat: number;
  lng: number;
}

export const sightingsData: Sighting[] = [
  { id: "s1", location: "Periyar River Basin", status: "On It", type: "Flash Flood Warning", timestamp: "14:32 IST", district: "Ernakulam", x: 58, y: 46, lat: 10.05, lng: 76.35 },
  { id: "s2", location: "Wayanad Highlands", status: "Resolved", type: "Landslide Risk", timestamp: "09:17 IST", district: "Wayanad", x: 68, y: 22, lat: 11.68, lng: 76.13 },
  { id: "s3", location: "Kozhikode Coast", status: "Resolved", type: "Fishing Boat Distress", timestamp: "06:44 IST", district: "Kozhikode", x: 40, y: 26, lat: 11.2588, lng: 75.7804 },
  { id: "s4", location: "Thrissur City", status: "Reported", type: "Structural Collapse", timestamp: "15:08 IST", district: "Thrissur", x: 50, y: 36, lat: 10.5276, lng: 76.2144 },
  { id: "s5", location: "Idukki Reservoir", status: "Resolved", type: "Dam Overflow Alert", timestamp: "Yesterday", district: "Idukki", x: 65, y: 52, lat: 9.85, lng: 76.97 },
  { id: "s6", location: "Varkala Cliffs", status: "Reported", type: "Cliff Erosion", timestamp: "11:22 IST", district: "Thiruvananthapuram", x: 44, y: 86, lat: 8.7379, lng: 76.7163 },
  { id: "s7", location: "Lakshadweep Offshore", status: "On It", type: "Maritime Rescue", timestamp: "08:55 IST", district: "Lakshadweep", x: 12, y: 34, lat: 10.57, lng: 72.64 },
];

/** Vayuvega's current on-patrol marker position on the same map. */
export const vayuvegaPosition = { x: 46, y: 42 };
