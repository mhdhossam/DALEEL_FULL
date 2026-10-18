import { BookOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { useAdminCourses } from "@/hooks/useAdminCourses";
import { TableSkeleton } from "@/components/common/TableSkeleton";
import { ErrorState } from "@/components/common/ErrorState";
import { toast } from "sonner";

// New modular components
import { AdminCoursesSearch } from "./components/AdminCoursesSearch";
import { AdminCoursesTable } from "./components/AdminCoursesTable";
import { AdminPagination } from "@/components/common/AdminPagination";

export default function AdminCourses() {
  const {
    searchTerm,
    filteredCourses,
    handleSearch,
    filteredCount,
    deleteCourse,
    getCategoryBadge,
    getStatusBadge,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedCourses,
    totalCount,
    isLoading,
    isError,
  } = useAdminCourses();

  // Loading and Error states
  if (isLoading) return <TableSkeleton />;
  if (isError) return <ErrorState />;

  const handleDisableCourse = (id: number) => {
    const confirm = window.confirm("هل انت متأكد من تعطيل هذا الكورس؟");
    if (!confirm) return;

    deleteCourse(id);
    toast.success("تم تعطيل الكورس بنجاح");
  };

  return (
    <div className="space-y-8 animate-fadeUp rtl">
      <SEO
        title="إدارة الكورسات"
        description="إدارة الكورسات التعليمية، تعديلها ومتابعة حالة النشر في منصة دليل."
      />
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-navy-deep p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <BookOpen className="w-8 h-8 text-blue-400 shadow-sm" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-heading mb-1">
              إدارة الكورسات
            </h1>
            <p className="text-white/70">
              إضافة وتعديل الكورسات المتاحة على المنصة
            </p>
          </div>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-6 h-auto shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 relative z-10">
          <Plus className="ml-2 w-5 h-5" />
          إضافة كورس جديد
        </Button>
      </div>

      {/* Search & Filter Bar */}
      <AdminCoursesSearch
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
        filteredCount={filteredCount}
      />

      {/* Courses Table */}
      <AdminCoursesTable
        courses={paginatedCourses}
        allCoursesCount={filteredCourses.length}
        onDisableCourse={handleDisableCourse}
        getStatusBadge={getStatusBadge}
        getCategoryBadge={getCategoryBadge}
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
