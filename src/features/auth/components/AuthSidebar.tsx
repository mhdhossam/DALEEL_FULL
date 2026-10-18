import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../../public/logoFina2.webp";

interface AuthSidebarProps {
  titleStart: string;
  titleHighlight: string;
  description: string;
  children?: React.ReactNode;
}

export const AuthSidebar: React.FC<AuthSidebarProps> = ({
  titleStart,
  titleHighlight,
  description,
  children,
}) => {
  return (
    <div
      className="hidden md:flex md:w-1/2 relative overflow-hidden p-12 flex-col justify-between text-white"
      style={{
        background:
          "linear-gradient(145deg, hsl(220, 68%, 15%) 0%, hsl(220, 60%, 5%) 100%)",
      }}
    >
      {/* Glow Effects */}
      <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-primary/20 blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[150px] pointer-events-none z-0" />

      {/* Decorative Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 flex justify-start">
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          aria-label="العودة للصفحة الرئيسية"
        >
          <img
            src={logo}
            alt="شعار دليل"
            className="w-10 h-10 object-contain"
            loading="lazy"
          />
          <span className="text-2xl font-black tracking-tight text-white">دليل</span>
        </Link>
      </div>

      <div className="relative z-10 my-auto text-right pr-6">
        <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6 text-white">
          {titleStart} <br />
          <span className="text-primary italic">{titleHighlight}</span>
        </h1>
        <p className="text-lg text-white/70 max-w-md leading-relaxed">
          {description}
        </p>
        
        {/* Render custom section (Mockup or Stats) */}
        {children && <div className="mt-8">{children}</div>}
      </div>
      
      {/* Empty block to balance layout */}
      <div className="h-6" />
    </div>
  );
};
