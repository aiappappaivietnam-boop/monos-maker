/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Shield, Zap, Target, Layers, ChevronRight, 
  TrendingUp, Globe, MousePointer2, PieChart, 
  ArrowRight, Info, AlertTriangle, Lightbulb,
  CheckCircle2, ShoppingCart, Box, FileText, Database, Monitor, Briefcase
} from 'lucide-react';
import { useState } from 'react';

interface EcosystemOverviewProps {
  onClose: () => void;
}

export default function EcosystemOverview({ onClose }: EcosystemOverviewProps) {
  const [activeTab, setActiveTab] = useState(0);

  const chapters = [
    {
      title: "Bối Cảnh APAC",
      icon: <Globe className="w-5 h-5" />,
      content: (
        <div className="space-y-10">
          <div className="bg-[#f1f1ef] border-l-4 border-orange-500/30 p-6 rounded-r-lg">
            <p className="text-[#37352f] text-base font-medium italic">
              "E-commerce dự kiến chiếm gần 25% thị trường toàn cầu vào năm 2028."
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { t: "Đà Tăng Trưởng", d: "Bán lẻ vật lý phục hồi, nhưng E-commerce vẫn là động lực tăng trưởng cốt lõi.", i: <TrendingUp className="w-6 h-6 text-[#37352f]/40" /> },
              { t: "Độ Phức Tạp Địa Phương", d: "Khác biệt về địa lý, ngôn ngữ và tỷ lệ dân số chưa có tài khoản ngân hàng.", i: <Globe className="w-6 h-6 text-[#37352f]/40" /> },
              { t: "Nhu Cầu Mạng Lưới", d: "Sự bùng nổ của các đối tác hỗ trợ (enablers) đặc thù cho từng quốc gia.", i: <Layers className="w-6 h-6 text-[#37352f]/40" /> }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white border border-[#e9e9e8] rounded-lg hover:shadow-sm transition-shadow">
                <div className="mb-4">{item.i}</div>
                <h4 className="font-bold text-[#37352f] mb-2">{item.t}</h4>
                <p className="text-xs text-[#37352f]/60 leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Ma Trận Chẩn Đoán",
      icon: <Target className="w-5 h-5" />,
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            {[
              { t: "Mature", d: "Trung Quốc, Hàn Quốc - Bão hòa, cạnh tranh khốc liệt.", c: "bg-[#f1f1ef] text-[#37352f]" },
              { t: "Hyper Growth", d: "Việt Nam, Indonesia, Thái Lan - Tăng trưởng 2 con số.", c: "bg-[#f1f1ef] text-[#37352f]" },
              { t: "Developing", d: "Philippines, Malaysia - Đang chuyển đổi số mạnh.", c: "bg-[#f1f1ef] text-[#37352f]" },
              { t: "Emerging", d: "Thị trường ngách, tiềm năng dài hạn.", c: "bg-[#f1f1ef] text-[#37352f]" }
            ].map((item, i) => (
              <div key={i} className={`p-5 rounded-lg border border-[#e9e9e8] ${item.c}`}>
                <div className="font-bold text-sm mb-1">{item.t}</div>
                <div className="text-xs opacity-60">{item.d}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Tiến Hóa Cung Ứng",
      icon: <TrendingUp className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          {[
            { title: "Mô hình Gia Công & OEM", desc: "A thiết kế, B sản xuất, C bán hàng. Tách biệt, phụ thuộc năng lực tự thân.", icon: <Box className="w-6 h-6" /> },
            { title: "Private Label (VD: Amazon)", desc: "C tìm nhu cầu, thuê B sản xuất. A chỉ đóng vai trò đặt tên/bao bì.", icon: <FileText className="w-6 h-6" /> },
            { title: "D2C (Bán Trực Tiếp)", desc: "Bán thẳng qua web/MXH, thuê ngoài sản xuất. Khó mở rộng đa kênh.", icon: <ShoppingCart className="w-6 h-6" /> },
            { title: "Hệ Sinh Thái A-B-C", icon: <Database className="w-6 h-6" />, desc: "Hợp tác chiến lược. Chia sẻ dữ liệu trung tâm, lợi ích và khả năng nhân bản." }
          ].map((step, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 border border-[#e9e9e8] rounded-lg hover:bg-[#fbfbfa] transition-colors group">
              <div className="text-[#37352f]/40 group-hover:text-[#37352f] transition-all">{step.icon}</div>
              <div className="flex-1">
                <div className="text-sm font-bold text-[#37352f]">{step.title}</div>
                <div className="text-xs text-[#37352f]/60">{step.desc}</div>
              </div>
              <div className="text-[10px] font-bold text-[#37352f]/20 uppercase">Stage 0{idx+1}</div>
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Pillars Lõi A-B-C",
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { id: "A", t: "Thương Hiệu", items: ["Biến ý tưởng thành Brand", "Chuẩn hóa dữ liệu đa kênh", "Quản trị R&D & Thiết kế"], c: "bg-[#f1f1ef]/50 border-[#e9e9e8]" },
            { id: "B", t: "Sản Xuất", items: ["Sản xuất quy mô lớn", "Am hiểu nguyên vật liệu", "Đảm bảo chất lượng (QA)"], c: "bg-[#f1f1ef]/50 border-[#e9e9e8]" },
            { id: "C", t: "Thương Mại", items: ["Đưa sản phẩm đến tệp KH", "Nghiên cứu sàn TMĐT", "Xử lý đơn & Data hành vi"], c: "bg-[#f1f1ef]/50 border-[#e9e9e8]" }
          ].map((pillar, i) => (
            <div key={i} className={`p-6 border rounded-lg ${pillar.c}`}>
              <div className="text-2xl font-bold mb-4 opacity-40">{pillar.id}</div>
              <h4 className="font-bold text-sm mb-4 text-[#37352f]">{pillar.t}</h4>
              <ul className="space-y-2">
                {pillar.items.map((item, j) => (
                  <li key={j} className="text-[11px] text-[#37352f]/60 flex items-start gap-2">
                    <span className="mt-1 w-1 h-1 rounded-full bg-[#37352f]/20 shrink-0" />
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
      title: "Cơ Chế Vận Hành",
      icon: <Layers className="w-5 h-5" />,
      content: (
        <div className="space-y-10">
          <div className="bg-[#f1f1ef] p-8 rounded-lg text-center">
            <div className="flex justify-center -space-x-8 mb-8">
              <div className="w-24 h-24 rounded-full bg-white border border-[#37352f]/20 flex items-center justify-center font-bold text-[#37352f]/60">A</div>
              <div className="w-24 h-24 rounded-full bg-white border border-[#37352f]/20 flex items-center justify-center font-bold text-[#37352f]/60">B</div>
              <div className="w-24 h-24 rounded-full bg-white border border-[#37352f]/20 flex items-center justify-center font-bold text-[#37352f]/60">C</div>
            </div>
            <p className="text-sm font-medium text-[#37352f]/60 italic">Hợp nhất dữ liệu tại điểm giao thoa CORE</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { t: "A + B", d: "Design-to-Manufacturing (Tối ưu thiết kế cho sản xuất)." },
              { t: "B + C", d: "Đồng bộ hóa Tồn kho & Logistics địa phương." },
              { t: "A + C", d: "Tối ưu hóa Listing bằng Dữ liệu phản hồi." },
              { t: "CORE", d: "Quyết định chung về Giá, Sản lượng & Kế hoạch." }
            ].map((item, i) => (
              <div key={i} className="p-4 border border-[#e9e9e8] rounded hover:bg-[#fbfbfa] transition-colors">
                <span className="text-[10px] font-bold text-[#37352f]/30 uppercase tracking-widest block mb-1">{item.t}</span>
                <p className="text-xs font-medium text-[#37352f]/80">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Dòng Tiền & Lợi Ích",
      icon: <PieChart className="w-5 h-5" />,
      content: (
        <div className="space-y-8">
          <div className="p-8 bg-[#fbfbfa] border border-[#e9e9e8] rounded-lg">
            <h4 className="text-sm font-bold text-[#37352f] mb-8 text-center uppercase tracking-widest opacity-40">Phân bổ doanh thu</h4>
            <div className="space-y-6">
              {[
                { label: "Revenue", val: 100, c: "bg-[#37352f]" },
                { label: "Monos (IP/Brand)", val: 15, c: "bg-[#37352f]/60" },
                { label: "Pillar B (MFG)", val: 60, c: "bg-[#37352f]/40" },
                { label: "Pillar C (COM)", val: 25, c: "bg-[#37352f]/20" }
              ].map((bar, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                    <span className="opacity-40">{bar.label}</span>
                    <span>{bar.val}%</span>
                  </div>
                  <div className="h-1.5 bg-[#efefed] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${bar.val}%` }} 
                      className={`h-full ${bar.c}`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 bg-amber-50/50 border border-amber-100 rounded text-xs italic text-amber-900/60 text-center">
            Minh bạch hóa dòng tiền theo từng P&L độc lập của sản phẩm.
          </div>
        </div>
      )
    },
    {
      title: "Quản Trị Rủi Ro",
      icon: <AlertTriangle className="w-5 h-5" />,
      content: (
        <div className="space-y-3">
          {[
            { r: "Vi phạm IP", s: "Phân định quyền sở hữu dữ liệu từ đầu." },
            { r: "Biên lợi nhuận hẹp", s: "Cam kết sản lượng tối thiểu (MOQ)." },
            { r: "Trì trệ ra quyết định", s: "Cơ chế duyệt tự động theo ngưỡng (Thresholds)." },
            { r: "Rào cản địa lý", s: "Đầu tư năng lực thực thi trực tiếp." }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4 border border-[#e9e9e8] rounded-lg hover:bg-[#fbfbfa]">
              <div className="w-2 h-2 rounded-full bg-[#37352f]/20" />
              <div className="flex-1 text-sm font-medium text-[#37352f]">{item.r}</div>
              <div className="text-xs text-[#37352f]/40 font-medium italic">{item.s}</div>
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Case Study Xiaomi",
      icon: <Lightbulb className="w-5 h-5" />,
      content: (
        <div className="space-y-8">
          <div className="flex justify-center">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <div className="absolute inset-0 border border-dashed border-[#37352f]/10 rounded-full animate-spin-slow" />
              <div className="w-20 h-20 bg-[#37352f] rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg z-10">CORE</div>
              <div className="absolute top-0 w-8 h-8 bg-white border border-[#e9e9e8] rounded-full shadow-sm flex items-center justify-center text-xs">
                <Monitor className="w-4 h-4 opacity-40" />
              </div>
              <div className="absolute right-0 w-8 h-8 bg-white border border-[#e9e9e8] rounded-full shadow-sm flex items-center justify-center text-xs">
                <Lightbulb className="w-4 h-4 opacity-40" />
              </div>
              <div className="absolute bottom-0 w-8 h-8 bg-white border border-[#e9e9e8] rounded-full shadow-sm flex items-center justify-center text-xs">
                <Briefcase className="w-4 h-4 opacity-40" />
              </div>
              <div className="absolute left-0 w-8 h-8 bg-white border border-[#e9e9e8] rounded-full shadow-sm flex items-center justify-center text-xs">
                <Database className="w-4 h-4 opacity-40" />
              </div>
            </div>
          </div>
          <div className="bg-[#f1f1ef] p-6 rounded-lg text-sm text-[#37352f] leading-relaxed">
            <span className="font-bold">Lực hấp dẫn hệ sinh thái:</span> Xiaomi cung cấp nền tảng (Platform), hỗ trợ R&D và kênh bán, trong khi đối tác tập trung vào chuyên môn sản xuất.
          </div>
        </div>
      )
    },
    {
      title: "Tổng Quan Chiến Lược",
      icon: <CheckCircle2 className="w-5 h-5" />,
      content: (
        <div className="space-y-12">
          <div className="space-y-8">
            {[
              { t: "Đồng Bộ Hóa", d: "Tương lai thuộc về các tổ chức biết giới hạn phạm vi cốt lõi và tối đa hóa sự cộng tác." },
              { t: "Nguyên Tắc A-B-C", d: "A tạo tầm nhìn, B chế tác sự hoàn hảo, C nắm giữ nhịp đập thị trường." },
              { t: "Lợi Thế Tối Hậu", d: "Rút ngắn vòng đời Ý tưởng → Chế tạo → Thị trường bằng Dữ liệu khách hàng." }
            ].map((point, i) => (
              <div key={i} className="flex gap-6">
                <div className="text-3xl font-bold opacity-10">0{i+1}</div>
                <div>
                  <h4 className="font-bold text-[#37352f] mb-2">{point.t}</h4>
                  <p className="text-sm text-[#37352f]/60 leading-relaxed">{point.d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-8 bg-[#37352f] text-white rounded-lg text-center font-bold tracking-widest text-sm uppercase">
            Hợp nhất năng lực. Triệt tiêu ranh giới.
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
            <div className="text-[11px] font-bold text-[#37352f]/40 uppercase tracking-widest mb-1">Tài liệu</div>
            <h2 className="text-sm font-bold text-[#37352f]">MONOS ECOSYSTEM</h2>
          </div>
          
          {chapters.map((chapter, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveTab(idx);
                const btn = document.getElementById(`tab-${idx}`);
                btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
              }}
              id={`tab-${idx}`}
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
              <div className="w-8 h-8 bg-[#37352f] rounded flex items-center justify-center text-white font-bold text-xs">ABC</div>
              <div className="text-[10px] font-bold text-[#37352f]/30 uppercase tracking-widest leading-none">
                MÔ HÌNH HỢP NHẤT<br/>NĂNG LỰC LÕI
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

