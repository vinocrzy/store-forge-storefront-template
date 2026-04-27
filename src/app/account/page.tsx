/**
 * Account Page — /account
 * Tabbed account page with Details, Orders, Addresses, Wishlist.
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { getOrders } from '@/services/customer';
import { getWishlist } from '@/services/wishlist';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/ui/ProductCard';
import type { Order, Product } from '@/types';

const tabs = ['Details', 'Orders', 'Addresses', 'Wishlist'] as const;
type Tab = typeof tabs[number];

export default function AccountPage() {
  const { customer, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') as Tab | null;

  const [activeTab, setActiveTab] = useState<Tab>(
    initialTab && tabs.includes(initialTab) ? initialTab : 'Details'
  );
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?message=Please sign in to access your account');
    }
  }, [authLoading, isAuthenticated, router]);

  // Fetch orders when tab is active
  useEffect(() => {
    if (activeTab === 'Orders' && isAuthenticated) {
      setOrdersLoading(true);
      getOrders()
        .then(setOrders)
        .catch(() => setOrders([]))
        .finally(() => setOrdersLoading(false));
    }
  }, [activeTab, isAuthenticated]);

  // Fetch wishlist when tab is active
  useEffect(() => {
    if (activeTab === 'Wishlist' && isAuthenticated) {
      setWishlistLoading(true);
      getWishlist()
        .then((res) => setWishlistProducts(res.data))
        .catch(() => setWishlistProducts([]))
        .finally(() => setWishlistLoading(false));
    }
  }, [activeTab, isAuthenticated]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || !customer) {
    return null;
  }

  const fmtDate = (iso: string) =>
    new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(iso));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
          My Account
        </h1>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab
                    ? 'bg-primary text-white'
                    : 'hover:bg-muted text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 rounded-lg text-[var(--color-error)] hover:bg-[var(--color-error)]/10 transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Tab Content */}
          <div className="md:col-span-3">
            {/* Details Tab */}
            {activeTab === 'Details' && (
              <div className="border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-muted-foreground">Name</dt>
                    <dd className="font-medium">{customer.first_name} {customer.last_name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Phone</dt>
                    <dd className="font-medium">{customer.phone}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Email</dt>
                    <dd className="font-medium">{customer.email || 'Not provided'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Member Since</dt>
                    <dd className="font-medium">{fmtDate(customer.created_at)}</dd>
                  </div>
                </dl>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'Orders' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Order History</h2>
                {ordersLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                  </div>
                ) : orders.length === 0 ? (
                  <div className="border border-border rounded-lg p-8 text-center">
                    <p className="text-muted-foreground mb-4">You haven&apos;t placed any orders yet.</p>
                    <Link href="/products">
                      <Button>Start Shopping</Button>
                    </Link>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="border border-border rounded-lg p-6">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                        <div>
                          <p className="font-semibold">Order #{order.order_number}</p>
                          <p className="text-sm text-muted-foreground">{fmtDate(order.created_at)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">${Number(order.total_amount).toFixed(2)}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            order.status === 'delivered' ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' :
                            order.status === 'cancelled' ? 'bg-[var(--color-error)]/10 text-[var(--color-error)]' :
                            'bg-[var(--color-warning)]/10 text-[var(--color-warning)]'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      {order.items && (
                        <div className="text-sm text-muted-foreground">
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                          {order.items.slice(0, 3).map((item) => (
                            <span key={item.id}> • {item.product_name}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'Addresses' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Saved Addresses</h2>
                {customer.addresses && customer.addresses.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {customer.addresses.map((addr) => (
                      <div key={addr.id} className="border border-border rounded-lg p-4">
                        {addr.is_default && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full mb-2 inline-block">Default</span>
                        )}
                        <p className="font-medium">{addr.first_name} {addr.last_name}</p>
                        <p className="text-sm text-muted-foreground">{addr.address_line1}</p>
                        {addr.address_line2 && <p className="text-sm text-muted-foreground">{addr.address_line2}</p>}
                        <p className="text-sm text-muted-foreground">
                          {addr.city}, {addr.state_province} {addr.postal_code}
                        </p>
                        <p className="text-sm text-muted-foreground">{addr.country}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border border-border rounded-lg p-8 text-center">
                    <p className="text-muted-foreground">No saved addresses yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'Wishlist' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">My Wishlist</h2>
                {wishlistLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                  </div>
                ) : wishlistProducts.length === 0 ? (
                  <div className="border border-border rounded-lg p-8 text-center">
                    <p className="text-muted-foreground mb-4">Your wishlist is empty.</p>
                    <Link href="/products">
                      <Button>Browse Products</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
