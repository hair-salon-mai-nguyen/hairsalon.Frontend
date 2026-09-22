"use client";

import React from "react";
import { MapPin, Phone, Clock, MessageCircle, Navigation } from "lucide-react";
import { SALON_INFO } from "@/constants/salon";

export const GoogleMapSection: React.FC = () => {
  return (
    <section className="bg-sand-50 border-t border-sand-200 py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <span className="text-xs tracking-[0.25em] uppercase text-caramel-600 font-semibold block">
              Không Gian Atelier
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-espresso-900 leading-tight">
              Ghé Thăm Không Gian <br />
              <span className="text-caramel-600">Mai Nguyễn Wigs</span>
            </h2>
            <p className="text-espresso-600 text-sm leading-relaxed font-light">
              Chúng tôi luôn sẵn sàng chào đón bạn đến trực tiếp salon để được nhà tạo mẫu Mai Nguyễn tư vấn dáng mặt, đo chuẩn 6 điểm vòng đầu và chạm thử chất tóc thật mềm mượt như tơ lụa.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-start space-x-3.5 text-xs text-espresso-800 bg-white p-4 rounded-2xl border border-sand-200 shadow-sm">
              <div className="w-9 h-9 rounded-full bg-sand-100 flex items-center justify-center shrink-0">
                <MapPin size={16} className="text-caramel-500" />
              </div>
              <div>
                <h4 className="font-semibold text-espresso-900 text-sm">Địa chỉ salon</h4>
                <p className="text-espresso-600 mt-0.5">{SALON_INFO.address}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 text-xs text-espresso-800 bg-white p-4 rounded-2xl border border-sand-200 shadow-sm">
              <div className="w-9 h-9 rounded-full bg-sand-100 flex items-center justify-center shrink-0">
                <Phone size={16} className="text-caramel-500" />
              </div>
              <div>
                <h4 className="font-semibold text-espresso-900 text-sm">Hotline & Zalo tư vấn</h4>
                <p className="text-espresso-600 mt-0.5">{SALON_INFO.phoneDisplay} (Hỗ trợ đặt lịch hẹn riêng tư)</p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 text-xs text-espresso-800 bg-white p-4 rounded-2xl border border-sand-200 shadow-sm">
              <div className="w-9 h-9 rounded-full bg-sand-100 flex items-center justify-center shrink-0">
                <Clock size={16} className="text-caramel-500" />
              </div>
              <div>
                <h4 className="font-semibold text-espresso-900 text-sm">Giờ phục vụ</h4>
                <p className="text-espresso-600 mt-0.5">{SALON_INFO.openingHours} (Tất cả các ngày trong tuần)</p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href={SALON_INFO.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-caramel-500 hover:bg-caramel-600 text-white text-xs font-semibold px-6 py-3.5 rounded-full transition-all shadow-sm flex items-center space-x-2"
            >
              <MessageCircle size={15} />
              <span>Đặt Lịch Hẹn Tư Vấn Zalo</span>
            </a>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-sand-300 hover:bg-white text-espresso-800 text-xs font-medium px-5 py-3.5 rounded-full transition-colors flex items-center space-x-2"
            >
              <Navigation size={14} className="text-caramel-500" />
              <span>Chỉ Đường Đi</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative w-full h-[360px] md:h-[420px] rounded-3xl overflow-hidden border border-sand-200 shadow-md bg-white">
            <iframe
              src={SALON_INFO.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
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
