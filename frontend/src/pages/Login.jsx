import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

function AuthShell({ title, subtitle, children, footer, testId }) {
  return (
    <div className="min-h-screen bg-ahara-bg flex" data-testid={testId}>
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=85" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent" />
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-white">
          <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center"><Leaf className="w-5 h-5" /></div>
          <span className="font-heading text-xl">Ahara</span>
        </Link>
        <div className="absolute bottom-10 left-10 right-10 text-white">
          <p className="font-heading text-3xl leading-snug max-w-md">"I finally understand what I eat — without the anxiety of counting."</p>
          <p className="mt-3 text-sm text-white/75">Priya · Ahara member since 2025</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-fade-in-up">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-ahara-sage/15 flex items-center justify-center"><Leaf className="w-5 h-5 text-ahara-sage" /></div>
            <span className="font-heading text-xl text-ahara-ink">Ahara</span>
          </Link>
          <h1 className="font-heading text-4xl font-semibold text-ahara-ink">{title}</h1>
          <p className="mt-2 text-ahara-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-6 text-sm text-ahara-muted">{footer}</div>
        </div>
      </div>
    </div>
  );
}

function GoogleButton({ onClick }) {
  return (
    <Button
      type="button"
      onClick={onClick}
      variant="outline"
      className="w-full h-11 rounded-lg border-ahara-line text-ahara-ink hover:bg-ahara-mist"
      data-testid="google-auth-btn"
    >
      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.54-.2-2.27H12v4.3h5.92c-.26 1.38-1.03 2.55-2.2 3.34v2.77h3.56c2.08-1.92 3.28-4.74 3.28-8.14z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.77c-.99.66-2.25 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C4 20.98 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1a6.9 6.9 0 010-4.2V7.06H2.18a11 11 0 000 9.88l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.2 1.65l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 4 3.02 2.18 6.06L5.84 8.9C6.71 6.31 9.14 5.38 12 5.38z"/></svg>
      Continue with Google
    </Button>
  );
}

export default function Login() {
  const nav = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!email) return toast.error('Please enter your email');
    const u = login(email);
    toast.success('Welcome back');
    nav(u.onboarded ? '/app' : '/onboarding');
  };

  const google = () => {
    const u = login('demo@ahara.app');
    toast.success('Signed in with Google (mock)');
    nav(u.onboarded ? '/app' : '/onboarding');
  };

  return (
    <AuthShell
      testId="login-page"
      title="Welcome back"
      subtitle="Sign in to continue your nutrition journey."
      footer={<>Don't have an account? <Link to="/signup" className="text-ahara-sage hover:underline" data-testid="link-to-signup">Create one</Link></>}
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-ahara-ink">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 h-11" data-testid="login-email-input" />
        </div>
        <div>
          <Label htmlFor="pw" className="text-ahara-ink">Password</Label>
          <Input id="pw" type="password" placeholder="••••••••" value={pw} onChange={(e)=>setPw(e.target.value)} className="mt-1 h-11" data-testid="login-password-input" />
        </div>
        <Button type="submit" className="w-full h-11 rounded-full bg-ahara-sage hover:bg-ahara-sage-dark text-white" data-testid="login-submit-btn">Log In</Button>
      </form>
      <div className="my-6 flex items-center gap-3 text-xs text-ahara-muted"><div className="flex-1 h-px bg-ahara-line"/>or<div className="flex-1 h-px bg-ahara-line"/></div>
      <GoogleButton onClick={google} />
    </AuthShell>
  );
}

export { AuthShell, GoogleButton };
