/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Megaphone, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  BarChart3, 
  Workflow, 
  Users, 
  ShoppingBag, 
  FileText, 
  Send, 
  Cpu, 
  Check, 
  Zap, 
  Clock, 
  DollarSign, 
  Target, 
  Share2, 
  Palette, 
  Calendar, 
  Sliders, 
  Globe, 
  Mail, 
  Eye, 
  Lock, 
  AlertCircle, 
  TrendingUp, 
  RefreshCw,
  Search,
  CheckCheck,
  Building2,
  FileCheck2,
  FolderLock,
  PieChart,
  MessageSquareQuote,
  Sparkle,
  Printer
} from 'lucide-react';
import { Service } from '../types';
import { exportScopeToPdf } from '../lib/exportScopePdf';

interface BrandMarketingDetailViewProps {
  service: Service;
  onBack: () => void;
  backTitle?: string;
  hideBack?: boolean;
}

export default function BrandMarketingDetailView({ service, onBack, backTitle = 'Quay lại', hideBack }: BrandMarketingDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'flow' | 'demo'>('overview');
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState<number>(0);
  
  // Interactive Simulation State
  const [simBrandName, setSimBrandName] = useState('Monos Living');
  const [simProductName, setSimProductName] = useState('Ghế Ergonomic Herman X9');
  const [simGoal, setSimGoal] = useState<'launch' | 'lead' | 'sales' | 'brand'>('launch');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<{
    slogan: string;
    targetAudience: string;
    contentPillars: string[];
    sampleAdCopy: string;
    sampleSocialPost: string;
    sampleEmailSubject: string;
    channels: string[];
    budgetAllocation: { name: string; pct: number }[];
  } | null>({
    slogan: 'Công thái học chuẩn Đức – Định nghĩa lại không gian làm việc đỉnh cao',
    targetAudience: 'Chủ doanh nghiệp, Quản lý cấp trung & Freelancer chú trọng sức khỏe cột sống (26-45 tuổi)',
    contentPillars: [
      'Công nghệ & Thiết kế công thái học đỉnh cao',
      'Trải nghiệm sức khỏe & Nâng tầm hiệu suất',
      'Đánh giá chuyên gia & Chứng nhận quốc tế',
      'Ưu đãi Pre-order độc quyền 30 ngày'
    ],
    sampleAdCopy: '🔥 ĐAU LƯNG KHI NGỒI LÀM VIỆC 8 TIẾNG? Khám phá ngay giải pháp nâng đỡ cột sống toàn diện cùng Herman X9 – Đặt trước nhận ngay Voucher 1.500.000đ!',
    sampleSocialPost: '🌿 Không chỉ là chiếc ghế, đây là khoản đầu tư cho sức khỏe của bạn trong 10 năm tới. Khám phá 5 tính năng đột phá trên Herman X9 vừa ra mắt...',
    sampleEmailSubject: '[Độc quyền] Ra mắt BST Herman X9 – Ưu đãi 20% chỉ dành cho thành viên VIP',
    channels: ['Meta Ads (Facebook/Instagram)', 'Google Search & Shopping', 'TikTok Short Videos', 'KOL Tech & Lifestyle', 'Email Automation'],
    budgetAllocation: [
      { name: 'Meta Ads', pct: 40 },
      { name: 'Google Ads', pct: 25 },
      { name: 'TikTok & Video Creators', pct: 20 },
      { name: 'Content & Email', pct: 15 }
    ]
  });

  const handleSimulateGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedPlan({
        slogan: `Bứt phá phong cách cùng ${simProductName} – Chuẩn mực thương hiệu ${simBrandName}`,
        targetAudience: simGoal === 'launch' 
          ? 'Nhóm khách hàng Early Adopters, yêu thích đồ nội thất cao cấp & công nghệ mới'
          : simGoal === 'lead' 
          ? 'Kiến trúc sư, Nhà thầu & Chủ căn hộ đang tìm kiếm giải pháp nội thất tổng thể'
          : 'Khách hàng có nhu cầu mua sắm nâng cấp không gian sống trong quý này',
        contentPillars: [
          `Câu chuyện thương hiệu & Đẳng cấp của ${simBrandName}`,
          `Chi tiết vật liệu & Độ hoàn thiện thủ công của ${simProductName}`,
          'Hướng dẫn phối không gian & Phong cách sống tinh tế',
          simGoal === 'launch' ? 'Chương trình mở bán giới hạn' : 'Chính sách bảo hành 5 năm & Trải nghiệm tại Showroom'
        ],
        sampleAdCopy: `✨ Trải nghiệm ${simProductName} đỉnh cao từ ${simBrandName}. Đặt lịch trải nghiệm thực tế ngay hôm nay để nhận ưu đãi thiết kế độc quyền!`,
        sampleSocialPost: `🌟 Đằng sau mỗi đường cong của ${simProductName} là hơn 120 giờ hoàn thiện tỉ mỉ từ đội ngũ nghệ nhân ${simBrandName}. Bạn đã sẵn sàng nâng tầm không gian?`,
        sampleEmailSubject: `[${simBrandName}] Chào đón sản phẩm mới: ${simProductName} chính thức mở bán`,
        channels: ['Meta Ads (Instagram / Facebook)', 'Google Search & PMax', 'LinkedIn B2B', 'TikTok Reels', 'Zalo OA / Email'],
        budgetAllocation: [
          { name: 'Paid Social (Meta/TikTok)', pct: 45 },
          { name: 'Search & Performance (Google)', pct: 30 },
          { name: 'KOL / KOC Seeding', pct: 15 },
          { name: 'Retention & Email CRM', pct: 10 }
        ]
      });
    }, 900);
  };

  const featureGroups = [
    {
      id: 'brand',
      number: '01',
      title: 'Quản lý thương hiệu',
      subTitle: 'Brand Identity & Asset Master',
      icon: Palette,
      color: 'from-[#1a73e8] to-[#1557d0]',
      bgColor: 'bg-[#e8f0fe] text-[#1a73e8] border-[#d2e3fc]',
      summary: 'Lưu trữ và chuẩn hóa bộ nhận diện thương hiệu, quy chuẩn truyền thông và giọng nói độc bản.',
      items: [
        'Brand guideline số hóa toàn diện',
        'Logo vector, bảng màu palette, font chữ, quy chuẩn hình ảnh',
        'Tính cách thương hiệu (Brand Persona) và giọng nói (Tone of Voice)',
        'Thông điệp cốt lõi (Core Message) & Định vị giá trị (Value Proposition)',
        'Bộ từ khóa được phép dùng & danh sách từ khóa cấm kỵ (Brand Lexicon)',
        'Template và kho tài sản thương hiệu đồng bộ trên đám mây'
      ]
    },
    {
      id: 'product',
      number: '02',
      title: 'Quản lý sản phẩm',
      subTitle: 'Product Catalog & Knowledge',
      icon: ShoppingBag,
      color: 'from-[#137333] to-[#0d652d]',
      bgColor: 'bg-[#e6f4ea] text-[#137333] border-[#ceead6]',
      summary: 'Quản trị danh mục sản phẩm, thông số kỹ thuật, hình ảnh 3D và tài liệu bán hàng tập trung.',
      items: [
        'Tên sản phẩm, mã SKU, biểu phí niêm yết, cây danh mục đa cấp',
        'Mô tả chi tiết, thông số kỹ thuật, tính năng và lợi ích người dùng',
        'Kho hình ảnh studio, video 3D render, tài liệu catalog PDF',
        'Xác định chân dung đối tượng khách hàng mục tiêu theo từng dòng sản phẩm',
        'Bộ từ khóa SEO tối ưu tìm kiếm theo từng sản phẩm',
        'Chính sách giá bán buôn/bán lẻ và chương trình khuyến mãi',
        'Quản lý trạng thái vòng đời: Sắp ra mắt, Đang mở bán, Tạm hết hàng, Ngừng bán'
      ]
    },
    {
      id: 'ai-planning',
      number: '03',
      title: 'AI lập kế hoạch marketing',
      subTitle: 'Strategic AI Campaign Planner',
      icon: Target,
      color: 'from-[#f29900] to-[#e37400]',
      bgColor: 'bg-[#fef7e0] text-[#b06000] border-[#feefc3]',
      summary: 'Trợ lý AI phân tích dữ liệu thị trường, gợi ý mục tiêu và tự động lập Master Plan cho chiến dịch.',
      items: [
        'Tự động gợi ý mục tiêu chiến dịch (Awareness, Lead, Sales, Retention)',
        'Xây dựng 4-6 Content Pillars chiến lược theo hành trình khách hàng',
        'Lập lịch phát hành nội dung (Editorial Calendar) theo tuần/tháng',
        'Đề xuất ma trận kênh truyền thông tối ưu theo ngân sách',
        'Phân khúc khách hàng mục tiêu và định vị góc tiếp cận (Angle)',
        'Gợi ý phân bổ ngân sách quảng cáo tối ưu lợi nhuận',
        'Tạo Campaign Brief hoàn chỉnh tự động trong 30 giây'
      ]
    },
    {
      id: 'ai-content',
      number: '04',
      title: 'AI tạo nội dung',
      subTitle: 'Omni-channel Content Factory',
      icon: Sparkles,
      color: 'from-[#9334e6] to-[#7922d3]',
      bgColor: 'bg-[#f3e8fd] text-[#8430ce] border-[#e9d5ff]',
      summary: 'Xưởng sản xuất nội dung tự động: Bài viết SEO, Caption mạng xã hội, Kịch bản video và Email.',
      items: [
        'Bài viết chuyên sâu Website / Blog chuẩn SEO',
        'Caption sáng tạo chuẩn thuật toán Facebook, Instagram, TikTok, LinkedIn',
        'Kịch bản Video ngắn (TikTok/Reels/Shorts) kèm phân cảnh chi tiết',
        'Ý tưởng hình ảnh, prompt AI thiết kế banner quảng cáo đa kích thước',
        'Chuỗi Email Marketing tự động (Chào mừng, Chăm sóc, Bỏ giỏ hàng)',
        'Bộ nội dung quảng cáo chuyển đổi cao (Ad Copy, Primary Text, Headlines)',
        'Đề xuất Hashtag thịnh hành, CTA kích thích hành động & Tiêu đề AIDA',
        'Tự động chuyển 1 nội dung gốc (Core Asset) thành 10+ định dạng đa kênh'
      ]
    },
    {
      id: 'publishing',
      number: '05',
      title: 'Quản lý và xuất bản',
      subTitle: 'Content Calendar & Multi-Publishing',
      icon: Calendar,
      color: 'from-[#1a73e8] to-[#1256be]',
      bgColor: 'bg-[#e8f0fe] text-[#1a73e8] border-[#d2e3fc]',
      summary: 'Lên lịch, kiểm duyệt và tự động đẩy bài viết lên Website, Fanpage, TikTok và Email.',
      items: [
        'Lịch phát hành Content Calendar trực quan theo giao diện Kanban/Timeline',
        'Quy trình phê duyệt nội bộ nhiều cấp (Draft -> Review -> Approved)',
        'Tự động đăng bài lên Website / CMS (WordPress, Webflow, Shopify)',
        'Tự động xuất bản lên Mạng xã hội (Meta, TikTok, LinkedIn, YouTube)',
        'Tự động kích hoạt gửi chiến dịch Email Marketing theo lịch trình',
        'Tự động căn chỉnh và resize nội dung chuẩn tỷ lệ từng nền tảng',
        'Theo dõi trạng thái xuất bản: Thành công, Đang xử lý hoặc Lỗi cần kiểm tra'
      ]
    },
    {
      id: 'ad-management',
      number: '06',
      title: 'Quản lý quảng cáo',
      subTitle: 'Omnichannel Paid Ads Manager',
      icon: DollarSign,
      color: 'from-[#d93025] to-[#b31412]',
      bgColor: 'bg-[#fce8e6] text-[#c5221f] border-[#fad2cf]',
      summary: 'Tập trung tạo, quản lý và tối ưu chiến dịch Meta Ads, Google Ads và TikTok Ads tại một nơi.',
      items: [
        'Khởi tạo chiến dịch quảng cáo nhanh chóng từ kho content có sẵn',
        'Thiết lập mục tiêu chuyển đổi, tệp đối tượng (Audience) và ngân sách',
        'Quản lý kho Creative (ảnh/video) và đồng bộ đường link Landing Page',
        'Kết nối API trực tiếp với Meta Ads, Google Ads, TikTok Ads',
        'Theo dõi chi phí theo thời gian thực và tỷ lệ chuyển đổi từng kênh',
        'Cảnh báo thông minh khi chiến dịch có dấu hiệu bão hòa hoặc kém hiệu quả',
        'Gợi ý tự động tăng/giảm ngân sách để tối ưu hóa ROAS'
      ]
    },
    {
      id: 'crm',
      number: '07',
      title: 'Quản lý khách hàng',
      subTitle: 'CRM & Lead Nurturing Hub',
      icon: Users,
      color: 'from-[#137333] to-[#0d652d]',
      bgColor: 'bg-[#e6f4ea] text-[#137333] border-[#ceead6]',
      summary: 'Quản trị data khách hàng, theo dõi hành trình trải nghiệm và nuôi dưỡng lead tự động.',
      items: [
        'Hệ thống CRM quản lý danh sách Lead và khách hàng tiềm năng',
        'Phân nhóm khách hàng thông minh theo hành vi, ngành hàng và giá trị đơn',
        'Theo dõi bản đồ hành trình khách hàng xuyên suốt từ lúc thấy Ad đến khi mua',
        'Kịch bản Email Automation nuôi dưỡng tự động theo từng điểm chạm',
        'Lịch sử tương tác đa kênh tập trung trên một hồ sơ khách hàng',
        'Gửi khảo sát mức độ hài lòng (CSAT, NPS) và ghi nhận phản hồi',
        'AI Lead Scoring: Chấm điểm độ nóng của khách hàng tiềm năng'
      ]
    },
    {
      id: 'analytics',
      number: '08',
      title: 'Đo lường và tối ưu',
      subTitle: 'Unified Dashboard & AI Insights',
      icon: BarChart3,
      color: 'from-[#1a73e8] to-[#1557d0]',
      bgColor: 'bg-[#e8f0fe] text-[#1a73e8] border-[#d2e3fc]',
      summary: 'Dashboard báo cáo hợp nhất, AI giải thích nguyên nhân tăng giảm và đề xuất giải pháp cải thiện.',
      items: [
        'Dashboard tổng hợp toàn bộ số liệu từ Ads, Social, Web và CRM',
        'Theo dõi chỉ số nhận diện: Reach, Impression, Tỷ lệ tương tác (Engagement)',
        'Theo dõi chỉ số chuyển đổi: CTR, Conversion Rate, Bounce Rate',
        'Kiểm soát chi phí: Chi phí trên mỗi Lead (CPL), CPA và chi phí có khách hàng (CAC)',
        'Đo lường Doanh thu thực thu và Tỷ suất hoàn vốn quảng cáo (ROAS)',
        'Báo cáo hiệu quả phân tách theo từng Dòng sản phẩm / Kênh / Campaign',
        'AI Insights: Tự động phân tích và giải thích nguyên nhân tăng/giảm số liệu',
        'Đề xuất hành động tiếp theo (Next Best Actions) cho tuần kế tiếp'
      ]
    },
    {
      id: 'governance',
      number: '09',
      title: 'Quản trị hệ thống',
      subTitle: 'Security, Compliance & Approvals',
      icon: ShieldCheck,
      color: 'from-[#5f6368] to-[#3c4043]',
      bgColor: 'bg-[#f1f3f4] text-[#3c4043] border-[#dadce0]',
      summary: 'Bảo vệ an toàn thương hiệu, phân quyền chặt chẽ và kiểm duyệt trước khi chi tiền hoặc đăng bài.',
      items: [
        'Phân quyền người dùng chi tiết (Admin, Marketer, Designer, Approver, Viewer)',
        'Lịch sử chỉnh sửa và nhật ký hoạt động (Audit Trail) minh bạch',
        'Quản lý phiên bản tài sản thương hiệu và nội dung số',
        'Kiểm duyệt nội dung tự động trước khi xuất bản (Brand Safety)',
        'Kiểm tra bản quyền hình ảnh, âm thanh và văn bản',
        'Quét phát hiện claim quá đà hoặc thông tin nhạy cảm',
        'Cơ chế phê duyệt 2 lớp riêng biệt bắt buộc cho Nội dung và Ngân sách'
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-8 pb-16"
    >
      {/* Top Back & Action Navigation */}
      <div className="flex items-center justify-between gap-4 mb-6">
        {!hideBack ? (
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a73e8] hover:text-[#1557d0] transition-colors group cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{backTitle}</span>
          </button>
        ) : <div />}

        <button
          onClick={() => exportScopeToPdf(service, { customTitle: 'AI Brand & Product Marketing Hub (Scope Quản Trị Marketing)' })}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3c4043] hover:text-[#202124] bg-white hover:bg-[#f1f3f4] border border-[#dadce0] transition-all cursor-pointer px-3.5 py-1.5 rounded-full shadow-2xs"
          title="Xuất tài liệu phạm vi công việc ra file PDF"
        >
          <Printer className="w-3.5 h-3.5 text-[#1a73e8]" />
          <span>Xuất PDF</span>
        </button>
      </div>

        {/* Hero Banner with Professional Google-esque Aesthetic */}
        <div className="relative overflow-hidden bg-white border border-[#dadce0] rounded-3xl p-6 sm:p-10 shadow-xs">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#e8f0fe]/60 via-[#fef7e0]/40 to-[#e6f4ea]/50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#e8f0fe] border border-[#d2e3fc] rounded-full text-xs font-bold text-[#1a73e8]">
                <Sparkle className="w-3.5 h-3.5 fill-[#1a73e8]" />
                <span>Next-Gen Marketing Infrastructure</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#1a73e8]" />
                <span className="text-[#5f6368]">All-in-One Growth Platform</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#202124] tracking-tight leading-tight">
                AI Brand & Product Marketing Hub
              </h1>

              <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
                Nền tảng quản lý marketing tập trung, giúp doanh nghiệp quản lý thương hiệu, sản phẩm, nội dung, website, mạng xã hội, email, quảng cáo và hiệu quả kinh doanh trên một hệ thống duy nhất.
              </p>

              <div className="flex flex-wrap gap-2.5 pt-1 text-xs">
                <span className="px-3 py-1 bg-[#f8f9fa] border border-[#dadce0] rounded-lg font-semibold text-[#3c4043] flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#137333]" /> Nhập Data 1 lần
                </span>
                <span className="px-3 py-1 bg-[#f8f9fa] border border-[#dadce0] rounded-lg font-semibold text-[#3c4043] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#f9ab00]" /> AI Tự động lập Kế hoạch
                </span>
                <span className="px-3 py-1 bg-[#f8f9fa] border border-[#dadce0] rounded-lg font-semibold text-[#3c4043] flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#1a73e8]" /> Phê duyệt Con người 2 lớp
                </span>
                <span className="px-3 py-1 bg-[#f8f9fa] border border-[#dadce0] rounded-lg font-semibold text-[#3c4043] flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-[#9334e6]" /> Real-time Analytics & ROAS
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-8 pt-6 border-t border-[#dadce0] overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#1a73e8] text-white shadow-xs'
                  : 'bg-[#f8f9fa] text-[#5f6368] hover:bg-[#e8f0fe] hover:text-[#1a73e8]'
              }`}
            >
              Tổng quan & Quy trình 8 bước
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === 'features'
                  ? 'bg-[#1a73e8] text-white shadow-xs'
                  : 'bg-[#f8f9fa] text-[#5f6368] hover:bg-[#e8f0fe] hover:text-[#1a73e8]'
              }`}
            >
              9 Nhóm tính năng chính
            </button>
            <button
              onClick={() => setActiveTab('flow')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === 'flow'
                  ? 'bg-[#1a73e8] text-white shadow-xs'
                  : 'bg-[#f8f9fa] text-[#5f6368] hover:bg-[#e8f0fe] hover:text-[#1a73e8]'
              }`}
            >
              Sơ đồ Kiến trúc luồng (Flowchart)
            </button>
            <button
              onClick={() => setActiveTab('demo')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'demo'
                  ? 'bg-[#137333] text-white shadow-xs'
                  : 'bg-[#e6f4ea] text-[#137333] hover:bg-[#ceead6]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mô phỏng AI Campaign Hub</span>
            </button>
          </div>
        </div>

      {/* Tab 1: Overview & 8-Step Closed Loop */}
      {activeTab === 'overview' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
          {/* Executive Summary Card */}
          <section className="bg-white border border-[#dadce0] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1a73e8]">
              <Target className="w-4 h-4" />
              <span>Mô tả tổng quan giải pháp</span>
            </div>

            <div className="text-sm sm:text-base text-[#202124] leading-relaxed space-y-4">
              <p>
                <strong>AI Brand & Product Marketing Hub</strong> là nền tảng quản lý marketing tập trung, giúp doanh nghiệp quản lý thương hiệu, sản phẩm, nội dung, website, mạng xã hội, email, quảng cáo và hiệu quả kinh doanh trên một hệ thống duy nhất.
              </p>
              <p className="text-[#5f6368]">
                Người dùng chỉ cần nhập dữ liệu thương hiệu, sản phẩm và mục tiêu campaign. AI sẽ hỗ trợ lập kế hoạch, tạo nội dung đa kênh, thiết kế hình ảnh, lên lịch xuất bản, xây dựng quảng cáo và phân tích kết quả.
              </p>
            </div>

            {/* Executive High-End Graphic Flow Banner */}
            <div className="bg-[#fafafa] border border-slate-200/80 rounded-3xl p-6 sm:p-10 space-y-8 relative overflow-hidden">
              {/* Subtle background ambient light */}
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-slate-200/40 rounded-full blur-3xl pointer-events-none -mt-32" />

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-5 relative z-10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-900" />
                    <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-semibold">
                      End-to-End Operating Architecture
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    Sơ Đồ Vận Hành Tự Động & Kiểm Soát Marketing
                  </h3>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-mono text-slate-700 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span className="font-medium">Closed-Loop ↺ AI Feedback</span>
                </div>
              </div>

              {/* Vertical Linear-Style Flow Pipeline */}
              <div className="max-w-2xl mx-auto relative z-10 py-2">
                {/* Continuous Center Spine Line */}
                <div className="absolute left-6 sm:left-8 top-6 bottom-6 w-px bg-gradient-to-b from-slate-300 via-slate-400 to-slate-300" />

                <div className="space-y-4">
                  {/* Step 1: Input Master */}
                  <div className="relative flex items-start gap-4 sm:gap-6 group">
                    <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-white border border-slate-300 text-slate-800 flex items-center justify-center shrink-0 shadow-2xs z-10 transition-transform group-hover:scale-105">
                      <FolderLock className="w-5 h-5 text-slate-700" />
                    </div>
                    <div className="flex-1 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs hover:border-slate-400 transition-all">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">Node 01 // Master Input</span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-mono rounded-md font-medium">Knowledge Base</span>
                      </div>
                      <div className="text-sm sm:text-base font-bold text-slate-900">Dữ liệu thương hiệu & sản phẩm</div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Nạp Brand Guideline, tính cách thương hiệu, SKU sản phẩm, giá bán, kho media 3D và dữ liệu khách hàng.
                      </p>
                    </div>
                  </div>

                  {/* Connector indicator */}
                  <div className="flex items-center ml-6 sm:ml-8 pl-4 py-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  </div>

                  {/* Step 2: AI Planning */}
                  <div className="relative flex items-start gap-4 sm:gap-6 group">
                    <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-white border border-slate-300 text-slate-800 flex items-center justify-center shrink-0 shadow-2xs z-10 transition-transform group-hover:scale-105">
                      <Target className="w-5 h-5 text-slate-700" />
                    </div>
                    <div className="flex-1 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs hover:border-slate-400 transition-all">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">Node 02 // Strategic AI</span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-mono rounded-md font-medium">Campaign Planner</span>
                      </div>
                      <div className="text-sm sm:text-base font-bold text-slate-900">AI lập kế hoạch (Campaign Planning)</div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Tự động phân tích mục tiêu, xác định góc tiếp cận khách hàng, xây dựng Content Pillars và đề xuất phân bổ ngân sách.
                      </p>
                    </div>
                  </div>

                  {/* Connector indicator */}
                  <div className="flex items-center ml-6 sm:ml-8 pl-4 py-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  </div>

                  {/* Step 3: AI Content Production */}
                  <div className="relative flex items-start gap-4 sm:gap-6 group">
                    <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-white border border-slate-300 text-slate-800 flex items-center justify-center shrink-0 shadow-2xs z-10 transition-transform group-hover:scale-105">
                      <Sparkles className="w-5 h-5 text-slate-700" />
                    </div>
                    <div className="flex-1 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs hover:border-slate-400 transition-all">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">Node 03 // Generation</span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-mono rounded-md font-medium">Omni Factory</span>
                      </div>
                      <div className="text-sm sm:text-base font-bold text-slate-900">AI tạo nội dung (Content Factory)</div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Tự động sinh trọn bộ bài viết Blog chuẩn SEO, Caption Social đa nền tảng, Kịch bản video ngắn, Banner và Email Marketing.
                      </p>
                    </div>
                  </div>

                  {/* Connector indicator */}
                  <div className="flex items-center ml-6 sm:ml-8 pl-4 py-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  </div>

                  {/* Step 4: Human Governance Gate (Refined Luxury Enterprise Checkpoint) */}
                  <div className="relative flex items-start gap-4 sm:gap-6 group">
                    <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-md z-10 transition-transform group-hover:scale-105 border border-slate-800">
                      <ShieldCheck className="w-6 h-6 text-slate-100" />
                    </div>
                    <div className="flex-1 bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-800 hover:border-slate-700 transition-all">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">Node 04 // Security & Compliance</span>
                        <span className="px-2.5 py-0.5 bg-slate-800 text-slate-200 border border-slate-700 text-[10px] font-mono rounded-full font-semibold">
                          Human-in-the-Loop
                        </span>
                      </div>
                      <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                        <span>Người dùng duyệt</span>
                        <span className="text-xs text-slate-400 font-normal">(Human Approval & Brand Gate)</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Kiểm duyệt bản quyền, quét thông tin nhạy cảm và phê duyệt 2 lớp bắt buộc trước khi xuất bản nội dung hoặc chi tiền quảng cáo.
                      </p>
                    </div>
                  </div>

                  {/* Connector indicator */}
                  <div className="flex items-center ml-6 sm:ml-8 pl-4 py-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  </div>

                  {/* Step 5: Multi-Channel Distribution */}
                  <div className="relative flex items-start gap-4 sm:gap-6 group">
                    <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-white border border-slate-300 text-slate-800 flex items-center justify-center shrink-0 shadow-2xs z-10 transition-transform group-hover:scale-105">
                      <Share2 className="w-5 h-5 text-slate-700" />
                    </div>
                    <div className="flex-1 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs hover:border-slate-400 transition-all space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">Node 05 // Distribution</span>
                        <span className="text-[10px] font-mono text-slate-500">4 Kênh Trọng Tâm</span>
                      </div>
                      <div className="text-sm sm:text-base font-bold text-slate-900">
                        Website <span className="text-slate-400 font-normal">|</span> Social <span className="text-slate-400 font-normal">|</span> Email <span className="text-slate-400 font-normal">|</span> Ads
                      </div>
                      
                      {/* Refined Segmented Channel Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                        <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-center">
                          <div className="text-xs font-semibold text-slate-800">Website</div>
                          <div className="text-[10px] font-mono text-slate-400 mt-0.5">CMS / Blog SEO</div>
                        </div>
                        <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-center">
                          <div className="text-xs font-semibold text-slate-800">Social</div>
                          <div className="text-[10px] font-mono text-slate-400 mt-0.5">Meta / TikTok</div>
                        </div>
                        <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-center">
                          <div className="text-xs font-semibold text-slate-800">Email</div>
                          <div className="text-[10px] font-mono text-slate-400 mt-0.5">CRM Flows</div>
                        </div>
                        <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-center">
                          <div className="text-xs font-semibold text-slate-800">Ads</div>
                          <div className="text-[10px] font-mono text-slate-400 mt-0.5">Paid Media</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Connector indicator */}
                  <div className="flex items-center ml-6 sm:ml-8 pl-4 py-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  </div>

                  {/* Step 6: Tracking & Data Ingestion */}
                  <div className="relative flex items-start gap-4 sm:gap-6 group">
                    <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-white border border-slate-300 text-slate-800 flex items-center justify-center shrink-0 shadow-2xs z-10 transition-transform group-hover:scale-105">
                      <RefreshCw className="w-5 h-5 text-slate-700" />
                    </div>
                    <div className="flex-1 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs hover:border-slate-400 transition-all">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">Node 06 // Tracking Layer</span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-mono rounded-md font-medium">Real-time Telemetry</span>
                      </div>
                      <div className="text-sm sm:text-base font-bold text-slate-900">Thu thập dữ liệu</div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Thu thập tín hiệu người dùng và chuyển đổi theo thời gian thực qua GA4, Meta & TikTok Pixels, UTM parameters và CRM.
                      </p>
                    </div>
                  </div>

                  {/* Connector indicator */}
                  <div className="flex items-center ml-6 sm:ml-8 pl-4 py-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  </div>

                  {/* Step 7: Unified Reporting */}
                  <div className="relative flex items-start gap-4 sm:gap-6 group">
                    <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-white border border-slate-300 text-slate-800 flex items-center justify-center shrink-0 shadow-2xs z-10 transition-transform group-hover:scale-105">
                      <BarChart3 className="w-5 h-5 text-slate-700" />
                    </div>
                    <div className="flex-1 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs hover:border-slate-400 transition-all">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">Node 07 // Intelligence Hub</span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-mono rounded-md font-medium">Performance Metrics</span>
                      </div>
                      <div className="text-sm sm:text-base font-bold text-slate-900">Dashboard báo cáo</div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Trực quan hóa tổng hợp: Reach, Impression, CTR, CPL, CAC, Doanh thu thực và Tỷ suất hoàn vốn quảng cáo (ROAS).
                      </p>
                    </div>
                  </div>

                  {/* Connector indicator */}
                  <div className="flex items-center ml-6 sm:ml-8 pl-4 py-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  </div>

                  {/* Step 8 & Feedback Loop (The Closed Loop Apex) */}
                  <div className="relative flex items-start gap-4 sm:gap-6 group">
                    <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-md z-10 transition-transform group-hover:scale-105 border border-slate-800">
                      <Zap className="w-6 h-6 text-amber-400" />
                    </div>
                    <div className="flex-1 bg-white border-2 border-slate-900 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-900 font-extrabold">Node 08 // Closed Loop</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        </div>
                        <span className="text-base font-bold text-slate-900 font-mono">↺</span>
                      </div>
                      <div className="text-sm sm:text-base font-extrabold text-slate-900">
                        AI đề xuất tối ưu (Insights & Recommendations)
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        AI tự động giải thích nguyên nhân tăng giảm và xuất ra đề xuất hành động tiếp theo, nạp ngược dữ liệu vào <strong>Node 02</strong> để hoàn thiện chu kỳ kế hoạch tiếp theo.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Loop Connector Ribbon */}
                <div className="mt-6 p-3.5 bg-slate-100/80 border border-slate-200 rounded-xl text-center flex items-center justify-center gap-2 text-xs font-mono text-slate-700">
                  <RefreshCw className="w-3.5 h-3.5 text-slate-600 animate-spin" />
                  <span>Chu trình tự học & tối ưu hóa tự động khép kín (Continuous Learning Loop ↺)</span>
                </div>
              </div>
            </div>

            {/* Core Principle Callout */}
            <div className="p-4 sm:p-5 bg-[#fef7e0] border border-[#feefc3] rounded-2xl flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-[#f9ab00] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#b06000] mb-1">Nguyên tắc cốt lõi: Human-in-the-loop & Safety First</h4>
                <p className="text-xs sm:text-sm text-[#794900] leading-relaxed font-medium">
                  AI tự động hóa phần lớn công việc tính toán, sáng tạo và lên lịch, nhưng <strong>mọi nội dung nhạy cảm và hoạt động chi tiền quảng cáo vẫn bắt buộc phải có bước phê duyệt của con người</strong> trước khi chính thức phát hành ra thị trường.
                </p>
              </div>
            </div>
          </section>

          {/* 8-Step Closed Loop Flow */}
          <section className="bg-white border border-[#dadce0] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1a73e8]">
                <Workflow className="w-4 h-4" />
                <span>Luồng vận hành ngắn gọn (Closed-Loop Workflow)</span>
              </div>
              <span className="text-xs font-semibold text-[#5f6368]">8 Bước khép kín</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { step: '01', title: 'Nhập dữ liệu', desc: 'Nạp Brand Guideline, thông số sản phẩm và mục tiêu chiến dịch vào Knowledge Base.', icon: FolderLock, color: 'text-[#1a73e8] bg-[#e8f0fe]' },
                { step: '02', title: 'AI Lập Kế Hoạch', desc: 'AI phân tích, gợi ý Content Pillar, lịch phát hành, tệp khách hàng và ngân sách.', icon: Target, color: 'text-[#f9ab00] bg-[#fef7e0]' },
                { step: '03', title: 'AI Tạo Nội Dung', desc: 'Tự động tạo bài viết SEO, kịch bản video, caption mạng xã hội, banner và email.', icon: Sparkles, color: 'text-[#9334e6] bg-[#f3e8fd]' },
                { step: '04', title: 'Kiểm Duyệt Nội Bộ', desc: 'Kiểm tra tuân thủ brand guideline, bản quyền, thông tin nhạy cảm và phê duyệt.', icon: ShieldCheck, color: 'text-[#137333] bg-[#e6f4ea]' },
                { step: '05', title: 'Xuất Bản Đa Kênh', desc: 'Tự động đẩy bài lên Website CMS, Facebook, TikTok, Instagram và gửi Email.', icon: Send, color: 'text-[#1a73e8] bg-[#e8f0fe]' },
                { step: '06', title: 'Kích Hoạt Paid Ads', desc: 'Phê duyệt ngân sách và tự động đồng bộ chiến dịch lên Meta, Google & TikTok Ads.', icon: DollarSign, color: 'text-[#d93025] bg-[#fce8e6]' },
                { step: '07', title: 'Thu Thập Dữ Liệu', desc: 'Ghi nhận real-time dữ liệu chuyển đổi qua GA4, Pixels, UTM và hệ thống CRM.', icon: RefreshCw, color: 'text-[#3c4043] bg-[#f1f3f4]' },
                { step: '08', title: 'Báo Cáo & Tối Ưu', desc: 'Dashboard báo cáo hợp nhất, AI giải thích nguyên nhân và đề xuất tối ưu campaign kế tiếp.', icon: BarChart3, color: 'text-[#137333] bg-[#e6f4ea]' }
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-[#f8f9fa] border border-[#dadce0] rounded-xl hover:border-[#1a73e8]/40 hover:bg-white transition-all space-y-3 relative group">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#5f6368]/60 tracking-wider">BƯỚC {item.step}</span>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}>
                      <item.icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-[#202124] group-hover:text-[#1a73e8] transition-colors">{item.title}</h4>
                  <p className="text-xs text-[#5f6368] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </motion.div>
      )}

      {/* Tab 2: 9 Feature Groups */}
      {activeTab === 'features' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Nav List of 9 Features */}
            <div className="lg:col-span-4 bg-white border border-[#dadce0] rounded-2xl p-3 shadow-xs space-y-1.5">
              <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#5f6368] border-b border-[#dadce0] mb-2 flex items-center justify-between">
                <span>9 Nhóm tính năng chính</span>
                <span className="px-2 py-0.5 bg-[#e8f0fe] text-[#1a73e8] rounded-full text-2xs font-extrabold">9 Modules</span>
              </div>

              {featureGroups.map((group, index) => {
                const isSelected = selectedFeatureIndex === index;
                const Icon = group.icon;
                return (
                  <button
                    key={group.id}
                    onClick={() => setSelectedFeatureIndex(index)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-[#e8f0fe] border border-[#1a73e8]/30 shadow-2xs'
                        : 'hover:bg-[#f8f9fa] border border-transparent'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                      isSelected ? 'bg-[#1a73e8] text-white border-[#1a73e8]' : 'bg-[#f1f3f4] text-[#5f6368] border-[#dadce0]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-2xs font-bold text-[#5f6368]">{group.number}.</span>
                        <h4 className={`text-xs sm:text-sm font-bold truncate ${isSelected ? 'text-[#1a73e8]' : 'text-[#202124]'}`}>
                          {group.title}
                        </h4>
                      </div>
                      <p className="text-2xs text-[#5f6368] truncate">{group.subTitle}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Detailed Panel for Selected Feature */}
            <div className="lg:col-span-8 bg-white border border-[#dadce0] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              {(() => {
                const current = featureGroups[selectedFeatureIndex];
                const Icon = current.icon;
                return (
                  <div className="space-y-6">
                    <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#dadce0]">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${current.bgColor}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-[#5f6368]">NHÓM TÍNH NĂNG {current.number}</span>
                            <span className="w-1 h-1 rounded-full bg-[#dadce0]" />
                            <span className="text-xs font-semibold text-[#1a73e8]">{current.subTitle}</span>
                          </div>
                          <h2 className="text-xl sm:text-2xl font-bold text-[#202124]">{current.title}</h2>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-[#f8f9fa] border-l-4 border-[#1a73e8] rounded-r-xl border-y border-r border-[#dadce0]">
                      <p className="text-xs sm:text-sm text-[#3c4043] leading-relaxed font-medium">
                        {current.summary}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#5f6368] flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[#137333]" />
                        <span>Danh mục tính năng chi tiết ({current.items.length} hạng mục)</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        {current.items.map((item, i) => (
                          <div key={i} className="flex items-start gap-3 p-3.5 bg-[#f8f9fa] border border-[#dadce0] rounded-xl">
                            <div className="w-5 h-5 rounded-full bg-[#e8f0fe] border border-[#d2e3fc] text-[#1a73e8] flex items-center justify-center text-2xs font-bold shrink-0 mt-0.5">
                              {i + 1}
                            </div>
                            <span className="text-xs sm:text-sm text-[#202124] font-medium leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </motion.div>
      )}

      {/* Tab 3: Interactive Mermaid Architecture Flowchart */}
      {activeTab === 'flow' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <section className="bg-white border border-[#dadce0] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#dadce0]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1a73e8]">
                <Workflow className="w-4 h-4" />
                <span>Sơ đồ Flow Hệ Thống Tổng Thể (End-to-End Architecture)</span>
              </div>
              <span className="text-xs text-[#5f6368]">Mô hình vận hành tự động có kiểm soát</span>
            </div>

            {/* Visual Interactive Flow Diagram */}
            <div className="bg-[#f8f9fa] border border-[#dadce0] rounded-2xl p-6 overflow-x-auto">
              <div className="min-w-[820px] space-y-6 text-xs font-medium">
                {/* Layer 1: Inputs to Knowledge Base */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="p-3.5 bg-white border border-[#1a73e8]/30 rounded-xl shadow-2xs text-center space-y-1">
                    <div className="font-bold text-[#1a73e8]">1. Brand Guideline</div>
                    <div className="text-2xs text-[#5f6368]">Logo, Tone & Voice, Rules</div>
                  </div>
                  <div className="p-3.5 bg-white border border-[#137333]/30 rounded-xl shadow-2xs text-center space-y-1">
                    <div className="font-bold text-[#137333]">2. Product Data</div>
                    <div className="text-2xs text-[#5f6368]">SKU, Specs, Pricing, SEO</div>
                  </div>
                  <div className="p-3.5 bg-white border border-[#f9ab00]/30 rounded-xl shadow-2xs text-center space-y-1">
                    <div className="font-bold text-[#b06000]">3. Customer Data</div>
                    <div className="text-2xs text-[#5f6368]">Persona, CRM, Segments</div>
                  </div>
                  <div className="p-3.5 bg-white border border-[#9334e6]/30 rounded-xl shadow-2xs text-center space-y-1">
                    <div className="font-bold text-[#8430ce]">4. Media Assets</div>
                    <div className="text-2xs text-[#5f6368]">3D, Photos, Video Footage</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="px-4 py-1.5 bg-[#e8f0fe] border border-[#d2e3fc] rounded-full text-xs font-bold text-[#1a73e8] flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Nạp vào AI Knowledge Base (Kho Tri thức Doanh nghiệp)</span>
                  </div>
                </div>

                {/* Layer 2: Planning to AI Content */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-white border border-[#dadce0] rounded-xl text-center space-y-1.5">
                    <div className="text-2xs font-bold text-[#5f6368] uppercase">Kế hoạch</div>
                    <div className="font-bold text-[#202124]">Marketing Brief & AI Planning</div>
                    <p className="text-2xs text-[#5f6368]">Sinh Content Pillar, Lịch trình & Ngân sách</p>
                  </div>

                  <div className="p-4 bg-white border border-[#9334e6]/40 rounded-xl text-center space-y-1.5">
                    <div className="text-2xs font-bold text-[#9334e6] uppercase">Sản xuất</div>
                    <div className="font-bold text-[#8430ce]">AI Content Factory</div>
                    <p className="text-2xs text-[#5f6368]">Tạo SEO Blog, Social, Video, Banner & Email</p>
                  </div>

                  <div className="p-4 bg-white border border-[#d93025]/40 rounded-xl text-center space-y-1.5">
                    <div className="text-2xs font-bold text-[#d93025] uppercase">Quảng cáo</div>
                    <div className="font-bold text-[#c5221f]">Ad Campaign Builder</div>
                    <p className="text-2xs text-[#5f6368]">Setup Meta, Google & TikTok Ads</p>
                  </div>
                </div>

                {/* Layer 3: Dual Approval Gateways */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Gate 1: Content Approval */}
                  <div className="p-4 bg-[#e8f0fe] border border-[#d2e3fc] rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1a73e8] flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" /> Brand & Compliance Check
                      </span>
                      <span className="px-2 py-0.5 bg-white text-[#1a73e8] rounded text-2xs font-bold">Gate 1</span>
                    </div>
                    <p className="text-2xs text-[#5f6368]">
                      Kiểm tra bản quyền, thông điệp nhạy cảm ➔ <strong>Human Approval duyệt xuất bản</strong>
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="px-2.5 py-1 bg-white rounded text-2xs font-semibold text-[#202124]">Website CMS</span>
                      <span className="px-2.5 py-1 bg-white rounded text-2xs font-semibold text-[#202124]">Social Networks</span>
                      <span className="px-2.5 py-1 bg-white rounded text-2xs font-semibold text-[#202124]">Email Marketing</span>
                    </div>
                  </div>

                  {/* Gate 2: Budget Approval */}
                  <div className="p-4 bg-[#fef7e0] border border-[#feefc3] rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#b06000] flex items-center gap-1.5">
                        <DollarSign className="w-4 h-4" /> Budget & Spend Approval
                      </span>
                      <span className="px-2 py-0.5 bg-white text-[#b06000] rounded text-2xs font-bold">Gate 2</span>
                    </div>
                    <p className="text-2xs text-[#794900]">
                      Duyệt chi tiêu ngân sách ➔ <strong>Phát hành chiến dịch Meta / Google / TikTok Ads</strong>
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="px-2.5 py-1 bg-white rounded text-2xs font-semibold text-[#202124]">Meta Ads</span>
                      <span className="px-2.5 py-1 bg-white rounded text-2xs font-semibold text-[#202124]">Google Ads</span>
                      <span className="px-2.5 py-1 bg-white rounded text-2xs font-semibold text-[#202124]">TikTok Ads</span>
                    </div>
                  </div>
                </div>

                {/* Layer 4: Tracking & Analytics Feedback Loop */}
                <div className="p-4 bg-[#e6f4ea] border border-[#ceead6] rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-[#137333]" />
                      <span className="font-bold text-[#137333]">Unified Tracking & AI Optimization Loop</span>
                    </div>
                    <span className="text-2xs font-bold text-[#137333] bg-white px-2.5 py-0.5 rounded-full">Closed-Loop Feedback</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-2.5 bg-white rounded-lg">
                      <div className="text-2xs text-[#5f6368]">Thu thập Data</div>
                      <div className="font-bold text-[#202124]">GA4 / Pixels / CRM / UTM</div>
                    </div>
                    <div className="p-2.5 bg-white rounded-lg">
                      <div className="text-2xs text-[#5f6368]">Báo cáo tập trung</div>
                      <div className="font-bold text-[#202124]">Unified Dashboard (ROAS/CAC)</div>
                    </div>
                    <div className="p-2.5 bg-white rounded-lg">
                      <div className="text-2xs text-[#5f6368]">Vòng lặp tối ưu</div>
                      <div className="font-bold text-[#137333]">AI Insights & Recommendations ➔ Master Plan</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      )}

      {/* Tab 4: Interactive Live AI Campaign Simulator */}
      {activeTab === 'demo' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <section className="bg-white border border-[#dadce0] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#dadce0]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#137333]">
                <Sparkles className="w-4 h-4" />
                <span>Trải nghiệm trực tiếp AI Campaign Generator</span>
              </div>
              <span className="text-xs text-[#5f6368]">Mô phỏng tức thì</span>
            </div>

            {/* Input Form */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#202124] mb-1.5">Tên thương hiệu</label>
                <input
                  type="text"
                  value={simBrandName}
                  onChange={(e) => setSimBrandName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#dadce0] rounded-xl text-xs font-semibold text-[#202124] focus:outline-none focus:border-[#1a73e8]"
                  placeholder="VD: Monos Living"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#202124] mb-1.5">Tên sản phẩm trọng tâm</label>
                <input
                  type="text"
                  value={simProductName}
                  onChange={(e) => setSimProductName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#dadce0] rounded-xl text-xs font-semibold text-[#202124] focus:outline-none focus:border-[#1a73e8]"
                  placeholder="VD: Ghế Ergonomic Herman X9"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#202124] mb-1.5">Mục tiêu chiến dịch (Goal)</label>
                <select
                  value={simGoal}
                  onChange={(e) => setSimGoal(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#dadce0] rounded-xl text-xs font-semibold text-[#202124] focus:outline-none focus:border-[#1a73e8]"
                >
                  <option value="launch">Ra mắt sản phẩm mới (Product Launch)</option>
                  <option value="lead">Thu thập khách hàng tiềm năng (Lead Gen)</option>
                  <option value="sales">Thúc đẩy doanh số / Flash Sale (Conversion)</option>
                  <option value="brand">Gia tăng nhận diện thương hiệu (Brand Awareness)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSimulateGenerate}
                disabled={isGenerating}
                className="px-6 py-2.5 bg-[#1a73e8] hover:bg-[#1557d0] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>AI đang phân tích & lập kế hoạch...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Lập kế hoạch & Tạo nội dung bằng AI</span>
                  </>
                )}
              </button>
            </div>

            {/* Generated Campaign Plan Output */}
            {generatedPlan && (
              <div className="mt-6 pt-6 border-t border-[#dadce0] space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#202124] flex items-center gap-2">
                    <CheckCheck className="w-5 h-5 text-[#137333]" />
                    <span>Kết quả AI Campaign Plan được khởi tạo</span>
                  </h3>
                  <span className="px-3 py-1 bg-[#e6f4ea] text-[#137333] border border-[#ceead6] rounded-full text-xs font-bold">
                    Sẵn sàng xuất bản & chạy Ads
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Strategic Overview */}
                  <div className="p-5 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#1a73e8]">Thông điệp & Đối tượng mục tiêu</div>
                    <div className="p-3 bg-white border border-[#dadce0] rounded-xl">
                      <div className="text-2xs font-bold text-[#5f6368] mb-1">Key Message / Slogan</div>
                      <div className="text-xs sm:text-sm font-bold text-[#202124]">"{generatedPlan.slogan}"</div>
                    </div>
                    <div className="p-3 bg-white border border-[#dadce0] rounded-xl">
                      <div className="text-2xs font-bold text-[#5f6368] mb-1">Target Audience Segment</div>
                      <div className="text-xs text-[#202124] font-medium">{generatedPlan.targetAudience}</div>
                    </div>

                    <div className="text-xs font-bold uppercase tracking-wider text-[#1a73e8] pt-2">Content Pillars chiến lược</div>
                    <div className="space-y-1.5">
                      {generatedPlan.contentPillars.map((pillar, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#202124] font-medium bg-white p-2.5 rounded-lg border border-[#dadce0]">
                          <span className="w-4 h-4 rounded-full bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center text-2xs font-bold shrink-0">
                            {i + 1}
                          </span>
                          <span>{pillar}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Multi-channel Content Output */}
                  <div className="p-5 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#9334e6]">Mẫu nội dung đa kênh tự động</div>
                    
                    <div className="p-3 bg-white border border-[#dadce0] rounded-xl space-y-1">
                      <div className="text-2xs font-bold text-[#d93025] flex items-center gap-1">
                        <Megaphone className="w-3 h-3" /> Paid Ad Copy (Meta/TikTok)
                      </div>
                      <p className="text-xs text-[#202124] font-medium leading-relaxed">{generatedPlan.sampleAdCopy}</p>
                    </div>

                    <div className="p-3 bg-white border border-[#dadce0] rounded-xl space-y-1">
                      <div className="text-2xs font-bold text-[#1a73e8] flex items-center gap-1">
                        <Share2 className="w-3 h-3" /> Social Organic Post
                      </div>
                      <p className="text-xs text-[#202124] font-medium leading-relaxed">{generatedPlan.sampleSocialPost}</p>
                    </div>

                    <div className="p-3 bg-white border border-[#dadce0] rounded-xl space-y-1">
                      <div className="text-2xs font-bold text-[#137333] flex items-center gap-1">
                        <Mail className="w-3 h-3" /> Email Marketing Subject
                      </div>
                      <p className="text-xs text-[#202124] font-medium leading-relaxed">{generatedPlan.sampleEmailSubject}</p>
                    </div>

                    {/* Budget Allocation bar */}
                    <div className="pt-2">
                      <div className="text-2xs font-bold text-[#5f6368] mb-1.5 uppercase">Đề xuất phân bổ ngân sách:</div>
                      <div className="flex h-3 rounded-full overflow-hidden border border-[#dadce0]">
                        <div className="bg-[#1a73e8]" style={{ width: '45%' }} title="Paid Social (45%)" />
                        <div className="bg-[#f9ab00]" style={{ width: '30%' }} title="Google Search (30%)" />
                        <div className="bg-[#9334e6]" style={{ width: '15%' }} title="KOL/Seeding (15%)" />
                        <div className="bg-[#137333]" style={{ width: '10%' }} title="Email CRM (10%)" />
                      </div>
                      <div className="flex flex-wrap gap-3 text-2xs text-[#5f6368] mt-2">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#1a73e8]" /> Paid Social 45%</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#f9ab00]" /> Google Ads 30%</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#9334e6]" /> Creators 15%</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#137333]" /> CRM Email 10%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </motion.div>
      )}
    </motion.div>
  );
}
