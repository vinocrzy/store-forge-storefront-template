/**
 * Checkout Page — /checkout
 * Working checkout form with form state, validation, and API submission.
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { guestCheckout, formatPhoneToE164, isValidE164Phone } from '@/services/checkout';
import { getPaymentConfig, type PaymentData, type PaymentGateway } from '@/services/payment';
import { PaymentStep } from './PaymentStep';
import { Button } from '@/components/ui/Button';

interface FormState {
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  notes: string;
}

const initialForm: FormState = {
  email: '',
  phone: '',
  first_name: '',
  last_name: '',
  address_line1: '',
  address_line2: '',
  city: '',
  state: '',
  postal_code: '',
  country: '',
  notes: '',
};

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { customer, isAuthenticated } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [paymentGateway, setPaymentGateway] = useState<PaymentGateway>('manual');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('card');
  const [showPaymentStep, setShowPaymentStep] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentData>(null);
  const [createdOrderNumber, setCreatedOrderNumber] = useState('');

  // Fetch store payment config on mount
  useEffect(() => {
    getPaymentConfig()
      .then((config) => setPaymentGateway(config.payment_gateway))
      .catch(() => setPaymentGateway('manual'));
  }, []);

  // Pre-fill form if authenticated
  useEffect(() => {
    if (isAuthenticated && customer) {
      setForm((prev) => ({
        ...prev,
        email: customer.email || '',
        phone: customer.phone || '',
        first_name: customer.first_name || '',
        last_name: customer.last_name || '',
        ...(customer.default_address
          ? {
              address_line1: customer.default_address.address_line1 || '',
              address_line2: customer.default_address.address_line2 || '',
              city: customer.default_address.city || '',
              state: customer.default_address.state_province || '',
              postal_code: customer.default_address.postal_code || '',
              country: customer.default_address.country || '',
            }
          : {}),
      }));
    }
  }, [isAuthenticated, customer]);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const items = cart?.items || [];
  const subtotal = cart?.subtotal || 0;
  const tax = cart?.tax || 0;
  const shipping = cart?.shipping || 0;
  const total = subtotal + tax + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.first_name || !form.last_name) {
      setError('First name and last name are required.');
      return;
    }
    if (!form.email) {
      setError('Email is required.');
      return;
    }
    if (!form.phone) {
      setError('Phone number is required.');
      return;
    }
    if (!form.address_line1 || !form.city || !form.postal_code || !form.country) {
      setError('Please fill in all required address fields.');
      return;
    }

    const phone = formatPhoneToE164(form.phone);
    if (!isValidE164Phone(phone)) {
      setError('Please enter a valid phone number.');
      return;
    }

    if (!cart?.token) {
      setError('No active cart. Please add items first.');
      return;
    }

    setSubmitting(true);
    try {
      const couponCode = typeof window !== 'undefined' ? localStorage.getItem('coupon_code') : null;
      const payMethod = paymentGateway !== 'manual' ? selectedPaymentMethod : 'pending';
      const result = await guestCheckout({
        customer_name: `${form.first_name} ${form.last_name}`,
        customer_email: form.email,
        customer_phone: phone,
        shipping_address: {
          first_name: form.first_name,
          last_name: form.last_name,
          address_line1: form.address_line1,
          address_line2: form.address_line2 || undefined,
          city: form.city,
          state: form.state,
          postal_code: form.postal_code,
          country: form.country,
          phone,
        },
        notes: form.notes || undefined,
        cart_token: cart.token,
        coupon_code: couponCode || undefined,
        payment_method: payMethod,
      });

      // Check if payment is needed
      if (result.payment && result.payment.gateway !== 'manual') {
        setCreatedOrderNumber(result.order.order_number);
        setPaymentData(result.payment as PaymentData);
        setShowPaymentStep(true);
        setSubmitting(false);
        return;
      }

      // No payment needed — redirect immediately
      await clearCart();
      if (typeof window !== 'undefined') {
        localStorage.removeItem('coupon_code');
      }

      router.push(`/orders/${result.order.id}?success=1`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Add items to your cart before checking out.</p>
        <Link href="/products">
          <Button size="lg">Browse Products</Button>
        </Link>
      </div>
    );
  }

  const inputClass = 'w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
          Checkout
        </h1>

        {error && (
          <div className="bg-[var(--color-error)]/10 text-[var(--color-error)] text-sm p-4 rounded-lg mb-6">
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
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} className={inputClass} disabled={submitting} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone *</label>
                    <input type="tel" value={form.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder="+919876543210" className={inputClass} disabled={submitting} />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name *</label>
                    <input type="text" value={form.first_name} onChange={(e) => updateField('first_name', e.target.value)} className={inputClass} disabled={submitting} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name *</label>
                    <input type="text" value={form.last_name} onChange={(e) => updateField('last_name', e.target.value)} className={inputClass} disabled={submitting} />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">Address *</label>
                    <input type="text" value={form.address_line1} onChange={(e) => updateField('address_line1', e.target.value)} className={inputClass} disabled={submitting} />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">Address Line 2</label>
                    <input type="text" value={form.address_line2} onChange={(e) => updateField('address_line2', e.target.value)} className={inputClass} disabled={submitting} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">City *</label>
                    <input type="text" value={form.city} onChange={(e) => updateField('city', e.target.value)} className={inputClass} disabled={submitting} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">State</label>
                    <input type="text" value={form.state} onChange={(e) => updateField('state', e.target.value)} className={inputClass} disabled={submitting} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Postal Code *</label>
                    <input type="text" value={form.postal_code} onChange={(e) => updateField('postal_code', e.target.value)} className={inputClass} disabled={submitting} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Country *</label>
                    <input type="text" value={form.country} onChange={(e) => updateField('country', e.target.value)} className={inputClass} disabled={submitting} />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              {paymentGateway !== 'manual' && (
                <div className="border border-border rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                  <div className="space-y-3">
                    <label className="flex items-center gap-4 p-4 border border-border rounded-lg cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={selectedPaymentMethod === 'card'}
                        onChange={() => setSelectedPaymentMethod('card')}
                        className="w-4 h-4 accent-[var(--color-primary)]"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-foreground">
                          {paymentGateway === 'razorpay' ? 'Pay with UPI / Card / Netbanking' : 'Pay with Card'}
                        </p>
                        <p className="text-xs text-muted-foreground">Secure online payment</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-4 p-4 border border-border rounded-lg cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="pending"
                        checked={selectedPaymentMethod === 'pending'}
                        onChange={() => setSelectedPaymentMethod('pending')}
                        className="w-4 h-4 accent-[var(--color-primary)]"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-foreground">Pay Later / Cash on Delivery</p>
                        <p className="text-xs text-muted-foreground">Complete payment after delivery</p>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* Notes */}
              <div className="border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Order Notes</h2>
                <textarea
                  value={form.notes}
                  onChange={(e) => updateField('notes', e.target.value)}
                  rows={3}
                  placeholder="Any special instructions for your order..."
                  className={`${inputClass} resize-none`}
                  disabled={submitting}
                />
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="border border-border rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.product_name} × {item.quantity}
                      </span>
                      <span>${Number(item.total_price).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <dl className="space-y-2 text-sm mb-6 border-t border-border pt-4">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Subtotal</dt>
                    <dd>${subtotal.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Shipping</dt>
                    <dd>${shipping.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Tax</dt>
                    <dd>${tax.toFixed(2)}</dd>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between font-bold text-base">
                    <dt>Total</dt>
                    <dd className="text-primary">${total.toFixed(2)}</dd>
                  </div>
                </dl>
                <Button type="submit" size="lg" fullWidth disabled={submitting} isLoading={submitting}>
                  {selectedPaymentMethod === 'card' && paymentGateway !== 'manual'
                    ? `Pay $${total.toFixed(2)}`
                    : 'Place Order'}
                </Button>
              </div>
            </div>
          </div>
        </form>

        {/* Payment Modal */}
        {showPaymentStep && paymentData && (
          <PaymentStep
            paymentData={paymentData}
            orderNumber={createdOrderNumber}
            customerName={`${form.first_name} ${form.last_name}`}
            customerEmail={form.email}
            customerPhone={formatPhoneToE164(form.phone)}
            total={total}
            onPaymentComplete={() => {
              clearCart();
              if (typeof window !== 'undefined') localStorage.removeItem('coupon_code');
              router.push(`/orders/confirmation?order=${createdOrderNumber}`);
            }}
            onPaymentFailed={(err) => console.error('Payment failed:', err)}
          />
        )}
      </div>
    </div>
  );
}
