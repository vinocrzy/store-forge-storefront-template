'use client';

interface LoadMoreButtonProps {
  onClick: () => void;
  loading?: boolean;
  hasMore?: boolean;
}

export function LoadMoreButton({ onClick, loading = false, hasMore = true }: LoadMoreButtonProps) {
  if (!hasMore) return null;

  return (
    <div className="text-center mt-16">
      <button
        onClick={onClick}
        disabled={loading}
        className="border border-primary text-primary label-caps px-12 py-4 rounded-lg hover:bg-primary hover:text-white transition-all duration-200 disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Load More Products'}
      </button>
    </div>
  );
}
