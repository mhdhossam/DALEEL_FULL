import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCompanyStore } from "@/features/hiring/store/useCompanyStore";
import { Company } from "@/features/hiring/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import ApplyModal from "@/features/hiring/components/ApplyModal";
import {
  ArrowRight,
  MapPin,
  Globe,
  Users,
  Info,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const CompanyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCompanyById } = useCompanyStore();
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      if (!id) return;
      setIsLoading(true);
      const data = await getCompanyById(id);
      if (data) {
        setCompany(data);
      } else {
        toast.error("الشركة غير موجودة");
        navigate("/hiring");
      }
      setIsLoading(false);
    };
    fetch();
  }, [id, getCompanyById, navigate]);

  if (isLoading) {
    return (
      <div className="pt-24 px-4 max-w-7xl mx-auto space-y-8">
        <Skeleton className="h-64 w-full rounded-[40px]" />
        <div className="flex gap-6">
          <Skeleton className="h-32 w-32 rounded-[24px]" />
          <div className="space-y-4 flex-1">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-6 w-1/4" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-40 w-full rounded-3xl" />
            <Skeleton className="h-60 w-full rounded-3xl" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-80 w-full rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!company) return null;

  return (
    <div className="min-h-screen pb-20 bg-background">
      <Helmet>
        <title>{company.name} | دليل الشركات الرائدة</title>
        <meta name="description" content={company.shortDescription} />
      </Helmet>

      {/* Hero Banner Section */}
      <section className="relative min-h-[450px] md:h-[500px] flex items-end">
        <div className="absolute inset-0">
          <img
            src={company.banner}
            alt={company.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/40" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-8 md:py-12">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 text-center md:text-right">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="p-3 bg-background/80 backdrop-blur-xl rounded-[32px] shadow-2xl border border-white/20 z-10 flex-shrink-0"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="w-24 h-24 md:w-40 md:h-40 rounded-[20px] object-contain bg-white p-2 mx-auto md:mx-0"
              />
            </motion.div>

            <div className="flex-1 space-y-4 pb-4 w-full">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center md:justify-start gap-3 flex-wrap"
              >
                <Link
                  to="/hiring"
                  className="px-4 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all text-sm font-bold flex items-center gap-2 group"
                >
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  اكتشف الشركات
                </Link>
                <Badge
                  variant="secondary"
                  className="px-4 py-1.5 rounded-full border-none font-bold"
                >
                  {company.industry}
                </Badge>
              </motion.div>

              <div className="space-y-2 text-center md:text-right">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-6xl font-black text-navy dark:text-foreground"
                >
                  {company.name}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-base md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto md:ml-auto md:mr-0"
                >
                  {company.shortDescription}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-muted-foreground pt-4"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="font-bold">{company.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="font-bold">جهة توظيف موثوقة</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Content Area */}
        <div className="lg:col-span-2 space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-right"
          >
            <div className="inline-flex items-center gap-3 text-2xl font-black text-navy dark:text-foreground relative">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Info className="w-6 h-6" />
              </div>
              <h2>نظرة عامة</h2>
              <div className="absolute -bottom-2 right-0 w-12 h-1.5 bg-primary/30 rounded-full" />
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed whitespace-pre-line font-medium text-justify">
              {company.description}
            </p>
          </motion.div>

          {/* Social Proof / Culture Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-[32px] bg-muted/30 border border-border/50 space-y-4">
              <Briefcase className="w-10 h-10 text-primary opacity-50" />
              <h3 className="text-xl font-black italic">فرص متساوية</h3>
              <p className="text-muted-foreground leading-relaxed">
                نحن نلتزم بتطوير بيئة عمل شاملة تدعم جميع الكوادر وتمكنهم من
                خلال التكنولوجيا والوصول الرقمي.
              </p>
            </div>
            <div className="p-8 rounded-[32px] bg-primary/5 border border-primary/10 space-y-4">
              <Users className="w-10 h-10 text-primary opacity-50" />
              <h3 className="text-xl font-black italic">بيئة عمل رائدة</h3>
              <p className="text-muted-foreground leading-relaxed">
                انضم إلى فريق عمل شغوف يسعى للابتكار وتغيير المشهد الرقمي في مصر
                والشرق الأوسط.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Sticky Sidebar CTA */}
        <aside className="relative lg:-mt-24 z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-[40px] bg-card border border-border shadow-2xl sticky top-28 space-y-8"
          >
            <div className="space-y-6">
              <h3 className="font-black text-2xl flex items-center gap-3">
                <Building2 className="w-7 h-7 text-primary" />
                تفاصيل التواصل
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">
                      الموقع الإلكتروني
                    </p>
                    <a
                      href={`https://${company.website}`}
                      target="_blank"
                      className="font-bold hover:text-primary transition-colors"
                    >
                      {company.website}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">
                      حجم الشركة
                    </p>
                    <p className="font-bold">{company.teamSize}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">
                      المقر الرئيسي
                    </p>
                    <p className="font-bold">{company.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">
                      تاريخ التأسيس
                    </p>
                    <p className="font-bold">منذ أكثر من ١٠ سنوات</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <Button
                onClick={() => setIsApplyModalOpen(true)}
                className="w-full h-16 text-xl font-black bg-primary hover:bg-primary/90 text-white rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                قدم الآن للشركة
              </Button>
              {/* <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 h-12 rounded-xl font-bold gap-2">
                        <Share2 className="w-4 h-4" />
                        مشاركة
                    </Button>
                    <Button variant="outline" className="flex-1 h-12 rounded-xl font-bold gap-2">
                        متابعة
                    </Button>
                </div> */}
            </div>

            <p className="text-center text-[10px] text-muted-foreground font-bold leading-relaxed px-4">
              بتقديم طلبك، أنت توافق على معالجة بياناتك من قبل شركة{" "}
              {company.name} للتوظيف.
            </p>
          </motion.div>
        </aside>
      </section>

      {/* Apply Modal */}
      <ApplyModal
        company={company}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </div>
  );
};

export default CompanyDetailsPage;
