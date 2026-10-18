import { useState, useCallback, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, XCircle } from "lucide-react";
import dataApi from "@/lib/dataApi";

// Maps backend English status → Arabic display label
const STATUS_AR: Record<string, string> = {
    paid:    "ناجح",
    pending: "معلق",
    failed:  "فاشل",
};

export interface AdminOrder {
    id: string;
    user: string;       // user_username
    course: string;     // course_title
    date: string;
    amount: string;
    status: string;     // Arabic label
}

const fetchPayments = async (): Promise<AdminOrder[]> => {
    const { data } = await dataApi.get("/payments/");
    const raw = Array.isArray(data) ? data : (data?.results ?? []);
    return raw.map((p: any) => ({
        id:     String(p.id),
        user:   p.user_username  ?? p.user,
        course: p.course_title   ?? p.course,
        date:   p.created_at?.slice(0, 10) ?? "",
        amount: String(p.amount),
        status: STATUS_AR[p.status] ?? p.status,
    }));
};

const ITEMS_PER_PAGE = 5;

export function useAdminOrders() {
    const [searchTerm, setSearchTerm]   = useState("");
    const [statusFilter, setStatusFilter] = useState("الكل");
    const [currentPage, setCurrentPage] = useState(1);
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const { data: orders = [], isLoading, isError } = useQuery({
        queryKey: ["admin-payments"],
        queryFn: fetchPayments,
    });

    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(searchTerm), 300);
        return () => clearTimeout(t);
    }, [searchTerm]);

    const filteredOrders = useMemo(() => {
        const s = debouncedSearch.toLowerCase();
        return orders.filter((o) => {
            const matchSearch =
                o.user.toLowerCase().includes(s) ||
                o.course.toLowerCase().includes(s) ||
                o.id.includes(s);
            const matchStatus = statusFilter === "الكل" || o.status === statusFilter;
            return matchSearch && matchStatus;
        });
    }, [orders, debouncedSearch, statusFilter]);

    const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

    const paginatedOrders = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredOrders.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredOrders, currentPage]);

    const handleSearch = useCallback((term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
    }, []);

    const handleStatusFilter = useCallback((status: string) => {
        setStatusFilter(status);
        setCurrentPage(1);
    }, []);

    // Payments are read-only in the backend — no delete/update
    const deleteOrder = useCallback((_id: string) => {}, []);
    const updateOrderStatus = useCallback((_id: string, _status: string) => {}, []);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "ناجح":
                return <Badge className="bg-green-100 text-green-700 border-none rounded-full px-3 py-1 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" />{status}</Badge>;
            case "معلق":
                return <Badge className="bg-amber-100 text-amber-700 border-none rounded-full px-3 py-1 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{status}</Badge>;
            case "فاشل":
                return <Badge className="bg-red-100 text-red-700 border-none rounded-full px-3 py-1 flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5" />{status}</Badge>;
            default:
                return <Badge variant="secondary" className="rounded-full px-3 py-1">{status}</Badge>;
        }
    };

    return {
        searchTerm,
        debouncedSearch,
        statusFilter,
        filteredOrders,
        paginatedOrders,
        handleSearch,
        handleStatusFilter,
        deleteOrder,
        updateOrderStatus,
        getStatusBadge,
        currentPage,
        setCurrentPage,
        totalPages,
        totalCount: orders.length,
        filteredCount: filteredOrders.length,
        isLoading,
        isError,
    };
}
