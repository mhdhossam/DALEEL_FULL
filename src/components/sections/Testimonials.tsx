import { motion } from "framer-motion";
import { Star, Quote, Sparkles } from "lucide-react";
import { testimonials } from "@/data/staticData";

const PINK = "linear-gradient(135deg, hsl(338, 82%, 58%) 0%, hsl(338, 100%, 72%) 100%)";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemAnim = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Testimonials() {
  return (
    <section className="w-full bg-background py-24 px-6 relative overflow-hidden" dir="rtl">
      {/* Decorative glows */}
      <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full opacity-5 blur-3xl pointer-events-none bg-pink-500" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 rounded-full opacity-5 blur-3xl pointer-events-none bg-blue-500" />

      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-3 mb-16 text-center"
        >
          <span className="text-xs font-semibold px-4 py-1.5 rounded-full text-foreground inline-flex items-center gap-1.5 shadow-sm bg-card border border-border">
            🗣️ تجارب حقيقية
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground">قصص نجاح من عائلتنا</h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm leading-relaxed">
            نكبر ونرتقي بثقتكم الغالية ورسائلكم التي تمنحنا القوة للاستمرار في العطاء والتمكين.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {testimonials.map(({ name, role, avatar, rating, text }) => {
            const isHady = name === "Hady D";
            const isMother = name === "والدة البطل محمود";
            return (
              <motion.div
                key={name}
                variants={itemAnim}
                className={`relative rounded-[2.5rem] p-8 flex flex-col justify-between border border-border/80 bg-card/45 backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl ${
                  isHady 
                    ? "md:col-span-2 border-transparent shadow-lg shadow-pink-500/5" 
                    : "hover:border-pink-500/20 hover:shadow-pink-500/5"
                }`}
              >
                {/* 3D Glowing Border for Hady (Featured in the middle) */}
                {isHady && (
                  <div 
                    className="absolute -inset-[1.5px] rounded-[2.5rem] opacity-35 blur-[2.5px] pointer-events-none"
                    style={{ background: "linear-gradient(90deg, #ec4899, #8b5cf6, #3b82f6)" }}
                  />
                )}

                {/* Inner Container to sit above absolute elements */}
                <div className="relative z-10 space-y-6 flex flex-col justify-between h-full">
                  {/* Quote + Stars + Featured Badge */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Quote size={28} className="text-pink-500/20 fill-pink-500/10" />
                      {isHady && (
                        <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 border border-pink-500/20 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          قصة ملهمة
                        </span>
                      )}
                      {isMother && (
                        <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          تجربة أم
                        </span>
                      )}
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: rating }).map((_, i) => (
                        <Star key={i} size={14} className="text-pink-500 fill-pink-500" />
                      ))}
                    </div>
                  </div>

                  {/* Text */}
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 text-right">
                    {text}
                  </p>

                  {/* Author Profile */}
                  <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shrink-0 shadow-inner"
                      style={{ background: PINK }}
                    >
                      {avatar}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground">{name}</p>
                      <p className="text-xs text-muted-foreground">{role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
