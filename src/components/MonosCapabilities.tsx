/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Shield, Zap, Target, Layers, ChevronRight, 
  Search, Cpu, Lock, Users, RefreshCw, LayoutGrid, CheckCircle2, Palette, Database
} from 'lucide-react';
import { useState } from 'react';

interface MonosCapabilitiesProps {
  onClose: () => void;
}

export default function MonosCapabilities({ onClose }: MonosCapabilitiesProps) {
  const [activeTab, setActiveTab] = useState(0);

  const chapters = [
    {
      title: "Định Vị Vai Trò",
      icon: <Target className="w-5 h-5" />,
      content: (
        <div className="space-y-10">
          <div className="bg-[#f1f1ef] border-l-4 border-blue-500/30 p-6 rounded-r-lg">
            <h4 className="text-[#37352f] font-bold mb-2">Bên Kiến Tạo Giá Trị Toàn Diện</h4>
            <p className="text-[#37352f]/70 text-sm leading-relaxed">
              A không chỉ cung cấp dịch vụ đơn lẻ. Chúng tôi là nền tảng phát triển dài hạn, chịu trách nhiệm toàn bộ quy trình chuyển hóa ý tưởng thành tài sản thương mại có sức hút và giá trị thực tiễn.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-8 border-y border-[#e9e9e8] border-dashed">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#efefed] rounded-full flex items-center justify-center text-[#37352f] mb-3">
                <Shield className="w-8 h-8 opacity-40" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#37352f]/30">Ý tưởng sơ khai</span>
            </div>
            <div className="flex-1 flex items-center gap-2">
              <div className="h-px flex-1 bg-[#e9e9e8]" />
              <div className="flex gap-2">
                {['Sáng tạo', 'Quản trị', 'Định vị'].map((step, i) => (
                  <div key={i} className="px-3 py-1.5 bg-[#efefed] text-[#37352f] text-[10px] font-bold rounded">
                    {step}
                  </div>
                ))}
              </div>
              <div className="h-px flex-1 bg-[#e9e9e8]" />
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#37352f] rounded-full flex items-center justify-center text-white mb-3">
                <LayoutGrid className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#37352f]/30">Thực thể kinh doanh</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "4 Trụ Cột Lõi",
      icon: <Layers className="w-5 h-5" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: "01", title: "Sáng Tạo & Sản Phẩm", desc: "Biến nhu cầu thị trường thành sản phẩm thực tế với bao bì và trải nghiệm tối ưu.", i: <Palette className="w-6 h-6" /> },
            { id: "02", title: "Quản Trị & Định Vị", desc: "Quản lý tính nhất quán, bảo vệ tài sản trí tuệ và thiết kế độc quyền.", i: <Shield className="w-6 h-6" /> },
            { id: "03", title: "Chuẩn Hóa Dữ Liệu", desc: "Ứng dụng công nghệ quản trị để tạo listing đa kênh và phân tích bán hàng.", i: <Database className="w-6 h-6" /> },
            { id: "04", title: "Marketing & Cộng Đồng", desc: "Xây dựng chiến lược nội dung, tạo brand awareness và cộng đồng gắn kết.", i: <Users className="w-6 h-6" /> }
          ].map((pillar, i) => (
            <div key={i} className="p-6 bg-white border border-[#e9e9e8] rounded-lg hover:bg-[#fbfbfa] transition-colors group">
              <div className="text-[#37352f]/40 group-hover:text-[#37352f] transition-all mb-4">{pillar.i}</div>
              <div className="text-[10px] font-bold text-[#37352f]/20 mb-1 uppercase tracking-widest">{pillar.id}</div>
              <h4 className="font-bold text-sm mb-2 text-[#37352f]">{pillar.title}</h4>
              <p className="text-xs text-[#37352f]/60 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Sáng Tạo Trải Nghiệm",
      icon: <Search className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="grid gap-3">
            {[
              { title: "Khai phá Cơ hội", desc: "Chủ động nghiên cứu nhu cầu và khoảng trống thị trường để định hướng phát triển." },
              { title: "Năng lực Cốt lõi", desc: "Sở hữu trực tiếp đội ngũ chuyên gia thiết kế và phát triển sản phẩm chuyên biệt." },
              { title: "Trải nghiệm Toàn diện", desc: "Chịu trách nhiệm thiết kế chi tiết sản phẩm, bao bì thẩm mỹ và hành trình khách hàng (CX)." }
            ].map((item, i) => (
              <div key={i} className="p-5 bg-white border border-[#e9e9e8] rounded flex gap-4 hover:bg-[#fbfbfa] transition-colors">
                <div className="w-8 h-8 bg-[#efefed] rounded flex items-center justify-center shrink-0 font-bold text-xs text-[#37352f]/40">{i+1}</div>
                <div>
                  <div className="font-bold text-sm text-[#37352f] mb-1">{item.title}</div>
                  <p className="text-xs text-[#37352f]/60 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Quản Trị Rủi Ro",
      icon: <Lock className="w-5 h-5" />,
      content: (
        <div className="space-y-10">
          <div className="flex justify-center">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-[#efefed] rounded-full" />
              <div className="absolute inset-4 border border-dashed border-[#e9e9e8] rounded-full" />
              <div className="w-24 h-24 bg-[#37352f] rounded-full flex items-center justify-center text-white font-bold text-[10px] text-center p-4 leading-tight shadow-lg z-10 uppercase tracking-widest">
                Giá trị cốt lõi
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { t: "Nhất quán", d: "Quản lý khắt khe hình ảnh trên mọi điểm chạm." },
              { t: "Độc quyền", d: "Bộ nhận diện mang tính duy nhất cho brand." },
              { t: "Bảo hộ IP", d: "Hàng rào pháp lý bảo vệ thiết kế và tài sản." }
            ].map((item, i) => (
              <div key={i} className="p-4 border border-[#e9e9e8] rounded text-center">
                <div className="font-bold text-[10px] uppercase mb-2 text-[#37352f]/30 tracking-widest">{item.t}</div>
                <p className="text-[10px] text-[#37352f]/60 leading-relaxed font-medium">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Vòng Lặp Tăng Trưởng",
      icon: <RefreshCw className="w-5 h-5" />,
      content: (
        <div className="space-y-10">
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: "01", t: "KHỞI TẠO", d: "Marketing & Cộng đồng", c: "bg-blue-50/50 border-blue-100" },
              { id: "02", t: "THU THẬP", d: "Dữ liệu đa kênh", c: "bg-purple-50/50 border-purple-100" },
              { id: "03", t: "PHÂN TÍCH", d: "Cải tiến sản phẩm", c: "bg-orange-50/50 border-orange-100" },
              { id: "04", t: "TÁI ĐỊNH VỊ", d: "Củng cố tài sản IP", c: "bg-green-50/50 border-green-100" }
            ].map((step, i) => (
              <div key={i} className={`p-6 border rounded-lg ${step.c} flex flex-col justify-center text-center`}>
                <div className="text-[10px] font-bold text-[#37352f]/40 mb-1 uppercase tracking-widest">{step.id}. {step.t}</div>
                <div className="text-[11px] font-medium text-[#37352f]/80">{step.d}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-[#37352f]/40 italic">Vòng lặp tối ưu hóa liên tục dựa trên dữ liệu thực thi.</p>
        </div>
      )
    },
    {
      title: "Ma Trận Giai Đoạn",
      icon: <LayoutGrid className="w-5 h-5" />,
      content: (
        <div className="overflow-x-auto rounded-lg border border-[#e9e9e8]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#fbfbfa] border-b border-[#e9e9e8]">
                <th className="p-4 text-[11px] font-bold text-[#37352f]/40 uppercase tracking-widest">Giai đoạn</th>
                <th className="p-4 text-[11px] font-bold text-[#37352f]/40 uppercase tracking-widest">Năng lực</th>
                <th className="p-4 text-[11px] font-bold text-[#37352f]/40 uppercase tracking-widest">Đầu ra</th>
              </tr>
            </thead>
            <tbody className="text-[11px]">
              <tr className="border-b border-[#e9e9e8]">
                <td className="p-4 font-bold text-[#37352f]">Hình thành</td>
                <td className="p-4 text-[#37352f]/60">Nghiên cứu thị trường & Thiết kế SP/Bao bì.</td>
                <td className="p-4 text-[#37352f] font-medium">Sản phẩm thực tế hoàn thiện.</td>
              </tr>
              <tr className="border-b border-[#e9e9e8] bg-[#fbfbfa]/50">
                <td className="p-4 font-bold text-[#37352f]">Thương mại</td>
                <td className="p-4 text-[#37352f]/60">Chuẩn hóa PIM, Listing & Marketing.</td>
                <td className="p-4 text-[#37352f] font-medium">Nhận diện rộng, bán hàng tự động.</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-[#37352f]">Bền vững</td>
                <td className="p-4 text-[#37352f]/60">Phân tích dữ liệu & Bảo hộ IP.</td>
                <td className="p-4 text-[#37352f] font-medium">IP được bảo vệ, cải tiến liên tục.</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    },
    {
      title: "Kết Luận",
      icon: <CheckCircle2 className="w-5 h-5" />,
      content: (
        <div className="space-y-12">
          <div className="space-y-8">
            <h4 className="text-3xl font-bold leading-tight text-[#37352f]">
              "A có khả năng <span className="underline decoration-blue-500/30">chuyển hóa</span> ý tưởng thành brand, dữ liệu và doanh số thực tế."
            </h4>
            <p className="text-sm text-[#37352f]/60 leading-relaxed max-w-lg">
              Kiến tạo nền tảng phát triển dài hạn. Không chỉ là khởi đầu, mà là sự bảo chứng cho thành công bền vững trên thị trường.
            </p>
          </div>
          <div className="p-8 bg-[#37352f] text-white rounded-lg text-center font-bold tracking-widest text-sm uppercase">
            Bảo chứng thành công bền vững
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
            <div className="text-[11px] font-bold text-[#37352f]/40 uppercase tracking-widest mb-1">Năng lực</div>
            <h2 className="text-sm font-bold text-[#37352f]">MONOS</h2>
          </div>
          
          {chapters.map((chapter, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveTab(idx);
                const btn = document.getElementById(`cap-tab-${idx}`);
                btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
              }}
              id={`cap-tab-${idx}`}
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
              <div className="w-8 h-8 bg-[#37352f] rounded flex items-center justify-center text-white font-bold text-xs">P_A</div>
              <div className="text-[10px] font-bold text-[#37352f]/30 uppercase tracking-widest leading-none">
                CHIẾN LƯỢC THỰC THI<br/>BẢO CHỨNG THÀNH CÔNG
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
