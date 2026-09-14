const STORAGE_KEY = "vayuvega-revealed-villains-v1";

export function loadRevealed(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw) as string[]);
  } catch {
    // ignore malformed storage
  }
  return new Set();
}

export function saveRevealed(ids: Set<string>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    // storage unavailable — reveal state just won't persist
  }
}
