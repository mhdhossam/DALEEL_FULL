import { FileText, Clock, XCircle, MoreVertical, ShoppingBag, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Order {
  id: string;
  user: string;
  course: string;
  amount: string;
  status: string;
  date: string;
}

interface AdminOrdersTableProps {
  orders: Order[];
  allOrdersCount: number;
  onUpdateOrderStatus: (id: string, status: string) => void;
  onDeleteOrder: (id: string) => void;
  getStatusBadge: (status: string) => React.ReactNode;
}

export function AdminOrdersTable({
  orders,
  allOrdersCount,
  onUpdateOrderStatus,
  onDeleteOrder,
  getStatusBadge,
}: AdminOrdersTableProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-navy-deep/5 overflow-hidden border border-navy-soft/10 dark:border-slate-800 transition-colors duration-500">
      <div className="overflow-x-auto">
        {orders.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="border-navy-soft/10 dark:border-slate-800 hover:bg-transparent bg-navy-soft/5 dark:bg-slate-800/50">
                <TableHead className="text-right font-bold text-navy-deep dark:text-white py-6 px-6">
                  رقم الطلب
                </TableHead>
                <TableHead className="text-right font-bold text-navy-deep dark:text-white">
                  المستخدم
                </TableHead>
                <TableHead className="text-right font-bold text-navy-deep dark:text-white">
                  الكورس
                </TableHead>
                <TableHead className="text-right font-bold text-navy-deep dark:text-white">
                  المبلغ
                </TableHead>
                <TableHead className="text-right font-bold text-navy-deep dark:text-white">
                  الحالة
                </TableHead>
                <TableHead className="text-right font-bold text-navy-deep dark:text-white">
                  التاريخ
                </TableHead>
                <TableHead className="w-[80px] text-center"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order.id}
                  className="border-navy-soft/10 dark:border-slate-800 group transition-colors hover:bg-navy-soft/20 dark:hover:bg-slate-800/50"
                >
                  <TableCell className="py-5 px-6 font-bold text-navy-deep dark:text-white">
                    #{order.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase">
                        {order.user.charAt(0)}
                      </div>
                      <span className="font-medium text-navy-deep dark:text-white">
                        {order.user}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate dark:text-white/70">
                    {order.course}
                  </TableCell>
                  <TableCell className="font-bold text-navy-deep dark:text-white">
                    {order.amount}
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-muted-foreground dark:text-white/50 text-sm">
                    {order.date}
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-xl hover:bg-navy-soft/30 dark:hover:bg-slate-800 text-navy-deep dark:text-white"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-56 p-2 rounded-2xl border-navy-soft/20 dark:border-slate-700 shadow-2xl bg-white dark:bg-slate-900"
                      >
                        <DropdownMenuLabel className="px-3 py-2 text-xs font-bold text-muted-foreground dark:text-white/40 uppercase tracking-wider">
                          الإجراءات
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-navy-soft/10 dark:bg-slate-800 my-1" />
                        <DropdownMenuItem asChild className="focus:bg-navy-soft/30 dark:focus:bg-slate-800 focus:text-navy-deep dark:focus:text-white rounded-xl p-3 cursor-pointer transition-colors gap-3">
                          <Link to={`/admin/orders/${order.id}/invoice`}>
                            <FileText className="w-4 h-4" />
                            <span>عرض الفاتورة</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onUpdateOrderStatus(order.id, "ناجح")}
                          className="focus:bg-navy-soft/30 dark:focus:bg-slate-800 focus:text-navy-deep dark:focus:text-white rounded-xl p-3 cursor-pointer transition-colors gap-3"
                        >
                          <Clock className="w-4 h-4" />
                          <span>تعديل الحالة</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-navy-soft/10 dark:bg-slate-800 my-1" />
                        <DropdownMenuItem
                          onClick={() => onDeleteOrder(order.id)}
                          className="text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20 focus:text-red-700 rounded-xl p-3 cursor-pointer transition-colors gap-3"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>إلغاء الطلب</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-12 text-center">
            {allOrdersCount === 0 ? (
              <>
                <div className="w-20 h-20 rounded-full bg-navy-soft/20 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-muted-foreground opacity-50" />
                </div>
                <h3 className="text-xl font-bold text-navy-deep">لا يوجد نتائج</h3>
                <p className="text-muted-foreground">
                  لم يتم العثور على أي طلب يطابق بحثك
                </p>
              </>
            ) : (
              <>
                <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                <p className="text-muted-foreground">لا توجد طلبات في هذه الصفحة</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
