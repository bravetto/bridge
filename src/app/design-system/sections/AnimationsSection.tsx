import { Card } from '@/components/ui/card'
import { Heading, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'

export default function AnimationsSection() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <Heading as="h2" size="h2" className="mb-4">CSS Animations</Heading>
        <Text variant="muted">Hardware-accelerated CSS animations</Text>
      </div>

      {/* Foundation Animations */}
      <Card className="p-8">
        <Heading as="h3" size="h3" className="mb-6">Foundation Animations</Heading>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-blue-50 rounded-lg slide-up">
            <Text variant="primary" className="font-semibold">Slide Up</Text>
            <Text size="sm" variant="muted">slide-up class</Text>
          </div>
          
          <div className="p-6 bg-green-50 rounded-lg fade-in">
            <Text variant="primary" className="font-semibold">Fade In</Text>
            <Text size="sm" variant="muted">fade-in class</Text>
          </div>
          
          <div className="p-6 bg-purple-50 rounded-lg scale-in">
            <Text variant="primary" className="font-semibold">Scale In</Text>
            <Text size="sm" variant="muted">scale-in class</Text>
          </div>
        </div>
      </Card>

      {/* Interactive Animations */}
      <Card className="p-8">
        <Heading as="h3" size="h3" className="mb-6">Interactive Feedback</Heading>
        <div className="space-y-6">
          <div>
            <Text variant="primary" className="font-semibold mb-3">Hover Effects</Text>
            <div className="flex flex-wrap gap-4">
              <Button className="hover-lift">Hover Lift</Button>
              <div className="p-4 bg-blue-50 rounded-lg hover-lift cursor-pointer">
                <Text>Card with Lift</Text>
              </div>
            </div>
          </div>
          
          <div>
            <Text variant="primary" className="font-semibold mb-3">Press Effects</Text>
            <div className="flex flex-wrap gap-4">
              <Button className="button-press">Press Effect</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Performance Notes */}
      <Card className="p-8 bg-green-50">
        <Heading as="h3" size="h3" className="mb-4">Performance Optimizations</Heading>
        <div className="space-y-3">
          <Text>• Hardware-accelerated with <code className="bg-white px-2 py-1 rounded">transform3d</code></Text>
          <Text>• Uses <code className="bg-white px-2 py-1 rounded">will-change</code> for GPU optimization</Text>
          <Text>• CSS-only animations (no JavaScript frameworks)</Text>
          <Text>• Respects <code className="bg-white px-2 py-1 rounded">prefers-reduced-motion</code> accessibility</Text>
        </div>
      </Card>
    </div>
  )
}