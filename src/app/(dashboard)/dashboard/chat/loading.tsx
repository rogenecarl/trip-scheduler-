import { Skeleton } from "@/components/ui/skeleton";

export default function ChatLoading() {
  return (
    <div className="flex flex-1 flex-col h-full">
      {/* Header Skeleton */}
      <div className="border-b p-4">
        <Skeleton className="h-6 w-32 mb-1" />
        <Skeleton className="h-4 w-56" />
      </div>

      {/* Messages Area Skeleton */}
      <div className="flex-1 p-4 space-y-4">
        {/* AI Message */}
        <div className="flex gap-3">
          <Skeleton className="h-8 w-8 rounded-full shrink-0" />
          <div className="space-y-2 max-w-[80%]">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-56" />
          </div>
        </div>

        {/* User Message */}
        <div className="flex gap-3 justify-end">
          <Skeleton className="h-10 w-48 rounded-2xl" />
        </div>

        {/* AI Message */}
        <div className="flex gap-3">
          <Skeleton className="h-8 w-8 rounded-full shrink-0" />
          <div className="space-y-2 max-w-[80%]">
            <Skeleton className="h-4 w-72" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
      </div>

      {/* Input Area Skeleton */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>
    </div>
  );
}
