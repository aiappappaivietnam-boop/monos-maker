/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Box, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  Search, 
  PenTool, 
  Layers, 
  Hammer, 
  ShieldCheck, 
  TrendingDown, 
  Factory, 
  FileText, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  Target, 
  Package, 
  Sparkles, 
  Award, 
  FileCheck, 
  Zap, 
  BadgeCheck, 
  Workflow, 
  FolderLock,
  Users,
  Compass,
  Sliders,
  Cpu,
  RefreshCw,
  TreePine,
  Check,
  Printer
} from 'lucide-react';
import { Service } from '../types';
import { exportScopeToPdf } from '../lib/exportScopePdf';

interface FurnitureDesignDetailViewProps {
  service: Service;
  onBack: () => void;
  backTitle?: string;
  hideBack?: boolean;
}

export default function FurnitureDesignDetailView({ 
  service, 
  onBack, 
  backTitle = 'Quay lại', 
  hideBack 
}: FurnitureDesignDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'scope' | 'pipeline' | 'roles' | 'deliverables'>('scope');
  const [openedStages, setOpenedStages] = useState<number[]>([1, 2, 3]);

  const toggleStage = (id: number) => {
    setOpenedStages(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setOpenedStages(scopeGroups.map(s => s.id));
  };

  const collapseAll = () => {
    setOpenedStages([]);
  };

  // 9 Core Groups of Furniture Product Design & R&D Scope
  const scopeGroups = [
    {
      id: 1,
      num: '01',
      title: 'Nghiên cứu nhu cầu và định hướng sản phẩm',
      englishTitle: 'Market Research, Customer Persona & Product Direction',
      icon: Search,
      roleTag: 'Product Designer',
      summary: 'Khảo sát thị trường, phân tích đối thủ cạnh tranh, xác định phân khúc khách hàng, công năng, phong cách và ergonomics.',
      bullets: [
        'Nghiên cứu thị trường, đối thủ, xu hướng nội thất.',
        'Phân tích khách hàng mục tiêu, phân khúc giá và kênh bán hàng.',
        'Xác định concept, công năng, phong cách, kích thước và mức giá mục tiêu.',
        'Tham khảo tiêu chuẩn thiết kế, ergonomics và yêu cầu sử dụng.'
      ],
      deliverables: ['Báo cáo thị trường & xu hướng', 'Product Brief & Target Price', 'Bản chuẩn Ergonomics']
    },
    {
      id: 2,
      num: '02',
      title: 'Thiết kế sản phẩm',
      englishTitle: 'Product Design, Styling, CMF & 3D Modeling',
      icon: PenTool,
      roleTag: 'Product Designer',
      summary: 'Phát triển ý tưởng từ phác thảo sơ bộ (sketch), bảng cảm xúc (moodboard), dựng hình 3D/CAD và xây dựng product specification chi tiết.',
      bullets: [
        'Phát triển concept, sketch, moodboard, 3D/CAD.',
        'Thiết kế kiểu dáng, tỷ lệ, công năng và trải nghiệm sử dụng.',
        'Thiết kế màu sắc, vật liệu, bề mặt, upholstery và phụ kiện.',
        'Xây dựng product specification: kích thước, cấu tạo, vật liệu, màu hoàn thiện.'
      ],
      deliverables: ['Concept Sketch & Moodboard', 'Mô hình 3D CAD/Render', 'Product Specification Sheet']
    },
    {
      id: 3,
      num: '03',
      title: 'R&D vật liệu và cấu tạo',
      englishTitle: 'Material Engineering, Structural Joints & Sustainability R&D',
      icon: Layers,
      roleTag: 'Furniture R&D',
      summary: 'Nghiên cứu đa dạng chủng loại vật liệu, kết cấu liên kết mộng mộc/kim khí, tối ưu tháo lắp, vận chuyển và giải pháp vật liệu bền vững.',
      bullets: [
        'Nghiên cứu gỗ tự nhiên, gỗ công nghiệp, kim loại, kính, đá, nhựa, mây, vải, da, foam…',
        'Đánh giá độ bền, độ ổn định, khả năng gia công và tính sẵn có.',
        'Phát triển cấu trúc khung, mối nối, cơ cấu chuyển động, hardware.',
        'Tối ưu khả năng tháo lắp, đóng gói, vận chuyển và bảo trì.',
        'Nghiên cứu vật liệu thay thế nhằm giảm chi phí hoặc tăng tính bền vững.'
      ],
      deliverables: ['Ma trận vật liệu & phụ kiện', 'Bản vẽ kết cấu chịu lực & mộng', 'Giải pháp vật liệu thay thế/bền vững']
    },
    {
      id: 4,
      num: '04',
      title: 'Phát triển nguyên mẫu',
      englishTitle: 'Prototyping, Mock-up & Sample Iteration Management',
      icon: Box,
      roleTag: 'Furniture R&D',
      summary: 'Chế tạo mô hình thực tế 1:1 (mock-up/prototype), thẩm định trực quan, tinh chỉnh qua từng vòng mẫu và chốt mẫu chuẩn Golden Sample.',
      bullets: [
        'Làm mock-up, mẫu thử và prototype.',
        'Kiểm tra tỷ lệ, công năng, độ thoải mái và tính thẩm mỹ.',
        'Phối hợp với xưởng, nhà cung cấp và kỹ thuật để điều chỉnh mẫu.',
        'Quản lý các vòng sample: first sample, revised sample, golden sample.'
      ],
      deliverables: ['Mô hình 1:1 Prototype thực tế', 'Biên bản đánh giá vòng sample', 'Mẫu chuẩn ký duyệt (Golden Sample)']
    },
    {
      id: 5,
      num: '05',
      title: 'Kiểm tra và thử nghiệm',
      englishTitle: 'Structural Load, Durability, Mechanism & Safety Testing',
      icon: ShieldCheck,
      roleTag: 'Furniture R&D',
      summary: 'Thử nghiệm độ bền cơ lý tính, chịu tải trọng tĩnh/động, kiểm tra độ bám dính màng sơn, cơ cấu phụ kiện và đối chiếu tiêu chuẩn xuất khẩu.',
      bullets: [
        'Kiểm tra độ chắc chắn, chịu tải, độ ổn định và độ bền.',
        'Kiểm tra mối nối, bản lề, ray trượt, cơ cấu nâng/hạ/gấp.',
        'Kiểm tra vật liệu và lớp hoàn thiện: màu, độ bám dính, trầy xước, ẩm mốc.',
        'Kiểm tra an toàn, cạnh sắc, kẹt tay, lật đổ và nguy cơ sử dụng.',
        'Đối chiếu các tiêu chuẩn áp dụng theo thị trường xuất khẩu hoặc nội địa.'
      ],
      deliverables: ['Báo cáo test tải trọng & cơ lý tính', 'Kiểm tra màng sơn & phụ kiện', 'Chứng nhận an toàn (BIFMA/EN 12520)']
    },
    {
      id: 6,
      num: '06',
      title: 'Tối ưu chi phí và khả năng sản xuất',
      englishTitle: 'Value Engineering (VE), Target Costing & DFM/DFA',
      icon: TrendingDown,
      roleTag: 'Furniture R&D & Engineering',
      summary: 'Thực hiện Value Engineering để giảm hao hụt vật liệu, tối ưu hóa thiết kế phù hợp sản xuất hàng loạt (DFM/DFA) và tính toán bảng BOM.',
      bullets: [
        'Tính cost mục tiêu và BOM.',
        'Value engineering: giảm vật liệu, tối ưu chi tiết, rút ngắn công đoạn.',
        'Kiểm tra DFM/DFA — thiết kế phù hợp cho sản xuất và lắp ráp.',
        'Đánh giá yield, hao hụt, năng suất và thời gian sản xuất.',
        'So sánh phương án gia công, vật liệu và nhà cung cấp.'
      ],
      deliverables: ['Bảng định mức vật tư BOM', 'Báo cáo tối ưu DFM & VE', 'Đánh giá tỷ lệ hao hụt & chi phí']
    },
    {
      id: 7,
      num: '07',
      title: 'Phát triển quy trình sản xuất',
      englishTitle: 'Manufacturing SOP, Quality Control Standards & Pilot Batch',
      icon: Factory,
      roleTag: 'Technical / Engineering',
      summary: 'Xây dựng hướng dẫn sản xuất (SOP), thiết lập tiêu chuẩn QC từng trạm, giám sát mẻ sản xuất thử nghiệm và xử lý lỗi phát sinh.',
      bullets: [
        'Xây dựng quy trình và hướng dẫn sản xuất.',
        'Phối hợp với các bộ phận kỹ thuật, QC, sản xuất và mua hàng.',
        'Xác định tiêu chuẩn kiểm tra chất lượng.',
        'Xử lý lỗi phát sinh trong giai đoạn pilot và mass production.',
        'Xác nhận mẫu chuẩn trước khi sản xuất hàng loạt.'
      ],
      deliverables: ['Quy trình thao tác chuẩn (SOP)', 'Bảng tiêu chuẩn kiểm định QC', 'Báo cáo mẻ sản xuất Pilot Run']
    },
    {
      id: 8,
      num: '08',
      title: 'Hồ sơ kỹ thuật và bàn giao',
      englishTitle: 'Complete Technical Package, Exploded Views & Handover',
      icon: FileText,
      roleTag: 'Technical / Engineering',
      summary: 'Đóng gói toàn bộ bản vẽ 2D chi tiết, exploded view, danh mục hardware, cẩm nang hướng dẫn lắp ráp và lưu trữ hồ sơ phiên bản thiết kế.',
      bullets: [
        'Bản vẽ 2D, 3D và exploded view.',
        'BOM, material specification, hardware list.',
        'Finish board, color standard và mẫu vật liệu.',
        'Assembly instruction và packaging specification.',
        'QC checklist, testing report và golden sample.',
        'Hồ sơ thay đổi thiết kế, lịch sử revision và tiêu chuẩn nghiệm thu.'
      ],
      deliverables: ['Bộ bản vẽ 2D/3D & Exploded View', 'Master BOM & Hardware List', 'Cẩm nang lắp ráp Assembly Manual', 'Finish Board & QC Checklist']
    },
    {
      id: 9,
      num: '09',
      title: 'Bao bì, logistics và tính bền vững',
      englishTitle: 'Packaging Optimization, Flat-pack Logistics & FSC/Eco Compliance',
      icon: Truck,
      roleTag: 'Furniture R&D & Engineering',
      summary: 'Thiết kế bao bì chống va đập, tối ưu hóa CBM đóng gói Flat-pack, kiểm soát chứng nhận nguồn gốc gỗ hợp pháp và đánh giá vòng đời sản phẩm.',
      bullets: [
        'Thiết kế bao bì, chống va đập và tối ưu thể tích đóng gói.',
        'Kiểm tra khả năng vận chuyển, lắp ráp tại nhà và flat-pack nếu cần.',
        'Tối ưu vật liệu, giảm phế thải và khả năng tái chế.',
        'Kiểm soát nguồn gỗ hợp pháp, vật liệu có chứng nhận và hóa chất hoàn thiện.',
        'Đánh giá vòng đời sản phẩm và khả năng sửa chữa/thay thế linh kiện.'
      ],
      deliverables: ['Bản vẽ khuôn bế bao bì Flat-pack', 'Kế hoạch xếp container (CBM Plan)', 'Hồ sơ chứng nhận FSC / VOC / Eco']
    }
  ];

  // 9-Step Linear Pipeline Steps
  const pipelineSteps = [
    { step: 1, name: 'Market insight', vn: 'Nghiên cứu thị trường', icon: Search, desc: 'Xu hướng, đối thủ, insight khách hàng & phân khúc giá' },
    { step: 2, name: 'Concept', vn: 'Ý tưởng ban đầu', icon: PenTool, desc: 'Phác thảo sketch, moodboard, định hình phong cách' },
    { step: 3, name: 'Design development', vn: 'Phát triển thiết kế', icon: Sparkles, desc: 'Mô hình 3D/CAD, tỷ lệ, công năng, hoàn thiện spec' },
    { step: 4, name: 'Material / structure R&D', vn: 'R&D vật liệu & kết cấu', icon: Layers, desc: 'Khung mộng, liên kết kim khí, tối ưu tháo lắp' },
    { step: 5, name: 'Prototype', vn: 'Gia công mẫu thử', icon: Box, desc: 'Mock-up 1:1, sample reviews & Golden Sample' },
    { step: 6, name: 'Testing', vn: 'Kiểm tra & thử nghiệm', icon: ShieldCheck, desc: 'Chịu tải, độ bền mỏi, an toàn cơ lý tính, BIFMA' },
    { step: 7, name: 'Cost optimization', vn: 'Tối ưu chi phí & DFM', icon: TrendingDown, desc: 'Value engineering, tính BOM, tối ưu hao hụt' },
    { step: 8, name: 'Pilot production', vn: 'Sản xuất thử nghiệm', icon: Factory, desc: 'Chạy thử lô nhỏ, hoàn thiện SOP, kiểm soát QC' },
    { step: 9, name: 'Mass production handover', vn: 'Bàn giao sản xuất hàng loạt', icon: FileCheck, desc: 'Bàn giao bản vẽ 2D/3D, hướng dẫn lắp ráp, bao bì' }
  ];

  // 3 Functional Roles in Furniture R&D
  const rolesData = [
    {
      title: 'Product Designer',
      roleVi: 'Nhà thiết kế sản phẩm',
      badge: 'Sáng tạo & Thẩm mỹ',
      icon: PenTool,
      focus: 'Concept, kiểu dáng, công năng, thẩm mỹ',
      color: 'bg-slate-900 text-white',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      description: 'Chịu trách nhiệm về linh hồn và vẻ đẹp của sản phẩm, đảm bảo sự hài hòa giữa tỷ lệ hình khối, công năng sử dụng và trải nghiệm người dùng.',
      tasks: [
        'Nghiên cứu xu hướng nội thất, lối sống và hành vi người tiêu dùng',
        'Phát triển concept sáng tạo, sketch phác thảo ý tưởng và moodboard',
        'Dựng mô hình 3D/CAD, lựa chọn màu sắc, hoa văn, bề mặt và vật liệu hoàn thiện',
        'Xây dựng bảng Product Specification ban đầu về kiểu dáng và kích thước công thái học'
      ]
    },
    {
      title: 'Furniture R&D / Development',
      roleVi: 'Kỹ sư phát triển & Nghiên cứu',
      badge: 'Kết cấu, Vật liệu & Thử nghiệm',
      icon: Layers,
      focus: 'Cấu tạo, vật liệu, prototype, testing, cost và DFM',
      color: 'bg-slate-900 text-white',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      description: 'Hiện thực hóa ý tưởng thiết kế thành sản phẩm vật lý có thể sản xuất được, đảm bảo độ bền vững, tối ưu giá vốn và đáp ứng tiêu chuẩn chất lượng.',
      tasks: [
        'Nghiên cứu vật liệu (gỗ, kim loại, đệm mút, vải da, đá...) và giải pháp kết cấu mộng liên kết',
        'Điều phối chế tạo mẫu thử (mock-up, prototype 1:1) và tinh chỉnh qua các vòng sample',
        'Tổ chức thử nghiệm tải trọng, độ mỏi chu kỳ, độ bền sơn phủ và an toàn (BIFMA/EN)',
        'Thực hiện Value Engineering, tính toán định mức BOM và đánh giá DFM/DFA'
      ]
    },
    {
      title: 'Technical / Engineering',
      roleVi: 'Kỹ thuật viên & Kỹ sư sản xuất',
      badge: 'Quy trình & Triển khai hàng loạt',
      icon: Factory,
      focus: 'Bản vẽ sản xuất, quy trình, tiêu chuẩn chất lượng và triển khai hàng loạt',
      color: 'bg-slate-900 text-white',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      description: 'Chuẩn hóa toàn bộ hồ sơ dữ liệu kỹ thuật và xây dựng dây chuyền gia công chuẩn xác phục vụ cho nhà máy sản xuất đại trà.',
      tasks: [
        'Xuất trọn bộ bản vẽ 2D bóc tách chi tiết linh kiện, exploded view và file máy CNC',
        'Xây dựng quy trình thao tác chuẩn (SOP) và tài liệu hướng dẫn lắp ráp (Assembly Manual)',
        'Thiết lập checklist tiêu chuẩn kiểm tra chất lượng (QC Plan) cho từng công đoạn',
        'Giám sát mẻ sản xuất thử nghiệm (Pilot Batch) và chuyển giao công nghệ cho nhà máy'
      ]
    }
  ];

  const masterDeliverables = [
    { title: 'Bộ bản vẽ kỹ thuật 2D, 3D & Exploded View', desc: 'Bản vẽ chi tiết linh kiện, mặt cắt cấu tạo mộng, bản vẽ nổ đa tầng và file 3D CAD/CAM chuẩn cho máy CNC.', icon: FileCheck },
    { title: 'Mẫu sản phẩm chuẩn (Golden Sample)', desc: 'Nguyên mẫu thực tế 1:1 đã qua các vòng sample, đạt trọn vẹn kiểm định thẩm mỹ, cơ lý tính và được ký duyệt.', icon: Award },
    { title: 'Bảng định mức vật tư BOM & Hardware List', desc: 'Định mức kỹ thuật chi tiết từng gram gỗ, mm kim loại, danh mục ngũ kim, mã phụ kiện và dự toán giá thành.', icon: Layers },
    { title: 'Quy trình sản xuất SOP & Tiêu chuẩn QC', desc: 'Tài liệu hướng dẫn thao tác từng công đoạn nhà xưởng và bảng tiêu chuẩn kiểm tra dung sai chất lượng nghiêm ngặt.', icon: ShieldCheck },
    { title: 'Cẩm nang hướng dẫn lắp ráp (Assembly Manual)', desc: 'Sơ đồ hướng dẫn người dùng cuối lắp ráp từng bước trực quan, minh họa rõ ràng phụ kiện và vị trí liên kết.', icon: FileText },
    { title: 'Hồ sơ bao bì Flat-pack & Chứng nhận bền vững', desc: 'Thiết kế hộp carton tối ưu thể tích CBM, bài test thả rơi ISTA, chứng nhận nguồn gốc gỗ FSC và kiểm soát hóa chất.', icon: Package }
  ];

  return (
    <div className="min-h-screen bg-white text-[#202124]">
      {/* Header Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <Box className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-slate-900">Furniture Design & Product R&D</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => exportScopeToPdf(service, { customTitle: 'Thiết Kế & Phát Triển Sản Phẩm Nội Thất (Furniture Design & R&D Scope)' })}
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
                <span>FURNITURE PRODUCT DEVELOPMENT & R&D SCOPE</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Thiết Kế & Phát Triển Sản Phẩm Nội Thất (Furniture Design)
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Trong ngành furniture, scope của <strong>Thiết kế phát triển sản phẩm và R&D</strong> bao gồm <strong>9 nhóm cốt lõi</strong>, đảm bảo sản phẩm đạt chuẩn thẩm mỹ, độ bền kết cấu, tối ưu hóa giá vốn sản xuất và sẵn sàng bàn giao xuất khẩu.
              </p>
            </div>

            {/* 4 Interactive Clickable Graphic Stat Metric Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4 border-t border-slate-200/80">
              {/* Block 1: 9 Nhóm Scope -> loads 'scope' */}
              <button
                type="button"
                onClick={() => setActiveTab('scope')}
                className={`group relative text-left rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between gap-3 overflow-hidden cursor-pointer border ${
                  activeTab === 'scope'
                    ? 'bg-white border-slate-900 ring-1 ring-slate-900/10 shadow-xs text-slate-900'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    activeTab === 'scope' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                  }`}>
                    <Workflow className="w-4.5 h-4.5" />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                    activeTab === 'scope'
                      ? 'text-slate-900 bg-slate-100 font-semibold border-slate-300'
                      : 'text-slate-500 bg-slate-50 border-slate-200'
                  }`}>
                    9 GROUPS
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-medium">
                    Scope công việc
                  </div>
                  <div className="text-base font-bold text-slate-900 tracking-tight">
                    9 Nhóm R&D cốt lõi
                  </div>
                  <div className="text-xs flex items-center justify-between pt-1.5 border-t border-slate-100 text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${activeTab === 'scope' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      <span>Chi tiết từng hạng mục</span>
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeTab === 'scope' ? 'translate-x-0.5 text-slate-900' : 'text-slate-400 group-hover:translate-x-0.5'}`} />
                  </div>
                </div>
              </button>

              {/* Block 2: Quy trình tóm tắt -> loads 'pipeline' */}
              <button
                type="button"
                onClick={() => setActiveTab('pipeline')}
                className={`group relative text-left rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between gap-3 overflow-hidden cursor-pointer border ${
                  activeTab === 'pipeline'
                    ? 'bg-white border-slate-900 ring-1 ring-slate-900/10 shadow-xs text-slate-900'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    activeTab === 'pipeline' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                  }`}>
                    <Sliders className="w-4.5 h-4.5" />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                    activeTab === 'pipeline'
                      ? 'text-slate-900 bg-slate-100 font-semibold border-slate-300'
                      : 'text-slate-500 bg-slate-50 border-slate-200'
                  }`}>
                    SUMMARY
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-medium">
                    Tóm tắt quy trình
                  </div>
                  <div className="text-base font-bold text-slate-900 tracking-tight">
                    Insight → Handover
                  </div>
                  <div className="text-xs flex items-center justify-between pt-1.5 border-t border-slate-100 text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${activeTab === 'pipeline' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      <span>Luồng 9 bước tuần tự</span>
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeTab === 'pipeline' ? 'translate-x-0.5 text-slate-900' : 'text-slate-400 group-hover:translate-x-0.5'}`} />
                  </div>
                </div>
              </button>

              {/* Block 3: 3 Vai trò chuyên môn -> loads 'roles' */}
              <button
                type="button"
                onClick={() => setActiveTab('roles')}
                className={`group relative text-left rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between gap-3 overflow-hidden cursor-pointer border ${
                  activeTab === 'roles'
                    ? 'bg-white border-slate-900 ring-1 ring-slate-900/10 shadow-xs text-slate-900'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    activeTab === 'roles' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                  }`}>
                    <Users className="w-4.5 h-4.5" />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                    activeTab === 'roles'
                      ? 'text-slate-900 bg-slate-100 font-semibold border-slate-300'
                      : 'text-slate-500 bg-slate-50 border-slate-200'
                  }`}>
                    3 ROLES
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-medium">
                    Phân vai trò
                  </div>
                  <div className="text-base font-bold text-slate-900 tracking-tight">
                    3 Vị trí chủ chốt
                  </div>
                  <div className="text-xs flex items-center justify-between pt-1.5 border-t border-slate-100 text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${activeTab === 'roles' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      <span>Designer, R&D & Engineering</span>
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeTab === 'roles' ? 'translate-x-0.5 text-slate-900' : 'text-slate-400 group-hover:translate-x-0.5'}`} />
                  </div>
                </div>
              </button>

              {/* Block 4: Hồ sơ bàn giao -> loads 'deliverables' */}
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
                    DELIVERABLES
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-medium">
                    Hồ sơ bàn giao
                  </div>
                  <div className="text-base font-bold text-slate-900 tracking-tight">
                    Golden Sample & BOM
                  </div>
                  <div className="text-xs flex items-center justify-between pt-1.5 border-t border-slate-100 text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${activeTab === 'deliverables' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      <span>Sẵn sàng sản xuất hàng loạt</span>
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeTab === 'deliverables' ? 'translate-x-0.5 text-slate-900' : 'text-slate-400 group-hover:translate-x-0.5'}`} />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* TAB 1: 9 NHÓM SCOPE (ACCORDION & DETAILED CHECKLIST) */}
        {activeTab === 'scope' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 border border-slate-200 p-4 sm:p-5 rounded-2xl">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-900" />
                  <span className="text-2xs font-mono uppercase tracking-widest text-slate-500 font-semibold">
                    Full Scope Breakdown
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-0.5">
                  9 Nhóm Công Việc Thiết Kế Phát Triển Sản Phẩm & R&D
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click vào từng nhóm để xem chi tiết các đầu việc thực thi và kết quả bàn giao
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <span className="text-xs font-mono text-slate-500 bg-white border border-slate-200 px-2.5 py-1.5 rounded-lg">
                  Đang mở: <strong className="text-slate-900">{openedStages.length}/9</strong>
                </span>
                <button
                  type="button"
                  onClick={expandAll}
                  className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                >
                  Mở tất cả
                </button>
                <button
                  type="button"
                  onClick={collapseAll}
                  className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                >
                  Thu gọn tất cả
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {scopeGroups.map((group) => {
                const Icon = group.icon;
                const isExpanded = openedStages.includes(group.id);

                return (
                  <div
                    key={group.id}
                    className={`border rounded-2xl transition-all overflow-hidden ${
                      isExpanded
                        ? 'bg-white border-slate-300 shadow-xs'
                        : 'bg-[#fafafa] border-slate-200 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    {/* Stage Collapsible Header */}
                    <button
                      type="button"
                      onClick={() => toggleStage(group.id)}
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
                            <span className="text-[11px] font-mono font-bold text-slate-400">NHÓM {group.num}</span>
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-mono rounded-md font-medium border border-slate-200/60">
                              {group.roleTag}
                            </span>
                          </div>
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                            {group.id}. {group.title}
                          </h3>
                          <p className="text-xs text-slate-500 truncate">{group.englishTitle}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="hidden sm:inline-block text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60">
                          {group.bullets.length} hạng mục
                        </span>
                        <div className={`w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 transition-all ${
                          isExpanded ? 'bg-slate-900 text-white border-slate-900 rotate-180' : 'bg-white hover:bg-slate-50'
                        }`}>
                          <ChevronDown className="w-4 h-4 transition-transform" />
                        </div>
                      </div>
                    </button>

                    {/* Stage Collapsible Content */}
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
                            {group.summary}
                          </p>

                          {/* Bullets List */}
                          <div className="space-y-2.5">
                            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                              Các đầu mục công việc chi tiết:
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                              {group.bullets.map((bullet, idx) => (
                                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-800 bg-white border border-slate-100 p-3 rounded-xl shadow-2xs">
                                  <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                                    <Check className="w-3.5 h-3.5" />
                                  </div>
                                  <span className="leading-relaxed font-medium">{bullet}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Deliverables Section */}
                          <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 space-y-3">
                            <div className="flex items-center gap-2">
                              <FileCheck className="w-4 h-4 text-amber-400" />
                              <span className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold">
                                Kết quả bàn giao (Deliverables):
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {group.deliverables.map((item, dIdx) => (
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
          </div>
        )}

        {/* TAB 2: PIPELINE (TÓM TẮT QUY TRÌNH) */}
        {activeTab === 'pipeline' && (
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-mono font-semibold">
                <span>LINEAR PRODUCT WORKFLOW</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Tóm Tắt Quy Trình R&D & Phát Triển Sản Phẩm
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-mono">
                Market insight → Concept → Design development → Material/structure R&D → Prototype → Testing → Cost optimization → Pilot production → Mass production handover
              </p>
            </div>

            {/* Pipeline Step Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pipelineSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.step} className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3 flex flex-col justify-between relative overflow-hidden group hover:border-slate-400 transition-colors">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="w-8 h-8 rounded-lg bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                          0{step.step}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">{step.name}</h3>
                        <div className="text-xs font-medium text-slate-500">{step.vn}</div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed pt-1">
                        {step.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-2xs font-mono text-slate-400">
                      <span>BƯỚC {step.step}/9</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Linear Strip Diagram */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2">
                <Workflow className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white tracking-tight">Chuỗi Luân Chuyển Dữ Liệu Khép Kín</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Mỗi giai đoạn tạo ra các sản phẩm đầu ra (Deliverables) được chuẩn hóa để làm dữ liệu đầu vào cho giai đoạn kế tiếp, 
                đảm bảo không xảy ra đứt gãy thông tin giữa khâu Sáng tạo (Design), Kỹ thuật (R&D) và Nhà máy (Manufacturing).
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: 3 ROLES (PHÂN VAI TRÒ CHUYÊN MÔN) */}
        {activeTab === 'roles' && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Phân Chia 3 Vai Trò Chuyên Môn</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Tùy theo quy mô doanh nghiệp, scope R&D nội thất thường được phân định rõ ràng giữa 3 vị trí nòng cốt.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {rolesData.map((role, idx) => {
                const Icon = role.icon;
                return (
                  <div key={idx} className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs space-y-5 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-11 h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-2xs">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`px-2.5 py-1 text-[11px] font-mono rounded-lg border font-semibold ${role.badgeColor}`}>
                          {role.badge}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-slate-900">{role.title}</h3>
                        <div className="text-xs font-semibold text-slate-500">{role.roleVi}</div>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 space-y-1">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Trọng tâm Scope:</div>
                        <div className="text-xs font-bold text-slate-900 leading-snug">{role.focus}</div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {role.description}
                      </p>

                      <div className="space-y-2 pt-2">
                        <div className="text-2xs font-mono uppercase tracking-wider text-slate-400 font-bold">Nhiệm vụ chính:</div>
                        {role.tasks.map((task, tIdx) => (
                          <div key={tIdx} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-slate-900 shrink-0 mt-0.5" />
                            <span className="leading-snug">{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 text-2xs font-mono text-slate-400 flex items-center justify-between">
                      <span>VAI TRÒ #{idx + 1}</span>
                      <span className="font-semibold text-slate-700">R&D TEAM</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: DELIVERABLES (HỒ SƠ BÀN GIAO) */}
        {activeTab === 'deliverables' && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Hồ Sơ Kỹ Thuật & Bàn Giao Hoàn Chỉnh</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Toàn bộ dữ liệu kỹ thuật và mẫu chuẩn sẵn sàng cho dây chuyền sản xuất đại trà và đóng gói xuất khẩu.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {masterDeliverables.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Checklist Box */}
            <div className="bg-[#fafafa] border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileCheck className="w-4.5 h-4.5 text-slate-900" />
                <span>Danh mục nghiệm thu bàn giao (Sign-off Checklist)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  'Bản vẽ 2D, 3D và exploded view',
                  'BOM, material specification, hardware list',
                  'Finish board, color standard và mẫu vật liệu',
                  'Assembly instruction và packaging specification',
                  'QC checklist, testing report và golden sample',
                  'Hồ sơ thay đổi thiết kế & lịch sử revision'
                ].map((checkItem, cIdx) => (
                  <div key={cIdx} className="flex items-center gap-2.5 p-3 bg-white border border-slate-200/80 rounded-xl text-xs font-medium text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{checkItem}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
