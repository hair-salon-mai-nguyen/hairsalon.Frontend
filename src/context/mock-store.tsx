"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  images: string[];
  video?: string;
  specs: ProductSpec[];
  isFeatured: boolean;
  createdAt: string;
}

export interface ReviewMedia {
  type: "image" | "video";
  url: string;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  userName: string;
  userPhone: string;
  rating: number;
  comment: string;
  media: ReviewMedia[];
  status: "PENDING" | "APPROVED";
  createdAt: string;
}

interface MockStoreContextType {
  products: Product[];
  reviews: Review[];
  addProduct: (product: Omit<Product, "id" | "createdAt">) => void;
  updateProduct: (id: string, updatedFields: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  submitReview: (review: Omit<Review, "id" | "createdAt" | "status">) => void;
  approveReview: (id: string) => void;
  deleteReview: (id: string) => void;
}

const MockStoreContext = createContext<MockStoreContextType | undefined>(undefined);

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "wig-1",
    name: "Tóc Giả Sóng Lụa Nâu Hạt Dẻ - Silk Wave",
    price: 16500000,
    category: "Xoăn Sóng Lụa",
    description: "Bộ tóc giả nguyên đầu uốn xoăn sóng lụa bồng bềnh nữ tính, làm từ 100% tóc thật tự nhiên nguyên bản. Màng ren Thụy Sĩ siêu tàng hình tiệp màu da đầu, rẽ ngôi tự do đa hướng.",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800&auto=format&fit=crop",
      "/images/sample-chocolate-waves.jpg",
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop"
    ],
    video: "https://assets.mixkit.co/videos/preview/mixkit-woman-with-long-curly-hair-posing-40618-large.mp4",
    specs: [
      { label: "Chất liệu tóc", value: "100% Tóc thật tự nhiên tuyển chọn" },
      { label: "Kiểu dáng", value: "Xoăn sóng lơi bồng bềnh kiểu Hàn Quốc" },
      { label: "Màu sắc", value: "Nâu hạt dẻ / Nâu chocolate trầm" },
      { label: "Loại siêu da", value: "HD Swiss Lace siêu tàng hình" },
      { label: "Độ dài", value: "55 cm" },
      { label: "Mật độ tóc", value: "130% tự nhiên" }
    ],
    isFeatured: true,
    createdAt: "2026-08-01T10:00:00Z"
  },
  {
    id: "wig-2",
    name: "Tóc Giả Bob Cụp Thanh Lịch - French Chic Bob",
    price: 11500000,
    category: "Tóc Bob & Ngang Vai",
    description: "Kiểu tóc Bob ngắn cụp nhẹ thanh lịch ôm sát viền cằm, giúp khuôn mặt thêm thon gọn và trẻ trung. Móc tay từng sợi siêu tỉ mỉ, trọng lượng siêu nhẹ êm ái cả ngày.",
    images: [
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800&auto=format&fit=crop"
    ],
    specs: [
      { label: "Chất liệu tóc", value: "100% Tóc thật nguyên bản" },
      { label: "Kiểu dáng", value: "Bob ngắn cụp thanh lịch" },
      { label: "Màu sắc", value: "Nâu vàng khói sáng / Đen tuyền" },
      { label: "Loại siêu da", value: "Mono Top lụa mềm thoáng khí" },
      { label: "Độ dài", value: "32 cm" },
      { label: "Mật độ tóc", value: "120% nhẹ nhàng" }
    ],
    isFeatured: true,
    createdAt: "2026-08-02T14:30:00Z"
  },
  {
    id: "wig-3",
    name: "Tóc Giả Suôn Thẳng Tự Nhiên - Silk Straight HD",
    price: 17500000,
    category: "Thẳng Suôn Layer",
    description: "Mẫu tóc dài suôn mượt óng ả nguyên bản, giữ trọn vẹn lớp biểu bì tự nhiên phản chiếu ánh sáng tuyệt đẹp. Khách hàng có thể thoải mái uốn nhiệt, sấy tạo kiểu theo ý thích.",
    images: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop"
    ],
    video: "https://assets.mixkit.co/videos/preview/mixkit-beautiful-woman-brushing-her-hair-40623-large.mp4",
    specs: [
      { label: "Chất liệu tóc", value: "100% Tóc thật tự nhiên nguyên bản" },
      { label: "Kiểu dáng", value: "Suôn thẳng tự nhiên cắt layer nhẹ" },
      { label: "Màu sắc", value: "Đen tuyền óng ả / Nâu hạt dẻ" },
      { label: "Loại siêu da", value: "Full Lace 3D màng ren siêu mỏng" },
      { label: "Độ dài", value: "65 cm" },
      { label: "Mật độ tóc", value: "140% dày dặn" }
    ],
    isFeatured: true,
    createdAt: "2026-08-03T09:15:00Z"
  },
  {
    id: "wig-4",
    name: "Mái Phủ Đỉnh Tóc Thật Phủ Bạc - Top Silk Crown",
    price: 8500000,
    category: "Mái Phủ Đỉnh & Phủ Bạc",
    description: "Miếng dán tóc phủ đỉnh đầu bằng tóc thật dành cho chị em bị thưa tóc đỉnh, rụng tóc sau sinh hoặc muốn che chân tóc bạc nhanh chóng mà không cần nhuộm hóa chất.",
    images: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800&auto=format&fit=crop"
    ],
    specs: [
      { label: "Chất liệu tóc", value: "100% Tóc thật tự nhiên" },
      { label: "Kích thước đế", value: "13 x 15 cm phủ trọn đỉnh đầu" },
      { label: "Màu sắc", value: "Đen tự nhiên / Nâu trầm" },
      { label: "Khóa kẹp", value: "Kẹp BB bọc silicon chống đau tóc thật" },
      { label: "Độ dài", value: "40 cm" },
      { label: "Mật độ tóc", value: "130%" }
    ],
    isFeatured: false,
    createdAt: "2026-08-04T16:20:00Z"
  },
  {
    id: "wig-5",
    name: "Tóc Giả Xoăn Lơi Layer Nâu Mật Ong - Amber Glow",
    price: 18000000,
    category: "Xoăn Sóng Lụa",
    description: "Tone màu nâu mật ong ấm áp kết hợp các tầng sóng lơi layer bồng bềnh mang lại nét sang trọng quý phái. Đội lên sáng da, hợp mọi phong cách từ công sở đến dự tiệc tối.",
    images: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
      "/images/sample-chocolate-waves.jpg",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800&auto=format&fit=crop"
    ],
    specs: [
      { label: "Chất liệu tóc", value: "100% Tóc thật tuyển chọn" },
      { label: "Kiểu dáng", value: "Layer xoăn lơi hiện đại" },
      { label: "Màu sắc", value: "Nâu mật ong ánh Caramel" },
      { label: "Loại siêu da", value: "HD Invisible Lace" },
      { label: "Độ dài", value: "60 cm" },
      { label: "Mật độ tóc", value: "135%" }
    ],
    isFeatured: true,
    createdAt: "2026-08-05T10:00:00Z"
  },
  {
    id: "wig-6",
    name: "Tóc Giả Lỡ Uốn Cụp Tự Nhiên - Classic Elegant",
    price: 13500000,
    category: "Tóc Bob & Ngang Vai",
    description: "Độ dài ngang vai thanh nhã với phần đuôi tóc uốn cụp nhẹ nhàng. Thiết kế ngôi zíc-zắc tự nhiên giúp tôn dáng mặt tròn hoặc vuông.",
    images: [
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
    ],
    specs: [
      { label: "Chất liệu tóc", value: "100% Tóc thật nguyên bản" },
      { label: "Kiểu dáng", value: "Ngang vai uốn đuôi cụp C" },
      { label: "Màu sắc", value: "Nâu hạt dẻ trầm" },
      { label: "Loại siêu da", value: "Silk Base mô phỏng nang tóc" },
      { label: "Độ dài", value: "45 cm" },
      { label: "Mật độ tóc", value: "125%" }
    ],
    isFeatured: false,
    createdAt: "2026-08-06T11:30:00Z"
  }
];

