'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/Button';
import { QuantitySelector } from '@/components/ui/QuantitySelector';

export default function CartPage() {
  const { cart, itemCount, isLoading, updateQuantity, removeFromCart } = useCart();

  const currency = 'USD';
  const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(n);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
      </div>
    );
  }

  if (!cart || itemCount === 0) {
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
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground">
          {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div key={item.id} className="border border-border rounded-lg p-4 flex gap-4">
              {/* Product Image */}
              <div className="w-24 h-24 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
                {item.product_image ? (
                  <Image
                    src={item.product_image}
                    alt={item.product_name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No image</div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <Link href={`/products/${item.product_slug}`}>
                  <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">
                    {item.product_name}
                  </h3>
                </Link>
                <p className="text-primary font-bold">{fmt(item.unit_price)}</p>
                <p className="text-xs text-muted-foreground mt-1">SKU: {item.product_sku}</p>
              </div>

              {/* Quantity + Remove */}
              <div className="flex flex-col items-end gap-3">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm text-red-500 hover:text-red-700 transition-colors"
                >
                  Remove
                </button>
                <QuantitySelector
                  defaultValue={item.quantity}
                  min={1}
                  max={99}
                  onChange={(qty) => updateQuantity(item.id, qty)}
                />
                <p className="text-sm font-semibold text-foreground">{fmt(item.total_price)}</p>
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
                <dd>{fmt(cart.subtotal)}</dd>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <dt>Shipping</dt>
                <dd>{cart.shipping > 0 ? fmt(cart.shipping) : 'Calculated at checkout'}</dd>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <dt>Tax</dt>
                <dd>{fmt(cart.tax)}</dd>
              </div>
              <div className="border-t border-border pt-3 flex justify-between text-xl font-bold">
                <dt>Total</dt>
                <dd className="text-primary">{fmt(cart.total)}</dd>
              </div>
            </dl>

            <div className="mt-6 space-y-3">
              <Link href="/checkout">
                <Button size="lg" fullWidth>Proceed to Checkout</Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" size="lg" fullWidth>Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

