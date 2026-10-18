import React from "react";
import { FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CourseSidebarProps {
  course: {
    title: string;
    duration: string;
    level: string;
    price: string;
    students: number | string;
    instructor: string;
  };
  category?: string;
}

export const CourseSidebar: React.FC<CourseSidebarProps> = ({ course, category }) => {
  const isChildrenCourse = category === "كورسات للأطفال";
  const isPsychologicalCourse = category === "كورسات للتأهيل النفسي";

  return (
    <div className="text-right" dir="rtl">
      <div className="sticky top-24 bg-card rounded-xl p-6 border border-border shadow-sm">
        <h3 className="text-xl font-bold mb-4">معلومات الكورس</h3>
        <div className="space-y-3 mb-6 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">المدة</span>
            <span className="font-medium">{course.duration}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">المستوى</span>
            <span className="font-medium">{course.level}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">السعر</span>
            <span className="font-medium">{course.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">الطلاب</span>
            <span className="font-medium">{course.students}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">المدرب</span>
            <span className="font-medium">{course.instructor}</span>
          </div>
        </div>
        <div className="space-y-3 pt-2">
          <span className="text-xs font-semibold text-muted-foreground block mb-2 text-center">
            للتسجيل والاستفسار في الكورس:
          </span>
          
          {isChildrenCourse ? (
            // Children's courses: WhatsApp ONLY
            <Button
              asChild
              className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white border-0 py-6 text-base flex items-center justify-center gap-2 rounded-xl"
            >
              <a
                href={`https://wa.me/201155845125?text=${encodeURIComponent(
                  `مرحباً، أود الاستفسار والتسجيل في كورس الأطفال: ${course.title}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97-1.861-1.868-4.339-2.897-6.97-2.899-5.437 0-9.862 4.37-9.866 9.801-.001 1.762.48 3.483 1.391 5.011l-.995 3.636 3.736-.98zm11.367-7.397c-.3-.15-1.772-.875-2.046-.975-.276-.1-.476-.15-.676.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-3.037-1.514-3.839-2.522-4.537-3.722-.175-.3-.025-.45.125-.6.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.625-.926-2.225-.244-.589-.493-.51-.676-.51-.175-.008-.375-.01-.575-.01-.2 0-.525.075-.8 0-.275-.3-1.05-1.025-1.425-2.075-.35-.975-1.05-1.175-1.25-1.225-.2-.05-.4-.05-.6 0-.2.05-.525.275-.525.675 0 .4.425.825.475.9.05.075.825 1.25 2.025 1.775.282.124.5.203.67.26.297.094.567.08.78.048.238-.035.772-.315.88-.62.11-.305.11-.567.075-.62-.035-.053-.15-.085-.45-.235z"/>
                </svg>
                التواصل عبر واتساب للتسجيل
              </a>
            </Button>
          ) : (
            // Other courses (Vocational Rehabilitation or Psychological Rehabilitation)
            <>
              <Button
                asChild
                className="w-full gradient-pink text-primary-foreground border-0 py-6 text-base flex items-center justify-center gap-2 rounded-xl"
              >
                <a
                  href={
                    isPsychologicalCourse
                      ? "https://forms.gle/hfrre8QndiLgynrf8"
                      : "https://forms.gle/XUQSyaseVtmzr86A8"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText className="w-5 h-5" />
                  تعبئة نموذج التسجيل
                </a>
              </Button>
              <Button
                asChild
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white border-0 py-6 text-base flex items-center justify-center gap-2 rounded-xl"
              >
                <a
                  href={`https://wa.me/201155845125?text=${encodeURIComponent(
                    `مرحباً، أود الاستفسار والتسجيل في كورس: ${course.title}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97-1.861-1.868-4.339-2.897-6.97-2.899-5.437 0-9.862 4.37-9.866 9.801-.001 1.762.48 3.483 1.391 5.011l-.995 3.636 3.736-.98zm11.367-7.397c-.3-.15-1.772-.875-2.046-.975-.276-.1-.476-.15-.676.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-3.037-1.514-3.839-2.522-4.537-3.722-.175-.3-.025-.45.125-.6.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.625-.926-2.225-.244-.589-.493-.51-.676-.51-.175-.008-.375-.01-.575-.01-.2 0-.525.075-.8 0-.275-.3-1.05-1.025-1.425-2.075-.35-.975-1.05-1.175-1.25-1.225-.2-.05-.4-.05-.6 0-.2.05-.525.275-.525.675 0 .4.425.825.475.9.05.075.825 1.25 2.025 1.775.282.124.5.203.67.26.297.094.567.08.78.048.238-.035.772-.315.88-.62.11-.305.11-.567.075-.62-.035-.053-.15-.085-.45-.235z"/>
                  </svg>
                  التواصل عبر واتساب
                </a>
              </Button>
              <Button
                asChild
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border py-6 text-base flex items-center justify-center gap-2 rounded-xl"
              >
                <a
                  href={`mailto:hr@daleelpwd.com?subject=${encodeURIComponent(
                    `طلب تسجيل في كورس: ${course.title}`
                  )}&body=${encodeURIComponent(
                    `مرحباً، أود الاستفسار والتسجيل في كورس: ${course.title}.\nالرجاء تزويدي بالتفاصيل المتبقية للبدء.`
                  )}`}
                >
                  <Mail className="w-5 h-5" />
                  البريد الإلكتروني
                </a>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
