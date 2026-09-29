import React, { useRef, useState } from 'react';
import { Code2, Palette, Cpu, RefreshCw, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = { Code2, Palette, Cpu, RefreshCw };

export const ServiceCard = ({ service, onSelectService }) => {
  const { title, iconName, shortDescription } = service;
  const IconComponent = iconMap[iconName] || Code2;

  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const cx = (e.clientX - left) / width - 0.5;   // -0.5 → 0.5
    const cy = (e.clientY - top)  / height - 0.5;
    setTilt({ x: cy * -6, y: cx * 6 }); // subtle 6° max tilt
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={() => onSelectService && onSelectService(service)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        y: hovered ? -6 : 0,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{ transformStyle: 'preserve-3d', perspective: 800 }}
      className={`
        group cursor-pointer relative rounded-2xl bg-white/90 backdrop-blur-xl p-4 sm:p-5 md:p-6
        border shadow-xs sm:shadow-md transition-all duration-300 flex flex-col justify-between
        ${hovered
          ? 'border-indigo-300 shadow-xl shadow-indigo-500/15'
          : 'border-slate-200/90 shadow-indigo-500/5'}
      `}
    >
      {/* Subtle background accent on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-50/60 to-transparent pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="space-y-2.5 sm:space-y-3.5 relative">
        {/* Top Icon + Arrow */}
        <div className="flex items-center justify-between">
          <motion.div
            animate={{
              background: hovered
                ? 'linear-gradient(135deg,#6366f1,#8b5cf6)'
                : 'transparent',
              scale: hovered ? 1.08 : 1,
            }}
            transition={{ duration: 0.25 }}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-50 border border-indigo-100/80 flex items-center justify-center shadow-xs"
          >
            <IconComponent
              className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-200 ${hovered ? 'text-white' : 'text-indigo-600'}`}
            />
          </motion.div>

          <motion.div
            animate={{
              x: hovered ? 2 : 0,
              y: hovered ? -2 : 0,
              backgroundColor: hovered ? '#eef2ff' : '#f8fafc',
            }}
            transition={{ duration: 0.2 }}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center"
          >
            <ArrowUpRight
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors duration-200 ${hovered ? 'text-indigo-600' : 'text-slate-400'}`}
            />
          </motion.div>
        </div>

        {/* Title & Description */}
        <div className="space-y-1 sm:space-y-1.5 pt-0.5">
          <motion.h3
            animate={{ x: hovered ? 2 : 0 }}
            transition={{ duration: 0.2 }}
            className={`text-base sm:text-lg md:text-xl font-bold font-display transition-colors duration-200 ${hovered ? 'text-indigo-600' : 'text-slate-900'}`}
          >
            {title}
          </motion.h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
            {shortDescription}
          </p>
        </div>
      </div>

      {/* Reveal action hint on hover / mobile always clear */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0.8, y: hovered ? 0 : 2 }}
        transition={{ duration: 0.22 }}
        className="mt-3 pt-2.5 sm:mt-4 sm:pt-3 border-t border-indigo-100/80 flex items-center gap-1.5 text-indigo-600 text-xs font-semibold"
      >
        <span>Get started</span>
        <ArrowUpRight className="w-3.5 h-3.5" />
      </motion.div>
    </motion.div>
  );
};
