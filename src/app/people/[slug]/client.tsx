"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Quote, Heart, Users, Calendar, MapPin, Star, Award, BookOpen, Video } from "lucide-react";
import Link from "next/link";
import { PersonData } from "@/types/person";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { withErrorBoundary } from "@/components/ui/error-boundary";
import { useState, useEffect } from "react";

interface PersonPageClientProps {
  personData: PersonData;
}

function PersonPageContent({ personData }: PersonPageClientProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-gray-50" />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Championship Professional */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-3 text-purple-700 hover:text-purple-800 font-medium transition-colors duration-200">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Hero Section - Championship Design System */}
      <section className="relative py-24 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 overflow-hidden">
        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-black/10" />
        
        {/* Background pattern for texture */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-12"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Professional Profile Image with Glass Morphism */}
            <div className="relative w-40 h-40 mx-auto mb-8 group">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-orange-500/20 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Main image container */}
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl backdrop-blur-sm bg-white/10">
                <img
                  src={personData.heroImage || '/images/fallbacks/person-placeholder.jpg'}
                  alt={`${personData.name} - Professional portrait`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/fallbacks/person-placeholder.jpg';
                  }}
                />
                
                {/* Professional border overlay */}
                <div className="absolute inset-0 rounded-full border-2 border-white/20" />
              </div>
            </div>

            {/* Championship Typography */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              {personData.name}
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto font-medium leading-relaxed">
              {personData.title}
            </p>

            {/* Professional Role Badge */}
            {personData.role && (
              <Badge className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 text-lg font-semibold mb-8 shadow-lg transition-colors duration-200">
                {personData.role.charAt(0).toUpperCase() + personData.role.slice(1)}
              </Badge>
            )}
          </motion.div>
        </div>
      </section>

      {/* Main Testimony - Professional Authority Design */}
      {personData.testimony && (
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="p-12 bg-gradient-to-br from-purple-50 to-white border-l-4 border-orange-600 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="text-center mb-8">
                  <Quote className="w-16 h-16 text-orange-600 mx-auto mb-6" />
                </div>
                
                <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 mb-8 leading-relaxed italic text-center">
                  "{personData.testimony.quote}"
                </blockquote>
                
                <cite className="block text-lg text-gray-600 font-medium text-center">
                  — {personData.testimony.context}
                  <span className="block text-sm text-gray-500 mt-2">({personData.testimony.date})</span>
                </cite>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* Family Photos Section - Professional Gallery */}
      {(personData.slug === 'jahmere-webb' || personData.slug === 'jordan-dungy') && (
        <section className="py-20 bg-gradient-to-r from-purple-50 to-orange-50/30">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-purple-800 mb-6">
                {personData.slug === 'jordan-dungy' 
                  ? 'Legacy and Friendship' 
                  : 'Brotherhood Beyond Barriers'}
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {personData.slug === 'jordan-dungy'
                  ? 'From father to son, from friend to friend—the bonds that shape a champion for others.'
                  : 'The friendship between JAHmere and Jordan transcends every challenge, showing the power of authentic connection.'}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="group"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-shadow duration-500">
                  <img
                    src={personData.slug === 'jordan-dungy' 
                      ? "/images/family/jordan_tony.webp" 
                      : "/images/family/jah_jordan.webp"}
                    alt={personData.slug === 'jordan-dungy'
                      ? "Jordan Dungy with his father Tony - A legacy of championship values"
                      : "JAHmere Webb with Jordan Dungy - Unbreakable friendship"}
                    className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent">
                    <div className="absolute bottom-8 left-8 text-white">
                      <h3 className="text-2xl font-bold mb-3">
                        {personData.slug === 'jordan-dungy' ? 'Father & Son' : 'Best Friends'}
                      </h3>
                      <p className="text-orange-100 font-medium leading-relaxed">
                        {personData.slug === 'jordan-dungy' 
                          ? 'Legacy passed from champion to champion'
                          : 'JAHmere and Jordan\'s unbreakable bond'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="group"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-shadow duration-500">
                  <img
                    src="/images/family/tony_jah_jordan.webp"
                    alt="Tony Dungy with JAHmere and Jordan - Mentorship and brotherhood in action"
                    className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent">
                    <div className="absolute bottom-8 left-8 text-white">
                      <h3 className="text-2xl font-bold mb-3">
                        {personData.slug === 'jordan-dungy' ? 'Brotherhood' : 'The Trio'}
                      </h3>
                      <p className="text-orange-100 font-medium leading-relaxed">
                        {personData.slug === 'jordan-dungy'
                          ? 'Jordan and JAHmere\'s powerful friendship'
                          : 'Coach Dungy mentoring both young men'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Impact Stats - Championship Metrics */}
      {personData.impact && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-purple-800 mb-6">
                {personData.impact.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {personData.impact.description}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {personData.impact.stats?.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card className="p-8 text-center bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-orange-600 group">
                    <div className="text-4xl font-bold text-purple-800 mb-3 group-hover:text-purple-900 transition-colors duration-200">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Sections - Professional Content Architecture */}
      {personData.sections && (
        <div>
          {personData.sections.map((section, index) => {
            switch (section.type) {
              case 'testimony':
                return (
                  <section key={index} className="py-20 bg-gradient-to-br from-gray-50 to-white">
                    <div className="max-w-7xl mx-auto px-4">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-center mb-16"
                      >
                        <h2 className="text-4xl font-bold text-purple-800 mb-6">
                          {section.content.title}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                          {section.content.description}
                        </p>
                      </motion.div>

                      {section.content.testimonies && (
                        <div className="space-y-12">
                          {section.content.testimonies.map((testimony, tIndex) => (
                            <motion.div
                              key={tIndex}
                              initial={{ opacity: 0, x: -30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.6, delay: tIndex * 0.1 }}
                            >
                              <Card className="p-12 bg-gradient-to-br from-purple-50 to-white border-l-4 border-purple-600 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                                <blockquote className="text-lg text-gray-800 mb-8 leading-relaxed font-medium">
                                  "{testimony.quote}"
                                </blockquote>
                                <div className="flex items-center gap-6">
                                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">
                                      {testimony.author.split(' ').map(n => n[0]).join('')}
                                    </span>
                                  </div>
                                  <div>
                                    <div className="font-bold text-purple-800 text-lg">
                                      {testimony.author}
                                    </div>
                                    <div className="text-gray-600 font-medium">
                                      {testimony.role} • {testimony.date}
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </section>
                );

              case 'impact':
                return (
                  <section key={index} className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                      >
                        <h2 className="text-4xl font-bold text-purple-800 mb-6">
                          {section.content.title}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                          {section.content.description}
                        </p>
                      </motion.div>

                      {section.content.achievements && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {section.content.achievements.map((achievement, aIndex) => (
                            <motion.div
                              key={aIndex}
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: aIndex * 0.1 }}
                            >
                              <Card className="p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-orange-600 h-full group">
                                <div className="flex items-start gap-6">
                                  <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                                    <Award className="w-6 h-6 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="font-bold text-xl text-purple-800 mb-3 group-hover:text-purple-900 transition-colors duration-200">
                                      {achievement.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 leading-relaxed">
                                      {achievement.description}
                                    </p>
                                    <span className="inline-block bg-orange-100 text-orange-800 text-sm font-semibold px-3 py-1 rounded-full">
                                      {achievement.year}
                                    </span>
                                  </div>
                                </div>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </section>
                );

              case 'letter':
                return (
                  <section key={index} className="py-20 bg-gradient-to-br from-purple-50 to-orange-50/30">
                    <div className="max-w-5xl mx-auto px-4">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                      >
                        <Card className="p-12 bg-gradient-to-br from-white to-purple-50/50 border-2 border-purple-200 shadow-2xl">
                          <div className="text-center mb-12">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-6">
                              <BookOpen className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-purple-800 mb-4">
                              {section.content.title}
                            </h2>
                            <p className="text-lg text-gray-600 font-medium">
                              {section.content.recipient}
                            </p>
                          </div>
                          
                          <div className="prose prose-lg max-w-none">
                            <div className="whitespace-pre-line text-gray-800 leading-relaxed font-medium text-lg">
                              {section.content.body}
                            </div>
                          </div>

                          {section.content.signature && (
                            <div className="mt-12 pt-8 border-t-2 border-purple-200 text-right">
                              {typeof section.content.signature === 'object' ? (
                                <>
                                  <div className="font-bold text-xl text-purple-800 mb-2">
                                    {section.content.signature.name}
                                  </div>
                                  <div className="text-gray-600 font-medium">
                                    {section.content.signature.title}
                                  </div>
                                </>
                              ) : (
                                <div className="font-bold text-xl text-purple-800">
                                  {section.content.signature}
                                </div>
                              )}
                              <div className="text-sm text-gray-500 mt-3 font-medium">
                                {section.content.date}
                              </div>
                            </div>
                          )}
                        </Card>
                      </motion.div>
                    </div>
                  </section>
                );

              case 'video':
                return (
                  <section key={index} className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-4">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                      >
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Video className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-purple-800 mb-6">
                          {section.content.title}
                        </h2>
                        <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                          {section.content.description}
                        </p>
                        <Card className="p-8 bg-gradient-to-br from-gray-50 to-white shadow-xl">
                          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                            <div className="text-center">
                              <Video className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-500 font-medium">Video content coming soon</p>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    </div>
                  </section>
                );

              default:
                return null;
            }
          })}
        </div>
      )}

      {/* Call to Action - Championship Engagement */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-y-12"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Join {personData.name}'s Mission
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              Be part of the transformation story that's changing lives and building bridges to freedom.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/july-28-strategy"
                className="inline-flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Heart className="w-6 h-6 mr-3" />
                Join the Prayer Vigil
              </Link>
              
              <Link
                href="/the-case"
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 px-10 py-5 rounded-xl font-bold text-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
              >
                <BookOpen className="w-6 h-6 mr-3" />
                Learn About the Case
              </Link>
            </div>
            
            {/* Additional engagement options */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-white/80 mb-6 font-medium">
                More ways to support the mission:
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/impact"
                  className="inline-flex items-center text-white/90 hover:text-white font-medium transition-colors duration-200"
                >
                  <Users className="w-5 h-5 mr-2" />
                  View Impact Dashboard
                </Link>
                <Link
                  href="/people"
                  className="inline-flex items-center text-white/90 hover:text-white font-medium transition-colors duration-200"
                >
                  <Star className="w-5 h-5 mr-2" />
                  Meet Other Champions
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export const PersonPageClient = withErrorBoundary(PersonPageContent, "PersonPageClient"); 