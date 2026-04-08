import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function CartPage() {
  // In a real app, this would come from cart context/state
  const cartItems = [
    { id: 1, name: 'Product 1', price: 99.99, quantity: 2, image: null },
    { id: 2, name: 'Product 2', price: 149.99, quantity: 1, image: null },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 10.00;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added anything to your cart yet.
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
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="border border-border rounded-lg p-4 flex gap-4">
              {/* Product Image */}
              <div className="w-24 h-24 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center">
                <span className="text-muted-foreground text-xs">Image</span>
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <Link href={`/products/${item.id}`}>
                  <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-primary font-bold">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex flex-col items-end gap-4">
                <button className="text-error hover:text-error/80 text-sm">
                  Remove
                </button>
                <div className="flex items-center border border-border rounded-lg">
                  <button className="px-3 py-1 hover:bg-muted transition-colors">-</button>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    className="w-12 text-center border-x border-border focus:outline-none"
                    readOnly
                  />
                  <button className="px-3 py-1 hover:bg-muted transition-colors">+</button>
                </div>
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

            {/* Promo Code */}
            <div className="mt-6 pt-6 border-t border-border">
              <label className="block text-sm font-medium mb-2">Promo Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <Button size="sm">Apply</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
