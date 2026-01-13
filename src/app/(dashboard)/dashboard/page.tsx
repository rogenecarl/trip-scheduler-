import { Suspense } from "react";
import type { Metadata } from "next";
import { DashboardHeader } from "@/components/layout";
import {
  getDashboardStats,
  getPendingTrips,
} from "@/actions/dashboard-actions";
import {
  StatsGrid,
  QuickActions,
  PendingTrips,
  StatsGridSkeleton,
  PendingTripsSkeleton,
} from "@/components/dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Overview of your trip scheduling system",
};

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader title="Dashboard" />
      <div className="flex flex-1 flex-col gap-8 p-4 md:p-6 lg:p-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Overview of your trip scheduling system
          </p>
        </div>

        {/* Stats with independent loading */}
        <Suspense fallback={<StatsGridSkeleton />}>
          <StatsGridAsync />
        </Suspense>

        <div className="grid gap-6 md:grid-cols-2">
          {/* QuickActions is static, no data fetching */}
          <QuickActions />

          {/* PendingTrips with independent loading */}
          <Suspense fallback={<PendingTripsSkeleton />}>
            <PendingTripsAsync />
          </Suspense>
        </div>
      </div>
    </>
  );
}

// Async server component for stats
async function StatsGridAsync() {
  const result = await getDashboardStats();
  const stats = result.success ? result.data : undefined;
  return <StatsGrid stats={stats} />;
}

// Async server component for pending trips
async function PendingTripsAsync() {
  const result = await getPendingTrips(5);
  const trips = result.success ? result.data : undefined;
  return <PendingTrips trips={trips} />;
}
