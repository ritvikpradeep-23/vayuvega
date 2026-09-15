import { sightingsData } from "./sightingsData";

export interface HeroWaypoint {
  id: string;
  label: string;
  lat: number;
  lng: number;
}

export const HERO_TRACKER_CONFIG = {
  moveDurationMs: 4200,
  dwellMs: 3200,
  gridCols: 11,
  gridRows: 9,
  tileWidth: 78,
  tileHeight: 40,
  originX: 560,
  originY: 80,
};

// Real Kerala coordinates, so the hero's tour and every marker line up with the
// same geography as the Normal (Leaflet) map — not an invented grid.
const MAINLAND_BOUNDS = { latMin: 8.55, latMax: 11.85, lngMin: 75.5, lngMax: 77.1 };

/** Projects a (col, row) — grid cell OR any continuous equivalent — to iso pixel space. */
export function projectIso(col: number, row: number): { x: number; y: number } {
  const { tileWidth, tileHeight, originX, originY } = HERO_TRACKER_CONFIG;
  return {
    x: originX + (col - row) * (tileWidth / 2),
    y: originY + (col + row) * (tileHeight / 2),
  };
}

/** Projects a real mainland Kerala lat/lng onto the isometric grid's coordinate space. */
export function projectGeo(lat: number, lng: number): { x: number; y: number } {
  const { latMin, latMax, lngMin, lngMax } = MAINLAND_BOUNDS;
  const u = ((lng - lngMin) / (lngMax - lngMin)) * (HERO_TRACKER_CONFIG.gridCols - 1);
  const v = ((latMax - lat) / (latMax - latMin)) * (HERO_TRACKER_CONFIG.gridRows - 1);
  return projectIso(u, v);
}

/** Lakshadweep sits far offshore, well outside the mainland lng range — fixed spot off the west edge. */
export function projectOffshore(): { x: number; y: number } {
  return projectIso(-2.6, 4.2);
}

const OFFSHORE_LNG_THRESHOLD = 74;

/** Projects any tracked point (sighting/villain), routing offshore points to the fixed island spot. */
export function projectPoint(lat: number, lng: number): { x: number; y: number } {
  return lng < OFFSHORE_LNG_THRESHOLD ? projectOffshore() : projectGeo(lat, lng);
}

// The hero's patrol route: a north-to-south sweep of the mainland sighting
// locations, then back — these are also the road-graph nodes (see
// HeroTrackerView), so the marker only ever travels along a drawn road.
const TOUR_ORDER = ["s2", "s3", "s4", "s1", "s5", "s6"];

export const heroTrackerWaypoints: HeroWaypoint[] = TOUR_ORDER.map((id) => {
  const s = sightingsData.find((x) => x.id === id)!;
  return { id: s.id, label: s.location, lat: s.lat, lng: s.lng };
});
