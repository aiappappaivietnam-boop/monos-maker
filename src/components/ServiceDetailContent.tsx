/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { CheckCircle2, ListChecks, Target, FileText, Monitor, ChevronLeft, Laptop, Dumbbell, LayoutGrid, Palette, Waves, Lamp, TreePine, Sofa, Flower2, Mountain, Hammer, Armchair, Printer } from 'lucide-react';
import { Service } from '../types';
import { exportScopeToPdf } from '../lib/exportScopePdf';
import MonosbaseDetailView from './MonosbaseDetailView';
import AiManagementDetailView from './AiManagementDetailView';
import InteractiveSalesDetailView from './InteractiveSalesDetailView';
import CategoryGalleryDetailView from './CategoryGalleryDetailView';
import BrandMarketingDetailView from './BrandMarketingDetailView';
import BrandDesignDetailView from './BrandDesignDetailView';
import FurnitureDevelopmentDetailView from './FurnitureDevelopmentDetailView';
import FurnitureDesignDetailView from './FurnitureDesignDetailView';

interface ServiceDetailContentProps {
  service: Service;
  onBack: () => void;
  onShowMonosbaseTech?: () => void;
  backTitle?: string;
  hideBack?: boolean;
}

export default function ServiceDetailContent({ 
  service, 
  onBack, 
  onShowMonosbaseTech,
  backTitle, 
  hideBack 
}: ServiceDetailContentProps) {
  if (service.id === 'monosbase') {
    return (
      <MonosbaseDetailView 
        service={service} 
        onBack={onBack} 
        hideBack={hideBack} 
        onShowTech={onShowMonosbaseTech}
      />
    );
  }

  if (service.id === 'bot-team') {
    return <AiManagementDetailView service={service} onBack={onBack} hideBack={hideBack} />;
  }

  if (service.id === '3d-interactive') {
    return <InteractiveSalesDetailView service={service} onBack={onBack} hideBack={hideBack} />;
  }

  if (service.id === 'brand-marketing') {
    return <BrandMarketingDetailView service={service} onBack={onBack} backTitle={backTitle} hideBack={hideBack} />;
  }

  if (service.id === 'brand-design') {
    return <BrandDesignDetailView service={service} onBack={onBack} backTitle={backTitle} hideBack={hideBack} />;
  }

  if (service.id === 'design-rnd-center') {
    return <FurnitureDevelopmentDetailView service={service} onBack={onBack} backTitle={backTitle} hideBack={hideBack} />;
  }

  if (service.id === 'furniture-development') {
    return <FurnitureDesignDetailView service={service} onBack={onBack} backTitle={backTitle} hideBack={hideBack} />;
  }

  const effectiveBackTitle = backTitle || (
    service.id.startsWith('b2b-') ? 'Quay lại OBM' :
    service.id.startsWith('eca-') ? 'Quay lại Ecommerce A' :
    service.id.startsWith('ecb-') ? 'Quay lại Ecommerce B' :
    'Quay lại danh sách dịch vụ'
  );

  // If this service represents a product category, show the rich Gallery View
  const isCategoryItem = 
    service.id.startsWith('eca-') || 
    service.id.startsWith('ecb-') || 
    service.id.startsWith('b2b-') || 
    service.id.startsWith('mod-') ||
    !service.details;

  if (isCategoryItem) {
    return (
      <CategoryGalleryDetailView 
        service={service} 
        onBack={onBack} 
        backTitle={effectiveBackTitle} 
        hideBack={hideBack}
      />
    );
  }

  const getCategoryIcon = (iconName: string) => {
    const className = "w-6 h-6 text-[#1a73e8]";
    switch (iconName) {
      case 'Laptop': return <Laptop className={className} />;
      case 'Dumbbell': return <Dumbbell className={className} />;
      case 'Palette': return <Palette className={className} />;
      case 'Waves': return <Waves className={className} />;
      case 'Lamp': return <Lamp className={className} />;
      case 'TreePine': return <TreePine className={className} />;
      case 'Sofa': return <Sofa className={className} />;
      case 'Flower2': return <Flower2 className={className} />;
      case 'Mountain': return <Mountain className={className} />;
      case 'Hammer': return <Hammer className={className} />;
      case 'Armchair': return <Armchair className={className} />;
      default: return <LayoutGrid className={className} />;
    }
  };

  if (!service.details) return (
    <div className="flex flex-col items-center justify-center py-20 text-[#5f6368]">
      <p>Thông tin chi tiết đang được cập nhật...</p>
      {!hideBack && (
        <button 
          onClick={onBack}
          className="mt-4 px-5 py-2 bg-[#1a73e8] text-white rounded-full text-sm font-semibold hover:bg-[#1557d0] transition-colors"
        >
          {effectiveBackTitle}
        </button>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-6"
    >
      {/* Detail Header / Back & Action bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        {!hideBack ? (
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a73e8] hover:text-[#1557d0] transition-colors group cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{effectiveBackTitle}</span>
          </button>
        ) : <div />}

        <button
          onClick={() => exportScopeToPdf(service, { customTitle: `${service.name} (Phạm Vi Công Việc & Triển Khai)` })}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3c4043] hover:text-[#202124] bg-white hover:bg-[#f1f3f4] border border-[#dadce0] transition-all cursor-pointer px-3.5 py-1.5 rounded-full shadow-2xs"
          title="Xuất tài liệu phạm vi công việc ra file PDF"
        >
          <Printer className="w-3.5 h-3.5 text-[#1a73e8]" />
          <span>Xuất PDF</span>
        </button>
      </div>

        {/* Cover Image or Video Demo */}
        {service.image && (
          <div className="w-full bg-white border border-[#dadce0] rounded-2xl flex items-center justify-center p-4 sm:p-6 mb-8 shadow-xs overflow-hidden">
            {service.image.startsWith('http') && !service.image.match(/\.(mp4|webm|ogg|mov|jpg|jpeg|png|gif|webp|svg)$/i) ? (
              <div className="w-full aspect-video bg-[#f8f9fa] rounded-xl border border-[#dadce0] flex flex-col items-center justify-center gap-4 group cursor-pointer overflow-hidden relative">
                {service.image.includes('youtube.com') || service.image.includes('youtu.be') ? (
                  <iframe 
                    src={`https://www.youtube.com/embed/${service.image.split('/').pop()?.split('?')[0]}`}
                    className="absolute inset-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="YouTube Video Demo"
                  />
                ) : service.image.includes('screenapp.io') ? (
                  <iframe 
                    src={service.image.replace('/app/v/', '/view/v/')} 
                    className="absolute inset-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Video Demo"
                  />
                ) : (
                  <a 
                    href={service.image} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 text-[#5f6368] group-hover:text-[#1a73e8] transition-all"
                  >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xs border border-[#dadce0]">
                      <Monitor className="w-8 h-8 text-[#1a73e8]" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1a73e8]">Xem Video Demo</span>
                  </a>
                )}
              </div>
            ) : service.image.match(/\.(mp4|webm|ogg|mov)$/i) || service.image.startsWith('/') && service.image.endsWith('.mp4') ? (
              <video 
                src={service.image} 
                controls 
                autoPlay 
                loop 
                muted 
                className="w-full h-auto object-contain rounded-xl shadow-xs border border-[#dadce0]"
              />
            ) : (
              <img 
                src={service.image} 
                alt={service.name} 
                className="w-full h-auto object-contain rounded-xl" 
                referrerPolicy="no-referrer"
              />
            )}
          </div>
        )}

        {/* Main Service Card Title */}
        <div className="bg-white border border-[#dadce0] rounded-2xl p-6 sm:p-8 shadow-xs mb-8">
          <div className="w-14 h-14 bg-[#e8f0fe] border border-[#d2e3fc] text-[#1a73e8] flex items-center justify-center rounded-2xl mb-5 shadow-2xs">
            <FileText className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#202124] leading-tight mb-4 tracking-tight">
            {service.name}
          </h1>
          <div className="flex flex-wrap gap-2.5 text-xs sm:text-sm">
            <div className="flex items-center gap-2 px-3.5 py-1 bg-[#e8f0fe] text-[#1a73e8] rounded-full border border-[#d2e3fc] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#1a73e8]" />
              <span>Hình thức: {service.type === 'package' ? 'Trọn gói' : 'Theo đơn vị (SKU)'}</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1 bg-[#e6f4ea] text-[#137333] rounded-full border border-[#ceead6] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#137333]" />
              <span>Trạng thái: Khả dụng triển khai</span>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {/* Categories */}
          {service.details.categories && (
            <section className="bg-white border border-[#dadce0] rounded-2xl p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-5 text-[#5f6368] font-bold uppercase tracking-wider text-xs">
                <LayoutGrid className="w-4 h-4 text-[#1a73e8]" />
                <span>Danh mục sản phẩm trọng tâm</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.details.categories.map((cat, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center gap-4 p-5 bg-[#f8f9fa] border border-[#dadce0] rounded-xl hover:border-[#1a73e8]/40 hover:bg-[#e8f0fe]/30 transition-all group"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-[#dadce0] shadow-2xs shrink-0 group-hover:border-[#1a73e8]/30">
                      {getCategoryIcon(cat.icon)}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#202124] mb-0.5 group-hover:text-[#1a73e8] transition-colors">{cat.name}</h4>
                      <p className="text-xs font-medium text-[#5f6368]">Danh mục sản phẩm</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Overview */}
          <section className="bg-white border border-[#dadce0] rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-4 text-[#5f6368] font-bold uppercase tracking-wider text-xs">
              <Target className="w-4 h-4 text-[#1a73e8]" />
              <span>Tổng quan chiến lược</span>
            </div>
            <div className="p-5 bg-[#f8f9fa] border-l-4 border-[#1a73e8] rounded-r-xl border-y border-r border-[#dadce0]">
              <p className="text-[#202124] text-sm sm:text-base leading-relaxed font-normal">
                "{service.details.overview}"
              </p>
            </div>
          </section>

          {!service.details.categories && (
            <>
              {/* Items */}
              <section className="bg-white border border-[#dadce0] rounded-2xl p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-2 mb-5 text-[#5f6368] font-bold uppercase tracking-wider text-xs">
                  <ListChecks className="w-4 h-4 text-[#1a73e8]" />
                  <span>Hạng mục thực hiện</span>
                </div>
                <div className="space-y-2.5">
                  {service.details.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3.5 p-3.5 bg-[#f8f9fa] border border-[#dadce0] rounded-xl transition-all">
                      <div className="w-6 h-6 rounded-full bg-[#e8f0fe] border border-[#d2e3fc] text-[#1a73e8] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <span className="flex-1 text-sm sm:text-base text-[#202124] leading-relaxed font-medium break-words">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Outcomes */}
              <section className="bg-white border border-[#dadce0] rounded-2xl p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-2 mb-4 text-[#5f6368] font-bold uppercase tracking-wider text-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#137333]" />
                  <span>Kết quả bàn giao</span>
                </div>
                <div className="bg-[#f8f9fa] border border-[#dadce0] rounded-xl p-6">
                  <ul className="space-y-3.5">
                    {service.details.outcomes.map((outcome, i) => (
                      <li key={i} className="flex gap-3.5 items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#137333] shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base text-[#202124] leading-relaxed font-normal">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </>
          )}
        </div>

        {service.footerImage && (
          <div className="mt-8 bg-white border border-[#dadce0] rounded-2xl p-4 sm:p-6 shadow-xs overflow-hidden">
            <img 
              src={service.footerImage} 
              alt={`${service.name} Footer Screenshot`} 
              className="w-full h-auto object-contain rounded-xl" 
              referrerPolicy="no-referrer"
            />
          </div>
        )}
    </motion.div>
  );
}
