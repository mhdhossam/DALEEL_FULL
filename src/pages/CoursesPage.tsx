import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import HeroSection from "@/components/sections/HeroSection";
import SEO from "@/components/common/SEO";
import { Section } from "@/components/sections/Section";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { CourseCategorySelector, CourseGridCard } from "@/features/courses";
import { getPublicCourses } from "@/lib/contentApi";

export default function CoursesPage() {
  const [active, setActive] = useState("الكل");
  const [currentPage, setCurrentPage] = useState(1);
  const { data: courses = [], isLoading, isError } = useQuery({
    queryKey: ["public-courses"],
    queryFn: getPublicCourses,
  });
  const categories = useMemo(
    () => ["الكل", ...Array.from(new Set(courses.map((course) => course.category).filter(Boolean)))],
    [courses],
  );
  const filtered = active === "الكل" ? courses : courses.filter((course) => course.category === active);
  const pageSize = 9;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const categoryChange = (category: string) => {
    setActive(category);
    setCurrentPage(1);
  };

  return (
    <>
      <SEO title="الكورسات التعليمية - تعلم وطور مهاراتك" description="تصفح الكورسات التعليمية المتاحة في منصة دليل." />
      <section>
        <HeroSection badge="منصة ذوي الهمم 🌟" titleStart="تعلَّم بلا حدود،  " titleHighlight=" وانطلق بلا قيود " subtitle="محتوى تعليمي متخصص مُصمَّم لكل احتياج، يفتح أمامك أبواب المعرفة بأسلوب سهل وممتع." stats={[]} />
      </section>
      <Section>
        {isLoading && <div className="py-20 text-center text-muted-foreground">جاري تحميل الكورسات...</div>}
        {isError && <div className="py-20 text-center text-destructive">تعذر تحميل الكورسات.</div>}
        {!isLoading && !isError && (
          <>
            <CourseCategorySelector activeCategory={active} onCategoryChange={categoryChange} categories={categories} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map((course, i) => <CourseGridCard key={course.id} course={course as any} index={i} />)}
            </div>
            {!paginated.length && <div className="py-20 text-center text-muted-foreground">لا توجد كورسات متاحة حالياً.</div>}
            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination dir="rtl"><PaginationContent>
                  <PaginationItem><PaginationPrevious onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}>السابق</PaginationPrevious></PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => <PaginationItem key={page}><PaginationLink onClick={() => setCurrentPage(page)} isActive={currentPage === page} className="cursor-pointer">{page}</PaginationLink></PaginationItem>)}
                  <PaginationItem><PaginationNext onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}>التالي</PaginationNext></PaginationItem>
                </PaginationContent></Pagination>
              </div>
            )}
          </>
        )}
      </Section>
    </>
  );
}
