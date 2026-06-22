import React, { useState } from 'react'
import Step1Essentials from '../components/onboarding/Step1Essentials'
import Step2BodyMetrics from '../components/onboarding/Step2BodyMetrics'
import Step3ChooseGoal from '../components/onboarding/Step3ChooseGoal'
import Step4ActivityLevel from '../components/onboarding/Step4ActivityLevel'

const CreateAccountPage = ({ onBack }) => {
  const [step, setStep] = useState(1)

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
    else {
      // All steps done – handle final submission here
      alert('🎉 Profile created! Welcome to Ahara.')
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 md:p-8"
      style={{
        background: 'linear-gradient(135deg, #f5ede0 0%, #e8d5b7 50%, #d4e8c8 100%)',
      }}
    >
      <div className="w-full max-w-4xl">
        {step === 1 && <Step1Essentials onNext={handleNext} />}
        {step === 2 && <Step2BodyMetrics onNext={handleNext} />}
        {step === 3 && <Step3ChooseGoal onNext={handleNext} />}
        {step === 4 && <Step4ActivityLevel onNext={handleNext} />}
      </div>
    </div>
  )
}

export default CreateAccountPage