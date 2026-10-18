import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useSignup } from "@/hooks/useSignup";

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

export const SignupForm: React.FC = () => {
  const {
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    agreeToTerms,
    setAgreeToTerms,
    passwordStrength,
    handleSubmit,
  } = useSignup();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const strengthConfig = [
    { label: "ضعيفة جداً", color: "bg-red-500", textColor: "text-red-500" },
    { label: "ضعيفة", color: "bg-orange-500", textColor: "text-orange-500" },
    { label: "متوسطة", color: "bg-yellow-500", textColor: "text-yellow-500" },
    { label: "قوية جداً", color: "bg-primary", textColor: "text-primary" },
  ];

  const currentStrength =
    passwordStrength > 0 ? strengthConfig[passwordStrength - 1] : null;

  return (
    <div className="w-full max-w-sm space-y-8 text-right" dir="rtl">
      <div className="space-y-2 text-right">
        <h2 className="text-4xl font-black tracking-tight text-navy dark:text-white">
          دليل <span className="text-primary">الإدارة</span>
        </h2>
        <p className="text-muted-foreground text-sm font-medium">
          أنشئ حسابك الإداري الجديد للبدء.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-1.5 text-right">
          <LabelSmall htmlFor="fullName">الاسم الكامل</LabelSmall>
          <div className="relative">
            <Input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="أدخل اسمك بالكامل"
              className="bg-muted/30 border-none h-14 text-right px-4 pr-12 focus-visible:ring-primary/20 transition-all rounded-2xl"
              aria-label="الاسم الكامل"
              required
            />
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none opacity-20">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-1.5 text-right">
          <LabelSmall htmlFor="email">بريد العمل الإلكتروني</LabelSmall>
          <div className="relative">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="bg-muted/30 border-none h-14 text-right px-4 pr-12 focus-visible:ring-primary/20 transition-all rounded-2xl"
              aria-label="البريد الإلكتروني"
              required
            />
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none opacity-20">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-1.5 text-right">
          <LabelSmall htmlFor="password">كلمة المرور</LabelSmall>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-muted/30 border-none h-14 text-right px-4 pr-12 pl-12 focus-visible:ring-primary/20 transition-all rounded-2xl"
              aria-label="كلمة المرور"
              required
            />
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none opacity-20">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-primary transition-colors focus:outline-none"
              aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Dynamic Password Strength Indicator */}
          <div className="flex gap-1.5 mt-2 px-1">
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  level <= passwordStrength
                    ? currentStrength?.color
                    : "bg-muted/30"
                }`}
              />
            ))}
          </div>
          {currentStrength && (
            <p
              className={`text-[9px] font-bold uppercase mt-1 tracking-wider mr-1 transition-all duration-300 ${currentStrength.textColor}`}
            >
              {currentStrength.label}
            </p>
          )}
        </div>

        <div className="space-y-1.5 text-right">
          <LabelSmall htmlFor="confirmPassword">تأكيد كلمة المرور</LabelSmall>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-muted/30 border-none h-14 text-right px-4 pr-12 pl-12 focus-visible:ring-primary/20 transition-all rounded-2xl"
              aria-label="تأكيد كلمة المرور"
              required
            />
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none opacity-20">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-primary transition-colors focus:outline-none"
              aria-label={showConfirmPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 justify-end py-1">
          <Label htmlFor="terms" className="text-xs text-muted-foreground font-medium cursor-pointer">
            أوافق على{" "}
            <Link to="/terms" className="text-primary hover:underline">
              شروط الخدمة
            </Link>{" "}
            و{" "}
            <Link to="/privacy" className="text-primary hover:underline">
              سياسة الخصوصية
            </Link>
          </Label>
          <Checkbox
            id="terms"
            checked={agreeToTerms}
            onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
            className="border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full h-14 text-base font-black bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all rounded-2xl flex items-center justify-center gap-2"
          aria-label="تسجيل الحساب"
        >
          تسجيل الحساب
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground font-medium">
        لديك حساب بالفعل؟{" "}
        <Link to="/login" title="تسجيل الدخول" className="text-primary font-bold hover:underline underline-offset-4">
          تسجيل الدخول
        </Link>
      </p>
    </div>
  );
};
