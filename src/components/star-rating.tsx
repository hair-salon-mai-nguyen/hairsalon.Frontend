"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  size?: number;
  interactive?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onRatingChange,
  size = 20,
  interactive = false,
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const displayRating = hoverRating !== null ? hoverRating : rating;

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onRatingChange && onRatingChange(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(null)}
          className={`${
            interactive ? "cursor-pointer transition-transform hover:scale-110 active:scale-95" : ""
          } focus:outline-none`}
        >
          <Star
            size={size}
            className={`${
              star <= displayRating
                ? "fill-gold-500 text-gold-500"
                : "text-neutral-600 fill-transparent"
            } transition-colors duration-150`}
          />
        </button>
      ))}
    </div>
  );
};
