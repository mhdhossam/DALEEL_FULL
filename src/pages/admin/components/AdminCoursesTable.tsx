import { Clock, DollarSign, Users, MoreVertical, BookOpen, Plus, XCircle, Search } from "lucide-react";
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
import { Course } from "@/data/staticData";

interface AdminCoursesTableProps {
  courses: Course[];
  allCoursesCount: number;
  onDisableCourse: (id: number) => void;
  getStatusBadge: (instructor: string) => React.ReactNode;
  getCategoryBadge: (category: string) => React.ReactNode;
}

export function AdminCoursesTable({
  courses,
  allCoursesCount,
  onDisableCourse,
  getStatusBadge,
  getCategoryBadge,
}: AdminCoursesTableProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-navy-deep/5 overflow-hidden border border-navy-soft/10 dark:border-slate-800 transition-colors duration-500">
      <div className="overflow-x-auto">
        {courses.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="border-navy-soft/10 dark:border-slate-800 hover:bg-transparent bg-navy-soft/5 dark:bg-slate-800/50">
                <TableHead className="text-right font-bold text-navy-deep dark:text-white py-6 px-6">
                  الكورس
                </TableHead>
                <TableHead className="text-right font-bold text-navy-deep dark:text-white">
                  المحاضر
                </TableHead>
                <TableHead className="text-right font-bold text-navy-deep dark:text-white">
                  التصنيف
                </TableHead>
                <TableHead className="text-right font-bold text-navy-deep dark:text-white">
                  السعر
                </TableHead>
                <TableHead className="text-right font-bold text-navy-deep dark:text-white">
                  الطلاب
                </TableHead>
                <TableHead className="w-[80px] text-center"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow
                  key={course.id}
                  className="border-navy-soft/10 dark:border-slate-800 group transition-colors hover:bg-navy-soft/20 dark:hover:bg-slate-800/50"
                >
                  <TableCell className="py-5 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-lg overflow-hidden border border-navy-soft/10 dark:border-slate-700 shadow-sm flex-shrink-0 bg-navy-soft/5 dark:bg-slate-800">
                        <img
                          src={course.cardImage}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-navy-deep dark:text-white group-hover:text-blue-600 transition-colors truncate">
                          {course.title}
                        </span>
                        <span className="text-xs text-muted-foreground dark:text-white/50 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {course.duration} | {course.level}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(course.instructor || "لم يحدد")}
                  </TableCell>
                  <TableCell>
                    {getCategoryBadge(course.category || "عام")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 font-bold text-navy-deep dark:text-white">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span>{course.price}</span>
                      <span className="text-xs font-normal text-muted-foreground dark:text-white/50">
                        ج.م
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground dark:text-white/50">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {course.students || 0}
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
                        className="w-56 p-2 rounded-2xl border-navy-soft/20 dark:border-slate-700 shadow-2xl bg-white dark:bg-slate-900"
                      >
                        <DropdownMenuLabel className="px-3 py-2 text-xs font-bold text-muted-foreground dark:text-white/40 uppercase tracking-wider">
                          الإجراءات
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-navy-soft/10 dark:bg-slate-800 my-1" />
                        <DropdownMenuItem asChild className="focus:bg-navy-soft/30 dark:focus:bg-slate-800 focus:text-navy-deep dark:focus:text-white rounded-xl p-3 cursor-pointer transition-colors gap-3">
                          <Link to={`/admin/courses/${course.id}`}>
                            <BookOpen className="w-4 h-4" />
                            <span>عرض تفاصيل الكورس</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-navy-soft/30 dark:focus:bg-slate-800 focus:text-navy-deep dark:focus:text-white rounded-xl p-3 cursor-pointer transition-colors gap-3">
                          <Plus className="w-4 h-4" />
                          <span>تعديل المحتوى</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-navy-soft/10 dark:bg-slate-800 my-1" />
                        <DropdownMenuItem
                          onClick={() => onDisableCourse(course.id)}
                          className="text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20 focus:text-red-700 rounded-xl p-3 cursor-pointer transition-colors gap-3"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>تعطيل الكورس</span>
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
            {allCoursesCount === 0 ? (
              <>
                <div className="w-20 h-20 rounded-full bg-navy-soft/20 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-muted-foreground opacity-50" />
                </div>
                <h3 className="text-xl font-bold text-navy-deep">لا يوجد نتائج</h3>
                <p className="text-muted-foreground">
                  لم يتم العثور على أي كورس يطابق بحثك
                </p>
              </>
            ) : (
              <>
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                <p className="text-muted-foreground">لا توجد كورسات في هذه الصفحة</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
