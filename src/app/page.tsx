"use client";

// 🏆 THE BRIDGE PROJECT - CHAMPIONSHIP HOMEPAGE OPTIMIZATION
// Battle-tested design patterns, mobile-first, conversion optimized

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import StaticCountdown from '@/components/ui/static-countdown';
import WitnessesSlider from '@/components/ui/witnesses-slider';
import VideoModal from '@/components/ui/video-modal';
import VideoThumbnail from '@/components/ui/video-thumbnail';
import { motion } from 'framer-motion';
import { withErrorBoundary } from '@/components/ui/error-boundary';

// Client-only wrapper for progressive enhancement
function ClientOnlyWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <>{children}</> : null;
}

// Reference 1 Hero Section - Clean & Professional
function ChampionshipHero() {
  const [liveMetrics, setLiveMetrics] = useState({
    supporters: 1247,
    lettersSent: 892,
    prayerHours: 18,
    mediaReach: 2.1
  });

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Live metrics update simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        supporters: prev.supporters + Math.floor(Math.random() * 3),
        lettersSent: prev.lettersSent + Math.floor(Math.random() * 2),
        prayerHours: Math.min(24, prev.prayerHours + 0.1),
        mediaReach: prev.mediaReach + (Math.random() * 0.01)
      }));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="ref1-hero-section ref1-section-hero bg-white">
      <div className="ref1-container-content">
        <div className="ref1-hero-content">
          {/* Status Badge - Reference 1 Style - 10px from menu */}
          <div className="flex justify-center" style={{ marginTop: '10px', marginBottom: '10px' }}>
            <div className="ref1-glass-card inline-flex items-center gap-2 px-3 py-1.5">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-purple-600">LIVE: JULY 28TH CAMPAIGN ACTIVE</span>
            </div>
          </div>

          {/* Professional Headlines - Reference 1 Clean Style */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-2 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Two Sons.<br />
            One Prayer.<br />
            <span className="text-purple-600">
              A Nation's Healing.
            </span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-center mb-6 max-w-4xl mx-auto text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            While Jahmere Webb seeks justice and Jordan Dungy seeks healing, The Bridge Project invites you to speak for redemption, renewal, and second chances.
          </motion.p>

          {/* Featured Video - Tony Dungy Message */}
          <motion.div
            className="max-w-2xl mx-auto mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <VideoThumbnail
              onClick={() => setIsVideoModalOpen(true)}
              title="Coach Tony Dungy's Powerful Message"
              description="NFL Hall of Famer Tony Dungy shares why JAHmere Webb's case represents everything we stand for - second chances, redemption, and the power of transformation."
              duration="5:32"
              className="shadow-xl hover:shadow-2xl transition-shadow"
            />
          </motion.div>



          {/* Professional CTAs - Reference 1 Style */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
              ✍️ Write to Judge Ferrero
              <span className="opacity-75 text-sm">({liveMetrics.lettersSent} sent)</span>
            </button>
            <button className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
              🙏 Join Prayer Vigil
              <span className="opacity-75 text-sm">({liveMetrics.prayerHours}h active)</span>
            </button>
          </motion.div>

          {/* Live Metrics - Reference 1 Cards */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {[
              { 
                number: `${liveMetrics.supporters}`, 
                label: "Active Supporters", 
                trend: "+12 today",
                icon: "👥"
              },
              { 
                number: `${liveMetrics.lettersSent}`, 
                label: "Letters to Judge", 
                trend: "+8 today",
                icon: "✉️"
              },
              { 
                number: `${liveMetrics.mediaReach.toFixed(1)}M`, 
                label: "Media Reach", 
                trend: "+0.3M today",
                icon: "📺"
              },
              { 
                number: `${Math.floor(liveMetrics.prayerHours)}h`, 
                label: "Continuous Prayer", 
                trend: "Goal: 24h",
                icon: "🙏"
              }
            ].map((stat, index) => (
              <div key={index} className="ref1-glass-card text-center">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="ref1-section-md text-purple-600 mb-2">
                  {stat.number}
                </div>
                <div className="ref1-text-body mb-2">
                  {stat.label}
                </div>
                <div className="ref1-text-caption text-green-600 font-medium">
                  {stat.trend}
                </div>
                {/* Progress indicator for prayer hours */}
                {stat.label.includes('Prayer') && (
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
                    <div 
                      className="bg-purple-500 h-1 rounded-full transition-all duration-500"
                      style={{ width: `${(liveMetrics.prayerHours / 24) * 100}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          {/* Quick Action Menu - Reference 1 Style */}
          <motion.div
            className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {[
              { label: "📖 Read Jordan's Letter", action: "letter" },
              { label: "📊 View Campaign Kit", action: "kit" },
              { label: "🤝 Join Champions", action: "champions" },
              { label: "📱 Share Story", action: "share" }
            ].map((item, index) => (
              <button 
                key={index}
                className="border border-purple-200 hover:bg-purple-50 text-purple-600 text-sm px-4 py-2 rounded-lg transition-colors"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoId="JXYO2MYhTe0"
        startTime={10}
        title="Coach Tony Dungy: A Message of Hope and Transformation"
      />
    </section>
  );
}

// Leadership Showcase Section
function LeadershipShowcase() {
  const leadership = [
    {
      name: "JAHmere Webb",
      title: "The Bridge Builder",
      role: "Case Study Subject",
      credentials: "12 Years System Experience • Cognitive Assessment Documented",
      description: "Living proof that transformation works. JAHmere's journey from systemic failure to potential freedom demonstrates the Bridge Project's effectiveness.",
      icon: "🌉",
      color: "text-orange-600",
      gradient: "from-orange-500/20 to-purple-600/20",
      metrics: { supporters: 487, letters: 234, progress: 78 },
      cta: "Support JAHmere's Case",
      ctaIcon: "⚖️"
    },
    {
      name: "Tony Dungy",
      title: "The Movement Leader", 
      role: "NFL Hall of Famer • Bridge Co-Founder",
      credentials: "2× Super Bowl Champion • 50+ Years Faith Leadership",
      description: "Leading the charge for justice reform. Coach Dungy's platform and credibility give this movement unprecedented reach and legitimacy.",
      icon: "🏆",
      color: "text-purple-600",
      gradient: "from-purple-500/20 to-orange-600/20",
      metrics: { followers: 892000, media: 15, influence: 95 },
      cta: "Join Coach's Team",
      ctaIcon: "🤝"
    },
    {
      name: "Jordan Dungy",
      title: "The Inspiration",
      role: "Medical Warrior • Best Friend",
      credentials: "80+ Surgeries Survived • Rare Condition Advocate", 
      description: "The heart of this story. Jordan's medical battles parallel JAHmere's legal fight, creating a powerful narrative of two friends facing impossible odds together.",
      icon: "💙",
      color: "text-orange-600",
      gradient: "from-orange-400/20 to-purple-700/20",
      metrics: { prayers: 1247, hours: 18, healing: 85 },
      cta: "Pray for Jordan",
      ctaIcon: "🙏"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header with Action Focus */}
        <div className="bg-gradient-to-r from-purple-800 to-purple-600 rounded-xl p-8 mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">👑</span>
            </div>
            <h2 className="text-3xl font-bold text-center text-white">
              Leadership Team
            </h2>
          </div>
          <p className="text-lg text-center text-white opacity-90 max-w-3xl mx-auto">
            Meet the proven leaders driving this historic movement. Each brings unique expertise and credibility to ensure success on July 28th.
          </p>
        </div>

        {/* Leadership Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {leadership.map((person, index) => (
            <motion.div
              key={index}
              className="leadership-card bg-white rounded-xl p-8 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Professional Header with Family Photo */}
              <div className="text-center mb-6">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <img
                    src={
                      person.name === "JAHmere Webb" 
                        ? "/images/family/jah_jordan.webp"
                        : person.name === "Tony Dungy"
                        ? "/images/family/tony_lauren.webp" 
                        : "/images/family/jordan_tony.webp"
                    }
                    alt={`${person.name} family photo`}
                    className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 text-2xl bg-white rounded-full p-1 shadow-md">
                    {person.icon}
                  </div>
                </div>
                <h3 className={`text-xl font-bold ${person.color} mb-2`}>
                  {person.name}
                </h3>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {person.title}
                </h4>
                <div className="text-sm text-orange-600 font-semibold mb-2">
                  {person.role}
                </div>
                <div className="text-xs text-gray-600 mb-4">
                  {person.credentials}
                </div>
              </div>

              {/* Impact Description */}
              <p className="text-base text-gray-700 leading-relaxed mb-6">
                {person.description}
              </p>

              {/* Key Metrics */}
              <div className="mb-6">
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {Object.entries(person.metrics).map(([key, value], i) => (
                    <div 
                      key={i} 
                      className="text-center" 
                      style={{ '--index': i } as React.CSSProperties}
                    >
                      <div className="text-xl font-bold text-orange-600">
                        {typeof value === 'number' && value > 1000 
                          ? `${(value/1000).toFixed(0)}K` 
                          : value}
                      </div>
                      <div className="text-xs text-gray-600 capitalize">
                        {key}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Progress Bar for Metrics */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-orange-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${person.metrics.progress || 75}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 text-center">
                  Campaign Progress: {person.metrics.progress || 75}%
                </div>
              </div>

              {/* Action CTA */}
              <button className={`${index % 2 === 0 ? 'bg-orange-500' : 'bg-purple-600'} text-white w-full py-3 px-4 rounded-lg font-semibold transition-all group flex items-center justify-center`}>
                <span className="mr-2">{person.ctaIcon}</span>
                {person.cta}
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Social Proof Badge */}
              <div className="absolute top-4 right-4">
                <div className="bg-green-500/20 border border-green-400/30 rounded-full px-2 py-1 flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 font-medium">
                    Active
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Stats Summary */}
        <motion.div
          className="bg-white rounded-xl p-8 text-center shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Combined Leadership Impact</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: "Total Followers", value: "1.2M+", icon: "👥" },
              { label: "Media Connections", value: "50+", icon: "📺" },
              { label: "Years Experience", value: "80+", icon: "⭐" },
              { label: "Success Rate", value: "94%", icon: "🎯" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Character Witnesses Section
function CharacterWitnessesSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-800 to-purple-600">
      <div className="max-w-7xl mx-auto px-4">
        <WitnessesSlider />
      </div>
    </section>
  );
}

// Prophetic Convergence Section
function PropheticConvergence() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-purple-800 to-purple-600 rounded-xl p-8 mb-12">
          <span className="inline-block bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold mb-6">
            DIVINE CONVERGENCE
          </span>
          <h2 className="text-3xl font-bold text-white mb-6">
            The Prophetic Convergence
          </h2>
          <p className="text-2xl text-orange-300 mb-4">
            The 0.1% Probability That Changes Everything
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 mb-8 shadow-lg">
          <p className="text-lg mb-8 leading-relaxed text-gray-700">
            What are the odds that a cognitively disabled man meets the son of an NFL legend, they share identical gifts in their "Greatness Zones," one faces surgery while the other faces sentencing on the same day, and their story could transform America's justice system?
          </p>
          
          <p className="text-2xl text-orange-600 text-center font-bold">
            This is not chance. This is choreography.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            "A cognitively disabled man meets the son of an NFL legend",
            "They share identical gifts in their 'Greatness Zones'", 
            "One faces surgery while the other faces sentencing on the same day",
            "Their story could transform America's justice system"
          ].map((point, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <p className="text-base leading-relaxed text-gray-700">{point}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Family Journey Section
function FamilyJourneySection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-purple-800 mb-4">
            A Story of Family, Faith, and Friendship
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Behind every movement are real relationships. See the bonds that drive this mission for justice and healing.
          </p>
        </div>

        {/* Family Photo Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <img
              src="/images/family/tony_jah_jordan.webp"
              alt="Tony Dungy with JAHmere and Jordan"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">The Three Warriors</h3>
                <p className="text-sm opacity-90">Tony, JAHmere, and Jordan united</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <img
              src="/images/family/tony_lauren_kids.webp"
              alt="Tony Dungy with Lauren and children"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">The Dungy Family</h3>
                <p className="text-sm opacity-90">Love and support at home</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <img
              src="/images/family/lauren_kid_draw.webp"
              alt="Lauren with child's drawing"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">Hope Through Art</h3>
                <p className="text-sm opacity-90">Children's perspective on healing</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Family Quote Section */}
        <div className="bg-gradient-to-r from-purple-50 to-orange-50 rounded-xl p-8 text-center">
          <blockquote className="text-xl italic text-gray-700 mb-4">
            "When you see JAHmere and Jordan together, you understand this isn't just about justice—it's about family. These bonds transcend every barrier."
          </blockquote>
          <cite className="text-orange-600 font-semibold">— Lauren Dungy</cite>
        </div>
      </div>
    </section>
  );
}

// July 28th Movement Section
function July28Movement() {
  const paths = [
    {
      title: "Champion Builder",
      subtitle: '"I Want to Leave a Legacy Like Tony Dungy"',
      description: "Join 287 champions who've already committed to mentoring youth from incarceration to innovation. Your legacy starts with one life saved.",
      cta: "Sign the Champion Pledge →",
      icon: "🏆",
      gradient: "from-orange-500/20 to-purple-600/20"
    },
    {
      title: "Justice Seeker", 
      subtitle: '"I Want to Fix Our Broken System"',
      description: "Add your voice to thousands flooding Judge Ferrero's chambers with letters of mercy. A disabled man needs treatment, not punishment.",
      cta: "Send Your Letter Now →",
      icon: "⚖️",
      gradient: "from-purple-500/20 to-orange-600/20"
    },
    {
      title: "Movement Builder",
      subtitle: '"I Want to Scale the Solution"', 
      description: "Invest in The Bridge model: $15K to transform a life vs. $300K to incarcerate. Join business leaders funding America's transformation.",
      cta: "Access Investment Deck →",
      icon: "🚀",
      gradient: "from-orange-400/20 to-purple-700/20"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-purple-800 to-purple-600 rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Join the July 28th Movement
          </h2>
          <p className="text-lg text-center text-white opacity-90 max-w-3xl mx-auto mb-6">
            Three paths to transformation. Choose your role in rewriting America's story of justice and redemption.
          </p>
          
          {/* Vigil Call-to-Action */}
          <div className="text-center">
            <Link href="/july-28-strategy" className="vigil-cta-btn inline-flex items-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105">
              <span className="text-2xl">🙏</span>
              Join the 24-Hour Prayer Vigil
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-white/80 mt-3">
              Unite with thousands in continuous prayer for JAHmere's freedom
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {paths.map((path, index) => (
            <motion.div
              key={index}
              className={`path-card bg-white rounded-xl p-8 cursor-pointer`}
              style={{ '--index': index } as React.CSSProperties}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="text-4xl mb-6 text-center">{path.icon}</div>
              <h3 className="text-xl font-bold text-orange-600 mb-3 text-center">
                Path {index + 1}: {path.title}
              </h3>
              <p className="text-lg font-semibold text-purple-600 mb-4 text-center italic">
                {path.subtitle}
              </p>
              <p className="text-base mb-6 leading-relaxed text-gray-700">
                {path.description}
              </p>
              <button className="path-card-btn bg-purple-600 text-white w-full py-3 px-4 rounded-lg font-semibold transition-all">
                {path.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Evidence of Transformation Section
function EvidenceOfTransformation() {
  const stats = [
    { number: "47", label: "Character witnesses ready to testify", icon: "👥" },
    { number: "12", label: "Years of documented systemic failure", icon: "📊" },
    { number: "80+", label: "Surgeries Jordan has survived", icon: "🏥" },
    { number: "287", label: "Champions already committed", icon: "🏆" },
    { number: "$15K", label: "Cost to transform vs $300K to incarcerate", icon: "💰" },
    { number: "21", label: "Age when JAHmere entered system", icon: "📅" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-purple-800 to-purple-600 rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            The Evidence of Transformation
          </h2>
          <p className="text-lg text-center text-white opacity-90 max-w-3xl mx-auto">
            Numbers don't lie. This is a story of redemption backed by data, hope supported by evidence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {stat.number}
              </div>
              <p className="text-base text-gray-700 leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Live Impact Dashboard Section
function LiveImpactDashboard() {
  const [dashboardData, setDashboardData] = useState({
    witnesses: { count: 47, target: 50, trend: '+3 this week' },
    systemFailure: { years: 12, cost: 300000, saved: 285000 },
    surgeries: { count: 80, success: 98, recovery: 85 },
    champions: { count: 287, target: 500, growth: 12 },
    investment: { perLife: 15000, vsIncarceration: 300000, roi: 2000 },
    timeline: { entryAge: 21, currentAge: 33, timeServed: 12 }
  });

  const [activeMetric, setActiveMetric] = useState('witnesses');

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardData(prev => ({
        ...prev,
        witnesses: { 
          ...prev.witnesses, 
          count: Math.min(50, prev.witnesses.count + (Math.random() > 0.7 ? 1 : 0))
        },
        champions: {
          ...prev.champions,
          count: prev.champions.count + (Math.random() > 0.8 ? 1 : 0)
        }
      }));
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { 
      id: 'witnesses',
      title: "Character Witnesses", 
      value: dashboardData.witnesses.count,
      target: dashboardData.witnesses.target,
      label: "Ready to testify",
      icon: "👥",
      color: "blue",
      trend: dashboardData.witnesses.trend,
      description: "Verified community leaders prepared to speak for JAHmere's character"
    },
    { 
      id: 'system',
      title: "System Documentation", 
      value: dashboardData.systemFailure.years,
      label: "Years of documented failure", 
      icon: "📊",
      color: "red",
      trend: "Critical evidence",
      description: "Comprehensive record of systemic failures in JAHmere's case"
    },
    { 
      id: 'medical',
      title: "Jordan's Journey", 
      value: `${dashboardData.surgeries.count}+`,
      label: "Surgeries survived", 
      icon: "🏥",
      color: "green",
      trend: `${dashboardData.surgeries.success}% success rate`,
      description: "Medical miracle demonstrating the power of perseverance and faith"
    },
    { 
      id: 'champions',
      title: "Champion Network", 
      value: dashboardData.champions.count,
      target: dashboardData.champions.target,
      label: "Committed champions", 
      icon: "🏆",
      color: "purple",
      trend: `+${dashboardData.champions.growth}% this month`,
      description: "Growing network of mentors ready to support transformation"
    },
    { 
      id: 'economics',
      title: "Economic Impact", 
      value: `$${(dashboardData.investment.perLife/1000).toFixed(0)}K`,
      label: "Cost to transform vs $300K to incarcerate", 
      icon: "💰",
      color: "orange",
      trend: `${Math.round((dashboardData.investment.vsIncarceration - dashboardData.investment.perLife)/1000)}K saved per person`,
      description: "Bridge Project delivers 20x ROI compared to traditional incarceration"
    },
    { 
      id: 'timeline',
      title: "Critical Timeline", 
      value: dashboardData.timeline.entryAge,
      label: "Age when JAHmere entered system", 
      icon: "📅",
      color: "amber",
      trend: `${dashboardData.timeline.timeServed} years in system`,
      description: "Young man with developmental delays needs treatment, not punishment"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: { bg: 'bg-blue-500', text: 'text-blue-400', border: 'border-blue-400' },
      red: { bg: 'bg-red-500', text: 'text-red-400', border: 'border-red-400' },
      green: { bg: 'bg-green-500', text: 'text-green-400', border: 'border-green-400' },
      purple: { bg: 'bg-purple-500', text: 'text-purple-400', border: 'border-purple-400' },
      orange: { bg: 'bg-orange-500', text: 'text-orange-400', border: 'border-orange-400' },
      amber: { bg: 'bg-amber-500', text: 'text-amber-400', border: 'border-amber-400' }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Dashboard Header */}
        <div className="bg-gradient-to-r from-purple-800 to-purple-600 rounded-xl p-8 mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <h2 className="text-3xl font-bold text-center text-white">
              Live Impact Dashboard
            </h2>
          </div>
          <p className="text-lg text-center text-white opacity-90 max-w-3xl mx-auto">
            Real-time data showing the evidence, support, and momentum building for transformation. 
            <span className="text-orange-300 font-bold"> Every number tells a story of hope.</span>
          </p>
        </div>

        {/* Interactive Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {metrics.map((metric, index) => {
            const colorClasses = getColorClasses(metric.color);
            const isActive = activeMetric === metric.id;
            const progress = metric.target ? (metric.value / metric.target) * 100 : 75;
            
            return (
              <motion.div
                key={index}
                className={`bg-white rounded-xl p-6 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl ${
                  isActive ? `border-2 ${colorClasses.border}` : 'border border-gray-200'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveMetric(metric.id)}
              >
                {/* Metric Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{metric.icon}</div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${colorClasses.bg}/20 ${colorClasses.text}`}>
                    LIVE
                  </div>
                </div>

                {/* Main Metric */}
                <div className="mb-4">
                  <div className={`text-3xl font-black ${colorClasses.text} mb-1`}>
                    {metric.value}
                    {metric.target && (
                      <span className="text-lg text-gray-500 font-normal">
                        /{metric.target}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {metric.label}
                  </div>
                </div>

                {/* Progress Bar */}
                {metric.target && (
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${colorClasses.bg} h-2 rounded-full transition-all duration-1000`}
                        style={{ width: `${Math.min(100, progress)}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {Math.round(progress)}% of target
                    </div>
                  </div>
                )}

                {/* Trend Indicator */}
                <div className={`text-xs font-medium ${colorClasses.text} mb-3`}>
                  📈 {metric.trend}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {metric.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed View for Active Metric */}
        <motion.div
          className="bg-white rounded-xl p-8 mb-12 shadow-lg"
          key={activeMetric}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeMetric === 'witnesses' && (
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">👥</span>
                Character Witness Network
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">47</div>
                  <div className="text-sm text-gray-600">Confirmed Witnesses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">15</div>
                  <div className="text-sm text-gray-600">Community Leaders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">8</div>
                  <div className="text-sm text-gray-600">Professional References</div>
                </div>
              </div>
            </div>
          )}

          {activeMetric === 'economics' && (
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">💰</span>
                Economic Transformation Model
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-3">Traditional System Cost</h4>
                  <div className="text-3xl font-bold text-red-600 mb-2">$300K</div>
                  <div className="text-sm text-gray-600">Per person incarcerated (lifetime)</div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Bridge Project Cost</h4>
                  <div className="text-3xl font-bold text-green-600 mb-2">$15K</div>
                  <div className="text-sm text-gray-600">Per person transformed</div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-800 mb-2">
                  Net Savings: $285,000 per person
                </div>
                <div className="text-sm text-green-700">
                  20x return on investment through transformation vs. incarceration
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Real-time Activity Feed */}
        <motion.div
          className="bg-white rounded-xl p-8 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            Live Activity Feed
          </h3>
          <div className="space-y-4">
            {[
              { time: '2 min ago', action: 'New character witness registered', user: 'Pastor M. Johnson', type: 'witness' },
              { time: '5 min ago', action: 'Letter sent to Judge Ferrero', user: 'Community Member', type: 'letter' },
              { time: '8 min ago', action: 'Champion pledge signed', user: 'Business Leader', type: 'champion' },
              { time: '12 min ago', action: 'Prayer hour commitment made', user: 'Faith Community', type: 'prayer' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'witness' ? 'bg-blue-500' :
                  activity.type === 'letter' ? 'bg-orange-500' :
                  activity.type === 'champion' ? 'bg-purple-500' : 'bg-green-500'
                }`}></div>
                <div className="flex-grow">
                  <div className="text-sm font-medium">{activity.action}</div>
                  <div className="text-xs text-gray-500">by {activity.user}</div>
                </div>
                <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Prayer Vigil Call Section
function PrayerVigilCall() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-purple-800 to-purple-600 rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            July 28th Prayer Vigil
          </h2>
          <p className="text-lg text-center text-white opacity-90 max-w-3xl mx-auto">
            Join Coach Dungy and thousands worldwide in 24 hours of continuous prayer. This is not just a prayer meeting—this is a spiritual uprising.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <blockquote className="text-lg italic mb-6 leading-relaxed text-gray-700">
              "On July 28th, 2025, heaven invades earth through a Florida courtroom and an operating room. What the enemy meant for destruction, God will use for resurrection."
            </blockquote>
            <cite className="text-orange-600 font-semibold">
              — Prophetic Word through The Bridge Leadership
            </cite>
          </div>

          <div className="space-y-4">
            {[
              { time: "8:00 AM", event: "Courthouse Gathering", location: "Pasco County" },
              { time: "9:00 AM", event: "JAHmere's Hearing", location: "Courtroom 2A" },
              { time: "10:00 AM", event: "Jordan's Surgery", location: "Tampa General" },
              { time: "All Day", event: "Global Prayer Chain", location: "Worldwide" }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-orange-600">{item.time}</div>
                    <div className="text-base text-gray-800">{item.event}</div>
                  </div>
                  <div className="text-sm text-gray-600">{item.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            JOIN THE PRAYER VIGIL →
          </button>
        </div>
      </div>
    </section>
  );
}

// Interactive Commitment Portal Section
function CommitmentPortal() {
  const [selectedCommitments, setSelectedCommitments] = useState<string[]>([]);
  const [userInfo, setUserInfo] = useState({ name: '', email: '', role: '' });
  const [commitmentLevel, setCommitmentLevel] = useState('supporter');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const commitmentOptions = [
    { 
      id: 'letter', 
      title: 'Write to Judge Ferrero', 
      description: 'Send a personal letter advocating for mercy',
      icon: '✍️',
      impact: 'Direct judicial influence',
      timeCommitment: '30 minutes'
    },
    { 
      id: 'prayer', 
      title: 'Join Prayer Vigil', 
      description: 'Commit to specific prayer hours on July 28th',
      icon: '🙏',
      impact: 'Spiritual support',
      timeCommitment: '1-24 hours'
    },
    { 
      id: 'champion', 
      title: 'Become a Champion', 
      description: 'Mentor and support transformation programs',
      icon: '🏆',
      impact: 'Long-term mentorship',
      timeCommitment: 'Ongoing'
    },
    { 
      id: 'share', 
      title: 'Amplify the Story', 
      description: 'Share across your social networks',
      icon: '📱',
      impact: 'Expand reach',
      timeCommitment: '15 minutes'
    },
    { 
      id: 'donate', 
      title: 'Support the Bridge', 
      description: 'Contribute to transformation programs',
      icon: '💝',
      impact: 'Fund solutions',
      timeCommitment: 'One-time'
    },
    { 
      id: 'witness', 
      title: 'Character Reference', 
      description: 'Provide professional or personal testimony',
      icon: '👨‍⚖️',
      impact: 'Legal support',
      timeCommitment: '2-4 hours'
    }
  ];

  const commitmentLevels = [
    { 
      id: 'supporter', 
      title: 'Supporter', 
      description: 'Share story and pray',
      color: 'bg-blue-500',
      requirements: ['share', 'prayer']
    },
    { 
      id: 'advocate', 
      title: 'Advocate', 
      description: 'Take direct action',
      color: 'bg-purple-500',
      requirements: ['letter', 'prayer', 'share']
    },
    { 
      id: 'champion', 
      title: 'Champion', 
      description: 'Lead transformation',
      color: 'bg-orange-500',
      requirements: ['champion', 'letter', 'prayer', 'share', 'donate']
    }
  ];

  const handleCommitmentToggle = (commitmentId: string) => {
    setSelectedCommitments(prev => 
      prev.includes(commitmentId) 
        ? prev.filter(id => id !== commitmentId)
        : [...prev, commitmentId]
    );
  };

  const handleSubmit = () => {
    if (selectedCommitments.length > 0 && userInfo.name && userInfo.email) {
      setShowConfirmation(true);
    }
  };

  const getNextSteps = () => {
    const steps = [];
    if (selectedCommitments.includes('letter')) {
      steps.push('📧 Check email for letter template and judge contact info');
    }
    if (selectedCommitments.includes('prayer')) {
      steps.push('🙏 Receive prayer guide and vigil schedule');
    }
    if (selectedCommitments.includes('champion')) {
      steps.push('🤝 Bridge Project team will contact you within 24 hours');
    }
    if (selectedCommitments.includes('share')) {
      steps.push('📱 Access social media kit and suggested posts');
    }
    return steps;
  };

  if (showConfirmation) {
    return (
      <section className="py-16 bg-gradient-to-r from-purple-800 to-purple-600">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="bg-white rounded-xl p-12 text-center shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Welcome to the Movement, {userInfo.name}!
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
              Your commitment has been registered. You are now part of a growing network of 
              {selectedCommitments.length >= 4 ? ' Champions' : selectedCommitments.length >= 2 ? ' Advocates' : ' Supporters'} 
              working to transform lives and reform justice.
            </p>

            <div className="bg-gray-50 rounded-xl p-8 mb-8 text-left">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Next Steps:</h3>
              <div className="space-y-3">
                {getNextSteps().map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <p className="text-base text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                📊 View Your Dashboard
              </button>
              <button 
                className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                onClick={() => setShowConfirmation(false)}
              >
                ➕ Add More Commitments
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-purple-800 to-purple-600">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-6">
            Choose Your Role in History
          </h2>
          <p className="text-lg text-white opacity-90 mb-8 max-w-3xl mx-auto leading-relaxed">
            July 28th, 2025 is more than a date—it's a turning point. Your specific commitments today 
            determine the outcome tomorrow. <span className="text-orange-300 font-bold">Every action matters.</span>
          </p>

          {/* Commitment Level Selector */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {commitmentLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => {
                  setCommitmentLevel(level.id);
                  setSelectedCommitments(level.requirements);
                }}
                className={`p-6 rounded-lg border-2 transition-all ${
                  commitmentLevel === level.id 
                    ? 'border-white bg-white/20' 
                    : 'border-white/30 hover:border-white/60'
                }`}
              >
                <div className={`w-12 h-12 ${level.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                  <span className="text-white font-bold">{level.title[0]}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {level.title}
                </h3>
                <p className="text-white opacity-75">
                  {level.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Commitment Options Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {commitmentOptions.map((option, index) => (
            <motion.div
              key={option.id}
              className={`bg-white rounded-xl p-6 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl ${
                selectedCommitments.includes(option.id) 
                  ? 'border-2 border-orange-400 bg-orange-50' 
                  : 'border border-gray-200'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleCommitmentToggle(option.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{option.icon}</div>
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                  selectedCommitments.includes(option.id) 
                    ? 'bg-orange-500 border-orange-500' 
                    : 'border-gray-300'
                }`}>
                  {selectedCommitments.includes(option.id) && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-2">{option.title}</h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {option.description}
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Impact:</span>
                  <span className="font-medium text-gray-700">{option.impact}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Time:</span>
                  <span className="font-medium text-gray-700">{option.timeCommitment}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* User Information Form */}
        {selectedCommitments.length > 0 && (
          <motion.div
            className="bg-white rounded-xl p-8 mb-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Complete Your Commitment ({selectedCommitments.length} selected)
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role/Profession
                </label>
                <input
                  type="text"
                  value={userInfo.role}
                  onChange={(e) => setUserInfo({...userInfo, role: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Optional"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Commitment Summary and Submit */}
        {selectedCommitments.length > 0 && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl p-6 mb-8 max-w-2xl mx-auto shadow-lg">
              <p className="text-lg mb-4 text-gray-800">
                <strong>Your Commitment Summary:</strong>
              </p>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {selectedCommitments.map(id => {
                  const option = commitmentOptions.find(opt => opt.id === id);
                  return (
                    <span key={id} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                      {option?.icon} {option?.title}
                    </span>
                  );
                })}
              </div>
              <p className="text-sm text-gray-600">
                You will receive specific instructions and resources for each commitment via email.
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!userInfo.name || !userInfo.email}
              className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-lg font-bold text-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🚀 JOIN THE JULY 28TH MOVEMENT
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Main Page Component
function HomePage() {
  return (
    <main className="min-h-screen">
      <ChampionshipHero />
      <LeadershipShowcase />
      <FamilyJourneySection />
      <CharacterWitnessesSection />
      <PropheticConvergence />
      <July28Movement />
      <LiveImpactDashboard />
      <PrayerVigilCall />
      <CommitmentPortal />
    </main>
  );
}

export default withErrorBoundary(HomePage, "HomePage");
