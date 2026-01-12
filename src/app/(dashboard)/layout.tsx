import { cookies } from "next/headers";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar, MobileNav } from "@/components/layout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col pb-16 md:pb-0">
          {children}
        </div>
      </SidebarInset>
      <MobileNav />
    </SidebarProvider>
  );
}
