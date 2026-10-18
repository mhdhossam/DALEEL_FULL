import { motion } from "framer-motion";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import Phone from "lucide-react/dist/esm/icons/phone";
import Laptop from "lucide-react/dist/esm/icons/laptop";
import Sparkles from "lucide-react/dist/esm/icons/sparkles";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { branchesData } from "@/data/staticData";

const PINK = "linear-gradient(135deg, hsl(338, 82%, 58%) 0%, hsl(338, 100%, 72%) 100%)";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Branches() {
  return (
    <section className="py-24 bg-card/20 border-t border-border/50 relative overflow-hidden" dir="rtl">
      {/* Ambient decorative glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 rounded-full opacity-5 blur-3xl pointer-events-none bg-pink-500" />
      <div className="absolute bottom-0 right-10 w-80 h-80 rounded-full opacity-5 blur-3xl pointer-events-none bg-blue-500" />

      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold px-4 py-1.5 rounded-full text-foreground inline-flex items-center gap-1.5 shadow-sm bg-card border border-border"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
            {branchesData.badge}
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-foreground leading-tight"
          >
            {branchesData.titleStart}{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: PINK }}>
              {branchesData.titleHighlight}
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
          >
            {branchesData.subtitle}
          </motion.p>
        </div>

        {/* Branches & Modes Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {branchesData.branches.map((branch) => {
            const isOnline = branch.type === "online";
            const Icon = isOnline ? Laptop : MapPin;
            const themeColorClass = branch.id === "cairo" ? "text-pink-500" : branch.id === "ismailia" ? "text-purple-500" : "text-pink-500";
            const bgGlowClass = branch.id === "cairo" ? "bg-pink-500/10" : branch.id === "ismailia" ? "bg-purple-500/10" : "bg-pink-500/10";
            
            return (
              <motion.div
                key={branch.id}
                variants={cardVariants}
                className={`group relative overflow-hidden rounded-[2rem] border p-8 flex flex-col justify-between min-h-[220px] transition-all duration-300 text-right ${
                  isOnline 
                    ? "border-pink-500/20 bg-card/45 backdrop-blur-md shadow-lg shadow-pink-500/5 hover:border-pink-500/40 hover:shadow-2xl hover:shadow-pink-500/10" 
                    : `border-border/80 bg-card/45 backdrop-blur-md hover:shadow-2xl ${
                        branch.id === "cairo" ? "hover:border-pink-500/20 hover:shadow-pink-500/5" : "hover:border-purple-500/20 hover:shadow-purple-500/5"
                      }`
                }`}
              >
                {/* Ambient glow decoration */}
                {isOnline ? (
                  <div className="absolute -inset-[1.5px] rounded-[2rem] opacity-25 blur-[2px] pointer-events-none" style={{ background: PINK }} />
                ) : (
                  <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-5 blur-xl pointer-events-none ${branch.id === "cairo" ? "bg-pink-500" : "bg-purple-500"}`} />
                )}

                <div className="relative z-10 flex-1 flex flex-col justify-between">
                  <div>
                    <div className={`w-12 h-12 rounded-2xl ${bgGlowClass} flex items-center justify-center ${themeColorClass} mb-6 group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                      <span className={`text-[10px] font-bold ${themeColorClass} tracking-wider uppercase`}>
                        {branch.typeLabel}
                      </span>
                      <h3 className="text-xl font-bold text-foreground">{branch.name}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {branch.address}
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border/40 mt-4 flex items-center justify-between text-xs text-muted-foreground transition-colors">
                    {isOnline && branch.buttonText ? (
                      <Button asChild size="sm" className="gradient-pink border-0 text-xs font-bold rounded-full h-8 px-4">
                        <Link to={branch.buttonPath || "/courses"}>{branch.buttonText}</Link>
                      </Button>
                    ) : null}
                    
                    <a 
                      href={branch.whatsapp} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1.5 font-bold ${isOnline ? "text-muted-foreground hover:text-pink-500" : `group-hover:${themeColorClass}`}`}
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {isOnline ? "راسلنا واتساب" : `واتساب: ${branch.phone}`}
                    </a>
                    
                    {!isOnline && <ArrowUpRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${themeColorClass}`} />}
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
