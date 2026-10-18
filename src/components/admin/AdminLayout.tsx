import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { AdminNavbar } from "./AdminNavbar";

export function AdminLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background font-body" dir="rtl">
        {/* Sidebar on the right for RTL */}
        <AdminSidebar />
        
        <SidebarInset className="flex flex-col flex-1 overflow-hidden">
          <AdminNavbar />
          <main className="flex-1 overflow-y-auto bg-navy-soft/30 dark:bg-slate-950 transition-colors duration-500 pt-6 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
