-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 2,
ADD COLUMN     "priorityNote" TEXT;

-- CreateIndex
CREATE INDEX "Driver_priority_idx" ON "Driver"("priority");
