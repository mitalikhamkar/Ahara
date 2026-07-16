import React, { useMemo, useRef, useState } from 'react';
import { FOODS, NUTRIENT_META } from '../data/foods';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Trash2, Plus, Save, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

function todaysKey(d = new Date()) { return d.toISOString().slice(0, 10); }

// deterministic pseudo-random position based on id + counter
function positionFor(idx, total) {
  // arrange on plate in a spiral-ish grid within radius
  const angle = (idx * 137.5) * (Math.PI / 180);
  const r = 20 + (idx / Math.max(1, total)) * 30; // % of plate radius
  const cx = 50 + Math.cos(angle) * r;
  const cy = 50 + Math.sin(angle) * r;
  return { left: `${cx}%`, top: `${cy}%` };
}

export default function MealBuilder() {
  const { user, addMeal } = useAuth();
  const [items, setItems] = useState([]); // [{foodId, qty}]
  const [mealName, setMealName] = useState('New meal');
  const dropRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const totals = useMemo(() => {
    const t = { cal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0, sodium: 0, calcium: 0, iron: 0, vitc: 0, water: 0 };
    items.forEach(({ foodId, qty }) => {
      const f = FOODS.find(x => x.id === foodId); if (!f) return;
      Object.keys(t).forEach(k => { t[k] += (f.n[k] || 0) * qty; });
    });
    return t;
  }, [items]);

  const targets = user?.targets || {};

  const onDrag = (e, foodId) => {
    e.dataTransfer.setData('text/plain', foodId);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const foodId = e.dataTransfer.getData('text/plain');
    if (!foodId) return;
    addItem(foodId);
  };

  const addItem = (foodId) => {
    setItems((prev) => {
      const existing = prev.find(p => p.foodId === foodId);
      if (existing) return prev.map(p => p.foodId === foodId ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { foodId, qty: 1 }];
    });
  };

  const changeQty = (foodId, delta) => {
    setItems(prev => prev.flatMap(p => {
      if (p.foodId !== foodId) return [p];
      const q = p.qty + delta;
      if (q <= 0) return [];
      return [{ ...p, qty: q }];
    }));
  };

  const removeItem = (foodId) => setItems(prev => prev.filter(p => p.foodId !== foodId));

  const saveMeal = () => {
    if (items.length === 0) return toast.error('Add some ingredients first');
    const meal = {
      id: `meal_${Date.now()}`,
      name: mealName || 'Meal',
      items,
      nutrition: totals,
      when: new Date().toISOString(),
    };
    addMeal(todaysKey(), meal);
    toast.success(`${meal.name} saved to today`);
    setItems([]);
    setMealName('New meal');
  };

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-10" data-testid="meal-builder-page">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-ahara-sage">Meal Builder</div>
          <h1 className="font-heading text-4xl text-ahara-ink mt-1">Compose your plate</h1>
          <p className="text-ahara-muted mt-1">Drag real ingredients onto the plate. Nutrition updates instantly.</p>
        </div>
        <div className="flex items-center gap-2">
          <Input value={mealName} onChange={(e)=>setMealName(e.target.value)} className="w-52 h-10" data-testid="meal-name-input" />
          <Button onClick={saveMeal} className="rounded-full bg-ahara-sage hover:bg-ahara-sage-dark text-white h-10 px-5" data-testid="save-meal-btn">
            <Save className="w-4 h-4 mr-2" /> Save to today
          </Button>
        </div>
      </div>

      {/* Ingredient rail */}
      <div className="mt-8">
        <div className="text-sm text-ahara-muted mb-3">Ingredients</div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2" data-testid="ingredient-gallery">
          {FOODS.map(f => (
            <div
              key={f.id}
              draggable
              onDragStart={(e) => onDrag(e, f.id)}
              onClick={() => addItem(f.id)}
              className="food-chip shrink-0 w-28 cursor-grab active:cursor-grabbing"
              data-testid={`food-${f.id}`}
            >
              <div className="w-28 h-28 rounded-2xl overflow-hidden border border-ahara-line bg-white">
                <img src={f.img} alt={f.name} className="w-full h-full object-cover" draggable={false} />
              </div>
              <div className="mt-2 text-xs text-ahara-ink text-center leading-tight">{f.name}</div>
              <div className="text-[10px] text-ahara-muted text-center">{f.unit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 grid lg:grid-cols-3 gap-8">
        {/* Plate */}
        <div className="lg:col-span-2">
          <div
            ref={dropRef}
            onDrop={onDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            className={`relative aspect-square max-w-[560px] mx-auto rounded-full plate transition-all duration-500 ${dragOver ? 'ring-4 ring-ahara-sage/40' : ''}`}
            data-testid="plate-drop-zone"
          >
            {items.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-center px-8 pointer-events-none">
                <div>
                  <Sparkles className="w-6 h-6 text-ahara-sage mx-auto" />
                  <p className="mt-3 font-heading text-lg text-ahara-ink">Drop ingredients here</p>
                  <p className="text-sm text-ahara-muted">Or tap an item above to add it.</p>
                </div>
              </div>
            )}
            {items.flatMap(({ foodId, qty }) => {
              const f = FOODS.find(x => x.id === foodId); if (!f) return [];
              return Array.from({ length: qty }).map((_, i) => ({ f, key: `${foodId}-${i}` }));
            }).map((entry, idx, arr) => {
              const pos = positionFor(idx, arr.length);
              return (
                <div
                  key={entry.key}
                  className="absolute w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden border-2 border-white shadow-md animate-fade-in-up"
                  style={{ ...pos }}
                  title={entry.f.name}
                >
                  <img src={entry.f.img} alt={entry.f.name} className="w-full h-full object-cover" />
                </div>
              );
            })}
          </div>

          {/* Item list */}
          <div className="mt-8 space-y-2">
            {items.map(({ foodId, qty }) => {
              const f = FOODS.find(x => x.id === foodId);
              if (!f) return null;
              return (
                <div key={foodId} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-ahara-line">
                  <img src={f.img} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  <div className="flex-1">
                    <div className="text-sm text-ahara-ink">{f.name}</div>
                    <div className="text-xs text-ahara-muted">{f.unit} × {qty}</div>
                  </div>
                  <div className="font-mono text-xs text-ahara-muted">{Math.round(f.n.cal * qty)} kcal</div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => changeQty(foodId, -1)} className="w-7 h-7 rounded-full bg-ahara-mist text-ahara-ink hover:bg-ahara-mist/80" data-testid={`qty-minus-${foodId}`}>−</button>
                    <button onClick={() => changeQty(foodId, 1)} className="w-7 h-7 rounded-full bg-ahara-sage/15 text-ahara-sage hover:bg-ahara-sage/25" data-testid={`qty-plus-${foodId}`}><Plus className="w-3 h-3 mx-auto" /></button>
                    <button onClick={() => removeItem(foodId)} className="w-7 h-7 rounded-full text-ahara-muted hover:bg-red-50 hover:text-red-500" data-testid={`remove-${foodId}`}><Trash2 className="w-3 h-3 mx-auto" /></button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nutrition sidebar */}
        <aside className="rounded-2xl bg-white border border-ahara-line p-6 h-fit lg:sticky lg:top-20" data-testid="builder-nutrition-panel">
          <div className="font-heading text-lg text-ahara-ink">This plate</div>
          <div className="text-sm text-ahara-muted">Live nutrition</div>
          <div className="mt-6 space-y-4">
            {NUTRIENT_META.map(n => {
              const val = totals[n.key] || 0;
              const target = targets[n.key] || 0;
              const pct = target ? Math.min(100, (val / target) * 100) : 0;
              return (
                <div key={n.key}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ahara-ink">{n.label}</span>
                    <span className="font-mono text-ahara-muted"><span className="text-ahara-ink">{val < 10 ? val.toFixed(1) : Math.round(val)}</span>{target ? ` / ${Math.round(target)}` : ''} {n.unit}</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-ahara-mist overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, background: n.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
