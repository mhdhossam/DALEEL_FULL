import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { memo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBag, CreditCard, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/sections/Section";
import Partners from "@/components/sections/Partners";
import AboutBrief from "@/components/sections/AboutBrief";
import FAQ from "@/components/sections/FAQ";
import Branches from "@/components/sections/Branches";
import SEO from "@/components/common/SEO";
import {
  Service,
  Product,
  services,
  homeProducts as products,
} from "@/data/staticData";
import { getPublicCourses, PublicCourse } from "@/lib/contentApi";
/* -------------------- Motion Variants -------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" as const },
  }),
};

const heroAnim = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const ServiceCard = memo(({ service, i }: { service: Service; i: number }) => (
  <motion.div
    custom={i}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    variants={fadeUp}
    whileHover={{ y: -6 }}
    className="group relative bg-card/60 backdrop-blur-md rounded-3xl p-7 border border-border/80 shadow-md hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col justify-between"
  >
    <div>
      {/* Icon with glowing shadow */}
      <div className="w-14 h-14 gradient-pink rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-pink-500/20 group-hover:scale-110 transition-transform duration-300">
        <service.icon className="w-7 h-7 text-white" />
      </div>

      {/* Title & Description */}
      <h3 className="text-2xl font-black mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
        {service.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
        {service.desc}
      </p>
    </div>

    {/* Badges/Tags for Service Items */}
    {service.items && service.items.length > 0 && (
      <div className="pt-4 border-t border-border/60">
        <div className="flex flex-wrap gap-2">
          {service.items.map((item) => (
            <span
              key={item}
              className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 shadow-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    )}
  </motion.div>
));

const CourseCard = memo(({ course, i }: { course: PublicCourse; i: number }) => (
  <motion.div
    custom={i}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeUp}
    className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition"
  >
    {/* Image */}
    <div className="relative aspect-video w-full overflow-hidden">
      <img
        src={(course.card_image || course.image || "")}
        alt={`صورة كورس ${course.title}`}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />

      {/* Level Badge */}
      <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
        {course.level}
      </span>
    </div>

    {/* Content */}
    <div className="p-5">
      <h3 className="font-bold mb-2 text-lg">{course.title}</h3>

      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {course.duration}
        </span>
        <span className="flex items-center gap-1.5">
          <CreditCard className="w-3.5 h-3.5 text-primary" />
          {course.price}
        </span>
      </div>

      <Button asChild className="w-full gradient-pink border-0">
        <Link to={`/courses/${course.id}`}>عرض التفاصيل</Link>
      </Button>
    </div>
  </motion.div>
));

const ProductCard = memo(({ product }: { product: Product }) => (
  <div className="bg-background p-6 rounded-xl border border-border">
    <ShoppingBag className="w-12 h-12 text-primary/40 mb-4" />
    <h3 className="font-bold mb-2">{product.title}</h3>
    <p className="text-primary font-semibold mb-4">{product.price}</p>
    <Button
      disabled={!product.available}
      className="w-full gradient-pink border-0"
    >
      إضافة إلى السلة
    </Button>
  </div>
));

/* -------------------- HomePage -------------------- */
export default function HomePage() {
  const { data: courses = [] } = useQuery({ queryKey: ["public-courses"], queryFn: getPublicCourses });
  const featuredCourses = courses.slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <SEO
        title="دليل - المنصة التعليمية الأولى لدعم وتمكين ذوي الإعاقة"
        description="اكتشف عالمًا من المعرفة مع دليل. كورسات متخصصة، منح دراسية، ومسارات تعلم مخصصة لدعم وتمكين ذوي الإعاقة."
      />
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <img
          src="/hero-bg.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-navy/50 via-navy/35 to-navy/50" />
        <div className="container mx-auto px-4 relative z-10 max-w-2xl text-center">
          <motion.div {...heroAnim}>
            <h1 className="font-bold text-white mb-6 leading-tight">
              <span className="block text-5xl md:text-7xl font-black mb-3">دليل</span>
              <span className="text-2xl md:text-4xl block font-medium opacity-90">نحو حياة أفضل وأكثر استقلالية</span>
            </h1>
            <p className="text-lg text-white/80 mb-8">
              نوفر لك الأدوات والتعليم والدعم اللازم لتحقيق أقصى إمكانياتك.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="gradient-pink border-0">
                <Link to="/courses">استكشف الكورسات</Link>
              </Button>
              {/* <Button asChild size="lg" variant="outline">
                <Link to="/store">تسوق الآن</Link>
              </Button> */}
            </div>
          </motion.div>
        </div>
      </section>
      {/* Partners */}
      <section>
        <Partners />
      </section>

      {/* About Section */}
      <AboutBrief />

      {/* Services */}
      <Section title="خدماتنا" variant="muted">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} i={i} />
          ))}
        </div>
      </Section>

      {/* Courses */}
      <Section title="الكورسات المميزة">
        <div className="grid md:grid-cols-3 gap-6">
          {featuredCourses.map((c, i) => (
            <CourseCard key={c.id} course={c} i={i} />
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Button asChild size="lg" className="gradient-pink border-0 font-bold px-8 py-6 rounded-full shadow-lg shadow-pink-500/20 hover:scale-105 transition-transform duration-300">
            <Link to="/courses">تصفح جميع الكورسات</Link>
          </Button>
        </div>
      </Section>
      {/* FAQ Section */}
      <Section title="الأسئلة الشائعة">
        <FAQ />
      </Section>

      {/* Branches Section */}
      <Branches />

      {/* Products */}
      {/* <Section title="منتجات مميزة" variant="muted">
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section> */}
    </>
  );
}
