"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Scissors, Lock, Eye, EyeOff, LogIn } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate quick authentication
    setTimeout(() => {
      // Default password: admin
      if (password === "admin" || password === "") {
        // Save simple auth flag in sessionStorage
        if (typeof window !== "undefined") {
          sessionStorage.setItem("luxury_admin_authenticated", "true");
        }
        router.push("/admin/dashboard");
      } else {
        setError("Mật khẩu không chính xác. Mẹo: Nhấp đăng nhập trực tiếp (để trống mật khẩu) để vào nhanh.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-gold-500/5 blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="glass-panel max-w-sm w-full p-8 rounded-2xl border border-dark-border text-center space-y-6 select-none relative z-10">
        
        {/* Logo */}
        <div className="space-y-2">
          <div className="w-12 h-12 rounded-full border border-gold-500/30 flex items-center justify-center bg-dark-card mx-auto">
            <Scissors className="text-gold-500 w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif text-lg tracking-widest text-gold-200 uppercase font-bold">
              MAI NGUYEN
            </h2>
            <p className="text-[9px] tracking-[0.25em] text-neutral-500 uppercase mt-0.5">
              Hệ Thống Quản Trị CMS
            </p>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h1 className="text-base text-neutral-200 font-medium">Đăng nhập Admin</h1>
          <p className="text-[10px] text-neutral-500">Mật khẩu mặc định là <code className="text-gold-400">admin</code> hoặc để trống.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs text-left">
          <div className="space-y-1.5 relative">
            <label className="text-neutral-400 font-medium flex items-center space-x-1">
              <Lock size={12} className="text-gold-500/80" />
              <span>Mật khẩu truy cập</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background/50 border border-dark-border rounded-xl pl-4 pr-11 py-3 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-gold-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-[10px] text-red-400 leading-normal bg-red-950/20 border border-red-500/20 p-2.5 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold-gradient text-black font-semibold py-3.5 rounded-xl uppercase tracking-widest text-[10px] hover:shadow-[0_0_20px_rgba(197,155,63,0.3)] transition-all flex items-center justify-center space-x-2 mt-2"
          >
            {loading ? (
              <span>Đang kiểm tra...</span>
            ) : (
              <>
                <span>Vào Dashboard</span>
                <LogIn size={12} />
              </>
            )}
          </button>
        </form>

        {/* Back link */}
        <div className="pt-2">
          <Link href="/" className="text-[10px] text-neutral-500 hover:text-gold-400 transition-colors uppercase tracking-wider">
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
