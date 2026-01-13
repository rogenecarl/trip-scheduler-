"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAssignments } from "@/hooks/use-assignments";
import { Package, CheckCircle, Clock } from "lucide-react";
import type { Trip } from "@/lib/types";

interface AssignmentStatsProps {
  initialData?: Trip[];
}

export function AssignmentStats({ initialData }: AssignmentStatsProps) {
  // Use assignments data to compute stats (avoids extra DB round trip)
  const { data: assignments, isLoading } = useAssignments(initialData);

  // Compute stats from assignments data (memoized)
  const stats = useMemo(() => {
    if (!assignments) return { total: 0, assigned: 0, pending: 0 };

    const total = assignments.length;
    const assigned = assignments.filter((t) => t.assignment).length;
    const pending = total - assigned;

    return { total, assigned, pending };
  }, [assignments]);

  if (isLoading) {
    return <AssignmentStatsSkeleton />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard
        label="Total Trips"
        value={stats.total}
        icon={Package}
        iconClassName="text-blue-600 bg-blue-100"
      />
      <StatCard
        label="Assigned"
        value={stats.assigned}
        icon={CheckCircle}
        iconClassName="text-green-600 bg-green-100"
      />
      <StatCard
        label="Pending"
        value={stats.pending}
        icon={Clock}
        iconClassName="text-amber-600 bg-amber-100"
      />
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  iconClassName?: string;
}

function StatCard({ label, value, icon: Icon, iconClassName }: StatCardProps) {
  return (
    <Card className="border-l-4 border-l-cyan-700">
      <CardContent>
        <div className="flex items-center gap-3">
          <div className={`rounded-lg p-2 ${iconClassName}`}>
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-semibold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AssignmentStatsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="border-l-4 border-l-cyan-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-7 w-10" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
