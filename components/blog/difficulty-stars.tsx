import { Star } from "lucide-react";

const difficultyNames: Record<number, string> = {
  1: "Beginner",
  2: "Easy",
  3: "Intermediate",
  4: "Advanced",
  5: "Expert",
};

interface DifficultyStarsProps {
  difficulty: number;
  size?: "sm" | "md";
  showLabel?: boolean;
  showName?: boolean;
}

export function DifficultyStars({
  difficulty,
  size = "sm",
  showLabel = false,
  showName = false,
}: DifficultyStarsProps) {
  const starSize = size === "md" ? "w-4 h-4" : "w-3 h-3";

  return (
    <div className={`flex items-center ${showLabel ? "gap-1.5" : "gap-1"}`}>
      {showLabel && (
        <span className="text-xs text-muted-foreground">Difficulty</span>
      )}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`${starSize} ${
              i < difficulty
                ? "fill-neon-cyan text-neon-cyan"
                : "fill-transparent text-muted-foreground/30"
            }`}
          />
        ))}
      </div>
      {showName && (
        <span className="text-sm text-muted-foreground ml-1">
          {difficultyNames[difficulty]}
        </span>
      )}
    </div>
  );
}
