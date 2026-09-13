import { motion } from "framer-motion";
import type { ChatMessage } from "./chatTypes";

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isBot = message.from === "bot";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isBot ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
          isBot
            ? "bg-void-deep/80 border border-kasavu/30 text-zinc-100 rounded-bl-sm"
            : "bg-monsoon/90 text-void rounded-br-sm"
        }`}
      >
        {message.text}
      </div>
    </motion.div>
  );
}
