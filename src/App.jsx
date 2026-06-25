import { useState } from 'react'
import WelcomePage from './pages/Welcomepage'
import CreateAccountPage from './pages/CreateAccountpage'
import LoginPage from './pages/Loginpage'
import DashboardPage from './pages/Dashboardpage'
import MealBuilderPage from './pages/MealBuilderpage'

function App() {
  const [currentPage, setCurrentPage] = useState('welcome')

  const nav = {
    toDashboard: () => setCurrentPage('dashboard'),
    toMealBuilder: () => setCurrentPage('meal-builder'),
    toWelcome: () => setCurrentPage('welcome'),
    toLogin: () => setCurrentPage('login'),
    toCreateAccount: () => setCurrentPage('create-account'),
  }

  if (currentPage === 'dashboard') return <DashboardPage onLogout={nav.toWelcome} onNav={nav} />
  if (currentPage === 'meal-builder') return <MealBuilderPage onNav={nav} />
  if (currentPage === 'create-account') return (
    <CreateAccountPage
      onBack={nav.toWelcome}
      onLoginClick={nav.toLogin}
      onComplete={nav.toDashboard}
    />
  )
  if (currentPage === 'login') return (
    <LoginPage
      onBack={nav.toWelcome}
      onCreateAccount={nav.toCreateAccount}
      onComplete={nav.toDashboard}
    />
  )
  return (
    <WelcomePage
      onCreateAccount={nav.toCreateAccount}
      onLogin={nav.toLogin}
    />
  )
}

export default App