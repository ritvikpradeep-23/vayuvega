"use client";

import { useEffect, useState } from "react";
import { heroFeedSeed, type FeedPost } from "@/lib/heroFeedSeed";
import { matchReply } from "@/lib/trackerReplies";
import styles from "./tracker.module.css";

const STORAGE_KEY = "vayuvega-hero-feed-v1";

function loadPosts(): FeedPost[] {
  if (typeof window === "undefined") return heroFeedSeed;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as FeedPost[];
  } catch {
    // ignore malformed storage
  }
  return heroFeedSeed;
}

function formatTimestamp(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch {
    return iso;
  }
}

export default function HeroFeed() {
  const [posts, setPosts] = useState<FeedPost[]>(heroFeedSeed);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPosts(loadPosts());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch {
      // storage unavailable (private mode, quota) — feed just won't persist
    }
  }, [posts, hydrated]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    const now = new Date().toISOString();
    const reply = matchReply(trimmed);

    const newPost: FeedPost = {
      id: `post-${Date.now()}`,
      author: name.trim() || "Anonymous Citizen",
      text: trimmed,
      time: now,
      reply: { author: "@VayuVega_HQ", text: reply.text, time: now },
    };

    setPosts((p) => [newPost, ...p]);
    setText("");
  }

  return (
    <div className={styles.panelBody}>
      <p className={styles.feedNote}>
        VISIBLE ONLY ON YOUR DEVICE — this feed is stored in your browser, not shared with other visitors.
      </p>

      <form onSubmit={handleSubmit} className={styles.feedForm}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name (optional)"
          className={`${styles.feedInput} ${styles.feedNameInput}`}
        />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Say something to HQ..."
          className={`${styles.feedInput} ${styles.feedTextInput}`}
        />
        <button type="submit" disabled={!text.trim()} className={styles.feedSubmit}>
          POST
        </button>
      </form>

      <div className={styles.feedList}>
        {posts.map((post) => (
          <div key={post.id} className={styles.feedPost}>
            <div className={styles.feedPostHeader}>
              <span className={styles.feedAuthor}>@{post.author.replace(/\s+/g, "_")}</span>
              <span>{formatTimestamp(post.time)}</span>
            </div>
            <p className={styles.feedText}>{post.text}</p>
            {post.reply && (
              <div className={styles.feedReply}>
                <span className={styles.feedReplyAuthor}>{post.reply.author}</span>
                <p className={styles.feedReplyText}>{post.reply.text}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
