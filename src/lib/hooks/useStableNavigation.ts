import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Stable navigation hook to prevent Perfect Storm hydration conflicts
 * Replaces direct usePathname usage with a stable, hydration-safe pattern
 */
export function useStableNavigation() {
  const pathname = usePathname();
  const [stablePathname, setStablePathname] = useState<string>("");

  useEffect(() => {
    // Only update pathname after hydration is complete
    setStablePathname(pathname);
  }, [pathname]);

  return {
    pathname: stablePathname,
    isHydrated: stablePathname !== "",
  };
} 