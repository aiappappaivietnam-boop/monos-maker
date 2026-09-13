/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Target, Layers, ChevronRight, 
  Search, Lock, RefreshCw, LayoutGrid, CheckCircle2, Palette, Database,
  FileText, Settings, Grid3X3, Lightbulb, Coins, Sparkles, Cpu, Users
} from 'lucide-react';

interface MonosCapabilitiesContentProps {
  onBack?: () => void;
}

export default function MonosCapabilitiesContent({ onBack }: MonosCapabilitiesContentProps) {
  const [activeTab, setActiveTab] = useState(0);

  const chapters = [
    {
      title: "Phương pháp luận Sáng tạo",
      icon: <Layers className="w-4 h-4" />,
      tag: "Methodology",
      content: (
        <div className="space-y-6 sm:space-y-8">
          {/* 3 Principles */}
          <div className="bg-white border border-[#dadce0] rounded-2xl p-5 sm:p-8 space-y-6">
            <div className="max-w-2xl">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase bg-[#e8f0fe] text-[#1a73e8] border border-[#1a73e8]/20 inline-block mb-2">
                Nguyên tắc Thiết kế R&D
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-[#202124] mb-2">Nguyên lý "3 Không" trong Phát triển Sản phẩm</h4>
              <p className="text-xs sm:text-sm text-[#5f6368] leading-relaxed">
                Chúng tôi không sáng tạo dựa trên cảm tính nhất thời. Mọi giải pháp thiết kế đều là điểm giao thoa chuẩn xác giữa dữ liệu thị trường và năng lực sản xuất thực tế.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 pt-2">
              {[
                { 
                  t: "Không Xa Rời Thị Trường", 
                  d: "Dữ liệu listing thực tế, xu hướng tìm kiếm và nhu cầu người mua toàn cầu là kim chỉ nam cho mọi bản vẽ.", 
                  icon: <Search className="w-5 h-5 sm:w-6 sm:h-6 text-[#1a73e8]" />,
                  badge: "Data-Driven"
                },
                { 
                  t: "Không Xa Rời Sản Xuất", 
                  d: "Thiết kế tối ưu cho dây chuyền máy móc CNC, hạn chế hao hụt vật liệu và chuẩn hóa quy cách module hóa.", 
                  icon: <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-[#e37400]" />,
                  badge: "DFM Standard"
                },
                { 
                  t: "Không Xa Rời Định Vị", 
                  d: "Mỗi chi tiết cấu thành đều nhằm gia tăng và bảo vệ giá trị cốt lõi, nâng tầm vị thế thương hiệu đối tác.", 
                  icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-[#137333]" />,
                  badge: "Brand Identity"
                }
              ].map((item, i) => (
                <div key={i} className="p-5 sm:p-6 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl flex flex-col justify-between hover:border-[#1a73e8] transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white border border-[#dadce0] flex items-center justify-center shadow-2xs">
                        {item.icon}
                      </div>
                      <span className="text-[10px] sm:text-xs font-bold text-[#1a73e8] bg-[#e8f0fe] px-2.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    </div>
                    <h5 className="font-bold text-sm sm:text-base text-[#202124] mb-2">{item.t}</h5>
                    <p className="text-xs sm:text-sm text-[#5f6368] leading-relaxed">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Independent Commercial Entity Statement */}
          <div className="bg-gradient-to-r from-[#1a73e8] to-[#1557d0] text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-blue-200">Mục Tiêu Tối Thượng</span>
              <h5 className="text-lg sm:text-2xl font-black">Kiến Tạo Thực Thể Kinh Doanh Tự Thân</h5>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                "Mục tiêu cuối cùng của Pillar A là tạo ra các dòng sản phẩm và thương hiệu có sức sống tự thân bền bỉ, không phụ thuộc vào cảm tính cá nhân hay sự may rủi."
              </p>
            </div>
            <div className="shrink-0 p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-xs">
              <Target className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Ma trận Giá trị Tài sản",
      icon: <Grid3X3 className="w-4 h-4" />,
      tag: "Asset Matrix",
      content: (
        <div className="space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { 
                t: "Tài Sản Vô Hình (IP & Brand)", 
                desc: "Bảo hộ bản quyền và xây dựng lòng trung thành thương hiệu.",
                items: [
                  "Bản quyền kiểu dáng công nghiệp", 
                  "Bộ nhận diện thương hiệu độc quyền", 
                  "Hệ thống ngôn ngữ thiết kế nhất quán",
                  "Câu chuyện thương hiệu (Brand Story)"
                ],
                icon: <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-[#e37400]" />,
                badge: "IP Asset",
                color: "border-[#e37400]/20 bg-[#fef7e0]/30"
              },
              { 
                t: "Tài Sản Dữ Liệu (Master Data)", 
                desc: "Chuẩn hóa dữ liệu số phục vụ bán hàng đa kênh tự động.",
                items: [
                  "Hồ sơ Product Master Data (BOM)", 
                  "Thư viện 3D, AR & Phối cảnh Render 4K", 
                  "Bộ Listing chuẩn mực đa sàn (Amazon/Wayfair)",
                  "Dữ liệu phản hồi trải nghiệm người dùng (CX)"
                ],
                icon: <Database className="w-5 h-5 sm:w-6 sm:h-6 text-[#1a73e8]" />,
                badge: "Data Master",
                color: "border-[#1a73e8]/20 bg-[#e8f0fe]/30"
              },
              { 
                t: "Tài Sản Thương Mại (Commercial)", 
                desc: "Lợi thế cạnh tranh vượt trội và khả năng mở rộng quy mô.",
                items: [
                  "Biên lợi nhuận gộp tối ưu từ gốc", 
                  "Cộng đồng khách hàng trung thành", 
                  "Khả năng nhân bản sang các thị trường mới",
                  "Mô hình phân phối linh hoạt (Omni-channel)"
                ],
                icon: <Coins className="w-5 h-5 sm:w-6 sm:h-6 text-[#137333]" />,
                badge: "Commercial Value",
                color: "border-[#137333]/20 bg-[#e6f4ea]/30"
              }
            ].map((box, i) => (
              <div key={i} className={`p-6 sm:p-8 bg-white border rounded-2xl shadow-2xs hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between ${box.color}`}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white border border-[#dadce0] flex items-center justify-center shadow-2xs">
                      {box.icon}
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-[#202124] bg-white border border-[#dadce0] px-2.5 py-0.5 rounded-full">
                      {box.badge}
                    </span>
                  </div>
                  <h5 className="font-bold text-base sm:text-lg text-[#202124] mb-1">{box.t}</h5>
                  <p className="text-[11px] sm:text-xs text-[#5f6368] mb-4">{box.desc}</p>
                  
                  <ul className="space-y-2 pt-2 border-t border-[#dadce0]/60">
                    {box.items.map((item, j) => (
                      <li key={j} className="text-[11px] sm:text-xs text-[#3c4043] flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#137333] shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Cỗ máy Chuyển hóa Ý tưởng",
      icon: <Target className="w-4 h-4" />,
      tag: "Engine",
      content: (
        <div className="space-y-8">
          {/* Transformation Pipeline */}
          <div className="bg-white border border-[#dadce0] rounded-2xl p-6 sm:p-8">
            <h4 className="text-lg font-bold text-[#202124] mb-2 text-center">Quy trình Chuyển hóa Ý tưởng thành Thực thể Kinh doanh</h4>
            <p className="text-sm text-[#5f6368] text-center max-w-2xl mx-auto mb-8">
              Pillar A đóng vai trò là nền tảng quản trị chiến lược, tiếp nhận nhu cầu sơ khởi và chuyển hóa hoàn chỉnh thành sản phẩm thương mại có năng lực sinh lời cao.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="p-6 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl text-center space-y-2">
                <span className="text-[11px] font-bold text-[#5f6368] uppercase tracking-wider">Đầu vào (Input)</span>
                <h5 className="font-bold text-base text-[#202124]">Ý TƯỞNG & NHU CẦU</h5>
                <p className="text-xs text-[#5f6368]">Nhu cầu thị trường, insight khách hàng hoặc bài toán kinh doanh từ đối tác.</p>
              </div>

              <div className="p-6 bg-[#e8f0fe] border border-[#1a73e8]/30 rounded-2xl text-center space-y-2 relative">
                <span className="text-[11px] font-bold text-[#1a73e8] uppercase tracking-wider">Cỗ máy Pillar A</span>
                <h5 className="font-bold text-base text-[#1a73e8]">HỆ THỐNG R&D & SỐ HÓA</h5>
                <p className="text-xs text-[#202124]">Thiết kế công nghiệp, tối ưu DFM, lập bộ BOM và tạo tài sản số 3D/Listing.</p>
              </div>

              <div className="p-6 bg-[#e6f4ea] border border-[#137333]/30 rounded-2xl text-center space-y-2">
                <span className="text-[11px] font-bold text-[#137333] uppercase tracking-wider">Đầu ra (Output)</span>
                <h5 className="font-bold text-base text-[#137333]">THỰC THỂ KINH DOANH</h5>
                <p className="text-xs text-[#202124]">Sản phẩm chuẩn hóa sẵn sàng sản xuất hàng loạt và phân phối toàn cầu.</p>
              </div>
            </div>
          </div>

          {/* 4 Core Pillars of Transformation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { t: "1. Sáng tạo Kiểu dáng & Trải nghiệm", d: "Nghiên cứu khoảng trống thị trường để tạo ra kiểu dáng độc đáo, tối ưu công năng sử dụng và trải nghiệm đóng mở bao bì.", icon: <Palette className="w-5 h-5 text-[#1a73e8]" /> },
              { t: "2. Chuẩn hóa Dữ liệu Sản phẩm", d: "Tạo lập kho dữ liệu số đồng bộ: bản vẽ kỹ thuật 2D/3D, bảng nguyên vật liệu BOM chi tiết và bộ nội dung Listing đa sàn.", icon: <Database className="w-5 h-5 text-[#137333]" /> },
              { t: "3. Quản trị & Bảo hộ Sở hữu Trí tuệ", d: "Đăng ký bản quyền kiểu dáng công nghiệp, bảo hộ nhãn hiệu và thiết lập hàng rào pháp lý bảo vệ lợi thế cạnh tranh.", icon: <Shield className="w-5 h-5 text-[#e37400]" /> },
              { t: "4. Định vị Thương hiệu & Tiếp thị", d: "Xây dựng chiến lược truyền thông nhất quán, tạo tài liệu visual chân thực và nuôi dưỡng cộng đồng khách hàng gắn bó.", icon: <Users className="w-5 h-5 text-[#7627bb]" /> }
            ].map((item, i) => (
              <div key={i} className="p-5 bg-white border border-[#dadce0] rounded-2xl flex items-start gap-4 hover:border-[#1a73e8] transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#f8f9fa] border border-[#dadce0] flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h5 className="font-bold text-sm text-[#202124] mb-1">{item.t}</h5>
                  <p className="text-xs text-[#5f6368] leading-relaxed">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Vòng lặp Tối ưu hóa Dữ liệu",
      icon: <RefreshCw className="w-4 h-4" />,
      tag: "Data Loop",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: "Bước 01", title: "Khởi tạo & Launching", desc: "Triển khai sản phẩm lên các sàn TMĐT quốc tế với bộ dữ liệu Master đã được chuẩn hóa.", badge: "Giai đoạn 1", color: "border-[#1a73e8]/30 bg-[#e8f0fe]/30" },
              { step: "Bước 02", title: "Thu thập Insight", desc: "Ghi nhận chỉ số chuyển đổi, review đánh giá và hành vi tìm kiếm của khách hàng.", badge: "Giai đoạn 2", color: "border-[#7627bb]/30 bg-[#f3e8fd]/30" },
              { step: "Bước 03", title: "Phân tích & Tối ưu", desc: "Phát hiện các điểm cần hoàn thiện về kích thước, vật liệu hoặc bao bì đóng gói.", badge: "Giai đoạn 3", color: "border-[#e37400]/30 bg-[#fef7e0]/30" },
              { step: "Bước 04", title: "Nâng cấp Thế hệ Mới", desc: "Phát hành bản nâng cấp (V2, V3) củng cố vững chắc vị thế dẫn đầu thị trường.", badge: "Giai đoạn 4", color: "border-[#137333]/30 bg-[#e6f4ea]/30" }
            ].map((st, i) => (
              <div key={i} className={`p-5 rounded-2xl border ${st.color} bg-white flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold text-[#5f6368] uppercase">{st.step}</span>
                    <span className="text-[10px] font-semibold text-[#1a73e8] bg-white border border-[#dadce0] px-2 py-0.5 rounded-full">{st.badge}</span>
                  </div>
                  <h5 className="font-bold text-sm text-[#202124] mb-1.5">{st.title}</h5>
                  <p className="text-xs text-[#5f6368] leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Matrix table */}
          <div className="bg-white border border-[#dadce0] rounded-2xl overflow-hidden">
            <div className="p-5 bg-[#f8f9fa] border-b border-[#dadce0]">
              <h5 className="font-bold text-sm text-[#202124]">Bảng Phân bổ Năng lực & Sản phẩm Đầu ra theo Giai đoạn</h5>
            </div>
            <div className="divide-y divide-[#dadce0]">
              {[
                { stage: "1. Giai đoạn Hình thành", cap: "Nghiên cứu thị trường ngách, thiết kế 3D, tối ưu hóa cấu trúc lắp ghép DFM.", out: "Bộ mẫu Master 3D + Hồ sơ kỹ thuật BOM hoàn chỉnh." },
                { stage: "2. Giai đoạn Thương mại hóa", cap: "Chuẩn hóa dữ liệu số PIM, Render phối cảnh 4K, tối ưu Listing bán hàng.", out: "Sẵn sàng niêm yết đồng loạt đa kênh, tỷ lệ chuyển đổi cao." },
                { stage: "3. Giai đoạn Mở rộng Bền vững", cap: "Phân tích dữ liệu người mua, đăng ký bảo hộ IP và chuẩn bị sản phẩm thế hệ tiếp theo.", out: "Duy trì vị thế độc quyền, giá trị thương hiệu gia tăng liên tục." }
              ].map((row, rIdx) => (
                <div key={rIdx} className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4 items-center">
                  <div className="font-bold text-xs sm:text-sm text-[#1a73e8]">{row.stage}</div>
                  <div className="text-xs text-[#5f6368]">{row.cap}</div>
                  <div className="text-xs font-semibold text-[#202124] bg-[#f8f9fa] p-2.5 rounded-lg border border-[#dadce0]/60">{row.out}</div>
                </div>
              ))}
            </div>
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
          <Shield className="w-7 h-7" />
        </div>
        <div className="flex items-center gap-2.5 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase bg-[#e8f0fe] text-[#1a73e8] border border-[#1a73e8]/20">
            Năng lực Cốt lõi
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#202124] mb-2 leading-tight">
          Pillar A — Năng lực Sáng tạo & Quản trị Thương hiệu
        </h1>
        <p className="text-sm text-[#5f6368] leading-relaxed max-w-3xl">
          Trụ cột chịu trách nhiệm định hình chiến lược sản phẩm, nghiên cứu thị hiếu toàn cầu, thiết kế kiểu dáng công nghiệp và chuẩn hóa dữ liệu số phục vụ hệ sinh thái Furniture OS.
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
