import React from "react";
import BookOpen from "lucide-react/dist/esm/icons/book-open";
import ShoppingBag from "lucide-react/dist/esm/icons/shopping-bag";
import GraduationCap from "lucide-react/dist/esm/icons/graduation-cap";
import Heart from "lucide-react/dist/esm/icons/heart";
import Users from "lucide-react/dist/esm/icons/users";
import Laptop from "lucide-react/dist/esm/icons/laptop";
import { HelpCircle, CheckCircle2, Award, Target, Eye } from "lucide-react";

import course1 from "../assets/courses/callcenter.webp";
import course2 from "../assets/courses/english.webp";
import course3 from "../assets/courses/computer.webp";
import course4 from "../assets/courses/programming.webp";
import course5 from "../assets/courses/speech.webp";
import course6 from "../assets/courses/behavior.webp";
import course7 from "../assets/courses/learning_difficulties.webp";
import course8 from "../assets/courses/skills_development.webp";
import courseFreelancer from "../assets/courses/freelancer.webp";
import courseChild from "../assets/courses/child.webp";
import courseDaycare from "../assets/courses/daycare.png";
import courseDaleelCenter from "../assets/courses/DaleelCenter.webp";
// Card images
import cardCallcenter from "../assets/courses/card_callcenter.webp";
import cardEnglish from "../assets/courses/card_english.webp";
import cardComputer from "../assets/courses/card_computer.webp";
import cardProgramming from "../assets/courses/card_programming.webp";
import cardBehavior from "../assets/courses/card_behavior.webp";
import cardSpeech from "../assets/courses/card_speech.webp";
import cardLearning from "../assets/courses/card_learning.webp";
import cardSkills from "../assets/courses/card_skills.webp";
import cardFreelancing from "../assets/courses/card_freelancing.webp";
import cardChild from "../assets/courses/card_child.webp";

// Team images
import teamEman from "../assets/team/Eman.webp";
import teamAhmed from "../assets/team/Ahmed.webp";
import teamIbrahim from "../assets/team/Ibrahim.webp";
import teamMohamed from "../assets/team/Mohamed.webp";
import teamMostafa from "../assets/team/Mostafa.webp";
import teamAyat from "../assets/team/Ayat.webp";
import teamAbdelRazk from "../assets/team/AbdelRazk.webp";
import teamEmanHamdy from "../assets/team/EmanHamdy2.jpeg";
import teamFatma from "../assets/team/Fatma .jpeg";

// Goal illustrations
import goalEmpowerment from "../assets/empowerment.png";
import goalAwareness from "../assets/awareness.png";
import goalSupport from "../assets/support.png";
import goalInclusion from "../assets/inclusion.png";

/* -------------------- Types -------------------- */
export interface Service {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  items?: string[];
}

export interface Course {
  id: number;
  title: string;
  category?: string;
  level: string;
  duration: string;
  image: string;
  cardImage: string;
  price: string;
  students?: number;
  instructor?: string;
}

export interface Product {
  id: number | string;
  title: string;
  price: string;
  available: boolean;
  rating?: number;
  category?: string;
  desc?: string;
}

export interface Scholarship {
  id: number;
  title: string;
  org: string;
  deadline: string;
  location: string;
  requirements: string[];
  desc: string;
}

export interface Goal {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  image: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image?: string;
  position?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  text: string;
}

/* -------------------- HomePage Data -------------------- */
export const services: Service[] = [
  {
    icon: BookOpen,
    title: "دورات تدريبية",
    desc: "برامج تعليمية متخصصة ومصممة بعناية لبناء مهارات عملية تؤهلك لسوق العمل.",
    items: ["خدمة العملاء", "الكمبيوتر (ICDL)", "اللغة الإنجليزية"],
  },
  {
    icon: GraduationCap,
    title: "منح دراسية",
    desc: "فرص تعليمية مدعومة بالكامل لمساعدتك في الحصول على أفضل جودة تعليمية مجاناً.",
    items: ["خدمة العملاء", "الكمبيوتر (ICDL)", "اللغة الإنجليزية", "الضيافة"],
  },
  {
    icon: Heart,
    title: "تأهيل نفسي",
    desc: "جلسات دعم فردية وبرامج تأهيلية وتنموية متكاملة بإشراف نخبة من الأخصائيين.",
    items: [
      "التخاطب",
      "تعديل السلوك",
      "تنمية المهارات",
      "صعوبات التعلم",
      "الرعاية النهارية",
    ],
  },
];

export const homeProducts: Product[] = [
  { id: 1, title: "كرسي متحرك كهربائي", price: "4,500 ر.س", available: true },
  {
    id: 2,
    title: "سماعة أذن طبية متقدمة",
    price: "2,800 ر.س",
    available: true,
  },
  { id: 3, title: "عصا ذكية للمكفوفين", price: "1,200 ر.س", available: false },
];

export const homeCourses: Course[] = [
  {
    id: 1,
    title: "خدمة العملاء",
    level: "مبتدئ",
    duration: "شهرين",
    price: "مفاجأة",
    image: course1,
    cardImage: cardCallcenter,
  },
  {
    id: 5,
    title: "تعديل السلوك",
    level: "متوسط",
    duration: "45 دقيقة",
    price: "مفاجأة",
    image: course6,
    cardImage: cardBehavior,
  },
  {
    id: 3,
    title: "  ICDL   ",
    level: "متقدم",
    duration: "شهرين ",
    price: "مفاجأة",
    image: course3,
    cardImage: cardComputer,
  },
];

