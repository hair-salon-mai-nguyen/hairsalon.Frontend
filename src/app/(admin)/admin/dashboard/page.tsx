"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useMockStore, Product } from "@/context/mock-store";
import { SALON_INFO } from "@/constants/salon";
import { StarRating } from "@/components/star-rating";
import { 
  Scissors, Box, MessageSquare, Plus, Edit, Trash2, 
  ExternalLink, Check, LogOut, X, Menu, Search
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { 
    products, reviews, addProduct, updateProduct, deleteProduct, approveReview, deleteReview 
  } = useMockStore();

  const [authorized, setAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "reviews">("products");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  
  // Product Form Fields
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState(0);
  const [prodCategory, setProdCategory] = useState("Xoăn Sóng Lụa");
  const [prodDesc, setProdDesc] = useState("");
  const [prodImages, setProdImages] = useState<string[]>([]);
  const [prodVideo, setProdVideo] = useState("");
  const [prodFeatured, setProdFeatured] = useState(false);
  
  // Specs form state
  const [specMaterial, setSpecMaterial] = useState("");
  const [specStyle, setSpecStyle] = useState("");
  const [specColor, setSpecColor] = useState("");
  const [specCap, setSpecCap] = useState("");
  const [specLength, setSpecLength] = useState("");
  const [specDensity, setSpecDensity] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Filter States for Admin Dashboard
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    queueMicrotask(() => {
      setCurrentPage(1);
    });
  }, [activeTab, searchTerm, filterCategory]);

  const filteredProducts = products.filter((prod) => {
    const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          prod.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" || prod.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("luxury_admin_authenticated");
      if (auth !== "true") {
        router.push("/admin");
      } else {
        queueMicrotask(() => {
          setAuthorized(true);
        });
      }
    }
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("luxury_admin_authenticated");
    }
    router.push("/admin");
  };

  const openNewProductModal = () => {
    setEditingProductId(null);
    setProdName("");
    setProdPrice(15000000);
    setProdCategory("Xoăn Sóng Lụa");
    setProdDesc("");
    setProdImages(["/images/sample-chocolate-waves.jpg"]);
    setProdVideo("");
    setProdFeatured(false);
    
    setSpecMaterial("100% Tóc thật tự nhiên tuyển chọn");
    setSpecStyle("Xoăn sóng lụa bồng bềnh");
    setSpecColor("Nâu hạt dẻ / Nâu chocolate trầm");
    setSpecCap("HD Swiss Lace siêu tàng hình");
    setSpecLength("55 cm");
    setSpecDensity("130% tự nhiên");
    
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (product: Product) => {
    setEditingProductId(product.id);
    setProdName(product.name);
    setProdPrice(product.price);
    setProdCategory(product.category);
    setProdDesc(product.description);
    setProdImages(product.images || []);
    setProdVideo(product.video || "");
    setProdFeatured(product.isFeatured);

    const getSpec = (label: string) => product.specs.find((s) => s.label.toLowerCase().includes(label.toLowerCase()))?.value || "";
    setSpecMaterial(getSpec("chất liệu") || "100% Tóc thật");
    setSpecStyle(getSpec("kiểu dáng") || "");
    setSpecColor(getSpec("màu sắc") || "");
    setSpecCap(getSpec("siêu da") || getSpec("da đầu") || "");
    setSpecLength(getSpec("độ dài") || "");
    setSpecDensity(getSpec("mật độ") || "");

    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const productPayload = {
      name: prodName,
      price: prodPrice,
      category: prodCategory,
      description: prodDesc,
      images: prodImages.filter((img) => img.trim().length > 0),
      video: prodVideo,
      isFeatured: prodFeatured,
      specs: [
        { label: "Chất liệu", value: specMaterial },
        { label: "Kiểu dáng", value: specStyle },
        { label: "Màu sắc", value: specColor },
        { label: "Loại siêu da", value: specCap },
        { label: "Độ dài", value: specLength },
        { label: "Mật độ tóc", value: specDensity }
      ].filter((s) => s.value.trim().length > 0)
    };

    if (editingProductId) {
      updateProduct(editingProductId, productPayload);
    } else {
      addProduct(productPayload);
    }

    setIsProductModalOpen(false);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa mẫu tóc "${name}" không?`)) {
      deleteProduct(id);
    }
  };

  const pendingReviewsCount = reviews.filter((r) => r.status === "PENDING").length;

  if (!authorized) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 rounded-full border-2 border-caramel-500 border-t-transparent animate-spin mx-auto" />
          <p className="text-xs text-espresso-500 uppercase tracking-wider">Đang xác thực quyền Admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen flex flex-col md:flex-row relative">
      
      <header className="block md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-sand-200 z-30 px-6">
        <div className="h-full flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full border border-caramel-300 flex items-center justify-center bg-sand-50">
              <Scissors className="text-caramel-500 w-4 h-4" />
            </div>
            <div>
              <span className="font-serif text-[10px] tracking-widest text-espresso-900 uppercase font-bold block leading-none">
                {SALON_INFO.brandName}
              </span>
              <span className="text-[6px] tracking-[0.2em] text-espresso-500 uppercase leading-none block mt-0.5">
                CMS CONTROL PANEL
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-espresso-700 hover:text-caramel-600 p-2 focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-sand-200 p-6 shadow-2xl z-30 flex flex-col gap-4 text-xs">
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setActiveTab("products");
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl transition-all ${
                  activeTab === "products"
                    ? "bg-caramel-500 text-white font-semibold"
                    : "text-espresso-700 hover:bg-sand-50"
                }`}
              >
                <Box size={14} />
                <span>Quản Lý Mẫu Tóc</span>
              </button>
              
              <button
                onClick={() => {
                  setActiveTab("reviews");
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                  activeTab === "reviews"
                    ? "bg-caramel-500 text-white font-semibold"
                    : "text-espresso-700 hover:bg-sand-50"
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <MessageSquare size={14} />
                  <span>Duyệt Đánh Giá</span>
                </div>
                {pendingReviewsCount > 0 && (
                  <span className="text-[8px] bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">
                    {pendingReviewsCount}
                  </span>
                )}
              </button>
            </nav>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full flex items-center justify-center space-x-2 bg-sand-100 text-espresso-700 py-3 rounded-xl text-[10px] tracking-widest uppercase transition-colors"
            >
              <LogOut size={12} />
              <span>Đăng xuất</span>
            </button>
          </div>
        )}
      </header>

      <aside className="hidden md:flex w-64 bg-white border-r border-sand-200 flex-col justify-between shrink-0 min-h-screen">
        <div className="p-6 space-y-8">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-full border border-caramel-300 flex items-center justify-center bg-sand-50">
              <Scissors className="text-caramel-500 w-4 h-4" />
            </div>
            <div>
              <span className="font-serif text-xs tracking-widest text-espresso-900 uppercase font-bold block leading-none">
                {SALON_INFO.brandName}
              </span>
              <span className="text-[7px] tracking-[0.25em] text-espresso-500 uppercase leading-none block mt-1">
                CMS CONTROL PANEL
              </span>
            </div>
          </div>

          <nav className="flex flex-col gap-2 text-xs">
            <button
              onClick={() => setActiveTab("products")}
              className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeTab === "products"
                  ? "bg-caramel-500 text-white font-semibold shadow-sm"
                  : "text-espresso-700 hover:bg-sand-50"
              }`}
            >
              <Box size={14} />
              <span>Quản Lý Mẫu Tóc</span>
            </button>

            <button
              onClick={() => setActiveTab("reviews")}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                activeTab === "reviews"
                  ? "bg-caramel-500 text-white font-semibold shadow-sm"
                  : "text-espresso-700 hover:bg-sand-50"
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <MessageSquare size={14} />
                <span>Duyệt Đánh Giá</span>
              </div>
              {pendingReviewsCount > 0 && (
                <span className="text-[9px] bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">
                  {pendingReviewsCount}
                </span>
              )}
            </button>

            <Link
              href="/"
              target="_blank"
              className="flex items-center space-x-2.5 px-4 py-3 rounded-xl text-espresso-500 hover:text-caramel-600 hover:bg-sand-50 transition-colors"
            >
              <ExternalLink size={14} />
              <span>Xem Trang Khách Hàng</span>
            </Link>
          </nav>
        </div>

        <div className="p-6 border-t border-sand-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 bg-sand-100 hover:bg-sand-200 text-espresso-700 py-3 rounded-xl text-[10px] tracking-widest uppercase transition-colors"
          >
            <LogOut size={12} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto mt-16 md:mt-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <span className="text-[10px] text-caramel-600 uppercase tracking-widest font-semibold block">
              Bảng Điều Khiển
            </span>
            <h1 className="font-serif text-2xl font-bold text-espresso-900 mt-1">
              {activeTab === "products" ? "Quản Lý Bộ Sưu Tập Tóc Giả" : "Duyệt Đánh Giá Khách Hàng"}
            </h1>
          </div>

          {activeTab === "products" && (
            <button
              onClick={openNewProductModal}
              className="bg-caramel-500 hover:bg-caramel-600 text-white px-5 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all shadow-sm flex items-center space-x-2 shrink-0"
            >
              <Plus size={15} />
              <span>Thêm Mẫu Tóc Mới</span>
            </button>
          )}
        </div>

        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-2xl border border-sand-200 flex flex-col sm:flex-row gap-3 justify-between items-center shadow-sm">
              <div className="relative w-full sm:w-72">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-espresso-400" />
                <input
                  type="text"
                  placeholder="Tìm theo tên hoặc mô tả..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-sand-50 border border-sand-200 rounded-xl pl-9 pr-3.5 py-2 text-xs text-espresso-900 placeholder-espresso-400 focus:outline-none focus:border-caramel-500"
                />
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <span className="text-xs text-espresso-500 shrink-0">Danh mục:</span>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-sand-50 border border-sand-200 rounded-xl px-3 py-2 text-xs text-espresso-900 focus:outline-none focus:border-caramel-500"
                >
                  <option value="All">Tất cả danh mục</option>
                  <option value="Xoăn Sóng Lụa">Xoăn Sóng Lụa</option>
                  <option value="Tóc Bob & Ngang Vai">Tóc Bob & Ngang Vai</option>
                  <option value="Thẳng Suôn Layer">Thẳng Suôn Layer</option>
                  <option value="Mái Phủ Đỉnh & Phủ Bạc">Mái Phủ Đỉnh & Phủ Bạc</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-sand-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-espresso-800">
                  <thead className="bg-sand-50 border-b border-sand-200 text-espresso-500 text-[10px] uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="py-3.5 px-4">Ảnh Mẫu</th>
                      <th className="py-3.5 px-4">Tên Sản Phẩm</th>
                      <th className="py-3.5 px-4">Danh Mục</th>
                      <th className="py-3.5 px-4">Đặc Điểm & Da Đầu</th>
                      <th className="py-3.5 px-4 text-right">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand-100">
                    {currentProducts.map((prod) => (
                      <tr key={prod.id} className="hover:bg-sand-50/50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="relative w-12 h-14 rounded-lg overflow-hidden border border-sand-200 bg-sand-100">
                            <Image
                              src={prod.images[0] || "/images/sample-chocolate-waves.jpg"}
                              alt={prod.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-espresso-900">{prod.name}</div>
                          <div className="text-[10px] text-espresso-400 mt-0.5">ID: {prod.id}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-block bg-sand-100 text-caramel-600 px-2.5 py-0.5 rounded-full text-[10px] font-medium">
                            {prod.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-espresso-600 font-light max-w-xs truncate">
                          {prod.description}
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => openEditProductModal(prod)}
                            className="p-1.5 text-caramel-600 hover:bg-sand-100 rounded-lg transition-colors"
                            title="Chỉnh sửa"
                          >
                            <Edit size={15} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod.id, prod.name)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Xóa"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="p-4 border-t border-sand-200 flex items-center justify-between text-xs text-espresso-600">
                  <span>Trang {currentPage} / {totalPages} (Tổng {filteredProducts.length} mẫu)</span>
                  <div className="flex gap-1.5">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="px-3 py-1 bg-sand-100 rounded-lg disabled:opacity-40"
                    >
                      Trước
                    </button>
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className="px-3 py-1 bg-sand-100 rounded-lg disabled:opacity-40"
                    >
                      Sau
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-4">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white p-6 rounded-2xl border border-sand-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-espresso-900 text-sm">{rev.userName}</h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        rev.status === "APPROVED" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        {rev.status === "APPROVED" ? "Đã duyệt" : "Chờ duyệt"}
                      </span>
                    </div>
                    <p className="text-[11px] text-espresso-500 mt-0.5">
                      Sản phẩm: <strong>{rev.productName}</strong> • {new Date(rev.createdAt).toLocaleDateString("vi-VN")}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <StarRating rating={rev.rating} size={14} />
                    {rev.status === "PENDING" && (
                      <button
                        onClick={() => approveReview(rev.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1"
                      >
                        <Check size={12} />
                        <span>Duyệt Hiển Thị</span>
                      </button>
                    )}
                    <button
                      onClick={() => deleteReview(rev.id)}
                      className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                      title="Xóa đánh giá"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-espresso-700 leading-relaxed font-light bg-sand-50 p-3.5 rounded-xl border border-sand-100">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        )}

      </main>

      {isProductModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-sand-200 max-w-2xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-sand-200 pb-4">
              <h2 className="font-serif text-lg font-bold text-espresso-900">
                {editingProductId ? "Chỉnh Sửa Mẫu Tóc" : "Thêm Mẫu Tóc Mới"}
              </h2>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-espresso-400 hover:text-espresso-700 p-1"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="text-espresso-700 font-medium block mb-1">Tên mẫu tóc *</label>
                <input
                  type="text"
                  required
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  className="w-full bg-sand-50 border border-sand-200 rounded-xl px-3.5 py-2.5 text-espresso-900 focus:outline-none focus:border-caramel-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-espresso-700 font-medium block mb-1">Danh mục *</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full bg-sand-50 border border-sand-200 rounded-xl px-3 py-2.5 text-espresso-900 focus:outline-none focus:border-caramel-500"
                  >
                    <option value="Xoăn Sóng Lụa">Xoăn Sóng Lụa</option>
                    <option value="Tóc Bob & Ngang Vai">Tóc Bob & Ngang Vai</option>
                    <option value="Thẳng Suôn Layer">Thẳng Suôn Layer</option>
                    <option value="Mái Phủ Đỉnh & Phủ Bạc">Mái Phủ Đỉnh & Phủ Bạc</option>
                  </select>
                </div>

                <div>
                  <label className="text-espresso-700 font-medium block mb-1">Độ dài</label>
                  <input
                    type="text"
                    value={specLength}
                    onChange={(e) => setSpecLength(e.target.value)}
                    placeholder="Ví dụ: 55 cm"
                    className="w-full bg-sand-50 border border-sand-200 rounded-xl px-3.5 py-2.5 text-espresso-900 focus:outline-none focus:border-caramel-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-espresso-700 font-medium block mb-1">Mô tả sản phẩm *</label>
                <textarea
                  required
                  rows={3}
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  className="w-full bg-sand-50 border border-sand-200 rounded-xl p-3.5 text-espresso-900 focus:outline-none focus:border-caramel-500"
                />
              </div>

              <div>
                <label className="text-espresso-700 font-medium block mb-1">URL Ảnh chính (Ảnh 1 - Góc thẳng)</label>
                <input
                  type="text"
                  value={prodImages[0] || ""}
                  onChange={(e) => {
                    const newImgs = [...prodImages];
                    newImgs[0] = e.target.value;
                    setProdImages(newImgs);
                  }}
                  placeholder="/images/sample-chocolate-waves.jpg hoặc link ảnh"
                  className="w-full bg-sand-50 border border-sand-200 rounded-xl px-3.5 py-2.5 text-espresso-900 focus:outline-none focus:border-caramel-500"
                />
              </div>

              <div>
                <label className="text-espresso-700 font-medium block mb-1">URL Ảnh 2 (Góc nghiêng/Cận cảnh da đầu)</label>
                <input
                  type="text"
                  value={prodImages[1] || ""}
                  onChange={(e) => {
                    const newImgs = [...prodImages];
                    newImgs[1] = e.target.value;
                    setProdImages(newImgs);
                  }}
                  placeholder="Link ảnh góc nghiêng hoặc chi tiết"
                  className="w-full bg-sand-50 border border-sand-200 rounded-xl px-3.5 py-2.5 text-espresso-900 focus:outline-none focus:border-caramel-500"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-sand-200">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 border border-sand-300 rounded-xl text-espresso-700 hover:bg-sand-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-caramel-500 hover:bg-caramel-600 text-white rounded-xl font-semibold uppercase tracking-wider"
                >
                  Lưu Mẫu Tóc
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
