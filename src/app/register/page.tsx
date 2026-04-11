'use client';

import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { SectionLabel } from '@/components/ui/SectionLabel';

const inputClass =
  'w-full bg-background border border-border rounded-lg px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors';

const errorInputClass =
  'w-full bg-background border border-red-400 rounded-lg px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-red-500 transition-colors';

/**
 * Normalise a phone entry to E.164.
 * 10-digit US → +1XXXXXXXXXX
 * Already E.164 → return as-is
 */
function normalisePhone(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.startsWith('+')) return trimmed;
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return trimmed;
}

export default function RegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated, isLoading: authLoading } = useAuth();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace('/account');
    }
  }, [isAuthenticated, authLoading, router]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  function validate(): boolean {
    const errors: Record<string, string> = {};

    if (!form.first_name.trim()) errors.first_name = 'First name is required.';
    if (!form.last_name.trim()) errors.last_name = 'Last name is required.';
    if (!form.phone.trim()) {
      errors.phone = 'Phone number is required.';
    } else {
      const e164 = normalisePhone(form.phone);
      if (!/^\+\d{7,15}$/.test(e164)) {
        errors.phone = 'Enter a valid phone number, e.g. +1 (555) 000-0000';
      }
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Enter a valid email address.';
    }
    if (!form.password) {
      errors.password = 'Password is required.';
    } else if (form.password.length < 8) {
      errors.password = 'Password must be at least 8 characters.';
    }
    if (form.password !== form.password_confirmation) {
      errors.password_confirmation = 'Passwords do not match.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (!validate()) return;

    setSubmitting(true);
    try {
      await register({
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        phone: normalisePhone(form.phone),
        email: form.email.trim() || undefined,
        password: form.password,
        password_confirmation: form.password_confirmation,
      });
      router.push('/account');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
      </div>
    );
  }

  const field = (name: keyof typeof form) => ({
    name,
    value: form[name],
    onChange: handleChange,
    className: fieldErrors[name] ? errorInputClass : inputClass,
  });

  return (
    <main className="max-w-[1920px] mx-auto px-6 md:px-20 py-16 md:py-24">
      <div className="max-w-md mx-auto">

        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <SectionLabel className="text-center">Join us</SectionLabel>
          <h1 className="text-4xl font-bold text-foreground leading-tight" style={{ fontFamily: 'var(--font-headline)' }}>
            Create Your Account
          </h1>
          <p className="text-sm text-muted-foreground">
            Phone number is required. Email is optional.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Global error */}
          {error && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Name row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="first_name" className="block label-caps text-muted-foreground mb-2">First Name *</label>
              <input id="first_name" type="text" autoComplete="given-name" placeholder="Jane" required {...field('first_name')} />
              {fieldErrors.first_name && <p className="mt-1 text-xs text-red-600">{fieldErrors.first_name}</p>}
            </div>
            <div>
              <label htmlFor="last_name" className="block label-caps text-muted-foreground mb-2">Last Name *</label>
              <input id="last_name" type="text" autoComplete="family-name" placeholder="Smith" required {...field('last_name')} />
              {fieldErrors.last_name && <p className="mt-1 text-xs text-red-600">{fieldErrors.last_name}</p>}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block label-caps text-muted-foreground mb-2">Phone Number *</label>
            <input id="phone" type="tel" autoComplete="tel" placeholder="+1 (555) 000-0000" required {...field('phone')} />
            {fieldErrors.phone
              ? <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>
              : <p className="mt-1.5 text-xs text-muted-foreground">Used for order updates. E.164 format: +1 5550000000</p>
            }
          </div>

          {/* Email (optional) */}
          <div>
            <label htmlFor="email" className="block label-caps text-muted-foreground mb-2">Email <span className="normal-case font-normal">(optional)</span></label>
            <input id="email" type="email" autoComplete="email" placeholder="you@example.com" {...field('email')} />
            {fieldErrors.email && <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block label-caps text-muted-foreground mb-2">Password *</label>
            <input id="password" type="password" autoComplete="new-password" placeholder="Minimum 8 characters" required {...field('password')} />
            {fieldErrors.password && <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>}
          </div>

          {/* Confirm password */}
          <div>
            <label htmlFor="password_confirmation" className="block label-caps text-muted-foreground mb-2">Confirm Password *</label>
            <input id="password_confirmation" type="password" autoComplete="new-password" placeholder="Repeat your password" required {...field('password_confirmation')} />
            {fieldErrors.password_confirmation && <p className="mt-1 text-xs text-red-600">{fieldErrors.password_confirmation}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full brand-gradient text-white label-caps py-4 rounded-lg shadow-sm hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Creating account…
              </>
            ) : (
              'Create Account'
            )}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
