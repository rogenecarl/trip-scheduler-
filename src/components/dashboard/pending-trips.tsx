"use client";

import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight, Package, Clock, Calendar } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { DAY_NAMES_SHORT, DATE_FORMAT } from "@/lib/constants";
import type { Trip } from "@/lib/types";

interface PendingTripsProps {
  trips?: Trip[];
  isLoading?: boolean;
}

export function PendingTrips({ trips, isLoading }: PendingTripsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start sm:items-center justify-between gap-2 pb-3">
        <div className="space-y-1">
          <CardTitle className="text-base sm:text-lg font-semibold">
            Pending Assignments
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Trips awaiting driver assignment
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm" asChild className="shrink-0">
          <Link href="/dashboard/assignments" className="text-xs sm:text-sm">
            View All
            <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <PendingTripsLoading />
        ) : !trips || trips.length === 0 ? (
          <PendingTripsEmpty />
        ) : (
          <div className="space-y-2 sm:space-y-3">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="group flex items-center justify-between gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                {/* Trip Info */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {/* Icon */}
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100">
                    <Package className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-mono font-medium truncate">
                      {trip.tripId}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span className="hidden sm:inline">
                          {format(new Date(trip.tripDate), DATE_FORMAT)}
                        </span>
                        <span className="sm:hidden">
                          {format(new Date(trip.tripDate), "MMM d")}
                        </span>
                      </span>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                        {DAY_NAMES_SHORT[trip.dayOfWeek]}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Status & Action */}
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="hidden sm:flex bg-amber-50 text-amber-700 border-amber-200 text-xs"
                  >
                    <Clock className="mr-1 h-3 w-3" />
                    Pending
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="h-8 text-xs"
                  >
                    <Link href={`/dashboard/assignments?trip=${trip.id}`}>
                      Assign
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function PendingTripsEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-10 text-center">
      <div className="rounded-full bg-green-100 p-3 sm:p-4 mb-3">
        <Package className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
      </div>
      <h3 className="text-sm font-medium mb-1">All caught up!</h3>
      <p className="text-xs text-muted-foreground max-w-[200px]">
        All trips have been assigned. Great work!
      </p>
    </div>
  );
}

function PendingTripsLoading() {
  return (
    <div className="space-y-2 sm:space-y-3">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between gap-3 p-3 rounded-lg border"
        >
          <div className="flex items-center gap-3 flex-1">
            <Skeleton className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
          <Skeleton className="h-8 w-16" />
        </div>
      ))}
    </div>
  );
}
