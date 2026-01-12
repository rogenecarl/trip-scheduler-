import { DashboardHeader } from "@/components/layout";
import { CalendarDays } from "lucide-react";

export default function CalendarPage() {
  return (
    <>
      <DashboardHeader
        title="Calendar"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Calendar" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-8 p-4 md:p-6 lg:p-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Calendar
          </h1>
          <p className="text-muted-foreground">
            View driver availability by date
          </p>
        </div>

        {/* Placeholder content */}
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed">
          <div className="flex flex-col items-center gap-2 text-center p-8">
            <div className="rounded-full bg-muted p-4">
              <CalendarDays className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">Availability Calendar</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              See which drivers are available on any given day and view scheduled trips.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
