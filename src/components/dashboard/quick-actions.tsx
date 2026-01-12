"use client";

import Link from "next/link";
import { UserPlus, PackagePlus, FileUp, Sparkles } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const actions = [
  {
    label: "Add Driver",
    href: "/dashboard/drivers",
    icon: UserPlus,
  },
  {
    label: "Add Trip",
    href: "/dashboard/trips",
    icon: PackagePlus,
  },
  {
    label: "Import CSV",
    href: "/dashboard/trips?tab=csv",
    icon: FileUp,
  },
  {
    label: "Auto-Assign",
    href: "/dashboard/assignments",
    icon: Sparkles,
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className="h-auto flex-col gap-2 py-4"
              asChild
            >
              <Link href={action.href}>
                <action.icon className="h-5 w-5" />
                <span className="text-sm">{action.label}</span>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