/* -------------------- CoursesPage Data -------------------- */
export const courseCategories = [
  "الكل",
  "كورسات للتأهيل المهني",
  "كورسات للتأهيل النفسي",
  "كورسات للأطفال",
];

export const courses: Course[] = [
  {
    id: 1,
    title: "  كورس خدمة العملاء",
    category: "كورسات للتأهيل المهني",
    level: "مبتدئ",
    duration: "شهرين",
    price: "1000",
    students: 120,
    instructor: "م.فادي شحاتة",
    image: course1,
    cardImage: cardCallcenter,
  },
  {
    id: 2,
    title: "  كورس اللغة الانجليزية  ",
    category: "كورسات للتأهيل المهني",
    level: "متوسط",
    duration: "شهرين",
    price: "1000",
    students: 150,
    instructor: "م.فاطمة احمد",
    image: course2,
    cardImage: cardEnglish,
  },
  {
    id: 3,
    title: "  كورس ICDL ",
    category: "كورسات للتأهيل المهني",
    level: "متوسط",
    duration: "شهرين",
    price: "1000",
    students: 90,
    instructor: "م.فادي شحاتة",
    image: course3,
    cardImage: cardComputer,
  },
  {
    id: 4,
    title: "  كورس البرمجة",
    category: "كورسات للتأهيل المهني",
    level: "مبتدئ",
    duration: "شهرين",
    price: "1000",
    students: 80,
    instructor: "م.عبد الرحمن محمد",
    image: course4,
    cardImage: cardProgramming,
  },
  {
    id: 5,
    title: " كورس تعديل السلوك ",
    category: "كورسات للتأهيل النفسي",
    level: "متوسط",
    duration: "45 دقيقة",
    price: "سعر الجلسة: 100 جنية",
    students: 20,
    instructor: "د.ايمان حمدي",
    image: course6,
    cardImage: cardBehavior,
  },
  {
    id: 6,
    title: " كورس التخاطب ",
    category: "كورسات للتأهيل النفسي",
    level: "متوسط",
    duration: "45 دقيقة",
    price: "سعر الجلسة: 100 جنية",
    students: 50,
    instructor: "د.عبدالرازق السيد",
    image: course5,
    cardImage: cardSpeech,
  },
  {
    id: 7,
    title: " كورس صعوبات التعلم ",
    category: "كورسات للتأهيل النفسي",
    level: "متقدم",
    duration: "45 دقيقة",
    price: "سعر الجلسة: 100 جنية",
    students: 30,
    instructor: "د.إيمان حمدي",
    image: course7,
    cardImage: cardLearning,
  },
  {
    id: 8,
    title: " كورس تنمية المهارات ",
    category: "كورسات للتأهيل النفسي",
    level: "مبتدئ",
    duration: "45 دقيقة",
    price: "سعر الجلسة: 100 جنية",
    students: 100,
    instructor: "د.إيمان حمدي",
    image: course8,
    cardImage: cardSkills,
  },
  {
    id: 9,
    title: " كورس العمل الحر (Freelancing) ",
    category: "كورسات للتأهيل المهني",
    level: "متوسط",
    duration: "شهرين",
    price: "1000",
    students: 85,
    instructor: "د.إيمان أحمد & م.فادي شحاتة",
    image: courseFreelancer,
    cardImage: cardFreelancing,
  },
  {
    id: 10,
    title: " كورس تنمية مهارات الأطفال ",
    category: "كورسات للأطفال",
    level: "مبتدئ",
    duration: "شهرين",
    price: "1000",
    students: 110,
    instructor: "د.إيمان أحمد",
    image: courseChild,
    cardImage: cardChild,
  },
  {
    id: 11,
    title: " كورس الرعاية النهارية (مركز دليل) ",
    category: "كورسات للأطفال",
    level: "مبتدئ",
    duration: "شهرياً",
    price: "سعر الجلسة: 100 جنية",
    students: 60,
    instructor: "د.عبدالرازق السيد & د.إيمان حمدي",
    image: courseDaleelCenter,
    cardImage: courseDaycare,
  },
];

/* -------------------- StorePage Data -------------------- */
export const storeCategories = [
  { id: "all", label: "الكل" },
  { id: "wheelchairs", label: "كراسي متحركة" },
  { id: "hearing", label: "أجهزة سمعية" },
  { id: "visual", label: "أدوات بصرية" },
  { id: "therapy", label: "علاج طبيعي" },
  { id: "education", label: "تعليمية" },
  { id: "tech", label: "تكنولوجيا مساعدة" },
];

