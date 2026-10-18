import React, { useState, useEffect } from "react";
import { 
  Accessibility, 
  RotateCcw, 
  Type, 
  Eye, 
  Sparkles, 
  Link2, 
  MousePointer, 
  Activity, 
  Menu, 
  X,
  CaseSensitive
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const AccessibilityWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // States for options
  const [contrastMode, setContrastMode] = useState<"normal" | "contrast" | "contrast-dark">("normal");
  const [isMonochrome, setIsMonochrome] = useState(false);
  const [textSize, setTextSize] = useState<"normal" | "large" | "xlarge">("normal");
  const [isReadableFont, setIsReadableFont] = useState(false);
  const [isTextSpacing, setIsTextSpacing] = useState(false);
  const [isHighlightLinks, setIsHighlightLinks] = useState(false);
  const [isBigCursor, setIsBigCursor] = useState(false);
  const [isReduceMotion, setIsReduceMotion] = useState(false);
  const [isRulerActive, setIsRulerActive] = useState(false);
  const [rulerTop, setRulerTop] = useState(0);

  // Load initial configurations from localStorage
  useEffect(() => {
    const savedContrast = localStorage.getItem("a11y-contrast");
    if (savedContrast === "normal" || savedContrast === "contrast" || savedContrast === "contrast-dark") {
      setContrastMode(savedContrast);
    }

    setIsMonochrome(localStorage.getItem("a11y-monochrome") === "true");
    const savedTextSize = localStorage.getItem("a11y-text-size");
    if (savedTextSize === "normal" || savedTextSize === "large" || savedTextSize === "xlarge") {
      setTextSize(savedTextSize);
    }
    setIsReadableFont(localStorage.getItem("a11y-readable-font") === "true");
    setIsTextSpacing(localStorage.getItem("a11y-text-spacing") === "true");
    setIsHighlightLinks(localStorage.getItem("a11y-highlight-links") === "true");
    setIsBigCursor(localStorage.getItem("a11y-big-cursor") === "true");
    setIsReduceMotion(localStorage.getItem("a11y-reduce-motion") === "true");
    setIsRulerActive(localStorage.getItem("a11y-ruler") === "true");
  }, []);

  // Update HTML tag classes dynamically when options change
  useEffect(() => {
    const html = document.documentElement;

    // Reset contrast classes
    html.classList.remove("a11y-high-contrast", "a11y-high-contrast-dark");
    if (contrastMode === "contrast") {
      html.classList.add("a11y-high-contrast");
      localStorage.setItem("a11y-contrast", "contrast");
    } else if (contrastMode === "contrast-dark") {
      html.classList.add("a11y-high-contrast-dark");
      localStorage.setItem("a11y-contrast", "contrast-dark");
    } else {
      localStorage.setItem("a11y-contrast", "normal");
    }

    // Monochrome
    if (isMonochrome) {
      html.classList.add("a11y-monochrome");
      localStorage.setItem("a11y-monochrome", "true");
    } else {
      html.classList.remove("a11y-monochrome");
      localStorage.setItem("a11y-monochrome", "false");
    }

    // Text Size
    html.classList.remove("a11y-text-large", "a11y-text-xlarge");
    if (textSize === "large") {
      html.classList.add("a11y-text-large");
      localStorage.setItem("a11y-text-size", "large");
    } else if (textSize === "xlarge") {
      html.classList.add("a11y-text-xlarge");
      localStorage.setItem("a11y-text-size", "xlarge");
    } else {
      localStorage.setItem("a11y-text-size", "normal");
    }

    // Readable Font
    if (isReadableFont) {
      html.classList.add("a11y-readable-font");
      localStorage.setItem("a11y-readable-font", "true");
    } else {
      html.classList.remove("a11y-readable-font");
      localStorage.setItem("a11y-readable-font", "false");
    }

    // Text Spacing
    if (isTextSpacing) {
      html.classList.add("a11y-text-spacing");
      localStorage.setItem("a11y-text-spacing", "true");
    } else {
      html.classList.remove("a11y-text-spacing");
      localStorage.setItem("a11y-text-spacing", "false");
    }

    // Highlight Links
    if (isHighlightLinks) {
      html.classList.add("a11y-highlight-links");
      localStorage.setItem("a11y-highlight-links", "true");
    } else {
      html.classList.remove("a11y-highlight-links");
      localStorage.setItem("a11y-highlight-links", "false");
    }

    // Big Cursor
    if (isBigCursor) {
      html.classList.add("a11y-big-cursor");
      localStorage.setItem("a11y-big-cursor", "true");
    } else {
      html.classList.remove("a11y-big-cursor");
      localStorage.setItem("a11y-big-cursor", "false");
    }

    // Reduce Motion
    if (isReduceMotion) {
      html.classList.add("a11y-reduce-motion");
      localStorage.setItem("a11y-reduce-motion", "true");
    } else {
      html.classList.remove("a11y-reduce-motion");
      localStorage.setItem("a11y-reduce-motion", "false");
    }
  }, [
    contrastMode,
    isMonochrome,
    textSize,
    isReadableFont,
    isTextSpacing,
    isHighlightLinks,
    isBigCursor,
    isReduceMotion,
  ]);

  // Reading Ruler logic
  useEffect(() => {
    localStorage.setItem("a11y-ruler", isRulerActive ? "true" : "false");
    if (!isRulerActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      setRulerTop(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isRulerActive]);

  const resetAll = () => {
    setContrastMode("normal");
    setIsMonochrome(false);
    setTextSize("normal");
    setIsReadableFont(false);
    setIsTextSpacing(false);
    setIsHighlightLinks(false);
    setIsBigCursor(false);
    setIsReduceMotion(false);
    setIsRulerActive(false);
  };

  return (
    <>
      {/* Floating Button (Placed at Bottom Left to avoid ScrollToTop overlap) */}
      <div className="fixed bottom-6 left-6 z-[999] select-none" dir="rtl">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center p-0 border-0 transition-all duration-300 ${
            isOpen 
              ? "bg-red-500 hover:bg-red-600 text-white rotate-90" 
              : "gradient-pink text-white hover:opacity-90 active:scale-95"
          }`}
          aria-label={isOpen ? "إغلاق خيارات سهولة الوصول" : "فتح خيارات سهولة الوصول"}
          aria-expanded={isOpen}
          title="أدوات سهولة الوصول لذوي الهمم"
        >
          {isOpen ? <X className="w-7 h-7" /> : <Accessibility className="w-7 h-7 animate-bounce" style={{ animationDuration: '3s' }} />}
        </Button>

        {/* Accessibility Settings Panel Card */}
        {isOpen && (
          <div 
            className="absolute bottom-20 left-0 w-80 max-h-[75vh] overflow-y-auto bg-card border border-border shadow-2xl rounded-3xl p-6 space-y-6 text-right animate-in fade-in slide-in-from-bottom-5 duration-300"
            role="dialog"
            aria-labelledby="a11y-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <button
                onClick={resetAll}
                className="flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-red-500 transition-colors p-1"
                title="إعادة تعيين كافة الإعدادات الافتراضية"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                إعادة ضبط
              </button>
              <h3 id="a11y-title" className="text-base font-black text-foreground flex items-center gap-2">
                <Accessibility className="w-5 h-5 text-primary" />
                خيارات سهولة الوصول
              </h3>
            </div>

            {/* List of Options */}
            <div className="space-y-4">
              
              {/* Text Size */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-muted-foreground flex items-center gap-1.5 justify-end">
                  حجم الخط <Type className="w-3.5 h-3.5" />
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setTextSize("normal")}
                    className={`py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      textSize === "normal"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border hover:bg-muted"
                    }`}
                  >
                    افتراضي
                  </button>
                  <button
                    onClick={() => setTextSize("large")}
                    className={`py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      textSize === "large"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border hover:bg-muted"
                    }`}
                  >
                    كبير
                  </button>
                  <button
                    onClick={() => setTextSize("xlarge")}
                    className={`py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      textSize === "xlarge"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border hover:bg-muted"
                    }`}
                  >
                    كبير جداً
                  </button>
                </div>
              </div>

              {/* Contrast Mode */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-muted-foreground flex items-center gap-1.5 justify-end">
                  التباين والألوان <Eye className="w-3.5 h-3.5" />
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setContrastMode("normal")}
                    className={`py-1.5 rounded-xl text-[10px] font-bold transition-all border ${
                      contrastMode === "normal"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border hover:bg-muted"
                    }`}
                  >
                    طبيعي
                  </button>
                  <button
                    onClick={() => setContrastMode("contrast")}
                    className={`py-1.5 rounded-xl text-[10px] font-bold transition-all border ${
                      contrastMode === "contrast"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border hover:bg-muted"
                    }`}
                  >
                    تباين محسّن
                  </button>
                  <button
                    onClick={() => setContrastMode("contrast-dark")}
                    className={`py-1.5 rounded-xl text-[10px] font-bold transition-all border ${
                      contrastMode === "contrast-dark"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border hover:bg-muted"
                    }`}
                  >
                    تباين داكن 🖤
                  </button>
                </div>
              </div>

              {/* Boolean Toggles */}
              <div className="space-y-2 pt-2 border-t border-border/50">
                
                {/* Monochrome */}
                <button
                  onClick={() => setIsMonochrome(!isMonochrome)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all text-xs font-bold ${
                    isMonochrome
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-background border-border text-foreground hover:bg-muted"
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${isMonochrome ? "bg-primary border-primary text-white" : "border-border"}`}>
                    {isMonochrome && "✓"}
                  </span>
                  <span className="flex items-center gap-2">
                    أبيض وأسود
                    <Sparkles className="w-4 h-4" />
                  </span>
                </button>

                {/* Readable Font */}
                <button
                  onClick={() => setIsReadableFont(!isReadableFont)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all text-xs font-bold ${
                    isReadableFont
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-background border-border text-foreground hover:bg-muted"
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${isReadableFont ? "bg-primary border-primary text-white" : "border-border"}`}>
                    {isReadableFont && "✓"}
                  </span>
                  <span className="flex items-center gap-2">
                    خط بسيط وسهل القراءة
                    <CaseSensitive className="w-4 h-4" />
                  </span>
                </button>

                {/* Text Spacing */}
                <button
                  onClick={() => setIsTextSpacing(!isTextSpacing)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all text-xs font-bold ${
                    isTextSpacing
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-background border-border text-foreground hover:bg-muted"
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${isTextSpacing ? "bg-primary border-primary text-white" : "border-border"}`}>
                    {isTextSpacing && "✓"}
                  </span>
                  <span className="flex items-center gap-2">
                    تباعد إضافي بين الحروف والأسطر
                    <Type className="w-4 h-4" />
                  </span>
                </button>

                {/* Highlight Links */}
                <button
                  onClick={() => setIsHighlightLinks(!isHighlightLinks)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all text-xs font-bold ${
                    isHighlightLinks
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-background border-border text-foreground hover:bg-muted"
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${isHighlightLinks ? "bg-primary border-primary text-white" : "border-border"}`}>
                    {isHighlightLinks && "✓"}
                  </span>
                  <span className="flex items-center gap-2">
                    تمييز الروابط التشعبية
                    <Link2 className="w-4 h-4" />
                  </span>
                </button>

                {/* Big Cursor */}
                <button
                  onClick={() => setIsBigCursor(!isBigCursor)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all text-xs font-bold ${
                    isBigCursor
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-background border-border text-foreground hover:bg-muted"
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${isBigCursor ? "bg-primary border-primary text-white" : "border-border"}`}>
                    {isBigCursor && "✓"}
                  </span>
                  <span className="flex items-center gap-2">
                    مؤشر ماوس كبير
                    <MousePointer className="w-4 h-4" />
                  </span>
                </button>

                {/* Reading Ruler Guide */}
                <button
                  onClick={() => setIsRulerActive(!isRulerActive)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all text-xs font-bold ${
                    isRulerActive
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-background border-border text-foreground hover:bg-muted"
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${isRulerActive ? "bg-primary border-primary text-white" : "border-border"}`}>
                    {isRulerActive && "✓"}
                  </span>
                  <span className="flex items-center gap-2">
                    مسطرة التركيز القرائي
                    <Menu className="w-4 h-4" />
                  </span>
                </button>

                {/* Reduce Motion */}
                <button
                  onClick={() => setIsReduceMotion(!isReduceMotion)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all text-xs font-bold ${
                    isReduceMotion
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-background border-border text-foreground hover:bg-muted"
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${isReduceMotion ? "bg-primary border-primary text-white" : "border-border"}`}>
                    {isReduceMotion && "✓"}
                  </span>
                  <span className="flex items-center gap-2">
                    تقليل وتقييد حركة الرسوم
                    <Activity className="w-4 h-4" />
                  </span>
                </button>

              </div>

            </div>

            {/* Note */}
            <p className="text-[10px] text-muted-foreground/60 text-center pt-2">
              مصمم لمساعدة ذوي الهمم وتسهيل تصفح المنصة بشكل مستقل كامل.
            </p>
          </div>
        )}
      </div>

      {/* Floating horizontal Reading Ruler Guide */}
      {isRulerActive && (
        <div
          className="fixed left-0 right-0 h-10 bg-yellow-500/25 border-y-2 border-yellow-500/80 pointer-events-none z-[9999] -translate-y-1/2 shadow-[0_0_15px_rgba(234,179,8,0.3)] transition-all duration-75"
          style={{ top: `${rulerTop}px` }}
        />
      )}
    </>
  );
};
