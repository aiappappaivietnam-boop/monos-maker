/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  UploadCloud, 
  Images, 
  Plus, 
  Trash2, 
  FolderPlus, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  Link,
  FileImage,
  Pencil
} from 'lucide-react';
import { GalleryProduct, addMultipleProductsToCategory, DEFAULT_FURNITURE_PLACEHOLDER } from '../data/categoryProductsData';
import { compressImageFile, compressImageDataUrl } from '../lib/imageCompressor';

interface BulkAddImagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string;
  categoryOptions: { name: string; count: number }[];
  defaultCategoryName: string;
  onSuccess: (addedCount: number, targetCategory: string) => void;
  onOpenAddCategoryModal: () => void;
}

interface PendingImageItem {
  id: string;
  dataUrl: string;
  name: string;
  code: string;
  material: string;
}

export default function BulkAddImagesModal({
  isOpen,
  onClose,
  serviceId,
  categoryOptions,
  defaultCategoryName,
  onSuccess,
  onOpenAddCategoryModal
}: BulkAddImagesModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    return defaultCategoryName || (categoryOptions[0]?.name) || 'Home Office';
  });

  const [inputMode, setInputMode] = useState<'upload' | 'urls'>('upload');
  const [pendingImages, setPendingImages] = useState<PendingImageItem[]>([]);
  const [urlInputText, setUrlInputText] = useState('');
  const [batchBaseName, setBatchBaseName] = useState('');
  const [batchMaterial, setBatchMaterial] = useState('Gỗ tự nhiên / Chân kim loại');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle file uploads (multiple files with automatic compression)
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = (Array.from(files) as File[]).filter(f => f.type.startsWith('image/'));
    if (fileList.length === 0) return;

    for (let index = 0; index < fileList.length; index++) {
      const file = fileList[index];
      try {
        const compressedDataUrl = await compressImageFile(file);
        const rawName = file.name.replace(/\.[^/.]+$/, "");
        const cleanName = rawName.replace(/[-_]/g, " ");
        const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
        const randomSku = `ITM-${Math.floor(100 + Math.random() * 900)}`;

        setPendingImages(prev => [
          ...prev,
          {
            id: `pending-${Date.now()}-${Math.random()}-${index}`,
            dataUrl: compressedDataUrl,
            name: formattedName || `Mẫu thiết kế ${prev.length + 1}`,
            code: randomSku,
            material: batchMaterial
          }
        ]);
      } catch (err) {
        console.warn('Could not compress image file', err);
      }
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle URL batch parsing
  const handleParseUrls = async () => {
    const lines = urlInputText
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.startsWith('http://') || l.startsWith('https://') || l.startsWith('data:image/'));

    if (lines.length === 0) return;

    const newItems: PendingImageItem[] = [];
    for (let idx = 0; idx < lines.length; idx++) {
      const url = lines[idx];
      const compressedUrl = url.startsWith('data:image/') ? await compressImageDataUrl(url) : url;
      newItems.push({
        id: `pending-url-${Date.now()}-${idx}`,
        dataUrl: compressedUrl,
        name: batchBaseName ? `${batchBaseName} #${pendingImages.length + idx + 1}` : `Mẫu thiết kế #${pendingImages.length + idx + 1}`,
        code: `ITM-${Math.floor(100 + Math.random() * 900)}`,
        material: batchMaterial
      });
    }

    setPendingImages(prev => [...prev, ...newItems]);
    setUrlInputText('');
  };

  const handleRemovePending = (id: string) => {
    setPendingImages(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdatePendingName = (id: string, name: string) => {
    setPendingImages(prev => prev.map(item => item.id === id ? { ...item, name } : item));
  };

  const handleApplyBatchBaseName = () => {
    if (!batchBaseName.trim()) return;
    setPendingImages(prev => prev.map((item, idx) => ({
      ...item,
      name: `${batchBaseName.trim()} #${idx + 1}`
    })));
  };

  const handleSubmitAll = () => {
    if (pendingImages.length === 0) return;
    setIsProcessing(true);

    const targetCat = selectedCategory.trim() || (categoryOptions[0]?.name) || 'Home Office';

    const newProducts: GalleryProduct[] = pendingImages.map((item, idx) => ({
      id: `${serviceId}-bulk-${Date.now()}-${idx}`,
      name: item.name.trim() || `Mẫu ${targetCat} #${idx + 1}`,
      code: item.code.trim() || `ITM-${Math.floor(100 + Math.random() * 900)}`,
      category: serviceId,
      categoryName: targetCat,
      thumbnail: item.dataUrl,
      images: [item.dataUrl],
      dimensions: 'W1200 x D600 x H750 mm',
      material: item.material || batchMaterial || 'Gỗ tự nhiên / Kim loại',
      finish: 'Sơn phủ hoàn thiện cao cấp',
      priceRange: 'Liên hệ báo giá',
      moq: '30 sản phẩm',
      leadTime: '15 - 20 ngày',
      tags: ['Album Mới', targetCat],
      specifications: [
        { label: 'Chất liệu', value: item.material || batchMaterial || 'Gỗ tự nhiên / Kim loại' },
        { label: 'Phân loại Album', value: targetCat }
      ]
    }));

    addMultipleProductsToCategory(serviceId, newProducts);
    setIsProcessing(false);
    onSuccess(newProducts.length, targetCat);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white border border-[#dadce0] rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#dadce0] bg-[#f8f9fa] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1a73e8]/10 text-[#1a73e8] flex items-center justify-center font-bold shadow-2xs">
              <Images className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#202124] flex items-center gap-2">
                <span>Thêm nhiều hình vào Category</span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-[#e8f0fe] text-[#1a73e8] rounded-full">
                  Album Batch
                </span>
              </h3>
              <p className="text-xs text-[#5f6368]">
                Tải lên nhiều hình cùng lúc để tạo bộ sưu tập / album cho category
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#5f6368] hover:bg-[#e8eaed] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          
          {/* Category Target Selector */}
          <div className="bg-[#f8f9fa] p-4 rounded-2xl border border-[#dadce0] space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-[#202124] text-xs flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#1a73e8]" />
                <span>Chọn Category nhận toàn bộ ảnh này *</span>
              </label>
              <button
                type="button"
                onClick={onOpenAddCategoryModal}
                className="text-[11px] font-bold text-[#1a73e8] hover:underline cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Tạo category mới</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              {categoryOptions.map(cat => (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    selectedCategory.toLowerCase() === cat.name.toLowerCase()
                      ? 'border-[#1a73e8] bg-[#e8f0fe] text-[#1a73e8] font-bold shadow-2xs'
                      : 'border-[#dadce0] bg-white text-[#3c4043] hover:border-[#1a73e8]/40'
                  }`}
                >
                  <span className="truncate pr-1 text-xs">{cat.name}</span>
                  <span className="text-[10px] font-semibold opacity-70 bg-black/5 px-1.5 py-0.5 rounded-md">
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Upload Method Tabs */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-[#dadce0] pb-2">
              <button
                type="button"
                onClick={() => setInputMode('upload')}
                className={`px-3.5 py-1.5 rounded-full font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                  inputMode === 'upload'
                    ? 'bg-[#1a73e8] text-white shadow-xs'
                    : 'bg-[#f1f3f4] text-[#5f6368] hover:bg-[#e8eaed]'
                }`}
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Chọn nhiều file từ máy tính (JPG, PNG, WebP)</span>
              </button>

              <button
                type="button"
                onClick={() => setInputMode('urls')}
                className={`px-3.5 py-1.5 rounded-full font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                  inputMode === 'urls'
                    ? 'bg-[#1a73e8] text-white shadow-xs'
                    : 'bg-[#f1f3f4] text-[#5f6368] hover:bg-[#e8eaed]'
                }`}
              >
                <Link className="w-3.5 h-3.5" />
                <span>Dán danh sách Link ảnh online</span>
              </button>
            </div>

            {inputMode === 'upload' ? (
              /* Drag & Drop File Area */
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#1a73e8]/40 hover:border-[#1a73e8] bg-[#e8f0fe]/20 hover:bg-[#e8f0fe]/40 rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="w-12 h-12 rounded-full bg-[#1a73e8]/10 text-[#1a73e8] flex items-center justify-center">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-[#202124] text-sm">
                    Nhấp để chọn nhiều ảnh (hoặc kéo thả ảnh vào đây)
                  </p>
                  <p className="text-[#5f6368] text-xs mt-0.5">
                    Hỗ trợ chọn cùng lúc 5, 10, 20+ hình ảnh chất lượng cao
                  </p>
                </div>
                <span className="mt-2 px-4 py-1.5 rounded-full bg-[#1a73e8] text-white font-bold text-xs shadow-xs">
                  Chọn ảnh từ máy tính
                </span>
              </div>
            ) : (
              /* Paste multiple URLs */
              <div className="space-y-2">
                <label className="font-bold text-[#202124]">
                  Dán mỗi đường link ảnh trên 1 dòng:
                </label>
                <textarea
                  rows={4}
                  value={urlInputText}
                  onChange={(e) => setUrlInputText(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-1...&#10;https://images.unsplash.com/photo-2...&#10;https://images.unsplash.com/photo-3..."
                  className="w-full p-3 bg-white border border-[#dadce0] rounded-xl font-mono text-[11px] text-[#202124] focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                />
                <button
                  type="button"
                  onClick={handleParseUrls}
                  disabled={!urlInputText.trim()}
                  className="px-4 py-2 bg-[#1a73e8] hover:bg-[#1557d0] disabled:bg-[#dadce0] text-white font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Nạp các link ảnh này vào danh sách</span>
                </button>
              </div>
            )}
          </div>

          {/* Batch Settings & Selected Images Preview */}
          {pendingImages.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-[#dadce0]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="font-bold text-[#202124] text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Đã chuẩn bị ({pendingImages.length} hình ảnh)</span>
                </div>
                
                {/* Batch Naming Helper */}
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={batchBaseName}
                    onChange={(e) => setBatchBaseName(e.target.value)}
                    placeholder="Đặt tên hàng loạt (ví dụ: Bàn Walnut)..."
                    className="px-2.5 py-1 bg-white border border-[#dadce0] rounded-lg text-xs w-48 sm:w-56 focus:outline-none focus:border-[#1a73e8]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyBatchBaseName}
                    className="px-2.5 py-1 bg-[#f1f3f4] hover:bg-[#e8eaed] text-[#202124] font-semibold rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    Áp dụng
                  </button>
                </div>
              </div>

              {/* Grid of Pending Photos */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-56 overflow-y-auto p-1 bg-[#f8f9fa] rounded-2xl border border-[#dadce0]">
                {pendingImages.map((item, idx) => (
                  <div key={item.id} className="relative group bg-white rounded-xl border border-[#dadce0] overflow-hidden shadow-2xs">
                    <div className="aspect-square w-full bg-neutral-100 overflow-hidden">
                      <img 
                        src={item.dataUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-1.5 space-y-1">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleUpdatePendingName(item.id, e.target.value)}
                        className="w-full px-1.5 py-0.5 text-[10px] font-semibold text-[#202124] border border-transparent hover:border-[#dadce0] focus:border-[#1a73e8] rounded truncate focus:outline-none"
                        title="Nhấp để sửa tên mẫu này"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemovePending(item.id)}
                      className="absolute top-1 right-1 p-1 rounded-full bg-black/60 hover:bg-red-600 text-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-md"
                      title="Xóa ảnh này"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <div className="absolute top-1 left-1 px-1.5 py-0.2 rounded bg-black/60 text-white text-[9px] font-mono pointer-events-none">
                      #{idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#f8f9fa] border-t border-[#dadce0] flex items-center justify-between shrink-0">
          <span className="text-xs text-[#5f6368]">
            Sẽ thêm vào category: <strong className="text-[#1a73e8]">{selectedCategory}</strong>
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#dadce0] text-xs font-semibold text-[#3c4043] rounded-full hover:bg-[#e8eaed] transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="button"
              disabled={pendingImages.length === 0 || isProcessing}
              onClick={handleSubmitAll}
              className="inline-flex items-center gap-1.5 px-6 py-2 bg-[#1a73e8] hover:bg-[#1557d0] disabled:bg-[#dadce0] text-white text-xs font-bold rounded-full transition-all shadow-md cursor-pointer disabled:cursor-not-allowed"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isProcessing ? 'Đang lưu...' : `Lưu ${pendingImages.length} hình vào Category`}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
