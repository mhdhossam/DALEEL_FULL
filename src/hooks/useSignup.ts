import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from "axios";
import api from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

type ErrorResponse = {
  message?: string;
  email?: string[];
  name?: string[];
};

export const useSignup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  // حساب قوة كلمة المرور
  const calculateStrength = (pass: string) => {
    let strength = 0;
    if (pass.length === 0) return 0;
    if (pass.length >= 6) strength++;
    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass) || /[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    return strength;
  };
  const passwordStrength = calculateStrength(password);
  // React Query mutation للتسجيل
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return await api.post("/auth/register/", {
        username: fullName,
        email,
        password,
      });
    },
    onSuccess: () => {
      toast.success("تم إنشاء الحساب بنجاح! 🎉", {
        description: "يمكنك الآن تسجيل الدخول."
      });
      navigate("/login"); // تحويل المستخدم لصفحة تسجيل الدخول
    },
    onError: (error:AxiosError<ErrorResponse>) => {
      const message =
        error.response?.data?.email?.[0] ||
        error.response?.data?.name?.[0] ||
        error.response?.data?.message ||
        "حدث خطأ غير متوقع";
      toast.error("فشل إنشاء الحساب", { description: message });
    }
  });
  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("كلمات المرور غير متطابقة");
      return;
    }
    if (!agreeToTerms) {
      toast.error("يجب الموافقة على الشروط والأحكام");
      return;
    }
    if (isPending) return; // منع ضغط المتعدد
    mutate();
  };
  return {
    fullName, setFullName,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    agreeToTerms, setAgreeToTerms,
    passwordStrength,
    handleSubmit,
    loading: isPending
  };
};