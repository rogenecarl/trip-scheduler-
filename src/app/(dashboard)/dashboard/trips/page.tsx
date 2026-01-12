import { DashboardHeader } from "@/components/layout";
import { Package } from "lucide-react";

export default function TripsPage() {
  return (
    <>
      <DashboardHeader
        title="Trips"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Trips" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-8 p-4 md:p-6 lg:p-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Trips
          </h1>
          <p className="text-muted-foreground">
            Manage trips and import from CSV
          </p>
        </div>

        {/* Placeholder content */}
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed">
          <div className="flex flex-col items-center gap-2 text-center p-8">
            <div className="rounded-full bg-muted p-4">
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">Trips Management</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Add trips manually, import from CSV, and view all trips here.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
