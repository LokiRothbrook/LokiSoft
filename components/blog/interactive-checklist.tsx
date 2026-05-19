"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

interface InteractiveChecklistProps {
  items: ChecklistItem[];
  storageKey?: string;
}

export function InteractiveChecklist({ items: initialItems, storageKey }: InteractiveChecklistProps) {
  const [items, setItems] = useState<ChecklistItem[]>(initialItems);
  const [mounted, setMounted] = useState(false);

  // Load saved state from localStorage on mount - client-side hydration pattern
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if (storageKey) {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          const savedState = JSON.parse(saved) as Record<string, boolean>;
          setItems(prev => prev.map(item => ({
            ...item,
            checked: savedState[item.id] ?? item.checked
          })));
        } catch {
          // Invalid saved state, ignore
        }
      }
    }
  }, [storageKey]);

  // Save state to localStorage when items change
  useEffect(() => {
    if (mounted && storageKey) {
      const state = items.reduce((acc, item) => {
        acc[item.id] = item.checked;
        return acc;
      }, {} as Record<string, boolean>);
      localStorage.setItem(storageKey, JSON.stringify(state));
    }
  }, [items, storageKey, mounted]);

  const toggleItem = (id: string) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const completedCount = items.filter(item => item.checked).length;
  const totalCount = items.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="my-6 rounded-xl border border-border/50 bg-background/50 overflow-hidden">
      {/* Progress bar */}
      <div className="px-4 py-3 border-b border-border/30 bg-muted/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Progress: {completedCount} of {totalCount} completed
          </span>
          <span className="text-sm font-bold text-neon-cyan">
            {Math.round(progressPercent)}%
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-neon-pink to-neon-cyan transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Checklist items */}
      <ul className="divide-y divide-border/20">
        {items.map((item) => (
          <li key={item.id} className="group">
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-muted/30 transition-colors"
            >
              <span
                className={`
                  flex-shrink-0 w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center transition-all duration-200
                  ${item.checked
                    ? "bg-neon-cyan border-neon-cyan text-background"
                    : "border-muted-foreground/50 group-hover:border-neon-pink"
                  }
                `}
              >
                {item.checked && <Check className="w-3 h-3" strokeWidth={3} />}
              </span>
              <span
                className={`
                  text-sm leading-relaxed transition-all duration-200
                  ${item.checked
                    ? "text-muted-foreground line-through"
                    : "text-foreground"
                  }
                `}
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
            </button>
          </li>
        ))}
      </ul>

      {/* Completion message */}
      {completedCount === totalCount && totalCount > 0 && (
        <div className="px-4 py-3 bg-neon-cyan/10 border-t border-neon-cyan/30">
          <p className="text-sm text-neon-cyan font-medium text-center">
            All items completed! Great job!
          </p>
        </div>
      )}
    </div>
  );
}
