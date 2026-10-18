import { useParams, Link } from "react-router-dom";
import { BookOpen, Clock, Users, ArrowRight, PlayCircle, FileText, CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { courses } from "@/data/staticData";

export default function AdminCourseDetails() {
  const { id } = useParams();
  
  // Find course or use a mock fallback for demonstration
  const course = courses.find((c) => c.id.toString() === id) || {
    id: 1,
    title: "محتوى غير متوفر",
    instructor: "غير متاح",
    duration: "0 ساعة",
    level: "مبتدئ",
    price: "0",
    image: "/placeholder-course.jpg",
    cardImage: "/placeholder-course.jpg",
    category: "عام",
    students: 0,
  };

  const modules = [
    { title: "مقدمة في الكورس", duration: "45 دقيقة", lessons: 3, completed: true },
    { title: "الأساسيات والمفاهيم", duration: "ساعتين و 15 دقيقة", lessons: 5, completed: false },
    { title: "التطبيق العملي", duration: "3 ساعات", lessons: 8, completed: false },
  ];

  return (
    <div className="space-y-8 animate-fadeUp rtl pb-12">
      <SEO
        title={`تفاصيل الكورس | ${course.title}`}
        description="عرض تفاصيل ومحتوى الكورس في منصة دليل."
      />

      {/* Navigation & Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-navy-soft/10">
          <Link to="/admin/courses">
            <ArrowRight className="w-5 h-5 text-navy-deep dark:text-white" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold font-heading text-navy-deep dark:text-white">تفاصيل الكورس</h1>
          <p className="text-sm text-muted-foreground">عرض وتعديل محتوى وإحصائيات الكورس</p>
        </div>
      </div>

      {/* Hero Course Card */}
      <Card className="border-none shadow-2xl shadow-navy-deep/5 rounded-3xl overflow-hidden bg-white dark:bg-slate-900 transition-colors duration-500">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 relative h-64 md:h-auto">
            <img 
              src={course.cardImage} 
              alt={course.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 to-transparent flex items-end p-6">
              <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {course.category}
              </span>
            </div>
          </div>
          <div className="md:w-2/3 p-8 flex flex-col justify-center space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-navy-deep dark:text-white mb-2">{course.title}</h2>
              <p className="text-muted-foreground dark:text-white/60">بواسطة <span className="font-bold text-primary">{course.instructor}</span></p>
            </div>
            
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-navy-deep dark:text-white/80">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="font-semibold">{course.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-navy-deep dark:text-white/80">
                <Users className="w-5 h-5 text-green-500" />
                <span className="font-semibold">{course.students || 0} طالب مسجل</span>
              </div>
              <div className="flex items-center gap-2 text-navy-deep dark:text-white/80">
                <Star className="w-5 h-5 text-amber-500" />
                <span className="font-semibold">4.8 تقييم</span>
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 py-6 shadow-lg shadow-primary/20">
                <PlayCircle className="ml-2 w-5 h-5" />
                تعديل المحتوى
              </Button>
              <Button variant="outline" className="rounded-xl px-8 py-6 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 dark:border-red-900/50 dark:hover:bg-red-900/20">
                تعطيل الكورس
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Course Curriculum */}
      <h3 className="text-xl font-bold font-heading text-navy-deep dark:text-white mt-12 mb-6 flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-primary" />
        المنهج والوحدات
      </h3>
      
      <div className="space-y-4">
        {modules.map((mod, index) => (
          <Card key={index} className="border border-navy-soft/10 dark:border-slate-800 shadow-sm rounded-2xl bg-white/50 dark:bg-slate-900/50 hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${mod.completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                  {mod.completed ? <CheckCircle2 className="w-6 h-6" /> : <PlayCircle className="w-6 h-6" />}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-navy-deep dark:text-white mb-1">الوحدة {index + 1}: {mod.title}</h4>
                  <p className="text-sm text-muted-foreground flex items-center gap-4">
                    <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {mod.lessons} دروس</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {mod.duration}</span>
                  </p>
                </div>
              </div>
              <Button variant="ghost" className="rounded-xl text-primary font-bold hover:bg-primary/10">محتوى الوحدة</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
