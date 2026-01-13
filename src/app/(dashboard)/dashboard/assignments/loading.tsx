import { Skeleton } from "@/components/ui/skeleton";

export default function AssignmentsLoading() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Skeleton className="h-8 w-36 mb-2" />
          <Skeleton className="h-4 w-56" />
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-44" />
        </div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-12" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Assignments Table Card Skeleton */}
      <div className="rounded-lg border">
        <div className="p-6 border-b">
          <Skeleton className="h-5 w-36" />
        </div>
        <div className="p-6">
          {/* Search and Filter */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
            <Skeleton className="h-10 w-full max-w-sm" />
            <Skeleton className="h-10 w-[180px]" />
          </div>
          {/* Table */}
          <div className="rounded-lg border">
            <div className="border-b bg-muted/50 p-4">
              <div className="flex gap-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
            <div className="divide-y">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-10" />
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-9 w-[140px]" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
