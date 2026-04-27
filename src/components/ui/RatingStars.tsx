/**
 * RatingStars — Star rating display component
 * Supports decimal ratings (e.g. 4.3), optional value + review count text.
 * Uses inline SVG star icons (no external icon dependency).
 */

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  reviewCount?: number;
}

const ICON_SIZE: Record<string, number> = {
  sm: 14,
  md: 18,
  lg: 22,
};

const TEXT_SIZE: Record<string, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

function StarIcon({ filled, half, size }: { filled: boolean; half: boolean; size: number }) {
  if (filled) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-yellow-500">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }
  if (half) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className="text-yellow-500">
        <defs>
          <linearGradient id={`half-${size}`}>
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill={`url(#half-${size})`}
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export function RatingStars({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
  reviewCount,
}: RatingStarsProps) {
  const iconSize = ICON_SIZE[size];
  const textSize = TEXT_SIZE[size];

  const stars = Array.from({ length: maxRating }, (_, i) => {
    const starNum = i + 1;
    const filled = rating >= starNum;
    const halfFilled = !filled && rating >= starNum - 0.5;

    return <StarIcon key={i} filled={filled} half={halfFilled} size={iconSize} />;
  });

  return (
    <div className="flex items-center gap-1" role="img" aria-label={`${rating} out of ${maxRating} stars`}>
      <div className="flex items-center">{stars}</div>
      {showValue && (
        <span className={`${textSize} font-semibold text-foreground ml-1`}>
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className={`${textSize} text-muted-foreground`}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
