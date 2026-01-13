"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getTripsPaginated } from "@/actions/trip-actions";
import type { TripPaginationParams } from "@/lib/types";

/**
 * Hook for fetching paginated trips with server-side filtering.
 * Uses keepPreviousData for smooth pagination transitions.
 */
export function usePaginatedTrips(params: TripPaginationParams) {
  return useQuery({
    queryKey: queryKeys.trips.paginated(params),
    queryFn: async () => {
      const result = await getTripsPaginated(params);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    placeholderData: keepPreviousData,
  });
}
