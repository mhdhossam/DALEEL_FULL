import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface StatCard {
  title: string;
  value: string;
  icon: React.ElementType;
  trend: string;
  color: string;
}

interface AdminDashboardStatsProps {
  stats: StatCard[];
}

export function AdminDashboardStats({ stats }: AdminDashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="border-none shadow-xl shadow-navy-deep/5 hover:shadow-navy-deep/10 transition-all duration-300 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 group"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div
              className={`p-3 rounded-xl transition-transform duration-500 group-hover:scale-110 ${stat.color}`}
            >
              <stat.icon className="w-5 h-5" />
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="text-3xl font-bold flex items-baseline gap-2 dark:text-white">
              {stat.value}
              <span className="text-xs font-semibold text-green-500 flex items-center bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-full">
                <ArrowUpRight className="w-3 h-3 ml-1" />
                {stat.trend}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
