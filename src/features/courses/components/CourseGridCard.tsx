import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CourseLike {
  id: number;
  title: string;
  category?: string;
  level: string;
  duration: string;
  image?: string | null;
  cardImage?: string | null;
  card_image?: string | null;
  price: string;
  students?: number;
  instructor?: string;
}

interface CourseGridCardProps {
  course: CourseLike;
  index: number;
}

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }) };
const levelColor: Record<string, string> = { مبتدئ: "bg-success/10 text-success", متوسط: "bg-warning/10 text-warning", متقدم: "bg-info/10 text-info" };

export const CourseGridCard: React.FC<CourseGridCardProps> = React.memo(({ course, index }) => {
  const image = course.card_image || course.cardImage || course.image;
  return (
    <motion.div custom={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-border flex flex-col justify-between h-full">
      <div>
        <motion.div className="h-3 bg-gradient-to-r from-pink-500 via-purple-100 to-pink-500 bg-[length:200%_100%]" animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          {image ? <img src={image} alt={course.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105" /> : <div className="w-full h-full flex items-center justify-center text-muted-foreground">لا توجد صورة</div>}
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3"><span className={`text-xs font-medium px-3 py-1 rounded-full ${levelColor[course.level] || "bg-muted text-muted-foreground"}`}>{course.level}</span>{course.category && <span className="text-xs text-muted-foreground bg-card px-3 py-1 rounded-full">{course.category}</span>}</div>
          <h3 className="text-lg font-bold mb-2 text-foreground text-right">{course.title}</h3>
          {course.instructor && <p className="text-sm text-muted-foreground mb-4 text-right">{course.instructor}</p>}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5" dir="rtl"><span className="flex items-center gap-1"><Clock className="w-4 h-4" />{course.duration}</span><span className="flex items-center gap-1"><CreditCard className="w-4 h-4 text-primary" />{course.price}</span>{course.students !== undefined && <span className="flex items-center gap-1"><Users className="w-4 h-4" />{course.students}</span>}</div>
        </div>
      </div>
      <div className="p-6 pt-0"><Button asChild className="w-full gradient-pink text-primary-foreground border-0 hover:opacity-90"><Link to={`/courses/${course.id}`}>عرض التفاصيل</Link></Button></div>
    </motion.div>
  );
});
CourseGridCard.displayName = "CourseGridCard";
