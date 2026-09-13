"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Chatbot } from "./Chatbot";

interface ChatWidgetContextValue {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
}

const ChatWidgetContext = createContext<ChatWidgetContextValue | null>(null);

export function useChatWidget(): ChatWidgetContextValue {
  const ctx = useContext(ChatWidgetContext);
  if (!ctx) throw new Error("useChatWidget must be used within ChatWidgetProvider");
  return ctx;
}

export function ChatWidgetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const value = useMemo<ChatWidgetContextValue>(
    () => ({
      isOpen,
      openChat: () => setIsOpen(true),
      closeChat: () => setIsOpen(false),
    }),
    [isOpen]
  );

  return (
    <ChatWidgetContext.Provider value={value}>
      {children}
      <Chatbot />
    </ChatWidgetContext.Provider>
  );
}
