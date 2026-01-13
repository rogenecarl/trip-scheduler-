import { Skeleton } from "@/components/ui/skeleton";

export default function CalendarLoading() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8">
      {/* Header Skeleton */}
      <div>
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-4 w-56" />
      </div>

      {/* Calendar Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-9 w-9" />
        </div>
        <Skeleton className="h-9 w-20" />
      </div>

      {/* Calendar Grid Skeleton */}
      <div className="rounded-lg border">
        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b bg-muted/50">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="p-3 text-center">
              <Skeleton className="h-4 w-8 mx-auto" />
            </div>
          ))}
        </div>
        {/* Calendar Days */}
        {[...Array(5)].map((_, week) => (
          <div key={week} className="grid grid-cols-7 border-b last:border-b-0">
            {[...Array(7)].map((_, day) => (
              <div key={day} className="min-h-24 border-r last:border-r-0 p-2">
                <Skeleton className="h-5 w-5 mb-2" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-10" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
