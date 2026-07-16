//Landing.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import {
  Leaf, ArrowRight, Play, ScanLine, LineChart, Utensils, Check, UserPlus, LayoutGrid, Sparkles,
} from 'lucide-react';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '../components/ui/accordion';
import { Dialog, DialogContent, DialogTrigger } from '../components/ui/dialog';
import { useAuth } from '../context/AuthContext';
import HeroMealPreview from '../components/landing/HeroMealPreview';
import AICoachPreview from '../components/landing/AICoachPreview';
import {
  MealBuilderIllustration, ScannerIllustration, AnalyticsIllustration,
} from '../components/landing/FeatureIllustrations';

const NAV = [
  { label: 'Features', href: '#features' },
  { label: 'AI Nutrition', href: '#ai' },
  { label: 'How it Works', href: '#how' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
];

const EASE = [0.16, 1, 0.3, 1];

function Reveal({ children, delay = 0, className = '', y = 24 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on(); window.addEventListener('scroll', on);
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'glass shadow-sm' : ''}`} data-testid="landing-nav">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2" data-testid="brand-home">
          <div className="w-9 h-9 rounded-xl bg-ahara-sage/15 flex items-center justify-center">
            <Leaf className="w-5 h-5 text-ahara-sage" />
          </div>
          <span className="font-heading text-xl font-semibold text-ahara-ink">Ahara</span>
          <span className="hidden sm:inline text-xs text-ahara-muted ml-1">आहार</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="nav-link text-sm text-ahara-ink/80 hover:text-ahara-ink transition-colors"
              data-testid={`nav-${n.label.toLowerCase().replace(/\s/g, '-')}`}
            >
              {n.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link to="/login"><Button variant="ghost" className="text-ahara-ink hover:bg-ahara-mist" data-testid="nav-login-btn">Log In</Button></Link>
          <Link to="/signup"><Button className="btn-ripple bg-ahara-ink text-white hover:bg-ahara-ink/90 rounded-full px-5" data-testid="nav-create-account-btn">Create Account</Button></Link>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const nav = useNavigate();
  return (
    <section className="relative pt-40 pb-24 overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] hero-orb" />
      <div className="absolute top-20 right-0 w-[420px] h-[420px] hero-orb" style={{ background: 'radial-gradient(closest-side, rgba(126,168,217,0.28), transparent 70%)' }} />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 stagger">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-ahara-line text-xs text-ahara-muted">
            <Sparkles className="w-3.5 h-3.5 text-ahara-sage" />
            <span>Your AI Nutrition Companion</span>
          </div>
          <h1 className="mt-6 font-heading font-semibold text-5xl sm:text-6xl lg:text-7xl tracking-tight text-ahara-ink leading-[1.02]">
            Your body deserves<br /> better nutrition,<br />
            <span className="italic text-ahara-sage">not better guessing.</span>
          </h1>
          <p className="mt-6 text-lg text-ahara-muted max-w-xl leading-relaxed">
            Ahara is an intelligent nutrition assistant that helps you build meals, understand what you eat,
            and reach your goals — beautifully, in seconds.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              onClick={() => nav('/signup')}
              className="btn-ripple bg-ahara-sage hover:bg-ahara-sage-dark text-white rounded-full h-12 px-6 text-base"
              data-testid="hero-start-btn"
            >
              Start Building Better Meals
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="btn-ripple rounded-full h-12 px-5 border-ahara-line text-ahara-ink hover:bg-ahara-mist" data-testid="hero-watch-demo-btn">
                  <Play className="w-4 h-4 mr-2" /> Watch Demo
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl bg-ahara-ink border-none p-0 overflow-hidden rounded-3xl">
                <div className="relative aspect-video bg-gradient-to-br from-[#1F2933] to-[#2A3540] flex items-center justify-center">
                  <div className="absolute inset-0 opacity-[0.06] grain" />
                  <button
                    type="button"
                    className="group relative z-10 flex flex-col items-center gap-4"
                    data-testid="demo-play-btn"
                  >
                    <span className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
                      <Play className="w-7 h-7 text-white ml-1" fill="white" />
                    </span>
                    <span className="text-white/90 font-heading text-lg">A tour of Ahara</span>
                    <span className="text-white/50 text-sm">2 min · Meal builder, scanner &amp; coach</span>
                  </button>
                  <div className="absolute bottom-5 inset-x-5 flex items-center gap-3">
                    <div className="flex-1 h-1 rounded-full bg-white/15 overflow-hidden">
                      <div className="h-full w-1/3 bg-ahara-sage rounded-full" />
                    </div>
                    <span className="text-white/50 text-xs font-mono">0:41 / 2:00</span>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="lg:col-span-6 relative">
          <HeroMealPreview />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ Illustration, icon: Icon, title, desc, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="feature-card lift group rounded-3xl glass p-7 h-full flex flex-col" data-testid={`feature-card-${title.toLowerCase().replace(/\s/g, '-')}`}>
        <div className="rounded-2xl bg-white border border-ahara-line overflow-hidden h-44 mb-6">
          <Illustration />
        </div>
        <div className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-ahara-mist border border-ahara-line mb-4">
          <Icon className="w-5 h-5 text-ahara-sage" />
        </div>
        <h3 className="font-heading text-2xl font-semibold text-ahara-ink tracking-tight">{title}</h3>
        <p className="mt-3 text-ahara-muted leading-relaxed text-sm">{desc}</p>
      </div>
    </Reveal>
  );
}

function Features() {
  return (
    <section id="features" className="py-24 max-w-7xl mx-auto px-6">
      <Reveal className="max-w-2xl">
        <p className="text-sm uppercase tracking-widest text-ahara-sage font-medium">Features</p>
        <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-ahara-ink mt-3">Nutrition, made obvious.</h2>
      </Reveal>
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <FeatureCard
          Illustration={MealBuilderIllustration}
          icon={Utensils}
          title="AI Meal Builder"
          desc="Drag real food onto a real plate. See exactly how each ingredient shifts your day — calories, protein, fiber, micros — in real time."
          delay={0}
        />
        <FeatureCard
          Illustration={ScannerIllustration}
          icon={ScanLine}
          title="Food Scanner"
          desc="Point at any package or plate. Ahara reads the label, understands the ingredients, and answers the only question that matters: is this good for me, today?"
          delay={0.1}
        />
        <FeatureCard
          Illustration={AnalyticsIllustration}
          icon={LineChart}
          title="Nutrition Analytics"
          desc="Weekly and monthly trends that read like a conversation, not a spreadsheet. Weight, macros, adherence — all at a glance."
          delay={0.2}
        />
      </div>
    </section>
  );
}

function AiSection() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleChatClick = () => {
    navigate(user ? '/app/assistant' : '/signup');
  };
  return (
    <section id="ai" className="py-24 bg-ahara-mist/60 border-y border-ahara-line">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <p className="text-sm uppercase tracking-widest text-ahara-sage font-medium">AI Nutrition</p>
          <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-ahara-ink mt-3 tracking-tight">
            An always-on coach<br />who actually gets your goals.
          </h2>
          <p className="mt-5 text-ahara-muted leading-relaxed max-w-lg">
            Ahara's assistant uses your profile, meals and progress to answer real questions —
            no scrolling through spreadsheets, no guessing.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <AICoachPreview onChatClick={handleChatClick} />
        </Reveal>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: UserPlus, t: 'Create your nutrition profile', d: 'Age, activity and goal — takes about 60 seconds.' },
    { icon: LayoutGrid, t: 'Build meals visually', d: 'Drag real foods onto your plate and watch the numbers update.' },
    { icon: Sparkles, t: 'Receive personalized AI insights', d: 'Get clear, specific guidance as your week takes shape.' },
  ];
  return (
    <section id="how" className="py-24 max-w-7xl mx-auto px-6">
      <Reveal>
        <p className="text-sm uppercase tracking-widest text-ahara-sage font-medium">How it Works</p>
        <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-ahara-ink mt-3">Three steps. Zero guesswork.</h2>
      </Reveal>

      <div className="relative mt-16">
        <div className="hidden md:block absolute top-8 left-[8%] right-[8%] h-px bg-ahara-line overflow-hidden">
          <motion.div
            className="h-full bg-ahara-sage"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: EASE }}
            style={{ transformOrigin: 'left' }}
          />
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.15}>
              <div className="relative flex flex-col items-start">
                <div className="w-16 h-16 rounded-2xl bg-white border border-ahara-line flex items-center justify-center shadow-sm relative z-10">
                  <s.icon className="w-6 h-6 text-ahara-sage" />
                </div>
                <div className="mt-6 font-heading text-xl text-ahara-ink">{s.t}</div>
                <p className="mt-2 text-ahara-muted text-sm leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { name: 'Starter', price: '₹0', perks: ['AI meal builder', 'Basic tracking', 'Weekly summary'], cta: 'Start free' },
    { name: 'Ahara Plus', price: '₹299', per: '/mo', perks: ['Everything in Starter', 'Food scanner', 'Coach chat', 'Trend reports'], cta: 'Start 7-day trial', featured: true },
    { name: 'Family', price: '₹699', per: '/mo', perks: ['Up to 4 profiles', 'Shared meal plans', 'Priority support'], cta: 'Choose Family' },
  ];
  return (
    <section id="pricing" className="py-24 max-w-7xl mx-auto px-6">
      <Reveal className="text-center max-w-2xl mx-auto">
        <p className="text-sm uppercase tracking-widest text-ahara-sage font-medium">Pricing</p>
        <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-ahara-ink mt-3">Simple plans, real change.</h2>
      </Reveal>
      <div className="mt-12 grid md:grid-cols-3 gap-6 items-start">
        {plans.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.1}>
            <div
              className={`pricing-card lift rounded-3xl p-8 border relative ${p.featured ? 'bg-ahara-ink text-white border-ahara-ink md:-translate-y-3 glow-soft' : 'bg-white border-ahara-line'}`}
              data-testid={`pricing-card-${p.name.toLowerCase().replace(/\s/g, '-')}`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-8 text-[11px] font-medium tracking-wide bg-ahara-sage text-white px-3 py-1 rounded-full">
                  Most popular
                </span>
              )}
              <div className="font-heading text-2xl">{p.name}</div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-heading text-5xl">{p.price}</span>
                {p.per && <span className="opacity-60 text-sm">{p.per}</span>}
              </div>
              <ul className={`mt-6 space-y-2.5 text-sm ${p.featured ? 'text-white/80' : 'text-ahara-muted'}`}>
                {p.perks.map((x) => (
                  <li key={x} className="flex gap-2 items-start">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${p.featured ? 'text-ahara-sage' : 'text-ahara-sage'}`} />
                    {x}
                  </li>
                ))}
              </ul>
              <Link to="/signup">
                <Button
                  className={`btn-ripple mt-8 w-full rounded-full ${p.featured ? 'bg-ahara-sage hover:bg-ahara-sage-dark' : 'bg-ahara-ink hover:bg-ahara-ink/90'} text-white`}
                  data-testid={`pricing-cta-${p.name.toLowerCase().replace(/\s/g, '-')}`}
                >
                  {p.cta}
                </Button>
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    ['Is Ahara a medical tool?', 'No. Ahara is a nutrition coach. For medical guidance, please consult a professional.'],
    ['Does it work for vegetarians and vegans?', 'Yes — choose your preference during onboarding and everything adapts.'],
    ['Can I connect wearables?', 'Support for Apple Health and Google Fit is on the roadmap.'],
    ['How does the AI understand my goals?', 'It learns from your profile, logged meals and progress, and gets more specific the more you use it.'],
  ];
  return (
    <section className="py-24 max-w-3xl mx-auto px-6">
      <Reveal>
        <h2 className="font-heading text-4xl font-semibold text-ahara-ink">Frequently asked</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <Accordion type="single" collapsible className="mt-10">
          {items.map(([q, a], i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-ahara-line py-1">
              <AccordionTrigger data-testid={`faq-q-${i}`} className="text-left text-ahara-ink hover:no-underline py-5">
                <span className="font-heading text-lg">{q}</span>
              </AccordionTrigger>
              <AccordionContent className="text-ahara-muted leading-relaxed pb-5">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer id="about" className="border-t border-ahara-line bg-white">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-ahara-sage/15 flex items-center justify-center"><Leaf className="w-4 h-4 text-ahara-sage" /></div>
            <span className="font-heading font-semibold text-ahara-ink">Ahara</span>
          </div>
          <p className="mt-4 text-sm text-ahara-muted max-w-xs">An AI nutrition companion for people who want to feel better, tomorrow.</p>
        </div>
        {[
          ['Product', ['Features', 'Pricing', 'Roadmap']],
          ['Company', ['About', 'Blog', 'Contact']],
          ['Legal', ['Privacy', 'Terms', 'Cookies']],
        ].map(([h, list]) => (
          <div key={h}>
            <div className="text-sm font-medium text-ahara-ink">{h}</div>
            <ul className="mt-3 space-y-2 text-sm text-ahara-muted">
              {list.map((x) => <li key={x}><a className="hover:text-ahara-ink" href="#">{x}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-ahara-line py-6 text-center text-xs text-ahara-muted">
        © {new Date().getFullYear()} Ahara. Nourish, not track.
      </div>
    </footer>
  );
}

export default function Landing() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-ahara-bg min-h-screen text-ahara-ink" data-testid="landing-page">
      <motion.div
        className="fixed inset-0 z-[100] bg-ahara-bg flex items-center justify-center pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: loaded ? 0 : 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ display: loaded ? 'none' : 'flex' }}
        aria-hidden="true"
      >
        <div className="w-10 h-10 rounded-full border-2 border-ahara-sage/25 border-t-ahara-sage animate-spin" />
      </motion.div>

      <TopNav />
      <Hero />
      <Features />
      <AiSection />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}