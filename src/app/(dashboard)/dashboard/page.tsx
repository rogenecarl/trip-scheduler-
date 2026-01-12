import { DashboardHeader } from "@/components/layout";
import {
  getDashboardStats,
  getPendingTrips,
} from "@/actions/dashboard-actions";
import { StatsGrid, QuickActions, PendingTrips } from "@/components/dashboard";

export default async function DashboardPage() {
  const [statsResult, pendingTripsResult] = await Promise.all([
    getDashboardStats(),
    getPendingTrips(5),
  ]);

  const stats = statsResult.success ? statsResult.data : undefined;
  const pendingTrips = pendingTripsResult.success
    ? pendingTripsResult.data
    : undefined;

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

        <StatsGrid stats={stats} />

        <div className="grid gap-6 md:grid-cols-2">
          <QuickActions />
          <PendingTrips trips={pendingTrips} />
        </div>
      </div>
    </>
  );
}
