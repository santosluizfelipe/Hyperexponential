import type { FC } from "react";

import type { Review } from "@/types/pay";
import { EmptyState, ReviewList } from "@/components/PerformanceHistory.styles";

type PerformanceHistoryProps = {
  reviews: Review[];
};

export const PerformanceHistory: FC<PerformanceHistoryProps> = ({ reviews }) => (
  <ReviewList>
    {reviews.map((review) => (
      <article key={`${review.review_date}-${review.rating}`}>
        <div>
          <strong>{review.rating}</strong>
          <span>{review.review_date}</span>
        </div>
        <p>{review.notes}</p>
      </article>
    ))}
    {reviews.length === 0 && (
      <EmptyState>No confidently matched performance reviews.</EmptyState>
    )}
  </ReviewList>
);
