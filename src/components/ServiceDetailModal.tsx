/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { X, CheckCircle2, ListChecks, Target, MoreHorizontal, Maximize2, Share2, FileText, Monitor } from 'lucide-react';
import { Service } from '../types';

interface ServiceDetailModalProps {
  service: Service;
  onClose: () => void;
}

export default function ServiceDetailModal({ service, onClose }: ServiceDetailModalProps) {
  if (!service.details) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-12 bg-[#0F0F0F]/30 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.98, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.98, y: 20 }}
        className="bg-white w-full max-w-4xl h-full max-h-[90vh] overflow-hidden rounded-lg shadow-[0_12px_40px_rgba(15,15,15,0.2)] flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Notion Modal Header / Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-[#e9e9e8] text-[#37352f]/40">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="p-1 hover:bg-[#efefed] rounded transition-colors">
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-xs">
              <span className="hover:text-[#37352f] cursor-pointer">Monos</span>
              <span>/</span>
              <span className="hover:text-[#37352f] cursor-pointer truncate max-w-[150px]">{service.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-2 py-1 hover:bg-[#efefed] rounded text-xs font-medium transition-colors">
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
            <button className="p-1 hover:bg-[#efefed] rounded transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Cover Image or Placeholder */}
          {service.image ? (
            <div className="w-full bg-[#FBFBFA] border-b border-[#e9e9e8] flex items-center justify-center px-10 md:px-20 pt-8 pb-4">
              {service.image.startsWith('http') && !service.image.match(/\.(mp4|webm|ogg|mov|jpg|jpeg|png|gif|webp|svg)$/i) ? (
                <div className="w-full aspect-video bg-[#F1F1EF] rounded-lg border border-[#e9e9e8] flex flex-col items-center justify-center gap-4 group cursor-pointer overflow-hidden relative">
                  {service.image.includes('youtube.com') || service.image.includes('youtu.be') ? (
                    <iframe 
                      src={`https://www.youtube.com/embed/${service.image.split('/').pop()?.split('?')[0]}`}
                      className="absolute inset-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="YouTube Video Demo"
                    />
                  ) : service.image.includes('screenapp.io') ? (
                    <iframe 
                      src={service.image.replace('/app/v/', '/view/v/')} // Thử nghiệm định dạng view/embed tiềm năng
                      className="absolute inset-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Video Demo"
                    />
                  ) : (
                    <a 
                      href={service.image} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 text-[#37352f]/40 group-hover:text-[#37352f] transition-all"
                    >
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#e9e9e8]">
                        <Monitor className="w-8 h-8" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest">Xem Video Demo</span>
                    </a>
                  )}
                </div>
              ) : service.image.match(/\.(mp4|webm|ogg|mov)$/i) || service.image.startsWith('/') && service.image.endsWith('.mp4') ? (
                <video 
                  src={service.image} 
                  controls 
                  autoPlay 
                  loop 
                  muted 
                  className="w-full h-auto object-contain rounded-lg shadow-sm border border-[#e9e9e8]"
                />
              ) : (
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-auto object-contain" 
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
          ) : (
            <div className="h-32 bg-[#FBFBFA] border-b border-[#e9e9e8]" />
          )}

          <div className="px-10 md:px-20 py-10">
            {/* Title Section */}
            <div className="mb-10">
              <div className="w-16 h-16 bg-[#f1f1ef] text-[#37352f] flex items-center justify-center rounded-2xl mb-6">
                <FileText className="w-8 h-8 opacity-40" />
              </div>
              <h3 className="text-4xl font-bold text-[#37352f] leading-tight mb-4">{service.name}</h3>
              <div className="flex flex-wrap gap-4 text-sm text-[#37352f]/60">
                <div className="flex items-center gap-2 px-3 py-1 bg-[#f1f1ef] rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#37352f]/20" />
                  <span className="font-medium">Loại: {service.type === 'package' ? 'Trọn gói' : 'Theo đơn vị'}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-[#f1f1ef] rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#37352f]/40" />
                  <span className="font-medium">Trạng thái: Đề xuất</span>
                </div>
              </div>
            </div>

            <hr className="border-[#e9e9e8] mb-10" />

            {/* Sections */}
            <div className="space-y-12">
              {/* Overview */}
              <section>
                <div className="flex items-center gap-2 mb-4 text-[#37352f]/40 font-bold uppercase tracking-widest text-[11px]">
                  <Target className="w-4 h-4" />
                  <span>Tổng quan</span>
                </div>
                <div className="p-5 bg-[#f1f1ef]/50 border-l-4 border-[#37352f]/10 rounded-r-lg">
                  <p className="text-[#37352f] leading-relaxed">
                    {service.details.overview}
                  </p>
                </div>
              </section>

              {/* Items */}
              <section>
                <div className="flex items-center gap-2 mb-4 text-[#37352f]/40 font-bold uppercase tracking-widest text-[11px]">
                  <ListChecks className="w-4 h-4" />
                  <span>Hạng mục thực hiện</span>
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {service.details.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-2 hover:bg-[#f1f1ef] rounded transition-colors group">
                      <div className="mt-1 w-4 h-4 border border-[#37352f]/10 rounded flex items-center justify-center text-[9px] font-bold text-[#37352f]/40 group-hover:bg-[#37352f] group-hover:text-white group-hover:border-transparent transition-all shrink-0">
                        {i + 1}
                      </div>
                      <span className="flex-1 text-sm text-[#37352f] leading-relaxed font-medium break-words">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Outcomes */}
              <section>
                <div className="flex items-center gap-2 mb-4 text-[#37352f]/40 font-bold uppercase tracking-widest text-[11px]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Kết quả bàn giao</span>
                </div>
                <div className="bg-[#FBFBFA] border border-[#e9e9e8] rounded-lg p-6">
                  <ul className="space-y-4">
                    {service.details.outcomes.map((outcome, i) => (
                      <li key={i} className="flex gap-4 items-start">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#37352f]/20 shrink-0" />
                        <span className="text-sm text-[#37352f]/80 leading-relaxed italic">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

            {service.footerImage && (
              <div className="mt-16">
                <img 
                  src={service.footerImage} 
                  alt={`${service.name} Footer Screenshot`} 
                  className="w-full h-auto object-contain rounded-lg shadow-sm border border-[#e9e9e8]" 
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
 
            {/* Footer Sign-off */}
            <div className="mt-20 pt-10 border-t border-[#e9e9e8] text-center">
              <p className="text-xs text-[#37352f]/30">Dữ liệu được cập nhật từ hệ thống quản trị trung tâm Monos</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
