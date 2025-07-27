"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Twitter,
  Copy,
  Check,
  Hash,
  Users,
  TrendingUp,
  Calendar,
  Trophy,
  Heart,
  Shield,
  Zap,
  Clock,
  ArrowRight,
  Star,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { withErrorBoundary } from "@/components/ui/error-boundary";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Pre-written tweets for Tony Dungy
const tweets = [
  {
    week: 1,
    day: "Monday",
    content:
      "I'm putting my reputation on the line for JAHmere Webb. Not because he's perfect, but because I believe in redemption. Judge Ferrero has a choice: 73% failure or 73% success. #BridgeNotBars",
    category: "Personal Investment",
    impact: "HIGH",
    reach: "700K+",
  },
  {
    week: 1,
    day: "Wednesday",
    content:
      "My son Jordan wrote: 'JAHmere represents every young person who deserves a second chance.' Read his powerful testimony: [link] #BridgeNotBars #SecondChances",
    category: "Family Support",
    impact: "CRITICAL",
    reach: "500K+",
  },
  {
    week: 1,
    day: "Friday",
    content:
      "Prison costs taxpayers $35,000/year with a 73% failure rate. The Bridge Project costs $0 to taxpayers with proven success. This isn't about avoiding punishment—it's about smart justice. #BridgeNotBars",
    category: "Data-Driven",
    impact: "HIGH",
    reach: "400K+",
  },
  {
    week: 2,
    day: "Monday",
    content:
      "1,247 people have written to support JAHmere. Community leaders, business owners, educators—all ready to invest. Will you add your voice? [link] #BridgeNotBars #CommunitySupport",
    category: "Community Momentum",
    impact: "MEDIUM",
    reach: "600K+",
  },
  {
    week: 2,
    day: "Wednesday",
    content:
      "JAHmere has already served 400+ days. He's completed programs, shown remorse, and has 47 mentors waiting. Judge Ferrero, the infrastructure for success is ready. #BridgeNotBars",
    category: "Accountability",
    impact: "HIGH",
    reach: "450K+",
  },
  {
    week: 2,
    day: "Friday",
    content:
      "In my NFL career, I learned that championship teams invest in potential. JAHmere has that potential. The question is: will our justice system invest in rehabilitation or repeat failure? #BridgeNotBars",
    category: "Leadership",
    impact: "CRITICAL",
    reach: "800K+",
  },
  {
    week: 3,
    day: "Monday",
    content:
      "Judge Ferrero, I'm personally asking you to consider The Bridge Project. I'll be accountable. My family will be involved. This young man deserves a chance to prove himself. #BridgeNotBars",
    category: "Direct Appeal",
    impact: "MAXIMUM",
    reach: "1M+",
  },
  {
    week: 3,
    day: "Wednesday",
    content:
      "Final push: If you believe in second chances, share JAHmere's story. If you believe in smart justice, write to Judge Ferrero. Time is running out. #BridgeNotBars [link]",
    category: "Call to Action",
    impact: "CRITICAL",
    reach: "750K+",
  },
  {
    week: 3,
    day: "Friday",
    content:
      "Whatever Judge Ferrero decides, we'll respect it. But I pray he sees what I see: a young man ready to transform his life and help others do the same. #BridgeNotBars #TransformationIsPossible",
    category: "Final Message",
    impact: "HIGH",
    reach: "900K+",
  },
];

// Enhanced hashtag strategy with psychological impact
const hashtags = [
  {
    tag: "#BridgeNotBars",
    description: "Primary campaign hashtag",
    usage: "Use in every tweet",
    impact: "Maximum visibility",
    color: "orange-600",
  },
  {
    tag: "#SecondChances",
    description: "Redemption focus",
    usage: "Use for personal stories",
    impact: "Emotional connection",
    color: "purple-600",
  },
  {
    tag: "#SmartJustice",
    description: "Data and cost focus",
    usage: "Use with statistics",
    impact: "Logical appeal",
    color: "green-600",
  },
  {
    tag: "#CommunitySupport",
    description: "Show coalition strength",
    usage: "Use for supporter content",
    impact: "Social proof",
    color: "blue-600",
  },
  {
    tag: "#TransformationIsPossible",
    description: "Hope and change",
    usage: "Use for inspirational content",
    impact: "Inspirational power",
    color: "orange-600",
  },
];

// Enhanced visual assets with specific purposes
const visualAssets = [
  {
    type: "Coach Dungy Profile Banner",
    size: "1500x500px",
    description: "Championship legacy meets redemption mission",
    priority: "CRITICAL",
    impact: "Maximum credibility",
  },
  {
    type: "Tweet Impact Cards",
    size: "1200x675px",
    description: "Key statistics with championship branding",
    priority: "HIGH",
    impact: "2x engagement",
  },
  {
    type: "Jordan's Video Thumbnail",
    size: "1280x720px",
    description: "Son's testimony with family authenticity",
    priority: "CRITICAL",
    impact: "Emotional breakthrough",
  },
  {
    type: "Championship Timeline Graphics",
    size: "1080x1920px",
    description: "NFL success parallels transformation success",
    priority: "HIGH",
    impact: "Authority building",
  },
];

