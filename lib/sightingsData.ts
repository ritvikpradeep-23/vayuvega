export type SightingStatus = "Reported" | "On It" | "Resolved";

export interface Sighting {
  id: string;
  area: string;
  caseType: string;
  status: SightingStatus;
}

export const sightingsData: Sighting[] = [
  { id: "s1", area: "Kuttanad backwaters", caseType: "Flood evacuation", status: "Resolved" },
  { id: "s2", area: "Munnar hill road", caseType: "Landslide risk report", status: "On It" },
  { id: "s3", area: "Fort Kochi waterfront", caseType: "Missing fishing boat", status: "Resolved" },
  { id: "s4", area: "Wayanad district", caseType: "Monsoon shelter request", status: "On It" },
  { id: "s5", area: "Alappuzha canals", caseType: "Personal grievance", status: "Reported" },
  { id: "s6", area: "Thrissur outskirts", caseType: "Power line hazard", status: "Resolved" },
  { id: "s7", area: "Kozhikode coast", caseType: "Storm surge warning", status: "On It" },
  { id: "s8", area: "Idukki reservoir", caseType: "Personal grievance", status: "Reported" },
];
