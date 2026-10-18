import React from "react";
import { BookOpen, CheckCircle, Star } from "lucide-react";

interface CourseDetailData {
  id?: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  price: string;
  students: number | string;
  level: string;
  content: string[];
  requirements: string[];
  audience: string[];
  reviews: Array<{
    name: string;
    rating: number;
    text: string;
  }>;
}

interface CourseOverviewProps {
  course: CourseDetailData;
  courseImage?: string;
}

export const CourseOverview: React.FC<CourseOverviewProps> = ({ course, courseImage }) => {
  return (
    <div className="lg:col-span-2 space-y-8 text-right" dir="rtl">
      {/* Large full-width course banner with ambient glow backdrop */}
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border bg-slate-950 flex items-center justify-center shadow-md">
        {/* Ambient blur background */}
        {courseImage && (
          <img
            src={courseImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-105 pointer-events-none"
          />
        )}
        {/* Main contained image */}
        {courseImage && (
          <img
            src={courseImage}
            alt={course.title}
            loading="lazy"
            className="relative z-10 max-h-full max-w-full object-contain"
          />
        )}
      </div>

      {/* Description */}
      <div>
        <h2 className="text-2xl font-bold mb-4">وصف الكورس</h2>
        <p className="text-muted-foreground leading-relaxed">
          {course.description}
        </p>
      </div>

      {/* Content / Lessons */}
      <div>
        <h2 className="text-2xl font-bold mb-4">محتوى الكورس</h2>
        <div className="space-y-2">
          {course.content.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border"
            >
              <BookOpen className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-sm">
                الدرس {i + 1}: {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div>
        <h2 className="text-2xl font-bold mb-4">المتطلبات</h2>
        <ul className="space-y-2">
          {course.requirements.map((r) => (
            <li
              key={r}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <CheckCircle className="w-4 h-4 text-success" />
              {r}
            </li>
          ))}
        </ul>
      </div>

      {/* Target Audience */}
      <div>
        <h2 className="text-2xl font-bold mb-4">الفئة المستهدفة</h2>
        <ul className="space-y-2">
          {course.audience.map((a) => (
            <li
              key={a}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <CheckCircle className="w-4 h-4 text-info" />
              {a}
            </li>
          ))}
        </ul>
      </div>

      {/* Reviews */}
      <div>
        <h2 className="text-2xl font-bold mb-4">التقييمات</h2>
        <div className="space-y-4">
          {course.reviews.map((r) => (
            <div
              key={r.name}
              className="p-4 bg-card rounded-xl border border-border"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-sm">{r.name}</span>
                <div className="flex gap-0.5">
                  {[...Array(r.rating)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-3 h-3 text-warning fill-warning"
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
