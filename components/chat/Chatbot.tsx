"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { chatCopy } from "@/lib/chatCopy";
import { chatReducer, initialChatState } from "./chatReducer";
import { MessageBubble } from "./MessageBubble";
import { TransmittingBeat } from "./TransmittingBeat";
import { useChatWidget } from "./ChatWidgetProvider";
import type { ChatStep } from "./chatTypes";

const MIN_TRANSMIT_DELAY_MS = 1500;

const PLACEHOLDER_BY_STEP: Partial<Record<ChatStep, string>> = {
  name: chatCopy.placeholders.name,
  age: chatCopy.placeholders.age,
  location: chatCopy.placeholders.location,
  email: chatCopy.placeholders.email,
  grievance: chatCopy.placeholders.grievance,
};

export function Chatbot() {
  const { isOpen, closeChat, openChat } = useChatWidget();
  const [state, dispatch] = useReducer(chatReducer, initialChatState);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [state.messages, state.step]);

  useEffect(() => {
    if (state.step !== "transmitting") return;

    let cancelled = false;
    const send = async () => {
      const minDelay = new Promise((resolve) => setTimeout(resolve, MIN_TRANSMIT_DELAY_MS));
      try {
        const [response] = await Promise.all([
          fetch("/api/notify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(state.visitor),
          }),
          minDelay,
        ]);
        const data = await response.json();
        if (cancelled) return;
        if (response.ok && data.ok) {
          dispatch({ type: "SEND_SUCCESS" });
        } else {
          dispatch({ type: "SEND_FAILURE", payload: data.error ?? "Unknown error" });
        }
      } catch {
        if (!cancelled) dispatch({ type: "SEND_FAILURE", payload: "Network error" });
      }
    };

    send();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.step]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    dispatch({ type: "USER_SUBMIT", payload: trimmed });
    setInput("");
  };

  const handleRetry = () => dispatch({ type: "RETRY" });

  const isInputDisabled = state.step === "transmitting" || state.step === "confirmed" || state.step === "error";
  const placeholder = state.step === "confirmed" ? "Signal received." : PLACEHOLDER_BY_STEP[state.step] ?? "Type your reply...";

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="bubble"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={openChat}
            aria-label="Open chat with Vayuvega"
            className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-kasavu to-kasavu-soft shadow-lg shadow-kasavu/30"
          >
            <motion.span
              animate={{ boxShadow: ["0 0 0 0 rgba(201,154,74,0.5)", "0 0 0 14px rgba(201,154,74,0)"] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="absolute inset-0 rounded-full"
            />
            <span className="font-display text-2xl font-bold text-void">V</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-void-deep/80 p-4 backdrop-blur-sm"
            onClick={closeChat}
          >
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="flex h-[85vh] w-full max-w-md flex-col rounded-[24px] border border-card-border bg-card shadow-2xl sm:h-[600px]"
            >
              <div className="flex items-center justify-between border-b border-card-border px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-kasavu to-kasavu-soft font-display text-base font-bold text-void">
                      V
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-status-green" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold text-cream">Vayuvega</p>
                    <p className="text-xs text-mist">Here · Kerala Region 🌧️</p>
                  </div>
                </div>
                <button
                  onClick={closeChat}
                  aria-label="Close chat"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-mist hover:text-cream"
                >
                  ✕
                </button>
              </div>

              <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
                {state.messages.map((m) => (
                  <MessageBubble key={m.id} message={m} />
                ))}
                {state.step === "transmitting" && <TransmittingBeat />}
              </div>

              <form onSubmit={handleSubmit} className="border-t border-card-border p-4">
                {state.step === "error" ? (
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="w-full rounded-full bg-gradient-to-r from-kasavu to-kasavu-soft py-2.5 text-sm font-bold text-void"
                  >
                    Try Again
                  </button>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isInputDisabled}
                        placeholder={placeholder}
                        className="flex-1 rounded-full border border-card-border bg-void px-4 py-2.5 text-sm text-cream outline-none placeholder:text-mist/70 disabled:opacity-50"
                      />
                      <button
                        type="submit"
                        disabled={isInputDisabled || !input.trim()}
                        className="rounded-full bg-gradient-to-r from-kasavu to-kasavu-soft px-5 py-2.5 text-sm font-bold text-void disabled:opacity-40"
                      >
                        Send
                      </button>
                    </div>
                    <p className="mt-2 text-center text-[11px] text-mist/70">Press Enter to send</p>
                  </>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
