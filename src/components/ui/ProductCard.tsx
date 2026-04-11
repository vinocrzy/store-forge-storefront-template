import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: number | string;
  slug: string;
  name: string;
  price: number;
  imageUrl: string;
  badge?: string;
  tags?: string[];
  currency?: string;
}

export function ProductCard({ slug, name, price, imageUrl, badge, tags = [], currency = 'USD' }: ProductCardProps) {
  const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price);
  return (
    <Link href={`/products/${slug}`} className="group block bg-background rounded-xl card-shadow overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-border">
      <div className="aspect-[4/5] overflow-hidden bg-muted">
        <Image
          src={imageUrl}
          alt={name}
          width={400}
          height={500}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        {badge && (
          <span className="brand-gradient text-white label-caps rounded-full px-3 py-1 mb-3 inline-block">
            {badge}
          </span>
        )}
        <div className="flex justify-between items-baseline mb-1">
          <h3 className="font-semibold text-lg text-foreground" style={{ fontFamily: 'var(--font-headline)' }}>{name}</h3>
          <span className="font-semibold text-primary">{formatted}</span>
        </div>
        {tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-3">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full bg-muted label-caps px-3 py-1 text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
