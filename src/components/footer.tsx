"use client";

import React from "react";
import Link from "next/link";
import { Scissors, Phone, MapPin, Clock, Mail, MessageCircle, Heart } from "lucide-react";
import { SALON_INFO } from "@/constants/salon";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-sand-100 border-t border-sand-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 text-espresso-800">
        <div className="space-y-4">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-full border border-caramel-300 flex items-center justify-center bg-white shadow-sm">
              <Scissors className="text-caramel-500 w-4 h-4" />
            </div>
            <div>
              <span className="font-serif text-base tracking-widest text-espresso-900 uppercase font-bold block leading-none">
                {SALON_INFO.brandName}
              </span>
              <span className="text-[8px] tracking-[0.25em] text-espresso-500 uppercase leading-none block mt-1">
                {SALON_INFO.brandSub}
              </span>
            </div>
          </Link>
          <p className="text-espresso-600 text-xs leading-relaxed max-w-xs pt-1 font-light">
            Thương hiệu tóc giả cao cấp Mai Nguyễn - Tôn vinh nét đẹp kiêu kỳ và phong thái tự nhiên của bạn bằng những tác phẩm tóc thật thủ công may đo riêng biệt.
          </p>
          <div className="pt-2">
            <a
              href={SALON_INFO.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-caramel-500 hover:bg-caramel-600 text-white text-xs px-4 py-2 rounded-full transition-colors shadow-sm"
            >
              <MessageCircle size={14} />
              <span>Nhắn Zalo Trực Tiếp</span>
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-serif text-sm tracking-widest uppercase mb-5 font-semibold text-espresso-900">
            Danh Mục Khám Phá
          </h3>
          <ul className="space-y-2.5 text-xs text-espresso-700 font-light">
            <li>
              <Link href="/" className="hover:text-caramel-600 transition-colors">
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-caramel-600 transition-colors">
                Bộ Sưu Tập Tóc Thật
              </Link>
            </li>
            <li>
              <Link href="/studio-3d" className="hover:text-caramel-600 transition-colors">
                Phòng Thử Tóc & Chọn Dáng
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-caramel-600 transition-colors">
                Câu Chuyện Mai Nguyễn
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-caramel-600 transition-colors text-espresso-400">
                Khu Vực Quản Trị
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-serif text-sm tracking-widest uppercase mb-5 font-semibold text-espresso-900">
            Không Gian Salon & Liên Hệ
          </h3>
          <ul className="space-y-3 text-xs text-espresso-700 font-light">
            <li className="flex items-start space-x-2.5">
              <MapPin size={15} className="text-caramel-500 shrink-0 mt-0.5" />
              <span>{SALON_INFO.address}</span>
            </li>
            <li className="flex items-center space-x-2.5">
              <Phone size={15} className="text-caramel-500 shrink-0" />
              <a href={`tel:${SALON_INFO.phone}`} className="hover:text-caramel-600 font-medium transition-colors">
                Hotline: {SALON_INFO.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center space-x-2.5">
              <Mail size={15} className="text-caramel-500 shrink-0" />
              <a href={`mailto:${SALON_INFO.email}`} className="hover:text-caramel-600 transition-colors">
                {SALON_INFO.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-serif text-sm tracking-widest uppercase mb-5 font-semibold text-espresso-900">
            Giờ Phục Vụ Tại Atelier
          </h3>
          <ul className="space-y-3 text-xs text-espresso-700 font-light">
            <li className="flex items-start space-x-2.5">
              <Clock size={15} className="text-caramel-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-espresso-900">Thứ Hai - Chủ Nhật</p>
                <p className="text-espresso-600 mt-0.5">{SALON_INFO.operatingHours}</p>
              </div>
            </li>
            <li className="pt-2 text-espresso-500 italic text-[11px] leading-relaxed">
              * Quý khách vui lòng gọi trước hoặc nhắn Zalo để được sắp xếp lịch thử tóc và đo size vòng đầu riêng tư tốt nhất.
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-sand-200 py-6 text-center text-xs text-espresso-500 tracking-wider">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>&copy; {new Date().getFullYear()} {SALON_INFO.brandName} {SALON_INFO.brandSub}. ALL RIGHTS RESERVED.</p>
          <p className="flex items-center space-x-1 text-[11px] text-espresso-400">
            <span>Crafted with</span>
            <Heart size={12} className="text-caramel-500 fill-caramel-500" />
            <span>for natural beauty & elegance</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
