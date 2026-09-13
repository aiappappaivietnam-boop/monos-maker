/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Sparkles, Scan, Maximize2 } from 'lucide-react';

interface MonosGraphicCardProps {
  className?: string;
}

export default function MonosGraphicCard({ className = '' }: MonosGraphicCardProps) {
  // Mouse position values for 3D perspective tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for natural dampening
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`w-full max-w-[380px] aspect-square bg-gradient-to-b from-[#ffffff] to-[#f8f9fa] border border-[#dadce0] rounded-3xl flex flex-col items-center justify-center relative shadow-md overflow-hidden cursor-pointer group select-none ${className}`}
    >
      {/* Ambient background light glow */}
      <div className="absolute inset-0 bg-radial from-[#1a73e8]/5 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Floating Product Image Container */}
      <motion.div 
        animate={{
          y: [-6, 6, -6],
          rotate: [-0.5, 0.5, -0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{ transform: 'translateZ(30px)' }}
        className="w-full h-full flex items-center justify-center relative z-10"
      >
        <img 
          src="https://i.postimg.cc/bY745qLj/5YSBr.png"
          alt="Monos Product Architectural"
          className="w-full h-full object-contain scale-140 drop-shadow-xl transition-transform duration-500 group-hover:scale-145"
          loading="eager"
          referrerPolicy="no-referrer"
        />

        {/* Dynamic Light Sweep / Shimmer Effect on Hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
      </motion.div>

      {/* Ground Organic Shadow that breathes with the float */}
      <motion.div 
        animate={{
          scale: [0.85, 1.05, 0.85],
          opacity: [0.25, 0.15, 0.25],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute bottom-6 w-44 h-5 rounded-full bg-[#202124] blur-md pointer-events-none z-0"
      />

    </motion.div>
  );
}
