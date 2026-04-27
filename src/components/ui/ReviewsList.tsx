/**
 * ReviewsList — Displays review summary + individual reviews for a product
 * Rating distribution bars, verified purchase badges, admin responses.
 * Uses template CSS variable design system.
 */

'use client';

import { RatingStars } from '@/components/ui/RatingStars';
import { Button } from '@/components/ui/Button';
import type { Review, ReviewSummary } from '@/services/reviews';

interface ReviewsListProps {
  reviews: Review[];
  summary: ReviewSummary;
  hasMore: boolean;
  loadingMore: boolean;
  onLoadMore: () => void;
  onWriteReview: () => void;
}

const fmtDate = (iso: string) =>
  new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(iso));

export function ReviewsList({
  reviews,
  summary,
  hasMore,
  loadingMore,
  onLoadMore,
  onWriteReview,
}: ReviewsListProps) {
  const avgRating = summary.avg_rating ?? 0;
  const totalReviews = summary.review_count;
  const distribution = summary.distribution || {};

  return (
    <div className="space-y-10">
      {/* Rating Summary */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
        {/* Overall score */}
        <div className="text-center md:text-left">
          <p className="font-bold text-6xl text-foreground leading-none">{avgRating.toFixed(1)}</p>
          <RatingStars rating={avgRating} size="md" />
          <p className="text-sm text-muted-foreground mt-2">
            Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
          </p>
          <Button onClick={onWriteReview} className="mt-4">
            Write a Review
          </Button>
        </div>

        {/* Distribution bars */}
        <div className="flex-1 w-full space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = distribution[star] ?? 0;
            const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-3 text-sm">
                <span className="w-4 text-right text-muted-foreground">{star}</span>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" className="text-yellow-500">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <div className="flex-1 h-2 bg-border/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-8 text-xs text-muted-foreground text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* No reviews */}
      {reviews.length === 0 && (
        <div className="text-center py-12 space-y-3">
          <svg className="w-12 h-12 mx-auto text-muted-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
          <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
        </div>
      )}

      {/* Individual reviews */}
      {reviews.length > 0 && (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-background rounded-xl shadow-md p-6 space-y-3"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{review.customer_name}</p>
                    <p className="text-xs text-muted-foreground">{fmtDate(review.created_at)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {review.is_verified_purchase && (
                    <span className="text-xs uppercase tracking-wider font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Verified Purchase
                    </span>
                  )}
                </div>
              </div>

              {/* Stars + title */}
              <RatingStars rating={review.rating} size="sm" />
              {review.title && (
                <p className="font-semibold text-foreground">{review.title}</p>
              )}
              <p className="text-sm text-muted-foreground leading-relaxed">{review.body}</p>

              {/* Admin response */}
              {review.admin_response && (
                <div className="bg-muted/50 rounded-xl p-4 mt-3 border-l-2 border-primary">
                  <p className="text-xs uppercase tracking-wider font-semibold text-primary mb-1">Store Response</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{review.admin_response}</p>
                  {review.admin_responded_at && (
                    <p className="text-xs text-muted-foreground mt-2">{fmtDate(review.admin_responded_at)}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Load more */}
      {hasMore && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={onLoadMore}
            disabled={loadingMore}
            isLoading={loadingMore}
          >
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  );
}
