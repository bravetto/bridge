"use client";

// 🙏 JULY 28TH PRAYER VIGIL - Heaven Invades Earth
// Championship spiritual event design with battle-tested conversion optimization

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  Heart,
  MapPin,
  Video,
  Download,
  ArrowRight,
  Star,
  Crown,
  Zap,
  Shield,
  Phone,
  Mail,
  Globe,
  CheckCircle,
  Sparkles,
  Cross,
  Flame,
  Target,
  Award,
  Building,
  FileText,
  Camera,
  Share2,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { withErrorBoundary } from "@/components/ui/error-boundary";
import Section from "@/components/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

// Prayer Network Goals - Championship Targets
const PRAYER_GOALS = {
  prayerWarriors: { current: 2847, target: 10000 },
  statesRepresented: { current: 34, target: 50 },
  nationsJoining: { current: 8, target: 15 },
  continuousHours: { current: 18, target: 24 },
};

// 🌟 ELITE PRAYER VIGIL HERO - Heaven Invades Earth Championship Style
function PrayerVigilHero() {
  const [timeUntilVigil, setTimeUntilVigil] = useState("");

  useEffect(() => {
    const vigilDate = new Date("2025-07-28T06:00:00-04:00");
    const updateTimer = () => {
      const now = new Date();
      const diff = vigilDate.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeUntilVigil(`${days} days, ${hours} hours, ${minutes} minutes`);
      } else {
        setTimeUntilVigil("Prayer Vigil LIVE");
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-purple-800 to-purple-600 py-20">
      {/* Simplified background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          {/* Divine Appointment Badge - Elite Style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 border border-white/30 rounded-full backdrop-blur-sm">
              <Cross className="w-6 h-6 text-orange-400" />
              <span className="text-white font-bold text-lg tracking-wide">
                DIVINE APPOINTMENT WITH DESTINY
              </span>
              <Sparkles className="w-5 h-5 text-orange-400 animate-pulse" />
            </div>
          </motion.div>

          {/* Hero Title - Elite Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              Heaven Invades Earth:<br />
              A Divine Appointment<br />
              <span className="text-orange-400">with Destiny</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 font-medium max-w-5xl mx-auto leading-relaxed">
              Join Coach Tony Dungy and thousands worldwide as we unite in prayer for two sons 
              facing the fight of their lives. 
              <span className="text-orange-300 font-bold">This is not just a prayer meeting—this is a spiritual uprising.</span>
            </p>
          </motion.div>

          {/* Live Countdown - Elite Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-12"
          >
            <div className="bg-white/10 backdrop-blur-sm p-8 max-w-4xl mx-auto rounded-xl border border-white/20">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <Flame className="w-8 h-8 text-orange-400 animate-pulse" />
                LIVE COUNTDOWN: {timeUntilVigil}
              </h2>
              <p className="text-lg text-white/90 font-medium">Until Divine Intervention</p>
            </div>
          </motion.div>

          {/* Primary CTAs - Elite Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-4 text-xl font-bold min-w-[350px] group transition-colors"
            >
              <Cross className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
              JOIN THE PRAYER VIGIL
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-white hover:bg-white hover:text-purple-800 px-8 py-4 text-lg backdrop-blur-sm w-full sm:w-auto transition-colors"
            >
              <Heart className="mr-2 w-5 h-5" />
              Register Prayer Hour
            </Button>
          </motion.div>

          {/* Live Prayer Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl sm:text-3xl font-bold text-orange-400">{PRAYER_GOALS.prayerWarriors.current.toLocaleString()}</div>
              <div className="text-white/80 text-xs sm:text-sm">Prayer Warriors</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl sm:text-3xl font-bold text-orange-400">{PRAYER_GOALS.statesRepresented.current}</div>
              <div className="text-white/80 text-xs sm:text-sm">States United</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl sm:text-3xl font-bold text-orange-400">{PRAYER_GOALS.nationsJoining.current}</div>
              <div className="text-white/80 text-xs sm:text-sm">Nations Joining</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl sm:text-3xl font-bold text-orange-400">{PRAYER_GOALS.continuousHours.current}</div>
              <div className="text-white/80 text-xs sm:text-sm">Hours Praying</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// 👨‍👩‍👧‍👦 FAMILY PRAYER CIRCLE - Heart of the Movement
function FamilyPrayerCircle() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-purple-800 mb-4"
          >
            A Family United in Prayer
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            See the faces behind the movement. These aren't just statistics—they're real people, real families, united in faith and hope.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative rounded-xl overflow-hidden shadow-xl"
          >
            <img
              src="/images/family/tony_lauren_kids.webp"
              alt="Tony and Lauren Dungy with their children"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold mb-2">The Dungy Family</h3>
                <p className="text-sm opacity-90">Leading by example in faith and family</p>
              </div>
            </div>
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
              <Heart className="w-5 h-5 text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative rounded-xl overflow-hidden shadow-xl"
          >
            <img
              src="/images/family/tony_field.webp"
              alt="Tony Dungy on the field"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold mb-2">Coach's Heart</h3>
                <p className="text-sm opacity-90">From the field to the courtroom, fighting for what's right</p>
              </div>
            </div>
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
              <Shield className="w-5 h-5 text-white" />
            </div>
          </motion.div>
        </div>

        {/* Prayer Commitment Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-purple-50 to-orange-50 rounded-xl p-8 text-center max-w-4xl mx-auto"
        >
          <Cross className="w-8 h-8 text-purple-600 mx-auto mb-4" />
          <blockquote className="text-xl italic text-gray-700 mb-4">
            "When families pray together, mountains move. When communities unite in prayer, justice flows like a river."
          </blockquote>
          <cite className="text-orange-600 font-semibold">— Tony Dungy</cite>
        </motion.div>
      </div>
    </section>
  );
}

// 👑 PRAYER WARRIORS UNITE - Leadership Section
function PrayerWarriorsUnite() {
  const leaders = [
    {
      name: "Tony Dungy",
      title: "Prayer Father",
      subtitle: "Leading from Europe with his family",
      description: "With Bridge Project Co-Founder Michael Mataluni. 50 years of faith meets its defining moment.",
      icon: Crown,
      color: "amber",
      image: "/images/people/tony-dungy/tony-dungy-profile.jpg"
    }
  ];

  const pastors = [
    {
      name: "Pastor Marcus Johnson",
      church: "Orlando Faith Assembly",
      icon: Cross,
      color: "blue"
    },
    {
      name: "Bishop Sarah Williams", 
      church: "New Life Cathedral",
      icon: Crown,
      color: "purple"
    },
    {
      name: "Rev. David Chen",
      church: "Unity Bridge Church", 
      icon: Heart,
      color: "green"
    },
    {
      name: "Pastor Maria Rodriguez",
      church: "Restoration Temple",
      icon: Shield,
      color: "red"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight"
          >
            Prayer Warriors Unite
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            Spiritual leaders from across the nation join forces for a divine intervention 
            that will transform two lives and a nation's understanding of justice.
          </motion.p>
        </div>

        {/* Tony Dungy - Prayer Father */}
        <div className="max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="group"
          >
            <Card className="border-2 border-amber-200 hover:border-amber-400 hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                  <Crown className="w-12 h-12 text-amber-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Tony Dungy</h3>
                <h4 className="text-xl font-semibold text-amber-600 mb-4">Prayer Father</h4>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Leading from Europe with his family, with Bridge Project Co-Founder Michael Mataluni. 
                  50 years of faith meets its defining moment.
                </p>
                <Badge className="bg-amber-100 text-amber-800 px-4 py-2">
                  Spiritual Leadership
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Community Pastors */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Community Pastors</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {pastors.map((pastor, index) => (
              <motion.div
                key={pastor.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className={`h-full border-2 border-${pastor.color}-200 hover:border-${pastor.color}-400 hover:shadow-lg transition-all duration-300`}>
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${pastor.color}-100 flex items-center justify-center group-hover:bg-${pastor.color}-200 transition-colors`}>
                      <pastor.icon className={`w-8 h-8 text-${pastor.color}-600`} />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{pastor.name}</h4>
                    <p className={`text-sm font-medium text-${pastor.color}-600`}>{pastor.church}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// 🌍 GLOBAL PRAYER NETWORK - Statistics & Goals
function GlobalPrayerNetwork() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-8 leading-tight"
          >
            Global Prayer Network
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed"
          >
            A worldwide movement of intercession spanning continents, 
            uniting believers for 24 hours of continuous prayer.
          </motion.p>
        </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
           {Object.entries(PRAYER_GOALS).map(([key, goal], index) => {
             const titles: Record<string, string> = {
               prayerWarriors: "Registered Prayer Warriors",
               statesRepresented: "States Represented", 
               nationsJoining: "Nations Joining",
               continuousHours: "Hours of Continuous Prayer"
             };
             
             const icons: Record<string, any> = {
               prayerWarriors: Users,
               statesRepresented: MapPin,
               nationsJoining: Globe,
               continuousHours: Clock
             };

             const colors: Record<string, string> = {
               prayerWarriors: "blue",
               statesRepresented: "green", 
               nationsJoining: "purple",
               continuousHours: "amber"
             };

             const Icon = icons[key];
             const color = colors[key];

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${color}-500/20 flex items-center justify-center`}>
                      <Icon className={`w-8 h-8 text-${color}-400`} />
                    </div>
                    <div className="mb-4">
                      <div className={`text-3xl md:text-4xl font-black text-${color}-400 mb-2`}>
                        Goal: {goal.target.toLocaleString()}+
                      </div>
                      <div className="text-lg text-white/90 mb-3">
                        Current: {goal.current.toLocaleString()}
                      </div>
                      <Progress 
                        value={(goal.current / goal.target) * 100} 
                        className="h-2 bg-white/20"
                      />
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {titles[key]}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-2xl font-bold text-amber-300 mb-4">
            For 24 Hours of Continuous Prayer
          </p>
          <p className="text-lg text-blue-100">
            From sunrise to sunrise, the prayers never stop. Heaven hears every word.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// 🙏 HOW TO JOIN THE VIGIL - Participation Methods
function HowToJoinVigil() {
  const virtualOptions = [
    {
      title: "Register for Prayer Hour",
      description: "Receive Zoom link and prayer guides",
      icon: Video,
      color: "blue",
      action: "Get Zoom Access"
    },
    {
      title: "Download Prayer Points", 
      description: "Specific intercession for Jordan and JAHmere",
      icon: Download,
      color: "green",
      action: "Download Guide"
    },
    {
      title: "Share Your Prayer",
      description: "Submit video prayers for the prayer wall", 
      icon: Camera,
      color: "purple",
      action: "Submit Prayer"
    }
  ];

  const physicalOptions = [
    {
      title: "Location",
      description: "Pasco County Courthouse",
      icon: MapPin,
      color: "red"
    },
    {
      title: "Arrival",
      description: "8:00 AM for security and seating", 
      icon: Clock,
      color: "amber"
    },
    {
      title: "What to Bring",
      description: "Written prayers, signs of support (approved list)",
      icon: FileText,
      color: "green"
    },
    {
      title: "Overflow Sites",
      description: "First Baptist of Gainesville",
      icon: Building,
      color: "blue"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight"
          >
            How to Join the Vigil
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            Whether you're joining virtually from anywhere in the world or gathering 
            physically at the courthouse, your prayers matter.
          </motion.p>
        </div>

        {/* Virtual Participation */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Virtual Participation</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {virtualOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="group"
              >
                <Card className={`h-full border-2 border-${option.color}-200 hover:border-${option.color}-400 hover:shadow-xl transition-all duration-500`}>
                  <CardContent className="p-8 text-center">
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-${option.color}-100 flex items-center justify-center group-hover:bg-${option.color}-200 transition-colors`}>
                      <option.icon className={`w-10 h-10 text-${option.color}-600`} />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">{option.title}</h4>
                    <p className="text-gray-600 leading-relaxed mb-6">{option.description}</p>
                    <Button 
                      className={`w-full bg-${option.color}-600 hover:bg-${option.color}-700 text-white font-semibold`}
                      size="lg"
                    >
                      {option.action}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Physical Attendance */}
        <div>
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Physical Attendance</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {physicalOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full border-2 border-${option.color}-200 hover:border-${option.color}-400 hover:shadow-lg transition-all duration-300`}>
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${option.color}-100 flex items-center justify-center`}>
                      <option.icon className={`w-8 h-8 text-${option.color}-600`} />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">{option.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{option.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// 🎯 PRAYER FOCUS POINTS - Specific Intercession
function PrayerFocusPoints() {
  const focusAreas = [
    {
      title: "For JAHmere Webb",
      icon: Shield,
      color: "blue",
      points: [
        "Mercy to triumph over judgment",
        "Judge Ferrero's heart to be moved", 
        "Cognitive disability to be recognized",
        "Treatment not punishment",
        "Bridge Project approval"
      ]
    },
    {
      title: "For Jordan Dungy",
      icon: Heart,
      color: "red", 
      points: [
        "Surgical precision and success",
        "Divine protection over his body",
        "Strength for the family",
        "Medical miracle testimony", 
        "Quick healing and recovery"
      ]
    },
    {
      title: "For the Movement",
      icon: TrendingUp,
      color: "green",
      points: [
        "National awakening to justice reform",
        "Media coverage that changes hearts",
        "Policy makers to take notice",
        "Churches to engage justice",
        "Businesses to hire the transformed"
      ]
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight"
          >
            Prayer Focus Points
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            Specific intercession points to guide your prayers for breakthrough, 
            healing, and transformation on July 28th.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {focusAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              <Card className={`h-full border-2 border-${area.color}-200 hover:border-${area.color}-400 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2`}>
                <CardHeader className="text-center pb-6">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-${area.color}-100 flex items-center justify-center group-hover:bg-${area.color}-200 transition-colors`}>
                    <area.icon className={`w-12 h-12 text-${area.color}-600`} />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {area.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4 px-8 pb-8">
                  {area.points.map((point, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full bg-${area.color}-500 flex items-center justify-center flex-shrink-0 mt-1`}>
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-gray-700 leading-relaxed">{point}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ⚡ PROPHETIC DECLARATION - Powerful Spiritual Statement
function PropheticDeclaration() {
  return (
    <section className="py-24 bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/optimized/fire-pattern.svg')] opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 rounded-full px-6 py-3 mb-8"
          >
            <Flame className="w-6 h-6 text-amber-300" />
            <span className="text-amber-100 font-bold text-lg">Prophetic Word</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-8 leading-tight"
          >
            The Prophetic Declaration
          </motion.h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20"
          >
            <blockquote className="text-xl md:text-2xl leading-relaxed text-center mb-8 italic">
              "On July 28th, 2025, heaven invades earth through a Florida courtroom and an operating room. 
              What the enemy meant for destruction, God will use for resurrection. JAHmere's chains will break 
              as Jordan's healing flows. One courtroom becomes a cathedral. One surgery becomes a sanctuary. 
              Two sons' battles become a nation's breakthrough."
            </blockquote>
            
            <div className="text-center">
              <p className="text-lg font-bold text-amber-300">
                — Prophetic Word through The Bridge Leadership
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// 📊 AFTER THE VERDICT - Contingency Planning
function AfterTheVerdict() {
  const scenarios = [
    {
      title: "If Mercy Prevails",
      icon: CheckCircle,
      color: "green",
      actions: [
        "Immediate Bridge Project enrollment for JAHmere",
        "National press conference at 2 PM",
        "Celebration service at 6 PM", 
        "Movement launch strategy session"
      ]
    },
    {
      title: "If the Battle Continues",
      icon: AlertTriangle,
      color: "red",
      actions: [
        "Emergency appeal filing",
        "Expanded prayer coverage",
        "National advocacy campaign",
        "Congressional testimony preparation"
      ]
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight"
          >
            After the Verdict
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            Whatever the outcome, we're prepared to respond with faith, 
            action, and unwavering commitment to justice and transformation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {scenarios.map((scenario, index) => (
            <motion.div
              key={scenario.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              <Card className={`h-full border-2 border-${scenario.color}-200 hover:border-${scenario.color}-400 hover:shadow-xl transition-all duration-500`}>
                <CardHeader className="text-center pb-6">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-${scenario.color}-100 flex items-center justify-center group-hover:bg-${scenario.color}-200 transition-colors`}>
                    <scenario.icon className={`w-12 h-12 text-${scenario.color}-600`} />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {scenario.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4 px-8 pb-8">
                  {scenario.actions.map((action, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full bg-${scenario.color}-500 flex items-center justify-center flex-shrink-0 mt-1`}>
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-gray-700 leading-relaxed">{action}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ✅ PRAYER COMMITMENT FORM - Interactive Checklist
function PrayerCommitmentForm() {
  const [commitments, setCommitments] = useState({
    prayAtHour: false,
    fastJuly27: false,
    attendVirtual: false,
    bringOthers: false,
    shareOnSocial: false
  });

     const handleCommitmentChange = (key: string) => {
     setCommitments(prev => ({
       ...prev,
       [key]: !prev[key as keyof typeof prev]
     }));
   };

  const commitmentOptions = [
    { key: 'prayAtHour', label: 'I commit to pray at my designated hour', icon: Clock },
    { key: 'fastJuly27', label: 'I will fast on July 27-28', icon: Heart },
    { key: 'attendVirtual', label: 'I will attend (virtually/physically)', icon: Users },
    { key: 'bringOthers', label: 'I will bring others to pray', icon: Share2 },
    { key: 'shareOnSocial', label: 'I will share on social media #July28Miracle', icon: Sparkles }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-8 leading-tight"
          >
            Your Prayer Commitment
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed"
          >
            Make your commitment to join thousands in prayer for divine intervention 
            on July 28th. Every commitment matters.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20 mb-12"
          >
            <div className="space-y-6">
              {commitmentOptions.map((option, index) => (
                <motion.div
                  key={option.key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => handleCommitmentChange(option.key)}
                >
                                     <div className={`w-6 h-6 rounded border-2 border-white/50 flex items-center justify-center ${
                     commitments[option.key as keyof typeof commitments] ? 'bg-amber-500 border-amber-500' : ''
                   }`}>
                     {commitments[option.key as keyof typeof commitments] && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                  <option.icon className="w-6 h-6 text-blue-300" />
                  <label className="text-lg text-white cursor-pointer flex-grow text-left">
                    {option.label}
                  </label>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-12"
          >
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-400 text-black font-black px-16 py-6 text-2xl shadow-2xl hover:shadow-amber-500/25 transition-all duration-300"
            >
              <Cross className="mr-4 w-8 h-8" />
              JOIN THE PRAYER VIGIL
              <ArrowRight className="ml-4 w-8 h-8" />
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="pt-8 border-t border-white/20"
          >
            <blockquote className="text-lg md:text-xl text-blue-200 italic mb-4">
              "Sometimes pain is the only way that will turn us, as kids, back to the Father."
            </blockquote>
            <p className="text-amber-300 font-bold mb-6">— Tony Dungy</p>
            
            <p className="text-xl font-bold text-white">
              This pain becomes our purpose. This prayer becomes our power.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// 🏆 MAIN PRAYER VIGIL PAGE COMPONENT
const July28PrayerVigil = () => {
  return (
    <div className="min-h-screen bg-white">
      <PrayerVigilHero />
      <FamilyPrayerCircle />
      <PrayerWarriorsUnite />
      <GlobalPrayerNetwork />
      <HowToJoinVigil />
      <PrayerFocusPoints />
      <PropheticDeclaration />
      <AfterTheVerdict />
      <PrayerCommitmentForm />
    </div>
  );
};

export default withErrorBoundary(July28PrayerVigil, "July28PrayerVigil");
