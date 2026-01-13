import type { Metadata } from "next";
import { DashboardHeader } from "@/components/layout";
import { CalendarView } from "@/components/calendar";

export const metadata: Metadata = {
  title: "Calendar",
  description: "View driver availability by date",
};

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
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Calendar
          </h1>
          <p className="text-muted-foreground">
            View driver availability by date
          </p>
        </div>

        <CalendarView />
      </div>
    </>
  );
}
