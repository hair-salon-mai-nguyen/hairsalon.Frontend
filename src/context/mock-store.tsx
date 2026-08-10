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
    name: "Tóc Giả Nguyên Đầu Siêu Vy - Silk HD",
    price: 15000000,
    category: "Tóc Thật 100%",
    description: "Tóc giả nguyên đầu được sản xuất từ 100% tóc thật cao cấp tuyển chọn kỹ lưỡng. Sử dụng lớp siêu da đầu HD mỏng nhẹ mô phỏng chân thật đến từng nang tóc, mang lại cảm giác thông thoáng tối đa và vẻ đẹp tự nhiên hoàn hảo, không thể phát hiện bằng mắt thường.",
    images: [
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=600&auto=format&fit=crop"
    ],
    video: "https://assets.mixkit.co/videos/preview/mixkit-beautiful-woman-brushing-her-hair-40623-large.mp4",
    specs: [
      { label: "Chất liệu", value: "Tóc thật tự nhiên 100%" },
      { label: "Kiểu dáng", value: "Dài thẳng tự nhiên, mái bay nhẹ" },
      { label: "Màu sắc", value: "Nâu chocolate trầm quý phái" },
      { label: "Loại siêu da", value: "Silk HD Lace siêu thực" },
      { label: "Độ dài", value: "55 cm" },
      { label: "Mật độ tóc", value: "130%" }
    ],
    isFeatured: true,
    createdAt: "2026-08-01T10:00:00Z"
  },
  {
    id: "wig-2",
    name: "Tóc Giả Bob Cụp Thanh Lịch - Gold Smoke",
    price: 9500000,
    category: "Tóc Thật 100%",
    description: "Kiểu tóc Bob ngắn thời thượng ôm trọn khuôn mặt, giúp tôn vinh các đường nét thanh tú. Các sợi tóc được khâu tay thủ công tỉ mỉ trên lớp lưới ren tơ siêu mịn. Thích hợp cho những cô nàng cá tính, bận rộn nhưng luôn muốn giữ diện mạo hoàn hảo.",
    images: [
      "https://images.unsplash.com/photo-1595959183077-230f251ab64a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605497746444-ac9dbd39f4a5?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Chất liệu", value: "Tóc thật tuyển chọn 100%" },
      { label: "Kiểu dáng", value: "Bob ngắn cụp nhẹ thanh lịch" },
      { label: "Màu sắc", value: "Nâu vàng khói sáng hiện đại" },
      { label: "Loại siêu da", value: "Mono Top lụa mềm" },
      { label: "Độ dài", value: "30 cm" },
      { label: "Mật độ tóc", value: "120%" }
    ],
    isFeatured: true,
    createdAt: "2026-08-02T14:30:00Z"
  },
  {
    id: "wig-3",
    name: "Tóc Giả Sóng Nước Quyến Rũ - Luxury Wave",
    price: 18500000,
    category: "Tóc Thật Cao Cấp",
    description: "Mẫu tóc xoăn sóng nước bồng bềnh mang phong cách quyến rũ quý phái. Sợi tóc óng ả tự nhiên, giữ nếp lâu dài và có thể uốn, duỗi, nhuộm tùy ý. Lớp lót thiết kế thông khí đa chiều mang lại trải nghiệm êm ái suốt ngày dài.",
    images: [
      "https://images.unsplash.com/photo-1605497746444-ac9dbd39f4a5?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600&auto=format&fit=crop"
    ],
    video: "https://assets.mixkit.co/videos/preview/mixkit-woman-with-long-curly-hair-posing-40618-large.mp4",
    specs: [
      { label: "Chất liệu", value: "Tóc thật tự nhiên nguyên bản" },
      { label: "Kiểu dáng", value: "Xoăn sóng nước bồng bềnh" },
      { label: "Màu sắc", value: "Đen tự nhiên óng ả" },
      { label: "Loại siêu da", value: "Full Lace 3D thoáng khí" },
      { label: "Độ dài", value: "65 cm" },
      { label: "Mật độ tóc", value: "140%" }
    ],
    isFeatured: true,
    createdAt: "2026-08-03T09:15:00Z"
  },
  {
    id: "wig-4",
    name: "Tóc Giả Lỡ Uốn Cụp Chữ C - Classic C",
    price: 12000000,
    category: "Tóc Thật 100%",
    description: "Mẫu tóc lỡ uốn cụp chữ C nhẹ nhàng ở phần đuôi, mang đậm phong cách ngọt ngào, nữ tính của Hàn Quốc. Phần rẽ ngôi linh hoạt giúp bạn dễ dàng thay đổi kiểu tóc mái theo sở thích.",
    images: [
      "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595959183077-230f251ab64a?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Chất liệu", value: "Tóc thật tự nhiên 100%" },
      { label: "Kiểu dáng", value: "Uốn cụp chữ C tự nhiên" },
      { label: "Màu sắc", value: "Nâu hạt dẻ ấm áp" },
      { label: "Loại siêu da", value: "Siêu da lụa Lace Front" },
      { label: "Độ dài", value: "45 cm" },
      { label: "Mật độ tóc", value: "125%" }
    ],
    isFeatured: false,
    createdAt: "2026-08-04T16:20:00Z"
  }
];

