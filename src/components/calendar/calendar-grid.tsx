"use client";

import { CalendarDay } from "./calendar-day";
import { Skeleton } from "@/components/ui/skeleton";
import { DAY_NAMES_SHORT } from "@/lib/constants";
import type { CalendarDayData } from "@/lib/types";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";

interface CalendarGridProps {
  currentMonth: Date;
  calendarData: CalendarDayData[];
  selectedDate: Date | null;
  onDayClick: (date: Date) => void;
  isLoading: boolean;
}

export function CalendarGrid({
  currentMonth,
  calendarData,
  selectedDate,
  onDayClick,
  isLoading,
}: CalendarGridProps) {
  // Calculate the grid dates (includes days from prev/next month to fill the grid)
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const gridDates = eachDayOfInterval({ start: gridStart, end: gridEnd });

  // Helper to find calendar data for a specific date
  const getDataForDate = (date: Date): CalendarDayData | undefined => {
    return calendarData.find((d) => isSameDay(new Date(d.date), date));
  };

  if (isLoading) {
    return <CalendarGridSkeleton />;
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      {/* Day headers */}
      <div className="grid grid-cols-7 bg-muted/50">
        {DAY_NAMES_SHORT.map((day) => (
          <div
            key={day}
            className="py-2 text-center text-sm font-medium text-muted-foreground border-b"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 divide-x divide-y bg-background">
        {gridDates.map((date) => {
          const dayData = getDataForDate(date);
          const pendingTrips =
            dayData?.trips.filter((t) => !t.isAssigned).length ?? 0;

          return (
            <CalendarDay
              key={date.toISOString()}
              date={date}
              currentMonth={currentMonth}
              availableDriversCount={dayData?.availableDrivers.length ?? 0}
              tripsCount={dayData?.trips.length ?? 0}
              pendingTripsCount={pendingTrips}
              onClick={() => onDayClick(date)}
              isSelected={selectedDate ? isSameDay(date, selectedDate) : false}
            />
          );
        })}
      </div>
    </div>
  );
}

function CalendarGridSkeleton() {
  return (
    <div className="rounded-lg border overflow-hidden">
      {/* Day headers */}
      <div className="grid grid-cols-7 bg-muted/50">
        {DAY_NAMES_SHORT.map((day) => (
          <div
            key={day}
            className="py-2 text-center text-sm font-medium text-muted-foreground border-b"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Skeleton grid */}
      <div className="grid grid-cols-7 divide-x divide-y bg-background">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="min-h-24 p-2">
            <Skeleton className="h-5 w-5 mb-2" />
            <Skeleton className="h-3 w-12 mb-1" />
            <Skeleton className="h-3 w-10" />
          </div>
        ))}
      </div>
    </div>
  );
}
