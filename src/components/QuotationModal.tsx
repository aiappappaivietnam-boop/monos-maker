/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from 'react';
import { 
  Building2, 
  ArrowLeft, 
  Printer, 
  Download, 
  Plus, 
  Trash2, 
  DollarSign, 
  FileText, 
  Check, 
  Share2, 
  Calculator, 
  Percent, 
  Sparkles,
  HelpCircle,
  Copy,
  FileSpreadsheet,
  CheckCircle2,
  Calendar,
  Layers,
  FileDown,
  Info,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { Service, Company, SelectionState } from '../types';

interface QuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company;
  allowedServices: Service[];
  selections: SelectionState;
  onSaveQuotation?: (quotationData: any) => void;
}

export interface QuotationItem {
  serviceId: string;
  name: string;
  description: string;
  unit: string;
  quantity: number;
  unitPriceVnd: number;
  note?: string;
}

export default function QuotationModal({
  isOpen,
  onClose,
  company,
  allowedServices,
  selections,
  onSaveQuotation
}: QuotationModalProps) {
  // Filter out key project items (Ecommerce A, Ecommerce B, OBM, MOD) as they cannot be priced/quoted directly
  const quotableAllowedServices = useMemo(() => {
    return allowedServices.filter(s => 
      !s.id.startsWith('eca-') && 
      !s.id.startsWith('ecb-') && 
      !s.id.startsWith('b2b-') && 
      !s.id.startsWith('mod-') &&
      s.currency !== 'CUSTOM'
    );
  }, [allowedServices]);

  // Extract configured services (either selected in current view or allowed for company)
  const initialItems = useMemo(() => {
    // 1. Prioritize selected services if any
    const selectedIds = Object.entries(selections)
      .filter(([_, val]) => val.selected)
      .map(([id]) => id);

    const targetServices = selectedIds.length > 0
      ? quotableAllowedServices.filter(s => selectedIds.includes(s.id))
      : quotableAllowedServices;

    return targetServices.map((service) => {
      const selection = selections[service.id];
      const qty = selection?.selected ? selection.quantity : (service.minimum || 1);
      
      // Default price in VND: set to 10,000,000 for all services as default
      let initialVndPrice = 10000000;
      
      // If service has a specific price defined in data, we can still check it, 
      // but user requested 10tr as default. 
      // We prioritize specific company overrides if they exist in the logic that calls this,
      // but the initialItems mapping is already using service.price which we will update in data.ts
      if (service.price && service.currency === 'VNĐ') {
        initialVndPrice = service.price;
      } else if (service.price && service.currency === 'USD') {
        initialVndPrice = service.price * 25400;
      }

      return {
        serviceId: service.id,
        name: service.name.split(' - ')[0],
        description: company.serviceNotes?.[service.id] || service.note || '',
        unit: service.unit || (service.type === 'package' ? 'Gói' : 'SKU'),
        quantity: qty || 1,
        unitPriceVnd: initialVndPrice,
        note: company.serviceNotes?.[service.id] || service.note || ''
      };
    });
  }, [quotableAllowedServices, selections, company]);

  const [items, setItems] = useState<QuotationItem[]>(initialItems);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [vatPercent, setVatPercent] = useState<number>(8);
  const [quotationCode, setQuotationCode] = useState(() => `BG-${company.id.toUpperCase()}-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}`);
  const [quotationDate, setQuotationDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [expiryDays, setExpiryDays] = useState<number>(30);
  const [terms, setTerms] = useState<string>(
    '1. Báo giá có hiệu lực trong vòng 30 ngày kể từ ngày phát hành.\n2. Tạm ứng 50% ngay sau khi ký kết phụ lục/hợp đồng triển khai; 50% còn lại thanh toán sau khi nghiệm thu từng giai đoạn.\n3. Chi phí trên chưa bao gồm các hạng mục phát sinh ngoài phạm vi mô tả kỹ thuật chuẩn.'
  );

  // Copy feedback state
  const [copyFeedback, setCopyFeedback] = useState<{ show: boolean; msg: string; type: string }>({
    show: false,
    msg: '',
    type: ''
  });
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

  // Sync initial items when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setItems(initialItems);
    }
  }, [isOpen, initialItems]);

  if (!isOpen) return null;

  const handleUpdateItem = (index: number, field: keyof QuotationItem, value: any) => {
    setItems(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleRemoveItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddItem = () => {
    setItems(prev => [
      ...prev,
      {
        serviceId: `custom-${Date.now()}`,
        name: 'Hạng mục dịch vụ mới',
        description: 'Mô tả phạm vi triển khai chi tiết',
        unit: 'Gói',
        quantity: 1,
        unitPriceVnd: 0,
        note: ''
      }
    ]);
  };

  const handleLoadSelectedOnly = () => {
    const selectedIds = Object.entries(selections)
      .filter(([_, val]) => val.selected)
      .map(([id]) => id);

    if (selectedIds.length === 0) {
      alert('Chưa có dịch vụ nào được tích chọn bên ngoài. Vui lòng tích chọn dịch vụ hoặc sử dụng danh sách hiện tại.');
      return;
    }

    const filtered = quotableAllowedServices
      .filter(s => selectedIds.includes(s.id))
      .map(service => {
        const selection = selections[service.id];
        const qty = selection?.quantity || service.minimum || 1;
        let initialVndPrice = 10000000;
        if (service.price && service.currency === 'VNĐ') {
          initialVndPrice = service.price;
        } else if (service.price && service.currency === 'USD') {
          initialVndPrice = service.price * 25400;
        }

        return {
          serviceId: service.id,
          name: service.name.split(' - ')[0],
          description: company.serviceNotes?.[service.id] || service.note || '',
          unit: service.unit || (service.type === 'package' ? 'Gói' : 'SKU'),
          quantity: qty,
          unitPriceVnd: initialVndPrice,
          note: company.serviceNotes?.[service.id] || service.note || ''
        };
      });

    setItems(filtered);
    triggerFeedback('Đã nạp ' + filtered.length + ' dịch vụ được tích chọn');
  };

  const handleLoadAll = () => {
    const all = quotableAllowedServices.map(service => {
      let initialVndPrice = 10000000;
      if (service.price && service.currency === 'VNĐ') {
        initialVndPrice = service.price;
      } else if (service.price && service.currency === 'USD') {
        initialVndPrice = service.price * 25400;
      }

      return {
        serviceId: service.id,
        name: service.name.split(' - ')[0],
        description: company.serviceNotes?.[service.id] || service.note || '',
        unit: service.unit || (service.type === 'package' ? 'Gói' : 'SKU'),
        quantity: service.minimum || 1,
        unitPriceVnd: initialVndPrice,
        note: company.serviceNotes?.[service.id] || service.note || ''
      };
    });

    setItems(all);
    triggerFeedback('Đã nạp toàn bộ ' + all.length + ' dịch vụ khả dụng');
  };

  // Calculations
  const subtotalVnd = items.reduce((sum, item) => sum + (item.quantity * item.unitPriceVnd), 0);
  const discountAmountVnd = (subtotalVnd * discountPercent) / 100;
  const afterDiscountVnd = subtotalVnd - discountAmountVnd;
  const vatAmountVnd = (afterDiscountVnd * vatPercent) / 100;
  const grandTotalVnd = afterDiscountVnd + vatAmountVnd;

  const formatVnd = (num: number) => {
    return new Intl.NumberFormat('vi-VN').format(Math.round(num)) + ' ₫';
  };

  const formatRawNumber = (num: number) => {
    return new Intl.NumberFormat('vi-VN').format(Math.round(num));
  };

  const triggerFeedback = (msg: string, type: string = 'success') => {
    setCopyFeedback({ show: true, msg, type });
    setTimeout(() => {
      setCopyFeedback(prev => ({ ...prev, show: false }));
    }, 3500);
  };

  // 1. Build TSV / Markdown Table for Clipboard
  const generateMarkdownTable = () => {
    let md = `### BÁO GIÁ DỊCH VỤ — MONOS MAKER & FURNITURE OS\n`;
    md += `**Mã số báo giá:** ${quotationCode}  |  **Ngày lập:** ${quotationDate}  |  **Hiệu lực:** ${expiryDays} ngày\n`;
    md += `**Đơn vị nhận:** ${company.name} (${company.description})\n\n`;
    md += `| STT | Hạng mục dịch vụ | Mô tả / Ghi chú | ĐVT | SL | Đơn giá (VNĐ) | Thành tiền (VNĐ) |\n`;
    md += `| :---: | :--- | :--- | :---: | :---: | ---: | ---: |\n`;

    items.forEach((item, idx) => {
      const itemTotal = item.quantity * item.unitPriceVnd;
      const cleanNote = (item.note || item.description || '-').replace(/\|/g, '-');
      md += `| ${String(idx + 1).padStart(2, '0')} | ${item.name} | ${cleanNote} | ${item.unit} | ${item.quantity} | ${formatVnd(item.unitPriceVnd)} | ${formatVnd(itemTotal)} |\n`;
    });

    md += `\n`;
    md += `- **Tổng tiền dịch vụ (Subtotal):** ${formatVnd(subtotalVnd)}\n`;
    if (discountPercent > 0) {
      md += `- **Chiết khấu (${discountPercent}%):** -${formatVnd(discountAmountVnd)}\n`;
    }
    md += `- **Thuế VAT (${vatPercent}%):** +${formatVnd(vatAmountVnd)}\n`;
    md += `- **TỔNG CỘNG THANH TOÁN (ĐÃ VAT):** **${formatVnd(grandTotalVnd)}**\n\n`;
    md += `**Điều khoản & Ghi chú:**\n${terms}\n`;
    return md;
  };

  // 2. Build Tab-Separated Values (TSV) for Excel / Google Sheets
  const generateTsvTable = () => {
    let tsv = `BÁO GIÁ DỊCH VỤ - MONOS MAKER & FURNITURE OS\n`;
    tsv += `Mã báo giá:\t${quotationCode}\tNgày lập:\t${quotationDate}\tHiệu lực:\t${expiryDays} ngày\n`;
    tsv += `Khách hàng / Đối tác:\t${company.name}\tPhân loại:\t${company.type || 'Pillar B'}\n\n`;
    tsv += `STT\tHạng mục dịch vụ\tMô tả / Ghi chú\tĐơn vị\tSố lượng\tĐơn giá (VNĐ)\tThành tiền (VNĐ)\n`;

    items.forEach((item, idx) => {
      const itemTotal = item.quantity * item.unitPriceVnd;
      const cleanNote = (item.note || item.description || '').replace(/\t/g, ' ').replace(/\n/g, ' ');
      tsv += `${idx + 1}\t${item.name}\t${cleanNote}\t${item.unit}\t${item.quantity}\t${item.unitPriceVnd}\t${itemTotal}\n`;
    });

    tsv += `\n`;
    tsv += `\t\t\t\t\tTổng tiền dịch vụ (Subtotal):\t${subtotalVnd}\n`;
    if (discountPercent > 0) {
      tsv += `\t\t\t\t\tChiết khấu (${discountPercent}%):\t-${discountAmountVnd}\n`;
    }
    tsv += `\t\t\t\t\tThuế VAT (${vatPercent}%):\t${vatAmountVnd}\n`;
    tsv += `\t\t\t\t\tTỔNG CỘNG THANH TOÁN:\t${grandTotalVnd}\n\n`;
    tsv += `Điều khoản thanh toán:\n${terms}\n`;
    return tsv;
  };

  // 3. Build Rich HTML Table (for Gmail, Word, Outlook, Google Docs)
  const generateHtmlTable = () => {
    let html = `
      <div style="font-family: Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #202124; max-width: 800px; padding: 16px;">
        <div style="border-bottom: 2px solid #1a73e8; padding-bottom: 12px; margin-bottom: 16px;">
          <h2 style="color: #1a73e8; margin: 0 0 4px 0; font-size: 20px;">BÁO GIÁ DỊCH VỤ — MONOS MAKER & FURNITURE OS</h2>
          <p style="margin: 0; font-size: 12px; color: #5f6368;">Hệ sinh thái Số hóa & Chuỗi Cung ứng Toàn cầu 2026</p>
        </div>
        
        <table style="width: 100%; font-size: 12px; margin-bottom: 16px; border-collapse: collapse;">
          <tr>
            <td style="padding: 4px 0;"><strong>Đơn vị nhận báo giá:</strong> ${company.name}</td>
            <td style="padding: 4px 0; text-align: right;"><strong>Mã báo giá:</strong> ${quotationCode}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0;"><strong>Mô tả:</strong> ${company.description}</td>
            <td style="padding: 4px 0; text-align: right;"><strong>Ngày lập:</strong> ${quotationDate} (Hiệu lực ${expiryDays} ngày)</td>
          </tr>
        </table>

        <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 16px; border: 1px solid #dadce0;">
          <thead>
            <tr style="background-color: #f1f3f4; color: #202124; border-bottom: 1px solid #dadce0;">
              <th style="padding: 10px 8px; border: 1px solid #dadce0; text-align: center; width: 40px;">STT</th>
              <th style="padding: 10px 8px; border: 1px solid #dadce0; text-align: left;">Hạng mục dịch vụ</th>
              <th style="padding: 10px 8px; border: 1px solid #dadce0; text-align: left;">Mô tả / Ghi chú</th>
              <th style="padding: 10px 8px; border: 1px solid #dadce0; text-align: center; width: 60px;">ĐVT</th>
              <th style="padding: 10px 8px; border: 1px solid #dadce0; text-align: center; width: 50px;">SL</th>
              <th style="padding: 10px 8px; border: 1px solid #dadce0; text-align: right; width: 110px;">Đơn giá (VNĐ)</th>
              <th style="padding: 10px 8px; border: 1px solid #dadce0; text-align: right; width: 120px;">Thành tiền (VNĐ)</th>
            </tr>
          </thead>
          <tbody>
    `;

    items.forEach((item, idx) => {
      const itemTotal = item.quantity * item.unitPriceVnd;
      const bg = idx % 2 === 0 ? '#ffffff' : '#f8f9fa';
      html += `
        <tr style="background-color: ${bg};">
          <td style="padding: 8px; border: 1px solid #dadce0; text-align: center;">${String(idx + 1).padStart(2, '0')}</td>
          <td style="padding: 8px; border: 1px solid #dadce0; font-weight: bold; color: #202124;">${item.name}</td>
          <td style="padding: 8px; border: 1px solid #dadce0; color: #5f6368; font-size: 11px;">${item.note || item.description || '-'}</td>
          <td style="padding: 8px; border: 1px solid #dadce0; text-align: center;">${item.unit}</td>
          <td style="padding: 8px; border: 1px solid #dadce0; text-align: center; font-weight: bold;">${item.quantity}</td>
          <td style="padding: 8px; border: 1px solid #dadce0; text-align: right;">${formatVnd(item.unitPriceVnd)}</td>
          <td style="padding: 8px; border: 1px solid #dadce0; text-align: right; font-weight: bold; color: #202124;">${formatVnd(itemTotal)}</td>
        </tr>
      `;
    });

    html += `
          </tbody>
          <tfoot>
            <tr>
              <td colspan="6" style="padding: 8px 12px; border: 1px solid #dadce0; text-align: right; font-weight: bold; color: #5f6368;">Tổng tiền dịch vụ (Subtotal):</td>
              <td style="padding: 8px 12px; border: 1px solid #dadce0; text-align: right; font-weight: bold; color: #202124;">${formatVnd(subtotalVnd)}</td>
            </tr>
    `;

    if (discountPercent > 0) {
      html += `
            <tr>
              <td colspan="6" style="padding: 8px 12px; border: 1px solid #dadce0; text-align: right; color: #137333;">Chiết khấu (${discountPercent}%):</td>
              <td style="padding: 8px 12px; border: 1px solid #dadce0; text-align: right; font-weight: bold; color: #137333;">-${formatVnd(discountAmountVnd)}</td>
            </tr>
      `;
    }

    html += `
            <tr>
              <td colspan="6" style="padding: 8px 12px; border: 1px solid #dadce0; text-align: right; color: #5f6368;">Thuế VAT (${vatPercent}%):</td>
              <td style="padding: 8px 12px; border: 1px solid #dadce0; text-align: right; font-weight: bold; color: #202124;">+${formatVnd(vatAmountVnd)}</td>
            </tr>
            <tr style="background-color: #e8f0fe;">
              <td colspan="6" style="padding: 10px 12px; border: 1px solid #dadce0; text-align: right; font-weight: bold; color: #1a73e8; font-size: 14px;">TỔNG CỘNG THANH TOÁN (ĐÃ VAT):</td>
              <td style="padding: 10px 12px; border: 1px solid #dadce0; text-align: right; font-weight: bold; color: #1a73e8; font-size: 14px;">${formatVnd(grandTotalVnd)}</td>
            </tr>
          </tfoot>
        </table>

        <div style="background-color: #f8f9fa; border: 1px solid #dadce0; border-radius: 8px; padding: 12px; font-size: 11px; color: #5f6368; line-height: 1.6;">
          <strong style="color: #202124; display: block; margin-bottom: 4px;">Điều khoản thanh toán & Lưu ý:</strong>
          ${terms.replace(/\n/g, '<br/>')}
        </div>
      </div>
    `;

    return html;
  };

  // Copy handler supporting both Multi-mime Clipboard (Rich HTML + TSV) and Plaintext
  const handleCopyClipboard = async (format: 'smart' | 'markdown' | 'tsv' = 'smart') => {
    try {
      const textMarkdown = generateMarkdownTable();
      const textTsv = generateTsvTable();
      const htmlRich = generateHtmlTable();

      if (format === 'smart') {
        if (navigator.clipboard && window.ClipboardItem) {
          const textBlob = new Blob([textTsv], { type: 'text/plain' });
          const htmlBlob = new Blob([htmlRich], { type: 'text/html' });
          await navigator.clipboard.write([
            new ClipboardItem({
              'text/plain': textBlob,
              'text/html': htmlBlob,
            })
          ]);
          triggerFeedback('Đã sao chép bảng báo giá đa năng! Dán trực tiếp vào Excel, Sheets, Docs, Word hoặc Email.');
        } else {
          await navigator.clipboard.writeText(textMarkdown);
          triggerFeedback('Đã sao chép bảng báo giá dạng văn bản bảng.');
        }
      } else if (format === 'markdown') {
        await navigator.clipboard.writeText(textMarkdown);
        triggerFeedback('Đã sao chép bảng Markdown (chuẩn ký tự bảng | STT | Dịch vụ |...).');
      } else if (format === 'tsv') {
        await navigator.clipboard.writeText(textTsv);
        triggerFeedback('Đã sao chép định dạng Tab (Paste chuẩn vào Excel / Google Sheets).');
      }
    } catch (err) {
      // Fallback
      await navigator.clipboard.writeText(generateMarkdownTable());
      triggerFeedback('Đã sao chép bảng báo giá dạng văn bản.');
    }
  };

  // Export to PDF via clean styled window.print()
  const handlePrintPdf = () => {
    window.print();
  };

  // Export to downloadable CSV / Excel file
  const handleDownloadCsv = () => {
    const tsvContent = generateTsvTable();
    // Add UTF-8 BOM so Excel opens Vietnamese characters correctly
    const blob = new Blob(['\uFEFF' + tsvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `BaoGia_${company.id.toUpperCase()}_${quotationDate}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    triggerFeedback('Đã tải xuống tệp bảng tính Báo giá (.xls)');
  };

  // Export to standalone printable HTML file
  const handleDownloadHtml = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="vi">
      <head>
        <meta charset="UTF-8">
        <title>Báo giá ${quotationCode} - ${company.name}</title>
        <style>
          body { font-family: Arial, sans-serif; background: #f8f9fa; padding: 40px 20px; }
          .container { max-width: 850px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
          @media print {
            body { background: white; padding: 0; }
            .container { box-shadow: none; padding: 0; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          ${generateHtmlTable()}
        </div>
      </body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `BaoGia_${company.id.toUpperCase()}_${quotationDate}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    triggerFeedback('Đã tải xuống tệp Báo giá HTML');
  };

  return (
    <>
      {/* Toast Notification for Clipboard / Export */}
      {copyFeedback.show && (
        <div className="fixed top-6 right-6 z-[100] animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="bg-[#202124] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 text-xs sm:text-sm font-medium">
            <div className="w-7 h-7 rounded-full bg-[#137333] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
            <span>{copyFeedback.msg}</span>
          </div>
        </div>
      )}

      {/* Main Interactive Modal */}
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto no-print">
        <div className="bg-white border border-[#dadce0] rounded-2xl w-full max-w-5xl my-auto shadow-2xl flex flex-col max-h-[94vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 border-b border-[#dadce0] bg-[#f8f9fa] gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="p-2 rounded-full text-[#5f6368] hover:text-[#202124] hover:bg-[#e8eaed] transition-colors cursor-pointer"
                title="Đóng bảng báo giá"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-lg font-bold text-[#202124] flex items-center gap-2">
                  <span>Lập & Xuất Báo Giá Dịch Vụ</span>
                  <span className="text-xs px-2.5 py-0.5 bg-[#e8f0fe] text-[#1a73e8] border border-[#d2e3fc] rounded-full font-bold">
                    VNĐ
                  </span>
                </h2>
                <p className="text-xs text-[#5f6368]">
                  Xuất PDF hoặc Sao chép bảng báo giá đối tác <span className="font-semibold text-[#202124]">{company.name}</span>
                </p>
              </div>
            </div>

            {/* Top Primary Export Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Copy to Clipboard (Smart Table) */}
              <button
                onClick={() => handleCopyClipboard('smart')}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-[#1a73e8] text-xs sm:text-sm font-bold text-[#1a73e8] rounded-full hover:bg-[#e8f0fe] transition-all shadow-2xs cursor-pointer group"
                title="Sao chép bảng báo giá để dán trực tiếp vào Excel, Google Sheets, Word, Email hoặc Zalo"
              >
                <Copy className="w-4 h-4 text-[#1a73e8] group-hover:scale-110 transition-transform" />
                <span>Sao chép bảng (Clipboard)</span>
              </button>

              {/* Export to PDF / Print */}
              <button
                onClick={handlePrintPdf}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1a73e8] text-white text-xs sm:text-sm font-bold rounded-full hover:bg-[#1557d0] transition-all shadow-xs cursor-pointer"
                title="Mở hộp thoại In / Lưu thành tệp PDF chuẩn trang in A4"
              >
                <Printer className="w-4 h-4 text-white" />
                <span>Xuất file PDF</span>
              </button>

              {/* Dropdown for More Export Formats */}
              <div className="relative">
                <button
                  onClick={() => setIsExportMenuOpen(prev => !prev)}
                  className="p-2 bg-white border border-[#dadce0] rounded-full text-[#5f6368] hover:text-[#202124] hover:bg-[#f1f3f4] transition-colors cursor-pointer"
                  title="Các tùy chọn xuất khác (Excel, Markdown, HTML)"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isExportMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-[#dadce0] rounded-2xl shadow-xl p-2 z-50 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#5f6368] px-3 py-1.5">
                      Tùy chọn sao chép & Tải về
                    </div>
                    
                    <button
                      onClick={() => {
                        handleCopyClipboard('tsv');
                        setIsExportMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#202124] hover:bg-[#f8f9fa] rounded-xl text-left transition-colors cursor-pointer"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-[#137333]" />
                      <span>Sao chép dạng bảng Excel (TSV)</span>
                    </button>

                    <button
                      onClick={() => {
                        handleCopyClipboard('markdown');
                        setIsExportMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#202124] hover:bg-[#f8f9fa] rounded-xl text-left transition-colors cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-[#1a73e8]" />
                      <span>Sao chép dạng Markdown (Chat/Docs)</span>
                    </button>

                    <hr className="border-[#dadce0] my-1" />

                    <button
                      onClick={() => {
                        handleDownloadCsv();
                        setIsExportMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#202124] hover:bg-[#f8f9fa] rounded-xl text-left transition-colors cursor-pointer"
                    >
                      <FileDown className="w-4 h-4 text-[#137333]" />
                      <span>Tải file Bảng tính (.xls / .csv)</span>
                    </button>

                    <button
                      onClick={() => {
                        handleDownloadHtml();
                        setIsExportMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#202124] hover:bg-[#f8f9fa] rounded-xl text-left transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-[#ea4335]" />
                      <span>Tải file Báo giá (.html)</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Modal Body / Quotation Sheet */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
            
            {/* Company & Meta Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl p-5">
              {/* Left: Client Info */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#5f6368]">
                  Đơn vị nhận báo giá (Khách hàng / Đối tác):
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

              {/* Right: Quotation Details */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-xs font-semibold text-[#5f6368] mb-1">
                    Mã số báo giá:
                  </label>
                  <input
                    type="text"
                    value={quotationCode}
                    onChange={(e) => setQuotationCode(e.target.value)}
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

                <div>
                  <label className="block text-xs font-semibold text-[#5f6368] mb-1">
                    Đơn vị tiền tệ:
                  </label>
                  <div className="px-3 py-1.5 bg-white border border-[#dadce0] rounded-lg font-bold text-[#202124] text-xs">
                    VNĐ (Việt Nam Đồng)
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5f6368] mb-1">
                    Hiệu lực báo giá:
                  </label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={expiryDays}
                      onChange={(e) => setExpiryDays(parseInt(e.target.value) || 0)}
                      className="w-16 px-2 py-1.5 bg-white border border-[#dadce0] rounded-lg text-center font-bold text-[#202124] focus:outline-none focus:border-[#1a73e8]"
                    />
                    <span className="text-[#5f6368] text-xs">ngày</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Table (Manual Input & Review Table) */}
            <div className="border border-[#dadce0] rounded-2xl overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#f1f3f4] border-b border-[#dadce0] text-[#5f6368] uppercase tracking-wider text-xs font-bold">
                      <th className="py-3 px-3 w-12 text-center">STT</th>
                      <th className="py-3 px-4 min-w-[220px]">Hạng mục & Dịch vụ</th>
                      <th className="py-3 px-3 w-24">Đơn vị</th>
                      <th className="py-3 px-3 w-20 text-center">Số lượng</th>
                      <th className="py-3 px-4 w-44 text-right">Đơn giá (VNĐ)</th>
                      <th className="py-3 px-4 w-40 text-right">Thành tiền (VNĐ)</th>
                      <th className="py-3 px-2 w-10 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dadce0] bg-white">
                    {items.map((item, idx) => {
                      const itemTotal = item.quantity * item.unitPriceVnd;
                      return (
                        <tr key={item.serviceId || idx} className="hover:bg-[#f8f9fa] transition-colors">
                          <td className="py-3 px-3 text-center text-[#5f6368] font-mono">
                            {String(idx + 1).padStart(2, '0')}
                          </td>
                          <td className="py-3 px-4 space-y-1">
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => handleUpdateItem(idx, 'name', e.target.value)}
                              className="w-full font-bold text-[#202124] text-xs bg-transparent border-b border-transparent hover:border-[#dadce0] focus:border-[#1a73e8] focus:bg-white focus:outline-none px-1 py-0.5 rounded"
                            />
                            <input
                              type="text"
                              value={item.note !== undefined ? item.note : item.description}
                              onChange={(e) => {
                                handleUpdateItem(idx, 'note', e.target.value);
                                handleUpdateItem(idx, 'description', e.target.value);
                              }}
                              placeholder="Nhập note / ghi chú điền tay..."
                              className="w-full text-xs text-[#5f6368] placeholder:text-[#9aa0a6] bg-[#f8f9fa] border border-[#dadce0] hover:border-[#bdc1c6] focus:border-[#1a73e8] focus:bg-white focus:outline-none px-2 py-1 rounded"
                            />
                          </td>
                          <td className="py-3 px-3">
                            <input
                              type="text"
                              value={item.unit}
                              onChange={(e) => handleUpdateItem(idx, 'unit', e.target.value)}
                              className="w-full text-center px-1.5 py-1 bg-[#f8f9fa] border border-[#dadce0] rounded text-xs font-semibold text-[#202124] focus:outline-none focus:border-[#1a73e8]"
                            />
                          </td>
                          <td className="py-3 px-3 text-center">
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleUpdateItem(idx, 'quantity', Math.max(1, parseInt(e.target.value) || 1))}
                              className="w-16 text-center px-1.5 py-1 bg-[#f8f9fa] border border-[#dadce0] rounded text-xs font-bold text-[#202124] focus:outline-none focus:border-[#1a73e8]"
                            />
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="relative">
                              <input
                                type="number"
                                step="500000"
                                min="0"
                                value={item.unitPriceVnd || ''}
                                onChange={(e) => handleUpdateItem(idx, 'unitPriceVnd', Math.max(0, parseFloat(e.target.value) || 0))}
                                placeholder="Nhập giá VNĐ..."
                                className="w-full text-right pr-2 py-1 bg-[#f8f9fa] border border-[#dadce0] rounded text-xs font-bold text-[#202124] focus:outline-none focus:border-[#1a73e8] focus:bg-white focus:ring-1 focus:ring-[#1a73e8]"
                              />
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right font-bold text-[#202124]">
                            {formatVnd(itemTotal)}
                          </td>
                          <td className="py-3 px-2 text-center">
                            <button
                              onClick={() => handleRemoveItem(idx)}
                              className="text-[#5f6368] hover:text-[#d93025] p-1 rounded-full hover:bg-[#fce8e6] transition-colors cursor-pointer"
                              title="Xóa hạng mục"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="p-3.5 bg-[#f8f9fa] border-t border-[#dadce0] flex items-center justify-between flex-wrap gap-3">
                <button
                  onClick={handleAddItem}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1a73e8] hover:text-[#1557d0] px-4 py-1.5 bg-white border border-[#dadce0] rounded-full hover:bg-[#e8f0fe] transition-colors shadow-2xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm hạng mục tự do</span>
                </button>
                <div className="text-xs text-[#5f6368]">
                  Tổng cộng <strong className="text-[#202124]">{items.length}</strong> hạng mục dịch vụ
                </div>
              </div>
            </div>

            {/* Quotation Calculation Summary & Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Terms & Conditions */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5f6368]">
                  Điều khoản thanh toán & Ghi chú triển khai:
                </label>
                <textarea
                  rows={5}
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                  className="w-full p-3.5 bg-[#f8f9fa] border border-[#dadce0] rounded-xl text-xs text-[#202124] focus:outline-none focus:border-[#1a73e8] focus:bg-white leading-relaxed resize-none"
                />
              </div>

              {/* Right: Total Summary */}
              <div className="bg-[#f8f9fa] border border-[#dadce0] rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#5f6368] pb-2 border-b border-[#dadce0]">
                  <span>Tổng tiền dịch vụ (Subtotal):</span>
                  <span className="font-bold text-[#202124]">{formatVnd(subtotalVnd)}</span>
                </div>

                {/* Discount */}
                <div className="flex items-center justify-between text-xs text-[#5f6368]">
                  <div className="flex items-center gap-2">
                    <span>Chiết khấu / Ưu đãi:</span>
                    <div className="flex items-center border border-[#dadce0] rounded-md bg-white px-1.5 py-0.5">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={discountPercent}
                        onChange={(e) => setDiscountPercent(Math.max(0, Math.min(100, parseFloat(e.target.value) || 0)))}
                        className="w-10 text-center font-bold text-[#202124] text-xs focus:outline-none"
                      />
                      <span className="text-xs text-[#5f6368]">%</span>
                    </div>
                  </div>
                  <span className="font-semibold text-[#137333]">-{formatVnd(discountAmountVnd)}</span>
                </div>

                {/* VAT */}
                <div className="flex items-center justify-between text-xs text-[#5f6368] pb-2 border-b border-[#dadce0]">
                  <div className="flex items-center gap-2">
                    <span>Thuế VAT:</span>
                    <div className="flex items-center border border-[#dadce0] rounded-md bg-white px-1.5 py-0.5">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={vatPercent}
                        onChange={(e) => setVatPercent(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="w-10 text-center font-bold text-[#202124] text-xs focus:outline-none"
                      />
                      <span className="text-xs text-[#5f6368]">%</span>
                    </div>
                  </div>
                  <span className="font-semibold text-[#202124]">{formatVnd(vatAmountVnd)}</span>
                </div>

                {/* Grand Total */}
                <div className="pt-2 flex items-baseline justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#202124] uppercase tracking-wider">Tổng giá trị thanh toán:</div>
                    <div className="text-xs text-[#5f6368] italic">Đã bao gồm VAT & chiết khấu</div>
                  </div>
                  <div className="text-2xl font-black text-[#1a73e8] tracking-tight">
                    {formatVnd(grandTotalVnd)}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-[#f8f9fa] border-t border-[#dadce0] flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 text-xs text-[#5f6368]">
              <Info className="w-4 h-4 text-[#1a73e8]" />
              <span>Nhấn <strong>"Sao chép bảng"</strong> để dán trực tiếp vào Excel/Sheets/Word hoặc <strong>"Xuất file PDF"</strong> để in/lưu.</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-[#dadce0] text-xs sm:text-sm font-semibold text-[#3c4043] rounded-full hover:bg-[#e8eaed] transition-colors cursor-pointer"
              >
                Đóng
              </button>
              <button
                onClick={() => handleCopyClipboard('smart')}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-[#1a73e8] text-xs sm:text-sm font-bold text-[#1a73e8] rounded-full hover:bg-[#e8f0fe] transition-colors cursor-pointer"
              >
                <Copy className="w-4 h-4" />
                <span>Sao chép bảng</span>
              </button>
              <button
                onClick={handlePrintPdf}
                className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#1a73e8] text-white text-xs sm:text-sm font-bold rounded-full hover:bg-[#1557d0] transition-colors shadow-xs cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Xuất PDF / In</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Printable Sheet Container (Targeted by @media print) */}
      <div id="print-root" className="hidden print:block print-page p-8 bg-white text-[#202124]">
        <div className="space-y-6 max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-[#1a73e8] pb-4">
            <div>
              <h1 className="text-2xl font-black text-[#1a73e8] tracking-tight">MONOS MAKER & FURNITURE OS</h1>
              <p className="text-xs text-[#5f6368] mt-0.5">Hệ sinh thái Số hóa & Chuỗi Cung ứng Toàn cầu 2026</p>
              <p className="text-xs text-[#5f6368]">Website: behmd.com | Email: contact@behmd.com</p>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-[#202124] block">BẢNG BÁO GIÁ DỊCH VỤ</span>
              <span className="text-xs font-mono font-bold text-[#1a73e8]">{quotationCode}</span>
            </div>
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-[#f8f9fa] p-4 rounded-xl border border-[#dadce0]">
            <div>
              <div className="text-[11px] font-bold text-[#5f6368] uppercase">Khách hàng / Đơn vị nhận:</div>
              <div className="text-sm font-bold text-[#202124] mt-0.5">{company.name}</div>
              <div className="text-xs text-[#5f6368]">{company.description}</div>
              <div className="text-xs text-[#1a73e8] mt-1 font-semibold">Phân loại: {company.type || 'Pillar B'}</div>
            </div>
            <div className="text-right space-y-1">
              <div><span className="text-[#5f6368]">Ngày lập:</span> <strong className="text-[#202124]">{quotationDate}</strong></div>
              <div><span className="text-[#5f6368]">Hiệu lực báo giá:</span> <strong className="text-[#202124]">{expiryDays} ngày</strong></div>
              <div><span className="text-[#5f6368]">Đơn vị tiền tệ:</span> <strong className="text-[#202124]">VNĐ (Việt Nam Đồng)</strong></div>
            </div>
          </div>

          {/* Table */}
          <table className="w-full text-left text-xs border-collapse border border-[#dadce0]">
            <thead>
              <tr className="bg-[#f1f3f4] text-[#202124] font-bold border-b border-[#dadce0]">
                <th className="py-2 px-2 border border-[#dadce0] text-center w-10">STT</th>
                <th className="py-2 px-3 border border-[#dadce0]">Hạng mục dịch vụ</th>
                <th className="py-2 px-3 border border-[#dadce0]">Mô tả phạm vi</th>
                <th className="py-2 px-2 border border-[#dadce0] text-center w-14">ĐVT</th>
                <th className="py-2 px-2 border border-[#dadce0] text-center w-12">SL</th>
                <th className="py-2 px-3 border border-[#dadce0] text-right w-28">Đơn giá (VNĐ)</th>
                <th className="py-2 px-3 border border-[#dadce0] text-right w-32">Thành tiền (VNĐ)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dadce0]">
              {items.map((item, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#f8f9fa]'}>
                  <td className="py-2 px-2 border border-[#dadce0] text-center font-mono">{String(idx + 1).padStart(2, '0')}</td>
                  <td className="py-2 px-3 border border-[#dadce0] font-bold text-[#202124]">{item.name}</td>
                  <td className="py-2 px-3 border border-[#dadce0] text-[#5f6368] text-[11px]">{item.note || item.description || '-'}</td>
                  <td className="py-2 px-2 border border-[#dadce0] text-center">{item.unit}</td>
                  <td className="py-2 px-2 border border-[#dadce0] text-center font-bold">{item.quantity}</td>
                  <td className="py-2 px-3 border border-[#dadce0] text-right">{formatVnd(item.unitPriceVnd)}</td>
                  <td className="py-2 px-3 border border-[#dadce0] text-right font-bold text-[#202124]">{formatVnd(item.quantity * item.unitPriceVnd)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={6} className="py-2 px-3 border border-[#dadce0] text-right font-bold text-[#5f6368]">Tổng tiền dịch vụ (Subtotal):</td>
                <td className="py-2 px-3 border border-[#dadce0] text-right font-bold text-[#202124]">{formatVnd(subtotalVnd)}</td>
              </tr>
              {discountPercent > 0 && (
                <tr>
                  <td colSpan={6} className="py-2 px-3 border border-[#dadce0] text-right text-[#137333]">Chiết khấu ({discountPercent}%):</td>
                  <td className="py-2 px-3 border border-[#dadce0] text-right font-bold text-[#137333]">-{formatVnd(discountAmountVnd)}</td>
                </tr>
              )}
              <tr>
                <td colSpan={6} className="py-2 px-3 border border-[#dadce0] text-right text-[#5f6368]">Thuế VAT ({vatPercent}%):</td>
                <td className="py-2 px-3 border border-[#dadce0] text-right font-bold text-[#202124]">+{formatVnd(vatAmountVnd)}</td>
              </tr>
              <tr className="bg-[#e8f0fe]">
                <td colSpan={6} className="py-3 px-3 border border-[#dadce0] text-right font-bold text-[#1a73e8] text-sm">TỔNG CỘNG THANH TOÁN (ĐÃ VAT):</td>
                <td className="py-3 px-3 border border-[#dadce0] text-right font-black text-[#1a73e8] text-base">{formatVnd(grandTotalVnd)}</td>
              </tr>
            </tfoot>
          </table>

          {/* Terms */}
          <div className="bg-[#f8f9fa] border border-[#dadce0] p-4 rounded-xl text-xs space-y-1">
            <div className="font-bold text-[#202124] uppercase text-[11px]">Điều khoản thanh toán & Cam kết triển khai:</div>
            <div className="text-[#5f6368] whitespace-pre-line text-[11px] leading-relaxed">{terms}</div>
          </div>

          {/* Signature Block */}
          <div className="grid grid-cols-2 gap-8 pt-8 text-center text-xs">
            <div className="space-y-16">
              <div className="font-bold text-[#202124] uppercase">ĐẠI DIỆN KHÁCH HÀNG / ĐỐI TÁC</div>
              <div className="text-xs text-[#5f6368] italic">(Ký, ghi rõ họ tên và đóng dấu)</div>
            </div>
            <div className="space-y-16">
              <div className="font-bold text-[#202124] uppercase">ĐẠI DIỆN MONOS MAKER & FURNITURE OS</div>
              <div className="text-xs text-[#5f6368] italic">(Ký, ghi rõ họ tên và đóng dấu)</div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
