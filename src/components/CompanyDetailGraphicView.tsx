/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { 
  Building2, 
  Box, 
  Database, 
  Palette, 
  FileDigit, 
  Megaphone, 
  Cpu, 
  Microscope, 
  ShoppingBag, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  LayoutGrid, 
  FileText, 
  Boxes, 
  Sparkle, 
  Laptop, 
  Dumbbell, 
  TreePine, 
  Hammer, 
  Mountain, 
  Armchair, 
  Waves, 
  Lamp, 
  Sofa, 
  Flower2,
  Search,
  Filter,
  X,
  Sliders,
  Calculator,
  Printer,
  Copy,
  Check,
  Plus,
  Pin,
  Pencil,
  Trash2,
  Wand2,
  Layers,
  Image as ImageIcon,
  Clock,
  Calendar,
  Link2,
  ExternalLink
} from 'lucide-react';
import { Service, Company, SelectionState, CustomPackage } from '../types';
import QuotationModal from './QuotationModal';
import CustomPackageDesignModal from './CustomPackageDesignModal';
import CustomPackageDetailModal from './CustomPackageDetailModal';
import CustomPackagePdfModal from './CustomPackagePdfModal';
import { 
  getStoredCustomPackages, 
  saveCustomPackage, 
  deleteCustomPackage 
} from '../lib/customPackagesData';

interface CompanyDetailProps {
  company: Company;
  allowedServices: Service[];
  selections: SelectionState;
  onToggleService?: (serviceId: string) => void;
  onUpdateQuantity?: (serviceId: string, qty: number) => void;
  onSelectServiceDetail: (service: Service) => void;
  onOpenPartnerList: () => void;
  onOpenConfig?: () => void;
  initialCategory?: FilterCategory;
  isPinned?: boolean;
  onTogglePin?: (companyId: string) => void;
}

type FilterCategory = 'all' | 'suggested' | 'eca' | 'ecb' | 'obm' | 'mod';

// Helper to format creation/update datetime for proposals
const formatPackageDateTime = (pkg: CustomPackage) => {
  const dateSource = pkg.updatedAt || pkg.createdAt || pkg.quotationDate;
  if (!dateSource) return '';
  try {
    const d = new Date(dateSource);
    if (isNaN(d.getTime())) {
      return dateSource;
    }
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    
    if (dateSource.includes('T') || dateSource.includes(':')) {
      return `${hours}:${minutes} • ${day}/${month}/${year}`;
    }
    return `${day}/${month}/${year}`;
  } catch {
    return dateSource;
  }
};

