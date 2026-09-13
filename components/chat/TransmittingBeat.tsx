import { motion } from "framer-motion";
import { chatCopy } from "@/lib/chatCopy";

export function TransmittingBeat() {
  return (
    <div className="flex justify-start">
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        className="max-w-[85%] rounded-2xl rounded-bl-sm border border-kasavu/30 bg-void-deep/80 px-4 py-2 text-sm text-kasavu"
      >
        {chatCopy.transmitting}
      </motion.div>
    </div>
  );
}
