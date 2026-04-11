interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <p className={`label-caps text-muted-foreground mb-4 ${className}`}>
      {children}
    </p>
  );
}
