'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface OnboardingData {
  goal: string
  measurements: {
    height: string
    weight: string
  }
  activityLevel: string
  dietaryPreferences: string[]
  notes: string
}

export default function V0Onboarding() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<OnboardingData>({
    goal: '',
    measurements: {
      height: '',
      weight: ''
    },
    activityLevel: '',
    dietaryPreferences: [],
    notes: ''
  })

  const handleNext = () => {
    if (step < 5) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const updateData = (key: keyof OnboardingData, value: any) => {
    setData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-black via-zinc-900 to-black">
      <Card className="w-full max-w-2xl p-6 space-y-6">
        <div className="space-y-2">
          <Progress value={(step / 5) * 100} className="h-2" />
          <p className="text-sm text-muted-foreground text-center">
            Step {step} of 5
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">What's your primary goal?</h2>
                <RadioGroup
                  defaultValue={data.goal}
                  onValueChange={(value) => updateData('goal', value)}
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
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Your Measurements</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="Enter your height"
                      value={data.measurements.height}
                      onChange={(e) => updateData('measurements', { ...data.measurements, height: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="Enter your weight"
                      value={data.measurements.weight}
                      onChange={(e) => updateData('measurements', { ...data.measurements, weight: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Activity Level</h2>
                <RadioGroup
                  defaultValue={data.activityLevel}
                  onValueChange={(value) => updateData('activityLevel', value)}
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
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Dietary Preferences</h2>
                <div className="space-y-4">
                  {['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'keto'].map((pref) => (
                    <div key={pref} className="flex items-center space-x-2">
                      <Checkbox
                        id={pref}
                        checked={data.dietaryPreferences.includes(pref)}
                        onCheckedChange={(checked) => {
                          const newPrefs = checked
                            ? [...data.dietaryPreferences, pref]
                            : data.dietaryPreferences.filter(p => p !== pref)
                          updateData('dietaryPreferences', newPrefs)
                        }}
                      />
                      <Label htmlFor={pref} className="capitalize">
                        {pref.replace('-', ' ')}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Additional Notes</h2>
                <div className="space-y-2">
                  <Label htmlFor="notes">
                    Any specific dietary requirements, allergies, or preferences we should know about?
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Enter any additional information..."
                    value={data.notes}
                    onChange={(e) => updateData('notes', e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={step === 5}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  )
} 