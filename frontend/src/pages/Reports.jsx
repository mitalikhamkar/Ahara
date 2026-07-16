import React, { useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from 'recharts';
import { useAuth } from '../context/AuthContext';

function last7Days() {
  const arr = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now); d.setDate(now.getDate() - i);
    arr.push(d);
  }
  return arr;
}

export default function Reports() {
  const { user, meals } = useAuth();
  const targets = user?.targets || {};

  const weekly = useMemo(() => last7Days().map(d => {
    const k = d.toISOString().slice(0, 10);
    const ms = meals[k] || [];
    const cal = ms.reduce((s, m) => s + (m.nutrition?.cal || 0), 0);
    const protein = ms.reduce((s, m) => s + (m.nutrition?.protein || 0), 0);
    return { day: d.toLocaleDateString([], { weekday: 'short' }), cal: Math.round(cal), protein: Math.round(protein) };
  }), [meals]);

  const weight = useMemo(() => {
    const base = user?.weight_kg || 70;
    return last7Days().map((d, i) => ({ day: d.toLocaleDateString([], { weekday: 'short' }), weight: +(base - i * 0.05 + (i % 2 ? 0.1 : -0.1)).toFixed(1) }));
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-8" data-testid="reports-page">
      <div>
        <div className="text-xs uppercase tracking-widest text-ahara-sage">Reports</div>
        <h1 className="font-heading text-4xl text-ahara-ink mt-1">Your trends</h1>
        <p className="text-ahara-muted mt-1">Weekly nutrition and weight, at a glance.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white border border-ahara-line p-6" data-testid="chart-calories">
          <div className="flex justify-between items-baseline">
            <div>
              <div className="font-heading text-lg text-ahara-ink">Calories · last 7 days</div>
              <div className="text-sm text-ahara-muted">Target {targets.cal || '-'} kcal / day</div>
            </div>
          </div>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weekly}>
                <defs>
                  <linearGradient id="gCal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6FA67A" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#6FA67A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="day" stroke="#667085" fontSize={12} />
                <YAxis stroke="#667085" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB' }} />
                <Area type="monotone" dataKey="cal" stroke="#6FA67A" strokeWidth={2} fill="url(#gCal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-ahara-line p-6" data-testid="chart-protein">
          <div className="font-heading text-lg text-ahara-ink">Protein · last 7 days</div>
          <div className="text-sm text-ahara-muted">Target {targets.protein || '-'} g / day</div>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weekly}>
                <defs>
                  <linearGradient id="gPr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7EA8D9" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#7EA8D9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="day" stroke="#667085" fontSize={12} />
                <YAxis stroke="#667085" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB' }} />
                <Area type="monotone" dataKey="protein" stroke="#7EA8D9" strokeWidth={2} fill="url(#gPr)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 rounded-2xl bg-white border border-ahara-line p-6" data-testid="chart-weight">
          <div className="font-heading text-lg text-ahara-ink">Weight trend</div>
          <div className="text-sm text-ahara-muted">Sample data — connect a scale later.</div>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weight}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="day" stroke="#667085" fontSize={12} />
                <YAxis stroke="#667085" fontSize={12} domain={['dataMin - 1', 'dataMax + 1']} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB' }} />
                <Line type="monotone" dataKey="weight" stroke="#C8A97E" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
