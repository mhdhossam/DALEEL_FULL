import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/sections/Section";
import { goals } from "@/data/staticData";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export const AboutGoals: React.FC = () => {
  return (
    <Section title="أهدافنا">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {goals.map((goal, i) => (
          <motion.div
            key={goal.title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            whileHover={{ y: -8 }}
            className="group relative bg-card rounded-[2rem] p-6 text-center border border-border/50 shadow-md hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col items-center gap-5"
          >
            {/* Decorative light overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity duration-300 pointer-events-none" />
            
            {/* Image Illustration Container */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-muted/40 border border-border/60 shadow-inner flex items-center justify-center">
              <img
                src={goal.image}
                alt={goal.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Title & Description */}
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                {goal.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed px-1">
                {goal.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
