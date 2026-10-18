import { ShoppingBag, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { useAdminOrders } from "@/hooks/useAdminOrders";
import { TableSkeleton } from "@/components/common/TableSkeleton";
import { ErrorState } from "@/components/common/ErrorState";
import { toast } from "sonner";

// New modular components
import { AdminOrdersSearch } from "./components/AdminOrdersSearch";
import { AdminOrdersTable } from "./components/AdminOrdersTable";
import { AdminPagination } from "@/components/common/AdminPagination";

export default function AdminOrders() {
  const {
    searchTerm,
    handleSearch,
    filteredCount,
    deleteOrder,
    updateOrderStatus,
    getStatusBadge,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedOrders,
    filteredOrders,
    isLoading,
    isError,
  } = useAdminOrders();

  // Loading and Error states
  if (isLoading) return <TableSkeleton />;
  if (isError) return <ErrorState />;

  const handleUpdateStatus = (id: string, status: string) => {
    updateOrderStatus(id, status);
    toast.success("تم تعديل حالة الطلب بنجاح");
  };

  const handleCancelOrder = (id: string) => {
    const confirm = window.confirm("هل انت متأكد من إلغاء هذا الطلب؟");
    if (!confirm) return;

    deleteOrder(id);
    toast.success("تم إلغاء الطلب بنجاح");
  };

  return (
    <div className="space-y-8 animate-fadeUp rtl">
      <SEO
        title="إدارة الطلبات"
        description="متابعة طلبات الشراء، حالة الدفع وتفاصيل العمليات المالية في منصة دليل."
      />
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-navy-deep p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <ShoppingBag className="w-8 h-8 text-amber-400 shadow-sm" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-heading mb-1">
              إدارة الطلبات
            </h1>
            <p className="text-white/70">
              متابعة جميع عمليات الشراء والطلبات الجديدة
            </p>
          </div>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-6 h-auto shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 relative z-10">
          <Download className="ml-2 w-5 h-5" />
          تصدير التقارير
        </Button>
      </div>

      {/* Search & Filter Bar */}
      <AdminOrdersSearch
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
        filteredCount={filteredCount}
      />

      {/* Orders Table */}
      <AdminOrdersTable
        orders={paginatedOrders}
        allOrdersCount={filteredOrders.length}
        onUpdateOrderStatus={handleUpdateStatus}
        onDeleteOrder={handleCancelOrder}
        getStatusBadge={getStatusBadge}
      />

      {/* Pagination */}
      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
