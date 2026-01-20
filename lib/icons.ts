import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

// Type-safe icon lookup
export function getIcon(name: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[name] || LucideIcons.Circle;
}
