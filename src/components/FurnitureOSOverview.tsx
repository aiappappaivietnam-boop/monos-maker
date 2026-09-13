/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Database, Cpu, LayoutGrid, ChevronRight, 
  Workflow, Box, Monitor, Globe, BarChart3, 
  CheckCircle2, AlertCircle, TrendingUp, Layers
} from 'lucide-react';
import { useState } from 'react';

interface FurnitureOSOverviewProps {
  onClose: () => void;
}

export default function FurnitureOSOverview({ onClose }: FurnitureOSOverviewProps) {
  const [activeTab, setActiveTab] = useState(0);

  const chapters = [
    {
      title: "Hiện Trạng",
      icon: <AlertCircle className="w-5 h-5" />,
      content: (
        <div className="space-y-10">
          <div className="bg-red-50/50 border-l-4 border-red-500/30 p-6 rounded-r-lg">
            <h4 className="text-red-900 font-bold mb-2 italic text-sm">"Dữ liệu phân tán tạo ra ma sát vận hành"</h4>
            <p className="text-red-800/70 text-xs leading-relaxed">
              Một SKU có quá nhiều phiên bản gây tắc nghẽn toàn chuỗi. Sales dùng thông số cũ, Marketing thiếu ảnh chuẩn, Kỹ thuật lãng phí thời gian trả lời lặp lại.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Sales', 'Marketing', 'Kỹ thuật', 'Thương mại'].map((dept, i) => (
              <div key={i} className="p-4 border border-red-100/50 rounded bg-white text-center">
                <div className="text-[10px] font-bold text-red-600/40 uppercase tracking-widest mb-1">{dept}</div>
                <div className="text-[10px] text-red-900/60 font-medium italic">Tắc nghẽn</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Đề Xuất Hệ Điều Hành",
      icon: <Monitor className="w-5 h-5" />,
      content: (
        <div className="space-y-8">
          <div className="p-10 bg-[#37352f] text-white rounded-lg relative overflow-hidden">
            <h4 className="text-3xl font-bold mb-4 relative z-10 tracking-tight">Furniture Product OS</h4>
            <p className="text-sm text-white/60 relative z-10 leading-relaxed mb-8 max-w-md">
              Không phải phần mềm PIM chung chung — Đây là hệ điều hành thiết kế riêng cho ngành nội thất, thấu hiểu đặc thù từ vật liệu đến chuỗi cung ứng.
            </p>
            <div className="flex gap-3 relative z-10">
              <div className="px-3 py-1.5 bg-white/10 rounded text-[10px] font-bold tracking-wider uppercase">Material Matrix</div>
              <div className="px-3 py-1.5 bg-white/10 rounded text-[10px] font-bold tracking-wider uppercase">Logistics Core</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Cấu Trúc 3 Lớp",
      icon: <Layers className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="flex flex-col gap-3 max-w-lg">
            {[
              { t: "Lớp Quy trình (Workflow)", d: "Ý tưởng → Mẫu → Duyệt → Kỹ thuật → Sản xuất → Bán hàng.", c: "bg-[#efefed]" },
              { t: "Lớp Bán hàng (Commercial)", d: "Listing name, mô tả, USP, margin, dữ liệu tối ưu theo thị trường.", c: "bg-orange-50/50 border-orange-100" },
              { t: "Hồ sơ Chuẩn (Product Master)", d: "Mã, tên, kích thước, vật liệu, bản vẽ, MOQ, lead time.", c: "bg-blue-50/50 border-blue-100" }
            ].map((layer, i) => (
              <div key={i} className={`p-6 rounded-lg border border-transparent ${layer.c} group hover:border-[#e9e9e8] transition-all`}>
                <div className="font-bold text-[10px] uppercase mb-2 tracking-widest text-[#37352f]/40">{layer.t}</div>
                <p className="text-xs text-[#37352f] font-medium leading-relaxed">{layer.d}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Digital Twin Anatomy",
      icon: <Box className="w-5 h-5" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { t: "Định danh & Phân loại", items: ["Mã / SKU", "Nhóm / Collection", "Thiết kế & Phiên bản"], c: "text-[#37352f]" },
            { t: "Kỹ thuật & Cấu tạo", items: ["Kích thước / Vật liệu", "Bản vẽ kỹ thuật", "Hướng dẫn lắp ráp"], c: "text-[#37352f]" },
            { t: "Logistics & Sản xuất", items: ["Trọng lượng / Carton", "MOQ & Lead time", "Quy cách đóng gói"], c: "text-[#37352f]" },
            { t: "Thương mại & Trạng thái", items: ["Kênh bán & Thị trường", "Lịch sử cập nhật", "Giá niêm yết"], c: "text-[#37352f]" }
          ].map((group, i) => (
            <div key={i} className="p-6 bg-[#fbfbfa] border border-[#e9e9e8] rounded-lg">
              <div className={`text-[10px] font-bold ${group.c} mb-4 uppercase tracking-widest opacity-30`}>{group.t}</div>
              <ul className="space-y-3">
                {group.items.map((item, j) => (
                  <li key={j} className="text-xs text-[#37352f]/60 flex items-center gap-2 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#37352f]/10" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Vòng Đời Dữ Liệu",
      icon: <Workflow className="w-5 h-5" />,
      content: (
        <div className="space-y-12">
          <div className="flex justify-between items-center px-4 relative">
            <div className="absolute left-0 right-0 h-px bg-[#e9e9e8] top-1/2 -z-10" />
            {['Idea', 'Sample', 'Tech', 'Prod', 'Market'].map((stage, i) => (
              <div key={i} className="flex flex-col items-center bg-white p-2">
                <div className="w-2.5 h-2.5 bg-[#37352f] rounded-full mb-2" />
                <span className="text-[10px] font-bold text-[#37352f]/40 uppercase tracking-tighter">{stage}</span>
              </div>
            ))}
          </div>
          <div className="bg-[#f1f1ef] p-6 rounded-lg text-center text-xs text-[#37352f]/60 font-medium italic">
            "Tự động hóa việc phân quyền, quản lý phiên bản và lưu trữ lịch sử ở mọi giai đoạn."
          </div>
        </div>
      )
    },
    {
      title: "Lộ Trình Nâng Cấp",
      icon: <TrendingUp className="w-5 h-5" />,
      content: (
        <div className="space-y-3">
          {[
            { s: "Giai đoạn 01", t: "Data Audit & Architecture", d: "Rà soát nguồn dữ liệu, thiết kế Product Master." },
            { s: "Giai đoạn 02", t: "MVP Platform", d: "Cấu hình danh mục, quản lý file, version control." },
            { s: "Giai đoạn 03", t: "Commercial Layer", d: "Tạo content listing, tối ưu bàn giao cho Pillar C." },
            { s: "Giai đoạn 04", t: "Intelligence & Integration", d: "Dashboard phân tích, tích hợp API/ERP & AI." }
          ].map((item, i) => (
            <div key={i} className="flex gap-6 p-5 border border-[#e9e9e8] rounded-lg hover:bg-[#fbfbfa] transition-colors items-center">
              <div className="text-3xl font-bold text-[#37352f]/10">0{i+1}</div>
              <div>
                <div className="text-[9px] font-bold text-[#37352f]/30 uppercase tracking-widest mb-1">{item.s}</div>
                <div className="font-bold text-sm text-[#37352f] mb-1">{item.t}</div>
                <div className="text-xs text-[#37352f]/60 leading-tight">{item.d}</div>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Tầm Nhìn",
      icon: <CheckCircle2 className="w-5 h-5" />,
      content: (
        <div className="space-y-12">
          <div className="space-y-8">
            <h4 className="text-3xl font-bold leading-tight text-[#37352f]">
              "Biến toàn bộ danh mục thành một hệ sinh thái <span className="underline decoration-[#37352f]/10">dữ liệu tự động</span> vận hành."
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-[#fbfbfa] border border-[#e9e9e8] rounded-lg">
                <div className="text-[10px] font-bold text-[#37352f]/30 uppercase tracking-widest mb-2">Tài sản độc lập</div>
                <p className="text-xs text-[#37352f]/60 leading-relaxed font-medium">Nền tảng phát triển thành tài sản công nghệ riêng biệt.</p>
              </div>
              <div className="p-6 bg-[#fbfbfa] border border-[#e9e9e8] rounded-lg">
                <div className="text-[10px] font-bold text-[#37352f]/30 uppercase tracking-widest mb-2">Chuẩn mực ngành</div>
                <p className="text-xs text-[#37352f]/60 leading-relaxed font-medium">Ứng dụng tại NTC sẽ trở thành chuẩn mực hệ thống.</p>
              </div>
            </div>
          </div>
          <div className="p-8 bg-[#37352f] text-white rounded-lg text-center font-bold tracking-widest text-sm uppercase">
            MONOBASE FURNITURE EDITION
          </div>
        </div>
      )
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-12 bg-[#0F0F0F]/30 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.98, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.98, y: 20 }}
        className="bg-white w-full max-w-5xl h-full md:h-auto md:max-h-[90vh] overflow-hidden md:rounded-lg shadow-[0_12px_40px_rgba(15,15,15,0.2)] flex flex-col md:flex-row relative border border-[#e9e9e8]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Close Button - Fixed */}
        <button
          onClick={onClose}
          className="md:hidden absolute top-3 right-3 z-[60] p-2 bg-black/5 backdrop-blur-md text-[#37352f] rounded-full shadow-sm active:scale-90 transition-transform"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 bg-[#fbfbfa] border-r border-[#e9e9e8] p-3 md:p-6 flex-shrink-0 flex md:flex-col overflow-x-auto md:overflow-y-auto no-scrollbar gap-1 md:gap-0.5 sticky top-0 z-20 shadow-sm md:shadow-none">
          <div className="hidden md:block mb-6 px-3">
            <div className="text-[11px] font-bold text-[#37352f]/40 uppercase tracking-widest mb-1">Hệ điều hành</div>
            <h2 className="text-sm font-bold text-[#37352f]">FURNITURE OS</h2>
          </div>
          
          {chapters.map((chapter, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveTab(idx);
                const btn = document.getElementById(`fos-tab-${idx}`);
                btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
              }}
              id={`fos-tab-${idx}`}
              className={`
                flex items-center gap-2 md:gap-2 px-3 py-1.5 rounded transition-all whitespace-nowrap md:whitespace-normal text-left shrink-0
                ${activeTab === idx 
                  ? 'bg-[#efefed] text-[#37352f]' 
                  : 'text-[#37352f]/60 hover:bg-[#efefed]/50'}
              `}
            >
              <span className={`shrink-0 ${activeTab === idx ? 'opacity-100' : 'opacity-40'}`}>
                {chapter.icon}
              </span>
              <span className="text-sm font-medium">{chapter.title}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 md:p-16 relative flex flex-col min-h-0 bg-white">
          <button
            onClick={onClose}
            className="hidden md:block absolute top-8 right-8 p-2 rounded hover:bg-[#efefed] transition-colors"
          >
            <X className="w-5 h-5 text-[#37352f]/40" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex-1"
            >
              <div className="text-[11px] font-bold text-[#37352f]/30 uppercase tracking-[0.3em] mb-4">CHƯƠNG 0{activeTab + 1}</div>
              <h3 className="text-3xl font-bold text-[#37352f] mb-8 leading-tight">
                {chapters[activeTab].title}
              </h3>
              
              <div className="prose prose-sm max-w-none pb-12">
                {chapters[activeTab].content}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Footer Info */}
          <div className="mt-auto pt-8 border-t border-[#e9e9e8] flex items-center justify-between sticky bottom-0 bg-white pb-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#37352f] rounded flex items-center justify-center text-white font-bold text-xs">F_OS</div>
              <div className="text-[10px] font-bold text-[#37352f]/30 uppercase tracking-widest leading-none">
                ĐỘNG CƠ THƯƠNG MẠI<br/>NGÀNH NỘI THẤT
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                disabled={activeTab === 0}
                onClick={() => setActiveTab(prev => prev - 1)}
                className="p-2 rounded border border-[#e9e9e8] text-[#37352f]/40 disabled:opacity-20 hover:bg-[#efefed] transition-colors"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>
              <button 
                disabled={activeTab === chapters.length - 1}
                onClick={() => setActiveTab(prev => prev + 1)}
                className="p-2 rounded border border-[#e9e9e8] text-[#37352f]/40 disabled:opacity-20 hover:bg-[#efefed] transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
