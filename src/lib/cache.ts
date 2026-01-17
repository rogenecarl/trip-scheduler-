import { unstable_cache } from "next/cache";
import prisma from "./prisma";

/**
 * Cached active drivers query
 * - Revalidates every 5 minutes
 * - Manually invalidate when drivers are updated
 */
export const getActiveDriversCached = unstable_cache(
  async () => {
    return prisma.driver.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        priority: true,
        availability: {
          where: { isAvailable: true },
          select: { dayOfWeek: true },
        },
      },
    });
  },
  ["active-drivers"],
  {
    revalidate: 300, // 5 minutes
    tags: ["drivers"],
  }
);

/**
 * Call this when drivers are created/updated/deleted
 */
export async function invalidateDriverCache() {
  const { revalidateTag } = await import("next/cache");
  revalidateTag("drivers", "max");
}