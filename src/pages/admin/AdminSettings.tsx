import { Settings, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

// Modular components
import { AdminProfileSidebar } from "./components/AdminProfileSidebar";
import { AdminPersonalInfoForm } from "./components/AdminPersonalInfoForm";
import { AdminPreferencesCard } from "./components/AdminPreferencesCard";

export default function AdminSettings() {
  return (
    <div className="space-y-8 animate-fadeUp rtl">
      <SEO
        title="إعدادات المنصة"
        description="تعديل إعدادات الحساب، التفضيلات والخصوصية في منصة دليل."
      />
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-navy-deep p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gray-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <Settings className="w-8 h-8 text-gray-300 shadow-sm" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-heading mb-1">الإعدادات</h1>
            <p className="text-white/70">تخصيص إعدادات الحساب والمنصة</p>
          </div>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 py-6 h-auto shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 relative z-10">
          <Save className="ml-2 w-5 h-5" />
          حفظ التغييرات
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <AdminProfileSidebar />

        {/* Settings Forms */}
        <div className="lg:col-span-2 space-y-8">
          <AdminPersonalInfoForm />
          <AdminPreferencesCard />
        </div>
      </div>
    </div>
  );
}
