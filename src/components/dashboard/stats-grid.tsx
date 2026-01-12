"use client";

import { Users, Package, ClipboardCheck, Clock } from "lucide-react";
import { StatsCard } from "./stats-card";
import type { DashboardStats } from "@/lib/types";

interface StatsGridProps {
  stats?: DashboardStats;
  isLoading?: boolean;
}

export function StatsGrid({ stats, isLoading }: StatsGridProps) {
  const cards = [
    {
      label: "Total Drivers",
      value: stats?.totalDrivers ?? 0,
      icon: Users,
      iconClassName: "bg-blue-100 text-blue-600",
    },
    {
      label: "Trips This Week",
      value: stats?.tripsThisWeek ?? 0,
      icon: Package,
      iconClassName: "bg-green-100 text-green-600",
    },
    {
      label: "Assigned",
      value: stats?.assignedTrips ?? 0,
      icon: ClipboardCheck,
      iconClassName: "bg-emerald-100 text-emerald-600",
    },
    {
      label: "Pending",
      value: stats?.pendingTrips ?? 0,
      icon: Clock,
      iconClassName: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <StatsCard
          key={card.label}
          label={card.label}
          value={card.value}
          icon={card.icon}
          iconClassName={card.iconClassName}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}
