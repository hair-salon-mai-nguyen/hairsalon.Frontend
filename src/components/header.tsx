"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Scissors, Phone } from "lucide-react";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Khóa cuộn trang (body scroll lock) khi Menu trên Mobile đang mở
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Trang Chủ", href: "/" },
    { name: "Giới Thiệu", href: "/about" },
    { name: "Sản Phẩm", href: "/products" },
    { name: "Admin Portal", href: "/admin" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/85 backdrop-blur-md border-b border-dark-border py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 rounded-full border border-gold-500/30 flex items-center justify-center bg-dark-card group-hover:border-gold-500 transition-all duration-500">
            <Scissors className="text-gold-500 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <div>
            <span className="font-serif text-lg tracking-widest text-gold-200 group-hover:text-gold-400 transition-colors uppercase font-bold block leading-none">
              MAI NGUYEN
            </span>
            <span className="text-[9px] tracking-[0.25em] text-neutral-400 uppercase leading-none block mt-1">
              LUXURY HAIR SALON
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs tracking-[0.15em] uppercase transition-colors relative py-1 ${
                  isActive ? "text-gold-400 font-medium" : "text-neutral-300 hover:text-white"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Contact CTA */}
        <div className="hidden md:block">
          <a
            href="https://zalo.me/0912345678"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-xs tracking-wider uppercase border border-gold-500/40 px-5 py-2.5 rounded-full text-gold-300 hover:text-black hover:bg-gold-gradient hover:border-transparent transition-all duration-300"
          >
            <Phone size={12} />
            <span>Liên Hệ Zalo</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-neutral-300 hover:text-gold-400 focus:outline-none transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] bg-background/95 backdrop-blur-lg z-40 border-t border-dark-border animate-fade-in">
          <nav className="flex flex-col space-y-6 p-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm tracking-[0.2em] uppercase transition-colors ${
                    isActive ? "text-gold-400 font-medium" : "text-neutral-300 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <a
              href="https://zalo.me/0912345678"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center space-x-2 text-xs tracking-wider uppercase border border-gold-500/40 px-5 py-3 rounded-full text-gold-300 hover:text-black hover:bg-gold-gradient hover:border-transparent transition-all duration-300 w-full mt-4"
            >
              <Phone size={12} />
              <span>Liên Hệ Zalo</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
