"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useStableNavigation } from "@/lib/hooks/useStableNavigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronRight,
  Users,
  FileText,
  Heart,
  Home,
  ChevronDown,
  BarChart,
  Target,
  Activity,
  Clock,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { withErrorBoundary } from "@/components/ui/error-boundary";
import MiniCountdown from "@/components/ui/mini-countdown";
// Note: Advanced gestures temporarily disabled for hydration safety
// import {
//   useAdvancedGestures,
//   useMobileOptimization,
// } from "@/lib/hooks/useAdvancedGestures";
import { useIsClient } from "@/hooks/useHydrationSafe";

// Enhanced NavItem interface with research-backed properties
interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  children?: NavItem[];
  badge?: string;
  priority: "high" | "medium" | "low";
  description: string;
}

// Enhanced navItems with better hierarchy and descriptions for improved information scent
const navItems: NavItem[] = [
  { 
    href: "/", 
    label: "Home", 
    icon: <Home className="h-4 w-4" />,
    priority: "medium",
    description: "Return to homepage"
  },

  // TIER 1: Core Campaign Journey
  {
    href: "/the-case",
    label: "The Case",
    icon: <FileText className="h-4 w-4" />,
    priority: "high",
    description: "Learn about JAHmere's legal situation"
  },
  {
    href: "/july-28-strategy",
    label: "July 28 Strategy",
    icon: <Target className="h-4 w-4" />,
    badge: "🔥",
    priority: "high",
    description: "Critical court date preparation"
  },

  // TIER 2: Character Witnesses & Stories - Research-backed dropdown with overview link
  {
    href: "/people",
    label: "Character Witnesses",
    icon: <Users className="h-4 w-4" />,
    priority: "medium",
    description: "Meet the people supporting JAHmere",
    children: [
      { 
        href: "/people/jordan-dungy", 
        label: "Jordan Dungy", 
        icon: <Heart className="h-3 w-3" />,
        priority: "high",
        description: "Son of NFL legend Tony Dungy"
      },
      { 
        href: "/people/brooks-lopez", 
        label: "Brooks Lopez", 
        icon: <Activity className="h-3 w-3" />,
        priority: "medium",
        description: "NBA champion center"
      },
      { 
        href: "/people/carnetha-leech", 
        label: "Carnetha Leech", 
        icon: <Heart className="h-3 w-3" />,
        priority: "medium",
        description: "Community advocate"
      },
    ],
  },

  // TIER 3: Supporting Content
  {
    href: "/impact",
    label: "Impact Dashboard",
    icon: <BarChart className="h-4 w-4" />,
    priority: "medium",
    description: "Track campaign progress and metrics"
  },
];

// Research-backed priority styling system
const getPriorityStyles = (priority: NavItem["priority"]) => {
  switch (priority) {
    case "high":
      return "text-orange-700 hover:bg-orange-50 hover:text-orange-800 font-medium";
    case "medium":
      return "text-gray-700 hover:bg-purple-50 hover:text-gray-800";
    case "low":
      return "text-gray-600 hover:bg-gray-50 hover:text-gray-700";
    default:
      return "text-gray-700 hover:bg-purple-50 hover:text-gray-800";
  }
};

