import React from "react";
import { Package } from "lucide-react";
import SEO from "@/components/common/SEO";
import { StoreProductGrid } from "@/features/store";

const PINK = "linear-gradient(135deg, hsl(338, 82%, 58%) 0%, hsl(338, 100%, 72%) 100%)";
const NAVY = "linear-gradient(135deg, hsl(220, 68%, 15%) 0%, hsl(220, 60%, 22%) 100%)";

export default function StorePage() {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      <SEO 
        title="المتجر - المنتجات والكورسات" 
        description="اقتني أفضل المنتجات والكورسات العملية من متجر دليل المصمم لدعم رحلتك التعليمية." 
      />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-20 px-6" style={{ background: NAVY }}>
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: "hsl(338,82%,58%)" }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span
            className="inline-flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-full text-white/60 mb-5"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <Package size={13} /> المتجر الإلكتروني
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-snug">
            منتجات تُعيد{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: PINK }}>
              الاستقلالية
            </span>
          </h1>
          <p className="text-sm text-white/50 max-w-md mx-auto leading-7">
            أجهزة ومنتجات مساعدة عالية الجودة مختارة بعناية لتلبية احتياجات ذوي الهمم.
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <StoreProductGrid />
    </div>
  );
}