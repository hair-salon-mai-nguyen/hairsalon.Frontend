import { Sparkles, Scissors, HeartHandshake, Award } from "lucide-react";

export interface HairColor {
  id: string;
  name: string;
  hex: string;
  tone: string;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  beforeImg: string;
  afterImg: string;
  hairStyle: string;
  resultNotes: string;
}

export interface CraftStep {
  step: string;
  title: string;
  subtitle: string;
  desc: string;
  image: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  role: string;
  comment: string;
  rating: number;
  avatar: string;
  hairWorn?: string;
  hairStyle?: string;
  date: string;
}

// Salon Brand Contact Information
export const SALON_INFO = {
  name: "MAI NGUYEN LUXURY HAIR SALON",
  brandName: "MAI NGUYEN",
  brandSub: "LUXURY WIGS ATELIER",
  brandTitle: "MAI NGUYEN Wigs Atelier",
  slogan: "Good hair reflects your story and your natural spirit",
  subSlogan: "Tôn vinh nét đẹp kiêu kỳ và phong thái tự nhiên của bạn bằng những tác phẩm tóc thật thủ công may đo riêng biệt.",
  phone: "0912345678",
  phoneDisplay: "0912 345 678",
  hotlineFormatted: "0912 345 678",
  zaloUrl: "https://zalo.me/0912345678",
  address: "MAI NGUYEN Wigs Atelier, Hung Yen (Xem Bản Đồ)",
  operatingHours: "08:30 AM - 08:30 PM",
  openingHours: "08:30 AM - 08:30 PM",
  email: "info@mainguyenluxury.com",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1671.4786446431353!2d106.05526287084422!3d20.64727154245743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135c70017c309b5%3A0xddfa613b59c8d762!2zVMOzYyBnaeG6oyBOZ3V54buFbiBNYWk!5e0!3m2!1svi!2s!4v1786031358137!5m2!1svi!2s",
};

export const HAIR_COLORS: HairColor[] = [
  { id: "natural-black", name: "Đen Tuyển Tự Nhiên", hex: "#1C1917", tone: "Warm Black" },
  { id: "espresso", name: "Nâu Chocolate Trầm", hex: "#3D281E", tone: "Rich Espresso" },
  { id: "chestnut", name: "Nâu Hạt Dẻ Mềm Mượt", hex: "#5D3E2F", tone: "Warm Chestnut" },
  { id: "milk-tea", name: "Nâu Trà Sữa Ánh Khói", hex: "#7D6456", tone: "Ash Milk Tea" },
  { id: "honey-caramel", name: "Nâu Mật Ong Ánh Caramel", hex: "#8A5C3C", tone: "Honey Caramel" },
  { id: "ash-blonde", name: "Vàng Champagne Khói", hex: "#C7A779", tone: "Soft Ash Gold" },
];

// Lookbook Categories
export const LOOKBOOK_CATEGORIES = [
  { id: "all", name: "Tất Cả Mẫu Tóc" },
  { id: "wavy", name: "Xoăn Sóng Lụa" },
  { id: "bob", name: "Tóc Bob & Ngang Vai" },
  { id: "straight", name: "Thẳng Suôn Layer" },
  { id: "topper", name: "Mái Phủ Đỉnh & Phủ Bạc" },
];

// Interactive Before / After Transformations
export const BEFORE_AFTER_ITEMS: BeforeAfterItem[] = [
  {
    id: "ba-1",
    title: "Phù Hóa Mái Tóc Mỏng Yếu Thành Sóng Lơi Bồng Bềnh",
    tag: "Khách hàng Doanh Nhân",
    description: "Khách hàng gặp tình trạng rụng tóc sau sinh và thưa đỉnh đầu. Đội bộ tóc giả nguyên đầu sợi tóc thật 100% uốn sóng lụa giúp lấy lại phong thái tự tin chỉ sau 3 phút.",
    beforeImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    afterImg: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
    hairStyle: "Sóng Lụa Nâu Hạt Dẻ 55cm",
    resultNotes: "Lớp ren siêu da đầu tiệp 100% màu da, rẽ ngôi tự do không lộ viền."
  },
  {
    id: "ba-2",
    title: "Trẻ Hóa 10 Tuổi Với Kiểu Tóc Bob Ngắn Ôm Gọn Gương Mặt",
    tag: "Khách hàng Công Sở",
    description: "Giải pháp nhanh chóng cho mái tóc xơ rối do hóa chất. Kiểu tóc Bob cúp nhẹ tự nhiên ôm sát cằm, nâng tầm vẻ thanh lịch và quý phái.",
    beforeImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    afterImg: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800&auto=format&fit=crop",
    hairStyle: "Bob Cụp Tự Nhiên Nâu Vàng Khói 32cm",
    resultNotes: "Trọng lượng siêu nhẹ chỉ 110g, thoáng khí suốt ngày dài."
  }
];

