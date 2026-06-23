import { useState } from 'react'
import WelcomePage from './pages/Welcomepage'
import CreateAccountPage from './pages/CreateAccountPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'

function App() {
  const [currentPage, setCurrentPage] = useState('welcome')

  if (currentPage === 'dashboard') return <DashboardPage onLogout={() => setCurrentPage('welcome')} />
  if (currentPage === 'create-account') return (
    <CreateAccountPage
      onBack={() => setCurrentPage('welcome')}
      onLoginClick={() => setCurrentPage('login')}
      onComplete={() => setCurrentPage('dashboard')}
    />
  )
  if (currentPage === 'login') return (
    <LoginPage
      onBack={() => setCurrentPage('welcome')}
      onCreateAccount={() => setCurrentPage('create-account')}
      onComplete={() => setCurrentPage('dashboard')}
    />
  )
  return (
    <WelcomePage
      onCreateAccount={() => setCurrentPage('create-account')}
      onLogin={() => setCurrentPage('login')}
    />
  )
}

export default App