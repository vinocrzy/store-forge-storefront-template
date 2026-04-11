'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';

export default function AccountPage() {
  const router = useRouter();
  const { customer, isAuthenticated, isLoading, logout } = useAuth();

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
      </div>
    );
  }

  if (!customer) return null;

  const fullName = `${customer.first_name} ${customer.last_name}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
          My Account
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar Navigation */}
          <div className="space-y-2">
            <Link href="/account" className="block px-4 py-2 bg-primary text-white rounded-lg">
              Account Details
            </Link>
            <Link href="/orders" className="block px-4 py-2 hover:bg-muted rounded-lg transition-colors">
              Order History
            </Link>
            <button
              onClick={() => logout().then(() => router.push('/'))}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
            >
              Logout
            </button>
          </div>

          {/* Account Details */}
          <div className="md:col-span-2 space-y-6">
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">Name</label>
                  <p className="px-4 py-2 bg-muted rounded-lg text-foreground">{fullName}</p>
                </div>
                {customer.email && (
                  <div>
                    <label className="block text-sm font-medium mb-2 text-muted-foreground">Email</label>
                    <p className="px-4 py-2 bg-muted rounded-lg text-foreground">{customer.email}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">Phone</label>
                  <p className="px-4 py-2 bg-muted rounded-lg text-foreground">{customer.phone}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  To update your details, please contact support.
                </p>
              </div>
            </div>

            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
              <div className="flex flex-wrap gap-3">
                <Link href="/orders">
                  <Button variant="outline">View Orders</Button>
                </Link>
                <Link href="/cart">
                  <Button variant="outline">Go to Cart</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
