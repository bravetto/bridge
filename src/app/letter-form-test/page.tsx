"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Heart, Scale, Star, Crown, Zap, FileText, Users, CheckCircle, ArrowLeft, Lightbulb, AlertCircle, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import dynamic from "next/dynamic";
import { withErrorBoundary } from "@/components/ui/error-boundary";

// Dynamic import for heavy components
const DivineLetterForm = dynamic(
  () => import("@/components/divine-letter-form"),
  {
    loading: () => (
      <div className="max-w-5xl mx-auto">
        <Card className="p-12 text-center bg-white shadow-lg">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-purple-200 rounded w-1/3 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </Card>
      </div>
    ),
    ssr: false,
  },
);

function LetterFormPageContent() {
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const handleSubmit = async (data: any) => {
    console.log("Letter submitted", data);
    setSubmittedData(data);
  };

  const handleAutoSave = async (data: any) => {
    console.log("Letter auto-saved", data);
  };

  const steps = [
    { title: "Your Information", icon: Users },
    { title: "Your Relationship", icon: Heart },
    { title: "Specific Examples", icon: Star },
    { title: "Write Your Letter", icon: FileText },
    { title: "Review & Submit", icon: CheckCircle },
  ];

  const tips = [
    {
      icon: Lightbulb,
      title: "Be Specific",
      description: "Include dates, locations, and specific examples of JAHmere's character and positive impact."
    },
    {
      icon: Heart,
      title: "Show Transformation",
      description: "Highlight how JAHmere has grown, learned, and positively influenced others."
    },
    {
      icon: Scale,
      title: "Focus on Justice",
      description: "Emphasize rehabilitation, second chances, and community benefit over punishment."
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "Describe how JAHmere's freedom would benefit the community and those he mentors."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-800 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="flex justify-center"
            >
              <div className="p-6 bg-white/20 backdrop-blur-sm rounded-full">
                <FileText className="w-16 h-16 text-white" />
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-white text-center leading-tight">
              Write a Letter for
              <br />
              <span className="text-orange-400">JAHmere's Freedom</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto">
              Your words can make the difference in JAHmere Webb's case.
              <br />
              Write a powerful character reference letter that shows his true impact.
            </p>

            {/* Impact Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-8 pt-8"
            >
              <div className="flex items-center gap-3 text-white">
                <FileText className="w-6 h-6 text-orange-400" />
                <span className="font-semibold">Court-Optimized Format</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Users className="w-6 h-6 text-orange-400" />
                <span className="font-semibold">Character Witness Support</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Scale className="w-6 h-6 text-orange-400" />
                <span className="font-semibold">Justice & Redemption</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Writing Tips Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-purple-800 mb-4">
              How to Write an Effective Character Letter
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these guidelines to create a powerful letter that judges take seriously
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                                 <Card className="letter-form-tip p-6 h-full bg-white shadow-lg border-l-4 border-orange-500">
                  <tip.icon className="w-8 h-8 text-orange-600 mb-4" />
                  <h3 className="text-lg font-bold text-purple-800 mb-3">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {tip.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Family Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-purple-800 mb-4">
              The Person Behind the Case
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Your letter isn't just about legal arguments—it's about a real person with real relationships and real potential for transformation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
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
                  <h3 className="text-xl font-bold mb-2">True Friendship</h3>
                  <p className="text-sm opacity-90">JAHmere and Jordan's bond shows the power of authentic connection</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
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
                  <p className="text-sm opacity-90">Coach Dungy's commitment to JAHmere's transformation</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Character Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-purple-50 to-orange-50 rounded-xl p-8 text-center max-w-4xl mx-auto"
          >
            <Heart className="w-8 h-8 text-purple-600 mx-auto mb-4" />
            <blockquote className="text-xl italic text-gray-700 mb-4">
              "When you write about JAHmere, you're not just writing about one person—you're writing about the ripple effect of transformation that touches everyone around him."
            </blockquote>
            <cite className="text-orange-600 font-semibold">— Jordan Dungy</cite>
          </motion.div>
        </div>
      </section>

      {/* Letter Form or Success State */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {submittedData ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-12 text-center max-w-4xl mx-auto bg-white shadow-xl">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mb-8"
                >
                  <div className="p-6 bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                </motion.div>

                <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6">
                  Your Letter Has Been Submitted
                </h2>

                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Thank you for supporting JAHmere Webb. Your character reference letter
                  has been received and will be submitted to the court.
                  <strong className="text-orange-600">
                    {" "}
                    Your voice matters in the fight for justice.
                  </strong>
                </p>

                <div className="bg-purple-50 border-2 border-purple-200 p-8 rounded-lg mb-8">
                  <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Your Character Reference Letter
                  </h3>
                  <div className="text-left max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed text-sm">
                      {submittedData.letterContent}
                    </pre>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                     <Button
                     onClick={() => setSubmittedData(null)}
                     className="letter-form-submit-btn bg-orange-600 hover:bg-orange-700 text-white px-8 py-3"
                   >
                    <FileText className="w-4 h-4 mr-2" />
                    Write Another Letter
                  </Button>
                  <Link href="/the-case">
                    <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3">
                      Learn More About the Case
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="max-w-5xl mx-auto">
                {/* Step Progress */}
                <div className="mb-8">
                                     <Card className="letter-form-card p-6 bg-white shadow-lg">
                    <h3 className="text-lg font-semibold text-purple-800 mb-4">Letter Writing Process</h3>
                    <div className="flex items-center justify-between">
                      {steps.map((step, index) => (
                        <div key={index} className="flex items-center">
                          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                            index <= currentStep ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-500'
                          }`}>
                            <step.icon className="w-5 h-5" />
                          </div>
                          {index < steps.length - 1 && (
                            <div className={`h-1 w-8 md:w-16 ${
                              index < currentStep ? 'bg-orange-600' : 'bg-gray-200'
                            }`} />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <span className="text-sm text-gray-600">
                        Step {currentStep + 1} of {steps.length}: {steps[currentStep]?.title}
                      </span>
                    </div>
                  </Card>
                </div>

                {                 /* Important Notice */}
                 <Card className="letter-form-card p-6 mb-8 bg-orange-50 border-2 border-orange-200">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-orange-800 mb-2">
                        Important: Court Deadline July 28th
                      </h4>
                      <p className="text-orange-700 text-sm">
                        Your letter will be submitted directly to Judge Ferrero before JAHmere's hearing.
                        Please be honest, specific, and focus on his character and positive impact on others.
                      </p>
                    </div>
                  </div>
                </Card>

                <DivineLetterForm
                  onSubmit={handleSubmit}
                  onSave={handleAutoSave}
                  className="max-w-5xl mx-auto"
                />
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      {!submittedData && (
        <section className="py-16 bg-gradient-to-r from-purple-800 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Every Letter Counts in the Fight for Justice
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Judge Ferrero will read your letter. Your testimony about JAHmere's character
                could be the key to his freedom and second chance.
                <strong className="text-orange-400"> Your voice matters.</strong>
              </p>

              <div className="pt-6">
                <div className="inline-flex items-center gap-3 text-white bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <Send className="w-5 h-5 text-orange-400" />
                  <span className="font-semibold">Submit by July 28th</span>
                  <Send className="w-5 h-5 text-orange-400" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}

export default withErrorBoundary(LetterFormPageContent, "LetterFormPage");
