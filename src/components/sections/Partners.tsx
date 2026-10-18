const PINK =
  "linear-gradient(135deg, hsl(338, 82%, 58%) 0%, hsl(338, 100%, 72%) 100%)";
import logo1 from "@/assets/icons/logo1.webp";
import logo2 from "@/assets/icons/logo2.webp";
import logo3 from "@/assets/icons/logo3.webp";
import logo4 from "@/assets/icons/logo4.webp";
import logo5 from "@/assets/icons/logo5.webp";
import logo6 from "@/assets/icons/logo6.webp";
import logo7 from "@/assets/icons/logo7.webp";
import logo8 from "@/assets/icons/logo8.webp";
import logo9 from "@/assets/icons/logo9.webp";
import logo10 from "@/assets/icons/logo10.webp";

// Partner logos
import logoAlx from "@/assets/partners/alx.webp";
import logoIsf from "@/assets/partners/isf.webp";
import logoMohe from "@/assets/partners/ministry.webp";
import logoInnovationUniv from "@/assets/partners/innovation.webp";

const partners = [
  { name: "ALX Africa", src: logoAlx },
  { name: "صندوق رعاية المبتكرين والنوابغ (ISF)", src: logoIsf },
  { name: "وزارة التعليم العالي والبحث العلمي", src: logoMohe },
  { name: "جامعة الابتكار (Innovation University)", src: logoInnovationUniv },
  { name: " مؤسسة رحاب شعيب الخيرية", src: logo6 },
];

export default function Partners() {
  return (
    <section
      className="w-full bg-background py-20 overflow-hidden"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-3 mb-14 px-6 text-center">
        <h2 className="text-4xl font-black text-foreground">شركاؤنا</h2>
        <div className="w-10 h-1 rounded-full" style={{ background: PINK }} />
        <p className="text-sm text-muted-foreground mt-1">
          مؤسسات وشركات تثق في دليل
        </p>
      </div>
      {/* Single row auto-play carousel */}
      <div
        dir="ltr"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div
          className="flex gap-8 py-4"
          style={{
            width: "max-content",
            animation: "slide 25s linear infinite",
          }}
        >
          {[...partners, ...partners, ...partners, ...partners].map(({ name, src }, i) => (
            <div
              key={i}
              className="shrink-0 rounded-2xl flex flex-col items-center justify-center gap-3 p-5 bg-card/40 border border-border/50 shadow-sm hover:shadow-md hover:border-border transition-all duration-300"
              style={{ width: "220px", height: "190px" }}
            >
              <div className="h-24 w-full flex items-center justify-center">
                <img
                  src={src}
                  alt={name}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full max-w-full object-contain filter dark:brightness-110"
                />
              </div>
              <span className="text-xs text-muted-foreground font-semibold text-center leading-normal w-full px-1">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slide {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-25% - 8px)); }
        }
      `}</style>
    </section>
  );
}
