import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface DynamicIconProps {
  name: string;
  className?: string;
}

// Stable icon component that doesn't trigger "components created during render" warnings
export function DynamicIcon({ name, className }: DynamicIconProps) {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  const IconComponent = icons[name] || LucideIcons.Circle;
  return <IconComponent className={className} />;
}
