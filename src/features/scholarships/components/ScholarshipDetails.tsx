import React from "react";
import { GraduationCap, Calendar, CheckCircle, Award, ShieldCheck, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "@/components/sections/Section";
import { Scholarship } from "@/lib/contentApi";

export const ScholarshipDetails: React.FC<{ scholarships: Scholarship[] }> = ({ scholarships }) => (
  <Section>
    <div className="max-w-5xl mx-auto space-y-8">
      {scholarships.map((scholarship, index) => (
        <motion.article key={scholarship.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.05 }} className="bg-card/45 backdrop-blur-xl border border-border/60 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-8" dir="rtl">
            <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-border/30 text-center md:text-right">
              <div className="w-16 h-16 gradient-pink rounded-3xl flex items-center justify-center flex-shrink-0 shadow-lg"><GraduationCap className="w-8 h-8 text-primary-foreground" /></div>
              <div className="space-y-1"><h2 className="text-2xl md:text-3xl font-black text-foreground">{scholarship.title}</h2><p className="text-sm text-pink-500 font-bold">{scholarship.org}</p></div>
            </div>
            <div className="space-y-4"><h3 className="text-lg font-bold flex items-center gap-2"><Award className="w-5 h-5 text-pink-500" />عن المنحة</h3><p className="text-base text-muted-foreground leading-relaxed">{scholarship.desc}</p></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-background/40 border border-border/50 rounded-2xl p-6 space-y-3"><h4 className="font-bold flex items-center gap-2 text-sm"><Calendar className="w-4 h-4 text-pink-500" />آخر موعد للتقديم</h4><p className="text-2xl font-black">{scholarship.deadline ? new Date(scholarship.deadline).toLocaleDateString("ar-EG") : "مفتوح"}</p></div>
              <div className="bg-background/40 border border-border/50 rounded-2xl p-6 space-y-3"><h4 className="font-bold flex items-center gap-2 text-sm"><MapPin className="w-4 h-4 text-pink-500" />الموقع</h4><p className="text-2xl font-black">{scholarship.location || "عن بُعد"}</p></div>
            </div>
            <div className="space-y-4"><h3 className="text-lg font-bold flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-pink-500" />شروط التقديم والقبول</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4">{scholarship.requirements.map((req) => <div key={req} className="flex items-start gap-3 bg-background/30 p-4 rounded-xl border border-border/40"><CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /><p className="text-sm font-bold">{req}</p></div>)}</div></div>
          </div>
        </motion.article>
      ))}
      {!scholarships.length && <div className="py-20 text-center text-muted-foreground">لا توجد منح متاحة حالياً.</div>}
    </div>
  </Section>
);
