import React from "react";
import { motion } from "framer-motion";
import { Search, Briefcase, Building2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const HiringHero: React.FC = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-20 px-4">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-navy/10 blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
      </div>

      <div className="container max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-right space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-bold animate-fade-in">
              <Briefcase className="w-4 h-4" />
              <span>أكثر من 150 فرصة عمل متاحة الآن</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-7xl font-black leading-[1.1] text-navy dark:text-foreground">
              ابحث عن <span className="text-gradient-pink italic">شغفك</span>{" "}
              <br />
              في المكان{" "}
              <span className="underline decoration-primary/30 underline-offset-8">
                الصحيح.
              </span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:ml-auto">
              منصة دليل تجمعك بأفضل الشركات التي تدعم مبادئ الشمولية والوصول
              الرقمي. نحن نؤمن بأن كل شخص يستحق فرصة عادلة للنجاح.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 md:gap-8 pt-4">
              <div className="text-center lg:text-right min-w-[100px]">
                <div className="text-3xl font-black text-navy dark:text-foreground">
                  +15
                </div>
                <div className="text-sm text-muted-foreground font-bold">
                  شركة شريكة
                </div>
              </div>
              <div className="hidden md:block w-px h-10 bg-border" />
              <div className="text-center lg:text-right min-w-[100px]">
                <div className="text-3xl font-black text-navy dark:text-foreground">
                  +150
                </div>
                <div className="text-sm text-muted-foreground font-bold">
                  فرصة عمل
                </div>
              </div>
              <div className="hidden md:block w-px h-10 bg-border" />
              <div className="text-center lg:text-right min-w-[100px]">
                <div className="text-3xl font-black text-navy dark:text-foreground">
                  95%
                </div>
                <div className="text-sm text-muted-foreground font-bold">
                  نسبة النجاح
                </div>
              </div>
            </div>
          </motion.div>

          {/* Visual Element / Floating Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              {/* Main Decorative Image Shadow */}
              <div className="absolute inset-4 rounded-[40px] bg-gradient-to-br from-primary/30 to-navy/30 blur-2xl rotate-6 group-hover:rotate-0 transition-transform duration-700" />

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-10 right-0 w-64 p-6 rounded-3xl bg-white/80 dark:bg-card/80 backdrop-blur-xl border border-white dark:border-border shadow-2xl z-20"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-navy dark:text-foreground">
                      شركة دليل
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ذوي الهمم
                    </div>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-muted/30 rounded-full overflow-hidden">
                  <div className="h-full w-[80%] bg-primary rounded-full" />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute bottom-10 left-0 w-64 p-6 rounded-3xl bg-navy/90 backdrop-blur-xl text-white shadow-2xl z-20"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="text-right text-white">
                    <div className="font-bold">موقع العمل</div>
                    <div className="text-xs text-white/60">مدينة نصر، مصر</div>
                  </div>
                </div>
                <div className="flex -space-x-2 rtl:space-x-reverse">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-navy bg-primary/20 flex items-center justify-center text-[10px] font-bold"
                    >
                      {i}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-navy bg-white/20 flex items-center justify-center text-[10px] font-bold">
                    +١٢
                  </div>
                </div>
              </motion.div>

              <div className="absolute inset-0 rounded-[40px] border-2 border-dashed border-primary/20 rotate-12 -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HiringHero;
