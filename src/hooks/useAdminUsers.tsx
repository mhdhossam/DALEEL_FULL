import { useState, useCallback, useMemo, useEffect } from "react";
// import { usersData, UserRecord } from "@/data/adminData";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, deleteUsers, updateUserStatusApi } from "@/lib/service";
// types
type Status = "نشط" | "غير نشط" | "محظور";
type FilterStatus = Status | "الكل";
const ITEMS_PER_PAGE = 5;

export function useAdminUsers() {
  const queryClient = useQueryClient();
  // state
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("الكل");
  // const [users, setUsers] = useState<UserRecord[]>(usersData);
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  // fetch Users

  const {
    data: users = [],
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  // delete
  const deleteMutation = useMutation({
    mutationFn: deleteUsers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  // update status
  const updateStatusMutation = useMutation({
    mutationFn: updateUserStatusApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);
  // filter
  // const ITEMS_PER_PAGE = 5;
  const filteredUsers = useMemo(() => {
    const search = debouncedSearch.toLowerCase();
    return users.filter((user: any) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "الكل" || user.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [users, statusFilter, debouncedSearch]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  // pagination
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredUsers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  // fix page overflow
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [totalPages]);

  // action
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }, []);

  const handleStatusFilter = useCallback((status: FilterStatus) => {
    setStatusFilter(status);
    setCurrentPage(1);
  }, []);

  // delete user
  const deleteUser = useCallback(
    (id: string) => {
      deleteMutation.mutate(id);
    },
    [deleteMutation],
  );

  // update user
  const updateUserStatus = useCallback(
    (id: string, newStatus: Status) => {
      updateStatusMutation.mutate({ id, status: newStatus });
    },
    [updateStatusMutation],
  );
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "نشط":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none rounded-full px-3 py-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {status}
          </Badge>
        );
      case "غير نشط":
        return (
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-none rounded-full px-3 py-1 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {status}
          </Badge>
        );
      case "محظور":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-none rounded-full px-3 py-1 flex items-center gap-1.5">
            <XCircle className="w-3.5 h-3.5" />
            {status}
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            {status}
          </Badge>
        );
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "مسئول نظام":
        return (
          <Badge className="bg-navy-deep text-white hover:bg-navy-deep/90 border-none rounded-full px-3 py-1">
            {role}
          </Badge>
        );
      case "محاضر":
        return (
          <Badge className="bg-primary text-white hover:bg-primary/90 border-none rounded-full px-3 py-1">
            {role}
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="text-muted-foreground border-navy-soft/20 rounded-full px-3 py-1"
          >
            {role}
          </Badge>
        );
    }
  };

  return {
    // data
    paginatedUsers,
    totalCount: users?.length || 0,
    totalPages: Math.ceil(filteredUsers.length / ITEMS_PER_PAGE),
    filteredCount: filteredUsers.length,

    // state
    searchTerm,
    debouncedSearch,
    statusFilter,
    filteredUsers,
    currentPage,
    isLoading,
    isError,

    // action
    handleSearch,
    handleStatusFilter,
    setCurrentPage,
    deleteUser,
    updateUserStatus,
    // ui
    getStatusBadge,
    getRoleBadge,
  };
}
