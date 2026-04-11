'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { guestCheckout } from '@/services/checkout';
import { Button } from '@/components/ui/Button';

const inputClass = 'w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    first_name: '',
    last_name: '',
    address_line1: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'US',
    notes: '',
  });

  const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!cart?.token) {
      setError('No active cart. Please add items before checking out.');
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      const result = await guestCheckout({
        customer_name: form.customer_name,
        customer_email: form.customer_email,
        customer_phone: form.customer_phone,
        cart_token: cart.token,
        notes: form.notes,
        shipping_address: {
          first_name: form.first_name,
          last_name: form.last_name,
          address_line1: form.address_line1,
          city: form.city,
          state: form.state,
          postal_code: form.postal_code,
          country: form.country,
          phone: form.customer_phone,
        },
      });
      await clearCart();
      router.push(`/orders?order=${result.order.order_number}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Checkout failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Checkout</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="md:col-span-2 space-y-8">

              {/* Contact Information */}
              <div className="border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <input name="customer_name" type="text" required value={form.customer_name} onChange={handleChange} className={inputClass} placeholder="Jane Smith" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input name="customer_email" type="email" value={form.customer_email} onChange={handleChange} className={inputClass} placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone * <span className="font-normal text-muted-foreground">(E.164: +15550000000)</span></label>
                    <input name="customer_phone" type="tel" required value={form.customer_phone} onChange={handleChange} className={inputClass} placeholder="+1 (555) 000-0000" />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name *</label>
                    <input name="first_name" type="text" required value={form.first_name} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name *</label>
                    <input name="last_name" type="text" required value={form.last_name} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">Address *</label>
                    <input name="address_line1" type="text" required value={form.address_line1} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">City *</label>
                    <input name="city" type="text" required value={form.city} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">State / Province *</label>
                    <input name="state" type="text" required value={form.state} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Postal Code *</label>
                    <input name="postal_code" type="text" required value={form.postal_code} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Country *</label>
                    <input name="country" type="text" required value={form.country} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Order Notes <span className="text-sm font-normal text-muted-foreground">(optional)</span></h2>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  className={inputClass}
                  placeholder="Special instructions for your order..."
                />
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="border border-border rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                {cart && (
                  <dl className="space-y-2 text-sm mb-6">
                    {cart.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-muted-foreground">
                        <dt>{item.product_name} × {item.quantity}</dt>
                        <dd>{fmt(item.total_price)}</dd>
                      </div>
                    ))}
                    <div className="border-t border-border pt-2 flex justify-between text-muted-foreground">
                      <dt>Shipping</dt>
                      <dd>{cart.shipping > 0 ? fmt(cart.shipping) : 'TBD'}</dd>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <dt>Tax</dt>
                      <dd>{fmt(cart.tax)}</dd>
                    </div>
                    <div className="border-t border-border pt-2 flex justify-between font-bold text-base">
                      <dt>Total</dt>
                      <dd className="text-primary">{fmt(cart.total)}</dd>
                    </div>
                  </dl>
                )}
                <Button type="submit" size="lg" fullWidth disabled={submitting}>
                  {submitting ? 'Placing Order…' : 'Place Order'}
                </Button>
                <Link href="/cart" className="block text-center text-sm text-primary hover:underline mt-3">
                  ← Back to Cart
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

