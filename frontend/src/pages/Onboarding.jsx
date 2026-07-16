import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Leaf, ChevronRight, ChevronLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const STEPS = [
  { key: 'name', title: 'What should we call you?', field: 'name', type: 'text', placeholder: 'Your name' },
  { key: 'age', title: 'How old are you?', field: 'age', type: 'number', placeholder: '28' },
  { key: 'gender', title: 'Gender', field: 'gender', options: ['male', 'female', 'other'] },
  { key: 'height', title: 'Height (cm)', field: 'height_cm', type: 'number', placeholder: '170' },
  { key: 'weight', title: 'Current weight (kg)', field: 'weight_kg', type: 'number', placeholder: '70' },
  { key: 'activity', title: 'Activity level', field: 'activity_level',
    options: [
      { v: 'sedentary', l: 'Sedentary — mostly sitting' },
      { v: 'light', l: 'Light — 1-2 sessions/wk' },
      { v: 'moderate', l: 'Moderate — 3-4 sessions/wk' },
      { v: 'active', l: 'Active — 5+ sessions/wk' },
      { v: 'athlete', l: 'Athlete — daily training' },
    ]
  },
  { key: 'goal', title: 'Your goal', field: 'goal',
    options: [
      { v: 'lose', l: 'Lose fat' },
      { v: 'maintain', l: 'Maintain' },
      { v: 'muscle', l: 'Build muscle' },
      { v: 'health', l: 'Overall health' },
    ]
  },
  { key: 'food', title: 'Food preference', field: 'food_preference',
    options: [
      { v: 'omnivore', l: 'Omnivore' },
      { v: 'vegetarian', l: 'Vegetarian' },
      { v: 'vegan', l: 'Vegan' },
      { v: 'pescatarian', l: 'Pescatarian' },
    ]
  },
];

export default function Onboarding() {
  const { user, completeOnboarding } = useAuth();
  const nav = useNavigate();
  const [idx, setIdx] = useState(0);
  const [data, setData] = useState({ name: user?.name || '' });

  const step = STEPS[idx];
  const value = data[step.field] ?? '';

  const setValue = (v) => setData({ ...data, [step.field]: v });

  const next = () => {
    if (value === '' || value === undefined) return toast.error('Please provide a value');
    if (idx === STEPS.length - 1) {
      const clean = {
        ...data,
        age: Number(data.age),
        height_cm: Number(data.height_cm),
        weight_kg: Number(data.weight_kg),
      };
      completeOnboarding(clean);
      toast.success('Your daily targets are ready');
      nav('/app');
    } else {
      setIdx(idx + 1);
    }
  };

  const back = () => setIdx(Math.max(0, idx - 1));
  const pct = ((idx + 1) / STEPS.length) * 100;

  const renderInput = () => {
    if (step.options) {
      const opts = step.options.map(o => (typeof o === 'string' ? { v: o, l: o[0].toUpperCase() + o.slice(1) } : o));
      return (
        <div className="grid gap-3 mt-6">
          {opts.map(o => (
            <button
              type="button"
              key={o.v}
              onClick={() => setValue(o.v)}
              className={`text-left px-5 py-4 rounded-2xl border transition-all duration-300 ${value === o.v ? 'border-ahara-sage bg-ahara-sage/5 text-ahara-ink' : 'border-ahara-line bg-white hover:bg-ahara-mist text-ahara-ink'}`}
              data-testid={`onboarding-option-${o.v}`}
            >
              <div className="font-heading">{o.l}</div>
            </button>
          ))}
        </div>
      );
    }
    return (
      <div className="mt-6">
        <Label className="text-ahara-ink">{step.title}</Label>
        <Input
          autoFocus
          type={step.type || 'text'}
          value={value}
          placeholder={step.placeholder}
          onChange={(e) => setValue(step.type === 'number' ? e.target.value : e.target.value)}
          className="mt-2 h-12 text-lg"
          data-testid={`onboarding-input-${step.field}`}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-ahara-bg flex items-center justify-center p-6" data-testid="onboarding-page">
      <div className="w-full max-w-lg">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-9 h-9 rounded-xl bg-ahara-sage/15 flex items-center justify-center"><Leaf className="w-5 h-5 text-ahara-sage" /></div>
          <span className="font-heading text-xl text-ahara-ink">Ahara</span>
        </div>
        <div className="rounded-3xl bg-white border border-ahara-line p-8 shadow-sm animate-fade-in-up">
          <div className="h-1 rounded-full bg-ahara-mist overflow-hidden">
            <div className="h-full bg-ahara-sage transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-1 text-xs text-ahara-muted">Step {idx + 1} of {STEPS.length}</div>
          <h2 className="font-heading text-3xl text-ahara-ink mt-4">{step.title}</h2>
          {renderInput()}
          <div className="mt-8 flex justify-between">
            <Button variant="ghost" onClick={back} disabled={idx === 0} data-testid="onboarding-back-btn"><ChevronLeft className="w-4 h-4 mr-1" />Back</Button>
            <Button onClick={next} className="rounded-full bg-ahara-sage hover:bg-ahara-sage-dark text-white px-6" data-testid="onboarding-next-btn">
              {idx === STEPS.length - 1 ? 'Finish' : 'Continue'} <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
