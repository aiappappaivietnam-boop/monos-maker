/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Folder, 
  Images, 
  Plus, 
  Pencil, 
  Eye, 
  ChevronRight, 
  Camera, 
  Star, 
  Image as ImageIcon, 
  X, 
  CheckCircle2,
  Trash2,
  Download
} from 'lucide-react';
import { 
  GalleryProduct, 
  DEFAULT_FURNITURE_PLACEHOLDER,
  getStoredCategoryCovers,
  setStoredCategoryCover
} from '../data/categoryProductsData';
import { exportAlbumCatalogPackage } from '../lib/albumPackageSync';

interface CategoryAlbumViewProps {
  serviceId?: string;
  products: GalleryProduct[];
  categoryOptions: { name: string; count: number; isCustom: boolean }[];
  selectedCategory: string;
  searchKeyword?: string;
  isEditMode?: boolean;
  onSelectCategory: (cat: string) => void;
  onOpenLightbox?: (product: GalleryProduct) => void;
  onOpenBulkAdd: (catName: string) => void;
  onOpenRenameCategory: (catName: string, count: number) => void;
  onDeleteCategory?: (catName: string, count?: number) => void;
  onStartEditProduct?: (product: GalleryProduct) => void;
  onDeleteProduct?: (productId: string, productName: string) => void;
  onSelectForQuotation?: (product: GalleryProduct) => void;
  onShowToast?: (msg: string) => void;
  onRefresh?: () => void;
}

