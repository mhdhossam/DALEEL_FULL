import { motion } from "framer-motion";
import Phone from "lucide-react/dist/esm/icons/phone";
import Mail from "lucide-react/dist/esm/icons/mail";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import Sparkles from "lucide-react/dist/esm/icons/sparkles";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import MessageSquare from "lucide-react/dist/esm/icons/message-square";
import { Button } from "@/components/ui/button";
import SEO from "@/components/common/SEO";

const PINK = "linear-gradient(135deg, hsl(338, 82%, 58%) 0%, hsl(338, 100%, 72%) 100%)";
const BLUE = "linear-gradient(135deg, hsl(200, 95%, 48%) 0%, hsl(200, 100%, 65%) 100%)";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden" dir="rtl">
      <SEO 
        title="تواصل معنا - نحن هنا لمساعدتك" 
        description="هل لديك استفسار؟ فريق عمل دليل جاهز للرد على جميع تساؤلاتكم ومساعدتكم في أي وقت."
      />

      {/* Decorative ambient background glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-10 blur-[120px] pointer-events-none" style={{ background: PINK }} />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-10 blur-[120px] pointer-events-none" style={{ background: BLUE }} />

      {/* Futuristic Center-Aligned Header */}
      <div className="container mx-auto px-6 pt-32 pb-16 text-center space-y-6 relative z-10">
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-xs font-semibold px-4 py-1.5 rounded-full text-foreground inline-flex items-center gap-1.5 shadow-sm bg-card border border-border"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
          تواصل معنا 🌟
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-6xl font-black text-foreground leading-tight max-w-4xl mx-auto"
        >
          نحن هنا لسماع صوتك،{" "}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: PINK }}>
            تحدث معنا بحرية
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          نؤمن أن كل رسالة أو اقتراح هو حجر أساس لبناء مجتمع أكثر تكاملاً ودعماً لذوي الهمم. شاركنا أفكارك الآن.
        </motion.p>
      </div>

      {/* Horizontal Bento Cards (3 columns grid) */}
      <div className="container mx-auto px-6 max-w-6xl mb-16 relative z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Card 1: WhatsApp */}
          <motion.a
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            href="https://wa.me/201155845125"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-3xl border border-border/80 bg-card/45 backdrop-blur-md p-6 flex flex-col justify-between hover:border-pink-500/30 hover:shadow-2xl hover:shadow-pink-500/5 transition-all duration-300 min-h-[160px] text-right"
          >
            <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-10 blur-xl bg-pink-500 pointer-events-none" />
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform">
                <Phone className="w-5.5 h-5.5" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
            <div className="space-y-1 pt-4">
              <span className="text-[11px] text-muted-foreground font-semibold">مراسلة فورية</span>
              <h4 className="text-lg font-bold text-foreground">واتساب: 01155845125</h4>
              <p className="text-xs text-muted-foreground">اضغط لبدء محادثة فورية معنا على واتساب</p>
            </div>
          </motion.a>

          {/* Card 2: Email */}
          <motion.a
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            href="mailto:hr@daleelpwd.com"
            className="group relative overflow-hidden rounded-3xl border border-border/80 bg-card/45 backdrop-blur-md p-6 flex flex-col justify-between hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/5 transition-all duration-300 min-h-[160px] text-right"
          >
            <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-10 blur-xl bg-purple-500 pointer-events-none" />
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                <Mail className="w-5.5 h-5.5" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
            <div className="space-y-1 pt-4">
              <span className="text-[11px] text-muted-foreground font-semibold">المراسلة الإلكترونية</span>
              <h4 className="text-base font-bold text-foreground truncate select-all">hr@daleelpwd.com</h4>
              <p className="text-xs text-muted-foreground">رد رسمي خلال ٢٤ ساعة عمل</p>
            </div>
          </motion.a>

          {/* Card 3: Location */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="group relative overflow-hidden rounded-3xl border border-border/80 bg-card/45 backdrop-blur-md p-6 flex flex-col justify-between hover:border-violet-500/30 transition-all duration-300 min-h-[160px] text-right"
          >
            <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-10 blur-xl bg-violet-500 pointer-events-none" />
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-500">
                <MapPin className="w-5.5 h-5.5" />
              </div>
            </div>
            <div className="space-y-1 pt-4">
              <span className="text-[11px] text-muted-foreground font-semibold">المقر الرئيسي</span>
              <h4 className="text-base font-bold text-foreground">القاهرة، مدينة نصر</h4>
              <p className="text-xs text-muted-foreground">جمهورية مصر العربية</p>
            </div>
          </motion.div>
        </motion.div>
      </div>



      {/* Map Section */}
      <div className="container mx-auto px-6 max-w-6xl pb-24 relative z-10">
        <div className="text-right space-y-2 mb-6">
          <h3 className="text-xl font-bold text-foreground">موقعنا الجغرافي</h3>
          <p className="text-xs text-muted-foreground">تفضل بزيارتنا في مقرنا الرئيسي بجمهورية مصر العربية.</p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[400px] rounded-[2.5rem] overflow-hidden border border-border/80 shadow-2xl"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.7932822986423!2d31.332306275323953!3d30.04443747492473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583e2365997233%3A0xc3f8e58f0cf5637!2z2YXYr9mK2YbZhyDZhti12LEsINmF2K3Yp9mB2LjYqSDYp9mE2YLYp9mH2LHYqQ!5e0!3m2!1sar!2seg!4v1710551000000!5m2!1sar!2seg"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="موقعنا في مدينة نصر، القاهرة"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale-[0.1] contrast-[1.05] brightness-[1.0] dark:invert dark:hue-rotate-180 dark:brightness-[0.8] transition-all"
          />
        </motion.div>
      </div>

    </div>
  );
}