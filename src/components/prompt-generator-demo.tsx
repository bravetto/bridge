'use client'

import { Container } from '@/components/ui/container'
import { Card } from '@/components/ui/card'
import { Heading, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { FileText, Copy, Send } from 'lucide-react'

function PromptGeneratorDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <Container className="py-20">
        <div className="text-center mb-12">
          <Heading as="h1" size="h1" className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Letter Template Generator
          </Heading>
          <Text className="text-xl text-slate-600 max-w-3xl mx-auto">
            Generate personalized letters to Judge Ferrero for JAHmere's case
          </Text>
        </div>

        <Card className="p-8 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Heading as="h3" size="h3" className="text-xl font-semibold text-slate-900 mb-4">
                Letter Templates
              </Heading>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Personal Connection Template
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Facts & Economics Template
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Faith-Based Template
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Quick Email Template
                </Button>
              </div>
            </div>

            <div>
              <Heading as="h3" size="h3" className="text-xl font-semibold text-slate-900 mb-4">
                Actions
              </Heading>
              <div className="space-y-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Template
                </Button>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Send className="w-4 h-4 mr-2" />
                  Send Letter
                </Button>
              </div>
              
              <div className="mt-8 p-4 bg-slate-50 rounded-lg">
                <Text className="text-sm text-slate-600">
                  <strong>8,421 letters</strong> have been sent to Judge Ferrero. 
                  Join the movement for JAHmere's freedom.
                </Text>
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  )
}

export default withErrorBoundary(PromptGeneratorDemo, "PromptGeneratorDemo") 