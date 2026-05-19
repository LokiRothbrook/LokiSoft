"use client";

import { useRef } from "react";
import { Info, Lightbulb, AlertTriangle, AlertOctagon, CheckCircle } from "lucide-react";
import { useHydrate } from "./use-hydrate";

type InfoBoxType = "info" | "hint" | "warning" | "danger" | "success";

interface InfoBoxProps {
  type: InfoBoxType;
  title?: string;
  contentHtml: string;
}

const boxStyles: Record<InfoBoxType, { icon: typeof Info; colors: string; iconColor: string }> = {
  info: { icon: Info, colors: "bg-neon-blue/10 border-neon-blue/30", iconColor: "text-neon-blue" },
  hint: { icon: Lightbulb, colors: "bg-neon-cyan/10 border-neon-cyan/30", iconColor: "text-neon-cyan" },
  warning: { icon: AlertTriangle, colors: "bg-yellow-500/10 border-yellow-500/30", iconColor: "text-yellow-500" },
  danger: { icon: AlertOctagon, colors: "bg-red-500/10 border-red-500/30", iconColor: "text-red-500" },
  success: { icon: CheckCircle, colors: "bg-green-500/10 border-green-500/30", iconColor: "text-green-500" },
};

const defaultTitles: Record<InfoBoxType, string> = {
  info: "Information",
  hint: "Tip",
  warning: "Warning",
  danger: "Danger",
  success: "Success",
};

export function InfoBox({ type, title, contentHtml }: InfoBoxProps) {
  const style = boxStyles[type];
  const Icon = style.icon;
  const displayTitle = title || defaultTitles[type];
  const contentRef = useRef<HTMLDivElement>(null);
  useHydrate(contentRef, contentHtml);

  return (
    <div className={`my-6 rounded-xl border p-4 w-full ${style.colors}`}>
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${style.iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className={`font-semibold mb-1 ${style.iconColor}`}>{displayTitle}</div>
          <div
            ref={contentRef}
            className="text-sm text-foreground/90 prose-p:my-2 prose-p:first:mt-0 prose-p:last:mb-0"
          />
        </div>
      </div>
    </div>
  );
}
