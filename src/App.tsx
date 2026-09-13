/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers,
  Microscope,
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  ShoppingCart, 
  Box, 
  Database, 
  Palette, 
  FileDigit, 
  HelpCircle,
  FileText,
  Briefcase,
  TrendingUp,
  Monitor,
  Shield,
  LogOut,
  Building2,
  Star,
  ChevronLeft,
  Menu,
  X,
  Plus,
  MessageSquare,
  Search,
  Clock,
  Settings,
  MoreHorizontal,
  ChevronDown,
  Share2,
  ArrowRight,
  Users2,
  Users,
  ShoppingBag,
  Cpu,
  Megaphone,
  BoxSelect,
  Sparkles,
  Laptop,
  Dumbbell,
  TreePine,
  Hammer,
  Trash2,
  Mountain,
  Armchair,
  Waves,
  Lamp,
  Sofa,
  Flower2,
  Info,
  LayoutGrid,
  Image as ImageIcon,
  Calculator,
  Printer,
  Copy,
  Pin,
  PinOff
} from 'lucide-react';
import { SERVICES, USD_TO_VND, COMPANIES, getStoredCustomCategories, saveCustomCategory, deleteCustomCategory } from './data';

// Centralized Ecosystem Constants
const CORE_ECOSYSTEM_IDS = [
  'monosbase',
  'bot-team',
  '3d-interactive',
  'brand-marketing',
  'brand-design',
  'design-rnd-center',
  'furniture-development'
];

const SERVICE_NAME_MAPPING: Record<string, string> = {
  'Furniture Development': 'Furniture Design',
  'Brand Design': 'Brand Design',
  'Design - Rnd Center': 'Design - Rnd Center',
  'Design - RnD center': 'Design - Rnd Center'
};
import { getProductsForCategory } from './data/categoryProductsData';
import { SelectionState, Service, Company } from './types';
import { 
  syncDataToServer, 
  fetchServerData, 
  subscribeToSyncStatus 
} from './lib/storageSync';
import MonosCapabilitiesContent from './components/MonosCapabilitiesContent';
import PillarBContent from './components/PillarBContent';
import PillarCContent from './components/PillarCContent';
import FurnitureOSOverviewContent from './components/FurnitureOSOverviewContent';
import MonosbaseTechView from './components/MonosbaseTechView';
import EcosystemOverviewContent from './components/EcosystemOverviewContent';
import ServiceDetailContent from './components/ServiceDetailContent';
import AdminDesignPage from './components/AdminDesignPage';
import CompanyDetailGraphicView from './components/CompanyDetailGraphicView';
import MonosMakerLandingPage from './components/MonosMakerLandingPage';
import QuotationModal from './components/QuotationModal';
import AddCategoryModal from './components/AddCategoryModal';
import ScopePdfExportModal from './components/ScopePdfExportModal';

