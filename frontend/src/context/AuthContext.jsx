import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { computeTargets } from '../data/foods';

const AuthCtx = createContext(null);

const KEY_USER = 'ahara_user';
const KEY_MEALS = 'ahara_meals';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [meals, setMeals] = useState({}); // { 'YYYY-MM-DD': [ { id, name, items:[{foodId,qty}], nutrition:{...}, when } ] }
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const u = localStorage.getItem(KEY_USER);
      const m = localStorage.getItem(KEY_MEALS);
      if (u) setUser(JSON.parse(u));
      if (m) setMeals(JSON.parse(m));
    } catch (e) { /* ignore */ }
    setLoaded(true);
  }, []);

  const persistUser = (u) => {
    setUser(u);
    if (u) localStorage.setItem(KEY_USER, JSON.stringify(u));
    else localStorage.removeItem(KEY_USER);
  };

  const persistMeals = useCallback((next) => {
    setMeals(next);
    localStorage.setItem(KEY_MEALS, JSON.stringify(next));
  }, []);

  const login = (email) => {
    // mock login: if we already have a user with this email, use it. Else create minimal shell.
    const existing = user && user.email === email ? user : { email, name: email.split('@')[0], onboarded: false };
    persistUser(existing);
    return existing;
  };

  const signup = (basic) => {
    // basic: {name, email}
    const u = { ...basic, onboarded: false };
    persistUser(u);
    return u;
  };

  const completeOnboarding = (profile) => {
    const targets = computeTargets(profile);
    const u = { ...(user || {}), ...profile, targets, onboarded: true };
    persistUser(u);
    return u;
  };

  const logout = () => {
    persistUser(null);
  };

  const addMeal = (dateKey, meal) => {
    const next = { ...meals, [dateKey]: [...(meals[dateKey] || []), meal] };
    persistMeals(next);
  };

  const removeMeal = (dateKey, mealId) => {
    const next = { ...meals, [dateKey]: (meals[dateKey] || []).filter(m => m.id !== mealId) };
    persistMeals(next);
  };

  return (
    <AuthCtx.Provider value={{ user, loaded, login, signup, completeOnboarding, logout, meals, addMeal, removeMeal }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
