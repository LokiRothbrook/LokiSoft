"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Megaphone, ArrowRight, Calendar } from "lucide-react";
import type { Post } from "@/lib/blog";

interface AnnouncementsProps {
  announcements: Post[];
}

export function Announcements({ announcements }: AnnouncementsProps) {
  if (announcements.length === 0) {
    return (
      <motion.div
        className="glass rounded-2xl p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Megaphone className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No announcements at this time.</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {announcements.map((announcement, index) => (
        <motion.div
          key={announcement.slug}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link href={`/blog/${announcement.slug}`}>
            <div className="group glass rounded-2xl p-6 hover:bg-neon-pink/5 transition-all cursor-pointer relative overflow-hidden">
              {/* Gradient accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-pink via-neon-purple to-neon-blue" />

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-neon-pink/10 shrink-0">
                  <Megaphone className="w-6 h-6 text-neon-pink" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-neon-pink/20 text-neon-pink font-medium">
                      Announcement
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(announcement.date).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 group-hover:text-neon-pink transition-colors">
                    {announcement.title}
                  </h3>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {announcement.excerpt}
                  </p>
                </div>

                <ArrowRight className="w-5 h-5 text-muted-foreground shrink-0 group-hover:text-neon-pink group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
