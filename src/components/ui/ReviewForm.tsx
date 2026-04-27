/**
 * ReviewForm — Submit a product review (authenticated customers only)
 * Clickable star selector, optional title, required body.
 * Uses template CSS variable design system.
 */

'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { submitReview } from '@/services/reviews';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface ReviewFormProps {
  slug: string;
  onReviewSubmitted?: () => void;
}

export function ReviewForm({ slug, onReviewSubmitted }: ReviewFormProps) {
  const { isAuthenticated } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="bg-muted/50 rounded-xl p-8 text-center space-y-4">
        <svg className="w-10 h-10 mx-auto text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
        <h3 className="font-bold text-xl text-foreground">Share Your Experience</h3>
        <p className="text-sm text-muted-foreground">Sign in to write a review for this product.</p>
        <Link href="/login">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center space-y-3">
        <svg className="w-10 h-10 mx-auto text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="font-bold text-xl text-foreground">Thank You!</h3>
        <p className="text-sm text-muted-foreground">Your review has been submitted for approval.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (rating < 1) {
      setError('Please select a star rating.');
      return;
    }
    if (body.trim().length < 20) {
      setError('Review must be at least 20 characters long.');
      return;
    }

    setSubmitting(true);
    try {
      await submitReview(slug, {
        rating,
        title: title.trim() || undefined,
        body: body.trim(),
      });
      setSuccess(true);
      onReviewSubmitted?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const displayRating = hoveredRating || rating;

  return (
    <form onSubmit={handleSubmit} className="bg-background rounded-xl shadow-md p-7 space-y-6" id="review-form">
      <h3 className="font-bold text-2xl text-foreground">Write a Review</h3>

      {/* Star Selector */}
      <div>
        <label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block font-semibold">Your Rating *</label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="p-0.5 transition-transform hover:scale-110"
              aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
            >
              <svg
                width={28}
                height={28}
                viewBox="0 0 24 24"
                fill={star <= displayRating ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth={star <= displayRating ? 0 : 1.5}
                className={star <= displayRating ? 'text-yellow-500' : 'text-muted-foreground'}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>
          ))}
          {rating > 0 && (
            <span className="text-sm text-muted-foreground ml-2">
              {rating === 1 ? 'Poor' : rating === 2 ? 'Fair' : rating === 3 ? 'Good' : rating === 4 ? 'Very Good' : 'Excellent'}
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block font-semibold">Review Title (Optional)</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          placeholder="Summarise your experience"
          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors placeholder:text-muted-foreground/50"
          disabled={submitting}
        />
      </div>

      {/* Body */}
      <div>
        <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block font-semibold">Your Review *</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={2000}
          rows={4}
          placeholder="Tell others what you loved about this product (min 20 characters)"
          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors placeholder:text-muted-foreground/50 resize-none"
          disabled={submitting}
        />
        <p className="text-xs text-muted-foreground mt-1 text-right">{body.length}/2000</p>
      </div>

      {error && (
        <p className="text-[var(--color-error)] text-xs flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          {error}
        </p>
      )}

      <Button type="submit" disabled={submitting} isLoading={submitting}>
        Submit Review
      </Button>
    </form>
  );
}
