/**
 * Store Logo Component
 * Displays the store logo from theme configuration
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useStoreLogo, useTheme } from '@/components/ThemeProvider';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function StoreLogo({ className = '', width, height, priority = false }: LogoProps) {
  const logo = useStoreLogo();
  const { storeTheme } = useTheme();

  // Use props or theme config for dimensions
  const logoWidth = width || logo.width || 150;
  const logoHeight = height || logo.height || 50;

  // If no logo URL, display store name text
  if (!logo.url) {
    return (
      <Link
        href="/"
        className={`text-2xl font-bold text-primary hover:text-primary-hover transition-colors ${className}`}
      >
        {storeTheme?.storeName || process.env.NEXT_PUBLIC_STORE_NAME || 'Store'}
      </Link>
    );
  }

  return (
    <Link href="/" className={`block ${className}`}>
      <Image
        src={logo.url}
        alt={logo.altText}
        width={logoWidth}
        height={logoHeight}
        priority={priority}
        className="object-contain"
      />
    </Link>
  );
}

/**
 * Simple text-only store name component
 */
export function StoreName({ className = '' }: { className?: string }) {
  const { storeTheme } = useTheme();

  return (
    <span className={`font-bold ${className}`}>
      {storeTheme?.storeName || process.env.NEXT_PUBLIC_STORE_NAME || 'Store'}
    </span>
  );
}
