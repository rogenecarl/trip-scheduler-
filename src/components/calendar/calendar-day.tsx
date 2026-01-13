"use client";

import { cn } from "@/lib/utils";
import { format, isToday, isSameMonth } from "date-fns";
import { Users, Package } from "lucide-react";

interface CalendarDayProps {
  date: Date;
  currentMonth: Date;
  availableDriversCount: number;
  tripsCount: number;
  pendingTripsCount: number;
  onClick: () => void;
  isSelected?: boolean;
}

export function CalendarDay({
  date,
  currentMonth,
  availableDriversCount,
  tripsCount,
  pendingTripsCount,
  onClick,
  isSelected,
}: CalendarDayProps) {
  const isCurrentMonth = isSameMonth(date, currentMonth);
  const isCurrentDay = isToday(date);

  return (
    <button
      onClick={onClick}
      className={cn(
        "min-h-24 p-2 text-left transition-colors hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
        !isCurrentMonth && "bg-muted/30 text-muted-foreground/50",
        isCurrentDay && "ring-2 ring-primary ring-inset",
        isSelected && "bg-muted"
      )}
    >
      {/* Date number */}
      <div
        className={cn(
          "text-sm font-medium mb-1",
          isCurrentDay &&
            "bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center"
        )}
      >
        {format(date, "d")}
      </div>

      {/* Stats (only show for current month) */}
      {isCurrentMonth && (
        <div className="space-y-1">
          {/* Available drivers */}
          {availableDriversCount > 0 && (
            <div className="flex items-center gap-1 text-xs">
              <Users className="h-3 w-3 text-green-600" />
              <span className="text-green-700 font-medium">
                {availableDriversCount}
              </span>
            </div>
          )}

          {/* Trips */}
          {tripsCount > 0 && (
            <div className="flex items-center gap-1 text-xs">
              <Package className="h-3 w-3 text-blue-600" />
              <span className="text-blue-700 font-medium">{tripsCount}</span>
              {pendingTripsCount > 0 && (
                <span className="text-amber-600">({pendingTripsCount})</span>
              )}
            </div>
          )}
        </div>
      )}
    </button>
  );
}
