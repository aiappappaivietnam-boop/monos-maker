import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, Factory, Truck, ShieldCheck, 
  Settings, Zap, BarChart3,
  Package, Cpu, CheckCircle2,
  Workflow, Layers, Microscope, Boxes
} from 'lucide-react';

interface PillarBContentProps {
  onBack?: () => void;
}

export default function PillarBContent({ onBack }: PillarBContentProps) {
  const [activeTab, setActiveTab] = useState(0);

  const chapters = [
    {
      title: "Hệ thống & Dây chuyền Sản xuất",
      icon: <Factory className="w-4 h-4" />,
      tag: "Manufacturing",
      content: (
        <div className="space-y-8">
          <div className="bg-white border border-[#dadce0] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="max-w-2xl">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-[#fef7e0] text-[#e37400] border border-[#e37400]/20 inline-block mb-2">
                Năng Lực Nhà Máy Pillar B
              </span>
              <h4 className="text-xl font-bold text-[#202124] mb-2">Nền Tảng Thực Thi & Chế Tác Hoàn Hảo</h4>
              <p className="text-sm text-[#5f6368] leading-relaxed">
                Pillar B là nền tảng sản xuất thực thi, nơi mọi thiết kế và bản vẽ kỹ thuật từ Pillar A được hiện thực hóa với độ chính xác cao nhất và chi phí gia công tối ưu nhất.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              {[
                { 
                  t: "Sản Xuất Tinh Gọn (Lean Manufacturing)", 
                  d: "Tối ưu hóa quy trình gia công, triệt tiêu lãng phí nguyên vật liệu và nâng cao năng suất từng công đoạn.", 
                  icon: <Workflow className="w-6 h-6 text-[#1a73e8]" />,
                  badge: "Lean Standard"
                },
                { 
                  t: "Công Nghệ CNC & Tự Động Hóa", 
                  d: "Hệ thống máy gia công CNC đa trục và dây chuyền sơn tự động đảm bảo tính đồng nhất tuyệt đối cho từng lô hàng.", 
                  icon: <Cpu className="w-6 h-6 text-[#e37400]" />,
                  badge: "High Precision"
                },
                { 
                  t: "Kiểm Soát Chất Lượng QC 3 Lớp", 
                  d: "Quy trình kiểm tra khắt khe từ vật liệu thô đầu vào, kiểm tra bán thành phẩm tại xưởng đến kiểm định đóng gói xuất khẩu.", 
                  icon: <ShieldCheck className="w-6 h-6 text-[#137333]" />,
                  badge: "QC 3-Layers"
                }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl flex flex-col justify-between hover:border-[#1a73e8] transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white border border-[#dadce0] flex items-center justify-center shadow-2xs">
                        {item.icon}
                      </div>
                      <span className="text-xs font-bold text-[#e37400] bg-[#fef7e0] px-2.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    </div>
                    <h5 className="font-bold text-base text-[#202124] mb-2">{item.t}</h5>
                    <p className="text-sm text-[#5f6368] leading-relaxed">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Chuỗi Cung ứng & Logistics",
      icon: <Truck className="w-4 h-4" />,
      tag: "Supply Chain",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                t: "Nguồn Nguyên Liệu Chứng Chỉ", 
                items: ["Gỗ tự nhiên & ván đạt chuẩn FSC", "Sơn & keo dán thân thiện môi trường", "Mạng lưới đối tác cung ứng ổn định"],
                icon: <Boxes className="w-6 h-6 text-[#137333]" />,
                badge: "FSC Certified",
                color: "border-[#137333]/20 bg-[#e6f4ea]/30"
              },
              { 
                t: "Quản Trị Kho Vận & WMS", 
                items: ["Hệ thống quản lý kho thông minh WMS", "Tối ưu hóa lượng tồn kho an toàn", "Bao bì Flat-pack chuẩn xuất khẩu"],
                icon: <Package className="w-6 h-6 text-[#e37400]" />,
                badge: "WMS Ready",
                color: "border-[#e37400]/20 bg-[#fef7e0]/30"
              },
              { 
                t: "Logistics Quốc Tế & Hải Quan", 
                items: ["Kết nối hãng tàu & kho CFS quốc tế", "Thủ tục thông quan xuất nhập khẩu nhanh", "Theo dõi trạng thái lô hàng thời gian thực"],
                icon: <Truck className="w-6 h-6 text-[#1a73e8]" />,
                badge: "Global Freight",
                color: "border-[#1a73e8]/20 bg-[#e8f0fe]/30"
              }
            ].map((box, i) => (
              <div key={i} className={`p-6 sm:p-8 bg-white border rounded-2xl shadow-2xs hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between ${box.color}`}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white border border-[#dadce0] flex items-center justify-center shadow-2xs">
                      {box.icon}
                    </div>
                    <span className="text-xs font-bold text-[#202124] bg-white border border-[#dadce0] px-2.5 py-0.5 rounded-full">
                      {box.badge}
                    </span>
                  </div>
                  <h5 className="font-bold text-lg text-[#202124] mb-4">{box.t}</h5>
                  <ul className="space-y-2.5 pt-2 border-t border-[#dadce0]/60">
                    {box.items.map((item, j) => (
                      <li key={j} className="text-xs text-[#3c4043] flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#137333] shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Tiêu chuẩn Chất lượng & QC",
      icon: <Microscope className="w-4 h-4" />,
      tag: "Quality Control",
      content: (
        <div className="space-y-8">
          <div className="bg-white border border-[#dadce0] rounded-2xl p-6 sm:p-8">
            <h4 className="text-lg font-bold text-[#202124] mb-2 text-center">Cam Kết Tiêu Chuẩn Xuất Khẩu Toàn Cầu</h4>
            <p className="text-sm text-[#5f6368] text-center max-w-2xl mx-auto mb-8">
              Mọi sản phẩm xuất xưởng từ Factory Pillar B đều phải đáp ứng đầy đủ các tiêu chuẩn an toàn và độ bền cơ lý khắt khe của thị trường Mỹ, EU và Nhật Bản (ISTA-3A, BIFMA, EN 12520).
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { t: "Vật Liệu An Toàn", d: "Formaldehyde E0/CARB P2" },
                { t: "Kết Cấu Bền Bỉ", d: "Chịu lực 150kg+ chu kỳ tĩnh" },
                { t: "Hoàn Thiện Tinh Xảo", d: "Bề mặt chống trầy xước" },
                { t: "Thử Thao Đóng Gói", d: "Đạt chuẩn rơi ISTA-3A" }
              ].map((item, i) => (
                <div key={i} className="p-4 bg-[#f8f9fa] border border-[#dadce0] rounded-xl text-center space-y-1">
                  <CheckCircle2 className="w-6 h-6 text-[#137333] mx-auto mb-2" />
                  <div className="font-bold text-xs text-[#202124]">{item.t}</div>
                  <div className="text-[11px] text-[#5f6368]">{item.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Hiệu quả Vận hành & Số hóa",
      icon: <BarChart3 className="w-4 h-4" />,
      tag: "Efficiency",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-6 bg-white border border-[#dadce0] rounded-2xl space-y-4">
              <h5 className="font-bold text-base text-[#202124]">Chỉ số Hiệu suất Vận hành Nhà máy</h5>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-[#202124]">
                    <span>Hiệu suất Dây chuyền OEE</span>
                    <span className="font-mono text-[#137333]">92%</span>
                  </div>
                  <div className="h-2 bg-[#f1f3f4] rounded-full overflow-hidden">
                    <div className="h-full bg-[#137333] w-[92%] rounded-full" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-[#202124]">
                    <span>Tỷ lệ lỗi thành phẩm (Defect Rate)</span>
                    <span className="font-mono text-[#1a73e8]">&lt; 0.5%</span>
                  </div>
                  <div className="h-2 bg-[#f1f3f4] rounded-full overflow-hidden">
                    <div className="h-full bg-[#1a73e8] w-[5%] rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border border-[#dadce0] rounded-2xl flex flex-col justify-center space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#fef7e0] border border-[#fce8b2] flex items-center justify-center text-[#e37400]">
                <Zap className="w-5 h-5" />
              </div>
              <h5 className="font-bold text-base text-[#202124]">Khả năng Đáp ứng Đơn hàng Linh hoạt</h5>
              <p className="text-xs text-[#5f6368] leading-relaxed">
                Dây chuyền module hóa cho phép chuyển đổi mẫu mã nhanh chóng trong vòng 48h, đáp ứng các đơn hàng MOQ linh hoạt từ đối tác.
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full pb-16">
      {/* Page Header */}
      <div className="mb-8 max-w-4xl">
        <div className="w-14 h-14 bg-white border border-[#dadce0] flex items-center justify-center rounded-2xl mb-4 shadow-2xs text-[#e37400]">
          <Factory className="w-7 h-7" />
        </div>
        <div className="flex items-center gap-2.5 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase bg-[#fef7e0] text-[#e37400] border border-[#e37400]/20">
            Năng lực Sản xuất
          </span>
          <span className="text-xs text-[#5f6368] font-mono">
            Factory, Supply Chain & QC Infrastructure
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#202124] mb-2 leading-tight">
          Pillar B — Năng lực Sản xuất & Chuỗi Cung ứng
        </h1>
        <p className="text-sm text-[#5f6368] leading-relaxed max-w-3xl">
          Nền tảng nhà máy sản xuất hiện đại, quản trị nguyên vật liệu bền vững, tự động hóa CNC và quy trình kiểm soát chất lượng đáp ứng các tiêu chuẩn xuất khẩu quốc tế.
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
                ? 'bg-[#e37400] text-white shadow-xs' 
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
