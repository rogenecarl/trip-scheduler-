"use client";

import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  iconClassName?: string;
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
  isLoading?: boolean;
}

export function StatsCard({
  label,
  value,
  icon: Icon,
  iconClassName,
  trend,
  isLoading,
}: StatsCardProps) {
  if (isLoading) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl" />
            <div className="space-y-1.5">
              <Skeleton className="h-3 sm:h-4 w-20" />
              <Skeleton className="h-6 sm:h-8 w-12" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-l-4 border-l-cyan-700 hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4 sm:p-4">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Icon */}
          <div
            className={cn(
              "flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-muted transition-transform duration-200 group-hover:scale-105",
              iconClassName
            )}
          >
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm text-muted-foreground font-medium truncate">
              {label}
            </p>
            <p className="text-xl sm:text-2xl font-bold tracking-tight">
              {value.toLocaleString()}
            </p>
            {trend && (
              <p
                className={cn(
                  "text-xs mt-0.5",
                  trend.isPositive ? "text-green-600" : "text-muted-foreground"
                )}
              >
                {trend.isPositive && "+"}
                {trend.value} {trend.label}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
