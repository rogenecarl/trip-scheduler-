import { DashboardHeader } from "@/components/layout";
import { LayoutDashboard } from "lucide-react";

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

        {/* Placeholder content */}
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed">
          <div className="flex flex-col items-center gap-2 text-center p-8">
            <div className="rounded-full bg-muted p-4">
              <LayoutDashboard className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">Dashboard</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Stats, quick actions, and pending trips will be displayed here.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
