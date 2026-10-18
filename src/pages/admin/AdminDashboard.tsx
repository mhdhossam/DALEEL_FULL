import { Plus, FileText, Users, BookOpen, DollarSign, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import { useAdminCourses } from "@/hooks/useAdminCourses";
import { useAdminOrders } from "@/hooks/useAdminOrders";
import { TableSkeleton } from "@/components/common/TableSkeleton";
import { ErrorState } from "@/components/common/ErrorState";

// New modular components
import { AdminDashboardStats, StatCard } from "./components/AdminDashboardStats";
import { AdminDashboardRecentOrders } from "./components/AdminDashboardRecentOrders";

export default function AdminDashboard() {
  const { totalCount: totalUsers, isLoading: usersLoading, isError: usersError } = useAdminUsers();
  const { totalCount: totalCourses, isLoading: coursesLoading, isError: coursesError } = useAdminCourses();
  const { totalCount: totalOrders, paginatedOrders: recentOrders, getStatusBadge, isLoading: ordersLoading, isError: ordersError } = useAdminOrders();

  const isLoading = usersLoading || coursesLoading || ordersLoading;
  const isError = usersError || coursesError || ordersError;

  if (isLoading) return <TableSkeleton />;
  if (isError) return <ErrorState />;

  const stats: StatCard[] = [
    {
      title: "عدد المستخدمين",
      value: (totalUsers || 0).toLocaleString(),
      icon: Users,
      trend: "+12%",
      color: "bg-pink-100 text-primary",
    },
    {
      title: "عدد الكورسات",
      value: (totalCourses || 0).toLocaleString(),
      icon: BookOpen,
      trend: "+5",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "الأرباح",
      value: "12,450 ج.م",
      icon: DollarSign,
      trend: "+18%",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "الطلبات الجديدة",
      value: (totalOrders || 0).toLocaleString(),
      icon: ClipboardList,
      trend: "+8",
      color: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <div className="space-y-8 animate-fadeUp rtl">
      <SEO title="لوحة التحكم - الإدارة العامة" description="متابعة الإحصائيات والعمليات الأخيرة في منصة دليل." />
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-navy-deep p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-bg.webp" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-30 blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-navy-deep/90 via-navy-deep/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 tracking-tight">لوحة التحكم</h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">إدارة المنصة ومتابعة الأداء بسهولة. يمكنك التحكم في جميع جوانب الموقع من هنا.</p>
          
          <div className="flex flex-wrap gap-4">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 py-6 h-auto shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105">
              <Plus className="ml-2 w-5 h-5" />
              إضافة كورس
            </Button>
            <Button variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white rounded-xl px-8 py-6 h-auto transition-all duration-300">
              <FileText className="ml-2 w-5 h-5" />
              عرض التقارير
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <AdminDashboardStats stats={stats} />

      {/* Table Section */}
      <AdminDashboardRecentOrders orders={recentOrders} getStatusBadge={getStatusBadge} />
    </div>
  );
}
