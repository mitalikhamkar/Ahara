import React, { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { NUTRIENT_META } from '../data/foods';
import { Utensils, ScanLine, MessageSquareHeart, ArrowRight, Flame, Droplet, Beef, Wheat } from 'lucide-react';

function todaysKey(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

function sumMeals(mealsToday) {
  const total = { cal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0, sodium: 0, calcium: 0, iron: 0, vitc: 0, water: 0 };
  (mealsToday || []).forEach(m => {
    Object.keys(total).forEach(k => { total[k] += m.nutrition?.[k] || 0; });
  });
  return total;
}

function ProgressRow({ label, val, target, unit, color }) {
  const pct = Math.min(100, target ? (val / target) * 100 : 0);
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-ahara-ink">{label}</span>
        <span className="font-mono text-ahara-muted"><span className="text-ahara-ink">{Math.round(val)}</span> / {Math.round(target)} {unit}</span>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-ahara-mist overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

export default function DashboardHome() {
  const { user, meals } = useAuth();
  const key = todaysKey();
  const today = meals[key] || [];
  const totals = useMemo(() => sumMeals(today), [today]);
  const targets = user?.targets || {};

  const macros = [
    { key: 'cal', icon: Flame, label: 'Calories' },
    { key: 'protein', icon: Beef, label: 'Protein' },
    { key: 'carbs', icon: Wheat, label: 'Carbs' },
    { key: 'water', icon: Droplet, label: 'Water' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-8 stagger" data-testid="dashboard-home">
      {/* Hero cards */}
      <div className="grid md:grid-cols-4 gap-4">
        {macros.map(m => {
          const t = targets[m.key] || 0;
          const v = totals[m.key] || 0;
          const meta = NUTRIENT_META.find(x => x.key === m.key);
          const pct = t ? Math.min(100, (v / t) * 100) : 0;
          return (
            <div key={m.key} className="rounded-2xl bg-white border border-ahara-line p-5 lift" data-testid={`stat-${m.key}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm text-ahara-muted">{m.label}</span>
                <m.icon className="w-4 h-4 text-ahara-sage" />
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-mono text-3xl text-ahara-ink">{Math.round(v)}</span>
                <span className="text-xs text-ahara-muted">/ {Math.round(t)} {meta?.unit}</span>
              </div>
              <div className="mt-3 h-1 bg-ahara-mist rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, background: meta?.color || '#6FA67A' }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick actions + Nutrition panel */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 grid sm:grid-cols-3 gap-4">
          {[
            { to: '/app/meal-builder', icon: Utensils, t: 'Build a meal', d: 'Drag real foods onto your plate.' },
            { to: '/app/scanner', icon: ScanLine, t: 'Scan a label', d: 'Read any package instantly.' },
            { to: '/app/assistant', icon: MessageSquareHeart, t: 'Ask your coach', d: 'Get tailored suggestions.' },
          ].map(q => (
            <Link
              key={q.to} to={q.to}
              className="group rounded-2xl bg-white border border-ahara-line p-6 lift"
              data-testid={`quick-${q.to.split('/').pop()}`}
            >
              <div className="w-10 h-10 rounded-xl bg-ahara-sage/10 flex items-center justify-center">
                <q.icon className="w-5 h-5 text-ahara-sage" />
              </div>
              <div className="mt-4 font-heading text-lg text-ahara-ink">{q.t}</div>
              <p className="text-sm text-ahara-muted mt-1">{q.d}</p>
              <div className="mt-4 inline-flex items-center text-sm text-ahara-sage">
                Open <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
          <div className="sm:col-span-3 rounded-2xl bg-white border border-ahara-line p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-heading text-lg text-ahara-ink">Today's meals</div>
                <div className="text-sm text-ahara-muted">{today.length} logged</div>
              </div>
              <Link to="/app/meal-builder" className="text-sm text-ahara-sage hover:underline" data-testid="add-meal-link">Add meal →</Link>
            </div>
            <div className="mt-5 space-y-3">
              {today.length === 0 && (
                <div className="text-sm text-ahara-muted italic">No meals yet — start with breakfast.</div>
              )}
              {today.map(m => (
                <div key={m.id} className="flex items-center justify-between p-3 rounded-xl bg-ahara-mist/50 border border-ahara-line">
                  <div>
                    <div className="text-ahara-ink font-medium">{m.name}</div>
                    <div className="text-xs text-ahara-muted">{m.items.length} items · {new Date(m.when).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                  <div className="font-mono text-sm text-ahara-ink">{Math.round(m.nutrition.cal)} <span className="text-ahara-muted">kcal</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right nutrition panel */}
        <aside className="rounded-2xl bg-white border border-ahara-line p-6 space-y-4 h-fit lg:sticky lg:top-20" data-testid="nutrition-panel">
          <div>
            <div className="font-heading text-lg text-ahara-ink">Nutrition today</div>
            <div className="text-sm text-ahara-muted">Against your daily targets</div>
          </div>
          <div className="space-y-4">
            {NUTRIENT_META.map(n => (
              <ProgressRow key={n.key} label={n.label} val={totals[n.key] || 0} target={targets[n.key] || 0} unit={n.unit} color={n.color} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
