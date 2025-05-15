import { Suspense } from 'react'
import V0Onboarding from '@/components/onboarding/v0-onboarding'
import Loading from '../loading'

export default function OnboardingPage() {
  return (
    <Suspense fallback={<Loading />}>
      <V0Onboarding />
    </Suspense>
  )
} 