export const storeProducts: Product[] = [
  {
    id: 1,
    title: "كرسي متحرك كهربائي متقدم",
    price: "4,500 ج.م",
    rating: 4.8,
    available: true,
    category: "wheelchairs",
    desc: "كرسي كهربائي بتقنية متقدمة وبطارية طويلة الأمد",
  },
  {
    id: 2,
    title: "سماعة أذن طبية ديجيتال",
    price: "2,800 ج.م",
    rating: 4.6,
    available: true,
    category: "hearing",
    desc: "سماعة رقمية بتقنية إلغاء الضوضاء",
  },
  {
    id: 3,
    title: "عصا ذكية للمكفوفين",
    price: "1,200 ج.م",
    rating: 4.9,
    available: true,
    category: "visual",
    desc: "مزودة بمستشعرات وتنبيهات صوتية ذكية",
  },
  {
    id: 4,
    title: "جهاز علاج طبيعي منزلي",
    price: "3,200 ج.م",
    rating: 4.5,
    available: true,
    category: "therapy",
    desc: "جهاز متعدد الوظائف للاستخدام المنزلي",
  },
  {
    id: 5,
    title: "لوحة مفاتيح بالبرايل",
    price: "800 ج.م",
    rating: 4.7,
    available: false,
    category: "education",
    desc: "لوحة برايل للكتابة والتعلم بسهولة",
  },
  {
    id: 6,
    title: "تطبيق ذكي للتواصل",
    price: "مجاني",
    rating: 4.8,
    available: true,
    category: "tech",
    desc: "يساعد في التواصل لذوي صعوبات النطق",
  },
  {
    id: 7,
    title: "كرسي متحرك رياضي",
    price: "6,000 ج.م",
    rating: 4.9,
    available: true,
    category: "wheelchairs",
    desc: "خفيف مصمم للرياضة والنشاطات البدنية",
  },
  {
    id: 8,
    title: "نظارات مكبرة إلكترونية",
    price: "1,800 ج.م",
    rating: 4.4,
    available: true,
    category: "visual",
    desc: "تكبير حتى 12x لضعاف البصر",
  },
  {
    id: 9,
    title: "جهاز تحويل النص إلى كلام",
    price: "950 ج.م",
    rating: 4.6,
    available: true,
    category: "tech",
    desc: "يحول النصوص المكتوبة إلى كلام مسموع",
  },
];

/* -------------------- ScholarshipsPage Data -------------------- */
export const scholarships: Scholarship[] = [
  {
    id: 1,
    title: "منحة التميز الأكاديمي",
    org: "وزارة التعليم",
    deadline: "2026-06-30",
    location: "المملكة العربية السعودية",
    requirements: ["معدل تراكمي 3.5 فأعلى", "شهادة إعاقة معتمدة", "خطاب توصية"],
    desc: "منحة دراسية كاملة للطلاب ذوي الإعاقة المتفوقين أكاديمياً لدراسة البكالوريوس في الجامعات السعودية.",
  },
  {
    id: 2,
    title: "منحة التكنولوجيا المساعدة",
    org: "شركة تقنية",
    deadline: "2026-05-15",
    location: "عن بُعد",
    requirements: [
      "اهتمام بمجال التقنية",
      "مهارات أساسية في الحاسب",
      "مقال شخصي",
    ],
    desc: "منحة لدراسة تطوير التكنولوجيا المساعدة وتطبيقات إمكانية الوصول.",
  },
  {
    id: 3,
    title: "منحة الفنون والإبداع",
    org: "مؤسسة الفنون",
    deadline: "2026-08-01",
    location: "الرياض",
    requirements: ["ملف أعمال فنية", "رسالة تحفيز", "شهادة إعاقة"],
    desc: "منحة لدعم المبدعين من ذوي الإعاقة في مجالات الفنون البصرية والتصميم.",
  },
];

/* -------------------- AboutPage Data -------------------- */
export const goals: Goal[] = [
  {
    icon: Target,
    title: "التمكين",
    desc: "تمكين ذوي الإعاقة من العيش باستقلالية وكرامة",
    image: goalEmpowerment,
  },
  {
    icon: Eye,
    title: "الوعي",
    desc: "نشر الوعي المجتمعي بحقوق وقدرات ذوي الإعاقة",
    image: goalAwareness,
  },
  {
    icon: Heart,
    title: "الدعم",
    desc: "توفير الدعم النفسي والاجتماعي الشامل",
    image: goalSupport,
  },
  {
    icon: Users,
    title: "الشمولية",
    desc: "بناء مجتمع شامل يحترم التنوع والاختلاف",
    image: goalInclusion,
  },
];

export const team: TeamMember[] = [
  { name: "إيمان أحمد", role: "CEO & Founder", image: teamEman },
  { name: "أحمد حسين", role: "Consultant", image: teamAhmed },
  { name: "إبراهيم جمال", role: "Voice over", image: teamIbrahim },
  { name: "محمد حسام", role: "Technical", image: teamMohamed },
  { name: "مصطفى سيد", role: "Technical", image: teamMostafa },
  {
    name: "آيات وسيم",
    role: "HR Generalist",
    image: teamAyat,
    position: "object-[center_5%]",
  },
  {
    name: "د. عبدالرازق السيد",
    role: "Speech Therapist",
    image: teamAbdelRazk,
  },
  {
    name: "د. إيمان حمدي",
    role: "SEN Specialist",
    image: teamEmanHamdy,
    position: "object-[center_15%]",
  },
  {
    name: "أ. فاطمة أحمد",
    role: "English Instructor",
    image: teamFatma,
    position: "object-[center_35%]",
  },
];

