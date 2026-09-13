/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Plus, 
  Sparkles, 
  Sofa, 
  Armchair, 
  Lamp, 
  Laptop, 
  Waves, 
  Palette, 
  TreePine, 
  Mountain, 
  Hammer, 
  Flower2, 
  Box, 
  Dumbbell, 
  LayoutGrid, 
  Check,
  ShoppingBag,
  Users,
  Image as ImageIcon
} from 'lucide-react';
import { Service } from '../types';
import { addNewProductToCategory, DEFAULT_FURNITURE_PLACEHOLDER } from '../data/categoryProductsData';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCategory: (category: Service) => void;
  defaultProjectType?: 'eca' | 'ecb' | 'b2b';
}

const AVAILABLE_ICONS = [
  { name: 'Sofa', label: 'Sofa', icon: Sofa },
  { name: 'Armchair', label: 'Ghế bọc / Lounge', icon: Armchair },
  { name: 'Lamp', label: 'Đèn trang trí', icon: Lamp },
  { name: 'Laptop', label: 'Bàn làm việc', icon: Laptop },
  { name: 'Waves', label: 'Resin / Thủy sinh', icon: Waves },
  { name: 'Palette', label: 'Sơn mài / Mỹ nghệ', icon: Palette },
  { name: 'TreePine', label: 'Đồ gỗ Outdoor', icon: TreePine },
  { name: 'Mountain', label: 'Bê tông Outdoor', icon: Mountain },
  { name: 'Hammer', label: 'Kim loại / Cơ khí', icon: Hammer },
  { name: 'Flower2', label: 'Chạm khắc gỗ', icon: Flower2 },
  { name: 'Box', label: 'Sản phẩm hộp / Decor', icon: Box },
  { name: 'Dumbbell', label: 'Fitness / Thể thao', icon: Dumbbell },
  { name: 'Sparkles', label: 'Cao cấp / Limited', icon: Sparkles },
  { name: 'LayoutGrid', label: 'Hệ thống Module', icon: LayoutGrid },
];

