"use client";

import Link from "next/link";
import { UserPlus, PackagePlus, FileUp, Sparkles } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const actions = [
  {
    label: "Add Driver",
    description: "Create new driver",
    href: "/dashboard/drivers",
    icon: UserPlus,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    label: "Add Trip",
    description: "Schedule a trip",
    href: "/dashboard/trips",
    icon: PackagePlus,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    label: "Import CSV",
    description: "Bulk import trips",
    href: "/dashboard/trips",
    icon: FileUp,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    label: "Auto-Assign",
    description: "AI assignment",
    href: "/dashboard/assignments",
    icon: Sparkles,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg font-semibold">
          Quick Actions
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Common tasks and shortcuts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {actions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className={cn(
                "group flex flex-col items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border-2 border-transparent",
                "bg-muted/50 hover:bg-muted hover:border-primary/20",
                "transition-all duration-200 active:scale-[0.98]"
              )}
            >
              {/* Icon */}
              <div
                className={cn(
                  "flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110",
                  action.iconBg
                )}
              >
                <action.icon className={cn("h-5 w-5 sm:h-6 sm:w-6", action.iconColor)} />
              </div>

              {/* Text */}
              <div className="text-center">
                <p className="text-xs sm:text-sm font-medium leading-tight">
                  {action.label}
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 hidden sm:block">
                  {action.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
