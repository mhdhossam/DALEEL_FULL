import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCompanyStore } from "@/features/hiring/store/useCompanyStore";
import CompanyCard from "@/features/hiring/components/CompanyCard";
import HiringHero from "@/features/hiring/components/HiringHero";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, SlidersHorizontal, ArrowLeft, Mail } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";

const HiringPage: React.FC = () => {
  const { companies, isLoading, fetchCompanies } = useCompanyStore();
  const industries = ["الكل", ...Array.from(new Set(companies.map((c) => c.industry)))];
  const locations = ["الكل", ...Array.from(new Set(companies.map((c) => c.location)))];
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("الكل");
  const [selectedLocation, setSelectedLocation] = useState("الكل");

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  // Optimization: Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Optimization: Memoize filtered companies
  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        company.description.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesIndustry =
        selectedIndustry === "الكل" || company.industry === selectedIndustry;
      const matchesLocation =
        selectedLocation === "الكل" ||
        company.location.includes(selectedLocation);
      return matchesSearch && matchesIndustry && matchesLocation;
    });
  }, [companies, debouncedSearch, selectedIndustry, selectedLocation]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8">
      <Helmet>
        <title>التوظيف | منصة دليل - استكشف أفضل الشركات</title>
        <meta name="description" content="استكشف كبرى الشركات المتاحة في دليل التقني والتعليمي وقدم على الوظائف المناسبة لك." />
      </Helmet>

      {/* Hero Section */}
      <HiringHero />

      {/* Career Fair Call-to-Action Card */}
      <section className="max-w-7xl mx-auto mb-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-8 rounded-[2.5rem] border border-pink-500/25 bg-gradient-to-r from-pink-500/10 to-blue-500/5 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Decorative Glowing Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-right space-y-3 max-w-2xl" dir="rtl">
            <span className="px-4 py-1.5 rounded-full bg-pink-500/20 text-pink-600 dark:text-pink-400 text-xs font-black inline-block border border-pink-500/20">
              ملتقى التوظيف والتمكين 2026 🚀
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-navy dark:text-foreground">
              ملتقى دليل للتوظيف والتمكين لذوي الهمم
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              انضم إلينا يوم 31 يوليو 2026 في مقر ALX Maadi Hub. أكثر من 30 شركة ومؤسسة رائدة توفر ما يزيد عن 300 فرصة عمل وتدريب لذوي الهمم. سجل حضورك الآن مجاناً!
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0">
            <Button
              asChild
              className="gradient-pink text-primary-foreground border-0 py-6 px-8 text-base font-black rounded-2xl shadow-lg shadow-pink-500/25 hover:scale-105 transition-transform"
            >
              <Link to="/career-fair">عرض تفاصيل الملتقى والتسجيل</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Search & Filter Bar Section */}
      <section className="max-w-7xl mx-auto mb-12 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-4 items-center justify-center p-4 bg-card/60 backdrop-blur-md rounded-2xl border border-border shadow-soft sticky top-24 z-30"
        >
          <div className="relative flex-1 min-w-[280px]">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="ابحث عن اسم الشركة أو المجال..." 
              className="pr-12 h-12 bg-background/50 border-border/50 focus:border-primary/50 transition-all text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-12 gap-2 flex-grow md:flex-grow-0">
                  <Filter className="w-4 h-4" />
                  {selectedIndustry === "الكل" ? "المجال" : selectedIndustry}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>اختر المجال</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {industries.map((ind) => (
                  <DropdownMenuItem key={ind} onClick={() => setSelectedIndustry(ind)}>
                    {ind}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-12 gap-2 flex-grow md:flex-grow-0">
                  <SlidersHorizontal className="w-4 h-4" />
                  {selectedLocation === "الكل" ? "الموقع" : selectedLocation}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>اختر الموقع</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {locations.map((loc) => (
                  <DropdownMenuItem key={loc} onClick={() => setSelectedLocation(loc)}>
                    {loc}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>
      </section>

      {/* Partner Announcement Banner */}
      <section className="max-w-7xl mx-auto mb-12 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-[2rem] border border-primary/20 bg-primary/5 backdrop-blur-md shadow-lg space-y-6"
        >
          <h2 className="text-2xl md:text-3xl font-black text-navy dark:text-foreground leading-snug">
            شراكة من أجل التمكين وتوفير الفرص 🤝
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            منصة دليل شريكة مع هذه الشركات لتوفير خدمات التوظيف للأشخاص ذوي الإعاقة (ذوي الهمم). ولمعرفة الفرص الوظيفية المتاحة حالياً والتقديم عليها، برجاء التواصل معنا مباشرة عبر الوسائل التالية:
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button
              asChild
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white border-0 py-6 px-8 text-base flex items-center justify-center gap-2 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <a
                href="https://wa.me/201155845125?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%81%D8%B1%D8%B5%20%D8%A7%D9%84%D8%AA%D9%88%D8%B8%D9%8A%D9%81%20%D8%A7%D9%84%D9%85%D8%AA%D8%A7%D8%AD%D8%A9%20%D9%84%D8%B0%D9%85%D9%8A%20%D8%A7%D9%84%D9%87%D9%85%D9%85"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97-1.861-1.868-4.339-2.897-6.97-2.899-5.437 0-9.862 4.37-9.866 9.801-.001 1.762.48 3.483 1.391 5.011l-.995 3.636 3.736-.98zm11.367-7.397c-.3-.15-1.772-.875-2.046-.975-.276-.1-.476-.15-.676.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-3.037-1.514-3.839-2.522-4.537-3.722-.175-.3-.025-.45.125-.6.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.625-.926-2.225-.244-.589-.493-.51-.676-.51-.175-.008-.375-.01-.575-.01-.2 0-.525.075-.8 0-.275-.3-1.05-1.025-1.425-2.075-.35-.975-1.05-1.175-1.25-1.225-.2-.05-.4-.05-.6 0-.2.05-.525.275-.525.675 0 .4.425.825.475.9.05.075.825 1.25 2.025 1.775.282.124.5.203.67.26.297.094.567.08.78.048.238-.035.772-.315.88-.62.11-.305.11-.567.075-.62-.035-.053-.15-.085-.45-.235z" />
                </svg>
                تواصل عبر واتساب
              </a>
            </Button>
            <Button
              asChild
              className="gradient-pink text-primary-foreground border-0 py-6 px-8 text-base flex items-center justify-center gap-2 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <a href="mailto:hr@daleelpwd.com?subject=%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%81%D8%B1%D8%B5%20%D8%A7%D9%84%D8%AA%D9%88%D8%B8%D9%8A%D9%81%20%D9%84%D8%B0%D9%88%D9%8A%20%D8%A7%D9%84%D9%87%D9%85%D9%85">
                <Mail className="w-5 h-5" />
                تواصل عبر البريد الإلكتروني
              </a>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Grid Section */}
      <section className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col h-full rounded-[32px] border border-border/50 overflow-hidden bg-card/50">
                <Skeleton className="h-32 w-full rounded-none" />
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-12 w-12 rounded-xl -mt-10 border-4 border-background" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-10 w-full rounded-xl mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-border/50">
            <h3 className="text-xl font-bold text-muted-foreground mb-2">لا توجد شركات تطابق بحثك</h3>
            <p className="text-muted-foreground">حاول تغيير كلمات البحث أو الفلاتر</p>
            <Button variant="link" className="mt-4" onClick={() => {
              setSearchTerm("");
              setSelectedIndustry("الكل");
              setSelectedLocation("الكل");
            }}>إعادة تعيين الكل</Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default HiringPage;
