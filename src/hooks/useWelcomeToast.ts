import { useEffect } from "react";
import { toast } from "sonner";

export const useWelcomeToast = () => {
  useEffect(() => {
    // Show a motivational toast on mount
    const timer = setTimeout(() => {
      toast("أهلاً بك في دليل! 🌟", {
        description: "رحلتك التعليمية تبدأ بخطوة بسيطة، يمكنك إنشاء حسابك الآن والبدء في استكشاف آفاق جديدة.",
        duration: 5000,
      });
    }, 800);
    return () => clearTimeout(timer);
  }, []);
};
