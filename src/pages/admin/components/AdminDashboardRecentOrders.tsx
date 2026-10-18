import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

export interface DashboardOrder {
  id: string;
  user: string;
  course: string;
  date: string;
  amount: string;
  status: string;
}

interface AdminDashboardRecentOrdersProps {
  orders: DashboardOrder[];
  getStatusBadge: (status: string) => React.ReactNode;
}

export function AdminDashboardRecentOrders({
  orders,
  getStatusBadge,
}: AdminDashboardRecentOrdersProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-navy-deep/5 overflow-hidden border border-navy-soft/10 dark:border-slate-800 transition-colors duration-500">
      <div className="p-8 border-b border-navy-soft/10 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-heading mb-1 text-navy-deep dark:text-white">
            الطلبات الأخيرة
          </h2>
          <p className="text-sm text-muted-foreground">
            قائمة بآخر العمليات التي تمت على المنصة
          </p>
        </div>
        <Button
          variant="ghost"
          asChild
          className="rounded-xl hover:bg-navy-soft/30 dark:hover:bg-slate-800 text-navy-deep dark:text-white"
        >
          <Link to="/admin/orders">عرض الكل</Link>
        </Button>
      </div>

      <div className="p-4 md:p-8">
        <Table>
          <TableHeader>
            <TableRow className="border-navy-soft/10 dark:border-slate-800 hover:bg-transparent">
              <TableHead className="text-right font-bold text-navy-deep dark:text-white/80 py-4">
                رقم الطلب
              </TableHead>
              <TableHead className="text-right font-bold text-navy-deep dark:text-white/80">
                المستخدم
              </TableHead>
              <TableHead className="text-right font-bold text-navy-deep dark:text-white/80">
                الكورس
              </TableHead>
              <TableHead className="text-right font-bold text-navy-deep dark:text-white/80">
                التاريخ
              </TableHead>
              <TableHead className="text-right font-bold text-navy-deep dark:text-white/80">
                المبلغ
              </TableHead>
              <TableHead className="text-right font-bold text-navy-deep dark:text-white/80">
                الحالة
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                className="border-navy-soft/10 dark:border-slate-800 group transition-colors hover:bg-navy-soft/20 dark:hover:bg-slate-800/50"
              >
                <TableCell className="py-5 font-medium dark:text-white/70">
                  #{order.id}
                </TableCell>
                <TableCell className="font-semibold text-navy-deep dark:text-white">
                  {order.user}
                </TableCell>
                <TableCell className="dark:text-white/70">
                  {order.course}
                </TableCell>
                <TableCell className="text-muted-foreground dark:text-white/50">
                  {order.date}
                </TableCell>
                <TableCell className="font-bold text-navy-deep dark:text-white">
                  {order.amount} ج.م
                </TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
