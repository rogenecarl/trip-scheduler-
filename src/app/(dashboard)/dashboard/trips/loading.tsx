import { Skeleton } from "@/components/ui/skeleton";

export default function TripsLoading() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-4 md:p-6 lg:p-8">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <Skeleton className="h-8 w-24 mb-2" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Skeleton className="h-10 w-28" />
      </div>

      {/* Add Trips Card Skeleton */}
      <div className="rounded-lg border">
        <div className="p-6 border-b">
          <Skeleton className="h-6 w-24 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="p-6">
          {/* Tabs Skeleton */}
          <div className="flex gap-2 mb-6">
            <Skeleton className="h-9 w-32" />
            <Skeleton className="h-9 w-32" />
          </div>
          {/* Form Skeleton */}
          <div className="max-w-2xl space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-12 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>

      {/* Trips Table Card Skeleton */}
      <div className="rounded-lg border">
        <div className="p-6 border-b">
          <Skeleton className="h-6 w-24 mb-2" />
          <Skeleton className="h-4 w-56" />
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
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
            <div className="divide-y">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-10" />
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-8 ml-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
