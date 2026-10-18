import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const hasShownToast = React.useRef(false);

  React.useEffect(() => {
    if (!isAuthenticated && !hasShownToast.current) {
      toast.error("عذراً، يجب عليك تسجيل الدخول أولاً للوصول إلى الكورسات.", {
        description: "سيتم تحويلك لصفحة تسجيل الدخول الآن.",
        duration: 4000,
      });
      hasShownToast.current = true;
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
