import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  ChevronRight, 
  LayoutGrid, 
  Save, 
  Search, 
  Shield, 
  Settings,
  ArrowLeft,
  ChevronDown,
  Sparkles,
  Plus,
  X,
  Trash2,
  ExternalLink,
  Eye,
  Hammer,
  Download,
  Upload,
  Database,
  RefreshCw,
  Check,
  AlertCircle,
  Edit2,
  ShoppingBag,
  Cpu,
  Package,
  Layers
} from 'lucide-react';
import { Company, Service } from '../types';
import { COMPANIES, SERVICES } from '../data';
import { 
  syncDataToServer, 
  exportAppDataToFile, 
  importAppDataFromFile, 
  fetchServerData, 
  subscribeToSyncStatus 
} from '../lib/storageSync';

interface AdminDesignPageProps {
  onBack: () => void;
  onUpdateCompanies: (updatedCompanies: Company[]) => void;
  currentCompanies: Company[];
  allServices?: Service[];
  initialCompanyId?: string;
  onViewCompany?: (companyId: string, updatedCompanies?: Company[]) => void;
}

const AdminDesignPage: React.FC<AdminDesignPageProps> = ({ 
  onBack, 
  onUpdateCompanies, 
  currentCompanies, 
  allServices = SERVICES,
  initialCompanyId,
  onViewCompany
}) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(initialCompanyId || currentCompanies[0]?.id || '');
  const [localCompanies, setLocalCompanies] = useState<Company[]>(currentCompanies);
  const [searchTerm, setSearchTerm] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [syncStatusText, setSyncStatusText] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [lastSavedTime, setLastSavedTime] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalCompanies(currentCompanies);
  }, [currentCompanies]);

  useEffect(() => {
    const unsubscribe = subscribeToSyncStatus((status, time) => {
      setSyncStatusText(status);
      if (time) setLastSavedTime(time);
    });
    return unsubscribe;
  }, []);

  const [newCompany, setNewCompany] = useState<Partial<Company>>({
    id: '',
    name: '',
    description: '',
    type: 'Pillar B',
    allowedServices: allServices.map(s => s.id),
    developedCategories: []
  });

  const [newCategory, setNewCategory] = useState('');

  const selectedCompany = localCompanies.find(c => c.id === selectedCompanyId);

  const handleUpdateCompanyField = (field: keyof Company, value: any) => {
    if (!selectedCompanyId) return;
    const updated = localCompanies.map(company => {
      if (company.id === selectedCompanyId) {
        return {
          ...company,
          [field]: value
        };
      }
      return company;
    });

    setLocalCompanies(updated);
    onUpdateCompanies(updated);
    syncDataToServer({ furniture_os_partners: updated });
    setSaveStatus('idle');
  };

  const handleAddCategory = () => {
    if (!newCategory || !selectedCompanyId) return;
    
    const updated = localCompanies.map(company => {
      if (company.id === selectedCompanyId) {
        const categories = company.developedCategories || [];
        if (categories.includes(newCategory)) return company;
        return {
          ...company,
          developedCategories: [...categories, newCategory]
        };
      }
      return company;
    });

    setLocalCompanies(updated);
    onUpdateCompanies(updated);
    syncDataToServer({ furniture_os_partners: updated });
    setNewCategory('');
    setSaveStatus('idle');
  };

  const handleRemoveCategory = (catToRemove: string) => {
    const updated = localCompanies.map(company => {
      if (company.id === selectedCompanyId) {
        return {
          ...company,
          developedCategories: (company.developedCategories || []).filter(cat => cat !== catToRemove)
        };
      }
      return company;
    });

    setLocalCompanies(updated);
    onUpdateCompanies(updated);
    syncDataToServer({ furniture_os_partners: updated });
    setSaveStatus('idle');
  };

  const handleToggleService = (serviceId: string) => {
    if (!selectedCompanyId) return;

    const updated = localCompanies.map(company => {
      if (company.id === selectedCompanyId) {
        const allowedServices = company.allowedServices || [];
        const isAllowed = allowedServices.includes(serviceId);
        
        return {
          ...company,
          allowedServices: isAllowed 
            ? allowedServices.filter(id => id !== serviceId)
            : [...allowedServices, serviceId]
        };
      }
      return company;
    });

    setLocalCompanies(updated);
    onUpdateCompanies(updated);
    syncDataToServer({ furniture_os_partners: updated });
    setSaveStatus('idle');
  };

  const handleBatchToggleServices = (serviceIds: string[], enable: boolean) => {
    if (!selectedCompanyId) return;
    const updated = localCompanies.map(company => {
      if (company.id === selectedCompanyId) {
        const allowedSet = new Set(company.allowedServices || []);
        serviceIds.forEach(id => {
          if (enable) allowedSet.add(id);
          else allowedSet.delete(id);
        });
        return {
          ...company,
          allowedServices: Array.from(allowedSet)
        };
      }
      return company;
    });

    setLocalCompanies(updated);
    onUpdateCompanies(updated);
    syncDataToServer({ furniture_os_partners: updated });
    setSaveStatus('idle');
  };

  const handleAddCompany = () => {
    if (!newCompany.name || !newCompany.id) return;
    
    const companyToAdd: Company = {
      id: newCompany.id,
      name: newCompany.name,
      description: newCompany.description || '',
      type: newCompany.type || 'Pillar B',
      developedCategories: newCompany.developedCategories || [],
      allowedServices: newCompany.allowedServices && newCompany.allowedServices.length > 0 
        ? newCompany.allowedServices 
        : allServices.map(s => s.id),
      ...newCompany
    } as Company;

    const updated = [...localCompanies, companyToAdd];
    setLocalCompanies(updated);
    onUpdateCompanies(updated);
    syncDataToServer({ furniture_os_partners: updated });
    setSelectedCompanyId(companyToAdd.id);
    setShowAddModal(false);
    setNewCompany({ id: '', name: '', description: '', type: 'Pillar B', allowedServices: allServices.map(s => s.id), developedCategories: [] });
    setSaveStatus('idle');
  };

  const handleDeleteCompany = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đối tác này?')) {
      const updated = localCompanies.filter(c => c.id !== id);
      setLocalCompanies(updated);
      onUpdateCompanies(updated);
      syncDataToServer({ furniture_os_partners: updated });
      if (selectedCompanyId === id) {
        setSelectedCompanyId(updated[0]?.id || '');
      }
      setSaveStatus('idle');
    }
  };

  const handleSave = () => {
    setSaveStatus('saving');
    onUpdateCompanies(localCompanies);
    syncDataToServer({ furniture_os_partners: localCompanies });
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 300);
  };

  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setSaveStatus('saving');
      await importAppDataFromFile(file);
      const serverData = await fetchServerData();
      if (serverData?.furniture_os_partners) {
        setLocalCompanies(serverData.furniture_os_partners);
        onUpdateCompanies(serverData.furniture_os_partners);
      }
      alert('Đã khôi phục dữ liệu từ file sao lưu thành công!');
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (err: any) {
      alert(`Lỗi khi nhập file: ${err.message || 'File không đúng định dạng'}`);
      setSaveStatus('idle');
    }
    if (e.target) e.target.value = '';
  };

  const handleManualFullSync = async () => {
    setSaveStatus('saving');
    syncDataToServer({ furniture_os_partners: localCompanies });
    await fetchServerData();
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  // Group services
  const ecomAServices = allServices.filter(s => s.id.startsWith('eca-'));
  const ecomBServices = allServices.filter(s => s.id.startsWith('ecb-'));
  const coreServices = allServices.filter(s => 
    !s.id.startsWith('eca-') && 
    !s.id.startsWith('ecb-') && 
    !s.id.startsWith('b2b-') && 
    !s.id.startsWith('mod-')
  );
  const obmServices = allServices.filter(s => s.id.startsWith('b2b-'));
  const modServices = allServices.filter(s => s.id.startsWith('mod-'));

  const filterServiceList = (services: Service[]) => {
    if (!searchTerm.trim()) return services;
    const q = searchTerm.toLowerCase();
    return services.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.id.toLowerCase().includes(q) || 
      (s.description && s.description.toLowerCase().includes(q))
    );
  };

  return (
    <div className="flex-1 h-[calc(100vh-56px)] bg-[#f8f9fa] flex flex-col overflow-hidden text-[#202124]">
      {/* Top Header */}
      <header className="bg-white border-b border-[#dadce0] sticky top-0 z-40">
        <div className="max-w-none px-6 md:px-10 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                onUpdateCompanies(localCompanies);
                onBack();
              }}
              className="p-2 hover:bg-[#f1f3f4] rounded-full transition-colors text-[#5f6368] cursor-pointer"
              title="Quay lại"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-[#202124]">Cấu hình Đối tác & Dịch vụ</h1>
              <p className="text-xs text-[#5f6368]">Thay đổi cấu hình sẽ đồng bộ trực tiếp sang trang chi tiết đối tác</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#dadce0] rounded-full font-semibold text-xs sm:text-sm text-[#3c4043] hover:bg-[#f8f9fa] transition-all shadow-2xs cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#5f6368]" />
              <span className="hidden sm:inline">Thêm đối tác</span>
            </button>

            <button
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer ${
                saveStatus === 'saved' 
                  ? 'bg-[#137333] text-white' 
                  : 'bg-[#1a73e8] text-white hover:bg-[#1557d0]'
              }`}
            >
              {saveStatus === 'saving' ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : saveStatus === 'saved' ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saveStatus === 'saving' ? 'Đang lưu...' : saveStatus === 'saved' ? 'Đã lưu' : 'Lưu cấu hình'}
            </button>
          </div>
        </div>
      </header>

      {/* Add Partner Modal Overlay */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#dadce0] overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#dadce0]">
                <h2 className="text-xl font-bold text-[#202124]">Thêm đối tác mới</h2>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-[#f1f3f4] rounded-full transition-colors cursor-pointer">
                  <X className="w-5 h-5 text-[#5f6368]" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#5f6368]">Tên đối tác</label>
                  <input 
                    type="text" 
                    placeholder="VD: An Hòa Phát"
                    value={newCompany.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      const id = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
                      setNewCompany(prev => ({ ...prev, name, id }));
                    }}
                    className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#dadce0] focus:bg-white focus:border-[#1a73e8] rounded-xl outline-none transition-all font-medium text-sm text-[#202124]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#5f6368]">Mã định danh (ID)</label>
                  <input 
                    type="text" 
                    placeholder="vd: an-hoa-phat"
                    value={newCompany.id}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, id: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#dadce0] focus:bg-white focus:border-[#1a73e8] rounded-xl outline-none transition-all font-mono text-sm text-[#202124]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#5f6368]">Loại đối tác</label>
                  <select 
                    value={newCompany.type}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#dadce0] focus:bg-white focus:border-[#1a73e8] rounded-xl outline-none transition-all font-medium text-sm text-[#202124]"
                  >
                    <option value="Pillar B">Pillar B (Sản xuất)</option>
                    <option value="Pillar C">Pillar C (Phân phối)</option>
                    <option value="Retail">Retail (Bán lẻ)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#5f6368]">Mô tả ngắn</label>
                  <textarea 
                    placeholder="Chuyên sản xuất nội thất gỗ..."
                    value={newCompany.description}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#dadce0] focus:bg-white focus:border-[#1a73e8] rounded-xl outline-none transition-all font-medium text-sm text-[#202124] resize-none"
                  />
                </div>
              </div>

              <button 
                onClick={handleAddCompany}
                disabled={!newCompany.name || !newCompany.id}
                className="w-full py-3 bg-[#1a73e8] text-white font-bold rounded-full hover:bg-[#1557d0] disabled:opacity-40 transition-all shadow-xs cursor-pointer"
              >
                Tạo đối tác mới
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main Content: Service Selection */}
        <main className="flex-1 overflow-y-auto bg-[#f8f9fa] p-4 sm:p-6 md:p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Company Selector & Profile Configuration Header */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#dadce0] shadow-xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 flex-1">
                  <div className="text-xs font-bold text-[#1a73e8] uppercase tracking-wider">Chọn đối tác cấu hình</div>
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1 max-w-md">
                      <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5f6368]" />
                      <select 
                        value={selectedCompanyId}
                        onChange={(e) => setSelectedCompanyId(e.target.value)}
                        className="w-full pl-11 pr-10 py-2.5 bg-[#f1f3f4] border border-transparent focus:bg-white focus:border-[#1a73e8] rounded-full text-sm font-bold text-[#202124] appearance-none cursor-pointer outline-none transition-all"
                      >
                        {localCompanies.map(company => (
                          <option key={company.id} value={company.id}>
                            {company.name} ({company.type})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5f6368] pointer-events-none" />
                    </div>
                    {selectedCompanyId && (
                      <button 
                        onClick={() => handleDeleteCompany(selectedCompanyId)}
                        className="p-2.5 text-[#d93025] hover:bg-[#fce8e6] rounded-full transition-colors cursor-pointer"
                        title="Xóa đối tác"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>

                {selectedCompany && (
                  <div className="flex items-center gap-3 flex-wrap">
                    <button
                      onClick={() => setIsEditingInfo(!isEditingInfo)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                        isEditingInfo 
                          ? 'bg-[#e8f0fe] text-[#1a73e8] border-[#1a73e8]' 
                          : 'bg-white text-[#3c4043] border-[#dadce0] hover:bg-[#f8f9fa]'
                      }`}
                      title="Chỉnh sửa thông tin Tên, Loại, Mô tả của đối tác"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>{isEditingInfo ? 'Đóng chỉnh sửa' : 'Sửa thông tin'}</span>
                    </button>

                    <button
                      onClick={() => {
                        onUpdateCompanies(localCompanies);
                        if (onViewCompany) {
                          onViewCompany(selectedCompanyId, localCompanies);
                        } else {
                          onBack();
                        }
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#e8f0fe] hover:bg-[#d2e3fc] border border-[#d2e3fc] text-[#1a73e8] rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-2xs"
                      title={`Xem ngay page giao diện chi tiết của ${selectedCompany.name}`}
                    >
                      <Eye className="w-4 h-4 text-[#1a73e8]" />
                      <span>Xem page {selectedCompany.name}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2 bg-[#f8f9fa] border border-[#dadce0] px-3.5 py-2 rounded-full">
                      <CheckCircle2 className="w-4 h-4 text-[#137333]" />
                      <div className="text-xs font-bold text-[#202124]">
                        {selectedCompany.allowedServices?.length || 0}/{allServices.length} dịch vụ bật
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {selectedCompany && (
                <div className="pt-4 border-t border-[#dadce0] space-y-4">
                  {/* Inline Edit Form for Company Profile */}
                  {isEditingInfo ? (
                    <div className="bg-[#f8f9fa] border border-[#dadce0] rounded-xl p-4 space-y-3 animate-in fade-in duration-150">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-[#5f6368]">Tên đối tác</label>
                          <input 
                            type="text"
                            value={selectedCompany.name}
                            onChange={(e) => handleUpdateCompanyField('name', e.target.value)}
                            className="w-full mt-1 px-3 py-2 bg-white border border-[#dadce0] focus:border-[#1a73e8] rounded-lg text-sm font-bold outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-[#5f6368]">Loại đối tác</label>
                          <select 
                            value={selectedCompany.type}
                            onChange={(e) => handleUpdateCompanyField('type', e.target.value)}
                            className="w-full mt-1 px-3 py-2 bg-white border border-[#dadce0] focus:border-[#1a73e8] rounded-lg text-sm font-medium outline-none"
                          >
                            <option value="Pillar B">Pillar B (Sản xuất)</option>
                            <option value="Pillar C">Pillar C (Phân phối)</option>
                            <option value="Retail">Retail (Bán lẻ)</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#5f6368]">Mô tả đối tác</label>
                        <textarea 
                          value={selectedCompany.description}
                          onChange={(e) => handleUpdateCompanyField('description', e.target.value)}
                          rows={2}
                          className="w-full mt-1 px-3 py-2 bg-white border border-[#dadce0] focus:border-[#1a73e8] rounded-lg text-sm font-medium outline-none resize-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-[#5f6368] leading-relaxed">
                      <span className="font-semibold text-[#202124]">Mô tả:</span> {selectedCompany.description}
                    </p>
                  )}

                  {/* Danh mục sản phẩm trọng tâm (developedCategories) */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5f6368]">
                      <LayoutGrid className="w-3.5 h-3.5 text-[#1a73e8]" />
                      <span>Danh mục sản phẩm trọng tâm (developedCategories)</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 items-center">
                      {(selectedCompany.developedCategories || []).map((cat, idx) => (
                        <div key={idx} className="inline-flex items-center gap-2 px-3 py-1 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-xs font-semibold text-[#202124]">
                          <span>{cat}</span>
                          <button 
                            onClick={() => handleRemoveCategory(cat)}
                            className="text-[#5f6368] hover:text-[#d93025] transition-colors cursor-pointer"
                            title="Xóa danh mục"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                      
                      <div className="flex items-center gap-1.5">
                        <input 
                          type="text"
                          placeholder="Thêm danh mục..."
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                          className="px-3 py-1 bg-white border border-[#dadce0] rounded-full text-xs font-medium focus:outline-none focus:border-[#1a73e8] w-36"
                        />
                        <button 
                          onClick={handleAddCategory}
                          className="p-1.5 bg-[#1a73e8] text-white rounded-full hover:bg-[#1557d0] transition-colors cursor-pointer"
                          title="Thêm danh mục vào đối tác"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {selectedCompany ? (
              <div className="space-y-6">
                {/* Search Bar for Services */}
                <div className="bg-white border border-[#dadce0] rounded-2xl p-4 shadow-xs flex items-center gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-[#5f6368] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input 
                      type="text"
                      placeholder="Tìm kiếm dịch vụ để bật/tắt nhanh..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-9 py-2 bg-[#f1f3f4] focus:bg-white border border-transparent focus:border-[#1a73e8] rounded-full text-sm outline-none transition-all"
                    />
                    {searchTerm && (
                      <button onClick={() => setSearchTerm('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5f6368]">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleBatchToggleServices(allServices.map(s => s.id), true)}
                      className="px-3 py-1.5 bg-[#f8f9fa] hover:bg-[#e8f0fe] text-[#1a73e8] border border-[#dadce0] rounded-full text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Bật tất cả
                    </button>
                    <button
                      onClick={() => handleBatchToggleServices(allServices.map(s => s.id), false)}
                      className="px-3 py-1.5 bg-[#f8f9fa] hover:bg-[#fce8e6] text-[#d93025] border border-[#dadce0] rounded-full text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Tắt tất cả
                    </button>
                  </div>
                </div>

                {/* 1. Core Services Section */}
                {filterServiceList(coreServices).length > 0 && (
                  <section className="bg-white border border-[#dadce0] rounded-2xl p-6 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#dadce0]">
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4 text-[#1a73e8]" />
                        <h3 className="text-sm font-bold text-[#202124]">Phạm vi công việc & Dịch vụ R&D cốt lõi</h3>
                        <span className="text-xs px-2 py-0.5 bg-[#e8f0fe] text-[#1a73e8] rounded-full font-bold">
                          {coreServices.filter(s => selectedCompany.allowedServices?.includes(s.id)).length}/{coreServices.length} đang bật
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleBatchToggleServices(coreServices.map(s => s.id), true)}
                          className="text-[11px] font-semibold text-[#1a73e8] hover:underline cursor-pointer"
                        >
                          Bật nhóm này
                        </button>
                        <span className="text-[#dadce0]">|</span>
                        <button
                          onClick={() => handleBatchToggleServices(coreServices.map(s => s.id), false)}
                          className="text-[11px] font-semibold text-[#5f6368] hover:text-[#d93025] hover:underline cursor-pointer"
                        >
                          Tắt nhóm này
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filterServiceList(coreServices).map(service => {
                        const isChecked = selectedCompany.allowedServices?.includes(service.id);
                        return (
                          <div 
                            key={service.id}
                            onClick={() => handleToggleService(service.id)}
                            className={`p-5 rounded-xl border transition-all cursor-pointer flex gap-4 ${
                              isChecked 
                                ? 'bg-[#e8f0fe]/30 border-[#1a73e8] shadow-2xs' 
                                : 'bg-white border-[#dadce0] hover:border-[#1a73e8]/40 opacity-70 hover:opacity-100'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-md border shrink-0 flex items-center justify-center transition-colors ${
                              isChecked ? 'bg-[#1a73e8] border-[#1a73e8]' : 'bg-white border-[#dadce0]'
                            }`}>
                              {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                            </div>
                            <div className="space-y-1">
                              <div className="font-bold text-sm text-[#202124]">
                                {service.name}
                              </div>
                              <p className="text-xs text-[#5f6368] leading-relaxed">
                                {service.description}
                              </p>
                              <div className="pt-1 text-xs font-semibold text-[#1a73e8]">
                                {service.type === 'package' ? 'Gói trọn gói' : `Theo đơn vị: ${service.unit || 'SKU'}`}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* 2. Ecommerce A Section */}
                {filterServiceList(ecomAServices).length > 0 && (
                  <section className="bg-white border border-[#dadce0] rounded-2xl p-6 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#dadce0]">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-[#1a73e8]" />
                        <h3 className="text-sm font-bold text-[#202124]">Ecommerce A - Mass Market</h3>
                        <span className="text-xs px-2 py-0.5 bg-[#e8f0fe] text-[#1a73e8] rounded-full font-bold">
                          {ecomAServices.filter(s => selectedCompany.allowedServices?.includes(s.id)).length}/{ecomAServices.length} đang bật
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleBatchToggleServices(ecomAServices.map(s => s.id), true)}
                          className="text-[11px] font-semibold text-[#1a73e8] hover:underline cursor-pointer"
                        >
                          Bật nhóm này
                        </button>
                        <span className="text-[#dadce0]">|</span>
                        <button
                          onClick={() => handleBatchToggleServices(ecomAServices.map(s => s.id), false)}
                          className="text-[11px] font-semibold text-[#5f6368] hover:text-[#d93025] hover:underline cursor-pointer"
                        >
                          Tắt nhóm này
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {filterServiceList(ecomAServices).map(service => {
                        const isChecked = selectedCompany.allowedServices?.includes(service.id);
                        return (
                          <div 
                            key={service.id}
                            onClick={() => handleToggleService(service.id)}
                            className={`p-4 rounded-xl border transition-all cursor-pointer flex gap-3 ${
                              isChecked 
                                ? 'bg-[#e8f0fe]/40 border-[#1a73e8] shadow-2xs' 
                                : 'bg-white border-[#dadce0] hover:border-[#1a73e8]/40 opacity-70 hover:opacity-100'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-md border shrink-0 flex items-center justify-center transition-colors ${
                              isChecked ? 'bg-[#1a73e8] border-[#1a73e8]' : 'bg-white border-[#dadce0]'
                            }`}>
                              {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                            </div>
                            <div className="space-y-0.5">
                              <div className="font-bold text-xs sm:text-sm text-[#202124]">
                                {service.name.replace(' (A)', '')}
                              </div>
                              <p className="text-xs text-[#5f6368] leading-relaxed">
                                {service.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* 3. Ecommerce B Section */}
                {filterServiceList(ecomBServices).length > 0 && (
                  <section className="bg-white border border-[#dadce0] rounded-2xl p-6 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#dadce0]">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#7627bb]" />
                        <h3 className="text-sm font-bold text-[#202124]">Ecommerce B - Limited Collection</h3>
                        <span className="text-xs px-2 py-0.5 bg-[#f3e8fd] text-[#7627bb] rounded-full font-bold">
                          {ecomBServices.filter(s => selectedCompany.allowedServices?.includes(s.id)).length}/{ecomBServices.length} đang bật
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleBatchToggleServices(ecomBServices.map(s => s.id), true)}
                          className="text-[11px] font-semibold text-[#7627bb] hover:underline cursor-pointer"
                        >
                          Bật nhóm này
                        </button>
                        <span className="text-[#dadce0]">|</span>
                        <button
                          onClick={() => handleBatchToggleServices(ecomBServices.map(s => s.id), false)}
                          className="text-[11px] font-semibold text-[#5f6368] hover:text-[#d93025] hover:underline cursor-pointer"
                        >
                          Tắt nhóm này
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {filterServiceList(ecomBServices).map(service => {
                        const isChecked = selectedCompany.allowedServices?.includes(service.id);
                        return (
                          <div 
                            key={service.id}
                            onClick={() => handleToggleService(service.id)}
                            className={`p-4 rounded-xl border transition-all cursor-pointer flex gap-3 ${
                              isChecked 
                                ? 'bg-[#f3e8fd]/40 border-[#7627bb] shadow-2xs' 
                                : 'bg-white border-[#dadce0] hover:border-[#7627bb]/40 opacity-70 hover:opacity-100'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-md border shrink-0 flex items-center justify-center transition-colors ${
                              isChecked ? 'bg-[#7627bb] border-[#7627bb]' : 'bg-white border-[#dadce0]'
                            }`}>
                              {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                            </div>
                            <div className="space-y-0.5">
                              <div className="font-bold text-xs sm:text-sm text-[#202124]">
                                {service.name.replace(' (B)', '')}
                              </div>
                              <p className="text-xs text-[#5f6368] leading-relaxed">
                                {service.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* 4. OBM Solution Section */}
                {filterServiceList(obmServices).length > 0 && (
                  <section className="bg-white border border-[#dadce0] rounded-2xl p-6 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#dadce0]">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#137333]" />
                        <h3 className="text-sm font-bold text-[#202124]">OBM Solutions</h3>
                        <span className="text-xs px-2 py-0.5 bg-[#e6f4ea] text-[#137333] rounded-full font-bold">
                          {obmServices.filter(s => selectedCompany.allowedServices?.includes(s.id)).length}/{obmServices.length} đang bật
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleBatchToggleServices(obmServices.map(s => s.id), true)}
                          className="text-[11px] font-semibold text-[#137333] hover:underline cursor-pointer"
                        >
                          Bật nhóm này
                        </button>
                        <span className="text-[#dadce0]">|</span>
                        <button
                          onClick={() => handleBatchToggleServices(obmServices.map(s => s.id), false)}
                          className="text-[11px] font-semibold text-[#5f6368] hover:text-[#d93025] hover:underline cursor-pointer"
                        >
                          Tắt nhóm này
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filterServiceList(obmServices).map(service => {
                        const isChecked = selectedCompany.allowedServices?.includes(service.id);
                        return (
                          <div 
                            key={service.id}
                            onClick={() => handleToggleService(service.id)}
                            className={`p-5 rounded-xl border transition-all cursor-pointer flex gap-4 ${
                              isChecked 
                                ? 'bg-[#e6f4ea]/40 border-[#137333] shadow-2xs' 
                                : 'bg-white border-[#dadce0] hover:border-[#137333]/40 opacity-70 hover:opacity-100'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-md border shrink-0 flex items-center justify-center transition-colors ${
                              isChecked ? 'bg-[#137333] border-[#137333]' : 'bg-white border-[#dadce0]'
                            }`}>
                              {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                            </div>
                            <div className="space-y-1">
                              <div className="font-bold text-sm text-[#202124]">
                                {service.name}
                              </div>
                              <p className="text-xs text-[#5f6368] leading-relaxed">
                                {service.description}
                              </p>
                              <div className="pt-1 text-xs font-semibold text-[#137333]">
                                {service.type === 'package' ? 'Gói trọn gói' : `Theo đơn vị: ${service.unit || 'SKU'}`}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* 5. MOD Solution Section */}
                {filterServiceList(modServices).length > 0 && (
                  <section className="bg-white border border-[#dadce0] rounded-2xl p-6 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#dadce0]">
                      <div className="flex items-center gap-2">
                        <Hammer className="w-4 h-4 text-[#e37400]" />
                        <h3 className="text-sm font-bold text-[#202124]">Dự án MOD (Sản xuất theo yêu cầu)</h3>
                        <span className="text-xs px-2 py-0.5 bg-[#fef7e0] text-[#e37400] rounded-full font-bold">
                          {modServices.filter(s => selectedCompany.allowedServices?.includes(s.id)).length}/{modServices.length} đang bật
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleBatchToggleServices(modServices.map(s => s.id), true)}
                          className="text-[11px] font-semibold text-[#e37400] hover:underline cursor-pointer"
                        >
                          Bật nhóm này
                        </button>
                        <span className="text-[#dadce0]">|</span>
                        <button
                          onClick={() => handleBatchToggleServices(modServices.map(s => s.id), false)}
                          className="text-[11px] font-semibold text-[#5f6368] hover:text-[#d93025] hover:underline cursor-pointer"
                        >
                          Tắt nhóm này
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filterServiceList(modServices).map(service => {
                        const isChecked = selectedCompany.allowedServices?.includes(service.id);
                        return (
                          <div 
                            key={service.id}
                            onClick={() => handleToggleService(service.id)}
                            className={`p-5 rounded-xl border transition-all cursor-pointer flex gap-4 ${
                              isChecked 
                                ? 'bg-[#fef7e0]/60 border-[#e37400] shadow-2xs' 
                                : 'bg-white border-[#dadce0] hover:border-[#e37400]/40 opacity-70 hover:opacity-100'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-md border shrink-0 flex items-center justify-center transition-colors ${
                              isChecked ? 'bg-[#e37400] border-[#e37400]' : 'bg-white border-[#dadce0]'
                            }`}>
                              {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                            </div>
                            <div className="space-y-1">
                              <div className="font-bold text-sm text-[#202124]">
                                {service.name}
                              </div>
                              <p className="text-xs text-[#5f6368] leading-relaxed">
                                {service.description}
                              </p>
                              <div className="pt-1 text-xs font-semibold text-[#e37400]">
                                {service.type === 'package' ? 'Gói trọn gói' : `Theo đơn vị: ${service.unit || 'SKU'}`}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* Storage & Backup Section */}
                <section className="bg-white border border-[#dadce0] rounded-2xl p-6 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#dadce0]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#e8f0fe] flex items-center justify-center text-[#1a73e8]">
                        <Database className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#202124]">Lưu trữ & Đồng bộ Vĩnh viễn (Server Storage)</h3>
                        <p className="text-xs text-[#5f6368]">
                          Tất cả dữ liệu sản phẩm, danh mục và cấu hình đối tác được lưu trữ tự động trên máy chủ AI Studio.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        syncStatusText === 'saving' 
                          ? 'bg-[#fef7e0] text-[#b06000]'
                          : syncStatusText === 'error'
                          ? 'bg-[#fce8e6] text-[#c5221f]'
                          : 'bg-[#e6f4ea] text-[#137333]'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${
                          syncStatusText === 'saving' ? 'bg-[#f9ab00] animate-ping' : syncStatusText === 'error' ? 'bg-[#d93025]' : 'bg-[#137333]'
                        }`} />
                        <span>
                          {syncStatusText === 'saving' ? 'Đang đồng bộ...' : syncStatusText === 'error' ? 'Lỗi máy chủ' : 'Đã đồng bộ máy chủ'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <button
                      onClick={exportAppDataToFile}
                      className="flex items-center justify-center gap-2 p-3.5 bg-[#f8f9fa] hover:bg-[#e8f0fe] border border-[#dadce0] hover:border-[#1a73e8] rounded-xl text-xs font-bold text-[#202124] hover:text-[#1a73e8] transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-[#1a73e8]" />
                      <span>Tải file Sao lưu (Backup JSON)</span>
                    </button>

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center justify-center gap-2 p-3.5 bg-[#f8f9fa] hover:bg-[#e6f4ea] border border-[#dadce0] hover:border-[#137333] rounded-xl text-xs font-bold text-[#202124] hover:text-[#137333] transition-all cursor-pointer"
                    >
                      <Upload className="w-4 h-4 text-[#137333]" />
                      <span>Khôi phục từ file JSON</span>
                    </button>

                    <button
                      onClick={handleManualFullSync}
                      className="flex items-center justify-center gap-2 p-3.5 bg-[#f8f9fa] hover:bg-[#f1f3f4] border border-[#dadce0] rounded-xl text-xs font-bold text-[#202124] transition-all cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4 text-[#5f6368]" />
                      <span>Đồng bộ ngay với Server</span>
                    </button>
                  </div>
                </section>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20 text-[#5f6368]">
                <LayoutGrid className="w-16 h-16 opacity-40" />
                <p className="font-semibold text-sm">Chọn một đối tác để bắt đầu cấu hình</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDesignPage;
