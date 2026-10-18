import { Bell, Lock, Smartphone } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const preferences = [
  {
    icon: Bell,
    title: "إشعارات البريد الإلكتروني",
    desc: "تلقي رسائل حول التحديثات الهامة والطلبات الجديدة.",
    checked: true,
  },
  {
    icon: Smartphone,
    title: "إشعارات المتصفح",
    desc: "تلقي تنبيهات من المتصفح عند وجود نشاط جديد.",
    checked: false,
  },
  {
    icon: Lock,
    title: "توثيق ثنائي (2FA)",
    desc: "إضافة طبقة حماية إضافية لحسابك باستخدام هاتفك.",
    checked: false,
  },
];

export function AdminPreferencesCard() {
  return (
    <Card className="border-none shadow-xl shadow-navy-deep/5 rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-navy-soft/10 dark:border-slate-800 transition-colors duration-500">
      <CardHeader className="p-8 pb-4">
        <CardTitle className="text-2xl font-bold text-navy-deep dark:text-white underline decoration-primary/30 decoration-4 underline-offset-8">
          التفضيلات
        </CardTitle>
        <CardDescription className="dark:text-white/60">
          إدارة كيفية تعاملك مع المنصة.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-4 space-y-6">
        <div className="space-y-4">
          {preferences.map((pref, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-2xl hover:bg-navy-soft/5 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-navy-soft/10 dark:hover:border-slate-700 group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-navy-soft/10 dark:bg-slate-800 text-navy-deep dark:text-white group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <pref.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-navy-deep dark:text-white">
                    {pref.title}
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-white/40">
                    {pref.desc}
                  </p>
                </div>
              </div>
              <Switch
                checked={pref.checked}
                className="data-[state=checked]:bg-primary"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
