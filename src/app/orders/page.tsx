import Link from 'next/link';

export default function OrdersPage() {
  const orders = [
    { id: 1001, date: '2026-04-01', status: 'Delivered', total: 299.99, items: 3 },
    { id: 1002, date: '2026-04-05', status: 'Shipped', total: 149.99, items: 1 },
    { id: 1003, date: '2026-04-08', status: 'Processing', total: 399.99, items: 2 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-success/10 text-success';
      case 'Shipped': return 'bg-info/10 text-info';
      case 'Processing': return 'bg-warning/10 text-warning';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
          Order History
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
            <Link href="/products" className="text-primary hover:underline">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-wrap gap-4 justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                    <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-6 items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {order.items} {order.items === 1 ? 'item' : 'items'}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
                    <Link href={`/orders/${order.id}`} className="text-primary hover:underline text-sm">
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
