import React, { useState } from 'react';
import { Calendar as CalendarUI } from '../components/ui/calendar';
import { useAuth } from '../context/AuthContext';
import { FOODS } from '../data/foods';

function keyFor(d) { return d.toISOString().slice(0, 10); }

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const { meals } = useAuth();
  const dayMeals = meals[keyFor(date)] || [];

  const totalCal = dayMeals.reduce((s, m) => s + (m.nutrition?.cal || 0), 0);

  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-10" data-testid="calendar-page">
      <div className="text-xs uppercase tracking-widest text-ahara-sage">Calendar</div>
      <h1 className="font-heading text-4xl text-ahara-ink mt-1">Your month, on a plate</h1>
      <p className="text-ahara-muted mt-1">Click any day to see what you ate.</p>

      <div className="mt-8 grid lg:grid-cols-2 gap-8">
        <div className="rounded-2xl bg-white border border-ahara-line p-4">
          <CalendarUI
            mode="single"
            selected={date}
            onSelect={(d) => d && setDate(d)}
            className="mx-auto"
          />
        </div>
        <div className="rounded-2xl bg-white border border-ahara-line p-6" data-testid="day-detail">
          <div className="font-heading text-2xl text-ahara-ink">{date.toDateString()}</div>
          <div className="mt-1 text-sm text-ahara-muted">{dayMeals.length} meals · {Math.round(totalCal)} kcal</div>
          <div className="mt-6 space-y-3">
            {dayMeals.length === 0 && (
              <div className="text-sm text-ahara-muted italic">No meals logged for this day.</div>
            )}
            {dayMeals.map(m => (
              <div key={m.id} className="p-4 rounded-xl bg-ahara-mist/50 border border-ahara-line">
                <div className="flex items-center justify-between">
                  <div className="text-ahara-ink font-medium">{m.name}</div>
                  <div className="font-mono text-sm text-ahara-ink">{Math.round(m.nutrition.cal)} kcal</div>
                </div>
                <div className="mt-2 flex gap-2 flex-wrap">
                  {m.items.map(({ foodId, qty }) => {
                    const f = FOODS.find(x => x.id === foodId);
                    return f ? (
                      <span key={foodId} className="text-xs px-2 py-1 rounded-full bg-white border border-ahara-line text-ahara-muted">
                        {f.name} × {qty}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
