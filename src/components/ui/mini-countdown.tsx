"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { withSafeUI } from "./with-safe-ui";
import { useHydrationSafeDate } from "@/hooks/useHydrationSafe";

interface MiniCountdownProps {
  targetDate: Date;
  className?: string;
  linkHref?: string;
}

function MiniCountdown({
  targetDate,
  className,
  linkHref = "/the-case",
}: MiniCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  // Use hydration-safe date to prevent server-client mismatches
  const currentDate = useHydrationSafeDate();

  useEffect(() => {
    if (!currentDate) return; // Don't calculate until after hydration

    const calculateTimeLeft = () => {
      const difference = +targetDate - +currentDate;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(() => {
      // Use fresh Date.now() for interval calculations
      const now = new Date();
      const difference = +targetDate - +now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, currentDate]);

  // Show loading state until hydration is complete
  if (!currentDate) {
    return (
      <div className={cn("flex items-center gap-1 text-xs", className)}>
        <Clock className="h-3 w-3" />
        <span>Loading...</span>
      </div>
    );
  }

  const countdownContent = (
    <div className={cn("flex items-center gap-1 text-xs", className)}>
      <Clock className="h-3 w-3" />
      <span>
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </span>
    </div>
  );

  if (linkHref) {
    return (
      <Link href={linkHref} className="hover:opacity-80 transition-opacity">
        {countdownContent}
      </Link>
    );
  }

  return countdownContent;
}

export default withSafeUI(MiniCountdown, {
  componentName: "MiniCountdown",
});
