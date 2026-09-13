/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Bot, 
  Sparkles, 
  Brain, 
  Users, 
  Truck, 
  MessageSquare, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  ArrowRight, 
  Building2, 
  Factory, 
  ShoppingBag, 
  Briefcase, 
  Send, 
  Cpu, 
  Check, 
  CornerDownRight, 
  Compass, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Workflow, 
  FileSpreadsheet, 
  PackageCheck,
  Headphones,
  FileCheck2,
  Boxes,
  Store,
  Printer
} from 'lucide-react';
import { Service } from '../types';
import { exportScopeToPdf } from '../lib/exportScopePdf';

interface AiManagementDetailViewProps {
  service: Service;
  onBack: () => void;
  hideBack?: boolean;
}

export default function AiManagementDetailView({ service, onBack, hideBack }: AiManagementDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'concept' | 'why' | 'benefits' | 'scope'>('all');
  const [selectedBotIndex, setSelectedBotIndex] = useState<number | null>(0);
  const [simulatedInput, setSimulatedInput] = useState<string>('');
  const [simulatedResponse, setSimulatedResponse] = useState<string | null>(null);

  const botList = [
    {
      id: 'ceo',
      title: 'Bot CE/CEO',
      subTitle: 'Trợ lý điều hành & Chiến lược nội bộ',
      role: 'Nắm tình hình, phân tích và ra quyết định',
      quadrant: 'Nội bộ (Internal) • Chiến lược (Strategy)',
      color: 'from-[#e5a88c] via-[#cf7d5c] to-[#b35938]',
      accentColor: '#b35938',
      bgLight: 'bg-[#fdf9f7] border-[#eedacf]',
      icon: Brain,
      description: 'Tóm tắt kinh doanh, cảnh báo bất thường, phân tích hiệu suất.',
      exampleQueries: [
        'Ba vấn đề lớn nhất cần xử lý hôm nay là gì?',
        'Đơn hàng nào có nguy cơ giao trễ?',
        'Báo cáo doanh thu & tỷ suất lợi nhuận gộp tuần này.',
        'Hiệu suất các xưởng gia công đang như thế nào?'
      ],
      sampleResponse: '📌 Tóm tắt điều hành 08:30 hôm nay:\n1. Đơn #1025 (Chung cư Horizon) thiếu 12m vải bọc nỉ nhập khẩu, dự kiến trễ giao 2 ngày nếu không duyệt đổi vật tư thay thế.\n2. Doanh thu tuần đạt 485.000.000 VNĐ (vượt 12% KPI), tỷ suất lợi nhuận gộp duy trì ở mức 34.2%.\n3. Tiến độ Xưởng 2 đang đạt 94%, không có cảnh báo tồn kho bất thường.'
    },
    {
      id: 'team',
      title: 'Bot Team',
      subTitle: 'Trợ lý phối hợp & Thực thi nội bộ',
      role: 'Giao việc, phối hợp và theo dõi tiến độ',
      quadrant: 'Nội bộ (Internal) • Thực thi (Execution)',
      color: 'from-[#a4bba7] via-[#759a7a] to-[#4a7251]',
      accentColor: '#4a7251',
      bgLight: 'bg-[#f7faf8] border-[#d8e6db]',
      icon: Users,
      description: 'Giao/nhắc việc, tổng hợp checklist, tìm quy trình.',
      exampleQueries: [
        'Tạo checklist giao hàng cho đơn 1025.',
        'Tổng hợp công việc trễ phòng kinh doanh.',
        'Quy trình nghiệm thu bề mặt sơn mài gồm những bước nào?',
        'Nhắc team thiết kế gửi bản vẽ kỹ thuật bàn ăn Cloudy.'
      ],
      sampleResponse: '✅ Đã tự động tạo Checklist giao hàng cho Đơn #1025:\n1. Kiểm định bề mặt gỗ & nẹp cạnh (KCS)\n2. Kiểm tra bộ phụ kiện bản lề & ốc vít sơ cua\n3. Bọc màng PE 3 lớp + thùng carton chống va đập\n4. Đính kèm hướng dẫn bảo quản & phiếu bảo hành 24 tháng\n5. Thông báo đội vận chuyển & xác nhận khung giờ nhận của khách.'
    },
    {
      id: 'supplier',
      title: 'Bot Nhà cung cấp',
      subTitle: 'Điều phối nguồn cung & Mua hàng chiến lược',
      role: 'Báo giá, đặt hàng và theo dõi giao nhận',
      quadrant: 'Bên ngoài (External) • Chiến lược (Strategy)',
      color: 'from-[#b0b8c4] via-[#8292a4] to-[#596b80]',
      accentColor: '#596b80',
      bgLight: 'bg-[#f8f9fb] border-[#dce2e8]',
      icon: Truck,
      description: 'Gửi RFQ, so sánh giá, nhắc lịch giao.',
      exampleQueries: [
        'Gửi RFQ gỗ MDF chống ẩm cho 3 nhà cung cấp. Ai có giá tốt nhất?',
        'Nhà cung cấp phụ kiện Blum đã xác nhận lịch giao hàng chưa?',
        'So sánh giá đá thiêu kết xưởng An Cường và Vicostone.',
        'Cảnh báo lượng tồn kho gỗ Sồi đỏ sắp chạm mức an toàn.'
      ],
      sampleResponse: '📊 Kết quả so sánh RFQ Gỗ MDF chống ẩm 18mm:\n• NCC Á Châu: 385.000đ/tấm, giao hàng 24h, chất lượng tiêu chuẩn E1.\n• NCC Minh Long: 395.000đ/tấm, giao 48h, có chứng chỉ FSC.\n• NCC Mộc Phát: 380.000đ/tấm (Tốt nhất về giá), giao 12h.\n👉 Đề xuất: Chọn Mộc Phát để tiết kiệm 4.5% giá vốn cho lô hàng 100 tấm.'
    },
    {
      id: 'customer',
      title: 'Bot Khách hàng',
      subTitle: 'Tư vấn 24/7 & Chăm sóc khách hàng',
      role: 'Tư vấn, chăm sóc và tạo cơ hội bán hàng',
      quadrant: 'Bên ngoài (External) • Thực thi (Execution)',
      color: 'from-[#879bb3] via-[#527196] to-[#2a4667]',
      accentColor: '#2a4667',
      bgLight: 'bg-[#f8fafd] border-[#d6e2ef]',
      icon: MessageSquare,
      description: 'Thu thập nhu cầu, gợi ý sản phẩm, chuyển lead.',
      exampleQueries: [
        'Tôi cần thiết kế nội thất căn hộ 80m². Sản phẩm này có những màu nào?',
        'Bàn ăn Cloudy có kích thước 1m8 cho 6 người ngồi không?',
        'Chi phí thi công trọn gói phòng ngủ phong cách Bắc Âu khoảng bao nhiêu?',
        'Chính sách bảo hành và đổi trả đệm mút sofa như thế nào?'
      ],
      sampleResponse: '👋 Chào bạn! Mẫu Bàn ăn Cloudy hiện có sẵn 3 phối màu cao cấp: Gỗ sồi tự nhiên (Natural Oak), Nâu hạt dẻ (Walnut Dark) và Đen mờ tinh tế (Matte Black).\nVới căn hộ 80m², phiên bản 1m8 x 0.85m là lựa chọn chuẩn công thái học cho 6 người ngồi thoải mái.\nBạn muốn xem hình thực tế tại Showroom hay cần chuyên viên gửi bản vẽ 3D phối cảnh không gian?'
    }
  ];

  const handleTestQuery = (query: string, sampleResp: string) => {
    setSimulatedInput(query);
    setSimulatedResponse(null);
    setTimeout(() => {
      setSimulatedResponse(sampleResp);
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-8 sm:space-y-12 pb-16"
    >
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between gap-4">
        {!hideBack ? (
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#5f6368] hover:text-[#1a73e8] transition-colors group cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Quay lại danh sách giải pháp</span>
          </button>
        ) : <div />}

        <button
          onClick={() => exportScopeToPdf(service, { customTitle: 'AI Management Platform (Multi-Agent OS - Scope Hệ Thống)' })}
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#fef7e0] text-[#b06000] rounded-full border border-[#feefc3] text-xs font-bold tracking-wide uppercase">
            <Bot className="w-3.5 h-3.5 text-[#e37400]" />
            <span>AI Management Platform • Multi-Agent Operating System</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#202124] tracking-tight leading-tight">
            AI Management Platform
          </h1>
          <p className="text-base sm:text-lg text-[#3c4043] leading-relaxed font-medium">
            Nền tảng điều hành doanh nghiệp nội thất tích hợp các trợ lý AI chuyên biệt, kết nối toàn diện dữ liệu và quy trình từ thiết kế, báo giá, vật liệu, sản xuất đến chăm sóc khách hàng.
          </p>
          
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs sm:text-sm">
            <span className="px-3.5 py-1.5 bg-[#e8f0fe] text-[#1a73e8] font-semibold rounded-full border border-[#d2e3fc]">
              Một nền tảng trung tâm
            </span>
            <span className="px-3.5 py-1.5 bg-[#e6f4ea] text-[#137333] font-semibold rounded-full border border-[#ceead6]">
              4 Trợ lý AI tác nghiệp
            </span>
            <span className="px-3.5 py-1.5 bg-[#fef7e0] text-[#b06000] font-semibold rounded-full border border-[#feefc3]">
              Phối hợp đa phòng ban 24/7
            </span>
            <span className="px-3.5 py-1.5 bg-[#f1f3f4] text-[#5f6368] font-medium rounded-full border border-[#dadce0]">
              Tương thích: ERP, CRM, Showroom & Factory
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* GRAPHIC 1: BỐC HỐT LÚA GẠO: MỘT HỆ THỐNG AI — BỐN BOT (2x2 MATRIX) */}
      {/* ========================================================================= */}
      <section className="bg-white border border-[#dadce0] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5f6368] mb-2">
            <Layers className="w-4 h-4 text-[#1a73e8]" />
            <span>SƠ ĐỒ MA TRẬN ĐIỀU HÀNH TỔNG QUAN</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202124] tracking-tight">
            BỐC HỐT LÚA GẠO: Một hệ thống AI — Bốn Bot
          </h2>
          <p className="text-sm sm:text-base text-[#5f6368] mt-1 font-medium">
            Phân định rõ vai trò và phạm vi phối hợp của 4 trợ lý AI theo hai trục không gian: Nội bộ — Bên ngoài và Chiến lược — Thực thi.
          </p>
        </div>

        {/* The Matrix Canvas */}
        <div className="bg-[#f9f8f5] border border-[#e5e1da] rounded-3xl p-4 sm:p-8 lg:p-10 relative overflow-hidden shadow-inner">
          {/* Grid Background Pattern */}
          <div className="absolute inset-0 opacity-[0.35] pointer-events-none" 
            style={{ 
              backgroundImage: 'radial-gradient(#b35938 0.75px, transparent 0.75px)', 
              backgroundSize: '24px 24px' 
            }} 
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: The 2x2 Coordinate Grid (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col justify-between relative p-2 sm:p-4">
              
              {/* Top Axis Label: Nội bộ (Internal) */}
              <div className="text-center pb-3">
                <span className="inline-block px-4 py-1 bg-white/90 backdrop-blur-xs border border-[#dadce0] rounded-full text-xs sm:text-sm font-bold text-[#202124] shadow-xs">
                  Nội bộ (Internal)
                </span>
              </div>

              {/* Matrix Quadrants Container */}
              <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 py-4">
                
                {/* Horizontal & Vertical Crosshair Lines */}
                <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-[2px] bg-[#8c9ba5] -translate-y-1/2 z-0 opacity-80" />
                <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#8c9ba5] -translate-x-1/2 z-0 opacity-80" />

                {/* Quadrant 1: Top-Left (Nội bộ + Chiến lược) -> Bot CE/CEO */}
                <div className="relative z-10 bg-white/95 backdrop-blur-xs rounded-2xl p-4 sm:p-5 border border-[#dadce0] shadow-sm hover:shadow-md transition-all flex items-start gap-3.5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#e5a88c] via-[#cf7d5c] to-[#b35938] p-1 shadow-md shrink-0 flex items-center justify-center text-white">
                    <Brain className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#b35938] uppercase tracking-wider">Chiến lược • Nội bộ</div>
                    <h4 className="text-base sm:text-lg font-bold text-[#202124]">Bot CE/CEO</h4>
                    <p className="text-xs sm:text-sm text-[#5f6368] font-medium mt-1 leading-snug">
                      Nắm tình hình, phân tích và ra quyết định.
                    </p>
                  </div>
                </div>

                {/* Quadrant 2: Top-Right (Nội bộ + Thực thi) -> Bot Team */}
                <div className="relative z-10 bg-white/95 backdrop-blur-xs rounded-2xl p-4 sm:p-5 border border-[#dadce0] shadow-sm hover:shadow-md transition-all flex items-start gap-3.5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#a4bba7] via-[#759a7a] to-[#4a7251] p-1 shadow-md shrink-0 flex items-center justify-center text-white">
                    <Users className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#4a7251] uppercase tracking-wider">Thực thi • Nội bộ</div>
                    <h4 className="text-base sm:text-lg font-bold text-[#202124]">Bot Team</h4>
                    <p className="text-xs sm:text-sm text-[#5f6368] font-medium mt-1 leading-snug">
                      Giao việc, phối hợp và theo dõi tiến độ.
                    </p>
                  </div>
                </div>

                {/* Quadrant 3: Bottom-Left (Bên ngoài + Chiến lược) -> Bot Nhà cung cấp */}
                <div className="relative z-10 bg-white/95 backdrop-blur-xs rounded-2xl p-4 sm:p-5 border border-[#dadce0] shadow-sm hover:shadow-md transition-all flex items-start gap-3.5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#d0d7de] via-[#8c9ba5] to-[#57606a] p-1 shadow-md shrink-0 flex items-center justify-center text-white">
                    <Truck className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#57606a] uppercase tracking-wider">Chiến lược • Bên ngoài</div>
                    <h4 className="text-base sm:text-lg font-bold text-[#202124]">Bot Nhà cung cấp</h4>
                    <p className="text-xs sm:text-sm text-[#5f6368] font-medium mt-1 leading-snug">
                      Báo giá, đặt hàng và theo dõi giao nhận.
                    </p>
                  </div>
                </div>

                {/* Quadrant 4: Bottom-Right (Bên ngoài + Thực thi) -> Bot Khách hàng */}
                <div className="relative z-10 bg-white/95 backdrop-blur-xs rounded-2xl p-4 sm:p-5 border border-[#dadce0] shadow-sm hover:shadow-md transition-all flex items-start gap-3.5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#879bb3] via-[#527196] to-[#2a4667] p-1 shadow-md shrink-0 flex items-center justify-center text-white">
                    <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#2a4667] uppercase tracking-wider">Thực thi • Bên ngoài</div>
                    <h4 className="text-base sm:text-lg font-bold text-[#202124]">Bot Khách hàng</h4>
                    <p className="text-xs sm:text-sm text-[#5f6368] font-medium mt-1 leading-snug">
                      Tư vấn, chăm sóc và tạo cơ hội bán hàng.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Axis Label: Bên ngoài (External) */}
              <div className="text-center pt-3">
                <span className="inline-block px-4 py-1 bg-white/90 backdrop-blur-xs border border-[#dadce0] rounded-full text-xs sm:text-sm font-bold text-[#202124] shadow-xs">
                  Bên ngoài (External)
                </span>
              </div>

              {/* Left & Right Axis Indicators */}
              <div className="flex items-center justify-between text-xs font-bold text-[#5f6368] px-2 pt-2">
                <span>◀ Chiến lược (Strategy)</span>
                <span>Thực thi (Execution) ▶</span>
              </div>
            </div>

            {/* Right: Metallic Card: 4 Cấp Độ Hoạt Động (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col">
              <div className="h-full bg-gradient-to-b from-[#fbfbfa] via-[#f0eeea] to-[#d8d5ce] rounded-3xl p-1 shadow-md border border-white flex flex-col">
                <div className="bg-[#fcfbf9] rounded-[22px] p-6 sm:p-7 flex-1 flex flex-col justify-between border border-[#e5e1da]">
                  <div>
                    <div className="flex items-center gap-2 pb-3 border-b border-[#dadce0]">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#1a73e8]" />
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#202124] tracking-tight">
                        4 Cấp Độ Hoạt Động
                      </h3>
                    </div>
                    <div className="mt-5 space-y-4">
                      <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white border border-[#e8eaed] shadow-2xs">
                        <span className="w-6 h-6 rounded-full bg-[#e8f0fe] text-[#1a73e8] font-bold text-xs flex items-center justify-center shrink-0">
                          1
                        </span>
                        <div>
                          <div className="text-sm font-bold text-[#202124]">Hiểu yêu cầu</div>
                          <div className="text-xs text-[#5f6368] font-medium">Xử lý ngôn ngữ tự nhiên từ chat/voice của người dùng.</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white border border-[#e8eaed] shadow-2xs">
                        <span className="w-6 h-6 rounded-full bg-[#e6f4ea] text-[#137333] font-bold text-xs flex items-center justify-center shrink-0">
                          2
                        </span>
                        <div>
                          <div className="text-sm font-bold text-[#202124]">Tra cứu dữ liệu</div>
                          <div className="text-xs text-[#5f6368] font-medium">Truy xuất tức thời từ kho dữ liệu chuẩn Monosbase/ERP.</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white border border-[#e8eaed] shadow-2xs">
                        <span className="w-6 h-6 rounded-full bg-[#fef7e0] text-[#b06000] font-bold text-xs flex items-center justify-center shrink-0">
                          3
                        </span>
                        <div>
                          <div className="text-sm font-bold text-[#202124]">Đề xuất phương án</div>
                          <div className="text-xs text-[#5f6368] font-medium">Đưa ra gợi ý thông minh, so sánh chi phí & cảnh báo rủi ro.</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white border border-[#e8eaed] shadow-2xs">
                        <span className="w-6 h-6 rounded-full bg-[#fce8e6] text-[#c5221f] font-bold text-xs flex items-center justify-center shrink-0">
                          4
                        </span>
                        <div>
                          <div className="text-sm font-bold text-[#202124]">Thực thi hành động</div>
                          <div className="text-xs text-[#5f6368] font-medium">Tự động tạo task, phát lệnh sản xuất, gửi email RFQ.</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Metallic Footer Base */}
                  <div className="mt-6 pt-4 border-t border-[#dadce0] text-center">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#5f6368]">
                      Tự động hóa luồng nghiệp vụ 24/7
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* GRAPHIC 2: GIẢI PHẪU AI BOTS: TRỢ LÝ TÁC NGHIỆP THỰC TẾ */}
      {/* ========================================================================= */}
      <section className="bg-white border border-[#dadce0] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5f6368] mb-2">
            <Cpu className="w-4 h-4 text-[#1a73e8]" />
            <span>KỊCH BẢN TÁC NGHIỆP THỰC TẾ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202124] tracking-tight">
            Giải phẫu AI Bots: Trợ lý tác nghiệp thực tế
          </h2>
          <p className="text-sm sm:text-base text-[#5f6368] mt-1 font-medium">
            Xem cách từng trợ lý AI hỗ trợ giải quyết bài toán cụ thể thông qua đối thoại và phân tích dữ liệu trực tiếp.
          </p>
        </div>

        {/* 4 Bot Detailed Cards Grid matching Image 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {botList.map((bot, index) => {
            const Icon = bot.icon;
            const isSelected = selectedBotIndex === index;
            return (
              <div 
                key={bot.id}
                onClick={() => setSelectedBotIndex(index)}
                className={`border rounded-3xl p-6 sm:p-7 transition-all cursor-pointer relative overflow-hidden ${
                  isSelected ? 'ring-2 ring-[#1a73e8] shadow-md bg-white' : 'bg-[#fafafa] hover:bg-white hover:shadow-xs border-[#dadce0]'
                }`}
              >
                {/* Header with circular icon */}
                <div className="flex items-start gap-4 pb-4 border-b border-[#eceff1]">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${bot.color} p-1 shadow-md shrink-0 flex items-center justify-center text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-[#202124]">
                      {bot.title}
                    </h3>
                    <div className="text-xs font-semibold text-[#5f6368] mt-0.5">
                      ({bot.subTitle.split('&')[0]})
                    </div>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#f1f3f4] text-[#3c4043] shrink-0">
                    Bot #{index + 1}
                  </span>
                </div>

                {/* Left Description & Right Chat Bubbles Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pt-4 items-start">
                  <div className="sm:col-span-5 text-xs sm:text-sm font-semibold text-[#3c4043] leading-relaxed">
                    {bot.description}
                  </div>

                  {/* Chat Bubbles Container */}
                  <div className="sm:col-span-7 space-y-2">
                    {bot.exampleQueries.slice(0, 2).map((query, qIdx) => (
                      <div 
                        key={qIdx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBotIndex(index);
                          handleTestQuery(query, bot.sampleResponse);
                        }}
                        className="bg-[#e8eaed]/70 hover:bg-[#d2e3fc] border border-[#dadce0] rounded-2xl px-3.5 py-2 text-xs font-medium text-[#202124] transition-colors flex items-center justify-between gap-2 group"
                      >
                        <span className="italic leading-snug">"{query}"</span>
                        <Send className="w-3 h-3 text-[#5f6368] group-hover:text-[#1a73e8] shrink-0 opacity-60 group-hover:opacity-100" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Simulator Panel for the selected Bot */}
        {selectedBotIndex !== null && (
          <div className="mt-8 bg-[#f8f9fa] border border-[#dadce0] rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#dadce0] mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${botList[selectedBotIndex].color} flex items-center justify-center text-white shadow-xs`}>
                  {React.createElement(botList[selectedBotIndex].icon, { className: 'w-4 h-4' })}
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#202124]">
                    Trải nghiệm tương tác cùng {botList[selectedBotIndex].title}
                  </h4>
                  <p className="text-xs text-[#5f6368]">
                    {botList[selectedBotIndex].quadrant}
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#1a73e8] bg-[#e8f0fe] px-3 py-1 rounded-full border border-[#d2e3fc]">
                Đang trực tuyến (Active)
              </span>
            </div>

            {/* Prompt Quick Selection */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-[#5f6368] uppercase tracking-wider">
                Chọn câu hỏi mẫu hoặc nhập lệnh:
              </div>
              <div className="flex flex-wrap gap-2">
                {botList[selectedBotIndex].exampleQueries.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTestQuery(q, botList[selectedBotIndex].sampleResponse)}
                    className="text-xs font-medium px-3 py-1.5 rounded-xl bg-white border border-[#dadce0] hover:border-[#1a73e8] hover:text-[#1a73e8] transition-all text-left"
                  >
                    💬 {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Conversation Output */}
            {simulatedInput && (
              <div className="mt-6 space-y-3 bg-white p-4 sm:p-5 rounded-2xl border border-[#dadce0]">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#1a73e8] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    User
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#202124] bg-[#f1f3f4] px-3.5 py-2 rounded-2xl rounded-tl-none">
                    {simulatedInput}
                  </div>
                </div>

                {simulatedResponse ? (
                  <div className="flex items-start gap-2.5 pt-2">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${botList[selectedBotIndex].color} text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5`}>
                      AI
                    </div>
                    <div className="text-xs sm:text-sm text-[#202124] bg-[#e8f0fe]/60 border border-[#d2e3fc] px-4 py-3 rounded-2xl rounded-tl-none whitespace-pre-line leading-relaxed font-medium">
                      {simulatedResponse}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-[#5f6368] italic pl-8">
                    <span className="w-2 h-2 rounded-full bg-[#1a73e8] animate-ping" />
                    <span>{botList[selectedBotIndex].title} đang tra cứu dữ liệu & tính toán phương án...</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 5 MAIN SECTIONS OF DETAILED CONTENT */}
      {/* ========================================================================= */}

      {/* Section Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#dadce0] text-sm">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-full font-bold transition-colors whitespace-nowrap ${
            activeTab === 'all' ? 'bg-[#202124] text-white' : 'text-[#5f6368] hover:bg-[#f1f3f4]'
          }`}
        >
          Toàn bộ tài liệu
        </button>
        <button
          onClick={() => setActiveTab('concept')}
          className={`px-4 py-2 rounded-full font-bold transition-colors whitespace-nowrap ${
            activeTab === 'concept' ? 'bg-[#1a73e8] text-white' : 'text-[#5f6368] hover:bg-[#f1f3f4]'
          }`}
        >
          1. Concept hệ thống
        </button>
        <button
          onClick={() => setActiveTab('why')}
          className={`px-4 py-2 rounded-full font-bold transition-colors whitespace-nowrap ${
            activeTab === 'why' ? 'bg-[#1a73e8] text-white' : 'text-[#5f6368] hover:bg-[#f1f3f4]'
          }`}
        >
          2. Vì sao ngành Furniture nên dùng?
        </button>
        <button
          onClick={() => setActiveTab('benefits')}
          className={`px-4 py-2 rounded-full font-bold transition-colors whitespace-nowrap ${
            activeTab === 'benefits' ? 'bg-[#1a73e8] text-white' : 'text-[#5f6368] hover:bg-[#f1f3f4]'
          }`}
        >
          3. Hệ thống giúp ích gì?
        </button>
        <button
          onClick={() => setActiveTab('scope')}
          className={`px-4 py-2 rounded-full font-bold transition-colors whitespace-nowrap ${
            activeTab === 'scope' ? 'bg-[#1a73e8] text-white' : 'text-[#5f6368] hover:bg-[#f1f3f4]'
          }`}
        >
          4. Phạm vi áp dụng
        </button>
      </div>

      {/* Section 1: Concept hệ thống */}
      {(activeTab === 'all' || activeTab === 'concept') && (
        <section className="bg-white border border-[#dadce0] rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-[#dadce0] pb-4">
            <span className="w-8 h-8 rounded-full bg-[#e8f0fe] text-[#1a73e8] font-extrabold flex items-center justify-center text-sm">
              01
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202124] tracking-tight">
              Concept hệ thống
            </h2>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-[#3c4043] leading-relaxed">
            <p className="font-semibold text-[#202124]">
              Đây là <span className="text-[#1a73e8]">nền tảng điều hành doanh nghiệp nội thất có tích hợp các trợ lý AI chuyên biệt</span>.
            </p>
            <p>
              Nền tảng trung tâm kết nối dữ liệu và quy trình từ thiết kế, báo giá, mua nguyên vật liệu, sản xuất, giao hàng đến lắp đặt và chăm sóc khách hàng. Mỗi BOT phụ trách một nhóm nghiệp vụ riêng, phối hợp với nhau để giúp doanh nghiệp vận hành nhanh, chính xác và đồng bộ hơn.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              <div className="p-4 rounded-2xl bg-[#fdf9f7] border border-[#eedacf] flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#b35938] text-white flex items-center justify-center shrink-0 text-xs font-bold">
                  CEO
                </div>
                <div>
                  <h4 className="font-bold text-[#202124]">Bot CEO</h4>
                  <p className="text-xs sm:text-sm text-[#5f6368] mt-0.5">
                    Theo dõi doanh thu, lợi nhuận, đơn hàng, tiến độ và rủi ro.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#f7faf8] border border-[#d8e6db] flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#4a7251] text-white flex items-center justify-center shrink-0 text-xs font-bold">
                  Team
                </div>
                <div>
                  <h4 className="font-bold text-[#202124]">Bot Team</h4>
                  <p className="text-xs sm:text-sm text-[#5f6368] mt-0.5">
                    Giao việc cho thiết kế, kinh doanh, sản xuất và lắp đặt.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#f8fafd] border border-[#d6e2ef] flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2a4667] text-white flex items-center justify-center shrink-0 text-xs font-bold">
                  Cus
                </div>
                <div>
                  <h4 className="font-bold text-[#202124]">Bot Khách hàng</h4>
                  <p className="text-xs sm:text-sm text-[#5f6368] mt-0.5">
                    Tư vấn sản phẩm, màu sắc, vật liệu và ghi nhận nhu cầu.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#f8f9fb] border border-[#dce2e8] flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#596b80] text-white flex items-center justify-center shrink-0 text-xs font-bold">
                  Sup
                </div>
                <div>
                  <h4 className="font-bold text-[#202124]">Bot Nhà cung cấp</h4>
                  <p className="text-xs sm:text-sm text-[#5f6368] mt-0.5">
                    Hỏi giá, so sánh vật liệu, đặt hàng và theo dõi giao nhận.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section 2: Vì sao ngành Furniture nên sử dụng? */}
      {(activeTab === 'all' || activeTab === 'why') && (
        <section className="bg-white border border-[#dadce0] rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-[#dadce0] pb-4">
            <span className="w-8 h-8 rounded-full bg-[#fef7e0] text-[#b06000] font-extrabold flex items-center justify-center text-sm">
              02
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202124] tracking-tight">
              Vì sao ngành Furniture nên sử dụng?
            </h2>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-[#3c4043] leading-relaxed">
            <p>
              Ngành nội thất có quy trình phức tạp và liên kết nhiều bộ phận. Một đơn hàng có thể liên quan đến <span className="font-bold text-[#202124]">8 mắt xích trọng yếu</span>:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 bg-[#f8f9fa] rounded-2xl border border-[#dadce0] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1a73e8]" />
                <span className="text-xs sm:text-sm font-semibold text-[#202124]">1. Nhu cầu & ngân sách</span>
              </div>
              <div className="p-3 bg-[#f8f9fa] rounded-2xl border border-[#dadce0] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1a73e8]" />
                <span className="text-xs sm:text-sm font-semibold text-[#202124]">2. Bản vẽ & thiết kế</span>
              </div>
              <div className="p-3 bg-[#f8f9fa] rounded-2xl border border-[#dadce0] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1a73e8]" />
                <span className="text-xs sm:text-sm font-semibold text-[#202124]">3. Vật liệu & phụ kiện</span>
              </div>
              <div className="p-3 bg-[#f8f9fa] rounded-2xl border border-[#dadce0] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1a73e8]" />
                <span className="text-xs sm:text-sm font-semibold text-[#202124]">4. Báo giá & định mức</span>
              </div>
              <div className="p-3 bg-[#f8f9fa] rounded-2xl border border-[#dadce0] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1a73e8]" />
                <span className="text-xs sm:text-sm font-semibold text-[#202124]">5. Tồn kho & năng lực NCC</span>
              </div>
              <div className="p-3 bg-[#f8f9fa] rounded-2xl border border-[#dadce0] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1a73e8]" />
                <span className="text-xs sm:text-sm font-semibold text-[#202124]">6. Tiến độ sản xuất</span>
              </div>
              <div className="p-3 bg-[#f8f9fa] rounded-2xl border border-[#dadce0] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1a73e8]" />
                <span className="text-xs sm:text-sm font-semibold text-[#202124]">7. Giao hàng & lắp đặt</span>
              </div>
              <div className="p-3 bg-[#f8f9fa] rounded-2xl border border-[#dadce0] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1a73e8]" />
                <span className="text-xs sm:text-sm font-semibold text-[#202124]">8. Bảo hành & sau bán</span>
              </div>
            </div>

            {/* Pain point callout */}
            <div className="p-5 rounded-2xl bg-[#fce8e6]/60 border border-[#fad2cf] text-[#c5221f] space-y-2 mt-4">
              <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span>Rủi ro khi dữ liệu bị phân tán:</span>
              </div>
              <p className="text-xs sm:text-sm text-[#3c4043] leading-relaxed">
                Nếu dữ liệu nằm rời rạc ở Excel, tin nhắn Zalo hoặc nhiều phần mềm khác nhau, doanh nghiệp dễ gặp tình trạng <span className="font-bold text-[#c5221f]">sai báo giá, thiếu vật liệu, trễ tiến độ, giao nhầm mẫu hoặc khó kiểm soát lợi nhuận</span>.
              </p>
            </div>

            <p className="font-semibold text-[#137333] pt-2">
              👉 AI Management Platform giúp tập trung dữ liệu và hỗ trợ xử lý toàn bộ các công việc này trên một nền tảng thống nhất.
            </p>
          </div>
        </section>
      )}

      {/* Section 3: Hệ thống giúp ích gì? */}
      {(activeTab === 'all' || activeTab === 'benefits') && (
        <section className="bg-white border border-[#dadce0] rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
          <div className="flex items-center gap-3 border-b border-[#dadce0] pb-4">
            <span className="w-8 h-8 rounded-full bg-[#e6f4ea] text-[#137333] font-extrabold flex items-center justify-center text-sm">
              03
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202124] tracking-tight">
              Hệ thống giúp ích gì?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 1. Ban Lãnh Đạo */}
            <div className="bg-[#fdf9f7] border border-[#eedacf] rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[#eedacf]">
                <div className="w-10 h-10 rounded-full bg-[#b35938] text-white flex items-center justify-center shadow-xs">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124]">Đối với ban lãnh đạo</h3>
                  <span className="text-xs text-[#b35938] font-semibold">Điều hành & Ra quyết định</span>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#3c4043]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#b35938] shrink-0 mt-0.5" />
                  <span>Nắm nhanh tình hình kinh doanh và vận hành theo thời gian thực.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#b35938] shrink-0 mt-0.5" />
                  <span>Theo dõi các đơn hàng có nguy cơ giao trễ để can thiệp kịp thời.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#b35938] shrink-0 mt-0.5" />
                  <span>Kiểm soát chặt chẽ chi phí, tỷ suất lợi nhuận và mức tồn kho.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#b35938] shrink-0 mt-0.5" />
                  <span>Nhận cảnh báo tự động và đề xuất phương án xử lý từ AI.</span>
                </li>
              </ul>
            </div>

            {/* 2. Bộ Phận Kinh Doanh */}
            <div className="bg-[#f8fafd] border border-[#d6e2ef] rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[#d6e2ef]">
                <div className="w-10 h-10 rounded-full bg-[#1a73e8] text-white flex items-center justify-center shadow-xs">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124]">Đối với bộ phận kinh doanh</h3>
                  <span className="text-xs text-[#1a73e8] font-semibold">Tăng tốc Sales & Báo giá</span>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#3c4043]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1a73e8] shrink-0 mt-0.5" />
                  <span>Tư vấn sản phẩm, mẫu mã và vật liệu nhanh chóng, chính xác.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1a73e8] shrink-0 mt-0.5" />
                  <span>Tạo báo giá tự động theo kích thước tùy biến, vật liệu và phụ kiện.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1a73e8] shrink-0 mt-0.5" />
                  <span>Theo dõi khách hàng tiềm năng và chuyển đổi cơ hội bán hàng.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1a73e8] shrink-0 mt-0.5" />
                  <span>Giảm 80% thời gian hỏi han, trao đổi nội bộ qua lại.</span>
                </li>
              </ul>
            </div>

            {/* 3. Thiết Kế & Sản Xuất */}
            <div className="bg-[#f7faf8] border border-[#d8e6db] rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[#d8e6db]">
                <div className="w-10 h-10 rounded-full bg-[#4a7251] text-white flex items-center justify-center shadow-xs">
                  <Factory className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124]">Đối với thiết kế và sản xuất</h3>
                  <span className="text-xs text-[#4a7251] font-semibold">Đồng bộ bản vẽ & Checklist</span>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#3c4043]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4a7251] shrink-0 mt-0.5" />
                  <span>Tự động chuyển thông tin đơn hàng thành checklist công việc chi tiết.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4a7251] shrink-0 mt-0.5" />
                  <span>Kiểm tra nhanh kích thước, vật liệu và các yêu cầu kỹ thuật.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4a7251] shrink-0 mt-0.5" />
                  <span>Theo dõi tiến độ gia công từng hạng mục xưởng theo thời gian thực.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4a7251] shrink-0 mt-0.5" />
                  <span>Hạn chế tối đa sai lệch giữa bản vẽ thiết kế và sản xuất thực tế.</span>
                </li>
              </ul>
            </div>

            {/* 4. Mua Hàng & Nhà Cung Cấp */}
            <div className="bg-[#f8f9fb] border border-[#dce2e8] rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[#dce2e8]">
                <div className="w-10 h-10 rounded-full bg-[#596b80] text-white flex items-center justify-center shadow-xs">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124]">Đối với mua hàng và nhà cung cấp</h3>
                  <span className="text-xs text-[#596b80] font-semibold">Tự động RFQ & Quản lý tồn kho</span>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#3c4043]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#596b80] shrink-0 mt-0.5" />
                  <span>Gửi yêu cầu báo giá (RFQ) tự động đến các nhà cung cấp chỉ bằng một lệnh.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#596b80] shrink-0 mt-0.5" />
                  <span>So sánh giá, thời gian giao hàng và chất lượng vật tư đa kênh.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#596b80] shrink-0 mt-0.5" />
                  <span>Theo dõi lộ trình giao nhận nguyên vật liệu và đơn đặt hàng PO.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#596b80] shrink-0 mt-0.5" />
                  <span>Cảnh báo trước nguy cơ thiếu hoặc trễ vật liệu để điều phối linh hoạt.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 5. Khách Hàng (Full Width Card) */}
          <div className="bg-gradient-to-r from-[#e8f0fe]/60 via-[#f1f3f4]/80 to-[#e6f4ea]/60 border border-[#dadce0] rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#dadce0]">
              <div className="w-10 h-10 rounded-full bg-[#2a4667] text-white flex items-center justify-center shadow-xs">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#202124]">Đối với khách hàng</h3>
                <span className="text-xs text-[#2a4667] font-semibold">Trải nghiệm mua sắm & Dịch vụ 24/7</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-white/90 rounded-2xl border border-[#e8eaed] shadow-2xs">
                <div className="text-xs font-bold text-[#1a73e8] uppercase mb-1">Tư vấn 24/7</div>
                <div className="text-xs sm:text-sm font-semibold text-[#202124]">Được phản hồi và tư vấn giải pháp tức thì mọi lúc.</div>
              </div>
              <div className="p-4 bg-white/90 rounded-2xl border border-[#e8eaed] shadow-2xs">
                <div className="text-xs font-bold text-[#137333] uppercase mb-1">Minh bạch thông số</div>
                <div className="text-xs sm:text-sm font-semibold text-[#202124]">Nhận thông tin rõ ràng về chất liệu, màu sắc và tiến độ.</div>
              </div>
              <div className="p-4 bg-white/90 rounded-2xl border border-[#e8eaed] shadow-2xs">
                <div className="text-xs font-bold text-[#b06000] uppercase mb-1">Theo dõi đơn hàng</div>
                <div className="text-xs sm:text-sm font-semibold text-[#202124]">Chủ động kiểm tra trạng thái từ xưởng đến lắp đặt.</div>
              </div>
              <div className="p-4 bg-white/90 rounded-2xl border border-[#e8eaed] shadow-2xs">
                <div className="text-xs font-bold text-[#c5221f] uppercase mb-1">Hỗ trợ sau bán</div>
                <div className="text-xs sm:text-sm font-semibold text-[#202124]">Xử lý nhanh chóng trong quá trình bảo hành và bảo trì.</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section 4: Phạm vi áp dụng */}
      {(activeTab === 'all' || activeTab === 'scope') && (
        <section className="bg-white border border-[#dadce0] rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-[#dadce0] pb-4">
            <span className="w-8 h-8 rounded-full bg-[#f1f3f4] text-[#5f6368] font-extrabold flex items-center justify-center text-sm">
              04
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202124] tracking-tight">
              Phạm vi áp dụng
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#3c4043] leading-relaxed">
            Hệ thống AI Management Platform được thiết kế chuyên biệt và tối ưu cho <span className="font-bold text-[#202124]">6 mô hình doanh nghiệp trong hệ sinh thái Furniture</span>:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-[#f8f9fa] border border-[#dadce0] hover:border-[#1a73e8] transition-all flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[#202124] text-sm sm:text-base">Thiết kế & thi công nội thất</h4>
                <p className="text-xs text-[#5f6368] mt-1">Các Studio kiến trúc, công ty Fit-out và tổng thầu nội thất trọn gói.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#f8f9fa] border border-[#dadce0] hover:border-[#1a73e8] transition-all flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#e6f4ea] text-[#137333] flex items-center justify-center shrink-0">
                <Boxes className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[#202124] text-sm sm:text-base">Sản xuất đồ gỗ theo yêu cầu</h4>
                <p className="text-xs text-[#5f6368] mt-1">Xưởng sản xuất may đo (Bespoke), tùy biến kích thước và vật liệu cao cấp.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#f8f9fa] border border-[#dadce0] hover:border-[#1a73e8] transition-all flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#fef7e0] text-[#b06000] flex items-center justify-center shrink-0">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[#202124] text-sm sm:text-base">Kinh doanh nội thất bán lẻ</h4>
                <p className="text-xs text-[#5f6368] mt-1">Chuỗi Showroom trưng bày, cửa hàng bán lẻ và thương mại điện tử.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#f8f9fa] border border-[#dadce0] hover:border-[#1a73e8] transition-all flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#e8eaed] text-[#202124] flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[#202124] text-sm sm:text-base">Nội thất dự án & khách sạn</h4>
                <p className="text-xs text-[#5f6368] mt-1">Căn hộ dịch vụ, văn phòng cao cấp, Resort và Khách sạn chuẩn quốc tế.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#f8f9fa] border border-[#dadce0] hover:border-[#1a73e8] transition-all flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#fce8e6] text-[#c5221f] flex items-center justify-center shrink-0">
                <Factory className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[#202124] text-sm sm:text-base">Nhà máy sản xuất nội thất</h4>
                <p className="text-xs text-[#5f6368] mt-1">Nhà máy sản xuất quy mô lớn phục vụ thị trường nội địa và xuất khẩu.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#f8f9fa] border border-[#dadce0] hover:border-[#1a73e8] transition-all flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#e3eaf2] text-[#2a4667] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[#202124] text-sm sm:text-base">Mạng lưới đại lý & NCC vật liệu</h4>
                <p className="text-xs text-[#5f6368] mt-1">Nhà phân phối ván gỗ, phụ kiện kim khí, vải bọc, sơn và đá bề mặt.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION 5: THÔNG ĐIỆP TỔNG QUÁT (LUXURY QUOTE BANNER) */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e293b] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-[#334155]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1a73e8]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#34a853]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 text-[#93c5fd] rounded-full text-xs font-bold tracking-wide uppercase border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-[#60a5fa]" />
            <span>5. Thông điệp tổng quát</span>
          </div>

          <blockquote className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed italic !text-white border-l-4 border-[#1a73e8] pl-5 sm:pl-6">
            “Đây là nền tảng điều hành dành cho ngành Furniture, nơi dữ liệu từ khách hàng, thiết kế, vật liệu, sản xuất, nhà cung cấp và giao lắp được kết nối trong một hệ thống. Các trợ lý AI hỗ trợ từng bộ phận, giúp doanh nghiệp giảm sai sót, rút ngắn thời gian xử lý và ra quyết định nhanh, chính xác hơn.”
          </blockquote>

          <div className="pt-2">
            <div className="text-base sm:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-[#93c5fd] via-[#86efac] to-[#fde047]">
              Một nền tảng trung tâm – nhiều trợ lý AI – vận hành toàn bộ chuỗi giá trị nội thất.
            </div>
          </div>

          <div className="pt-3 flex flex-wrap gap-4">
            <button 
              onClick={onBack}
              className="px-6 py-3 bg-[#1a73e8] hover:bg-[#1557d0] text-white rounded-full font-bold text-sm transition-all shadow-md hover:shadow-lg cursor-pointer inline-flex items-center gap-2 border border-blue-400/30"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Quay lại danh sách giải pháp</span>
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