export default function CompanyDetailGraphicView({
  company,
  allowedServices,
  selections,
  onToggleService,
  onUpdateQuantity,
  onSelectServiceDetail,
  onOpenPartnerList,
  onOpenConfig,
  initialCategory = 'all',
  isPinned,
  onTogglePin
}: CompanyDetailProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<FilterCategory>(initialCategory);
  const [typeFilter, setTypeFilter] = useState<'all' | 'package' | 'per_unit'>('all');
  const [isQuotationOpen, setIsQuotationOpen] = useState(false);

  // Custom packages state for this company
  const [customPackages, setCustomPackages] = useState<CustomPackage[]>(() => 
    getStoredCustomPackages(company.id)
  );
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
  const [editingCustomPackage, setEditingCustomPackage] = useState<CustomPackage | null>(null);
  const [viewingCustomPackage, setViewingCustomPackage] = useState<CustomPackage | null>(null);
  const [pdfCustomPackage, setPdfCustomPackage] = useState<CustomPackage | null>(null);
  const [deletingPackageId, setDeletingPackageId] = useState<string | null>(null);

  // Reload custom packages whenever company changes
  useEffect(() => {
    setCustomPackages(getStoredCustomPackages(company.id));
  }, [company.id]);

  const handleSaveCustomPackage = (pkg: CustomPackage) => {
    saveCustomPackage(pkg);
    setCustomPackages(getStoredCustomPackages(company.id));
  };

  const handleDeleteCustomPackage = (id: string) => {
    deleteCustomPackage(id);
    setCustomPackages(getStoredCustomPackages(company.id));
    if (viewingCustomPackage?.id === id) {
      setViewingCustomPackage(null);
    }
  };

  const handleOpenNewDesign = () => {
    setEditingCustomPackage(null);
    setIsDesignModalOpen(true);
  };

  const handleOpenEditDesign = (pkg: CustomPackage) => {
    setEditingCustomPackage(pkg);
    setIsDesignModalOpen(true);
  };

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  const getCleanServiceName = (name: string) => {
    if (name.includes('Design - Rnd Center') || name.includes('Design - RnD center')) return 'Design - Rnd Center';
    return name.split(' - ')[0].split(' NTC')[0].split(' Lava')[0].split(' Citi')[0].split(' NX')[0].split(' ĐMS')[0];
  };

  const getIcon = (id: string, service?: Service) => {
    const className = "w-5 h-5 text-[#1a73e8]";
    if (service?.icon) {
      switch (service.icon) {
        case 'Laptop': return <Laptop className={className} />;
        case 'Dumbbell': return <Dumbbell className={className} />;
        case 'TreePine': return <TreePine className={className} />;
        case 'Hammer': return <Hammer className={className} />;
        case 'Mountain': return <Mountain className={className} />;
        case 'Armchair': return <Armchair className={className} />;
        case 'Palette': return <Palette className={className} />;
        case 'Waves': return <Waves className={className} />;
        case 'Lamp': return <Lamp className={className} />;
        case 'Sofa': return <Sofa className={className} />;
        case 'Flower2': return <Flower2 className={className} />;
      }
    }

    switch (id) {
      case 'design-rnd-center': return <Box className={className} />;
      case '3d-interactive': return <Boxes className={className} />;
      case 'digitization': return <FileDigit className={className} />;
      case 'brand-design': return <Palette className={className} />;
      case 'brand-marketing': return <Megaphone className={className} />;
      case 'monosbase': return <Database className="w-5 h-5 text-[#c85a32]" />;
      case 'bot-team': return <Cpu className="w-5 h-5 text-[#c85a32]" />;
      case 'design-rnd-center': return <Microscope className="w-5 h-5 text-[#1a73e8]" />;
      case 'ecommerce-a': return <ShoppingBag className="w-5 h-5 text-[#1a73e8]" />;
      case 'ecommerce-b': return <Sparkles className="w-5 h-5 text-[#7627bb]" />;
      default: return <FileText className={className} />;
    }
  };

  // Group services cleanly by project type / domain
  const rawProjectGroups = useMemo(() => {
    const suggestedIds = company.suggestedServices || [];

    const sortPriority = (a: any, b: any) => {
      const prioritizedIds = ['monosbase', 'bot-team', '3d-interactive', 'design-rnd-center'];
      const aIndex = prioritizedIds.indexOf(a.id);
      const bIndex = prioritizedIds.indexOf(b.id);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return 0;
    };

    const coreServices = allowedServices.filter(s => 
      !s.id.startsWith('eca-') && 
      !s.id.startsWith('ecb-') && 
      !s.id.startsWith('b2b-') && 
      !s.id.startsWith('mod-')
    ).sort(sortPriority);

    const ecomA = allowedServices.filter(s => s.id.startsWith('eca-'));
    const ecomB = allowedServices.filter(s => s.id.startsWith('ecb-'));
    const obm = allowedServices.filter(s => s.id.startsWith('b2b-'));
    const mod = allowedServices.filter(s => s.id.startsWith('mod-'));

    const groups = [];

    // 1. Phạm vi công việc (Gộp toàn bộ dịch vụ cốt lõi vào 1 danh sách)
    if (coreServices.length > 0) {
      groups.push({
        id: 'suggested' as FilterCategory,
        title: 'Phạm vi công việc',
        description: `Các giải pháp trọng tâm & chuyển đổi số được thiết kế cho ${company.name}`,
        services: coreServices
      });
    }

    // 3. Dự án Ecommerce A (Dòng sản phẩm Mass)
    if (ecomA.length > 0) {
      groups.push({
        id: 'eca' as FilterCategory,
        title: 'Dự án Ecommerce A',
        description: 'Dòng sản phẩm thương mại điện tử đại chúng (Mass E-commerce)',
        badge: 'Ecommerce Mass',
        badgeColor: 'bg-[#e8f0fe] text-[#1a73e8] border-[#d2e3fc]',
        services: ecomA
      });
    }

    // 4. Dự án Ecommerce B (Dòng sản phẩm Cao cấp / Limited)
    if (ecomB.length > 0) {
      groups.push({
        id: 'ecb' as FilterCategory,
        title: 'Dự án Ecommerce B',
        description: 'Dòng sản phẩm thiết kế phong cách, phân khúc cao cấp & Limited',
        badge: 'Ecommerce Premium',
        badgeColor: 'bg-[#f3e8fd] text-[#7627bb] border-[#e9d2fd]',
        services: ecomB
      });
    }

    // 5. Dự án OBM B+Furniture / B+Outdoor
    if (obm.length > 0) {
      groups.push({
        id: 'obm' as FilterCategory,
        title: 'Dự án OBM & Chuỗi cung ứng B2B',
        description: 'Phát triển bộ sưu tập OBM, showroom kit và giải pháp phân phối toàn cầu',
        badge: 'OBM',
        badgeColor: 'bg-[#e6f4ea] text-[#137333] border-[#ceead6]',
        services: obm
      });
    }

    // 6. Dự án MOD (Sản xuất theo đơn đặt hàng)
    if (mod.length > 0) {
      groups.push({
        id: 'mod' as FilterCategory,
        title: 'Dự án Sản xuất theo yêu cầu (MOD)',
        description: 'Thiết kế riêng biệt theo dự án và tạo mẫu nhanh công nghiệp',
        badge: 'Bespoke / MOD',
        badgeColor: 'bg-[#fef7e0] text-[#e37400] border-[#fce8b2]',
        services: mod
      });
    }

    return groups;
  }, [allowedServices, company]);

  const suggestedCount = useMemo(() => {
    const suggestedIds = company.suggestedServices || [];
    return allowedServices.filter(s => suggestedIds.includes(s.id)).length;
  }, [allowedServices, company]);

  // Counts for category badges
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: allowedServices.length,
      suggested: suggestedCount,
      core: 0,
      eca: 0,
      ecb: 0,
      obm: 0,
      mod: 0
    };

    rawProjectGroups.forEach(g => {
      counts[g.id] = g.services.length;
    });

    return counts;
  }, [allowedServices, suggestedCount, rawProjectGroups]);

  // Filtered project groups based on category, search, and type
  const filteredProjectGroups = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return rawProjectGroups.map(group => {
      // If filtering by specific category
      if (activeCategory !== 'all' && group.id !== activeCategory) {
        return null;
      }

      // Filter services within group
      const matchingServices = group.services.filter(service => {
        // Search query
        if (query) {
          const matchName = service.name.toLowerCase().includes(query);
          const matchDesc = service.description?.toLowerCase().includes(query) || false;
          const matchId = service.id.toLowerCase().includes(query);
          const matchDetails = service.details?.items?.some(i => i.toLowerCase().includes(query)) || false;
          if (!matchName && !matchDesc && !matchId && !matchDetails) return false;
        }

        // Package / Per-unit filter
        if (typeFilter === 'package' && service.type !== 'package') return false;
        if (typeFilter === 'per_unit' && service.type !== 'per_unit') return false;

        return true;
      });

      if (matchingServices.length === 0) return null;

      return {
        ...group,
        services: matchingServices
      };
    }).filter(Boolean) as typeof rawProjectGroups;
  }, [rawProjectGroups, activeCategory, searchQuery, typeFilter]);

  const totalFilteredServices = useMemo(() => {
    return filteredProjectGroups.reduce((acc, g) => acc + g.services.length, 0);
  }, [filteredProjectGroups]);

  const resetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setTypeFilter('all');
  };

  const hasActiveFilters = searchQuery !== '' || activeCategory !== 'all' || typeFilter !== 'all';

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* 1. Header: Google Profile Card */}
      <div className="bg-white border border-[#dadce0] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#dadce0]">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-[#e8f0fe] border border-[#d2e3fc] rounded-2xl flex items-center justify-center text-[#1a73e8] shrink-0 shadow-2xs">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight">
                  {company.name}
                </h1>
                <span className="px-3 py-0.5 bg-[#e8f0fe] text-[#1a73e8] border border-[#d2e3fc] rounded-full text-xs font-bold">
                  {company.type || 'Pillar B'}
                </span>
              </div>
              <p className="text-sm sm:text-base text-[#5f6368] mt-1.5 font-normal leading-relaxed">
                {company.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap self-start sm:self-center">
            {onTogglePin && (
              <button
                type="button"
                onClick={() => onTogglePin(company.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer shadow-2xs ${
                  isPinned
                    ? 'bg-[#e8f0fe] text-[#1a73e8] border-[#1a73e8]/30 hover:bg-[#d2e3fc]'
                    : 'bg-white text-[#3c4043] border-[#dadce0] hover:bg-[#f8f9fa] hover:text-[#202124]'
                }`}
                title={isPinned ? 'Bỏ ghim khỏi menu Đối tác' : 'Ghim vào menu Đối tác'}
              >
                <Pin className={`w-3.5 h-3.5 ${isPinned ? 'fill-[#1a73e8] text-[#1a73e8]' : 'text-[#5f6368]'}`} />
                <span>{isPinned ? 'Đã ghim menu' : 'Ghim menu'}</span>
              </button>
            )}

            {onOpenConfig && (
              <button
                onClick={onOpenConfig}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#3c4043] bg-white border border-[#dadce0] rounded-full hover:bg-[#f8f9fa] hover:border-[#1a73e8]/40 transition-all cursor-pointer shadow-2xs"
                title="Quay lại chỉnh sửa cấu hình dịch vụ cho công ty này"
              >
                <Sliders className="w-3.5 h-3.5 text-[#5f6368]" />
                <span>Cấu hình</span>
              </button>
            )}

            <button
              onClick={onOpenPartnerList}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1a73e8] bg-[#f8f9fa] hover:bg-[#e8f0fe] border border-[#dadce0] rounded-full transition-all cursor-pointer shadow-2xs"
            >
              <Building2 className="w-3.5 h-3.5 text-[#1a73e8]" />
              <span className="hidden sm:inline">Đổi đối tác</span>
              <span className="sm:hidden">Đổi</span>
            </button>
          </div>
        </div>

        {/* Danh mục sản phẩm & Loại dự án phát triển */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
          {/* Cột 1: Danh mục sản phẩm trọng tâm */}
          <div className="p-5 bg-[#f8f9fa] border border-[#e8eaed] rounded-xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5f6368] mb-3">
              <LayoutGrid className="w-4 h-4 text-[#1a73e8]" />
              <span>Danh mục sản phẩm trọng tâm:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {company.developedCategories && company.developedCategories.length > 0 ? (
                company.developedCategories.map((cat, i) => (
                  <span key={i} className="px-3 py-1 bg-white border border-[#dadce0] rounded-full text-xs font-semibold text-[#202124] shadow-2xs">
                    {cat}
                  </span>
                ))
              ) : (
                <span className="text-sm text-[#5f6368] italic">Đa ngành hàng nội thất</span>
              )}
            </div>
          </div>

          {/* Cột 2: Trạng thái cấu hình dịch vụ & Lập báo giá / Proposal */}
          <div className="p-5 bg-[#f8f9fa] border border-[#e8eaed] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5f6368] mb-1">
                <CheckCircle2 className="w-4 h-4 text-[#137333]" />
                <span>Tổng dịch vụ khả dụng:</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-[#202124] flex items-baseline gap-2">
                <span>{allowedServices.length}</span>
                <span className="text-xs font-normal text-[#5f6368]">hạng mục</span>
                {Object.values(selections).filter(s => s.selected).length > 0 && (
                  <span className="text-xs px-2.5 py-0.5 bg-[#e8f0fe] text-[#1a73e8] border border-[#d2e3fc] rounded-full font-bold">
                    Đã chọn {Object.values(selections).filter(s => s.selected).length}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#5f6368] mt-1">
                Chuẩn hóa theo hồ sơ đối tác {company.name}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap shrink-0">
              {/* Nút Proposal (Thiết kế gói Custom) nhỏ gọn */}
              <button
                type="button"
                onClick={handleOpenNewDesign}
                className="px-3 py-1.5 rounded-full text-xs font-bold transition-all bg-[#e8f0fe] hover:bg-[#d2e3fc] text-[#1a73e8] border border-[#d2e3fc] shadow-2xs cursor-pointer inline-flex items-center gap-1.5 shrink-0"
                title="Mở form thiết kế gói giải pháp Proposal (Custom Package) cho đối tác này"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#1a73e8]" />
                <span>Proposal</span>
              </button>

              {/* Nút Quotation nhỏ gọn */}
              <button
                type="button"
                onClick={() => setIsQuotationOpen(true)}
                className="px-3 py-1.5 rounded-full text-xs font-bold transition-all bg-[#1a73e8] hover:bg-[#1557d0] text-white shadow-2xs cursor-pointer inline-flex items-center gap-1.5 shrink-0"
                title="Lập bảng báo giá Quotation, Xuất file PDF hoặc Sao chép"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Quotation</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Google Search & Filter Pills Bar */}
      <div className="bg-white border border-[#dadce0] rounded-2xl p-5 shadow-xs space-y-4">
        {/* Row 1: Google Search Box */}
        <div className="flex items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#5f6368] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm giải pháp, module, SKU..."
              className="w-full pl-10 pr-9 py-2.5 bg-[#f1f3f4] focus:bg-white border border-transparent focus:border-[#1a73e8] rounded-full text-sm text-[#202124] placeholder-[#5f6368] focus:outline-none transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5f6368] hover:text-[#202124]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Google Filter Chips */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-[#e8eaed]">
          <span className="text-xs font-semibold text-[#5f6368] mr-1 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" /> Phân loại:
          </span>

          {/* 1. Phạm vi công việc */}
          <button
            onClick={() => setActiveCategory('suggested')}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeCategory === 'suggested' || activeCategory === 'all'
                ? 'bg-[#e8f0fe] text-[#1a73e8] border border-[#1a73e8] font-bold'
                : 'bg-white text-[#3c4043] border border-[#dadce0] hover:bg-[#f1f3f4]'
            }`}
          >
            <span>Phạm vi công việc</span>
            <span className={`px-2 py-0.2 rounded-full text-xs font-semibold ${activeCategory === 'suggested' || activeCategory === 'all' ? 'bg-[#1a73e8] text-white' : 'bg-[#f1f3f4] text-[#5f6368]'}`}>
              {categoryCounts.suggested}
            </span>
          </button>

          {/* 2. Ecommerce A */}
          <button
            onClick={() => setActiveCategory('eca')}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeCategory === 'eca'
                ? 'bg-[#e8f0fe] text-[#1a73e8] border border-[#1a73e8] font-bold'
                : 'bg-white text-[#3c4043] border border-[#dadce0] hover:bg-[#f1f3f4]'
            }`}
          >
            <span>Ecommerce A</span>
            <span className={`px-2 py-0.2 rounded-full text-xs font-semibold ${activeCategory === 'eca' ? 'bg-[#1a73e8] text-white' : 'bg-[#f1f3f4] text-[#5f6368]'}`}>
              {categoryCounts.eca}
            </span>
          </button>

          {/* 3. Ecommerce B */}
          <button
            onClick={() => setActiveCategory('ecb')}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeCategory === 'ecb'
                ? 'bg-[#f3e8fd] text-[#7627bb] border border-[#7627bb] font-bold'
                : 'bg-white text-[#3c4043] border border-[#dadce0] hover:bg-[#f1f3f4]'
            }`}
          >
            <span>Ecommerce B</span>
            <span className={`px-2 py-0.2 rounded-full text-xs font-semibold ${activeCategory === 'ecb' ? 'bg-[#7627bb] text-white' : 'bg-[#f1f3f4] text-[#5f6368]'}`}>
              {categoryCounts.ecb}
            </span>
          </button>

          {/* 4. OBM */}
          <button
            onClick={() => setActiveCategory('obm')}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeCategory === 'obm'
                ? 'bg-[#e6f4ea] text-[#137333] border border-[#137333] font-bold'
                : 'bg-white text-[#3c4043] border border-[#dadce0] hover:bg-[#f1f3f4]'
            }`}
          >
            <span>OBM</span>
            <span className={`px-2 py-0.2 rounded-full text-xs font-semibold ${activeCategory === 'obm' ? 'bg-[#137333] text-white' : 'bg-[#f1f3f4] text-[#5f6368]'}`}>
              {categoryCounts.obm}
            </span>
          </button>

          {/* 5. MOD */}
          {categoryCounts.mod > 0 && (
            <button
              onClick={() => setActiveCategory('mod')}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
                activeCategory === 'mod'
                  ? 'bg-[#fef7e0] text-[#e37400] border border-[#e37400] font-bold'
                  : 'bg-white text-[#3c4043] border border-[#dadce0] hover:bg-[#f1f3f4]'
              }`}
            >
              <span>MOD</span>
              <span className={`px-2 py-0.2 rounded-full text-xs font-semibold ${activeCategory === 'mod' ? 'bg-[#e37400] text-white' : 'bg-[#f1f3f4] text-[#5f6368]'}`}>
                {categoryCounts.mod}
              </span>
            </button>
          )}

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="ml-auto inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#d93025] hover:text-[#b31412] px-3 py-1.5 hover:bg-[#fce8e6] rounded-full transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Xóa bộ lọc</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. Danh sách các nhóm dự án và dịch vụ sau khi lọc */}
      {filteredProjectGroups.length === 0 ? (
        <div className="bg-white border border-[#dadce0] rounded-2xl p-12 text-center space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#f1f3f4] text-[#5f6368] flex items-center justify-center mx-auto">
            <Filter className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-[#202124]">Không tìm thấy dịch vụ phù hợp</h3>
          <p className="text-xs text-[#5f6368] max-w-sm mx-auto">
            Không có dịch vụ nào khớp với từ khóa tìm kiếm hoặc tiêu chí lọc hiện tại.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2 bg-[#1a73e8] hover:bg-[#1557d0] text-white text-xs font-bold rounded-full transition-all shadow-xs"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex items-center justify-between text-xs text-[#5f6368] px-1">
            <span>Hiển thị <strong>{totalFilteredServices}</strong> dịch vụ ({filteredProjectGroups.length} nhóm giải pháp)</span>
            {hasActiveFilters && (
              <span className="text-[#1a73e8] font-semibold">Đang áp dụng bộ lọc</span>
            )}
          </div>

          {filteredProjectGroups.map((group) => (
            <div key={group.id} className="space-y-4">
              {/* Group Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#dadce0]">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg sm:text-xl font-bold text-[#202124] tracking-tight">
                    {group.title}
                  </h2>
                  {group.badge && (
                    <span className={`px-3 py-0.5 rounded-full text-xs font-semibold border ${group.badgeColor}`}>
                      {group.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs sm:text-sm text-[#5f6368] font-medium">
                  {group.services.length} dịch vụ
                </span>
              </div>

              {/* List of Services in this Project Group */}
              <div className="grid grid-cols-1 gap-3.5">
                {group.services.map((service) => {
                  const isSelected = selections[service.id]?.selected;

                  return (
                    <div
                      key={service.id}
                      className={`p-5 sm:p-6 rounded-2xl border transition-all group ${
                        isSelected
                          ? 'bg-[#f8fbff] border-[#1a73e8] shadow-[0_1px_3px_0_rgba(26,115,232,0.3),0_4px_8px_3px_rgba(26,115,232,0.15)]'
                          : 'bg-white border-[#dadce0] hover:border-[#1a73e8]/60 hover:shadow-[0_1px_3px_0_rgba(60,64,67,0.3),0_4px_8px_3px_rgba(60,64,67,0.15)]'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        {/* Left: Icon, Title, Description & Details */}
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isSelected 
                              ? 'bg-[#e8f0fe] border-[#d2e3fc]' 
                              : 'bg-[#f8f9fa] border-[#dadce0] group-hover:bg-[#e8f0fe] group-hover:border-[#1a73e8]/30'
                          }`}>
                            {getIcon(service.id, service)}
                          </div>

                          <div className="flex-1 min-w-0 space-y-2">
                            <div className="flex items-center gap-2.5 flex-wrap">
                              <h3 
                                onClick={() => onSelectServiceDetail(service)}
                                className="font-bold text-base sm:text-lg text-[#202124] group-hover:text-[#1a73e8] cursor-pointer tracking-tight transition-colors"
                              >
                                {getCleanServiceName(service.name)}
                              </h3>

                              {isSelected && (
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1a73e8] bg-[#e8f0fe] border border-[#d2e3fc] px-2.5 py-0.5 rounded-full">
                                  <Check className="w-3 h-3 text-[#1a73e8]" /> Đã chọn
                                </span>
                              )}



                              {service.type === 'package' ? (
                                <span className="text-xs font-semibold text-[#5f6368] uppercase bg-[#f1f3f4] px-2.5 py-0.5 rounded-full">
                                  Trọn gói
                                </span>
                              ) : (
                                <span className="text-xs font-medium text-[#5f6368] bg-[#f8f9fa] border border-[#dadce0] px-2.5 py-0.5 rounded-full">
                                  Đơn vị: {service.unit || 'SKU'}
                                </span>
                              )}
                            </div>

                            <p className="text-sm text-[#5f6368] leading-relaxed max-w-3xl">
                              {service.description}
                            </p>


                          </div>
                        </div>

                        {/* Right: Action Buttons */}
                        <div className="flex items-center gap-2 self-end sm:self-start shrink-0 pt-1">
                          <button
                            onClick={() => onSelectServiceDetail(service)}
                            className="inline-flex items-center gap-1 px-4 py-2 text-xs font-semibold text-[#1a73e8] hover:text-white bg-[#e8f0fe] hover:bg-[#1a73e8] border border-[#1a73e8]/20 rounded-full transition-all cursor-pointer shadow-2xs"
                            title="Xem chi tiết phạm vi dịch vụ"
                          >
                            <span>Chi tiết</span>
                            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Mục lưu & hiển thị các Gói Sản Phẩm Custom Đã Thiết Kế cho Công ty */}
      <div className="pt-8 border-t border-[#dadce0] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#dadce0]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#e8f0fe] border border-[#d2e3fc] flex items-center justify-center text-[#1a73e8] shrink-0 shadow-2xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-lg sm:text-xl font-bold text-[#202124] tracking-tight">
                  Gói sản phẩm Custom đã thiết kế
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#e8f0fe] text-[#1a73e8] border border-[#d2e3fc]">
                  {customPackages.length} Gói Custom
                </span>
              </div>
              <p className="text-xs text-[#5f6368] mt-0.5">
                Các gói giải pháp đặc thù được thiết kế riêng biệt cho đối tác <strong>{company.name}</strong>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleOpenNewDesign}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a73e8] hover:bg-[#1557d0] text-white rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>+ Thiết kế gói Custom mới</span>
          </button>
        </div>

        {customPackages.length === 0 ? (
          <div className="bg-white border border-dashed border-[#dadce0] rounded-3xl p-8 text-center space-y-3 shadow-2xs">
            <div className="w-14 h-14 rounded-2xl bg-[#f8f9fa] border border-[#dadce0] text-[#80868b] flex items-center justify-center mx-auto">
              <Layers className="w-7 h-7 text-[#1a73e8]" />
            </div>
            <h3 className="font-bold text-base text-[#202124]">
              Chưa có gói custom nào cho {company.name}
            </h3>
            <p className="text-xs text-[#5f6368] max-w-md mx-auto leading-relaxed">
              Admin có thể bấm nút &ldquo;Thiết kế gói (Design)&rdquo; để tạo các gói giải pháp sản phẩm, dịch vụ chuyển đổi số hoặc tiêu chuẩn đóng gói riêng cho đối tác này.
            </p>
            <button
              type="button"
              onClick={handleOpenNewDesign}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#e8f0fe] hover:bg-[#d2e3fc] text-[#1a73e8] text-xs font-bold rounded-full transition-all cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>Thiết kế gói đầu tiên</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customPackages.map((cpkg) => (
              <div
                key={cpkg.id}
                className="bg-white border border-[#dadce0] hover:border-[#1a73e8] hover:shadow-[0_4px_16px_rgba(26,115,232,0.1)] rounded-2xl p-5 transition-all flex flex-col justify-between group text-left"
              >
                <div className="space-y-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-[#f8f9fa] border border-[#dadce0] group-hover:bg-[#e8f0fe] group-hover:border-[#1a73e8]/30 flex items-center justify-center text-[#1a73e8] shrink-0 transition-colors">
                        {getIcon(cpkg.id, { icon: cpkg.icon } as any)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#e8f0fe] text-[#1a73e8] border border-[#d2e3fc]">
                            {cpkg.tag || 'Bespoke Custom'}
                          </span>
                          <span className="text-[10px] font-semibold text-[#5f6368] uppercase bg-[#f1f3f4] px-2 py-0.5 rounded-full">
                            {cpkg.type === 'package' ? 'Trọn gói' : `Đơn vị: ${cpkg.unit || 'SKU'}`}
                          </span>
                          {formatPackageDateTime(cpkg) && (
                            <span 
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#f8f9fa] text-[#5f6368] border border-[#dadce0]"
                              title={`Thời gian tạo/cập nhật: ${formatPackageDateTime(cpkg)}`}
                            >
                              <Clock className="w-2.5 h-2.5 text-[#1a73e8]" />
                              <span>{formatPackageDateTime(cpkg)}</span>
                            </span>
                          )}
                        </div>
                        <h3 
                          onClick={() => setViewingCustomPackage(cpkg)}
                          className="font-bold text-base text-[#202124] group-hover:text-[#1a73e8] cursor-pointer mt-1 leading-snug transition-colors line-clamp-1"
                          title={cpkg.name}
                        >
                          {cpkg.name}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {deletingPackageId === cpkg.id ? (
                        <div className="flex items-center gap-1 bg-[#fce8e6] px-2 py-1 rounded-lg border border-[#f5c2c7]">
                          <span className="text-[11px] font-bold text-[#d93025]">Xóa?</span>
                          <button
                            type="button"
                            onClick={() => {
                              handleDeleteCustomPackage(cpkg.id);
                              setDeletingPackageId(null);
                            }}
                            className="px-2 py-0.5 bg-[#d93025] hover:bg-[#b3261e] text-white text-[10px] font-bold rounded-md transition-colors cursor-pointer"
                          >
                            Có
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingPackageId(null)}
                            className="px-1.5 py-0.5 bg-white text-[#5f6368] text-[10px] font-semibold rounded-md transition-colors cursor-pointer border border-[#dadce0]"
                          >
                            Hủy
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => handleOpenEditDesign(cpkg)}
                            className="p-1.5 text-[#5f6368] hover:text-[#1a73e8] hover:bg-[#e8f0fe] rounded-lg transition-colors cursor-pointer"
                            title="Chỉnh sửa thiết kế gói"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingPackageId(cpkg.id)}
                            className="p-1.5 text-[#5f6368] hover:text-[#d93025] hover:bg-[#fce8e6] rounded-lg transition-colors cursor-pointer"
                            title="Xóa gói custom này"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-[#5f6368] leading-relaxed line-clamp-2">
                    {cpkg.description || 'Gói giải pháp tùy biến đặc thù.'}
                  </p>

                  {/* Target Brand Badge if available */}
                  {(cpkg.targetBrand || cpkg.brandLogo || cpkg.brandLink) && (
                    <div className="flex items-center justify-between gap-2 bg-[#f8f9fa] border border-[#dadce0] rounded-xl px-3 py-1.5 text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        {cpkg.brandLogo && (
                          <img
                            src={cpkg.brandLogo}
                            alt={cpkg.targetBrand || 'Logo'}
                            className="w-5 h-5 rounded object-contain border border-[#dadce0] bg-white shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        )}
                        <span className="text-[#5f6368] font-medium text-[11px] shrink-0">Thương hiệu:</span>
                        <span className="font-bold text-[#202124] truncate text-xs">
                          {cpkg.targetBrand || company.name}
                        </span>
                      </div>

                      {cpkg.brandLink && (
                        <a
                          href={cpkg.brandLink.startsWith('http') ? cpkg.brandLink : `https://${cpkg.brandLink}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1a73e8] hover:underline shrink-0"
                          title="Mở liên kết thương hiệu"
                        >
                          <Link2 className="w-3 h-3" />
                          <span>Link</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  )}

                  {/* Highlight Items & Image Thumbnails */}
                  {cpkg.items && cpkg.items.length > 0 && (() => {
                    const attachedImages = cpkg.items
                      .map((item, idx) => ({
                        image: typeof item === 'string' ? '' : item.image || '',
                        title: typeof item === 'string' ? item : item.title || `Hạng mục ${idx + 1}`
                      }))
                      .filter(item => Boolean(item.image && item.image.trim() !== ''));

                    return (
                      <div className="bg-[#f8f9fa] rounded-xl p-3 space-y-2 border border-[#e8eaed]">
                        <div className="text-[11px] font-bold text-[#5f6368] uppercase tracking-wider flex items-center justify-between">
                          <span>Phạm vi công việc ({cpkg.items.length} hạng mục):</span>
                          {attachedImages.length > 0 && (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-[#1a73e8] bg-[#e8f0fe] px-2 py-0.5 rounded-full border border-[#d2e3fc] lowercase font-sans">
                              <ImageIcon className="w-3 h-3" />
                              <span>{attachedImages.length} ảnh đính kèm</span>
                            </span>
                          )}
                        </div>
                        
                        <div className="space-y-1.5">
                          {cpkg.items.slice(0, 3).map((item, idx) => {
                            const itemTitle = typeof item === 'string' ? item : item.title;
                            const itemImage = typeof item === 'string' ? '' : item.image || '';
                            return (
                              <div key={idx} className="flex items-center justify-between gap-1.5 text-xs text-[#202124]">
                                <div className="flex items-start gap-1.5 min-w-0 flex-1">
                                  <Check className="w-3.5 h-3.5 text-[#1a73e8] shrink-0 mt-0.5" />
                                  <span className="line-clamp-1 leading-tight">{itemTitle}</span>
                                </div>
                                {itemImage && (
                                  <img
                                    src={itemImage}
                                    alt={itemTitle}
                                    className="w-5 h-5 rounded object-cover border border-[#dadce0] shrink-0 shadow-2xs"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                  />
                                )}
                              </div>
                            );
                          })}
                          {cpkg.items.length > 3 && (
                            <div className="text-[11px] text-[#1a73e8] font-semibold pl-5">
                              + {cpkg.items.length - 3} hạng mục khác...
                            </div>
                          )}
                        </div>

                        {/* Thumbnail Gallery Row */}
                        {attachedImages.length > 0 && (
                          <div className="pt-2 border-t border-[#dadce0]/60 space-y-1.5">
                            <div className="flex items-center gap-1 text-[10px] font-bold text-[#5f6368] uppercase tracking-wide">
                              <ImageIcon className="w-3 h-3 text-[#1a73e8]" />
                              <span>Ảnh đính kèm hồ sơ:</span>
                            </div>
                            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
                              {attachedImages.map((imgItem, imgIdx) => (
                                <div
                                  key={imgIdx}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setViewingCustomPackage(cpkg);
                                  }}
                                  className="relative group/thumb cursor-pointer shrink-0"
                                  title={imgItem.title}
                                >
                                  <img
                                    src={imgItem.image}
                                    alt={imgItem.title}
                                    className="w-12 h-12 object-cover rounded-lg border border-[#dadce0] hover:border-[#1a73e8] hover:scale-105 transition-all shadow-2xs bg-white"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                  />
                                  <div className="absolute inset-0 bg-[#202124]/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                    <span className="text-[9px] font-bold text-white bg-black/60 px-1 py-0.5 rounded">
                                      #{imgIdx + 1}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>

                <div className="pt-3.5 mt-3.5 border-t border-[#f1f3f4] flex items-center justify-between gap-2 flex-wrap">
                  <div className="text-xs font-mono font-bold text-[#1a73e8]">
                    {cpkg.price && cpkg.currency !== 'CUSTOM'
                      ? `${cpkg.price.toLocaleString('vi-VN')} ${cpkg.currency}${cpkg.type === 'per_unit' && cpkg.unit ? `/${cpkg.unit}` : ''}`
                      : 'Báo giá theo dự án'}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setPdfCustomPackage(cpkg)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#1a73e8] hover:bg-[#d2e3fc] bg-[#e8f0fe] rounded-full transition-all cursor-pointer shadow-2xs"
                      title="Xuất file PDF Proposal"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Xuất PDF</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewingCustomPackage(cpkg)}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#1a73e8] hover:bg-[#1557d0] rounded-full transition-all cursor-pointer shadow-2xs"
                    >
                      <span>Chi tiết</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Lập Báo Giá (Nhập giá tay VND) */}
      <QuotationModal
        isOpen={isQuotationOpen}
        onClose={() => setIsQuotationOpen(false)}
        company={company}
        allowedServices={allowedServices}
        selections={selections}
      />

      {/* Modal Thiết Kế Gói Custom (Design Form) */}
      <CustomPackageDesignModal
        isOpen={isDesignModalOpen}
        onClose={() => {
          setIsDesignModalOpen(false);
          setEditingCustomPackage(null);
        }}
        company={company}
        editingPackage={editingCustomPackage}
        onSave={handleSaveCustomPackage}
        onExportPdf={(pkg) => setPdfCustomPackage(pkg)}
      />

      {/* Modal Xem Chi Tiết Gói Custom */}
      <CustomPackageDetailModal
        isOpen={!!viewingCustomPackage}
        onClose={() => setViewingCustomPackage(null)}
        pkg={viewingCustomPackage}
        company={company}
        onEdit={(pkg) => {
          setViewingCustomPackage(null);
          handleOpenEditDesign(pkg);
        }}
        onDelete={handleDeleteCustomPackage}
        onExportPdf={(pkg) => setPdfCustomPackage(pkg)}
      />

      {/* Modal Xuất PDF Proposal */}
      <CustomPackagePdfModal
        isOpen={!!pdfCustomPackage}
        onClose={() => setPdfCustomPackage(null)}
        pkg={pdfCustomPackage}
        company={company}
      />
    </div>
  );
}
