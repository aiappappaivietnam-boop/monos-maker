/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Printer, 
  X, 
  FileText, 
  Layers, 
  CheckCircle2, 
  Download, 
  Sparkles, 
  Building2, 
  HelpCircle, 
  ExternalLink,
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { Service, Company } from '../types';
import { exportScopeToPdf, exportMasterScopeToPdf } from '../lib/exportScopePdf';

interface ScopePdfExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  allServices: Service[];
  currentService?: Service | null;
  selectedCompany?: Company | null;
}

export default function ScopePdfExportModal({
  isOpen,
  onClose,
  allServices,
  currentService,
  selectedCompany
}: ScopePdfExportModalProps) {
  const [exportMode, setExportMode] = useState<'master' | 'single'>(currentService ? 'single' : 'master');
  const [selectedServiceId, setSelectedServiceId] = useState<string>(currentService?.id || allServices[0]?.id || 'furniture-development');
  const [companyName, setCompanyName] = useState<string>(selectedCompany?.name || 'Quý Khách Hàng / Đối Tác');
  const [customTitle, setCustomTitle] = useState<string>('');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(true);

  if (!isOpen) return null;

  const targetService = allServices.find(s => s.id === selectedServiceId) || currentService || allServices[0];

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      if (exportMode === 'master') {
        exportMasterScopeToPdf(allServices, {
          companyName: companyName.trim() || undefined,
          customTitle: customTitle.trim() || undefined
        });
      } else if (targetService) {
        exportScopeToPdf(targetService, {
          companyName: companyName.trim() || undefined,
          customTitle: customTitle.trim() || undefined
        });
      }
      setIsExporting(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white border border-[#dadce0] rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden my-8"
        >
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-[#1a73e8] to-[#185abc] text-white px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-xs shadow-inner">
                <Printer className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight text-white">Xuất Toàn Bộ Phạm Vi Công Việc Ra PDF</h3>
                <p className="text-xs text-blue-100 font-medium">Bản chuẩn mô tả SOW chi tiết 100% trang, phụ lục & tiêu chuẩn kỹ thuật</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/20 text-white/90 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-7 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Step 1: Choose Export Scope Mode */}
            <div>
              <label className="text-xs font-bold text-[#202124] uppercase tracking-wider block mb-2">
                1. Chọn phạm vi tài liệu cần xuất
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Master SOW Option */}
                <button
                  type="button"
                  onClick={() => setExportMode('master')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
                    exportMode === 'master'
                      ? 'border-[#1a73e8] bg-[#e8f0fe]/60 ring-2 ring-[#1a73e8]/20'
                      : 'border-[#dadce0] bg-white hover:border-[#bdc1c6] hover:bg-[#f8f9fa]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Layers className={`w-4 h-4 ${exportMode === 'master' ? 'text-[#1a73e8]' : 'text-[#5f6368]'}`} />
                      <span className="text-sm font-bold text-[#202124]">Toàn bộ Hệ Sinh Thái (Master SOW)</span>
                    </div>
                    {exportMode === 'master' && (
                      <CheckCircle2 className="w-4 h-4 text-[#1a73e8]" />
                    )}
                  </div>
                  <p className="text-xs text-[#5f6368] leading-relaxed">
                    Tổng hợp toàn bộ tất cả các trang: Thiết kế R&D, Xây trung tâm R&D, Brand, Marketing AI, Monosbase OS, Multi-Agent & Danh mục sản phẩm.
                  </p>
                  <div className="mt-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-[#1a73e8] text-[11px] font-semibold">
                    Đầy đủ 8 Modules & Tiêu chuẩn
                  </div>
                </button>

                {/* Single Module Option */}
                <button
                  type="button"
                  onClick={() => setExportMode('single')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
                    exportMode === 'single'
                      ? 'border-[#1a73e8] bg-[#e8f0fe]/60 ring-2 ring-[#1a73e8]/20'
                      : 'border-[#dadce0] bg-white hover:border-[#bdc1c6] hover:bg-[#f8f9fa]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText className={`w-4 h-4 ${exportMode === 'single' ? 'text-[#1a73e8]' : 'text-[#5f6368]'}`} />
                      <span className="text-sm font-bold text-[#202124]">Theo từng Dịch vụ / Module</span>
                    </div>
                    {exportMode === 'single' && (
                      <CheckCircle2 className="w-4 h-4 text-[#1a73e8]" />
                    )}
                  </div>
                  <p className="text-xs text-[#5f6368] leading-relaxed">
                    Xuất riêng tài liệu phạm vi công việc chuyên sâu cho một module giải pháp hoặc danh mục sản phẩm cụ thể.
                  </p>
                  <div className="mt-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-[#5f6368] text-[11px] font-semibold">
                    Tùy chọn từng giải pháp
                  </div>
                </button>
              </div>
            </div>

            {/* If Single mode, choose module */}
            {exportMode === 'single' && (
              <div className="p-4 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl space-y-2">
                <label className="text-xs font-bold text-[#3c4043] block">
                  Chọn dịch vụ / giải pháp cần in:
                </label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#dadce0] rounded-xl text-sm font-medium text-[#202124] focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                >
                  {allServices.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Step 2: Information Configuration */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-[#202124] uppercase tracking-wider block">
                2. Thông tin đơn vị tiếp nhận & Tiêu đề
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-xs text-[#5f6368] block mb-1">Tên Đối tác / Đơn vị tiếp nhận:</span>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Ví dụ: Công ty Cổ Phần Nội Thất ABC..."
                    className="w-full px-3.5 py-2 bg-white border border-[#dadce0] rounded-xl text-sm text-[#202124] focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>
                <div>
                  <span className="text-xs text-[#5f6368] block mb-1">Tiêu đề tùy chỉnh (tùy chọn):</span>
                  <input
                    type="text"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder="Để trống để dùng tiêu đề mặc định"
                    className="w-full px-3.5 py-2 bg-white border border-[#dadce0] rounded-xl text-sm text-[#202124] focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Crucial Print Instructions for 100% Full Multi-Page Export */}
            <div className="bg-gradient-to-br from-[#f8f9fa] to-[#e8f0fe]/40 border border-[#d2e3fc] rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#1a73e8]" />
                  <span className="text-xs font-bold text-[#1a73e8] uppercase tracking-wider">
                    Hướng dẫn xuất đủ 100% nội dung tất cả các trang
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowGuide(!showGuide)}
                  className="text-xs text-[#1a73e8] hover:underline cursor-pointer"
                >
                  {showGuide ? 'Thu gọn' : 'Xem chi tiết'}
                </button>
              </div>

              {showGuide && (
                <div className="space-y-2 text-xs text-[#3c4043] leading-relaxed">
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#1a73e8] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</div>
                    <div>Khi nhấn nút bên dưới, cửa sổ tài liệu in sẽ mở ra và tự động kích hoạt hộp thoại in trình duyệt.</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#1a73e8] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</div>
                    <div>Tại mục <strong>Máy in đích (Destination)</strong>: Chọn <strong>"Lưu dưới dạng PDF" (Save as PDF)</strong>.</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#1a73e8] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</div>
                    <div>Tại mục <strong>Trang (Pages)</strong>: Chọn <strong>"Tất cả" (All)</strong> để xuất toàn bộ các trang không bị ngắt quãng.</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#1a73e8] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">4</div>
                    <div>
                      Tại <strong>Cài đặt khác (More settings)</strong>: Tích chọn <strong>"Đồ họa nền" (Background graphics)</strong> để hiển thị chuẩn nét màu sắc, thẻ tag và bảng biểu.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="px-6 py-4 bg-[#f8f9fa] border-t border-[#dadce0] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-[#5f6368] text-center sm:text-left">
              Định dạng chuẩn A4 • Bố cục tối ưu in ấn • Tự động ngắt trang
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2 text-sm font-semibold text-[#5f6368] hover:text-[#202124] hover:bg-[#dadce0]/50 rounded-full transition-colors cursor-pointer text-center"
              >
                Đóng
              </button>

              <button
                type="button"
                onClick={handleExport}
                disabled={isExporting}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1a73e8] hover:bg-[#1557d0] active:scale-[0.98] text-white rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
              >
                <Printer className="w-4 h-4" />
                <span>{isExporting ? 'Đang tạo tài liệu...' : (exportMode === 'master' ? 'Xuất Toàn Bộ Master SOW (PDF)' : 'Xuất PDF Module')}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
