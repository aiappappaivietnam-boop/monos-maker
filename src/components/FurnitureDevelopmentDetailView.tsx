/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Microscope, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  Building2, 
  Layers, 
  ShieldCheck, 
  Factory, 
  FileText, 
  Sparkles,
  Users,
  Layout,
  Clock,
  Zap,
  CheckCircle2,
  Box,
  Wallet,
  Rocket,
  BarChart,
  Compass,
  FileCheck,
  Target,
  BadgeCheck,
  Workflow,
  AlertCircle,
  Briefcase,
  FolderLock,
  Printer
} from 'lucide-react';
import { Service } from '../types';
import { exportScopeToPdf } from '../lib/exportScopePdf';

interface FurnitureDevelopmentDetailViewProps {
  service: Service;
  onBack: () => void;
  backTitle?: string;
  hideBack?: boolean;
}

export default function FurnitureDevelopmentDetailView({ 
  service, 
  onBack, 
  backTitle = 'Quay lại',
  hideBack 
}: FurnitureDevelopmentDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'areas' | 'model' | 'targets'>('roadmap');
  const [openedPhases, setOpenedPhases] = useState<number[]>([1, 2]);

  const togglePhase = (phaseNum: number) => {
    setOpenedPhases(prev => 
      prev.includes(phaseNum) ? prev.filter(x => x !== phaseNum) : [...prev, phaseNum]
    );
  };

  const expandAllPhases = () => {
    setOpenedPhases([1, 2, 3, 4, 5, 6, 7]);
  };

  const collapseAllPhases = () => {
    setOpenedPhases([]);
  };

  // 7 Phases of R&D Center Implementation Roadmap
  const roadmapSteps = [
    { 
      phase: 1, 
      phaseCode: '01', 
      title: 'Xác lập định hướng & Chiến lược R&D', 
      subtitle: 'Strategic Direction & Core Mission Definition',
      time: '0–2 tháng', 
      icon: Compass,
      badge: 'Giai đoạn 1',
      desc: 'Xác định mục tiêu cốt lõi, danh mục sản phẩm ưu tiên, phân khúc thị trường xuất khẩu, dự toán ngân sách và chỉ định nhân sự chủ trì.',
      tasks: [
        'Xác định bài toán trọng tâm của doanh nghiệp và phân khúc sản phẩm mục tiêu',
        'Khảo sát sơ bộ nguồn lực nội bộ, công nghệ sẵn có và khoảng trống năng lực sản xuất',
        'Lập dự toán tài chính khung Capex/Opex và lộ trình đầu tư theo từng mốc thời gian',
        'Chỉ định Giám đốc Trung tâm R&D và thành lập Tổ công tác trù bị (5–7 nhân sự nòng cốt)'
      ],
      deliverables: ['Bản định hướng chiến lược R&D', 'Quyết định thành lập ban dự án', 'Khung dự toán ngân sách sơ bộ']
    },
    { 
      phase: 2, 
      phaseCode: '02', 
      title: 'Nghiên cứu tiền khả thi (Feasibility Study)', 
      subtitle: 'Technical Feasibility & Financial Modeling',
      time: '2–5 tháng', 
      icon: Microscope,
      badge: 'Giai đoạn 2',
      desc: 'Khảo sát thị trường chuyên sâu, đối thủ cạnh tranh, nhu cầu liên kết chuỗi cung ứng, thiết bị phòng lab và mô hình tài chính hoàn vốn.',
      tasks: [
        'Khảo sát chuỗi cung ứng vật liệu, phụ kiện kim khí và công nghệ sơn phủ tiên tiến',
        'Đánh giá danh mục máy móc thiết bị: CNC 5 trục, máy ép định hình, buồng test BIFMA',
        'Khảo sát mặt bằng: Cải tạo nhà xưởng sẵn có vs. Xây mới độc lập',
        'Xây dựng mô hình tài chính hoàn vốn (Capex/Opex) và phương án tự chủ chi phí vận hành'
      ],
      deliverables: ['Báo cáo nghiên cứu tiền khả thi', 'Ma trận so sánh địa điểm mặt bằng', 'Kế hoạch danh mục thiết bị & máy móc']
    },
    { 
      phase: 3, 
      phaseCode: '03', 
      title: 'Thiết kế mô hình & Quy trình vận hành', 
      subtitle: 'Organizational Architecture & SOP Workflows',
      time: '5–8 tháng', 
      icon: Layout,
      badge: 'Giai đoạn 3',
      desc: 'Xây dựng cơ cấu tổ chức, quy trình R&D chuẩn mực, cơ chế quản trị tài sản trí tuệ (IP), danh mục gói dịch vụ và thiết kế kiến trúc mặt bằng.',
      tasks: [
        'Thiết kế sơ đồ mặt bằng chi tiết 7 khu chức năng (1.500–2.000 m²)',
        'Xây dựng quy trình luân chuyển từ ý tưởng → thiết kế 3D → mẫu 1:1 → KCS & Golden Sample',
        'Thiết lập quy chế bảo mật công nghệ và đăng ký sở hữu trí tuệ bản quyền thiết kế',
        'Soạn thảo cơ chế hợp tác, phân chia chi phí và bản quyền với đối tác thành viên'
      ],
      deliverables: ['Bản vẽ layout 2D/3D mặt bằng', 'Quy chế quản trị R&D & IP', 'SOP luồng công việc chuẩn']
    },
    { 
      phase: 4, 
      phaseCode: '04', 
      title: 'Vận hành thí điểm (Pilot Operations)', 
      subtitle: 'Lean Team Ramp-up & Prototype Testing',
      time: '8–14 tháng', 
      icon: Zap,
      badge: 'Giai đoạn 4',
      desc: 'Khởi động nhóm R&D tinh gọn, thuê ngoài phòng lab thử nghiệm, thực hiện 3–5 dự án phát triển sản phẩm thí điểm đầu tiên.',
      tasks: [
        'Tuyển dụng và vận hành nhóm R&D nòng cốt ban đầu (8–10 nhân sự)',
        'Thuê ngoài các phép thử tải trọng cơ học và độ bền màng sơn với đơn vị kiểm định độc lập',
        'Triển khai dự án thí điểm: BST nội thất hoàn chỉnh hoặc vật liệu composite mới',
        'Rút kinh nghiệm thực tế để tinh chỉnh quy trình và thiết kế đồ gá chuyên dụng'
      ],
      deliverables: ['Golden Sample dự án thí điểm', 'Báo cáo kiểm định độc lập', 'Đánh giá năng lực Pilot']
    },
    { 
      phase: 5, 
      phaseCode: '05', 
      title: 'Đầu tư cơ sở chính & Lắp đặt máy móc', 
      subtitle: 'Facility Construction & Lab Calibration',
      time: '12–24 tháng', 
      icon: Factory,
      badge: 'Giai đoạn 5',
      desc: 'Cải tạo hoặc xây dựng mặt bằng chính thức, tiếp nhận và cân chỉnh thiết bị kiểm định, tuyển dụng đủ định biên và khánh thành trung tâm.',
      tasks: [
        'Thi công hoàn thiện các khu chức năng, hệ thống hút bụi trung tâm và xử lý khí thải',
        'Nhập khẩu, lắp đặt và hiệu chuẩn dàn máy CNC, máy đo 3D và buồng test cơ lý tính',
        'Tuyển dụng và đào tạo chuyên sâu đội ngũ kỹ sư vật liệu, kết cấu và thợ mẫu bậc cao',
        'Tổ chức lễ ra mắt Trung tâm R&D và công bố thỏa thuận hợp tác chiến lược'
      ],
      deliverables: ['Biên bản nghiệm thu cơ sở vật chất', 'Chứng nhận kiểm định thiết bị', 'Bàn giao vận hành chính thức']
    },
    { 
      phase: 6, 
      phaseCode: '06', 
      title: 'Mở rộng dịch vụ & Thương mại hóa', 
      subtitle: 'Commercial Service Expansion & Lab Accreditation',
      time: '24–36 tháng', 
      icon: Briefcase,
      badge: 'Giai đoạn 6',
      desc: 'Mở rộng cung cấp dịch vụ R&D cho các đối tác trong ngành, thương mại hóa bản quyền thiết kế, nâng cấp phòng lab đạt chuẩn quốc tế.',
      tasks: [
        'Cung cấp dịch vụ đo kiểm, thử nghiệm và làm mẫu thương mại cho doanh nghiệp bên ngoài',
        'Tổ chức hội thảo xu hướng thiết kế và giới thiệu vật liệu nội thất hàng năm',
        'Đăng ký chứng nhận phòng thí nghiệm đạt chuẩn quốc tế ISO/IEC 17025',
        'Thương mại hóa danh mục 10–15 sản phẩm nội thất độc quyền ra thị trường'
      ],
      deliverables: ['Hợp đồng dịch vụ thương mại', 'Chứng nhận ISO/IEC 17025', 'Báo cáo doanh thu dịch vụ độc lập']
    },
    { 
      phase: 7, 
      phaseCode: '07', 
      title: 'Trưởng thành & Hội nhập Quốc tế', 
      subtitle: 'Global Innovation Hub & Self-Sustainability',
      time: '36–60 tháng', 
      icon: Rocket,
      badge: 'Giai đoạn 7',
      desc: 'Liên kết với các viện thiết kế danh tiếng thế giới, dẫn dắt tiêu chuẩn chất lượng ngành gỗ nội thất và tự chủ ngân sách hoạt động.',
      tasks: [
        'Hợp tác nghiên cứu vật liệu sinh thái và tuần hoàn với các trường đại học quốc tế',
        'Tham gia ban cố vấn xây dựng tiêu chuẩn kỹ thuật nội thất cấp quốc gia',
        'Đạt tỷ lệ tự chủ tài chính trên 50% từ nguồn doanh thu R&D và chia sẻ bản quyền',
        'Khẳng định vị thế Trung tâm đổi mới sáng tạo dẫn đầu khu vực Đông Nam Á'
      ],
      deliverables: ['Bằng sáng chế & Giải thưởng quốc tế', 'Báo cáo tự chủ tài chính', 'Mạng lưới viện liên kết toàn cầu']
    }
  ];

  // 7 Functional Areas
  const functionalAreas = [
    { 
      id: 1,
      area: "Nghiên cứu thị trường & Thiết kế sáng tạo (Design Studio)", 
      size: "150–250 m²",
      icon: Compass,
      desc: 'Không gian mở trang bị máy trạm đồ họa chuyên dụng, bảng tương tác, thư viện moodboard và khu thảo luận ý tưởng concept.'
    },
    { 
      id: 2,
      area: "Thư viện vật liệu & Showroom mẫu vật (Material CMF Lab)", 
      size: "150–250 m²",
      icon: Layers,
      desc: 'Lưu trữ hàng ngàn mẫu gỗ, veneer, đá, kim loại, da vải bọc nỉ, phụ kiện ngũ kim và bảng hoàn thiện bề mặt (Finishing).'
    },
    { 
      id: 3,
      area: "Xưởng chế tạo Prototype, CNC & Làm mẫu 1:1", 
      size: "500–700 m²",
      icon: Factory,
      desc: 'Trang bị máy phay CNC 5 trục, máy cưa bàn trượt, máy dán cạnh, in 3D công nghiệp và bàn gia công mộc thủ công tinh xảo.'
    },
    { 
      id: 4,
      area: "Phòng thử nghiệm tải trọng & Kiểm định cơ lý tính (Test Lab)", 
      size: "250–400 m²",
      icon: ShieldCheck,
      desc: 'Hệ thống máy kiểm tra độ bền mỏi chu kỳ, máy nén tĩnh tải trọng, máy thả rơi đệm theo chuẩn BIFMA X5.1 và EN 12520.'
    },
    { 
      id: 5,
      area: "Khu hoàn thiện bề mặt, Sơn mẫu & Xử lý vật liệu", 
      size: "100–150 m²",
      icon: Sparkles,
      desc: 'Phòng phun sơn áp lực dương khép kín, buồng sấy UV/hồng ngoại, khu thử nghiệm lau dầu tự nhiên và xử lý chống ẩm mốc.'
    },
    { 
      id: 6,
      area: "Phòng đào tạo, Hội thảo chuyên đề & Workshop", 
      size: "200–300 m²",
      icon: Users,
      desc: 'Không gian đa năng phục vụ đào tạo chuyển giao công nghệ cho công nhân nhà xưởng và tổ chức hội thảo cùng đối tác.'
    },
    { 
      id: 7,
      area: "Văn phòng quản trị, Kho lưu mẫu kỹ thuật & Logistics", 
      size: "300–500 m²",
      icon: Layout,
      desc: 'Khu làm việc của ban giám đốc, quản lý dự án R&D, khu lưu trữ Golden Sample đã ký duyệt và giao nhận nguyên vật liệu.'
    }
  ];

  // 10 Immediate Action Tasks for Day 1-30
  const immediateActions = [
    "Chỉ định Người đứng đầu dự án (R&D Director) & Thành lập Ban trù bị",
    "Xác định danh mục sản phẩm & Thị trường xuất khẩu ưu tiên",
    "Khảo sát năng lực xưởng hiện hữu & Khoảng trống công nghệ",
    "Lập danh sách đối tác viện nghiên cứu, trường đại học & lab kiểm định",
    "Xây dựng danh mục máy móc thiết bị phòng lab & Phần mềm CAD/CAM",
    "Lựa chọn phương án mặt bằng (Cải tạo nhà xưởng vs. Xây mới)",
    "Lập dự toán đầu tư Capex & Ngân sách vận hành Opex 3 năm",
    "Lựa chọn dự án phát triển sản phẩm thí điểm (Pilot Project) đầu tiên",
    "Xây dựng khung cơ chế bảo hộ tài sản trí tuệ & Phân quyền bảo mật",
    "Hoàn thiện Báo cáo nghiên cứu tiền khả thi trình Hội đồng quản trị"
  ];

  return (
    <div className="min-h-screen bg-white text-[#202124]">
      {/* Header Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <Microscope className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-slate-900">Design - R&D Center Plan</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => exportScopeToPdf(service, { customTitle: 'Kế Hoạch Xây Dựng Trung Tâm R&D Nội Thất (Design - R&D Center Plan)' })}
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
                <span>FURNITURE R&D CENTER ARCHITECTURE & ROADMAP</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Design - R&D Center Plan
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Kế hoạch tổng thể xây dựng Trung tâm R&D nội thất theo mô hình doanh nghiệp làm chủ đầu tư, 
                tập trung làm chủ công nghệ, đổi mới sáng tạo vật liệu và phát triển sản phẩm thương mại đạt chuẩn quốc tế.
              </p>
            </div>

            {/* 4 Interactive Clickable Graphic Stat Metric Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4 border-t border-slate-200/80">
              {/* Block 1: Lộ trình triển khai -> loads 'roadmap' */}
              <button
                type="button"
                onClick={() => setActiveTab('roadmap')}
                className={`group relative text-left rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between gap-3 overflow-hidden cursor-pointer border ${
                  activeTab === 'roadmap'
                    ? 'bg-white border-slate-900 ring-1 ring-slate-900/10 shadow-xs text-slate-900'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    activeTab === 'roadmap' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                  }`}>
                    <Workflow className="w-4.5 h-4.5" />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                    activeTab === 'roadmap'
                      ? 'text-slate-900 bg-slate-100 font-semibold border-slate-300'
                      : 'text-slate-500 bg-slate-50 border-slate-200'
                  }`}>
                    STAGE 01-07
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-medium">
                    Lộ trình triển khai
                  </div>
                  <div className="text-base font-bold text-slate-900 tracking-tight">
                    7 Giai đoạn
                  </div>
                  <div className="text-xs flex items-center justify-between pt-1.5 border-t border-slate-100 text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${activeTab === 'roadmap' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      <span>36–60 tháng hoàn thiện</span>
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeTab === 'roadmap' ? 'translate-x-0.5 text-slate-900' : 'text-slate-400 group-hover:translate-x-0.5'}`} />
                  </div>
                </div>
              </button>

              {/* Block 2: Quy hoạch mặt bằng -> loads 'areas' */}
              <button
                type="button"
                onClick={() => setActiveTab('areas')}
                className={`group relative text-left rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between gap-3 overflow-hidden cursor-pointer border ${
                  activeTab === 'areas'
                    ? 'bg-white border-slate-900 ring-1 ring-slate-900/10 shadow-xs text-slate-900'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    activeTab === 'areas' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                  }`}>
                    <Layout className="w-4.5 h-4.5" />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                    activeTab === 'areas'
                      ? 'text-slate-900 bg-slate-100 font-semibold border-slate-300'
                      : 'text-slate-500 bg-slate-50 border-slate-200'
                  }`}>
                    7 AREAS
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-medium">
                    Quy hoạch mặt bằng
                  </div>
                  <div className="text-base font-bold text-slate-900 tracking-tight">
                    1.500–2.000 m²
                  </div>
                  <div className="text-xs flex items-center justify-between pt-1.5 border-t border-slate-100 text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${activeTab === 'areas' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      <span>7 Phân khu chức năng</span>
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeTab === 'areas' ? 'translate-x-0.5 text-slate-900' : 'text-slate-400 group-hover:translate-x-0.5'}`} />
                  </div>
                </div>
              </button>

              {/* Block 3: Mô hình & Đội ngũ -> loads 'model' */}
              <button
                type="button"
                onClick={() => setActiveTab('model')}
                className={`group relative text-left rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between gap-3 overflow-hidden cursor-pointer border ${
                  activeTab === 'model'
                    ? 'bg-white border-slate-900 ring-1 ring-slate-900/10 shadow-xs text-slate-900'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    activeTab === 'model' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                  }`}>
                    <Users className="w-4.5 h-4.5" />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                    activeTab === 'model'
                      ? 'text-slate-900 bg-slate-100 font-semibold border-slate-300'
                      : 'text-slate-500 bg-slate-50 border-slate-200'
                  }`}>
                    2 MODELS
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-medium">
                    Mô hình & Đội ngũ
                  </div>
                  <div className="text-base font-bold text-slate-900 tracking-tight">
                    10–15 Nhân sự
                  </div>
                  <div className="text-xs flex items-center justify-between pt-1.5 border-t border-slate-100 text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${activeTab === 'model' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      <span>Chủ đầu tư & Open Lab</span>
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeTab === 'model' ? 'translate-x-0.5 text-slate-900' : 'text-slate-400 group-hover:translate-x-0.5'}`} />
                  </div>
                </div>
              </button>

              {/* Block 4: Mục tiêu & Dự án thí điểm -> loads 'targets' */}
              <button
                type="button"
                onClick={() => setActiveTab('targets')}
                className={`group relative text-left rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between gap-3 overflow-hidden cursor-pointer border ${
                  activeTab === 'targets'
                    ? 'bg-white border-slate-900 ring-1 ring-slate-900/10 shadow-xs text-slate-900'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    activeTab === 'targets' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                  }`}>
                    <Rocket className="w-4.5 h-4.5" />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                    activeTab === 'targets'
                      ? 'text-slate-900 bg-slate-100 font-semibold border-slate-300'
                      : 'text-slate-500 bg-slate-50 border-slate-200'
                  }`}>
                    3-YEAR KPIS
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-medium">
                    Mục tiêu & Thí điểm
                  </div>
                  <div className="text-base font-bold text-slate-900 tracking-tight">
                    5 Dự án Pilot
                  </div>
                  <div className="text-xs flex items-center justify-between pt-1.5 border-t border-slate-100 text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${activeTab === 'targets' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      <span>ISO 17025 & Tự chủ chi phí</span>
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeTab === 'targets' ? 'translate-x-0.5 text-slate-900' : 'text-slate-400 group-hover:translate-x-0.5'}`} />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* TAB 1: DETAILED ROADMAP (COLLAPSIBLE ACCORDION) */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 border border-slate-200 p-4 sm:p-5 rounded-2xl">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-900" />
                  <span className="text-2xs font-mono uppercase tracking-widest text-slate-500 font-semibold">
                    Implementation Roadmap Breakdown
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-0.5">
                  Lộ Trình 7 Giai Đoạn Xây Dựng Trung Tâm R&D Nội Thất
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click vào từng giai đoạn để mở rộng/thu gọn chi tiết hạng mục công việc và kết quả bàn giao
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <span className="text-xs font-mono text-slate-500 bg-white border border-slate-200 px-2.5 py-1.5 rounded-lg">
                  Đang mở: <strong className="text-slate-900">{openedPhases.length}/7</strong>
                </span>
                <button
                  type="button"
                  onClick={expandAllPhases}
                  className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                >
                  Mở tất cả
                </button>
                <button
                  type="button"
                  onClick={collapseAllPhases}
                  className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                >
                  Thu gọn tất cả
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {roadmapSteps.map((step) => {
                const Icon = step.icon;
                const isExpanded = openedPhases.includes(step.phase);

                return (
                  <div
                    key={step.phase}
                    className={`border rounded-2xl transition-all overflow-hidden ${
                      isExpanded
                        ? 'bg-white border-slate-300 shadow-xs'
                        : 'bg-[#fafafa] border-slate-200 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    {/* Phase Collapsible Header */}
                    <button
                      type="button"
                      onClick={() => togglePhase(step.phase)}
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
                            <span className="text-[11px] font-mono font-bold text-slate-400">GIAI ĐOẠN {step.phaseCode}</span>
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-mono rounded-md font-medium border border-slate-200/60">
                              {step.time}
                            </span>
                          </div>
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                            {step.title}
                          </h3>
                          <p className="text-xs text-slate-500 truncate">{step.subtitle}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="hidden sm:inline-block text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60">
                          {step.tasks.length} hạng mục
                        </span>
                        <div className={`w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 transition-all ${
                          isExpanded ? 'bg-slate-900 text-white border-slate-900 rotate-180' : 'bg-white hover:bg-slate-50'
                        }`}>
                          <ChevronDown className="w-4 h-4 transition-transform" />
                        </div>
                      </div>
                    </button>

                    {/* Phase Collapsible Content */}
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
                            {step.desc}
                          </p>

                          {/* Task List */}
                          <div className="space-y-2.5">
                            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                              Các hạng mục công việc thực thi ({step.tasks.length}):
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                              {step.tasks.map((task, idx) => (
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
                                Deliverables (Kết quả bàn giao):
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {step.deliverables.map((item, dIdx) => (
                                <span key={dIdx} className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-100 font-medium">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* 30-Day Immediate Checklist Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 pointer-events-none" />
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 text-white flex items-center justify-center rounded-xl">
                    <Clock className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-2xs font-mono uppercase tracking-widest text-amber-400 font-bold">Hành động tiên quyết</span>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                      10 Việc cần làm ngay trong 30 ngày đầu
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {immediateActions.map((action, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:bg-slate-800 transition-colors">
                      <span className="w-6 h-6 rounded-lg bg-slate-700 text-white text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-medium text-slate-200 leading-snug">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FUNCTIONAL AREAS (7 KHU CHỨC NĂNG) */}
        {activeTab === 'areas' && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Quy Hoạch 7 Khu Chức Năng (1.500–2.000 m²)</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Bố trí mặt bằng theo nguyên tắc luồng công việc một chiều (One-way Flow) từ ý tưởng, dựng hình 3D, gia công Prototype đến kiểm định độ bền.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {functionalAreas.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-2xs">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-800 font-mono font-bold text-xs rounded-md border border-slate-200/60">
                          {item.size}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1">{item.area}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-2xs font-mono text-slate-400">
                      <span>PHÂN KHU #{item.id}</span>
                      <span className="font-semibold text-emerald-600">TIÊU CHUẨN R&D</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Layout Overview Banner */}
            <div className="p-6 bg-[#fafafa] border border-slate-200 rounded-3xl space-y-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Layout className="w-4.5 h-4.5 text-slate-900" />
                <span>Quy mô diện tích mở rộng: 3.000–5.000 m² sau 3 năm</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Thiết kế không gian linh hoạt, sẵn sàng mở rộng thêm dây chuyền thử nghiệm tự động, máy cắt laser kim loại, 
                phòng kiểm định sương muối chống rỉ và khu vực ươm tạo các dự án khởi nghiệp nội thất (Incubator Hub).
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: INVESTMENT MODEL & TEAM */}
        {activeTab === 'model' && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Mô Hình Đầu Tư & Cơ Cấu Đội Ngũ R&D</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Lựa chọn mô hình vận hành phù hợp với mục tiêu kinh doanh và lộ trình nguồn vốn của doanh nghiệp chủ đầu tư.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Model 1 */}
              <div className="bg-[#fafafa] border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-900 text-white flex items-center justify-center rounded-xl">
                    <Box className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-2xs font-mono uppercase tracking-widest text-slate-500 font-bold">Mô hình 1</span>
                    <h3 className="text-lg font-bold text-slate-900">Trung tâm R&D Nội bộ</h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Phục vụ độc quyền cho các dòng sản phẩm của doanh nghiệp chủ đầu tư, tối ưu bảo mật công nghệ.
                </p>

                <div className="space-y-2">
                  {[
                    'Quy mô tinh gọn: 500–1.200 m²',
                    'Bảo mật tuyệt đối công nghệ cốt lõi, công thức sơn phủ và mẫu mã',
                    'Tạo doanh thu trực tiếp từ các bộ sưu tập nội thất độc quyền thương mại'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-800 bg-white p-3 rounded-xl border border-slate-200/80">
                      <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Model 2 */}
              <div className="bg-[#fafafa] border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-900 text-white flex items-center justify-center rounded-xl">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-2xs font-mono uppercase tracking-widest text-slate-500 font-bold">Mô hình 2</span>
                    <h3 className="text-lg font-bold text-slate-900">Trung tâm R&D Mở (Open Lab)</h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Phục vụ chủ đầu tư kết hợp cung cấp dịch vụ thử nghiệm, đo kiểm và làm mẫu cho các đối tác trong ngành.
                </p>

                <div className="space-y-2">
                  {[
                    'Quy mô tiêu chuẩn: 1.500–2.000 m²',
                    'Trở thành hạt nhân đổi mới sáng tạo của cả hệ sinh thái nội thất xuất khẩu',
                    'Đa dạng hóa nguồn thu từ phí hội viên, hợp đồng dịch vụ lab và đào tạo'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-800 bg-white p-3 rounded-xl border border-slate-200/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Team Structure & Capital */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
                <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Cơ cấu nhân sự ban đầu (10–15 người)</h3>
                </div>

                <div className="space-y-2">
                  {[
                    "1 Giám đốc Trung tâm R&D (R&D Director)",
                    "1 Quản lý dự án & Điều phối thử nghiệm (Project Manager)",
                    "2–3 Nhà thiết kế sản phẩm nội thất (Industrial Designers)",
                    "2 Kỹ sư kết cấu mộng & Vật liệu (Structural Engineers)",
                    "2–3 Thợ mẫu bậc cao & Kỹ thuật viên CNC Prototype",
                    "1 Chuyên viên kiểm định chất lượng & Tiêu chuẩn QC",
                    "1 Chuyên viên phân tích thị trường & Bản quyền sáng chế",
                    "1 Chuyên viên điều phối kinh doanh dịch vụ & Hành chính"
                  ].map((pos, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                      <span className="font-medium">{pos}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
                <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                    <Wallet className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Cơ cấu nguồn vốn & Dòng tiền</h3>
                </div>

                <div className="space-y-2">
                  {[
                    "Vốn đầu tư Capex của doanh nghiệp chủ trì",
                    "Vốn góp chiến lược từ các đối tác trong chuỗi cung ứng",
                    "Hợp đồng thử nghiệm R&D và phí dịch vụ phòng lab thương mại",
                    "Phí hội viên tham gia mạng lưới nghiên cứu chung",
                    "Tài trợ thiết bị từ các hãng máy móc & nguyên vật liệu lớn",
                    "Nguồn vốn từ các quỹ đổi mới sáng tạo & Hỗ trợ khoa học công nghệ",
                    "Doanh thu chia sẻ bản quyền thiết kế (Design Royalty)"
                  ].map((cap, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0" />
                      <span className="font-medium">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PILOT & 3-YEAR TARGETS */}
        {activeTab === 'targets' && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Dự Án Thí Điểm & Chỉ Tiêu 3 Năm</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Lộ trình triển khai thực tế qua các dự án sản phẩm cụ thể và các chỉ số đo lường hiệu quả hoạt động (KPIs).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pilot Projects */}
              <div className="bg-[#fafafa] border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                  <div className="w-10 h-10 bg-slate-900 text-white flex items-center justify-center rounded-xl">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-2xs font-mono uppercase tracking-widest text-slate-500 font-bold">Năm thứ 1</span>
                    <h3 className="text-lg font-bold text-slate-900">3–5 Dự án thí điểm trọng tâm</h3>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {[
                    { title: "BST nội thất phòng khách hoàn chỉnh", desc: "Phát triển từ Concept sketch đến mẫu 1:1 và hồ sơ BOM hoàn chỉnh" },
                    { title: "Ứng dụng vật liệu composite / sinh thái mới", desc: "Tối ưu hóa khả năng chống ẩm và độ bền cơ học cho thị trường nhiệt đới" },
                    { title: "Dòng sản phẩm tối ưu Flat-pack cho E-commerce", desc: "Tăng 30% mật độ xếp cont và vượt qua bài test thả rơi ISTA 3A" },
                    { title: "Dòng sản phẩm thương mại chuẩn BIFMA", desc: "Đạt chứng nhận an toàn kết cấu và tải trọng xuất khẩu Bắc Mỹ" },
                    { title: "Dự án phụ kiện liên kết thông minh không lộ ốc vít", desc: "Rút ngắn 50% thời gian lắp ráp cho người dùng cuối" }
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-1">
                      <div className="font-bold text-xs text-slate-900 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                        <span>{item.title}</span>
                      </div>
                      <p className="text-2xs text-slate-500 pl-3.5 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3-Year KPIs */}
              <div className="bg-[#fafafa] border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                  <div className="w-10 h-10 bg-slate-900 text-white flex items-center justify-center rounded-xl">
                    <BarChart className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-2xs font-mono uppercase tracking-widest text-slate-500 font-bold">Mục tiêu 3 Năm</span>
                    <h3 className="text-lg font-bold text-slate-900">Chỉ tiêu phát triển bền vững</h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: "20–50", label: "Doanh nghiệp hợp tác" },
                    { val: "20–30", label: "Dự án R&D hoàn thành" },
                    { val: "10–15", label: "BST thương mại hóa" },
                    { val: "30–50%", label: "Tự chủ chi phí vận hành" }
                  ].map((stat, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-2xl text-center border border-slate-200/80 shadow-2xs">
                      <div className="text-2xl font-black text-slate-900">{stat.val}</div>
                      <div className="text-2xs font-mono font-bold text-slate-400 uppercase mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs font-medium text-slate-700 leading-relaxed space-y-1">
                  <div className="font-bold text-slate-900">Tầm nhìn dài hạn:</div>
                  <div>
                    Sau 3 năm, trung tâm mở rộng lên quy mô 3.000–5.000 m², đạt chứng chỉ kiểm định ISO/IEC 17025 và trở thành điểm tựa đổi mới sáng tạo cho các thương hiệu trong hệ sinh thái Furniture OS.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
