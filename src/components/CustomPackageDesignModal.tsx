/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Sparkles, 
  Plus, 
  Trash2, 
  Check, 
  CheckCircle2, 
  Printer, 
  Building2,
  Image as ImageIcon,
  Upload,
  AlignLeft,
  Tag as TagIcon,
  FileText,
  AlertCircle,
  Link2,
  Globe,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Company, CustomPackage, CustomPackageItem } from '../types';

interface CustomPackageDesignModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company;
  editingPackage?: CustomPackage | null;
  onSave: (pkg: CustomPackage) => void;
  onExportPdf?: (pkg: CustomPackage) => void;
}

const SUGGESTED_TAGS = [
  'Bespoke Custom',
  'R&D Center',
  'E-commerce Mass',
  'OBM Collection',
  'Digital Twin / 3D',
  'Thiết kế Xuất khẩu'
];

// Compress image helper using canvas to keep payload small (~30KB-70KB) and prevent storage limits
const compressImageFile = (file: File, maxWidth = 800, quality = 0.75): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => {
        resolve(e.target?.result as string);
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
};

export default function CustomPackageDesignModal({
  isOpen,
  onClose,
  company,
  editingPackage,
  onSave,
  onExportPdf
}: CustomPackageDesignModalProps) {
  const [packageName, setPackageName] = useState('Gói giải pháp thiết kế & số hóa');
  const [packageTag, setPackageTag] = useState('Bespoke Custom');
  const [packageDescription, setPackageDescription] = useState('Phạm vi công việc thiết kế và phát triển sản phẩm theo yêu cầu đặc thù.');
  const [packageNote, setPackageNote] = useState('');
  const [code, setCode] = useState(() => `PR-${company.id.toUpperCase()}-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}`);
  const [quotationDate, setQuotationDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [targetBrand, setTargetBrand] = useState('');
  const [brandLogo, setBrandLogo] = useState('');
  const [brandLink, setBrandLink] = useState('');
  const [validationError, setValidationError] = useState('');
  
  // List of items with { title, note, image }
  const [items, setItems] = useState<CustomPackageItem[]>([]);
  
  // Form input for new item
  const [newTitle, setNewTitle] = useState('');
  const [newNote, setNewNote] = useState('');
  const [newImage, setNewImage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize or reset when modal opens or editingPackage changes
  useEffect(() => {
    if (!isOpen) return;
    setValidationError('');

    if (editingPackage) {
      setPackageName(editingPackage.name || 'Gói giải pháp thiết kế & số hóa');
      setPackageTag(editingPackage.tag || 'Bespoke Custom');
      setPackageDescription(editingPackage.description || 'Phạm vi công việc thiết kế và phát triển sản phẩm theo yêu cầu đặc thù.');
      setPackageNote(editingPackage.note || '');
      setCode(editingPackage.code || `PR-${company.id.toUpperCase()}-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}`);
      setQuotationDate(editingPackage.quotationDate || new Date().toISOString().split('T')[0]);
      setTargetBrand(editingPackage.targetBrand || '');
      setBrandLogo(editingPackage.brandLogo || '');
      setBrandLink(editingPackage.brandLink || '');
      
      if (editingPackage.items && editingPackage.items.length > 0) {
        const parsedItems: CustomPackageItem[] = editingPackage.items.map(item => {
          if (typeof item === 'string') {
            return { title: item, note: '', image: '' };
          }
          return {
            title: item.title || '',
            note: item.note || '',
            image: item.image || ''
          };
        });
        setItems(parsedItems);
      } else {
        setItems([
          { title: 'Khảo sát nhu cầu đặc thù và định hướng thiết kế riêng biệt', note: 'Phân tích định vị thương hiệu và ngôn ngữ sản phẩm', image: '' },
          { title: 'Phát triển mô hình 3D và hồ sơ kỹ thuật chi tiết', note: 'Mô hình hóa 3D Solid / Surface phục vụ chuẩn hóa sản xuất', image: '' },
          { title: 'Hoàn thiện tài liệu bàn giao và quy chuẩn sản xuất', note: 'Bàn giao trọn bộ bản vẽ gia công chế tạo tiêu chuẩn', image: '' }
        ]);
      }
    } else {
      setPackageName(`Proposal Giải Pháp Thiết Kế - ${company.name}`);
      setPackageTag('Bespoke Custom');
      setPackageDescription(`Giải pháp nghiên cứu, tạo dáng công nghiệp và quy chuẩn sản xuất độc quyền cho ${company.name}.`);
      setPackageNote('Tiến độ thực hiện dự kiến theo từng giai đoạn nghiệm thu kỹ thuật.');
      setCode(`PR-${company.id.toUpperCase()}-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}`);
      setQuotationDate(new Date().toISOString().split('T')[0]);
      setTargetBrand('');
      setBrandLogo('');
      setBrandLink('');
      setItems([
        { title: 'Khảo sát nhu cầu đặc thù và định hướng thiết kế riêng biệt', note: 'Phân tích định vị thương hiệu và ngôn ngữ sản phẩm', image: '' },
        { title: 'Phát triển mô hình 3D và hồ sơ kỹ thuật chi tiết', note: 'Mô hình hóa 3D Solid / Surface phục vụ chuẩn hóa sản xuất', image: '' },
        { title: 'Hoàn thiện tài liệu bàn giao và quy chuẩn sản xuất', note: 'Bàn giao trọn bộ bản vẽ gia công chế tạo tiêu chuẩn', image: '' }
      ]);
    }
    setNewTitle('');
    setNewNote('');
    setNewImage('');
  }, [editingPackage, isOpen, company]);

  if (!isOpen) return null;

  const handleAddItem = () => {
    if (newTitle.trim()) {
      setItems(prev => [
        ...prev,
        {
          title: newTitle.trim(),
          note: newNote.trim(),
          image: newImage.trim()
        }
      ]);
      setNewTitle('');
      setNewNote('');
      setNewImage('');
      setValidationError('');
    }
  };

  const handleRemoveItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateItem = (index: number, field: keyof CustomPackageItem, val: string) => {
    setItems(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: val
      };
      return updated;
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressed = await compressImageFile(file);
      if (index !== undefined) {
        handleUpdateItem(index, 'image', compressed);
      } else {
        setNewImage(compressed);
      }
    } catch (err) {
      console.error('Image compression error:', err);
    }
    e.target.value = '';
  };

  const handleBrandLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressed = await compressImageFile(file, 400, 0.8);
      setBrandLogo(compressed);
    } catch (err) {
      console.error('Brand logo upload error:', err);
    }
    e.target.value = '';
  };

  const buildPackageObject = (): CustomPackage => {
    let validItems = items.filter(i => i.title.trim() !== '');
    // If user has something in the new item box, include it
    if (newTitle.trim() && !validItems.some(i => i.title === newTitle.trim())) {
      validItems = [
        ...validItems,
        {
          title: newTitle.trim(),
          note: newNote.trim(),
          image: newImage.trim()
        }
      ];
    }

    if (validItems.length === 0) {
      validItems = [{ title: 'Tư vấn và phát triển giải pháp thiết kế chuyên biệt', note: '', image: '' }];
    }

    const customPkg: CustomPackage = {
      id: editingPackage?.id || `cpkg-${company.id}-${Date.now().toString(36)}`,
      companyId: company.id,
      code: code.trim() || `PR-${company.id.toUpperCase()}-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}`,
      quotationDate: quotationDate || new Date().toISOString().split('T')[0],
      expiryDays: editingPackage?.expiryDays,
      name: packageName.trim() || `Proposal Thiết Kế - ${company.name}`,
      tag: packageTag.trim() || 'Bespoke Custom',
      description: packageDescription.trim() || 'Phạm vi công việc thiết kế và phát triển sản phẩm theo yêu cầu đặc thù.',
      type: 'package',
      unit: 'Gói',
      price: editingPackage?.price || 0,
      currency: editingPackage?.currency || 'CUSTOM',
      icon: editingPackage?.icon || 'Sparkles',
      targetBrand: targetBrand.trim(),
      brandLogo: brandLogo.trim(),
      brandLink: brandLink.trim(),
      items: validItems,
      outcomes: editingPackage?.outcomes || [],
      note: packageNote.trim(),
      createdAt: editingPackage?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    return customPkg;
  };

  const handleQuickExportPdf = () => {
    const customPkg = buildPackageObject();
    onSave(customPkg);
    onClose();
    if (onExportPdf) {
      onExportPdf(customPkg);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validItems = items.filter(i => i.title.trim() !== '');
    if (validItems.length === 0 && !newTitle.trim()) {
      setValidationError('Vui lòng thêm ít nhất 1 hạng mục công việc trong phạm vi thực hiện.');
      return;
    }

    const customPkg = buildPackageObject();
    onSave(customPkg);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#202124]/50 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#dadce0] overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="px-6 py-4.5 border-b border-[#dadce0] bg-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#e8f0fe] border border-[#d2e3fc] flex items-center justify-center text-[#1a73e8] shrink-0 shadow-2xs">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="text-xl font-bold text-[#202124]">
                    {editingPackage ? 'Chỉnh sửa Hồ Sơ Proposal' : 'Thiết Lập Hồ Sơ Proposal'}
                  </h2>
                  <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-[#e8f0fe] text-[#1a73e8] border border-[#d2e3fc]">
                    {company.name}
                  </span>
                </div>
                <p className="text-xs text-[#5f6368] mt-0.5">
                  Tùy chỉnh danh mục: Dòng 1 (Hạng mục) • Dòng 2 (Chú thích) • Dòng 3 (Hình ảnh)
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              type="button"
              className="w-10 h-10 rounded-full hover:bg-[#f1f3f4] text-[#5f6368] hover:text-[#202124] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content - Scrollable */}
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-6">
            
            {/* Validation Error Banner */}
            {validationError && (
              <div className="p-3 bg-[#fce8e6] border border-[#f5c2c7] rounded-xl flex items-center gap-2 text-xs text-[#d93025] font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* BLOCK 1: PROPOSAL TITLE & TAGS */}
            <div className="bg-[#f8f9fa] border border-[#dadce0] rounded-2xl p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-[#202124] flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#1a73e8]" />
                    <span>Tên gói Proposal / Đề xuất giải pháp <span className="text-[#d93025]">*</span></span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: B+Smart Office Bespoke Solution, Gói Thiết Kế R&D..."
                    value={packageName}
                    onChange={(e) => setPackageName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-[#dadce0] rounded-xl text-sm font-bold text-[#202124] focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#5f6368] flex items-center gap-1.5">
                    <TagIcon className="w-3.5 h-3.5 text-[#1a73e8]" />
                    <span>Nhãn phân loại (Tag)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Bespoke Custom"
                    value={packageTag}
                    onChange={(e) => setPackageTag(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-[#dadce0] rounded-xl text-xs font-semibold text-[#202124] focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>
              </div>

              {/* Tag Quick Select */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                <span className="text-[11px] text-[#5f6368] font-medium">Gợi ý tag:</span>
                {SUGGESTED_TAGS.map((t, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPackageTag(t)}
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border transition-colors cursor-pointer ${
                      packageTag === t 
                        ? 'bg-[#1a73e8] text-white border-[#1a73e8]' 
                        : 'bg-white text-[#5f6368] border-[#dadce0] hover:border-[#1a73e8] hover:text-[#1a73e8]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#5f6368]">
                  Mô tả tóm tắt giải pháp:
                </label>
                <input
                  type="text"
                  placeholder="Mô tả mục tiêu giải pháp..."
                  value={packageDescription}
                  onChange={(e) => setPackageDescription(e.target.value)}
                  className="w-full px-3.5 py-1.5 bg-white border border-[#dadce0] rounded-xl text-xs text-[#3c4043] focus:outline-none focus:border-[#1a73e8]"
                />
              </div>
            </div>

            {/* BLOCK 2: ĐƠN VỊ TIẾP NHẬN & THƯƠNG HIỆU DỰ KIẾN */}
            <div className="bg-[#f8f9fa] border border-[#dadce0] rounded-2xl p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left: Client Info */}
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#5f6368]">
                    ĐƠN VỊ TIẾP NHẬN (KHÁCH HÀNG / ĐỐI TÁC):
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#e8f0fe] border border-[#d2e3fc] text-[#1a73e8] flex items-center justify-center font-bold shrink-0">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-base text-[#202124]">{company.name}</div>
                      <div className="text-xs text-[#5f6368]">{company.description}</div>
                      <div className="text-xs text-[#1a73e8] font-medium mt-0.5">Phân loại: {company.type || 'Pillar B'}</div>
                    </div>
                  </div>
                </div>

                {/* Right: Proposal Details */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-xs font-semibold text-[#5f6368] mb-1">
                      Mã số:
                    </label>
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-[#dadce0] rounded-lg font-bold text-[#202124] focus:outline-none focus:border-[#1a73e8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5f6368] mb-1">
                      Ngày lập:
                    </label>
                    <input
                      type="date"
                      value={quotationDate}
                      onChange={(e) => setQuotationDate(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-[#dadce0] rounded-lg text-[#202124] focus:outline-none focus:border-[#1a73e8]"
                    />
                  </div>
                </div>
              </div>

              {/* DÒNG BỔ SUNG: THƯƠNG HIỆU DỰ KIẾN, LOGO THƯƠNG HIỆU & ADD LINK */}
              <div className="pt-4 border-t border-[#dadce0]/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#1a73e8] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Thông tin thương hiệu dự kiến (Target Brand)</span>
                  </div>
                  {brandLink && (
                    <a
                      href={brandLink.startsWith('http') ? brandLink : `https://${brandLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#1a73e8] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Xem liên kết</span>
                    </a>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
                  {/* 1. Tên thương hiệu dự kiến */}
                  <div className="md:col-span-4 space-y-1">
                    <label className="block text-xs font-semibold text-[#5f6368]">
                      Thương hiệu dự kiến:
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Usofa Studio, MonosLiving..."
                      value={targetBrand}
                      onChange={(e) => setTargetBrand(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-[#dadce0] rounded-lg text-[#202124] font-semibold focus:outline-none focus:border-[#1a73e8] placeholder:font-normal placeholder:text-[#9aa0a6]"
                    />
                  </div>

                  {/* 2. Logo của thương hiệu */}
                  <div className="md:col-span-4 space-y-1">
                    <label className="block text-xs font-semibold text-[#5f6368]">
                      Logo của thương hiệu:
                    </label>
                    <div className="flex items-center gap-1.5">
                      {brandLogo && (
                        <div className="relative group w-8 h-8 rounded-lg border border-[#dadce0] bg-white p-0.5 shrink-0 flex items-center justify-center overflow-hidden shadow-2xs">
                          <img
                            src={brandLogo}
                            alt="Logo thương hiệu"
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => setBrandLogo('')}
                            className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            title="Xóa logo"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}

                      <input
                        type="text"
                        placeholder="Dán link logo..."
                        value={brandLogo}
                        onChange={(e) => setBrandLogo(e.target.value)}
                        className="flex-1 min-w-0 px-2.5 py-1.5 bg-white border border-[#dadce0] rounded-lg text-xs text-[#202124] focus:outline-none focus:border-[#1a73e8] placeholder:text-[#9aa0a6]"
                      />

                      <label className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-[#e8f0fe] hover:text-[#1a73e8] border border-[#dadce0] rounded-lg text-xs font-medium text-[#5f6368] transition-colors cursor-pointer shrink-0 shadow-2xs">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Tải logo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleBrandLogoUpload}
                        />
                      </label>
                    </div>
                  </div>

                  {/* 3. Add link */}
                  <div className="md:col-span-4 space-y-1">
                    <label className="block text-xs font-semibold text-[#5f6368] flex items-center gap-1">
                      <Link2 className="w-3 h-3 text-[#5f6368]" />
                      <span>Add link (Website / Tham chiếu):</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="https://..."
                        value={brandLink}
                        onChange={(e) => setBrandLink(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-[#dadce0] rounded-lg text-xs text-[#202124] focus:outline-none focus:border-[#1a73e8] placeholder:text-[#9aa0a6]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BLOCK 3: DANH MỤC & PHẠM VI CÔNG VIỆC (SCOPE OF WORK) */}
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-[#202124] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1a73e8]" />
                    <span>Danh mục các hạng mục & Phạm vi công việc thực hiện (Scope of Work)</span>
                  </label>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#e8f0fe] text-[#1a73e8] border border-[#d2e3fc]">
                    {items.filter(i => i.title.trim() !== '').length} hạng mục
                  </span>
                </div>

                {/* Danh sách các hạng mục đã thêm */}
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div 
                      key={index} 
                      className="bg-[#f8f9fa] hover:bg-[#f1f3f4]/70 p-4 sm:p-4.5 rounded-2xl border border-[#dadce0] transition-all space-y-3 shadow-2xs"
                    >
                      {/* DÒNG 1: HẠNG MỤC (Tên công việc) + Nút Xóa */}
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-full bg-[#1a73e8] text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-2xs">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Dòng 1: Tên hạng mục công việc (Bắt buộc)..."
                            value={item.title}
                            onChange={(e) => handleUpdateItem(index, 'title', e.target.value)}
                            className="w-full px-3.5 py-2 bg-white border border-[#dadce0] rounded-xl text-xs sm:text-sm font-semibold text-[#202124] focus:border-[#1a73e8] outline-hidden shadow-2xs"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(index)}
                          className="p-2 text-[#5f6368] hover:text-[#d93025] hover:bg-[#fce8e6] rounded-xl transition-colors cursor-pointer shrink-0"
                          title="Xóa hạng mục này"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* DÒNG 2: CHÚ THÍCH (Mô tả chi tiết / Diễn giải phạm vi) */}
                      <div className="flex items-start gap-2.5 pl-9">
                        <AlignLeft className="w-4 h-4 text-[#5f6368] shrink-0 mt-2" />
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Dòng 2: Chú thích / Mô tả chi tiết phạm vi thực hiện (Tùy chọn)..."
                            value={item.note || ''}
                            onChange={(e) => handleUpdateItem(index, 'note', e.target.value)}
                            className="w-full px-3.5 py-1.5 bg-white border border-[#dadce0] rounded-xl text-xs text-[#3c4043] focus:border-[#1a73e8] outline-hidden"
                          />
                        </div>
                      </div>

                      {/* DÒNG 3: HÌNH ẢNH NẾU CÓ (Link ảnh hoặc tải file ảnh lên) */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 pl-9">
                        <ImageIcon className="w-4 h-4 text-[#5f6368] shrink-0 hidden sm:block" />
                        
                        <div className="flex-1 flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Dòng 3: Dán link URL hình ảnh đính kèm (nếu có)..."
                            value={item.image || ''}
                            onChange={(e) => handleUpdateItem(index, 'image', e.target.value)}
                            className="flex-1 px-3.5 py-1.5 bg-white border border-[#dadce0] rounded-xl text-xs text-[#3c4043] focus:border-[#1a73e8] outline-hidden placeholder:text-[#9aa0a6]"
                          />

                          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#e8f0fe] hover:text-[#1a73e8] border border-[#dadce0] rounded-xl text-xs font-medium text-[#5f6368] transition-colors cursor-pointer shrink-0 shadow-2xs">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Tải ảnh</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleImageUpload(e, index)}
                            />
                          </label>

                          {item.image && (
                            <button
                              type="button"
                              onClick={() => handleUpdateItem(index, 'image', '')}
                              className="p-1.5 text-[#5f6368] hover:text-[#d93025] hover:bg-[#fce8e6] rounded-lg transition-colors cursor-pointer"
                              title="Bỏ ảnh"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        {/* Thumbnail Preview nếu có ảnh */}
                        {item.image && (
                          <div className="relative group shrink-0 self-start sm:self-center">
                            <img
                              src={item.image}
                              alt={item.title || 'Hạng mục'}
                              className="w-12 h-12 object-cover rounded-lg border border-[#dadce0] shadow-xs"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* KHỐI NHẬP HẠNG MỤC MỚI (3 DÒNG: Hạng mục, Chú thích, Hình ảnh) */}
                <div className="bg-white border-2 border-dashed border-[#1a73e8]/40 rounded-2xl p-4 sm:p-5 space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1a73e8] uppercase tracking-wider flex items-center gap-1.5">
                      <Plus className="w-4 h-4" />
                      <span>Thêm hạng mục công việc mới</span>
                    </span>
                  </div>

                  {/* Dòng 1: Hạng mục */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#202124]">
                      1. Tên hạng mục công việc <span className="text-[#d93025]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Thiết kế ý tưởng & Concept Styling 2D/3D..."
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && newTitle.trim()) {
                          e.preventDefault();
                          handleAddItem();
                        }
                      }}
                      className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#dadce0] rounded-xl text-xs sm:text-sm font-semibold text-[#202124] focus:border-[#1a73e8] focus:bg-white outline-hidden"
                    />
                  </div>

                  {/* Dòng 2: Chú thích */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#5f6368]">
                      2. Chú thích / Diễn giải phạm vi (Tùy chọn)
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Cung cấp 3 phương án 2D, phát triển 1 phương án 3D hoàn thiện..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && newTitle.trim()) {
                          e.preventDefault();
                          handleAddItem();
                        }
                      }}
                      className="w-full px-3.5 py-2 bg-[#f8f9fa] border border-[#dadce0] rounded-xl text-xs text-[#3c4043] focus:border-[#1a73e8] focus:bg-white outline-hidden"
                    />
                  </div>

                  {/* Dòng 3: Hình ảnh nếu có */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#5f6368]">
                      3. Hình ảnh đính kèm (nếu có)
                    </label>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <input
                        type="text"
                        placeholder="Dán link URL hình ảnh minh họa..."
                        value={newImage}
                        onChange={(e) => setNewImage(e.target.value)}
                        className="flex-1 px-3.5 py-2 bg-[#f8f9fa] border border-[#dadce0] rounded-xl text-xs text-[#3c4043] focus:border-[#1a73e8] focus:bg-white outline-hidden"
                      />

                      <label className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#f1f3f4] hover:bg-[#e8f0fe] hover:text-[#1a73e8] border border-[#dadce0] rounded-xl text-xs font-semibold text-[#3c4043] transition-colors cursor-pointer shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Tải ảnh từ máy</span>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e)}
                        />
                      </label>

                      {newImage && (
                        <div className="flex items-center gap-1.5 shrink-0">
                          <img
                            src={newImage}
                            alt="Preview"
                            className="w-9 h-9 object-cover rounded-lg border border-[#dadce0]"
                          />
                          <button
                            type="button"
                            onClick={() => setNewImage('')}
                            className="p-1.5 text-[#5f6368] hover:text-[#d93025] hover:bg-[#fce8e6] rounded-lg transition-colors cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={handleAddItem}
                        disabled={!newTitle.trim()}
                        className="inline-flex items-center justify-center gap-1.5 px-5 py-2 bg-[#1a73e8] hover:bg-[#1557d0] disabled:bg-[#dadce0] disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shrink-0 shadow-xs"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Thêm dòng</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BLOCK 4: GHI CHÚ & ĐIỀU KHOẢN */}
            <div className="space-y-2 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl p-5">
              <label className="text-xs font-bold text-[#202124] uppercase tracking-wide">
                Ghi chú điều khoản & Cam kết tiến độ:
              </label>
              <textarea
                rows={3}
                placeholder="Ghi chú về tiến độ bàn giao bản vẽ, quy chuẩn nghiệm thu hoặc tài trợ kỹ thuật..."
                value={packageNote}
                onChange={(e) => setPackageNote(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-[#dadce0] rounded-xl text-xs text-[#202124] focus:outline-none focus:border-[#1a73e8] leading-relaxed resize-none"
              />
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-[#dadce0] flex items-center justify-between gap-3 sticky bottom-0 bg-white z-10">
              <span className="text-xs text-[#5f6368] hidden sm:inline">
                * Hồ sơ Proposal được lưu trực tiếp cho <strong>{company.name}</strong>
              </span>

              <div className="flex items-center gap-2.5 ml-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-white hover:bg-[#f1f3f4] text-[#3c4043] border border-[#dadce0] rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleQuickExportPdf}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#e8f0fe] hover:bg-[#d2e3fc] text-[#1a73e8] border border-[#1a73e8]/30 rounded-full text-xs sm:text-sm font-bold shadow-2xs transition-all cursor-pointer"
                  title="Lưu và xuất ngay tài liệu PDF"
                >
                  <Printer className="w-4 h-4" />
                  <span>Xuất PDF</span>
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-[#1a73e8] hover:bg-[#1557d0] text-white rounded-full text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingPackage ? 'Cập nhật Proposal' : 'Lưu Proposal'}</span>
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
