/**
 * Register Page — /register
 * Customer registration form with name, phone, email, password.
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { formatPhoneToE164, validatePhoneE164 } from '@/lib/phoneUtils';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.first_name.trim() || !formData.last_name.trim()) {
      setError('First name and last name are required.');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Phone number is required.');
      return;
    }
    if (!formData.password || formData.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (formData.password !== formData.password_confirmation) {
      setError('Passwords do not match.');
      return;
    }

    const phone = formatPhoneToE164(formData.phone);
    if (!validatePhoneE164(phone)) {
      setError('Please enter a valid phone number.');
      return;
    }

    setSubmitting(true);
    try {
      await register({
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        phone,
        email: formData.email.trim() || undefined,
        password: formData.password,
      });
      router.push('/account');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-foreground text-center mb-2">Create Account</h1>
        <p className="text-muted-foreground text-center mb-8">
          Join us to start shopping!
        </p>

        {error && (
          <div className="bg-[var(--color-error)]/10 text-[var(--color-error)] text-sm p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">First Name *</label>
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => updateField('first_name', e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                disabled={submitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name *</label>
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) => updateField('last_name', e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                disabled={submitting}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone Number *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="+919876543210"
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
              disabled={submitting}
              autoComplete="tel"
            />
            <p className="text-xs text-muted-foreground mt-1">E.164 format (e.g. +919876543210)</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email (Optional)</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="email@example.com"
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
              disabled={submitting}
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password *</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => updateField('password', e.target.value)}
              placeholder="At least 8 characters"
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
              disabled={submitting}
              autoComplete="new-password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Confirm Password *</label>
            <input
              type="password"
              value={formData.password_confirmation}
              onChange={(e) => updateField('password_confirmation', e.target.value)}
              placeholder="Repeat your password"
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
              disabled={submitting}
              autoComplete="new-password"
            />
          </div>

          <Button type="submit" size="lg" fullWidth disabled={submitting} isLoading={submitting}>
            Create Account
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
