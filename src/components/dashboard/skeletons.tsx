import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function StatsGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl shrink-0" />
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-3 sm:h-4 w-20" />
                <Skeleton className="h-6 sm:h-8 w-12" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function PendingTripsSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start sm:items-center justify-between gap-2 pb-3">
        <div className="space-y-1">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-44" />
        </div>
        <Skeleton className="h-8 w-20" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2 sm:space-y-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-3 p-3 rounded-lg border"
            >
              <div className="flex items-center gap-3 flex-1">
                <Skeleton className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function QuickActionsSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-4 w-40" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-muted/50"
            >
              <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl" />
              <div className="space-y-1 text-center">
                <Skeleton className="h-4 w-16 mx-auto" />
                <Skeleton className="h-3 w-20 mx-auto hidden sm:block" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
