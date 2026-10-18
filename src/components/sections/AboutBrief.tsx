import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import aboutIllustration from "@/assets/about_section.jfif";
import { aboutBriefData } from "@/data/staticData";

const PINK =
  "linear-gradient(135deg, hsl(338, 82%, 58%) 0%, hsl(338, 100%, 72%) 100%)";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const icons = [Users, Award, ShieldCheck];

export default function AboutBrief() {
  return (
    <section
      className="py-24 bg-card/25 border-y border-border/50 relative overflow-hidden"
      dir="rtl"
    >
      {/* Background ambient glow */}
      <div
        className="absolute top-1/4 right-0 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: PINK }}
      />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image/Illustration Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="lg:col-span-5 relative"
          >
            {/* Ambient decorative glowing border */}
            <div
              className="absolute -inset-2 rounded-3xl opacity-30 blur-lg"
              style={{ background: PINK }}
            />
            <div className="relative w-full overflow-hidden flex items-center justify-center">
              {/* Main contained image */}
              <img
                src={aboutIllustration}
                alt="دليل التمكين الشامل"
                loading="lazy"
                className="relative z-10 w-full h-auto object-cover hover:scale-105 transition-transform duration-700 rounded-3xl"
              />
            </div>
          </motion.div>

          {/* Text Content Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="lg:col-span-7 space-y-6 text-right"
          >
            {/* Badge */}
            <span
              className="text-xs font-semibold px-4 py-1.5 rounded-full text-foreground inline-block shadow-sm"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {aboutBriefData.badge}
            </span>

            <h2 className="text-3xl md:text-4xl font-black text-foreground leading-tight">
              {aboutBriefData.titleStart}{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: PINK }}
              >
                {aboutBriefData.titleHighlight}
              </span>{" "}
              {aboutBriefData.titleEnd}
            </h2>

            <p className="text-muted-foreground leading-relaxed text-base">
              {aboutBriefData.description}
            </p>

            {/* Quick value statements */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {aboutBriefData.features.map((feature, idx) => {
                const IconComponent = icons[idx] || Users;
                const iconColorClass =
                  idx === 0
                    ? "text-pink-500"
                    : idx === 1
                      ? "text-purple-500"
                      : "text-blue-500";
                return (
                  <div
                    key={feature.title}
                    className="p-4 bg-card/60 rounded-2xl border border-border/80 flex flex-col items-center text-center gap-2"
                  >
                    <IconComponent className={`w-6 h-6 ${iconColorClass}`} />
                    <span className="font-bold text-sm text-foreground">
                      {feature.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {feature.desc}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-6">
              <Button
                asChild
                size="lg"
                className="gradient-pink border-0 font-bold px-8 py-6 rounded-full shadow-lg shadow-pink-500/20 hover:scale-105 transition-transform duration-300"
              >
                <Link to="/about">{aboutBriefData.buttonText}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
