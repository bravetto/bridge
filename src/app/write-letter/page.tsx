'use client'

import { useState } from 'react'
import Link from 'next/link'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { PageLayout } from '@/components/layout/site-navigation'

const templates = [
  {
    id: 'personal',
    name: 'Personal Connection',
    description: 'Share your personal perspective',
    audience: 'General public, personal connection',
    subject: 'Mercy for JAHmere Webb - Case #2021-CF-007843',
    connections: [
      'As a parent, I cannot imagine my child with developmental delays spending 11 years in prison',
      'As an educator, I\'ve worked with students like JAHmere who need support, not punishment',
      'As a person of faith, I believe in redemption and second chances',
      'As a community member, I want safety through treatment, not incarceration',
      'As a taxpayer, I support the $294,000 savings that treatment would provide',
      'As someone who believes in justice, this 25-year sentence for a cognitive 15-year-old is concerning'
    ]
  },
  {
    id: 'professional',
    name: 'Professional/Expert',
    description: 'Professional perspective on treatment alternatives',
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
    description: 'Public safety through treatment approach',
    audience: 'Community safety advocates',
    subject: 'Community Safety Through Treatment - JAHmere Webb Case #2021-CF-007843'
  }
]

function WriteLetterPage() {
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

My name is ${formData.name} from ${formData.city}. I am writing about JAHmere Webb, who faces sentencing.

${connection}

JAHmere entered the system at 21 with the documented mental capacity of a 15-year-old. Now 32, he has spent 11 years being punished for having a disability. This situation deserves reconsideration.

The Bridge Project offers immediate treatment, employment, and 24/7 supervision - a potential solution for everyone. I respectfully ask you to consider:

1. Acknowledging his developmental delays
2. Considering treatment over continued incarceration
3. Giving JAHmere the opportunity to contribute to society

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
    <PageLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Support Treatment Over Incarceration
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            Judge Ferrero can consider treatment alternatives. Your letter may help inform her decision.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Key Facts Banner */}
        <div className="bg-blue-50 p-6 rounded-lg mb-12 border-l-4 border-blue-500">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Case Context</h2>
          <div className="grid md:grid-cols-3 gap-6 text-blue-700">
            <div>
              <h3 className="font-semibold mb-2">Background</h3>
              <ul className="text-sm space-y-1">
                <li>• JAHmere: Age 21, mental age 15 at arrest</li>
                <li>• 11 years served</li>
                <li>• Tony Dungy supports his transformation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Economics</h3>
              <ul className="text-sm space-y-1">
                <li>• Prison: $403,200 over 14 years</li>
                <li>• Treatment: $109,200 over 14 years</li>
                <li>• Potential savings: $294,000</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Treatment Approach</h3>
              <ul className="text-sm space-y-1">
                <li>• Treatment may reduce recidivism</li>
                <li>• Bridge Project offers 24/7 supervision</li>
                <li>• Focus on community contribution</li>
              </ul>
            </div>
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
                    {templates[0].connections?.map((conn) => (
                      <option key={conn.slice(0, 20)} value={conn}>{conn}</option>
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
                    <li>3. Mail to Judge Ferrero</li>
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
                <li>• <strong>Timing:</strong> Submit as soon as possible</li>
                <li>• <strong>Format:</strong> Typed letters preferred</li>
                <li>• <strong>Length:</strong> Keep to one page maximum</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-12 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Community Support</h2>
            <p className="text-xl mb-8 text-blue-100">
              Your letter may join Tony Dungy and character witnesses supporting JAHmere's case.
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
                Review the Case
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default withErrorBoundary(WriteLetterPage, "WriteLetterPage") 