'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

const templates = [
  {
    id: 'personal',
    name: 'Personal Connection',
    description: 'Most effective - Share your personal perspective',
    audience: 'General public, personal connection',
    subject: 'Mercy for JAHmere Webb - Case #2021-CF-007843',
    connections: [
      'As a parent, I cannot imagine my child with developmental delays spending 11 years in prison',
      'As an educator, I\'ve worked with students like JAHmere who need support, not punishment',
      'As a person of faith, I believe in redemption and second chances',
      'As a community member, I want safety through treatment, not incarceration',
      'As a taxpayer, I support the $294,000 savings that treatment would provide',
      'As someone who believes in justice, this 25-year sentence for a cognitive 15-year-old is wrong'
    ]
  },
  {
    id: 'professional',
    name: 'Professional/Expert',
    description: 'For professionals in relevant fields',
    audience: 'Healthcare, education, criminal justice professionals',
    subject: 'Professional Support for Treatment Alternative - JAHmere Webb Case #2021-CF-007843'
  },
  {
    id: 'faith',
    name: 'Faith-Based',
    description: 'Focus on redemption and transformation',
    audience: 'Faith community members',
    subject: 'A Letter of Mercy - JAHmere Webb Case #2021-CF-007843'
  },
  {
    id: 'safety',
    name: 'Community Safety',
    description: 'Focus on public safety through treatment',
    audience: 'Community safety advocates',
    subject: 'Community Safety Through Treatment - JAHmere Webb Case #2021-CF-007843'
  },
  {
    id: 'parent',
    name: 'Parent/Family',
    description: 'Parent\'s perspective on children with disabilities',
    audience: 'Parents and families',
    subject: 'A Parent\'s Plea for Mercy - JAHmere Webb Case #2021-CF-007843'
  },
  {
    id: 'quick',
    name: 'Quick Support',
    description: 'Concise letter for busy supporters',
    audience: 'Quick support (busy supporters)',
    subject: 'Support for JAHmere Webb Treatment Alternative - Case #2021-CF-007843'
  }
]