const DEFAULT_REVIEWS: Review[] = [
  {
    id: "rev-1",
    productId: "wig-1",
    productName: "Tóc Giả Sóng Lụa Nâu Hạt Dẻ - Silk Wave",
    userName: "Chị Hoàng Lan",
    userPhone: "0912345678",
    rating: 5,
    comment: "Tóc thật mềm mượt dã man, đội lên cực kỳ tự nhiên không hề bị cộm hay nóng bí. Bạn bè ai cũng khen tóc mới đẹp mà không nhận ra là đội tóc giả!",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=400&auto=format&fit=crop" }
    ],
    status: "APPROVED",
    createdAt: "2026-08-04T10:00:00Z"
  },
  {
    id: "rev-2",
    productId: "wig-1",
    productName: "Tóc Giả Sóng Lụa Nâu Hạt Dẻ - Silk Wave",
    userName: "Chị Trần Mai Anh",
    userPhone: "0987654321",
    rating: 5,
    comment: "Đã may bộ thứ 2 ở atelier Mai Nguyễn và cực kỳ hài lòng về sự chăm chút tỉ mỉ từng đường kim mũi chỉ. Cảm ơn chị Mai đã tư vấn rất có tâm!",
    media: [],
    status: "APPROVED",
    createdAt: "2026-08-05T08:45:00Z"
  },
  {
    id: "rev-3",
    productId: "wig-2",
    productName: "Tóc Giả Bob Cụp Thanh Lịch - French Chic Bob",
    userName: "Bạn Lê Hoài An",
    userPhone: "0903334445",
    rating: 5,
    comment: "Form bob rất xinh, ôm gọn mặt. Tóc thật 100% nên sấy cụp hay uốn nhẹ đều giữ nếp rất đẹp. Rất khuyên mọi người nên trải nghiệm.",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=400&auto=format&fit=crop" }
    ],
    status: "APPROVED",
    createdAt: "2026-08-05T15:30:00Z"
  }
];

