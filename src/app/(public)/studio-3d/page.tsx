"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  MessageCircle,
  Check,
  Eye,
  Scissors,
  Layers,
  Palette,
  Maximize2,
  X,
  Phone,
  ShieldCheck,
  Smile,
  Sliders,
  RotateCw,
  Compass
} from "lucide-react";
import { SALON_INFO, HAIR_COLORS } from "@/constants/salon";

// --- INTERFACES ---
interface HairstyleOption {
  id: string;
  name: string;
  category: string;
  defaultLength: number;
  desc: string;
  recommendedFaceText: string;
  suitableFaces: string[];
  tag: string;
  views: {
    front: string;
    side: string;
    back: string;
    scalp: string;
  };
  beforeImg?: string;
}

interface LengthOption {
  value: number;
  label: string;
  subtitle: string;
}

interface BangOption {
  id: string;
  name: string;
  desc: string;
}

interface CapOption {
  id: string;
  name: string;
  subtitle: string;
  desc: string;
  badge: string;
}

interface DensityOption {
  id: string;
  value: string;
  name: string;
  desc: string;
}

// --- DATA PRESETS ---
const HAIRSTYLE_PRESETS: HairstyleOption[] = [
  {
    id: "silk-wave",
    name: "Tóc Sóng Lụa Bồng Bềnh",
    category: "Xoăn Sóng Lụa Luxe",
    defaultLength: 55,
    tag: "Bestseller",
    desc: "Mẫu tóc xoăn sóng nước mềm mại uốn lượn tự nhiên, tôn trọn nét nữ tính và phong thái kiêu sa quý phái.",
    recommendedFaceText: "Mặt tròn, mặt trái xoan, mặt dài",
    suitableFaces: ["round", "oval", "long", "heart"],
    views: {
      front: "/images/sample-chocolate-waves.jpg",
      side: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop",
      back: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1000&auto=format&fit=crop",
      scalp: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000&auto=format&fit=crop",
    },
    beforeImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "french-bob",
    name: "Tóc Bob Cúp Pháp Thanh Lịch",
    category: "Bob Cúp Trẻ Hóa",
    defaultLength: 32,
    tag: "Trẻ Hóa",
    desc: "Thiết kế ôm nhẹ đường viền xương cằm, tạo hiệu ứng khuôn mặt nhỏ nhắn và trẻ trung hơn 5-10 tuổi.",
    recommendedFaceText: "Mặt vuông, mặt trái tim, mặt V-line",
    suitableFaces: ["square", "oval", "heart"],
    views: {
      front: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1000&auto=format&fit=crop",
      side: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
      back: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1000&auto=format&fit=crop",
      scalp: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
    },
    beforeImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "silk-straight",
    name: "Tóc Suôn Thẳng Layer HD",
    category: "Thẳng Suôn Layer Tầng",
    defaultLength: 65,
    tag: "Kinh Điển",
    desc: "Mái tóc dài suôn mượt nguyên bản, cắt tầng layer bay nhẹ mang nét đẹp đài các, thanh thuần Á Đông.",
    recommendedFaceText: "Phù hợp với mọi dáng mặt",
    suitableFaces: ["round", "oval", "long", "square", "heart"],
    views: {
      front: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000&auto=format&fit=crop",
      side: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=1000&auto=format&fit=crop",
      back: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop",
      scalp: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop",
    },
    beforeImg: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "boho-hippie",
    name: "Tóc Xoăn Hippie Phóng Khoáng",
    category: "Xoăn Sóng Nhỏ Bồng Bềnh",
    defaultLength: 50,
    tag: "Xu Hướng",
    desc: "Các lọn xoăn tơ bồng bềnh tạo độ phồng tối đa, phong cách trẻ trung, phóng khoáng và cá tính nổi bật.",
    recommendedFaceText: "Mặt dài, mặt trái xoan, mặt nhỏ gầy",
    suitableFaces: ["long", "oval", "heart"],
    views: {
      front: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop",
      side: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop",
      back: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1000&auto=format&fit=crop",
      scalp: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000&auto=format&fit=crop",
    },
    beforeImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "soft-c-curl",
    name: "Tóc Uốn Cúp C Nữ Tính",
    category: "Cúp Chữ C Ngang Lưng",
    defaultLength: 45,
    tag: "Thanh Lịch",
    desc: "Đuôi tóc uốn cúp chữ C ôm nhẹ bờ vai, tạo vẻ dịu dàng, trang nhã chuẩn quý cô công sở hiện đại.",
    recommendedFaceText: "Mặt tròn, mặt vuông, mặt trái xoan",
    suitableFaces: ["round", "square", "oval"],
    views: {
      front: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=1000&auto=format&fit=crop",
      side: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1000&auto=format&fit=crop",
      back: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1000&auto=format&fit=crop",
      scalp: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
    },
    beforeImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "top-crown",
    name: "Mái Phủ Đỉnh Siêu Thoáng",
    category: "Phủ Đỉnh & Phủ Bạc",
    defaultLength: 35,
    tag: "Phủ Bạc/Thưa",
    desc: "Giải pháp che thưa đỉnh đầu và phủ chân tóc bạc tức thì, kẹp êm nhẹ thoáng khí không gây tổn hại tóc thật.",
    recommendedFaceText: "Khách hàng thưa đỉnh, tóc mỏng sau sinh",
    suitableFaces: ["round", "oval", "long", "square", "heart"],
    views: {
      front: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
      side: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop",
      back: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1000&auto=format&fit=crop",
      scalp: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop",
    },
    beforeImg: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "chic-pixie",
    name: "Tóc Ngắn Pixie Quý Phái",
    category: "Pixie Textured Cut",
    defaultLength: 25,
    tag: "Cá Tính",
    desc: "Cắt ngắn tỉa tầng nghệ thuật tôn trọn đường nét gương mặt, phong cách sang trọng độc bản và quyền lực.",
    recommendedFaceText: "Mặt trái xoan, mặt trái tim, mặt V-line",
    suitableFaces: ["oval", "heart", "square"],
    views: {
      front: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
      side: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1000&auto=format&fit=crop",
      back: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1000&auto=format&fit=crop",
      scalp: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000&auto=format&fit=crop",
    },
    beforeImg: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop"
  }
];

