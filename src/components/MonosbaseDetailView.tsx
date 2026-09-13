/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  ChevronLeft, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Workflow, 
  FileText, 
  Box, 
  GitBranch, 
  Tag, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  Factory, 
  Cpu, 
  TrendingUp, 
  Activity, 
  HelpCircle, 
  BookOpen, 
  Sliders, 
  RefreshCw, 
  Clock, 
  Briefcase, 
  DollarSign, 
  FileCheck2, 
  Share2, 
  Boxes, 
  FolderTree, 
  Table, 
  Eye, 
  Server, 
  Network,
  Building2,
  Printer,
  ExternalLink
} from 'lucide-react';
import { Service } from '../types';
import { exportScopeToPdf } from '../lib/exportScopePdf';

interface MonosbaseDetailViewProps {
  service: Service;
  onBack: () => void;
  onShowTech?: () => void;
  hideBack?: boolean;
}

export default function MonosbaseDetailView({ service, onBack, onShowTech, hideBack }: MonosbaseDetailViewProps) {
  const [activeSection, setActiveSection] = useState<'all' | 'architecture' | 'why' | 'modules' | 'rules' | 'template' | 'glossary' | 'features'>('all');
  const [selectedModuleTab, setSelectedModuleTab] = useState<number>(0);

  // 14 Core Modules
  const modulesList = [
    { id: 'catalog', name: 'Danh mục sản phẩm', icon: Box, cat: 'Dữ liệu sản phẩm', desc: 'Quản lý toàn bộ danh mục SKU, biến thể kích thước, mã quy cách và thông số kỹ thuật chuẩn.' },
    { id: 'collections', name: 'Bộ sưu tập', icon: FolderTree, cat: 'Dữ liệu sản phẩm', desc: 'Gom nhóm sản phẩm theo câu chuyện thiết kế, phong cách và định hướng thương mại.' },
    { id: 'materials', name: 'Thư viện vật liệu', icon: Layers, cat: 'R&D & Thiết kế', desc: 'Quản lý map vật liệu số hóa, mã màu, chứng chỉ xuất xứ, nhà cung cấp và giá nguyên liệu.' },
    { id: 'ai-studio', name: 'Studio AI thiết kế', icon: Sparkles, cat: 'R&D & Thiết kế', desc: 'Công cụ AI hỗ trợ gợi ý phối cảnh, biến thể concept và tạo moodboard trực quan nhanh chóng.' },
    { id: 'spec-timeline', name: 'Dòng thời gian Spec', icon: Clock, cat: 'R&D & Thiết kế', desc: 'Theo dõi từng mốc thay đổi kỹ thuật từ bản vẽ sơ phác đến hồ sơ chi tiết sản xuất.' },
    { id: 'rnd-stages', name: 'Giai đoạn R&D', icon: Workflow, cat: 'Quy trình sản xuất', desc: 'Điều phối tiến độ nghiên cứu, kiểm thử tải trọng, chế tạo mẫu thử (Prototype) và duyệt mẫu.' },
    { id: 'version-history', name: 'Lịch sử phiên bản', icon: GitBranch, cat: 'Kiểm soát chất lượng', desc: 'Ghi nhận chi tiết: Giá trị cũ → Giá trị mới → Lý do → Người đề xuất → Người duyệt.' },
    { id: 'collaboration', name: 'Cộng tác & Product Feed', icon: Users, cat: 'Vận hành nội bộ', desc: 'Không gian thảo luận đa phòng ban và luồng cấp phát dữ liệu sản phẩm tự động cho các kênh.' },
    { id: 'b2b-clients', name: 'Khách hàng B2B', icon: Briefcase, cat: 'Thương mại B2B', desc: 'Hồ sơ đối tác B2B, lịch sử đặt hàng, chính sách giá theo phân khúc và thỏa thuận riêng.' },
    { id: 'suppliers', name: 'Nhà cung cấp', icon: Factory, cat: 'Chuỗi cung ứng', desc: 'Hồ sơ năng lực nhà máy, đánh giá định kỳ chất lượng nguyên vật liệu và tiến độ cung ứng.' },
    { id: 'rfq-quotes', name: 'RFQ và Báo giá', icon: FileText, cat: 'Thương mại B2B', desc: 'Tạo và tính toán giá thành tức thì từ BOM dữ liệu chuẩn, sinh file báo giá chuyên nghiệp.' },
    { id: 'so-orders', name: 'Đơn hàng bán (SO)', icon: FileCheck2, cat: 'Thương mại B2B', desc: 'Tiếp nhận đơn hàng bán, khóa cấu hình kỹ thuật và chuyển giao dữ liệu xuống nhà máy.' },
    { id: 'wo-orders', name: 'Lệnh sản xuất (WO)', icon: Cpu, cat: 'Sản xuất', desc: 'Phát hành lệnh sản xuất tự động cho xưởng với đầy đủ BOM, bản vẽ CAD và tiêu chuẩn QC.' },
    { id: 'pnl-analytics', name: 'Phân tích Chi phí & P&L', icon: DollarSign, cat: 'Tài chính & Hiệu quả', desc: 'Tính toán giá vốn (COGS), chi phí logistics và biên lợi nhuận thực tế theo từng dòng sản phẩm.' },
  ];

  // 05 Core Features
  const coreFeatures = [
    {
      num: "01",
      title: "Lõi Quản trị Dữ liệu Sản phẩm (Furniture PIM & Master Data Engine)",
      desc: "Chuẩn hóa một nguồn dữ liệu trung thực duy nhất (Single Source of Truth) cho toàn bộ SKU, hồ sơ 3D, thông số kỹ thuật, bảng giá và quy cách đóng gói.",
      tags: ["Master Data", "SKU Standardization", "3D & Assets", "PIM"]
    },
    {
      num: "02",
      title: "Điều phối Vòng đời Sản phẩm & Duyệt mẫu (R&D & Spec Lifecycle PLM)",
      desc: "Quản lý liền mạch toàn chuỗi: Ý tưởng → CAD → Mẫu thử (Prototype) → Kiểm định BIFMA/QC → Sản xuất hàng loạt, kèm lưu trữ lịch sử thay đổi thông số chặt chẽ.",
      tags: ["PLM", "Prototype Workflow", "QC/BIFMA Check", "Version Audit"]
    },
    {
      num: "03",
      title: "Ma trận Vật liệu & Quản lý Định mức (Dynamic Material Matrix & BOM)",
      desc: "Thư viện vật tư số hóa liên kết trực tiếp với BOM (Bill of Materials) động, tự động tính toán giá thành biến đổi và kiểm soát định mức hao hụt nguyên liệu.",
      tags: ["BOM Engine", "Material Matrix", "Cost Estimation", "Spec Sheet"]
    },
    {
      num: "04",
      title: "Cổng Kết nối B2B & Điều phối Đơn hàng (B2B RFQ, Quotation, SO & WO Pipeline)",
      desc: "Tự động hóa toàn diện từ lúc tiếp nhận Yêu cầu báo giá (RFQ) → Xuất Đơn hàng bán (SO) → Phát hành Lệnh sản xuất (WO) trực tiếp cho nhà xưởng.",
      tags: ["B2B Portal", "Instant RFQ", "SO/WO Sync", "Factory Direct"]
    },
    {
      num: "05",
      title: "Trung tâm Phân tích Chi phí P&L & Tích hợp ERP/CRM (P&L Analytics & Universal Sync Hub)",
      desc: "Kiểm soát biên lợi nhuận gộp theo từng SKU và thời gian thực, đồng bộ hai chiều mượt mà với hệ thống ERP kho vận và CRM quan hệ khách hàng.",
      tags: ["P&L Analytics", "COGS Tracking", "ERP/CRM Two-Way", "API Connectors"]
    }
  ];

  // Standard Terminology Dictionary
  const glossaryItems = [
    { term: 'Mẫu thử (Prototype)', en: 'Prototype', def: 'Sản phẩm mẫu đầu tiên được chế tác thực tế nhằm đánh giá tỷ lệ, kết cấu, độ hoàn thiện trước khi phê duyệt sản xuất số lượng lớn.' },
    { term: 'Thiết kế CAD (CAD Design)', en: 'CAD Design', def: 'Bản vẽ kỹ thuật 2D/3D chi tiết định hình kích thước, cấu trúc mộng ghép, vật liệu và chi tiết liên kết cho nhà máy.' },
    { term: 'Kiểm định chất lượng (QC)', en: 'Quality Control (QC)', def: 'Quy trình kiểm tra độ bền, tải trọng, an toàn bề mặt và độ ổn định kết cấu theo tiêu chuẩn BIFMA/EN.' },
    { term: 'Sản xuất hàng loạt (Mass Production)', en: 'Mass Production', def: 'Giai đoạn sản xuất quy mô công nghiệp sau khi sản phẩm đã vượt qua bài kiểm tra Prototype và được duyệt hồ sơ Master.' },
    { term: 'Yêu cầu báo giá (RFQ)', en: 'Request For Quotation (RFQ)', def: 'Tài liệu yêu cầu báo giá từ khách hàng B2B hoặc gửi tới nhà cung cấp linh phụ kiện, vật tư.' },
    { term: 'Đơn hàng bán (SO)', en: 'Sales Order (SO)', def: 'Chứng từ xác nhận giao dịch thương mại giữa doanh nghiệp và khách hàng đã chốt số lượng, giá cả và thời hạn.' },
    { term: 'Đơn mua hàng (PO)', en: 'Purchase Order (PO)', def: 'Lệnh mua nguyên vật liệu, phụ kiện gửi tới các nhà cung cấp nhằm phục vụ đơn hàng sản xuất.' },
    { term: 'Lệnh sản xuất (WO)', en: 'Work Order (WO)', def: 'Lệnh giao việc trực tiếp cho phân xưởng/nhà máy kèm BOM, bản vẽ và lịch trình giao hàng cụ thể.' },
    { term: 'Giá vốn (COGS)', en: 'Cost of Goods Sold (COGS)', def: 'Tổng chi phí trực tiếp bao gồm nguyên vật liệu, nhân công sản xuất, bao bì và hao hụt để tạo ra sản phẩm.' },
    { term: 'Bộ sưu tập (Collection)', en: 'Collection', def: 'Nhóm sản phẩm có cùng ngôn ngữ thiết kế, chất liệu hoặc concept không gian, được phát hành đồng bộ.' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-10 pb-20"
    >
      {/* Detail Header / Back button */}
      {!hideBack && (
        <div>
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a73e8] hover:text-[#1557d0] transition-colors mb-6 group cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Quay lại danh sách giải pháp</span>
          </button>
        </div>
      )}
        <div className="bg-white border border-[#dadce0] rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
          {/* Action Buttons */}
          <div className="absolute top-6 right-6 sm:top-8 sm:right-10 flex items-center gap-2 sm:gap-2.5 z-10 flex-wrap justify-end">
            <a
              href="https://monosbase03.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-[#1a73e8] hover:bg-[#1557d0] text-white rounded-full text-xs sm:text-sm font-bold transition-all shadow-xs hover:shadow-md group cursor-pointer"
              title="Mở ứng dụng Monosbase Demo (https://monosbase03.vercel.app/)"
            >
              <ExternalLink className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <span>Demo</span>
            </a>

            <button
              onClick={() => exportScopeToPdf(service, { customTitle: 'Monosbase (Furniture Product Data OS - Scope Hệ Thống)' })}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-[#dadce0] hover:border-[#1a73e8]/40 hover:bg-[#e8f0fe]/20 text-[#3c4043] hover:text-[#1a73e8] rounded-full text-xs sm:text-sm font-bold transition-all shadow-2xs cursor-pointer"
              title="Xuất tài liệu phạm vi công việc ra file PDF"
            >
              <Printer className="w-4 h-4 text-[#1a73e8]" />
              <span>Xuất PDF</span>
            </button>

            <button 
              onClick={onShowTech}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#dadce0] hover:border-[#1a73e8]/40 hover:bg-[#e8f0fe]/20 text-[#3c4043] hover:text-[#1a73e8] rounded-full text-xs sm:text-sm font-bold transition-all shadow-2xs group cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-[#1a73e8] group-hover:rotate-12 transition-transform" />
              <span>Công nghệ</span>
            </button>
          </div>

          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#fef7e0] text-[#b06000] rounded-full border border-[#feefc3] text-xs font-bold tracking-wide uppercase">
              <Database className="w-3.5 h-3.5 text-[#e37400]" />
              <span>Package 05 • Furniture Product Data OS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#202124] tracking-tight leading-tight">
              Monosbase
            </h1>
            <p className="text-base sm:text-lg text-[#3c4043] leading-relaxed font-medium">
              Lõi chuẩn hóa dữ liệu và điều phối vòng đời sản phẩm cho doanh nghiệp nội thất cao cấp. Cung cấp một nguồn dữ liệu chuẩn duy nhất (Single Source of Truth) kết nối toàn diện chuỗi giá trị.
            </p>
            
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs sm:text-sm">
              <span className="px-3.5 py-1.5 bg-[#e8f0fe] text-[#1a73e8] font-semibold rounded-full border border-[#d2e3fc]">
                Hình thức: Hệ thống Trọn gói
              </span>
              <span className="px-3.5 py-1.5 bg-[#e6f4ea] text-[#137333] font-semibold rounded-full border border-[#ceead6]">
                Trạng thái: Sẵn sàng triển khai
              </span>
              <span className="px-3.5 py-1.5 bg-[#f1f3f4] text-[#5f6368] font-medium rounded-full border border-[#dadce0]">
                Tương thích: ERP, CRM, 3D Engine & Factory
              </span>
            </div>
          </div>
        </div>

      {/* ========================================================================= */}
      {/* GRAPHIC DIAGRAM: MONOSBASE ARCHITECTURE AS PER ATTACHED IMAGE (9HL2R.png) */}
      {/* ========================================================================= */}
      <section className="bg-white border border-[#dadce0] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5f6368] mb-2">
            <Network className="w-4 h-4 text-[#1a73e8]" />
            <span>Sơ đồ kiến trúc dữ liệu trực quan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight">
            MONOSBASE: Lõi dữ liệu duy nhất cho toàn bộ doanh nghiệp
          </h2>
          <p className="text-sm text-[#5f6368] mt-1 max-w-3xl">
            Mô hình kết nối trung tâm giữa dữ liệu lõi sản phẩm, hệ thống quản trị nguồn lực (ERP) và quan hệ khách hàng (CRM).
          </p>
        </div>

        {/* The Graphic Canvas matching 9HL2R.png */}
        <div className="bg-[#f8f7f4] border border-[#e5e1da] rounded-3xl p-4 sm:p-6 lg:p-8 relative overflow-hidden shadow-inner max-w-full">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 opacity-[0.4] pointer-events-none" 
            style={{ 
              backgroundImage: 'radial-gradient(#c5c0b8 1px, transparent 1px)', 
              backgroundSize: '24px 24px' 
            }} 
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-1.5 xl:gap-4 py-2 w-full">
            {/* 1. LEFT NODE: Thông tin lõi (Warm Coral/Terracotta) */}
            <div className="w-full lg:flex-1 lg:max-w-[230px] xl:max-w-[260px] min-w-0">
              <div className="relative p-1 rounded-3xl bg-gradient-to-b from-[#e5a88c] via-[#cf7d5c] to-[#b35938] shadow-md">
                <div className="bg-[#fcfbf9] rounded-[22px] p-4 sm:p-5 border border-white/80 space-y-2.5 sm:space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-[#ebd7cc]">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#b35938]" />
                    <h3 className="text-sm sm:text-base font-bold text-[#202124]">Thông tin lõi:</h3>
                  </div>
                  <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm font-semibold text-[#3c4043]">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b35938] shrink-0" />
                      <span className="truncate">Mã SP (SKU)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b35938] shrink-0" />
                      <span className="truncate">Hình ảnh / 3D Asset</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b35938] shrink-0" />
                      <span className="truncate">Giá bán & Bảng giá</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b35938] shrink-0" />
                      <span className="truncate">Nguyên vật liệu & BOM</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mobile/Tablet vertical arrow 1 */}
            <div className="flex lg:hidden items-center justify-center gap-1 text-xs font-bold text-[#b35938] py-1">
              <span>Chuẩn hóa</span>
              <ArrowRight className="w-3.5 h-3.5 rotate-90" />
            </div>

            {/* Desktop Left-to-Center Pipeline / Conduit */}
            <div className="hidden lg:flex items-center justify-center flex-1 max-w-[50px] xl:max-w-[70px] min-w-[16px] shrink-0 relative px-0.5">
              <div className="h-3.5 xl:h-4 w-full bg-gradient-to-r from-[#d99071] via-[#c67655] to-[#b35938] rounded-full p-[2px] shadow-xs flex items-center justify-center">
                <div className="h-full w-full bg-gradient-to-r from-[#f7e6df] to-[#eed0c4] rounded-full flex items-center justify-center relative overflow-hidden">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#b35938] animate-ping opacity-75" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-pulse" />
                </div>
              </div>
              {/* Flow Arrows */}
              <div className="absolute -top-4.5 flex items-center gap-0.5 text-[9px] xl:text-[10px] font-bold text-[#b35938] whitespace-nowrap">
                <span>Chuẩn hóa</span>
                <ArrowRight className="w-2.5 h-2.5 xl:w-3 xl:h-3" />
              </div>
            </div>

            {/* 2. CENTER HUB: Product Data (Monosbase) */}
            <div className="w-full lg:w-auto shrink-0 flex flex-col items-center justify-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 xl:w-64 xl:h-64 rounded-full p-2.5 sm:p-3 xl:p-4 bg-gradient-to-tr from-[#8f857d] via-[#d6cec7] to-[#e8e4e0] shadow-xl flex items-center justify-center border-4 border-[#faf8f6]">
                {/* Copper / Metallic Decorative Ring */}
                <div className="absolute inset-2 rounded-full border-2 border-[#b57353]/40 border-dashed animate-spin-slow" />
                <div className="absolute inset-3.5 sm:inset-4 xl:inset-5 rounded-full bg-gradient-to-b from-[#dfd7d0] via-[#c4b9b0] to-[#a3978d] p-2 sm:p-2.5 xl:p-3 shadow-inner flex items-center justify-center">
                  {/* Central Core Metallic Plate */}
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-[#fdfcfb] to-[#eae6e2] border-2 border-[#d5cbbf] shadow-md flex flex-col items-center justify-center p-3 sm:p-4 xl:p-5 text-center">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 xl:w-9 xl:h-9 rounded-full bg-[#f4ece7] border border-[#dfc3b5] flex items-center justify-center text-[#b35938] mb-1 sm:mb-1.5 shadow-2xs">
                      <Database className="w-3.5 h-3.5 sm:w-4 sm:h-4 xl:w-5 xl:h-5" />
                    </div>
                    <h4 className="text-sm sm:text-base xl:text-lg font-black text-[#202124] tracking-tight leading-tight">
                      Product Data
                    </h4>
                    <div className="text-[11px] sm:text-xs xl:text-sm font-extrabold text-[#b35938] uppercase tracking-wider mt-0.5">
                      (Monosbase)
                    </div>
                    <div className="mt-1 sm:mt-1.5 px-2 sm:px-2.5 py-0.5 bg-[#ede8e1] rounded-full text-[10px] sm:text-[11px] font-bold text-[#5f6368] border border-[#ded7ce]">
                      Dữ liệu chuẩn hóa
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile/Tablet vertical arrow 2 */}
            <div className="flex lg:hidden items-center justify-center gap-1 text-xs font-bold text-[#4a7251] py-1">
              <span>⇄ Đồng bộ hai chiều</span>
              <ArrowRight className="w-3.5 h-3.5 rotate-90" />
            </div>

            {/* Desktop Center-to-Right Dual Pipelines */}
            <div className="hidden lg:flex flex-col justify-between h-36 sm:h-40 xl:h-48 flex-1 max-w-[50px] xl:max-w-[70px] min-w-[16px] shrink-0 relative py-2 px-0.5">
              {/* Top Branch to ERP */}
              <div className="flex items-center justify-center relative">
                <div className="h-3.5 xl:h-4 w-full bg-gradient-to-r from-[#94aa97] to-[#6a8e70] rounded-full p-[2px] shadow-xs flex items-center justify-center">
                  <div className="h-full w-full bg-gradient-to-r from-[#e5eee6] to-[#d0dfd2] rounded-full flex items-center justify-center relative overflow-hidden">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4a7251] animate-ping opacity-75" />
                  </div>
                </div>
                <div className="absolute -top-3.5 text-[8.5px] xl:text-[9.5px] font-bold text-[#4a7251] whitespace-nowrap">
                  <span>⇄ Đồng bộ</span>
                </div>
              </div>

              {/* Bottom Branch to CRM */}
              <div className="flex items-center justify-center relative">
                <div className="h-3.5 xl:h-4 w-full bg-gradient-to-r from-[#7a8da3] to-[#405c7d] rounded-full p-[2px] shadow-xs flex items-center justify-center">
                  <div className="h-full w-full bg-gradient-to-r from-[#e3eaf2] to-[#c7d5e4] rounded-full flex items-center justify-center relative overflow-hidden">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2a4667] animate-ping opacity-75" />
                  </div>
                </div>
                <div className="absolute -top-3.5 text-[8.5px] xl:text-[9.5px] font-bold text-[#2a4667] whitespace-nowrap">
                  <span>⇄ Đồng bộ</span>
                </div>
              </div>
            </div>

            {/* 3. RIGHT NODES: ERP & CRM */}
            <div className="w-full lg:flex-1 lg:max-w-[230px] xl:max-w-[260px] min-w-0 space-y-3 xl:space-y-4">
              {/* ERP Card (Sage Green) */}
              <div className="relative p-1 rounded-3xl bg-gradient-to-b from-[#a4bba7] via-[#759a7a] to-[#4a7251] shadow-md">
                <div className="bg-[#fbfdfb] rounded-[22px] p-3.5 sm:p-4 xl:p-5 border border-white/80 space-y-1.5">
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#dbe7dc]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#4a7251] shrink-0" />
                      <h4 className="text-sm sm:text-base font-bold text-[#202124]">ERP</h4>
                    </div>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#e6f4ea] text-[#137333] whitespace-nowrap">
                      Hai chiều ⇄
                    </span>
                  </div>
                  <p className="text-xs sm:text-xs xl:text-sm font-semibold text-[#3c4043] leading-relaxed">
                    Nguồn lực, kho vận, định mức vật tư và đơn hàng sản xuất.
                  </p>
                </div>
              </div>

              {/* CRM Card (Navy / Slate Blue) */}
              <div className="relative p-1 rounded-3xl bg-gradient-to-b from-[#879bb3] via-[#527196] to-[#2a4667] shadow-md">
                <div className="bg-[#f9fbfd] rounded-[22px] p-3.5 sm:p-4 xl:p-5 border border-white/80 space-y-1.5">
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#d6e0eb]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#2a4667] shrink-0" />
                      <h4 className="text-sm sm:text-base font-bold text-[#202124]">CRM</h4>
                    </div>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#e8f0fe] text-[#1a73e8] whitespace-nowrap">
                      Hai chiều ⇄
                    </span>
                  </div>
                  <p className="text-xs sm:text-xs xl:text-sm font-semibold text-[#3c4043] leading-relaxed">
                    Khách hàng, cơ hội bán hàng B2B, tương tác và báo giá nhanh.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 h-[1px] bg-[#dfdad0]" />

          {/* 4. BOTTOM 3 SUMMARY CARDS (Matching bottom of image) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Với Doanh nghiệp (Bronze/Terracotta Top Line) */}
            <div className="bg-white/95 rounded-2xl p-5 border border-[#e5ded6] shadow-2xs relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#b35938]" />
              <h5 className="font-bold text-base text-[#202124] mb-1.5 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#b35938]" />
                <span>Với Doanh nghiệp:</span>
              </h5>
              <p className="text-sm text-[#3c4043] font-medium leading-relaxed">
                Chuẩn hóa đầu mối, kiểm soát phiên bản & giá bán toàn hệ thống.
              </p>
            </div>

            {/* Card 2: Với Kinh doanh (Sage Green Top Line) */}
            <div className="bg-white/95 rounded-2xl p-5 border border-[#dce6dd] shadow-2xs relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#4a7251]" />
              <h5 className="font-bold text-base text-[#202124] mb-1.5 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#4a7251]" />
                <span>Với Kinh doanh:</span>
              </h5>
              <p className="text-sm text-[#3c4043] font-medium leading-relaxed">
                Tìm thông tin/tạo báo giá cực nhanh, theo dõi lead và cơ hội tức thì.
              </p>
            </div>

            {/* Card 3: Với Khách hàng (Navy Top Line) */}
            <div className="bg-white/95 rounded-2xl p-5 border border-[#d6e0ea] shadow-2xs relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#2a4667]" />
              <h5 className="font-bold text-base text-[#202124] mb-1.5 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#2a4667]" />
                <span>Với Khách hàng:</span>
              </h5>
              <p className="text-sm text-[#3c4043] font-medium leading-relaxed">
                Nhận thông tin nhất quán, tư vấn đúng nhu cầu, trải nghiệm chuyên nghiệp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05 TÍNH NĂNG CỐT LÕI (5 Core Capabilities Section) */}
      {/* ========================================================================= */}
      <section className="bg-white border border-[#dadce0] rounded-3xl p-6 sm:p-10 shadow-xs">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5f6368] mb-2">
            <Sparkles className="w-4 h-4 text-[#1a73e8]" />
            <span>Trụ cột năng lực nền tảng</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight">
            05 Tính năng cốt lõi của Monosbase
          </h2>
          <p className="text-sm text-[#5f6368] mt-1">
            Được cấu trúc chuyên biệt để xử lý đặc thù phức tạp của ngành thiết kế và sản xuất nội thất.
          </p>
        </div>

        <div className="space-y-4">
          {coreFeatures.map((feat) => (
            <div 
              key={feat.num}
              className="p-6 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl hover:border-[#1a73e8]/40 hover:bg-[#e8f0fe]/20 transition-all group"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#e8f0fe] border border-[#d2e3fc] text-[#1a73e8] font-black text-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  {feat.num}
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-[#202124] group-hover:text-[#1a73e8] transition-colors leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#3c4043] leading-relaxed">
                    {feat.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {feat.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-2.5 py-1 bg-white border border-[#dadce0] text-[#5f6368] rounded-full text-xs font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1. ĐỊNH VỊ & 2. TẠI SAO CẦN MONOSBASE? */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 1. Định vị */}
        <section className="bg-white border border-[#dadce0] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 flex flex-col">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5f6368]">
            <ShieldCheck className="w-4 h-4 text-[#1a73e8]" />
            <span>1. Định vị cốt lõi</span>
          </div>
          
          <div className="p-6 bg-[#f8f9fa] border-l-4 border-[#1a73e8] rounded-r-2xl border-y border-r border-[#dadce0]">
            <p className="text-base sm:text-lg font-bold text-[#202124] leading-relaxed">
              “Monosbase là Furniture Product Data OS — lõi chuẩn hóa dữ liệu và điều phối vòng đời sản phẩm cho doanh nghiệp nội thất cao cấp.”
            </p>
          </div>

          <p className="text-sm text-[#3c4043] leading-relaxed flex-1">
            Monosbase <strong className="text-[#202124]">không thay thế ERP/CRM</strong>. Nó cung cấp <strong className="text-[#1a73e8]">một nguồn dữ liệu sản phẩm chuẩn duy nhất (Single Source of Truth)</strong> để ERP, CRM, 3D Engine, Sales, nhà máy và các bộ phận nội bộ cùng khai thác đồng bộ, chấm dứt tình trạng cát cứ dữ liệu.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-4 bg-[#f8f9fa] border border-[#dadce0] rounded-xl text-center">
              <div className="text-xs font-bold text-[#5f6368] uppercase">Mục tiêu</div>
              <div className="text-sm font-bold text-[#202124] mt-1">Dữ liệu chuẩn hóa 100%</div>
            </div>
            <div className="p-4 bg-[#f8f9fa] border border-[#dadce0] rounded-xl text-center">
              <div className="text-xs font-bold text-[#5f6368] uppercase">Tác động</div>
              <div className="text-sm font-bold text-[#137333] mt-1">Tiết kiệm 80% thời gian</div>
            </div>
          </div>
        </section>

        {/* 2. Tại sao cần Monosbase? */}
        <section className="bg-white border border-[#dadce0] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ea4335]">
            <AlertTriangle className="w-4 h-4 text-[#ea4335]" />
            <span>2. Tại sao cần Monosbase?</span>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-[#fef7e0] border border-[#feefc3] rounded-2xl">
              <div className="text-xs font-bold text-[#b06000] uppercase mb-1">Hiện trạng dữ liệu phân tán</div>
              <p className="text-xs sm:text-sm text-[#3c4043] leading-relaxed">
                Bản vẽ CAD/BOM nằm ở Kỹ thuật, vật liệu ở R&D, báo giá ở Sales, tiến độ ở Nhà máy, còn chi phí lại phân tán ở Kế toán.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-[#202124] uppercase tracking-wider">Hậu quả nếu thiếu hệ thống trung tâm:</div>
              {[
                "Dùng sai phiên bản thông số kỹ thuật khi gia công.",
                "Sản xuất sai mẫu, phát sinh chi phí làm lại lãng phí.",
                "Báo giá thiếu chi phí vật tư hoặc phụ kiện.",
                "Mất dấu lịch sử thay đổi qua các đợt hiệu chỉnh.",
                "Không biết chính xác sản phẩm đang ở giai đoạn nào.",
                "Khó kết nối mạch lạc từ thiết kế ban đầu đến doanh thu thực tế."
              ].map((risk, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2.5 bg-[#fce8e6]/50 rounded-xl border border-[#fad2cf] text-xs sm:text-sm text-[#c5221f]">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[#ea4335]" />
                  <span className="font-medium">{risk}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ========================================================================= */}
      {/* 3. MONOSBASE QUẢN LÝ NHỮNG GÌ? (Vòng đời chuỗi & 14 Phân hệ chính) */}
      {/* ========================================================================= */}
      <section className="bg-white border border-[#dadce0] rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5f6368] mb-2">
            <Workflow className="w-4 h-4 text-[#1a73e8]" />
            <span>3. Phạm vi quản trị</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight">
            Monosbase quản lý những gì?
          </h2>
          <p className="text-sm text-[#5f6368] mt-1 max-w-3xl">
            Kết nối toàn bộ chuỗi giá trị từ lúc khởi tạo ý tưởng đến phân tích hiệu quả kinh doanh.
          </p>
        </div>

        {/* Life-cycle Flow Pipeline Banner */}
        <div className="bg-[#f8f9fa] border border-[#dadce0] rounded-2xl p-6">
          <div className="text-xs font-bold uppercase tracking-wider text-[#1a73e8] mb-4 flex items-center gap-2">
            <GitBranch className="w-4 h-4" />
            <span>Chuỗi vòng đời sản phẩm khép kín</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold text-[#202124]">
            {[
              "Ý tưởng",
              "CAD/BOM",
              "Prototype",
              "QC/BIFMA",
              "Catalog",
              "RFQ",
              "SO",
              "PO/WO",
              "Giao hàng",
              "P&L"
            ].map((step, sIdx, arr) => (
              <div key={sIdx} className="flex items-center gap-2">
                <span className="px-3.5 py-1.5 bg-white border border-[#dadce0] rounded-full shadow-2xs text-[#1a73e8] hover:border-[#1a73e8] transition-colors">
                  {step}
                </span>
                {sIdx < arr.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-[#80868b] shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 14 Core Modules Grid */}
        <div>
          <h3 className="text-lg font-bold text-[#202124] mb-4 flex items-center gap-2">
            <Boxes className="w-5 h-5 text-[#1a73e8]" />
            <span>14 Phân hệ chức năng chính</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modulesList.map((m, mIdx) => {
              const IconComp = m.icon;
              return (
                <div 
                  key={m.id}
                  className="p-5 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl hover:border-[#1a73e8]/40 hover:bg-white transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#dadce0] text-[#1a73e8] flex items-center justify-center shadow-2xs group-hover:border-[#1a73e8]/30">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#f1f3f4] text-[#5f6368] border border-[#dadce0]">
                      {m.cat}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[#202124] group-hover:text-[#1a73e8] transition-colors">
                    {m.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5f6368] leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. NGUYÊN TẮC DỮ LIỆU TRUNG TÂM (Master Data Rules & Sample SKU) */}
      {/* ========================================================================= */}
      <section className="bg-white border border-[#dadce0] rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5f6368] mb-2">
            <Table className="w-4 h-4 text-[#1a73e8]" />
            <span>4. Chuẩn hóa dữ liệu</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight">
            Nguyên tắc dữ liệu trung tâm
          </h2>
          <p className="text-sm text-[#5f6368] mt-1 max-w-3xl">
            Mỗi sản phẩm phải được quản lý thống nhất theo bộ 13 trường thuộc tính bắt buộc và cơ chế ghi nhận lịch sử thay đổi bất biến.
          </p>
        </div>

        {/* 13 Attributes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {[
            "SKU Định danh",
            "Tên sản phẩm",
            "Loại sản phẩm",
            "Bộ sưu tập",
            "Kích thước & Đơn vị",
            "Vật liệu & Phụ kiện",
            "Giai đoạn vòng đời",
            "Phiên bản (Version)",
            "Trạng thái phê duyệt",
            "Người phụ trách",
            "Người phê duyệt",
            "Hồ sơ CAD / BOM / QC",
            "Giá vốn & Kinh doanh"
          ].map((attr, aIdx) => (
            <div key={aIdx} className="p-3.5 bg-[#f8f9fa] border border-[#dadce0] rounded-xl flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#137333] shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-[#202124]">{attr}</span>
            </div>
          ))}
        </div>

        {/* Live SKU Record Example */}
        <div className="p-6 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[#1a73e8]">Ví dụ bản ghi SKU tiêu chuẩn:</div>
          <div className="p-4 bg-white border border-[#1a73e8]/30 rounded-xl flex flex-wrap items-center gap-3 text-sm font-bold text-[#202124] shadow-2xs">
            <span className="px-3 py-1 bg-[#e8f0fe] text-[#1a73e8] rounded-md font-mono text-xs">FUR-CHR-001</span>
            <span className="text-[#5f6368]">|</span>
            <span>Cloudy</span>
            <span className="text-[#5f6368]">|</span>
            <span className="text-[#5f6368] font-normal">Ghế lounge</span>
            <span className="text-[#5f6368]">|</span>
            <span className="px-2.5 py-0.5 bg-[#fef7e0] text-[#b06000] text-xs rounded-full">Prototype</span>
            <span className="text-[#5f6368]">|</span>
            <span className="px-2.5 py-0.5 bg-[#f1f3f4] text-[#3c4043] text-xs rounded-full">Version 1.3</span>
            <span className="text-[#5f6368]">|</span>
            <span className="px-2.5 py-0.5 bg-[#e6f4ea] text-[#137333] text-xs rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Verified
            </span>
          </div>

          {/* Change Audit Trail Mechanism */}
          <div className="pt-2">
            <div className="text-xs font-bold text-[#5f6368] uppercase mb-2">Cơ chế quản lý lịch sử thay đổi phiên bản:</div>
            <div className="p-4 bg-white border border-[#dadce0] rounded-xl flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-[#3c4043]">
              <span className="text-[#c5221f]">Giá trị cũ</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#80868b]" />
              <span className="text-[#137333]">Giá trị mới</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#80868b]" />
              <span className="text-[#1a73e8]">Lý do thay đổi</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#80868b]" />
              <span className="text-[#5f6368]">Người đề xuất</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#80868b]" />
              <span className="text-[#5f6368]">Người duyệt</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#80868b]" />
              <span className="text-[#5f6368]">Thời điểm áp dụng</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. MẪU TRÌNH BÀY THỐNG NHẤT CHO MỌI MODULE (Standard Framework) */}
      {/* ========================================================================= */}
      <section className="bg-white border border-[#dadce0] rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5f6368] mb-2">
            <Sliders className="w-4 h-4 text-[#1a73e8]" />
            <span>5. Tiêu chuẩn module</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight">
            Mẫu trình bày thống nhất cho mọi module
          </h2>
          <p className="text-sm text-[#5f6368] mt-1 max-w-3xl">
            Mọi phân hệ trong hệ thống đều tuân thủ cấu trúc 8 bước chuẩn mực để đảm bảo tính nhất quán tuyệt đối.
          </p>
        </div>

        {/* 8-Step Framework */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            "1. Tên module",
            "2. Mục tiêu",
            "3. Đối tượng sử dụng",
            "4. Dữ liệu đầu vào",
            "5. Quy trình xử lý",
            "6. Dữ liệu đầu ra",
            "7. Trạng thái & quyền phê duyệt",
            "8. Nguồn dữ liệu & phiên bản"
          ].map((step, idx) => (
            <div key={idx} className="p-3 bg-[#f8f9fa] border border-[#dadce0] rounded-xl text-xs sm:text-sm font-bold text-[#3c4043]">
              {step}
            </div>
          ))}
        </div>

        {/* Package 05 Example Card */}
        <div className="p-6 bg-gradient-to-br from-[#f8f9fa] to-[#e8f0fe]/30 border border-[#d2e3fc] rounded-2xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#1a73e8]" />
            <h4 className="text-base sm:text-lg font-bold text-[#202124]">
              Áp dụng thực tế: Package 05 — Monosbase (Lõi chuẩn hóa dữ liệu)
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-white border border-[#dadce0] rounded-xl space-y-2">
              <div className="font-bold text-[#1a73e8] uppercase text-xs">Dữ liệu đầu vào</div>
              <p className="text-[#3c4043] text-xs sm:text-sm leading-relaxed">
                Bản vẽ CAD, BOM kỹ thuật, thông số vật tư, quy cách đóng gói, dữ liệu tồn kho hiện hữu.
              </p>
            </div>
            <div className="p-4 bg-white border border-[#dadce0] rounded-xl space-y-2">
              <div className="font-bold text-[#e37400] uppercase text-xs">Quy trình xử lý</div>
              <p className="text-[#3c4043] text-xs sm:text-sm leading-relaxed">
                Chuẩn hóa SKU, cấu hình biến thể, định danh vật liệu, đồng bộ thông số và quản lý phiên bản.
              </p>
            </div>
            <div className="p-4 bg-white border border-[#dadce0] rounded-xl space-y-2">
              <div className="font-bold text-[#137333] uppercase text-xs">Dữ liệu đầu ra</div>
              <p className="text-[#3c4043] text-xs sm:text-sm leading-relaxed">
                Cung cấp dữ liệu sạch cho ERP sản xuất, 3D Engine, CRM, hệ thống RFQ, SO, PO/WO và báo cáo P&L.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. TỪ NGỮ NÊN THỐNG NHẤT (Glossary & Standardization) */}
      {/* ========================================================================= */}
      <section className="bg-white border border-[#dadce0] rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5f6368] mb-2">
            <BookOpen className="w-4 h-4 text-[#1a73e8]" />
            <span>6. Bộ từ điển thuật ngữ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight">
            Từ ngữ chuẩn hóa thống nhất
          </h2>
          <p className="text-sm text-[#5f6368] mt-1 max-w-3xl">
            Chuẩn hóa ngôn ngữ chung giữa Thiết kế, Kỹ thuật, Bán hàng, Nhà máy và Ban giám đốc để loại bỏ hiểu nhầm vận hành.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {glossaryItems.map((g, gIdx) => (
            <div key={gIdx} className="p-4 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="text-sm sm:text-base font-bold text-[#202124]">{g.term}</h4>
                <span className="text-xs font-mono text-[#1a73e8] bg-[#e8f0fe] px-2.5 py-0.5 rounded-full border border-[#d2e3fc]">
                  {g.en}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#5f6368] leading-relaxed">
                {g.def}
              </p>
            </div>
          ))}
        </div>

        <div className="p-4 bg-[#fef7e0] border border-[#feefc3] rounded-xl text-xs sm:text-sm text-[#b06000] flex items-center gap-3">
          <HelpCircle className="w-5 h-5 shrink-0 text-[#e37400]" />
          <span>
            <strong>Nguyên tắc định danh:</strong> Không dùng quá nhiều tên cho cùng một khái niệm (ví dụ: “Stories”, “Product Feed”, “MXH nội bộ”) nếu chưa xác định rõ là một hay nhiều đối tượng dữ liệu khác nhau.
          </span>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. THÔNG ĐIỆP CỐT LÕI (Core Message Banner) */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e293b] rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-6 relative overflow-hidden border border-[#334155]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1a73e8]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#34a853]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-5 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 rounded-full text-xs font-bold text-[#93c5fd] uppercase tracking-wider border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-[#60a5fa]" />
            <span>7. Thông điệp cốt lõi</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight !text-white">
            “Monosbase biến dữ liệu rời rạc của ngành nội thất thành một hệ thống sản phẩm có cấu trúc, có phiên bản, có phê duyệt và có thể đi thẳng từ thiết kế đến sản xuất, bán hàng và lợi nhuận.”
          </h2>

          <p className="text-sm sm:text-base text-[#cbd5e1] leading-relaxed max-w-2xl font-normal">
            Không chỉ là quản lý dữ liệu, đây là nền móng để doanh nghiệp nội thất làm chủ chuỗi giá trị và mở rộng quy mô kinh doanh toàn cầu.
          </p>

          <div className="pt-3 flex flex-wrap gap-4">
            <a 
              href="https://monosbase03.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#1a73e8] hover:bg-[#1557d0] text-white rounded-full font-bold text-sm transition-all shadow-md hover:shadow-lg cursor-pointer inline-flex items-center gap-2 border border-blue-400/30"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Trải nghiệm Demo Monosbase</span>
            </a>

            <button 
              onClick={onBack}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold text-sm transition-all shadow-md cursor-pointer inline-flex items-center gap-2 border border-white/20"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Quay lại tổng quan dịch vụ</span>
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
