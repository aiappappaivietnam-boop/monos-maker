/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import MonosGraphicCard from './MonosGraphicCard';
import { 
  Box, 
  Cpu, 
  Database, 
  Palette, 
  Megaphone, 
  BoxSelect, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Check, 
  Send, 
  Zap, 
  Workflow,
  Factory, 
  Store, 
  Layers,
  ChevronRight,
  RotateCw
} from 'lucide-react';

interface MonosMakerLandingPageProps {
  onExplorePackages?: (packageId?: string) => void;
  onOpenConsultation?: () => void;
}

export default function MonosMakerLandingPage({ onExplorePackages }: MonosMakerLandingPageProps) {
  // Interactive State for Persona Filtering
  const [selectedPersona, setSelectedPersona] = useState<'all' | 'brand' | 'manufacturer' | 'retail'>('all');
  
  // Interactive Modal State
  const [showContactModal, setShowContactModal] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    company: '',
    businessType: 'Nhà sản xuất Furniture'
  });

  const packages = [
    {
      id: 'pkg-1',
      pkgNum: 'Package 1',
      title: 'AI Management Platform',
      role: 'Lớp Điều phối & Quản trị',
      desc: 'Bộ não điều phối tổng thể, tiếp nhận dữ liệu, quét rủi ro và tự động giao việc cho các phòng ban.',
      icon: Cpu,
      tag: 'The Brain',
      personas: ['all', 'manufacturer']
    },
    {
      id: 'pkg-2',
      pkgNum: 'Package 2',
      title: 'Thiết kế Thương hiệu',
      role: 'Bản sắc & Điểm chạm',
      desc: 'Xây dựng bộ nhận diện, định vị phân khúc, phong cách sống và tài liệu bán hàng chuyên nghiệp.',
      icon: Palette,
      tag: 'Brand Identity',
      personas: ['all', 'brand']
    },
    {
      id: 'pkg-3',
      pkgNum: 'Package 3',
      title: 'Marketing & Tăng trưởng',
      role: 'Tạo Lead & Chuyển đổi',
      desc: 'Chiến dịch thu hút khách hàng tiềm năng, phễu chuyển đổi showroom và vòng lặp dữ liệu thị trường.',
      icon: Megaphone,
      tag: 'Growth Engine',
      personas: ['all', 'brand', 'retail']
    },
    {
      id: 'pkg-4',
      pkgNum: 'Package 4',
      title: 'Furniture Product R&D',
      role: 'Nghiên cứu & Thiết kế',
      desc: 'Thiết kế kiểu dáng, nghiên cứu công thái học, bóc tách bản vẽ kỹ thuật và cấu trúc sẵn sàng sản xuất.',
      icon: Box,
      tag: 'Physical R&D',
      personas: ['all', 'brand', 'manufacturer']
    },
    {
      id: 'pkg-5',
      pkgNum: 'Package 5',
      title: 'Monosbase',
      role: 'Lõi chuẩn hóa dữ liệu',
      desc: 'Phiên bản duy nhất của sự thật (Single Source of Truth) kết nối liền mạch ERP, CRM và 3D Engine.',
      icon: Database,
      tag: 'The Core',
      personas: ['all', 'manufacturer', 'retail']
    },
    {
      id: 'pkg-6',
      pkgNum: 'Package 6',
      title: '3D Interactive Sales',
      role: 'Trải nghiệm Bán hàng',
      desc: 'Không gian 3D tương tác đa điểm, đổi vật liệu thời gian thực, xoay 360°, AR và tính giá tự động.',
      icon: BoxSelect,
      tag: 'Digital Experience',
      personas: ['all', 'retail']
    }
  ];

  const filteredPackages = selectedPersona === 'all' 
    ? packages 
    : packages.filter(p => p.personas.includes(selectedPersona));

  const personasList = [
    { key: 'all' as const, label: 'Tất cả 6 Packages', icon: Layers },
    { key: 'brand' as const, label: 'Xây dựng Brand mới', icon: Palette },
    { key: 'manufacturer' as const, label: 'Nhà sản xuất Furniture', icon: Factory },
    { key: 'retail' as const, label: 'Showroom & Bán lẻ', icon: Store }
  ];

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowContactModal(false);
    }, 2500);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12 sm:space-y-16 pb-20 text-[#202124]">
      
      {/* ------------------------------------------------------------------ */}
      {/* 1. HERO BANNER - Clean, High-impact, Modern */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-white border border-[#dadce0] rounded-3xl p-6 sm:p-12 lg:p-14 shadow-xs relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 bg-[#f1f3f4] text-[#202124] rounded-full border border-[#dadce0] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#1a73e8]" />
              <span>Hệ điều hành Furniture chuyên biệt</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#202124] tracking-tight leading-[1.15]">
                MONOS MAKER
              </h1>
              <p className="text-lg sm:text-2xl font-bold text-[#1a73e8]">
                Nền tảng Quản trị Chuyên biệt & Toàn diện cho Ngành Furniture.
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed max-w-xl">
              Từ <strong className="text-[#202124] font-semibold">Ý tưởng</strong>, <strong className="text-[#202124] font-semibold">Dữ liệu</strong> đến <strong className="text-[#202124] font-semibold">Trải nghiệm</strong> và <strong className="text-[#202124] font-semibold">Doanh thu</strong>. Chuẩn hóa chuỗi giá trị nội thất trên một nền tảng vận hành đồng bộ được điều phối bởi AI.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a 
                href="#packages-section"
                className="px-6 py-3 bg-[#202124] hover:bg-black text-white font-bold text-sm rounded-full transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Khám phá 6 Packages</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: Architectural Elevation & Technical Graphic Card */}
          <div className="lg:col-span-5 flex justify-center">
            <MonosGraphicCard />
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. CORE MANIFESTO & THE 4 CORE CAPABILITIES */}
      {/* ------------------------------------------------------------------ */}
      <section className="space-y-6">
        <div className="p-5 sm:p-8 bg-white border border-[#dadce0] rounded-2xl shadow-xs text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#1a73e8]">Hệ sinh thái dài hạn</span>
          <h2 className="text-lg sm:text-2xl font-extrabold text-[#202124]">
            “Đây không phải là phần mềm. Đây là hệ sinh thái dài hạn chuyển hóa ý tưởng thành doanh thu.”
          </h2>
          <p className="text-xs sm:text-sm text-[#5f6368]">
            Giải quyết triệt để sự đứt gãy giữa thiết kế R&D, dữ liệu sản xuất, marketing và trải nghiệm bán hàng.
          </p>
        </div>

        {/* 4 Core Pillars Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { num: "01", title: "Sáng tạo Sản phẩm", desc: "Nghiên cứu kiểu dáng, R&D vật lý và không gian 3D tương tác.", icon: Box },
            { num: "02", title: "Quản trị Dữ liệu", desc: "Lõi Monosbase chuẩn hóa mã, vật liệu, thông số và BOM xuyên suốt.", icon: Database },
            { num: "03", title: "Định vị Thương hiệu", desc: "Xây dựng bản sắc, ngôn ngữ thiết kế và nhận diện đa điểm chạm.", icon: Palette },
            { num: "04", title: "Nhu cầu Thị trường", desc: "Tạo Lead phễu bán lẻ và thu thập phản hồi khách hàng về R&D.", icon: Megaphone }
          ].map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div key={idx} className="p-5 bg-white border border-[#dadce0] rounded-2xl shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#5f6368]">{item.num}</span>
                  <div className="w-8 h-8 rounded-lg bg-[#f8f9fa] border border-[#dadce0] flex items-center justify-center text-[#202124]">
                    <IconComp className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-bold text-base text-[#202124]">{item.title}</h3>
                <p className="text-xs text-[#5f6368] leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. 6 CHUYÊN BIỆT PACKAGES (Interactive Grid & Persona Filter) */}
      {/* ------------------------------------------------------------------ */}
      <section id="packages-section" className="space-y-6 scroll-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#1a73e8]">Cấu trúc mô-đun</span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-[#202124] mt-1">
              6 Packages Chuyên biệt
            </h2>
          </div>

          {/* Persona Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#f1f3f4] rounded-xl border border-[#dadce0]">
            {personasList.map((p) => {
              const isSelected = selectedPersona === p.key;
              return (
                <button
                  key={p.key}
                  onClick={() => setSelectedPersona(p.key)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-white text-[#202124] shadow-xs' 
                      : 'text-[#5f6368] hover:text-[#202124]'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPackages.map((pkg) => {
            const IconComponent = pkg.icon;
            return (
              <div 
                key={pkg.id}
                className="bg-white border border-[#dadce0] rounded-2xl p-5 hover:border-[#202124] hover:shadow-xs transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#f8f9fa] border border-[#dadce0] text-[#5f6368]">
                      {pkg.pkgNum}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#f8f9fa] border border-[#dadce0] flex items-center justify-center text-[#202124]">
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-[#202124]">{pkg.title}</h3>
                    <span className="text-xs text-[#1a73e8] font-medium">{pkg.role}</span>
                  </div>

                  <p className="text-xs text-[#5f6368] leading-relaxed">
                    {pkg.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#f1f3f4] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#5f6368]">{pkg.tag}</span>
                  <button
                    onClick={() => onExplorePackages?.(pkg.id)}
                    className="text-xs font-bold text-[#202124] hover:text-[#1a73e8] flex items-center gap-1 group cursor-pointer"
                  >
                    <span>Xem dịch vụ</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. THE 2 ENGINES: THE BRAIN & THE CORE */}
      {/* ------------------------------------------------------------------ */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* The Brain (AI Management Platform) */}
        <div className="bg-white border border-[#dadce0] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f8f9fa] border border-[#dadce0] flex items-center justify-center text-[#202124]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase text-[#5f6368] font-bold">The Brain • Package 1</span>
              <h3 className="text-lg font-bold text-[#202124]">AI Management Platform</h3>
            </div>
          </div>
          <p className="text-sm text-[#5f6368] leading-relaxed">
            Không chỉ là Chatbot. Đây là lớp quản trị và điều phối đóng vai trò bộ não kết hợp platform thực thi tự động.
          </p>
          <div className="space-y-2 pt-2 text-xs">
            <div className="flex items-start gap-2 p-2.5 bg-[#f8f9fa] rounded-lg border border-[#dadce0]">
              <Zap className="w-4 h-4 text-[#e37400] shrink-0 mt-0.5" />
              <span><strong>AI (Bộ não):</strong> Tiếp nhận ➔ Phân tích ➔ Quét rủi ro ➔ Đề xuất phương án</span>
            </div>
            <div className="flex items-start gap-2 p-2.5 bg-[#f8f9fa] rounded-lg border border-[#dadce0]">
              <Workflow className="w-4 h-4 text-[#1a73e8] shrink-0 mt-0.5" />
              <span><strong>Platform (Tay chân):</strong> Quản trị ➔ Giao task tự động ➔ Trình duyệt CEO 1-click</span>
            </div>
          </div>
        </div>

        {/* The Core (Monosbase) */}
        <div className="bg-white border border-[#dadce0] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f8f9fa] border border-[#dadce0] flex items-center justify-center text-[#202124]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase text-[#5f6368] font-bold">The Core • Package 5</span>
              <h3 className="text-lg font-bold text-[#202124]">Monosbase (Lõi dữ liệu chuẩn hóa)</h3>
            </div>
          </div>
          <p className="text-sm text-[#5f6368] leading-relaxed">
            Phiên bản duy nhất của sự thật (Single Source of Truth). Không thay thế ERP/CRM mà kết nối đồng bộ 4 đường ống.
          </p>
          <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
            <div className="p-2.5 bg-[#f8f9fa] rounded-lg border border-[#dadce0]">
              <strong className="block text-[#202124] mb-0.5">1. ERP (Sản xuất)</strong>
              <span className="text-[#5f6368] text-[11px]">Định mức BOM & vật tư xưởng</span>
            </div>
            <div className="p-2.5 bg-[#f8f9fa] rounded-lg border border-[#dadce0]">
              <strong className="block text-[#202124] mb-0.5">2. CRM (Kinh doanh)</strong>
              <span className="text-[#5f6368] text-[11px]">Cấu hình riêng & báo giá</span>
            </div>
            <div className="p-2.5 bg-[#f8f9fa] rounded-lg border border-[#dadce0]">
              <strong className="block text-[#202124] mb-0.5">3. 3D Engine</strong>
              <span className="text-[#5f6368] text-[11px]">Mô hình tương tác thời gian thực</span>
            </div>
            <div className="p-2.5 bg-[#f8f9fa] rounded-lg border border-[#dadce0]">
              <strong className="block text-[#202124] mb-0.5">4. Marketing</strong>
              <span className="text-[#5f6368] text-[11px]">Tài liệu & thông số sản phẩm</span>
            </div>
          </div>
        </div>

      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. SEAMLESS VALUE CHAIN PIPELINE (Slide 8 & 9) */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-white border border-[#dadce0] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#1a73e8]">Chuỗi giá trị liền mạch</span>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#202124]">
              Luồng vận hành không đứt gãy, không nhập liệu lại
            </h3>
          </div>
          <span className="text-xs font-mono text-[#5f6368]">From Design to Revenue</span>
        </div>

        {/* 6-Stage Process Pipeline */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { step: "01", title: "R&D Thiết kế", tag: "Pkg 4", desc: "Bản vẽ & Cấu trúc" },
            { step: "02", title: "Số hóa SP", tag: "Pkg 6", desc: "Model 3D & Vật liệu" },
            { step: "03", title: "Nạp Monosbase", tag: "Pkg 5", desc: "Lõi Single of Truth" },
            { step: "04", title: "Bán hàng 3D", tag: "3D Sales", desc: "Cấu hình & Báo giá" },
            { step: "05", title: "Điều phối AI", tag: "Pkg 1", desc: "Tự động giao việc" },
            { step: "06", title: "Sản xuất ERP", tag: "ERP Output", desc: "Gia công & Doanh thu" }
          ].map((item, idx) => (
            <div key={idx} className="p-3 bg-[#f8f9fa] border border-[#dadce0] rounded-xl text-center space-y-1 relative">
              <span className="text-[10px] font-mono font-bold text-[#5f6368]">{item.step} // {item.tag}</span>
              <h4 className="font-bold text-xs text-[#202124]">{item.title}</h4>
              <p className="text-[11px] text-[#5f6368]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. CALL TO ACTION & CONSULTATION (Slide 11 & 12) */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-[#202124] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-md">
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#f59e0b]">Monos Maker Platform</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug">
            Xây dựng kiến trúc vận hành tương lai cho doanh nghiệp nội thất của bạn.
          </h2>
          <p className="text-sm text-white/70">
            Triển khai độc lập từng mô-đun hoặc kết nối toàn diện hệ sinh thái. Được điều phối bởi AI.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setShowContactModal(true)}
              className="px-8 py-3.5 bg-white hover:bg-[#f1f3f4] text-[#202124] font-bold text-sm rounded-full transition-all shadow-md cursor-pointer"
            >
              Khám phá kịch bản ứng dụng riêng biệt
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* MODAL: TƯ VẤN KỊCH BẢN ỨNG DỤNG */}
      {/* ------------------------------------------------------------------ */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#dadce0] shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#dadce0] pb-3">
              <div>
                <h3 className="font-bold text-lg text-[#202124]">Tư vấn Kịch bản MonosMaker</h3>
                <p className="text-xs text-[#5f6368]">Thiết kế phương án triển khai phù hợp mô hình doanh nghiệp</p>
              </div>
              <button 
                onClick={() => setShowContactModal(false)}
                className="w-8 h-8 rounded-full hover:bg-[#f1f3f4] flex items-center justify-center text-[#5f6368] cursor-pointer"
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div className="p-6 bg-[#e6f4ea] border border-[#ceead6] rounded-2xl text-center space-y-2">
                <Check className="w-8 h-8 text-[#137333] mx-auto" />
                <h4 className="font-bold text-[#137333]">Đã ghi nhận yêu cầu</h4>
                <p className="text-xs text-[#137333]">Chuyên gia kiến trúc hệ thống của Monos sẽ liên hệ hỗ trợ bạn sớm nhất.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-semibold text-[#202124] block mb-1">Họ tên đại diện</label>
                  <input 
                    type="text" 
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    placeholder="Nguyễn Văn A" 
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#dadce0] focus:border-[#202124] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#202124] block mb-1">Số điện thoại / Zalo</label>
                  <input 
                    type="tel" 
                    required
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                    placeholder="0912 345 678" 
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#dadce0] focus:border-[#202124] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#202124] block mb-1">Tên công ty / Thương hiệu</label>
                  <input 
                    type="text" 
                    required
                    value={contactForm.company}
                    onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                    placeholder="Công ty CP Nội Thất..." 
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#dadce0] focus:border-[#202124] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#202124] block mb-1">Mô hình kinh doanh chính</label>
                  <select 
                    value={contactForm.businessType}
                    onChange={(e) => setContactForm({...contactForm, businessType: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#dadce0] bg-white focus:border-[#202124] focus:outline-none"
                  >
                    <option>Nhà sản xuất Furniture / Nhà máy</option>
                    <option>Showroom / Chuỗi Bán lẻ nội thất</option>
                    <option>Xây dựng thương hiệu nội thất mới</option>
                    <option>Cần giải pháp Quản trị toàn diện</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full py-3 bg-[#202124] hover:bg-black text-white font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Gửi yêu cầu tư vấn</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
