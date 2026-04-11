interface PageHeroProps {
  eyebrow?: string;
  title: string;
  titleItalic?: string;
  description?: string;
}

export function PageHero({ eyebrow, title, titleItalic, description }: PageHeroProps) {
  return (
    <div className="flex flex-col space-y-4 mb-16">
      {eyebrow && (
        <nav className="flex label-caps text-muted-foreground">
          <span>{eyebrow}</span>
        </nav>
      )}
      <h1 className="text-5xl md:text-6xl font-bold text-primary tracking-tight leading-tight" style={{ fontFamily: 'var(--font-headline)' }}>
        {title}
        {titleItalic && (
          <>
            <br />
            <span className="italic font-normal">{titleItalic}</span>
          </>
        )}
      </h1>
      {description && (
        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed mt-2">
          {description}
        </p>
      )}
    </div>
  );
}
