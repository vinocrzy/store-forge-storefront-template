interface TestimonialCardProps {
  quote: string;
  author: string;
  location?: string;
  rating?: number;
}

export function TestimonialCard({ quote, author, location, rating = 5 }: TestimonialCardProps) {
  return (
    <div className="bg-background rounded-xl card-shadow p-7 space-y-4 border border-border">
      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <svg key={i} className="w-4 h-4 text-primary fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <blockquote className="italic text-foreground text-lg leading-relaxed" style={{ fontFamily: 'var(--font-headline)' }}>
        &ldquo;{quote}&rdquo;
      </blockquote>
      <footer>
        <p className="font-semibold text-sm text-foreground">{author}</p>
        {location && <p className="label-caps text-muted-foreground">{location}</p>}
      </footer>
    </div>
  );
}
