import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { ScanLine, Check, Upload } from 'lucide-react';

const MOCK_PACKAGE = 'https://images.unsplash.com/photo-1584473457406-6240486418e9?auto=format&fit=crop&w=1000&q=85';

const MOCK_RESULT = {
  name: 'Organic Rolled Oats',
  brand: "Nature's Kitchen",
  serving: '40 g (½ cup)',
  nutrition: [
    { k: 'Calories', v: 154, u: 'kcal' },
    { k: 'Protein', v: 5.4, u: 'g' },
    { k: 'Carbohydrates', v: 27, u: 'g' },
    { k: 'Fat', v: 2.5, u: 'g' },
    { k: 'Fiber', v: 4, u: 'g' },
    { k: 'Sugar', v: 1.1, u: 'g' },
    { k: 'Sodium', v: 9, u: 'mg' },
  ],
  ingredients: 'Whole grain oats.',
  score: 'A',
};

export default function Scanner() {
  const [state, setState] = useState('idle'); // idle | scanning | done
  const [result, setResult] = useState(null);

  const startScan = () => {
    setState('scanning');
    setResult(null);
    setTimeout(() => { setResult(MOCK_RESULT); setState('done'); }, 2200);
  };

  const reset = () => { setState('idle'); setResult(null); };

  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-10" data-testid="scanner-page">
      <div className="text-xs uppercase tracking-widest text-ahara-sage">Food Scanner</div>
      <h1 className="font-heading text-4xl text-ahara-ink mt-1">Scan any package</h1>
      <p className="text-ahara-muted mt-1">Ahara reads the label and translates it into simple truths.</p>

      <div className="mt-8 grid lg:grid-cols-2 gap-8">
        <div className="relative rounded-3xl overflow-hidden border border-ahara-line bg-black aspect-[4/5] max-w-md">
          <img src={MOCK_PACKAGE} alt="Package to scan" className="w-full h-full object-cover" />
          {state === 'scanning' && (
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
              <div className="absolute inset-x-4 rounded-full h-1 bg-ahara-sage/70 shadow-[0_0_20px_rgba(111,166,122,0.9)] animate-scan-line" />
              <div className="absolute bottom-4 left-4 right-4 glass rounded-2xl px-4 py-3 text-white">
                <div className="text-xs opacity-80">Analyzing package...</div>
                <div className="font-heading">Reading nutrition label</div>
              </div>
            </>
          )}
          {state === 'done' && (
            <div className="absolute inset-0 flex items-end p-4">
              <div className="glass rounded-2xl px-4 py-3 text-white">
                <Check className="w-5 h-5 inline mr-2 text-ahara-sage" />
                <span className="font-heading">Recognized</span>
              </div>
            </div>
          )}
          {/* corner brackets */}
          <div className="absolute inset-6 pointer-events-none">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white/70 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white/70 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white/70 rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white/70 rounded-br-lg" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={startScan} disabled={state === 'scanning'} className="rounded-full bg-ahara-sage hover:bg-ahara-sage-dark text-white h-11 px-5" data-testid="scan-start-btn">
              <ScanLine className="w-4 h-4 mr-2" /> {state === 'scanning' ? 'Scanning…' : 'Scan sample'}
            </Button>
            <Button variant="outline" className="rounded-full h-11 px-5 border-ahara-line text-ahara-ink hover:bg-ahara-mist" data-testid="scan-upload-btn">
              <Upload className="w-4 h-4 mr-2" /> Upload photo
            </Button>
            {state === 'done' && (
              <Button variant="ghost" onClick={reset} className="text-ahara-muted" data-testid="scan-reset-btn">Reset</Button>
            )}
          </div>

          <div className="rounded-2xl bg-white border border-ahara-line p-6 min-h-[380px]" data-testid="scan-result">
            {!result && state !== 'scanning' && (
              <div className="text-ahara-muted text-sm">Tap "Scan sample" to try Ahara's food recognition on a mock package.</div>
            )}
            {state === 'scanning' && (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-3 rounded-full bg-ahara-mist overflow-hidden">
                    <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white to-transparent animate-shine" style={{ backgroundSize: '200% 100%' }} />
                  </div>
                ))}
              </div>
            )}
            {result && (
              <div className="animate-fade-in-up">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs text-ahara-muted">{result.brand}</div>
                    <div className="font-heading text-2xl text-ahara-ink">{result.name}</div>
                    <div className="text-sm text-ahara-muted mt-1">Serving: {result.serving}</div>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-ahara-sage text-white grid place-items-center font-heading text-xl">{result.score}</div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {result.nutrition.map(n => (
                    <div key={n.k} className="p-3 rounded-xl bg-ahara-mist/50 border border-ahara-line">
                      <div className="text-xs text-ahara-muted">{n.k}</div>
                      <div className="font-mono text-ahara-ink text-lg">{n.v} <span className="text-xs text-ahara-muted">{n.u}</span></div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-xs text-ahara-muted">Ingredients: {result.ingredients}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
