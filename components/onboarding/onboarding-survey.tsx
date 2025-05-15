'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Import your step components
import Step1 from './steps/step1'
import Step2 from './steps/step2'
import Step3 from './steps/step3'
import Step4 from './steps/step4'
import Step5 from './steps/step5'

const steps = [
  { id: 1, component: Step1 },
  { id: 2, component: Step2 },
  { id: 3, component: Step3 },
  { id: 4, component: Step4 },
  { id: 5, component: Step5 }
]

export default function OnboardingSurvey() {
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState({})
  const totalSteps = steps.length

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleAnswer = (stepId: number, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [stepId]: answer
    }))
  }

  const CurrentStepComponent = steps[currentStep - 1].component

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-6 space-y-6">
        <div className="space-y-2">
          <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
          <p className="text-sm text-muted-foreground text-center">
            Step {currentStep} of {totalSteps}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <CurrentStepComponent
              onAnswer={(answer) => handleAnswer(currentStep, answer)}
              answer={answers[currentStep]}
            />
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentStep === totalSteps}
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