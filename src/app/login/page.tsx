/**
 * Login Page — /login
 * Phone/email + password login form using AuthContext.
 */

'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const { login, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!loginValue.trim() || !password) {
      setError('Please enter your phone/email and password.');
      return;
    }

    setSubmitting(true);
    try {
      await login({ login: loginValue.trim(), password });
      router.push('/account');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-foreground text-center mb-2">Sign In</h1>
        <p className="text-muted-foreground text-center mb-8">
          Welcome back! Sign in to your account.
        </p>

        {message && (
          <div className="bg-[var(--color-info)]/10 text-[var(--color-info)] text-sm p-4 rounded-lg mb-6">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-[var(--color-error)]/10 text-[var(--color-error)] text-sm p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Phone or Email</label>
            <input
              type="text"
              value={loginValue}
              onChange={(e) => setLoginValue(e.target.value)}
              placeholder="+919876543210 or email@example.com"
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
              disabled={submitting}
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
              disabled={submitting}
              autoComplete="current-password"
            />
          </div>

          <Button type="submit" size="lg" fullWidth disabled={submitting || authLoading} isLoading={submitting}>
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-primary hover:underline font-medium">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
