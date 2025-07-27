"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Calendar,
  Shield,
  Users,
  Target,
  CheckCircle,
  Clock,
  AlertCircle,
  Heart,
  Scale,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TIMELINE_EVENTS = [
  {
    date: "August 2023",
    title: "Initial Contact with Tony Dungy",
    description:
      "Coach Dungy learns about JAHmere's case and begins evaluation",
    status: "completed",
  },
  {
    date: "October 2023",
    title: "Program Development",
    description: "The Bridge Project framework customized for JAHmere's needs",
    status: "completed",
  },
  {
    date: "November 2023",
    title: "Dungy Endorsement",
    description: "Tony Dungy formally endorses JAHmere for the program",
    status: "completed",
  },
  {
    date: "December 2023",
    title: "Proposal Submission",
    description: "Comprehensive proposal submitted to Judge Ferrero",
    status: "completed",
  },
  {
    date: "January 2024",
    title: "Community Support Campaign",
    description: "Launch of public support initiative",
    status: "current",
  },
  {
    date: "March 2024",
    title: "Expected Decision",
    description: "Judge Ferrero's decision on rehabilitation vs incarceration",
    status: "pending",
  },
];

const PROGRAM_FEATURES = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "24/7 Accountability",
    description:
      "Continuous monitoring and support through structured mentorship",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Integration",
    description: "Gradual reintegration with job training and social support",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Goal-Oriented Progress",
    description: "Clear milestones and measurable outcomes for success",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Holistic Approach",
    description: "Addressing root causes, not just symptoms",
  },
];

