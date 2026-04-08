import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static site generation (SSG)
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Trailing slashes for static hosting
  trailingSlash: true,
  
  // Environment variables that should be available on the client side
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
    NEXT_PUBLIC_STORE_ID: process.env.NEXT_PUBLIC_STORE_ID || '1',
    NEXT_PUBLIC_STORE_NAME: process.env.NEXT_PUBLIC_STORE_NAME || 'E-Commerce Store',
  },
};

export default nextConfig;
