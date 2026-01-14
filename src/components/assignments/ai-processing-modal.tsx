"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Zap,
  User,
} from "lucide-react";
import type { AIAssignmentResult, DriverDistribution } from "@/lib/types";

interface AssignmentResultModalProps {
  open: boolean;
  onClose: () => void;
  isProcessing: boolean;
  result: AIAssignmentResult | null;
  pendingCount: number;
}

export function AssignmentResultModal({
  open,
  onClose,
  isProcessing,
  result,
  pendingCount,
}: AssignmentResultModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => !open && !isProcessing && onClose()}
    >
      <DialogContent
        className="w-[calc(100vw-2rem)] max-w-[360px] p-4 sm:max-w-md sm:p-6"
        showCloseButton={!isProcessing}
      >
        <DialogHeader className="text-left space-y-1.5 sm:space-y-2">
          <DialogTitle className="flex items-center gap-1.5 text-base sm:gap-2 sm:text-lg">
            {isProcessing ? (
              <span className="leading-tight">Assigning Drivers</span>
            ) : result?.success ? (
              <>
                <CheckCircle className="h-4 w-4 shrink-0 text-green-600 sm:h-5 sm:w-5" />
                <span>Assignment Complete</span>
                {result.durationMs !== undefined && (
                  <Badge variant="secondary" className="ml-auto text-[10px] sm:text-xs">
                    <Zap className="h-3 w-3 mr-1" />
                    {result.durationMs}ms
                  </Badge>
                )}
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4 shrink-0 text-destructive sm:h-5 sm:w-5" />
                <span>Assignment Failed</span>
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="py-1 space-y-3 sm:py-2 sm:space-y-4">
          {isProcessing ? (
            <ProcessingState pendingCount={pendingCount} />
          ) : result?.success ? (
            <SuccessState result={result} />
          ) : (
            <ErrorState error={result?.error} />
          )}
        </div>

        <DialogFooter className="mt-2 sm:mt-0">
          {!isProcessing && (
            <Button
              onClick={onClose}
              className="w-full text-sm sm:w-auto sm:text-base"
              size="sm"
            >
              {result?.success ? "Done" : "Close"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ProcessingState({ pendingCount }: { pendingCount: number }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress from 0 to ~95% over time
    // Using easing curve: fast at start, slows down as it approaches 95%
    const startTime = Date.now();
    const duration = 2000; // 2 seconds to reach ~95%
    let frameId: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(elapsed / duration, 1);

      // Ease out cubic - starts fast, slows down
      const eased = 1 - Math.pow(1 - t, 3);
      const newProgress = Math.round(eased * 95);

      setProgress(newProgress);

      if (t < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="rounded-lg border bg-muted/30 p-3 sm:p-4">
        <div className="space-y-3">
          {/* Trip count */}
          <p className="text-sm font-medium text-center sm:text-base">
            Assigning {pendingCount} {pendingCount === 1 ? "trip" : "trips"}
          </p>

          {/* Progress bar with percentage */}
          <div className="space-y-2">
            <Progress value={progress} className="h-2 sm:h-2.5" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Matching drivers by availability...</span>
              <span className="font-medium tabular-nums">{progress}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SuccessState({ result }: { result: AIAssignmentResult }) {
  const stats = result.stats;
  const distribution = result.distribution || [];
  const warnings = result.warnings || [];
  const maxTripCount = Math.max(...distribution.map((d) => d.tripCount), 1);

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div className="rounded-lg border border-green-200 bg-green-50 p-2 text-center sm:p-3">
          <p className="text-lg font-semibold text-green-700 sm:text-2xl">
            {stats?.assignedCount ?? result.assignments?.length ?? 0}
          </p>
          <p className="text-[10px] text-green-600 sm:text-sm">Assigned</p>
        </div>
        <div className="rounded-lg border bg-muted p-2 text-center sm:p-3">
          <p className="text-lg font-semibold sm:text-2xl">
            {stats?.unassignedCount ?? 0}
          </p>
          <p className="text-[10px] text-muted-foreground sm:text-sm">
            {(stats?.unassignedCount ?? 0) === 0 ? "None remaining" : "Could not assign"}
          </p>
        </div>
      </div>

      {/* Driver Distribution */}
      {distribution.length > 0 && (
        <DriverDistributionSection
          distribution={distribution}
          maxTripCount={maxTripCount}
        />
      )}

      {/* Warnings Section */}
      {warnings.length > 0 && <WarningsSection warnings={warnings} />}
    </div>
  );
}

function DriverDistributionSection({
  distribution,
  maxTripCount,
}: {
  distribution: DriverDistribution[];
  maxTripCount: number;
}) {
  return (
    <div className="rounded-lg border bg-muted/30 p-2 sm:p-3">
      <div className="flex items-center gap-1 text-muted-foreground sm:gap-2 mb-2">
        <User className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
        <span className="text-[11px] font-medium sm:text-sm">
          Driver Distribution
        </span>
      </div>
      <div className="space-y-2">
        {distribution.map((driver) => {
          const percentage = (driver.tripCount / maxTripCount) * 100;
          return (
            <div key={driver.driverId} className="space-y-1">
              <div className="flex items-center justify-between text-[10px] sm:text-xs">
                <span className="truncate font-medium">{driver.driverName}</span>
                <span className="text-muted-foreground ml-2 tabular-nums">
                  {driver.tripCount} {driver.tripCount === 1 ? "trip" : "trips"}
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WarningsSection({ warnings }: { warnings: string[] }) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-2 sm:p-3 overflow-hidden">
      <div className="flex items-center gap-1 text-amber-700 sm:gap-2 mb-1.5 sm:mb-2">
        <AlertTriangle className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
        <span className="text-[11px] font-medium sm:text-sm">
          Warnings ({warnings.length})
        </span>
      </div>
      <div className="h-20 sm:h-28 overflow-hidden">
        <ScrollArea className="h-full w-full">
          <div className="pr-3 sm:pr-4">
            <ul className="text-[10px] text-amber-600 space-y-1 leading-relaxed sm:text-xs sm:space-y-1.5">
              {warnings.map((warning, index) => (
                <li
                  key={index}
                  className="break-all whitespace-normal overflow-hidden"
                >
                  <span className="break-words">{`• ${warning}`}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

function ErrorState({ error }: { error?: string }) {
  return (
    <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-2 sm:p-3">
      <ScrollArea className="max-h-24 sm:max-h-32">
        <p className="text-[11px] text-destructive break-words leading-relaxed pr-2 sm:text-sm sm:pr-3">
          {error || "An unexpected error occurred during assignment."}
        </p>
      </ScrollArea>
    </div>
  );
}

// Legacy export for backwards compatibility
export const AIProcessingModal = AssignmentResultModal;
