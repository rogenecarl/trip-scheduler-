"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  User,
  Package,
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Users,
} from "lucide-react";
import { format, isToday } from "date-fns";
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
  const assignedTrips = data?.trips.filter((t) => t.isAssigned) ?? [];
  const pendingTrips = data?.trips.filter((t) => !t.isAssigned) ?? [];
  const isCurrentDay = date ? isToday(date) : false;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[340px] sm:w-[400px] sm:max-w-md p-0">
        {/* Header with Date */}
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 pb-4">
          <SheetHeader className="space-y-1">
            <div className="flex items-center gap-2">
              {isCurrentDay && (
                <Badge variant="default" className="text-xs font-medium">
                  Today
                </Badge>
              )}
            </div>
            <SheetTitle className="text-2xl font-bold tracking-tight">
              {date ? format(date, "EEEE") : "Day Details"}
            </SheetTitle>
            <SheetDescription className="text-base font-medium text-foreground/80">
              {date ? format(date, "MMMM d, yyyy") : ""}
            </SheetDescription>
          </SheetHeader>

          {/* Quick Stats */}
          {!isLoading && data && (
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3 text-center border shadow-sm">
                <div className="text-2xl font-bold text-blue-600">
                  {data.trips.length}
                </div>
                <div className="text-xs text-muted-foreground font-medium">
                  Total Trips
                </div>
              </div>
              <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3 text-center border shadow-sm">
                <div className="text-2xl font-bold text-green-600">
                  {assignedTrips.length}
                </div>
                <div className="text-xs text-muted-foreground font-medium">
                  Assigned
                </div>
              </div>
              <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3 text-center border shadow-sm">
                <div className="text-2xl font-bold text-amber-600">
                  {pendingTrips.length}
                </div>
                <div className="text-xs text-muted-foreground font-medium">
                  Pending
                </div>
              </div>
            </div>
          )}
        </div>

        <ScrollArea className="h-[calc(100vh-260px)] px-6">
          {isLoading ? (
            <DayDetailSkeleton />
          ) : data ? (
            <div className="space-y-6 py-4">
              {/* Available Drivers Section */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-green-100">
                      <Users className="h-4 w-4 text-green-700" />
                    </div>
                    <h3 className="font-semibold text-sm">Available Drivers</h3>
                  </div>
                  <Badge variant="secondary" className="font-mono">
                    {data.availableDrivers.length}
                  </Badge>
                </div>

                {data.availableDrivers.length > 0 ? (
                  <div className="grid gap-2">
                    {data.availableDrivers.map((driver) => (
                      <div
                        key={driver.id}
                        className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                      >
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-sm">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm font-medium">
                          {driver.name}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 p-6 rounded-lg border border-dashed bg-muted/30 text-center">
                    <div className="p-2 rounded-full bg-muted">
                      <AlertCircle className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      No drivers available on this day
                    </p>
                  </div>
                )}
              </section>

              <Separator />

              {/* Scheduled Trips Section */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-blue-100">
                      <Package className="h-4 w-4 text-blue-700" />
                    </div>
                    <h3 className="font-semibold text-sm">Scheduled Trips</h3>
                  </div>
                  <Badge variant="secondary" className="font-mono">
                    {data.trips.length}
                  </Badge>
                </div>

                {data.trips.length > 0 ? (
                  <div className="space-y-4">
                    {/* Assigned Trips */}
                    {assignedTrips.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-green-700">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Assigned ({assignedTrips.length})</span>
                        </div>
                        <div className="grid gap-2">
                          {assignedTrips.map((trip) => (
                            <div
                              key={trip.id}
                              className="flex items-center justify-between p-3 rounded-lg border bg-green-50/50 border-green-200/50"
                            >
                              <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-sm">
                                  <Package className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                  <p className="text-sm font-mono font-medium">
                                    {trip.tripId}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {trip.driverName}
                                  </p>
                                </div>
                              </div>
                              <Badge
                                variant="outline"
                                className="bg-green-100 text-green-700 border-green-300"
                              >
                                Assigned
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Pending Trips */}
                    {pendingTrips.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-amber-700">
                          <Clock className="h-3.5 w-3.5" />
                          <span>Pending ({pendingTrips.length})</span>
                        </div>
                        <div className="grid gap-2">
                          {pendingTrips.map((trip) => (
                            <div
                              key={trip.id}
                              className="flex items-center justify-between p-3 rounded-lg border bg-amber-50/50 border-amber-200/50"
                            >
                              <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-sm">
                                  <Package className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                  <p className="text-sm font-mono font-medium">
                                    {trip.tripId}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Awaiting assignment
                                  </p>
                                </div>
                              </div>
                              <Badge
                                variant="outline"
                                className="bg-amber-100 text-amber-700 border-amber-300"
                              >
                                Pending
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 p-6 rounded-lg border border-dashed bg-muted/30 text-center">
                    <div className="p-2 rounded-full bg-muted">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      No trips scheduled for this day
                    </p>
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
    <div className="space-y-6 py-4">
      {/* Available Drivers Section */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-7 w-7 rounded-md" />
            <Skeleton className="h-4 w-28" />
          </div>
          <Skeleton className="h-5 w-8 rounded-full" />
        </div>
        <div className="grid gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-lg border bg-card"
            >
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Scheduled Trips Section */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-7 w-7 rounded-md" />
            <Skeleton className="h-4 w-28" />
          </div>
          <Skeleton className="h-5 w-8 rounded-full" />
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <div className="grid gap-2">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
