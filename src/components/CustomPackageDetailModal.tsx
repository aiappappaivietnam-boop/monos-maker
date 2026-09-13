/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Building2, 
  FileText, 
  Edit3, 
  Trash2, 
  Printer, 
  Laptop,
  Box,
  Boxes,
  Palette,
  Hammer,
  TreePine,
  Sofa,
  Cpu,
  Megaphone,
  AlertTriangle,
  Clock,
  Link2,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Company, CustomPackage, CustomPackageItem } from '../types';

interface CustomPackageDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  pkg: CustomPackage | null;
  company: Company;
  onEdit: (pkg: CustomPackage) => void;
  onDelete: (id: string) => void;
  onExportPdf?: (pkg: CustomPackage) => void;
}

export default function CustomPackageDetailModal({
  isOpen,
  onClose,
  pkg,
  company,
  onEdit,
  onDelete,
  onExportPdf
}: CustomPackageDetailModalProps) {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  if (!isOpen || !pkg) return null;

  const getIcon = (iconName?: string) => {
    const className = "w-6 h-6 text-[#1a73e8]";
    switch (iconName) {
      case 'Laptop': return <Laptop className={className} />;
      case 'Box': return <Box className={className} />;
      case 'Boxes': return <Boxes className={className} />;
      case 'Palette': return <Palette className={className} />;
      case 'Hammer': return <Hammer className={className} />;
      case 'TreePine': return <TreePine className={className} />;
      case 'Sofa': return <Sofa className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      case 'Megaphone': return <Megaphone className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  const todayStr = pkg.quotationDate 
    ? new Date(pkg.quotationDate).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const formatPackageDateTime = (customPkg: CustomPackage) => {
    const dateSource = customPkg.updatedAt || customPkg.createdAt || customPkg.quotationDate;
    if (!dateSource) return '';
    try {
      const d = new Date(dateSource);
      if (isNaN(d.getTime())) return dateSource;
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

  const docCode = pkg.code || `PR-${company.id.toUpperCase()}-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}`;
  const expiry = pkg.expiryDays ?? 30;

  const normalizeItem = (item: string | CustomPackageItem): CustomPackageItem => {
    if (typeof item === 'string') {
      return { title: item, note: '', image: '' };
    }
    return {
      title: item.title || '',
      note: item.note || '',
      image: item.image || ''
    };
  };

  const itemsList = (pkg.items || []).map(normalizeItem);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#202124]/40 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#dadce0] overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#dadce0] bg-[#f8f9fa] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#dadce0] shadow-2xs flex items-center justify-center shrink-0">
                {getIcon(pkg.icon)}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#e8f0fe] text-[#1a73e8] border border-[#d2e3fc]">
                    {pkg.tag || 'Bespoke Custom'}
                  </span>
                  {formatPackageDateTime(pkg) && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-[#5f6368] border border-[#dadce0]">
                      <Clock className="w-3 h-3 text-[#1a73e8]" />
                      <span>{formatPackageDateTime(pkg)}</span>
                    </span>
                  )}
                  <span className="text-xs text-[#5f6368] font-medium">
                    Dành riêng cho <strong>{company.name}</strong>
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[#202124] mt-1 leading-snug">
                  {pkg.name}
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              type="button"
              className="w-9 h-9 rounded-full hover:bg-[#e8eaed] text-[#5f6368] hover:text-[#202124] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6 overflow-y-auto flex-1 text-left">
            {/* ĐẦU MỤC: ĐƠN VỊ TIẾP NHẬN (KHÁCH HÀNG / ĐỐI TÁC) & THƯƠNG HIỆU */}
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
                    <div className="px-3 py-1.5 bg-white border border-[#dadce0] rounded-lg font-bold font-mono text-[#202124] text-xs">
                      {docCode}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5f6368] mb-1">
                      Ngày lập:
                    </label>
                    <div className="px-3 py-1.5 bg-white border border-[#dadce0] rounded-lg font-bold text-[#202124] text-xs">
                      {todayStr}
                    </div>
                  </div>
                </div>
              </div>

              {/* Thông tin thương hiệu dự kiến nếu có */}
              {(pkg.targetBrand || pkg.brandLogo || pkg.brandLink) && (
                <div className="pt-3.5 border-t border-[#dadce0]/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    {pkg.brandLogo && (
                      <div className="w-10 h-10 rounded-xl border border-[#dadce0] bg-white p-1 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                        <img
                          src={pkg.brandLogo}
                          alt={pkg.targetBrand || 'Brand Logo'}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <div>
                      <div className="text-[11px] font-bold text-[#5f6368] uppercase tracking-wider">
                        Thương hiệu dự kiến:
                      </div>
                      <div className="font-bold text-sm text-[#202124]">
                        {pkg.targetBrand || company.name}
                      </div>
                    </div>
                  </div>

                  {pkg.brandLink && (
                    <a
                      href={pkg.brandLink.startsWith('http') ? pkg.brandLink : `https://${pkg.brandLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#e8f0fe] border border-[#dadce0] hover:border-[#d2e3fc] rounded-xl text-xs font-semibold text-[#1a73e8] transition-colors shadow-2xs"
                    >
                      <Link2 className="w-3.5 h-3.5" />
                      <span>Truy cập liên kết</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Scope Items with 3 lines: Title, Note, Image */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#202124] flex items-center gap-2 uppercase tracking-wide">
                <FileText className="w-4 h-4 text-[#1a73e8]" />
                <span>Phạm vi công việc chi tiết ({itemsList.length} hạng mục)</span>
              </h3>
              <div className="space-y-3">
                {itemsList.length > 0 ? (
                  itemsList.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-white border border-[#dadce0] rounded-2xl space-y-2.5 shadow-2xs hover:border-[#1a73e8]/40 transition-colors"
                    >
                      {/* Dòng 1: Hạng mục */}
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-[#202124] leading-snug">
                            {item.title}
                          </p>
                        </div>
                      </div>

                      {/* Dòng 2: Chú thích nếu có */}
                      {item.note && (
                        <div className="pl-9">
                          <p className="text-xs text-[#5f6368] leading-relaxed bg-[#f8f9fa] p-2.5 rounded-xl border border-[#e8eaed]">
                            {item.note}
                          </p>
                        </div>
                      )}

                      {/* Dòng 3: Hình ảnh nếu có */}
                      {item.image && (
                        <div className="pl-9 pt-1">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="max-h-48 sm:max-h-60 rounded-xl border border-[#dadce0] object-cover shadow-xs"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#5f6368] italic">Chưa có hạng mục nào.</p>
                )}
              </div>
            </div>

            {/* Note & Metadata */}
            {pkg.note && (
              <div className="p-4 bg-[#fef7e0]/60 border border-[#fce8b2] rounded-xl text-xs text-[#b06000] leading-relaxed">
                <strong>Ghi chú triển khai:</strong> {pkg.note}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-[#dadce0] bg-[#f8f9fa] flex items-center justify-between gap-3 shrink-0 flex-wrap">
            {isConfirmingDelete ? (
              <div className="flex items-center gap-2 bg-[#fce8e6] px-3.5 py-1.5 rounded-full border border-[#f5c2c7] animate-in fade-in zoom-in-95 duration-150">
                <AlertTriangle className="w-4 h-4 text-[#d93025] shrink-0" />
                <span className="text-xs font-bold text-[#d93025]">Xác nhận xóa gói này?</span>
                <button
                  type="button"
                  onClick={() => {
                    onDelete(pkg.id);
                    onClose();
                  }}
                  className="px-3 py-1 bg-[#d93025] hover:bg-[#b3261e] text-white text-xs font-bold rounded-full transition-colors cursor-pointer shadow-2xs"
                >
                  Xóa vĩnh viễn
                </button>
                <button
                  type="button"
                  onClick={() => setIsConfirmingDelete(false)}
                  className="px-3 py-1 bg-white hover:bg-[#f1f3f4] text-[#5f6368] text-xs font-semibold rounded-full transition-colors cursor-pointer border border-[#dadce0]"
                >
                  Hủy
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsConfirmingDelete(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#d93025] hover:bg-[#fce8e6] border border-transparent hover:border-[#d93025]/30 rounded-full transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Xóa gói</span>
              </button>
            )}

            <div className="flex items-center gap-2 ml-auto">
              {onExportPdf && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onExportPdf(pkg);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#1a73e8] bg-[#e8f0fe] hover:bg-[#d2e3fc] border border-[#d2e3fc] rounded-full transition-colors cursor-pointer shadow-2xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>Xuất PDF</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onEdit(pkg);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#202124] bg-white hover:bg-[#f1f3f4] border border-[#dadce0] rounded-full transition-colors cursor-pointer shadow-2xs"
              >
                <Edit3 className="w-4 h-4" />
                <span>Chỉnh sửa thiết kế</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 bg-[#1a73e8] hover:bg-[#1557d0] text-white text-xs font-bold rounded-full transition-all cursor-pointer shadow-xs"
              >
                Đóng
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
