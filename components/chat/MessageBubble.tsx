import { motion } from "framer-motion";
import type { ChatMessage } from "./chatTypes";

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isBot = message.from === "bot";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex items-end gap-2 ${isBot ? "justify-start" : "flex-row-reverse justify-start"}`}
    >
      {isBot && (
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-kasavu to-kasavu-soft text-xs font-bold text-void">
          V
        </div>
      )}
      <div className={`flex max-w-[75%] flex-col ${isBot ? "items-start" : "items-end"}`}>
        <div
          className={`rounded-2xl px-4 py-2 text-sm leading-relaxed ${
            isBot ? "rounded-bl-sm bg-status-blue/20 text-cream" : "rounded-br-sm bg-card text-cream"
          }`}
        >
          {message.text}
        </div>
        <span className="mt-1 px-1 text-[10px] text-mist">{message.time}</span>
      </div>
    </motion.div>
  );
}
