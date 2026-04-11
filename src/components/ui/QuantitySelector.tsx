'use client';

import { useState } from 'react';

interface QuantitySelectorProps {
  min?: number;
  max?: number;
  defaultValue?: number;
  onChange?: (qty: number) => void;
}

export function QuantitySelector({ min = 1, max = 10, defaultValue = 1, onChange }: QuantitySelectorProps) {
  const [qty, setQty] = useState(defaultValue);

  const update = (val: number) => {
    const clamped = Math.min(Math.max(val, min), max);
    setQty(clamped);
    onChange?.(clamped);
  };

  return (
    <div className="flex items-center gap-0 border border-border rounded-lg overflow-hidden w-fit">
      <button
        onClick={() => update(qty - 1)}
        disabled={qty <= min}
        className="px-4 py-3 text-primary hover:bg-muted transition-colors disabled:opacity-40 text-lg leading-none"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="px-5 py-3 text-sm font-semibold text-foreground min-w-[3rem] text-center border-x border-border">
        {qty}
      </span>
      <button
        onClick={() => update(qty + 1)}
        disabled={qty >= max}
        className="px-4 py-3 text-primary hover:bg-muted transition-colors disabled:opacity-40 text-lg leading-none"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
