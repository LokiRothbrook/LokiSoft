"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface ToggleBoxProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export function ToggleBox({ title, defaultOpen = false, children }: ToggleBoxProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="my-6 rounded-xl border border-neon-purple/30 bg-neon-purple/5 overflow-hidden w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-neon-purple/10 transition-colors"
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-neon-purple"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.div>
        <span className="font-semibold text-foreground">{title}</span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-4 pb-4 pt-0 border-t border-neon-purple/20">
              <div className="pt-4 prose-p:my-2 prose-p:first:mt-0 prose-p:last:mb-0">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
