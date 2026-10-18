import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/contexts/AuthContext";

// import ProtectedRoute from "@/components/ProtectedRoute";
import { RequireAdmin } from "@/components/admin/RequireAdmin";
import { Toaster } from "sonner";
import logo from "../public/logoFina2.webp";
import { AccessibilityWidget } from "@/components/common/AccessibilityWidget";

const queryClient = new QueryClient();
const MIN_LOAD_DELAY = 1000; // 1 second minimum delay

// Helper to ensure loading screen is visible for a minimum duration
const lazyWithDelay = (importFn: () => Promise<any>) => {
  return lazy(() =>
    Promise.all([
      importFn(),
      new Promise(resolve => setTimeout(resolve, MIN_LOAD_DELAY))
    ]).then(([module]) => module)
  );
};

// Lazy load pages with custom delay
const Layout = lazyWithDelay(() => import("@/components/layout/Layout"));
const HomePage = lazyWithDelay(() => import("@/pages/HomePage"));
const AboutPage = lazyWithDelay(() => import("@/pages/AboutPage"));
const ContactPage = lazyWithDelay(() => import("@/pages/ContactPage"));
const StorePage = lazyWithDelay(() => import("@/pages/StorePage"));
const CoursesPage = lazyWithDelay(() => import("@/pages/CoursesPage"));
const CourseDetailsPage = lazyWithDelay(() => import("@/pages/CourseDetailsPage"));
const ScholarshipsPage = lazyWithDelay(() => import("@/pages/ScholarshipsPage"));
const LoginPage = lazyWithDelay(() => import("@/pages/LoginPage"));
const SignupPage = lazyWithDelay(() => import("@/pages/SignupPage"));
const NotFound = lazyWithDelay(() => import("@/pages/NotFound"));

// Hiring Pages
const HiringPage = lazyWithDelay(() => import("@/pages/hiring/HiringPage"));
const CompanyDetailsPage = lazyWithDelay(() => import("@/pages/hiring/CompanyDetailsPage"));
const CareerFairPage = lazyWithDelay(() => import("@/pages/CareerFairPage"));

// Admin Pages
const AdminLayout = lazyWithDelay(() => import("@/components/admin/AdminLayout").then(mod => ({ default: mod.AdminLayout })));
const AdminLoginPage = lazyWithDelay(() => import("@/pages/admin/AdminLoginPage"));
const AdminDashboard = lazyWithDelay(() => import("@/pages/admin/AdminDashboard"));
const AdminUsers = lazyWithDelay(() => import("@/pages/admin/AdminUsers"));
const AdminCourses = lazyWithDelay(() => import("@/pages/admin/AdminCourses"));
const AdminCourseDetails = lazyWithDelay(() => import("@/pages/admin/AdminCourseDetails"));
const AdminOrders = lazyWithDelay(() => import("@/pages/admin/AdminOrders"));
const AdminOrderInvoice = lazyWithDelay(() => import("@/pages/admin/AdminOrderInvoice"));
const AdminApplications = lazyWithDelay(() => import("@/pages/admin/AdminApplications"));
const AdminResourcePage = lazyWithDelay(() => import("@/pages/admin/AdminResourcePage"));
const AdminResourceDetailPage = lazyWithDelay(() => import("@/pages/admin/AdminResourcePage").then(mod => ({ default: mod.AdminResourceDetailPage })));

function AppContent() {
  const location = useLocation();

  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center h-screen bg-background">
        <div className="relative">
          <img
            src={logo}
            alt="جاري التحميل..."
            className="w-24 h-24 animate-pulse"
            loading="lazy"
          />
          <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        </div>
      </div>}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/store" element={<StorePage />} />

            {/* Protected Course Routes */}
            <Route
              path="/courses"
              element={
                // <ProtectedRoute>

                // </ProtectedRoute>
                <CoursesPage />
              }
            />
            <Route
              path="/courses/:id"
              element={
                // <ProtectedRoute>
                // </ProtectedRoute>
                <CourseDetailsPage />

              }
            />

            <Route path="/scholarships" element={<ScholarshipsPage />} />
            <Route path="/hiring" element={<HiringPage />} />
            <Route path="/hiring/:id" element={<CompanyDetailsPage />} />
            <Route path="/career-fair" element={<CareerFairPage />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Admin login — public, guards itself if already logged in */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Admin Routes — protected: must be authenticated admin */}
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminLayout />
              </RequireAdmin>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="courses/:id" element={<AdminCourseDetails />} />
            <Route path="resources/:modelName" element={<AdminResourcePage />} />
            <Route path="resources/:modelName/:id" element={<AdminResourceDetailPage />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="orders/:id/invoice" element={<AdminOrderInvoice />} />
            <Route path="applications" element={<AdminApplications />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <AccessibilityWidget />
    </Suspense>
  );
}

export default function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Toaster position="top-center" richColors expand={true} />
              <BrowserRouter>
                <AppContent />
              </BrowserRouter>
            </TooltipProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}
