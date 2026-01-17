"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TablePagination } from "@/components/ui/table-pagination";
import { AvailabilityDisplay } from "./availability-picker";
import { PriorityDisplay } from "./priority-picker";
import { DriverDialog } from "./driver-dialog";
import { DeleteDriverDialog } from "./delete-driver-dialog";
import { usePaginatedDrivers } from "@/hooks/use-paginated-drivers";
import { useDeleteDrivers } from "@/hooks/use-drivers";
import type { Driver } from "@/lib/types";
import { Pencil, Search, Trash2, Users, UserPlus, X } from "lucide-react";

const DEFAULT_PAGE_SIZE = 40;

export function DriverTable() {
  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch paginated data (no server-side filtering)
  const { data, isLoading, error } = usePaginatedDrivers({
    page,
    pageSize,
  });

  // Dialog states
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [deletingDriver, setDeletingDriver] = useState<Driver | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showBulkDeleteDialog, setShowBulkDeleteDialog] = useState(false);

  // Bulk delete mutation
  const deleteDrivers = useDeleteDrivers();

  const pagination = data?.pagination;

  // Client-side filtering for instant search
  const drivers = useMemo(() => {
    const allDrivers = data?.data ?? [];
    if (!searchQuery.trim()) return allDrivers;
    const query = searchQuery.toLowerCase();
    return allDrivers.filter((driver) =>
      driver.name.toLowerCase().includes(query)
    );
  }, [data?.data, searchQuery]);

  // Selection helpers
  const allSelected = drivers.length > 0 && drivers.every((d) => selectedIds.has(d.id));
  const someSelected = drivers.some((d) => selectedIds.has(d.id));
  const selectedCount = selectedIds.size;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(drivers.map((d) => d.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedIds);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedIds(newSelected);
  };

  const handleBulkDelete = async () => {
    await deleteDrivers.mutateAsync(Array.from(selectedIds));
    setSelectedIds(new Set());
    setShowBulkDeleteDialog(false);
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  // Handle page size change - reset to page 1
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
    setSelectedIds(new Set()); // Clear selection on page change
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSelectedIds(new Set()); // Clear selection on page change
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-destructive/10 p-4 mb-4">
          <Users className="h-8 w-8 text-destructive" />
        </div>
        <h3 className="text-lg font-medium mb-1">Failed to load drivers</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          {error.message || "An error occurred while loading drivers."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Selection Toolbar */}
      {selectedCount > 0 && (
        <div className="flex items-center justify-between rounded-lg border bg-muted/50 px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {selectedCount} {selectedCount === 1 ? "driver" : "drivers"} selected
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSelection}
              className="h-7 px-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setShowBulkDeleteDialog(true)}
            disabled={deleteDrivers.isPending}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Selected
          </Button>
        </div>
      )}

      {/* Search and Add Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search drivers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Driver
        </Button>
      </div>

      {/* Table */}
      {isLoading ? (
        <DriverTableSkeleton />
      ) : drivers.length === 0 ? (
        <EmptyState
          hasSearch={searchQuery.length > 0}
          onAddClick={() => setIsAddDialogOpen(true)}
        />
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[140px]">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={allSelected}
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all drivers"
                        className={someSelected && !allSelected ? "opacity-50" : ""}
                      />
                      <span className="text-xs font-medium text-muted-foreground">Select All</span>
                    </div>
                  </TableHead>
                  <TableHead className="font-medium">Name</TableHead>
                  <TableHead className="font-medium">Priority</TableHead>
                  <TableHead className="font-medium">Availability</TableHead>
                  <TableHead className="font-medium w-25">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers.map((driver) => (
                  <TableRow
                    key={driver.id}
                    className={`hover:bg-muted/50 ${selectedIds.has(driver.id) ? "bg-muted/30" : ""}`}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.has(driver.id)}
                        onCheckedChange={(checked) =>
                          handleSelectOne(driver.id, checked as boolean)
                        }
                        aria-label={`Select ${driver.name}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{driver.name}</TableCell>
                    <TableCell>
                      <PriorityDisplay priority={driver.priority} size="sm" />
                    </TableCell>
                    <TableCell>
                      <AvailabilityDisplay
                        availability={driver.availability}
                        size="sm"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingDriver(driver)}
                          aria-label={`Edit ${driver.name}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeletingDriver(driver)}
                          aria-label={`Delete ${driver.name}`}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {drivers.map((driver) => (
              <div
                key={driver.id}
                className={`rounded-lg border p-4 space-y-3 ${selectedIds.has(driver.id) ? "bg-muted/30 border-primary/50" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedIds.has(driver.id)}
                      onCheckedChange={(checked) =>
                        handleSelectOne(driver.id, checked as boolean)
                      }
                      aria-label={`Select ${driver.name}`}
                    />
                    <h3 className="font-medium">{driver.name}</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingDriver(driver)}
                      aria-label={`Edit ${driver.name}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeletingDriver(driver)}
                      aria-label={`Delete ${driver.name}`}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="pl-7 space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Priority</p>
                    <PriorityDisplay priority={driver.priority} size="default" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Availability</p>
                    <AvailabilityDisplay
                      availability={driver.availability}
                      size="default"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination && (
            <TablePagination
              pagination={pagination}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              isLoading={isLoading}
            />
          )}
        </>
      )}

      {/* Dialogs */}
      <DriverDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        driver={null}
      />

      <DriverDialog
        open={!!editingDriver}
        onOpenChange={(open) => !open && setEditingDriver(null)}
        driver={editingDriver}
      />

      <DeleteDriverDialog
        open={!!deletingDriver}
        onOpenChange={(open) => !open && setDeletingDriver(null)}
        driver={deletingDriver}
      />

      {/* Bulk Delete Confirmation Dialog */}
      <AlertDialog open={showBulkDeleteDialog} onOpenChange={setShowBulkDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {selectedCount} drivers?</AlertDialogTitle>
            <AlertDialogDescription>
              This will deactivate the selected drivers. They will no longer
              appear in the driver list or be available for assignments.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteDrivers.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDelete}
              disabled={deleteDrivers.isPending}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {deleteDrivers.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function DriverTableSkeleton() {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[140px]">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-3 w-14" />
              </div>
            </TableHead>
            <TableHead className="font-medium">Name</TableHead>
            <TableHead className="font-medium">Priority</TableHead>
            <TableHead className="font-medium">Availability</TableHead>
            <TableHead className="font-medium w-25">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-4 w-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  {[...Array(7)].map((_, j) => (
                    <Skeleton key={j} className="h-6 w-6 rounded-full" />
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function EmptyState({
  hasSearch,
  onAddClick,
}: {
  hasSearch: boolean;
  onAddClick: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center rounded-lg border border-dashed">
      <div className="rounded-full bg-muted p-4 mb-4">
        <Users className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-1">
        {hasSearch ? "No drivers found" : "No drivers yet"}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-sm">
        {hasSearch
          ? "Try adjusting your search query."
          : "Get started by adding your first driver."}
      </p>
      {!hasSearch && (
        <Button onClick={onAddClick}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Driver
        </Button>
      )}
    </div>
  );
}
