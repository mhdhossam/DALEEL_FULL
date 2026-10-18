import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useDarkMode } from "@/hooks/useDarkMode";
import logo from "../../../public/logoFina2.webp";
import Menu from "lucide-react/dist/esm/icons/menu";
import X from "lucide-react/dist/esm/icons/x";
// import ShoppingCart from "lucide-react/dist/esm/icons/shopping-cart";
import Moon from "lucide-react/dist/esm/icons/moon";
import Sun from "lucide-react/dist/esm/icons/sun";
import Home from "lucide-react/dist/esm/icons/home";
import Info from "lucide-react/dist/esm/icons/info";
import BookOpen from "lucide-react/dist/esm/icons/book-open";
import GraduationCap from "lucide-react/dist/esm/icons/graduation-cap";
import Phone from "lucide-react/dist/esm/icons/phone";
import LogOut from "lucide-react/dist/esm/icons/log-out";
import Briefcase from "lucide-react/dist/esm/icons/briefcase";
import Calendar from "lucide-react/dist/esm/icons/calendar";
import { useAuth } from "@/contexts/AuthContext";

/* -------------------- Static Data -------------------- */
const navItems = [
  { label: "الرئيسية", path: "/", icon: Home },
  { label: "من نحن", path: "/about", icon: Info },
  { label: "الكورسات", path: "/courses", icon: BookOpen },
  { label: "التوظيف", path: "/hiring", icon: Briefcase },
  { label: "المنح الدراسية", path: "/scholarships", icon: GraduationCap },
  { label: "ملتقى التوظيف", path: "/career-fair", icon: Calendar },
  { label: "تواصل معنا", path: "/contact", icon: Phone },
];

// Stable className strings — avoids recomputing on every render
const linkBase = "px-4 py-2 rounded-lg text-sm font-medium transition-colors";
const linkActive = "bg-white/20 text-white";
const linkInactive = "text-white/80 hover:text-white hover:bg-white/10";
const mobileLinkBase =
  "block px-4 py-3 rounded-lg text-sm font-medium transition-colors my-1";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const lastScroll = useRef(0);
  const { isDark, toggleDark } = useDarkMode();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setHidden(current > lastScroll.current && current > 100);
      lastScroll.current = current;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "gradient-navy sticky top-0 z-50 shadow-lg transition-transform duration-300",
        hidden ? "-translate-y-full" : "translate-y-0",
      )}
      role="navigation"
      aria-label="القائمة الرئيسية"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-15">
          {/* Logo */}
          <Link to="/" aria-label="دليل - الصفحة الرئيسية">
            <img src={logo} alt="دليل الشعار" className="h-12 w-12" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  linkBase,
                  location.pathname === item.path ? linkActive : linkInactive,
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {!isAuthenticated ? (
              <div className="hidden lg:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-sm font-bold text-white/90 hover:text-white hover:bg-white/10 transition-all border border-white/20 hover:border-white/40"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 rounded-lg text-sm font-black bg-primary text-white hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                  إنشاء حساب
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white/90 hover:text-white hover:bg-white/10 transition-all border border-white/10 hover:border-white/30"
                aria-label="تسجيل الخروج"
              >
                <LogOut className="w-4 h-4" />
                تسجيل الخروج
              </button>
            )}

            <button
              onClick={toggleDark}
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label={isDark ? "الوضع الفاتح" : "الوضع الداكن"}
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* <Link
              to="/store"
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="سلة التسوق"
            >
              <ShoppingCart className="w-5 h-5" />
            </Link> */}

            <button
              className="lg:hidden p-2 rounded-lg text-white/80 hover:text-white"
              onClick={toggleMenu}
              aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t border-white/20">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  mobileLinkBase,
                  "flex items-center gap-3",
                  location.pathname === item.path ? linkActive : linkInactive,
                )}
              >
                <item.icon className="w-5 h-5 opacity-80" />
                <span>{item.label}</span>
              </Link>
            ))}

            <div className="pt-4 mt-2 border-t border-white/10">
              {!isAuthenticated ? (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/login"
                    className="block w-full text-center py-3 rounded-xl text-white font-bold bg-white/10 hover:bg-white/20 transition-all border border-white/10"
                  >
                    تسجيل الدخول
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full text-center py-3 rounded-xl text-white font-black bg-primary hover:bg-primary/90 transition-all"
                  >
                    إنشاء حساب
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-bold bg-white/10 hover:bg-white/20 transition-all border border-white/5"
                >
                  <LogOut className="w-4 h-4" />
                  تسجيل الخروج
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
