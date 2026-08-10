"use client";

import React, { useState, use, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useMockStore, Review } from "@/context/mock-store";
import { formatPrice, formatDate } from "@/utils/format";
import { StarRating } from "@/components/star-rating";
import { 
  ArrowLeft, Phone, Calendar, CheckCircle, ShieldCheck, 
  Sparkles, Award, Video, Eye, UploadCloud, X, Star
} from "lucide-react";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const { products, reviews, submitReview } = useMockStore();

  // Find product
  const product = products.find((p) => p.id === productId);

  // Gallery active image
  const [activeMedia, setActiveMedia] = useState<{ type: "image" | "video"; url: string } | null>(null);

  // Review form state
  const [reviewName, setReviewName] = useState("");
  const [reviewPhone, setReviewPhone] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [uploadedMedia, setUploadedMedia] = useState<{ type: "image" | "video"; url: string }[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set default active media when product loads
  useEffect(() => {
    if (product) {
      setActiveMedia({ type: "image", url: product.images[0] });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center space-y-4 px-6">
        <p className="text-neutral-400 text-sm">Sản phẩm tóc giả không tồn tại hoặc đã bị gỡ bỏ.</p>
        <Link href="/products" className="text-xs text-gold-400 flex items-center space-x-2">
          <ArrowLeft size={12} />
          <span>Quay lại danh sách sản phẩm</span>
        </Link>
      </div>
    );
  }

  // Filter approved reviews for this product
  const approvedReviews = reviews.filter(
    (r) => r.productId === productId && r.status === "APPROVED"
  );

  // Calculate average rating
  const avgRating = approvedReviews.length > 0
    ? (approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length).toFixed(1)
    : "5.0";

  // Handle mock file uploads (Unsplash image presets for testing)
  const handleMockUpload = (type: "image" | "video") => {
    const images = [
      "https://images.unsplash.com/photo-1595959183077-230f251ab64a?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=300&auto=format&fit=crop"
    ];
    const videos = [
      "https://assets.mixkit.co/videos/preview/mixkit-beautiful-woman-brushing-her-hair-40623-large.mp4"
    ];

    const randomUrl = type === "image" 
      ? images[Math.floor(Math.random() * images.length)]
      : videos[0];

    setUploadedMedia((prev) => [...prev, { type, url: randomUrl }]);
  };

  const handleRemoveMedia = (index: number) => {
    setUploadedMedia((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewPhone || !reviewComment) {
      alert("Vui lòng nhập đầy đủ Tên, Số điện thoại và Nội dung đánh giá.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      submitReview({
        productId: product.id,
        productName: product.name,
        userName: reviewName,
        userPhone: reviewPhone,
        rating: reviewRating,
        comment: reviewComment,
        media: uploadedMedia
      });

      setIsSubmitting(false);
      setShowSuccessModal(true);

      // Reset form
      setReviewName("");
      setReviewPhone("");
      setReviewRating(5);
      setReviewComment("");
      setUploadedMedia([]);
    }, 1200);
  };

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Back Link */}
        <Link 
          href="/products" 
          className="inline-flex items-center space-x-2 text-xs text-neutral-400 hover:text-gold-400 transition-colors"
        >
          <ArrowLeft size={12} />
          <span>Quay lại tất cả sản phẩm</span>
        </Link>

        {/* Product Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT: Media Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-dark-border bg-neutral-950">
              {activeMedia?.type === "image" ? (
                <Image
                  src={activeMedia.url}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover transition-all duration-300"
                />
              ) : activeMedia?.type === "video" ? (
                <video
                  src={activeMedia.url}
                  controls
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                />
              ) : null}

              {product.video && activeMedia?.type !== "video" && (
                <button
                  onClick={() => setActiveMedia({ type: "video", url: product.video! })}
                  className="absolute bottom-4 right-4 bg-black/80 hover:bg-gold-500 hover:text-black border border-gold-500/40 text-gold-300 p-2.5 rounded-full flex items-center justify-center transition-all shadow-lg backdrop-blur-sm"
                  title="Xem video mô tả"
                >
                  <Video size={18} />
                </button>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {/* Image Thumbnails */}
              {product.images.map((img, idx) => {
                const isActive = activeMedia?.type === "image" && activeMedia.url === img;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveMedia({ type: "image", url: img })}
                    className={`relative w-20 h-16 rounded-lg overflow-hidden shrink-0 border transition-all ${
                      isActive ? "border-gold-500 scale-95" : "border-dark-border opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                );
              })}

              {/* Video Thumbnail (if exists) */}
              {product.video && (
                <button
                  onClick={() => setActiveMedia({ type: "video", url: product.video! })}
                  className={`relative w-20 h-16 rounded-lg overflow-hidden shrink-0 border flex flex-col items-center justify-center bg-neutral-900 transition-all ${
                    activeMedia?.type === "video"
                      ? "border-gold-500 scale-95"
                      : "border-dark-border opacity-60 hover:opacity-100"
                  }`}
                >
                  <Video size={20} className="text-gold-500" />
                  <span className="text-[8px] uppercase tracking-wider mt-1 text-neutral-400">Video</span>
                </button>
              )}
            </div>
          </div>

          {/* RIGHT: Detail Info */}
          <div className="space-y-6 lg:pl-4">
            <div>
              <span className="text-xs font-semibold tracking-widest text-gold-500 uppercase">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-serif text-neutral-100 mt-2 font-bold tracking-wide">
                {product.name}
              </h1>
            </div>

            {/* Ratings summary */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5">
                <StarRating rating={Math.round(parseFloat(avgRating))} size={16} />
                <span className="text-xs text-neutral-200 font-medium">{avgRating} / 5.0</span>
              </div>
              <span className="text-neutral-600 text-xs">|</span>
              <span className="text-xs text-neutral-400">
                {approvedReviews.length} Đánh giá đã kiểm duyệt
              </span>
            </div>

            {/* Description */}
            <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light">
              {product.description}
            </p>

            {/* Specs Table */}
            <div className="space-y-3 pt-4">
              <h3 className="text-xs tracking-wider uppercase text-gold-200 font-semibold">
                Thông số sản phẩm
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 bg-dark-card/40 border border-dark-border p-4 rounded-xl text-xs">
                {product.specs.map((spec, idx) => (
                  <div key={idx} className="flex justify-between border-b border-dark-border/40 pb-2">
                    <span className="text-neutral-500">{spec.label}</span>
                    <span className="text-neutral-200 font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to action (Zalo Chat Link) */}
            <div className="pt-4">
              <a
                href={`https://zalo.me/0912345678?text=Tôi muốn tư vấn mẫu tóc: ${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-3 bg-gold-gradient text-black py-4 rounded-full font-semibold text-xs tracking-widest uppercase hover:shadow-[0_0_30px_rgba(197,155,63,0.3)] transition-all duration-300"
              >
                <Phone size={14} />
                <span>Đặt may đo & Tư vấn Zalo</span>
              </a>
              <p className="text-[10px] text-center text-neutral-500 mt-2 tracking-wider">
                * Nhấn nút để kết nối trực tiếp với Zalo của thợ thiết kế chính Mai Nguyễn.
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t border-dark-border/60 pt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT/MID: Reviews list */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-serif text-gold-200 font-bold uppercase tracking-wider">
              Khách hàng đánh giá ({approvedReviews.length})
            </h2>

            {approvedReviews.length === 0 ? (
              <div className="bg-dark-card/25 border border-dark-border p-8 rounded-2xl text-center">
                <p className="text-neutral-500 text-xs">Chưa có đánh giá nào cho mẫu tóc này. Hãy là người đầu tiên để lại đánh giá của bạn!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {approvedReviews.map((review) => (
                  <div 
                    key={review.id} 
                    className="bg-dark-card/30 border border-dark-border/40 p-6 rounded-2xl space-y-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-serif text-sm text-gold-100 font-semibold">{review.userName}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <StarRating rating={review.rating} size={12} />
                        </div>
                      </div>
                      <span className="text-[10px] text-neutral-500 flex items-center space-x-1">
                        <Calendar size={10} />
                        <span>{formatDate(review.createdAt, false)}</span>
                      </span>
                    </div>

                    <p className="text-neutral-300 text-xs font-light leading-relaxed">
                      {review.comment}
                    </p>

                    {/* Review Media Grid */}
                    {review.media.length > 0 && (
                      <div className="flex flex-wrap gap-3 pt-2">
                        {review.media.map((item, idx) => (
                          <div 
                            key={idx} 
                            className="relative w-24 h-20 rounded-lg overflow-hidden border border-neutral-800"
                          >
                            {item.type === "image" ? (
                              <Image 
                                src={item.url} 
                                alt="feedback" 
                                fill 
                                className="object-cover hover:scale-105 transition-transform cursor-pointer"
                              />
                            ) : (
                              <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
                                <Video size={16} className="text-gold-500" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Write a Review Form */}
          <div className="glass-panel p-8 rounded-2xl border border-dark-border space-y-6">
            <div>
              <h3 className="font-serif text-lg text-gold-200 font-semibold">Gửi Đánh Giá Của Bạn</h3>
              <p className="text-[10px] text-neutral-400 mt-1 leading-normal">
                Ý kiến của bạn sẽ được gửi tới Admin duyệt số điện thoại trước khi hiển thị chính thức trên website.
              </p>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-neutral-400 font-medium">Họ và tên của bạn</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Thuỳ Dương"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full bg-background border border-dark-border rounded-xl px-4 py-3 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-gold-500"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-neutral-400 font-medium">Số điện thoại (để Admin liên hệ Zalo duyệt)</label>
                <input
                  type="tel"
                  required
                  placeholder="Ví dụ: 0912345678"
                  value={reviewPhone}
                  onChange={(e) => setReviewPhone(e.target.value)}
                  className="w-full bg-background border border-dark-border rounded-xl px-4 py-3 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-gold-500"
                />
              </div>

              {/* Rating */}
              <div className="space-y-1.5">
                <label className="text-neutral-400 block font-medium">Đánh giá chất lượng sản phẩm</label>
                <div className="bg-background border border-dark-border p-3 rounded-xl flex items-center justify-between">
                  <span className="text-[10px] text-neutral-500">Nhấn sao để chọn</span>
                  <StarRating 
                    rating={reviewRating} 
                    interactive 
                    onRatingChange={setReviewRating} 
                    size={18} 
                  />
                </div>
              </div>

              {/* Comment */}
              <div className="space-y-1.5">
                <label className="text-neutral-400 font-medium">Nhận xét chi tiết</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Chia sẻ trải nghiệm của bạn về chất tóc, da đầu giả, phom dáng và sự tư vấn của salon..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full bg-background border border-dark-border rounded-xl px-4 py-3 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-gold-500 resize-none"
                />
              </div>

              {/* Mock media upload */}
              <div className="space-y-2">
                <label className="text-neutral-400 font-medium block">Tải ảnh/video feedback (tuỳ chọn)</label>
                
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleMockUpload("image")}
                    className="flex-1 border border-dashed border-dark-border bg-dark-card/30 hover:border-gold-500/40 p-3 rounded-xl flex flex-col items-center justify-center text-[10px] text-neutral-400 hover:text-neutral-200 transition-colors"
                  >
                    <UploadCloud size={16} className="text-gold-500 mb-1" />
                    <span>Thêm Ảnh Thử</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMockUpload("video")}
                    className="flex-1 border border-dashed border-dark-border bg-dark-card/30 hover:border-gold-500/40 p-3 rounded-xl flex flex-col items-center justify-center text-[10px] text-neutral-400 hover:text-neutral-200 transition-colors"
                  >
                    <Video size={16} className="text-gold-500 mb-1" />
                    <span>Thêm Video Thử</span>
                  </button>
                </div>

                {/* Uploaded media previews */}
                {uploadedMedia.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {uploadedMedia.map((media, idx) => (
                      <div key={idx} className="relative w-14 h-12 rounded border border-neutral-700 overflow-hidden shrink-0 group">
                        {media.type === "image" ? (
                          <Image src={media.url} alt="" fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full bg-neutral-950 flex items-center justify-center">
                            <Video size={12} className="text-gold-500" />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveMedia(idx)}
                          className="absolute -top-1 -right-1 bg-black/80 hover:bg-red-500 text-white rounded-full p-0.5"
                        >
                          <X size={8} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-neutral-900 border border-gold-500/40 hover:bg-gold-gradient hover:text-black hover:border-transparent text-gold-300 font-semibold py-3.5 rounded-xl uppercase tracking-widest text-[10px] transition-all duration-300 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <span>Đang gửi đánh giá...</span>
                ) : (
                  <>
                    <span>Gửi đánh giá</span>
                    <CheckCircle size={12} />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-6">
          <div className="glass-panel max-w-md w-full p-8 rounded-2xl border border-gold-500/30 text-center space-y-6 animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500 flex items-center justify-center mx-auto text-gold-400">
              <Award size={32} className="animate-luxury-float" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-serif text-xl text-gold-200 font-bold uppercase tracking-wider">
                Gửi Đánh Giá Thành Công!
              </h3>
              <p className="text-neutral-400 text-xs leading-relaxed font-light">
                Cảm ơn đóng góp của bạn. Đánh giá đã được chuyển tới hàng chờ kiểm duyệt. 
                Admin Mai Nguyễn sẽ liên kết số điện thoại của bạn trên Zalo để duyệt hiển thị công khai lên website sớm nhất.
              </p>
            </div>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-gold-gradient text-black py-3 rounded-full font-semibold text-xs tracking-widest uppercase hover:shadow-[0_0_20px_rgba(197,155,63,0.3)] transition-all"
            >
              Đồng Ý
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
