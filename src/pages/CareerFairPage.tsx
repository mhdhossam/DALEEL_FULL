import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import SEO from "@/components/common/SEO";
import { CountdownTimer, CareerFairDetails } from "@/features/career-fair";

export default function CareerFairPage() {
  return (
    <>
      <SEO 
        title="ملتقى دليل للتوظيف والتمكين 2026 - فرصة وتدريب" 
        description="الملتقى التوظيفي الأول لتمكين وتوظيف ذوي الهمم بالتعاون مع صندوق رعاية المبتكرين والنوابغ وALX المعادي."
      />
      
      <section>
        <HeroSection
          badge="ملتقى دليل للتوظيف والتمكين 🚀"
          titleStart="Daleel Career Fair"
          titleHighlight="2026"
          subtitle="فرصة تحتاج للقدرة.. فرصة عادلة لكل موهبة تستحق أن تُرى وتصنع التغيير."
          stats={[
            { num: "+300", label: "فرصة عمل وتدريب" },
            { num: "+30", label: "شركة ومؤسسة مشاركة" },
            { num: "31/7", label: "تاريخ الملتقى" }
          ]}
        />
      </section>

      {/* Countdown Timer Section */}
      <section className="py-12 bg-card/10 border-b border-border/50 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-4xl text-center space-y-6 relative z-10">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground">الوقت المتبقي على انطلاق ملتقى التوظيف ⏱️</h3>
            <p className="text-xs text-muted-foreground">سجل بياناتك مبكراً لضمان حجز موعد مقابلتك المباشرة</p>
          </div>
          
          <CountdownTimer />
        </div>
      </section>

      {/* Main details list */}
      <CareerFairDetails />
    </>
  );
}
