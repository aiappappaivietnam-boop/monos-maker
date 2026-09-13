/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Box,
  Pencil,
  Check,
  X,
  RotateCcw,
  Sparkles,
  Image as ImageIcon,
  CheckCircle2,
  Filter,
  Search,
  Plus,
  Trash2,
  FolderPlus,
  Tag,
  Printer,
  Maximize2,
  Eye,
  Layers,
  Edit3,
  LayoutGrid,
  Images,
  UploadCloud,
  Download
} from 'lucide-react';
import { Service } from '../types';
import { exportScopeToPdf } from '../lib/exportScopePdf';
import { exportAlbumCatalogPackage, importAlbumCatalogPackage } from '../lib/albumPackageSync';
import CategoryLightboxGalleryModal from './CategoryLightboxGalleryModal';
import CategoryAlbumView from './CategoryAlbumView';
import BulkAddImagesModal from './BulkAddImagesModal';
import { 
  getProductsForCategory, 
  GalleryProduct, 
  saveCustomProduct, 
  resetCustomProduct,
  addNewProductToCategory,
  deleteProductFromCategory,
  getStoredCustomSubcategories,
  getStoredCategoryRenames,
  getStoredDeletedCategories,
  getStoredDeletedProductIds,
  addCustomSubcategory,
  deleteCustomSubcategory,
  renameCategory,
  restoreDefaultCatalog,
  DEFAULT_FURNITURE_PLACEHOLDER
} from '../data/categoryProductsData';

interface CategoryGalleryDetailViewProps {
  service: Service;
  onBack: () => void;
  backTitle?: string;
  onSelectForQuotation?: (product: GalleryProduct) => void;
  hideBack?: boolean;
}

