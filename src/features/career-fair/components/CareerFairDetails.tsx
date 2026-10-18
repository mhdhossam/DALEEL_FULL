import React from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Award, 
  Users, 
  Briefcase, 
  CheckCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/sections/Section";

// Import local images using path alias
import bannerImg from "@/assets/hiring/career_fair_banner.jpg";
import invitationImg from "@/assets/hiring/career_fair_invitation.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export const CareerFairDetails: React.FC = () => {
  return (
    <>
      {/* Main Details and Images Section */}
      <Section className="relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Gallery Column */}
            <div className="lg:col-span-5 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative rounded-3xl overflow-hidden border border-border shadow-2xl bg-card"
              >
                <img 
                  src={invitationImg} 
                  alt="دعوة للمشاركة في ملتقى دليل للتوظيف" 
                  className="w-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative rounded-3xl overflow-hidden border border-border shadow-2xl max-w-sm mx-auto bg-card"
              >
                <img 
                  src={bannerImg} 
                  alt="شعار ملتقى دليل للتوظيف والشركاء الرسميين" 
                  className="w-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            </div>

            {/* Content Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-right"
              dir="rtl"
            >
              <span className="text-xs font-semibold px-4 py-1.5 rounded-full text-foreground inline-flex items-center gap-1.5 shadow-sm bg-card border border-border">
                <Award className="w-3.5 h-3.5 text-pink-500" />
                ملتقى التوظيف الشامل للقدرات الخاصة ✨
              </span>
              
              <h2 className="text-3xl md:text-5xl font-black text-foreground leading-tight">
                ملتقى دليل للتوظيف والتمكين لذوي الهمم
              </h2>
              
              <p className="text-muted-foreground leading-relaxed text-base">
                تعمل مؤسسة دليل على إعداد وتأهيل وتدريب الأشخاص ذوي الهمم وتنمية مهاراتهم وربطهم بفرص التوظيف والعمل المناسبة. يأتي ملتقى دليل للتوظيف 2026 كخطوة فعلية لربط الكفاءات وأصحاب القدرات الاستثنائية بجهات التوظيف الرائدة والشركات المهتمة باستقطاب المواهب الحقيقية ودعم التوظيف الشامل.
              </p>

              {/* General Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-5 bg-card/40 backdrop-blur-sm rounded-2xl border border-border/80 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center shrink-0 text-pink-500">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-foreground text-sm">استقطاب الكفاءات</h4>
                    <p className="text-xs text-muted-foreground">نجمع فيه أكثر من 300 صاحب قدرة استثنائية من ذوي الهمم.</p>
                  </div>
                </div>
                
                <div className="p-5 bg-card/40 backdrop-blur-sm rounded-2xl border border-border/80 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 text-blue-500">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-foreground text-sm">مشاركة واسعة</h4>
                    <p className="text-xs text-muted-foreground">بمشاركة 30+ شركة ومؤسسة رائدة في السوق المصري.</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </Section>

      {/* For Seekers & Companies split list */}
      <Section variant="muted">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12" dir="rtl">
            
            {/* For Job Seekers */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card/65 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 border border-border/80 shadow-xl space-y-6 text-right"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-border/40">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-500 font-bold shrink-0">
                  👨‍🎓
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">للباحثين عن عمل</h3>
                  <p className="text-xs text-muted-foreground">فرص حقيقية وتدريب عملي لمسار مهني أفضل</p>
                </div>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-foreground">مقابلات مباشرة مع مسؤولي التوظيف</p>
                    <p className="text-xs text-muted-foreground">فرصة عمل مقابلات حية وفورية مع ممثلي كبرى الشركات في يوم الملتقى.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-foreground">مراجعة وتحسين السيرة الذاتية (CV Support)</p>
                    <p className="text-xs text-muted-foreground">جلسات فورية لمساعدتك في كتابة وتحسين سيرتك الذاتية بشكل احترافي.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-foreground">توجيه وإرشاد مهني مخصص</p>
                    <p className="text-xs text-muted-foreground">أخصائيين لمساعدتك في تحديد المسار المهني الأنسب لقدراتك وطموحك.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-foreground">قطاعات عمل متنوعة ومراعية للاحتياجات</p>
                    <p className="text-xs text-muted-foreground">فرص عمل وتدريب تغطي مختلف التخصصات والقدرات البدنية والذهنية.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-foreground">بيئة مجهزة ومريحة بالكامل</p>
                    <p className="text-xs text-muted-foreground">المقر مجهز بكل وسائل التيسير والوصول لضمان تحرك آمن ومريح لكافة المستفيدين.</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* For Companies */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card/65 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 border border-border/80 shadow-xl space-y-6 text-right"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-border/40">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold shrink-0">
                  🏢
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">للشركات والمؤسسات</h3>
                  <p className="text-xs text-muted-foreground">شراكة، دمج، وتأثير مجتمعي إيجابي واضح</p>
                </div>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-foreground">الوصول إلى كفاءات مؤهلة ومدربة</p>
                    <p className="text-xs text-muted-foreground">اختيار موظفيك من قاعدة كفاءات مجهزة ومؤهلة مهنياً للعمل والإنتاج.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-foreground">دعم عملية التوظيف الشامل (Inclusive Hiring)</p>
                    <p className="text-xs text-muted-foreground">تطبيق معايير الدمج المهني وتفعيل التنوع داخل شركتك بسهولة ويسر.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-foreground">تعزيز المسئولية المجتمعية للمؤسسة (CSR)</p>
                    <p className="text-xs text-muted-foreground">إظهار دور شركتك الفعال والريادي في دعم قضايا دمج ذوي الهمم مجتمعياً.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-foreground">بناء بيئة عمل أكثر تنوعاً ودمجاً</p>
                    <p className="text-xs text-muted-foreground">إثراء ثقافة العمل الداخلية عن طريق دمج أصحاب المهارات المختلفة والمميزة.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-foreground">التعرف على أفضل الممارسات المهنية</p>
                    <p className="text-xs text-muted-foreground">تبادل الخبرات مع الشركات الأخرى حول آليات تشغيل وتهيئة بيئة العمل لذوي الهمم.</p>
                  </div>
                </li>
              </ul>
            </motion.div>

          </div>
        </div>
      </Section>

      {/* Location, Date and Contacts details */}
      <Section>
        <div className="container mx-auto px-6 max-w-4xl text-center space-y-12">
          
          <h3 className="text-3xl font-black text-foreground">تفاصيل الفعالية اللوجستية 📍</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" dir="rtl">
            
            {/* Location */}
            <div className="p-6 bg-card/50 border border-border/80 rounded-3xl space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-500">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-foreground">المكان</h4>
              <p className="text-sm font-semibold text-foreground">ALX Maadi Hub</p>
              <p className="text-xs text-muted-foreground leading-relaxed">مقر المعادي المجهز بأعلى وسائل التيسير والوصول والدمج.</p>
            </div>

            {/* Date */}
            <div className="p-6 bg-card/50 border border-border/80 rounded-3xl space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Calendar className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-foreground">التاريخ</h4>
              <p className="text-sm font-semibold text-foreground">31 يوليو 2026 (31/7/2026)</p>
              <p className="text-xs text-muted-foreground leading-relaxed">تفتح الأبواب للزوار والباحثين عن العمل بدءاً من الصباح.</p>
            </div>

            {/* Contacts */}
            <div className="p-6 bg-card/50 border border-border/80 rounded-3xl space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-foreground">للتواصل المباشر</h4>
              <p className="text-sm font-semibold text-foreground">01155845125</p>
              <p className="text-xs text-muted-foreground leading-relaxed">للاستفسارات اللوجستية أو مشاركة الشركات عبر الاتصال والواتساب.</p>
            </div>

          </div>

          {/* Registration CTA card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-card/45 backdrop-blur-xl border border-border/60 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden space-y-6"
          >
            {/* Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-6 flex flex-col items-center">
              <span className="px-4 py-1 bg-pink-500/10 text-pink-500 border border-pink-500/20 text-xs font-black rounded-full">
                خطوة نحو الاستقلال المهني 🤝
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-foreground">
                سجل الآن واضمن فرصة مقابلتك المباشرة!
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                التسجيل المسبق في الملتقى يضمن لك تنظيم المقابلات وتجهيز الملفات والاستفادة الكاملة من كافة فعاليات التوجيه المهني المتاحة خلال اليوم.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4 w-full justify-center max-w-lg">
                <Button 
                  asChild 
                  className="bg-[#25D366] hover:bg-[#20ba5a] text-white border-0 py-6 px-8 text-base flex-1 rounded-2xl flex items-center justify-center gap-2 font-black shadow-lg shadow-green-500/10 hover:scale-[1.02] transition-transform"
                >
                  <a
                    href={`https://wa.me/201155845125?text=${encodeURIComponent(
                      "مرحباً، أود التسجيل وحضور ملتقى دليل للتوظيف والتمكين ذوي الهمم 2026."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    التسجيل عبر الواتساب
                  </a>
                </Button>
                <Button 
                  asChild 
                  className="gradient-pink text-primary-foreground border-0 py-6 px-8 text-base flex-1 rounded-2xl flex items-center justify-center gap-2 font-black shadow-lg shadow-pink-500/20 hover:scale-[1.02] transition-transform"
                >
                  <a
                    href="https://forms.gle/LUeJ79iEJEw3fVdC7"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    تعبئة نموذج تسجيل الحضور
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>

        </div>
      </Section>
    </>
  );
};
