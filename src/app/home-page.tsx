'use client'

import Link from "next/link";
import { impactEvents } from "@/components/impact-dashboard";
import dynamic from "next/dynamic";
import { Calendar, ArrowRight, Check, Shield } from "lucide-react";

// QUARANTINED: FloatingCTA moved due to whileHover/whileTap DOM prop warnings
// import { FloatingCTA, MobileStickyBar } from "@/components/ui/floating-cta";
import TrustBanner from "@/components/ui/trust-banner";
import TrustBar from "@/components/ui/trust-bar";
import CaseStatus from "@/components/ui/case-status";
import UrgencyBanner from "@/components/ui/urgency-banner";
import { LiveSupporterCount as SupporterCount } from "@/components/ui/supporter-count";
import QuickNav from "@/components/ui/quick-nav";
import ExploreNav from "@/components/ui/explore-nav";
import MicroCommitments from "@/components/micro-commitments";
import LossAversion from "@/components/loss-aversion";

// Direct import for critical above-the-fold content - no loading skeleton needed
import Hero from "@/components/hero";

// Dynamic imports with lazy loading for below-the-fold content - Particles removed for hydration stability

const DungyWisdom = dynamic(() => import("@/components/dungy-wisdom"), {
  ssr: true, // Safe - no browser APIs
  loading: () => (
    <div className="min-h-[300px] animate-pulse bg-gray-100/10 rounded-md"></div>
  ),
});

const PropheticMoment = dynamic(() => import("@/components/prophetic-moment"), {
  loading: () => (
    <div className="min-h-[100px] animate-pulse bg-gray-100/10 rounded-md"></div>
  ),
});

const DecisionCountdown = dynamic(
  () => import("@/components/decision-countdown"),
  {
    ssr: true, // Safe - no browser APIs
    loading: () => (
      <div className="min-h-[200px] bg-soft-cloud/10 rounded-lg"></div>
    ),
  },
);

const HeartbeatMonitor = dynamic(
  () => import("@/components/heartbeat-monitor"),
  {
    loading: () => <div className="min-h-[300px] bg-soft-cloud/10"></div>,
  },
);

const RiskMitigation = dynamic(() => import("@/components/risk-mitigation"), {
  ssr: true, // Safe - no browser APIs
  loading: () => <div className="min-h-[200px] bg-soft-cloud/10"></div>,
});

const SmartCTA = dynamic(() => import("@/components/smart-cta"), {
  ssr: true, // Safe - no browser APIs
});

const LettersOfHope = dynamic(() => import("@/components/letters-of-hope"), {
  ssr: true, // Safe - no browser APIs
  loading: () => <div className="min-h-[400px] bg-soft-cloud/10"></div>,
});

const YouthMentorship = dynamic(() => import("@/components/youth-mentorship"), {
  ssr: true, // Safe - no browser APIs
  loading: () => <div className="min-h-[400px] bg-soft-cloud/10"></div>,
});

const MichaelTestament = dynamic(
  () => import("@/components/michael-testament"),
  {
    ssr: true, // Safe - no browser APIs
    loading: () => <div className="min-h-[300px] bg-soft-cloud/10"></div>,
  },
);

// Design System Components - use suspense for smaller components
const Section = dynamic(() => import("@/components/section"), {
  ssr: true,
});

// Changed from feature-card to ui/feature-card
const FeatureCard = dynamic(
  () => import("@/components/ui/feature-card").then((mod) => mod.default),
  {
    ssr: true,
  },
);

const TestimonialCard = dynamic(() => import("@/components/testimonial-card"), {
  ssr: true,
});

import {
  Container,
  Card,
  Heading,
  Text,
  Button,
  Stack,
  Badge,
  Quote,
} from "@/components/ui";

// QUARANTINED: RevealOnScroll removed - component was simplified and no longer exports this
// Use simple CSS animations instead

const PageTransition = dynamic(
  () => import("@/components/ui/page-transition"),
  {
    // Removed ssr: false - not allowed in client components
  },
);

export default function HomePage() {
  // Calculate days since launch server-side
  const launchDate = new Date("2025-07-04");
  const now = new Date();
  const diffTime = now.getTime() - launchDate.getTime();
  const daysSinceLaunch = Math.floor(diffTime / (1000 * 60 * 60 * 24)) > 0 
    ? Math.floor(diffTime / (1000 * 60 * 60 * 24)) 
    : 3;

  return (
    <div className="relative min-h-screen">
      {/* Trust Banner - Above the fold */}
      <TrustBanner />

      {/* Hero Section */}
      <div className="relative min-h-[90vh] flex items-center overflow-hidden bg-pure-white">
        <Hero />
      </div>

      {/* Trust Bar */}
      <TrustBar />

      {/* Case Status */}
      <CaseStatus />

      {/* Urgency Banner */}
      <UrgencyBanner />

      {/* Supporter Count */}
      <SupporterCount current={1247} goal={5000} />

      {/* Quick Navigation */}
      <QuickNav />

      {/* Explore Navigation */}
      <ExploreNav />

      {/* Main Content Sections */}
      <Section>
        <DungyWisdom />
      </Section>

      <Section>
        <PropheticMoment />
      </Section>

      <Section>
        <DecisionCountdown />
      </Section>

      <Section>
        <HeartbeatMonitor />
      </Section>

      <Section>
        <RiskMitigation />
      </Section>

      <Section>
        <SmartCTA />
      </Section>

      <Section>
        <LettersOfHope />
      </Section>

      <Section>
        <YouthMentorship />
      </Section>

      <Section>
        <MichaelTestament />
      </Section>

      <Section>
        <MicroCommitments />
      </Section>

      <Section>
        <LossAversion />
      </Section>

      {/* QUARANTINED: FloatingCTA components removed due to whileHover/whileTap DOM prop warnings */}
      {/* Use Bridge Project MVP instead: /bridge-project-mvp */}
    </div>
  );
}
