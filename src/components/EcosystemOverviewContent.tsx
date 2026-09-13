/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Globe, TrendingUp, Layers, Target, PieChart, 
  AlertTriangle, Lightbulb, CheckCircle2, ChevronRight,
  Monitor, Briefcase, Database, Box, FileText, ShoppingCart,
  LayoutGrid, Cloud, Store, ShoppingBag, Zap, ArrowRight,
  HelpCircle, Building2, Cpu, Users
} from 'lucide-react';

interface EcosystemOverviewContentProps {
  onBack?: () => void;
}

export default function EcosystemOverviewContent({ onBack }: EcosystemOverviewContentProps) {
  const [activeTab, setActiveTab] = useState(0);

  const chapters = [
    {
      title: "Bối cảnh APAC & Thị trường",
      icon: <Globe className="w-4 h-4" />,
      tag: "Macro Market",
      content: (
        <div className="space-y-6 sm:space-y-8">
          {/* Highlight Callout */}
          <div className="bg-[#e8f0fe] border border-[#1a73e8]/20 p-4 sm:p-6 rounded-2xl flex items-start gap-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#1a73e8] text-white flex items-center justify-center shrink-0 shadow-xs">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className="text-[#1a73e8] font-bold text-[10px] sm:text-xs uppercase tracking-wider mb-1">Xu hướng tăng trưởng toàn cầu</p>
              <p className="text-[#202124] text-sm sm:text-base font-semibold leading-relaxed">
                "E-commerce dự kiến chiếm gần 25% tổng thị trường bán lẻ toàn cầu vào năm 2028, với khu vực APAC là động lực tăng trưởng lớn nhất."
              </p>
            </div>
          </div>

          {/* 3 Pillars of APAC Context */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {[
              { 
                t: "Đà Tăng Trưởng Mạnh Mẽ", 
                d: "Bán lẻ vật lý phục hồi nhưng thương mại điện tử vẫn là động lực tăng trưởng cốt lõi và ổn định nhất.", 
                icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#1a73e8]" />,
                badge: "Tăng trưởng 24%",
                bg: "hover:border-[#1a73e8]"
              },
              { 
                t: "Đặc Thù Từng Khu Vực", 
                d: "Khác biệt sâu sắc về địa lý, hành vi tiêu dùng, hạ tầng thanh toán và thị hiếu nội địa của từng quốc gia.", 
                icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-[#137333]" />,
                badge: "Đa dạng hóa",
                bg: "hover:border-[#137333]"
              },
              { 
                t: "Nhu Cầu Mạng Lưới Enabler", 
                d: "Sự bùng nổ của các đối tác hỗ trợ (Enablers) chiến lược chuyên biệt hóa theo từng mắt xích chuỗi giá trị.", 
                icon: <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-[#7627bb]" />,
                badge: "Hợp tác đa tầng",
                bg: "hover:border-[#7627bb]"
              }
            ].map((item, i) => (
              <div key={i} className={`p-5 sm:p-6 bg-white border border-[#dadce0] rounded-2xl transition-all shadow-2xs hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] ${item.bg} flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#f8f9fa] border border-[#dadce0] flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="text-[10px] sm:text-xs font-semibold text-[#5f6368] bg-[#f1f3f4] px-2.5 py-1 rounded-full">
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-[#202124] mb-2">{item.t}</h4>
                  <p className="text-xs sm:text-sm text-[#5f6368] leading-relaxed">{item.d}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Regional Maturation Matrix */}
          <div className="bg-white border border-[#dadce0] rounded-2xl p-5 sm:p-8">
            <h4 className="font-bold text-base sm:text-lg text-[#202124] mb-2">Ma trận Phân tầng Thị trường APAC</h4>
            <p className="text-xs sm:text-sm text-[#5f6368] mb-6">Đánh giá độ trưởng thành thị trường và chiến lược thâm nhập tối ưu.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { level: "Mature", title: "Thị trường Trưởng thành", desc: "Trung Quốc, Hàn Quốc, Nhật Bản - Thị trường bão hòa, cạnh tranh công nghệ và thương hiệu cao.", tag: "Tập trung R&D", color: "border-[#1a73e8]/30 bg-[#e8f0fe]/40 text-[#1a73e8]" },
                { level: "Hyper Growth", title: "Siêu Tăng Trưởng", desc: "Việt Nam, Indonesia, Thái Lan - Tốc độ tăng trưởng 2 con số, người tiêu dùng trẻ đón nhận đổi mới.", tag: "Mở rộng kênh", color: "border-[#137333]/30 bg-[#e6f4ea]/40 text-[#137333]" },
                { level: "Developing", title: "Đang Phát Triển", desc: "Philippines, Malaysia - Quá trình chuyển đổi số và hoàn thiện hạ tầng logistics diễn ra mạnh mẽ.", tag: "Chuẩn hóa quy trình", color: "border-[#7627bb]/30 bg-[#f3e8fd]/40 text-[#7627bb]" },
                { level: "Emerging", title: "Thị Trường Mới Nổi", desc: "Các thị trường ngách tiềm năng dài hạn, mở ra cơ hội xây dựng vị thế tiên phong.", tag: "Thăm dò & Định vị", color: "border-[#e37400]/30 bg-[#fef7e0]/40 text-[#e37400]" }
              ].map((item, i) => (
                <div key={i} className="p-4 sm:p-5 rounded-xl border border-[#dadce0] bg-[#f8f9fa] flex flex-col justify-between">
                  <div>
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold mb-3 border ${item.color}`}>
                      {item.level}
                    </span>
                    <h5 className="font-bold text-xs sm:text-sm text-[#202124] mb-1.5">{item.title}</h5>
                    <p className="text-[11px] sm:text-xs text-[#5f6368] leading-relaxed mb-4">{item.desc}</p>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-medium text-[#5f6368] bg-white border border-[#dadce0] px-2.5 py-1 rounded-md text-center">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Giải mã Mô hình A - B - C",
      icon: <Layers className="w-4 h-4" />,
      tag: "Core Architecture",
      content: (
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h4 className="text-xl sm:text-2xl font-extrabold text-[#202124]">Mô hình Hợp tác Chiến lược Ba Trụ cột</h4>
            <p className="text-sm text-[#5f6368] leading-relaxed">
              Mô hình A-B-C là một cấu trúc cộng sinh toàn diện, nơi mỗi mắt xích phát huy tối đa thế mạnh chuyên môn cốt lõi để tạo ra giá trị vượt trội.
            </p>
          </div>

          {/* 3 Pillars Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {[
              { 
                id: "A", 
                title: "Linh hồn: Brand & Sáng tạo", 
                role: "R&D, Design, Data & IP Master",
                desc: "Định hướng chiến lược sản phẩm, sáng tạo kiểu dáng công nghiệp, chuẩn hóa dữ liệu số và bảo vệ tài sản trí tuệ.",
                why: "Nếu thiếu A: Sản phẩm biến thành hàng gia công vô danh (OEM), không có thương hiệu, dễ bị ép giá và cạnh tranh khốc liệt.",
                badge: "Trụ cột A",
                icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-[#1a73e8]" />,
                badgeColor: "bg-[#e8f0fe] text-[#1a73e8] border-[#1a73e8]/30",
                borderColor: "hover:border-[#1a73e8]"
              },
              { 
                id: "B", 
                title: "Thân thể: Năng lực Sản xuất", 
                role: "Manufacturing & Supply Chain",
                desc: "Hệ thống nhà máy hiện đại, quản trị nguyên vật liệu bền vững, tự động hóa CNC và kiểm soát chất lượng QC nghiêm ngặt.",
                why: "Nếu thiếu B: Ý tưởng chỉ dừng lại trên bản vẽ, không thể hiện thực hóa thành sản phẩm hàng loạt với chất lượng ổn định.",
                badge: "Trụ cột B",
                icon: <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-[#e37400]" />,
                badgeColor: "bg-[#fef7e0] text-[#e37400] border-[#e37400]/30",
                borderColor: "hover:border-[#e37400]"
              },
              { 
                id: "C", 
                title: "Hơi thở: Kênh Phân phối", 
                role: "Commerce & Omni-channel",
                desc: "Mạng lưới phân phối đa quốc gia, am hiểu thuật toán các sàn TMĐT quốc tế (Amazon, Wayfair) và vận hành logistics chặng cuối.",
                why: "Nếu thiếu C: Sản phẩm tốt nhưng ứ đọng kho bãi, không tiếp cận được khách hàng mục tiêu và thiếu dòng tiền tái đầu tư.",
                badge: "Trụ cột C",
                icon: <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-[#137333]" />,
                badgeColor: "bg-[#e6f4ea] text-[#137333] border-[#137333]/30",
                borderColor: "hover:border-[#137333]"
              }
            ].map((p, i) => (
              <div key={i} className={`p-6 sm:p-8 bg-white border border-[#dadce0] rounded-2xl transition-all shadow-2xs hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] ${p.borderColor} flex flex-col justify-between relative overflow-hidden group`}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold border ${p.badgeColor}`}>
                      {p.badge}
                    </span>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#f8f9fa] border border-[#dadce0] flex items-center justify-center">
                      {p.icon}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-base sm:text-lg font-bold text-[#202124] mb-1">{p.title}</h5>
                    <p className="text-[10px] sm:text-xs font-semibold text-[#1a73e8] uppercase tracking-wide mb-3">{p.role}</p>
                    <p className="text-xs sm:text-sm text-[#5f6368] leading-relaxed">{p.desc}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#dadce0]/60 bg-[#f8f9fa] -mx-6 -mb-6 p-4 sm:p-5 rounded-b-2xl">
                  <p className="text-[11px] sm:text-xs text-[#202124] leading-relaxed">
                    <span className="font-bold text-[#d93025]">Hệ quả nếu thiếu:</span> {p.why}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Synergy Banner */}
          <div className="bg-[#f8f9fa] border border-[#dadce0] p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h5 className="font-bold text-base text-[#202124] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#137333]" />
                <span>Vòng lặp Giá trị Tăng trưởng Khép kín</span>
              </h5>
              <p className="text-sm text-[#5f6368] leading-relaxed max-w-2xl">
                A kiến tạo sản phẩm → B sản xuất chuẩn xác với chi phí tối ưu → C đưa sản phẩm ra thị trường và thu thập dữ liệu khách hàng → Cung cấp dữ liệu ngược lại cho A để cải tiến thế hệ tiếp theo.
              </p>
            </div>
            <div className="shrink-0 px-4 py-2 bg-white border border-[#dadce0] rounded-xl text-xs font-bold text-[#1a73e8] shadow-2xs">
              Mô hình Tự sinh trưởng
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Mối Quan hệ Tương hỗ",
      icon: <Target className="w-4 h-4" />,
      tag: "Interconnections",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { 
                tag: "A + B: Design-to-Manufacturing (DFM)",
                title: "Tối ưu hóa Bản vẽ & Dây chuyền", 
                desc: "A đưa ra ý tưởng thiết kế, B phản hồi về năng lực gia công và khuôn mẫu thực tế. Giúp loại bỏ rủi ro sai sót kỹ thuật, chuẩn hóa kết cấu ngay từ khâu R&D.",
                icon: <Cpu className="w-5 h-5 text-[#1a73e8]" />,
                benefits: ["Giảm 40% thời gian tạo mẫu", "Tối ưu chi phí khuôn ép", "Đảm bảo tính khả thi 100%"]
              },
              { 
                tag: "B + C: Supply Chain Sync",
                title: "Đồng bộ Chuỗi Cung ứng & Logistics", 
                desc: "B cung cấp tiến độ sản xuất và công suất nhà máy, C chia sẻ dữ liệu dự báo nhu cầu thị trường. Đảm bảo tồn kho ở mức tối ưu và xuất hàng đúng cam kết.",
                icon: <ShoppingBag className="w-5 h-5 text-[#137333]" />,
                benefits: ["Giảm chi phí lưu kho", "Chủ động lịch tàu biển", "Không đứt gãy hàng hóa"]
              },
              { 
                tag: "A + C: Data-Driven Listing",
                title: "Tối ưu Dữ liệu Sản phẩm theo Thị hiếu", 
                desc: "C ghi nhận phản hồi và hành vi tìm kiếm của người mua, A sử dụng dữ liệu này để nâng cấp sản phẩm (V2, V3) và hoàn thiện bộ hình ảnh / 3D phù hợp.",
                icon: <Database className="w-5 h-5 text-[#7627bb]" />,
                benefits: ["Tăng tỷ lệ chuyển đổi Listing", "Bám sát xu hướng thị trường", "Cải tiến tính năng đúng insight"]
              },
              { 
                tag: "CORE: Toàn diện Hệ sinh thái A-B-C",
                title: "Chiến lược Định vị & Chia sẻ Lợi nhuận", 
                desc: "Điểm hội tụ đồng thuận về giá bán quốc tế, ngân sách phát triển dòng sản phẩm mới và cơ chế phân bổ doanh thu minh bạch, bền vững cho mọi bên.",
                icon: <Zap className="w-5 h-5 text-[#e37400]" />,
                benefits: ["Chia sẻ rủi ro thị trường", "Liên minh dài hạn", "Nhân bản quy mô nhanh chóng"]
              }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white border border-[#dadce0] rounded-2xl shadow-2xs hover:border-[#1a73e8] transition-all space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f8f9fa] border border-[#dadce0] flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#1a73e8] uppercase tracking-wider">{item.tag}</span>
                    <h5 className="font-bold text-base text-[#202124]">{item.title}</h5>
                  </div>
                </div>
                <p className="text-sm text-[#5f6368] leading-relaxed">{item.desc}</p>
                <div className="pt-3 border-t border-[#dadce0]/60 flex flex-wrap gap-2">
                  {item.benefits.map((b, bIdx) => (
                    <span key={bIdx} className="text-xs text-[#3c4043] bg-[#f1f3f4] px-2.5 py-1 rounded-md font-medium">
                      ✓ {b}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Tiến hóa Mô hình Cung ứng",
      icon: <TrendingUp className="w-4 h-4" />,
      tag: "Evolution",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              { 
                level: "Stage 01",
                title: "Gia công OEM Truyền thống", 
                example: "Ví dụ: Mô hình cũ",
                desc: "A thiết kế độc lập, B chỉ nhận bản vẽ gia công, C tự phân phối rời rạc. Rủi ro phân mảnh và phụ thuộc năng lực tự thân.",
                status: "Tuyến tính, phân mảnh",
                highlight: false
              },
              { 
                level: "Stage 02",
                title: "Private Label Đặt hàng", 
                example: "Ví dụ: Amazon Basics",
                desc: "C tìm kiếm nhu cầu thị trường và thuê B gia công. A chỉ đóng vai trò in logo / bao bì mà thiếu năng lực R&D chuyên sâu.",
                status: "Thiếu chiều sâu R&D",
                highlight: false
              },
              { 
                level: "Stage 03",
                title: "Mô hình D2C Trực tiếp", 
                example: "Ví dụ: Thương hiệu D2C",
                desc: "Bán thẳng đến người tiêu dùng qua website và MXH. Linh hoạt nhưng gặp rào cản chi phí mở rộng đa kênh quốc tế.",
                status: "Hạn chế quy mô mở rộng",
                highlight: false
              },
              { 
                level: "Stage 04",
                title: "Hệ sinh thái A-B-C Monos", 
                example: "Furniture OS Platform",
                desc: "Hợp tác chiến lược chia sẻ dữ liệu số tập trung, tối ưu chuỗi cung ứng, chuẩn hóa quy trình và cùng chia sẻ lợi ích lâu dài.",
                status: "Hệ sinh thái cộng sinh",
                highlight: true
              }
            ].map((step, i) => (
              <div 
                key={i} 
                className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                  step.highlight 
                    ? 'bg-[#1a73e8] text-white border-[#1a73e8] shadow-md' 
                    : 'bg-white text-[#202124] border-[#dadce0] shadow-2xs hover:border-[#1a73e8]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-mono font-bold tracking-widest ${step.highlight ? 'text-blue-100' : 'text-[#5f6368]'}`}>
                      {step.level}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${step.highlight ? 'bg-white/20 text-white' : 'bg-[#f1f3f4] text-[#5f6368]'}`}>
                      {step.example}
                    </span>
                  </div>
                  <h5 className={`font-bold text-base mb-2 ${step.highlight ? 'text-white' : 'text-[#202124]'}`}>{step.title}</h5>
                  <p className={`text-xs leading-relaxed ${step.highlight ? 'text-blue-100' : 'text-[#5f6368]'}`}>{step.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-current/20">
                  <span className={`text-xs font-bold ${step.highlight ? 'text-white' : 'text-[#1a73e8]'}`}>
                    ● {step.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#e8f0fe] border border-[#1a73e8]/20 p-6 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#1a73e8] text-white flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1a73e8]">Bước Chuyển Dịch Tất Yếu</p>
              <p className="text-xs text-[#202124] mt-0.5">
                Chuyển đổi từ cạnh tranh đơn lẻ sang liên minh hệ sinh thái là chìa khóa để ngành nội thất Việt Nam nâng cao vị thế trong chuỗi giá trị toàn cầu.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Dòng tiền & Phân bổ Lợi ích",
      icon: <PieChart className="w-4 h-4" />,
      tag: "Economics",
      content: (
        <div className="space-y-8">
          <div className="bg-white border border-[#dadce0] rounded-2xl p-6 sm:p-8">
            <div className="text-center max-w-xl mx-auto mb-8">
              <h4 className="font-bold text-lg text-[#202124] mb-1">Cơ cấu Phân bổ Dòng tiền Minh bạch</h4>
              <p className="text-sm text-[#5f6368]">Mô hình chia sẻ lợi nhuận phản ánh đúng giá trị đóng góp của từng mắt xích.</p>
            </div>

            <div className="space-y-5 max-w-2xl mx-auto">
              {[
                { label: "Tổng Doanh Thu Sản Phẩm (Total Revenue)", val: 100, color: "bg-[#202124]", note: "Tổng giá trị giao dịch thương mại" },
                { label: "Pillar B: Năng lực Sản xuất & Vật tư (MFG)", val: 55, color: "bg-[#e37400]", note: "Chi phí nguyên liệu, gia công, máy móc & nhân công" },
                { label: "Pillar C: Kênh Bán & Vận hành (COM)", val: 30, color: "bg-[#137333]", note: "Chi phí marketing, sàn TMĐT, kho vận chặng cuối" },
                { label: "Pillar A: R&D, Design & Quản trị Brand (IP)", val: 15, color: "bg-[#1a73e8]", note: "Chi phí nghiên cứu, bản quyền thiết kế & hạ tầng số" }
              ].map((bar, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-[#202124]">
                    <span>{bar.label}</span>
                    <span className="font-mono text-sm">{bar.val}%</span>
                  </div>
                  <div className="h-3 bg-[#f1f3f4] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${bar.val}%` }} 
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`h-full ${bar.color} rounded-full`} 
                    />
                  </div>
                  <p className="text-[11px] text-[#5f6368]">{bar.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-6 bg-white border border-[#dadce0] rounded-2xl">
              <h5 className="font-bold text-sm text-[#202124] mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#137333]" />
                <span>Minh bạch P&L Độc lập</span>
              </h5>
              <p className="text-xs text-[#5f6368] leading-relaxed">
                Mỗi dòng sản phẩm được quản lý theo hồ sơ P&L riêng biệt, đối soát định kỳ theo dữ liệu đơn hàng thực tế từ các kênh phân phối.
              </p>
            </div>
            <div className="p-6 bg-white border border-[#dadce0] rounded-2xl">
              <h5 className="font-bold text-sm text-[#202124] mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#e37400]" />
                <span>Cơ chế Giảm thiểu Rủi ro</span>
              </h5>
              <p className="text-xs text-[#5f6368] leading-relaxed">
                Thiết lập ngưỡng cam kết sản lượng tối thiểu (MOQ) và tỷ lệ đặt cọc linh hoạt để bảo vệ thanh khoản cho nhà máy sản xuất.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Quản trị Rủi ro & Kết luận",
      icon: <CheckCircle2 className="w-4 h-4" />,
      tag: "Governance",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { risk: "Rủi ro Vi phạm Bản quyền (IP)", solution: "Phân định quyền sở hữu tài sản dữ liệu và đăng ký bảo hộ kiểu dáng công nghiệp ngay từ khâu duyệt mẫu.", icon: <Shield className="w-5 h-5 text-[#1a73e8]" /> },
              { risk: "Rủi ro Tồn kho & Đứt gãy Chuỗi cung", solution: "Đồng bộ dự báo bán hàng theo tuần và thiết lập mức tồn kho an toàn linh hoạt theo mùa vụ.", icon: <Box className="w-5 h-5 text-[#137333]" /> },
              { risk: "Rủi ro Chậm tiến độ & Kiểm soát Chất lượng", solution: "Áp dụng tiêu chuẩn QC 3 lớp và quy trình kiểm thử mẫu thực tế trước khi sản xuất đại trà.", icon: <Cpu className="w-5 h-5 text-[#e37400]" /> },
              { risk: "Rủi ro Biến động Chi phí Vận chuyển", solution: "Thiết kế bao bì dạng Flat-pack tối ưu không gian đóng container, giảm thiểu tối đa cước logistics.", icon: <ShoppingBag className="w-5 h-5 text-[#7627bb]" /> }
            ].map((item, i) => (
              <div key={i} className="p-5 bg-white border border-[#dadce0] rounded-2xl shadow-2xs space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f8f9fa] border border-[#dadce0] flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <h5 className="font-bold text-sm text-[#202124]">{item.risk}</h5>
                </div>
                <p className="text-xs text-[#5f6368] leading-relaxed pl-13">
                  <span className="font-semibold text-[#1a73e8]">Giải pháp:</span> {item.solution}
                </p>
              </div>
            ))}
          </div>

          {/* Strategic Conclusion */}
          <div className="p-8 bg-gradient-to-r from-[#1a73e8] to-[#1557d0] text-white rounded-3xl shadow-sm text-center space-y-3">
            <h4 className="text-xl sm:text-2xl font-black tracking-tight">Hợp Nhất Năng Lực — Triệt Tiêu Ranh Giới</h4>
            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Mô hình Pillar A | B | C kiến tạo liên minh sức mạnh toàn diện, đưa sản phẩm nội thất từ bản vẽ thiết kế đến tay người tiêu dùng toàn cầu với hiệu quả tối ưu nhất.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full pb-16">
      {/* Page Header */}
      <div className="mb-8 max-w-4xl">
        <div className="w-14 h-14 bg-white border border-[#dadce0] flex items-center justify-center rounded-2xl mb-4 shadow-2xs text-[#1a73e8]">
          <HelpCircle className="w-7 h-7" />
        </div>
        <div className="flex items-center gap-2.5 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase bg-[#e8f0fe] text-[#1a73e8] border border-[#1a73e8]/20">
            Hệ sinh thái Đối tác
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#202124] mb-2 leading-tight">
          Tổng quan Hệ sinh thái Pillar A | B | C
        </h1>
        <p className="text-sm text-[#5f6368] leading-relaxed max-w-3xl">
          Mô hình liên minh chiến lược giữa Đơn vị Sáng tạo & R&D (Pillar A), Nhà máy Sản xuất (Pillar B) và Kênh Thương mại Phân phối (Pillar C) trên nền tảng Furniture OS.
        </p>
      </div>

      {/* Horizontal Google Filter Chips Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-8 border-b border-[#dadce0]">
        {chapters.map((chapter, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === idx 
                ? 'bg-[#1a73e8] text-white shadow-xs' 
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {chapters[activeTab].content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
