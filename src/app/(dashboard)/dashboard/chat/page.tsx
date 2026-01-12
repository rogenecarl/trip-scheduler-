import { DashboardHeader } from "@/components/layout";
import { MessageSquare } from "lucide-react";

export default function ChatPage() {
  return (
    <>
      <DashboardHeader
        title="AI Chat"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Chat" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-8 p-4 md:p-6 lg:p-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            AI Assistant
          </h1>
          <p className="text-muted-foreground">
            Ask questions about schedules and drivers
          </p>
        </div>

        {/* Placeholder content */}
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed">
          <div className="flex flex-col items-center gap-2 text-center p-8">
            <div className="rounded-full bg-muted p-4">
              <MessageSquare className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">AI Chat Assistant</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Chat with the AI to get answers about driver availability, trip assignments, and scheduling.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
