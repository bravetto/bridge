'use client'

import { withErrorBoundary } from '@/components/ui/error-boundary'

function ChampionshipDesignShowcase() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Homepage Style */}
      <section className="champion-hero champion-page-home">
        <div className="champion-container champion-container-7xl">
          <div className="champion-flex champion-flex-col champion-items-center champion-gap-8 relative z-10">
            <div className="champion-trust-indicator champion-mb-4">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Trusted by 10,000+ users worldwide
            </div>
            
            <h1 className="champion-hero-title">
              Championship Design System V2
            </h1>
            <p className="champion-hero-subtitle max-w-4xl">
              Balanced variety meets conversion mastery. A battle-tested design system that adapts to different page types while maintaining championship-level performance and user experience.
            </p>
            
            <div className="champion-flex champion-gap-4 champion-mt-8">
              <button className="champion-btn champion-btn-primary champion-btn-xl">
                Start Your Journey
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button className="champion-btn champion-btn-outline champion-btn-xl">
                View Documentation
              </button>
            </div>

            <div className="champion-social-proof champion-mt-12 max-w-2xl">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-teal-400 border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-400 border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-red-400 border-2 border-white"></div>
              </div>
              <div className="ml-4">
                <p className="champion-text-white font-semibold">Join 2,341 developers</p>
                <p className="champion-text-white opacity-80 text-sm">Building championship experiences</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Section - Analytics Style */}
      <section className="champion-py-4 champion-bg-gray-25 champion-page-dashboard">
        <div className="champion-container champion-container-7xl">
          <div className="champion-text-center champion-mb-16">
            <h2 className="champion-heading-2 champion-mb-4">Real-Time Performance Metrics</h2>
            <p className="champion-text-lg champion-text-muted max-w-3xl mx-auto">
              Championship performance delivered through data-driven design decisions and conversion optimization.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="champion-metrics-grid">
            <div className="champion-card-metric">
              <div className="champion-metric-title champion-text-blue">1,247</div>
              <div className="champion-metric-label">Active Users</div>
              <div className="champion-progress champion-mt-3">
                <div className="champion-progress-bar" style={{width: '78%'}}></div>
              </div>
            </div>
            
            <div className="champion-card-metric">
              <div className="champion-metric-title champion-text-green">24.9%</div>
              <div className="champion-metric-label">Conversion Rate</div>
              <div className="champion-badge champion-badge-success champion-mt-2">+12% vs last month</div>
            </div>
            
            <div className="champion-card-metric">
              <div className="champion-metric-title champion-text-orange">2,341</div>
              <div className="champion-metric-label">Total Sessions</div>
              <div className="champion-urgency champion-mt-2">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V8a1 1 0 00-.293-.707z" clipRule="evenodd" />
                </svg>
                Live Update
              </div>
            </div>
            
            <div className="champion-card-metric">
              <div className="champion-metric-title champion-text-purple">4:32</div>
              <div className="champion-metric-label">Avg. Session Time</div>
              <div className="champion-badge champion-badge-info champion-mt-2">Above target</div>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="champion-dashboard-grid champion-mt-12">
            <div className="champion-card-dashboard">
              <h3 className="champion-heading-5 champion-mb-4">User Growth Trend</h3>
              <div className="h-48 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">📈</div>
                  <p className="text-sm text-gray-600">Interactive chart visualization</p>
                </div>
              </div>
              <div className="champion-flex champion-justify-between champion-items-center champion-mt-4">
                <span className="champion-text-sm champion-text-muted">Last 30 days</span>
                <button className="champion-btn-dashboard">View Details</button>
              </div>
            </div>

            <div className="champion-card-dashboard">
              <h3 className="champion-heading-5 champion-mb-4">Top Performing Content</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Design System Guide</p>
                    <p className="text-sm text-gray-600">1,234 views</p>
                  </div>
                  <div className="champion-badge champion-badge-success">+24%</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Conversion Optimization</p>
                    <p className="text-sm text-gray-600">987 views</p>
                  </div>
                  <div className="champion-badge champion-badge-success">+18%</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Performance Metrics</p>
                    <p className="text-sm text-gray-600">756 views</p>
                  </div>
                  <div className="champion-badge champion-badge-warning">+5%</div>
                </div>
              </div>
            </div>

            <div className="champion-card-dashboard">
              <h3 className="champion-heading-5 champion-mb-4">System Health</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">API Response Time</span>
                    <span className="text-sm text-green-600 font-semibold">27ms</span>
                  </div>
                  <div className="champion-progress">
                    <div className="champion-progress-bar bg-green-500" style={{width: '95%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Build Time</span>
                    <span className="text-sm text-green-600 font-semibold">9.2s</span>
                  </div>
                  <div className="champion-progress">
                    <div className="champion-progress-bar bg-green-500" style={{width: '88%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Error Rate</span>
                    <span className="text-sm text-green-600 font-semibold">0.01%</span>
                  </div>
                  <div className="champion-progress">
                    <div className="champion-progress-bar bg-green-500" style={{width: '99%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Page Type Variations */}
      <section className="champion-py-4 champion-bg-white">
        <div className="champion-container champion-container-7xl">
          <div className="champion-text-center champion-mb-16">
            <h2 className="champion-heading-2 champion-mb-4">Strategic Page Variations</h2>
            <p className="champion-text-lg champion-text-muted max-w-3xl mx-auto">
              Each page type has its own personality while maintaining brand consistency and conversion focus.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Homepage Card */}
            <div className="champion-card champion-page-home relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-purple-700 opacity-90"></div>
              <div className="relative z-10">
                <h3 className="champion-heading-4 champion-text-white champion-mb-4">Homepage</h3>
                <p className="champion-text-white opacity-90 champion-mb-6">
                  Hero-focused design with maximum impact and clear value proposition.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-white text-sm">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                    Hero gradient backgrounds
                  </div>
                  <div className="flex items-center text-white text-sm">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                    Conversion-optimized CTAs
                  </div>
                  <div className="flex items-center text-white text-sm">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                    Social proof integration
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Card */}
            <div className="champion-card champion-page-dashboard">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="champion-heading-4 champion-mb-4">Dashboard</h3>
                <p className="champion-text-base champion-text-muted champion-mb-6">
                  Data-driven layouts with metrics, charts, and performance indicators.
                </p>
                <button className="champion-btn-dashboard">Explore Metrics</button>
              </div>
            </div>

            {/* Analytics Card */}
            <div className="champion-card champion-page-analytics">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="champion-heading-4 champion-mb-4">Analytics</h3>
                <p className="champion-text-base champion-text-muted champion-mb-6">
                  Insight-driven design with trend analysis and growth metrics.
                </p>
                <button className="champion-btn champion-btn-outline">View Insights</button>
              </div>
            </div>

            {/* Creative Card */}
            <div className="champion-card champion-page-creative relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-purple-600 opacity-90"></div>
              <div className="relative z-10">
                <h3 className="champion-heading-4 champion-text-white champion-mb-4">Creative</h3>
                <p className="champion-text-white opacity-90 champion-mb-6">
                  Artistic expression with bold visuals and creative freedom.
                </p>
                <button className="champion-btn champion-btn-ghost text-white border-white hover:bg-white hover:text-purple-600">
                  Explore Art
                </button>
              </div>
            </div>

            {/* Professional Card */}
            <div className="champion-card champion-page-professional relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-purple-700 opacity-90"></div>
              <div className="relative z-10">
                <h3 className="champion-heading-4 champion-text-white champion-mb-4">Professional</h3>
                <p className="champion-text-white opacity-90 champion-mb-6">
                  Trust-building design for corporate and business contexts.
                </p>
                <button className="champion-btn champion-btn-ghost text-white border-white hover:bg-white hover:text-gray-800">
                  Learn More
                </button>
              </div>
            </div>

            {/* Contact Card */}
            <div className="champion-card champion-page-contact relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-red-500 opacity-90"></div>
              <div className="relative z-10">
                <h3 className="champion-heading-4 champion-text-white champion-mb-4">Contact</h3>
                <p className="champion-text-white opacity-90 champion-mb-6">
                  Action-oriented design that drives engagement and conversions.
                </p>
                <button className="champion-btn champion-btn-ghost text-white border-white hover:bg-white hover:text-orange-600">
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Table Section */}
      <section className="champion-py-4 champion-bg-gray-50">
        <div className="champion-container champion-container-7xl">
          <div className="champion-text-center champion-mb-16">
            <h2 className="champion-heading-2 champion-mb-4">Championship Data Tables</h2>
            <p className="champion-text-lg champion-text-muted max-w-3xl mx-auto">
              Clean, scannable data presentation inspired by the world's best dashboards.
            </p>
          </div>

          <div className="champion-card">
            <div className="champion-flex champion-justify-between champion-items-center champion-mb-6">
              <h3 className="champion-heading-4">User Performance Overview</h3>
              <div className="champion-flex champion-gap-3">
                <button className="champion-btn-dashboard">Export</button>
                <button className="champion-btn-dashboard">Filter</button>
              </div>
            </div>

            <table className="champion-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Sessions</th>
                  <th>Conversion Rate</th>
                  <th>Revenue</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-semibold text-sm">JD</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">John Doe</p>
                        <p className="text-xs text-gray-500">john@example.com</p>
                      </div>
                    </div>
                  </td>
                  <td>1,247</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span>24.5%</span>
                      <div className="champion-badge champion-badge-success">+12%</div>
                    </div>
                  </td>
                  <td className="font-semibold text-green-600">$12,450</td>
                  <td><div className="champion-badge champion-badge-success">Active</div></td>
                  <td>
                    <button className="champion-btn-dashboard champion-btn-sm">View</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">SM</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Sarah Miller</p>
                        <p className="text-xs text-gray-500">sarah@example.com</p>
                      </div>
                    </div>
                  </td>
                  <td>987</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span>18.3%</span>
                      <div className="champion-badge champion-badge-warning">-3%</div>
                    </div>
                  </td>
                  <td className="font-semibold text-green-600">$8,750</td>
                  <td><div className="champion-badge champion-badge-info">Premium</div></td>
                  <td>
                    <button className="champion-btn-dashboard champion-btn-sm">View</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-semibold text-sm">MJ</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Mike Johnson</p>
                        <p className="text-xs text-gray-500">mike@example.com</p>
                      </div>
                    </div>
                  </td>
                  <td>756</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span>32.1%</span>
                      <div className="champion-badge champion-badge-success">+8%</div>
                    </div>
                  </td>
                  <td className="font-semibold text-green-600">$15,200</td>
                  <td><div className="champion-badge champion-badge-success">Active</div></td>
                  <td>
                    <button className="champion-btn-dashboard champion-btn-sm">View</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Conversion Psychology Section */}
      <section className="champion-py-4 champion-bg-white">
        <div className="champion-container champion-container-7xl">
          <div className="champion-text-center champion-mb-16">
            <h2 className="champion-heading-2 champion-mb-4">Conversion Psychology Elements</h2>
            <p className="champion-text-lg champion-text-muted max-w-3xl mx-auto">
              Psychological triggers and trust indicators that drive user action and build confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="champion-card">
              <h3 className="champion-heading-5 champion-mb-4">Trust Indicators</h3>
              <div className="space-y-3">
                <div className="champion-trust-indicator">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  SSL Secured
                </div>
                <div className="champion-trust-indicator">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified Business
                </div>
              </div>
            </div>

            <div className="champion-card">
              <h3 className="champion-heading-5 champion-mb-4">Social Proof</h3>
              <div className="champion-social-proof">
                <div className="flex -space-x-1">
                  <div className="w-8 h-8 rounded-full bg-purple-400 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-green-400 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-orange-400 border-2 border-white"></div>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">2,341+ happy customers</p>
                  <p className="text-sm text-gray-600">Join the community</p>
                </div>
              </div>
            </div>

            <div className="champion-card">
              <h3 className="champion-heading-5 champion-mb-4">Urgency Indicators</h3>
              <div className="space-y-3">
                <div className="champion-urgency">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V8a1 1 0 00-.293-.707z" clipRule="evenodd" />
                  </svg>
                  Limited Time Offer
                </div>
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm font-medium text-orange-800">Only 3 spots left!</p>
                  <p className="text-xs text-orange-600">Don't miss out on early access</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="champion-py-4 champion-bg-purple champion-page-contact">
        <div className="champion-container champion-container-7xl">
          <div className="champion-text-center">
            <h2 className="champion-heading-2 champion-text-white champion-mb-4">
              Ready to Build Championship Experiences?
            </h2>
            <p className="champion-text-lg champion-text-white opacity-90 champion-mb-8 max-w-2xl mx-auto">
              Join thousands of developers and designers who are creating conversion-optimized, accessible, and performant web experiences.
            </p>
            <div className="champion-flex champion-gap-4 champion-justify-center">
              <button className="champion-btn champion-btn-primary champion-btn-lg">
                Get Started Free
              </button>
              <button className="champion-btn champion-btn-ghost text-white border-white hover:bg-white hover:text-purple-600 champion-btn-lg">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default withErrorBoundary(ChampionshipDesignShowcase, "ChampionshipDesignShowcase") 