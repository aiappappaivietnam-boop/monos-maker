/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, Monitor, Workflow, Box, Layers, TrendingUp, CheckCircle2, AlertCircle,
  Activity, RefreshCw, Target, Zap, ArrowRight, ShieldCheck, Cpu
} from 'lucide-react';

interface FurnitureOSOverviewContentProps {
  onBack?: () => void;
}

export default function FurnitureOSOverviewContent({ onBack }: FurnitureOSOverviewContentProps) {
  const [activeTab, setActiveTab] = useState(0);

  const chapters = [
    {
      title: "Hiện trạng & Thách thức",
      icon: <AlertCircle className="w-4 h-4" />,
      tag: "Current State",
      content: (
        <div className="space-y-8">
          <div className="bg-[#fef7e0] border border-[#fce8b2] p-5 sm:p-6 rounded-2xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#e37400] text-white flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[#e37400] font-bold text-xs uppercase tracking-wider mb-1">Thách thức Vận hành Ngành Nội Thất</p>
              <p className="text-[#202124] text-sm sm:text-base font-semibold leading-relaxed">
                "Dữ liệu sản phẩm phân tán giữa các phòng ban tạo ra ma sát vận hành lớn, gây sai sót thông số kỹ thuật và chậm trễ tiến độ tiếp cận thị trường."
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { dept: "Bộ Phận Sales", issue: "Dùng catalogue & bảng giá cũ" },
              { dept: "Bộ Phận Marketing", issue: "Thiếu ảnh render 4K & Listing chuẩn" },
              { dept: "Bộ Phận Kỹ Thuật", issue: "Trả lời lặp lại bản vẽ & BOM" },
              { dept: "Sàn Thương Mại", issue: "Tắc nghẽn dữ liệu đầu vào" }
            ].map((item, i) => (
              <div key={i} className="p-5 bg-white border border-[#dadce0] rounded-2xl text-center shadow-2xs space-y-1">
                <div className="text-xs font-bold text-[#1a73e8] uppercase tracking-wider">{item.dept}</div>
                <div className="text-xs text-[#5f6368]">{item.issue}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Giải pháp Furniture OS",
      icon: <Monitor className="w-4 h-4" />,
      tag: "OS Architecture",
      content: (
        <div className="space-y-8">
          <div className="bg-white border border-[#dadce0] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="max-w-2xl">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-[#e8f0fe] text-[#1a73e8] border border-[#1a73e8]/20 inline-block mb-2">
                Hệ Điều Hành Nội Thất Chuyên Biệt
              </span>
              <h4 className="text-xl font-bold text-[#202124] mb-2">Nền Tảng Quản Trị Dữ Liệu Sản Phẩm Tập Trung (PIM)</h4>
              <p className="text-sm text-[#5f6368] leading-relaxed">
                Không phải phần mềm quản lý chung chung — Furniture OS là hệ điều hành thiết kế riêng cho đặc thù ngành nội thất, từ quản trị vật liệu, bản vẽ 3D đến chuỗi cung ứng quốc tế.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { t: "Material Matrix", d: "Quản lý bảng mã màu, chất liệu gỗ, vải, kim loại và phụ kiện đồng bộ.", icon: <Layers className="w-6 h-6 text-[#1a73e8]" /> },
                { t: "3D Digital Twin", d: "Lưu trữ file CAD, render 4K, mô hình AR và video lắp ráp hướng dẫn.", icon: <Box className="w-6 h-6 text-[#7627bb]" /> },
                { t: "Multi-Channel Export", d: "Tự động trích xuất định dạng chuẩn Amazon, Wayfair, Shopify và Shopee.", icon: <Cpu className="w-6 h-6 text-[#137333]" /> }
              ].map((box, i) => (
                <div key={i} className="p-6 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl flex flex-col justify-between hover:border-[#1a73e8] transition-all">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-white border border-[#dadce0] flex items-center justify-center mb-4 shadow-2xs">
                      {box.icon}
                    </div>
                    <h5 className="font-bold text-base text-[#202124] mb-2">{box.t}</h5>
                    <p className="text-sm text-[#5f6368] leading-relaxed">{box.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Chỉ số Chất lượng Dữ liệu",
      icon: <Activity className="w-4 h-4" />,
      tag: "Quality Metrics",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { t: "Đầy Đủ (Completeness)", v: "100%", d: "Mọi SKU đều có đầy đủ thuộc tính bắt buộc.", i: <CheckCircle2 className="w-5 h-5 text-[#137333]" /> },
              { t: "Đồng Bộ (Consistency)", v: "Real-time", d: "Dữ liệu cập nhật tức thì trên mọi điểm chạm.", i: <RefreshCw className="w-5 h-5 text-[#1a73e8]" /> },
              { t: "Chính Xác (Accuracy)", v: "99.9%", d: "Khớp hoàn toàn giữa thực tế và bản vẽ số.", i: <Target className="w-5 h-5 text-[#e37400]" /> },
              { t: "Sẵn Sàng (Usability)", v: "Plug & Play", d: "Bàn giao ngay cho bất kỳ Marketplace nào.", i: <Zap className="w-5 h-5 text-[#7627bb]" /> }
            ].map((metric, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl border border-[#dadce0] space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-[#f8f9fa] rounded-xl border border-[#dadce0]">{metric.i}</div>
                  <span className="text-lg font-black text-[#202124] font-mono">{metric.v}</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#202124] mb-1">{metric.t}</div>
                  <p className="text-[11px] text-[#5f6368] leading-relaxed">{metric.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full pb-16">
      {/* Page Header */}
      <div className="mb-8 max-w-4xl">
        <div className="w-14 h-14 bg-white border border-[#dadce0] flex items-center justify-center rounded-2xl mb-4 shadow-2xs text-[#7627bb]">
          <Database className="w-7 h-7" />
        </div>
        <div className="flex items-center gap-2.5 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase bg-[#f3e8fd] text-[#7627bb] border border-[#7627bb]/20">
            Hạ Tầng Số Hóa
          </span>
          <span className="text-xs text-[#5f6368] font-mono">
            Product Information Management & Digital Asset Core
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#202124] mb-2 leading-tight">
          Furniture OS — Nền Tảng Dữ Liệu Sản Phẩm
        </h1>
        <p className="text-sm text-[#5f6368] leading-relaxed max-w-3xl">
          Hệ thống quản trị dữ liệu sản phẩm tập trung, cầu nối số hóa xuyên suốt giữa thiết kế R&D, nhà máy sản xuất và kênh bán hàng đa quốc gia.
        </p>
      </div>

      {/* Horizontal Google Filter Chips Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-8 border-b border-[#dadce0]">
        {chapters.map((chapter, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === idx 
                ? 'bg-[#7627bb] text-white shadow-xs' 
                : 'bg-white text-[#3c4043] border border-[#dadce0] hover:bg-[#f1f3f4]'
            }`}
          >
            {chapter.icon}
            <span>{chapter.title}</span>
          </button>
        ))}
      </div>

      {/* Chapter Content View */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {chapters[activeTab].content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
