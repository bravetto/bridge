"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Heart,
  MapPin,
  Calendar,
  BarChart3,
  Activity,
  Target,
  Clock,
  ArrowUp,
  Mail,
  Share2,
  UserPlus,
  Zap,
  Award,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { withErrorBoundary } from "@/components/ui/error-boundary";
import CoalitionMap from "@/components/coalition-map";

// Enhanced mock data with more realistic metrics
const IMPACT_DATA = {
  totalSupporters: 1247,
  goal: 5000,
  lettersWritten: 843,
  sharesCount: 2341,
  averageEngagementTime: "4:32",
  topStates: [
    { state: "Florida", count: 234, percentage: 18.8 },
    { state: "Texas", count: 187, percentage: 15.0 },
    { state: "California", count: 156, percentage: 12.5 },
    { state: "New York", count: 134, percentage: 10.7 },
    { state: "Georgia", count: 98, percentage: 7.9 },
  ],
  recentActivity: [
    {
      type: "letter",
      name: "Sarah M.",
      location: "Miami, FL",
      time: "2 minutes ago",
      action: "wrote a letter to Judge Ferrero"
    },
    {
      type: "share",
      name: "Michael R.",
      location: "Houston, TX",
      time: "5 minutes ago",
      action: "shared JAHmere's story"
    },
    {
      type: "letter",
      name: "Jennifer K.",
      location: "Atlanta, GA",
      time: "12 minutes ago",
      action: "submitted character reference"
    },
    {
      type: "support",
      name: "David L.",
      location: "Orlando, FL",
      time: "18 minutes ago",
      action: "joined the prayer vigil"
    },
  ],
  weeklyGrowth: [
    { day: "Mon", count: 45 },
    { day: "Tue", count: 62 },
    { day: "Wed", count: 58 },
    { day: "Thu", count: 71 },
    { day: "Fri", count: 89 },
    { day: "Sat", count: 103 },
    { day: "Sun", count: 124 },
  ],
};

