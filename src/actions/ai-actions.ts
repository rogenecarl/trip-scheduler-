"use server";

import prisma from "@/lib/prisma";
import { getActiveDriversCached, invalidateDriverCache } from "@/lib/cache";
import { assignTripsToDrivers } from "@/lib/assignment-algorithm";
import { revalidatePath } from "next/cache";
import type { AIAssignmentResult } from "@/lib/types";

/**
 * Auto-assign drivers to unassigned trips
 * Uses fast algorithm (no AI) - completes in ~100ms
 */
export async function autoAssignDrivers(): Promise<AIAssignmentResult> {
  const startTime = performance.now();

  try {
    // Parallel fetch - drivers are cached
    const [trips, drivers] = await Promise.all([
      prisma.trip.findMany({
        where: {
          assignment: null,
          tripStage: "Upcoming",
        },
        select: {
          id: true,
          tripId: true,
          tripDate: true,
          dayOfWeek: true,
        },
        orderBy: {
          tripDate: "asc",
        },
      }),
      getActiveDriversCached(),
    ]);

    // Handle empty cases
    if (trips.length === 0) {
      return {
        success: true,
        summary: "No unassigned trips to process",
        assignments: [],
        warnings: [],
        distribution: [],
        stats: { totalTrips: 0, assignedCount: 0, unassignedCount: 0 },
        durationMs: Math.round(performance.now() - startTime),
      };
    }

    if (drivers.length === 0) {
      return {
        success: false,
        error: "No active drivers available. Please add drivers first.",
        stats: { totalTrips: trips.length, assignedCount: 0, unassignedCount: trips.length },
      };
    }

    // Fast algorithm assignment
    const result = assignTripsToDrivers(trips, drivers);

    // Batch insert assignments
    if (result.assignments.length > 0) {
      await prisma.tripAssignment.createMany({
        data: result.assignments.map((a) => ({
          tripId: a.tripId,
          driverId: a.driverId,
          isAutoAssigned: true,
          aiReasoning: a.reasoning,
        })),
        skipDuplicates: true,
      });
    }

    // Revalidate dashboard
    revalidatePath("/dashboard", "layout");

    const durationMs = Math.round(performance.now() - startTime);

    return {
      success: true,
      assignments: result.assignments,
      summary: result.summary,
      warnings: result.warnings,
      distribution: result.distribution,
      stats: result.stats,
      durationMs,
    };
  } catch (error) {
    console.error("Assignment error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Clear all auto-assigned trips (for reassignment)
 */
export async function clearAutoAssignments(): Promise<{ success: boolean; count: number }> {
  try {
    const result = await prisma.tripAssignment.deleteMany({
      where: { isAutoAssigned: true },
    });

    revalidatePath("/dashboard", "layout");

    return { success: true, count: result.count };
  } catch (error) {
    console.error("Clear assignments error:", error);
    return { success: false, count: 0 };
  }
}

/**
 * Call this when you update drivers (create/update/delete)
 */
export async function refreshDriverCache(): Promise<void> {
  await invalidateDriverCache();
}
