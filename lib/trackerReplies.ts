import { villainsData } from "./villainsData";
import { trackerSuitsData } from "./trackerSuitsData";
import { sightingsData } from "./sightingsData";

const THANKS_WORDS = ["thank", "thanks", "grateful", "appreciate", "hero", "legend", "amazing", "awesome"];
const QUESTION_WORDS = ["?", "who", "what", "when", "where", "why", "how", "is he", "are you", "can you"];

const THANKS_REPLIES = [
  "Just doing what the wind already knew how to do. Stay safe out there. 🌬️",
  "Heard. That's all the thanks I need — everyone got home.",
  "Appreciate it, citizen. Keep an eye on the sky this monsoon.",
];

const QUESTION_REPLIES = [
  "Classified, citizen. Some things the wind doesn't share.",
  "Can't confirm or deny — but ask me about a suit or a villain, I'll talk shop.",
  "That one's above my clearance too, honestly.",
];

const GENERIC_REPLIES = [
  "Signal received. Stay dry out there.",
  "Noted. HQ's listening.",
  "Copy that. I'll keep watching the coast.",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export interface MatchedReply {
  category: "thanks" | "villain" | "suit" | "question" | "generic";
  text: string;
}

export function matchReply(input: string): MatchedReply {
  const lower = input.toLowerCase();

  const villain = villainsData.find(
    (v) => lower.includes(v.codename.toLowerCase()) || lower.includes(v.id.replace(/-/g, " "))
  );
  if (villain) {
    return {
      category: "villain",
      text: `${villain.codename}: ${villain.power}. Status — ${villain.status}. ${villain.blurb}`,
    };
  }

  const suit = trackerSuitsData.find((s) => lower.includes(s.suitName.toLowerCase()));
  if (suit) {
    return {
      category: "suit",
      text: `${suit.suitName} — ${suit.usedFor} "${suit.caption}"`,
    };
  }

  if (THANKS_WORDS.some((w) => lower.includes(w))) {
    return { category: "thanks", text: pick(THANKS_REPLIES) };
  }

  if (QUESTION_WORDS.some((w) => lower.includes(w))) {
    return { category: "question", text: pick(QUESTION_REPLIES) };
  }

  return { category: "generic", text: pick(GENERIC_REPLIES) };
}

// Built from real sighting/villain data, not hardcoded — for HQ Radio's ambient dispatch lines.
export function buildDispatchLine(): string {
  const atLargeVillains = villainsData.filter((v) => v.status === "At Large");
  const useVillain = atLargeVillains.length > 0 && Math.random() < 0.4;

  if (useVillain) {
    const v = pick(atLargeVillains);
    return `Unit control, ${v.codename} sighted near ${v.defeatedLocation.name}... proceed with caution.`;
  }

  const s = pick(sightingsData);
  const statusLine =
    s.status === "Resolved"
      ? "situation resolved, stand down"
      : s.status === "On It"
        ? "unit is on scene"
        : "awaiting confirmation";
  return `Unit control, ${s.type.toLowerCase()} reported near ${s.location}... ${statusLine}.`;
}
