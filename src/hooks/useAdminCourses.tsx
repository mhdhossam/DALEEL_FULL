import { useState, useCallback, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { GraduationCap } from "lucide-react";
import dataApi from "@/lib/dataApi";
import { toast } from "sonner";

// Shape returned by AdminCourseSerializer
export interface AdminCourse {
    id: number;
    title: string;
    category: string;
    level: string;
    duration: string;
    price: string;
    students: number;
    student_count: number;
    instructor: string;
    image: string;
    cloud_url: string | null;
    created_at: string;
    updated_at: string;
    // compat alias so CourseGridCard doesn't break if used in admin
    cardImage?: string;
}

const fetchCourses = async (): Promise<AdminCourse[]> => {
    const { data } = await dataApi.get("/courses/");
    const raw = Array.isArray(data) ? data : (data?.results ?? []);
    return raw.map((c: AdminCourse & { category_name?: string }) => ({ ...c, category: c.category_name ?? String(c.category ?? ""), cardImage: c.image }));
};

const deleteCourseApi = async (id: number) => {
    await dataApi.delete(`/courses/${id}/`);
};

const ITEMS_PER_PAGE = 5;

export function useAdminCourses() {
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("الكل");
    const [currentPage, setCurrentPage] = useState(1);
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const { data: coursesList = [], isLoading, isError } = useQuery({
        queryKey: ["admin-courses"],
        queryFn: fetchCourses,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteCourseApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
            toast.success("تم حذف الكورس");
        },
        onError: () => toast.error("فشل حذف الكورس"),
    });

    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(searchTerm), 300);
        return () => clearTimeout(t);
    }, [searchTerm]);

    const filteredCourses = useMemo(() => {
        const s = debouncedSearch.toLowerCase();
        return coursesList.filter((c) => {
            const matchSearch = c.title.toLowerCase().includes(s);
            const matchCat = categoryFilter === "الكل" || c.category === categoryFilter;
            return matchSearch && matchCat;
        });
    }, [coursesList, debouncedSearch, categoryFilter]);

    const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);

    const paginatedCourses = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredCourses.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredCourses, currentPage]);

    const handleSearch = useCallback((term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
    }, []);

    const handleCategoryFilter = useCallback((category: string) => {
        setCategoryFilter(category);
        setCurrentPage(1);
    }, []);

    const deleteCourse = useCallback((id: number) => {
        deleteMutation.mutate(id);
    }, [deleteMutation]);

    const getStatusBadge = (instructor: string) => (
        <Badge className="bg-blue-100 text-blue-700 border-none rounded-full px-3 py-1 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5" />
            {instructor}
        </Badge>
    );

    const getCategoryBadge = (category: string) => (
        <Badge variant="outline" className="text-muted-foreground rounded-full px-3 py-1">
            {category}
        </Badge>
    );

    return {
        searchTerm,
        debouncedSearch,
        categoryFilter,
        filteredCourses,
        paginatedCourses,
        handleSearch,
        handleCategoryFilter,
        deleteCourse,
        getStatusBadge,
        getCategoryBadge,
        currentPage,
        setCurrentPage,
        totalPages,
        totalCount: coursesList.length,
        filteredCount: filteredCourses.length,
        isLoading,
        isError,
    };
}
