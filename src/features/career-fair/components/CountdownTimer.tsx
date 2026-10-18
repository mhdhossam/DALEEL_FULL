import React, { useState, useEffect } from "react";

export const CountdownTimer: React.FC = () => {
  const targetDate = new Date("2026-07-31T09:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.isExpired) {
    return (
      <div className="text-center py-4 px-6 bg-pink-500/10 border border-pink-500/20 rounded-2xl text-pink-500 font-bold text-lg animate-pulse">
        🎉 بدأ الملتقى الآن أو انتهت فعالياته بنجاح!
      </div>
    );
  }

  const items = [
    { label: "ثانية", value: timeLeft.seconds },
    { label: "دقيقة", value: timeLeft.minutes },
    { label: "ساعة", value: timeLeft.hours },
    { label: "يوم", value: timeLeft.days }
  ];

  return (
    <div className="flex justify-center gap-4 md:gap-6 dir-ltr" dir="ltr">
      {items.reverse().map((item) => (
        <div key={item.label} className="flex flex-col items-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-card/65 backdrop-blur-md border border-border/80 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden group">
            {/* Hover light glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="text-2xl md:text-3xl font-black text-foreground relative z-10">
              {String(item.value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-xs font-bold text-muted-foreground mt-2 font-black">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};
