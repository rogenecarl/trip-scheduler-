"use server";

import prisma from "@/lib/prisma";
import type { ActionResponse, CalendarDayData, CalendarMonthData } from "@/lib/types";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  startOfDay,
  endOfDay,
} from "date-fns";

/**
 * Get calendar data for a specific month
 * Returns available drivers and scheduled trips for each day
 */
export async function getCalendarMonth(
  year: number,
  month: number
): Promise<ActionResponse<CalendarMonthData>> {
  try {
    // Create date range for the month (month is 0-indexed in JS Date)
    const monthStart = startOfMonth(new Date(year, month));
    const monthEnd = endOfMonth(new Date(year, month));

    // Get all days in the month
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Fetch all active drivers with their availability
    const drivers = await prisma.driver.findMany({
      where: { isActive: true },
      include: {
        availability: {
          where: { isAvailable: true },
        },
      },
      orderBy: { name: "asc" },
    });

    // Fetch all trips for this month
    const trips = await prisma.trip.findMany({
      where: {
        tripDate: {
          gte: monthStart,
          lte: monthEnd,
        },
        tripStage: "Upcoming",
      },
      include: {
        assignment: {
          include: {
            driver: true,
          },
        },
      },
      orderBy: { tripDate: "asc" },
    });

    // Build calendar data for each day
    const days: CalendarDayData[] = daysInMonth.map((date) => {
      const dayOfWeek = getDay(date);
      const dayStart = startOfDay(date);
      const dayEnd = endOfDay(date);

      // Filter drivers available on this day of week
      const availableDrivers = drivers
        .filter((driver) =>
          driver.availability.some((a) => a.dayOfWeek === dayOfWeek)
        )
        .map((driver) => ({
          id: driver.id,
          name: driver.name,
        }));

      // Filter trips for this day
      const dayTrips = trips
        .filter((trip) => {
          const tripDate = new Date(trip.tripDate);
          return tripDate >= dayStart && tripDate <= dayEnd;
        })
        .map((trip) => ({
          id: trip.id,
          tripId: trip.tripId,
          tripDate: trip.tripDate,
          driverName: trip.assignment?.driver?.name ?? null,
          isAssigned: !!trip.assignment,
        }));

      return {
        date,
        availableDrivers,
        trips: dayTrips,
      };
    });

    return {
      success: true,
      data: {
        year,
        month,
        days,
      },
    };
  } catch (error) {
    console.error("Failed to fetch calendar month:", error);
    return {
      success: false,
      error: "Failed to fetch calendar data",
    };
  }
}

/**
 * Get detailed data for a specific day
 */
export async function getCalendarDay(
  date: Date
): Promise<ActionResponse<CalendarDayData>> {
  try {
    const dayOfWeek = getDay(date);
    const dayStart = startOfDay(date);
    const dayEnd = endOfDay(date);

    // Fetch available drivers for this day of week
    const drivers = await prisma.driver.findMany({
      where: {
        isActive: true,
        availability: {
          some: {
            dayOfWeek,
            isAvailable: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });

    // Fetch trips for this day
    const trips = await prisma.trip.findMany({
      where: {
        tripDate: {
          gte: dayStart,
          lte: dayEnd,
        },
        tripStage: "Upcoming",
      },
      include: {
        assignment: {
          include: {
            driver: true,
          },
        },
      },
      orderBy: { tripId: "asc" },
    });

    return {
      success: true,
      data: {
        date,
        availableDrivers: drivers.map((d) => ({ id: d.id, name: d.name })),
        trips: trips.map((t) => ({
          id: t.id,
          tripId: t.tripId,
          tripDate: t.tripDate,
          driverName: t.assignment?.driver?.name ?? null,
          isAssigned: !!t.assignment,
        })),
      },
    };
  } catch (error) {
    console.error("Failed to fetch calendar day:", error);
    return {
      success: false,
      error: "Failed to fetch day data",
    };
  }
}
