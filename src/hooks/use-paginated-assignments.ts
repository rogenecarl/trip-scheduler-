"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getAssignmentsPaginated } from "@/actions/assignment-actions";
import type { AssignmentPaginationParams } from "@/lib/types";

/**
 * Hook for fetching paginated assignments with server-side filtering.
 * Uses keepPreviousData for smooth pagination transitions.
 */
export function usePaginatedAssignments(params: AssignmentPaginationParams) {
  return useQuery({
    queryKey: queryKeys.assignments.paginated(params),
    queryFn: async () => {
      const result = await getAssignmentsPaginated(params);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    placeholderData: keepPreviousData,
  });
}
