"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useMockStore, Product, Review } from "@/context/mock-store";
import { formatPrice, formatDate } from "@/utils/format";
import { StarRating } from "@/components/star-rating";
import { 
  Scissors, Box, MessageSquare, Plus, Edit, Trash2, 
  ExternalLink, Check, LogOut, X, Save, Sparkles, Menu
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
  const [prodCategory, setProdCategory] = useState("Tóc Thật 100%");
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
  const itemsPerPage = 3;

  // Filter States for Admin Dashboard
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  // Reset page khi thay đổi tab hoặc bộ lọc
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm, filterCategory]);

  // Bộ lọc sản phẩm
  const filteredProducts = products.filter((prod) => {
    const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          prod.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" || prod.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Paginated Products trên danh sách đã lọc
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Check simple session authentication
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("luxury_admin_authenticated");
      if (auth !== "true") {
        router.push("/admin");
      } else {
        setAuthorized(true);
      }
    }
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("luxury_admin_authenticated");
    }
    router.push("/admin");
  };

  // Open modal for new product
  const openNewProductModal = () => {
    setEditingProductId(null);
    setProdName("");
    setProdPrice(5000000);
    setProdCategory("Tóc Thật 100%");
    setProdDesc("");
    setProdImages([
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=600&auto=format&fit=crop"
    ]);
    setProdVideo("https://assets.mixkit.co/videos/preview/mixkit-beautiful-woman-brushing-her-hair-40623-large.mp4");
    setProdFeatured(false);
    
    // Set default specs
    setSpecMaterial("Tóc thật tự nhiên 100%");
    setSpecStyle("Dài uốn lượn nhẹ");
    setSpecColor("Nâu đen trầm");
    setSpecCap("Siêu da đầu HD");
    setSpecLength("50 cm");
    setSpecDensity("130%");
    
    setIsProductModalOpen(true);
  };

  // Open modal for editing product
  const openEditProductModal = (product: Product) => {
    setEditingProductId(product.id);
    setProdName(product.name);
    setProdPrice(product.price);
    setProdCategory(product.category);
    setProdDesc(product.description);
    setProdImages(product.images);
    setProdVideo(product.video || "");
    setProdFeatured(product.isFeatured);
    
    // Get specs from product or fallback
    const findSpec = (label: string) => product.specs.find((s) => s.label === label)?.value || "";
    setSpecMaterial(findSpec("Chất liệu"));
    setSpecStyle(findSpec("Kiểu dáng"));
    setSpecColor(findSpec("Màu sắc"));
    setSpecCap(findSpec("Loại siêu da"));
    setSpecLength(findSpec("Độ dài"));
    setSpecDensity(findSpec("Mật độ tóc"));

    setIsProductModalOpen(true);
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const specsList = [
      { label: "Chất liệu", value: specMaterial },
      { label: "Kiểu dáng", value: specStyle },
      { label: "Màu sắc", value: specColor },
      { label: "Loại siêu da", value: specCap },
      { label: "Độ dài", value: specLength },
      { label: "Mật độ tóc", value: specDensity }
    ].filter((s) => s.value !== "");

    const productPayload = {
      name: prodName,
      price: Number(prodPrice),
      category: prodCategory,
      description: prodDesc,
      images: prodImages,
      video: prodVideo || undefined,
      specs: specsList,
      isFeatured: prodFeatured
    };

    if (editingProductId) {
      updateProduct(editingProductId, productPayload);
    } else {
      addProduct(productPayload);
    }

    setIsProductModalOpen(false);
  };

  const handleProductDelete = (id: string, name: string) => {
    if (confirm(`Bạn có chắc chắn muốn xoá sản phẩm "${name}"? Tất cả đánh giá liên quan cũng sẽ bị xoá.`)) {
      deleteProduct(id);
    }
  };

  if (!authorized) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <p className="text-neutral-500 text-xs tracking-wider animate-pulse">ĐANG BẢO MẬT KẾT NỐI...</p>
      </div>
    );
  }

  // Count stats
  const pendingReviewsCount = reviews.filter((r) => r.status === "PENDING").length;

  return (
    <div className="bg-background min-h-screen flex flex-col md:flex-row relative">
      
      {/* Mobile Sticky Header Bar */}
      <header className="block md:hidden fixed top-0 left-0 right-0 h-16 bg-dark-card border-b border-dark-border z-30 px-6">
        <div className="h-full flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full border border-gold-500/30 flex items-center justify-center bg-background">
              <Scissors className="text-gold-500 w-4 h-4" />
            </div>
            <div>
              <span className="font-serif text-[10px] tracking-widest text-gold-200 uppercase font-bold block leading-none">
                MAI NGUYEN
              </span>
              <span className="text-[6px] tracking-[0.2em] text-neutral-500 uppercase leading-none block mt-0.5">
                CMS CONTROL PANEL
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-neutral-400 hover:text-gold-400 p-2 focus:outline-none transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-dark-card/95 backdrop-blur-md border-b border-dark-border p-6 shadow-2xl z-30 flex flex-col gap-4 text-xs animate-fade-in">
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setActiveTab("products");
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === "products"
                    ? "bg-gold-gradient text-black font-semibold"
                    : "text-neutral-300 hover:bg-neutral-900/30"
                }`}
              >
                <Box size={14} />
                <span>Quản Lý Sản Phẩm</span>
              </button>
              
              <button
                onClick={() => {
                  setActiveTab("reviews");
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === "reviews"
                    ? "bg-gold-gradient text-black font-semibold"
                    : "text-neutral-300 hover:bg-neutral-900/30"
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <MessageSquare size={14} />
                  <span>Duyệt Đánh Giá</span>
                </div>
                {pendingReviewsCount > 0 && (
                  <span className="text-[8px] bg-gold-500 text-black px-2 py-0.5 rounded-full font-bold">
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
              className="w-full flex items-center justify-center space-x-2 bg-neutral-900 border border-neutral-800 text-neutral-400 py-3 rounded-xl text-[10px] tracking-widest uppercase transition-colors"
            >
              <LogOut size={12} />
              <span>Đăng xuất</span>
            </button>
          </div>
        )}
      </header>

      {/* Desktop Sidebar Navigation */}
      <aside className="hidden md:flex w-64 bg-dark-card border-r border-dark-border flex-col justify-between shrink-0 min-h-screen">
        <div className="p-6 space-y-8">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full border border-gold-500/30 flex items-center justify-center bg-background">
              <Scissors className="text-gold-500 w-4 h-4" />
            </div>
            <div>
              <span className="font-serif text-xs tracking-widest text-gold-200 uppercase font-bold block leading-none">
                MAI NGUYEN
              </span>
              <span className="text-[7px] tracking-[0.25em] text-neutral-500 uppercase leading-none block mt-1">
                CMS CONTROL PANEL
              </span>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="flex flex-col gap-2 text-xs">
            <button
              onClick={() => setActiveTab("products")}
              className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeTab === "products"
                  ? "bg-gold-gradient text-black font-semibold"
                  : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/30"
              }`}
            >
              <Box size={14} />
              <span>Quản Lý Sản Phẩm</span>
            </button>
            
            <button
              onClick={() => setActiveTab("reviews")}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                activeTab === "reviews"
                  ? "bg-gold-gradient text-black font-semibold"
                  : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/30"
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <MessageSquare size={14} />
                <span>Duyệt Đánh Giá</span>
              </div>
              {pendingReviewsCount > 0 && (
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === "reviews" ? "bg-black text-gold-400" : "bg-gold-500 text-black"
                }`}>
                  {pendingReviewsCount}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Bottom logout */}
        <div className="p-6 border-t border-dark-border/40">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 bg-neutral-900 border border-neutral-800 hover:border-red-500/40 text-neutral-400 hover:text-red-400 py-2.5 rounded-xl text-[10px] tracking-widest uppercase transition-colors"
          >
            <LogOut size={12} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 pt-22 md:pt-10 md:p-10 space-y-8 overflow-y-auto">
        
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-dark-border/40 pb-6">
          <div className="space-y-1">
            <h1 className="font-serif text-xl md:text-2xl text-neutral-100 font-bold tracking-wider">
              {activeTab === "products" ? "Quản Lý Danh Sách Mẫu Tóc" : "Kiểm Duyệt Phản Hồi Khách Hàng"}
            </h1>
            <p className="text-[10px] text-neutral-500 mt-1">
              {activeTab === "products" 
                ? "Thêm, sửa đổi hoặc xóa các bài viết trưng bày tóc giả trên hệ thống."
                : "Tra cứu số điện thoại Zalo của khách hàng và phê duyệt hiển thị bình luận lên website."}
            </p>
          </div>
          
          {activeTab === "products" && (
            <button
              onClick={openNewProductModal}
              className="w-full sm:w-auto bg-gold-gradient text-black px-4 py-2.5 rounded-xl font-semibold text-[10px] tracking-widest uppercase flex items-center justify-center space-x-2 hover:shadow-[0_0_15px_rgba(197,155,63,0.2)] transition-all shrink-0"
            >
              <Plus size={14} />
              <span>Thêm sản phẩm</span>
            </button>
          )}
        </div>

        {/* Tab content 1: PRODUCTS LIST */}
        {activeTab === "products" && (
          <div className="space-y-4">
            
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3 bg-dark-card border border-dark-border p-4 rounded-xl">
              <input
                type="text"
                placeholder="Tìm kiếm mẫu tóc theo tên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow bg-background border border-dark-border rounded-xl px-4 py-2.5 text-[10px] uppercase tracking-wider text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-gold-500/50"
              />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-background border border-dark-border rounded-xl px-4 py-2.5 text-[10px] uppercase tracking-widest text-neutral-300 focus:outline-none focus:border-gold-500/50 cursor-pointer min-w-[150px]"
              >
                <option value="All">TẤT CẢ DANH MỤC</option>
                <option value="Tóc Thật 100%">TÓC THẬT 100%</option>
                <option value="Tóc Thật Cao Cấp">TÓC THẬT CAO CẤP</option>
                <option value="Tóc Giả Sợi Nhân Tạo">SỢI NHÂN TẠO</option>
                <option value="Phụ Kiện Tóc">PHỤ KIỆN TÓC</option>
              </select>
            </div>
            
            {/* Scrollable container for list/table */}
            <div className="overflow-y-auto max-h-[520px] pr-1.5 scrollbar-thin pb-20 md:pb-0">
              {/* Desktop Table View */}
              <div className="hidden md:block bg-dark-card border border-dark-border rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs min-w-[650px]">
                    <thead>
                      <tr className="border-b border-dark-border bg-background/50 text-neutral-400 font-medium uppercase tracking-wider">
                        <th className="p-4 w-20">Hình ảnh</th>
                        <th className="p-4">Tên sản phẩm</th>
                        <th className="p-4 w-32">Phân loại</th>
                        <th className="p-4 w-24">Nổi bật</th>
                        <th className="p-4 w-24 text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-border/40 text-neutral-300">
                      {products.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-neutral-500">
                            Chưa có sản phẩm nào được tạo. Nhấn "Thêm sản phẩm" để khởi tạo.
                          </td>
                        </tr>
                      ) : (
                        currentProducts.map((prod) => (
                          <tr key={prod.id} className="hover:bg-neutral-900/10">
                            <td className="p-4">
                              <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950">
                                <Image src={prod.images[0]} alt="" fill className="object-cover" />
                              </div>
                            </td>
                            <td className="p-4 font-medium text-neutral-200">{prod.name}</td>
                            <td className="p-4 whitespace-nowrap">{prod.category}</td>
                            <td className="p-4">
                              {prod.isFeatured ? (
                                <span className="bg-gold-500/10 text-gold-400 text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border border-gold-500/20">
                                  Nổi bật
                                </span>
                              ) : (
                                <span className="text-neutral-600">-</span>
                              )}
                            </td>
                            <td className="p-4 text-right space-x-2">
                              <button
                                onClick={() => openEditProductModal(prod)}
                                className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-gold-400 p-2 rounded-lg transition-colors"
                                title="Sửa"
                              >
                                <Edit size={12} />
                              </button>
                              <button
                                onClick={() => handleProductDelete(prod.id, prod.name)}
                                className="bg-neutral-900 hover:bg-red-950/30 border border-neutral-800 hover:border-red-900/40 text-neutral-500 hover:text-red-400 p-2 rounded-lg transition-colors"
                                title="Xoá"
                              >
                                <Trash2 size={12} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Cards View */}
              <div className="block md:hidden space-y-4">
                {products.length === 0 ? (
                  <div className="bg-dark-card border border-dark-border p-8 rounded-2xl text-center">
                    <p className="text-neutral-500 text-xs">Chưa có sản phẩm nào được tạo. Nhấn "Thêm sản phẩm" để khởi tạo.</p>
                  </div>
                ) : (
                  currentProducts.map((prod) => (
                    <div 
                      key={prod.id} 
                      className="bg-dark-card border border-dark-border p-4 rounded-xl flex flex-col space-y-3"
                    >
                      {/* Top Row: Thumbnail + Title & Tags */}
                      <div className="flex items-center space-x-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950 shrink-0">
                          <Image src={prod.images[0]} alt="" fill className="object-cover" />
                        </div>
                        <div className="space-y-1 min-w-0 flex-1">
                          <h3 className="font-serif text-sm font-semibold text-neutral-200 truncate">
                            {prod.name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                            <span className="bg-neutral-800 text-neutral-400 text-[8px] uppercase tracking-widest px-2 py-0.5 rounded">
                              {prod.category}
                            </span>
                            {prod.isFeatured && (
                              <span className="bg-gold-500/10 text-gold-400 text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border border-gold-500/20">
                                Nổi bật
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Row: Actions */}
                      <div className="flex justify-end gap-2 pt-2 border-t border-dark-border/40">
                        <button
                          onClick={() => openEditProductModal(prod)}
                          className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-gold-400 px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1"
                        >
                          <Edit size={12} />
                          <span>Sửa</span>
                        </button>
                        <button
                          onClick={() => handleProductDelete(prod.id, prod.name)}
                          className="bg-neutral-900 hover:bg-red-950/30 border border-neutral-800 hover:border-red-900/40 text-neutral-500 hover:text-red-400 px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1"
                        >
                          <Trash2 size={12} />
                          <span>Xoá</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 select-none fixed bottom-0 left-0 right-0 bg-dark-card border-t border-dark-border py-4 px-6 z-20 md:relative md:bg-transparent md:border-b-0 md:border-x-0 md:border-t md:border-dark-border/20 md:p-0 md:pt-4 md:z-auto">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="px-3 py-1.5 rounded-lg border border-dark-border text-neutral-400 hover:text-neutral-200 disabled:opacity-30 disabled:pointer-events-none text-[10px] uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Trang trước
                </button>
                <span className="text-xs text-neutral-400">
                  Trang <strong className="text-neutral-200">{currentPage}</strong> / {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="px-3 py-1.5 rounded-lg border border-dark-border text-neutral-400 hover:text-neutral-200 disabled:opacity-30 disabled:pointer-events-none text-[10px] uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Trang sau
                </button>
              </div>
            )}

          </div>
        )}

        {/* Tab content 2: REVIEWS TABLE */}
        {activeTab === "reviews" && (
          <div className="space-y-6">
            {/* Stats count */}
            <div className="flex gap-4">
              <div className="glass-panel p-4 rounded-xl border border-dark-border flex-1">
                <span className="text-[10px] uppercase text-neutral-500 tracking-wider">Tổng Đánh Giá</span>
                <p className="text-xl font-serif text-neutral-200 mt-1 font-bold">{reviews.length}</p>
              </div>
              <div className="glass-panel p-4 rounded-xl border border-dark-border flex-1 border-gold-500/20">
                <span className="text-[10px] uppercase text-gold-400 tracking-wider">Chờ Admin Duyệt</span>
                <p className="text-xl font-serif text-gold-500 mt-1 font-bold">{pendingReviewsCount}</p>
              </div>
            </div>

            {/* List of reviews */}
            <div className="space-y-4">
              {reviews.length === 0 ? (
                <div className="bg-dark-card border border-dark-border p-8 rounded-2xl text-center">
                  <p className="text-neutral-500 text-xs">Không tìm thấy phản hồi đánh giá nào trên hệ thống.</p>
                </div>
              ) : (
                reviews.map((rev) => (
                  <div 
                    key={rev.id} 
                    className={`bg-dark-card border p-6 rounded-2xl space-y-4 transition-colors ${
                      rev.status === "PENDING" ? "border-gold-500/20" : "border-dark-border/40"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      {/* Customer and phone info */}
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-serif text-sm text-neutral-200 font-bold">{rev.userName}</h4>
                          {rev.status === "PENDING" ? (
                            <span className="bg-gold-500/10 text-gold-400 text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border border-gold-500/20">
                              Đang chờ duyệt
                            </span>
                          ) : (
                            <span className="bg-green-500/10 text-green-400 text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border border-green-500/20">
                              Đã hiển thị
                            </span>
                          )}
                        </div>

                        {/* Phone and Zalo redirect link */}
                        <div className="flex items-center space-x-2 mt-1.5 text-xs">
                          <span className="text-neutral-400">Số ĐT: <strong className="text-neutral-300">{rev.userPhone}</strong></span>
                          <a
                            href={`https://zalo.me/${rev.userPhone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 text-[9px] uppercase tracking-wider text-gold-400 bg-gold-950/20 border border-gold-500/20 px-2 py-0.5 rounded-full hover:bg-gold-gradient hover:text-black hover:border-transparent transition-all"
                            title="Mở chat Zalo để check số điện thoại"
                          >
                            <span>Kiểm Tra Zalo</span>
                            <ExternalLink size={8} />
                          </a>
                        </div>
                      </div>

                      {/* Product Name & Date */}
                      <div className="text-right sm:text-left md:text-right">
                        <span className="text-[10px] text-neutral-500 block uppercase tracking-wider">
                          Đánh giá cho sản phẩm:
                        </span>
                        <span className="text-xs text-neutral-300 font-medium block mt-0.5">
                          {rev.productName}
                        </span>
                        <span className="text-[9px] text-neutral-500 block mt-1">
                          {formatDate(rev.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* Comment text and rating */}
                    <div className="bg-background/40 border border-dark-border/40 p-4 rounded-xl space-y-3">
                      <div className="flex items-center space-x-1.5">
                        <StarRating rating={rev.rating} size={12} />
                        <span className="text-[10px] text-neutral-400">{rev.rating} sao</span>
                      </div>
                      <p className="text-neutral-300 text-xs font-light leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>

                    {/* Media feed preview */}
                    {rev.media.length > 0 && (
                      <div className="flex gap-3">
                        {rev.media.map((item, idx) => (
                          <div 
                            key={idx} 
                            className="relative w-20 h-16 rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950"
                          >
                            {item.type === "image" ? (
                              <Image src={item.url} alt="" fill className="object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="text-[8px] text-gold-500 font-bold uppercase tracking-wider">Video</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Moderation Controls */}
                    <div className="flex justify-end gap-2 pt-2 border-t border-dark-border/20">
                      {rev.status === "PENDING" && (
                        <button
                          onClick={() => approveReview(rev.id)}
                          className="bg-gold-gradient text-black font-semibold px-4 py-2 rounded-xl text-[10px] uppercase tracking-widest flex items-center space-x-1 hover:shadow-[0_0_10px_rgba(197,155,63,0.2)] transition-all"
                        >
                          <Check size={12} />
                          <span>Duyệt bình luận</span>
                        </button>
                      )}
                      
                      <button
                        onClick={() => {
                          if (confirm("Bạn có chắc chắn muốn xoá đánh giá này?")) {
                            deleteReview(rev.id);
                          }
                        }}
                        className="bg-neutral-900 border border-neutral-800 hover:border-red-900/40 text-neutral-400 hover:text-red-400 px-4 py-2 rounded-xl text-[10px] uppercase tracking-widest flex items-center space-x-1 transition-colors"
                      >
                        <Trash2 size={12} />
                        <span>Xoá đánh giá</span>
                      </button>
                    </div>

                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </main>

      {/* Product CRUD Dialog/Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md px-6 overflow-y-auto py-8">
          <div className="bg-dark-card max-w-2xl w-full p-8 rounded-2xl border border-dark-border space-y-6 max-h-[90vh] overflow-y-auto select-none my-auto">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-dark-border/40 pb-4">
              <h2 className="font-serif text-lg text-gold-200 font-bold uppercase tracking-wider flex items-center space-x-2">
                <Sparkles size={16} className="text-gold-500 animate-pulse" />
                <span>{editingProductId ? "Chỉnh sửa bài viết tóc giả" : "Đăng sản phẩm tóc giả mới"}</span>
              </h2>
              
              <button 
                onClick={() => setIsProductModalOpen(false)}
                className="text-neutral-500 hover:text-neutral-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleProductSubmit} className="space-y-5 text-xs">
              
              {/* Product Name */}
              <div className="space-y-1.5">
                <label className="text-neutral-400 font-medium">Tên mẫu tóc giả</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Tóc Giả Nguyên Đầu Siêu Vy - Silk HD"
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  className="w-full bg-background border border-dark-border rounded-xl px-4 py-3 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-gold-500"
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-neutral-400 font-medium">Danh mục</label>
                <select
                  value={prodCategory}
                  onChange={(e) => setProdCategory(e.target.value)}
                  className="w-full bg-background border border-dark-border rounded-xl px-4 py-3 text-neutral-200 focus:outline-none focus:border-gold-500"
                >
                  <option value="Tóc Thật 100%">Tóc Thật 100%</option>
                  <option value="Tóc Thật Cao Cấp">Tóc Thật Cao Cấp</option>
                  <option value="Tóc Tơ Cao Cấp">Tóc Tơ Cao Cấp</option>
                  <option value="Phụ Kiện Tóc">Phụ Kiện Tóc</option>
                </select>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-neutral-400 font-medium">Mô tả sản phẩm</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Viết mô tả chi tiết kiểu dáng, chất tóc, các ưu điểm nổi bật..."
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  className="w-full bg-background border border-dark-border rounded-xl px-4 py-3 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-gold-500 resize-none"
                />
              </div>

              {/* Specs parameters (Key-Value) */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-semibold tracking-wider text-gold-400 uppercase">
                  Thông số sản phẩm
                </h4>
                
                <div className="grid grid-cols-2 gap-4 bg-background/50 border border-dark-border p-4 rounded-xl">
                  <div className="space-y-1">
                    <label className="text-neutral-500 text-[10px]">Chất liệu</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Tóc thật 100%"
                      value={specMaterial}
                      onChange={(e) => setSpecMaterial(e.target.value)}
                      className="w-full bg-background border border-dark-border rounded-lg px-3 py-2 text-neutral-200 focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-500 text-[10px]">Kiểu dáng</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Dài thẳng tự nhiên"
                      value={specStyle}
                      onChange={(e) => setSpecStyle(e.target.value)}
                      className="w-full bg-background border border-dark-border rounded-lg px-3 py-2 text-neutral-200 focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-500 text-[10px]">Màu sắc</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Nâu chocolate"
                      value={specColor}
                      onChange={(e) => setSpecColor(e.target.value)}
                      className="w-full bg-background border border-dark-border rounded-lg px-3 py-2 text-neutral-200 focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-500 text-[10px]">Loại siêu da</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Lưới ren HD Lace"
                      value={specCap}
                      onChange={(e) => setSpecCap(e.target.value)}
                      className="w-full bg-background border border-dark-border rounded-lg px-3 py-2 text-neutral-200 focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-500 text-[10px]">Độ dài</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: 55 cm"
                      value={specLength}
                      onChange={(e) => setSpecLength(e.target.value)}
                      className="w-full bg-background border border-dark-border rounded-lg px-3 py-2 text-neutral-200 focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-500 text-[10px]">Mật độ tóc</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: 130%"
                      value={specDensity}
                      onChange={(e) => setSpecDensity(e.target.value)}
                      className="w-full bg-background border border-dark-border rounded-lg px-3 py-2 text-neutral-200 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>
              </div>

              {/* Is featured switch & Video */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div className="space-y-1.5">
                  <label className="text-neutral-400 font-medium">Link video mô tả sản phẩm (tuỳ chọn)</label>
                  <input
                    type="text"
                    placeholder="Nhập URL video (.mp4)"
                    value={prodVideo}
                    onChange={(e) => setProdVideo(e.target.value)}
                    className="w-full bg-background border border-dark-border rounded-xl px-4 py-3 text-neutral-200 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div className="flex items-center space-x-3 pt-6 sm:pl-4">
                  <input
                    type="checkbox"
                    id="featured_check"
                    checked={prodFeatured}
                    onChange={(e) => setProdFeatured(e.target.checked)}
                    className="w-4 h-4 rounded border-dark-border text-gold-500 bg-background focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="featured_check" className="text-neutral-300 font-medium cursor-pointer">
                    Trưng bày sản phẩm nổi bật ở Trang chủ
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-dark-border/40">
                <button
                  type="submit"
                  className="flex-1 bg-gold-gradient text-black font-semibold py-3.5 rounded-xl uppercase tracking-widest text-[10px] hover:shadow-[0_0_20px_rgba(197,155,63,0.3)] transition-all flex items-center justify-center space-x-2"
                >
                  <Save size={14} />
                  <span>{editingProductId ? "Lưu thay đổi" : "Đăng sản phẩm"}</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="flex-1 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-400 py-3.5 rounded-xl uppercase tracking-widest text-[10px] transition-colors"
                >
                  Huỷ bỏ
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
