import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { memo } from "react";
import { 
  GraduationCap, 
  HelpCircle, 
  CheckCircle2, 
  ShoppingBag, 
  Award
} from "lucide-react";

import { faqData } from "@/data/staticData";

const FAQ = memo(function FAQ() {
  return (
    <div className="max-w-4xl mx-auto">
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqData.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <AccordionItem
              value={`item-${i}`}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl px-6 transition-all hover:bg-card hover:border-primary/30 group overflow-hidden shadow-sm"
            >
              <AccordionTrigger className="text-right hover:no-underline py-6 group">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                    <faq.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-lg font-bold group-hover:text-primary transition-colors text-foreground/90">
                    {faq.question}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pr-14 pb-6 text-base animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="border-r-2 border-primary/20 pr-4">
                  {faq.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </div>
  );
});

export default FAQ;
