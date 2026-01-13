"use client";

import { useState, useCallback } from "react";
import { CalendarHeader } from "./calendar-header";
import { CalendarGrid } from "./calendar-grid";
import { DayDetailSheet } from "./day-detail-sheet";
import { useCalendarMonth, useCalendarDay } from "@/hooks/use-calendar";
import { addMonths, subMonths } from "date-fns";
import { Users, Package } from "lucide-react";

export function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Fetch month data
  const {
    data: monthData,
    isLoading: isMonthLoading,
  } = useCalendarMonth(currentMonth.getFullYear(), currentMonth.getMonth());

  // Fetch day detail when a date is selected
  const { data: dayData, isLoading: isDayLoading } = useCalendarDay(
    sheetOpen ? selectedDate : null
  );

  // Navigation handlers
  const handlePreviousMonth = useCallback(() => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  }, []);

  const handleToday = useCallback(() => {
    setCurrentMonth(new Date());
  }, []);

  // Day click handler
  const handleDayClick = useCallback((date: Date) => {
    setSelectedDate(date);
    setSheetOpen(true);
  }, []);

  // Handle sheet close
  const handleSheetClose = useCallback((open: boolean) => {
    setSheetOpen(open);
    if (!open) {
      // Keep selected date visible for a moment before clearing
      setTimeout(() => {
        if (!sheetOpen) {
          setSelectedDate(null);
        }
      }, 300);
    }
  }, [sheetOpen]);

  // Filter calendar data to only include days in current month view
  const calendarData = monthData?.days ?? [];

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <CalendarHeader
        currentDate={currentMonth}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
      />

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5 text-green-600" />
          <span>Available drivers</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Package className="h-3.5 w-3.5 text-blue-600" />
          <span>Scheduled trips</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-amber-600">(#)</span>
          <span>Pending assignments</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <CalendarGrid
        currentMonth={currentMonth}
        calendarData={calendarData}
        selectedDate={selectedDate}
        onDayClick={handleDayClick}
        isLoading={isMonthLoading}
      />

      {/* Day Detail Sheet */}
      <DayDetailSheet
        open={sheetOpen}
        onOpenChange={handleSheetClose}
        date={selectedDate}
        data={dayData}
        isLoading={isDayLoading}
      />
    </div>
  );
}