// The Atelier Craftsmanship Steps
export const CRAFT_STEPS: CraftStep[] = [
  {
    step: "01",
    title: "Tuyển Chọn 100% Tóc Thật",
    subtitle: "Virgin Remy Hair",
    desc: "Từng lọn tóc đều là tóc thật tự nhiên chưa qua xử lý công nghiệp, còn nguyên vẹn lớp biểu bì giúp sợi tóc giữ độ bóng mượt và chắc khỏe tuyệt đối.",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop"
  },
  {
    step: "02",
    title: "Móc Tay Thủ Công Từng Sợi",
    subtitle: "Swiss HD Invisible Lace",
    desc: "Nghệ nhân dùng kim móc siêu nhỏ gắn thủ công từng sợi tóc vào màng ren Thụy Sĩ siêu mỏng, tái tạo hướng mọc tự nhiên như tóc mọc từ chính da đầu bạn.",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800&auto=format&fit=crop"
  },
  {
    step: "03",
    title: "May Đo Theo Chu Vi Đầu Riêng",
    subtitle: "Custom Tailoring",
    desc: "Mỗi khách hàng được lấy số đo 6 điểm trên vòng đầu để tạo phom mũ ôm khít thoải mái, vận động hay tập thể thao đều không lo xô lệch.",
    image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=800&auto=format&fit=crop"
  },
  {
    step: "04",
    title: "Tạo Kiểu & Phối Tone Màu Độc Bản",
    subtitle: "Master Stylist Cut & Color",
    desc: "Nhà tạo mẫu Mai Nguyễn trực tiếp tỉa layer, uốn sóng hoặc tạo kiểu mái bay cá nhân hóa theo từng đường nét trên khuôn mặt bạn.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop"
  }
];

// Testimonials
export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t-1",
    name: "Chị Hoàng Lan Phương",
    location: "Hà Nội",
    role: "Giám Đốc Truyền Thông",
    comment: "Trước đây mình rất tự ti vì tóc rụng nhiều sau sinh. Khi đến thử tóc tại Mai Nguyễn, mình thực sự bất ngờ vì da đầu nhìn y như thật, đồng nghiệp ở công ty không một ai phát hiện ra. Rất biết ơn chị Mai!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    hairStyle: "Sóng Lơi Nâu Chocolate",
    date: "Tháng 8, 2026"
  },
  {
    id: "t-2",
    name: "Bác Minh Hạnh",
    location: "Hưng Yên",
    role: "Giáo Viên Về Hưu",
    comment: "Tóc nhẹ tênh, đội cả ngày đi tiệc cưới hay gặp gỡ bạn bè đều dễ chịu, không hề bị ngứa hay nóng bức. Đường rẽ ngôi rất tự nhiên, con gái tôi khen trẻ ra nhiều tuổi.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=200&auto=format&fit=crop",
    hairStyle: "Mái Phủ Đỉnh Tóc Thật",
    date: "Tháng 8, 2026"
  },
  {
    id: "t-3",
    name: "Bạn Thùy Dương",
    location: "TP. Hồ Chí Minh",
    role: "Fashion Creator",
    comment: "Chất tóc siêu mượt, uốn nhiệt hay sấy tạo kiểu đều mượt như tóc thật của mình. Dịch vụ may đo chuẩn từng centimet vòng đầu. Vote 5 sao cho atelier Mai Nguyễn!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
    hairStyle: "Bob Ngắn Thanh Lịch",
    date: "Tháng 7, 2026"
  }
];

export const SALON_VALUES = [
  {
    icon: Scissors,
    title: "100% Tóc Thật Tự Nhiên",
    desc: "Tuyển chọn sợi tóc bóng khỏe, giữ nguyên lớp biểu bì, có thể uốn duỗi nhuộm tùy ý."
  },
  {
    icon: Sparkles,
    title: "Lưới Ren HD Siêu Tàng Hình",
    desc: "Màng ren Thụy Sĩ siêu mỏng mô phỏng chân nang tóc, thoáng khí và êm ái tối đa."
  },
  {
    icon: Award,
    title: "May Đo Riêng Theo Form Đầu",
    desc: "Lấy số đo chuẩn xác từng khách hàng, đội chắc chắn và tự nhiên mọi lúc mọi nơi."
  },
  {
    icon: HeartHandshake,
    title: "Bảo Dưỡng & Phục Hồi Trọn Đời",
    desc: "Hỗ trợ gội sấy, tạo nếp và chăm sóc định kỳ chuyên nghiệp cho mái tóc luôn như mới."
  }
];
