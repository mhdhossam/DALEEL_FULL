import { useQuery } from "@tanstack/react-query";
import { LayoutDashboard, LogOut, Briefcase, Database } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "@/components/ui/sidebar";
import { getSchemaListing } from "@/lib/adminSchemaApi";

export function AdminSidebar() {
  const location = useLocation();
  const { data: schemas = [] } = useQuery({ queryKey: ["admin-schema-list"], queryFn: getSchemaListing, staleTime: 5 * 60 * 1000 });
  const fixed = [
    { title: "الرئيسية", icon: LayoutDashboard, path: "/admin" },
    { title: "الوظائف", icon: Briefcase, path: "/admin/applications" },
  ];
  return <Sidebar side="right" className="border-l border-navy-soft/20 bg-navy-deep text-white">
    <SidebarHeader className="p-6"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center"><span className="text-xl font-bold">D</span></div><span className="text-xl font-bold">لوحة التحكم</span></div></SidebarHeader>
    <SidebarContent className="px-4">
      <SidebarGroup><SidebarGroupLabel className="text-white/50 px-2 py-4 text-xs font-semibold uppercase">القائمة الرئيسية</SidebarGroupLabel><SidebarGroupContent><SidebarMenu>{fixed.map((item) => <SidebarMenuItem key={item.path}><SidebarMenuButton asChild isActive={location.pathname === item.path} className="w-full px-4 py-3 rounded-xl"><Link to={item.path}><item.icon className="w-5 h-5" /><span>{item.title}</span></Link></SidebarMenuButton></SidebarMenuItem>)}</SidebarMenu></SidebarGroupContent></SidebarGroup>
      <SidebarGroup><SidebarGroupLabel className="text-white/50 px-2 py-4 text-xs font-semibold uppercase">الموارد</SidebarGroupLabel><SidebarGroupContent><SidebarMenu>
        {schemas.filter((s) => !!s.endpoint).map((schema) => { const href = `/admin/resources/${schema.name}`; return <SidebarMenuItem key={schema.name}><SidebarMenuButton asChild isActive={location.pathname.startsWith(href)} className="w-full px-4 py-3 rounded-xl"><Link to={href}><Database className="w-5 h-5" /><span>{schema.label}</span></Link></SidebarMenuButton></SidebarMenuItem>; })}
      </SidebarMenu></SidebarGroupContent></SidebarGroup>
    </SidebarContent>
    <SidebarFooter className="p-4 border-t border-white/10"><SidebarMenu><SidebarMenuItem><SidebarMenuButton className="w-full px-4 py-3 rounded-xl text-white/70 hover:text-destructive"><LogOut className="w-5 h-5" /><span>تسجيل الخروج</span></SidebarMenuButton></SidebarMenuItem></SidebarMenu></SidebarFooter>
  </Sidebar>;
}
