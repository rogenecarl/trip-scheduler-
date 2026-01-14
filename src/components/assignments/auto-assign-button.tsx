"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { AssignmentResultModal } from "./ai-processing-modal";
import { useAutoAssignWithResult } from "@/hooks/use-assignments";
import type { AIAssignmentResult } from "@/lib/types";

interface AutoAssignButtonProps {
  pendingCount: number;
}

export function AutoAssignButton({ pendingCount }: AutoAssignButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [result, setResult] = useState<AIAssignmentResult | null>(null);
  const { startAssignment, isProcessing, reset } = useAutoAssignWithResult();

  const handleAutoAssign = async () => {
    setResult(null);
    reset();
    setIsModalOpen(true);

    const assignmentResult = await startAssignment();
    setResult(assignmentResult);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setResult(null);
    reset();
  };

  return (
    <>
      <Button
        onClick={handleAutoAssign}
        disabled={pendingCount === 0 || isProcessing}
        className="gap-2"
      >
        <Zap className="h-4 w-4" />
        Auto-Assign
      </Button>

      <AssignmentResultModal
        open={isModalOpen}
        onClose={handleModalClose}
        isProcessing={isProcessing}
        result={result}
        pendingCount={pendingCount}
      />
    </>
  );
}
