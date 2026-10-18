import { Users, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import { TableSkeleton } from "@/components/common/TableSkeleton";
import { ErrorState } from "@/components/common/ErrorState";
import { toast } from "sonner";

// New modular components
import { AdminUsersSearch } from "./components/AdminUsersSearch";
import { AdminUsersTable } from "./components/AdminUsersTable";
import { AdminPagination } from "@/components/common/AdminPagination";

export default function AdminUsers() {
  const {
    searchTerm,
    handleSearch,
    filteredUsers,
    filteredCount,
    deleteUser,
    updateUserStatus,
    getStatusBadge,
    getRoleBadge,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedUsers,
    isLoading,
    isError,
  } = useAdminUsers();

  // Loading and Error states
  if (isLoading) return <TableSkeleton />;
  if (isError) return <ErrorState />;

  const handleBan = (id: string) => {
    const confirm = window.confirm("هل انت متاكد من حظر المستخدم؟");
    if (!confirm) return;

    updateUserStatus(id, "محظور");
    toast.success("تم حظر المستخدم بنجاح");
  };

  return (
    <div className="space-y-8 animate-fadeUp rtl">
      <SEO
        title="إدارة المستخدمين"
        description="إدارة صلاحيات المستخدمين، متابعتهم وفلترة البيانات في منصة دليل."
      />
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-navy-deep p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <Users className="w-8 h-8 text-primary shadow-sm" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-heading mb-1">
              إدارة المستخدمين
            </h1>
            <p className="text-white/70">
              إدارة صلاحيات المستخدمين، متابعتهم وفلترة البيانات
            </p>
          </div>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-6 h-auto shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 relative z-10">
          <UserPlus className="ml-2 w-5 h-5" />
          إضافة مستخدم جديد
        </Button>
      </div>

      {/* Search & Filter Bar */}
      <AdminUsersSearch
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
        filteredCount={filteredCount}
      />

      {/* Users Table */}
      <AdminUsersTable
        users={paginatedUsers}
        allUsersCount={filteredUsers.length}
        onBanUser={handleBan}
        getRoleBadge={getRoleBadge}
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
