import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

/**
 * Wraps admin routes.
 * - Not logged in        → /admin/login
 * - Logged in, not admin → /
 * - Admin                → renders children
 */
export function RequireAdmin({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, user } = useAuthStore();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    if (user?.role !== "admin" && user?.role !== "مسئول نظام") {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