function ImpactDashboard() {
  const [currentSupporter, setCurrentSupporter] = useState(
    IMPACT_DATA.totalSupporters,
  );
  const [isLive, setIsLive] = useState(true);
  const percentage = (currentSupporter / IMPACT_DATA.goal) * 100;

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setCurrentSupporter((prev) => prev + 1);
        setIsLive(true);
        setTimeout(() => setIsLive(false), 2000);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "letter":
        return <Mail className="w-4 h-4" />;
      case "share":
        return <Share2 className="w-4 h-4" />;
      case "support":
        return <UserPlus className="w-4 h-4" />;
      default:
        return <Heart className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "letter":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "share":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "support":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-800 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-red-400 animate-pulse' : 'bg-green-400'}`} />
              <span className="text-white/90 text-sm font-medium">
                {isLive ? 'LIVE UPDATES' : 'REAL-TIME DASHBOARD'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Impact Dashboard
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Real-time view of community support for JAHmere's freedom
            </p>

            {/* Quick Stats Preview */}
            <div className="flex flex-wrap justify-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">
                  {currentSupporter.toLocaleString()}
                </div>
                <div className="text-white/80 text-sm">Total Supporters</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">
                  {percentage.toFixed(1)}%
                </div>
                <div className="text-white/80 text-sm">Goal Progress</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">13d 23h</div>
                <div className="text-white/80 text-sm">Until Decision</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Metrics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Total Supporters Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="people-page-card p-6 text-center bg-white shadow-lg border-l-4 border-purple-500">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-purple-800 mb-2">
                  {currentSupporter.toLocaleString()}
                  {isLive && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-block ml-2"
                    >
                      <ArrowUp className="w-4 h-4 text-green-500" />
                    </motion.span>
                  )}
                </div>
                <div className="text-gray-600 font-medium">Total Supporters</div>
                <div className="text-xs text-green-600 mt-1">+12 today</div>
              </Card>
            </motion.div>

            {/* Letters Written Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="people-page-card p-6 text-center bg-white shadow-lg border-l-4 border-orange-500">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-orange-100 rounded-full">
                    <Mail className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-orange-800 mb-2">
                  {IMPACT_DATA.lettersWritten}
                </div>
                <div className="text-gray-600 font-medium">Letters to Judge</div>
                <div className="text-xs text-green-600 mt-1">+8 today</div>
              </Card>
            </motion.div>

            {/* Social Shares Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="people-page-card p-6 text-center bg-white shadow-lg border-l-4 border-green-500">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Share2 className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-green-800 mb-2">
                  {IMPACT_DATA.sharesCount.toLocaleString()}
                </div>
                <div className="text-gray-600 font-medium">Story Shares</div>
                <div className="text-xs text-green-600 mt-1">+24 today</div>
              </Card>
            </motion.div>

            {/* Engagement Time Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="people-page-card p-6 text-center bg-white shadow-lg border-l-4 border-blue-500">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-blue-800 mb-2">
                  {IMPACT_DATA.averageEngagementTime}
                </div>
                <div className="text-gray-600 font-medium">Avg. Time on Site</div>
                <div className="text-xs text-green-600 mt-1">+15% this week</div>
              </Card>
            </motion.div>
          </div>

          {/* Progress to Goal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <Card className="letter-form-card p-8 bg-gradient-to-r from-purple-50 to-orange-50 border-2 border-purple-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-purple-800 mb-2">Progress to Goal</h2>
                  <p className="text-gray-600">Building momentum for JAHmere's freedom</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-purple-700">Current: {currentSupporter.toLocaleString()}</span>
                  <span className="text-orange-700">Goal: {IMPACT_DATA.goal.toLocaleString()}</span>
                </div>
                <div className="relative">
                  <Progress value={percentage} className="h-4 bg-gray-200" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full opacity-80" 
                       style={{ width: `${percentage}%` }} />
                </div>
                <div className="text-center">
                  <span className="text-4xl font-bold text-purple-800">
                    {percentage.toFixed(1)}%
                  </span>
                  <span className="text-gray-600 ml-2 text-lg">of goal reached</span>
                </div>
                <div className="text-center text-sm text-gray-600">
                  {(IMPACT_DATA.goal - currentSupporter).toLocaleString()} more supporters needed
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Geographic Distribution and Weekly Growth */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="letter-form-card p-6 bg-white shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-purple-800">Top Supporting States</h3>
                  <div className="p-2 bg-purple-100 rounded-full">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div className="space-y-4">
                  {IMPACT_DATA.topStates.map((state, index) => (
                    <div key={state.state} className="flex items-center gap-4">
                      <div className="w-8 h-8 flex items-center justify-center bg-orange-100 text-orange-700 rounded-full text-sm font-bold">
                        #{index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <span className="font-semibold text-gray-800">{state.state}</span>
                          <span className="text-sm text-gray-600 font-medium">
                            {state.count} supporters
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-orange-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${state.percentage}%` }}
                          />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{state.percentage}% of total</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Weekly Growth Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="letter-form-card p-6 bg-white shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-purple-800">Weekly Growth</h3>
                  <div className="p-2 bg-purple-100 rounded-full">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div className="flex items-end justify-between h-48 gap-2">
                  {IMPACT_DATA.weeklyGrowth.map((day, index) => (
                    <motion.div
                      key={day.day}
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex-1 flex flex-col items-center gap-2"
                    >
                      <div className="text-xs font-semibold text-purple-700">{day.count}</div>
                      <div
                        className="w-full bg-gradient-to-t from-purple-600 to-orange-500 rounded-t-lg transition-all duration-500"
                        style={{
                          height: `${(day.count / Math.max(...IMPACT_DATA.weeklyGrowth.map((d) => d.count))) * 100}%`,
                          minHeight: "20px",
                        }}
                      />
                      <div className="text-xs text-gray-600 font-medium">{day.day}</div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 text-center text-sm text-green-600 font-medium">
                  <TrendingUp className="w-4 h-4 inline mr-1" />
                  +18% growth this week
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Recent Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="letter-form-card p-6 bg-white shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-purple-800">Live Activity Feed</h3>
                  <p className="text-gray-600 text-sm">Real-time community actions</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm text-green-600 font-medium">Live</span>
                </div>
              </div>
              <div className="space-y-4">
                {IMPACT_DATA.recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="letter-form-tip flex items-center gap-4 p-4 rounded-lg border-2 border-gray-100 hover:border-purple-200 transition-colors"
                  >
                    <div className={`p-2 rounded-full border ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">{activity.name}</div>
                      <div className="text-sm text-gray-600">{activity.action}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                        <MapPin className="w-3 h-3" />
                        {activity.location}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 text-right">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {activity.time}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Coalition Support Section */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-orange-600 mr-3" />
              <h2 className="text-3xl font-bold text-purple-800">Coalition of Support</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Organizations across Florida and beyond are standing with JAHmere,
              demonstrating the infrastructure ready to support his transformation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mb-8"
          >
            <CoalitionMap showJoinButton={true} />
          </motion.div>

          {/* Coalition Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="people-page-card p-6 text-center bg-white shadow-lg">
              <div className="text-3xl font-bold text-purple-800 mb-2">6</div>
              <div className="text-gray-600">Partner Organizations</div>
            </Card>
            <Card className="people-page-card p-6 text-center bg-white shadow-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">55,250</div>
              <div className="text-gray-600">Combined Reach</div>
            </Card>
            <Card className="people-page-card p-6 text-center bg-white shadow-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">5</div>
              <div className="text-gray-600">States Represented</div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-800 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Join These Supporters
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Every voice matters. Add your support to help Judge Ferrero see the
              community backing JAHmere's transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/letter-form-test">
                <Button
                  size="lg"
                  className="vigil-cta-btn bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg font-semibold min-w-[200px]"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Write Your Letter
                </Button>
              </Link>
              <Link href="/july-28-strategy">
                <Button
                  size="lg"
                  variant="outline"
                  className="people-cta-btn border-2 border-white text-white hover:bg-white hover:text-purple-800 px-8 py-4 text-lg font-semibold min-w-[200px]"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Join Prayer Vigil
                </Button>
              </Link>
            </div>
            <div className="mt-6 text-white/70 text-sm">
              <Clock className="w-4 h-4 inline mr-1" />
              Decision in 13 days, 23 hours
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default withErrorBoundary(ImpactDashboard, "ImpactDashboard");
