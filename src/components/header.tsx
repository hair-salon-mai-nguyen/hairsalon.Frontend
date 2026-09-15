"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scissors, Menu, X, Phone, MessageCircle } from "lucide-react";
import { SALON_INFO } from "@/constants/salon";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Trang Chủ", href: "/" },
    { name: "Bộ Sưu Tập Tóc", href: "/products" },
    { name: "Phòng Thử Tóc", href: "/studio-3d" },
    { name: "Về Mai Nguyễn", href: "/about" },
  ];

  return (
    <>
      <div className="bg-sand-100 text-espresso-800 text-[11px] py-1.5 px-4 text-center border-b border-sand-200 tracking-wider">
        <span>✨ 100% Tóc Thật Thủ Công • Đo Size Đầu & May Riêng Theo Yêu Cầu • Hotline: </span>
        <a href={`tel:${SALON_INFO.phone}`} className="font-semibold text-caramel-600 hover:underline">
          {SALON_INFO.phoneDisplay}
        </a>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-sand-200 py-3.5"
            : "bg-[#FAF8F5]/80 backdrop-blur-sm border-b border-sand-200/60 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-full border border-caramel-300 flex items-center justify-center bg-white group-hover:border-caramel-500 group-hover:bg-sand-50 transition-all duration-300 shadow-sm">
              <Scissors className="text-caramel-500 w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div>
              <span className="font-serif text-lg tracking-[0.18em] text-espresso-900 uppercase font-bold block leading-none">
                {SALON_INFO.brandName}
              </span>
              <span className="text-[8px] tracking-[0.28em] text-espresso-500 uppercase leading-none block mt-1">
                {SALON_INFO.brandSub}
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs uppercase tracking-widest transition-all relative py-1 font-medium ${
                    isActive
                      ? "text-caramel-600 font-semibold"
                      : "text-espresso-700 hover:text-caramel-600"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-caramel-500 rounded-full animate-fade-in" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <a
              href={`tel:${SALON_INFO.phone}`}
              className="text-xs text-espresso-700 hover:text-caramel-600 flex items-center space-x-1.5 transition-colors font-medium tracking-wider"
            >
              <Phone size={13} className="text-caramel-500" />
              <span>{SALON_INFO.phoneDisplay}</span>
            </a>

            <a
              href={SALON_INFO.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-caramel-500 hover:bg-caramel-600 text-white px-5 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all shadow-sm hover:shadow-md flex items-center space-x-2"
            >
              <MessageCircle size={14} />
              <span>Tư Vấn Zalo</span>
            </a>
          </div>

          <div className="flex items-center space-x-3 md:hidden">
            <a
              href={SALON_INFO.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-caramel-500 text-white p-2 rounded-full"
              title="Nhắn Zalo"
            >
              <MessageCircle size={16} />
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-espresso-800 p-2 focus:outline-none"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#FAF8F5] border-b border-sand-200 px-6 py-6 space-y-4 animate-fade-in shadow-xl">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-sm py-2 px-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-sand-100 text-caramel-600 font-semibold"
                        : "text-espresso-800 hover:bg-sand-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs text-espresso-500 py-2 px-3 rounded-xl hover:bg-sand-50"
              >
                Khu Vực Quản Trị CMS
              </Link>
            </nav>

            <div className="pt-4 border-t border-sand-200 flex flex-col gap-2.5">
              <a
                href={SALON_INFO.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-caramel-500 text-white text-center py-3 rounded-xl text-xs font-semibold tracking-wider uppercase flex items-center justify-center space-x-2"
              >
                <MessageCircle size={15} />
                <span>Nhắn Zalo Tư Vấn May Đo</span>
              </a>

              <a
                href={`tel:${SALON_INFO.phone}`}
                className="w-full border border-sand-300 text-espresso-800 text-center py-2.5 rounded-xl text-xs font-medium flex items-center justify-center space-x-2"
              >
                <Phone size={13} className="text-caramel-500" />
                <span>Gọi Hotline: {SALON_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
