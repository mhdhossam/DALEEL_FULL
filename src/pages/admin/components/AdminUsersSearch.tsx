import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AdminUsersSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filteredCount: number;
}

export function AdminUsersSearch({
  searchTerm,
  onSearchChange,
  filteredCount,
}: AdminUsersSearchProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-navy-soft/10 dark:border-slate-800 transition-colors duration-500">
      <div className="relative w-full md:w-96 group">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
        <Input
          placeholder="ابحث بالاسم أو البريد الإلكتروني..."
          className="pr-12 pl-4 py-6 rounded-xl border-navy-soft/20 dark:border-slate-700 focus:border-primary focus:ring-primary/20 bg-navy-soft/5 dark:bg-slate-800/50 dark:text-white transition-all"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-3 w-full md:w-auto">
        <Button
          variant="outline"
          className="flex-1 md:flex-none py-6 rounded-xl border-navy-soft/20 dark:border-slate-700 text-navy-deep dark:text-white hover:bg-navy-soft/10 dark:hover:bg-slate-800 gap-2 font-medium"
        >
          <Filter className="w-5 h-5" />
          تصفية النتائج
        </Button>
        <div className="h-10 w-[1px] bg-navy-soft/20 dark:bg-slate-800 mx-2 hidden md:block"></div>
        <p className="text-sm font-medium text-muted-foreground whitespace-nowrap dark:text-white/60">
          إجمالي المستخدمين:{" "}
          <span className="text-navy-deep dark:text-white font-bold">
            {filteredCount}
          </span>
        </p>
      </div>
    </div>
  );
}
