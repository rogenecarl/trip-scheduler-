"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  getDashboardStats,
  getPendingTrips,
} from "@/actions/dashboard-actions";

/**
 * Hook to fetch dashboard statistics
 */
export function useDashboardStats() {
  return useQuery({
    queryKey: queryKeys.dashboard.stats(),
    queryFn: async () => {
      const result = await getDashboardStats();
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

/**
 * Hook to fetch pending trips for dashboard
 */
export function usePendingTrips(limit = 5) {
  return useQuery({
    queryKey: [...queryKeys.dashboard.pendingTrips(), limit],
    queryFn: async () => {
      const result = await getPendingTrips(limit);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}
