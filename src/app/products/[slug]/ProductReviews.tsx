/**
 * ProductReviews — Client component for product detail page
 * Fetches reviews, handles pagination, embeds ReviewsList + ReviewForm.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { getProductReviews, type Review, type ReviewSummary } from '@/services/reviews';
import { ReviewsList } from '@/components/ui/ReviewsList';
import { ReviewForm } from '@/components/ui/ReviewForm';

interface ProductReviewsProps {
  slug: string;
}

export function ProductReviews({ slug }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [summary, setSummary] = useState<ReviewSummary>({ avg_rating: null, review_count: 0, distribution: {} });
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchReviews = useCallback(async (pageNum: number, append = false) => {
    try {
      const res = await getProductReviews(slug, pageNum);
      if (append) {
        setReviews((prev) => [...prev, ...res.data]);
      } else {
        setReviews(res.data);
      }
      setSummary(res.summary);
      setLastPage(res.meta.last_page);
    } catch {
      // Silently fail — reviews are non-critical
    }
  }, [slug]);

  useEffect(() => {
    setLoading(true);
    fetchReviews(1).finally(() => setLoading(false));
  }, [fetchReviews]);

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setLoadingMore(true);
    await fetchReviews(nextPage, true);
    setPage(nextPage);
    setLoadingMore(false);
  };

  const handleReviewSubmitted = () => {
    // Re-fetch from page 1 to include new review (after moderation it will appear)
    fetchReviews(1);
    setPage(1);
  };

  const scrollToForm = () => {
    document.getElementById('review-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      <ReviewsList
        reviews={reviews}
        summary={summary}
        hasMore={page < lastPage}
        loadingMore={loadingMore}
        onLoadMore={handleLoadMore}
        onWriteReview={scrollToForm}
      />
      <ReviewForm slug={slug} onReviewSubmitted={handleReviewSubmitted} />
    </div>
  );
}
