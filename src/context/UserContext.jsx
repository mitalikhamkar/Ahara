import { createContext, useContext, useState } from 'react'

const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    dob: '',
    gender: 'Male',
    height: '175',
    weight: '70',
    goal: null,
    activityLevel: 'sedentary',
  })

  const updateUser = (data) => setUser(prev => ({ ...prev, ...data }))

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)