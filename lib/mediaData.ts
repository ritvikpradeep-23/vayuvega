export type MediaType = "News" | "Video" | "Press" | "Photos";

export interface MediaItem {
  id: string;
  type: MediaType;
  year: number;
  title: string;
  blurb: string;
  duration?: string;
}

export const mediaData: MediaItem[] = [
  {
    id: "m1",
    type: "News",
    year: 2006,
    title: "Local News: 'Mystery Wind' Saves Flood Victims",
    blurb: "Thrissur district reports of an unexplained wind pattern during the August 2006 flood rescue.",
  },
  {
    id: "m2",
    type: "Photos",
    year: 2007,
    title: "First Photographed Sighting — Thrissur Backwaters",
    blurb: "A blurred, long-exposure photograph taken by a fisherman near the Periyar river mouth.",
  },
  {
    id: "m3",
    type: "Press",
    year: 2011,
    title: "Meteorological Dept. Statement on Cyclone Phyan Anomaly",
    blurb: "An official release addressing an 'anomalous wind pattern' recorded during the cyclone response.",
  },
  {
    id: "m4",
    type: "News",
    year: 2011,
    title: "Coastal Villages Report a 'Guardian of the Storm'",
    blurb: "Fishing communities near Kozhikode describe a presence that redirected the storm surge.",
  },
  {
    id: "m5",
    type: "Photos",
    year: 2013,
    title: "Aerial Photograph, Believed Wind-Trail Over Kozhikode Coast",
    blurb: "Amateur drone footage capturing an unexplained atmospheric disturbance along the coastline.",
  },
  {
    id: "m6",
    type: "Video",
    year: 2016,
    title: "Nilgiris Landslide Rescue — Bystander Footage",
    blurb: "Shaky handheld footage from the tea estate road, capturing the moment workers were pulled to safety.",
    duration: "1:42",
  },
  {
    id: "m7",
    type: "News",
    year: 2016,
    title: "28 Workers Pulled From Collapsed Estate Road",
    blurb: "Regional coverage of the Nilgiris landslide rescue and the mystery of how it happened so fast.",
  },
  {
    id: "m8",
    type: "Photos",
    year: 2018,
    title: "Grainy Photograph, Coastal Watch Tower, Kochi",
    blurb: "A harbor security camera still, later circulated for its unexplained motion blur pattern.",
  },
  {
    id: "m9",
    type: "Video",
    year: 2019,
    title: "Operation Monsoon: Drone Footage Over Ernakulam",
    blurb: "Disaster response drone footage from the worst floods in a century, showing rescue patterns still unexplained.",
    duration: "3:15",
  },
  {
    id: "m10",
    type: "Press",
    year: 2019,
    title: "State Disaster Management Authority Statement",
    blurb: "An official acknowledgment of 'unidentified independent rescue activity' during the 2019 floods.",
  },
  {
    id: "m11",
    type: "News",
    year: 2021,
    title: "Meteorology Student Turned Urban Legend? Thrissur Speaks",
    blurb: "A local feature piece tracing rumors back to a young meteorology student from the 2006 flood.",
  },
  {
    id: "m12",
    type: "Video",
    year: 2023,
    title: "Wayanad Crisis: NDRF Radio Chatter (Leaked)",
    blurb: "Leaked radio audio from the Wayanad landslide response referencing overnight supply caches.",
    duration: "0:58",
  },
  {
    id: "m13",
    type: "Photos",
    year: 2023,
    title: "Overnight Supply Cache, Wayanad Village",
    blurb: "A resident's photograph of medical supplies that appeared outside a cut-off village at dawn.",
  },
  {
    id: "m14",
    type: "News",
    year: 2026,
    title: "Cyclone Biparjoy: 67 Crew Rescued, Coast Guard Baffled",
    blurb: "National coverage of the Lakshadweep offshore rescue and the coast guard's own confusion at the timeline.",
  },
  {
    id: "m15",
    type: "Press",
    year: 2026,
    title: "Vayuvega Help Portal Launches Public Contact Line",
    blurb: "A short release announcing this website as the first direct way to reach him.",
  },
];
