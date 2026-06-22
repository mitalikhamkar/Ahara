import { useState } from 'react'
import WelcomePage from './pages/WelcomePage'
import CreateAccountPage from './pages/CreateAccountPage'

function App() {
  const [currentPage, setCurrentPage] = useState('welcome')

  if (currentPage === 'create-account') {
    return <CreateAccountPage onBack={() => setCurrentPage('welcome')} />
  }

  return <WelcomePage onCreateAccount={() => setCurrentPage('create-account')} />
}

export default App