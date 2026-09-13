/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Check, 
  Share2,
  Trash2 
} from 'lucide-react';
import { GalleryProduct, DEFAULT_FURNITURE_PLACEHOLDER } from '../data/categoryProductsData';

interface CategoryLightboxGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: GalleryProduct | null;
  allProductsInCategory: GalleryProduct[];
  categoryName?: string;
  onSelectProduct?: (product: GalleryProduct) => void;
  onSelectForQuotation?: (product: GalleryProduct) => void;
  onDeleteProduct?: (productId: string, productName: string) => void;
}

export default function CategoryLightboxGalleryModal({
  isOpen,
  onClose,
  product: initialProduct,
  allProductsInCategory,
  onSelectProduct,
  onDeleteProduct
}: CategoryLightboxGalleryModalProps) {
  const [currentProduct, setCurrentProduct] = useState<GalleryProduct | null>(initialProduct);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const activeThumbnailRef = useRef<HTMLButtonElement | null>(null);

  // Sync state when initialProduct changes
  useEffect(() => {
    if (initialProduct) {
      setCurrentProduct(initialProduct);
      setActiveImageIndex(0);
      setIsZoomed(false);
    }
  }, [initialProduct]);

  // Current active product fallback
  const product = currentProduct || initialProduct;

  // Images for the currently selected product
  const productImages = useMemo(() => {
    if (!product) return [];
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images;
    }
    return [product.thumbnail || DEFAULT_FURNITURE_PLACEHOLDER];
  }, [product]);

  // Find index in category list
  const currentProductIndex = useMemo(() => {
    if (!product || !allProductsInCategory.length) return 0;
    const idx = allProductsInCategory.findIndex(p => p.id === product.id);
    return idx >= 0 ? idx : 0;
  }, [product, allProductsInCategory]);

  // Auto-scroll active thumbnail into view in the sidebar
  useEffect(() => {
    if (activeThumbnailRef.current) {
      activeThumbnailRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [product?.id, activeImageIndex]);

  // Handle keyboard shortcuts (Esc, Left, Right)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        handleNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeImageIndex, productImages.length, currentProductIndex, allProductsInCategory]);

  if (!isOpen || !product) return null;

  const handlePrevImage = () => {
    if (activeImageIndex > 0) {
      setActiveImageIndex(prev => prev - 1);
    } else if (allProductsInCategory.length > 1) {
      // Switch to previous product
      const prevIdx = (currentProductIndex - 1 + allProductsInCategory.length) % allProductsInCategory.length;
      const prevProd = allProductsInCategory[prevIdx];
      setCurrentProduct(prevProd);
      setActiveImageIndex(0);
      if (onSelectProduct) onSelectProduct(prevProd);
    }
  };

  const handleNextImage = () => {
    if (activeImageIndex < productImages.length - 1) {
      setActiveImageIndex(prev => prev + 1);
    } else if (allProductsInCategory.length > 1) {
      // Switch to next product
      const nextIdx = (currentProductIndex + 1) % allProductsInCategory.length;
      const nextProd = allProductsInCategory[nextIdx];
      setCurrentProduct(nextProd);
      setActiveImageIndex(0);
      if (onSelectProduct) onSelectProduct(nextProd);
    }
  };

  const handleSelectAnotherProduct = (prod: GalleryProduct) => {
    setCurrentProduct(prod);
    setActiveImageIndex(0);
    setIsZoomed(false);
    if (onSelectProduct) onSelectProduct(prod);
  };

  const activeImageUrl = productImages[activeImageIndex] || product.thumbnail || DEFAULT_FURNITURE_PLACEHOLDER;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-[#0e1013]/95 backdrop-blur-md flex flex-col justify-between overflow-hidden animate-in fade-in duration-200">
        
        {/* TOP FLOATING ACTION BAR */}
        <div className="absolute top-0 inset-x-0 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-40 pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            {/* Optional badge / product title info */}
            <span className="text-white/80 font-medium text-xs sm:text-sm tracking-wide bg-black/40 px-3 py-1 rounded-full border border-white/10 backdrop-blur-xs">
              {product.name} {product.code ? `• ${product.code}` : ''}
            </span>
          </div>

          {/* Right: Actions & Close */}
          <div className="flex items-center gap-2 pointer-events-auto">
            {onDeleteProduct && product && (
              <button
                onClick={() => {
                  if (confirm(`Bạn có chắc muốn xóa sản phẩm "${product.name}" không?`)) {
                    const deletingId = product.id;
                    const deletingName = product.name;
                    const remainingProds = allProductsInCategory.filter(p => p.id !== deletingId);
                    if (remainingProds.length > 0) {
                      const nextProd = remainingProds[Math.min(currentProductIndex, remainingProds.length - 1)];
                      setCurrentProduct(nextProd);
                      setActiveImageIndex(0);
                      if (onSelectProduct) onSelectProduct(nextProd);
                    } else {
                      onClose();
                    }
                    onDeleteProduct(deletingId, deletingName);
                  }
                }}
                className="p-2 rounded-full bg-white/10 text-white/80 hover:bg-red-600/80 hover:text-white transition-colors cursor-pointer"
                title="Xóa sản phẩm này"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <a
              href={activeImageUrl}
              target="_blank"
              rel="noopener noreferrer"
              download={`${product.code || 'product'}-photo.jpg`}
              className="p-2 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
              title="Mở ảnh kích thước gốc trong tab mới"
            >
              <Download className="w-4 h-4" />
            </a>

            <button
              onClick={handleCopyLink}
              className="p-2 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
              title="Sao chép liên kết"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/20 hover:bg-red-500/80 text-white transition-all cursor-pointer ml-1"
              title="Đóng (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MAIN SPLIT VIEW: LARGE IMAGE CENTER (EXPANDED) + VERTICAL SIDEBAR THUMBNAILS */}
        <div className="relative flex-1 flex flex-row items-stretch w-full h-full min-h-0 overflow-hidden">
          
          {/* CENTER LARGE IMAGE STAGE */}
          <div className="relative flex-1 flex items-center justify-center p-2 sm:p-6 lg:p-10 min-w-0 h-full overflow-hidden">
            
            {/* Left Nav Arrow */}
            <button
              onClick={handlePrevImage}
              className="absolute left-3 sm:left-6 z-30 p-3 sm:p-3.5 rounded-full bg-black/60 hover:bg-black/90 text-white/90 hover:text-white border border-white/20 hover:scale-105 transition-all shadow-xl cursor-pointer"
              title="Ảnh trước / Mẫu trước (Phím ←)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main High-Res Image Display */}
            <motion.div 
              key={`${product.id}-${activeImageIndex}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.18 }}
              className={`relative w-full h-full flex items-center justify-center select-none ${
                isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={activeImageUrl}
                alt={product.name}
                className={`max-w-full max-h-[88vh] lg:max-h-[92vh] w-auto h-auto object-contain rounded-xl shadow-2xl transition-all duration-300 ${
                  isZoomed ? 'scale-125' : 'scale-100'
                }`}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = DEFAULT_FURNITURE_PLACEHOLDER;
                }}
              />

              {/* Minimal counter badge */}
              <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-xs text-white text-[11px] font-mono px-3 py-1 rounded-full border border-white/20 pointer-events-none">
                {productImages.length > 1 ? `Góc ${activeImageIndex + 1}/${productImages.length} • ` : ''}Mẫu {currentProductIndex + 1}/{allProductsInCategory.length}
              </div>
            </motion.div>

            {/* Right Nav Arrow */}
            <button
              onClick={handleNextImage}
              className="absolute right-3 sm:right-6 z-30 p-3 sm:p-3.5 rounded-full bg-black/60 hover:bg-black/90 text-white/90 hover:text-white border border-white/20 hover:scale-105 transition-all shadow-xl cursor-pointer"
              title="Ảnh tiếp theo / Mẫu tiếp theo (Phím →)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* RIGHT SIDEBAR THUMBNAILS LIST */}
          <aside className="w-20 sm:w-28 lg:w-32 bg-black/50 backdrop-blur-md border-l border-white/10 flex flex-col pt-16 pb-4 px-2 sm:px-3 z-30 shrink-0 select-none">
            
            {/* Scrollable vertical thumbnail list */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-0.5 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              
              {/* If current product has multiple angles, show angle thumbnails first or merged */}
              {productImages.length > 1 && (
                <div className="space-y-1.5 pb-2 border-b border-white/15">
                  {productImages.map((imgUrl, angleIdx) => {
                    const isAngleSelected = angleIdx === activeImageIndex;
                    return (
                      <button
                        key={`angle-${angleIdx}`}
                        onClick={() => setActiveImageIndex(angleIdx)}
                        className={`w-full aspect-[4/5] rounded-lg overflow-hidden border-2 transition-all cursor-pointer relative block group ${
                          isAngleSelected 
                            ? 'border-[#1a73e8] ring-2 ring-[#1a73e8]/60 shadow-lg scale-102' 
                            : 'border-white/20 hover:border-white/50 opacity-60 hover:opacity-100'
                        }`}
                        title={`Góc chụp ${angleIdx + 1}`}
                      >
                        <img
                          src={imgUrl}
                          alt={`Góc ${angleIdx + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = DEFAULT_FURNITURE_PLACEHOLDER;
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* All products in Category / Album vertical cards */}
              {allProductsInCategory.map((item, idx) => {
                const isSelected = item.id === product.id;
                return (
                  <button
                    key={item.id}
                    ref={isSelected ? activeThumbnailRef : null}
                    onClick={() => handleSelectAnotherProduct(item)}
                    className={`w-full aspect-[4/5] rounded-lg overflow-hidden border-2 transition-all cursor-pointer relative block group ${
                      isSelected 
                        ? 'border-[#1a73e8] ring-2 ring-[#1a73e8]/60 shadow-lg scale-102' 
                        : 'border-white/15 hover:border-white/50 opacity-55 hover:opacity-100'
                    }`}
                    title={`${item.name} (${item.code || `Mẫu ${idx + 1}`})`}
                  >
                    <img
                      src={item.thumbnail || DEFAULT_FURNITURE_PLACEHOLDER}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = DEFAULT_FURNITURE_PLACEHOLDER;
                      }}
                    />
                    {item.code && (
                      <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-[2px] py-0.5 px-1">
                        <p className="text-[9px] text-white font-mono truncate text-center leading-tight">
                          {item.code}
                        </p>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </aside>

        </div>

      </div>
    </AnimatePresence>
  );
}