export default function App() {
  const [isQuotationModalOpen, setIsQuotationModalOpen] = useState(false);
  const [isScopePdfModalOpen, setIsScopePdfModalOpen] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [lastSavedTime, setLastSavedTime] = useState<string>('');

  const [currentCompanies, setCurrentCompanies] = useState<Company[]>(() => {
    try {
      const saved = localStorage.getItem('furniture_os_partners');
      return saved ? JSON.parse(saved) : COMPANIES;
    } catch (e) {
      console.error('Failed to parse companies from localStorage', e);
      return COMPANIES;
    }
  });

  const [showAdmin, setShowAdmin] = useState(false);

  const [customCategories, setCustomCategories] = useState<Service[]>(() => {
    return getStoredCustomCategories();
  });
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

  const [selectedCompanyId, setSelectedCompanyId] = useState(() => {
    return localStorage.getItem('selected_company_id') || 'ntc';
  });

  const [pinnedPartnerIds, setPinnedPartnerIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('monos_pinned_partner_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync with localStorage and Server whenever state changes
  useEffect(() => {
    localStorage.setItem('furniture_os_partners', JSON.stringify(currentCompanies));
    syncDataToServer({ furniture_os_partners: currentCompanies });
  }, [currentCompanies]);

  useEffect(() => {
    localStorage.setItem('selected_company_id', selectedCompanyId);
    syncDataToServer({ selected_company_id: selectedCompanyId });
  }, [selectedCompanyId]);

  // Initial load from server on application boot
  useEffect(() => {
    const unsubscribe = subscribeToSyncStatus((status, time) => {
      setSyncStatus(status);
      if (time) setLastSavedTime(time);
    });

    fetchServerData().then(serverData => {
      if (!serverData) return;
      if (serverData.furniture_os_partners && Array.isArray(serverData.furniture_os_partners) && serverData.furniture_os_partners.length > 0) {
        setCurrentCompanies(serverData.furniture_os_partners);
      }
      if (serverData.monos_custom_categories && Array.isArray(serverData.monos_custom_categories)) {
        setCustomCategories(serverData.monos_custom_categories);
      }
      if (serverData.monos_pinned_partner_ids && Array.isArray(serverData.monos_pinned_partner_ids)) {
        setPinnedPartnerIds(serverData.monos_pinned_partner_ids);
      }
      if (serverData.selected_company_id) {
        setSelectedCompanyId(serverData.selected_company_id);
      }
    }).catch(err => {
      console.warn('Initial server sync warning:', err);
    });

    return unsubscribe;
  }, []);

  const allServices = useMemo(() => {
    return [...SERVICES, ...customCategories];
  }, [customCategories]);

  const togglePinPartner = (companyId: string) => {
    setPinnedPartnerIds(prev => {
      const isPinned = prev.includes(companyId);
      const updated = isPinned ? prev.filter(id => id !== companyId) : [...prev, companyId];
      try {
        localStorage.setItem('monos_pinned_partner_ids', JSON.stringify(updated));
        syncDataToServer({ monos_pinned_partner_ids: updated });
      } catch (err) {
        console.error('Error saving pinned partners:', err);
      }
      return updated;
    });
  };

  const pinnedCompanies = useMemo(() => {
    return currentCompanies.filter(c => pinnedPartnerIds.includes(c.id));
  }, [currentCompanies, pinnedPartnerIds]);

  const [isShowingPartnerList, setIsShowingPartnerList] = useState(false);
  const [isSystemSectionOpen, setIsSystemSectionOpen] = useState(true);

  const [showMonosLanding, setShowMonosLanding] = useState(true);
  const [showOverview, setShowOverview] = useState(false);
  const [showMonos, setShowMonos] = useState(false);
  const [showPillarB, setShowPillarB] = useState(false);
  const [showPillarC, setShowPillarC] = useState(false);
  const [showFurnitureOS, setShowFurnitureOS] = useState(false);
  const [showMonosbaseTech, setShowMonosbaseTech] = useState(false);
  const [showEcaList, setShowEcaList] = useState(false);
  const [showEcbList, setShowEcbList] = useState(false);
  const [showB2bList, setShowB2bList] = useState(false);
  const [showModList, setShowModList] = useState(false);
  const [mainCategoryFilter, setMainCategoryFilter] = useState<'all' | 'eca' | 'ecb' | 'obm'>('all');
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<Service | null>(null);
  const [serviceOrigin, setServiceOrigin] = useState<'company' | 'eca' | 'ecb' | 'b2b' | 'mod' | 'monos_landing' | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Scroll to top whenever the view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [
    selectedServiceDetail, 
    showMonosLanding,
    showOverview, 
    showMonos, 
    showPillarB, 
    showPillarC, 
    showFurnitureOS, 
    showMonosbaseTech,
    showEcaList, 
    showEcbList, 
    showB2bList,
    showModList,
    isShowingPartnerList,
    selectedCompanyId
  ]);

  // Clear service detail when switching back to selection or other views
  const handleGoToPricing = () => {
    setSelectedServiceDetail(null);
    setServiceOrigin(null);
    setIsShowingPartnerList(false);
    setShowMonosLanding(false);
    setShowOverview(false);
    setShowMonos(false);
    setShowPillarB(false);
    setShowPillarC(false);
    setShowFurnitureOS(false);
    setShowMonosbaseTech(false);
    setShowEcaList(false);
    setShowEcbList(false);
    setShowB2bList(false);
    setShowModList(false);
  };

  const handleBackFromServiceDetail = () => {
    setSelectedServiceDetail(null);
    if (serviceOrigin === 'b2b' || selectedServiceDetail?.id.startsWith('b2b-')) {
      setShowB2bList(true);
      setShowEcaList(false);
      setShowEcbList(false);
      setShowModList(false);
      setShowMonosLanding(false);
    } else if (serviceOrigin === 'eca' || selectedServiceDetail?.id.startsWith('eca-')) {
      setShowEcaList(true);
      setShowEcbList(false);
      setShowB2bList(false);
      setShowModList(false);
      setShowMonosLanding(false);
    } else if (serviceOrigin === 'ecb' || selectedServiceDetail?.id.startsWith('ecb-')) {
      setShowEcbList(true);
      setShowEcaList(false);
      setShowB2bList(false);
      setShowModList(false);
      setShowMonosLanding(false);
    } else if (serviceOrigin === 'monos_landing') {
      setShowMonosLanding(true);
    } else {
      handleGoToPricing();
    }
  };

  const serviceBackTitle = useMemo(() => {
    if (serviceOrigin === 'b2b' || selectedServiceDetail?.id.startsWith('b2b-')) {
      return 'Quay lại OBM';
    }
    if (serviceOrigin === 'eca' || selectedServiceDetail?.id.startsWith('eca-')) {
      return 'Quay lại Ecommerce A';
    }
    if (serviceOrigin === 'ecb' || selectedServiceDetail?.id.startsWith('ecb-')) {
      return 'Quay lại Ecommerce B';
    }
    if (serviceOrigin === 'monos_landing') {
      return 'Quay lại Tổng quan Nền tảng';
    }
    return isShowingPartnerList ? 'Quay lại danh sách đối tác' : 'Quay lại danh sách dịch vụ';
  }, [serviceOrigin, selectedServiceDetail, isShowingPartnerList]);

  const isLandingPage = selectedCompanyId === 'ntc';

  const selectedCompany = useMemo(() => {
    return currentCompanies.find(c => c.id === selectedCompanyId) || currentCompanies[0];
  }, [selectedCompanyId, currentCompanies]);

  const getCleanServiceName = (name: string) => {
    for (const [key, value] of Object.entries(SERVICE_NAME_MAPPING)) {
      if (name.includes(key)) return value;
    }
    return name.split(' - ')[0].split(' (')[0].split(' NTC')[0].split(' Lava')[0].split(' Citi')[0].split(' NX')[0].split(' ĐMS')[0];
  };

  const scopeServices = useMemo(() => {
    // Always provide complete Scope of Work services (base SERVICES + custom categories)
    const baseCore = SERVICES.filter(s => 
      s && s.id && 
      !s.id.startsWith('eca-') && 
      !s.id.startsWith('ecb-') && 
      !s.id.startsWith('b2b-') && 
      !s.id.startsWith('mod-')
    );

    const customScope = (customCategories || []).filter(s => 
      s && s.id && 
      !s.id.startsWith('eca-') && 
      !s.id.startsWith('ecb-') && 
      !s.id.startsWith('b2b-') && 
      !s.id.startsWith('mod-')
    );

    const merged = [...baseCore, ...customScope];
    const uniqueMap = new Map<string, Service>();
    
    merged.forEach(s => {
      if (!uniqueMap.has(s.id)) {
        const override = selectedCompany?.serviceOverrides?.[s.id];
        if (override) {
          uniqueMap.set(s.id, {
            ...s,
            name: override.name || s.name,
            price: override.price ?? s.price,
            currency: override.currency || s.currency
          });
        } else {
          uniqueMap.set(s.id, s);
        }
      }
    });

    const result = Array.from(uniqueMap.values());

    return result.sort((a, b) => {
      const aIndex = CORE_ECOSYSTEM_IDS.indexOf(a.id);
      const bIndex = CORE_ECOSYSTEM_IDS.indexOf(b.id);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return 0;
    });
  }, [customCategories, selectedCompany]);

  const allowedServices = useMemo(() => {
    if (!selectedCompany) return allServices;
    const allowed = Array.isArray(selectedCompany?.allowedServices) && selectedCompany.allowedServices.length > 0
      ? selectedCompany.allowedServices 
      : allServices.map(s => s.id);
    
    // Strictly respect the allowedServices configured in Admin/Config for this company
    return allServices
      .filter(s => allowed.includes(s.id))
      .map(s => {
        if (!s) return s;
        const override = selectedCompany?.serviceOverrides?.[s.id];
        if (override) {
          return { 
            ...s, 
            name: override.name || s.name,
            price: override.price, 
            currency: override.currency 
          };
        }
        return s;
      });
  }, [selectedCompany, allServices]);

  const handleUpdateCompanies = (updatedCompanies: Company[]) => {
    setCurrentCompanies(updatedCompanies);
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [selections, setSelections] = useState<SelectionState>({});

  // Initialize selections when allowedServices change
  useEffect(() => {
    if (allowedServices.length > 0) {
      setSelections(
        allowedServices.reduce((acc, service) => ({
          ...acc,
          [service.id]: { selected: false, quantity: service.minimum || 1 }
        }), {} as SelectionState)
      );
    }
  }, [allowedServices]);

  const handleSelectCompany = (companyId: string) => {
    setSelectedCompanyId(companyId);
    localStorage.setItem('selected_company_id', companyId);
    setShowMonosLanding(false);
    setIsShowingPartnerList(false);
    setShowOverview(false);
    setShowMonos(false);
    setShowPillarB(false);
    setShowPillarC(false);
    setShowFurnitureOS(false);
    setShowEcaList(false);
    setShowEcbList(false);
    setShowB2bList(false);
    setShowModList(false);
    setSelectedServiceDetail(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('selected_company_id');
    setSelectedCompanyId('ntc');
    setIsShowingPartnerList(false);
    setShowMonosLanding(false);
  };

  const handleSwitchPartner = () => {
    setIsShowingPartnerList(true);
    setShowMonosLanding(false);
    setSelectedServiceDetail(null);
    setShowOverview(false);
    setShowMonos(false);
    setShowPillarB(false);
    setShowPillarC(false);
    setShowFurnitureOS(false);
    setShowEcaList(false);
    setShowEcbList(false);
    setShowB2bList(false);
    setShowModList(false);
    setShowAdmin(false);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const getIcon = (id: string, service?: Service, customColor?: string) => {
    const className = `w-4 h-4 ${customColor ? '' : 'text-[#5f6368]'}`;
    const style = customColor ? { color: customColor } : {};
    
    // If service has an icon property, use it
    if (service?.icon) {
      switch (service.icon) {
        case 'Laptop': return <Laptop className={className} style={style} />;
        case 'Dumbbell': return <Dumbbell className={className} style={style} />;
        case 'TreePine': return <TreePine className={className} style={style} />;
        case 'Hammer': return <Hammer className={className} style={style} />;
        case 'Mountain': return <Mountain className={className} style={style} />;
        case 'Armchair': return <Armchair className={className} style={style} />;
        case 'Palette': return <Palette className={className} style={style} />;
        case 'Waves': return <Waves className={className} style={style} />;
        case 'Lamp': return <Lamp className={className} style={style} />;
        case 'Sofa': return <Sofa className={className} style={style} />;
        case 'Flower2': return <Flower2 className={className} style={style} />;
        case 'Box': return <Box className={className} style={style} />;
        case 'Sparkles': return <Sparkles className={className} style={style} />;
        case 'LayoutGrid': return <LayoutGrid className={className} style={style} />;
      }
    }

    switch (id) {
      case 'design-rnd-center': return <Microscope className={className} style={style} />;
      case '3d-interactive': return <BoxSelect className={className} style={style} />;
      case 'digitization': return <FileDigit className={className} style={style} />;
      case 'brand-design': return <Palette className={className} style={style} />;
      case 'brand-marketing': return <Megaphone className={className} style={style} />;
      case 'monosbase': return <Database className={className} style={style} />;
      case 'bot-team': return <Cpu className={className} style={style} />;
      case 'furniture-development': return <Box className={className} style={style} />;
      case 'ecommerce-a': return <ShoppingBag className={className} style={style} />;
      case 'ecommerce-b': return <Sparkles className={className} style={style} />;
      case 'outsource-marketing-dept': return <Briefcase className={className} style={style} />;
      default: return <FileText className={className} style={style} />;
    }
  };

  const getCategoryIcon = (iconName: string) => {
    const className = "w-3 h-3 opacity-40";
    switch (iconName) {
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
      default: return <Box className={className} />;
    }
  };

  const formatCurrency = (val: number, curr: string) => {
    if (curr === 'FREE') return 'Miễn phí';
    if (curr === 'CUSTOM') return 'Theo đơn hàng';
    if (curr === 'USD') return `$${val.toLocaleString()}`;
    return `${val.toLocaleString()} VNĐ`;
  };

  const totals = useMemo(() => {
    let vnd = 0;
    let usd = 0;
    
    (Object.entries(selections) as [string, SelectionState[string]][]).forEach(([id, state]) => {
      if (!state.selected) return;
      const service = allowedServices.find(s => s.id === id);
      if (!service) return;

      const amount = service.type === 'per_unit' 
        ? service.price * state.quantity 
        : service.price;

      if (service.currency === 'VNĐ') {
        vnd += amount;
      } else if (service.currency === 'USD') {
        usd += amount;
      }
    });

    const combinedVnd = vnd + (usd * USD_TO_VND);
    return { vnd, usd, combinedVnd };
  }, [selections, allowedServices]);

  if (!selectedCompany) {
    return <div>Loading...</div>;
  }

  const toggleService = (id: string) => {
    setSelections(prev => ({
      ...prev,
      [id]: { ...prev[id], selected: !prev[id].selected }
    }));
  };

  const updateQuantity = (id: string, qty: number) => {
    const service = allowedServices.find(s => s.id === id);
    const min = service?.minimum || 1;
    setSelections(prev => ({
      ...prev,
      [id]: { ...prev[id], quantity: Math.max(min, qty) }
    }));
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] text-[#202124] font-sans">
      {/* Google Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-[#202124]/30 backdrop-blur-xs z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Google Workspace Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 md:w-64 bg-white border-r border-[#dadce0] transition-transform duration-300 ease-in-out md:sticky md:top-0 md:h-screen md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Google Workspace Brand Header */}
          <div className="p-4 flex items-center justify-between border-b border-[#e8eaed]">
            <div 
              className="flex items-center gap-3 overflow-hidden group cursor-pointer" 
              onClick={() => {
                setShowMonosLanding(true);
                setShowOverview(false);
                setShowMonos(false);
                setShowPillarB(false);
                setShowPillarC(false);
                setShowFurnitureOS(false);
                setSelectedServiceDetail(null);
                setIsShowingPartnerList(false);
                setShowAdmin(false);
                setShowEcaList(false);
                setShowEcbList(false);
                setShowB2bList(false);
                setShowModList(false);
                if (window.innerWidth < 768) setIsSidebarOpen(false);
              }}
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#1a73e8] via-[#4285f4] to-[#34a853] text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                M
              </div>
              <div className="min-w-0">
                <span className="font-bold text-base text-[#202124] tracking-tight block truncate">MonosMaker</span>
                <span className="text-[11px] font-medium text-[#5f6368] block truncate">Design & Data Platform</span>
              </div>
              {!isLandingPage && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const url = new URL(window.location.origin + window.location.pathname);
                    if (selectedCompany?.id) {
                      url.searchParams.set('partner', selectedCompany.id);
                    }
                    navigator.clipboard.writeText(url.toString());
                    alert('Đã sao chép liên kết truy cập trực tiếp cho đối tác này!');
                  }}
                  className="p-1.5 hover:bg-[#f1f3f4] rounded-full transition-colors opacity-0 group-hover:opacity-100 hidden md:block text-[#5f6368] hover:text-[#1a73e8]"
                  title="Sao chép link gửi đối tác"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-1.5 hover:bg-[#f1f3f4] rounded-full text-[#5f6368]">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Google-style Navigation Menu */}
          <div className="flex-1 overflow-y-auto py-3 px-3 space-y-5">
            {/* 1. Các trụ cột */}
            <div className="space-y-1">
              <div className="px-3 py-1 text-xs font-semibold text-[#5f6368] uppercase tracking-wider">Trụ cột chiến lược</div>
              <button 
                onClick={() => { 
                  setShowOverview(true); 
                  setShowMonosLanding(false);
                  setShowMonos(false);
                  setShowPillarB(false);
                  setShowPillarC(false);
                  setShowFurnitureOS(false);
                  setSelectedServiceDetail(null);
                  setIsShowingPartnerList(false);
                  setShowAdmin(false);
                  setShowEcaList(false);
                  setShowEcbList(false);
                  setShowB2bList(false);
                  setShowModList(false);
                  if (window.innerWidth < 768) setIsSidebarOpen(false); 
                }} 
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-full text-sm font-medium transition-all text-left cursor-pointer ${
                  showOverview 
                    ? 'bg-[#e8f0fe] text-[#1a73e8] font-bold shadow-2xs' 
                    : 'text-[#3c4043] hover:bg-[#f1f3f4] hover:text-[#202124]'
                }`}
              >
                <HelpCircle className={`w-4 h-4 ${showOverview ? 'text-[#1a73e8]' : 'text-[#5f6368]'}`} />
                <span>Pillar A | B | C</span>
              </button>
              <button 
                onClick={() => { 
                  setShowMonos(true); 
                  setShowMonosLanding(false);
                  setShowOverview(false);
                  setShowPillarB(false);
                  setShowPillarC(false);
                  setShowFurnitureOS(false);
                  setSelectedServiceDetail(null);
                  setIsShowingPartnerList(false);
                  setShowAdmin(false);
                  setShowEcaList(false);
                  setShowEcbList(false);
                  setShowB2bList(false);
                  setShowModList(false);
                  if (window.innerWidth < 768) setIsSidebarOpen(false); 
                }} 
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-full text-sm font-medium transition-all text-left cursor-pointer ${
                  showMonos 
                    ? 'bg-[#e8f0fe] text-[#1a73e8] font-bold shadow-2xs' 
                    : 'text-[#3c4043] hover:bg-[#f1f3f4] hover:text-[#202124]'
                }`}
              >
                <Shield className={`w-4 h-4 ${showMonos ? 'text-[#1a73e8]' : 'text-[#5f6368]'}`} />
                <span>Pillar A</span>
              </button>
              <button 
                onClick={() => { 
                  setShowPillarC(true); 
                  setShowMonosLanding(false);
                  setShowOverview(false);
                  setShowMonos(false);
                  setShowPillarB(false);
                  setShowFurnitureOS(false);
                  setSelectedServiceDetail(null);
                  setIsShowingPartnerList(false);
                  setShowAdmin(false);
                  setShowEcaList(false);
                  setShowEcbList(false);
                  setShowB2bList(false);
                  setShowModList(false);
                  if (window.innerWidth < 768) setIsSidebarOpen(false); 
                }} 
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-full text-sm font-medium transition-all text-left cursor-pointer ${
                  showPillarC 
                    ? 'bg-[#e8f0fe] text-[#1a73e8] font-bold shadow-2xs' 
                    : 'text-[#3c4043] hover:bg-[#f1f3f4] hover:text-[#202124]'
                }`}
              >
                <TrendingUp className={`w-4 h-4 ${showPillarC ? 'text-[#1a73e8]' : 'text-[#5f6368]'}`} />
                <span>Pillar C</span>
              </button>
            </div>

            {/* 2. Pillar B (Pinned Partners Category) */}
            <div className="space-y-1 pt-1">
              <div className="px-3 py-1 text-xs font-semibold text-[#5f6368] uppercase tracking-wider">
                Pillar B
              </div>

              {pinnedCompanies.length > 0 ? (
                <div className="space-y-0.5">
                  {pinnedCompanies.map(company => {
                    const isSelected = 
                      selectedCompanyId === company.id && 
                      !isShowingPartnerList && 
                      !showAdmin && 
                      !showEcaList && 
                      !showEcbList && 
                      !showB2bList && 
                      !showModList && 
                      !showMonosLanding && 
                      !showOverview && 
                      !showMonos && 
                      !showPillarB && 
                      !showPillarC && 
                      !showFurnitureOS && 
                      !selectedServiceDetail;

                    return (
                      <div key={company.id} className="group relative flex items-center">
                        <button
                          type="button"
                          onClick={() => {
                            handleSelectCompany(company.id);
                            if (window.innerWidth < 768) setIsSidebarOpen(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all text-left cursor-pointer pr-8 ${
                            isSelected
                              ? 'bg-[#e8f0fe] text-[#1a73e8] font-bold shadow-2xs'
                              : 'text-[#3c4043] hover:bg-[#f1f3f4] hover:text-[#202124]'
                          }`}
                        >
                          <Building2 className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#1a73e8]' : 'text-[#5f6368]'}`} />
                          <span className="truncate">{company.name}</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePinPartner(company.id);
                          }}
                          className="absolute right-2 p-1 text-[#80868b] hover:text-[#ea4335] opacity-0 group-hover:opacity-100 transition-opacity rounded-full hover:bg-black/5 cursor-pointer"
                          title={`Bỏ ghim ${company.name} khỏi menu Đối tác`}
                        >
                          <PinOff className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleSwitchPartner}
                  className="w-full px-3 py-2 text-xs text-[#5f6368] hover:text-[#1a73e8] hover:bg-[#f1f3f4] rounded-xl text-left border border-dashed border-[#dadce0] transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Pin className="w-3.5 h-3.5 text-[#5f6368]" />
                  <span>Ghim đối tác từ danh sách</span>
                </button>
              )}
            </div>

            {/* 3. Dự án phát triển */}
            <div className="space-y-1">
              <div className="px-3 py-1 text-xs font-semibold text-[#5f6368] uppercase tracking-wider">Dự án</div>
              <button 
                onClick={() => {
                  setShowEcaList(true);
                  setShowMonosLanding(false);
                  setShowEcbList(false);
                  setShowB2bList(false);
                  setShowModList(false);
                  setShowOverview(false);
                  setShowMonos(false);
                  setShowPillarB(false);
                  setShowPillarC(false);
                  setShowFurnitureOS(false);
                  setIsShowingPartnerList(false);
                  setShowAdmin(false);
                  setSelectedServiceDetail(null);
                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-full text-sm font-medium transition-all text-left cursor-pointer ${
                  showEcaList 
                    ? 'bg-[#e8f0fe] text-[#1a73e8] font-bold shadow-2xs' 
                    : 'text-[#3c4043] hover:bg-[#f1f3f4] hover:text-[#202124]'
                }`}
              >
                <ShoppingBag className={`w-4 h-4 ${showEcaList ? 'text-[#1a73e8]' : 'text-[#5f6368]'}`} />
                <span className="truncate">Ecommerce A (Mass)</span>
              </button>
              <button 
                onClick={() => {
                  setShowEcbList(true);
                  setShowMonosLanding(false);
                  setShowEcaList(false);
                  setShowB2bList(false);
                  setShowModList(false);
                  setShowOverview(false);
                  setShowMonos(false);
                  setShowPillarB(false);
                  setShowPillarC(false);
                  setShowFurnitureOS(false);
                  setIsShowingPartnerList(false);
                  setShowAdmin(false);
                  setSelectedServiceDetail(null);
                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-full text-sm font-medium transition-all text-left cursor-pointer ${
                  showEcbList 
                    ? 'bg-[#f3e8fd] text-[#7627bb] font-bold shadow-2xs' 
                    : 'text-[#3c4043] hover:bg-[#f1f3f4] hover:text-[#202124]'
                }`}
              >
                <Sparkles className={`w-4 h-4 ${showEcbList ? 'text-[#7627bb]' : 'text-[#5f6368]'}`} />
                <span className="truncate">Ecommerce B (Limited)</span>
              </button>
              <button 
                onClick={() => {
                  setShowB2bList(true);
                  setShowMonosLanding(false);
                  setShowEcaList(false);
                  setShowEcbList(false);
                  setShowModList(false);
                  setShowOverview(false);
                  setShowMonos(false);
                  setShowPillarB(false);
                  setShowPillarC(false);
                  setShowFurnitureOS(false);
                  setIsShowingPartnerList(false);
                  setShowAdmin(false);
                  setSelectedServiceDetail(null);
                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-full text-sm font-medium transition-all text-left cursor-pointer ${
                  showB2bList 
                    ? 'bg-[#e6f4ea] text-[#137333] font-bold shadow-2xs' 
                    : 'text-[#3c4043] hover:bg-[#f1f3f4] hover:text-[#202124]'
                }`}
              >
                <Users className={`w-4 h-4 ${showB2bList ? 'text-[#137333]' : 'text-[#5f6368]'}`} />
                <span className="truncate">OBM</span>
              </button>
            </div>

            {/* 4. Phạm vi công việc */}
            <div className="space-y-1">
              <div className="px-3 py-1 text-xs font-semibold text-[#5f6368] uppercase tracking-wider">Phạm vi công việc</div>
              {scopeServices.map(service => {
                const isActive = selectedServiceDetail?.id === service.id;
                const isTerracotta = service.id === 'monosbase' || service.id === 'bot-team';
                
                const iconColor = isTerracotta
                  ? (isActive ? '#b44b22' : '#c85a32')
                  : (isActive ? '#1a73e8' : '#5f6368');

                return (
                  <button
                    key={service.id}
                    onClick={() => {
                      handleGoToPricing();
                      setServiceOrigin(null);
                      setSelectedServiceDetail(service);
                      if (window.innerWidth < 768) setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-full text-sm font-medium transition-all text-left cursor-pointer ${
                      isActive 
                        ? isTerracotta
                          ? 'bg-[#fbebe4] text-[#b44b22] font-bold shadow-2xs'
                          : 'bg-[#e8f0fe] text-[#1a73e8] font-bold shadow-2xs'
                        : isTerracotta
                          ? 'text-[#c85a32] hover:bg-[#faeae3] hover:text-[#b44b22]'
                          : 'text-[#3c4043] hover:bg-[#f1f3f4] hover:text-[#202124]'
                    }`}
                  >
                    <div className="shrink-0">
                      {getIcon(service.id, service, iconColor)}
                    </div>
                    <span className="truncate">
                      {getCleanServiceName(service.name)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 5. Hệ thống (dưới cùng) */}
            <div className="space-y-1 pt-1">
              <button 
                type="button"
                onClick={() => setIsSystemSectionOpen(!isSystemSectionOpen)}
                className="w-full flex items-center justify-between px-3 py-1 text-xs font-semibold text-[#5f6368] hover:text-[#202124] uppercase tracking-wider rounded-lg hover:bg-[#f1f3f4] transition-colors cursor-pointer text-left"
              >
                <span>Hệ thống</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#5f6368] transition-transform duration-200 ${isSystemSectionOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isSystemSectionOpen && (
                <div className="space-y-1 pt-0.5 animate-in fade-in slide-in-from-top-1 duration-150">
                  <button 
                    onClick={handleSwitchPartner}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-full text-sm font-medium transition-all text-left cursor-pointer ${
                      isShowingPartnerList 
                        ? 'bg-[#e8f0fe] text-[#1a73e8] font-bold shadow-2xs' 
                        : 'text-[#3c4043] hover:bg-[#f1f3f4] hover:text-[#202124]'
                    }`}
                  >
                    <Users2 className={`w-4 h-4 ${isShowingPartnerList ? 'text-[#1a73e8]' : 'text-[#5f6368]'}`} />
                    <span className="truncate">Danh sách đối tác</span>
                  </button>
                  <button 
                    onClick={() => {
                      setShowAdmin(true);
                      setIsShowingPartnerList(false);
                      setSelectedServiceDetail(null);
                      setShowOverview(false);
                      setShowMonos(false);
                      setShowFurnitureOS(false);
                      setShowEcaList(false);
                      setShowEcbList(false);
                      setShowB2bList(false);
                      setShowModList(false);
                      if (window.innerWidth < 768) setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-full text-sm font-medium transition-all text-left cursor-pointer ${
                      showAdmin 
                        ? 'bg-[#e8f0fe] text-[#1a73e8] font-bold shadow-2xs' 
                        : 'text-[#3c4043] hover:bg-[#f1f3f4] hover:text-[#202124]'
                    }`}
                  >
                    <LayoutGrid className={`w-4 h-4 ${showAdmin ? 'text-[#1a73e8]' : 'text-[#5f6368]'}`} />
                    <span className="truncate">Admin Console</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Google Main Workspace Area */}
      <div ref={mainContentRef} className="flex-1 flex flex-col bg-[#f8f9fa] min-w-0">
        {/* Google Top App Bar */}
        <header className="sticky top-0 z-40 bg-white border-b border-[#dadce0] flex items-center justify-between px-4 sm:px-8 py-3 text-sm text-[#5f6368] shadow-2xs">
          <div className="flex items-center gap-3 min-w-0">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)} 
                className="p-2 hover:bg-[#f1f3f4] rounded-full text-[#5f6368] hover:text-[#202124] transition-colors cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center gap-2 overflow-hidden text-sm">
              {showAdmin ? (
                <>
                  <span className="truncate hidden sm:inline text-[#5f6368]">Hệ thống</span>
                  <span className="hidden sm:inline text-[#dadce0]">/</span>
                  <span className="text-[#202124] font-semibold truncate">Admin Console</span>
                </>
              ) : selectedServiceDetail ? (
                <span className="text-[#202124] font-semibold truncate">
                  {getCleanServiceName(selectedServiceDetail.name)}
                </span>
              ) : (showEcaList || showEcbList || showB2bList || showModList) ? (
                <>
                  <span className="truncate hidden sm:inline text-[#5f6368]">Dự án</span>
                  <span className="hidden sm:inline text-[#dadce0]">/</span>
                  <span className="text-[#202124] font-semibold truncate">
                    {showEcaList ? 'Ecommerce A' : showEcbList ? 'Ecommerce B' : showB2bList ? 'OBM' : 'MOD'}
                  </span>
                </>
              ) : showMonosLanding ? (
                <>
                  <span className="truncate hidden sm:inline text-[#5f6368]">Nền tảng</span>
                  <span className="hidden sm:inline text-[#dadce0]">/</span>
                  <span className="text-[#202124] font-semibold truncate">MonosMaker Architecture</span>
                </>
              ) : (showOverview || showMonos || showPillarB || showPillarC || showFurnitureOS) ? (
                <>
                  <span className="truncate hidden sm:inline text-[#5f6368]">Hệ sinh thái</span>
                  <span className="hidden sm:inline text-[#dadce0]">/</span>
                  <span className="text-[#202124] font-semibold truncate">
                    {showOverview ? 'Pillar A | B | C' : showMonos ? 'Pillar A' : showPillarB ? 'Pillar B' : showPillarC ? 'Pillar C' : 'Furniture OS'}
                  </span>
                </>
              ) : (
                <>
                  <span className="truncate hidden sm:inline text-[#5f6368]">Đối tác MonosMaker</span>
                  <span className="hidden sm:inline text-[#dadce0]">/</span>
                  <span 
                    className="truncate max-w-[200px] sm:max-w-none text-[#202124] font-semibold cursor-pointer hover:text-[#1a73e8]"
                    onClick={handleGoToPricing}
                  >
                    {isShowingPartnerList ? 'Danh sách đối tác' : (isLandingPage ? 'Danh mục dịch vụ' : (selectedCompany?.name || 'Đối tác'))}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Right Controls in Google Top Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsScopePdfModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1a73e8] hover:bg-[#1557d0] active:scale-95 text-white rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer"
              title="Xuất tài liệu phạm vi công việc ra PDF đầy đủ tất cả các trang"
            >
              <Printer className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline">Xuất PDF Phạm Vi</span>
              <span className="sm:hidden">Xuất PDF</span>
            </button>
          </div>
        </header>

        {/* Google Main Page Content Container */}
        <main className="flex-1 w-full flex flex-col max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-8 md:py-10">
          {showAdmin ? (
            <AdminDesignPage 
              onBack={() => setShowAdmin(false)}
              currentCompanies={currentCompanies}
              allServices={allServices}
              initialCompanyId={selectedCompanyId}
              onUpdateCompanies={(updated) => {
                setCurrentCompanies(updated);
              }}
              onViewCompany={(companyId, updatedCompanies) => {
                if (updatedCompanies) {
                  setCurrentCompanies(updatedCompanies);
                }
                setSelectedCompanyId(companyId);
                setShowAdmin(false);
                setIsShowingPartnerList(false);
                setShowModList(false);
                setShowEcaList(false);
                setShowEcbList(false);
                setShowB2bList(false);
                setSelectedServiceDetail(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ) : selectedServiceDetail ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full pb-16">
              <ServiceDetailContent 
                service={selectedServiceDetail} 
                onBack={handleBackFromServiceDetail}
                onShowMonosbaseTech={() => {
                  setShowMonosbaseTech(true);
                  setSelectedServiceDetail(null);
                }}
                backTitle={serviceBackTitle}
                hideBack={!serviceOrigin && !selectedServiceDetail.id.startsWith('eca-') && !selectedServiceDetail.id.startsWith('ecb-') && !selectedServiceDetail.id.startsWith('b2b-') && !selectedServiceDetail.id.startsWith('mod-')}
              />
            </div>
          ) : isShowingPartnerList ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full pb-16">
              {/* Google Header Banner */}
              <div className="mb-10">
                <div className="w-14 h-14 bg-gradient-to-tr from-[#1a73e8] to-[#4285f4] text-white flex items-center justify-center rounded-2xl mb-4 shadow-sm">
                  <Building2 className="w-7 h-7" />
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#202124] mb-2 leading-tight">
                  Hệ sinh thái Đối tác Monos & Furniture OS
                </h1>
                <p className="text-sm text-[#5f6368] font-normal leading-relaxed max-w-3xl">
                  Quản lý và điều phối các giải pháp thiết kế, số hóa sản phẩm và chuỗi cung ứng chiến lược cho từng đối tác trong hệ sinh thái.
                </p>
              </div>

              {/* Strategic Partners Section */}
              <div className="space-y-10">
                {['Pillar B', 'Pillar C', 'Retail'].map(type => {
                  const typeCompanies = currentCompanies.filter(c => c.type === type);
                  if (typeCompanies.length === 0) return null;
                  
                  return (
                    <div key={type} className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#1a73e8]" />
                        <h2 className="text-sm font-bold text-[#202124] uppercase tracking-wider">
                          ĐỐI TÁC {type} ({typeCompanies.length})
                        </h2>
                        <div className="h-[1px] flex-1 bg-[#dadce0]" />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {typeCompanies.map(company => {
                          const isPinned = pinnedPartnerIds.includes(company.id);
                          return (
                            <div
                              key={company.id}
                              className="relative bg-white border border-[#dadce0] rounded-2xl hover:border-[#1a73e8]/60 hover:shadow-[0_1px_3px_0_rgba(60,64,67,0.3),0_4px_8px_3px_rgba(60,64,67,0.15)] transition-all group overflow-hidden"
                            >
                              <button
                                type="button"
                                onClick={() => handleSelectCompany(company.id)}
                                className="w-full flex items-start gap-4 p-5 text-left cursor-pointer pr-14"
                              >
                                <div className="w-12 h-12 bg-[#f8f9fa] rounded-xl flex items-center justify-center border border-[#dadce0] group-hover:bg-[#e8f0fe] group-hover:border-[#1a73e8]/30 transition-all shrink-0">
                                  <Building2 className="w-6 h-6 text-[#5f6368] group-hover:text-[#1a73e8]" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h3 className="font-bold text-base text-[#202124] group-hover:text-[#1a73e8] truncate tracking-tight transition-colors">
                                    {company.name}
                                  </h3>
                                  <p className="text-xs text-[#5f6368] line-clamp-2 mt-1 leading-relaxed">
                                    {company.description}
                                  </p>
                                </div>
                              </button>

                              {/* Pin Button */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  togglePinPartner(company.id);
                                }}
                                className={`absolute top-3.5 right-3.5 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer z-10 shadow-2xs ${
                                  isPinned
                                    ? 'bg-[#e8f0fe] text-[#1a73e8] border-[#1a73e8]/30 hover:bg-[#d2e3fc]'
                                    : 'bg-white/90 text-[#5f6368] border-[#dadce0] hover:bg-[#f8f9fa] hover:text-[#1a73e8]'
                                }`}
                                title={isPinned ? 'Bỏ ghim khỏi menu ĐỐI TÁC' : 'Ghim ra menu ĐỐI TÁC'}
                              >
                                <Pin className={`w-3.5 h-3.5 ${isPinned ? 'fill-[#1a73e8] text-[#1a73e8]' : 'text-[#5f6368]'}`} />
                                <span className="text-[11px]">{isPinned ? 'Đã ghim' : 'Ghim'}</span>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : showEcaList || showEcbList || showB2bList || showModList ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full pb-16">
              <div className="mb-8 max-w-4xl">
                <div className="w-14 h-14 bg-white border border-[#dadce0] flex items-center justify-center rounded-2xl mb-4 shadow-2xs">
                  {showEcaList ? <ShoppingBag className="w-7 h-7 text-[#1a73e8]" /> : 
                   showEcbList ? <Sparkles className="w-7 h-7 text-[#7627bb]" /> :
                   showB2bList ? <Users className="w-7 h-7 text-[#137333]" /> :
                   <Cpu className="w-7 h-7 text-[#e37400]" />}
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#202124] mb-2 leading-tight">
                  {showEcaList ? 'Ecommerce A (Mass Market)' : 
                   showEcbList ? 'Ecommerce B (Limited Edition)' :
                   showB2bList ? 'OBM (Original Brand Manufacture)' :
                   'MOD (Manufacture On Demand)'}
                </h1>
                <p className="text-sm text-[#5f6368] leading-relaxed max-w-3xl">
                  {showEcaList ? 'Hệ thống giải pháp thương mại điện tử dành cho phân khúc thị trường đại chúng, tối ưu hóa quy trình bán hàng và tiếp cận khách hàng quy mô lớn.' : 
                   showEcbList ? 'Giải pháp thương mại điện tử chuyên biệt cho các dòng sản phẩm giới hạn (Limited Edition), chú trọng vào trải nghiệm khách hàng cao cấp và độc bản.' :
                   showB2bList ? 'Nền tảng phát triển sản phẩm OBM toàn diện, kết nối từ ý tưởng thiết kế đến quy trình sản xuất và cung ứng sản phẩm trọn gói cho đối tác.' :
                   'Dịch vụ sản xuất linh hoạt dựa trên yêu cầu cụ thể của từng đơn hàng. Chúng tôi thực hiện hóa các bản vẽ và ý tưởng riêng biệt của khách hàng với độ chính xác cao và quy trình kiểm soát chất lượng nghiêm ngặt.'}
                </p>
              </div>

              {/* Google Filter Chips Bar */}
              <div className="flex items-center justify-between gap-3 flex-wrap mb-8 pb-4 border-b border-[#dadce0]">
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => { setShowEcaList(true); setShowEcbList(false); setShowB2bList(false); setShowModList(false); }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                      showEcaList 
                        ? 'bg-[#1a73e8] text-white shadow-xs' 
                        : 'bg-white text-[#3c4043] border border-[#dadce0] hover:bg-[#f1f3f4]'
                    }`}
                  >
                    Ecommerce A
                  </button>
                  <button
                    onClick={() => { setShowEcaList(false); setShowEcbList(true); setShowB2bList(false); setShowModList(false); }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                      showEcbList 
                        ? 'bg-[#7627bb] text-white shadow-xs' 
                        : 'bg-white text-[#3c4043] border border-[#dadce0] hover:bg-[#f1f3f4]'
                    }`}
                  >
                    Ecommerce B
                  </button>
                  <button
                    onClick={() => { setShowEcaList(false); setShowEcbList(false); setShowB2bList(true); setShowModList(false); }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                      showB2bList 
                        ? 'bg-[#137333] text-white shadow-xs' 
                        : 'bg-white text-[#3c4043] border border-[#dadce0] hover:bg-[#f1f3f4]'
                    }`}
                  >
                    OBM
                  </button>
                </div>

                {/* Compact Button to open Add Category Modal */}
                {!showModList && (
                  <button
                    onClick={() => setIsAddCategoryModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#f8f9fa] text-[#1a73e8] hover:text-[#174ea6] border border-[#dadce0] hover:border-[#1a73e8]/40 rounded-full text-xs font-semibold transition-all shadow-2xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm brand</span>
                  </button>
                )}
              </div>

              {!showModList ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {allServices.filter(s => s.id.startsWith(showEcaList ? 'eca-' : showEcbList ? 'ecb-' : showB2bList ? 'b2b-' : 'mod-')).map((service, i) => {
                    const isCustom = customCategories.some(c => c.id === service.id);
                    return (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="relative group/card"
                      >
                        <button
                          onClick={() => {
                            setSelectedServiceDetail(service);
                            setServiceOrigin(showB2bList ? 'b2b' : showEcaList ? 'eca' : showEcbList ? 'ecb' : 'mod');
                            setShowEcaList(false);
                            setShowEcbList(false);
                            setShowB2bList(false);
                            setShowModList(false);
                            setShowMonosLanding(false);
                          }}
                          className="w-full h-full flex flex-col gap-4 p-5 sm:p-6 bg-white border border-[#dadce0] rounded-2xl transition-all text-left group hover:border-[#1a73e8] hover:shadow-[0_4px_16px_rgba(26,115,232,0.12)] cursor-pointer"
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="w-12 h-12 bg-[#f8f9fa] rounded-xl flex items-center justify-center border border-[#dadce0] group-hover:bg-[#e8f0fe] group-hover:border-[#1a73e8]/30 transition-all shrink-0 text-[#1a73e8]">
                              {getIcon(service.id, service)}
                            </div>
                            {isCustom && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#e6f4ea] text-[#137333] border border-[#137333]/20">
                                Mới thêm
                              </span>
                            )}
                          </div>

                          <div className="min-w-0 space-y-1.5 flex-1">
                            <h3 className="font-bold text-base sm:text-lg text-[#202124] tracking-tight group-hover:text-[#1a73e8] leading-snug transition-colors">
                              {service.name.replace(' (A)', '').replace(' (B)', '')}
                            </h3>
                            <p className="text-sm text-[#5f6368] leading-relaxed line-clamp-2">
                              {service.description}
                            </p>
                          </div>
                        </button>

                        {/* Delete button for custom categories */}
                        {isCustom && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm(`Bạn có chắc chắn muốn xóa brand "${service.name}" không?`)) {
                                deleteCustomCategory(service.id);
                                setCustomCategories(getStoredCustomCategories());
                              }
                            }}
                            title="Xóa brand này"
                            className="absolute top-3 right-3 p-1.5 bg-white/90 hover:bg-[#fce8e6] text-[#5f6368] hover:text-[#d93025] border border-[#dadce0] hover:border-[#d93025]/30 rounded-lg opacity-0 group-hover/card:opacity-100 transition-opacity z-10 cursor-pointer shadow-xs"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              ) : (

                <div className="bg-white border border-[#dadce0] rounded-3xl p-8 md:p-12 text-center max-w-3xl shadow-xs">
                  <div className="w-16 h-16 bg-[#fef7e0] border border-[#fce8b2] flex items-center justify-center rounded-2xl mx-auto mb-6 text-[#e37400]">
                    <Cpu className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#202124] mb-3">Quy trình sản xuất linh hoạt (MOD)</h3>
                  <p className="text-base text-[#5f6368] leading-relaxed mb-8 max-w-xl mx-auto">
                    Dịch vụ MOD được thực hiện hoàn toàn dựa trên yêu cầu đặc thù của khách hàng. Vui lòng gửi hồ sơ kỹ thuật hoặc yêu cầu sản xuất của bạn để chúng tôi tiến hành phân tích và báo giá chính xác cho từng dự án.
                  </p>
                  <button 
                    onClick={() => {
                      alert('Tính năng gửi yêu cầu dự án MOD đang được kết nối với hệ thống quản lý đơn hàng.');
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a73e8] hover:bg-[#1557d0] text-white rounded-full font-semibold text-sm transition-all shadow-sm cursor-pointer"
                  >
                    Gửi yêu cầu dự án
                  </button>
                </div>
              )}
            </div>
          ) : showMonosLanding ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full pb-16">
              <MonosMakerLandingPage 
                onExplorePackages={(pkgId) => {
                  if (pkgId) {
                    const pkgMap: Record<string, string> = {
                      'pkg-1': 'bot-team',
                      'pkg-2': 'brand-consult',
                      'pkg-3': 'ecom-setup',
                      'pkg-4': 'design-rnd-center',
                      'pkg-5': 'monosbase',
                      'pkg-6': '3d-interactive'
                    };
                    const actualId = pkgMap[pkgId] || pkgId;
                    const service = SERVICES.find(s => s.id === actualId || s.id === pkgId);
                    if (service) {
                      setSelectedServiceDetail(service);
                      setServiceOrigin('monos_landing');
                      setShowMonosLanding(false);
                      setShowEcaList(false);
                      setShowEcbList(false);
                      setShowB2bList(false);
                      setShowModList(false);
                      setShowOverview(false);
                      setShowMonos(false);
                      setShowPillarB(false);
                      setShowPillarC(false);
                      setShowFurnitureOS(false);
                    }
                  }
                }}
              />
            </div>
          ) : showOverview ? (
            <EcosystemOverviewContent onBack={handleGoToPricing} />
          ) : showMonos ? (
            <MonosCapabilitiesContent onBack={handleGoToPricing} />
          ) : showPillarB ? (
            <PillarBContent onBack={handleGoToPricing} />
          ) : showPillarC ? (
            <PillarCContent onBack={handleGoToPricing} />
          ) : showFurnitureOS ? (
            <FurnitureOSOverviewContent onBack={handleGoToPricing} />
          ) : showMonosbaseTech ? (
            <MonosbaseTechView onBack={() => {
              const monosbase = SERVICES.find(s => s.id === 'monosbase');
              if (monosbase) {
                setSelectedServiceDetail(monosbase);
                setShowMonosbaseTech(false);
              } else {
                handleGoToPricing();
              }
            }} />
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full pb-16">
              <CompanyDetailGraphicView
                company={selectedCompany}
                allowedServices={allowedServices}
                selections={selections}
                initialCategory={mainCategoryFilter}
                isPinned={selectedCompany ? pinnedPartnerIds.includes(selectedCompany.id) : false}
                onTogglePin={togglePinPartner}
                onToggleService={toggleService}
                onUpdateQuantity={updateQuantity}
                onSelectServiceDetail={(service) => {
                  setSelectedServiceDetail(service);
                  setServiceOrigin('company');
                  setShowMonosLanding(false);
                  setShowEcaList(false);
                  setShowEcbList(false);
                  setShowB2bList(false);
                  setShowModList(false);
                  setShowOverview(false);
                  setShowMonos(false);
                  setShowPillarB(false);
                  setShowPillarC(false);
                  setShowFurnitureOS(false);
                }}
                onOpenPartnerList={handleSwitchPartner}
                onOpenConfig={() => {
                  setShowAdmin(true);
                  setIsShowingPartnerList(false);
                }}
              />

              <hr className="border-[#dadce0] my-12" />

              {/* Google Footer Info */}
              <div className="text-[#5f6368] text-xs space-y-1.5 pb-6">
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1a73e8]" />
                  <span>Tài liệu hệ sinh thái chuẩn hóa trên nền tảng Google Workspace & Furniture OS Architecture.</span>
                </p>
                <p className="text-[11px] text-[#80868b]">
                  Bản quyền © {new Date().getFullYear()} Monos Design & Furniture OS. Mọi quyền được bảo lưu.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Floating Summary Box (Google Style) */}
      <AnimatePresence>
        {!isShowingPartnerList && (Object.values(selections) as SelectionState[string][]).some(s => s.selected) && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 right-4 z-50 md:w-96 bg-white border border-[#dadce0] shadow-[0_1px_3px_0_rgba(60,64,67,0.3),0_4px_8px_3px_rgba(60,64,67,0.15)] rounded-2xl overflow-hidden no-print"
          >
            <div className="p-3.5 bg-[#e8f0fe] border-b border-[#d2e3fc] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-[#1a73e8]" />
                <span className="text-xs font-bold text-[#1a73e8] uppercase tracking-wider">Hạng mục đã chọn</span>
              </div>
              <div className="bg-[#1a73e8] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {(Object.values(selections) as SelectionState[string][]).filter(s => s.selected).length} dịch vụ
              </div>
            </div>
            <div className="p-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs text-[#5f6368]">Đối tác: <span className="font-semibold text-[#202124]">{selectedCompany?.name || '...'}</span></div>
                <div className="text-sm font-bold text-[#202124]">
                  {(Object.values(selections) as SelectionState[string][]).filter(s => s.selected).length} module đề xuất
                </div>
              </div>
              <button 
                onClick={() => setIsQuotationModalOpen(true)}
                className="bg-[#1a73e8] hover:bg-[#1557d0] text-white px-4 py-2 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                title="Mở bảng báo giá, Xuất file PDF hoặc Sao chép bảng vào Clipboard"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Quotation</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Quotation Modal Triggered from Floating Summary */}
      <QuotationModal
        isOpen={isQuotationModalOpen}
        onClose={() => setIsQuotationModalOpen(false)}
        company={selectedCompany}
        allowedServices={allowedServices}
        selections={selections}
      />

      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        onAddCategory={(newCat) => {
          saveCustomCategory(newCat);
          setCustomCategories(getStoredCustomCategories());
        }}
        defaultProjectType={showEcaList ? 'eca' : showEcbList ? 'ecb' : 'b2b'}
      />

      {/* Scope PDF Export Modal (All Pages / Single Scope) */}
      <ScopePdfExportModal
        isOpen={isScopePdfModalOpen}
        onClose={() => setIsScopePdfModalOpen(false)}
        allServices={allServices}
        currentService={selectedServiceDetail}
        selectedCompany={selectedCompany}
      />
    </div>
  );
}

