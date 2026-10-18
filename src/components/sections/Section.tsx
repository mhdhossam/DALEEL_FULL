import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  title?: string;
  subtitle?: string;
  variant?: "default" | "muted" | "card" | "navy";
}

// ✅ خارج component عشان لا يتم إنشاءه كل render
const bgClasses: Record<SectionProps["variant"], string> = {
  default: "bg-background",
  muted: "bg-secondary",
  card: "bg-card",
  navy: "gradient-navy text-primary-foreground",
};

export function Section({
  children,
  className,
  id,
  title,
  subtitle,
  variant = "default",
}: SectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", bgClasses[variant] ?? bgClasses.default, className)}>
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="text-center mb-12 md:mb-16">
            {title && (
              <h2
                className={cn(
                  "text-3xl md:text-4xl font-bold mb-4",
                  variant === "navy" && "text-primary-foreground"
                )}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  "text-lg max-w-2xl mx-auto",
                  variant === "navy" ? "text-primary-foreground/70" : "text-muted-foreground"
                )}
              >
                {subtitle}
              </p>
            )}
            <div className="w-20 h-1 gradient-pink rounded-full mx-auto mt-6" />
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
