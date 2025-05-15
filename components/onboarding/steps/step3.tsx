'use client'

import { Card } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

interface Step3Props {
  onAnswer: (answer: string) => void
  answer?: string
}

export default function Step3({ onAnswer, answer }: Step3Props) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Activity Level</h2>
      <RadioGroup
        defaultValue={answer}
        onValueChange={onAnswer}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="sedentary" id="sedentary" />
          <Label htmlFor="sedentary">Sedentary (little or no exercise)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="light" id="light" />
          <Label htmlFor="light">Light (1-3 days/week)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="moderate" id="moderate" />
          <Label htmlFor="moderate">Moderate (3-5 days/week)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="active" id="active" />
          <Label htmlFor="active">Active (6-7 days/week)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="very-active" id="very-active" />
          <Label htmlFor="very-active">Very Active (daily exercise or physical job)</Label>
        </div>
      </RadioGroup>
    </Card>
  )
} 