export const reasons = [
  "منصة شاملة تجمع كل ما يحتاجه ذوي الإعاقة في مكان واحد",
  "فريق متخصص من الخبراء والمتخصصين",
  "محتوى تعليمي عالي الجودة ومحدث باستمرار",
  "منتجات مختارة بعناية وبأسعار تنافسية",
  "دعم فني على مدار الساعة",
  "واجهة مستخدم سهلة الاستخدام ومتوافقة مع معايير الوصولية",
];

/* -------------------- CourseDetailsPage Data -------------------- */
export const courseDetailsData: Record<string, any> = {
  "1": {
    title: "كورس خدمة العملاء",
    instructor: "م.فادي شحاتة",
    duration: "شهرين",
    price: "1000",
    students: 120,
    level: "مبتدئ",
    description:
      "دورة متخصصة لتمكين ذوي الهمم من التميز في مجال خدمة العملاء، مع التركيز على مهارات التواصل الشامل واستخدام التقنيات المساعدة في بيئة العمل.",
    content: [
      "مقدمة في خدمة العملاء الشاملة",
      "فهم احتياجات العملاء المتنوعة",
      "مهارات التواصل اللفظي وغير اللفظي",
      "استخدام أدوات التكنولوجيا المساعدة في الرد",
      "حل المشكلات بمرونة واحترافية",
      "بناء الثقة بالنفس في بيئة العمل",
      "تطبيقات عملية ومحاكاة لمواقف واقعية",
    ],
    requirements: ["الرغبة في التطوير المهني", "مهارات تواصل أساسية"],
    audience: [
      "ذوي الهمم الباحثين عن فرص عمل",
      "الراغبين في تطوير مهاراتهم المهنية",
      "المقبلين على الاندماج في سوق العمل",
    ],
    reviews: [
      {
        name: "أمير م.",
        rating: 5,
        text: "كورس ممتاز يراعي كافة التحديات ويقدم حلولاً عملية.",
      },
      {
        name: "سارة خ.",
        rating: 4,
        text: "استفدت جداً من جزء التقنيات المساعدة.",
      },
    ],
  },
  "2": {
    title: "كورس اللغة الانجليزية",
    instructor: "م.فاطمة احمد",
    duration: "شهرين",
    price: "1000",
    students: 150,
    level: "متوسط",
    description:
      "كورس لغة إنجليزية تفاعلي مصمم خصيصاً لدعم التأهيل المهني والنفسي، يركز على المصطلحات اليومية والمهنية مع توفير بيئة تعليمية داعمة لجميع أنماط التعلم.",
    content: [
      "المحادثات اليومية والتعريف بالنفس",
      "مصطلحات التأهيل والعمل",
      "التواصل مع الزملاء والمديرين",
      "كتابة سيرة ذاتية بسيطة بالإنجليزية",
      "استراتيجيات التواصل لذوي الاحتياجات المتنوعة",
      "تطوير مهارات الاستماع والفهم بطرق مبتكرة",
    ],
    requirements: [
      "معرفة أساسية بالحروف الإنجليزية",
      "الرغبة في التعلم الذاتي",
    ],
    audience: [
      "الباحثين عن التطور الأكاديمي والمهني",
      "ذوي الهمم الراغبين في اكتساب لغة ثانية",
      "المهتمين بالوظائف التي تتطلب لغة أساسية",
    ],
    reviews: [
      {
        name: "يوسف ر.",
        rating: 5,
        text: "طريقة الشرح ممتعة وتراعي الفروق الفردية.",
      },
      {
        name: "ريهام س.",
        rating: 5,
        text: "المحتوى مفيد جداً للتأهيل الوظيفي.",
      },
    ],
  },
  "3": {
    title: "كورس ICDL",
    instructor: "م.فادي شحاتة",
    duration: "شهرين",
    price: "1000",
    students: 90,
    level: "متوسط",
    description:
      "برنامج متكامل لتعليم مهارات الحاسوب الأساسية، مع التركيز بشكل خاص على استخدام أدوات الوصول (Accessibility Tools) لضمان الاستقلال الرقمي التام.",
    content: [
      "أساسيات الحاسوب ونوافذ الوصول",
      "تخصيص نظام التشغيل لاحتياجاتك",
      "تطبيقات الأوفيس بطريقة سهلة الوصول",
      "إنشاء مستندات وعروض تقديمية شاملة",
      "الأمان الرقمي والخصوصية",
      "استخدام الإنترنت وتقنيات التصفح المساعدة",
    ],
    requirements: ["توفر جهاز حاسوب أو تابلت", "معرفة مبدئية بتشغيل الأجهزة"],
    audience: [
      "ذوي الهمم الراغبين في الاستقلال الرقمي",
      "الطلاب والباحثين عن مهارات مكتبية",
      "المهتمين بتمكين أنفسهم تقنياً",
    ],
    reviews: [
      {
        name: "هشام ع.",
        rating: 4,
        text: "تعلمت كيف استخدم الكمبيوتر بفعالية تامة رغم التحديات.",
      },
      {
        name: "لمى ف.",
        rating: 5,
        text: "كورس شامل وضروري لكل شخص يريد العمل مكتلياً.",
      },
    ],
  },
  "4": {
    title: "كورس البرمجة",
    instructor: "م.عبد الرحمن محمد",
    duration: "شهرين",
    price: "1000",
    students: 80,
    level: "مبتدئ",
    description:
      "بوابة دخول ذوي الهمم إلى عالم البرمجة، حيث نركز على أساسيات تطوير الويب مع التركيز على مبادئ سهولة الوصول (A11y) لتمكينكم من بناء منصات ومواقع تشمل الجميع.",
    content: [
      "مقدمة في علوم الحاسب والمنطق",
      "أساسيات تطوير واجهات الويب (HTML/CSS)",
      "مبادئ سهولة الوصول الرقمي (A11y)",
      "برمجة تفاعلية باستخدام JavaScript",
      "بناء مشاريع برمجية تلبي احتياجات مجتمعية",
      "التدريب على أدوات التطوير الحديثة",
    ],
    requirements: ["توفر جهاز كمبيوتر", "التفكير المنطقي وحب التعلم"],
    audience: [
      "المبدعين من ذوي الهمم المهتمين بالتقنية",
      "الراغبين في تصميم حلول برمجية شاملة",
      "الباحثين عن وظائف مستقبلية مستدامة",
    ],
    reviews: [
      {
        name: "كريم م.",
        rating: 5,
        text: "أفضل كورس برمجة يركز على كيفية جعل الإنترنت متاحاً للكل.",
      },
      {
        name: "نورهان ا.",
        rating: 4,
        text: "الشرح مبسط ومحفز جداً على الابتكار.",
      },
    ],
  },
  "5": {
    title: "كورس تعديل السلوك",
    instructor: "د.ايمان حمدي",
    duration: "45 دقيقة",
    price: "100",
    students: 20,
    level: "متوسط",
    description:
      "دورة شاملة في مبادئ تحليل السلوك التطبيقي (ABA) تهدف إلى تمكين الأهل والمختصين من فهم السلوكيات وإدارتها بشكل إيجابي لدعم نمو الطفل واستقراره النفسي.",
    content: [
      "أساسيات تحليل السلوك التطبيقي",
      "تحديد الوظائف السلوكية",
      "استراتيجيات التعزيز الإيجابي",
      "التعامل مع السلوكيات التحديّة",
      "بناء خطة تربوية سلوكية",
      "تحسين المهارات الاجتماعية",
      "تطبيقات منزلية ومدرسية",
    ],
    requirements: ["رغبة في فهم الدوافع السلوكية", "بيئة هادئة للتطبيق العملي"],
    audience: [
      "أولياء أمور ذوي الهمم",
      "الأخصائيين النفسيين والاجتماعيين",
      "المعلمين في مدارس الدمج",
    ],
    reviews: [
      {
        name: "أروى ع.",
        rating: 5,
        text: "الكورس غير نظرتي تماماً لكيفية التعامل مع ابني.",
      },
      {
        name: "خالد م.",
        rating: 4,
        text: "محتوى علمي دسم ومبسط في نفس الوقت.",
      },
    ],
  },
  "6": {
    title: "كورس التخاطب",
    instructor: "د.عبدالرازق السيد",
    duration: "45 دقيقة",
    price: " 100 ",
    students: 50,
    level: "متوسط",
    description:
      "كورس عملي يركز على آليات تنمية اللغة والتواصل، بدءاً من المهارات ما قبل اللغوية وصولاً إلى بناء الجمل والتفاعل الاجتماعي الفعال باستخدام أحدث الوسائل.",
    content: [
      "تطور اللغة الطبيعي ومعوقاته",
      "تمارين تقوية أعضاء النطق",
      "زيادة الحصيلة اللغوية",
      "استخدام لوحات التواصل البديلة",
      "علاج مشاكل التلعثم والنطق",
      "دمج اللغة في الأنشطة اليومية",
    ],
    requirements: ["لا يوجد متطلبات مسبقة", "القدرة على المتابعة الدورية"],
    audience: [
      "أهالي الأطفال الذين يعانون من تأخر لغوي",
      "مساعدي أخصائيي التخاطب",
      "المهتمين بمجال التربية الخاصة",
    ],
    reviews: [
      {
        name: "منى س.",
        rating: 5,
        text: "التمارين العملية ساعدت طفلي بشكل ملحوظ.",
      },
      {
        name: "ياسر ر.",
        rating: 5,
        text: "شرح دقيق وواضح لخطوات التدريب اللغوي.",
      },
    ],
  },
  "7": {
    title: " كورس صعوبات التعلم",
    instructor: "د.إيمان حمدي",
    duration: "45 دقيقة",
    price: "100",
    students: 30,
    level: "متقدم",
    description:
      "برنامج متكامل لتشخيص ودعم الطلاب الذين يواجهون تحديات في القراءة، الكتابة، أو الحساب، مع تقديم استراتيجيات تعليمية مبتكرة تناسب كل حالة.",
    content: [
      "أنواع صعوبات التعلم الأكاديمية",
      "طرق التقييم والتشخيص المبدئي",
      "استراتيجيات التدريس العلاجي",
      "تعديل المناهج لتناسب الطالب",
      "دعم الثقة بالنفس والدافعية",
      "التواصل بين البيت والمدرسة",
    ],
    requirements: ["خلفية بسيطة في التربية", "جهاز كمبيوتر للمواد الإضافية"],
    audience: ["المعلمون والمعلمات", "أولياء الأمور", "أخصائيي التربية الخاصة"],
    reviews: [
      {
        name: "هدى ن.",
        rating: 5,
        text: "حلول واقعية لمشاكل القراءة والتركيز.",
      },
      { name: "سعد ال.", rating: 4, text: "كورس عميق جداً ويحتاج تركيز." },
    ],
  },
  "8": {
    title: " كورس  تنمية المهارات  ",
    instructor: "د.إيمان حمدي",
    duration: "45 دقيقة",
    price: "100",
    students: 120,
    level: "مبتدئ",
    description:
      "يركز هذا الكورس على تطوير المهارات الحركية الدقيقة، المهارات الاستقلالية، والوظائف التنفيذية لتمكين الفرد من الاعتماد على نفسه في أنشطة الحياة اليومية.",
    content: [
      "تنمية المهارات الدقيقة والكبيرة",
      "تدريبات التركيز والانتباه",
      "مهارات الرعاية الذاتية",
      "الأنشطة الترفيهية الهادفة",
      "التخطيط والتنظيم اليومي",
      "استخدام الألعاب في التعلم",
    ],
    requirements: ["مواد بسيطة متوفرة في المنزل", "حب العمل الميداني"],
    audience: [
      "الأمهات والآباء",
      "مربي الظل (Shadow Teachers)",
      "مراكز الرعاية المهارية",
    ],
    reviews: [
      {
        name: "نورة الق.",
        rating: 5,
        text: "أفكار رائعة للتطبيق المنزلي وبأدوات بسيطة.",
      },
      {
        name: "فيصل ع.",
        rating: 5,
        text: "الكورس أعطاني خارطة طريق لتطوير مهارات ابني.",
      },
    ],
  },
  "9": {
    title: "كورس العمل الحر (Freelancing)",
    instructor: "د.إيمان أحمد & م.فادي شحاتة",
    duration: "شهرين",
    price: "1000",
    students: 85,
    level: "متوسط",
    description:
      "دورة شاملة لتوجيه ذوي الهمم وتزويدهم بالمهارات اللازمة للعمل بشكل مستقل عبر الإنترنت، والتعرف على منصات العمل الحر، وتأمين مشاريع وتقديم خدمات احترافية.",
    content: [
      "مفهوم العمل الحر ومميزاته لذوي الهمم",
      "تحديد مهاراتك الفردية والخدمات المقترحة",
      "إنشاء حسابات احترافية على منصات العمل الحر العالمية والعربية",
      "طرق كتابة العروض والتقديم للمشاريع بذكاء",
      "التسعير والتواصل الفعال مع العملاء",
      "طرق سحب الأرباح والتعامل المالي الآمن",
      "قصص نجاح وتطبيقات عملية لبدء مشروعك الأول",
    ],
    requirements: [
      "مهارة أساسية (مثل الكتابة، الترجمة، البرمجة أو التصميم)",
      "جهاز كمبيوتر واتصال بالإنترنت",
    ],
    audience: [
      "ذوي الهمم الراغبين في الاستقلال المالي والعمل من المنزل",
      "المهنيين الراغبين في الانتقال إلى سوق العمل الحر",
    ],
    reviews: [
      {
        name: "حسن أ.",
        rating: 5,
        text: "الكورس فتح لي باب رزق كنت أحلم به منذ سنوات، أشكركم!",
      },
      {
        name: "منى ج.",
        rating: 4,
        text: "الشرح غاية في الوضوح وعملي للغاية.",
      },
    ],
  },
  "10": {
    title: "كورس تنمية مهارات الأطفال",
    instructor: "د.إيمان أحمد",
    duration: "شهرين",
    price: "1000",
    students: 110,
    level: "مبتدئ",
    description:
      "برنامج متكامل يركز على تنمية المهارات الإدراكية والحركية والاجتماعية للأطفال من ذوي الهمم من خلال أنشطة تفاعلية وألعاب علمية مصممة خصيصاً.",
    content: [
      "مفهوم تنمية المهارات وتطبيقاتها العملية",
      "الأنشطة الحركية الدقيقة والكبيرة لتنمية العضلات",
      "تحسين التركيز، الانتباه وتنشيط الذاكرة بالألعاب البصرية والسمعية",
      "بناء المهارات الاجتماعية والتواصل مع الأقران",
      "تعليم السلوكيات الاستقلالية اليومية (تنظيم وتناول الطعام والنظافة)",
      "استخدام الفن واللعب في تفريغ الطاقات وتطوير الذكاء",
      "جلسات استشارية دورية مع أولياء الأمور لمتابعة التطور الميداني",
    ],
    requirements: ["متابعة ومشاركة ولي الأمر في التدريبات المنزلية البسيطة"],
    audience: [
      "الأطفال ذوي الهمم الراغبين في تنمية قدراتهم",
      "أولياء الأمور والمعلمين المهتمين بالتعليم التفاعلي الخاص",
    ],
    reviews: [
      {
        name: "سندس م.",
        rating: 5,
        text: "أفضل استثمار قمت به لتعليم وتطوير مهارات ابني الحركية.",
      },
      {
        name: "خالد و.",
        rating: 5,
        text: "المدربة متمكنة جداً وتتعامل بلطف وأسلوب مميز مع الأطفال.",
      },
    ],
  },
  "11": {
    title: "كورس الرعاية النهارية (مركز دليل)",
    instructor: "د.عبدالرازق السيد & د.إيمان حمدي",
    duration: "شهرياً",
    price: "100",
    students: 60,
    level: "مبتدئ",
    description:
      "برنامج رعاية نهارية متكامل وتأهيلي للأطفال من ذوي الهمم، مصمم لمساعدتهم على تنمية مهاراتهم الحركية، الفكرية والاجتماعية في بيئة تعليمية آمنة ومجهزة بأحدث الوسائل الترفيهية والتأهيلية.",
    content: [
      "تقييم سلوكي ومهاري شامل لكل طفل عند الالتحاق",
      "أنشطة تنمية المهارات الإدراكية والتفاعل الاجتماعي",
      "تدريبات حركية وبدنية متخصصة لتقوية العضلات",
      "تنمية مهارات الرعاية الذاتية والاستقلالية اليومية",
      "جلسات تخاطب وتعديل سلوك فردية وجماعية",
      "أنشطة فنية وإبداعية لتفريغ الطاقات وتطوير الذكاء",
      "جلسات إرشاد وتوجيه دورية لأولياء الأمور لمتابعة التطور",
    ],
    requirements: ["زيارة المركز لإجراء التقييم المبدئي وتحديد الاحتياجات"],
    audience: [
      "الأطفال ذوي الهمم بمختلف القدرات",
      "الأطفال الذين يحتاجون إلى تنمية مهارات اجتماعية وتواصلية",
      "أولياء الأمور الراغبين في دمج أطفالهم في مجتمع تأهيلي متخصص",
    ],
    reviews: [
      {
        name: "أم أحمد",
        rating: 5,
        text: "ابني تحسن كثيراً في التواصل وتكوين الصداقات بفضل برنامج الرعاية النهارية.",
      },
      {
        name: "ياسر م.",
        rating: 5,
        text: "رعاية ممتازة واهتمام فائق بالتفاصيل الفردية لكل طفل.",
      },
    ],
  },
};

