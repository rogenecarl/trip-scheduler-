"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { invalidateDriverCache } from "@/lib/cache"; // ← Add this import
import { z } from "zod";
import type {
  ActionResponse,
  Driver,
  DriverPaginationParams,
  PaginatedResponse,
} from "@/lib/types";

// ============================================
// VALIDATION SCHEMAS
// ============================================

const driverSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  availability: z.array(z.number().min(0).max(6)).min(1, "Select at least one day"),
});

// ============================================
// GET DRIVERS
// ============================================

export async function getDrivers(): Promise<ActionResponse<Driver[]>> {
  try {
    const drivers = await prisma.driver.findMany({
      where: { isActive: true },
      include: { availability: true },
      orderBy: { name: "asc" },
    });

    return { success: true, data: drivers as Driver[] };
  } catch (error) {
    console.error("Failed to fetch drivers:", error);
    return { success: false, error: "Failed to fetch drivers" };
  }
}

// ============================================
// GET DRIVERS PAGINATED
// ============================================

export async function getDriversPaginated(
  params: DriverPaginationParams
): Promise<ActionResponse<PaginatedResponse<Driver>>> {
  try {
    const { page, pageSize, search } = params;
    const skip = (page - 1) * pageSize;

    const where: Prisma.DriverWhereInput = {
      isActive: true,
      ...(search && {
        name: { contains: search, mode: "insensitive" },
      }),
    };

    const [totalItems, drivers] = await Promise.all([
      prisma.driver.count({ where }),
      prisma.driver.findMany({
        where,
        include: { availability: true },
        orderBy: { name: "asc" },
        skip,
        take: pageSize,
      }),
    ]);

    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      success: true,
      data: {
        data: drivers as Driver[],
        pagination: {
          page,
          pageSize,
          totalItems,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      },
    };
  } catch (error) {
    console.error("Failed to fetch paginated drivers:", error);
    return { success: false, error: "Failed to fetch drivers" };
  }
}

// ============================================
// GET SINGLE DRIVER
// ============================================

export async function getDriver(id: string): Promise<ActionResponse<Driver>> {
  try {
    const driver = await prisma.driver.findUnique({
      where: { id },
      include: { availability: true },
    });

    if (!driver) {
      return { success: false, error: "Driver not found" };
    }

    return { success: true, data: driver as Driver };
  } catch (error) {
    console.error("Failed to fetch driver:", error);
    return { success: false, error: "Failed to fetch driver" };
  }
}

// ============================================
// CREATE DRIVER
// ============================================

export async function createDriver(
  formData: FormData
): Promise<ActionResponse<Driver>> {
  try {
    const name = formData.get("name") as string;
    const availability = JSON.parse(formData.get("availability") as string);

    const validated = driverSchema.safeParse({ name, availability });
    if (!validated.success) {
      return { success: false, error: validated.error.issues[0].message };
    }

    const driver = await prisma.driver.create({
      data: {
        name: validated.data.name,
        availability: {
          create: validated.data.availability.map((day: number) => ({
            dayOfWeek: day,
            isAvailable: true,
          })),
        },
      },
      include: { availability: true },
    });

    // ⚡ Invalidate cache so new driver is included in assignments
    await invalidateDriverCache();

    revalidatePath("/dashboard/drivers");
    revalidatePath("/dashboard");

    return { success: true, data: driver as Driver };
  } catch (error) {
    console.error("Failed to create driver:", error);
    return { success: false, error: "Failed to create driver" };
  }
}

// ============================================
// UPDATE DRIVER
// ============================================

export async function updateDriver(
  id: string,
  formData: FormData
): Promise<ActionResponse<Driver>> {
  try {
    const name = formData.get("name") as string;
    const availability = JSON.parse(formData.get("availability") as string);

    const validated = driverSchema.safeParse({ name, availability });
    if (!validated.success) {
      return { success: false, error: validated.error.issues[0].message };
    }

    const driver = await prisma.$transaction(async (tx) => {
      await tx.driverAvailability.deleteMany({ where: { driverId: id } });

      return tx.driver.update({
        where: { id },
        data: {
          name: validated.data.name,
          availability: {
            create: validated.data.availability.map((day: number) => ({
              dayOfWeek: day,
              isAvailable: true,
            })),
          },
        },
        include: { availability: true },
      });
    });

    // ⚡ Invalidate cache so updated availability is reflected
    await invalidateDriverCache();

    revalidatePath("/dashboard/drivers");
    revalidatePath("/dashboard/assignments");

    return { success: true, data: driver as Driver };
  } catch (error) {
    console.error("Failed to update driver:", error);
    return { success: false, error: "Failed to update driver" };
  }
}

// ============================================
// DELETE DRIVER (Hard Delete)
// ============================================

export async function deleteDriver(
  id: string
): Promise<ActionResponse<{ id: string }>> {
  try {
    await prisma.$transaction(async (tx) => {
      // Delete assignments first (no cascade on driver relation)
      await tx.tripAssignment.deleteMany({ where: { driverId: id } });
      // Delete driver (DriverAvailability cascades automatically)
      await tx.driver.delete({ where: { id } });
    });

    // ⚡ Invalidate cache so deleted driver is excluded
    await invalidateDriverCache();

    revalidatePath("/dashboard/drivers");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/assignments");

    return { success: true, data: { id } };
  } catch (error) {
    console.error("Failed to delete driver:", error);
    return { success: false, error: "Failed to delete driver" };
  }
}

// ============================================
// BULK DELETE DRIVERS (Hard Delete)
// ============================================

export async function deleteDrivers(
  ids: string[]
): Promise<ActionResponse<{ count: number }>> {
  try {
    if (ids.length === 0) {
      return { success: false, error: "No drivers selected" };
    }

    const result = await prisma.$transaction(async (tx) => {
      // Delete assignments first (no cascade on driver relation)
      await tx.tripAssignment.deleteMany({ where: { driverId: { in: ids } } });
      // Delete drivers (DriverAvailability cascades automatically)
      return tx.driver.deleteMany({ where: { id: { in: ids } } });
    });

    // ⚡ Invalidate cache so deleted drivers are excluded
    await invalidateDriverCache();

    revalidatePath("/dashboard/drivers");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/assignments");

    return { success: true, data: { count: result.count } };
  } catch (error) {
    console.error("Failed to delete drivers:", error);
    return { success: false, error: "Failed to delete drivers" };
  }
}

// ============================================
// GET AVAILABLE DRIVERS FOR DAY
// ============================================

export async function getAvailableDriversForDay(
  dayOfWeek: number
): Promise<ActionResponse<Driver[]>> {
  try {
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
      include: { availability: true },
      orderBy: { name: "asc" },
    });

    return { success: true, data: drivers as Driver[] };
  } catch (error) {
    console.error("Failed to fetch available drivers:", error);
    return { success: false, error: "Failed to fetch available drivers" };
  }
}