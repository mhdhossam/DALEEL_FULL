import { Company, Application } from "./types";

// Asset Registry - Importing real logos
import logoAmazon from "@/assets/hiring/amazon.webp";
import logoVodafone from "@/assets/hiring/vodafone.webp";
import logoTalabat from "@/assets/hiring/talabat.webp";
import logoRaya from "@/assets/hiring/raya.webp";
import logoAman from "@/assets/hiring/aman.webp";
import logoAmericana from "@/assets/hiring/americana.webp";
import logoIBS from "@/assets/hiring/ibs.webp";
import logoSunway from "@/assets/hiring/sunway.webp";

export const mockCompanies: Company[] = [
  {
    id: "amazon",
    name: "Amazon Egypt",
    logo: logoAmazon,
    banner: "https://www.expresstv.ma/wp-content/uploads/2025/09/Mise-en-avant-produits-locaux-hypermarche-7.jpg",
    shortDescription: "الشركة الأكبر عالمياً في التجارة الإلكترونية والحوسبة السحابية.",
    description: "أمازون مصر تسعى لتكون الشركة الأكثر اهتماماً بالعملاء في العالم. نحن نوفر بيئة عمل شاملة تدعم التنوع والابتكار، ونرحب دائماً بذوي الهمم في مختلف قطاعاتنا.",
    industry: "التجارة الإلكترونية",
    location: "مدينة نصر، القاهرة",
    website: "www.amazon.eg",
    teamSize: "+٥٠٠٠ موظف",
  },
  {
    id: "vodafone",
    name: "Vodafone",
    logo: logoVodafone,
    banner: "https://gptgroupretailer.imgix.net/getContentAsset/13db8738-ef79-478f-a552-910e848d50a1/93479c80-15d9-49ec-a442-167558b21428/STORE-PIC.jpg?auto=format&fit=max&w=1200&h=1200",
    shortDescription: "الشركة الرائدة في مجال الاتصالات والخدمات الرقمية.",
    description: "فودافون مصر هي المشغل رقم ١ للمحمول في مصر. نحن نهدف إلى ربط الناس لمستقبل أفضل، ونلتزم بخلق بيئة عمل ميسرة وتكنولوجية متقدمة لجميع موظفينا.",
    industry: "الاتصالات",
    location: "القرية الذكية، الجيزة",
    website: "www.vodafone.com.eg",
    teamSize: "+١٠٠٠٠ موظف",
  },
  {
    id: "talabat",
    name: "Talabat",
    logo: logoTalabat,
    banner: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=1200",
    shortDescription: "المنصة الرائدة لطلب الطعام والبقالة عبر الإنترنت.",
    description: "طلبات هي منصة التوصيل الأسرع نمواً في الشرق الأوسط. نحن نؤمن بقوة الشمول ونسعى لتوفير فرص عمل مرنة وإدارية للجميع.",
    industry: "خدمات التوصيل",
    location: "المعادي، القاهرة",
    website: "www.talabat.com",
    teamSize: "+٢٠٠٠ موظف",
  },
  {
    id: "raya",
    name: "Raya Holding",
    logo: logoRaya,
    banner: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200",
    shortDescription: "مجموعة استثمارية رائدة تدير محفظة متنوعة من الشركات.",
    description: "راية القابضة هي مجموعة استثمارية كبرى تعمل في مجالات التكنولوجيا، مراكز الاتصال، والخدمات المالية. نولي اهتماماً خاصاً بدمج ذوي الهمم في قوتنا العاملة.",
    industry: "الاستثمار والتكنولوجيا",
    location: "مدينة ٦ أكتوبر",
    website: "www.rayaholding.com",
    teamSize: "+١٢٠٠٠ موظف",
  },
  {
    id: "aman",
    name: "Aman",
    logo: logoAman,
    banner: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200",
    shortDescription: "الشركة الأكبر في مجال الخدمات المالية غير المصرفية.",
    description: "أمان للمدفوعات الإلكترونية والخدمات المالية تهدف إلى تعزيز الشمول المالي في مصر. نحن نوفر فرصاً مهنية في مختلف المحافظات.",
    industry: "الخدمات المالية",
    location: "التل الكبير، الإسماعيلية",
    website: "www.aman.eg",
    teamSize: "+٣٠٠٠ موظف",
  },
  {
    id: "americana",
    name: "Americana",
    logo: logoAmericana,
    banner: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200",
    shortDescription: "الشركة الرائدة في مجال الصناعات الغذائية والمطاعم.",
    description: "أمريكانا هي واحدة من أكبر الشركات في الشرق الأوسط. نحن فخورون بسياساتنا الداعمة للتوظيف الشامل وتوفير بيئة عمل آمنة ومحفزة.",
    industry: "الأغذية والمطاعم",
    location: "الإسماعيلية",
    website: "www.americana-foods.com",
    teamSize: "+٢٠٠٠٠ موظف",
  },
  {
    id: "ibs",
    name: "IBS",
    logo: logoIBS,
    banner: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    shortDescription: "حلول تقنية متطورة وخدمات إدارية متكاملة.",
    description: "IBS متخصصة في تقديم الاستشارات الإدارية والحلول التقنية للشركات الكبرى. نؤمن بأن الكفاءة لا تعرف قيوداً.",
    industry: "الاستشارات والتقنية",
    location: "مدينة نصر، القاهرة",
    website: "www.ibs-egypt.com",
    teamSize: "+٥٠٠ موظف",
  },
  {
    id: "sunway",
    name: "Sunway",
    logo: logoSunway,
    banner: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=1200",
    shortDescription: "خدمات لوجستية وسلاسل إمداد عالمية.",
    description: "صن واي لوجستيكس توفر حلولاً مبتكرة في النقل والتخزين. نحن نرحب بالكوادر الطموحة الراغبة في التطور المهني.",
    industry: "اللوجستيات",
    location: "بورسعيد، مصر",
    website: "www.sunway.eg",
    teamSize: "+١٠٠٠ موظف",
  },
];

export const initialApplications: Application[] = [
  {
    id: "app-1",
    companyId: "amazon",
    companyName: "Amazon Egypt",
    status: "Pending",
    applicantName: "أحمد علي",
    applicantEmail: "ahmed@example.com",
    applicantPhone: "0123456789",
    cvUrl: "resume.pdf",
    appliedDate: "2024-03-15",
  },
  {
    id: "app-2",
    companyId: "vodafone",
    companyName: "Vodafone",
    status: "Reviewed",
    applicantName: "سارة محمود",
    applicantEmail: "sara@example.com",
    applicantPhone: "0987654321",
    cvUrl: "cv.pdf",
    appliedDate: "2024-03-20",
  },
];
