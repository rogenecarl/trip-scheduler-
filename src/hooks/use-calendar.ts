"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getCalendarMonth, getCalendarDay } from "@/actions/calendar-actions";
import type { CalendarMonthData, CalendarDayData } from "@/lib/types";

/**
 * Hook to fetch calendar data for a specific month
 */
export function useCalendarMonth(year: number, month: number) {
  return useQuery({
    queryKey: queryKeys.calendar.month(year, month),
    queryFn: async (): Promise<CalendarMonthData> => {
      const result = await getCalendarMonth(year, month);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
  });
}

/**
 * Hook to fetch detailed data for a specific day
 */
export function useCalendarDay(date: Date | null) {
  const dateStr = date?.toISOString().split("T")[0] ?? "";

  return useQuery({
    queryKey: queryKeys.calendar.day(dateStr),
    queryFn: async (): Promise<CalendarDayData> => {
      if (!date) throw new Error("No date provided");
      const result = await getCalendarDay(date);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    enabled: !!date,
  });
}
