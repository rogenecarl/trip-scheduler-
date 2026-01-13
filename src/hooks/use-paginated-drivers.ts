"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getDriversPaginated } from "@/actions/driver-actions";
import type { DriverPaginationParams } from "@/lib/types";

/**
 * Hook for fetching paginated drivers with server-side filtering.
 * Uses keepPreviousData for smooth pagination transitions.
 */
export function usePaginatedDrivers(params: DriverPaginationParams) {
  return useQuery({
    queryKey: queryKeys.drivers.paginated(params),
    queryFn: async () => {
      const result = await getDriversPaginated(params);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    placeholderData: keepPreviousData,
  });
}
