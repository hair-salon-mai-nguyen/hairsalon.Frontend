"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useMockStore } from "@/context/mock-store";
import { formatPrice } from "@/utils/format";
import { Search, ArrowRight, SlidersHorizontal } from "lucide-react";

export default function ProductsPage() {
  const { products } = useMockStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique categories for filters
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  // Filter products based on search and category selection
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* Header Title */}
        <div className="text-center space-y-4">
          <span className="text-xs tracking-[0.3em] uppercase text-gold-500 block">Bộ Sưu Tập</span>
          <h1 className="text-4xl md:text-5xl font-serif text-gold-gradient font-bold uppercase tracking-wider">
            Tóc Giả Cao Cấp
          </h1>
          <p className="text-neutral-400 text-xs md:text-sm font-light max-w-xl mx-auto leading-relaxed">
            Khám phá danh sách các tác phẩm tóc giả từ tóc thật tự nhiên được cắt tạo kiểu tỉ mỉ bởi Mai Nguyễn Salon.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-dark-card/50 border border-dark-border p-6 rounded-2xl max-w-5xl mx-auto">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm mẫu tóc..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background border border-dark-border rounded-full pl-11 pr-4 py-2.5 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-gold-500 transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-center">
            <SlidersHorizontal size={14} className="text-gold-500/60 hidden sm:inline mr-2" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-[10px] tracking-widest uppercase transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gold-gradient text-black font-semibold"
                    : "bg-background text-neutral-400 border border-dark-border hover:text-neutral-200 hover:border-neutral-700"
                }`}
              >
                {category === "All" ? "Tất Cả" : category}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-dark-border rounded-2xl max-w-2xl mx-auto space-y-4">
            <p className="text-neutral-400 text-sm">Không tìm thấy sản phẩm nào khớp với bộ lọc.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="text-xs text-gold-400 hover:underline"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="glass-panel group rounded-2xl overflow-hidden border border-dark-border flex flex-col h-full bg-background/40 hover:border-gold-500/20 transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-gold-500/30 px-3 py-1 rounded-full text-[10px] text-gold-300 uppercase tracking-widest font-semibold">
                    {product.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow space-y-4 justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-neutral-100 group-hover:text-gold-300 transition-colors font-medium tracking-wide line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-neutral-400 text-xs font-light line-clamp-2 leading-relaxed mt-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex justify-end items-center pt-4 border-t border-dark-border/40">
                    <Link
                      href={`/products/${product.id}`}
                      className="text-[10px] tracking-widest uppercase text-neutral-300 group-hover:text-gold-400 group-hover:underline flex items-center space-x-1 transition-colors"
                    >
                      <span>Xem Chi Tiết</span>
                      <ArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
