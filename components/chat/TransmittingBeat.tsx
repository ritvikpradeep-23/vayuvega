import { motion } from "framer-motion";
import { chatCopy } from "@/lib/chatCopy";

export function TransmittingBeat() {
  return (
    <div className="flex items-end gap-2">
      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-kasavu to-kasavu-soft text-xs font-bold text-void">
        V
      </div>
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        className="max-w-[75%] rounded-2xl rounded-bl-sm bg-status-blue/20 px-4 py-2 text-sm text-cream"
      >
        {chatCopy.transmitting}
      </motion.div>
    </div>
  );
}
