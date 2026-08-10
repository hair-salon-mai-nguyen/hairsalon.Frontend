"use client";

import React from "react";
import { MapPin, Phone, Clock, Scissors } from "lucide-react";

export const GoogleMapSection: React.FC = () => {
  return (
    <section className="bg-background border-t border-dark-border py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Address and Info text column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <span className="text-xs tracking-[0.3em] uppercase text-gold-500 block">Địa Điểm Salon</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold uppercase tracking-wider text-gold-200">
              Gặp Gỡ Mai Nguyễn
            </h2>
            <p className="text-neutral-400 text-xs leading-relaxed font-light">
              Hãy ghé thăm không gian salon sang trọng của chúng tôi để được trực tiếp nhà tạo mẫu Mai Nguyễn đo chu vi đầu, tư vấn dáng tóc và lựa chọn chất liệu ren lưới da đầu phù hợp nhất.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {/* Address */}
            <div className="flex items-start space-x-3.5 text-xs text-neutral-300">
              <div className="w-8 h-8 rounded-full border border-gold-500/20 bg-dark-card flex items-center justify-center shrink-0 mt-0.5">
                <MapPin size={14} className="text-gold-500" />
              </div>
              <div>
                <h4 className="font-semibold text-neutral-200">Địa chỉ salon</h4>
                <p className="text-neutral-400 mt-1">MAI NGUYEN Wigs Atelier, Hung Yen (Map Location)</p>
              </div>
            </div>

            {/* Hotline */}
            <div className="flex items-start space-x-3.5 text-xs text-neutral-300">
              <div className="w-8 h-8 rounded-full border border-gold-500/20 bg-dark-card flex items-center justify-center shrink-0 mt-0.5">
                <Phone size={14} className="text-gold-500" />
              </div>
              <div>
                <h4 className="font-semibold text-neutral-200">Hotline & Zalo tư vấn</h4>
                <p className="text-neutral-400 mt-1">0912 345 678 (Đặt lịch trước để có trải nghiệm riêng tư tốt nhất)</p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-start space-x-3.5 text-xs text-neutral-300">
              <div className="w-8 h-8 rounded-full border border-gold-500/20 bg-dark-card flex items-center justify-center shrink-0 mt-0.5">
                <Clock size={14} className="text-gold-500" />
              </div>
              <div>
                <h4 className="font-semibold text-neutral-200">Giờ phục vụ tại salon</h4>
                <p className="text-neutral-400 mt-1">08:00 AM - 09:00 PM (Tất cả các ngày trong tuần)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Google Map Iframe Container */}
        <div className="lg:col-span-7">
          <div className="relative w-full h-[320px] md:h-[380px] rounded-2xl overflow-hidden border border-dark-border shadow-[0_10px_35px_-10px_rgba(0,0,0,0.8)] bg-neutral-950">
            {/* Google Map iframe styled with CSS filter to match dark luxury theme */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1671.4786446431353!2d106.05526287084422!3d20.64727154245743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135c70017c309b5%3A0xddfa613b59c8d762!2zVMOzYyBnaeG6oyBOZ3V54buFbiBNYWk!5e0!3m2!1svi!2s!4v1786031358137!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ 
                border: 0, 
                filter: "invert(90%) hue-rotate(180deg) contrast(120%) brightness(90%)",
                opacity: 0.85
              }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
