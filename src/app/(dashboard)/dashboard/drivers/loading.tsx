import { Skeleton } from "@/components/ui/skeleton";

export default function DriversLoading() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-4 md:p-6 lg:p-8">
      {/* Header Skeleton */}
      <div>
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Search and Add Button Skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-10 w-full max-w-sm" />
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Table Skeleton */}
      <div className="rounded-lg border">
        <div className="border-b bg-muted/50 p-4">
          <div className="flex gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <div className="divide-y">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4">
              <Skeleton className="h-4 w-32" />
              <div className="flex gap-1">
                {[...Array(7)].map((_, j) => (
                  <Skeleton key={j} className="h-6 w-6 rounded-full" />
                ))}
              </div>
              <div className="flex gap-1 ml-auto">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
