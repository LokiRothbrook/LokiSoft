"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface NeonLogoProps {
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  animated?: boolean;
  href?: string;
}

const sizeClasses = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-4xl",
  hero: "text-6xl md:text-8xl lg:text-9xl",
};

export function NeonLogo({ size = "md", animated = true, href = "/" }: NeonLogoProps) {
  const textClasses = sizeClasses[size];

  const logoContent = (
    <motion.div
      className="relative select-none"
      initial={animated ? { opacity: 0 } : undefined}
      animate={animated ? { opacity: 1 } : undefined}
      transition={{ duration: 0.5 }}
    >
      {/* Main text */}
      <span className={`font-bold tracking-tight ${textClasses}`}>
        <motion.span
          className="inline-block text-neon-pink"
          style={{
            textShadow: `
              0 0 5px rgba(236, 72, 153, 0.8),
              0 0 10px rgba(236, 72, 153, 0.6),
              0 0 20px rgba(236, 72, 153, 0.4),
              0 0 40px rgba(236, 72, 153, 0.2)
            `,
          }}
          animate={
            animated
              ? {
                  textShadow: [
                    `0 0 5px rgba(236, 72, 153, 0.8), 0 0 10px rgba(236, 72, 153, 0.6), 0 0 20px rgba(236, 72, 153, 0.4), 0 0 40px rgba(236, 72, 153, 0.2)`,
                    `0 0 10px rgba(236, 72, 153, 1), 0 0 20px rgba(236, 72, 153, 0.8), 0 0 30px rgba(236, 72, 153, 0.6), 0 0 50px rgba(236, 72, 153, 0.4)`,
                    `0 0 5px rgba(236, 72, 153, 0.8), 0 0 10px rgba(236, 72, 153, 0.6), 0 0 20px rgba(236, 72, 153, 0.4), 0 0 40px rgba(236, 72, 153, 0.2)`,
                  ],
                }
              : undefined
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Loki
        </motion.span>
        <motion.span
          className="inline-block text-neon-cyan"
          style={{
            textShadow: `
              0 0 5px rgba(34, 211, 238, 0.8),
              0 0 10px rgba(34, 211, 238, 0.6),
              0 0 20px rgba(34, 211, 238, 0.4),
              0 0 40px rgba(34, 211, 238, 0.2)
            `,
          }}
          animate={
            animated
              ? {
                  textShadow: [
                    `0 0 5px rgba(34, 211, 238, 0.8), 0 0 10px rgba(34, 211, 238, 0.6), 0 0 20px rgba(34, 211, 238, 0.4), 0 0 40px rgba(34, 211, 238, 0.2)`,
                    `0 0 10px rgba(34, 211, 238, 1), 0 0 20px rgba(34, 211, 238, 0.8), 0 0 30px rgba(34, 211, 238, 0.6), 0 0 50px rgba(34, 211, 238, 0.4)`,
                    `0 0 5px rgba(34, 211, 238, 0.8), 0 0 10px rgba(34, 211, 238, 0.6), 0 0 20px rgba(34, 211, 238, 0.4), 0 0 40px rgba(34, 211, 238, 0.2)`,
                  ],
                }
              : undefined
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          Soft
        </motion.span>
      </span>

      {/* Underline glow effect */}
      {size === "hero" && (
        <motion.div
          className="absolute -bottom-2 left-0 right-0 h-[2px]"
          style={{
            background:
              "linear-gradient(90deg, rgba(236, 72, 153, 0), rgba(236, 72, 153, 1), rgba(168, 85, 247, 1), rgba(34, 211, 238, 1), rgba(34, 211, 238, 0))",
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
            scaleX: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block hover:opacity-90 transition-opacity">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}

export function NeonLogoAnimated() {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <NeonLogo size="hero" animated href={undefined} />

      {/* Decorative elements for hero */}
      <motion.div
        className="absolute -top-8 -left-8 w-16 h-16 border-l-2 border-t-2 border-neon-pink/50"
        initial={{ opacity: 0, x: -20, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
      <motion.div
        className="absolute -top-8 -right-8 w-16 h-16 border-r-2 border-t-2 border-neon-cyan/50"
        initial={{ opacity: 0, x: 20, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      />
      <motion.div
        className="absolute -bottom-8 -left-8 w-16 h-16 border-l-2 border-b-2 border-neon-purple/50"
        initial={{ opacity: 0, x: -20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      />
      <motion.div
        className="absolute -bottom-8 -right-8 w-16 h-16 border-r-2 border-b-2 border-neon-blue/50"
        initial={{ opacity: 0, x: 20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      />
    </motion.div>
  );
}
