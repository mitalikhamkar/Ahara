//App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import DashboardLayout from './pages/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import MealBuilder from './pages/MealBuilder';
import Scanner from './pages/Scanner';
import CalendarPage from './pages/CalendarPage';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import Assistant from './pages/Assistant';
import './App.css';

function RequireAuth({ children }) {
  const { user, loaded } = useAuth();
  if (!loaded) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (!user.onboarded) return <Navigate to="/onboarding" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/onboarding" element={<Onboarding />} />

            <Route path="/app" element={<RequireAuth><DashboardLayout /></RequireAuth>}>
              <Route index element={<DashboardHome />} />
              <Route path="meal-builder" element={<MealBuilder />} />
              <Route path="scanner" element={<Scanner />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="reports" element={<Reports />} />
              <Route path="assistant" element={<Assistant />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster position="top-right" richColors closeButton />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
