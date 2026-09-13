"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Emblem } from "@/components/ui/Emblem";
import { chatReducer, initialChatState } from "./chatReducer";
import { MessageBubble } from "./MessageBubble";
import { TransmittingBeat } from "./TransmittingBeat";
import { useChatWidget } from "./ChatWidgetProvider";

const MIN_TRANSMIT_DELAY_MS = 1500;

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
            className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full border-2 border-kasavu bg-void-deep shadow-lg shadow-kasavu/20"
          >
            <motion.span
              animate={{ boxShadow: ["0 0 0 0 rgba(212,175,55,0.5)", "0 0 0 12px rgba(212,175,55,0)"] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="absolute inset-0 rounded-full"
            />
            <Emblem id="chat-bubble" className="h-8 w-8" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 z-50 flex h-[85vh] w-full flex-col border border-kasavu/30 bg-void shadow-2xl sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[560px] sm:w-[380px] sm:rounded-2xl"
          >
            <div className="flex items-center justify-between border-b border-kasavu/20 px-4 py-3">
              <div>
                <p className="font-display text-sm tracking-widest text-kasavu">VAYUVEGA</p>
                <p className="text-xs text-zinc-400">Listening for your signal</p>
              </div>
              <button
                onClick={closeChat}
                aria-label="Minimize chat"
                className="rounded-full p-1 text-zinc-400 hover:text-kasavu"
              >
                ✕
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {state.messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}
              {state.step === "transmitting" && <TransmittingBeat />}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-kasavu/20 p-3">
              {state.step === "error" ? (
                <button
                  type="button"
                  onClick={handleRetry}
                  className="w-full rounded-full bg-kasavu py-2 text-sm font-medium text-void"
                >
                  Try Again
                </button>
              ) : (
                <>
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isInputDisabled}
                    placeholder={state.step === "confirmed" ? "Signal received." : "Type your reply..."}
                    className="flex-1 rounded-full border border-kasavu/30 bg-void-deep px-4 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isInputDisabled || !input.trim()}
                    className="rounded-full bg-kasavu px-4 py-2 text-sm font-medium text-void disabled:opacity-40"
                  >
                    Send
                  </button>
                </>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
