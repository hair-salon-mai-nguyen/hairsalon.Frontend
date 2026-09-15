"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  MessageCircle, Phone, ArrowLeft, 
  CheckCircle, Eye, Star, User
} from "lucide-react";
import { useMockStore } from "@/context/mock-store";
import { SALON_INFO, HAIR_COLORS } from "@/constants/salon";
import { StarRating } from "@/components/star-rating";
import { ProductGallery } from "@/components/product-gallery";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { products, reviews, submitReview } = useMockStore();

  const product = products.find((p) => p.id === resolvedParams.id);
  const [selectedColor, setSelectedColor] = useState(HAIR_COLORS[0]);

  // Review Form States
  const [reviewName, setReviewName] = useState("");
  const [reviewPhone, setReviewPhone] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!product) {
    return notFound();
  }

  const productReviews = reviews.filter((r) => r.productId === product.id && r.status === "APPROVED");
  const avgRating = productReviews.length > 0
    ? (productReviews.reduce((acc, r) => acc + r.rating, 0) / productReviews.length).toFixed(1)
    : "5.0";

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;

    submitReview({
      productId: product.id,
      productName: product.name,
      userName: reviewName,
      userPhone: reviewPhone,
      rating: reviewRating,
      comment: reviewComment,
      media: [],
    });

    setReviewSubmitted(true);
    setReviewName("");
    setReviewPhone("");
    setReviewComment("");
  };

  const images = product.images.length > 0 ? product.images : ["/images/sample-chocolate-waves.jpg"];

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 text-xs font-medium text-espresso-600 hover:text-caramel-600 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft size={14} />
            <span>Quay lại Bộ Sưu Tập</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-7">
            <ProductGallery
              images={images}
              productName={product.name}
              category={product.category}
            />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <StarRating rating={Number(avgRating)} size={15} />
                <span className="text-xs font-semibold text-espresso-800">{avgRating}/5.0</span>
                <span className="text-xs text-espresso-400">({productReviews.length} đánh giá thực tế)</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-espresso-900 leading-snug">
                {product.name}
              </h1>

              <div className="inline-block bg-sand-100 text-caramel-600 text-xs px-3 py-1 rounded-full font-medium">
                May đo riêng theo chu vi đầu của bạn
              </div>
            </div>

            <p className="text-sm text-espresso-600 font-light leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold text-espresso-900 uppercase tracking-wider block">
                Chọn Tone Màu Tóc Yêu Thích:
              </label>
              <div className="flex flex-wrap gap-2.5">
                {HAIR_COLORS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c)}
                    className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs border transition-all ${
                      selectedColor.id === c.id
                        ? "border-caramel-500 bg-sand-100 text-espresso-900 font-semibold shadow-sm"
                        : "border-sand-200 bg-white text-espresso-700 hover:bg-sand-50"
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-sand-300" style={{ backgroundColor: c.hex }} />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold text-espresso-900 uppercase tracking-wider block">
                Thông Số Kỹ Thuật Chế Tác:
              </label>
              <div className="bg-white rounded-2xl border border-sand-200 divide-y divide-sand-100 text-xs shadow-sm">
                {product.specs.map((spec, idx) => (
                  <div key={idx} className="p-3.5 flex justify-between">
                    <span className="text-espresso-500 font-light">{spec.label}</span>
                    <span className="text-espresso-900 font-medium text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <a
                href={`${SALON_INFO.zaloUrl}?text=${encodeURIComponent(
                  `Xin chào Atelier Mai Nguyễn, tôi đang quan tâm mẫu "${product.name}" với tone màu "${selectedColor.name}". Nhờ salon tư vấn size đầu và đặt lịch thử tóc!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-caramel-500 hover:bg-caramel-600 text-white font-semibold py-4 rounded-full text-xs tracking-widest uppercase shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <MessageCircle size={16} />
                <span>Đặt Lịch Tư Vấn & Đo Size Qua Zalo</span>
              </a>

              <a
                href={`tel:${SALON_INFO.phone}`}
                className="w-full bg-white hover:bg-sand-100 text-espresso-900 border border-sand-300 font-medium py-3.5 rounded-full text-xs tracking-wider uppercase transition-colors flex items-center justify-center space-x-2 shadow-sm"
              >
                <Phone size={14} className="text-caramel-500" />
                <span>Gọi Hotline: {SALON_INFO.phoneDisplay}</span>
              </a>
            </div>

          </div>

        </div>

        <div className="mt-20 pt-12 border-t border-sand-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs tracking-[0.25em] uppercase text-caramel-600 font-semibold block">
                Phản Hồi & Đánh Giá
              </span>
              <h2 className="font-serif text-2xl font-bold text-espresso-900">
                Gửi Cảm Nhận Của Bạn
              </h2>
              <p className="text-xs text-espresso-600 font-light leading-relaxed">
                Đánh giá của bạn giúp Mai Nguyễn không ngừng hoàn thiện từng tác phẩm tóc giả thủ công.
              </p>

              {reviewSubmitted ? (
                <div className="bg-sand-100 border border-sand-300 p-5 rounded-2xl space-y-2">
                  <div className="flex items-center space-x-2 text-caramel-600">
                    <CheckCircle size={16} />
                    <span className="text-xs font-semibold">Gửi Đánh Giá Thành Công!</span>
                  </div>
                  <p className="text-[11px] text-espresso-600">
                    Cảm ơn bạn đã chia sẻ cảm nhận. Đánh giá sẽ xuất hiện sau khi được quản trị viên duyệt.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="bg-white p-6 rounded-3xl border border-sand-200 shadow-sm space-y-4 text-xs">
                  <div>
                    <label className="text-espresso-700 font-medium block mb-1.5">Mức độ hài lòng:</label>
                    <StarRating
                      rating={reviewRating}
                      onRatingChange={setReviewRating}
                      size={22}
                      interactive
                      showLabel
                    />
                  </div>

                  <div>
                    <label className="text-espresso-700 font-medium block mb-1">Họ và tên *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Chị Lan Anh"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      className="w-full bg-sand-50 border border-sand-200 rounded-xl px-3.5 py-2.5 text-espresso-900 focus:outline-none focus:border-caramel-500"
                    />
                  </div>

                  <div>
                    <label className="text-espresso-700 font-medium block mb-1">Số điện thoại (Bảo mật)</label>
                    <input
                      type="tel"
                      placeholder="09xx xxx xxx"
                      value={reviewPhone}
                      onChange={(e) => setReviewPhone(e.target.value)}
                      className="w-full bg-sand-50 border border-sand-200 rounded-xl px-3.5 py-2.5 text-espresso-900 focus:outline-none focus:border-caramel-500"
                    />
                  </div>

                  <div>
                    <label className="text-espresso-700 font-medium block mb-1">Nhận xét của bạn *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Chia sẻ trải nghiệm về độ mềm mượt, da đầu tự nhiên..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="w-full bg-sand-50 border border-sand-200 rounded-xl p-3.5 text-espresso-900 focus:outline-none focus:border-caramel-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-caramel-500 hover:bg-caramel-600 text-white font-semibold py-3 rounded-xl uppercase tracking-wider text-xs shadow-sm transition-colors"
                  >
                    Gửi Đánh Giá
                  </button>
                </form>
              )}
            </div>

            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-serif text-xl font-bold text-espresso-900">
                Đánh Giá Từ Khách Hàng ({productReviews.length})
              </h3>

              {productReviews.length > 0 ? (
                <div className="space-y-4">
                  {productReviews.map((rev) => (
                    <div key={rev.id} className="bg-white p-6 rounded-2xl border border-sand-200 shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-8 h-8 rounded-full bg-sand-100 flex items-center justify-center text-caramel-600 font-bold text-xs">
                            <User size={14} />
                          </div>
                          <div>
                            <h4 className="font-medium text-espresso-900 text-xs">{rev.userName}</h4>
                            <p className="text-[10px] text-espresso-400">{new Date(rev.createdAt).toLocaleDateString("vi-VN")}</p>
                          </div>
                        </div>
                        <StarRating rating={rev.rating} size={13} />
                      </div>

                      <p className="text-xs text-espresso-700 leading-relaxed font-light">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-2xl border border-sand-200 text-center text-xs text-espresso-500">
                  Chưa có đánh giá nào cho mẫu tóc này. Hãy là người đầu tiên trải nghiệm!
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
