// Single shared audio system for the tracker page: one AudioContext, used by
// the ticker tick, the theme jingle, and (as a mute flag) HQ Radio's speech.

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    ctx = ctx || new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    return ctx;
  } catch {
    return null;
  }
}

export function playBeep(freq = 880, duration = 0.05, gainValue = 0.02) {
  const audioCtx = getCtx();
  if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "square";
    osc.frequency.value = freq;
    gain.gain.value = gainValue;
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch {
    // Web Audio unavailable — fail silently.
  }
}

// Short procedurally generated 8-bit "power on" jingle — no external audio file.
const JINGLE_NOTES: Array<{ freq: number; start: number; duration: number }> = [
  { freq: 523.25, start: 0.0, duration: 0.14 }, // C5
  { freq: 659.25, start: 0.14, duration: 0.14 }, // E5
  { freq: 783.99, start: 0.28, duration: 0.14 }, // G5
  { freq: 1046.5, start: 0.42, duration: 0.28 }, // C6
  { freq: 783.99, start: 0.75, duration: 0.14 }, // G5
  { freq: 1046.5, start: 0.9, duration: 0.5 }, // C6 (hold)
];

export function playJingle() {
  const audioCtx = getCtx();
  if (!audioCtx) return;
  try {
    const now = audioCtx.currentTime;
    JINGLE_NOTES.forEach(({ freq, start, duration }) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "square";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, now + start);
      gain.gain.linearRampToValueAtTime(0.06, now + start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + start + duration);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(now + start);
      osc.stop(now + start + duration + 0.05);
    });
  } catch {
    // Web Audio unavailable — fail silently.
  }
}

export function speak(text: string, opts?: { rate?: number; volume?: number }): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  try {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = opts?.rate ?? 0.9;
    utterance.volume = opts?.volume ?? 0.6;
    utterance.pitch = 0.85;
    window.speechSynthesis.speak(utterance);
    return true;
  } catch {
    return false;
  }
}

export function speechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}
