'use client'

import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface Step5Props {
  onAnswer: (answer: string) => void
  answer?: string
}

export default function Step5({ onAnswer, answer }: Step5Props) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Additional Notes</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="notes">
            Any specific dietary requirements, allergies, or preferences we should know about?
          </Label>
          <Textarea
            id="notes"
            placeholder="Enter any additional information..."
            value={answer || ''}
            onChange={(e) => onAnswer(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </div>
    </Card>
  )
} 