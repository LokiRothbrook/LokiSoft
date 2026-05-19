"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  type: "circle" | "square" | "triangle" | "line";
  xOffset: number;
}

interface FloatingShape {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
  blur: number;
  duration: number;
  type: "blob" | "ring" | "glow";
}

const NEON_COLORS = [
  "rgba(236, 72, 153, 0.6)", // pink
  "rgba(168, 85, 247, 0.6)", // purple
  "rgba(59, 130, 246, 0.6)", // blue
  "rgba(34, 211, 238, 0.6)", // cyan
];

const NEON_COLORS_BRIGHT = [
  "rgba(236, 72, 153, 0.9)",
  "rgba(168, 85, 247, 0.9)",
  "rgba(59, 130, 246, 0.9)",
  "rgba(34, 211, 238, 0.9)",
];

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    color: NEON_COLORS_BRIGHT[Math.floor(Math.random() * NEON_COLORS_BRIGHT.length)],
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
    type: (["circle", "square", "triangle", "line"] as const)[Math.floor(Math.random() * 4)],
    xOffset: Math.random() * 20 - 10,
  }));
}

function generateShapes(count: number): FloatingShape[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 300 + 100,
    rotation: Math.random() * 360,
    color: NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)],
    blur: Math.random() * 60 + 40,
    duration: Math.random() * 30 + 20,
    type: (["blob", "ring", "glow"] as const)[Math.floor(Math.random() * 3)],
  }));
}

function ParticleElement({ particle }: { particle: Particle }) {
  const baseStyle = {
    position: "absolute" as const,
    left: `${particle.x}%`,
    top: `${particle.y}%`,
  };

  const shapes = {
    circle: (
      <motion.div
        style={{
          ...baseStyle,
          width: particle.size,
          height: particle.size,
          borderRadius: "50%",
          backgroundColor: particle.color,
          boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, particle.xOffset, 0],
          opacity: [0.3, 1, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: particle.duration,
          delay: particle.delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ),
    square: (
      <motion.div
        style={{
          ...baseStyle,
          width: particle.size,
          height: particle.size,
          backgroundColor: particle.color,
          boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
        }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
          opacity: [0.2, 0.8, 0.2],
        }}
        transition={{
          duration: particle.duration,
          delay: particle.delay,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    ),
    triangle: (
      <motion.div
        style={{
          ...baseStyle,
          width: 0,
          height: 0,
          borderLeft: `${particle.size / 2}px solid transparent`,
          borderRight: `${particle.size / 2}px solid transparent`,
          borderBottom: `${particle.size}px solid ${particle.color}`,
          filter: `drop-shadow(0 0 ${particle.size}px ${particle.color})`,
        }}
        animate={{
          y: [0, -25, 0],
          rotate: [0, 360],
          opacity: [0.3, 0.9, 0.3],
        }}
        transition={{
          duration: particle.duration,
          delay: particle.delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ),
    line: (
      <motion.div
        style={{
          ...baseStyle,
          width: particle.size * 8,
          height: 1,
          backgroundColor: particle.color,
          boxShadow: `0 0 ${particle.size}px ${particle.color}`,
        }}
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 1, 0],
          x: [0, 50, 100],
        }}
        transition={{
          duration: particle.duration / 2,
          delay: particle.delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ),
  };

  return shapes[particle.type];
}

function ShapeElement({ shape }: { shape: FloatingShape }) {
  const shapes = {
    blob: (
      <motion.div
        className="absolute rounded-full"
        style={{
          left: `${shape.x}%`,
          top: `${shape.y}%`,
          width: shape.size,
          height: shape.size,
          background: `radial-gradient(circle, ${shape.color} 0%, transparent 70%)`,
          filter: `blur(${shape.blur}px)`,
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: shape.duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ),
    ring: (
      <motion.div
        className="absolute rounded-full"
        style={{
          left: `${shape.x}%`,
          top: `${shape.y}%`,
          width: shape.size,
          height: shape.size,
          border: `2px solid ${shape.color}`,
          filter: `blur(${shape.blur / 4}px)`,
          boxShadow: `0 0 ${shape.blur / 2}px ${shape.color}, inset 0 0 ${shape.blur / 2}px ${shape.color}`,
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: shape.duration,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    ),
    glow: (
      <motion.div
        className="absolute"
        style={{
          left: `${shape.x}%`,
          top: `${shape.y}%`,
          width: shape.size / 2,
          height: shape.size / 2,
          background: shape.color,
          borderRadius: "50%",
          filter: `blur(${shape.blur}px)`,
        }}
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: shape.duration / 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ),
  };

  return shapes[shape.type];
}

export function ParticleBackground() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [shapes, setShapes] = useState<FloatingShape[]>([]);

  // Generate particles only on client after mount - hydration-safe pattern
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(generateParticles(30));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShapes(generateShapes(6));
  }, []);

  // Don't render until mounted on client
  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large floating shapes */}
      {shapes.map((shape) => (
        <ShapeElement key={`shape-${shape.id}`} shape={shape} />
      ))}

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(168, 85, 247, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Particles */}
      {particles.map((particle) => (
        <ParticleElement key={`particle-${particle.id}`} particle={particle} />
      ))}

      {/* Scan line effect */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] opacity-10"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.8), transparent)",
        }}
        animate={{
          top: ["-2px", "100%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-neon-pink/20" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-neon-purple/20" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-neon-blue/20" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-neon-cyan/20" />
    </div>
  );
}
