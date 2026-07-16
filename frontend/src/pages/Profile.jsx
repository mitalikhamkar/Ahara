import React from 'react';
import { useAuth } from '../context/AuthContext';
import { NUTRIENT_META } from '../data/foods';
import { Award, Flame, Star, TrendingUp } from 'lucide-react';

export default function Profile() {
  const { user, logout } = useAuth();
  if (!user) return null;
  const targets = user.targets || {};

  const info = [
    ['Name', user.name],
    ['Email', user.email],
    ['Age', user.age],
    ['Gender', user.gender],
    ['Height', user.height_cm ? `${user.height_cm} cm` : '-'],
    ['Weight', user.weight_kg ? `${user.weight_kg} kg` : '-'],
    ['Activity', user.activity_level],
    ['Goal', user.goal],
    ['Diet', user.food_preference],
  ];

  const achievements = [
    { icon: Flame, t: 'Streak starter', d: 'Logged 3 days in a row.' },
    { icon: Star, t: 'Balanced plate', d: 'Hit protein target once.' },
    { icon: TrendingUp, t: 'On the rise', d: 'Increased fiber intake.' },
    { icon: Award, t: 'Explorer', d: 'Tried 5 new ingredients.' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-10 space-y-8" data-testid="profile-page">
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-ahara-sage/15 text-ahara-sage grid place-items-center font-heading text-3xl">
          {(user.name || 'A')[0].toUpperCase()}
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-ahara-sage">Profile</div>
          <h1 className="font-heading text-4xl text-ahara-ink">{user.name}</h1>
          <div className="text-sm text-ahara-muted">{user.email}</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <section className="rounded-2xl bg-white border border-ahara-line p-6">
          <div className="font-heading text-lg text-ahara-ink">Personal information</div>
          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            {info.map(([k, v]) => (
              <React.Fragment key={k}>
                <div className="text-ahara-muted">{k}</div>
                <div className="text-ahara-ink">{v || '-'}</div>
              </React.Fragment>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-white border border-ahara-line p-6" data-testid="profile-targets">
          <div className="font-heading text-lg text-ahara-ink">Daily nutrition targets</div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {NUTRIENT_META.map(n => (
              <div key={n.key} className="p-3 rounded-xl bg-ahara-mist/50 border border-ahara-line">
                <div className="text-xs text-ahara-muted">{n.label}</div>
                <div className="font-mono text-ahara-ink text-lg">{Math.round(targets[n.key] || 0)} <span className="text-xs text-ahara-muted">{n.unit}</span></div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-white border border-ahara-line p-6 lg:col-span-2">
          <div className="font-heading text-lg text-ahara-ink">Achievements</div>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {achievements.map((a, i) => (
              <div key={i} className="p-4 rounded-xl bg-white border border-ahara-line lift">
                <a.icon className="w-5 h-5 text-ahara-sage" />
                <div className="mt-3 font-heading text-ahara-ink">{a.t}</div>
                <div className="text-sm text-ahara-muted">{a.d}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-white border border-ahara-line p-6 lg:col-span-2">
          <div className="font-heading text-lg text-ahara-ink">Settings</div>
          <div className="mt-3 text-sm text-ahara-muted">Preferences and account controls will live here.</div>
          <button onClick={logout} className="mt-5 px-4 py-2 rounded-full text-sm text-red-600 border border-red-200 hover:bg-red-50 transition-colors" data-testid="profile-logout-btn">Log out</button>
        </section>
      </div>
    </div>
  );
}