const LENGTH_OPTIONS: LengthOption[] = [
  { value: 30, label: "30cm", subtitle: "Ngang cằm / Bob cúp" },
  { value: 40, label: "40cm", subtitle: "Chạm xương quai xanh" },
  { value: 50, label: "50cm", subtitle: "Ngang lưng thanh thoát" },
  { value: 60, label: "60cm", subtitle: "Dài kiêu kỳ quý phái" },
  { value: 70, label: "70cm", subtitle: "Thướt tha kiều diễm" },
];

const BANG_OPTIONS: BangOption[] = [
  { id: "curtain", name: "Mái Bay Hàn Quốc", desc: "Che gò má cao, tạo hiệu ứng mặt thon gọn" },
  { id: "french-wispy", name: "Mái Thưa Kiểu Pháp", desc: "Ngọt ngào, tự nhiên, hack tuổi cực đỉnh" },
  { id: "blunt", name: "Mái Bằng Tự Nhiên", desc: "Đáng yêu, che khuyết điểm trán cao" },
  { id: "free-part", name: "Rẽ Ngôi Zíc-zắc 3D", desc: "Rẽ ngôi tự do đa hướng không lộ viền ren" },
  { id: "sleek", name: "Không Mái / Vuốt Sang", desc: "Khoe trọn vầng trán thanh tú và ngũ quan" },
];

const FACE_FILTERS = [
  { id: "all", label: "Tất cả dáng mặt" },
  { id: "round", label: "Mặt tròn" },
  { id: "oval", label: "Mặt trái xoan" },
  { id: "square", label: "Mặt vuông" },
  { id: "long", label: "Mặt dài" },
  { id: "heart", label: "Mặt trái tim" },
];

const CAP_OPTIONS: CapOption[] = [
  {
    id: "hd-swiss",
    name: "HD Swiss Invisible Lace",
    subtitle: "Ren Thụy Sĩ Siêu Mỏng 0.03mm",
    desc: "Màng ren tàng hình tiệp 100% mọi màu da, chân tóc móc tay đơn sợi tự nhiên như mọc từ biểu bì thật.",
    badge: "Được Chuộng Nhất"
  },
  {
    id: "silk-mono",
    name: "Silk Base Mono-Top",
    subtitle: "Màng Da Đầu Lụa 3 Lớp",
    desc: "Cấu trúc lụa kép giấu hoàn toàn mối nối nút thắt, tái hiện nang tóc chân thật kể cả khi nhìn ở cự ly gần.",
    badge: "Tự Nhiên 100%"
  },
  {
    id: "full-360",
    name: "Full 3D 360 Lace",
    subtitle: "Ren Toàn Đầu Đa Hướng",
    desc: "Khung ren 360 độ quanh toàn bộ chu vi đầu, hỗ trợ búi tóc cao, buộc đuôi ngựa thanh lịch mà không lộ viền.",
    badge: "Đa Phong Cách"
  }
];

const DENSITY_OPTIONS: DensityOption[] = [
  {
    id: "120",
    value: "120%",
    name: "120% - Thanh Thoát",
    desc: "Mỏng nhẹ tự nhiên như tóc thật châu Á, siêu thoáng mát."
  },
  {
    id: "130",
    value: "130%",
    name: "130% - Chuẩn Atelier",
    desc: "Mật độ cân bằng lý tưởng, vừa vặn độ phồng bồng bềnh."
  },
  {
    id: "150",
    value: "150%",
    name: "150% - Dày Bồng Bềnh",
    desc: "Độ dày tối đa, sang trọng quý phái, ấn tượng cho sự kiện."
  }
];

