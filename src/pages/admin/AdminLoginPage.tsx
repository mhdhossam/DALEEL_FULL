import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { LoginForm } from "@/features/auth";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import SEO from "@/components/common/SEO";

const AdminLoginPage = () => {
    const { isAuthenticated, user } = useAuthStore();
    const location = useLocation();

    // Already logged in as admin — send to admin dashboard
    if (isAuthenticated && (user?.role === "admin" || user?.role === "مسئول نظام")) {
        const from = (location.state as any)?.from?.pathname || "/admin";
        return <Navigate to={from} replace />;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen flex items-center justify-center bg-background p-4"
            dir="rtl"
        >
            <SEO title="تسجيل دخول المسؤول" description="لوحة تحكم دليل — المسؤولون فقط" />

            <div className="w-full max-w-md space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-2">
                        <Shield className="w-7 h-7 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold">لوحة التحكم</h1>
                    <p className="text-sm text-muted-foreground">
                        تسجيل الدخول مخصص للمسؤولين فقط
                    </p>
                </div>

                {/* Reuse the same LoginForm — useLogin already redirects admins to /admin */}
                <div className="bg-card border rounded-2xl p-6 shadow-sm">
                    <LoginForm />
                </div>
            </div>
        </motion.div>
    );
};

export default AdminLoginPage;
