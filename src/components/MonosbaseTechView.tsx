import React from 'react';
import { 
  ChevronLeft, 
  Cpu, 
  Layers, 
  Database, 
  Server, 
  ShieldCheck, 
  Target, 
  Activity,
  Workflow,
  Zap,
  Box,
  FileCode,
  Layout,
  BarChart3,
  Search,
  Globe,
  CheckCircle2
} from 'lucide-react';

interface MonosbaseTechViewProps {
  onBack: () => void;
}

export default function MonosbaseTechView({ onBack }: MonosbaseTechViewProps) {
  const modules = [
    { id: 1, name: "Nền tảng & Identity", desc: "Company, chi nhánh, nhà máy, user, role, tenant, audit" },
    { id: 2, name: "Product Catalog", desc: "Product model, SKU/variant, collection, thuộc tính động" },
    { id: 3, name: "Product Spec", desc: "Kích thước, dung sai, tải trọng, vật liệu, finish, packaging" },
    { id: 4, name: "Material & Finish", desc: "Gỗ, kim loại, vải, da, foam, sơn, phụ kiện, chứng chỉ, giá" },
    { id: 5, name: "Component & BOM", desc: "Component/layer, BOM nhiều cấp, định mức, hao hụt, drawing" },
    { id: 6, name: "R&D Lifecycle", desc: "Milestone, gate review, deliverable, owner, approver" },
    { id: 7, name: "Revision & ECO", desc: "Revision, diff, change request, approval, impact assessment" },
    { id: 8, name: "CAD/Doc/Media", desc: "Bản vẽ 2D/3D, PDF, ảnh marketing, version, metadata" },
    { id: 9, name: "RFQ & Quotes", desc: "RFQ, báo giá nhà cung cấp, MOQ, leadtime, so sánh" },
    { id: 10, name: "Costing & Pricing", desc: "Estimated/quoted/standard/actual cost, margin, variant price" },
    { id: 11, name: "ERPNext Integration", desc: "Item, variant, BOM, operation, RFQ/PO/SO, sync/retry" },
    { id: 12, name: "Production Cockpit", desc: "Work Order, Job Card, tiến độ xưởng, bottleneck, giao hàng" },
    { id: 13, name: "Quality & Compliance", desc: "Incoming/in-process/final QC, lab test, defect, NCR/CAR" },
    { id: 14, name: "Sales & Orders", desc: "Khách hàng/dự án, quotation, SO, installation, warranty" },
    { id: 15, name: "Dashboard/Reporting", desc: "Completeness, R&D, cost, RFQ, SO, production, QC" },
    { id: 16, name: "Hardening & Go-live", desc: "Security, performance, backup, UAT, migration, training" },
  ];

  const layeringPrinciples = [
    "ASP.NET Core là lớp domain và API chính, không phải proxy CRUD.",
    "ERPNext là nguồn chính cho giao dịch đã phát sinh: kho, mua, bán, sản xuất, QA và kế toán.",
    "Product OS là nguồn chính cho draft, spec, revision và ECO trước khi release.",
    "Tích hợp ERPNext qua API, webhook và background job; không sửa trực tiếp database ERPNext.",
    "CAD/media lưu tại MinIO/S3. Bắt đầu bằng modular monolith, chưa tách microservices."
  ];



  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[#dadce0] px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-[#f1f3f4] rounded-full transition-colors cursor-pointer text-[#5f6368]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#1a73e8]" />
              <h1 className="text-sm sm:text-base font-bold text-[#202124]">Technology OS: Monosbase</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-[#e8f0fe] rounded-full">
            <div className="w-2 h-2 rounded-full bg-[#1a73e8] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-wider text-[#1a73e8]">Furniture OS v1.0</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-10">
        {/* Hero Section */}
        <div className="bg-[#202124] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#1a73e8] rounded-full -mr-48 -mt-48 opacity-20 blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full backdrop-blur-sm border border-white/10 text-xs font-bold uppercase tracking-widest">
              Core Architecture
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter leading-tight uppercase">
              FURNITURE OS
            </h2>
            <p className="text-lg sm:text-xl text-white/70 max-w-3xl leading-relaxed">
              Giải pháp Product Cockpit chuyên ngành nội thất trên nền tảng ERPNext. 
              Lõi quản trị dữ liệu sản phẩm toàn diện từ thiết kế đến cung ứng.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                <ShieldCheck className="w-5 h-5 text-[#34a853]" />
                <span className="text-sm font-bold">Dữ liệu tập trung (SSoT)</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                <Workflow className="w-5 h-5 text-[#1a73e8]" />
                <span className="text-sm font-bold">Tích hợp ERPNext</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                <Zap className="w-5 h-5 text-[#fbbc04]" />
                <span className="text-sm font-bold">Làm chủ R&D Lifecycle</span>
              </div>
            </div>
          </div>
        </div>

        {/* 1. Mục tiêu & 2. Kiến trúc */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white border border-[#dadce0] rounded-3xl p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center rounded-xl">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#202124] tracking-tight uppercase">1. Mục tiêu hệ thống</h3>
            </div>
            <p className="text-sm text-[#5f6368] leading-relaxed mb-6 font-medium">
              Xây dựng hệ thống quản lý chuyên cho doanh nghiệp sản xuất nội thất: đơn giản như một <b>Product Cockpit</b>, nhưng phía sau có lõi sản xuất và giao dịch đủ mạnh.
            </p>
            <div className="bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-2xl relative">
              <div className="text-[10px] font-black text-[#1a73e8] uppercase mb-4 tracking-widest border-b border-[#dadce0] pb-2">Chuỗi giá trị dữ liệu</div>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  "Thiết kế", "Spec", "Vật liệu", "BOM", "Giá vốn", "RFQ", "Đơn hàng", "Sản xuất", "QC", "Bản vẽ", "Revision"
                ].map((step, idx) => (
                  <React.Fragment key={idx}>
                    <span className="px-2 py-1 bg-white border border-[#dadce0] rounded text-[10px] font-bold text-[#202124]">{step}</span>
                    {idx < 10 && <span className="text-[#dadce0] text-xs">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white border border-[#dadce0] rounded-3xl p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center rounded-xl">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#202124] tracking-tight uppercase">2. Kiến trúc tổng quan</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#f8f9fa] border border-[#dadce0] flex items-center justify-center shrink-0">
                  <Layout className="w-4 h-4 text-[#1a73e8]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#202124]">Frontend Layer</div>
                  <div className="text-xs text-[#5f6368]">Web / Mobile Furniture Cockpit (React/Next.js)</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#f8f9fa] border border-[#dadce0] flex items-center justify-center shrink-0">
                  <Server className="w-4 h-4 text-[#1a73e8]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#202124]">Domain API Layer</div>
                  <div className="text-xs text-[#5f6368]">ASP.NET Core Furniture Domain API (C#)</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#f8f9fa] border border-[#dadce0] flex items-center justify-center shrink-0">
                  <Database className="w-4 h-4 text-[#1a73e8]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#202124]">Data Storage Layer</div>
                  <div className="text-xs text-[#5f6368]">PostgreSQL + Redis + MinIO/S3 + Search Engine</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#f8f9fa] border border-[#dadce0] flex items-center justify-center shrink-0">
                  <Activity className="w-4 h-4 text-[#1a73e8]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#202124]">Manufacturing Core</div>
                  <div className="text-xs text-[#5f6368]">ERPNext Manufacturing Module Integration</div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* 3. Nguyên tắc phân lớp */}
        <section className="bg-white border border-[#dadce0] rounded-3xl p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-[#202124] tracking-tight uppercase">3. Nguyên tắc phân lớp</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {layeringPrinciples.map((principle, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
                <p className="text-sm font-medium text-[#5f6368]">{principle}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Các module chính */}
        <section className="bg-white border border-[#dadce0] rounded-3xl p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center rounded-xl">
              <Box className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-[#202124] tracking-tight uppercase">4. Các module chức năng chính</h3>
          </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {modules.map((m) => (
                <div key={m.id} className="p-5 bg-white border border-[#dadce0] rounded-2xl hover:border-[#1a73e8] hover:shadow-lg transition-all duration-300 group cursor-default">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black text-[#1a73e8] bg-[#e8f0fe] px-2 py-1 rounded-md">M{m.id.toString().padStart(2, '0')}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#dadce0] group-hover:bg-[#1a73e8] transition-colors" />
                  </div>
                  <div className="text-sm font-bold text-[#202124] mb-2 group-hover:text-[#1a73e8] transition-colors">{m.name}</div>
                  <p className="text-[11px] text-[#5f6368] leading-relaxed group-hover:text-[#202124] transition-colors">{m.desc}</p>
                </div>
              ))}
            </div>
        </section>

        {/* 6. Phân quyền cốt lõi */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          <section className="bg-white border border-[#dadce0] rounded-3xl p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center rounded-xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#202124] tracking-tight uppercase">5. Phân quyền cốt lõi</h3>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-[#5f6368] leading-relaxed font-medium">
                Hệ thống phân quyền đa tầng kết hợp Tenant/Company, Chi nhánh/Nhà máy, và Role nghiệp vụ chuyên sâu.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { role: "Designer", task: "Sửa draft spec, revision" },
                  { role: "Purchasing", task: "Cập nhật báo giá, RFQ" },
                  { role: "QC", task: "Ghi kết quả kiểm định, lỗi NCR" },
                  { role: "Finance", task: "Xem actual cost, lợi nhuận" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-[#f8f9fa] border border-[#dadce0] rounded-xl">
                    <span className="text-xs font-black text-[#1a73e8] uppercase">{item.role}</span>
                    <span className="text-xs font-bold text-[#202124]">{item.task}</span>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-[#fff7e0] border border-[#feefc3] rounded-xl">
                <p className="text-[10px] font-bold text-[#b06000] leading-tight">
                  Security Layer: Row-level security & Field-level security. Revision đã release không được phép sửa trực tiếp.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* 8. Công nghệ đề xuất */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          <section className="bg-white border border-[#dadce0] rounded-3xl p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center rounded-xl">
                <FileCode className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#202124] tracking-tight uppercase">6. Công nghệ đề xuất</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[9px] font-black uppercase text-[#5f6368] tracking-widest pb-1 border-b border-[#f1f3f4]">Core Backend</div>
                <ul className="space-y-1.5 text-[11px] font-bold text-[#202124]">
                  <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#1a73e8]" /> .NET Core / C# / ASP.NET Web API</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#1a73e8]" /> PostgreSQL (Relational Database)</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#1a73e8]" /> Redis / Hangfire (Background Jobs)</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#1a73e8]" /> Entity Framework Core (ORM)</li>
                </ul>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[9px] font-black uppercase text-[#5f6368] tracking-widest pb-1 border-b border-[#f1f3f4]">UI & Integration</div>
                <ul className="space-y-1.5 text-[11px] font-bold text-[#202124]">
                  <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#1a73e8]" /> React / Next.js / Tailwind CSS</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#1a73e8]" /> ERPNext REST API Integration</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#1a73e8]" /> MinIO / S3 / Azure Blob Storage</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#1a73e8]" /> SignalR (Real-time Sync)</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Note */}
        <div className="p-6 bg-[#f1f3f4] border border-[#dadce0] rounded-2xl flex items-center justify-between">
          <p className="text-xs font-bold text-[#5f6368]">© 2026 Furniture OS — Partner Brief — Confidential</p>
          <div className="flex items-center gap-4">
            <Globe className="w-4 h-4 text-[#5f6368]" />
            <BarChart3 className="w-4 h-4 text-[#5f6368]" />
            <ShieldCheck className="w-4 h-4 text-[#5f6368]" />
          </div>
        </div>
      </div>
    </div>
  );
}
