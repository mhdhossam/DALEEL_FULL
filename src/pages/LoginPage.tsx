import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "@/components/common/SEO";
import logo from "../../public/logoFina2.webp";
import { useAuth } from "@/contexts/AuthContext";
import { AuthSidebar, LoginForm } from "@/features/auth";
import { useWelcomeToast } from "@/hooks/useWelcomeToast";

const LoginPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(user?.role === "admin" ? "/admin" : "/");
    }
  }, [isAuthenticated, user, navigate]);

  useWelcomeToast();

  const stats = [
    { num: "3.2k+", label: "من المنسقين النشطين" },
    { num: "98%", label: "معدل الاستبقاء" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="min-h-screen flex flex-col md:flex-row bg-background"
      dir="rtl"
    >
      <SEO
        title="تسجيل الدخول"
        description="قم بتسجيل الدخول إلى منصة دليل التعليمية للوصول إلى كورساتك ومتابعة تقدمك."
      />

      {/* Left Side - Hero/Branding */}
      <AuthSidebar
        titleStart="تمكين مستقبل"
        titleHighlight="تنسيق المعرفة."
        description="محطة إدارة متطورة مصممة للمؤسسات التعليمية الرائدة. إدارة المحتوى بسلاسة، تتبع التفاعل، وإلهام المتعلمين."
      >
        <div className="flex gap-12 items-end justify-start">
          {stats.map((stat, index) => (
            <React.Fragment key={stat.label}>
              <div className="flex flex-col text-right">
                <div className="text-4xl font-black italic bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
                  {stat.num}
                </div>
                <div className="text-xs text-white/40 uppercase tracking-widest font-bold mt-1">
                  {stat.label}
                </div>
              </div>
              {index < stats.length - 1 && (
                <div className="h-12 w-px bg-white/10 self-center" />
              )}
            </React.Fragment>
          ))}
        </div>
      </AuthSidebar>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative">
        {/* Back to Home Button */}
        <Link
          to="/"
          className="absolute top-8 left-8 hidden md:flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group"
          aria-label="الرجوع للرئيسية"
        >
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          الرجوع للرئيسية
        </Link>
        {/* Mobile Logo */}
        <div className="md:hidden absolute top-8 right-8">
          <img src={logo} alt="شعار دليل" className="w-12 h-12 object-contain" loading="lazy" />
        </div>

        <LoginForm />

        {/* Subtle background glow for the form side */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      </div>
    </motion.div>
  );
};

export default LoginPage;
