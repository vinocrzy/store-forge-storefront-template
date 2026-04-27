/**
 * Custom 404 Page — Not Found
 */

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <p className="text-6xl font-bold text-primary">404</p>
        <h1 className="text-2xl font-bold text-foreground">Page Not Found</h1>
        <p className="text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-primary text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Back to Home
          </Link>
          <Link
            href="/products"
            className="px-6 py-3 border border-border text-foreground text-sm font-medium rounded-lg hover:bg-muted transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
