"use client";

import { cn } from "@/lib/utils";
import {
  PRIORITY_LEVELS,
  PRIORITY_LABELS,
  type PriorityLevel,
} from "@/lib/types";
import { Star } from "lucide-react";

interface PriorityPickerProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const priorityOptions: { value: PriorityLevel; stars: number }[] = [
  { value: PRIORITY_LEVELS.HIGH, stars: 3 },
  { value: PRIORITY_LEVELS.MEDIUM, stars: 2 },
  { value: PRIORITY_LEVELS.LOW, stars: 1 },
];

export function PriorityPicker({
  value,
  onChange,
  disabled,
}: PriorityPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {priorityOptions.map((option) => {
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            disabled={disabled}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-lg border-2 px-4 py-3 transition-all",
              "hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20",
              isSelected
                ? "border-primary bg-primary/10"
                : "border-muted bg-background",
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            <div className="flex items-center gap-0.5">
              {[...Array(option.stars)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    isSelected
                      ? "fill-primary text-primary"
                      : "fill-muted-foreground/30 text-muted-foreground/50"
                  )}
                />
              ))}
            </div>
            <span
              className={cn(
                "text-sm font-medium",
                isSelected ? "text-primary" : "text-muted-foreground"
              )}
            >
              {PRIORITY_LABELS[option.value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

interface PriorityDisplayProps {
  priority: number;
  showLabel?: boolean;
  size?: "sm" | "default";
}

export function PriorityDisplay({
  priority,
  showLabel = true,
  size = "default",
}: PriorityDisplayProps) {
  const stars = priority === 1 ? 3 : priority === 2 ? 2 : 1;
  const label = PRIORITY_LABELS[priority as PriorityLevel] || "Medium";

  const colorClass =
    priority === 1
      ? "text-emerald-600"
      : priority === 2
        ? "text-amber-500"
        : "text-slate-400";

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[...Array(stars)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              colorClass,
              "fill-current",
              size === "sm" ? "h-3 w-3" : "h-4 w-4"
            )}
          />
        ))}
      </div>
      {showLabel && (
        <span
          className={cn(
            colorClass,
            "font-medium",
            size === "sm" ? "text-xs" : "text-sm"
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
}
