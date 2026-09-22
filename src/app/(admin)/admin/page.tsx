"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Scissors, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { SALON_INFO } from "@/constants/salon";

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

    setTimeout(() => {
      if (password === "admin" || password === "") {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("luxury_admin_authenticated", "true");
        }
        router.push("/admin/dashboard");
      } else {
        setError("Mật khẩu không chính xác. Mẹo: Nhấp đăng nhập trực tiếp (để trống mật khẩu) để vào nhanh.");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute w-[400px] h-[400px] rounded-full bg-caramel-100/40 blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="bg-white max-w-sm w-full p-8 rounded-3xl border border-sand-200 shadow-lg text-center space-y-6 select-none relative z-10">
        <div className="space-y-2">
          <div className="w-12 h-12 rounded-full border border-caramel-300 flex items-center justify-center bg-sand-50 mx-auto">
            <Scissors className="text-caramel-500 w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif text-lg tracking-widest text-espresso-900 uppercase font-bold">
              {SALON_INFO.brandName}
            </h2>
            <p className="text-[9px] tracking-[0.25em] text-espresso-500 uppercase mt-0.5">
              Hệ Thống Quản Trị CMS
            </p>
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-base text-espresso-900 font-semibold">Đăng nhập Admin</h1>
          <p className="text-[11px] text-espresso-500">Mật khẩu mặc định là <code className="text-caramel-600 bg-sand-100 px-1 py-0.5 rounded">admin</code> hoặc để trống.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs text-left">
          <div className="space-y-1.5 relative">
            <label className="text-espresso-700 font-medium flex items-center space-x-1">
              <Lock size={12} className="text-caramel-500" />
              <span>Mật khẩu truy cập</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-sand-50 border border-sand-200 rounded-xl pl-4 pr-11 py-3 text-espresso-900 placeholder-espresso-400 focus:outline-none focus:border-caramel-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-espresso-400 hover:text-espresso-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-[10px] text-red-600 bg-red-50 border border-red-200 p-2.5 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-caramel-500 hover:bg-caramel-600 text-white font-semibold py-3.5 rounded-xl uppercase tracking-widest text-[10px] shadow-sm transition-all flex items-center justify-center space-x-2 mt-2"
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

        <div className="pt-2">
          <Link href="/" className="text-[11px] text-espresso-500 hover:text-caramel-600 transition-colors uppercase tracking-wider">
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
