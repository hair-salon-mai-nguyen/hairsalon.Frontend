"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMockStore } from "@/context/mock-store";
import { formatPrice } from "@/utils/format";
import { StarRating } from "@/components/star-rating";
import { HairWaveCanvas } from "@/components/hair-wave-canvas";
import { Scissors, Sparkles, ShieldCheck, HeartHandshake, ArrowRight, MessageSquare } from "lucide-react";

export default function HomePage() {
  const { products, reviews } = useMockStore();

  // Get featured products
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 3);
  
  // Get approved reviews to display
  const approvedReviews = reviews.filter((r) => r.status === "APPROVED").slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <div className="bg-background min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden border-b border-dark-border">
        {/* Silky Hair Waves Simulation background */}
        <HairWaveCanvas />

        {/* Ambient Dark/Gold Vignette */}
        <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8 select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center space-x-2 border border-gold-500/30 bg-gold-900/10 px-4 py-1.5 rounded-full text-gold-300 text-xs tracking-widest uppercase mb-2 backdrop-blur-sm"
          >
            <Sparkles size={12} className="animate-pulse" />
            <span>Thương Hiệu Tóc Giả Sang Trọng Bậc Nhất</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-7xl font-serif leading-tight text-gold-gradient font-semibold uppercase tracking-wide"
          >
            Tuyệt Tác Tóc Giả <br />
            100% Tóc Thật Tự Nhiên
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto text-neutral-400 text-sm md:text-base leading-relaxed tracking-wider font-light"
          >
            Đo may, uốn nhuộm và tạo kiểu thủ công theo yêu cầu riêng biệt. 
            Mô phỏng lớp siêu da đầu HD thông thoáng chân thật tuyệt đối, mang lại sự kiêu hãnh tự tin cho bạn.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4"
          >
            <Link
              href="/products"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gold-gradient text-black font-semibold text-xs tracking-widest uppercase hover:shadow-[0_0_30px_rgba(197,155,63,0.3)] transition-all duration-300 text-center"
            >
              Khám Phá Sản Phẩm
            </Link>
            <a
              href="https://zalo.me/0912345678"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-neutral-700 bg-neutral-900/20 backdrop-blur-sm text-neutral-200 hover:text-white hover:border-gold-500 transition-colors duration-300 text-center text-xs tracking-widest uppercase flex items-center justify-center space-x-2"
            >
              <span>Tư Vấn Thiết Kế</span>
              <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-50">
          <span className="text-[9px] tracking-[0.25em] text-neutral-400 uppercase">Cuộn xuống</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gold-500 to-transparent" />
        </div>
      </section>

      {/* 2. Core Values Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 border-b border-dark-border">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs tracking-[0.3em] uppercase text-gold-500 block">Sự Khác Biệt</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold uppercase tracking-wider text-gold-200">
            Triết Lý Mai Nguyễn Luxury
          </h2>
          <p className="text-neutral-400 text-xs md:text-sm font-light">
            Mỗi bộ tóc giả không chỉ là một sản phẩm, mà là một tác phẩm nghệ thuật tôn vinh khí chất quý cô.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              icon: <Scissors className="text-gold-500 w-6 h-6" />,
              title: "Tóc Thật Tuyển Chọn",
              desc: "Sử dụng 100% tóc thật tự nhiên chưa qua hóa chất tẩy nhuộm, sợi tóc chắc khỏe, suôn mượt óng ả.",
            },
            {
              icon: <Sparkles className="text-gold-500 w-6 h-6" />,
              title: "Siêu Da Đầu HD Silk",
              desc: "Màng lưới ren HD cao cấp siêu mỏng, tiệp hoàn hảo vào màu da đầu, thoáng khí và êm nhẹ tối đa.",
            },
            {
              icon: <ShieldCheck className="text-gold-500 w-6 h-6" />,
              title: "May Đo Cá Nhân Hóa",
              desc: "Lấy số đo chuẩn chu vi đầu của từng khách hàng, căn chỉnh mật độ phân bổ tóc tự nhiên nhất.",
            },
            {
              icon: <HeartHandshake className="text-gold-500 w-6 h-6" />,
              title: "Bảo Hành Trọn Đời",
              desc: "Hỗ trợ phục hồi spa tóc, uốn tạo kiểu mới, dặm thêm tóc trọn đời sản phẩm tại Hair Salon.",
            },
          ].map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-panel glass-panel-hover p-8 rounded-2xl space-y-4 border border-dark-border"
            >
              <div className="w-12 h-12 rounded-full border border-gold-500/20 bg-background flex items-center justify-center">
                {val.icon}
              </div>
              <h3 className="font-serif text-base text-gold-200 font-semibold tracking-wider">{val.title}</h3>
              <p className="text-neutral-400 text-xs leading-relaxed font-light">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Featured Showcase */}
      <section className="py-24 bg-dark-card/30 border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-4">
              <span className="text-xs tracking-[0.3em] uppercase text-gold-500 block">Bộ Sưu Tập Nổi Bật</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold uppercase tracking-wider text-gold-200">
                Tác Phẩm Đặc Sắc
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs tracking-widest uppercase text-gold-400 hover:text-gold-300 flex items-center space-x-2 transition-colors border-b border-gold-500/40 pb-1"
            >
              <span>Xem tất cả sản phẩm</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Brand Story Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center border-b border-dark-border">
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-gold-500 block">Hành Trình Kiến Tạo</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold uppercase tracking-wider text-gold-200 leading-tight">
            Mai Nguyễn <br />
            Uốn Nắn Từng Sợi Tơ
          </h2>
          <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed">
            Chúng tôi tin rằng mái tóc chính là vương miện kiêu kỳ nhất của người phụ nữ. 
            Tại Mai Nguyễn, mỗi sản phẩm tóc giả làm bằng tóc thật đều trải qua quy trình khử trùng sinh học, 
            tuyển chọn thủ công nghiêm ngặt và được dệt móc bằng bàn tay lành nghề của những người thợ làm tóc giàu tâm huyết.
          </p>
          <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed">
            Cho dù bạn muốn thay đổi phong cách tạm thời, che đi khuyết điểm mái tóc hay cần một vẻ ngoài lộng lẫy nhất trong những dịp trọng đại, 
            Mai Nguyễn luôn sẵn sàng lắng nghe và thiết kế riêng cho bạn những dáng tóc hoàn mỹ nhất.
          </p>
          <div className="pt-4">
            <Link
              href="/about"
              className="inline-flex items-center space-x-2 text-xs tracking-widest uppercase text-gold-400 hover:text-gold-300 font-semibold transition-colors pb-1 border-b border-gold-400/30"
            >
              <span>Đọc Câu Chuyện Của Chúng Tôi</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-square md:aspect-[4/3] w-full rounded-2xl overflow-hidden border border-dark-border"
        >
          <Image
            src="https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=800&auto=format&fit=crop"
            alt="Artisan wig maker"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full border border-gold-500 flex items-center justify-center bg-black/60 backdrop-blur-md">
                <Scissors size={14} className="text-gold-500" />
              </div>
              <div>
                <p className="font-serif text-sm text-gold-200 font-medium">May Đo Thủ Công 100%</p>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest">Đo đạc theo tỉ lệ vàng khuôn mặt</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 5. Testimonial Section */}
      <section className="py-24 bg-dark-card/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs tracking-[0.3em] uppercase text-gold-500 block">Phản Hồi Từ Khách Hàng</span>
            <h2 className="text-3xl font-serif font-bold uppercase tracking-wider text-gold-200">
              Khách Hàng Nói Gì Về Chúng Tôi
            </h2>
          </div>

          {approvedReviews.length === 0 ? (
            <p className="text-center text-xs text-neutral-500">Chưa có đánh giá nào được phê duyệt.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {approvedReviews.map((review) => (
                <div
                  key={review.id}
                  className="glass-panel p-8 rounded-2xl space-y-6 border border-dark-border/40 relative flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <StarRating rating={review.rating} size={14} />
                      <MessageSquare size={16} className="text-gold-500/20" />
                    </div>
                    <p className="text-neutral-300 text-xs italic font-light leading-relaxed">
                      &ldquo;{review.comment}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 pt-6 border-t border-dark-border/40">
                    {review.media.length > 0 && (
                      <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-neutral-700">
                        <Image
                          src={review.media[0].url}
                          alt="Review image"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="font-serif text-xs text-gold-200 font-semibold">{review.userName}</h4>
                      <p className="text-[9px] text-neutral-500 uppercase tracking-widest mt-0.5">
                        Khách mua {review.productName.split(" - ")[0]}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