/* -------------------- FAQ Data -------------------- */
export const faqData: FAQItem[] = [
  {
    question: "كيف يمكنني التقديم على المنح الدراسية؟",
    answer:
      "يمكنك التقديم على المنح الدراسية من خلال صفحة 'المنح الدراسية' في الموقع، حيث تجد قائمة بالمنح المتاحة حالياً مع متطلبات كل منحة ونموذج تقديم إلكتروني بسيط.",
    icon: GraduationCap,
  },
  {
    question: "هل الكورسات التعليمية مجانية؟",
    answer:
      "نوفر مجموعة متنوعة من الكورسات، بعضها مجاني تماماً والبعض الآخر متاح برسوم رمزية. كما نوفر منحاً تدريبية شاملة للمتميزين وذوي الاحتياج.",
    icon: HelpCircle,
  },
  {
    question: "هل الموقع متوافق مع قارئات الشاشة؟",
    answer:
      "نعم، تم تصميم منصة 'دليل' وفقاً لمعايير WCAG العالمية لسهولة الوصول، وهي متوافقة تماماً مع قارئات الشاشة والأدوات المساعدة المختلفة.",
    icon: CheckCircle2,
  },
  {
    question: "كيف يمكنني الحصول على أجهزة مساعدة؟",
    answer:
      "يمكنك زيارة 'المتجر' لاستعراض أحدث الأجهزة والتقنيات المساعدة. نوفر تفاصيل دقيقة لكل منتج، مع إمكانية الشراء مباشرة أو التواصل معنا للاستشارة.",
    icon: ShoppingBag,
  },
  {
    question: "هل توجد شهادات معتمدة للكورسات؟",
    answer:
      "نعم، يحصل المتدرب على شهادة إتمام معتمدة من منصة 'دليل' وشركائنا التعليميين بعد إنهاء متطلبات الكورس واجتياز التقييم النهائي.",
    icon: Award,
  },
];

