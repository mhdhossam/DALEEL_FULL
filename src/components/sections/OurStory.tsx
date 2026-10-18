import { motion } from "framer-motion";

const PINK = "linear-gradient(135deg, hsl(338, 82%, 58%) 0%, hsl(338, 100%, 72%) 100%)";

import { timelineItems } from "@/data/staticData";

export default function OurStory() {
    return (
        <section className="w-full py-16 px-4" dir="rtl">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center gap-3 mb-16 text-center"
                >
                    <h2 className="text-4xl font-black text-foreground">قصتنا</h2>
                    <div className="w-12 h-1.5 rounded-full" style={{ background: PINK }} />
                </motion.div>

                {/* Timeline */}
                <div className="relative flex flex-col gap-12">
                    {/* Vertical line with animation */}
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        viewport={{ once: true }}
                        className="absolute right-[19px] top-0 w-0.5 rounded-full z-0"
                        style={{ background: "linear-gradient(to bottom, hsl(338,82%,58%), transparent)" }}
                    />
                    
                    {timelineItems.map(({ year, title, text }, i) => (
                        <motion.div 
                            key={year} 
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="flex items-start gap-8 pr-14 relative z-10 group"
                        >
                            {/* Dot / Year Indicator */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20, delay: i * 0.2 + 0.3 }}
                                viewport={{ once: true }}
                                className="absolute right-0 top-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-[10px] font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform cursor-default"
                                style={{ 
                                    background: PINK, 
                                    boxShadow: "0 4px 14px hsla(338,75%,60%,0.40)" 
                                }}
                            >
                                {year}
                            </motion.div>

                            {/* Content */}
                            <div className="flex flex-col gap-2 pt-1">
                                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                    {title}
                                </h3>
                                <p className="text-base text-muted-foreground leading-relaxed leading-8">
                                    {text}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
