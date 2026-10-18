import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/useLogin";

const LabelSmall = ({
  children,
  htmlFor,
  className = "",
}: {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}) => (
  <Label
    htmlFor={htmlFor}
    className={`text-[10px] uppercase font-bold text-muted-foreground tracking-widest px-1 ${className}`}
  >
    {children}
  </Label>
);

export const LoginForm: React.FC = () => {
  const { form, handleChange, handleSubmit, loading: isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-sm space-y-8 text-right" dir="rtl">
      <div className="space-y-3 text-right">
        <h2 className="text-4xl font-black tracking-tight text-navy dark:text-white">أهلاً بك مجدداً</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          يرجى إدخال بيانات الاعتماد الخاصة بك للوصول إلى المحطة الإدارية.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2 text-right">
          <LabelSmall htmlFor="email">البريد الإلكتروني</LabelSmall>
          <Input
            id="email"
            type="text"
            value={form.email}
            onChange={handleChange}
            name="email"
            placeholder="البريد الإلكتروني أو اسم المستخدم"
            className="bg-muted/30 border-none h-14 text-right px-4 focus-visible:ring-primary/20 transition-all rounded-xl"
            aria-label="البريد الإلكتروني"
            required
          />
        </div>

        <div className="space-y-2 text-right">
          <div className="flex justify-between items-center mb-1">
            <Link
              to="/forgot-password"
              title="نسيت كلمة المرور؟"
              className="text-[10px] font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-widest"
            >
              نسيت كلمة المرور؟
            </Link>
            <LabelSmall htmlFor="password">كلمة المرور</LabelSmall>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              name="password"
              placeholder="••••••••"
              className="bg-muted/30 border-none h-14 text-right px-4 pl-12 focus-visible:ring-primary/20 transition-all rounded-xl"
              aria-label="كلمة المرور"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-primary transition-colors focus:outline-none"
              aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-14 text-base font-black bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all rounded-xl"
          aria-label="تسجيل الدخول إلى لوحة التحكم"
          disabled={isPending}
        >
          {isPending ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
        ليس لديك حساب؟{" "}
        <Link
          to="/register"
          title="سجل الآن"
          className="text-primary font-black hover:underline underline-offset-4"
          aria-label="إنشاء حساب جديد"
        >
          سجل الآن
        </Link>
      </p>

      <div className="pt-12 text-center text-[9px] text-muted-foreground/40 font-bold tracking-[0.2em] uppercase">
        © 2026 نظام دليل للتعليم الشامل
      </div>
    </div>
  );
};
