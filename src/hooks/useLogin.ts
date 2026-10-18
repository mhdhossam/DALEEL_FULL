import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { authService } from "@/features/auth/services/auth.service";
import { AxiosError } from "axios";
import { LoginCredentials } from "@/features/auth/types";

type ErrorResponse = { detail?: string; message?: string };

export const useLogin = () => {
    const [form, setForm] = useState<LoginCredentials>({ email: "", password: "" });
    const navigate = useNavigate();
    const { setAuth, setError, setLoading } = useAuthStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        if (!form.email || !form.password) {
            toast.error("الرجاء إدخال البريد الإلكتروني وكلمة المرور");
            return false;
        }
        if (form.password.trim().length < 6) {
            toast.error("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
            return false;
        }
        return true;
    };

    const { mutate, isPending } = useMutation({
        mutationFn: async (credentials: LoginCredentials) => {
            setLoading(true);
            return await authService.login(credentials);
        },
        onSuccess: async (data) => {
            try {
                // Persist tokens before calling /me so auth header is set
                localStorage.setItem("access_token", data.access);
                localStorage.setItem("refresh_token", data.refresh);

                const user = await authService.fetchMe();
                setAuth(user, data.access, data.refresh);

                toast.success("تم تسجيل الدخول بنجاح! 👋");
                setForm({ email: "", password: "" });
                navigate(user.role === "admin" || user.role === "مسئول نظام" ? "/admin" : "/");
            } catch {
                toast.error("فشل جلب بيانات المستخدم بعد تسجيل الدخول");
                setError("فشل جلب بيانات المستخدم");
            } finally {
                setLoading(false);
            }
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            const msg =
                error.response?.data?.detail ||
                error.response?.data?.message ||
                "بيانات الدخول غير صحيحة";
            toast.error("فشل تسجيل الدخول!", { description: msg });
            setError(msg);
            setLoading(false);
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate() || isPending) return;
        mutate(form);
    };

    return { form, handleChange, handleSubmit, loading: isPending };
};