const DEFAULT_REVIEWS: Review[] = [
  {
    id: "rev-1",
    productId: "wig-1",
    productName: "Tóc Giả Nguyên Đầu Siêu Vy - Silk HD",
    userName: "Nguyễn Thu Trang",
    userPhone: "0912345678",
    rating: 5,
    comment: "Tóc thật sự rất đẹp và tự nhiên luôn á shop! Sợi tóc mềm mượt, da đầu nhìn y như thật luôn, đi tiệc ai cũng khen. Ủng hộ shop lâu dài ạ.",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=300&auto=format&fit=crop" }
    ],
    status: "APPROVED",
    createdAt: "2026-08-04T12:00:00Z"
  },
  {
    id: "rev-2",
    productId: "wig-1",
    productName: "Tóc Giả Nguyên Đầu Siêu Vy - Silk HD",
    userName: "Trần Mai Anh",
    userPhone: "0987654321",
    rating: 5,
    comment: "Tóc nhẹ, đội mát không bị bí da đầu. Đã mua bộ thứ 2 ở shop Mai Nguyễn và cực kỳ hài lòng về thái độ phục vụ lẫn chất lượng tóc.",
    media: [],
    status: "APPROVED",
    createdAt: "2026-08-05T08:45:00Z"
  },
  {
    id: "rev-3",
    productId: "wig-2",
    productName: "Tóc Giả Bob Cụp Thanh Lịch - Gold Smoke",
    userName: "Lê Hoài An",
    userPhone: "0903334445",
    rating: 4,
    comment: "Form bob rất xinh, màu nhuộm khói sáng rất nổi bật. Tóc thật 100% nên mình uốn duỗi thoải mái. Sẽ giới thiệu cho bạn bè.",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1595959183077-230f251ab64a?q=80&w=300&auto=format&fit=crop" }
    ],
    status: "APPROVED",
    createdAt: "2026-08-05T15:30:00Z"
  },
  {
    id: "rev-4",
    productId: "wig-1",
    productName: "Tóc Giả Nguyên Đầu Siêu Vy - Silk HD",
    userName: "Phạm Hải Yến",
    userPhone: "0977888999",
    rating: 5,
    comment: "Nhờ shop tư vấn nhiệt tình nên chọn được bộ siêu ưng ý. Đội lên đi làm cả ngày không ai phát hiện là tóc giả luôn. 10 điểm chất lượng!",
    media: [],
    status: "PENDING",
    createdAt: "2026-08-06T14:10:00Z"
  }
];

export const MockStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Initialize store from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProducts = localStorage.getItem("luxury_salon_products");
      const storedReviews = localStorage.getItem("luxury_salon_reviews");

      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        setProducts(DEFAULT_PRODUCTS);
        localStorage.setItem("luxury_salon_products", JSON.stringify(DEFAULT_PRODUCTS));
      }

      if (storedReviews) {
        setReviews(JSON.parse(storedReviews));
      } else {
        setReviews(DEFAULT_REVIEWS);
        localStorage.setItem("luxury_salon_reviews", JSON.stringify(DEFAULT_REVIEWS));
      }
      setInitialized(true);
    }
  }, []);

  // Sync to localStorage when states change
  useEffect(() => {
    if (initialized) {
      localStorage.setItem("luxury_salon_products", JSON.stringify(products));
    }
  }, [products, initialized]);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem("luxury_salon_reviews", JSON.stringify(reviews));
    }
  }, [reviews, initialized]);

  // Product CRUD Operations
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
    // Also update productName in reviews if it changes
    if (updatedFields.name) {
      setReviews((prev) =>
        prev.map((item) => (item.productId === id ? { ...item, productName: updatedFields.name! } : item))
      );
    }
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    // Also delete associated reviews
    setReviews((prev) => prev.filter((item) => item.productId !== id));
  };

  // Review Operations
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
