"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Package, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import type { CalendarDayData } from "@/lib/types";

interface DayDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date | null;
  data: CalendarDayData | undefined;
  isLoading: boolean;
}

export function DayDetailSheet({
  open,
  onOpenChange,
  date,
  data,
  isLoading,
}: DayDetailSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-80 md:w-96 sm:max-w-md">
        <SheetHeader>
          <SheetTitle>
            {date ? format(date, "EEEE, MMMM d, yyyy") : "Day Details"}
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] mt-6 pr-4">
          {isLoading ? (
            <DayDetailSkeleton />
          ) : data ? (
            <div className="space-y-6">
              {/* Available Drivers Section */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <User className="h-4 w-4 text-green-600" />
                  <h3 className="font-medium">
                    Available Drivers ({data.availableDrivers.length})
                  </h3>
                </div>

                {data.availableDrivers.length > 0 ? (
                  <ul className="space-y-2">
                    {data.availableDrivers.map((driver) => (
                      <li
                        key={driver.id}
                        className="flex items-center gap-2 p-2 rounded-md bg-muted/50"
                      >
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                          <User className="h-4 w-4 text-green-700" />
                        </div>
                        <span className="text-sm font-medium">
                          {driver.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50 text-muted-foreground">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">
                      No drivers available on this day
                    </span>
                  </div>
                )}
              </section>

              <Separator />

              {/* Scheduled Trips Section */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Package className="h-4 w-4 text-blue-600" />
                  <h3 className="font-medium">
                    Scheduled Trips ({data.trips.length})
                  </h3>
                </div>

                {data.trips.length > 0 ? (
                  <ul className="space-y-2">
                    {data.trips.map((trip) => (
                      <li
                        key={trip.id}
                        className="flex items-center justify-between p-2 rounded-md bg-muted/50"
                      >
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <Package className="h-4 w-4 text-blue-700" />
                          </div>
                          <span className="text-sm font-mono">{trip.tripId}</span>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            trip.isAssigned
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                          }
                        >
                          {trip.isAssigned ? trip.driverName : "Pending"}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50 text-muted-foreground">
                    <Package className="h-4 w-4" />
                    <span className="text-sm">No trips scheduled</span>
                  </div>
                )}
              </section>
            </div>
          ) : null}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

function DayDetailSkeleton() {
  return (
    <div className="space-y-6">
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </section>

      <Separator />

      <section>
        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="space-y-2">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-5 w-16" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
