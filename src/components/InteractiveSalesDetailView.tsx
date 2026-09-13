/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  BoxSelect, 
  Sparkles, 
  SlidersHorizontal, 
  Eye, 
  FileCheck2, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ShoppingCart, 
  Move3d, 
  Palette, 
  LayoutTemplate, 
  MonitorCheck, 
  RotateCw, 
  Smartphone, 
  Ruler,
  Layers,
  ArrowRight,
  Maximize2,
  Printer
} from 'lucide-react';
import { Service } from '../types';
import { exportScopeToPdf } from '../lib/exportScopePdf';

interface InteractiveSalesDetailViewProps {
  service: Service;
  onBack: () => void;
  hideBack?: boolean;
}

export default function InteractiveSalesDetailView({ service, onBack, hideBack }: InteractiveSalesDetailViewProps) {
  // Simple active material toggle for the minimal schematic
  const [activeMaterial, setActiveMaterial] = useState<'oak' | 'fabric' | 'stone'>('oak');

  const steps = [
    {
      num: "01",
      title: "Chọn không gian",
      desc: "Lựa chọn bối cảnh: Phòng khách, phòng ngủ, phòng ăn hoặc không gian thương mại.",
      icon: LayoutTemplate
    },
    {
      num: "02",
      title: "Kéo thả & Tùy chỉnh",
      desc: "Bố trí sản phẩm nội thất, tùy chọn vật liệu gỗ/vải/da/đá, màu sắc và kích thước.",
      icon: SlidersHorizontal
    },
    {
      num: "03",
      title: "Xem 3D nhiều góc độ",
      desc: "Xoay 360 độ, zoom bề mặt vật liệu, chiếu thực tế tăng cường AR trên thiết bị di động.",
      icon: Move3d
    },
    {
      num: "04",
      title: "Nhận báo giá tự động",
      desc: "Hệ thống tự động tính toán tổng chi phí dựa trên cấu hình vật liệu và kích thước đã chọn.",
      icon: FileCheck2
    },
    {
      num: "05",
      title: "Đặt hàng / Lưu thiết kế",
      desc: "Lưu lại phối cảnh hoặc gửi trực tiếp đơn hàng kèm hồ sơ kỹ thuật cho doanh nghiệp.",
      icon: ShoppingCart
    }
  ];

  const businessBenefits = [
    {
      title: "Tăng khả năng hình dung",
      desc: "Khách hàng thấy sản phẩm đặt trực tiếp trong không gian thực tế, giải tỏa băn khoăn về kích thước.",
      icon: Eye,
      color: "bg-[#f8f9fa] text-[#202124] border-[#dadce0]"
    },
    {
      title: "Cá nhân hóa trải nghiệm",
      desc: "Khách hàng tự do thiết kế theo nhu cầu, gu thẩm mỹ và kích thước mặt bằng riêng.",
      icon: Palette,
      color: "bg-[#f8f9fa] text-[#202124] border-[#dadce0]"
    },
    {
      title: "Tăng sự tự tin khi mua",
      desc: "Giảm lo ngại về sai lệch màu sắc, kích thước và độ tương thích với không gian thực.",
      icon: ShieldCheck,
      color: "bg-[#f8f9fa] text-[#202124] border-[#dadce0]"
    },
    {
      title: "Rút ngắn thời gian tư vấn",
      desc: "Nhân viên kinh doanh dễ dàng trình bày phương án phối cảnh trực quan trên iPad/Tablet.",
      icon: Clock,
      color: "bg-[#f8f9fa] text-[#202124] border-[#dadce0]"
    },
    {
      title: "Tăng giá trị đơn hàng",
      desc: "Thúc đẩy bán trọn gói theo bộ sưu tập hoặc giải pháp tổng thể cho toàn bộ căn phòng.",
      icon: TrendingUp,
      color: "bg-[#f8f9fa] text-[#202124] border-[#dadce0]"
    },
    {
      title: "Tự động hóa quy trình bán",
      desc: "Khép kín từ chọn mẫu, cấu hình, xuất báo giá tức thì tới đơn hàng về xưởng sản xuất.",
      icon: MonitorCheck,
      color: "bg-[#f8f9fa] text-[#202124] border-[#dadce0]"
    },
    {
      title: "Tạo lợi thế cạnh tranh",
      desc: "Mang đến trải nghiệm mua sắm nội thất hiện đại, số hóa và khác biệt trên thị trường.",
      icon: Sparkles,
      color: "bg-[#f8f9fa] text-[#202124] border-[#dadce0]"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-10 pb-20"
    >
      {/* Back Button & Actions */}
      <div className="flex items-center justify-between gap-4 mb-6">
        {!hideBack ? (
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a73e8] hover:text-[#1557d0] transition-colors group cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Quay lại danh mục dịch vụ</span>
          </button>
        ) : <div />}

        <button
          onClick={() => exportScopeToPdf(service, { customTitle: '3D Interactive Sales (Phạm Vi Giải Pháp 3D Tương Tác)' })}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3c4043] hover:text-[#202124] bg-white hover:bg-[#f1f3f4] border border-[#dadce0] transition-all cursor-pointer px-3.5 py-1.5 rounded-full shadow-2xs"
          title="Xuất tài liệu phạm vi công việc ra file PDF"
        >
          <Printer className="w-3.5 h-3.5 text-[#1a73e8]" />
          <span>Xuất PDF</span>
        </button>
      </div>

      {/* Hero Header Card */}
      <div className="bg-white border border-[#dadce0] rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#f1f3f4] text-[#202124] rounded-full border border-[#dadce0] text-xs font-bold tracking-wide uppercase">
              <BoxSelect className="w-3.5 h-3.5 text-[#5f6368]" />
              <span>Phạm vi công việc • 3D Interactive Sales</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#202124] tracking-tight leading-tight">
              3D Interactive Sales
            </h1>
            <p className="text-base sm:text-lg text-[#3c4043] leading-relaxed font-medium">
              Giải pháp bán hàng sử dụng không gian và mô hình 3D để khách hàng trực tiếp khám phá, bố trí và tùy chỉnh sản phẩm nội thất trong bối cảnh thực tế.
            </p>
            
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs sm:text-sm">
              <span className="px-3.5 py-1.5 bg-[#f8f9fa] text-[#202124] font-semibold rounded-full border border-[#dadce0]">
                Mô hình: Không gian 3D tương tác
              </span>
              <span className="px-3.5 py-1.5 bg-[#f8f9fa] text-[#5f6368] font-medium rounded-full border border-[#dadce0]">
                Tương thích: Web 3D, Mobile AR & iPad Showroom
              </span>
            </div>
          </div>
      </div>

      {/* Clean Monochromatic Schematic Graphic Section */}
      <section className="bg-white border border-[#dadce0] rounded-3xl p-6 sm:p-10 shadow-xs">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5f6368] bg-[#f1f3f4] px-3.5 py-1 rounded-full border border-[#dadce0]">
            Sơ đồ mô phỏng tính năng
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202124] mt-3 tracking-tight">
            3D INTERACTIVE SALES: Từ “xem sản phẩm” đến “trải nghiệm không gian”
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Minimal Monochromatic White Wireframe Canvas */}
          <div className="lg:col-span-6 bg-white border border-[#dadce0] rounded-2xl p-5 sm:p-6 shadow-xs relative">
            
            {/* Window / Canvas Header */}
            <div className="flex items-center justify-between border-b border-[#f1f3f4] pb-3 mb-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#dadce0]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#dadce0]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#dadce0]" />
                <span className="font-semibold text-[#202124] ml-2">Không gian 3D • Phòng khách 45m²</span>
              </div>
              <span className="text-[#5f6368] font-mono text-[11px]">3D Configurator</span>
            </div>

            {/* Wireframe Diagram Box */}
            <div className="relative aspect-4/3 rounded-xl border border-[#e8eaed] bg-[#fafafa] flex flex-col justify-between p-4 overflow-hidden select-none">
              
              {/* Dot Grid Background */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#9aa0a6_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Top Feature Indicators */}
              <div className="relative z-10 flex items-center justify-between">
                {/* Material Switcher Pill */}
                <div className="bg-white border border-[#dadce0] rounded-xl p-1.5 shadow-2xs flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-[#5f6368] px-1 uppercase">Vật liệu:</span>
                  <button 
                    onClick={() => setActiveMaterial('oak')}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer ${activeMaterial === 'oak' ? 'bg-[#202124] text-white' : 'text-[#5f6368] hover:bg-[#f1f3f4]'}`}
                  >
                    Gỗ Sồi
                  </button>
                  <button 
                    onClick={() => setActiveMaterial('fabric')}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer ${activeMaterial === 'fabric' ? 'bg-[#202124] text-white' : 'text-[#5f6368] hover:bg-[#f1f3f4]'}`}
                  >
                    Vải Bố
                  </button>
                  <button 
                    onClick={() => setActiveMaterial('stone')}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer ${activeMaterial === 'stone' ? 'bg-[#202124] text-white' : 'text-[#5f6368] hover:bg-[#f1f3f4]'}`}
                  >
                    Đá Cẩm
                  </button>
                </div>

                <div className="bg-white border border-[#dadce0] px-2.5 py-1 rounded-lg text-[10px] font-mono text-[#5f6368] shadow-2xs flex items-center gap-1">
                  <Ruler className="w-3 h-3 text-[#5f6368]" />
                  <span>Tỉ lệ 1:1</span>
                </div>
              </div>

              {/* Central Clean 3D Feature Icon & Interaction Box */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto py-6">
                
                {/* Visual 3D Space Icon Composition */}
                <div className="relative w-36 h-36 flex items-center justify-center">
                  
                  {/* Subtle 3D Circular Orbit with Arrow */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#dadce0] animate-[spin_24s_linear_infinite]" />
                  
                  {/* Subtle 3D Depth Backdrop Layer */}
                  <div className="absolute inset-4 rounded-2xl bg-white border border-[#dadce0] shadow-sm transform -rotate-6 transition-transform" />
                  
                  {/* Center Main Feature Card */}
                  <div className="relative w-24 h-24 rounded-2xl bg-white border-2 border-[#202124] shadow-md flex flex-col items-center justify-center text-[#202124] transform rotate-3 transition-transform hover:rotate-0">
                    <BoxSelect className="w-9 h-9 text-[#202124] stroke-[1.75]" />
                    <span className="text-[10px] font-bold mt-1 text-[#202124] tracking-tight">3D SPACE</span>
                  </div>

                  {/* Top-Right Floating Tool Badge */}
                  <div className="absolute -top-1 -right-1 bg-white border border-[#dadce0] rounded-xl p-2 shadow-sm text-[#202124]">
                    <Layers className="w-4 h-4 text-[#5f6368]" />
                  </div>

                  {/* Bottom-Left Floating 3D Badge */}
                  <div className="absolute -bottom-1 -left-1 bg-[#202124] text-white rounded-xl p-2 shadow-sm">
                    <Move3d className="w-4 h-4" />
                  </div>
                </div>

                {/* Status Indicator Tag */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-[#dadce0] rounded-full text-xs font-semibold text-[#202124] shadow-2xs mt-4">
                  <Maximize2 className="w-3.5 h-3.5 text-[#5f6368]" />
                  <span>Kéo thả & Tùy biến sản phẩm 3D</span>
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="relative z-10 flex items-center justify-between pt-2 border-t border-[#f1f3f4]">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-white border border-[#dadce0] rounded-md text-[11px] font-medium text-[#202124] flex items-center gap-1">
                    <RotateCw className="w-3 h-3 text-[#5f6368]" />
                    <span>Xoay 360°</span>
                  </span>
                  <span className="px-2.5 py-1 bg-white border border-[#dadce0] rounded-md text-[11px] font-medium text-[#202124] flex items-center gap-1">
                    <Smartphone className="w-3 h-3 text-[#5f6368]" />
                    <span>Chế độ AR</span>
                  </span>
                </div>
                <span className="text-[11px] font-medium text-[#5f6368]">
                  Cập nhật báo giá tức thì
                </span>
              </div>

            </div>

            <p className="text-center text-xs text-[#5f6368] mt-3">
              Mô hình hóa dữ liệu sản phẩm thành trải nghiệm trực quan trên Web & Mobile
            </p>
          </div>

          {/* Right: Step-by-Step Value Ladder */}
          <div className="lg:col-span-6 space-y-4">
            {/* Top Badge */}
            <div className="flex items-center justify-end">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#f8f9fa] border border-[#dadce0] text-[#202124] rounded-full text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#5f6368]" />
                <span>Tăng khả năng hình dung thực tế</span>
              </div>
            </div>

            {/* Stepped Workflow Boxes */}
            <div className="space-y-3 pl-2 sm:pl-4 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-[#dadce0]">
              {steps.map((step) => {
                const IconComponent = step.icon;
                return (
                  <div 
                    key={step.num}
                    className="relative flex items-start gap-4 p-4 bg-white border border-[#dadce0] rounded-2xl shadow-2xs hover:border-[#202124] transition-colors z-10"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#f8f9fa] border border-[#dadce0] text-[#202124] flex items-center justify-center font-bold text-sm shrink-0">
                      <IconComponent className="w-5 h-5 text-[#5f6368]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm sm:text-base font-bold text-[#202124]">
                          {step.title}
                        </h4>
                        <span className="text-xs font-mono font-semibold text-[#5f6368] bg-[#f1f3f4] px-2 py-0.5 rounded">
                          Bước {step.num}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#5f6368] mt-1 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Benefit Badges */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#f8f9fa] border border-[#dadce0] text-[#202124] rounded-full text-xs font-bold">
                <Clock className="w-3.5 h-3.5 text-[#5f6368]" />
                <span>Rút ngắn thời gian tư vấn</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#f8f9fa] border border-[#dadce0] text-[#202124] rounded-full text-xs font-bold">
                <TrendingUp className="w-3.5 h-3.5 text-[#5f6368]" />
                <span>Tăng giá trị đơn hàng chốt</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Core Concept Breakdown: 3D Interactive Sales là gì? */}
      <section className="bg-white border border-[#dadce0] rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex items-center gap-2.5 text-[#5f6368] font-bold uppercase tracking-wider text-xs">
          <BoxSelect className="w-4 h-4" />
          <span>Khái niệm & Năng lực</span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202124] tracking-tight">
          3D Interactive Sales là gì?
        </h2>

        <div className="p-5 bg-[#f8f9fa] border-l-4 border-[#202124] rounded-r-2xl border-y border-r border-[#dadce0]">
          <p className="text-base sm:text-lg text-[#202124] leading-relaxed font-normal">
            <strong className="font-bold text-[#202124]">3D Interactive Sales</strong> là giải pháp bán hàng sử dụng không gian và mô hình 3D để khách hàng trực tiếp khám phá, bố trí và tùy chỉnh sản phẩm nội thất trong bối cảnh thực tế.
          </p>
        </div>

        <div className="pt-2">
          <h3 className="text-base font-bold text-[#202124] mb-4">
            Với giải pháp này, khách hàng có thể:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {[
              "Chọn không gian như phòng khách, phòng ngủ, phòng ăn.",
              "Kéo thả sản phẩm furniture vào không gian.",
              "Tùy chỉnh màu sắc, vật liệu, kích thước và kiểu dáng.",
              "Xem sản phẩm từ nhiều góc độ.",
              "Lưu lại thiết kế và nhận báo giá tự động.",
              "Gửi yêu cầu tư vấn hoặc đặt hàng."
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-[#f8f9fa] border border-[#dadce0] rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-[#202124] shrink-0 mt-0.5" />
                <span className="text-sm text-[#202124] font-medium leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Furniture Businesses Need This */}
      <section className="bg-white border border-[#dadce0] rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex items-center gap-2.5 text-[#5f6368] font-bold uppercase tracking-wider text-xs">
          <TrendingUp className="w-4 h-4" />
          <span>Tại sao doanh nghiệp Furniture cần sử dụng?</span>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202124] tracking-tight">
            Nội thất gắn liền với không gian, kích thước và phong cách sống
          </h2>
          <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed max-w-4xl">
            Hình ảnh 2D hoặc catalogue thường không giúp khách hàng hình dung chính xác sản phẩm khi đặt trong ngôi nhà của họ. 3D Interactive Sales giúp giải quyết triệt để bài toán này.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {businessBenefits.map((b, i) => {
            const BenefitIcon = b.icon;
            return (
              <div key={i} className="flex items-start gap-4 p-5 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${b.color}`}>
                  <BenefitIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#202124] mb-1">
                    {b.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5f6368] leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Core Transformation Value (Giá trị cốt lõi) */}
      <section className="bg-[#202124] text-white rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-4xl space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest bg-white/10 text-white px-3.5 py-1 rounded-full border border-white/20">
            Giá trị cốt lõi
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
            3D Interactive Sales giúp doanh nghiệp Furniture chuyển đổi:
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <span className="text-xs font-semibold text-white/60 uppercase tracking-wider block mb-2">Từ mô hình cũ</span>
              <p className="text-xl sm:text-2xl font-extrabold text-white/80">
                “Bán từng sản phẩm nội thất”
              </p>
            </div>

            <div className="bg-white text-[#202124] rounded-2xl p-6 border border-white shadow-md">
              <span className="text-xs font-bold text-[#5f6368] uppercase tracking-wider block mb-2">Sang mô hình mới</span>
              <p className="text-xl sm:text-2xl font-extrabold text-[#202124]">
                “Bán trọn vẹn giải pháp không gian sống.”
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
