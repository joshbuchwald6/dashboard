'use client'

import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface Step4Props {
  onAnswer: (answer: string[]) => void
  answer?: string[]
}

export default function Step4({ onAnswer, answer = [] }: Step4Props) {
  const handleChange = (value: string, checked: boolean) => {
    if (checked) {
      onAnswer([...answer, value])
    } else {
      onAnswer(answer.filter(item => item !== value))
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dietary Preferences</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="vegetarian"
            checked={answer.includes('vegetarian')}
            onCheckedChange={(checked) => handleChange('vegetarian', checked as boolean)}
          />
          <Label htmlFor="vegetarian">Vegetarian</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="vegan"
            checked={answer.includes('vegan')}
            onCheckedChange={(checked) => handleChange('vegan', checked as boolean)}
          />
          <Label htmlFor="vegan">Vegan</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="gluten-free"
            checked={answer.includes('gluten-free')}
            onCheckedChange={(checked) => handleChange('gluten-free', checked as boolean)}
          />
          <Label htmlFor="gluten-free">Gluten Free</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="dairy-free"
            checked={answer.includes('dairy-free')}
            onCheckedChange={(checked) => handleChange('dairy-free', checked as boolean)}
          />
          <Label htmlFor="dairy-free">Dairy Free</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="keto"
            checked={answer.includes('keto')}
            onCheckedChange={(checked) => handleChange('keto', checked as boolean)}
          />
          <Label htmlFor="keto">Keto</Label>
        </div>
      </div>
    </Card>
  )
} 