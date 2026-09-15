"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye, Maximize2, X } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  category: string;
}

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 280 : -280,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring" as const, stiffness: 350, damping: 30 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.25 },
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 280 : -280,
    opacity: 0,
    scale: 0.96,
    transition: {
      x: { type: "spring" as const, stiffness: 350, damping: 30 },
      opacity: { duration: 0.2 },
    },
  }),
};

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
  category,
}) => {
  const safeImages = images.length > 0 ? images : ["/images/sample-chocolate-waves.jpg"];
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const currentIndex = ((page % safeImages.length) + safeImages.length) % safeImages.length;

  const paginate = useCallback(
    (newDirection: number) => {
      setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
    },
    []
  );

  const setIndex = (targetIndex: number) => {
    const diff = targetIndex - currentIndex;
    if (diff !== 0) {
      setPage(([prevPage]) => [prevPage + diff, diff > 0 ? 1 : -1]);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "Escape") setIsLightboxOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paginate]);

  const angleLabels = ["Chính Diện", "Góc Nghiêng 45°", "Mặt Sau", "Cận Cảnh Da Đầu"];

  return (
    <div className="space-y-4 select-none">
      {/* Main Image Slider Frame */}
      <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden border border-sand-200 shadow-md bg-sand-100 group">
        
        {/* Category Pill */}
        <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md text-espresso-900 text-[11px] font-semibold tracking-wider uppercase px-3.5 py-1.5 rounded-full border border-sand-200 shadow-sm pointer-events-none">
          {category}
        </div>

        {/* Fullscreen Button */}
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md hover:bg-caramel-500 hover:text-white text-espresso-800 flex items-center justify-center border border-sand-200 shadow-sm transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-105 cursor-pointer"
          title="Xem ảnh phóng to"
          aria-label="Phóng to ảnh"
        >
          <Maximize2 size={15} />
        </button>

        {/* Animated Swipeable Image */}
        <div className="relative w-full h-full overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -10000 || offset.x < -80) {
                  paginate(1);
                } else if (swipe > 10000 || offset.x > 80) {
                  paginate(-1);
                }
              }}
              className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
            >
              <Image
                src={safeImages[currentIndex]}
                alt={`${productName} - ${angleLabels[currentIndex] || `Góc ${currentIndex + 1}`}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-top pointer-events-none"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Left / Right Arrow Navigation Buttons */}
        {safeImages.length > 1 && (
          <>
            <motion.button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                paginate(-1);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md hover:bg-caramel-500 hover:text-white text-espresso-900 flex items-center justify-center border border-sand-200 shadow-md transition-all duration-200 cursor-pointer"
              aria-label="Ảnh trước"
            >
              <ChevronLeft size={20} />
            </motion.button>

            <motion.button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                paginate(1);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md hover:bg-caramel-500 hover:text-white text-espresso-900 flex items-center justify-center border border-sand-200 shadow-md transition-all duration-200 cursor-pointer"
              aria-label="Ảnh kế tiếp"
            >
              <ChevronRight size={20} />
            </motion.button>
          </>
        )}

        {/* Bottom Angle Label & Counter */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <div className="bg-espresso-900/80 backdrop-blur-md text-white text-[11px] font-medium tracking-wide px-3.5 py-1.5 rounded-full flex items-center space-x-1.5 shadow-sm">
            <Eye size={12} className="text-caramel-400" />
            <span>{angleLabels[currentIndex] || `Góc ${currentIndex + 1}`}</span>
          </div>

          <div className="bg-espresso-900/80 backdrop-blur-md text-white text-[10px] tracking-widest font-mono px-3 py-1.5 rounded-full shadow-sm">
            {currentIndex + 1} / {safeImages.length}
          </div>
        </div>

        {/* Mobile Pagination Dots */}
        {safeImages.length > 1 && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-1.5 sm:hidden pointer-events-none">
            {safeImages.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? "w-5 bg-caramel-400" : "w-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails Row */}
      {safeImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {safeImages.map((img, idx) => {
            const isActive = currentIndex === idx;
            return (
              <motion.button
                key={idx}
                type="button"
                onClick={() => setIndex(idx)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative w-20 sm:w-24 h-24 sm:h-28 rounded-2xl overflow-hidden border-2 transition-all duration-300 shrink-0 bg-sand-100 cursor-pointer ${
                  isActive
                    ? "border-caramel-500 shadow-md ring-2 ring-caramel-400/40"
                    : "border-sand-200 opacity-60 hover:opacity-100 hover:border-caramel-300"
                }`}
                aria-label={`Chọn góc ${idx + 1}`}
              >
                <Image
                  src={img}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  sizes="100px"
                  className="object-cover object-top"
                />
                <span className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-xs text-[9px] text-white px-1.5 py-0.5 rounded font-mono">
                  {idx + 1}
                </span>
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 md:p-10"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer"
              aria-label="Đóng phóng to"
            >
              <X size={22} />
            </button>

            <div
              className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full max-h-[85vh]">
                <Image
                  src={safeImages[currentIndex]}
                  alt={`${productName} phóng to`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              {safeImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => paginate(-1)}
                    className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Ảnh trước"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <button
                    type="button"
                    onClick={() => paginate(1)}
                    className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Ảnh kế tiếp"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
