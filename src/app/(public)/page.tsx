"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, ArrowRight, MessageCircle, Scissors 
} from "lucide-react";
import { useMockStore } from "@/context/mock-store";
import { 
  SALON_INFO, LOOKBOOK_CATEGORIES, BEFORE_AFTER_ITEMS, 
  CRAFT_STEPS, TESTIMONIALS, SALON_VALUES 
} from "@/constants/salon";
import { LookbookCard } from "@/components/lookbook-card";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { GoogleMapSection } from "@/components/google-map-section";
import { StarRating } from "@/components/star-rating";
import { 
  ScrollReveal, ScrollStaggerContainer, ScrollStaggerItem 
} from "@/components/ui/scroll-reveal";

export default function HomePage() {
  const { products } = useMockStore();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeBeforeAfterIndex, setActiveBeforeAfterIndex] = useState(0);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return products;
    const catObj = LOOKBOOK_CATEGORIES.find((c) => c.id === selectedCategory);
    const selectedName = catObj ? catObj.name.toLowerCase() : selectedCategory.toLowerCase();

    return products.filter((p) => {
      if (!p) return false;
      const prodCat = (p.category || "").toLowerCase();
      return (
        prodCat.includes(selectedName) ||
        selectedName.includes(prodCat) ||
        (selectedCategory === "wavy" && (prodCat.includes("xoăn") || prodCat.includes("sóng"))) ||
        (selectedCategory === "bob" && (prodCat.includes("bob") || prodCat.includes("ngang vai") || prodCat.includes("ngắn"))) ||
        (selectedCategory === "straight" && (prodCat.includes("thẳng") || prodCat.includes("suôn") || prodCat.includes("layer"))) ||
        (selectedCategory === "topper" && (prodCat.includes("mái") || prodCat.includes("đỉnh") || prodCat.includes("bạc")))
      );
    });
  }, [products, selectedCategory]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      
      <section className="relative overflow-hidden pt-8 pb-20 md:py-24 border-b border-sand-200 bg-sand-50/60">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sand-200/40 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-caramel-100/30 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-7 space-y-7 text-left">
              <ScrollReveal direction="down" delay={0.1}>
                <div className="inline-flex items-center space-x-2 bg-white px-4 py-1.5 rounded-full border border-sand-200 shadow-sm text-caramel-600 text-xs tracking-widest uppercase font-medium">
                  <Sparkles size={13} className="text-caramel-500" />
                  <span>Atelier Tóc Giả May Đo Cao Cấp</span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.2}>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-espresso-900 leading-[1.15] tracking-tight">
                  Mái tóc đẹp kể <br />
                  <span className="italic font-normal text-caramel-600">câu chuyện & phong thái</span> <br />
                  tự nhiên của bạn
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <p className="text-espresso-600 text-sm sm:text-base font-light leading-relaxed max-w-xl">
                  Mỗi bộ tóc giả tại Mai Nguyễn là một tác phẩm thủ công độc bản từ <strong>100% tóc thật tự nhiên</strong>, kết hợp màng ren siêu tàng hình tiệp màu da đầu, mang lại vẻ đẹp thanh lịch, kiêu kỳ và bồng bềnh tự nhiên như tóc mọc từ chính cơ thể bạn.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.4}>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href={SALON_INFO.zaloUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-caramel-500 hover:bg-caramel-600 text-white font-semibold text-xs tracking-widest uppercase px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all flex items-center space-x-2 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <MessageCircle size={16} />
                    <span>Tư Vấn May Đo Qua Zalo</span>
                  </a>

                  <Link
                    href="/products"
                    className="bg-white hover:bg-sand-100 text-espresso-900 border border-sand-300 font-semibold text-xs tracking-widest uppercase px-7 py-4 rounded-full shadow-sm transition-all flex items-center space-x-2 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Xem Bộ Sưu Tập</span>
                    <ArrowRight size={14} className="text-caramel-500" />
                  </Link>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.5}>
                <div className="pt-6 border-t border-sand-200 grid grid-cols-3 gap-4 text-center sm:text-left">
                  <div>
                    <p className="font-serif text-2xl font-bold text-espresso-900">100%</p>
                    <p className="text-[11px] text-espresso-500 uppercase tracking-wider mt-0.5">Tóc Thật Tuyển Chọn</p>
                  </div>
                  <div>
                    <p className="font-serif text-2xl font-bold text-espresso-900">HD Lace</p>
                    <p className="text-[11px] text-espresso-500 uppercase tracking-wider mt-0.5">Ren Siêu Tàng Hình</p>
                  </div>
                  <div>
                    <p className="font-serif text-2xl font-bold text-espresso-900">Custom</p>
                    <p className="text-[11px] text-espresso-500 uppercase tracking-wider mt-0.5">May Đo Theo Size Đầu</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-5">
              <ScrollReveal direction="left" delay={0.3} duration={0.9}>
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-sand-100 group">
                    <Image
                      src="/images/sample-chocolate-waves.jpg"
                      alt="Mẫu tóc sóng lụa cao cấp Mai Nguyễn"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/60 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <span className="bg-caramel-500 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
                        Tác Phẩm Tiêu Biểu
                      </span>
                      <h2 className="font-serif text-xl font-semibold mt-2">
                        Sóng Lụa Nâu Hạt Dẻ
                      </h2>
                      <p className="text-xs text-sand-100 font-light mt-1">
                        Móc thủ công từng sợi vào ren HD siêu mỏng thoáng khí
                      </p>
                    </div>
                  </div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute -bottom-5 -left-5 bg-white p-4 rounded-2xl border border-sand-200 shadow-xl max-w-[200px] hidden sm:block"
                  >
                    <div className="flex items-center space-x-2 text-caramel-600">
                      <Scissors size={16} />
                      <span className="font-serif text-xs font-bold text-espresso-900">May Đo Riêng</span>
                    </div>
                    <p className="text-[10px] text-espresso-500 mt-1 leading-relaxed">
                      Lấy 6 số đo vòng đầu chuẩn từng milimet
                    </p>
                  </motion.div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollStaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SALON_VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <ScrollStaggerItem key={idx}>
                  <div className="flex items-start space-x-3.5 p-4 rounded-2xl bg-sand-50/50 border border-sand-100 hover:border-sand-200 transition-colors h-full">
                    <div className="w-10 h-10 rounded-full bg-white border border-sand-200 flex items-center justify-center shrink-0 shadow-sm text-caramel-500">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="font-serif text-sm font-bold text-espresso-900">{val.title}</h3>
                      <p className="text-xs text-espresso-600 font-light mt-1 leading-relaxed">{val.desc}</p>
                    </div>
                  </div>
                </ScrollStaggerItem>
              );
            })}
          </ScrollStaggerContainer>
        </div>
      </section>

      <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 w-full">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
            <span className="text-xs tracking-[0.25em] uppercase text-caramel-600 font-semibold block">
              The Signature Lookbook
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-espresso-900 leading-tight">
              Bộ Sưu Tập Tóc Thật May Đo
            </h2>
            <p className="text-sm text-espresso-600 font-light leading-relaxed">
              Rê chuột vào từng bức ảnh để xem <strong>góc nghiêng và cận cảnh da đầu siêu thật</strong>. Mỗi mẫu tóc đều có thể tinh chỉnh màu sắc và độ dài theo mong muốn của bạn.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-4 max-w-3xl mx-auto">
              {LOOKBOOK_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-[13px] tracking-wide transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-caramel-500 text-white font-semibold shadow-sm scale-105"
                      : "bg-white text-espresso-700 hover:bg-sand-100 border border-sand-200 hover:border-caramel-300"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

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

        <ScrollReveal direction="up" delay={0.2}>
          <div className="mt-14 text-center">
            <Link
              href="/products"
              className="inline-flex items-center space-x-2 bg-espresso-900 hover:bg-caramel-600 text-white font-semibold text-xs tracking-widest uppercase px-8 py-4 rounded-full transition-all shadow-md hover:scale-[1.02]"
            >
              <span>Khám Phá Tất Cả Mẫu Tóc Giả</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <section className="py-20 md:py-28 bg-sand-100/70 border-y border-sand-200">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
              <span className="text-xs tracking-[0.25em] uppercase text-caramel-600 font-semibold block">
                Trải Nghiệm Thực Tế
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-espresso-900 leading-tight">
                Biến Hóa Trước & Sau Khi Đội Tóc
              </h2>
              <p className="text-sm text-espresso-600 font-light leading-relaxed">
                Trực quan kiểm chứng độ chân thực của màng ren siêu da đầu và khả năng tôn dáng gương mặt của các mẫu tóc Mai Nguyễn.
              </p>

              <div className="flex items-center justify-center gap-3 pt-2">
                {BEFORE_AFTER_ITEMS.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveBeforeAfterIndex(idx)}
                    className={`px-5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      activeBeforeAfterIndex === idx
                        ? "bg-caramel-500 text-white shadow-sm scale-105"
                        : "bg-white text-espresso-700 hover:bg-sand-200 border border-sand-300"
                    }`}
                  >
                    Trường hợp {idx + 1}: {item.tag}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2} duration={0.8}>
            <BeforeAfterSlider item={BEFORE_AFTER_ITEMS[activeBeforeAfterIndex]} />
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 w-full">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs tracking-[0.25em] uppercase text-caramel-600 font-semibold block">
              Nghệ Thuật Chế Tác
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-espresso-900 leading-tight">
              Quy Trình May Đo Thủ Công Độc Bản
            </h2>
            <p className="text-sm text-espresso-600 font-light leading-relaxed">
              Mỗi tác phẩm tóc giả mất từ 45 đến 70 giờ móc tay tỉ mỉ qua 4 bước chuẩn mực atelier để đạt đến độ hoàn mỹ cao nhất.
            </p>
          </div>
        </ScrollReveal>

        <ScrollStaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {CRAFT_STEPS.map((step, idx) => (
            <ScrollStaggerItem key={idx}>
              <div className="bg-white rounded-3xl overflow-hidden border border-sand-200 shadow-sm flex flex-col group hover:shadow-md transition-shadow duration-300 h-full">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand-100">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-espresso-900/80 backdrop-blur-md text-white font-serif text-xs px-3 py-1 rounded-full font-bold">
                    Bước {step.step}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[10px] text-caramel-600 font-semibold uppercase tracking-wider block">
                      {step.subtitle}
                    </span>
                    <h3 className="font-serif text-base font-bold text-espresso-900 mt-1 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-espresso-600 font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollStaggerItem>
          ))}
        </ScrollStaggerContainer>
      </section>

      <section className="py-20 md:py-28 bg-sand-50 border-t border-sand-200">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
              <span className="text-xs tracking-[0.25em] uppercase text-caramel-600 font-semibold block">
                Gửi Gắm Yêu Thương
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-espresso-900 leading-tight">
                Cảm Nhận Từ Khách Hàng
              </h2>
              <p className="text-sm text-espresso-600 font-light leading-relaxed">
                Niềm hạnh phúc lớn nhất của chúng tôi là được nhìn thấy nụ cười tự tin và rạng ngời của từng khách hàng khi đội lên mái tóc Mai Nguyễn.
              </p>
            </div>
          </ScrollReveal>

          <ScrollStaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testi) => (
              <ScrollStaggerItem key={testi.id}>
                <div className="bg-white p-7 rounded-3xl border border-sand-200 shadow-sm flex flex-col justify-between space-y-6 h-full hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <StarRating rating={testi.rating} size={15} />
                    <p className="text-espresso-700 text-xs sm:text-sm font-light leading-relaxed italic">
                      &ldquo;{testi.comment}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-sand-100 flex items-center space-x-3.5">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden border border-sand-300 bg-sand-100 shrink-0">
                      <Image
                        src={testi.avatar}
                        alt={testi.name}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-espresso-900 leading-tight">
                        {testi.name}
                      </h4>
                      <p className="text-[11px] text-espresso-500 mt-0.5">
                        {testi.role} • {testi.location}
                      </p>
                      <span className="inline-block text-[10px] text-caramel-600 font-medium bg-sand-100 px-2 py-0.5 rounded-full mt-1">
                        Mẫu đã dùng: {testi.hairWorn || testi.hairStyle}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollStaggerItem>
            ))}
          </ScrollStaggerContainer>
        </div>
      </section>

      <ScrollReveal direction="up" delay={0.1}>
        <GoogleMapSection />
      </ScrollReveal>

    </div>
  );
}
