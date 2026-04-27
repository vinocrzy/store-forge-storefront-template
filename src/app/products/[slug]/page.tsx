/**
 * Product Detail Page — /products/[slug]
 * Fetches product data from API, displays details with SEO metadata.
 * Includes reviews section and add-to-cart functionality.
 */

import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getProductBySlug } from '@/services/products';
import { ProductReviews } from './ProductReviews';
import { ProductDetailClient } from './ProductDetailClient';
import { ProductRecommendations } from '@/components/recommendations/ProductRecommendations';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProductBySlug(slug);
    return {
      title: product.meta_title || `${product.name} | ${process.env.NEXT_PUBLIC_STORE_NAME || 'Store'}`,
      description: product.meta_description || product.short_description || product.description || '',
      keywords: product.meta_keywords || undefined,
      openGraph: {
        title: product.meta_title || product.name,
        description: product.meta_description || product.short_description || '',
        images: product.primary_image?.url ? [product.primary_image.url] : [],
      },
    };
  } catch {
    return { title: 'Product Not Found' };
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;

  let product;
  try {
    product = await getProductBySlug(slug);
  } catch {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Link href="/products" className="text-primary hover:underline">
          Browse all products
        </Link>
      </div>
    );
  }

  const primaryImage = product.primary_image || product.images?.[0];
  const otherImages = product.images?.filter((img) => img.id !== primaryImage?.id) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm">
        <ol className="flex items-center gap-2 text-muted-foreground">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li>/</li>
          <li><Link href="/products" className="hover:text-primary">Products</Link></li>
          <li>/</li>
          <li className="text-foreground">{product.name}</li>
        </ol>
      </nav>

      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square bg-muted rounded-lg relative overflow-hidden mb-4">
            {primaryImage?.url ? (
              <Image
                src={primaryImage.url}
                alt={primaryImage.alt_text || product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                </svg>
              </div>
            )}
          </div>
          {otherImages.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {otherImages.slice(0, 4).map((img) => (
                <div key={img.id} className="aspect-square bg-muted rounded-lg relative overflow-hidden">
                  <Image
                    src={img.url}
                    alt={img.alt_text || product.name}
                    fill
                    sizes="(max-width: 768px) 25vw, 12vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info — Interactive client component */}
        <ProductDetailClient product={product} />
      </div>

      {/* Reviews Section */}
      <div className="mt-16 border-t border-border pt-12">
        <h2 className="text-2xl font-bold text-foreground mb-8">Customer Reviews</h2>
        <ProductReviews slug={slug} />
      </div>

      {/* Phase 9C: Recommendations */}
      <ProductRecommendations
        productId={product.id}
        title="You May Also Like"
      />
    </div>
  );
}
