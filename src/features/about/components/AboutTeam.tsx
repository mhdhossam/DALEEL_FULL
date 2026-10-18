import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Section } from "@/components/sections/Section";
import { getTeamMembers } from "@/lib/contentApi";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }) };

export const AboutTeam: React.FC = () => {
  const { data: team = [], isLoading } = useQuery({ queryKey: ["public-team"], queryFn: getTeamMembers });
  const initials = (name: string) => name.split(" ").filter(Boolean).map((n) => n[0]).join(" ");

  return <Section title="فريق العمل">
    {isLoading ? <div className="py-12 text-center text-muted-foreground">جاري تحميل فريق العمل...</div> : <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
      {team.map((member, i) => <motion.div key={member.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} whileHover={{ y: -6 }} className="group relative bg-card/50 backdrop-blur-lg rounded-[2rem] p-5 border border-border/60 hover:border-primary/30 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col gap-5">
        <div className="relative w-full aspect-[5/4] shrink-0"><div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-primary translate-x-2 translate-y-2 opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300 ease-out" /><div className="absolute inset-0 rounded-2xl bg-card overflow-hidden border border-border/80 flex items-center justify-center shadow-inner z-10">{member.image ? <img src={member.image} alt={member.name} loading="lazy" className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${member.position || "object-center"}`} /> : <div className="w-full h-full gradient-pink flex items-center justify-center text-white text-3xl font-black shadow-inner">{initials(member.name)}</div>}</div></div>
        <div className="text-right pr-1 z-20"><h3 className="text-lg font-black text-foreground group-hover:text-primary transition-colors duration-300 mb-1">{member.name}</h3><span className="inline-block text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">{member.role}</span></div>
      </motion.div>)}
    </div>}
  </Section>;
};
