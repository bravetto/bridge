'use client'

import { useState } from 'react'
import Link from 'next/link'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { PageLayout } from '@/components/layout/site-navigation'

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'support',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission - in real implementation, this would call an API
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: 'support', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageLayout>
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get Involved in JAHmere's Case
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Your voice, support, and advocacy can make a difference. Join the movement for justice and transformation.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Quick Actions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Take Action Now</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link 
              href="/write-letter"
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 rounded-lg hover:from-blue-700 hover:to-green-700 transition-colors"
            >
              <div className="text-3xl mb-4">✍️</div>
              <h3 className="text-xl font-bold mb-2">Write to Judge</h3>
              <p className="text-blue-100">Send a letter supporting treatment over incarceration</p>
            </Link>
            
            <Link 
              href="/witnesses"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors"
            >
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-2">Read Testimonials</h3>
              <p className="text-purple-100">See what 14 character witnesses say about JAHmere</p>
            </Link>
            
            <Link 
              href="/the-case"
              className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-lg hover:from-orange-700 hover:to-red-700 transition-colors"
            >
              <div className="text-3xl mb-4">⚖️</div>
              <h3 className="text-xl font-bold mb-2">Learn the Facts</h3>
              <p className="text-orange-100">Understand the legal case and evidence</p>
            </Link>
          </div>
        </section>

        {/* Contact Form */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send Us a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                  <p className="text-green-800">
                    <strong>Thank you!</strong> Your message has been received. We'll get back to you soon.
                  </p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                  <p className="text-red-800">
                    <strong>Error:</strong> There was a problem sending your message. Please try again.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    How can we help?
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="support">I want to support JAHmere's case</option>
                    <option value="media">Media inquiry</option>
                    <option value="legal">Legal question</option>
                    <option value="volunteer">I want to volunteer</option>
                    <option value="donation">Donation inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us how you'd like to help or what questions you have..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-6 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Other Ways to Help</h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Share JAHmere's Story</h3>
                  <p className="text-blue-700 mb-4">
                    Help spread awareness about JAHmere's case on social media and in your community.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-blue-600">
                      • Share this website with friends and family
                    </p>
                    <p className="text-sm text-blue-600">
                      • Talk to your faith community about supporting JAHmere
                    </p>
                    <p className="text-sm text-blue-600">
                      • Contact local media about the case
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">Professional Support</h3>
                  <p className="text-green-700 mb-4">
                    If you're a professional who can offer expertise or services:
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-green-600">
                      • Legal professionals: Pro bono consultation
                    </p>
                    <p className="text-sm text-green-600">
                      • Mental health experts: Evaluation support
                    </p>
                    <p className="text-sm text-green-600">
                      • Employers: Job opportunities for reintegration
                    </p>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">Stay Updated</h3>
                  <p className="text-purple-700 mb-4">
                    Follow JAHmere's case and get updates on court proceedings and advocacy efforts.
                  </p>
                  <p className="text-sm text-purple-600">
                    Court Date: <strong>July 28th</strong> - Your support matters now more than ever.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-12 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Every Voice Matters</h2>
            <p className="text-xl mb-8 text-blue-100">
              Join Tony Dungy and thousands of supporters advocating for treatment over punishment.
            </p>
            <Link 
              href="/write-letter"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Write Your Letter Now
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}

export default withErrorBoundary(ContactPage, "ContactPage") 