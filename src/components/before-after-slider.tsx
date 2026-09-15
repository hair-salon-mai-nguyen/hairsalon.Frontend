"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Sparkles, MoveHorizontal, CheckCircle2 } from "lucide-react";
import { BeforeAfterItem } from "@/constants/salon";

interface BeforeAfterSliderProps {
  item: BeforeAfterItem;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ item }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      handleMove(e.touches[0].clientX);
    },
    [handleMove]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  return (
    <div className="bg-white rounded-3xl border border-sand-200 p-6 md:p-8 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-sand-100 text-caramel-600 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
            <Sparkles size={13} />
            <span>{item.tag}</span>
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-bold text-espresso-900 leading-tight">
            {item.title}
          </h3>

          <p className="text-sm text-espresso-600 font-light leading-relaxed">
            {item.description}
          </p>

          <div className="pt-2 space-y-2.5">
            <div className="flex items-start space-x-2.5 text-xs text-espresso-800">
              <CheckCircle2 size={16} className="text-caramel-500 shrink-0 mt-0.5" />
              <span><strong>Mẫu tóc:</strong> {item.hairStyle}</span>
            </div>
            <div className="flex items-start space-x-2.5 text-xs text-espresso-800">
              <CheckCircle2 size={16} className="text-caramel-500 shrink-0 mt-0.5" />
              <span><strong>Đặc điểm:</strong> {item.resultNotes}</span>
            </div>
          </div>

          <div className="pt-3 text-[11px] text-espresso-500 italic">
            * Kéo thanh trượt hình tròn qua trái/phải để so sánh kết quả thực tế.
          </div>
        </div>

        <div className="lg:col-span-7">
          <div
            ref={containerRef}
            className="relative aspect-[4/3] md:aspect-[16/11] w-full rounded-2xl overflow-hidden select-none cursor-ew-resize border border-sand-200 shadow-md bg-sand-100"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={item.afterImg}
                alt="Sau khi sử dụng tóc giả Mai Nguyễn"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute top-4 right-4 bg-espresso-900/80 backdrop-blur-md text-white text-[11px] uppercase tracking-wider px-3 py-1 rounded-full font-medium z-10">
                Sau Khi Đội Tóc Mai Nguyễn
              </div>
            </div>

            <div
              className="absolute inset-0 w-full h-full"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <Image
                src={item.beforeImg}
                alt="Trước khi sử dụng tóc giả"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-espresso-900 text-[11px] uppercase tracking-wider px-3 py-1 rounded-full font-medium border border-sand-200 z-10">
                Trước Khi Đội
              </div>
            </div>

            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center pointer-events-none z-20"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-10 h-10 rounded-full bg-white text-espresso-900 shadow-xl border-2 border-caramel-500 flex items-center justify-center pointer-events-auto cursor-ew-resize hover:scale-110 transition-transform">
                <MoveHorizontal size={16} className="text-caramel-600" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