/* -------------------- Testimonials Data -------------------- */
export const testimonials: Testimonial[] = [
  {
    name: "أسماء صبري",
    role: "مستفيدة - تجربة شخصية",
    avatar: "أ",
    rating: 5,
    text: "من أفضل المؤسسات لذوي الهمم عن تجربة شخصية وناس محترمة وذوق جداً. شكراً جزيلاً وربنا يجازيكم خير بجد.",
  },
  {
    name: "محمد خالد",
    role: "مستفيد - رأي مجتمعي",
    avatar: "م",
    rating: 5,
    text: "مؤسسة تهدف لخدمة المجتمع وهذا هدفها الأول والأهم وليس الربح.",
  },
  {
    name: "Hady D",
    role: "طالب في كورس اللغة الإنجليزية",
    avatar: "H",
    rating: 5,
    text: "أنا هادي من ذوي الاحتياجات الخاصة، بشكر مؤسسة دليل على المساعدة اللي بتتقدم لينا وعلى تعبكم معانا والدعم اللي بيقدموه. الكورس كان بمبلغ رمزي جداً بالنسبة للأسعار اللي كنت بسمعها بره في أي سنتر وكان بحضور. أنا جربت أون لاين لقيت هو هو نفس الحضور أون لاين ويمكن أحسن لأني بكون براحتي والتركيز أفضل. إن شاء الله هيكون في ميزان حسناتكم. بجد أنا اتشرفت جداً واتبسطت في الكورس الإنجليزي واتعلمت كتير وبقيت أحسن. أنا شهادة حق كان مستواي سيء جداً والحمد لله في ملحوظات أضافتلي وبقيت أحسن كتير الحمد لله. طول الوقت نتعلم في حياتنا، شكراً لدعمكم وطبعاً لحضراتكم أستاذة إيمان وأستاذ محمود ودكتورة فاطمة، اتشرفنا بحضراتكم ❤️💪",
  },
  {
    name: "والدة البطل محمود",
    role: "أم لمستفيد من خدماتنا",
    avatar: "و",
    rating: 5,
    text: "فعلاً مركز دليل أحلى مركز وعن تجربة صراحة. ابني محمود دخل المركز والتعليم فيه جميل، والمدرسين والموظفين اللي هناك ونعم الأدب والاحترام، وابني حب المركز جداً. ربنا يبارك فيكم وجزاكم الله خيراً.",
  },
  {
    name: "أخت إحدى المستفيدات",
    role: "أخت مستفيدة من التخاطب",
    avatar: "أ",
    rating: 5,
    text: "أحلى مركز دليل والله عن تجربة، فرقت مع أختي أوي مكنتش بتنطق وبدأت تتكلم. كفاية بتكون مبسوطة وهي رايحالكم ومعاملتكم كويسة والأخصائيين ما شاء الله عليهم. مكنتش متوقعة إنها تتكلم أصلاً بعد لف كتير على المراكز، دليل كان سبب إنها تتحسن. شكراً ليكم بجد وجزاكم الله خيراً.",
  },
];

