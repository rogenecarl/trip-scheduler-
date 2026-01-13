"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="rounded-full bg-destructive/10 p-4 mb-4">
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Something went wrong</h2>
        <p className="text-muted-foreground mb-6">
          {error.message || "An unexpected error occurred while loading this page."}
        </p>
        <div className="flex gap-3">
          <Button onClick={() => reset()} variant="default">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>
          <Button variant="outline" asChild>
            <a href="/dashboard">Go to Dashboard</a>
          </Button>
        </div>
        {error.digest && (
          <p className="text-xs text-muted-foreground mt-4">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