const SAMPLE_IMAGES = [
  { label: 'Mặc định (Nền xám nhạt)', url: DEFAULT_FURNITURE_PLACEHOLDER },
  { label: 'Sofa / Lounge Hiện Đại', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85' },
  { label: 'Bàn Trà Nghệ Thuật', url: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=85' },
  { label: 'Đèn Trang Trí Tinh Tế', url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85' },
  { label: 'Nội Thất Gỗ Tự Nhiên', url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85' },
];

export default function AddCategoryModal({
  isOpen,
  onClose,
  onAddCategory,
  defaultProjectType = 'ecb'
}: AddCategoryModalProps) {
  const [projectType, setProjectType] = useState<'eca' | 'ecb' | 'b2b'>(defaultProjectType);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('Sofa');
  const [initialProductImage, setInitialProductImage] = useState(DEFAULT_FURNITURE_PLACEHOLDER);
  const [initialProductName, setInitialProductName] = useState('');
  const [initialProductMaterial, setInitialProductMaterial] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Generate unique slug id
    const slug = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const newId = `${projectType}-${slug || Date.now()}`;
    const projectNote = 
      projectType === 'eca' ? 'Ecommerce A - Mass Market' :
      projectType === 'ecb' ? 'Ecommerce B - Limited Collection' :
      'OBM - Original Brand Manufacture';

    const newCategory: Service = {
      id: newId,
      name: name.trim(),
      description: description.trim() || `Danh mục sản phẩm ${name.trim()} thuộc ${projectNote}.`,
      price: 0,
      currency: 'CUSTOM',
      type: 'package',
      note: projectNote,
      icon: selectedIcon
    };

    // If an initial product was specified, add it to this category
    const prodName = initialProductName.trim() || `${name.trim()} Pro Series 01`;
    const prodMaterial = initialProductMaterial.trim() || 'Gỗ tự nhiên / Kim loại sơn tĩnh điện cao cấp';
    const prodImg = initialProductImage.trim() || SAMPLE_IMAGES[0].url;

    addNewProductToCategory(newId, {
      id: `${newId}-sample-${Date.now()}`,
      name: prodName,
      code: `${projectType.toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      category: newId,
      categoryName: name.trim(),
      thumbnail: prodImg,
      images: [prodImg],
      dimensions: 'W1200 x D600 x H750 mm',
      material: prodMaterial,
      finish: 'Sơn phủ bảo vệ cao cấp',
      priceRange: 'Liên hệ báo giá',
      moq: '50 sản phẩm',
      leadTime: '15 - 25 ngày',
      tags: [projectType === 'eca' ? 'Đại chúng' : projectType === 'ecb' ? 'Cao cấp' : 'OBM', 'Mới ra mắt'],
      specifications: [
        { label: 'Chất liệu', value: prodMaterial },
        { label: 'Quy cách', value: 'Chuẩn thiết kế xuất khẩu' }
      ],
      description: `Mẫu sản phẩm ${prodName} mới được cập nhật vào danh mục ${name.trim()}.`
    });

    onAddCategory(newCategory);
    onClose();

    // Reset form
    setName('');
    setDescription('');
    setInitialProductName('');
    setInitialProductMaterial('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#202124]/50 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#dadce0] shadow-2xl z-10 overflow-hidden my-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#dadce0] bg-[#f8f9fa]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#e8f0fe] border border-[#1a73e8]/30 flex items-center justify-center text-[#1a73e8]">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#202124]">Thêm brand sản phẩm mới</h2>
                <p className="text-xs text-[#5f6368]">Tạo danh mục dòng sản phẩm mới vào dự án của bạn</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#5f6368] hover:text-[#202124] hover:bg-[#e8eaed] rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(85vh-130px)] overflow-y-auto">
            {/* 1. Chọn dự án / phân khúc */}
            <div>
              <label className="block text-xs font-bold text-[#3c4043] uppercase tracking-wider mb-2">
                1. Thuộc dự án / Phân khúc *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setProjectType('eca')}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                    projectType === 'eca'
                      ? 'border-[#1a73e8] bg-[#e8f0fe] ring-2 ring-[#1a73e8]/20'
                      : 'border-[#dadce0] bg-white hover:bg-[#f8f9fa]'
                  }`}
                >
                  <ShoppingBag className={`w-5 h-5 mt-0.5 ${projectType === 'eca' ? 'text-[#1a73e8]' : 'text-[#5f6368]'}`} />
                  <div>
                    <div className="font-bold text-sm text-[#202124]">Ecommerce A</div>
                    <div className="text-[11px] text-[#5f6368]">Phân khúc Mass Market</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setProjectType('ecb')}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                    projectType === 'ecb'
                      ? 'border-[#7627bb] bg-[#f3e8fd] ring-2 ring-[#7627bb]/20'
                      : 'border-[#dadce0] bg-white hover:bg-[#f8f9fa]'
                  }`}
                >
                  <Sparkles className={`w-5 h-5 mt-0.5 ${projectType === 'ecb' ? 'text-[#7627bb]' : 'text-[#5f6368]'}`} />
                  <div>
                    <div className="font-bold text-sm text-[#202124]">Ecommerce B</div>
                    <div className="text-[11px] text-[#5f6368]">Limited & Cao cấp</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setProjectType('b2b')}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                    projectType === 'b2b'
                      ? 'border-[#137333] bg-[#e6f4ea] ring-2 ring-[#137333]/20'
                      : 'border-[#dadce0] bg-white hover:bg-[#f8f9fa]'
                  }`}
                >
                  <Users className={`w-5 h-5 mt-0.5 ${projectType === 'b2b' ? 'text-[#137333]' : 'text-[#5f6368]'}`} />
                  <div>
                    <div className="font-bold text-sm text-[#202124]">OBM</div>
                    <div className="text-[11px] text-[#5f6368]">Gia công & Thiết kế B2B</div>
                  </div>
                </button>
              </div>
            </div>

            {/* 2. Tên brand và mô tả */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#3c4043] uppercase tracking-wider mb-1.5">
                  2. Tên brand sản phẩm *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Ghế Sofa Modular, Bàn trà Resin nghệ thuật, Đèn thả trần..."
                  className="w-full px-4 py-2.5 bg-white border border-[#dadce0] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 rounded-xl text-sm font-medium text-[#202124] focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3c4043] uppercase tracking-wider mb-1.5">
                  Mô tả ngắn dòng sản phẩm
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mô tả phong cách, đối tượng sử dụng hoặc công năng chính..."
                  className="w-full px-4 py-2.5 bg-white border border-[#dadce0] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 rounded-xl text-sm text-[#202124] focus:outline-none transition-all resize-none"
                />
              </div>
            </div>

            {/* 3. Chọn Icon biểu tượng */}
            <div>
              <label className="block text-xs font-bold text-[#3c4043] uppercase tracking-wider mb-2">
                3. Chọn Biểu tượng nhận diện
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {AVAILABLE_ICONS.map((item) => {
                  const IconComp = item.icon;
                  const isSelected = selectedIcon === item.name;
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setSelectedIcon(item.name)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#1a73e8] bg-[#e8f0fe] text-[#1a73e8] shadow-xs'
                          : 'border-[#dadce0] bg-white text-[#5f6368] hover:bg-[#f8f9fa]'
                      }`}
                      title={item.label}
                    >
                      <IconComp className="w-5 h-5" />
                      <span className="text-[10px] font-medium truncate max-w-[65px] text-center leading-tight">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Sản phẩm mẫu ban đầu */}
            <div className="bg-[#f8f9fa] border border-[#dadce0] p-4.5 rounded-2xl space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#3c4043] uppercase tracking-wider">
                <ImageIcon className="w-4 h-4 text-[#1a73e8]" />
                <span>4. Thêm sản phẩm mẫu ban đầu trong brand này (Tùy chọn)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#5f6368] mb-1">
                    Tên sản phẩm mẫu
                  </label>
                  <input
                    type="text"
                    value={initialProductName}
                    onChange={(e) => setInitialProductName(e.target.value)}
                    placeholder={name ? `${name} Signature 01` : 'Ví dụ: Nordic Chair v1'}
                    className="w-full px-3 py-1.5 bg-white border border-[#dadce0] focus:border-[#1a73e8] rounded-lg text-xs text-[#202124] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#5f6368] mb-1">
                    Chất liệu / Quy cách
                  </label>
                  <input
                    type="text"
                    value={initialProductMaterial}
                    onChange={(e) => setInitialProductMaterial(e.target.value)}
                    placeholder="Ví dụ: Gỗ Sồi tự nhiên / Vải bọc nệm cao cấp"
                    className="w-full px-3 py-1.5 bg-white border border-[#dadce0] focus:border-[#1a73e8] rounded-lg text-xs text-[#202124] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5f6368] mb-1.5">
                  Chọn ảnh mẫu nhanh hoặc nhập link ảnh trực tiếp:
                </label>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {SAMPLE_IMAGES.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setInitialProductImage(img.url)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border shrink-0 cursor-pointer transition-all ${
                        initialProductImage === img.url
                          ? 'border-[#1a73e8] ring-2 ring-[#1a73e8]'
                          : 'border-[#dadce0] hover:opacity-80'
                      }`}
                    >
                      <img 
                        src={img.url} 
                        alt={img.label} 
                        className={`w-full h-full ${img.url.startsWith('data:') ? 'object-contain p-1 bg-white' : 'object-cover'}`} 
                      />
                      {initialProductImage === img.url && (
                        <div className="absolute inset-0 bg-[#1a73e8]/30 flex items-center justify-center text-white">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <input
                  type="url"
                  value={initialProductImage}
                  onChange={(e) => setInitialProductImage(e.target.value)}
                  placeholder="Hoặc dán URL ảnh sản phẩm..."
                  className="w-full mt-2 px-3 py-1.5 bg-white border border-[#dadce0] focus:border-[#1a73e8] rounded-lg text-xs text-[#202124] focus:outline-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#dadce0]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-[#5f6368] hover:text-[#202124] hover:bg-[#f1f3f4] rounded-full transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1a73e8] hover:bg-[#1557d0] text-white text-xs font-bold rounded-full transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tạo brand sản phẩm</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
