"use client";

import React from "react";
import Link from "next/link";
import { Scissors, Phone, MapPin, Clock, Mail } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-card border-t border-dark-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Info Column */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-full border border-gold-500/30 flex items-center justify-center bg-background group-hover:border-gold-500 transition-all duration-300">
              <Scissors className="text-gold-500 w-4 h-4" />
            </div>
            <div>
              <span className="font-serif text-sm tracking-widest text-gold-200 uppercase font-bold block leading-none">
                MAI NGUYEN
              </span>
              <span className="text-[8px] tracking-[0.25em] text-neutral-400 uppercase leading-none block mt-0.5">
                LUXURY HAIR SALON
              </span>
            </div>
          </Link>
          <p className="text-neutral-400 text-xs leading-relaxed max-w-xs pt-2">
            Thương hiệu tóc giả cao cấp Mai Nguyễn - Tôn vinh nét đẹp kiêu kỳ và sang trọng của bạn bằng những tác phẩm tóc thật thủ công hoàn hảo nhất.
          </p>
        </div>

        {/* Links Column */}
        <div>
          <h3 className="text-gold-400 font-serif text-sm tracking-widest uppercase mb-6 font-semibold">
            Danh Mục
          </h3>
          <ul className="space-y-3 text-xs text-neutral-300">
            <li>
              <Link href="/" className="hover:text-gold-400 transition-colors">
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gold-400 transition-colors">
                Giới Thiệu Shop
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-gold-400 transition-colors">
                Tất Cả Sản Phẩm
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-gold-400 transition-colors">
                Khu Vực Quản Trị
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="space-y-4">
          <h3 className="text-gold-400 font-serif text-sm tracking-widest uppercase mb-2 font-semibold">
            Liên Hệ
          </h3>
          <ul className="space-y-3 text-xs text-neutral-300">
            <li className="flex items-start space-x-2">
              <MapPin size={14} className="text-gold-500 shrink-0 mt-0.5" />
              <span>MAI NGUYEN Wigs Atelier, Hung Yen (See Map Above)</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone size={14} className="text-gold-500 shrink-0" />
              <a href="tel:0912345678" className="hover:text-gold-400 transition-colors">
                0912 345 678
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <Mail size={14} className="text-gold-500 shrink-0" />
              <a href="mailto:info@mainguyenluxury.com" className="hover:text-gold-400 transition-colors">
                info@mainguyenluxury.com
              </a>
            </li>
          </ul>
        </div>

        {/* Time Column */}
        <div className="space-y-4">
          <h3 className="text-gold-400 font-serif text-sm tracking-widest uppercase mb-2 font-semibold">
            Giờ Hoạt Động
          </h3>
          <ul className="space-y-3 text-xs text-neutral-300">
            <li className="flex items-start space-x-2">
              <Clock size={14} className="text-gold-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-neutral-200">Thứ 2 - Chủ Nhật</p>
                <p className="text-neutral-400 mt-1">08:00 AM - 09:00 PM</p>
              </div>
            </li>
            <li className="pt-2 text-neutral-400">
              * Vui lòng gọi trước để được đặt lịch tư vấn và đo size tóc riêng tư tốt nhất.
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="border-t border-dark-border/60 py-6 text-center text-[10px] text-neutral-500 tracking-wider">
        <p>&copy; {new Date().getFullYear()} MAI NGUYEN LUXURY HAIR SALON. ALL RIGHTS RESERVED.</p>
        <p className="mt-1 text-neutral-600">DESIGNED FOR PREMIUM QUALITY EXPERIENCE.</p>
      </div>
    </footer>
  );
};