export default function CategoryGalleryDetailView({
  service,
  onBack,
  backTitle = 'Quay lại danh mục',
  onSelectForQuotation,
  hideBack
}: CategoryGalleryDetailViewProps) {
  const [refreshKey, setRefreshKey] = useState(0);

  const products = useMemo(() => {
    return getProductsForCategory(service.id);
  }, [service.id, refreshKey]);

  const categoryNameClean = service.name.replace(' (A)', '').replace(' (B)', '');

  // Custom subcategories added by user for this service
  const customSubcategories = useMemo(() => {
    return getStoredCustomSubcategories(service.id);
  }, [service.id, refreshKey]);

  // Category renames mapping for this service
  const categoryRenames = useMemo(() => {
    return getStoredCategoryRenames(service.id) as Record<string, string>;
  }, [service.id, refreshKey]);

  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Search state
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  // Extract unique categories and product counts from products + custom subcategories
  const categoryOptions = useMemo(() => {
    const map = new Map<string, { name: string; count: number; isCustom?: boolean }>();
    const deletedCatsRaw = getStoredDeletedCategories(service.id) as unknown as string[];
    const deletedCatsSet = new Set(Array.isArray(deletedCatsRaw) ? deletedCatsRaw.map(c => c.toLowerCase()) : []);

    // 1. Resolve default clean category name (check if it was renamed)
    const effectiveDefaultCat = categoryRenames[categoryNameClean.toLowerCase()] || categoryNameClean;

    if (effectiveDefaultCat && !deletedCatsSet.has(effectiveDefaultCat.toLowerCase())) {
      map.set(effectiveDefaultCat.toLowerCase(), { name: effectiveDefaultCat, count: 0, isCustom: false });
    }

    // 2. Include stored custom subcategories
    customSubcategories.forEach(cat => {
      const renamed = categoryRenames[cat.toLowerCase()] || cat;
      const lower = renamed.toLowerCase();
      if (!deletedCatsSet.has(lower) && !map.has(lower)) {
        map.set(lower, { name: renamed, count: 0, isCustom: true });
      }
    });

    // 3. Count product categories
    products.forEach(p => {
      const raw = (p.categoryName?.trim() || effectiveDefaultCat).trim();
      if (raw) {
        const lower = raw.toLowerCase();
        if (!deletedCatsSet.has(lower)) {
          const existing = map.get(lower);
          if (existing) {
            existing.count += 1;
          } else {
            map.set(lower, { name: raw, count: 1, isCustom: false });
          }
        }
      }
    });

    // Sort category options alphabetically by name (ABC / A-Z)
    return Array.from(map.values()).sort((a, b) => 
      a.name.localeCompare(b.name, 'vi', { sensitivity: 'base', numeric: true })
    );
  }, [products, categoryNameClean, customSubcategories, categoryRenames, service.id, refreshKey]);

  // List of unique category names available for selection in forms
  const availableCategoryNames = useMemo(() => {
    const list: string[] = [];
    categoryOptions.forEach(opt => {
      if (!list.includes(opt.name)) {
        list.push(opt.name);
      }
    });
    if (list.length === 0) {
      const defaultName = categoryRenames[categoryNameClean.toLowerCase()] || categoryNameClean;
      list.push(defaultName);
    }
    return list;
  }, [categoryOptions, categoryNameClean, categoryRenames]);

  // Filtered products calculation
  const filteredProducts = useMemo(() => {
    const effectiveDefaultCat = categoryRenames[categoryNameClean.toLowerCase()] || categoryNameClean;
    return products.filter(product => {
      const catName = (product.categoryName?.trim() || effectiveDefaultCat).trim();
      
      const matchesCategory = 
        selectedCategory === 'ALL' || 
        catName.toLowerCase() === selectedCategory.toLowerCase();

      if (!matchesCategory) return false;

      if (!searchKeyword.trim()) return true;
      const query = searchKeyword.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        (product.code && product.code.toLowerCase().includes(query)) ||
        product.material.toLowerCase().includes(query) ||
        catName.toLowerCase().includes(query)
      );
    });
  }, [products, selectedCategory, searchKeyword, categoryNameClean, categoryRenames]);

  // Editing state
  const [editingProduct, setEditingProduct] = useState<GalleryProduct | null>(null);
  const [editFormData, setEditFormData] = useState({
    categoryName: '',
    name: '',
    material: '',
    thumbnail: ''
  });

  // Adding new product state
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [newProductData, setNewProductData] = useState({
    name: '',
    categoryName: '',
    material: '',
    thumbnail: DEFAULT_FURNITURE_PLACEHOLDER,
    code: '',
    tag: ''
  });

  // View mode state (Album view as default)
  const [viewMode, setViewMode] = useState<'grid' | 'album'>('album');

  // Edit / Management mode toggle (Hides edit/delete buttons by default until activated)
  const [isEditMode, setIsEditMode] = useState(false);

  // Bulk add multiple images modal state
  const [isBulkAddModalOpen, setIsBulkAddModalOpen] = useState(false);
  const [bulkAddTargetCategory, setBulkAddTargetCategory] = useState<string>('');

  // Adding new category state
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [newCategoryNameInput, setNewCategoryNameInput] = useState('');

  // Editing category name state
  const [editingCategory, setEditingCategory] = useState<{ oldName: string; newName: string; count: number } | null>(null);

  // Deletion confirm modal states (avoids iframe confirm dialog blockers)
  const [deletingCategoryConfirmModal, setDeletingCategoryConfirmModal] = useState<{ name: string; count: number } | null>(null);
  const [deletingProductConfirmModal, setDeletingProductConfirmModal] = useState<{ id: string; name: string } | null>(null);
  const [isRestoreCatalogModalOpen, setIsRestoreCatalogModalOpen] = useState(false);

  // Lightbox large image & gallery modal state
  const [lightboxProduct, setLightboxProduct] = useState<GalleryProduct | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleStartEdit = (product: GalleryProduct) => {
    setEditingProduct(product);
    const existingCat = (product.categoryName || categoryNameClean).trim();
    setEditFormData({
      categoryName: availableCategoryNames.includes(existingCat) ? existingCat : availableCategoryNames[0] || categoryNameClean,
      name: product.name,
      material: product.material,
      thumbnail: product.thumbnail || DEFAULT_FURNITURE_PLACEHOLDER
    });
  };

  const handleSaveEdit = () => {
    if (!editingProduct) return;

    saveCustomProduct({
      id: editingProduct.id,
      categoryName: editFormData.categoryName.trim(),
      name: editFormData.name.trim(),
      material: editFormData.material.trim(),
      thumbnail: editFormData.thumbnail.trim() || DEFAULT_FURNITURE_PLACEHOLDER
    });

    setRefreshKey(prev => prev + 1);
    setEditingProduct(null);
    showToast('Đã lưu thay đổi nội dung sản phẩm!');
  };

  const handleResetToDefault = (productId: string) => {
    resetCustomProduct(productId);
    setRefreshKey(prev => prev + 1);
    setEditingProduct(null);
    showToast('Đã khôi phục nội dung gốc.');
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductData.name.trim()) return;

    const prodThumbnail = newProductData.thumbnail.trim() || DEFAULT_FURNITURE_PLACEHOLDER;
    const prodId = `${service.id}-item-${Date.now()}`;
    const selectedCat = newProductData.categoryName.trim() || availableCategoryNames[0] || categoryNameClean;

    const newProd: GalleryProduct = {
      id: prodId,
      name: newProductData.name.trim(),
      code: newProductData.code.trim() || `ITM-${Math.floor(100 + Math.random() * 900)}`,
      category: service.id,
      categoryName: selectedCat,
      thumbnail: prodThumbnail,
      images: [prodThumbnail],
      dimensions: 'W1200 x D600 x H750 mm',
      material: newProductData.material.trim() || 'Gỗ tự nhiên / Kim loại',
      finish: 'Sơn phủ hoàn thiện cao cấp',
      priceRange: 'Liên hệ báo giá',
      moq: '50 sản phẩm',
      leadTime: '15 - 25 ngày',
      tags: newProductData.tag.trim() ? [newProductData.tag.trim(), 'Mới ra mắt'] : ['Mới ra mắt'],
      specifications: [
        { label: 'Chất liệu', value: newProductData.material.trim() || 'Gỗ tự nhiên / Kim loại' },
        { label: 'Quy cách', value: 'Thiết kế xuất khẩu' }
      ],
      description: `Sản phẩm ${newProductData.name.trim()} mới trong danh mục ${selectedCat}.`
    };

    addNewProductToCategory(service.id, newProd);
    setRefreshKey(prev => prev + 1);
    setIsAddProductModalOpen(false);
    setNewProductData({
      name: '',
      categoryName: availableCategoryNames[0] || categoryNameClean,
      material: '',
      thumbnail: DEFAULT_FURNITURE_PLACEHOLDER,
      code: '',
      tag: ''
    });
    showToast(`Đã thêm sản phẩm "${newProd.name}" thành công!`);
  };

  const handleDeleteAddedProduct = (productId: string, productName: string) => {
    setDeletingProductConfirmModal({ id: productId, name: productName });
  };

  const handleConfirmDeleteProduct = () => {
    if (!deletingProductConfirmModal) return;
    const prodName = deletingProductConfirmModal.name;
    deleteProductFromCategory(service.id, deletingProductConfirmModal.id);
    setRefreshKey(prev => prev + 1);
    setDeletingProductConfirmModal(null);
    showToast(`Đã xóa sản phẩm "${prodName}".`);
  };

  const handleAddCategorySubmit = (e: FormEvent) => {
    e.preventDefault();
    const name = newCategoryNameInput.trim();
    if (!name) return;

    addCustomSubcategory(service.id, name);
    setRefreshKey(prev => prev + 1);
    setNewCategoryNameInput('');
    setIsAddCategoryModalOpen(false);
    setSelectedCategory(name);
    showToast(`Đã thêm category "${name}" thành công!`);
  };

  const handleDeleteCustomCategory = (categoryName: string, count?: number) => {
    const totalCount = count !== undefined 
      ? count 
      : products.filter(p => (p.categoryName || '').trim().toLowerCase() === categoryName.trim().toLowerCase()).length;
    setDeletingCategoryConfirmModal({ name: categoryName, count: totalCount });
  };

  const handleConfirmDeleteCategory = () => {
    if (!deletingCategoryConfirmModal) return;
    const catName = deletingCategoryConfirmModal.name;
    deleteCustomSubcategory(service.id, catName);
    if (selectedCategory.toLowerCase() === catName.toLowerCase()) {
      setSelectedCategory('ALL');
    }
    setRefreshKey(prev => prev + 1);
    setDeletingCategoryConfirmModal(null);
    showToast(`Đã xóa Album "${catName}" và các sản phẩm liên quan.`);
  };

  const handleRenameCategorySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    const oldName = editingCategory.oldName.trim();
    const newName = editingCategory.newName.trim();
    if (!newName) return;

    if (oldName !== newName) {
      renameCategory(service.id, oldName, newName);
      if (selectedCategory.trim().toLowerCase() === oldName.toLowerCase()) {
        setSelectedCategory(newName);
      }
      setRefreshKey(prev => prev + 1);
      showToast(`Đã đổi tên category thành "${newName}" thành công!`);
    }
    setEditingCategory(null);
  };

  const handleRestoreDefaultCatalog = () => {
    setIsRestoreCatalogModalOpen(true);
  };

  const handleConfirmRestoreDefaultCatalog = () => {
    restoreDefaultCatalog(service.id);
    setSelectedCategory('ALL');
    setSearchKeyword('');
    setRefreshKey(prev => prev + 1);
    setIsRestoreCatalogModalOpen(false);
    showToast('Đã khôi phục dữ liệu mẫu ban đầu thành công!');
  };

  const galleryFileInputRef = React.useRef<HTMLInputElement>(null);
  const [isImportingPackage, setIsImportingPackage] = useState(false);

  const handleExportCategoryPackage = () => {
    try {
      exportAlbumCatalogPackage(service.id, `Monos_${categoryNameClean}`, products);
      showToast(`Đã xuất toàn bộ dữ liệu & hình ảnh của "${categoryNameClean}" ra file JSON!`);
    } catch (e) {
      console.error('Lỗi khi xuất gói album', e);
      showToast('Có lỗi xảy ra khi xuất file.');
    }
  };

  const handleImportGalleryPackage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImportingPackage(true);
    try {
      const res = await importAlbumCatalogPackage(file, service.id);
      if (res.success) {
        setSelectedCategory('ALL');
        setSearchKeyword('');
        setRefreshKey(prev => prev + 1);
        showToast(res.message);
      }
    } catch (err: any) {
      console.error('Import failed:', err);
      showToast(err.message || 'Lỗi khi nhập file JSON. Vui lòng kiểm tra lại cấu trúc file.');
    } finally {
      setIsImportingPackage(false);
      if (galleryFileInputRef.current) {
        galleryFileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="w-full max-w-7xl xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-8 animate-in fade-in duration-300">
      {/* Hidden File Input for Package Import */}
      <input
        ref={galleryFileInputRef}
        type="file"
        accept=".json,application/json,text/json,text/plain"
        onChange={handleImportGalleryPackage}
        className="hidden"
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-[100] bg-[#202124] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 text-xs sm:text-sm font-medium"
          >
            <div className="w-6 h-6 rounded-full bg-[#137333] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Header & Navigation */}
      <div className="flex flex-col gap-4 border-b border-[#dadce0] pb-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {!hideBack ? (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a73e8] hover:text-[#1557d0] transition-colors group cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>{backTitle}</span>
            </button>
          ) : <div />}

          <div className="flex items-center gap-2 flex-wrap">
            {/* Import Album JSON */}
            <button
              type="button"
              disabled={isImportingPackage}
              onClick={() => galleryFileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3c4043] hover:text-[#1a73e8] bg-white hover:bg-[#f1f3f4] border border-[#dadce0] transition-all cursor-pointer px-3.5 py-1.5 rounded-full shadow-2xs disabled:opacity-50"
              title="Tải lên file JSON để khôi phục toàn bộ album, danh mục và hình ảnh"
            >
              <UploadCloud className="w-3.5 h-3.5 text-[#1a73e8]" />
              <span>{isImportingPackage ? 'Đang nạp...' : 'Tải Album lên (.JSON)'}</span>
            </button>

            {/* Export Album JSON */}
            <button
              type="button"
              onClick={handleExportCategoryPackage}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a73e8] bg-[#f8f9fa] hover:bg-[#e8f0fe] border border-[#1a73e8]/30 transition-all cursor-pointer px-3.5 py-1.5 rounded-full shadow-2xs"
              title="Xuất toàn bộ Album và các mẫu thiết kế của mục này ra file JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất Album (.JSON)</span>
            </button>

            {/* Export PDF */}
            <button
              onClick={() => exportScopeToPdf(service, { customTitle: `${categoryNameClean} (Danh Mục & Tiêu Chuẩn Sản Phẩm)` })}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3c4043] hover:text-[#202124] bg-white hover:bg-[#f1f3f4] border border-[#dadce0] transition-all cursor-pointer px-3.5 py-1.5 rounded-full shadow-2xs"
              title="Xuất tài liệu phạm vi danh mục và tiêu chuẩn kỹ thuật ra file PDF"
            >
              <Printer className="w-3.5 h-3.5 text-[#1a73e8]" />
              <span>Xuất PDF</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase bg-[#e8f0fe] text-[#1a73e8] border border-[#1a73e8]/20">
                {service.note || 'Dự án'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#202124] tracking-tight">
              {categoryNameClean}
            </h1>
            <p className="text-sm sm:text-base text-[#5f6368] mt-1.5 max-w-3xl leading-relaxed">
              {service.description || 'Bộ sưu tập sản phẩm mẫu tham khảo chuẩn mực phục vụ phát triển OEM/OBM và thương mại điện tử.'}
            </p>
          </div>
        </div>
      </div>

      {/* 2. TOOLBAR: PRODUCT COUNT, CATEGORY FILTER, SEARCH & ADD ACTIONS */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#dadce0] shadow-xs flex flex-col gap-3">
        {/* Top Header Row of Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Left: Product Count Badge & View Mode Toggle */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1a73e8]" />
              <span className="text-xs sm:text-sm font-bold text-[#202124]">
                {viewMode === 'album' ? 'Thư viện Album' : 'Danh sách sản phẩm'}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#f1f3f4] text-[#5f6368]">
                {products.length} mẫu
              </span>
            </div>

            {/* View Mode Switcher */}
            <div className="inline-flex items-center p-1 bg-[#f1f3f4] rounded-full border border-[#dadce0]">
              <button
                type="button"
                onClick={() => {
                  setViewMode('album');
                  setSelectedCategory('ALL');
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'album'
                    ? 'bg-white text-[#1a73e8] shadow-xs'
                    : 'text-[#5f6368] hover:text-[#202124]'
                }`}
                title="Xem tất cả Album bộ sưu tập ảnh"
              >
                <Images className="w-3.5 h-3.5" />
                <span>Xem dạng Album</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#1a73e8] shadow-xs'
                    : 'text-[#5f6368] hover:text-[#202124]'
                }`}
                title="Xem dạng Lưới sản phẩm"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Lưới sản phẩm</span>
              </button>
            </div>
          </div>

          {/* Right: Quick Search Filter & Actions */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
            <div className="relative min-w-[170px] sm:min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-[#5f6368] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Tìm tên, mã, chất liệu..."
                className="w-full pl-8.5 pr-8 py-1.5 bg-[#f8f9fa] hover:bg-white focus:bg-white border border-[#dadce0] focus:border-[#1a73e8] rounded-full text-xs text-[#202124] focus:outline-none transition-colors"
              />
              {searchKeyword && (
                <button
                  type="button"
                  onClick={() => setSearchKeyword('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5f6368] hover:text-[#202124] p-0.5 rounded-full cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Bulk Add Multiple Images Button (Only in Edit Mode) */}
            {isEditMode && (
              <button
                type="button"
                onClick={() => {
                  setBulkAddTargetCategory(selectedCategory !== 'ALL' ? selectedCategory : (availableCategoryNames[0] || categoryNameClean));
                  setIsBulkAddModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#e8f0fe] hover:bg-[#d2e3fc] text-[#1a73e8] border border-[#1a73e8]/30 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 shadow-2xs"
                title="Tải lên cùng lúc nhiều hình ảnh vào một Category"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>+ Thêm nhiều hình (Bulk)</span>
              </button>
            )}

            {/* Add Category Button (Only in Edit Mode) */}
            {isEditMode && (
              <button
                type="button"
                onClick={() => {
                  setNewCategoryNameInput('');
                  setIsAddCategoryModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#f1f3f4] hover:bg-[#e8eaed] text-[#3c4043] hover:text-[#1a73e8] border border-[#dadce0] rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 shadow-2xs"
                title="Thêm category mới cho mục này"
              >
                <Plus className="w-3.5 h-3.5 text-[#1a73e8]" />
                <span>Thêm category</span>
              </button>
            )}

            {/* Mode Chỉnh sửa / Quản lý Toggle Button */}
            <button
              type="button"
              onClick={() => {
                setIsEditMode(!isEditMode);
                showToast(!isEditMode ? 'Đã bật chế độ chỉnh sửa (hiện nút sửa/xóa category & sản phẩm)' : 'Đã tắt chế độ chỉnh sửa');
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 border ${
                isEditMode
                  ? 'bg-[#fef7e0] hover:bg-[#feefc3] text-[#b06000] border-[#f9ab00] shadow-xs ring-2 ring-[#f9ab00]/20'
                  : 'bg-[#f8f9fa] hover:bg-[#f1f3f4] text-[#5f6368] hover:text-[#202124] border-[#dadce0]'
              }`}
              title={isEditMode ? 'Tắt chế độ chỉnh sửa' : 'Bật chế độ chỉnh sửa để hiện nút đổi tên / xóa category và chỉnh sửa mẫu'}
            >
              <Pencil className={`w-3.5 h-3.5 ${isEditMode ? 'text-[#b06000]' : 'text-[#5f6368]'}`} />
              <span>{isEditMode ? 'Đang bật sửa' : 'Chỉnh sửa'}</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills (Wrap to show all categories fully without hiding) */}
        <div className="pt-2.5 border-t border-[#f1f3f4] flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#5f6368] pr-2.5 shrink-0 border-r border-[#dadce0] my-0.5">
            <Filter className="w-3.5 h-3.5 text-[#1a73e8]" />
            <span>Lọc theo category:</span>
          </div>

          {/* "Tất cả" Pill */}
          <button
            type="button"
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'ALL'
                ? 'bg-[#1a73e8] text-white shadow-xs'
                : 'bg-[#f1f3f4] text-[#3c4043] hover:bg-[#e8eaed] hover:text-[#202124]'
            }`}
          >
            <span>Tất cả</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              selectedCategory === 'ALL' ? 'bg-white/25 text-white' : 'bg-black/10 text-[#5f6368]'
            }`}>
              {products.length}
            </span>
          </button>

          {/* Distinct Category Pills */}
          {categoryOptions.map(({ name, count, isCustom }) => {
            const isSelected = selectedCategory.toLowerCase() === name.toLowerCase();
            return (
              <div 
                key={name} 
                className={`inline-flex items-center rounded-full transition-all border ${
                  isSelected 
                    ? 'bg-[#1a73e8] border-[#1a73e8] text-white shadow-xs' 
                    : 'bg-[#f8f9fa] hover:bg-[#e8f0fe] border-[#dadce0] hover:border-[#1a73e8]/30 text-[#3c4043]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedCategory(isSelected ? 'ALL' : name)}
                  className={`pl-3.5 ${isEditMode ? 'pr-1.5' : 'pr-3.5'} py-1.5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer`}
                  title={`Lọc theo danh mục "${name}"`}
                >
                  <span className={isSelected ? 'text-white' : 'text-[#202124]'}>{name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-white/25 text-white' : 'bg-[#e8f0fe] text-[#1a73e8]'
                  }`}>
                    {count}
                  </span>
                </button>

                {/* Edit & Delete buttons for category - ONLY visible in Edit Mode */}
                {isEditMode && (
                  <div className="flex items-center pr-1">
                    {/* Edit Category Name Button (Pencil Icon) */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingCategory({ oldName: name, newName: name, count });
                      }}
                      className={`p-1 rounded-full transition-colors cursor-pointer ${
                        isSelected
                          ? 'text-white/80 hover:text-white hover:bg-white/20'
                          : 'text-[#80868b] hover:text-[#1a73e8] hover:bg-[#d2e3fc]'
                      }`}
                      title={`Đổi tên category "${name}"`}
                    >
                      <Pencil className="w-3 h-3" />
                    </button>

                    {/* Delete button for category */}
                    {categoryOptions.length > 1 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCustomCategory(name);
                        }}
                        className={`p-1 rounded-full transition-colors cursor-pointer ${
                          isSelected
                            ? 'text-white/80 hover:text-white hover:bg-white/20'
                            : 'text-[#80868b] hover:text-[#d93025] hover:bg-[#fce8e6]'
                        }`}
                        title={`Xóa category "${name}"`}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter summary status (if category filter or search keyword active) */}
      {((viewMode === 'grid' && (selectedCategory !== 'ALL' || searchKeyword)) || (viewMode === 'album' && searchKeyword)) && (
        <div className="flex items-center justify-between text-xs text-[#5f6368] bg-[#f8f9fa] px-4 py-2.5 rounded-xl border border-[#dadce0]">
          <div className="flex items-center gap-2 flex-wrap">
            <span>
              Đang hiển thị: <strong>{filteredProducts.length}</strong> / {products.length} sản phẩm
            </span>
            {selectedCategory !== 'ALL' && (
              <span className="inline-flex items-center gap-1 bg-[#e8f0fe] text-[#1a73e8] px-2.5 py-0.5 rounded-md font-semibold text-[11px]">
                Category: {selectedCategory}
                <button 
                  type="button" 
                  onClick={() => setSelectedCategory('ALL')} 
                  className="hover:text-red-500 cursor-pointer ml-1 font-bold text-xs"
                  title="Bỏ lọc category này"
                >
                  ×
                </button>
              </span>
            )}
            {searchKeyword && (
              <span className="inline-flex items-center gap-1 bg-[#f1f3f4] text-[#3c4043] px-2.5 py-0.5 rounded-md font-semibold text-[11px]">
                Từ khóa: "{searchKeyword}"
                <button 
                  type="button" 
                  onClick={() => setSearchKeyword('')} 
                  className="hover:text-red-500 cursor-pointer ml-1 font-bold text-xs"
                  title="Xóa từ khóa tìm kiếm"
                >
                  ×
                </button>
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('ALL');
              setSearchKeyword('');
            }}
            className="text-[#1a73e8] hover:underline font-semibold cursor-pointer shrink-0 ml-2"
          >
            Xem tất cả ({products.length})
          </button>
        </div>
      )}

      {/* PRODUCT GALLERY / ALBUM VIEW */}
      {viewMode === 'album' ? (
        <CategoryAlbumView
          serviceId={service.id}
          products={products}
          categoryOptions={categoryOptions}
          selectedCategory={selectedCategory}
          searchKeyword={searchKeyword}
          isEditMode={isEditMode}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setViewMode('grid');
          }}
          onOpenLightbox={(prod) => {
            setLightboxProduct(prod);
            setIsLightboxOpen(true);
          }}
          onOpenBulkAdd={(catName) => {
            setBulkAddTargetCategory(catName || (selectedCategory !== 'ALL' ? selectedCategory : (availableCategoryNames[0] || categoryNameClean)));
            setIsBulkAddModalOpen(true);
          }}
          onOpenRenameCategory={(catName, count) => {
            setEditingCategory({ oldName: catName, newName: catName, count });
          }}
          onDeleteCategory={handleDeleteCustomCategory}
          onStartEditProduct={handleStartEdit}
          onDeleteProduct={handleDeleteAddedProduct}
          onSelectForQuotation={onSelectForQuotation}
          onShowToast={showToast}
          onRefresh={() => setRefreshKey(prev => prev + 1)}
        />
      ) : (
        <div className="space-y-6">
          {/* Product Cards Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white border border-[#dadce0] rounded-3xl p-8 space-y-3">
              <Box className="w-12 h-12 text-[#80868b] mx-auto opacity-50" />
              <h3 className="text-base font-bold text-[#202124]">Không tìm thấy mẫu phù hợp</h3>
              <p className="text-sm text-[#5f6368] max-w-md mx-auto">
                Không có sản phẩm nào phù hợp với bộ lọc hiện tại. Thử chọn danh mục khác hoặc xóa từ khóa tìm kiếm.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSearchKeyword('')}
                  className="px-4 py-2 bg-[#1a73e8] text-white text-xs font-bold rounded-full hover:bg-[#1557d0] transition-colors cursor-pointer"
                >
                  Xóa tìm kiếm & xem tất cả
                </button>
                <button
                  type="button"
                  onClick={handleRestoreDefaultCatalog}
                  className="px-4 py-2 bg-[#f1f3f4] text-[#3c4043] hover:bg-[#e8eaed] text-xs font-bold rounded-full transition-colors cursor-pointer border border-[#dadce0]"
                >
                  Khôi phục dữ liệu gốc
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="bg-white rounded-2xl border border-[#dadce0] overflow-hidden hover:border-[#1a73e8] hover:shadow-[0_4px_20px_rgba(26,115,232,0.08)] transition-all flex flex-col group relative"
                >
                  {/* Edit Button overlay on Card (Only in Edit Mode) */}
                  {isEditMode && (
                    <button
                      onClick={() => handleStartEdit(product)}
                      className="absolute top-3 right-3 z-20 bg-white/95 backdrop-blur-xs hover:bg-white text-[#3c4043] hover:text-[#1a73e8] border border-[#dadce0] hover:border-[#1a73e8] p-2 rounded-full shadow-md transition-all cursor-pointer flex items-center justify-center text-xs"
                      title="Chỉnh sửa nội dung thẻ này"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Product Thumbnail - 3:4 Portrait Ratio matching catalog preview */}
                  <div 
                    onClick={() => {
                      setLightboxProduct(product);
                      setIsLightboxOpen(true);
                    }}
                    className="relative w-full aspect-[3/4] bg-white border-b border-[#f1f3f4] overflow-hidden flex items-center justify-center cursor-pointer group/thumb"
                    title="Nhấn để xem hình lớn và thư viện ảnh của category này"
                  >
                    <img
                      src={product.thumbnail || DEFAULT_FURNITURE_PLACEHOLDER}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = DEFAULT_FURNITURE_PLACEHOLDER;
                      }}
                    />

                    {/* Hover Overlay with Preview Icon */}
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <span className="px-3.5 py-1.5 rounded-full bg-white text-[#202124] text-xs font-bold shadow-xl flex items-center gap-1.5 transform translate-y-2 group-hover/thumb:translate-y-0 transition-transform">
                        <Maximize2 className="w-3.5 h-3.5 text-[#1a73e8]" />
                        <span>Xem ảnh lớn & Gallery</span>
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span 
                          onClick={() => setSelectedCategory(product.categoryName?.trim() || categoryNameClean)}
                          className="text-[11px] font-semibold text-[#1a73e8] bg-[#e8f0fe] hover:bg-[#d2e3fc] px-2.5 py-0.5 rounded-md border border-[#1a73e8]/20 inline-flex items-center cursor-pointer transition-colors"
                          title="Nhấn để lọc theo category này"
                        >
                          {product.categoryName || categoryNameClean}
                        </span>
                      </div>

                      <h3 
                        onClick={() => {
                          if (isEditMode) {
                            handleStartEdit(product);
                          } else {
                            setLightboxProduct(product);
                            setIsLightboxOpen(true);
                          }
                        }}
                        className="font-bold text-base text-[#202124] leading-snug line-clamp-1 cursor-pointer hover:text-[#1a73e8] transition-colors"
                        title={isEditMode ? "Nhấn để sửa tên sản phẩm" : product.name}
                      >
                        {product.name}
                      </h3>

                      <p 
                        onClick={() => {
                          if (isEditMode) {
                            handleStartEdit(product);
                          }
                        }}
                        className={`text-xs text-[#5f6368] line-clamp-2 leading-relaxed ${isEditMode ? 'cursor-pointer hover:text-[#202124]' : ''} transition-colors`}
                        title={isEditMode ? "Nhấn để sửa thông tin chất liệu" : product.material}
                      >
                        {product.material}
                      </p>
                    </div>

                    {isEditMode && (
                      <div className="pt-2.5 mt-2.5 border-t border-[#f1f3f4] flex items-center justify-end" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleDeleteAddedProduct(product.id, product.name)}
                            className="p-1.5 text-[#5f6368] hover:text-[#d93025] hover:bg-[#fce8e6] rounded-full transition-colors cursor-pointer"
                            title="Xóa sản phẩm này"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStartEdit(product)}
                            className="p-1.5 text-[#5f6368] hover:text-[#1a73e8] hover:bg-[#e8f0fe] rounded-full transition-colors cursor-pointer"
                            title="Chỉnh sửa nội dung"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Edit Modal Dialog */}
      <AnimatePresence>
        {editingProduct && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-[#dadce0] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden my-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#dadce0] bg-[#f8f9fa]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center font-bold">
                    <Pencil className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#202124]">Chỉnh sửa nội dung sản phẩm</h3>
                    <p className="text-xs text-[#5f6368]">Mã: {editingProduct.code || editingProduct.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="p-1.5 rounded-full text-[#5f6368] hover:bg-[#e8eaed] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4 text-xs">
                {/* Field 1: Category Selection (Only existing categories) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-bold text-[#3c4043]">
                      1. Chọn Category có sẵn *
                    </label>
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          const targetCat = editFormData.categoryName || availableCategoryNames[0];
                          const opt = categoryOptions.find(o => o.name.toLowerCase() === targetCat.toLowerCase());
                          setEditingCategory({
                            oldName: targetCat,
                            newName: targetCat,
                            count: opt ? opt.count : 0
                          });
                        }}
                        className="text-[11px] font-bold text-[#5f6368] hover:text-[#1a73e8] hover:underline cursor-pointer flex items-center gap-1"
                        title="Đổi tên cho category đang chọn"
                      >
                        <Pencil className="w-2.5 h-2.5" />
                        <span>Đổi tên</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setNewCategoryNameInput('');
                          setIsAddCategoryModalOpen(true);
                        }}
                        className="text-[11px] font-bold text-[#1a73e8] hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Thêm mới</span>
                      </button>
                    </div>
                  </div>
                  <select
                    value={editFormData.categoryName}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, categoryName: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#dadce0] rounded-xl text-xs font-semibold text-[#202124] focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] cursor-pointer"
                  >
                    {availableCategoryNames.map((catName) => (
                      <option key={catName} value={catName}>
                        {catName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Field 2: Product Name / Title */}
                <div>
                  <label className="block font-bold text-[#3c4043] mb-1">
                    2. Tên tiêu đề sản phẩm (Title):
                  </label>
                  <input
                    type="text"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ví dụ: Nordic ErgoDesk Pro - Bàn Làm Việc Nâng Hạ..."
                    className="w-full px-3.5 py-2.5 bg-white border border-[#dadce0] rounded-xl text-xs font-bold text-[#202124] focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                  />
                </div>

                {/* Field 3: Material / Specs Subtext */}
                <div>
                  <label className="block font-bold text-[#3c4043] mb-1">
                    3. Chất liệu & Quy cách (Material / Description):
                  </label>
                  <textarea
                    rows={3}
                    value={editFormData.material}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, material: e.target.value }))}
                    placeholder="Ví dụ: Mặt gỗ Sồi tự nhiên (FSC Oak) / Khung thép dập nguội..."
                    className="w-full px-3.5 py-2.5 bg-white border border-[#dadce0] rounded-xl text-xs text-[#202124] focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] resize-none leading-relaxed"
                  />
                </div>

                {/* Field 4: Thumbnail Image URL */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-[#3c4043]">
                      4. Đường dẫn ảnh Thumbnail (URL):
                    </label>
                    <button
                      type="button"
                      onClick={() => setEditFormData(prev => ({ ...prev, thumbnail: DEFAULT_FURNITURE_PLACEHOLDER }))}
                      className="text-[11px] font-medium text-[#1a73e8] hover:underline cursor-pointer"
                    >
                      Dùng ảnh mặc định (Nền xám nhạt)
                    </button>
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={editFormData.thumbnail}
                      onChange={(e) => setEditFormData(prev => ({ ...prev, thumbnail: e.target.value }))}
                      placeholder="https://..."
                      className="w-full px-3.5 py-2.5 bg-white border border-[#dadce0] rounded-xl text-xs text-[#202124] font-mono focus:outline-none focus:border-[#1a73e8]"
                    />
                    {editFormData.thumbnail && (
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#dadce0] shrink-0 bg-[#f1f3f4] flex items-center justify-center p-0.5 shadow-2xs">
                        <img 
                          src={editFormData.thumbnail} 
                          alt="preview" 
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-[#f8f9fa] border-t border-[#dadce0] flex items-center justify-between gap-3">
                <button
                  onClick={() => handleResetToDefault(editingProduct.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#5f6368] hover:text-[#d93025] hover:bg-[#fce8e6] rounded-full transition-colors cursor-pointer"
                  title="Khôi phục về nội dung mặc định ban đầu"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Khôi phục gốc</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 border border-[#dadce0] text-xs font-semibold text-[#3c4043] rounded-full hover:bg-[#e8eaed] transition-colors cursor-pointer"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#1a73e8] hover:bg-[#1557d0] text-white text-xs font-bold rounded-full transition-colors shadow-xs cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Lưu thay đổi</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add New Product Modal Dialog */}
      <AnimatePresence>
        {isAddProductModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-[#dadce0] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden my-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#dadce0] bg-[#f8f9fa]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center font-bold">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#202124]">Thêm sản phẩm mới</h3>
                    <p className="text-xs text-[#5f6368]">Danh mục: {categoryNameClean}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="p-1.5 rounded-full text-[#5f6368] hover:bg-[#e8eaed] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleCreateProduct}>
                <div className="p-6 space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#3c4043] mb-1">
                      1. Tên sản phẩm *
                    </label>
                    <input
                      type="text"
                      required
                      value={newProductData.name}
                      onChange={(e) => setNewProductData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Ví dụ: Ghế Công Thái Học Ultra Ergonomic..."
                      className="w-full px-3.5 py-2.5 bg-white border border-[#dadce0] rounded-xl text-xs font-bold text-[#202124] focus:outline-none focus:border-[#1a73e8]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block font-bold text-[#3c4043]">
                          2. Category có sẵn *
                        </label>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const targetCat = newProductData.categoryName || availableCategoryNames[0];
                              const opt = categoryOptions.find(o => o.name.toLowerCase() === targetCat.toLowerCase());
                              setEditingCategory({
                                oldName: targetCat,
                                newName: targetCat,
                                count: opt ? opt.count : 0
                              });
                            }}
                            className="text-[10px] font-bold text-[#5f6368] hover:text-[#1a73e8] hover:underline cursor-pointer flex items-center gap-0.5"
                            title="Đổi tên cho category đang chọn"
                          >
                            <Pencil className="w-2 h-2" />
                            <span>Đổi tên</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setNewCategoryNameInput('');
                              setIsAddCategoryModalOpen(true);
                            }}
                            className="text-[10px] font-bold text-[#1a73e8] hover:underline cursor-pointer flex items-center gap-0.5"
                          >
                            <Plus className="w-2.5 h-2.5" />
                            <span>Mới</span>
                          </button>
                        </div>
                      </div>
                      <select
                        required
                        value={newProductData.categoryName}
                        onChange={(e) => setNewProductData(prev => ({ ...prev, categoryName: e.target.value }))}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#dadce0] rounded-xl text-xs font-semibold text-[#202124] focus:outline-none focus:border-[#1a73e8] cursor-pointer"
                      >
                        {availableCategoryNames.map((catName) => (
                          <option key={catName} value={catName}>
                            {catName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-[#3c4043] mb-1">
                        Mã sản phẩm (Code)
                      </label>
                      <input
                        type="text"
                        value={newProductData.code}
                        onChange={(e) => setNewProductData(prev => ({ ...prev, code: e.target.value }))}
                        placeholder="Mã SKU..."
                        className="w-full px-3.5 py-2.5 bg-white border border-[#dadce0] rounded-xl text-xs font-mono text-[#202124] focus:outline-none focus:border-[#1a73e8]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#3c4043] mb-1">
                      3. Chất liệu & Đặc tả kỹ thuật
                    </label>
                    <textarea
                      rows={2}
                      value={newProductData.material}
                      onChange={(e) => setNewProductData(prev => ({ ...prev, material: e.target.value }))}
                      placeholder="Ví dụ: Lưới thoáng khí cao cấp / Khung nhôm đúc nguyên khối..."
                      className="w-full px-3.5 py-2.5 bg-white border border-[#dadce0] rounded-xl text-xs text-[#202124] focus:outline-none focus:border-[#1a73e8] resize-none"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-bold text-[#3c4043]">
                        4. Đường dẫn ảnh (Image URL)
                      </label>
                      <button
                        type="button"
                        onClick={() => setNewProductData(prev => ({ ...prev, thumbnail: DEFAULT_FURNITURE_PLACEHOLDER }))}
                        className="text-[11px] font-medium text-[#1a73e8] hover:underline cursor-pointer"
                      >
                        Đặt về ảnh mặc định (Nền xám nhạt)
                      </button>
                    </div>
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={newProductData.thumbnail}
                        onChange={(e) => setNewProductData(prev => ({ ...prev, thumbnail: e.target.value }))}
                        placeholder="Để trống hoặc dán URL ảnh sản phẩm..."
                        className="w-full px-3.5 py-2.5 bg-white border border-[#dadce0] rounded-xl text-xs text-[#202124] font-mono focus:outline-none focus:border-[#1a73e8]"
                      />
                      {newProductData.thumbnail && (
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#dadce0] shrink-0 bg-[#f1f3f4] flex items-center justify-center p-0.5 shadow-2xs">
                          <img 
                            src={newProductData.thumbnail} 
                            alt="preview" 
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-[#5f6368] mt-1">
                      Mặc định: Nền xám nhạt tối giản.
                    </p>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 bg-[#f8f9fa] border-t border-[#dadce0] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddProductModalOpen(false)}
                    className="px-4 py-2 border border-[#dadce0] text-xs font-semibold text-[#3c4043] rounded-full hover:bg-[#e8eaed] transition-colors cursor-pointer"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#1a73e8] hover:bg-[#1557d0] text-white text-xs font-bold rounded-full transition-colors shadow-xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Thêm vào danh mục</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add New Category Modal Dialog */}
      <AnimatePresence>
        {isAddCategoryModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-[#dadce0] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden my-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#dadce0] bg-[#f8f9fa]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center font-bold">
                    <FolderPlus className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#202124]">Thêm Category mới</h3>
                    <p className="text-xs text-[#5f6368]">Thuộc dự án: {categoryNameClean}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddCategoryModalOpen(false)}
                  className="p-1.5 rounded-full text-[#5f6368] hover:bg-[#e8eaed] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleAddCategorySubmit}>
                <div className="p-6 space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#3c4043] mb-1.5">
                      Tên Category mới *
                    </label>
                    <input
                      type="text"
                      required
                      autoFocus
                      value={newCategoryNameInput}
                      onChange={(e) => setNewCategoryNameInput(e.target.value)}
                      placeholder="Ví dụ: Smart Standing Desks, Dining Tables, Storage..."
                      className="w-full px-3.5 py-2.5 bg-white border border-[#dadce0] rounded-xl text-xs font-semibold text-[#202124] focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                    />
                    <p className="text-[11px] text-[#5f6368] mt-1.5">
                      Category mới sẽ xuất hiện trên thanh lọc và có sẵn trong danh sách chọn khi thêm sản phẩm.
                    </p>
                  </div>

                  {/* Quick Suggestions */}
                  <div>
                    <span className="block text-[11px] font-bold text-[#5f6368] mb-2">
                      Gợi ý phổ biến:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {['Living Room', 'Home Office', 'Dining & Bar', 'Bedroom', 'Outdoor', 'Acoustic Panels', 'Lighting & Decor'].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setNewCategoryNameInput(preset)}
                          className="px-2.5 py-1 bg-[#f1f3f4] hover:bg-[#e8f0fe] hover:text-[#1a73e8] text-[#3c4043] rounded-lg text-[11px] font-medium transition-colors cursor-pointer border border-[#dadce0]"
                        >
                          + {preset}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 bg-[#f8f9fa] border-t border-[#dadce0] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddCategoryModalOpen(false)}
                    className="px-4 py-2 border border-[#dadce0] text-xs font-semibold text-[#3c4043] rounded-full hover:bg-[#e8eaed] transition-colors cursor-pointer"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#1a73e8] hover:bg-[#1557d0] text-white text-xs font-bold rounded-full transition-colors shadow-xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tạo Category</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit / Rename Category Modal Dialog */}
      <AnimatePresence>
        {editingCategory && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-[#dadce0] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden my-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#dadce0] bg-[#f8f9fa]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center font-bold">
                    <Pencil className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#202124]">Đổi tên Category</h3>
                    <p className="text-xs text-[#5f6368]">
                      Hiện có <span className="font-bold text-[#1a73e8]">{editingCategory.count}</span> sản phẩm trong category này
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setEditingCategory(null)}
                  className="p-1.5 rounded-full text-[#5f6368] hover:bg-[#e8eaed] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleRenameCategorySubmit}>
                <div className="p-6 space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#3c4043] mb-1.5">
                      Tên Category mới *
                    </label>
                    <input
                      type="text"
                      required
                      autoFocus
                      value={editingCategory.newName}
                      onChange={(e) => setEditingCategory(prev => prev ? { ...prev, newName: e.target.value } : null)}
                      placeholder="Nhập tên mới cho category..."
                      className="w-full px-3.5 py-2.5 bg-white border border-[#dadce0] rounded-xl text-xs font-semibold text-[#202124] focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                    />
                    <p className="text-[11px] text-[#5f6368] mt-1.5">
                      Tên category mới sẽ được cập nhật đồng bộ cho toàn bộ sản phẩm thuộc category này.
                    </p>
                  </div>

                  <div className="bg-[#f8f9fa] p-3 rounded-xl border border-[#dadce0] text-[11px] text-[#5f6368]">
                    <span className="font-bold text-[#202124]">Tên hiện tại:</span> {editingCategory.oldName}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 bg-[#f8f9fa] border-t border-[#dadce0] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingCategory(null)}
                    className="px-4 py-2 border border-[#dadce0] text-xs font-semibold text-[#3c4043] rounded-full hover:bg-[#e8eaed] transition-colors cursor-pointer"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#1a73e8] hover:bg-[#1557d0] text-white text-xs font-bold rounded-full transition-colors shadow-xs cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Lưu tên mới</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL XÁC NHẬN XÓA CATEGORY / ALBUM */}
      <AnimatePresence>
        {deletingCategoryConfirmModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-[#dadce0] rounded-3xl w-full max-w-md shadow-2xl overflow-hidden my-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#dadce0] bg-[#fce8e6]/30">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#fce8e6] text-[#d93025] flex items-center justify-center font-bold">
                    <Trash2 className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#202124]">Xóa Album & Danh mục</h3>
                    <p className="text-xs text-[#5f6368]">Xác nhận thao tác xóa</p>
                  </div>
                </div>
                <button
                  onClick={() => setDeletingCategoryConfirmModal(null)}
                  className="p-1.5 rounded-full text-[#5f6368] hover:bg-[#e8eaed] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3.5 text-xs text-[#3c4043]">
                <p className="text-sm">
                  Bạn có chắc chắn muốn xóa album <strong className="text-[#d93025] font-bold">"{deletingCategoryConfirmModal.name}"</strong> không?
                </p>
                <div className="bg-[#f8f9fa] border border-[#dadce0] rounded-2xl p-4 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#5f6368]">Số lượng mẫu trong album:</span>
                    <span className="font-bold text-[#202124]">{deletingCategoryConfirmModal.count} mẫu</span>
                  </div>
                  <p className="text-[11px] text-[#80868b] pt-1 border-t border-[#dadce0]">
                    Toàn bộ hình ảnh và dữ liệu mẫu của album này sẽ được dọn dẹp khỏi hệ thống.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-[#f8f9fa] border-t border-[#dadce0] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setDeletingCategoryConfirmModal(null)}
                  className="px-4 py-2 border border-[#dadce0] text-xs font-semibold text-[#3c4043] rounded-full hover:bg-[#e8eaed] transition-colors cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDeleteCategory}
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#d93025] hover:bg-[#b31412] text-white text-xs font-bold rounded-full transition-colors shadow-xs cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Xác nhận xóa</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL XÁC NHẬN XÓA 1 SẢN PHẨM */}
      <AnimatePresence>
        {deletingProductConfirmModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-[#dadce0] rounded-3xl w-full max-w-md shadow-2xl overflow-hidden my-auto"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#dadce0] bg-[#fce8e6]/30">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#fce8e6] text-[#d93025] flex items-center justify-center font-bold">
                    <Trash2 className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#202124]">Xóa mẫu thiết kế</h3>
                    <p className="text-xs text-[#5f6368]">Xác nhận thao tác xóa</p>
                  </div>
                </div>
                <button
                  onClick={() => setDeletingProductConfirmModal(null)}
                  className="p-1.5 rounded-full text-[#5f6368] hover:bg-[#e8eaed] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 text-xs text-[#3c4043] space-y-2">
                <p className="text-sm">
                  Bạn có chắc chắn muốn xóa sản phẩm <strong className="text-[#d93025] font-bold">"{deletingProductConfirmModal.name}"</strong> khỏi danh mục này không?
                </p>
              </div>

              <div className="px-6 py-4 bg-[#f8f9fa] border-t border-[#dadce0] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setDeletingProductConfirmModal(null)}
                  className="px-4 py-2 border border-[#dadce0] text-xs font-semibold text-[#3c4043] rounded-full hover:bg-[#e8eaed] transition-colors cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDeleteProduct}
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#d93025] hover:bg-[#b31412] text-white text-xs font-bold rounded-full transition-colors shadow-xs cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Xác nhận xóa</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL XÁC NHẬN KHÔI PHỤC DỮ LIỆU BAN ĐẦU */}
      <AnimatePresence>
        {isRestoreCatalogModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-[#dadce0] rounded-3xl w-full max-w-md shadow-2xl overflow-hidden my-auto"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#dadce0] bg-[#e8f0fe]/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center font-bold">
                    <RotateCcw className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#202124]">Khôi phục danh mục mẫu</h3>
                    <p className="text-xs text-[#5f6368]">Dữ liệu mặc định ban đầu</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsRestoreCatalogModalOpen(false)}
                  className="p-1.5 rounded-full text-[#5f6368] hover:bg-[#e8eaed] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 text-xs text-[#3c4043] space-y-2">
                <p className="text-sm">
                  Bạn có muốn khôi phục lại toàn bộ danh mục và các sản phẩm mẫu gốc của mục này không?
                </p>
              </div>

              <div className="px-6 py-4 bg-[#f8f9fa] border-t border-[#dadce0] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsRestoreCatalogModalOpen(false)}
                  className="px-4 py-2 border border-[#dadce0] text-xs font-semibold text-[#3c4043] rounded-full hover:bg-[#e8eaed] transition-colors cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="button"
                  onClick={handleConfirmRestoreDefaultCatalog}
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#1a73e8] hover:bg-[#1557d0] text-white text-xs font-bold rounded-full transition-colors shadow-xs cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Xác nhận khôi phục</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox Large Image & Category Gallery Modal */}
      <CategoryLightboxGalleryModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        product={lightboxProduct}
        allProductsInCategory={filteredProducts}
        categoryName={categoryNameClean}
        onSelectProduct={(prod) => setLightboxProduct(prod)}
        onSelectForQuotation={onSelectForQuotation}
        onDeleteProduct={handleDeleteAddedProduct}
      />

      {/* Bulk Add Multiple Images into Category Modal */}
      <BulkAddImagesModal
        isOpen={isBulkAddModalOpen}
        onClose={() => setIsBulkAddModalOpen(false)}
        serviceId={service.id}
        categoryOptions={categoryOptions}
        defaultCategoryName={bulkAddTargetCategory || (selectedCategory !== 'ALL' ? selectedCategory : (availableCategoryNames[0] || categoryNameClean))}
        onSuccess={(addedCount, targetCategory) => {
          setRefreshKey(prev => prev + 1);
          if (selectedCategory !== 'ALL' && selectedCategory.toLowerCase() !== targetCategory.toLowerCase()) {
            setSelectedCategory(targetCategory);
          }
          showToast(`Đã thêm thành công ${addedCount} hình ảnh vào Category "${targetCategory}"!`);
        }}
        onOpenAddCategoryModal={() => {
          setNewCategoryNameInput('');
          setIsAddCategoryModalOpen(true);
        }}
      />

    </div>
  );
}

