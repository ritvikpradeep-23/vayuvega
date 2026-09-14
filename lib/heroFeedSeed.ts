export interface FeedReply {
  author: string;
  text: string;
  time: string;
}

export interface FeedPost {
  id: string;
  author: string;
  text: string;
  time: string;
  reply?: FeedReply;
}

export const heroFeedSeed: FeedPost[] = [
  {
    id: "seed-1",
    author: "meera_kzhd",
    text: "saw someone move across the water during last night's squall. gone before I could get my phone up. anyone else?",
    time: "2026-09-12T21:14:00+05:30",
    reply: {
      author: "@VayuVega_HQ",
      text: "Wind doesn't wait for cameras. You're safe now — that's what matters. 🌬️",
      time: "2026-09-12T21:20:00+05:30",
    },
  },
  {
    id: "seed-2",
    author: "thomas.v",
    text: "twenty-eight of us walked out of that landslide who shouldn't have. still don't know how. thank you, whoever you are.",
    time: "2026-08-30T18:02:00+05:30",
    reply: {
      author: "@VayuVega_HQ",
      text: "Heard. That's all the thanks I need — everyone got home.",
      time: "2026-08-30T18:05:00+05:30",
    },
  },
  {
    id: "seed-3",
    author: "anon_ekm",
    text: "is the flood watch real for periyar basin today or just a drill",
    time: "2026-09-14T08:40:00+05:30",
    reply: {
      author: "@VayuVega_HQ",
      text: "Real. Stay off the low banks till the amber clears. Watching it.",
      time: "2026-09-14T08:44:00+05:30",
    },
  },
  {
    id: "seed-4",
    author: "devika_s",
    text: "the supply crates that showed up outside our village overnight during the landslide cutoff — that was him right? has to be.",
    time: "2026-08-31T07:15:00+05:30",
  },
  {
    id: "seed-5",
    author: "coastal_watch_kzk",
    text: "reporting calm seas off kozhikode this morning. good patrol.",
    time: "2026-09-13T06:50:00+05:30",
    reply: {
      author: "@VayuVega_HQ",
      text: "Copy that. I'll keep watching the coast.",
      time: "2026-09-13T06:52:00+05:30",
    },
  },
];
