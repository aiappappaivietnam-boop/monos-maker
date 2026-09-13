/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  Download, 
  Check, 
  Share2, 
  Box, 
  Sparkles, 
  FileText, 
  Layers, 
  ShieldCheck, 
  Truck, 
  Maximize2, 
  CheckCircle2, 
  Sliders, 
  Copy, 
  ExternalLink,
  RotateCw,
  Eye,
  Info,
  Package,
  Wrench,
  Cpu
} from 'lucide-react';
import { GalleryProduct } from '../data/categoryProductsData';
import CategoryLightboxGalleryModal from './CategoryLightboxGalleryModal';

interface ProductDetailPageProps {
  product: GalleryProduct;
  categoryTitle: string;
  onBack: () => void;
  onSelectForQuotation?: (product: GalleryProduct) => void;
  onSelectRelatedProduct?: (product: GalleryProduct) => void;
  relatedProducts?: GalleryProduct[];
}

export default function ProductDetailPage({
  product,
  categoryTitle,
  onBack,
  onSelectForQuotation,
  onSelectRelatedProduct,
  relatedProducts = []
}: ProductDetailPageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'packaging' | 'downloads'>('overview');
  const [view3DMode, setView3DMode] = useState(false);
  const [selectedFinish, setSelectedFinish] = useState<string>('Standard Natural');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxProduct, setLightboxProduct] = useState<GalleryProduct | null>(null);

  const allImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.thumbnail];

  const handleCopySku = () => {
    navigator.clipboard?.writeText(product.code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleAddQuotation = () => {
    setIsAdded(true);
    if (onSelectForQuotation) {
      onSelectForQuotation(product);
    }
    setTimeout(() => setIsAdded(false), 2500);
  };

  const finishesList = [
    { name: 'Standard Natural', color: '#d7c4b7', desc: 'Vân gỗ tự nhiên sơn phủ gốc nước mờ 15%' },
    { name: 'Walnut Dark Tone', color: '#5c4033', desc: 'Tông màu gỗ Óc Chó ấm áp sang trọng' },
    { name: 'Matte Jet Black', color: '#2b2b2b', desc: 'Sơn tĩnh điện đen nhám chống bám vân tay' },
    { name: 'Custom OEM Color', color: '#1a73e8', desc: 'Sơn màu tùy biến theo mã màu Pantone / NCS của thương hiệu' }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-8 animate-in fade-in duration-300">
      {/* 1. Breadcrumbs & Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#dadce0]">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#5f6368] flex-wrap">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-1.5 font-bold text-[#1a73e8] hover:text-[#1557d0] hover:underline cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{categoryTitle}</span>
          </button>
          <span>/</span>
          <span className="text-[#202124] font-medium truncate max-w-[280px] sm:max-w-md">
            {product.name}
          </span>
        </div>

        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          <button
            onClick={handleCopySku}
            className="px-3 py-1.5 bg-white border border-[#dadce0] rounded-lg text-xs font-semibold text-[#3c4043] hover:bg-[#f8f9fa] flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Sao chép mã SKU"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-[#137333]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>SKU: {product.code}</span>
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: product.name, text: product.description, url: window.location.href });
              } else {
                navigator.clipboard?.writeText(window.location.href);
                alert('Đã sao chép liên kết sản phẩm');
              }
            }}
            className="p-1.5 bg-white border border-[#dadce0] rounded-lg text-[#5f6368] hover:text-[#202124] hover:bg-[#f8f9fa] transition-colors cursor-pointer"
            title="Chia sẻ sản phẩm"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Hero Section: Image Gallery & Key Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Visual Gallery / 3D Canvas (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div 
            onClick={() => {
              if (!view3DMode) {
                setLightboxProduct(product);
                setIsLightboxOpen(true);
              }
            }}
            className={`relative aspect-4/3 w-full bg-[#f8f9fa] rounded-3xl border border-[#dadce0] overflow-hidden group shadow-2xs ${
              !view3DMode ? 'cursor-pointer' : ''
            }`}
            title={!view3DMode ? "Nhấn để phóng to ảnh và xem gallery toàn bộ danh mục" : undefined}
          >
            {!view3DMode ? (
              <>
                <img 
                  src={allImages[selectedImageIndex] || product.thumbnail} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                
                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="px-3.5 py-1.5 rounded-full bg-white text-[#202124] text-xs font-bold shadow-lg flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-[#1a73e8]" />
                    <span>Xem ảnh lớn & Thư viện mẫu</span>
                  </span>
                </div>

                {/* Image overlay badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                  {product.isHot && (
                    <span className="px-3 py-1 bg-[#ea4335] text-white text-xs font-bold rounded-full shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>HOT MODEL</span>
                    </span>
                  )}
                  {product.isNew && (
                    <span className="px-3 py-1 bg-[#1a73e8] text-white text-xs font-bold rounded-full shadow-sm">
                      NEW 2026
                    </span>
                  )}
                  {product.has3D && (
                    <span className="px-3 py-1 bg-[#34a853] text-white text-xs font-bold rounded-full shadow-sm flex items-center gap-1">
                      <Box className="w-3.5 h-3.5" />
                      <span>3D ASSET READY</span>
                    </span>
                  )}
                </div>

                {/* 3D View Toggle Button */}
                {product.has3D && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setView3DMode(true);
                    }}
                    className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-[#1a73e8] px-4 py-2 rounded-xl text-xs font-bold shadow-md border border-[#dadce0] hover:bg-white hover:scale-105 transition-all flex items-center gap-2 cursor-pointer z-10"
                  >
                    <RotateCw className="w-4 h-4 animate-spin text-[#1a73e8]" style={{ animationDuration: '6s' }} />
                    <span>Mở chế độ xoay 3D / AR</span>
                  </button>
                )}
              </>
            ) : (
              /* 3D Interactive Simulation View */
              <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#f1f3f4] to-[#e8eaed] relative select-none">
                <div className="w-32 h-32 rounded-3xl bg-white border-2 border-dashed border-[#1a73e8] flex flex-col items-center justify-center text-[#1a73e8] shadow-lg animate-pulse mb-4">
                  <Box className="w-12 h-12" />
                  <span className="text-xs font-mono font-bold mt-2">GLB / STEP 3D</span>
                </div>
                <h4 className="font-bold text-base text-[#202124] mb-1">Mô phỏng 3D Không Gian 360°</h4>
                <p className="text-xs text-[#5f6368] text-center max-w-sm mb-6">
                  Tương thích với AutoCAD, SolidWorks, Rhino và công nghệ thực tế tăng cường AR Viewer.
                </p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setView3DMode(false)}
                    className="px-4 py-2 bg-white text-[#3c4043] border border-[#dadce0] rounded-xl text-xs font-bold hover:bg-[#f8f9fa] transition-colors cursor-pointer"
                  >
                    Quay lại xem ảnh thực tế
                  </button>
                  <button
                    onClick={() => {
                      alert(`Đang chuẩn bị file 3D Model (${product.code}.glb & .step) tải về...`);
                    }}
                    className="px-4 py-2 bg-[#1a73e8] text-white rounded-xl text-xs font-bold hover:bg-[#1557d0] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải file 3D CAD (.step)</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Thumbnail list */}
          {allImages.length > 1 && !view3DMode && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl border-2 overflow-hidden shrink-0 transition-all cursor-pointer ${
                    selectedImageIndex === idx 
                      ? 'border-[#1a73e8] ring-2 ring-[#1a73e8]/20 scale-102' 
                      : 'border-[#dadce0] hover:border-[#1a73e8]/50 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} thumb ${idx}`} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Commercial & Technical Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-[#e8f0fe] text-[#1a73e8] text-xs font-bold rounded-md uppercase tracking-wider font-mono">
                {product.code}
              </span>
              <span className="text-xs text-[#5f6368] font-medium">
                {product.categoryName}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight leading-snug">
              {product.name}
            </h1>

            <p className="text-sm text-[#5f6368] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing & MOQ Card */}
          <div className="p-5 bg-white border border-[#dadce0] rounded-2xl space-y-4 shadow-2xs">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-[#5f6368] block">Mức giá FOB / Dự toán sản xuất:</span>
                <span className="text-xl sm:text-2xl font-black text-[#1a73e8] tracking-tight">
                  {product.priceRange}
                </span>
              </div>
              <span className="px-2.5 py-1 bg-[#e6f4ea] text-[#137333] text-xs font-bold rounded-full border border-[#137333]/20">
                OEM / OBM Ready
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#f1f3f4] text-xs">
              <div className="p-3 bg-[#f8f9fa] rounded-xl border border-[#dadce0]">
                <span className="text-[#5f6368] block mb-1">Số lượng tối thiểu (MOQ)</span>
                <span className="font-bold text-[#202124] text-sm">{product.moq}</span>
              </div>
              <div className="p-3 bg-[#f8f9fa] rounded-xl border border-[#dadce0]">
                <span className="text-[#5f6368] block mb-1">Thời gian sản xuất (Lead time)</span>
                <span className="font-bold text-[#202124] text-sm">{product.leadTime}</span>
              </div>
            </div>

            {/* Finish/Color options selection */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-[#202124] flex items-center justify-between">
                <span>Màu sắc & Hoàn thiện bề mặt:</span>
                <span className="text-xs font-normal text-[#1a73e8]">{selectedFinish}</span>
              </span>
              <div className="flex items-center gap-2.5">
                {finishesList.map((f, fIdx) => (
                  <button
                    key={fIdx}
                    onClick={() => setSelectedFinish(f.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer relative ${
                      selectedFinish === f.name ? 'border-[#1a73e8] scale-110 ring-2 ring-[#1a73e8]/30' : 'border-white hover:scale-105 shadow-xs'
                    }`}
                    style={{ backgroundColor: f.color }}
                    title={`${f.name} - ${f.desc}`}
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleAddQuotation}
                className={`w-full py-3.5 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer ${
                  isAdded 
                    ? 'bg-[#137333] text-white' 
                    : 'bg-[#1a73e8] hover:bg-[#1557d0] text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Đã thêm vào Báo giá Dự án!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Thêm vào Báo giá / Yêu cầu OBM</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  alert(`Hệ thống đang xuất trọn bộ hồ sơ kỹ thuật (2D Drawing, 3D STEP, BOM Vật liệu) cho mã ${product.code}`);
                }}
                className="w-full py-2.5 px-4 bg-white border border-[#dadce0] hover:bg-[#f8f9fa] text-[#3c4043] rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#1a73e8]" />
                <span>Tải trọn bộ Spec Sheet & CAD (ZIP)</span>
              </button>
            </div>
          </div>

          {/* Quick Features Tags */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#5f6368] uppercase tracking-wider block">
              Đặc tính nổi bật:
            </span>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 bg-[#f1f3f4] text-[#3c4043] text-xs font-semibold rounded-lg border border-[#dadce0]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Deep Detail Tabs (BOM Specifications, Packaging, Engineering Docs) */}
      <div className="bg-white border border-[#dadce0] rounded-3xl overflow-hidden shadow-2xs">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 p-2 bg-[#f8f9fa] border-b border-[#dadce0] overflow-x-auto">
          {[
            { id: 'overview', label: 'Thông số kỹ thuật & Vật liệu', icon: Sliders },
            { id: 'specs', label: 'Bản vẽ CAD & Chi tiết gia công', icon: FileText },
            { id: 'packaging', label: 'Quy cách đóng gói & Vận chuyển', icon: Package },
            { id: 'downloads', label: 'Tải tài liệu & Chứng chỉ', icon: Download }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive 
                    ? 'bg-white text-[#1a73e8] shadow-xs border border-[#dadce0]' 
                    : 'text-[#5f6368] hover:text-[#202124] hover:bg-white/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#1a73e8]' : 'text-[#5f6368]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-[#202124] flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#1a73e8]" />
                    <span>Cấu trúc & Kích thước cơ bản</span>
                  </h3>
                  
                  <div className="space-y-2.5">
                    <div className="p-3 bg-[#f8f9fa] rounded-xl flex items-start justify-between text-xs border border-[#dadce0]">
                      <span className="text-[#5f6368] font-medium">Kích thước bao (W x D x H)</span>
                      <span className="font-bold text-[#202124] text-right font-mono">{product.dimensions}</span>
                    </div>

                    <div className="p-3 bg-[#f8f9fa] rounded-xl flex items-start justify-between text-xs border border-[#dadce0]">
                      <span className="text-[#5f6368] font-medium">Vật liệu chính (Primary Material)</span>
                      <span className="font-bold text-[#202124] text-right max-w-[60%]">{product.material}</span>
                    </div>

                    <div className="p-3 bg-[#f8f9fa] rounded-xl flex items-start justify-between text-xs border border-[#dadce0]">
                      <span className="text-[#5f6368] font-medium">Xử lý bề mặt (Surface Finish)</span>
                      <span className="font-bold text-[#202124] text-right max-w-[60%]">{product.finish}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-base font-bold text-[#202124] flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-[#1a73e8]" />
                    <span>Chi tiết thông số kiểm định (QA/QC)</span>
                  </h3>

                  <div className="space-y-2.5">
                    {product.specifications.map((spec, sIdx) => (
                      <div key={sIdx} className="p-3 bg-[#f8f9fa] rounded-xl flex items-start justify-between text-xs border border-[#dadce0]">
                        <span className="text-[#5f6368] font-medium">{spec.label}</span>
                        <span className="font-bold text-[#202124] text-right max-w-[60%]">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Manufacturing Capabilities Banner */}
              <div className="p-4 bg-[#e8f0fe]/60 border border-[#1a73e8]/20 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1a73e8] text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-[#1a73e8]">
                    Đảm bảo Tiêu chuẩn Xuất khẩu Quốc tế (US / EU / JP)
                  </h4>
                  <p className="text-xs text-[#5f6368]">
                    Hỗ trợ chứng nhận kiểm định độ bền BIFMA, CARB P2, FSC 100%, REACH và thử nghiệm rơi tự do ISTA 3A Drop Test.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-6">
              <div className="p-6 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white border border-[#dadce0] flex items-center justify-center text-[#1a73e8] shadow-sm">
                  <FileText className="w-8 h-8" />
                </div>
                <div className="max-w-md">
                  <h4 className="font-bold text-base text-[#202124] mb-1">
                    Bản vẽ kỹ thuật 2D & Cấu trúc BOM Lắp ráp
                  </h4>
                  <p className="text-xs text-[#5f6368] leading-relaxed">
                    Bao gồm kích thước chi tiết từng cấu kiện, mặt cắt khớp nối mộng âm dương và danh mục phụ kiện vít liên kết đi kèm.
                  </p>
                </div>
                <button
                  onClick={() => alert(`Đang tải file CAD bản vẽ kỹ thuật (.dwg / .pdf) của ${product.code}`)}
                  className="px-5 py-2.5 bg-[#1a73e8] hover:bg-[#1557d0] text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải Bản Vẽ 2D CAD (.dwg / .pdf)</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'packaging' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl space-y-2">
                  <div className="text-xs font-bold text-[#5f6368] uppercase">Quy cách đóng hộp (Packaging)</div>
                  <div className="text-base font-bold text-[#202124]">Flat-Pack KD (Thùng 5 Lớp 1A)</div>
                  <div className="text-xs text-[#5f6368]">Bảo vệ 6 mặt bằng xốp EPS mật độ cao + bọc góc cứng bảo vệ mép.</div>
                </div>

                <div className="p-4 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl space-y-2">
                  <div className="text-xs font-bold text-[#5f6368] uppercase">Thể tích CBM Ước tính</div>
                  <div className="text-base font-bold text-[#1a73e8]">0.12 - 0.28 CBM / kiện</div>
                  <div className="text-xs text-[#5f6368]">Tối ưu hóa sức chứa tối đa cho Container 40HQ (chứa ~280 - 450 kiện).</div>
                </div>

                <div className="p-4 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl space-y-2">
                  <div className="text-xs font-bold text-[#5f6368] uppercase">Thử nghiệm Thả rơi</div>
                  <div className="text-base font-bold text-[#137333] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Pass ISTA 3A Drop Safe</span>
                  </div>
                  <div className="text-xs text-[#5f6368]">Đạt chuẩn vận chuyển bưu kiện thương mại điện tử D2C an toàn 100%.</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'downloads' && (
            <div className="space-y-3">
              {[
                { name: `Spec_Sheet_${product.code}_2026.pdf`, size: '2.4 MB', type: 'Hồ sơ thông số kỹ thuật' },
                { name: `CAD_2D_Drawing_${product.code}.dwg`, size: '8.1 MB', type: 'Bản vẽ chi tiết AutoCAD' },
                { name: `3D_Model_${product.code}_Step.stp`, size: '18.5 MB', type: 'Mô hình SolidWorks / Rhino' },
                { name: `ISTA_Drop_Test_Report_${product.code}.pdf`, size: '1.2 MB', type: 'Biên bản thử nghiệm đóng gói' }
              ].map((file, fIdx) => (
                <div 
                  key={fIdx}
                  className="p-4 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl flex items-center justify-between hover:bg-white hover:border-[#1a73e8] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#dadce0] flex items-center justify-center text-[#1a73e8] group-hover:bg-[#e8f0fe]">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#202124]">{file.name}</div>
                      <div className="text-[11px] text-[#5f6368]">{file.type} • {file.size}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Đang tải file ${file.name}...`)}
                    className="px-3.5 py-1.5 bg-white border border-[#dadce0] rounded-xl text-xs font-bold text-[#1a73e8] hover:bg-[#1a73e8] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải về</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 4. Related Products Strip */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-[#dadce0]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#202124]">
              Sản phẩm cùng danh mục ({categoryTitle})
            </h3>
            <span className="text-xs text-[#5f6368]">
              {relatedProducts.length} mẫu khác
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  if (onSelectRelatedProduct) {
                    onSelectRelatedProduct(rel);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="p-4 bg-white border border-[#dadce0] rounded-2xl hover:border-[#1a73e8] hover:shadow-md transition-all cursor-pointer group flex flex-col"
              >
                <div className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#f8f9fa] border border-[#dadce0] mb-3">
                  <img 
                    src={rel.thumbnail} 
                    alt={rel.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-[11px] font-mono text-[#1a73e8] font-bold">{rel.code}</div>
                <div className="text-xs font-bold text-[#202124] line-clamp-1 group-hover:text-[#1a73e8] transition-colors">{rel.name}</div>
                <div className="text-xs font-black text-[#1a73e8] mt-auto pt-2">{rel.priceRange}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Large Image & Category Gallery Modal */}
      <CategoryLightboxGalleryModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        product={lightboxProduct || product}
        allProductsInCategory={relatedProducts.length > 0 ? [product, ...relatedProducts] : [product]}
        categoryName={categoryTitle}
        onSelectProduct={(prod) => {
          setLightboxProduct(prod);
          if (onSelectRelatedProduct && prod.id !== product.id) {
            onSelectRelatedProduct(prod);
          }
        }}
        onSelectForQuotation={onSelectForQuotation}
      />
    </div>
  );
}
