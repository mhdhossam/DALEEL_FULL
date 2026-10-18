import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Zap, ShieldCheck, Layout as LayoutIcon } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "@/components/common/SEO";
import logo from "../../public/logoFina2.webp";
import { useAuth } from "@/contexts/AuthContext";
import { AuthSidebar, SignupForm } from "@/features/auth";

const SignupPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="min-h-screen flex flex-col md:flex-row bg-background font-body"
      dir="rtl"
    >
      <SEO
        title="إنشاء حساب جديد"
        description="انضم إلى منصة دليل، المنصة الشاملة لدعم وتمكين ذوي الإعاقة من خلال التعليم والخدمات المتكاملة - أنشئ حسابك الآن."
      />

      {/* Left Side - Hero / Feature Card */}
      <AuthSidebar
        titleStart="تمكين رحلة"
        titleHighlight="كل متعلم."
        description="انضم إلى مجتمع دليل وإدارة المناهج المتطورة من خلال محطة الإدارة الاحترافية الخاصة بنا."
      >
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group hover:border-primary/30 transition-all duration-700">
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative aspect-video rounded-3xl overflow-hidden mb-8 border border-white/5 bg-navy/80 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center animate-pulse">
              <div className="w-24 h-24 rounded-full border border-primary/20 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <img src={logo} alt="دليل" className="w-8 h-8 opacity-50" loading="lazy" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white">سهل الاستخدام</span>
            </div>
            <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white">آمن</span>
            </div>
            <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
              <LayoutIcon className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white">قابل للتوسع</span>
            </div>
          </div>
        </div>
      </AuthSidebar>

      {/* Right Side - Signup Form */}
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

        <SignupForm />
      </div>
    </motion.div>
  );
};

export default SignupPage;
