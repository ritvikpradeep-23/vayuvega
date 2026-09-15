export type SightingStatus = "Reported" | "On It" | "Resolved";

export interface Sighting {
  id: string;
  location: string;
  status: SightingStatus;
  type: string;
  timestamp: string;
  district: string;
  /** Real approximate coordinates, for the Leaflet-based tracker map. */
  lat: number;
  lng: number;
}

export const sightingsData: Sighting[] = [
  { id: "s1", location: "Periyar River Basin", status: "On It", type: "Flash Flood Warning", timestamp: "14:32 IST", district: "Ernakulam", lat: 10.05, lng: 76.35 },
  { id: "s2", location: "Wayanad Highlands", status: "Resolved", type: "Landslide Risk", timestamp: "09:17 IST", district: "Wayanad", lat: 11.68, lng: 76.13 },
  { id: "s3", location: "Kozhikode Coast", status: "Resolved", type: "Fishing Boat Distress", timestamp: "06:44 IST", district: "Kozhikode", lat: 11.2588, lng: 75.7804 },
  { id: "s4", location: "Thrissur City", status: "Reported", type: "Structural Collapse", timestamp: "15:08 IST", district: "Thrissur", lat: 10.5276, lng: 76.2144 },
  { id: "s5", location: "Idukki Reservoir", status: "Resolved", type: "Dam Overflow Alert", timestamp: "Yesterday", district: "Idukki", lat: 9.85, lng: 76.97 },
  { id: "s6", location: "Varkala Cliffs", status: "Reported", type: "Cliff Erosion", timestamp: "11:22 IST", district: "Thiruvananthapuram", lat: 8.7379, lng: 76.7163 },
  { id: "s7", location: "Lakshadweep Offshore", status: "On It", type: "Maritime Rescue", timestamp: "08:55 IST", district: "Lakshadweep", lat: 10.57, lng: 72.64 },
];