// Campaign metrics for urgency
const campaignMetrics = {
  timeRemaining: "13 days",
  targetReach: "5M",
  currentReach: "2.1M",
  engagementRate: "8.4%",
  supporterGoal: 5000,
  currentSupporters: 1247,
};

function TwitterCampaign() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const generateTweetLink = (text: string) => {
    const baseUrl = "https://twitter.com/intent/tweet";
    const params = new URLSearchParams({
      text: text.replace("[link]", "https://bridgeproject.org"),
      hashtags: "BridgeNotBars",
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "MAXIMUM":
        return "text-red-600";
      case "CRITICAL":
        return "text-orange-600";
      case "HIGH":
        return "text-purple-600";
      default:
        return "text-green-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-800 to-purple-600 py-20">
        <div className="absolute inset-0 bg-black/20" />

        <Container className="relative z-10">
          <div className="text-center mb-12">
            {/* Championship Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 border border-white/30 rounded-full backdrop-blur-sm">
                <Trophy className="w-6 h-6 text-orange-400" />
                <span className="text-white font-bold text-lg tracking-wide">
                  CHAMPIONSHIP LEGACY CAMPAIGN
                </span>
                <Star className="w-5 h-5 text-orange-400 animate-pulse" />
              </div>
            </motion.div>

            {/* Hero Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="text-orange-400">
                  Coach Dungy's
                </span>
                <br />
                <span className="text-white">Legacy Moment</span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 font-medium max-w-3xl mx-auto leading-relaxed">
                Your voice reaches{" "}
                <span className="text-orange-400 font-bold">
                  700,000+ followers
                </span>
                . One tweet could change JAHmere's life forever.
              </p>
            </motion.div>

            {/* Urgency Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8"
            >
              <div className="people-page-card p-4 text-center bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="text-2xl font-bold text-red-400 mb-1">
                  {campaignMetrics.timeRemaining}
                </div>
                <div className="text-sm text-white/80 font-medium">
                  Until Decision
                </div>
              </div>
              <div className="people-page-card p-4 text-center bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="text-2xl font-bold text-orange-400 mb-1">
                  {campaignMetrics.currentReach}
                </div>
                <div className="text-sm text-white/80 font-medium">
                  Current Reach
                </div>
              </div>
              <div className="people-page-card p-4 text-center bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="text-2xl font-bold text-green-400 mb-1">
                  {campaignMetrics.engagementRate}
                </div>
                <div className="text-sm text-white/80 font-medium">
                  Engagement Rate
                </div>
              </div>
              <div className="people-page-card p-4 text-center bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="text-2xl font-bold text-purple-400 mb-1">
                  {campaignMetrics.currentSupporters}
                </div>
                <div className="text-sm text-white/80 font-medium">
                  Supporters
                </div>
              </div>
            </motion.div>

            {/* Primary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/people/jordan-dungy">
                <Button
                  size="lg"
                  className="people-cta-btn bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg font-bold min-w-[280px]"
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Read Jordan's Letter First
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="people-cta-btn border-2 border-white text-white hover:bg-white hover:text-purple-800 px-8 py-4 text-lg min-w-[280px]"
                >
                  <Shield className="mr-2 h-5 w-5" />
                  Write to Judge Ferrero
                </Button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      <Container className="py-16">
        {/* Championship Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-4">
              3-Week Championship Campaign
            </h2>
            <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
              Strategic phases designed for maximum impact, just like winning
              championships
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                week: 1,
                title: "Personal Investment",
                description:
                  "Share your personal commitment and family support",
                icon: Heart,
                color: "orange",
              },
              {
                week: 2,
                title: "Community Momentum",
                description:
                  "Highlight growing coalition and supporter strength",
                icon: Users,
                color: "purple",
              },
              {
                week: 3,
                title: "Championship Push",
                description: "Direct appeals with championship urgency",
                icon: Trophy,
                color: "red",
              },
            ].map((phase, index) => (
              <motion.div
                key={phase.week}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="path-card p-8 text-center bg-white shadow-lg rounded-lg border-2 border-gray-200"
                style={{ '--index': index } as React.CSSProperties}
              >
                <div
                  className={`w-16 h-16 mx-auto mb-6 rounded-full bg-${phase.color}-600 flex items-center justify-center`}
                >
                  <phase.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-purple-800 mb-3">
                  Week {phase.week}: {phase.title}
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  {phase.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pre-written Tweets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-4">
              Championship Tweet Playbook
            </h2>
            <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
              Each tweet crafted for maximum impact, just like championship
              plays
            </p>
          </div>

          <div className="space-y-6">
            {tweets.map((tweet, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
                className="letter-form-card p-6 bg-white shadow-lg rounded-lg border border-gray-200"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Tweet Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 border border-purple-200 rounded-full text-sm font-medium text-purple-700">
                        <Calendar className="w-4 h-4" />
                        Week {tweet.week} - {tweet.day}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 font-medium">
                        {tweet.category}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold ${getImpactColor(tweet.impact)} bg-current/10`}
                      >
                        {tweet.impact} IMPACT
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        {tweet.reach} reach
                      </span>
                    </div>

                    <p className="text-gray-800 text-lg leading-relaxed mb-4">
                      {tweet.content}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:min-w-[200px]">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(tweet.content, index)}
                      className="letter-form-submit-btn flex items-center gap-2 justify-center border-purple-600 text-purple-600 hover:bg-purple-50"
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Tweet
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      className="letter-form-submit-btn bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-2 justify-center"
                      onClick={() =>
                        window.open(generateTweetLink(tweet.content), "_blank")
                      }
                    >
                      <Twitter className="w-4 h-4" />
                      Tweet Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Hashtag Strategy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-4 flex items-center justify-center gap-3">
              <Hash className="w-8 h-8 text-orange-600" />
              Hashtag Strategy
            </h2>
            <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
              Strategic hashtags designed for maximum reach and emotional impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hashtags.map((hashtag, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="letter-form-tip p-6 text-center bg-white shadow-lg rounded-lg border-l-4 border-orange-500"
              >
                <h3 className={`font-bold text-xl mb-2 text-${hashtag.color}`}>
                  {hashtag.tag}
                </h3>
                <p className="text-gray-600 font-medium mb-3 text-sm">
                  {hashtag.description}
                </p>
                <div className="space-y-2 text-xs">
                  <div className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 font-medium">
                    {hashtag.usage}
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full font-semibold text-${hashtag.color} bg-current/10`}
                  >
                    {hashtag.impact}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Visual Assets Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-4">
              Championship Visual Assets
            </h2>
            <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
              Professional graphics that command attention and build authority
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {visualAssets.map((asset, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="people-page-card p-6 bg-white shadow-lg rounded-lg border border-gray-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-bold text-lg text-purple-800">
                    {asset.type}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      asset.priority === "CRITICAL"
                        ? "text-red-600 bg-red-100"
                        : "text-purple-600 bg-purple-100"
                    }`}
                  >
                    {asset.priority}
                  </span>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">
                      Size:
                    </span>
                    <span className="font-bold text-gray-800">
                      {asset.size}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">
                      Impact:
                    </span>
                    <span className="font-bold text-green-600">
                      {asset.impact}
                    </span>
                  </div>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    {asset.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Championship Engagement Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <div className="letter-form-card p-8 bg-gradient-to-r from-green-50 to-purple-50 border-2 border-green-200 rounded-lg">
            <div className="flex items-center gap-4 mb-8 justify-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-purple-600 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-purple-800">
                Championship Engagement Strategy
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-purple-800 mb-4">
                  Timing & Frequency
                </h3>
                {[
                  "Post during peak hours: 9-10 AM and 7-9 PM EST",
                  "Space tweets 2-3 hours apart for maximum reach",
                  "Pin championship tweets for 24-48 hours",
                  "Use Twitter Spaces for live engagement",
                ].map((tip, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">
                      {tip}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-purple-800 mb-4">
                  Amplification Tactics
                </h3>
                {[
                  "Include championship imagery for 2x engagement",
                  "Tag @JudgeFerrero respectfully in key tweets",
                  "Encourage retweets: 'RT if you believe in second chances'",
                  "Reply to comments within 30 minutes for algorithm boost",
                ].map((tip, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">
                      {tip}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 p-6 bg-orange-50 border-2 border-orange-200 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Trophy className="w-6 h-6 text-orange-600" />
                <h4 className="text-lg font-bold text-orange-800">
                  Championship Secret Weapon
                </h4>
              </div>
              <p className="text-gray-700 font-medium leading-relaxed">
                <strong>Personal Story + Data + Call to Action</strong> - This
                combination mirrors your championship coaching approach:
                emotional connection, proven results, and clear next steps.
                Every tweet should follow this winning formula.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Final Championship CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="letter-form-card p-12 bg-gradient-to-r from-purple-50 to-orange-50 border-2 border-purple-200 rounded-lg">
            <Trophy className="w-16 h-16 mx-auto mb-6 text-orange-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6">
              Your Championship Moment Awaits
            </h2>
            <p className="text-xl text-gray-600 font-medium mb-8 max-w-2xl mx-auto leading-relaxed">
              Coach, you've won championships by believing in potential when
              others saw problems. JAHmere is your next championship moment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/people/jordan-dungy">
                <Button
                  size="lg"
                  className="people-cta-btn bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg font-bold min-w-[300px]"
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Start with Jordan's Letter
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="mt-6 text-sm text-gray-600 font-medium">
              <p>
                Ready to tweet? Use the playbook above.
                <Link
                  href="/contact"
                  className="text-orange-600 hover:underline ml-1 font-bold"
                >
                  Write to Judge Ferrero first →
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}

export default withErrorBoundary(TwitterCampaign, "TwitterCampaign", (
    <div className="p-8 text-center">
      Unable to load Twitter campaign content
    </div>
  ));
