import React, { memo } from "react";
import { Company } from "../types";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CompanyCardProps {
  company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = memo(({ company }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 rounded-3xl h-full flex flex-col">
        <CardHeader className="relative p-0 h-32 overflow-hidden">
          <img
            src={company.banner}
            alt={company.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Badge className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white border-white/20">
            {company.industry}
          </Badge>
        </CardHeader>

        <CardContent className="relative pt-12 pb-6 px-6 flex-grow flex flex-col justify-between">
          <div className="absolute -top-10 right-6 p-2 bg-background rounded-2xl shadow-lg border border-border group-hover:scale-110 transition-transform duration-500 z-10">
            <img
              src={company.logo}
              alt={company.name}
              className="w-14 h-14 object-contain rounded-xl"
            />
          </div>

          <div className="space-y-4 text-right flex-grow">
            <h3 className="text-xl font-bold text-navy dark:text-foreground group-hover:text-primary transition-colors">
              {company.name}
            </h3>

            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {company.shortDescription}
            </p>

            <div className="flex items-center justify-end gap-4 pt-2 text-xs text-muted-foreground font-medium mt-auto">
              <div className="flex items-center gap-1">
                <span>{company.industry}</span>
                <Building2 className="w-3.5 h-3.5 text-primary" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

export default CompanyCard;
