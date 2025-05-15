'use client'

import { Card } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

interface Step1Props {
  onAnswer: (answer: string) => void
  answer?: string
}

export default function Step1({ onAnswer, answer }: Step1Props) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">What's your primary goal?</h2>
      <RadioGroup
        defaultValue={answer}
        onValueChange={onAnswer}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="weight-loss" id="weight-loss" />
          <Label htmlFor="weight-loss">Weight Loss</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="muscle-gain" id="muscle-gain" />
          <Label htmlFor="muscle-gain">Muscle Gain</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="maintenance" id="maintenance" />
          <Label htmlFor="maintenance">Maintenance</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="general-health" id="general-health" />
          <Label htmlFor="general-health">General Health</Label>
        </div>
      </RadioGroup>
    </Card>
  )
} 