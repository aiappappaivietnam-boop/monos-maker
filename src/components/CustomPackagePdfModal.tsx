/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from 'react';
import { 
  X, 
  Printer, 
  Building2, 
  FileText,
  Link2,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Company, CustomPackage, CustomPackageItem } from '../types';

interface CustomPackagePdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  pkg: CustomPackage | null;
  company: Company;
}

export default function CustomPackagePdfModal({
  isOpen,
  onClose,
  pkg,
  company
}: CustomPackagePdfModalProps) {
  const printContentRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !pkg) return null;

  const handlePrint = () => {
    window.print();
  };

  const todayStr = pkg.quotationDate 
    ? new Date(pkg.quotationDate).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-[#202124]/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#dadce0] overflow-hidden flex flex-col max-h-[95vh]"
        >
          {/* Header - Screen Only */}
          <div className="px-6 py-4 border-b border-[#dadce0] bg-[#f8f9fa] flex items-center justify-between shrink-0 print:hidden">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#e8f0fe] border border-[#d2e3fc] flex items-center justify-center text-[#1a73e8]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#202124]">
                  Xuất Hồ Sơ Proposal (PDF)
                </h2>
                <p className="text-xs text-[#5f6368]">
                  Tài liệu đề xuất phạm vi giải pháp thiết kế cho <strong>{company.name}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a73e8] hover:bg-[#1557d0] text-white rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>In / Lưu PDF</span>
              </button>
              <button
                onClick={onClose}
                type="button"
                className="w-9 h-9 rounded-full hover:bg-[#e8eaed] text-[#5f6368] hover:text-[#202124] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Document Sheet */}
          <div className="p-6 sm:p-10 overflow-y-auto flex-1 bg-white text-left font-sans">
            <div ref={printContentRef} className="max-w-3xl mx-auto space-y-8 print:p-0 print:m-0">
              
              {/* Document Header */}
              <div className="border-b-2 border-[#1a73e8] pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className="text-2xl font-black tracking-tight text-[#1a73e8]">MONOS</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#5f6368] bg-[#f1f3f4] px-2.5 py-0.5 rounded-full">
                      Design & Architecture OS
                    </span>
                  </div>
                  <p className="text-xs text-[#5f6368]">
                    Hệ sinh thái giải pháp thiết kế & số hóa sản phẩm nội thất
                  </p>
                </div>

                <div className="text-left sm:text-right space-y-1">
                  <div className="inline-block px-3 py-1 rounded-lg bg-[#e8f0fe] text-[#1a73e8] text-xs font-bold uppercase tracking-wider border border-[#d2e3fc]">
                    HỒ SƠ ĐỀ XUẤT (PROPOSAL)
                  </div>
                  <p className="text-xs text-[#5f6368]">Ngày lập: <strong>{todayStr}</strong></p>
                  <p className="text-xs text-[#5f6368]">Mã số: <span className="font-mono uppercase font-bold text-[#202124]">{docCode}</span></p>
                </div>
              </div>

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
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#dadce0] rounded-xl text-xs font-semibold text-[#1a73e8]">
                        <Link2 className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate max-w-[240px]">{pkg.brandLink}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Proposal Overview Banner */}
              <div className="p-4 bg-[#e8f0fe]/60 border border-[#d2e3fc] rounded-2xl space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#1a73e8] text-white">
                    {pkg.tag || 'Bespoke Custom'}
                  </span>
                  <h2 className="text-base font-bold text-[#202124]">
                    {pkg.name}
                  </h2>
                </div>
                {pkg.description && (
                  <p className="text-xs text-[#5f6368] leading-relaxed">
                    {pkg.description}
                  </p>
                )}
              </div>

              {/* Scope of Work Section (3 lines format) */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#202124] uppercase tracking-wider flex items-center gap-2 pb-1 border-b border-[#dadce0]">
                  <FileText className="w-4 h-4 text-[#1a73e8]" />
                  <span>Phạm vi công việc & Danh mục thực hiện (Scope of Work)</span>
                </h3>
                
                <div className="space-y-3">
                  {itemsList.length > 0 ? (
                    itemsList.map((item, index) => (
                      <div 
                        key={index}
                        className="p-4 bg-white border border-[#dadce0] rounded-xl space-y-2 break-inside-avoid"
                      >
                        {/* Dòng 1: Hạng mục */}
                        <div className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-[#e8f0fe] text-[#1a73e8] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-[#202124] leading-snug flex-1">
                            {item.title}
                          </span>
                        </div>

                        {/* Dòng 2: Chú thích nếu có */}
                        {item.note && (
                          <div className="pl-8">
                            <p className="text-xs text-[#5f6368] leading-relaxed italic">
                              • {item.note}
                            </p>
                          </div>
                        )}

                        {/* Dòng 3: Hình ảnh nếu có */}
                        {item.image && (
                          <div className="pl-8 pt-1">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="max-h-40 rounded-lg border border-[#dadce0] object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-[#5f6368] italic">Chưa có hạng mục cụ thể.</p>
                  )}
                </div>
              </div>

              {/* Note / Terms */}
              {pkg.note && (
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-[#202124] uppercase tracking-wider pb-1 border-b border-[#dadce0]">
                    Ghi chú điều khoản & Tiến độ thực hiện
                  </h3>
                  <p className="text-xs text-[#5f6368] leading-relaxed bg-[#fef7e0]/50 border border-[#fce8b2] p-3.5 rounded-xl">
                    {pkg.note}
                  </p>
                </div>
              )}

              {/* Footer */}
              <div className="pt-6 border-t border-[#f1f3f4] text-center text-[11px] text-[#80868b]">
                Tài liệu được sinh tự động từ hệ thống Monos Ecosystem Platform • https://monosmaker.com
              </div>

            </div>
          </div>

          {/* Footer Bar - Screen Only */}
          <div className="px-6 py-4 border-t border-[#dadce0] bg-[#f8f9fa] flex items-center justify-between gap-3 shrink-0 print:hidden">
            <span className="text-xs text-[#5f6368]">
              * Bấm <strong>In / Lưu PDF</strong> để tải file PDF hoặc in trực tiếp
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                type="button"
                className="px-5 py-2 bg-white hover:bg-[#f1f3f4] text-[#3c4043] border border-[#dadce0] rounded-full text-xs font-semibold transition-colors cursor-pointer"
              >
                Đóng
              </button>
              <button
                onClick={handlePrint}
                type="button"
                className="inline-flex items-center gap-2 px-6 py-2 bg-[#1a73e8] hover:bg-[#1557d0] text-white rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>In / Lưu PDF</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
