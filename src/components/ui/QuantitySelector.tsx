/**
 * QuantitySelector — Simple +/- quantity input
 * Uses template CSS variable design system.
 */

'use client';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max,
  disabled = false,
}: QuantitySelectorProps) {
  const decrement = () => {
    if (value > min) onChange(value - 1);
  };

  const increment = () => {
    if (max === undefined || value < max) onChange(value + 1);
  };

  return (
    <div className="flex items-center border border-border rounded-lg">
      <button
        type="button"
        onClick={decrement}
        disabled={disabled || value <= min}
        className="px-3 py-2 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="w-12 text-center text-sm font-medium text-foreground border-x border-border py-2">
        {value}
      </span>
      <button
        type="button"
        onClick={increment}
        disabled={disabled || (max !== undefined && value >= max)}
        className="px-3 py-2 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
