"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const RATING_LEVELS: Record<number, { text: string; subText?: string; badge: string; color: string }> = {
  1: { text: "Kém", subText: "Rất không hài lòng", badge: "bg-rose-50 text-rose-700 border-rose-200", color: "text-rose-600" },
  2: { text: "Chưa hài lòng", subText: "Cần cải thiện", badge: "bg-amber-50 text-amber-700 border-amber-200", color: "text-amber-600" },
  3: { text: "Trung bình", subText: "Tạm ổn", badge: "bg-sand-100 text-espresso-700 border-sand-300", color: "text-espresso-600" },
  4: { text: "Tốt", subText: "Hài lòng", badge: "bg-emerald-50 text-emerald-700 border-emerald-200", color: "text-emerald-600" },
  5: { text: "Tuyệt vời", subText: "Rất hài lòng", badge: "bg-caramel-50 text-caramel-700 border-caramel-200", color: "text-caramel-600" },
};

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  size?: number;
  interactive?: boolean;
  showLabel?: boolean;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onRatingChange,
  size = 20,
  interactive = false,
  showLabel = false,
  className = "",
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const displayRating = hoverRating !== null ? hoverRating : rating;
  const currentLevel = displayRating >= 1 && displayRating <= 5 ? RATING_LEVELS[displayRating] : null;

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= displayRating;
          const isHovered = hoverRating === star;

          return (
            <motion.button
              key={star}
              type="button"
              disabled={!interactive}
              onClick={() => onRatingChange && onRatingChange(star)}
              onMouseEnter={() => interactive && setHoverRating(star)}
              onMouseLeave={() => interactive && setHoverRating(null)}
              whileHover={interactive ? { scale: 1.25, rotate: 6 } : undefined}
              whileTap={interactive ? { scale: 0.9 } : undefined}
              transition={{ type: "spring", stiffness: 450, damping: 17 }}
              className={`relative p-0.5 focus:outline-none ${
                interactive ? "cursor-pointer" : "cursor-default"
              }`}
              aria-label={`${star} sao`}
            >
              <Star
                size={size}
                className={`transition-colors duration-150 ${
                  isFilled
                    ? "fill-amber-400 text-amber-400 drop-shadow-[0_2px_4px_rgba(251,191,36,0.3)]"
                    : "text-sand-300 fill-transparent hover:text-amber-300"
                } ${isHovered ? "scale-105" : ""}`}
              />
            </motion.button>
          );
        })}
      </div>

      {showLabel && currentLevel && (
        <AnimatePresence mode="wait">
          <motion.div
            key={displayRating}
            initial={{ opacity: 0, x: -6, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 6, scale: 0.92 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${currentLevel.badge} inline-flex items-center space-x-1 shadow-xs`}
          >
            <span>{currentLevel.text}</span>
            {currentLevel.subText && (
              <span className="font-normal opacity-70 text-[10px]">({currentLevel.subText})</span>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

