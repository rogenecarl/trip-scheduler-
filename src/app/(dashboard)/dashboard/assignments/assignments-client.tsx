"use client";

import { useState, useCallback } from "react";
import { DashboardHeader } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AssignmentStats,
  AssignmentTable,
  AutoAssignButton,
  ExportDropdown,
} from "@/components/assignments";
import type { Trip } from "@/lib/types";

interface AssignmentsClientProps {
  initialAssignments: Trip[];
}

export function AssignmentsClient({ initialAssignments }: AssignmentsClientProps) {
  const [pendingCount, setPendingCount] = useState(() =>
    initialAssignments.filter((trip) => !trip.assignment).length
  );

  const handlePendingCountChange = useCallback((count: number) => {
    setPendingCount(count);
  }, []);

  return (
    <>
      <DashboardHeader
        title="Assignments"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Assignments" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8">
        {/* Page Title */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Assignments
            </h1>
            <p className="text-muted-foreground">
              View and manage driver assignments
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ExportDropdown
              assignments={initialAssignments}
              disabled={initialAssignments.length === 0}
            />
            <AutoAssignButton pendingCount={pendingCount} />
          </div>
        </div>

        {/* Stats Cards - derives stats from assignments data */}
        <AssignmentStats initialData={initialAssignments} />

        {/* Assignments Table */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">All Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <AssignmentTable
              initialData={initialAssignments}
              onPendingCountChange={handlePendingCountChange}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
