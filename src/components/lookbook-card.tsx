"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, MessageCircle, ArrowUpRight, Eye } from "lucide-react";
import { Product } from "@/context/mock-store";
import { SALON_INFO } from "@/constants/salon";

interface LookbookCardProps {
  product: Product;
}

export const LookbookCard: React.FC<LookbookCardProps> = ({ product }) => {
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const imgPrimary = product.images[0] || "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop";
  const imgSecondary = product.images[1] || product.images[0] || "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800&auto=format&fit=crop";

  const colorDots = [
    { name: "Nâu Chocolate", hex: "#3D281E" },
    { name: "Đen Tự Nhiên", hex: "#1C1917" },
    { name: "Nâu Hạt Dẻ", hex: "#5D3E2F" },
    { name: "Vàng Khói", hex: "#C7A779" },
  ];

  return (
    <div
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-sand-200 transition-all duration-500 hover:shadow-[0_20px_45px_-12px_rgba(74,50,36,0.12)] hover:border-caramel-400"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-sand-100 cursor-pointer">
        <Link href={`/products/${product.id}`} className="block w-full h-full">
          <Image
            src={imgPrimary}
            alt={`${product.name} - Góc chính diện`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover object-top transition-all duration-700 ease-out ${
              isHovered ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          />

          <Image
            src={imgSecondary}
            alt={`${product.name} - Góc nghiêng & Chi tiết`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover object-top transition-all duration-700 ease-out ${
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          />
        </Link>

        <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 pointer-events-none z-10">
          <span className="bg-white/95 backdrop-blur-md text-espresso-900 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border border-sand-200 shadow-sm">
            {product.category}
          </span>
          {product.isFeatured && (
            <span className="bg-caramel-500 text-white text-[10px] font-medium tracking-wider uppercase px-2 py-1 rounded-full shadow-sm flex items-center space-x-1">
              <Sparkles size={10} />
              <span>Hot</span>
            </span>
          )}
        </div>

        <div className="absolute top-3.5 right-3.5 pointer-events-none z-10">
          <div className="bg-espresso-900/75 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] text-white tracking-wider flex items-center space-x-1 shadow-sm transition-all duration-300">
            <Eye size={10} className="text-caramel-300" />
            <span>{isHovered ? "Góc 2/2" : "Góc 1/2"}</span>
          </div>
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 bg-white/95 backdrop-blur-md hover:bg-caramel-500 hover:text-white text-espresso-900 text-xs font-semibold py-2.5 px-3 rounded-xl border border-sand-200 shadow-md text-center transition-all flex items-center justify-center space-x-1.5 mr-2"
          >
            <span>Xem Chi Tiết</span>
            <ArrowUpRight size={13} />
          </Link>

          <a
            href={`${SALON_INFO.zaloUrl}?text=${encodeURIComponent(`Xin chào Mai Nguyễn, tôi muốn tư vấn mẫu tóc ${product.name}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-caramel-500 hover:bg-caramel-600 text-white rounded-xl flex items-center justify-center shadow-md transition-colors shrink-0"
            title="Nhắn Zalo tư vấn mẫu này"
          >
            <MessageCircle size={16} />
          </a>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between bg-white">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center space-x-1.5">
              {colorDots.map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveColorIndex(idx)}
                  className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                    activeColorIndex === idx
                      ? "ring-2 ring-caramel-500 ring-offset-1 scale-110 border-white"
                      : "border-sand-300 hover:scale-105"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={`Tone màu: ${c.name}`}
                />
              ))}
            </div>
            <span className="text-[10px] text-espresso-500 font-medium tracking-wide">
              {colorDots[activeColorIndex].name}
            </span>
          </div>

          <Link href={`/products/${product.id}`} className="block group-hover:text-caramel-600 transition-colors">
            <h3 className="font-serif text-base font-bold text-espresso-900 leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-espresso-600 font-light line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="pt-3.5 mt-3.5 border-t border-sand-100 flex items-center justify-between text-xs">
          <span className="text-[11px] text-caramel-600 font-medium">
            100% Tóc thật may đo
          </span>
          <a
            href={SALON_INFO.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-espresso-800 hover:text-caramel-600 font-semibold tracking-wider flex items-center space-x-1 transition-colors text-[11px]"
          >
            <span>Tư Vấn Zalo</span>
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};
