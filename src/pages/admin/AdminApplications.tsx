import React, { useEffect, useState } from "react";
import { useApplicationsStore } from "@/features/hiring/store/useApplicationsStore";
import { ApplicationStatus } from "@/features/hiring/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  FileDown, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  Clock,
  MoreVertical,
  Filter
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { toast } from "sonner";

const statusColors: Record<ApplicationStatus, string> = {
  Pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  Reviewed: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Accepted: "bg-green-500/10 text-green-600 border-green-500/20",
  Rejected: "bg-red-500/10 text-red-600 border-red-500/20",
};

const AdminApplications: React.FC = () => {
  const { applications, updateStatus, fetchApplications } = useApplicationsStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const filteredApplications = applications.filter((app) => {
    const matchesSearch = 
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id: string, status: ApplicationStatus) => {
    try {
      await updateStatus(id, status);
      toast.success(`تم تحديث الحالة إلى ${status}`);
    } catch (err) {
      toast.error("فشل تحديث الحالة");
    }
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">إدارة طلبات التوظيف</h1>
          <p className="text-muted-foreground mt-1">متابعة جميع الطلبات المقدمة من خلال المنصة.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <FileDown className="w-4 h-4" />
            تصدير البيانات
          </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="ابحث عن متقدم أو شركة..."
            className="pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 min-w-[200px]">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="تصفية حسب الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              <SelectItem value="Pending">قيد الانتظار</SelectItem>
              <SelectItem value="Reviewed">تمت المراجعة</SelectItem>
              <SelectItem value="Accepted">مقبول</SelectItem>
              <SelectItem value="Rejected">مرفوض</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="text-right">المتقدم</TableHead>
              <TableHead className="text-right">الشركة</TableHead>
              <TableHead className="text-right">تاريخ التقديم</TableHead>
              <TableHead className="text-right">السيرة الذاتية</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-center">إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.length > 0 ? (
              filteredApplications.map((app) => (
                <TableRow key={app.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold">{app.applicantName}</span>
                      <span className="text-xs text-muted-foreground">{app.applicantEmail}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-primary">{app.companyName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      {app.appliedDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="gap-2 text-primary hover:text-primary hover:bg-primary/5">
                      <FileDown className="w-4 h-4" />
                      تحميل CV
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${statusColors[app.status]} border font-medium`}>
                      {app.status === "Pending" ? "قيد الانتظار" : 
                       app.status === "Reviewed" ? "تمت المراجعة" :
                       app.status === "Accepted" ? "مقبول" : "مرفوض"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem className="gap-2" onClick={() => handleStatusChange(app.id, "Reviewed")}>
                            <Eye className="w-4 h-4 text-blue-500" />
                            تحديد كـ "تمت المراجعة"
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2" onClick={() => handleStatusChange(app.id, "Accepted")}>
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            قبول الطلب
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2" onClick={() => handleStatusChange(app.id, "Rejected")}>
                            <XCircle className="w-4 h-4 text-red-500" />
                            رفض الطلب
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-40 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Search className="w-10 h-10 mb-2 opacity-20" />
                    <p>لا توجد طلبات تطابق معايير البحث.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminApplications;
