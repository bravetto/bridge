"use client";

import { useState, useEffect, useCallback } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { withSafeUI } from "./with-safe-ui";

interface MiniCountdownProps {
  targetDate: Date;
  className?: string;
  onClick?: () => void;
}

function MiniCountdown({
  targetDate,
  className,
  onClick,
}: MiniCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  const [isClient, setIsClient] = useState(false);

  // Hydration safety
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Stable calculation function - NO dependencies on isClient
  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const difference = +targetDate - +now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  }, [targetDate]);

  // Timer effect with proper cleanup and hydration safety
  useEffect(() => {
    if (!isClient) return;

    // Initial calculation
    const initialTime = calculateTimeLeft();
    setTimeLeft(initialTime);

    // Set up interval
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft();
      setTimeLeft(newTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [isClient, calculateTimeLeft]);

  // Don't render until hydrated
  if (!isClient) {
    return (
      <div className={cn("inline-flex items-center gap-2 text-sm", className)}>
        <Clock className="h-4 w-4" />
        <span>Loading...</span>
      </div>
    );
  }

  const formatTime = (value: number) => value.toString().padStart(2, "0");

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium cursor-pointer",
        "text-blue-600 hover:text-blue-700 transition-colors",
        "bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full",
        className
      )}
      onClick={onClick}
    >
      <Clock className="h-4 w-4" />
      <span className="tabular-nums">
        {timeLeft.days > 0 && `${timeLeft.days}d `}
        {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:
        {formatTime(timeLeft.seconds)}
      </span>
      <span className="text-xs opacity-75">until July 28</span>
    </div>
  );
}

export default withSafeUI(MiniCountdown, {
  componentName: "MiniCountdown",
});
