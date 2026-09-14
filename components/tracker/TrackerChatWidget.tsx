"use client";

import { useState } from "react";
import { matchReply } from "@/lib/trackerReplies";
import styles from "./tracker.module.css";

interface Msg {
  id: string;
  from: "bot" | "user";
  text: string;
}

type Mode = "menu" | "awaiting-sighting" | "awaiting-topic";

let idCounter = 0;
const nextId = () => `tcw-${++idCounter}`;

const GREETING =
  "Dispatch here. I can log a sighting or pull a file on a suit or a rogue — what do you need, agent?";

export default function TrackerChatWidget() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("menu");
  const [messages, setMessages] = useState<Msg[]>([{ id: nextId(), from: "bot", text: GREETING }]);
  const [input, setInput] = useState("");

  function pushBot(text: string) {
    setMessages((m) => [...m, { id: nextId(), from: "bot", text }]);
  }
  function pushUser(text: string) {
    setMessages((m) => [...m, { id: nextId(), from: "user", text }]);
  }

  function handleQuickReply(choice: "sighting" | "suit" | "villain") {
    if (choice === "sighting") {
      pushUser("Report a sighting");
      pushBot("Copy. What's your 20, agent?");
      setMode("awaiting-sighting");
    } else if (choice === "suit") {
      pushUser("Ask about a suit");
      pushBot("Which one — Flood Coat, Windbreaker, Waymark, Eye Form, or Storm Skin?");
      setMode("awaiting-topic");
    } else {
      pushUser("Ask about a villain");
      pushBot("Name the rogue and I'll pull the file.");
      setMode("awaiting-topic");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    pushUser(trimmed);
    setInput("");

    if (mode === "awaiting-sighting") {
      pushBot(`Position logged: "${trimmed}". Stay put, help's oriented. Anything else, agent?`);
      setMode("menu");
      return;
    }

    const reply = matchReply(trimmed);
    pushBot(reply.text);
    setMode("menu");
  }

  return (
    <div className={styles.chatWidget}>
      {open && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <span>DISPATCH TERMINAL</span>
            <button onClick={() => setOpen(false)} aria-label="Close dispatch terminal" style={{ background: "none", border: "none", color: "inherit", cursor: "pointer" }}>
              ✕
            </button>
          </div>
          <div className={styles.chatBody}>
            {messages.map((m) => (
              <div key={m.id} className={m.from === "bot" ? styles.chatBubbleBot : styles.chatBubbleUser}>
                {m.text}
                {m.id === messages[messages.length - 1].id && m.from === "bot" && <span className={styles.chatCursor} />}
              </div>
            ))}
          </div>
          {mode === "menu" && (
            <div className={styles.quickReplies}>
              <button onClick={() => handleQuickReply("sighting")} className={styles.quickReplyBtn}>
                Report a sighting
              </button>
              <button onClick={() => handleQuickReply("suit")} className={styles.quickReplyBtn}>
                Ask about a suit
              </button>
              <button onClick={() => handleQuickReply("villain")} className={styles.quickReplyBtn}>
                Ask about a villain
              </button>
            </div>
          )}
          <form onSubmit={handleSubmit} className={styles.chatInputRow}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className={styles.chatInput}
            />
            <button type="submit" className={styles.chatSend}>
              SEND
            </button>
          </form>
        </div>
      )}
      <button onClick={() => setOpen((o) => !o)} className={styles.chatToggle} aria-label="Toggle dispatch terminal">
        {open ? "×" : "⌨"}
      </button>
    </div>
  );
}
