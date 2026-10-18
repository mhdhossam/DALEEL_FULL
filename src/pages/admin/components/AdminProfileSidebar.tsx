import { User, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function AdminProfileSidebar() {
  return (
    <div className="lg:col-span-1 space-y-6">
      <Card className="border-none shadow-xl shadow-navy-deep/5 rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border dark:border-slate-800 transition-colors duration-500">
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-gradient-pink p-1 shadow-2xl transition-transform duration-500 group-hover:scale-105">
                <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                  <User className="w-16 h-16 text-navy-deep dark:text-white" />
                </div>
              </div>
              <Button
                size="icon"
                className="absolute bottom-0 right-0 rounded-full w-10 h-10 shadow-lg border-4 border-white dark:border-slate-900 bg-primary hover:bg-primary/90"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <h2 className="mt-6 text-2xl font-bold text-navy-deep dark:text-white">
              أدمن دليل
            </h2>
            <p className="text-muted-foreground dark:text-white/60">
              مدير عام المنصة
            </p>

            <div className="mt-8 w-full space-y-3">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-navy-soft/5 dark:bg-slate-800/50 border border-navy-soft/10 dark:border-slate-800">
                <span className="text-sm font-medium text-muted-foreground dark:text-white/40">
                  تاريخ الانضمام
                </span>
                <span className="text-sm font-bold text-navy-deep dark:text-white">
                  مارس 2024
                </span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-navy-soft/5 dark:bg-slate-800/50 border border-navy-soft/10 dark:border-slate-800">
                <span className="text-sm font-medium text-muted-foreground dark:text-white/40">
                  آخر ظهور
                </span>
                <span className="text-sm font-bold text-green-600">
                  نشط الآن
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
