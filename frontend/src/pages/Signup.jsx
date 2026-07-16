import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { AuthShell, GoogleButton } from './Login';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export default function Signup() {
  const nav = useNavigate();
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return toast.error('Name and email are required');
    signup({ name: form.name, email: form.email });
    toast.success('Account created');
    nav('/onboarding');
  };

  const google = () => { signup({ name: 'Ahara Explorer', email: 'demo@ahara.app' }); nav('/onboarding'); };

  return (
    <AuthShell
      testId="signup-page"
      title="Create your account"
      subtitle="Two minutes to a smarter plate."
      footer={<>Already a member? <Link to="/login" className="text-ahara-sage hover:underline" data-testid="link-to-login">Log in</Link></>}
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <Label className="text-ahara-ink">Full name</Label>
          <Input value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} placeholder="Priya Sharma" className="mt-1 h-11" data-testid="signup-name-input" />
        </div>
        <div>
          <Label className="text-ahara-ink">Email</Label>
          <Input type="email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} placeholder="you@example.com" className="mt-1 h-11" data-testid="signup-email-input" />
        </div>
        <div>
          <Label className="text-ahara-ink">Password</Label>
          <Input type="password" value={form.password} onChange={(e)=>setForm({...form, password: e.target.value})} placeholder="At least 8 characters" className="mt-1 h-11" data-testid="signup-password-input" />
        </div>
        <Button type="submit" className="w-full h-11 rounded-full bg-ahara-sage hover:bg-ahara-sage-dark text-white" data-testid="signup-submit-btn">Create Account</Button>
      </form>
      <div className="my-6 flex items-center gap-3 text-xs text-ahara-muted"><div className="flex-1 h-px bg-ahara-line"/>or<div className="flex-1 h-px bg-ahara-line"/></div>
      <GoogleButton onClick={google} />
    </AuthShell>
  );
}
