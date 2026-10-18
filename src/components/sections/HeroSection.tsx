import { useCountUp } from "@/hooks/useCountUp";
import { motion } from "framer-motion";

const PINK = "linear-gradient(135deg, hsl(338, 82%, 58%) 0%, hsl(338, 100%, 72%) 100%)";

// ─── Animated Counter ──────────────────────────────────────────────────────────
function AnimatedNumber({ value }: { value: string }) {
    // Parse prefix (e.g. "+"), numeric part, and suffix (e.g. "٪")
    const match = value.match(/^([^\d]*)([\d]+)(.*)$/);
    
    // If no match (e.g. "مجاني"), just render the value directly
    if (!match) {
        return (
            <span
                className="text-2xl sm:text-3xl font-black bg-clip-text text-transparent"
                style={{ backgroundImage: PINK }}
            >
                {value}
            </span>
        );
    }

    const prefix = match[1] ?? "";
    const target = parseInt(match[2], 10);
    const suffix = match[3] ?? "";

    const { ref, count } = useCountUp(target);

    return (
        <span
            ref={ref}
            className="text-2xl sm:text-3xl font-black bg-clip-text text-transparent"
            style={{ backgroundImage: PINK }}
        >
            {prefix}{count}{suffix}
        </span>
    );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function HeroSection({
    badge = "منصة ذوي الهمم 🌟",
    titleStart = "كل إنسان يحمل",
    titleHighlight = "هِمَّةً لا تُكسر",
    subtitle = "منصة متكاملة تُمكّن ذوي الهمم من الوصول إلى الفرص وبناء مستقبل أفضل باستقلالية وكرامة.",
    stats = [
        { num: "+850", label: "مستفيد مسجّل" },
        { num: "+55", label: "شريك معتمد" },
        { num: "80٪", label: "نسبة الرضا" },
    ],
}) {
    return (
        <section
            className="min-h-[24rem] md:h-96 py-12 md:py-0 flex flex-col items-center justify-center px-6 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, hsl(220, 68%, 15%) 0%, hsl(220, 60%, 22%) 100%)" }}
            dir="rtl"
        >
            {/* Soft background glow */}
            <div
                className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{ background: PINK }}
            />

            {/* Content */}
            <div className="max-w-2xl w-full text-center z-10 flex flex-col items-center gap-5 md:gap-6">

                {/* Badge */}
                {badge && (
                    <motion.span
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full text-white inline-block"
                        style={{
                            background: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            animation: "badge-float 3s ease-in-out infinite",
                        }}
                    >
                        {badge}
                    </motion.span>
                )}

                {/* Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-snug">
                    {titleStart}{" "}
                    <span className="bg-clip-text text-transparent" style={{ backgroundImage: PINK }}>
                        {titleHighlight}
                    </span>
                </h1>

                {/* Subtitle */}
                {subtitle && (
                    <p className="text-sm sm:text-base text-white/50 leading-relaxed max-w-md">
                        {subtitle}
                    </p>
                )}


                {/* Divider + Stats */}
                {stats?.length > 0 && (
                    <>
                        <div className="w-full h-px mt-2 md:mt-4" style={{ background: "rgba(255,255,255,0.07)" }} />
                        <div className="grid grid-cols-3 gap-4 sm:gap-8 w-full">
                            {stats.map(({ num, label }) => (
                                <div key={label} className="flex flex-col items-center gap-1">
                                    <AnimatedNumber value={num} />
                                    <span className="text-[10px] sm:text-xs text-white/40">{label}</span>
                                </div>
                            ))}
                        </div>
                    </>
                )}

            </div>
        </section>
    );
}
