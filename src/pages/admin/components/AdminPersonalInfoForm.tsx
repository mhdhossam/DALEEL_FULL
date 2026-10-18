import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AdminPersonalInfoForm() {
  return (
    <Card className="border-none shadow-xl shadow-navy-deep/5 rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border dark:border-slate-800 transition-colors duration-500">
      <CardHeader className="p-8 border-b border-navy-soft/10 dark:border-slate-800">
        <CardTitle className="text-xl font-bold flex items-center gap-3 text-navy-deep dark:text-white">
          <User className="w-6 h-6 text-primary" />
          المعلومات الشخصية
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-navy-deep dark:text-white/80 mr-1">
              الاسم بالكامل
            </label>
            <Input
              defaultValue="أدمن دليل"
              className="py-6 rounded-xl border-navy-soft/20 dark:border-slate-700 bg-navy-soft/5 dark:bg-slate-800/50 dark:text-white focus:ring-primary/20 transition-all font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-navy-deep dark:text-white/80 mr-1">
              البريد الإلكتروني
            </label>
            <Input
              defaultValue="admin@daleel.com"
              className="py-6 rounded-xl border-navy-soft/20 dark:border-slate-700 bg-navy-soft/5 dark:bg-slate-800/50 dark:text-white focus:ring-primary/20 transition-all font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-navy-deep dark:text-white/80 mr-1">
              رقم الهاتف
            </label>
            <Input
              defaultValue="+20 123 456 7890"
              className="py-6 rounded-xl border-navy-soft/20 dark:border-slate-700 bg-navy-soft/5 dark:bg-slate-800/50 dark:text-white focus:ring-primary/20 transition-all font-medium text-left"
              dir="ltr"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-navy-deep dark:text-white/80 mr-1">
              المسمى الوظيفي
            </label>
            <Input
              defaultValue="General Manager"
              className="py-6 rounded-xl border-navy-soft/20 dark:border-slate-700 bg-navy-soft/5 dark:bg-slate-800/50 dark:text-white focus:ring-primary/20 transition-all font-medium text-left"
              dir="ltr"
            />
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-10 py-6 h-auto shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.02]">
            حفظ التغييرات
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
