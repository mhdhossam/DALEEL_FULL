import { Mail, Calendar, MoreVertical, UserPlus, Shield, XCircle, Search } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  status: string;
  joinedDate: string;
}

interface AdminUsersTableProps {
  users: User[];
  allUsersCount: number; // to show "No results" appropriately
  onBanUser: (id: string) => void;
  getRoleBadge: (role: string) => React.ReactNode;
  getStatusBadge: (status: string) => React.ReactNode;
}

export function AdminUsersTable({
  users,
  allUsersCount,
  onBanUser,
  getRoleBadge,
  getStatusBadge,
}: AdminUsersTableProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-navy-deep/5 overflow-hidden border border-navy-soft/10 dark:border-slate-800 transition-colors duration-500">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-navy-soft/10 dark:border-slate-800 hover:bg-transparent bg-navy-soft/5 dark:bg-slate-800/50">
              <TableHead className="text-right font-bold text-navy-deep dark:text-white py-6 px-6">
                المستخدم
              </TableHead>
              <TableHead className="text-right font-bold text-navy-deep dark:text-white">
                الرتبة
              </TableHead>
              <TableHead className="text-right font-bold text-navy-deep dark:text-white">
                الحالة
              </TableHead>
              <TableHead className="text-right font-bold text-navy-deep dark:text-white">
                تاريخ الانضمام
              </TableHead>
              <TableHead className="w-[80px] text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                className="border-navy-soft/10 dark:border-slate-800 group transition-colors hover:bg-navy-soft/20 dark:hover:bg-slate-800/50"
              >
                <TableCell className="py-5 px-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12 border-2 border-primary/20 bg-navy-soft/10 dark:bg-slate-800">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-navy-deep dark:text-white group-hover:text-primary transition-colors truncate">
                        {user.name}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground dark:text-white/50">
                        <Mail className="w-3 h-3" />
                        <span className="truncate">{user.email}</span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell className="text-muted-foreground dark:text-white/50">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {user.joinedDate}
                    </span>
                  </div>
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
                      className="w-64 p-2 rounded-2xl border-navy-soft/20 dark:border-slate-700 shadow-2xl bg-white dark:bg-slate-900"
                    >
                      <DropdownMenuLabel className="px-3 py-2 text-xs font-bold text-muted-foreground dark:text-white/40 uppercase tracking-wider">
                        الإجراءات
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-navy-soft/10 dark:bg-slate-800 my-1" />
                      <DropdownMenuItem className="focus:bg-navy-soft/30 dark:focus:bg-slate-800 focus:text-navy-deep dark:focus:text-white rounded-xl p-3 cursor-pointer transition-colors gap-3">
                        <UserPlus className="w-4 h-4 text-primary" />
                        <span>عرض الملف الشخصي</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="focus:bg-navy-soft/30 dark:focus:bg-slate-800 focus:text-navy-deep dark:focus:text-white rounded-xl p-3 cursor-pointer transition-colors gap-3">
                        <Shield className="w-4 h-4 text-primary" />
                        <span>تعديل الصلاحيات</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-navy-soft/10 dark:bg-slate-800 my-1" />
                      <DropdownMenuItem
                        onClick={() => onBanUser(user.id)}
                        className="text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20 focus:text-red-700 rounded-xl p-3 cursor-pointer transition-colors gap-3"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>حظر المستخدم</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {allUsersCount === 0 && (
        <div className="flex flex-col items-center justify-center p-20 text-center">
          <div className="w-20 h-20 rounded-full bg-navy-soft/20 flex items-center justify-center mb-4">
            <Search className="w-10 h-10 text-muted-foreground opacity-50" />
          </div>
          <h3 className="text-xl font-bold text-navy-deep">لا يوجد نتائج</h3>
          <p className="text-muted-foreground">
            لم يتم العثور على أي مستخدم يطابق بحثك
          </p>
        </div>
      )}
    </div>
  );
}
