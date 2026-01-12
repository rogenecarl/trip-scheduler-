"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { MOBILE_NAV_ITEMS } from "@/lib/constants";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {MOBILE_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {Icon && (
                <Icon
                  className={cn(
                    "h-5 w-5",
                    isActive && "text-primary"
                  )}
                />
              )}
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute bottom-0 h-0.5 w-12 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
