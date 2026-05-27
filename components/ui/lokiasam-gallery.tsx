"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { cloudinaryUrl } from "@/lib/cloudinary";

const screenshots = [
  { filename: "LokiASAM-Dashboard.png", label: "Server Dashboard" },
  { filename: "LokiASAM-Overview.png", label: "Server Overview" },
  { filename: "LokiASAM-ModBrowser.png", label: "Mod Browser" },
  { filename: "LokiASAM-Mod-Overview.png", label: "Mod Overview" },
  { filename: "LokiASAM-SteamCMD.png", label: "SteamCMD Setup" },
  { filename: "LokiASAM-Proton.png", label: "Proton Configuration" },
  { filename: "LokiASAM-First-Run.png", label: "First Run Setup" },
];

// ─── Lightbox ───────────────────────────────────────────────────────────────

function Lightbox({
  initialIndex,
  onClose,
}: {
  initialIndex: number;
  onClose: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const touchStartX = useRef<number | null>(null);
  const thumbStripRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((index: number) => {
    setZoom(1);
    setActiveIndex(index);
  }, []);

  const prev = useCallback(() => {
    goTo((activeIndex - 1 + screenshots.length) % screenshots.length);
  }, [activeIndex, goTo]);

  const next = useCallback(() => {
    goTo((activeIndex + 1) % screenshots.length);
  }, [activeIndex, goTo]);

  const zoomIn = () => setZoom((z) => Math.min(3, z + 0.5));
  const zoomOut = () => setZoom((z) => Math.max(1, z - 0.5));

  // Keyboard nav + scroll lock
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, prev, next]);

  // Scroll active thumbnail into view
  useEffect(() => {
    const strip = thumbStripRef.current;
    if (!strip) return;
    const thumb = strip.children[activeIndex] as HTMLElement | undefined;
    thumb?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeIndex]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
    touchStartX.current = null;
  };

  const shot = screenshots[activeIndex];
  const mainUrl = cloudinaryUrl(shot.filename);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[200] flex flex-col bg-black/97 backdrop-blur-lg"
      style={{ WebkitBackdropFilter: "blur(16px)" }}
    >
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 glass-strong shrink-0">
        <span className="text-sm font-mono text-muted-foreground tabular-nums">
          {activeIndex + 1}&nbsp;/&nbsp;{screenshots.length}
        </span>
        <span className="text-sm font-medium text-neon-pink truncate px-4">
          {shot.label}
        </span>
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* ── Main image area ── */}
      <div
        className="flex-1 relative overflow-hidden flex items-center justify-center select-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Left arrow */}
        <button
          onClick={prev}
          aria-label="Previous screenshot"
          className="absolute left-3 z-10 p-2.5 rounded-full bg-black/60 hover:bg-neon-pink/20 border border-white/10 hover:border-neon-pink/50 text-white transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Image */}
        {mainUrl && (
          <div
            style={{
              transform: `scale(${zoom})`,
              transition: "transform 0.22s ease",
              transformOrigin: "center center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mainUrl}
              alt={shot.label}
              draggable={false}
              className="max-w-[calc(100vw-5.5rem)] max-h-[calc(100vh-11rem)] w-auto h-auto object-contain"
            />
          </div>
        )}

        {/* Right arrow */}
        <button
          onClick={next}
          aria-label="Next screenshot"
          className="absolute right-3 z-10 p-2.5 rounded-full bg-black/60 hover:bg-neon-pink/20 border border-white/10 hover:border-neon-pink/50 text-white transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* ── Zoom controls ── */}
      <div className="flex items-center justify-center gap-3 py-2 border-t border-white/5 shrink-0">
        <button
          onClick={zoomOut}
          disabled={zoom <= 1}
          aria-label="Zoom out"
          className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-muted-foreground hover:text-foreground"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <span className="text-xs font-mono text-muted-foreground w-10 text-center">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={zoomIn}
          disabled={zoom >= 3}
          aria-label="Zoom in"
          className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-muted-foreground hover:text-foreground"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
      </div>

      {/* ── Thumbnail strip — desktop only ── */}
      <div
        ref={thumbStripRef}
        className="hidden md:flex gap-2 px-4 py-3 border-t border-white/10 glass-strong overflow-x-auto shrink-0"
        style={{ scrollbarWidth: "thin" }}
      >
        {screenshots.map((s, i) => {
          const thumbUrl = cloudinaryUrl(s.filename, "w_160,h_90,c_fill");
          if (!thumbUrl) return null;
          return (
            <button
              key={s.filename}
              onClick={() => goTo(i)}
              aria-label={s.label}
              className={`relative w-28 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                i === activeIndex
                  ? "border-neon-pink shadow-[0_0_8px_rgba(236,72,153,0.5)]"
                  : "border-white/10 hover:border-white/30 opacity-50 hover:opacity-100"
              }`}
            >
              <Image
                src={thumbUrl}
                alt={s.label}
                fill
                className="object-cover"
                sizes="112px"
              />
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── Public gallery component ────────────────────────────────────────────────

export function LokiASAMGallery() {
  const [active, setActive] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const shot = screenshots[active];
  const mainUrl = cloudinaryUrl(shot.filename);

  if (!mainUrl) return null;

  return (
    <>
      <div className="space-y-4">
        {/* Main preview — click opens lightbox */}
        <button
          className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-black/30 aspect-video cursor-zoom-in group"
          onClick={() => setLightboxIndex(active)}
          aria-label={`Open ${shot.label} in fullscreen`}
        >
          <Image
            src={mainUrl}
            alt={shot.label}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority={active === 0}
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
            <div className="p-3 rounded-full bg-black/50 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-6 h-6 text-white" />
            </div>
          </div>
          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gradient-to-t from-black/70 to-transparent">
            <p className="text-sm font-medium text-white/90">{shot.label}</p>
          </div>
        </button>

        {/* Thumbnail strip */}
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {screenshots.map((s, i) => {
            const thumbUrl = cloudinaryUrl(s.filename, "w_200,h_120,c_fill");
            if (!thumbUrl) return null;
            return (
              <button
                key={s.filename}
                onClick={() => setActive(i)}
                aria-label={s.label}
                className={`relative rounded-lg overflow-hidden border-2 transition-all aspect-video ${
                  i === active
                    ? "border-neon-pink shadow-[0_0_8px_rgba(236,72,153,0.5)]"
                    : "border-white/10 hover:border-white/30 opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={thumbUrl}
                  alt={s.label}
                  fill
                  className="object-cover object-top"
                  sizes="120px"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox portal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
