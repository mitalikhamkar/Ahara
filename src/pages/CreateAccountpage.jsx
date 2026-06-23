import React, { useState } from 'react'
import Step1Essentials from '../components/onboarding/Step1Essentials'
import Step2BodyMetrics from '../components/onboarding/Step2BodyMetrics'
import Step3ChooseGoal from '../components/onboarding/Step3ChooseGoal'
import Step4ActivityLevel from '../components/onboarding/Step4ActivityLevel'
import { useUser } from '../context/UserContext'

const CreateAccountPage = ({ onBack, onLoginClick, onComplete }) => {
  const [step, setStep] = useState(1)
  const { updateUser } = useUser()

  const handleNext = (data) => {
    if (data) updateUser(data)
    if (step < 4) setStep(step + 1)
    else onComplete()
  }

  const handleBack = () => {
    if (step === 1) onBack()
    else setStep(step - 1)
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '32px',
      background: 'linear-gradient(135deg, #f5ede0 0%, #e8d5b7 50%, #d4e8c8 100%)',
    }}>
      <div style={{ width: '100%', maxWidth: '900px' }}>
        {step === 1 && <Step1Essentials onNext={handleNext} onBack={handleBack} onLoginClick={onLoginClick} />}
        {step === 2 && <Step2BodyMetrics onNext={handleNext} onBack={handleBack} onLoginClick={onLoginClick} />}
        {step === 3 && <Step3ChooseGoal onNext={handleNext} onBack={handleBack} onLoginClick={onLoginClick} />}
        {step === 4 && <Step4ActivityLevel onNext={handleNext} onBack={handleBack} onLoginClick={onLoginClick} />}
      </div>
    </div>
  )
}

export default CreateAccountPage