import React from "react";
import { useQuery } from "@tanstack/react-query";
import HeroSection from "@/components/sections/HeroSection";
import SEO from "@/components/common/SEO";
import { ScholarshipDetails } from "@/features/scholarships";
import { getScholarships } from "@/lib/contentApi";

export default function ScholarshipsPage() {
  const { data: scholarships = [], isLoading, isError } = useQuery({ queryKey: ["public-scholarships"], queryFn: getScholarships });
  return <>
    <SEO title="المنح الدراسية - فرص تدريبية لتمكين ذوي الهمم" description="استكشف المنح والفرص التدريبية المتاحة عبر منصة دليل." />
    <section><HeroSection badge="منح وتأهيل لسوق العمل 🌟" titleStart="استعد للمستقبل المهني مع " titleHighlight=" منحة دليل " subtitle="برامج وفرص يتم تحديثها من لوحة تحكم دليل." stats={[]} /></section>
    {isLoading ? <div className="py-24 text-center text-muted-foreground">جاري تحميل المنح...</div> : isError ? <div className="py-24 text-center text-destructive">تعذر تحميل المنح.</div> : <ScholarshipDetails scholarships={scholarships} />}
  </>;
}
