import React from "react";
import { Moon, Sun, Bell, User, LogOut } from "lucide-react";
import logo from "../../../public/logoFina2.webp";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AdminNavbar() {
  const { isDark, toggleDark } = useDarkMode();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-navy-soft/20 bg-navy-deep text-white shadow-xl shadow-navy-deep/10">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left Side: Logo + Theme Toggle */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Daleel Logo" className="w-10 h-10 object-contain" />
            <span className="text-xl font-bold font-heading hidden sm:inline-block tracking-tight text-white">
              دليل الخريج
            </span>
          </Link>

          <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDark}
            className="rounded-full hover:bg-white/10 text-white transition-colors duration-300"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>

        {/* Right Side: Navigation Links & User/Auth */}
        <nav className="flex items-center gap-2 lg:gap-8">
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-white font-medium hover:text-primary transition-colors duration-300">الرئيسية</Link>
            <Link to="/courses" className="text-white font-medium hover:text-primary transition-colors duration-300">الكورسات</Link>
            <Link to="/scholarships" className="text-white font-medium hover:text-primary transition-colors duration-300">المنح الدراسية</Link>
            <Link to="/contact" className="text-white font-medium hover:text-primary transition-colors duration-300">تواصل معنا</Link>
          </div>

          <div className="h-8 w-[1px] bg-white/10 hidden lg:block"></div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Bell */}
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 text-white relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-navy-deep"></span>
                </Button>

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="w-10 h-10 rounded-full bg-gradient-pink p-[2px] cursor-pointer hover:scale-105 transition-transform duration-300 outline-none">
                      <div className="w-full h-full rounded-full bg-navy-deep flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-52 p-2 rounded-2xl border-navy-soft/20 dark:border-slate-700 shadow-2xl bg-white dark:bg-slate-900 text-navy-deep dark:text-white"
                  >
                    <DropdownMenuLabel className="px-3 py-2">
                      <p className="font-bold text-sm truncate">{user?.name || user?.email || "المستخدم"}</p>
                      <p className="text-xs text-muted-foreground dark:text-white/50 truncate mt-0.5">{user?.email}</p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-navy-soft/10 dark:bg-slate-800 my-1" />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20 focus:text-red-700 rounded-xl p-2.5 cursor-pointer transition-colors gap-2.5"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>تسجيل الخروج</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              /* Auth Buttons */
              <div className="flex items-center gap-2">
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
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
