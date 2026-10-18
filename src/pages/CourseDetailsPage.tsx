import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/sections/Section";
import HeroSection from "@/components/sections/HeroSection";
import SEO from "@/components/common/SEO";
import { CourseOverview, CourseSidebar } from "@/features/courses";
import { getPublicCourse } from "@/lib/contentApi";

export default function CourseDetailsPage() {
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: course, isLoading, isError } = useQuery({
    queryKey: ["public-course", id],
    queryFn: () => getPublicCourse(id),
    enabled: !!id,
  });

  useEffect(() => { window.scrollTo(0, 0); }, [id]);
  useEffect(() => { if (isError) navigate("/courses", { replace: true }); }, [isError, navigate]);

  if (isLoading || !course) return <div className="flex items-center justify-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" /></div>;

  const details = course.details ?? { description: "", content: [], requirements: [], audience: [], reviews: [] };
  const detail = { ...course, ...details, students: course.students ?? 0 };

  return <>
    <SEO title={course.title} description={details.description?.substring(0, 150) || course.title} />
    <div className="relative">
      <div className="absolute top-4 right-4 z-20"><Link to="/courses" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm transition-colors"><ArrowRight className="w-4 h-4" />العودة للكورسات</Link></div>
      <HeroSection badge={course.level} titleStart={course.title} titleHighlight="" subtitle={course.instructor} stats={[{ num: course.duration, label: "المدة" }, { num: course.price, label: "السعر" }, { num: `+${course.students}`, label: "طالب" }]} />
    </div>
    <Section><div className="grid grid-cols-1 lg:grid-cols-3 gap-8"><CourseOverview course={detail as any} courseImage={course.image || undefined} /><CourseSidebar course={course} category={course.category} /></div></Section>
  </>;
}