export const MockStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [reviews, setReviews] = useState<Review[]>(DEFAULT_REVIEWS);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const storedProducts = localStorage.getItem("luxury_salon_products_v8");
        const storedReviews = localStorage.getItem("luxury_salon_reviews_v8");

        if (storedProducts) setProducts(JSON.parse(storedProducts));
        if (storedReviews) setReviews(JSON.parse(storedReviews));
      } catch {
        // Fallback safely
      } finally {
        setInitialized(true);
      }
    });
  }, []);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem("luxury_salon_products_v6", JSON.stringify(products));
    }
  }, [products, initialized]);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem("luxury_salon_reviews_v6", JSON.stringify(reviews));
    }
  }, [reviews, initialized]);

  const addProduct = (newProduct: Omit<Product, "id" | "createdAt">) => {
    const product: Product = {
      ...newProduct,
      id: `wig-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setProducts((prev) => [product, ...prev]);
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
    if (updatedFields.name) {
      setReviews((prev) =>
        prev.map((item) => (item.productId === id ? { ...item, productName: updatedFields.name! } : item))
      );
    }
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    setReviews((prev) => prev.filter((item) => item.productId !== id));
  };

  const submitReview = (newReview: Omit<Review, "id" | "createdAt" | "status">) => {
    const review: Review = {
      ...newReview,
      id: `rev-${Date.now()}`,
      status: "PENDING",
      createdAt: new Date().toISOString()
    };
    setReviews((prev) => [review, ...prev]);
  };

  const approveReview = (id: string) => {
    setReviews((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "APPROVED" } : item))
    );
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <MockStoreContext.Provider
      value={{
        products,
        reviews,
        addProduct,
        updateProduct,
        deleteProduct,
        submitReview,
        approveReview,
        deleteReview
      }}
    >
      {children}
    </MockStoreContext.Provider>
  );
};

export const useMockStore = () => {
  const context = useContext(MockStoreContext);
  if (context === undefined) {
    throw new Error("useMockStore must be used within a MockStoreProvider");
  }
  return context;
};
