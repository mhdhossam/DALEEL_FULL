import React from "react";
import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";
import { Section } from "@/components/sections/Section";

export const VisionMission: React.FC = () => {
  return (
    <Section variant="muted" className="relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch relative z-10">
        
        {/* Vision (lg:col-span-5) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 flex flex-col justify-between p-8 md:p-10 bg-gradient-to-br from-navy/10 via-navy/5 to-transparent backdrop-blur-md rounded-[2.5rem] border border-primary/10 shadow-lg relative overflow-hidden"
        >
          {/* Glowing gradient background block */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="w-14 h-14 gradient-pink rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-pink-500/20">
              <Eye className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl font-black mb-4 text-foreground">رؤيتنا</h2>
            <p className="text-xl text-foreground/80 leading-relaxed font-medium">
              أن نكون المنصة الرائدة عربياً في تمكين ذوي الإعاقة وتوفير حلول شاملة تدعم استقلاليتهم وتعزز مشاركتهم الفعالة في المجتمع.
            </p>
          </div>
          
          {/* Bottom accent indicator */}
          <div className="mt-8 w-16 h-1 gradient-pink rounded-full" />
        </motion.div>

        {/* Mission (lg:col-span-7) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 p-8 md:p-10 bg-card rounded-[2.5rem] border border-border shadow-md flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 gradient-pink rounded-2xl flex items-center justify-center shadow-md shadow-pink-500/20">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-black text-foreground">رسالتنا</h2>
            </div>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              نسعى جاهدين لتحقيق التمكين الكامل وتكافؤ الفرص لذوي الهمم في المجتمع المصري من خلال خدماتنا الشاملة:
            </p>

            {/* Bullet Points */}
            <ul className="space-y-4">
              {[
                "دورات تدريبية متخصصة وكورسات لتنمية الحرف اليدوية.",
                "منح دراسية مجانية وفرص تأهيل أكاديمي وبحثي.",
                "تسويق وعرض منتجات ذوي الهمم لدعم استقلالهم المالي والعملي.",
                "جلسات إرشادية وتأهيلية (أونلاين وأوفلاين) عبر تطبيق دليل.",
                "توفير فرص عمل حقيقية ودمج كامل في سوق العمل المصري طبقاً لرؤية مصر."
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3.5 text-foreground/90 font-medium"
                >
                  {/* Small glowing checkmark bullet */}
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0 shadow-md shadow-primary/40" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

      </div>
    </Section>
  );
};
