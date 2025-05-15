'use client'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Step2Props {
  onAnswer: (answer: { height: string; weight: string }) => void
  answer?: { height: string; weight: string }
}

export default function Step2({ onAnswer, answer }: Step2Props) {
  const handleChange = (field: 'height' | 'weight', value: string) => {
    onAnswer({
      height: field === 'height' ? value : answer?.height || '',
      weight: field === 'weight' ? value : answer?.weight || ''
    })
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Measurements</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            placeholder="Enter your height"
            value={answer?.height || ''}
            onChange={(e) => handleChange('height', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            placeholder="Enter your weight"
            value={answer?.weight || ''}
            onChange={(e) => handleChange('weight', e.target.value)}
          />
        </div>
      </div>
    </Card>
  )
} 