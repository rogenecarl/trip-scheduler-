"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { toast } from "sonner";
import {
  getDrivers,
  createDriver,
  updateDriver,
  deleteDriver,
  deleteDrivers,
} from "@/actions/driver-actions";
import type { Driver } from "@/lib/types";

// ============================================
// QUERY: List all drivers
// ============================================

export function useDrivers(initialData?: Driver[]) {
  return useQuery({
    queryKey: queryKeys.drivers.list(),
    queryFn: async () => {
      const result = await getDrivers();
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    initialData,
    staleTime: initialData ? 60 * 1000 : 0, // Keep initial data fresh for 1 minute
  });
}

// ============================================
// MUTATION: Create driver
// ============================================

export function useCreateDriver() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: {
      name: string;
      availability: number[];
      priority: number;
      priorityNote?: string | null;
    }) => {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("availability", JSON.stringify(input.availability));
      formData.append("priority", input.priority.toString());
      if (input.priorityNote) {
        formData.append("priorityNote", input.priorityNote);
      }
      const result = await createDriver(formData);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      // Invalidate all driver queries (list, paginated, detail) and dashboard
      queryClient.invalidateQueries({ queryKey: queryKeys.drivers.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
      toast.success("Driver created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create driver");
    },
  });
}

// ============================================
// MUTATION: Update driver
// ============================================

export function useUpdateDriver() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: {
      id: string;
      input: {
        name: string;
        availability: number[];
        priority: number;
        priorityNote?: string | null;
      };
    }) => {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("availability", JSON.stringify(input.availability));
      formData.append("priority", input.priority.toString());
      if (input.priorityNote) {
        formData.append("priorityNote", input.priorityNote);
      }
      const result = await updateDriver(id, formData);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      // Invalidate all driver and assignment queries
      queryClient.invalidateQueries({ queryKey: queryKeys.drivers.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.assignments.all });
      toast.success("Driver updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update driver");
    },
  });
}

// ============================================
// MUTATION: Delete driver
// ============================================

export function useDeleteDriver() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteDriver(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      // Invalidate all driver, assignment, and dashboard queries
      queryClient.invalidateQueries({ queryKey: queryKeys.drivers.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.assignments.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
      toast.success("Driver deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete driver");
    },
  });
}

// ============================================
// MUTATION: Bulk delete drivers
// ============================================

export function useDeleteDrivers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      const result = await deleteDrivers(ids);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (data) => {
      // Invalidate all related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.drivers.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.assignments.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
      toast.success(
        `${data.count} ${data.count === 1 ? "driver" : "drivers"} deleted successfully`
      );
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete drivers");
    },
  });
}
