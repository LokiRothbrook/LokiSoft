"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HeroCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  gradient?: "pink" | "purple" | "blue" | "cyan" | "mixed";
}

const gradientClasses = {
  pink: "from-neon-pink/5 via-transparent to-transparent",
  purple: "from-neon-purple/5 via-transparent to-transparent",
  blue: "from-neon-blue/5 via-transparent to-transparent",
  cyan: "from-neon-cyan/5 via-transparent to-transparent",
  mixed: "from-neon-pink/5 via-neon-purple/5 to-neon-blue/5",
};

export function HeroCard({ children, className = "", delay = 0, gradient = "mixed" }: HeroCardProps) {
  return (
    <motion.section
      className={`min-h-[90vh] flex items-center justify-center relative ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay }}
    >
      {/* Background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${gradientClasses[gradient]} pointer-events-none`}
      />

      {/* Content */}
      <div className="relative z-10 w-full py-16">{children}</div>
    </motion.section>
  );
}

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "pink" | "purple" | "blue" | "cyan" | "none";
}

const glowClasses = {
  pink: "hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]",
  purple: "hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]",
  blue: "hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]",
  cyan: "hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]",
  none: "",
};

export function GlassCard({
  children,
  className = "",
  hover = true,
  glow = "pink",
}: GlassCardProps) {
  return (
    <motion.div
      className={`glass rounded-2xl p-6 transition-all duration-300 ${
        hover ? glowClasses[glow] : ""
      } ${className}`}
      initial={{ y: 20 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={hover ? { scale: 1.02 } : undefined}
    >
      {children}
    </motion.div>
  );
}

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  gradient?: boolean;
}

export function SectionTitle({
  title,
  subtitle,
  align = "center",
  gradient = true,
}: SectionTitleProps) {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <motion.div
      className={`mb-12 ${alignClasses[align]}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold pb-1 ${
          gradient ? "gradient-text-animated" : ""
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  );
}