/* -------------------- OurStory Data -------------------- */
export const timelineItems: TimelineItem[] = [
  {
    year: "٢٠٢٠",
    title: "بداية الفكرة",
    text: 'بدأت فكرة "دليل" عندما لاحظ فريقنا المؤسس الحاجة الماسة لمنصة عربية شاملة تخدم ذوي الإعاقة.',
  },
  {
    year: "٢٠٢١",
    title: "الانطلاقة",
    text: "كان الهدف واضحاً: إنشاء مكان واحد يجمع الخدمات التعليمية والمنتجات المساعدة والدعم المجتمعي.",
  },
  {
    year: "اليوم",
    title: "نفخر بخدمتكم",
    text: "نفخر بخدمة أكثر من ٥٠,٠٠٠ مستفيد في أنحاء العالم العربي ونواصل النمو كل يوم.",
  },
];

/* -------------------- AboutBrief Data -------------------- */
export const aboutBriefData = {
  badge: " مَن نحن؟",
  titleStart: "منصة",
  titleHighlight: "دليل",
  titleEnd: "للتأهيل والتمكين الشامل",
  description:
    "نحن منصة متكاملة وواعية تهدف إلى دعم وتمكين الأشخاص ذوي الإعاقة (ذوي الهمم) وأسرهم من خلال تقديم حلول تأهيلية ونفسية وتعليمية شاملة، تسد الفجوات في المجتمع وتضمن لهم بيئة خصبة للاستقلالية والريادة.",
  features: [
    {
      title: "تأهيل متكامل",
      desc: "نفسي، مهني، وحركي",
    },
    {
      title: "خبرة رائدة",
      desc: "بإشراف نُخبة من الأطباء",
    },
    {
      title: "شراكات رسمية",
      desc: "مع جهات حكومية وخاصة",
    },
  ],
  buttonText: "المزيد عن منصتنا",
};

