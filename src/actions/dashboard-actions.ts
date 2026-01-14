"use server";

import prisma from "@/lib/prisma";
import type { ActionResponse, DashboardStats, Trip } from "@/lib/types";

// ============================================
// DASHBOARD STATS
// ============================================

export async function getDashboardStats(): Promise<ActionResponse<DashboardStats>> {
  try {
    const [totalDrivers, totalTrips, assignedTrips, pendingTrips] =
      await Promise.all([
        prisma.driver.count({ where: { isActive: true } }),
        prisma.trip.count({
          where: { tripStage: "Upcoming" },
        }),
        prisma.trip.count({
          where: {
            tripStage: "Upcoming",
            assignment: { isNot: null },
          },
        }),
        prisma.trip.count({
          where: {
            tripStage: "Upcoming",
            assignment: null,
          },
        }),
      ]);

    return {
      success: true,
      data: { totalDrivers, totalTrips, assignedTrips, pendingTrips },
    };
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return { success: false, error: "Failed to fetch dashboard stats" };
  }
}

// ============================================
// PENDING TRIPS
// ============================================

export async function getPendingTrips(
  limit = 5
): Promise<ActionResponse<Trip[]>> {
  try {
    const trips = await prisma.trip.findMany({
      where: {
        tripStage: "Upcoming",
        assignment: null,
      },
      orderBy: { tripDate: "asc" },
      take: limit,
    });

    return { success: true, data: trips as Trip[] };
  } catch (error) {
    console.error("Failed to fetch pending trips:", error);
    return { success: false, error: "Failed to fetch pending trips" };
  }
}