export default function CategoryAlbumView({
  serviceId = 'service-1',
  products,
  categoryOptions,
  selectedCategory,
  searchKeyword = '',
  isEditMode = false,
  onSelectCategory,
  onOpenBulkAdd,
  onOpenRenameCategory,
  onDeleteCategory,
  onShowToast,
  onRefresh
}: CategoryAlbumViewProps) {
  // Modal to select album cover
  const [coverPickerCategory, setCoverPickerCategory] = useState<{ categoryName: string; currentCover: string } | null>(null);

  // Stored category covers
  const categoryCovers = useMemo(() => {
    return getStoredCategoryCovers(serviceId);
  }, [serviceId, products]);

  // Helper to get active cover image for a category
  const getCoverForCategory = (catName: string, categoryItems: GalleryProduct[]): string => {
    const clean = catName.trim().toLowerCase();
    if (categoryCovers[clean] && !categoryCovers[clean].includes('1505693314120-0d443867891c')) {
      return categoryCovers[clean];
    }
    const validThumb = categoryItems.find(p => p.thumbnail && !p.thumbnail.includes('1505693314120-0d443867891c'))?.thumbnail;
    return validThumb || DEFAULT_FURNITURE_PLACEHOLDER;
  };

  // Filter and sort albums alphabetically by name (ABC)
  const displayedAlbums = useMemo(() => {
    const sorted = [...categoryOptions].sort((a, b) => 
      a.name.localeCompare(b.name, 'vi', { sensitivity: 'base', numeric: true })
    );

    if (!searchKeyword.trim()) {
      return sorted;
    }

    const query = searchKeyword.trim().toLowerCase();
    return sorted.filter(cat => {
      // Matches album name
      if (cat.name.toLowerCase().includes(query)) return true;
      // Or contains matching products
      const hasMatchingProduct = products.some(p => 
        (p.categoryName || '').trim().toLowerCase() === cat.name.trim().toLowerCase() && (
          p.name.toLowerCase().includes(query) ||
          (p.code && p.code.toLowerCase().includes(query)) ||
          p.material.toLowerCase().includes(query)
        )
      );
      return hasMatchingProduct;
    });
  }, [categoryOptions, searchKeyword, products]);

  // Handle setting cover
  const handleSetCover = (catName: string, imageUrl: string) => {
    if (!imageUrl) return;
    setStoredCategoryCover(serviceId, catName, imageUrl);
    if (onShowToast) {
      onShowToast(`Đã chọn ảnh bìa đại diện cho album "${catName}"!`);
    }
    if (onRefresh) {
      onRefresh();
    }
    setCoverPickerCategory(null);
  };

  // Export a single album
  const handleExportSingleAlbum = (catName: string, items: GalleryProduct[]) => {
    try {
      exportAlbumCatalogPackage(serviceId, `Album_${catName}`, items);
      if (onShowToast) {
        onShowToast(`Đã xuất Album "${catName}" (${items.length} mẫu) thành công!`);
      }
    } catch (e) {
      console.error('Lỗi khi xuất album đơn lẻ', e);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Overview & Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-[#dadce0]">
        <div>
          <h2 className="text-lg font-bold text-[#202124] flex items-center gap-2">
            <Images className="w-5 h-5 text-[#1a73e8]" />
            <span>Thư viện Album theo Category</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#e8f0fe] text-[#1a73e8] text-xs font-bold">
              {displayedAlbums.length} Album
            </span>
          </h2>
          <p className="text-xs text-[#5f6368] mt-0.5">
            Sắp xếp theo thứ tự bảng chữ cái A-Z. Nhấp vào Album để xem chi tiết toàn bộ mẫu thiết kế trong Lưới sản phẩm.
          </p>
        </div>

        {isEditMode && (
          <button
            type="button"
            onClick={() => onOpenBulkAdd('')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a73e8] hover:bg-[#1557d0] text-white rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tải nhiều hình vào Album</span>
          </button>
        )}
      </div>

      {/* Grid of Albums - 5 Columns & 3:4 Aspect Ratio matching Product Grid */}
      {displayedAlbums.length === 0 ? (
        <div className="text-center py-16 bg-white border border-[#dadce0] rounded-3xl p-8 space-y-3">
          <Images className="w-12 h-12 text-[#80868b] mx-auto opacity-50" />
          <h3 className="text-base font-bold text-[#202124]">Không tìm thấy album nào</h3>
          <p className="text-sm text-[#5f6368] max-w-md mx-auto">
            Không có album nào khớp với từ khóa &ldquo;{searchKeyword}&rdquo;. Vui lòng thử tìm với từ khóa khác.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {displayedAlbums.map((cat) => {
            const albumItems = products.filter(
              p => (p.categoryName || '').trim().toLowerCase() === cat.name.trim().toLowerCase()
            );
            const mainCover = getCoverForCategory(cat.name, albumItems);

            return (
              <div
                key={cat.name}
                onClick={() => onSelectCategory(cat.name)}
                className="group bg-white rounded-2xl border border-[#dadce0] hover:border-[#1a73e8] hover:shadow-[0_4px_20px_rgba(26,115,232,0.08)] transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer relative"
              >
              {/* Single Album Cover Photo Frame - 3:4 Portrait Ratio */}
              <div className="relative w-full aspect-[3/4] bg-white border-b border-[#f1f3f4] overflow-hidden flex items-center justify-center">
                <img
                  src={mainCover}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = DEFAULT_FURNITURE_PLACEHOLDER;
                  }}
                />

                {albumItems.length === 0 && (
                  <div className="absolute inset-0 bg-neutral-100 flex flex-col items-center justify-center text-neutral-400 gap-1.5 p-4 text-center">
                    <Images className="w-8 h-8 opacity-40" />
                    <span className="text-xs font-semibold">Album chưa có hình ảnh</span>
                  </div>
                )}

                {/* Dark Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4 text-white">
                  <span className="font-semibold text-xs flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    <span>Xem chi tiết ({cat.count} hình)</span>
                  </span>
                  <ChevronRight className="w-5 h-5 text-white/90" />
                </div>

                {/* Badge Pill: Total images in this category */}
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 border border-white/20 shadow-md pointer-events-none">
                  <Folder className="w-3 h-3 text-[#8ab4f8]" />
                  <span>{cat.count} hình</span>
                </div>

                {/* Change Cover Photo Button on top right (in Edit Mode) */}
                {isEditMode && albumItems.length > 0 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCoverPickerCategory({ categoryName: cat.name, currentCover: mainCover });
                    }}
                    className="absolute top-3 right-3 bg-black/70 hover:bg-[#1a73e8] text-white p-1.5 rounded-full backdrop-blur-md text-xs font-bold border border-white/20 shadow-md transition-all cursor-pointer flex items-center gap-1"
                    title="Chọn ảnh bìa đại diện cho album này"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Album Details & Actions Header */}
              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between gap-2.5">
                {/* Category Name - Full width */}
                <h3 
                  className="font-bold text-sm sm:text-base text-[#202124] group-hover:text-[#1a73e8] transition-colors leading-snug line-clamp-2"
                  title={cat.name}
                >
                  {cat.name}
                </h3>

                {/* Bottom Action Icon Buttons (Only visible in Edit Mode) */}
                {isEditMode && (
                  <div 
                    className="flex items-center justify-end gap-1 pt-1 border-t border-[#f1f3f4]" 
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Export Single Album Button */}
                    <button
                      type="button"
                      onClick={() => handleExportSingleAlbum(cat.name, albumItems)}
                      className="p-1.5 rounded-full hover:bg-[#e8f0fe] text-[#5f6368] hover:text-[#1a73e8] transition-colors cursor-pointer"
                      title="Xuất riêng dữ liệu Album này ra file JSON"
                    >
                      <Download className="w-4 h-4" />
                    </button>

                    {/* Edit Category Name Button */}
                    <button
                      type="button"
                      onClick={() => onOpenRenameCategory(cat.name, cat.count)}
                      className="p-1.5 rounded-full hover:bg-[#e8eaed] text-[#5f6368] hover:text-[#1a73e8] transition-colors cursor-pointer"
                      title="Đổi tên Category Album này"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>

                    {/* Delete Category Button */}
                    {onDeleteCategory && (
                      <button
                        type="button"
                        onClick={() => onDeleteCategory(cat.name, cat.count)}
                        className="p-1.5 rounded-full hover:bg-[#fce8e6] text-[#5f6368] hover:text-[#d93025] transition-colors cursor-pointer"
                        title="Xóa Category Album này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      )}

      {/* MODAL: CHỌN ẢNH BÌA ĐẠI DIỆN CHO ALBUM */}
      <AnimatePresence>
        {coverPickerCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 border border-[#dadce0] overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#dadce0]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-[#e8f0fe] text-[#1a73e8]">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#202124]">
                      Chọn ảnh bìa cho Album
                    </h3>
                    <p className="text-xs text-[#5f6368]">
                      Danh mục: <strong className="text-[#1a73e8] font-semibold">{coverPickerCategory.categoryName}</strong>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setCoverPickerCategory(null)}
                  className="p-1.5 rounded-full hover:bg-[#f1f3f4] text-[#5f6368] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Photos List Grid */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
                <p className="text-xs text-[#5f6368]">
                  Nhấp vào một hình ảnh dưới đây để đặt làm hình bìa đại diện duy nhất hiển thị ở trang Album:
                </p>

                {(() => {
                  const items = products.filter(
                    p => (p.categoryName || '').trim().toLowerCase() === coverPickerCategory.categoryName.trim().toLowerCase()
                  );

                  if (items.length === 0) {
                    return (
                      <div className="text-center py-10 bg-[#f8f9fa] rounded-2xl border border-dashed border-[#dadce0] space-y-2">
                        <ImageIcon className="w-8 h-8 text-neutral-400 mx-auto" />
                        <p className="text-xs text-[#5f6368]">Chưa có hình nào trong album này</p>
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                      {items.map((prod) => {
                        const isSelected = (prod.thumbnail || '') === coverPickerCategory.currentCover;

                        return (
                          <div
                            key={prod.id}
                            onClick={() => handleSetCover(coverPickerCategory.categoryName, prod.thumbnail || DEFAULT_FURNITURE_PLACEHOLDER)}
                            className={`group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                              isSelected 
                                ? 'border-[#1a73e8] ring-4 ring-[#1a73e8]/20 shadow-md' 
                                : 'border-[#dadce0] hover:border-[#1a73e8] hover:shadow-lg'
                            }`}
                          >
                            <img
                              src={prod.thumbnail || DEFAULT_FURNITURE_PLACEHOLDER}
                              alt={prod.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />

                            {/* Overlay checkmark or select hint */}
                            {isSelected ? (
                              <div className="absolute inset-0 bg-[#1a73e8]/30 flex flex-col items-center justify-center text-white font-bold text-xs gap-1 backdrop-blur-2xs">
                                <CheckCircle2 className="w-7 h-7 fill-[#1a73e8] text-white" />
                                <span className="bg-black/70 px-2 py-0.5 rounded-full text-[10px]">Đang là ảnh bìa</span>
                              </div>
                            ) : (
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1">
                                <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                                <span>Chọn làm ảnh bìa</span>
                              </div>
                            )}

                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-white text-[10px] truncate">
                              {prod.name}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-[#dadce0] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    onOpenBulkAdd(coverPickerCategory.categoryName);
                    setCoverPickerCategory(null);
                  }}
                  className="text-xs text-[#1a73e8] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tải thêm hình ảnh mới vào album</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCoverPickerCategory(null)}
                  className="px-5 py-2 rounded-full bg-[#f1f3f4] hover:bg-[#e8eaed] text-[#3c4043] text-xs font-bold transition-all cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
