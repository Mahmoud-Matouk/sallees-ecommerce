import { StarIcon } from 'lucide-react';
import { localizeDate } from '@/lib/helper';
import type { Locale } from '@/core/i18n/languages';
import type { Review } from '../types/product.types';

interface ProductReviewsProps {
  reviews: Review[];
  ratingsAverage: number;
  ratingsQuantity: number;
  lang?: Locale;
}

export function ProductReviews({
  reviews,
  ratingsAverage,
  ratingsQuantity,
  lang,
}: ProductReviewsProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Summary header */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={`size-5 ${
                  i < Math.round(ratingsAverage)
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-muted text-muted'
                }`}
              />
            ))}
          </div>
          <span className="text-lg font-semibold text-foreground">
            {ratingsAverage}
          </span>
        </div>
        <span className="text-sm text-muted-foreground">
          ({ratingsQuantity} {ratingsQuantity === 1 ? 'review' : 'reviews'})
        </span>
      </div>

      {/* Reviews list */}
      {reviews.length > 0 ? (
        <div className="flex flex-col divide-y divide-border">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="flex flex-col gap-2 py-4 first:pt-0"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {review.user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {review.user.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {localizeDate(review.createdAt, lang ?? 'en')}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`size-3.5 ${
                        i < review.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-muted text-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {review.review && (
                <p className="pl-12 text-sm leading-relaxed text-muted-foreground">
                  {review.review}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          No reviews yet. Be the first to review this product!
        </p>
      )}
    </div>
  );
}
