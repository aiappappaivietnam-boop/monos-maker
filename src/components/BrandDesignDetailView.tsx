/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Palette, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  Search, 
  Compass, 
  Sparkles, 
  Sofa, 
  Package, 
  Globe, 
  Rocket, 
  Layers, 
  FileCheck, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  BookOpen, 
  Layout, 
  Box, 
  Target, 
  BadgeCheck, 
  SlidersHorizontal,
  FolderLock,
  Workflow,
  Lightbulb,
  FileText,
  Printer
} from 'lucide-react';
import { Service } from '../types';
import { exportScopeToPdf } from '../lib/exportScopePdf';

interface BrandDesignDetailViewProps {
  service: Service;
  onBack: () => void;
  backTitle?: string;
  hideBack?: boolean;
}

export default function BrandDesignDetailView({ service, onBack, backTitle = 'Quay lại', hideBack }: BrandDesignDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'workgroups' | 'tiers' | 'deliverables'>('workgroups');
  const [selectedTier, setSelectedTier] = useState<'basic' | 'standard' | 'comprehensive'>('standard');
  const [openedWorkgroups, setOpenedWorkgroups] = useState<number[]>([]);

  const toggleWorkgroup = (id: number) => {
    setOpenedWorkgroups(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const expandAllWorkgroups = () => {
    setOpenedWorkgroups(workgroups.map(w => w.id));
  };

  const collapseAllWorkgroups = () => {
    setOpenedWorkgroups([]);
  };

  // 8 Core Workgroups for Furniture Brand Creation Scope
  const workgroups = [
    {
      id: 1,
      num: '01',
      title: 'Nghiên cứu và định hướng thương hiệu',
      subtitle: 'Research & Brand Strategic Direction',
      icon: Search,
      badge: 'Giai đoạn 1',
      description: 'Phân tích toàn diện thị trường nội thất, đối thủ, khách hàng và xu hướng để xác lập nền tảng định vị vững chắc.',
      tasks: [
        'Phân tích thị trường nội thất',
        'Nghiên cứu đối thủ và khoảng trống thị trường',
        'Xác định khách hàng mục tiêu',
        'Phân tích xu hướng thiết kế, vật liệu và lối sống',
        'Xác định phân khúc giá',
        'Xây dựng định vị thương hiệu',
        'Xác định lợi thế cạnh tranh và điểm khác biệt'
      ],
      deliverables: ['Brand strategy', 'Customer profile', 'Positioning statement', 'Brand direction']
    },
    {
      id: 2,
      num: '02',
      title: 'Xây dựng nền tảng thương hiệu',
      subtitle: 'Brand Platform & Messaging Framework',
      icon: Compass,
      badge: 'Giai đoạn 2',
      description: 'Xây dựng hệ giá trị tư tưởng cốt lõi, cá tính, câu chuyện và khung thông điệp nhất quán cho thương hiệu.',
      tasks: [
        'Tầm nhìn, sứ mệnh, giá trị cốt lõi',
        'Tính cách thương hiệu',
        'Lời hứa thương hiệu',
        'Câu chuyện thương hiệu',
        'Slogan hoặc tagline',
        'Giọng điệu giao tiếp',
        'Kiến trúc thương hiệu nếu có nhiều dòng sản phẩm'
      ],
      deliverables: ['Brand platform', 'Messaging framework']
    },
    {
      id: 3,
      num: '03',
      title: 'Đặt tên thương hiệu',
      subtitle: 'Brand Naming & Linguistic Verification',
      icon: Lightbulb,
      badge: 'Giai đoạn 3',
      description: 'Sáng tạo và sàng lọc hệ thống tên thương hiệu, tên dòng sản phẩm chuẩn mực, dễ nhớ và có tính mở rộng cao.',
      tasks: [
        'Xây dựng tiêu chí đặt tên',
        'Phát triển danh sách tên',
        'Kiểm tra ý nghĩa, cách phát âm và khả năng mở rộng',
        'Kiểm tra sơ bộ tên miền và mạng xã hội',
        'Kiểm tra khả năng đăng ký nhãn hiệu'
      ],
      deliverables: ['Tên thương hiệu chính', 'Tên dòng sản phẩm', 'Rationale của tên'],
      note: 'Lưu ý: Kiểm tra pháp lý chuyên sâu và đăng ký nhãn hiệu thường là hạng mục riêng.'
    },
    {
      id: 4,
      num: '04',
      title: 'Thiết kế nhận diện thương hiệu',
      subtitle: 'Visual Identity System & Brand Guideline',
      icon: Palette,
      badge: 'Giai đoạn 4',
      description: 'Chuyển hóa bản sắc thương hiệu thành hệ thống nhận diện thị giác độc bản, chuyên nghiệp và có tính ứng dụng cao.',
      tasks: [
        'Logo và hệ thống logo',
        'Quy chuẩn màu sắc',
        'Typography',
        'Hệ thống layout',
        'Họa tiết, đường nét và graphic elements',
        'Phong cách hình ảnh',
        'Phong cách minh họa hoặc icon',
        'Quy tắc sử dụng trên nền sáng, tối và các chất liệu khác nhau'
      ],
      deliverables: ['Brand identity system', 'Brand guideline']
    },
    {
      id: 5,
      num: '05',
      title: 'Định hướng thiết kế sản phẩm',
      subtitle: 'Product Design Direction & Furniture DNA',
      icon: Sofa,
      badge: 'Giai đoạn 5',
      description: 'Xác lập ngôn ngữ thiết kế đồng bộ cho toàn bộ dòng sản phẩm nội thất từ kiểu dáng, vật liệu đến tính công năng.',
      tasks: [
        'Xây dựng design language cho furniture',
        'Định hướng hình dáng, tỷ lệ và chi tiết',
        'Lựa chọn vật liệu và hoàn thiện bề mặt',
        'Định hướng màu sắc sản phẩm',
        'Thiết kế collection hoặc product family',
        'Xây dựng tên và mã sản phẩm',
        'Phối hợp với designer/kỹ sư để phát triển prototype',
        'Kiểm tra tính công năng, độ bền và khả năng sản xuất'
      ],
      deliverables: ['Product design direction', 'Collection concept', 'Material board', 'Prototype hoặc bản vẽ kỹ thuật'],
      note: 'Lưu ý: Phần chế tạo khuôn, kỹ thuật sản xuất, chứng nhận an toàn và kiểm định chất lượng có thể cần đội ngũ riêng.'
    },
    {
      id: 6,
      num: '06',
      title: 'Thiết kế bao bì và trải nghiệm sản phẩm',
      subtitle: 'Packaging Design & Unboxing Touchpoints',
      icon: Package,
      badge: 'Giai đoạn 6',
      description: 'Thiết kế hệ thống bao bì đóng gói bảo vệ an toàn và các điểm chạm gia tăng trải nghiệm mở hộp cho khách hàng.',
      tasks: [
        'Bao bì vận chuyển',
        'Tem nhãn, tag sản phẩm',
        'Hướng dẫn lắp ráp và bảo quản',
        'Thẻ bảo hành',
        'Certificate hoặc product story card',
        'Thiết kế trải nghiệm mở hộp',
        'Quy chuẩn đóng gói cho hàng cồng kềnh'
      ],
      deliverables: ['Packaging system', 'Các file artwork sản xuất']
    },
    {
      id: 7,
      num: '07',
      title: 'Thiết kế các điểm chạm thương hiệu',
      subtitle: 'Brand Touchpoints & Sales Materials',
      icon: Globe,
      badge: 'Giai đoạn 7',
      description: 'Đồng bộ hóa nhận diện thương hiệu trên các kênh số, tài liệu bán hàng, truyền thông và không gian showroom.',
      tasks: [
        'Website hoặc e-commerce',
        'Catalog và lookbook',
        'Social media template',
        'Profile công ty',
        'Name card, email signature',
        'Signage showroom',
        'Đồng phục hoặc vật phẩm thương hiệu',
        'POSM, brochure và bảng thông tin sản phẩm',
        'Nội dung mô tả sản phẩm'
      ],
      deliverables: ['Digital guideline', 'Sales materials', 'Showroom materials', 'Content framework']
    },
    {
      id: 8,
      num: '08',
      title: 'Kế hoạch ra mắt thương hiệu',
      subtitle: 'Brand Launch Plan & Go-To-Market',
      icon: Rocket,
      badge: 'Giai đoạn 8',
      description: 'Lên chiến lược và kế hoạch toàn diện để ra mắt thương hiệu, tạo sức hút và kích hoạt các kênh phân phối hiệu quả.',
      tasks: [
        'Chiến lược launch',
        'Concept và key visual cho bộ sưu tập đầu tiên',
        'Kế hoạch chụp ảnh sản phẩm',
        'Nội dung truyền thông',
        'Kế hoạch social media',
        'PR, KOL/KOC hoặc influencer',
        'Sự kiện ra mắt/showroom opening',
        'Kế hoạch bán hàng và phân phối',
        'Bộ tài liệu dành cho đại lý hoặc đối tác'
      ],
      deliverables: ['Launch concept', 'Campaign direction', 'Content plan', 'Sales toolkit']
    }
  ];

  // 3 Scope Levels (Phạm vi chia thành 3 cấp độ)
  const scopeTiers = [
    {
      id: 'basic',
      name: 'Cơ bản',
      tagline: 'Nghiên cứu, định vị, đặt tên, logo và bộ nhận diện cơ bản',
      badge: 'Cấp độ 1',
      description: 'Nghiên cứu, định vị, đặt tên, logo và bộ nhận diện cơ bản.',
      includedWorkgroups: [1, 2, 3, 4],
      scopeSummary: 'Nghiên cứu, định vị, đặt tên, logo và bộ nhận diện cơ bản.',
      deliverables: [
        'Brand strategy, customer profile, positioning statement, brand direction',
        'Brand platform và messaging framework',
        'Tên thương hiệu chính, tên dòng sản phẩm, rationale của tên',
        'Brand identity system và brand guideline'
      ],
      bestFor: 'Thương hiệu nội thất mới bắt đầu cần xây dựng nhanh nền tảng và bộ nhận diện chuẩn mực.'
    },
    {
      id: 'standard',
      name: 'Tiêu chuẩn',
      tagline: 'Toàn bộ phần cơ bản + Chiến lược sản phẩm, bao bì, website, catalog và showroom',
      badge: 'Cấp độ 2 (Phổ biến)',
      popular: true,
      description: 'Bao gồm toàn bộ phần cơ bản, cộng thêm chiến lược sản phẩm, bao bì, website, catalog và bộ nhận diện showroom.',
      includedWorkgroups: [1, 2, 3, 4, 5, 6, 7],
      scopeSummary: 'Bao gồm toàn bộ phần cơ bản, cộng thêm chiến lược sản phẩm, bao bì, website, catalog và bộ nhận diện showroom.',
      deliverables: [
        'Toàn bộ hạng mục của Cấp độ Cơ bản (1-4)',
        'Product design direction, collection concept, material board, prototype/bản vẽ kỹ thuật',
        'Packaging system và các file artwork sản xuất',
        'Digital guideline, sales materials, showroom materials và content framework'
      ],
      bestFor: 'Doanh nghiệp nội thất chuẩn bị mở showroom, bán hàng đa kênh hoặc mở rộng đại lý.'
    },
    {
      id: 'comprehensive',
      name: 'Toàn diện',
      tagline: 'Chiến lược thương hiệu, collection, prototype, sản xuất, launch campaign, showroom & thương mại',
      badge: 'Cấp độ 3 (Trọn gói)',
      description: 'Bao gồm chiến lược thương hiệu, phát triển collection, prototype, sản xuất, launch campaign, nội dung, showroom và triển khai thương mại.',
      includedWorkgroups: [1, 2, 3, 4, 5, 6, 7, 8],
      scopeSummary: 'Bao gồm chiến lược thương hiệu, phát triển collection, prototype, sản xuất, launch campaign, nội dung, showroom và triển khai thương mại.',
      deliverables: [
        'Toàn bộ hạng mục của Cấp độ Tiêu chuẩn (1-7)',
        'Đồng hành hoàn thiện prototype & kiểm tra khả năng sản xuất',
        'Launch concept, campaign direction, content plan và sales toolkit',
        'Kế hoạch ra mắt/showroom opening & bộ tài liệu đại lý/đối tác'
      ],
      bestFor: 'Dự án tạo dựng thương hiệu nội thất mới quy mô lớn, đầu tư bài bản từ R&D đến Go-To-Market.'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#202124]">
      {/* Header Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <Palette className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-slate-900">Scope Tạo Dựng Furniture Brand</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => exportScopeToPdf(service, { customTitle: 'Scope Tạo Dựng Thương Hiệu Nội Thất Mới (Brand Design Scope)' })}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 transition-all cursor-pointer px-3 py-1.5 rounded-lg shadow-2xs"
              title="Xuất tài liệu phạm vi công việc ra file PDF"
            >
              <Printer className="w-3.5 h-3.5 text-slate-700" />
              <span>Xuất PDF</span>
            </button>

            {!hideBack && (
              <button 
                onClick={onBack}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>{backTitle || 'Quay lại'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        {/* Top Hero Banner */}
        <div className="relative bg-[#fafafa] border border-slate-200/90 rounded-3xl p-6 sm:p-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-slate-200/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="relative z-10 space-y-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200/90 rounded-full text-xs font-mono text-slate-700 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-slate-900 animate-pulse" />
                <span>FURNITURE BRAND CREATION & IDENTITY ARCHITECTURE</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Scope Tạo Dựng Thương Hiệu Nội Thất Mới (Furniture Brand)
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Hệ thống quy chuẩn chuyên sâu gồm <strong>8 nhóm công việc cốt lõi</strong> từ nghiên cứu chiến lược, xây dựng nền tảng, thiết kế nhận diện, định hướng thiết kế sản phẩm (Furniture DNA) đến bao bì, điểm chạm showroom và chiến dịch ra mắt thị trường.
              </p>
            </div>

            {/* 3 Interactive Clickable Graphic Stat Metric Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-4 border-t border-slate-200/80">
              {/* Block 1: Khối lượng công việc -> loads 'workgroups' */}
              <button
                type="button"
                onClick={() => setActiveTab('workgroups')}
                className={`group relative text-left rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between gap-3 overflow-hidden cursor-pointer border ${
                  activeTab === 'workgroups'
                    ? 'bg-white border-slate-900 ring-1 ring-slate-900/10 shadow-xs text-slate-900'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    activeTab === 'workgroups' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                  }`}>
                    <Workflow className="w-4.5 h-4.5" />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                    activeTab === 'workgroups'
                      ? 'text-slate-900 bg-slate-100 font-semibold border-slate-300'
                      : 'text-slate-500 bg-slate-50 border-slate-200'
                  }`}>
                    STAGE 01-08
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-medium">
                    Khối lượng công việc
                  </div>
                  <div className="text-base font-bold text-slate-900 tracking-tight">
                    8 Giai đoạn
                  </div>
                  <div className="text-xs flex items-center justify-between pt-1.5 border-t border-slate-100 text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${activeTab === 'workgroups' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      <span>42+ Hạng mục chi tiết</span>
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeTab === 'workgroups' ? 'translate-x-0.5 text-slate-900' : 'text-slate-400 group-hover:translate-x-0.5'}`} />
                  </div>
                </div>
              </button>

              {/* Block 2: Cấp độ triển khai -> loads 'tiers' */}
              <button
                type="button"
                onClick={() => setActiveTab('tiers')}
                className={`group relative text-left rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between gap-3 overflow-hidden cursor-pointer border ${
                  activeTab === 'tiers'
                    ? 'bg-white border-slate-900 ring-1 ring-slate-900/10 shadow-xs text-slate-900'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    activeTab === 'tiers' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                  }`}>
                    <Layers className="w-4.5 h-4.5" />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                    activeTab === 'tiers'
                      ? 'text-slate-900 bg-slate-100 font-semibold border-slate-300'
                      : 'text-slate-500 bg-slate-50 border-slate-200'
                  }`}>
                    3 TIERS
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-medium">
                    Cấp độ triển khai
                  </div>
                  <div className="text-base font-bold text-slate-900 tracking-tight">
                    3 Cấp độ
                  </div>
                  <div className="text-xs flex items-center justify-between pt-1.5 border-t border-slate-100 text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${activeTab === 'tiers' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      <span>Cơ bản • Chuẩn • Toàn diện</span>
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeTab === 'tiers' ? 'translate-x-0.5 text-slate-900' : 'text-slate-400 group-hover:translate-x-0.5'}`} />
                  </div>
                </div>
              </button>

              {/* Block 3: Chuẩn bàn giao -> loads 'deliverables' */}
              <button
                type="button"
                onClick={() => setActiveTab('deliverables')}
                className={`group relative text-left rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between gap-3 overflow-hidden cursor-pointer border ${
                  activeTab === 'deliverables'
                    ? 'bg-white border-slate-900 ring-1 ring-slate-900/10 shadow-xs text-slate-900'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    activeTab === 'deliverables' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                  }`}>
                    <FolderLock className="w-4.5 h-4.5" />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                    activeTab === 'deliverables'
                      ? 'text-slate-900 bg-slate-100 font-semibold border-slate-300'
                      : 'text-slate-500 bg-slate-50 border-slate-200'
                  }`}>
                    READY
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-medium">
                    Chuẩn bàn giao
                  </div>
                  <div className="text-base font-bold text-slate-900 tracking-tight">
                    Master Toolkits
                  </div>
                  <div className="text-xs flex items-center justify-between pt-1.5 border-t border-slate-100 text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${activeTab === 'deliverables' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      <span>Vector & Source Production</span>
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeTab === 'deliverables' ? 'translate-x-0.5 text-slate-900' : 'text-slate-400 group-hover:translate-x-0.5'}`} />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* TAB 1: DETAILED WORKGROUPS (COLLAPSIBLE ACCORDION) */}
        {activeTab === 'workgroups' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 border border-slate-200 p-4 sm:p-5 rounded-2xl">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-900" />
                  <span className="text-2xs font-mono uppercase tracking-widest text-slate-500 font-semibold">
                    Core Workgroups Breakdown
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-0.5">
                  Chi Tiết 8 Nhóm Công Việc Xây Dựng Thương Hiệu Furniture
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click vào từng nhóm để mở rộng/thu gọn chi tiết hạng mục và deliverables
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <span className="text-xs font-mono text-slate-500 bg-white border border-slate-200 px-2.5 py-1.5 rounded-lg">
                  Đang mở: <strong className="text-slate-900">{openedWorkgroups.length}/8</strong>
                </span>
                <button
                  type="button"
                  onClick={expandAllWorkgroups}
                  className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                >
                  Mở tất cả
                </button>
                <button
                  type="button"
                  onClick={collapseAllWorkgroups}
                  className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                >
                  Thu gọn tất cả
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {workgroups.map((wg) => {
                const Icon = wg.icon;
                const isExpanded = openedWorkgroups.includes(wg.id);

                return (
                  <div
                    key={wg.id}
                    className={`border rounded-2xl transition-all overflow-hidden ${
                      isExpanded
                        ? 'bg-white border-slate-300 shadow-xs'
                        : 'bg-[#fafafa] border-slate-200 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    {/* Workgroup Collapsible Header */}
                    <button
                      type="button"
                      onClick={() => toggleWorkgroup(wg.id)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-2xs transition-colors ${
                          isExpanded ? 'bg-slate-900 text-white' : 'bg-slate-200/80 text-slate-800'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] font-mono font-bold text-slate-400">GIAI ĐOẠN {wg.num}</span>
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-mono rounded-md font-medium border border-slate-200/60">
                              {wg.badge}
                            </span>
                          </div>
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                            {wg.title}
                          </h3>
                          <p className="text-xs text-slate-500 truncate">{wg.subtitle}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="hidden sm:inline-block text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60">
                          {wg.tasks.length} hạng mục
                        </span>
                        <div className={`w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 transition-all ${
                          isExpanded ? 'bg-slate-900 text-white border-slate-900 rotate-180' : 'bg-white hover:bg-slate-50'
                        }`}>
                          <ChevronDown className="w-4 h-4 transition-transform" />
                        </div>
                      </div>
                    </button>

                    {/* Workgroup Collapsible Content */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: 'easeInOut' }}
                          className="border-t border-slate-100 px-5 sm:px-6 pb-6 pt-4 space-y-5"
                        >
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/60">
                            {wg.description}
                          </p>

                          {/* Task List */}
                          <div className="space-y-2.5">
                            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                              Các hạng mục công việc thực thi ({wg.tasks.length}):
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                              {wg.tasks.map((task, idx) => (
                                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-white border border-slate-100 p-2.5 rounded-xl shadow-2xs">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                  <span className="leading-relaxed font-medium">{task}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Deliverables Section */}
                          <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 space-y-3">
                            <div className="flex items-center gap-2">
                              <FileCheck className="w-4 h-4 text-amber-400" />
                              <span className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold">
                                Deliverables (Sản phẩm bàn giao):
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {wg.deliverables.map((item, dIdx) => (
                                <span key={dIdx} className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-100 font-medium">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Specialized Note if applicable */}
                          {wg.note && (
                            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                              <span>{wg.note}</span>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: 3 SCOPE TIERS (CƠ BẢN, TIÊU CHUẨN, TOÀN DIỆN) */}
        {activeTab === 'tiers' && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">3 Cấp Độ Phạm Vi Triển Khai (Scope Tiers)</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Linh hoạt tùy chỉnh theo mục tiêu tăng trưởng, quy mô ngân sách và lộ trình ra mắt thực tế của thương hiệu nội thất.
              </p>
            </div>

            {/* Level Selector Pills */}
            <div className="flex justify-center">
              <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 gap-1">
                {scopeTiers.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id as any)}
                    className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      selectedTier === tier.id
                        ? 'bg-white text-slate-900 shadow-2xs font-extrabold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tier.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Tier Deep Dive Card */}
            {(() => {
              const activeTierObj = scopeTiers.find((t) => t.id === selectedTier) || scopeTiers[1];
              return (
                <div className="bg-[#fafafa] border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-8">
                  {/* Tier Title and Tagline */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-slate-900 text-white rounded-md text-2xs font-mono font-bold">
                        {activeTierObj.badge}
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight">{activeTierObj.name}</h3>
                      <p className="text-xs text-slate-500 font-mono">{activeTierObj.tagline}</p>
                    </div>

                    <div className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-2xs">
                      Phạm vi: <strong className="text-slate-900">{activeTierObj.includedWorkgroups.length} / 8 Nhóm việc</strong>
                    </div>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed">
                    {activeTierObj.description}
                  </p>

                  {/* Matrix comparison of 8 Workgroups for this Tier */}
                  <div className="space-y-3">
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                      Ma trận các nhóm công việc bao gồm:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {workgroups.map((wg) => {
                        const isIncluded = activeTierObj.includedWorkgroups.includes(wg.id);
                        const Icon = wg.icon;

                        return (
                          <div
                            key={wg.id}
                            className={`p-4 rounded-2xl border transition-all ${
                              isIncluded
                                ? 'bg-white border-slate-300 shadow-2xs text-slate-900'
                                : 'bg-slate-50/60 border-slate-200/60 opacity-40 text-slate-400'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                isIncluded ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-400'
                              }`}>
                                <Icon className="w-4 h-4" />
                              </div>
                            </div>
                            <div className="text-xs font-bold">{wg.num}. {wg.title}</div>
                            <div className="text-2xs text-slate-500 mt-1 line-clamp-1">{wg.badge}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Summary of Deliverables */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="w-5 h-5 text-slate-900" />
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                        Sản phẩm bàn giao chính thức cho cấp độ {activeTierObj.name}:
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeTierObj.deliverables.map((d, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2.5 text-xs text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0" />
                          <span className="font-medium">{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Best For Scenario */}
                  <div className="p-4 bg-slate-100 border border-slate-200 rounded-2xl flex items-start gap-3">
                    <Target className="w-4.5 h-4.5 text-slate-700 shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-700 leading-relaxed">
                      <strong className="text-slate-900">Phù hợp nhất cho: </strong>
                      {activeTierObj.bestFor}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* TAB 4: MASTER DELIVERABLES CATALOG */}
        {activeTab === 'deliverables' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Hồ Sơ Bàn Giao Tổng Thể (Master Deliverables)</h2>
              <p className="text-xs text-slate-500 mt-0.5">Danh mục tài liệu hoàn chỉnh sẵn sàng cho sản xuất, đăng ký và thương mại hóa</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workgroups.map((wg) => (
                <div key={wg.id} className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-mono font-bold">
                        {wg.num}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{wg.title}</h4>
                        <p className="text-2xs text-slate-400 font-mono">{wg.subtitle}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {wg.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                        <FileCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
