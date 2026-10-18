import { Outlet, useLocation } from "react-router-dom";
import { lazy, Suspense, memo, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import ScrollToTop from "@/components/layout/ScrollToTop";

// Footer lazy-loaded — below the fold, no need to block initial render
const Footer = lazy(() =>
  import("@/components/layout/Footer").then((mod) => ({ default: mod.Footer })),
);

// Stable fallback element — prevents new object allocation on every render
const footerFallback = <div className="h-32 w-full bg-muted" />;

// memo — Layout never receives props, so re-renders from parent are impossible
// in practice, but this signals intent and future-proofs against context changes
const Layout = memo(function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <a href="#main-content" className="skip-link">
        انتقل إلى المحتوى الرئيسي
      </a>

      <Navbar />

      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      <Suspense fallback={footerFallback}>
        <Footer />
      </Suspense>

      <ScrollToTop />
    </div>
  );
});

export default Layout;
