export interface HeroWaypoint {
  id: string;
  label: string;
  col: number;
  row: number;
}

// Grid positions on the isometric city illustration (IsoCityMap). These cells,
// and their immediate neighbors, are kept clear of buildings to read as plazas.
export const heroTrackerWaypoints: HeroWaypoint[] = [
  { id: "periyar", label: "Periyar River Basin", col: 2, row: 4 },
  { id: "wayanad", label: "Wayanad Highlands", col: 6, row: 1 },
  { id: "kozhikode", label: "Kozhikode Coast", col: 1, row: 2 },
  { id: "thrissur", label: "Thrissur City", col: 4, row: 3 },
  { id: "idukki", label: "Idukki Reservoir", col: 7, row: 4 },
  { id: "varkala", label: "Varkala Cliffs", col: 3, row: 5 },
];

export const HERO_TRACKER_CONFIG = {
  moveDurationMs: 4200,
  dwellMs: 3200,
  gridCols: 9,
  gridRows: 7,
  tileWidth: 70,
  tileHeight: 36,
  originX: 470,
  originY: 70,
};

/** Projects a (col, row) grid cell to the isometric illustration's pixel center. */
export function projectIso(col: number, row: number): { x: number; y: number } {
  const { tileWidth, tileHeight, originX, originY } = HERO_TRACKER_CONFIG;
  return {
    x: originX + (col - row) * (tileWidth / 2),
    y: originY + (col + row) * (tileHeight / 2),
  };
}