/* -------------------- Branches Data -------------------- */
export const branchesData = {
  badge: "فروعنا وتواجدنا 📍",
  titleStart: "أينما كنت،",
  titleHighlight: "نحن دائماً بجانبك",
  subtitle:
    "تفضل بزيارتنا في مقراتنا الحضورية الرسمية لتلقي الدعم المباشر، أو انضم لبرامجنا التعليمية والتأهيلية المتكاملة أونلاين من أي مكان.",
  branches: [
    {
      id: "cairo",
      name: "فرع القاهرة",
      type: "offline",
      typeLabel: "حضورياً - أوفلاين",
      address: "الدقي - آخر نزلة كوبري الدقي.",
      phone: "01155845125",
      whatsapp: "https://wa.me/201155845125",
    },
    {
      id: "ismailia",
      name: "فرع الإسماعيلية",
      type: "offline",
      typeLabel: "حضورياً - أوفلاين",
      address: "التل الكبير - بجوار كازيون.",
      phone: "01155845125",
      whatsapp: "https://wa.me/201155845125",
    },
    {
      id: "online",
      name: "الدراسة والتأهيل أونلاين",
      type: "online",
      typeLabel: "عن بُعد - أونلاين",
      address:
        "نقدم خدماتنا ونخبة كورساتنا أونلاين بالكامل بجانب الفروع الحضورية، لتتعلم وتتدرب بمرونة وراحة تامة أينما كنت.",
      phone: "01155845125",
      whatsapp: "https://wa.me/201155845125",
      buttonText: "استكشف الكورسات",
      buttonPath: "/courses",
    },
  ],
};
