"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Search, Filter, MessageCircle, RotateCcw } from "lucide-react";
import { useMockStore } from "@/context/mock-store";
import { LOOKBOOK_CATEGORIES, SALON_INFO } from "@/constants/salon";
import { LookbookCard } from "@/components/lookbook-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function ProductsPage() {
  const { products } = useMockStore();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (!p) return false;

      // Category matching logic
      let matchCategory = true;
      if (selectedCategory !== "all") {
        const catObj = LOOKBOOK_CATEGORIES.find((c) => c.id === selectedCategory);
        const selectedName = catObj ? catObj.name.toLowerCase() : selectedCategory.toLowerCase();
        const prodCat = (p.category || "").toLowerCase();

        matchCategory =
          prodCat.includes(selectedName) ||
          selectedName.includes(prodCat) ||
          (selectedCategory === "wavy" && (prodCat.includes("xoăn") || prodCat.includes("sóng"))) ||
          (selectedCategory === "bob" && (prodCat.includes("bob") || prodCat.includes("ngang vai") || prodCat.includes("ngắn"))) ||
          (selectedCategory === "straight" && (prodCat.includes("thẳng") || prodCat.includes("suôn") || prodCat.includes("layer"))) ||
          (selectedCategory === "topper" && (prodCat.includes("mái") || prodCat.includes("đỉnh") || prodCat.includes("bạc")));
      }

      // Search query matching logic
      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        (p.description || "").toLowerCase().includes(query) ||
        (p.category || "").toLowerCase().includes(query);

      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        <ScrollReveal direction="down" delay={0.1}>
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <div className="inline-flex items-center space-x-2 bg-sand-100 text-caramel-600 px-3.5 py-1 rounded-full text-xs font-medium uppercase tracking-widest">
              <Sparkles size={13} />
              <span>Lookbook Tóc Thật Thủ Công</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-espresso-900 leading-tight">
              Bộ Sưu Tập Tóc Giả Cao Cấp
            </h1>

            <p className="text-espresso-600 text-sm font-light leading-relaxed max-w-xl mx-auto">
              Khám phá các tác phẩm tóc giả 100% tóc thật với đa dạng kiểu dáng từ xoăn sóng lụa, bob trẻ trung đến mái phủ bạc. Rê chuột trên mỗi mẫu để xem chi tiết góc nghiêng và da đầu.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <div className="bg-white rounded-3xl border border-sand-200 p-6 mb-10 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              <div className="flex flex-wrap items-center gap-2">
                {LOOKBOOK_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-xs tracking-wider transition-all duration-300 cursor-pointer ${
                      selectedCategory === cat.id
                        ? "bg-caramel-500 text-white font-semibold shadow-sm scale-105"
                        : "bg-sand-50 text-espresso-700 hover:bg-sand-100 border border-sand-200 hover:border-caramel-300"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[260px]">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-espresso-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm mẫu tóc..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-sand-50 border border-sand-200 rounded-full pl-9 pr-4 py-2 text-xs text-espresso-900 placeholder-espresso-400 focus:outline-none focus:border-caramel-500 transition-colors"
                />
              </div>

            </div>
          </div>
        </ScrollReveal>

        {filteredProducts.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <LookbookCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white rounded-3xl border border-sand-200 p-8 space-y-4"
          >
            <Filter size={32} className="text-caramel-400 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-espresso-900">
              Không tìm thấy mẫu tóc phù hợp
            </h3>
            <p className="text-xs text-espresso-500 max-w-md mx-auto">
              Không tìm thấy kết quả cho danh mục hoặc từ khóa đã chọn. Vui lòng chọn lại danh mục hoặc gửi yêu cầu may mẫu riêng cho thợ tạo mẫu Mai Nguyễn.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-sand-100 text-espresso-800 text-xs font-semibold rounded-full hover:bg-sand-200 transition-colors cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>Xem Tất Cả Mẫu Tóc</span>
              </button>
              <a
                href={SALON_INFO.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-caramel-500 text-white text-xs px-6 py-2.5 rounded-full font-semibold shadow-sm hover:bg-caramel-600 transition-colors"
              >
                <MessageCircle size={14} />
                <span>Tư Vấn May Đo Qua Zalo</span>
              </a>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
