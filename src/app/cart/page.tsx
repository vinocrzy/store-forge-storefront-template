/**
 * Shopping Cart Page — /cart
 * Uses CartContext for real cart data with coupon support.
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { validateCoupon, type CouponValidationResult } from '@/services/coupon';
import { Button } from '@/components/ui/Button';
import { QuantitySelector } from '@/components/ui/QuantitySelector';

export default function CartPage() {
  const { cart, itemCount, isLoading, updateQuantity, removeFromCart } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponResult, setCouponResult] = useState<CouponValidationResult | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState('');

  const items = cart?.items || [];
  const subtotal = cart?.subtotal || 0;
  const tax = cart?.tax || 0;
  const shipping = cart?.shipping || 0;
  const discount = couponResult?.valid ? couponResult.discount : 0;
  const total = subtotal + tax + shipping - discount;

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponError('');
    setCouponResult(null);

    try {
      const result = await validateCoupon(couponCode.trim(), subtotal);
      setCouponResult(result);
      if (result.valid && typeof window !== 'undefined') {
        localStorage.setItem('coupon_code', couponCode.trim());
      }
      if (!result.valid) {
        setCouponError(result.message);
      }
    } catch (err) {
      setCouponError(err instanceof Error ? err.message : 'Failed to validate coupon.');
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setCouponResult(null);
    setCouponCode('');
    setCouponError('');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('coupon_code');
    }
  };

  if (items.length === 0 && !isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Link href="/products">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Shopping Cart
        </h1>
        <p className="text-muted-foreground">
          {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="border border-border rounded-lg p-4 flex gap-4">
              {/* Product Image */}
              <div className="w-24 h-24 bg-muted rounded-lg flex-shrink-0 relative overflow-hidden">
                {item.product_image ? (
                  <Image
                    src={item.product_image}
                    alt={item.product_name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                    No Image
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <Link href={`/products/${item.product_slug}`}>
                  <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">
                    {item.product_name}
                  </h3>
                </Link>
                <p className="text-primary font-bold">
                  ${Number(item.unit_price).toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">SKU: {item.product_sku}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex flex-col items-end gap-4">
                <button
                  onClick={() => removeFromCart(item.id)}
                  disabled={isLoading}
                  className="text-[var(--color-error)] hover:text-[var(--color-error)]/80 text-sm disabled:opacity-50"
                >
                  Remove
                </button>
                <QuantitySelector
                  value={item.quantity}
                  onChange={(qty) => updateQuantity(item.id, qty)}
                  disabled={isLoading}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <div className="border border-border rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <dl className="space-y-3">
              <div className="flex justify-between text-muted-foreground">
                <dt>Subtotal</dt>
                <dd>${subtotal.toFixed(2)}</dd>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[var(--color-success)]">
                  <dt>Discount</dt>
                  <dd>-${discount.toFixed(2)}</dd>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <dt>Shipping</dt>
                <dd>${shipping.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <dt>Tax</dt>
                <dd>${tax.toFixed(2)}</dd>
              </div>
              <div className="border-t border-border pt-3 flex justify-between text-xl font-bold">
                <dt>Total</dt>
                <dd className="text-primary">${total.toFixed(2)}</dd>
              </div>
            </dl>

            <div className="mt-6 space-y-3">
              <Link href="/checkout">
                <Button size="lg" fullWidth>
                  Proceed to Checkout
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" size="lg" fullWidth>
                  Continue Shopping
                </Button>
              </Link>
            </div>

            {/* Coupon Code */}
            <div className="mt-6 pt-6 border-t border-border">
              <label className="block text-sm font-medium mb-2">Coupon Code</label>
              {couponResult?.valid ? (
                <div className="flex items-center justify-between bg-[var(--color-success)]/10 text-[var(--color-success)] p-3 rounded-lg text-sm">
                  <span>
                    <strong>{couponResult.coupon?.code}</strong> applied
                    {couponResult.coupon?.type === 'percentage'
                      ? ` (${couponResult.coupon.value}% off)`
                      : ` ($${couponResult.coupon?.value} off)`}
                  </span>
                  <button onClick={removeCoupon} className="text-[var(--color-error)] text-xs hover:underline">
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-background"
                  />
                  <Button size="sm" onClick={applyCoupon} disabled={couponLoading} isLoading={couponLoading}>
                    Apply
                  </Button>
                </div>
              )}
              {couponError && (
                <p className="text-[var(--color-error)] text-xs mt-2">{couponError}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
