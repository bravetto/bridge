"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { getAllPeople } from "@/data/people";
import InteractivePersonGrid from "@/components/people/interactive-person-grid";
import { withErrorBoundary } from "@/components/ui/error-boundary";
import {
  GridLoadingSkeleton,
  LoadingMessages,
  ErrorWithRetry,
} from "@/components/people/LoadingStates";
import { PersonData } from "@/types/person";

// Divine particles component for the header
const PeoplePageParticles = () => {
  // Use completely static predetermined positions to prevent any hydration mismatches
  const staticParticles = [
    { id: 0, left: 25, top: 15, duration: 5, delay: 0 },
    { id: 1, left: 75, top: 20, duration: 6, delay: 0.2 },
    { id: 2, left: 45, top: 35, duration: 7, delay: 0.4 },
    { id: 3, left: 85, top: 45, duration: 5, delay: 0.6 },
    { id: 4, left: 15, top: 55, duration: 6, delay: 0.8 },
    { id: 5, left: 65, top: 65, duration: 7, delay: 1.0 },
    { id: 6, left: 35, top: 75, duration: 5, delay: 1.2 },
    { id: 7, left: 55, top: 25, duration: 6, delay: 1.4 },
    { id: 8, left: 95, top: 30, duration: 7, delay: 1.6 },
    { id: 9, left: 5, top: 40, duration: 5, delay: 1.8 },
    { id: 10, left: 80, top: 60, duration: 6, delay: 2.0 },
    { id: 11, left: 40, top: 10, duration: 7, delay: 2.2 },
    { id: 12, left: 20, top: 80, duration: 5, delay: 2.4 },
    { id: 13, left: 70, top: 50, duration: 6, delay: 2.6 },
    { id: 14, left: 90, top: 70, duration: 7, delay: 2.8 },
    { id: 15, left: 10, top: 25, duration: 5, delay: 3.0 },
    { id: 16, left: 60, top: 85, duration: 6, delay: 3.2 },
    { id: 17, left: 30, top: 45, duration: 7, delay: 3.4 },
    { id: 18, left: 85, top: 15, duration: 5, delay: 3.6 },
    { id: 19, left: 50, top: 90, duration: 6, delay: 3.8 },
    { id: 20, left: 15, top: 35, duration: 7, delay: 4.0 },
    { id: 21, left: 75, top: 40, duration: 5, delay: 4.2 },
    { id: 22, left: 45, top: 70, duration: 6, delay: 4.4 },
    { id: 23, left: 95, top: 55, duration: 7, delay: 4.6 },
    { id: 24, left: 25, top: 60, duration: 5, delay: 4.8 },
    { id: 25, left: 65, top: 20, duration: 6, delay: 5.0 },
    { id: 26, left: 35, top: 30, duration: 7, delay: 5.2 },
    { id: 27, left: 80, top: 80, duration: 5, delay: 5.4 },
    { id: 28, left: 55, top: 50, duration: 6, delay: 5.6 },
    { id: 29, left: 20, top: 65, duration: 7, delay: 5.8 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {staticParticles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0.7, 1, 0.7],
            y: [0, -30, 0],
            x: [0, (particle.id % 40) - 20, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
          className="absolute w-1 h-1 rounded-full bg-hope-gold/50 blur-sm"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
        />
      ))}
    </div>
  );
};

interface PeopleContentProps {
  simulationConfig?: {
    loadingDelay?: number;
    simulateError?: boolean;
  };
}

function PeopleContent({ simulationConfig }: PeopleContentProps) {
  // BYPASS ALL LOADING STATE - Direct data loading to avoid Next.js 15.4.2 issues
  const people = getAllPeople();
  const [error, setError] = useState<string | null>(null);

  console.log('🎯 PeopleContent rendering with', people.length, 'people');

  const handleRetry = () => {
    // No retry logic needed since we're loading directly
    console.log('🔄 Retry requested but not needed');
  };

  return (
    <main className="page-container min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Enhanced Hero Section */}
      <section className="hero-section section-spacing">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="people-page-header relative overflow-hidden"
        >
          <div className="content-center relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hero-heading text-responsive-hero font-cinzel bg-gradient-to-r from-white via-hope-gold to-white bg-clip-text text-transparent drop-shadow-lg"
              data-testid="heading"
            >
              Our People
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="hero-subheading text-responsive-sub text-white/90"
              data-testid="text"
            >
              Meet the visionaries whose faith journeys are transforming lives
              and communities through authentic connection and divine purpose.
            </motion.p>
          </div>

          {/* Divine particles background */}
          <PeoplePageParticles />
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="section-spacing py-24" data-testid="section">
        <div className="content-center">
          {/* Loading, Error or Content */}
          {error ? (
            <div className="flex justify-center items-center py-16">
              <ErrorWithRetry message={error} onRetry={handleRetry} />
            </div>
          ) : (
            people && (
              <Suspense
                fallback={<GridLoadingSkeleton count={8} showFeatured={true} />}
              >
                <InteractivePersonGrid
                  people={people}
                  data-testid="person-grid"
                />
              </Suspense>
            )
          )}
        </div>
      </section>
    </main>
  );
}

export default withErrorBoundary(PeopleContent, "PeopleContent");