export default function TheCasePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-purple-800 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Scale className="w-5 h-5 text-orange-400" />
              <span className="text-white font-semibold">LEGAL CASE OVERVIEW</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              The Case for Rehabilitation
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto">
              Understanding JAHmere's situation and the opportunity for transformation
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-orange-400">73%</div>
                <div className="text-white/80 text-sm">Success Rate with Bridge Project</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-orange-400">$0</div>
                <div className="text-white/80 text-sm">Cost to Taxpayers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-orange-400">24/7</div>
                <div className="text-white/80 text-sm">Accountability & Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="program">The Program</TabsTrigger>
              <TabsTrigger value="legal">Legal Context</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card className="p-8 bg-white shadow-lg">
                  <h2 className="text-2xl font-bold mb-6 text-purple-800">The Situation</h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      JAHmere Webb stands at a crossroads. At 21 years old, he
                      faces a decision that will shape the rest of his life:
                      traditional incarceration with a 73% chance of
                      reoffending, or an innovative rehabilitation program that
                      has proven to transform lives.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Judge Ferrero has the power to choose a different path—one
                      that doesn't just punish, but rehabilitates. One that
                      doesn't perpetuate the cycle, but breaks it.
                    </p>
                  </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6 border-2 border-red-300 bg-red-50 shadow-lg">
                    <div className="flex items-start gap-4">
                      <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-red-800">
                          The Traditional Path
                        </h3>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                          <li>• 73% recidivism rate</li>
                          <li>• Average cost: $35,000/year to taxpayers</li>
                          <li>• Limited rehabilitation opportunities</li>
                          <li>• Disrupted family and community ties</li>
                        </ul>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 border-2 border-orange-300 bg-orange-50 shadow-lg">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-orange-800">
                          The Bridge Project Path
                        </h3>
                        <ul className="space-y-2 text-gray-700">
                          <li>• 73% SUCCESS rate (opposite of prison)</li>
                          <li>• Zero cost to taxpayers</li>
                          <li>• Intensive mentorship and accountability</li>
                          <li>• Maintains family and builds community</li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>

            {/* Timeline Tab */}
            <TabsContent value="timeline" className="space-y-8">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card className="p-8 bg-white shadow-lg">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-purple-800">
                    <Calendar className="w-6 h-6 text-purple-600" />
                    Case Timeline
                  </h2>
                  <div className="space-y-6">
                    {TIMELINE_EVENTS.map((event, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex gap-4 p-4 rounded-lg ${
                          event.status === "completed"
                            ? "bg-orange-50 border-2 border-orange-200"
                            : event.status === "current"
                              ? "bg-purple-50 border-2 border-purple-200"
                              : "bg-gray-50 border-2 border-gray-200"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-full ${
                            event.status === "completed"
                              ? "bg-orange-600"
                              : event.status === "current"
                                ? "bg-purple-600"
                                : "bg-gray-400"
                          }`}
                        >
                          {event.status === "completed" ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : event.status === "current" ? (
                            <Clock className="w-5 h-5 text-white" />
                          ) : (
                            <Clock className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-lg">{event.title}</div>
                          <div className="text-sm text-gray-600 mb-1">
                            {event.date}
                          </div>
                          <div className="text-gray-700 dark:text-gray-300">
                            {event.description}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Program Tab */}
            <TabsContent value="program" className="space-y-8">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card className="p-8 bg-white shadow-lg">
                  <h2 className="text-2xl font-bold mb-6 text-purple-800">
                    The Bridge Project Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {PROGRAM_FEATURES.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-4"
                      >
                        <div className="p-3 bg-purple-100 rounded-lg h-fit">
                          <div className="text-purple-600">{feature.icon}</div>
                        </div>
                        <div>
                          <h3 className="font-bold mb-1 text-purple-800">{feature.title}</h3>
                          <p className="text-gray-600">
                            {feature.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-purple-50 border-2 border-purple-200 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-4 text-purple-800">
                      Program Requirements
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <span>Daily check-ins with assigned mentor</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <span>
                          Weekly group sessions with other program participants
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <span>
                          Job training or educational enrollment within 30 days
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <span>
                          Community service commitment (20 hours/month)
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <span>
                          Random drug testing and compliance monitoring
                        </span>
                      </li>
                    </ul>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Legal Context Tab */}
            <TabsContent value="legal" className="space-y-8">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card className="p-8 bg-white shadow-lg">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-purple-800">
                    <Scale className="w-6 h-6 text-purple-600" />
                    Legal Framework
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-purple-800">
                        Precedent for Alternative Sentencing
                      </h3>
                      <p className="text-gray-700 mb-4">
                        Florida law provides judges with discretion to order
                        alternative sentences that serve the interests of
                        justice and public safety. The Bridge Project aligns
                        with established rehabilitation programs that have been
                        successfully implemented across the state.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold text-lg mb-3 text-purple-800">
                        Judge Ferrero's Options
                      </h3>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700">
                        <li>Traditional incarceration (not recommended)</li>
                        <li>
                          Probation with standard conditions (limited
                          effectiveness)
                        </li>
                        <li>
                          <strong>
                            The Bridge Project with intensive supervision
                            (recommended)
                          </strong>
                        </li>
                      </ol>
                    </div>

                    <div className="bg-orange-50 border-2 border-orange-200 p-6 rounded-lg">
                      <h3 className="font-bold text-lg mb-3 text-orange-800">
                        Why This Matters Now
                      </h3>
                      <p className="text-gray-700">
                        Judge Ferrero's decision will not only impact JAHmere's
                        life but could set a precedent for how young offenders
                        are given second chances in our community. This is an
                        opportunity to demonstrate that rehabilitation, not just
                        punishment, can create safer communities.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Family Impact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-purple-800 mb-4">
              The Human Story Behind the Case
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              This isn't just about legal precedent—it's about real relationships, real transformation, and real hope for the future.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative rounded-xl overflow-hidden shadow-xl"
            >
              <img
                src="/images/family/jah_jordan.webp"
                alt="JAHmere Webb with Jordan Dungy"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Brotherhood</h3>
                  <p className="text-sm opacity-90">JAHmere and Jordan's friendship shows the power of authentic connection</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative rounded-xl overflow-hidden shadow-xl"
            >
              <img
                src="/images/family/tony_jah_jordan.webp"
                alt="Tony Dungy with JAHmere and Jordan"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Mentorship</h3>
                  <p className="text-sm opacity-90">Coach Dungy's commitment to both young men's futures</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Impact Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-purple-50 to-orange-50 rounded-xl p-8 text-center max-w-4xl mx-auto"
          >
            <Heart className="w-8 h-8 text-purple-600 mx-auto mb-4" />
            <blockquote className="text-xl italic text-gray-700 mb-4">
              "When you invest in rehabilitation instead of just punishment, you're not just changing one life—you're changing families, communities, and futures."
            </blockquote>
            <cite className="text-orange-600 font-semibold">— Tony Dungy</cite>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-800 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Help Make the Case</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Your voice can help Judge Ferrero see that the community supports
            rehabilitation over incarceration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/letter-form-test"
              className="vigil-cta-btn inline-flex items-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors"
            >
              <FileText className="w-5 h-5" />
              Write to Judge Ferrero
            </a>
            <a
              href="/impact"
              className="people-cta-btn inline-flex items-center gap-2 px-8 py-4 bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 hover:border-white/50 rounded-lg font-semibold transition-colors"
            >
              <Users className="w-5 h-5" />
              View Community Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