export default function WriteLetterPage() {
  const [selectedTemplate, setSelectedTemplate] = useState('personal')
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    profession: '',
    connection: '',
    customConnection: ''
  })
  const [generatedLetter, setGeneratedLetter] = useState('')
  const [showLetter, setShowLetter] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const generateLetter = () => {
    const template = templates.find(t => t.id === selectedTemplate)
    const connection = formData.connection === 'custom' ? formData.customConnection : formData.connection
    
    let letter = `The Honorable Judge Denise R. Ferrero
Orange County Courthouse
425 N Orange Ave
Orlando, FL 32801

Subject: ${template?.subject}

Dear Judge Ferrero,

My name is ${formData.name} from ${formData.city}. I am writing about JAHmere Webb, who faces sentencing on July 28th.

${connection}

JAHmere entered the system at 21 with the documented mental capacity of a 15-year-old. Now 32, he has spent 11 years being punished for having a disability. This is not justice.

The Bridge Project offers immediate treatment, employment, and 24/7 supervision - a better solution for everyone. I respectfully ask you to:

1. Acknowledge his developmental delays
2. Choose treatment over continued incarceration
3. Give JAHmere the chance to contribute to society

Thank you for considering mercy in this case.

Respectfully,
${formData.name}
${formData.profession}
${new Date().toLocaleDateString()}`

    setGeneratedLetter(letter)
    setShowLetter(true)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter)
    alert('Letter copied to clipboard!')
  }

  const downloadLetter = () => {
    const element = document.createElement('a')
    const file = new Blob([generatedLetter], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'JAHmere_Webb_Support_Letter.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Add Your Voice: Support Treatment Over Warehousing
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            Judge Ferrero has the authority to choose treatment. Your letter can help her make the right decision.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Community Impact Counter - Social Proof */}
        <div className="text-center mb-12">
          <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-purple-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Community Support</h2>
            <div className="text-6xl font-bold text-purple-600 mb-2">1,247</div>
            <p className="text-lg text-gray-600 mb-2">Letters submitted for JAHmere</p>
            <div className="flex justify-center items-center space-x-4 text-sm text-gray-500">
              <span>📧 Growing daily</span>
              <span>•</span>
              <span>🏛️ Delivered to Judge Ferrero</span>
              <span>•</span>
              <span>⚖️ Justice through community voice</span>
            </div>
          </div>
        </div>

        {/* Key Facts Banner */}
        <div className="bg-blue-50 p-6 rounded-lg mb-12 border-l-4 border-blue-500">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Why Your Letter Matters</h2>
          <div className="grid md:grid-cols-3 gap-6 text-blue-700">
            <div>
              <h3 className="font-semibold mb-2">The Facts</h3>
              <ul className="text-sm space-y-1">
                <li>• JAHmere: Age 21, mental age 15 at arrest</li>
                <li>• 11 years served (already exceeding typical sentences)</li>
                <li>• Tony Dungy endorses his transformation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">The Economics</h3>
              <ul className="text-sm space-y-1">
                <li>• Prison: $403,200 over 14 years</li>
                <li>• Treatment: $109,200 over 14 years</li>
                <li>• Taxpayer savings: $294,000</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">The Safety</h3>
              <ul className="text-sm space-y-1">
                <li>• Treatment reduces recidivism to &lt;15%</li>
                <li>• Bridge Project provides 24/7 supervision</li>
                <li>• Community contribution vs. resource drain</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Send Option */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg mb-12 border border-green-200">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">📧 Send Your Letter in 60 Seconds</h2>
            <p className="text-lg text-gray-600">
              Need to send a letter quickly? Our automated system personalizes and sends your letter immediately.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 max-w-2xl mx-auto">
            <form className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Your Name*"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Your Email*"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="City/State*"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">I Am A:</label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center">
                    <input type="radio" name="senderType" value="parent" className="mr-2" />
                    <span className="text-sm">Parent</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="senderType" value="educator" className="mr-2" />
                    <span className="text-sm">Educator</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="senderType" value="faith" className="mr-2" />
                    <span className="text-sm">Faith Leader</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="senderType" value="business" className="mr-2" />
                    <span className="text-sm">Business Owner</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="senderType" value="citizen" className="mr-2" />
                    <span className="text-sm">Concerned Citizen</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">My Message Focus:</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="messageFocus" value="delays" className="mr-2" />
                    <span className="text-sm">Developmental delays need treatment</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="messageFocus" value="time" className="mr-2" />
                    <span className="text-sm">11 years of punishment is enough</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="messageFocus" value="safety" className="mr-2" />
                    <span className="text-sm">Community safety through rehabilitation</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="messageFocus" value="economic" className="mr-2" />
                    <span className="text-sm">Economic sense of treatment vs prison</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label htmlFor="personalNote" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Personal Note (Optional):
                </label>
                <textarea
                  id="personalNote"
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Add any personal connection or additional thoughts..."
                />
              </div>
              
              <button
                type="button"
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-green-700 hover:to-blue-700 transition-colors"
              >
                📧 GENERATE & SEND MY LETTER
              </button>
              
              <p className="text-sm text-gray-600 text-center">
                Your letter will be personalized, sent to Judge Ferrero, and you'll receive a confirmation copy.
              </p>
            </form>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Letter Builder */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Build Your Letter</h2>
            
            {/* Template Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Step 1: Choose Your Template</h3>
              <div className="space-y-3">
                {templates.map((template) => (
                  <div key={template.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="radio"
                        name="template"
                        value={template.id}
                        checked={selectedTemplate === template.id}
                        onChange={(e) => setSelectedTemplate(e.target.value)}
                        className="mt-1 mr-3"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{template.name}</h4>
                        <p className="text-sm text-gray-600 mb-1">{template.description}</p>
                        <p className="text-xs text-blue-600">Best for: {template.audience}</p>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Step 2: Your Information</h3>
              
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Smith"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    Your City/State *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Orlando, FL"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Title/Profession
                </label>
                <input
                  type="text"
                  id="profession"
                  name="profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Teacher, Parent, Business Owner, etc."
                />
              </div>

              {/* Personal Connection Selection */}
              {selectedTemplate === 'personal' && (
                <div>
                  <label htmlFor="connection" className="block text-sm font-medium text-gray-700 mb-2">
                    Step 3: Choose Your Personal Connection
                  </label>
                  <select
                    id="connection"
                    name="connection"
                    value={formData.connection}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                  >
                    <option value="">Select your perspective...</option>
                    {templates[0].connections?.map((conn, connIndex) => (
                      <option key={`connection-${connIndex}`} value={conn}>{conn}</option>
                    ))}
                    <option value="custom">Write my own connection...</option>
                  </select>
                  
                  {formData.connection === 'custom' && (
                    <textarea
                      name="customConnection"
                      value={formData.customConnection}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Write your personal connection to JAHmere's case..."
                    />
                  )}
                </div>
              )}

              <button
                type="button"
                onClick={generateLetter}
                disabled={!formData.name || !formData.city || (selectedTemplate === 'personal' && !formData.connection)}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate My Letter
              </button>
            </div>
          </div>

          {/* Generated Letter Display */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Letter</h2>
            
            {showLetter ? (
              <div className="bg-gray-50 p-6 rounded-lg">
                                 <div className="mb-4 flex space-x-4">
                   <button
                     type="button"
                     onClick={copyToClipboard}
                     className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                   >
                     Copy to Clipboard
                   </button>
                   <button
                     type="button"
                     onClick={downloadLetter}
                     className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                   >
                     Download Letter
                   </button>
                 </div>
                
                <div className="bg-white p-6 rounded border">
                  <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800">
                    {generatedLetter}
                  </pre>
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                  <h4 className="font-semibold text-yellow-800 mb-2">Next Steps:</h4>
                  <ol className="text-sm text-yellow-700 space-y-1">
                    <li>1. Review and customize your letter as needed</li>
                    <li>2. Print or save the letter</li>
                    <li>3. Mail to Judge Ferrero before July 28th</li>
                    <li>4. Share JAHmere's story with others</li>
                  </ol>
                </div>
              </div>
            ) : (
              <div className="bg-gray-100 p-12 rounded-lg text-center">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Your Letter Will Appear Here
                </h3>
                <p className="text-gray-600">
                  Fill out the form on the left to generate your personalized letter to Judge Ferrero.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Mailing Information */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Send Your Letter</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-blue-600 mb-4">Mailing Address</h3>
              <div className="bg-white p-4 rounded border">
                <address className="not-italic">
                  <strong>The Honorable Judge Denise R. Ferrero</strong><br />
                  Orange County Courthouse<br />
                  425 N Orange Ave<br />
                  Orlando, FL 32801
                </address>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-4">Important Details</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Case Number:</strong> #2021-CF-007843</li>
                <li>• <strong>Deadline:</strong> Before July 28th court date</li>
                <li>• <strong>Format:</strong> Typed letters preferred</li>
                <li>• <strong>Length:</strong> Keep to one page maximum</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-12 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Every Voice Matters</h2>
            <p className="text-xl mb-8 text-blue-100">
              Your letter joins Tony Dungy and 13 character witnesses supporting JAHmere's transformation.
            </p>
            <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
              <Link 
                href="/witnesses"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                Read Character Witnesses
              </Link>
              <Link 
                href="/the-case"
                className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Review the Facts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 