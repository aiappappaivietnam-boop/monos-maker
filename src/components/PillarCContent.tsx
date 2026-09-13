import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, BarChart3, 
  Store, Rocket, CheckCircle2,
  Calendar, ShieldAlert, Heart, FileText, ShoppingBag, Shield,
  Layers, ArrowRight, Clock, DollarSign, Handshake,
  AlertTriangle, RefreshCw, Building, Award, Check, ExternalLink,
  ChevronRight
} from 'lucide-react';

interface PillarCContentProps {
  onBack?: () => void;
}

export default function PillarCContent({ onBack }: PillarCContentProps) {
  const [activeTab, setActiveTab] = useState(0);

  const chapters = [
    {
      title: "Tổng quan & Vị thế Toàn cầu",
      icon: <Globe className="w-4 h-4" />,
      tag: "Vị thế HMD Group",
      content: (
        <div className="space-y-6">
          {/* Hero Banner Dark Theme matching Slide 1 */}
          <div className="bg-[#1a1c1e] text-white rounded-3xl p-6 sm:p-10 border border-[#3c4043] relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#d93025]/20 via-[#ea4335]/10 to-transparent rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#d93025]/20 text-[#f28b82] border border-[#d93025]/30">
                <span>HMD Group • Đề Án Hợp Tác Chiến Lược 2026</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
                Tối Ưu Hóa Chuỗi Cung Ứng & Phát Triển Thị Trường Toàn Cầu
              </h2>
              <p className="text-sm sm:text-base text-[#bdc1c6] leading-relaxed">
                Một mô hình hợp tác chiến lược được thiết kế để tối đa hóa thế mạnh của từng bên — từ sản xuất chuyên sâu đến phân phối toàn cầu.
              </p>
            </div>
          </div>

          {/* Core Capabilities - 4 key metrics matching Slide 2 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d93025]" />
              <span className="text-xs font-bold text-[#5f6368] uppercase tracking-wider">Năng lực cốt lõi & Vị thế toàn cầu</span>
            </div>
            <p className="text-xs text-[#5f6368]">
              HMD Group là đơn vị vận hành thương mại điện tử xuyên biên giới với hạ tầng vững chắc và bề dày kinh nghiệm.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {[
                { 
                  num: "6", 
                  title: "Kho Hàng Chiến Lược", 
                  desc: "Tại Mỹ, Canada & Úc",
                  color: "text-[#d93025] bg-[#fce8e6] border-[#fad2cf]"
                },
                { 
                  num: "4+", 
                  title: "Thương Hiệu Độc Lập", 
                  desc: "Nội thất, thể thao & ngoài trời",
                  color: "text-[#1a73e8] bg-[#e8f0fe] border-[#d2e3fc]"
                },
                { 
                  num: "15", 
                  title: "Năm Kinh Nghiệm", 
                  desc: "Vận hành TMĐT quốc tế",
                  color: "text-[#137333] bg-[#e6f4ea] border-[#ceead6]"
                },
                { 
                  num: "3", 
                  title: "Pháp Nhân Quốc Tế", 
                  desc: "Việt Nam, Mỹ, Canada & Úc",
                  color: "text-[#e37400] bg-[#fef7e0] border-[#feefc3]"
                }
              ].map((item, i) => (
                <div key={i} className="bg-white border border-[#dadce0] rounded-2xl p-6 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#202124] mb-2">{item.num}</div>
                  <div>
                    <h5 className="font-bold text-sm text-[#202124] mb-0.5">{item.title}</h5>
                    <p className="text-xs text-[#5f6368]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Hạ tầng Kho bãi & Kênh Phân phối",
      icon: <Store className="w-4 h-4" />,
      tag: "Hạ tầng vận hành",
      content: (
        <div className="space-y-6">
          <div className="bg-white border border-[#dadce0] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xs">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#fce8e6] text-[#d93025] border border-[#fad2cf] inline-block mb-2">
                Hạ Tầng Vận Hành
              </span>
              <h3 className="text-xl font-bold text-[#202124]">Mạng Lưới Kho Bãi & Kênh Phân Phối Toàn Cầu</h3>
              <p className="text-sm text-[#5f6368] mt-1">
                Mạng lưới phân phối trực tiếp kết nối với các cảng xuất khẩu chính và trung tâm tiêu dùng lớn.
              </p>
            </div>

            {/* Warehouse locations matching Slide 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🇺🇸</span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#e8f0fe] text-[#1a73e8] border border-[#d2e3fc]">
                    3 Kho Chính
                  </span>
                </div>
                <h4 className="font-bold text-base text-[#202124]">Hoa Kỳ (United States)</h4>
                <p className="text-xs text-[#5f6368] leading-relaxed">
                  3 kho chính đặt tại <strong>California, Texas</strong> và <strong>North Carolina</strong>, bao phủ cả bờ Đông, bờ Tây và miền Nam Hoa Kỳ.
                </p>
              </div>

              <div className="p-5 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🇨🇦</span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#fef7e0] text-[#b06000] border border-[#feefc3]">
                    2 Kho Trung Tâm
                  </span>
                </div>
                <h4 className="font-bold text-base text-[#202124]">Canada</h4>
                <p className="text-xs text-[#5f6368] leading-relaxed">
                  2 kho tại <strong>Toronto</strong> và <strong>Vancouver</strong>, phục vụ phân phối nhanh tại các đô thị lớn nhất Canada.
                </p>
              </div>

              <div className="p-5 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🇦🇺</span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#e6f4ea] text-[#137333] border border-[#ceead6]">
                    1 Kho Chiến Lược
                  </span>
                </div>
                <h4 className="font-bold text-base text-[#202124]">Úc (Australia)</h4>
                <p className="text-xs text-[#5f6368] leading-relaxed">
                  1 kho tại <strong>Sydney</strong>, trung tâm giao thương trọng yếu của toàn bộ thị trường Úc và New Zealand.
                </p>
              </div>
            </div>

            {/* Marketplace channels */}
            <div className="p-5 bg-[#202124] text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#f28b82] text-xs font-bold uppercase tracking-wider">
                  <ShoppingBag className="w-4 h-4" /> Nền Tảng Bán Hàng
                </div>
                <div className="text-lg font-bold text-white">Đối tác chủ lực trên Amazon, Wayfair và Shopify</div>
                <p className="text-xs text-[#bdc1c6]">
                  Hệ thống tài khoản bán hàng cấp Enterprise, xếp hạng cao, tối ưu thuật toán hiển thị tự nhiên.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Amazon FBA/FBM', 'Wayfair Castlegate', 'Shopify D2C'].map((m, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-medium text-white">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Mô hình Phân nhiệm 3 Trụ cột",
      icon: <Handshake className="w-4 h-4" />,
      tag: "Mô hình hợp tác",
      content: (
        <div className="space-y-6">
          <div className="bg-white border border-[#dadce0] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xs">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#fce8e6] text-[#d93025] border border-[#fad2cf] inline-block mb-2">
                Mô Hình Hợp Tác 3 Trụ Cột (Pillar A - B - C)
              </span>
              <h3 className="text-xl font-bold text-[#202124]">Phân Nhiệm Chiến Lược — Tối Ưu Thế Mạnh Từng Bên</h3>
              <p className="text-sm text-[#5f6368] mt-1">
                Liên minh 3 trụ cột kết hợp hoàn chỉnh: Công nghệ & R&D (Pillar A) — Năng lực Sản xuất (Pillar B) — Mạng lưới Phân phối Toàn cầu (Pillar C).
              </p>
            </div>

            {/* Three Column comparison for Pillar A, Pillar B, Pillar C */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Pillar A - Công nghệ & R&D */}
              <div className="p-6 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl space-y-4 hover:border-[#1a73e8] transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#e8f0fe] border border-[#d2e3fc] flex items-center justify-center text-[#1a73e8] font-bold text-base shadow-2xs">
                      A
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-[#202124]">Pillar A — Monos Maker</h4>
                      <span className="text-xs text-[#1a73e8] font-semibold">Công Nghệ, 3D R&D & PIM Data</span>
                    </div>
                  </div>
                  <div className="space-y-2.5 pt-2">
                    {[
                      "Thiết kế 3D, số hóa dữ liệu sản phẩm PIM & Assets chuẩn quốc tế",
                      "Nghiên cứu thị hiếu, phát triển concept và giải pháp công nghệ",
                      "Cung cấp nền tảng số hóa quản trị Furniture OS & AI Platform"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 bg-white border border-[#dadce0] rounded-xl text-xs text-[#202124]">
                        <CheckCircle2 className="w-4 h-4 text-[#1a73e8] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-3 text-[11px] text-[#5f6368] border-t border-[#dadce0]">
                  Trọng tâm: Nền tảng số & R&D Thiết kế
                </div>
              </div>

              {/* Pillar B - Đối tác sản xuất (Trước đây gọi là Bên A) */}
              <div className="p-6 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl space-y-4 hover:border-[#137333] transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#e6f4ea] border border-[#ceead6] flex items-center justify-center text-[#137333] font-bold text-base shadow-2xs">
                      B
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-[#202124]">Pillar B — Đối Tác Sản Xuất</h4>
                      <span className="text-xs text-[#137333] font-semibold">Gia Công, Chế Tác & Nhà Máy</span>
                    </div>
                  </div>
                  <div className="space-y-2.5 pt-2">
                    {[
                      "Nghiên cứu kỹ thuật, hoàn thiện khuôn mẫu và đảm bảo tiêu chuẩn QC",
                      "Tối ưu hóa dây chuyền sản xuất, nguyên vật liệu và tiến độ xuất xưởng",
                      "Tiếp nhận phản hồi từ thị trường quốc tế để liên tục cải tiến sản phẩm"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 bg-white border border-[#dadce0] rounded-xl text-xs text-[#202124]">
                        <CheckCircle2 className="w-4 h-4 text-[#137333] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-3 text-[11px] text-[#5f6368] border-t border-[#dadce0]">
                  Trọng tâm: Sản xuất & Đảm bảo chất lượng FOB
                </div>
              </div>

              {/* Pillar C - HMD Group (Trước đây gọi là Bên B) */}
              <div className="p-6 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl space-y-4 hover:border-[#d93025] transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#fce8e6] border border-[#fad2cf] flex items-center justify-center text-[#d93025] font-bold text-base shadow-2xs">
                      C
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-[#202124]">Pillar C — HMD Group</h4>
                      <span className="text-xs text-[#d93025] font-semibold">Thương Mại & Phân Phối Toàn Cầu</span>
                    </div>
                  </div>
                  <div className="space-y-2.5 pt-2">
                    {[
                      "Phân tích dữ liệu thị trường, định hướng danh mục sản phẩm tiềm năng",
                      "Triển khai kinh doanh trên Amazon, Wayfair, Shopify tại Mỹ, Canada & Úc",
                      "Vận hành 6 kho hàng chiến lược, logistics và cung cấp phản hồi thực tế"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 bg-white border border-[#dadce0] rounded-xl text-xs text-[#202124]">
                        <CheckCircle2 className="w-4 h-4 text-[#d93025] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-3 text-[11px] text-[#5f6368] border-t border-[#dadce0]">
                  Trọng tâm: Bán hàng, Kho bãi & Tối ưu doanh thu
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Chu kỳ Vận hành 5 Tháng",
      icon: <Clock className="w-4 h-4" />,
      tag: "Quy trình vận hành",
      content: (
        <div className="space-y-6">
          <div className="bg-white border border-[#dadce0] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xs">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#fce8e6] text-[#d93025] border border-[#fad2cf] inline-block mb-2">
                Quy Trình Vận Hành
              </span>
              <h3 className="text-xl font-bold text-[#202124]">Chu Kỳ Kinh Doanh 5 Tháng — Từ Đặt Hàng Đến Thu Hồi Vốn</h3>
              <p className="text-sm text-[#5f6368] mt-1">
                Chu kỳ luân chuyển vốn được thiết lập khoa học để tối ưu hóa thời gian quay vòng dòng tiền.
              </p>
            </div>

            {/* 5 Stages Timeline matching Slide 5 */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
              {[
                { stage: "GĐ 1", num: "1", title: "Sản Xuất", time: "45–60 ngày", desc: "Sản xuất hàng loạt, kiểm soát QC và đóng gói theo chuẩn TMĐT." },
                { stage: "GĐ 2", num: "2", title: "Vận Tải Quốc Tế", time: "~30 ngày", desc: "Vận chuyển đường biển (Ocean Freight) tới các cảng mục tiêu." },
                { stage: "GĐ 3", num: "3", title: "Xử Lý Lưu Kho", time: "~30 ngày", desc: "Thông quan, dán nhãn FBA/Castlegate và phân bổ về hệ thống kho." },
                { stage: "GĐ 4", num: "4", title: "Kinh Doanh", time: "30–90 ngày", desc: "Kích hoạt bán lẻ, chạy chiến dịch marketing & logistics chặng cuối." },
                { stage: "GĐ 5", num: "5", title: "Đối Soát & Thu Tiền", time: "15–60 ngày", desc: "Thanh toán định kỳ dựa trên doanh thu đối soát từ sàn TMĐT." }
              ].map((step, idx) => (
                <div key={idx} className="p-4 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl flex flex-col justify-between hover:border-[#d93025] transition-all">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#d93025]">{step.stage}</span>
                      <div className="w-6 h-6 rounded-full bg-[#d93025] text-white text-xs font-bold flex items-center justify-center">
                        {step.num}
                      </div>
                    </div>
                    <h5 className="font-bold text-sm text-[#202124]">{step.title}</h5>
                    <div className="text-xs font-bold text-[#1a73e8] bg-[#e8f0fe] px-2 py-0.5 rounded-md inline-block">
                      {step.time}
                    </div>
                    <p className="text-[11px] text-[#5f6368] leading-relaxed pt-1">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom summary note */}
            <div className="p-4 bg-[#e6f4ea] border border-[#ceead6] rounded-xl flex items-center gap-3 text-xs sm:text-sm text-[#137333]">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>
                <strong>Tổng chu kỳ được tối ưu trong khoảng 5 tháng</strong>, với cơ chế thu tiền linh hoạt: <strong>15 ngày</strong> từ Amazon và <strong>60 ngày</strong> từ Wayfair.
              </span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Thanh toán & Phân bổ Doanh thu",
      icon: <DollarSign className="w-4 h-4" />,
      tag: "Tài chính & Hợp tác",
      content: (
        <div className="space-y-6">
          {/* Payment mechanism matching Slide 6 */}
          <div className="bg-white border border-[#dadce0] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xs">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#fce8e6] text-[#d93025] border border-[#fad2cf] inline-block mb-2">
                Tài Chính & Hợp Tác
              </span>
              <h3 className="text-xl font-bold text-[#202124]">Cơ Chế Thanh Toán Minh Bạch & Linh Hoạt</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  step: "01",
                  title: "Lựa Chọn Sản Phẩm",
                  desc: "Pillar C (Phân phối) chủ động phân tích thị trường, chọn sản phẩm tiềm năng và cùng Pillar A (R&D) đề xuất mẫu mã."
                },
                {
                  step: "02",
                  title: "Đánh Giá Tính Khả Thi",
                  desc: "Pillar B (Sản xuất) và Pillar C cùng tính toán giá thành FOB, chi phí logistics và đánh giá trước khi chốt đơn hàng."
                },
                {
                  step: "03",
                  title: "Thanh Toán Định Kỳ",
                  desc: "Thanh toán hàng tháng dựa trên lượng hàng thực tế đã bán sau khi nhận đối soát từ sàn TMĐT (Amazon/Wayfair)."
                },
                {
                  step: "04",
                  title: "Minh Bạch Dữ Liệu",
                  desc: "Pillar B (Nhà máy) truy cập hệ thống quản trị dữ liệu realtime của Furniture OS để theo dõi bán hàng và tồn kho minh bạch."
                }
              ].map((item, idx) => (
                <div key={idx} className="p-5 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl space-y-2 hover:border-[#1a73e8] transition-all">
                  <div className="text-2xl font-extrabold text-[#d93025] font-mono">{item.step}</div>
                  <h4 className="font-bold text-sm text-[#202124]">{item.title}</h4>
                  <p className="text-xs text-[#5f6368] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue and Cost breakdown matching Slide 7 */}
          <div className="bg-white border border-[#dadce0] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xs">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#e8f0fe] text-[#1a73e8] border border-[#d2e3fc] inline-block mb-2">
                Cơ Cấu Doanh Thu
              </span>
              <h3 className="text-xl font-bold text-[#202124]">Phân Bổ Chi Phí & Biên Lợi Nhuận Gộp</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-[#fef7e0] border border-[#feefc3] rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-[#b06000]">
                  <Award className="w-5 h-5" /> Lợi Nhuận Gộp Kỳ Vọng
                </div>
                <p className="text-xs sm:text-sm text-[#3c4043] leading-relaxed">
                  Biên lợi nhuận gộp hoạt động đạt <strong>8–15%</strong> trên giá bán lẻ trung bình, sau khi đã bao phủ toàn bộ chi phí vận hành.
                </p>
              </div>

              <div className="p-6 bg-[#fce8e6] border border-[#fad2cf] rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-[#d93025]">
                  <Building className="w-5 h-5" /> Chi Phí Nhập Hàng (FOB)
                </div>
                <p className="text-xs sm:text-sm text-[#3c4043] leading-relaxed">
                  Chi phí nhập hàng (FOB) chiếm tỷ trọng lớn nhất <strong>(~20–30%)</strong>, phản ánh giá trị thực của sản phẩm từ nhà sản xuất.
                </p>
              </div>
            </div>

            {/* Visual Breakdown Bars */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-[#5f6368] uppercase tracking-wider">Tỷ trọng các cấu phần trong giá bán lẻ (Tham chiếu)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { name: "Giá trị FOB (Nhà sản xuất)", range: "20–28%", highlight: true },
                  { name: "Logistics quốc tế (Sea Freight)", range: "5–10%" },
                  { name: "Thuế nhập khẩu & Tariff", range: "0–10%" },
                  { name: "Vận chuyển nội địa (Last Mile)", range: "~5%" },
                  { name: "Vận hành kho & Fulfillment", range: "~8%" },
                  { name: "Lưu kho & Xử lý đơn hàng", range: "6–7%" },
                  { name: "Chi phí sàn (Amazon/Wayfair Fee)", range: "5–15%" },
                  { name: "Tiếp thị & Quảng cáo (PPC/Ads)", range: "5–15%" },
                  { name: "Hậu mãi, hoàn trả & CS", range: "~6%" },
                  { name: "Lợi Nhuận Gộp Hoạt Động", range: "8–15%", profit: true }
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`p-3.5 rounded-xl border flex items-center justify-between text-xs ${
                      item.highlight 
                        ? 'bg-[#fce8e6]/60 border-[#d93025] font-bold text-[#202124]' 
                        : item.profit 
                          ? 'bg-[#e6f4ea] border-[#137333] font-bold text-[#137333]'
                          : 'bg-[#f8f9fa] border-[#dadce0] text-[#3c4043]'
                    }`}
                  >
                    <span>{item.name}</span>
                    <span className="font-mono px-2 py-0.5 rounded bg-white border border-[#dadce0] font-bold">
                      {item.range}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Quản trị Rủi ro & Giá trị TRUST",
      icon: <ShieldAlert className="w-4 h-4" />,
      tag: "Cam kết đồng hành",
      content: (
        <div className="space-y-6">
          {/* Risk Management Matrix matching Slide 8 */}
          <div className="bg-white border border-[#dadce0] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xs">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#fce8e6] text-[#d93025] border border-[#fad2cf] inline-block mb-2">
                Quản Trị Rủi Ro
              </span>
              <h3 className="text-xl font-bold text-[#202124]">Nguyên Tắc Ứng Xử — Đồng Hành Cùng Vượt Khó</h3>
              <p className="text-sm text-[#5f6368] mt-1">
                Cam kết xử lý minh bạch và chia sẻ trách nhiệm trong mọi tình huống phát sinh.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#dadce0] bg-[#f8f9fa]">
                    <th className="py-3.5 px-4 font-bold text-[#202124] rounded-l-xl w-1/3">Vấn Đề Phát Sinh</th>
                    <th className="py-3.5 px-4 font-bold text-[#202124] rounded-r-xl">Hướng Xử Lý Cam Kết</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dadce0]">
                  {[
                    {
                      problem: "Chậm trễ sản xuất / logistics",
                      solution: "Pillar B chịu trễ dòng tiền. Pillar A và C hỗ trợ tối ưu thời gian sản xuất và quy trình vận chuyển."
                    },
                    {
                      problem: "Hàng bán chậm, không đạt kỳ vọng",
                      solution: "Cả hai bên cùng chịu trễ dòng tiền. Pillar C chủ động tối ưu chi phí lưu trữ kho bãi và đẩy mạnh marketing."
                    },
                    {
                      problem: "Hàng lỗi kỹ thuật cần thanh lý",
                      solution: "Pillar B (Sản xuất) và Pillar C (Phân phối) thảo luận minh bạch để giảm thiểu tối đa thiệt hại chung."
                    },
                    {
                      problem: "Khách hàng hoàn trả / đổi trả",
                      solution: "Các bên cam kết cơ chế chia sẻ thiệt hại và phân bổ chi phí phát sinh minh bạch theo tỷ lệ thỏa thuận."
                    }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#f8f9fa]/80 transition-colors">
                      <td className="py-4 px-4 font-semibold text-[#202124]">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-[#e37400] shrink-0" />
                          <span>{row.problem}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-[#3c4043] leading-relaxed">
                        {row.solution}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* TRUST Core values matching Slide 9 */}
          <div className="bg-[#1a1c1e] text-white border border-[#3c4043] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xs">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#d93025]/20 text-[#f28b82] border border-[#d93025]/30 inline-block mb-2">
                Nền Tảng Hợp Tác
              </span>
              <h3 className="text-xl font-bold text-white">TRUST — Giá Trị Cốt Lõi Của Mối Quan Hệ Bền Vững</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {[
                { vn: "Tín Nhiệm", en: "Reliance", icon: "🤝" },
                { vn: "Chân Thành", en: "Sincerity", icon: "❤️" },
                { vn: "Năng Lực", en: "Competence", icon: "⭐" },
                { vn: "Đáng Tin Cậy", en: "Credence", icon: "🛡️" },
                { vn: "Bảo Đảm", en: "Assurance", icon: "🔒" },
                { vn: "Cam Kết", en: "Commitment", icon: "🎯" },
                { vn: "Chính Trực", en: "Integrity", icon: "⚖️" }
              ].map((val, idx) => (
                <div key={idx} className="p-4 bg-[#282a2d] border border-[#3c4043] rounded-xl text-center space-y-1 hover:border-[#d93025] transition-all">
                  <div className="text-xl mb-1">{val.icon}</div>
                  <div className="font-bold text-xs sm:text-sm text-white">{val.vn}</div>
                  <div className="text-[10px] text-[#bdc1c6] font-mono">{val.en}</div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-[#3c4043] text-xs text-[#bdc1c6]">
              <span>Official Partner Portal</span>
              <a 
                href="https://behmd.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-[#f28b82] hover:underline font-mono inline-flex items-center gap-1 font-bold"
              >
                HTTPS://BEHMD.COM <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Lộ trình Hợp tác & Triển khai",
      icon: <Calendar className="w-4 h-4" />,
      tag: "Bước tiếp theo",
      content: (
        <div className="space-y-6">
          <div className="bg-white border border-[#dadce0] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xs">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#fce8e6] text-[#d93025] border border-[#fad2cf] inline-block mb-2">
                Bước Tiếp Theo
              </span>
              <h3 className="text-xl font-bold text-[#202124]">Cùng Nhau Xây Dựng Chuỗi Giá Trị Toàn Cầu</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Why collaborate now matching Slide 10 */}
              <div className="p-6 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl space-y-4">
                <h4 className="font-bold text-base text-[#202124] flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-[#d93025]" /> Tại Sao Hợp Tác Ngay?
                </h4>
                <div className="space-y-3 pt-1">
                  {[
                    "Hạ tầng sẵn có — triển khai nhanh, giảm rủi ro ban đầu",
                    "Dữ liệu thị trường thực chiến — ra quyết định chính xác",
                    "Mô hình minh bạch — xây dựng lòng tin bền vững"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#202124]">
                      <CheckCircle2 className="w-4 h-4 text-[#137333] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly Roadmap matching Slide 10 */}
              <div className="p-6 bg-[#fce8e6]/40 border border-[#fad2cf] rounded-2xl space-y-4">
                <h4 className="font-bold text-base text-[#202124] flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#d93025]" /> Lộ Trình Hợp Tác
                </h4>
                <div className="space-y-2.5 pt-1">
                  {[
                    { month: "Tháng 1", task: "Thống nhất danh mục sản phẩm đầu tiên" },
                    { month: "Tháng 2", task: "Đánh giá tính khả thi & ký kết thỏa thuận" },
                    { month: "Tháng 3–5", task: "Phát triển mẫu, đặt hàng sản xuất lô đầu tiên" },
                    { month: "Tháng 6", task: "Vận chuyển qua các nước kinh doanh" },
                    { month: "Tháng 7–8", task: "Hàng lên kệ & bắt đầu tạo doanh thu" }
                  ].map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm bg-white p-2.5 rounded-xl border border-[#dadce0]">
                      <span className="font-bold text-xs text-[#d93025] bg-[#fce8e6] px-2 py-0.5 rounded-md shrink-0">
                        {step.month}
                      </span>
                      <span className="text-[#202124]">{step.task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full pb-16">
      {/* Page Header */}
      <div className="mb-6 max-w-4xl">
        <div className="w-12 h-12 bg-white border border-[#dadce0] flex items-center justify-center rounded-2xl mb-4 shadow-2xs text-[#d93025]">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div className="flex items-center gap-2.5 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase bg-[#fce8e6] text-[#d93025] border border-[#fad2cf]">
            Pillar C • HMD Group
          </span>
          <span className="text-xs text-[#5f6368] font-mono">
            Đề án Hợp tác Chiến lược 2026
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#202124] mb-2 leading-tight">
          Tối Ưu Hóa Chuỗi Cung Ứng & Phát Triển Thị Trường Toàn Cầu
        </h1>
        <p className="text-sm text-[#5f6368] leading-relaxed max-w-3xl">
          Mô hình hợp tác chiến lược kết nối năng lực sản xuất với mạng lưới phân phối đa quốc gia tại Mỹ, Canada & Úc trên các sàn TMĐT Amazon, Wayfair và Shopify.
        </p>
      </div>

      {/* Horizontal Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 border-b border-[#dadce0]">
        {chapters.map((chapter, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === idx 
                ? 'bg-[#d93025] text-white shadow-xs font-bold' 
                : 'bg-white text-[#3c4043] border border-[#dadce0] hover:bg-[#f1f3f4]'
            }`}
          >
            {chapter.icon}
            <span>{chapter.title}</span>
          </button>
        ))}
      </div>

      {/* Chapter Content View */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {chapters[activeTab].content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function TrendingUp(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

