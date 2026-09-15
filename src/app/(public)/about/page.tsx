"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Phone, MessageCircle } from "lucide-react";
import { SALON_INFO, SALON_VALUES } from "@/constants/salon";
import { GoogleMapSection } from "@/components/google-map-section";
import { ScrollReveal, ScrollStaggerContainer, ScrollStaggerItem } from "@/components/ui/scroll-reveal";

export default function AboutPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-6 space-y-24">
        
        <ScrollReveal direction="down" delay={0.1}>
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 bg-sand-100 text-caramel-600 px-3.5 py-1 rounded-full text-xs font-medium uppercase tracking-widest">
              <Sparkles size={13} />
              <span>Câu Chuyện Thương Hiệu</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-espresso-900 leading-tight">
              Về Mai Nguyễn Wigs Atelier
            </h1>

            <p className="text-espresso-600 text-sm font-light leading-relaxed">
              Nơi tôn vinh vẻ đẹp tự nhiên, kiêu kỳ và phong thái tự tin của phái đẹp qua những tác phẩm tóc thật thủ công độc bản.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollReveal direction="right" delay={0.2}>
            <div className="space-y-6 text-espresso-700 text-sm font-light leading-relaxed">
              <span className="text-xs uppercase tracking-widest text-caramel-600 font-semibold block">
                Triết Lý Làm Đẹp Tự Nhiên
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-espresso-900 leading-snug">
                &ldquo;Mái tóc đẹp nhất là mái tóc phản chiếu linh hồn và phong thái của chính bạn.&rdquo;
              </h2>
              <p>
                Khởi nguồn từ tình yêu và đam mê bất tận với nghệ thuật tạo mẫu tóc, nhà tạo mẫu <strong>Mai Nguyễn</strong> đã sáng lập atelier với một tâm niệm giản dị: Giúp mọi phụ nữ lấy lại sự tự tin rạng ngời và kiêu hãnh nhất.
              </p>
              <p>
                Khác biệt hoàn toàn với những bộ tóc sợi nilon tổng hợp công nghiệp xơ cứng, từng tác phẩm tại Mai Nguyễn được tuyển chọn khắt khe từ <strong>100% tóc thật tự nhiên nguyên bản</strong>. Sợi tóc giữ nguyên lớp biểu bì mượt mà, bồng bềnh và bắt sáng đa chiều.
              </p>
              <p>
                Đặc biệt, màng ren siêu da đầu <strong>HD Swiss Invisible Lace</strong> mỏng nhẹ tiệp màu da 100%, cho cảm giác thông thoáng tối đa và đường rẽ ngôi tự nhiên không thể nhận biết.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.3}>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-sand-200 bg-sand-100 group">
              <Image
                src="/images/sample-chocolate-waves.jpg"
                alt="Nhà tạo mẫu tóc Mai Nguyễn"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-serif text-lg font-semibold">Nhà Tạo Mẫu Mai Nguyễn</p>
                <p className="text-xs text-sand-100 mt-0.5">Sáng lập & Trực tiếp may đo tạo kiểu độc bản</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="up" delay={0.1}>
          <div className="bg-white rounded-3xl border border-sand-200 p-8 md:p-12 shadow-sm">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <span className="text-xs uppercase tracking-widest text-caramel-600 font-semibold block">
                Cam Kết Vàng
              </span>
              <h2 className="font-serif text-3xl font-bold text-espresso-900">
                Giá Trị Cốt Lõi Tại Mai Nguyễn
              </h2>
            </div>

            <ScrollStaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {SALON_VALUES.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <ScrollStaggerItem key={idx}>
                    <div className="text-center space-y-3 p-4 rounded-2xl bg-sand-50/50 h-full">
                      <div className="w-12 h-12 rounded-full bg-white border border-sand-200 flex items-center justify-center mx-auto text-caramel-500 shadow-sm">
                        <Icon size={22} />
                      </div>
                      <h3 className="font-serif text-base font-bold text-espresso-900">{val.title}</h3>
                      <p className="text-xs text-espresso-600 font-light leading-relaxed">{val.desc}</p>
                    </div>
                  </ScrollStaggerItem>
                );
              })}
            </ScrollStaggerContainer>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <div className="bg-sand-100 rounded-3xl border border-sand-200 p-8 md:p-12 text-center space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-espresso-900">
              Bạn Đang Cần Tư Vấn May Đo Riêng?
            </h2>
            <p className="text-sm text-espresso-600 font-light max-w-xl mx-auto leading-relaxed">
              Đừng ngần ngại nhắn tin hoặc đặt lịch ghé thăm không gian salon Mai Nguyễn để được kiểm tra chất tóc và đo size vòng đầu riêng tư.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href={SALON_INFO.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-caramel-500 hover:bg-caramel-600 text-white text-xs font-semibold px-8 py-4 rounded-full uppercase tracking-wider shadow-md transition-all flex items-center space-x-2 hover:scale-105"
              >
                <MessageCircle size={16} />
                <span>Nhắn Zalo Với Nhà Tạo Mẫu</span>
              </a>

              <a
                href={`tel:${SALON_INFO.phone}`}
                className="bg-white hover:bg-sand-50 text-espresso-900 border border-sand-300 text-xs font-medium px-7 py-4 rounded-full uppercase tracking-wider shadow-sm transition-colors flex items-center space-x-2"
              >
                <Phone size={14} className="text-caramel-500" />
                <span>Hotline: {SALON_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>

      <div className="mt-20">
        <ScrollReveal direction="up" delay={0.1}>
          <GoogleMapSection />
        </ScrollReveal>
      </div>
    </div>
  );
}