// Research-backed keyboard navigation handler
const handleKeyDown = (
  e: React.KeyboardEvent,
  href: string,
  isMobile = false,
  onToggle?: () => void
) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    if (onToggle) {
      onToggle();
    }
  }
  if (e.key === "Escape" && isMobile && onToggle) {
    onToggle();
  }
};

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [focusedItem, setFocusedItem] = useState<string | null>(null);
  const { pathname } = useStableNavigation();
  
  // Hydration-safe client detection
  const isClient = useIsClient();
  
  // Refs for keyboard navigation
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Mobile optimization - simplified for hydration safety
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    if (!isClient) return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isClient]);

  // Simplified mobile handlers for hydration safety
  const mobileSwipeHandlers = {};

  // Handle body scrolling when mobile menu is open
  useEffect(() => {
    if (!isClient) return; // Prevent server-side DOM manipulation
    
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, isClient]);

  useEffect(() => {
    if (!isClient) return; // Prevent server-side window access
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClient]);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsOpen(false);
    setHoveredItem(null);
    setFocusedItem(null);
  }, [pathname]);

  // Mobile-specific toggle function
  const toggleExpanded = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href)
        ? prev.filter((item) => item !== href)
        : [...prev, href],
    );
  };

  // Hydration-safe animation variants - only define when client-side
  const navVariants = isClient ? {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  } : undefined;

  const mobileMenuVariants = isClient ? {
    closed: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    open: { 
      opacity: 1, 
      height: "auto",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  } : undefined;

  return (
    <>
      {/* Research-backed campaign banner with proper z-index */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-2 px-4 text-sm font-medium z-banner relative">
        <div className="flex items-center justify-center gap-2">
          <Flame className="h-4 w-4 text-orange-400" />
          <span>LIVE: JULY 28TH CAMPAIGN ACTIVE</span>
          <MiniCountdown targetDate={new Date('2025-07-28')} />
        </div>
      </div>

      {/* Enhanced Navigation with research-backed patterns */}
      <motion.nav
        variants={navVariants}
        initial={isClient ? "hidden" : false}
        animate={isClient ? "visible" : false}
        className={`sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 transition-all duration-300 z-navigation ${
          scrolled ? "shadow-lg" : "shadow-sm"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <Container>
          <div className="flex items-center justify-between h-16">
            {/* Logo with enhanced branding */}
            <Link
              href="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              aria-label="JAHmere Webb Freedom Portal - Home"
            >
              <div className="relative">
                <Image
                  src="/images/logo-blue.png"
                  alt="JAHmere Webb Freedom Portal"
                  width={40}
                  height={40}
                  className="rounded-lg shadow-sm"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-lg text-gray-900">Freedom Portal</div>
                <div className="text-xs text-gray-600 -mt-1">JAHmere Webb Campaign</div>
              </div>
            </Link>

            {/* Desktop Navigation - Research-backed hover patterns */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) =>
                item.children ? (
                  // Parent with dropdown - Research shows hover-to-open is optimal for desktop
                  <div
                    key={item.href}
                    className="relative group"
                    onMouseEnter={() => setHoveredItem(item.href)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onFocus={() => setFocusedItem(item.href)}
                    onBlur={() => setFocusedItem(null)}
                  >
                    {/* Parent link - Always clickable per research */}
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                        pathname.startsWith(item.href)
                          ? "bg-purple-50 text-orange-600 font-semibold shadow-sm"
                          : getPriorityStyles(item.priority)
                      }`}
                      aria-expanded={hoveredItem === item.href || focusedItem === item.href}
                      aria-haspopup="true"
                      aria-describedby={`desc-${item.href.replace(/\//g, "")}`}
                    >
                      {item.icon}
                      <span className="text-sm whitespace-nowrap">{item.label}</span>
                      {item.badge && (
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-semibold">
                          {item.badge}
                        </span>
                      )}
                      <ChevronDown className="h-3 w-3 ml-1 transition-transform group-hover:rotate-180" />
                      <span id={`desc-${item.href.replace(/\//g, "")}`} className="sr-only">
                        {item.description}
                      </span>
                    </Link>

                                         {/* Dropdown Menu - Hydration-safe */}
                     {isClient && (hoveredItem === item.href || focusedItem === item.href) && (
                       <div
                         ref={(el) => { 
                           if (el) dropdownRefs.current[item.href] = el; 
                         }}
                         className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-navigation-dropdown"
                         role="menu"
                         aria-labelledby={`nav-${item.href.replace(/\//g, "")}`}
                       >
                        {/* Overview link - Research-backed pattern */}
                        <Link
                          href={item.href}
                          className="block px-4 py-3 border-b border-gray-100 hover:bg-purple-50 transition-colors"
                          role="menuitem"
                        >
                          <div className="flex items-center gap-3">
                            {item.icon}
                            <div>
                              <div className="font-medium text-gray-900">View All {item.label}</div>
                              <div className="text-xs text-gray-600 mt-0.5">{item.description}</div>
                            </div>
                          </div>
                        </Link>

                        {/* Child items */}
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-4 py-2 hover:bg-purple-50 transition-colors ${
                              pathname === child.href ? "bg-orange-50 text-orange-700 font-medium" : "text-gray-700"
                            }`}
                            role="menuitem"
                          >
                            <div className="flex items-center gap-3">
                              {child.icon}
                              <div>
                                <div className="text-sm">{child.label}</div>
                                <div className="text-xs text-gray-600 mt-0.5">{child.description}</div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Simple nav item
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`people-nav-link flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      pathname === item.href
                        ? "bg-purple-50 text-orange-600 font-semibold shadow-sm"
                        : getPriorityStyles(item.priority)
                    }`}
                    aria-current={pathname === item.href ? "page" : undefined}
                    aria-describedby={`desc-${item.href.replace(/\//g, "")}`}
                  >
                    {item.icon}
                    <span className="text-sm whitespace-nowrap">{item.label}</span>
                    {item.badge && (
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-semibold">
                        {item.badge}
                      </span>
                    )}
                    <span id={`desc-${item.href.replace(/\//g, "")}`} className="sr-only">
                      {item.description}
                    </span>
                  </Link>
                )
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 hover:bg-purple-50"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {isOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </Button>
          </div>
        </Container>
      </motion.nav>

      {/* Enhanced Mobile Menu with proper z-index and hydration safety */}
      {isClient && (
        <motion.div
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={mobileMenuVariants}
          className="lg:hidden bg-white border-b border-gray-200 shadow-lg z-mobile-menu overflow-hidden"
          id="mobile-menu"
          role="menu"
          aria-labelledby="mobile-menu-button"
          {...mobileSwipeHandlers}
        >
          {isOpen && (
            <>
              {/* Mobile Menu Items - Research-backed mobile patterns */}
              <div className="p-6">
                {navItems.map((item, index) => (
                  <div
                    key={item.href}
                    className="mb-2"
                  >
                    {item.children ? (
                      <div>
                        {/* Mobile: Click opens submenu, not parent page */}
                        <button
                          onClick={() => toggleExpanded(item.href)}
                          onKeyDown={(e) => handleKeyDown(e, item.href, true)}
                          className={`letter-form-card w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                            pathname.startsWith(item.href)
                              ? "border-orange-300 bg-orange-50 text-orange-800"
                              : "border-gray-200 bg-white text-gray-800 hover:border-purple-300 hover:bg-purple-50"
                          }`}
                          aria-expanded={expandedItems.includes(item.href)}
                          aria-haspopup="true"
                          aria-controls={`mobile-submenu-${item.href.replace(/\//g, "")}`}
                        >
                          <div className="flex items-center gap-3">
                            {item.icon}
                            <div className="text-left">
                              <div className="font-medium">{item.label}</div>
                              <div className="text-xs text-gray-600 mt-0.5">{item.description}</div>
                            </div>
                            {item.badge && (
                              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-semibold">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <ChevronDown
                            className={`h-5 w-5 transition-transform ${
                              expandedItems.includes(item.href) ? "rotate-180" : ""
                            }`}
                            aria-hidden="true"
                          />
                        </button>

                        {/* Mobile Submenu - Hydration-safe */}
                        {expandedItems.includes(item.href) && (
                          <div
                            id={`mobile-submenu-${item.href.replace(/\//g, "")}`}
                            className="mt-2 ml-4 space-y-2"
                            role="menu"
                          >
                            {/* Parent overview link */}
                            <Link
                              href={item.href}
                              className="block p-3 rounded-lg bg-purple-50 border border-purple-200 hover:bg-purple-100 transition-colors"
                              role="menuitem"
                            >
                              <div className="flex items-center gap-2">
                                {item.icon}
                                <div>
                                  <div className="font-medium text-purple-900">View All {item.label}</div>
                                  <div className="text-xs text-purple-700 mt-0.5">{item.description}</div>
                                </div>
                              </div>
                            </Link>

                            {/* Child items */}
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={`block p-3 rounded-lg border transition-colors ${
                                  pathname === child.href
                                    ? "border-orange-300 bg-orange-50 text-orange-800"
                                    : "border-gray-200 bg-white text-gray-800 hover:border-purple-300 hover:bg-purple-50"
                                }`}
                                role="menuitem"
                              >
                                <div className="flex items-center gap-2">
                                  {child.icon}
                                  <div>
                                    <div className="font-medium">{child.label}</div>
                                    <div className="text-xs text-gray-600 mt-0.5">{child.description}</div>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      // Simple mobile nav item
                      <Link
                        href={item.href}
                        className={`letter-form-card block p-4 rounded-xl border-2 transition-all ${
                          pathname === item.href
                            ? "border-orange-300 bg-orange-50 text-orange-800"
                            : "border-gray-200 bg-white text-gray-800 hover:border-purple-300 hover:bg-purple-50"
                        }`}
                        role="menuitem"
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <div className="flex-1">
                            <div className="font-medium">{item.label}</div>
                            <div className="text-xs text-gray-600 mt-0.5">{item.description}</div>
                          </div>
                          {item.badge && (
                            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-semibold">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      )}
    </>
  );
}

export default withErrorBoundary(Navigation, "Navigation");
