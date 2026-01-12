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
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full bg-muted",
              iconClassName
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-semibold">{value}</p>
            {trend && (
              <p
                className={cn(
                  "text-xs",
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
