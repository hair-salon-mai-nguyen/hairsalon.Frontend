"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Scissors, ShieldCheck, Heart, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-6 space-y-20">
        {/* Banner Title */}
        <div className="text-center space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs tracking-[0.3em] uppercase text-gold-500 block"
          >
            Câu Chuyện Thương Hiệu
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-serif text-gold-gradient font-bold uppercase tracking-wider"
          >
            Về Mai Nguyễn Luxury Hair
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-[1px] bg-gold-500 mx-auto mt-4"
          />
        </div>

        {/* Narrative & Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-neutral-400 text-xs md:text-sm font-light leading-relaxed"
          >
            <h2 className="font-serif text-2xl text-gold-200 font-semibold tracking-wide">
              Đam Mê Bất Tận Với Sợi Tóc Tự Nhiên
            </h2>
            <p>
              Được sáng lập bởi nhà tạo mẫu tóc Mai Nguyễn, thương hiệu **Mai Nguyễn Luxury Hair Salon** khởi nguồn từ mong muốn mang lại diện mạo kiêu hãnh và sự tự tin tuyệt đối cho khách hàng, đặc biệt là những người gặp phải khuyết điểm về mái tóc.
            </p>
            <p>
              Chúng tôi nhận thấy rằng trên thị trường có rất nhiều loại tóc giả bằng sợi tơ nhân tạo xơ cứng, bóng giả tạo và gây bí bách da đầu khi đội. Vì vậy, Mai Nguyễn đã quyết tâm định vị phân khúc tóc giả cao cấp, chỉ sử dụng duy nhất nguồn **tóc thật tự nhiên tuyển chọn 100%**.
            </p>
            <p>
              Từng lọn tóc đều được những thợ uốn chuyên nghiệp của salon gội sấy, làm sạch sinh học và uốn duỗi nhiệt tỉ mỉ, giúp giữ nguyên lớp biểu bì tự nhiên óng ả, đem lại độ tơi nhẹ hoàn hảo và tuổi thọ sản phẩm bền lâu qua năm tháng.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-dark-border"
          >
            <Image
              src="https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop"
              alt="Luxury Hair styling"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Commitment Icons Grid */}
        <div className="border-y border-dark-border/60 py-16">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <h2 className="font-serif text-2xl text-gold-200 uppercase tracking-widest font-semibold">
              Cam Kết Vàng Từ Mai Nguyễn
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Scissors size={20} className="text-gold-500" />,
                title: "Thủ Công Tinh Xảo",
                desc: "Từ khâu kết lưới da đầu, đan sợi tơ vô hình đến cắt tỉa mái bay, uốn sóng lơi đều được thực hiện thủ công, trau chuốt từng nan tóc.",
              },
              {
                icon: <ShieldCheck size={20} className="text-gold-500" />,
                title: "100% Tóc Thật Tự Nhiên",
                desc: "Cam kết hoàn tiền gấp 10 lần nếu phát hiện pha trộn tóc giả nilon. Khách hàng có thể nhuộm, tẩy, uốn nhiệt thoải mái như tóc tự nhiên.",
              },
              {
                icon: <Heart size={20} className="text-gold-500" />,
                title: "Đồng Hành & Chăm Sóc",
                desc: "Không chỉ bán một bộ tóc giả, chúng tôi đồng hành cùng khách hàng trong suốt thời gian sử dụng với dịch vụ spa tóc chuyên sâu độc quyền.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="glass-panel p-8 rounded-xl border border-dark-border text-center space-y-4"
              >
                <div className="w-10 h-10 rounded-full border border-gold-500/20 bg-background flex items-center justify-center mx-auto">
                  {item.icon}
                </div>
                <h3 className="font-serif text-sm text-gold-200 font-semibold tracking-wider">{item.title}</h3>
                <p className="text-neutral-400 text-xs leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Styling Journey */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl text-gold-200 font-semibold tracking-wide uppercase">
            Quy Trình Tạo Ra Một Bộ Tóc Giả Luxury
          </h2>
          <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed">
            Mỗi khách hàng đến với Mai Nguyễn đều được đo chu vi đầu tỉ mỉ để chọn phom lưới phù hợp. Tiếp đó, chúng tôi phác thảo dáng tóc phù hợp với khuôn mặt và cá tính của quý khách. Các nghệ nhân móc tóc sẽ tiến hành móc thủ công trên lớp màng siêu da đầu HD từng sợi một. Cuối cùng, nhà tạo mẫu Mai Nguyễn sẽ trực tiếp cắt tỉa, uốn lọn tạo kiểu và bàn giao một tác phẩm hoàn hảo nhất.
          </p>
          <div className="inline-flex items-center space-x-2 border border-gold-500/30 bg-gold-900/10 px-4 py-2 rounded-full text-gold-300 text-[10px] tracking-widest uppercase">
            <Sparkles size={10} className="animate-spin-slow" />
            <span>Sự hài lòng của quý khách là kiêu hãnh của chúng tôi</span>
          </div>
        </div>
      </div>
    </div>
  );
}