export default function FittingStudioPage() {
  // State selections (Committed / Active)
  const [selectedStyle, setSelectedStyle] = useState<HairstyleOption>(HAIRSTYLE_PRESETS[0]);
  const [currentView, setCurrentView] = useState<"front" | "side" | "back" | "scalp">("front");
  const [selectedLength, setSelectedLength] = useState<number>(HAIRSTYLE_PRESETS[0].defaultLength);
  const [selectedBang, setSelectedBang] = useState<BangOption>(BANG_OPTIONS[0]);
  const [selectedFaceFilter, setSelectedFaceFilter] = useState<string>("all");
  const [selectedColor, setSelectedColor] = useState(HAIR_COLORS[0]);
  const [selectedCap, setSelectedCap] = useState<CapOption>(CAP_OPTIONS[0]);
  const [selectedDensity, setSelectedDensity] = useState<DensityOption>(DENSITY_OPTIONS[1]);

  // Mobile Customizer Modal State & Draft Selections
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [draftModalTab, setDraftModalTab] = useState<"style" | "color">("style");
  const [draftStyle, setDraftStyle] = useState<HairstyleOption>(HAIRSTYLE_PRESETS[0]);
  const [draftLength, setDraftLength] = useState<number>(HAIRSTYLE_PRESETS[0].defaultLength);
  const [draftBang, setDraftBang] = useState<BangOption>(BANG_OPTIONS[0]);
  const [draftFaceFilter, setDraftFaceFilter] = useState<string>("all");
  const [draftColor, setDraftColor] = useState(HAIR_COLORS[0]);
  const [draftCap, setDraftCap] = useState<CapOption>(CAP_OPTIONS[0]);
  const [draftDensity, setDraftDensity] = useState<DensityOption>(DENSITY_OPTIONS[1]);

  // Open modal and sync draft with current committed selections
  const openCustomizerModal = () => {
    setDraftStyle(selectedStyle);
    setDraftLength(selectedLength);
    setDraftBang(selectedBang);
    setDraftFaceFilter(selectedFaceFilter);
    setDraftColor(selectedColor);
    setDraftCap(selectedCap);
    setDraftDensity(selectedDensity);
    setDraftModalTab("style");
    setIsCustomizerOpen(true);
  };

  // Apply draft selections to active state and close modal
  const applyCustomizer = () => {
    setSelectedStyle(draftStyle);
    setSelectedLength(draftLength);
    setSelectedBang(draftBang);
    setSelectedFaceFilter(draftFaceFilter);
    setSelectedColor(draftColor);
    setSelectedCap(draftCap);
    setSelectedDensity(draftDensity);
    setIsCustomizerOpen(false);

    // Smooth scroll directly to model stage so user immediately sees their customized hair
    if (typeof window !== "undefined") {
      setTimeout(() => {
        const stage = document.getElementById("model-stage");
        if (stage) {
          stage.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 50);
    }
  };

  // Interactive modes
  const [isComparing, setIsComparing] = useState<boolean>(false);
  const [isScalpModalOpen, setIsScalpModalOpen] = useState<boolean>(false);

  // Handle style change on desktop
  const handleSelectStyle = (style: HairstyleOption) => {
    setSelectedStyle(style);
    setSelectedLength(style.defaultLength);
    setCurrentView("front");
    setIsComparing(false);
  };

  // Handle draft style change in mobile modal
  const handleSelectDraftStyle = (style: HairstyleOption) => {
    setDraftStyle(style);
    setDraftLength(style.defaultLength);
  };

  // Filtered hairstyles for desktop
  const filteredStyles = HAIRSTYLE_PRESETS.filter((style) => {
    if (selectedFaceFilter === "all") return true;
    return style.suitableFaces.includes(selectedFaceFilter);
  });

  // Filtered hairstyles for mobile modal draft
  const filteredDraftStyles = HAIRSTYLE_PRESETS.filter((style) => {
    if (draftFaceFilter === "all") return true;
    return style.suitableFaces.includes(draftFaceFilter);
  });

  // Current main display image
  const currentImage = isComparing && selectedStyle.beforeImg
    ? selectedStyle.beforeImg
    : selectedStyle.views[currentView];

  const viewTabs = [
    { id: "front", label: "Chính Diện", icon: Eye },
    { id: "side", label: "Nghiêng 45°", icon: Compass },
    { id: "back", label: "Sau Lưng", icon: RotateCw },
    { id: "scalp", label: "Cận Cảnh Da Đầu", icon: Sparkles },
  ];

  // Compose Zalo message
  const zaloMessage = `Xin chào Mai Nguyễn Wigs Atelier! Tôi vừa tùy chỉnh cấu hình tóc trên Fitting Studio:
- Kiểu dáng: ${selectedStyle.name} (${selectedStyle.category})
- Chiều dài: ${selectedLength}cm
- Kiểu mái: ${selectedBang.name}
- Tone màu: ${selectedColor.name} (${selectedColor.tone})
- Màng siêu da đầu: ${selectedCap.name}
- Mật độ tóc: ${selectedDensity.value}
Nhờ Salon tư vấn kích thước vòng đầu và đặt lịch may đo!`;

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 md:py-14 text-espresso-900">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER SECTION */}
        <div className="text-center max-w-4xl mx-auto mb-6 md:mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-espresso-900 leading-tight tracking-tight text-balance">
            Phòng Thử Dáng Tóc &amp; May&nbsp;Đo Cá&nbsp;Nhân&nbsp;Hóa
          </h1>
        </div>

        {/* MAIN 3-COLUMN STUDIO LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ============================================================ */}
          {/* COLUMN 1 (LEFT): KIỂU DÁNG, CHIỀU DÀI & KIỂU MÁI (DESKTOP) */}
          {/* ============================================================ */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            
            {/* FACE SHAPE FILTER */}
            <div className="bg-white rounded-3xl border border-sand-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-serif font-bold text-espresso-900 flex items-center space-x-1.5">
                  <Smile size={15} className="text-caramel-500" />
                  <span>Gợi Ý Theo Dáng Mặt</span>
                </label>
                <span className="text-[10px] text-espresso-400 font-light">
                  {selectedFaceFilter === "all" ? "Tất cả" : "Đang lọc"}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {FACE_FILTERS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFaceFilter(f.id)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all cursor-pointer ${
                      selectedFaceFilter === f.id
                        ? "bg-espresso-900 text-white shadow-xs"
                        : "bg-sand-50 text-espresso-600 hover:bg-sand-100 hover:text-espresso-900 border border-sand-200"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* HAIRSTYLE PRESETS */}
            <div className="bg-white rounded-3xl border border-sand-200 p-5 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-sm font-bold text-espresso-900 flex items-center space-x-2">
                  <Scissors size={15} className="text-caramel-500" />
                  <span>1. Chọn Dáng Tóc ({filteredStyles.length})</span>
                </h3>
              </div>

              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {filteredStyles.map((style) => {
                  const isSelected = selectedStyle.id === style.id;
                  const isRecommendedForFace =
                    selectedFaceFilter !== "all" && style.suitableFaces.includes(selectedFaceFilter);

                  return (
                    <div
                      key={style.id}
                      onClick={() => handleSelectStyle(style)}
                      className={`group p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center space-x-3 relative ${
                        isSelected
                          ? "border-caramel-500 bg-sand-50/80 ring-2 ring-caramel-500/20 shadow-xs"
                          : "border-sand-200 hover:border-sand-300 hover:bg-sand-50/40 bg-white"
                      }`}
                    >
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-sand-100 shrink-0 border border-sand-200">
                        <Image
                          src={style.views.front}
                          alt={style.name}
                          fill
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                          sizes="48px"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1.5">
                          <h4 className="font-semibold text-xs text-espresso-900 truncate">
                            {style.name}
                          </h4>
                        </div>
                        <p className="text-[10px] text-caramel-600 font-medium truncate mt-0.5">
                          {style.category}
                        </p>
                        {isRecommendedForFace && (
                          <span className="inline-block text-[9px] bg-amber-50 text-amber-700 font-semibold px-1.5 py-0.5 rounded-md border border-amber-200 mt-1">
                            ⭐ Hợp dáng mặt này
                          </span>
                        )}
                      </div>

                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-caramel-500 text-white flex items-center justify-center shrink-0">
                          <Check size={12} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* HAIR LENGTH SELECTOR */}
            <div className="bg-white rounded-3xl border border-sand-200 p-5 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between">
                <label className="font-serif text-sm font-bold text-espresso-900 flex items-center space-x-2">
                  <Sliders size={15} className="text-caramel-500" />
                  <span>2. Chiều Dài Tóc</span>
                </label>
                <span className="text-xs font-bold text-caramel-600 bg-sand-100 px-2.5 py-0.5 rounded-full">
                  {selectedLength} cm
                </span>
              </div>

              <div className="grid grid-cols-5 gap-1.5">
                {LENGTH_OPTIONS.map((len) => (
                  <button
                    key={len.value}
                    onClick={() => setSelectedLength(len.value)}
                    className={`py-2 rounded-xl text-center transition-all cursor-pointer ${
                      selectedLength === len.value
                        ? "bg-caramel-500 text-white font-bold shadow-xs"
                        : "bg-sand-50 hover:bg-sand-100 text-espresso-700 border border-sand-200 text-xs font-medium"
                    }`}
                  >
                    <span className="text-xs block">{len.label}</span>
                  </button>
                ))}
              </div>

              <p className="text-[11px] text-espresso-500 italic bg-sand-50/60 p-2.5 rounded-xl border border-sand-100">
                💡 {LENGTH_OPTIONS.find((l) => l.value === selectedLength)?.subtitle}
              </p>
            </div>

            {/* BANGS & PARTING STYLE */}
            <div className="bg-white rounded-3xl border border-sand-200 p-5 shadow-xs space-y-3.5">
              <h3 className="font-serif text-sm font-bold text-espresso-900 flex items-center space-x-2">
                <Sparkles size={15} className="text-caramel-500" />
                <span>3. Kiểu Mái & Rẽ Ngôi</span>
              </h3>

              <div className="space-y-1.5">
                {BANG_OPTIONS.map((bang) => (
                  <button
                    key={bang.id}
                    onClick={() => setSelectedBang(bang)}
                    className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      selectedBang.id === bang.id
                        ? "border-caramel-500 bg-sand-50 text-espresso-900 font-semibold"
                        : "border-sand-200 hover:border-sand-300 text-espresso-700 bg-white"
                    }`}
                  >
                    <div>
                      <span className="text-xs block">{bang.name}</span>
                      <span className="text-[10px] text-espresso-400 font-light block">{bang.desc}</span>
                    </div>
                    {selectedBang.id === bang.id && (
                      <Check size={14} className="text-caramel-500 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* ============================================================ */}
          {/* COLUMN 2 (CENTER): SÂN KHẤU MODEL & GÓC NHÌN 360            */}
          {/* ============================================================ */}
          <div id="model-stage" className="col-span-1 lg:col-span-6 space-y-4">
            
            {/* MAIN MODEL SHOWCASE VIEWER */}
            <div className="bg-white rounded-3xl border border-sand-200 p-4 sm:p-6 shadow-sm space-y-4 relative overflow-hidden">
              
              {/* HEADER TẦNG 1: THÔNG TIN TÊN DÁNG TÓC & PHÂN LOẠI */}
              <div className="border-b border-sand-100 pb-3 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-caramel-700 uppercase font-bold tracking-wider bg-sand-100 border border-sand-200 px-2.5 py-0.5 rounded-md">
                      {selectedStyle.category}
                    </span>
                    <span className="text-[10px] bg-amber-50 text-amber-700 font-semibold px-2 py-0.5 rounded-md border border-amber-200">
                      ⭐ {selectedStyle.tag}
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-xs font-semibold text-espresso-700 bg-sand-100 border border-sand-200 px-2.5 py-0.5 rounded-full shrink-0">
                    {selectedLength}cm
                  </span>
                </div>

                <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-espresso-900 tracking-tight leading-tight">
                  {selectedStyle.name}
                </h2>
              </div>

              {/* HEADER TẦNG 2: THANH CHUYỂN 4 GÓC NHÌN ĐA CHIỀU (RIÊNG BIỆT & RỘNG RÃI) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-espresso-600 uppercase tracking-wider flex items-center space-x-1.5">
                    <Eye size={13} className="text-caramel-500" />
                    <span>Góc Nhìn Khách Quan 360°:</span>
                  </span>
                  <span className="text-[11px] text-espresso-500 font-medium">
                    Đang xem: <strong className="text-caramel-600 font-semibold">{viewTabs.find((v) => v.id === currentView)?.label}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-sand-50 p-1.5 rounded-2xl border border-sand-200">
                  {viewTabs.map((tab) => {
                    const TabIcon = tab.icon;
                    const isActive = currentView === tab.id && !isComparing;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setIsComparing(false);
                          setCurrentView(tab.id as "front" | "side" | "back" | "scalp");
                        }}
                        className={`py-2 px-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-center space-x-1.5 cursor-pointer text-center ${
                          isActive
                            ? "bg-caramel-500 text-white shadow-xs font-semibold"
                            : "text-espresso-700 hover:text-caramel-600 hover:bg-white bg-white/60 border border-sand-100"
                        }`}
                      >
                        <TabIcon size={13} className="shrink-0" />
                        <span className="truncate">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STAGE CANVAS / IMAGE CONTAINER */}
              <div className="relative aspect-[3/4] sm:aspect-[4/4] lg:aspect-[4/5] w-full rounded-2xl overflow-hidden bg-sand-100 border border-sand-200 group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedStyle.id}-${currentView}-${isComparing}`}
                    initial={{ opacity: 0.4, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.4, scale: 1.02 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentImage}
                      alt={`${selectedStyle.name} - ${currentView}`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* STUDIO LIGHTING AMBIENT GRADIENT (SUBTLE) */}
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/20 via-transparent to-transparent pointer-events-none" />

                {/* TOP FLOATING CONTROLS */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <div className="flex items-center space-x-2">
                    <span className="bg-espresso-900/80 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full border border-white/20 flex items-center space-x-1.5 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{isComparing ? "Xem Tóc Trước Khi Đội" : `Góc: ${viewTabs.find((v) => v.id === currentView)?.label}`}</span>
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {selectedStyle.beforeImg && (
                      <button
                        onClick={() => setIsComparing(!isComparing)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md transition-all cursor-pointer flex items-center space-x-1.5 shadow-sm ${
                          isComparing
                            ? "bg-caramel-500 text-white ring-2 ring-white/50"
                            : "bg-white/80 hover:bg-white text-espresso-900"
                        }`}
                      >
                        <Layers size={13} />
                        <span>{isComparing ? "Xem Sau Khi Đội" : "So Sánh Trước/Sau"}</span>
                      </button>
                    )}

                    <button
                      onClick={() => setIsScalpModalOpen(true)}
                      className="bg-white/80 hover:bg-white text-espresso-900 p-2 rounded-full backdrop-blur-md shadow-sm transition-all cursor-pointer"
                      title="Phóng to chi tiết nang tóc và da đầu"
                    >
                      <Maximize2 size={14} />
                    </button>
                  </div>
                </div>

              </div>

              {/* MOBILE ONLY: PROMINENT CUSTOMIZER BUTTON RIGHT BELOW PHOTO */}
              <div className="lg:hidden pt-1">
                <button
                  onClick={openCustomizerModal}
                  className="w-full bg-espresso-900 hover:bg-espresso-800 active:scale-[0.99] text-white font-bold py-3.5 px-4 rounded-2xl text-xs tracking-wider uppercase shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Sliders size={15} className="text-caramel-400" />
                  <span>Tùy Chỉnh Kiểu Tóc & May Đo</span>
                </button>
              </div>

              {/* SPECIFICATION DETAILS ROW */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3.5 rounded-2xl bg-sand-50/70 border border-sand-200">
                  <span className="text-espresso-400 font-light text-[11px] block">Đặc điểm phom dáng:</span>
                  <p className="text-espresso-800 font-medium mt-0.5 leading-snug">{selectedStyle.desc}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-sand-50/70 border border-sand-200">
                  <span className="text-espresso-400 font-light text-[11px] block">Dáng mặt hài hòa nhất:</span>
                  <p className="text-espresso-800 font-medium mt-0.5 leading-snug">{selectedStyle.recommendedFaceText}</p>
                </div>
              </div>

            </div>

            {/* MOBILE ONLY: QUICK ACTION & SUMMARY CARD */}
            <div className="lg:hidden bg-white rounded-3xl border border-sand-200 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif font-bold text-espresso-900 flex items-center space-x-1.5">
                  <Sparkles size={14} className="text-caramel-500" />
                  <span>Cấu Hình May Đo Đã Chọn:</span>
                </span>
                <span className="text-[11px] font-bold text-caramel-600 bg-sand-100 px-2.5 py-0.5 rounded-full">
                  {selectedLength}cm • {selectedColor.name}
                </span>
              </div>

              <div className="bg-sand-50 rounded-2xl p-3 border border-sand-200 text-xs space-y-1">
                <p className="font-bold text-espresso-900">{selectedStyle.name}</p>
                <p className="text-espresso-600 text-[11px]">
                  • Mái: <strong className="text-espresso-800">{selectedBang.name}</strong> • Mật độ: <strong className="text-espresso-800">{selectedDensity.value}</strong>
                </p>
                <p className="text-espresso-600 text-[11px]">
                  • Ren siêu da đầu: <strong className="text-espresso-800">{selectedCap.name}</strong>
                </p>
              </div>

              {/* DIRECT ZALO CTA */}
              <a
                href={`${SALON_INFO.zaloUrl}?text=${encodeURIComponent(zaloMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-caramel-500 hover:bg-caramel-600 active:scale-[0.99] text-white font-bold py-3.5 px-4 rounded-2xl text-xs tracking-wider uppercase shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <MessageCircle size={15} />
                <span>Gửi Cấu Hình Qua Zalo</span>
              </a>

              {/* HOTLINE CTA */}
              <a
                href={`tel:${SALON_INFO.phone}`}
                className="w-full bg-sand-50 hover:bg-sand-100 text-espresso-900 border border-sand-300 font-semibold py-3 px-4 rounded-2xl text-xs text-center transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Phone size={13} className="text-caramel-600" />
                <span>Hotline: {SALON_INFO.phoneDisplay}</span>
              </a>
            </div>

          </div>

          {/* ============================================================ */}
          {/* COLUMN 3 (RIGHT): MÀU SẮC, KỸ THUẬT REN & CTA (DESKTOP)     */}
          {/* ============================================================ */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            
            {/* TONE MÀU NHUỘM CAO CẤP */}
            <div className="bg-white rounded-3xl border border-sand-200 p-5 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-sm font-bold text-espresso-900 flex items-center space-x-2">
                  <Palette size={15} className="text-caramel-500" />
                  <span>4. Tone Màu Nhuộm (6 Tone)</span>
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {HAIR_COLORS.map((color) => {
                  const isSelected = selectedColor.id === color.id;
                  return (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      className={`p-2.5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer relative ${
                        isSelected
                          ? "border-caramel-500 bg-sand-50 ring-2 ring-caramel-500/20 shadow-xs"
                          : "border-sand-200 hover:border-sand-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className="w-5 h-5 rounded-full border border-sand-300 shadow-xs shrink-0"
                          style={{ backgroundColor: color.hex }}
                        />
                        {isSelected && <Check size={13} className="text-caramel-600 font-bold" />}
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-espresso-900 block leading-tight truncate">
                          {color.name}
                        </span>
                        <span className="text-[10px] text-espresso-400 block font-light truncate mt-0.5">
                          {color.tone}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* LOẠI MÀNG SIÊU DA ĐẦU */}
            <div className="bg-white rounded-3xl border border-sand-200 p-5 shadow-xs space-y-3.5">
              <h3 className="font-serif text-sm font-bold text-espresso-900 flex items-center space-x-2">
                <Layers size={15} className="text-caramel-500" />
                <span>5. Màng Siêu Da Đầu</span>
              </h3>

              <div className="space-y-2">
                {CAP_OPTIONS.map((cap) => {
                  const isSelected = selectedCap.id === cap.id;
                  return (
                    <div
                      key={cap.id}
                      onClick={() => setSelectedCap(cap)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "border-caramel-500 bg-sand-50 ring-2 ring-caramel-500/20 shadow-xs"
                          : "border-sand-200 hover:border-sand-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-1.5">
                          <h4 className="font-semibold text-xs text-espresso-900">{cap.name}</h4>
                        </div>
                        {isSelected && <Check size={14} className="text-caramel-500 shrink-0" />}
                      </div>
                      <p className="text-[10px] text-caramel-600 font-medium mb-1">{cap.subtitle}</p>
                      <p className="text-[10px] text-espresso-500 font-light leading-snug">{cap.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* MẬT ĐỘ SỢI TÓC */}
            <div className="bg-white rounded-3xl border border-sand-200 p-5 shadow-xs space-y-3">
              <label className="font-serif text-sm font-bold text-espresso-900 flex items-center space-x-2">
                <Sparkles size={15} className="text-caramel-500" />
                <span>6. Mật Độ Sợi Tóc</span>
              </label>

              <div className="grid grid-cols-3 gap-1.5">
                {DENSITY_OPTIONS.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDensity(d)}
                    className={`p-2 rounded-xl text-center transition-all cursor-pointer ${
                      selectedDensity.id === d.id
                        ? "bg-espresso-900 text-white font-bold shadow-xs"
                        : "bg-sand-50 hover:bg-sand-100 text-espresso-700 border border-sand-200 text-xs font-medium"
                    }`}
                  >
                    <span className="text-xs block">{d.value}</span>
                    <span className="text-[9px] opacity-80 block truncate">{d.name.split(" - ")[1]}</span>
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-espresso-400 italic">
                {selectedDensity.desc}
              </p>
            </div>

            {/* TỔNG QUAN CẤU HÌNH & ACTION BUTTONS */}
            <div className="bg-gradient-to-br from-sand-100 to-sand-200/70 rounded-3xl border border-sand-300 p-5 space-y-4 shadow-sm">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-caramel-700 block">
                  Cấu Hình May Đo Đã Chọn:
                </span>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 border border-sand-200 text-xs space-y-1">
                  <p className="font-bold text-espresso-900">{selectedStyle.name}</p>
                  <p className="text-espresso-600 text-[11px]">
                    • Dài: <strong className="text-espresso-800">{selectedLength}cm</strong> • Mái: <strong className="text-espresso-800">{selectedBang.name}</strong>
                  </p>
                  <p className="text-espresso-600 text-[11px]">
                    • Màu: <strong className="text-espresso-800">{selectedColor.name}</strong> • Mật độ: <strong className="text-espresso-800">{selectedDensity.value}</strong>
                  </p>
                  <p className="text-espresso-600 text-[11px]">
                    • Màng ren: <strong className="text-espresso-800">{selectedCap.name}</strong>
                  </p>
                </div>
              </div>

              {/* ZALO DIRECT CTA */}
              <a
                href={`${SALON_INFO.zaloUrl}?text=${encodeURIComponent(zaloMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-caramel-500 hover:bg-caramel-600 active:scale-[0.99] text-white font-bold py-3.5 px-4 rounded-full text-xs tracking-wider uppercase shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <MessageCircle size={16} />
                <span>Gửi Cấu Hình Qua Zalo</span>
              </a>

              {/* HOTLINE CTA */}
              <a
                href={`tel:${SALON_INFO.phone}`}
                className="w-full bg-white hover:bg-sand-50 active:scale-[0.99] text-espresso-900 border border-sand-300 font-semibold py-3 px-4 rounded-full text-xs text-center transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Phone size={14} className="text-caramel-600" />
                <span>Hotline: {SALON_INFO.phoneDisplay}</span>
              </a>

              <p className="text-[10px] text-espresso-500 text-center font-light leading-tight">
                * Atelier hỗ trợ lấy số đo vòng đầu tận nơi hoặc hướng dẫn đo online chuẩn xác 100%.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* ============================================================ */}
      {/* MOBILE POPUP CUSTOMIZER MODAL (DRAWER / POPUP)              */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isCustomizerOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-t-3xl sm:rounded-3xl max-w-xl w-full max-h-[88vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* MODAL HEADER */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-sand-200 shrink-0 bg-[#FAF8F5]">
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-espresso-900 flex items-center space-x-2">
                    <Sliders size={16} className="text-caramel-500" />
                    <span>Tùy Chỉnh Kiểu Tóc & May Đo</span>
                  </h3>
                  <p className="text-[11px] text-espresso-500 font-light mt-0.5">
                    Chọn phom dáng, độ dài, màu nhuộm & màng siêu da đầu
                  </p>
                </div>
                <button
                  onClick={() => setIsCustomizerOpen(false)}
                  className="p-2 rounded-full hover:bg-sand-200/60 text-espresso-600 hover:text-espresso-900 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* MODAL SECTION TABS */}
              <div className="flex border-b border-sand-200 bg-sand-50/80 p-1.5 gap-1 shrink-0">
                <button
                  onClick={() => setDraftModalTab("style")}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                    draftModalTab === "style"
                      ? "bg-white text-espresso-900 shadow-xs border border-sand-200"
                      : "text-espresso-500 hover:text-espresso-800"
                  }`}
                >
                  <Scissors size={13} />
                  <span>1. Kiểu Dáng & Mái</span>
                </button>
                <button
                  onClick={() => setDraftModalTab("color")}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                    draftModalTab === "color"
                      ? "bg-white text-espresso-900 shadow-xs border border-sand-200"
                      : "text-espresso-500 hover:text-espresso-800"
                  }`}
                >
                  <Palette size={13} />
                  <span>2. Màu & Kỹ Thuật</span>
                </button>
              </div>

              {/* MODAL SCROLLABLE CONTENT */}
              <div className="p-4 sm:p-5 overflow-y-auto space-y-6 flex-1">
                {draftModalTab === "style" ? (
                  <>
                    {/* DRAFT FACE SHAPE FILTER */}
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-serif font-bold text-espresso-900 flex items-center space-x-1.5">
                          <Smile size={14} className="text-caramel-500" />
                          <span>Gợi Ý Theo Dáng Mặt</span>
                        </label>
                        <span className="text-[10px] text-espresso-400">
                          {draftFaceFilter === "all" ? "Tất cả" : "Đang lọc"}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {FACE_FILTERS.map((f) => (
                          <button
                            key={f.id}
                            onClick={() => setDraftFaceFilter(f.id)}
                            className={`px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all cursor-pointer ${
                              draftFaceFilter === f.id
                                ? "bg-espresso-900 text-white shadow-xs"
                                : "bg-sand-50 text-espresso-600 hover:bg-sand-100 border border-sand-200"
                            }`}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* DRAFT HAIRSTYLE LIST */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-serif font-bold text-espresso-900 flex items-center space-x-1.5">
                        <Scissors size={14} className="text-caramel-500" />
                        <span>Chọn Kiểu Dáng Tóc ({filteredDraftStyles.length})</span>
                      </h4>
                      <div className="space-y-2">
                        {filteredDraftStyles.map((style) => {
                          const isSelected = draftStyle.id === style.id;
                          const isRecommendedForFace =
                            draftFaceFilter !== "all" && style.suitableFaces.includes(draftFaceFilter);

                          return (
                            <div
                              key={style.id}
                              onClick={() => handleSelectDraftStyle(style)}
                              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center space-x-3 ${
                                isSelected
                                  ? "border-caramel-500 bg-sand-50 ring-2 ring-caramel-500/20 shadow-xs"
                                  : "border-sand-200 hover:border-sand-300 bg-white"
                              }`}
                            >
                              <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-sand-100 shrink-0 border border-sand-200">
                                <Image
                                  src={style.views.front}
                                  alt={style.name}
                                  fill
                                  className="object-cover object-top"
                                  sizes="44px"
                                />
                              </div>

                              <div className="flex-1 min-w-0">
                                <h5 className="font-semibold text-xs text-espresso-900 truncate">
                                  {style.name}
                                </h5>
                                <p className="text-[10px] text-caramel-600 font-medium truncate">
                                  {style.category}
                                </p>
                                {isRecommendedForFace && (
                                  <span className="inline-block text-[9px] bg-amber-50 text-amber-700 font-semibold px-1.5 py-0.2 rounded border border-amber-200 mt-0.5">
                                    ⭐ Hợp dáng mặt này
                                  </span>
                                )}
                              </div>

                              {isSelected && (
                                <div className="w-5 h-5 rounded-full bg-caramel-500 text-white flex items-center justify-center shrink-0">
                                  <Check size={12} strokeWidth={3} />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* DRAFT LENGTH */}
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-serif font-bold text-espresso-900 flex items-center space-x-1.5">
                          <Sliders size={14} className="text-caramel-500" />
                          <span>Chiều Dài Tóc May Đo</span>
                        </label>
                        <span className="text-xs font-bold text-caramel-600 bg-sand-100 px-2 py-0.5 rounded-full">
                          {draftLength} cm
                        </span>
                      </div>
                      <div className="grid grid-cols-5 gap-1.5">
                        {LENGTH_OPTIONS.map((len) => (
                          <button
                            key={len.value}
                            onClick={() => setDraftLength(len.value)}
                            className={`py-2 rounded-xl text-center transition-all cursor-pointer ${
                              draftLength === len.value
                                ? "bg-caramel-500 text-white font-bold shadow-xs"
                                : "bg-sand-50 text-espresso-700 border border-sand-200 text-xs font-medium"
                            }`}
                          >
                            <span className="text-xs block">{len.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* DRAFT BANGS */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-serif font-bold text-espresso-900 flex items-center space-x-1.5">
                        <Sparkles size={14} className="text-caramel-500" />
                        <span>Kiểu Mái & Rẽ Ngôi</span>
                      </h4>
                      <div className="space-y-1.5">
                        {BANG_OPTIONS.map((bang) => (
                          <button
                            key={bang.id}
                            onClick={() => setDraftBang(bang)}
                            className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                              draftBang.id === bang.id
                                ? "border-caramel-500 bg-sand-50 text-espresso-900 font-semibold"
                                : "border-sand-200 text-espresso-700 bg-white"
                            }`}
                          >
                            <div>
                              <span className="text-xs block">{bang.name}</span>
                              <span className="text-[10px] text-espresso-400 font-light block">{bang.desc}</span>
                            </div>
                            {draftBang.id === bang.id && (
                              <Check size={14} className="text-caramel-500 shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* DRAFT COLORS */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-serif font-bold text-espresso-900 flex items-center space-x-1.5">
                        <Palette size={14} className="text-caramel-500" />
                        <span>Tone Màu Nhuộm Cao Cấp (6 Tone)</span>
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {HAIR_COLORS.map((color) => {
                          const isSelected = draftColor.id === color.id;
                          return (
                            <button
                              key={color.id}
                              onClick={() => setDraftColor(color)}
                              className={`p-2.5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                                isSelected
                                  ? "border-caramel-500 bg-sand-50 ring-2 ring-caramel-500/20 shadow-xs"
                                  : "border-sand-200 bg-white"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <span
                                  className="w-5 h-5 rounded-full border border-sand-300 shadow-xs shrink-0"
                                  style={{ backgroundColor: color.hex }}
                                />
                                {isSelected && <Check size={13} className="text-caramel-600 font-bold" />}
                              </div>
                              <span className="text-xs font-semibold text-espresso-900 block leading-tight truncate">
                                {color.name}
                              </span>
                              <span className="text-[10px] text-espresso-400 block font-light truncate mt-0.5">
                                {color.tone}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* DRAFT CAP CONSTRUCTION */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-serif font-bold text-espresso-900 flex items-center space-x-1.5">
                        <Layers size={14} className="text-caramel-500" />
                        <span>Màng Siêu Da Đầu</span>
                      </h4>
                      <div className="space-y-2">
                        {CAP_OPTIONS.map((cap) => {
                          const isSelected = draftCap.id === cap.id;
                          return (
                            <div
                              key={cap.id}
                              onClick={() => setDraftCap(cap)}
                              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                                isSelected
                                  ? "border-caramel-500 bg-sand-50 ring-2 ring-caramel-500/20 shadow-xs"
                                  : "border-sand-200 bg-white"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-0.5">
                                <h5 className="font-semibold text-xs text-espresso-900">{cap.name}</h5>
                                {isSelected && <Check size={14} className="text-caramel-500 shrink-0" />}
                              </div>
                              <p className="text-[10px] text-caramel-600 font-medium">{cap.subtitle}</p>
                              <p className="text-[10px] text-espresso-500 font-light mt-0.5 leading-snug">{cap.desc}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* DRAFT DENSITY */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-serif font-bold text-espresso-900 flex items-center space-x-1.5">
                        <Sparkles size={14} className="text-caramel-500" />
                        <span>Mật Độ Sợi Tóc</span>
                      </h4>
                      <div className="grid grid-cols-3 gap-1.5">
                        {DENSITY_OPTIONS.map((d) => (
                          <button
                            key={d.id}
                            onClick={() => setDraftDensity(d)}
                            className={`p-2 rounded-xl text-center transition-all cursor-pointer ${
                              draftDensity.id === d.id
                                ? "bg-espresso-900 text-white font-bold shadow-xs"
                                : "bg-sand-50 text-espresso-700 border border-sand-200 text-xs font-medium"
                            }`}
                          >
                            <span className="text-xs block">{d.value}</span>
                            <span className="text-[9px] opacity-80 block truncate">{d.name.split(" - ")[1]}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* MODAL BOTTOM ACTION BAR (STICKY) */}
              <div className="p-4 sm:p-5 border-t border-sand-200 bg-[#FAF8F5] space-y-2.5 shrink-0">
                <div className="text-[11px] text-espresso-600 flex items-center justify-between">
                  <span className="truncate">
                    {draftStyle.name} • {draftLength}cm • {draftColor.name}
                  </span>
                  <span className="text-caramel-700 font-semibold shrink-0 ml-2">
                    {draftBang.name}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setIsCustomizerOpen(false)}
                    className="flex-1 py-3 px-4 rounded-2xl border border-sand-300 text-espresso-700 text-xs font-medium hover:bg-sand-100 transition-colors cursor-pointer"
                  >
                    Hủy Bỏ
                  </button>
                  <button
                    onClick={applyCustomizer}
                    className="flex-[2] py-3 px-4 rounded-2xl bg-caramel-500 hover:bg-caramel-600 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Check size={15} strokeWidth={2.5} />
                    <span>Áp Dụng Cấu Hình</span>
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SCALP DETAIL INSPECTION MODAL */}
      <AnimatePresence>
        {isScalpModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-sand-200 pb-3">
                <div className="flex items-center space-x-2">
                  <Sparkles size={16} className="text-caramel-500" />
                  <h3 className="font-serif text-lg font-bold text-espresso-900">
                    Kính Lúp Soi Cận Cảnh Da Đầu HD Lace
                  </h3>
                </div>
                <button
                  onClick={() => setIsScalpModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-sand-100 text-espresso-500 hover:text-espresso-900 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-sand-100 border border-sand-200">
                <Image
                  src={selectedStyle.views.scalp}
                  alt="Cận cảnh da đầu"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-espresso-950/80 backdrop-blur-md text-white p-3 rounded-xl text-xs space-y-1">
                  <p className="font-semibold text-sand-100">Kỹ thuật móc tay đơn sợi (Single-knot micro stitching)</p>
                  <p className="text-sand-300 text-[11px] font-light">
                    Mỗi chân tóc được gắn tỉ mỉ trên màng ren Thụy Sĩ siêu mỏng, không để lại nút thắt to, tàng hình tuyệt đối ngay cả khi nhìn ở khoảng cách dưới 10cm.
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => setIsScalpModalOpen(false)}
                  className="px-5 py-2.5 bg-espresso-900 text-white rounded-full text-xs font-semibold hover:bg-espresso-800 transition-colors cursor-pointer"
                >
                  Đóng Cửa Sổ
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
