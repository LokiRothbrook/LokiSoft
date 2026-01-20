"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, ArrowLeft, Coffee, Terminal, Compass, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/hero-card";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 overflow-hidden relative">
      {/* Glitch background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-pink/10 blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-purple/10 blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neon-cyan/5 blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center">
          {/* Glitchy 404 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="relative mb-8"
          >
            <h1 className="text-[12rem] md:text-[16rem] font-black leading-none tracking-tighter select-none">
              <span className="gradient-text-animated relative">
                4
                <motion.span
                  className="absolute inset-0 text-neon-cyan opacity-50"
                  animate={{
                    x: [0, -4, 4, -2, 0],
                    opacity: [0.5, 0.8, 0.3, 0.6, 0.5],
                  }}
                  transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3 }}
                >
                  4
                </motion.span>
              </span>
              <span className="relative inline-block">
                <motion.span
                  className="gradient-text-animated"
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  0
                </motion.span>
              </span>
              <span className="gradient-text-animated relative">
                4
                <motion.span
                  className="absolute inset-0 text-neon-pink opacity-50"
                  animate={{
                    x: [0, 3, -3, 1, 0],
                    opacity: [0.5, 0.3, 0.7, 0.4, 0.5],
                  }}
                  transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2.5 }}
                >
                  4
                </motion.span>
              </span>
            </h1>

            {/* Scanlines effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.03)_2px,rgba(255,255,255,0.03)_4px)]" />
            </div>
          </motion.div>

          {/* Humorous messages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4 mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              <Terminal className="inline-block w-6 h-6 mr-2 text-neon-cyan" />
              <span className="text-neon-cyan">$</span> ERROR: Page not found in this dimension
            </h2>

            <div className="text-muted-foreground space-y-2 max-w-2xl mx-auto">
              <p className="text-lg">
                Looks like you&apos;ve wandered into the void. Don&apos;t worry, even the best developers
                get lost sometimes. <Coffee className="inline-block w-4 h-4 text-neon-pink" />
              </p>
              <p className="text-sm text-muted-foreground/70">
                Maybe the page went to get coffee. Maybe it never existed. Maybe it&apos;s hiding
                behind a firewall. The mysteries of the internet are endless.
              </p>
            </div>
          </motion.div>

          {/* Bible Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <GlassCard className="max-w-2xl mx-auto text-left" glow="purple">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-neon-purple/10 shrink-0">
                  <BookOpen className="w-6 h-6 text-neon-purple" />
                </div>
                <div>
                  <blockquote className="text-lg italic text-foreground/90 mb-2">
                    &ldquo;Ask and it will be given to you; <span className="text-neon-cyan">seek and you will find</span>;
                    knock and the door will be opened to you.&rdquo;
                  </blockquote>
                  <cite className="text-sm text-muted-foreground">
                    — Matthew 7:7 <span className="text-neon-pink">(The original search engine)</span>
                  </cite>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Navigation options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-medium text-foreground">
              <Compass className="inline-block w-5 h-5 mr-2 text-neon-cyan" />
              Let&apos;s get you back on track:
            </h3>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/">
                <Button size="lg" className="bg-neon-pink hover:bg-neon-pink/80 group">
                  <Home className="w-4 h-4 mr-2" />
                  Return Home
                </Button>
              </Link>

              <Link href="/services">
                <Button size="lg" variant="outline" className="group border-neon-purple/50 hover:border-neon-purple hover:bg-neon-purple/10">
                  <Search className="w-4 h-4 mr-2" />
                  Explore Services
                </Button>
              </Link>

              <Button
                size="lg"
                variant="ghost"
                className="group"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Go Back
              </Button>
            </div>
          </motion.div>

          {/* Fun easter egg */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-16 text-xs text-muted-foreground/50"
          >
            <p>
              Fun fact: The HTTP 404 error was named after room 404 at CERN, where the
              original web servers were housed. <span className="text-neon-cyan">The more you know.</span>
            </p>
            <p className="mt-2">
              <span className="font-mono text-neon-pink/70">Status:</span>{" "}
              <span className="font-mono text-neon-cyan/70">NOT_FOUND</span>{" "}
              <span className="font-mono text-muted-foreground/30">|</span>{" "}
              <span className="font-mono text-neon-purple/70">Dimension:</span>{" "}
              <span className="font-mono text-neon-cyan/70">C-137</span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: i % 3 === 0 ? "var(--neon-pink)" : i % 3 === 1 ? "var(--neon-purple)" : "var(--neon-cyan)",
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
}
