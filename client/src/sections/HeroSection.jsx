import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, Palette, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { HeroVectors } from '../components/AmbientVectors';

export const HeroSection = ({ onNavigate }) => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Lightweight single mousemove listener for subtle parallax depth
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 to 0.5
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x: cx, y: cy });
    };
    el.addEventListener('mousemove', handleMove);
    return () => el.removeEventListener('mousemove', handleMove);
  }, []);

  // Parallax transforms — each layer moves at a different rate
  const layer1 = { x: mousePos.x * -12, y: mousePos.y * -10 }; // background (slowest)
  const layer2 = { x: mousePos.x * -6,  y: mousePos.y * -5  }; // mid content
  const layer3 = { x: mousePos.x * 4,   y: mousePos.y * 3   }; // foreground buttons (counter)

  // Stagger spring variants
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };
  const itemVariants = {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  };
  const badgeVariants = {
    hidden:  { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      ref={containerRef}
      className="h-full w-full px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 flex flex-col items-center justify-start md:justify-center text-center overflow-y-auto overflow-x-hidden md:overflow-hidden bg-[#f8fafc] relative select-none pb-24 md:pb-6"
    >
      {/* ── Layer 0: Ambient Vectors (deepest, most movement) ── */}
      <motion.div
        className="absolute inset-0"
        style={{ x: layer1.x, y: layer1.y }}
        transition={{ type: 'spring', stiffness: 60, damping: 20 }}
        animate={{ x: layer1.x, y: layer1.y }}
      >
        <HeroVectors />
      </motion.div>

      {/* ── Layer 1: Ambient glow blobs (slow parallax) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ x: layer1.x, y: layer1.y }}
        transition={{ type: 'spring', stiffness: 40, damping: 25 }}
      >
        <div className="absolute top-1/4 right-1/4 w-88 h-88 bg-indigo-200/50 rounded-full blur-3xl hero-spotlight" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-sky-200/50 rounded-full blur-3xl"
          style={{ animation: 'spotlightPulse 11s ease-in-out infinite 2s' }}
        />
      </motion.div>

      {/* ── Layer 2: Main Content — staggered reveal ── */}
      <motion.div
        animate={{ x: layer2.x, y: layer2.y }}
        transition={{ type: 'spring', stiffness: 60, damping: 22 }}
        className="max-w-3xl mx-auto w-full z-10 my-auto py-2 sm:py-0"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4 sm:space-y-5"
        >
          {/* Cinematic badge reveal */}
          <motion.div variants={badgeVariants} className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-600 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" style={{ animation: 'breathe 2s ease-in-out infinite' }} />
              Creative Studio
            </span>
          </motion.div>

          {/* Main Headline — masked wipe reveal */}
          <div className="space-y-2 overflow-hidden">
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-slate-900 leading-[1.15] sm:leading-[1.1]"
            >
              We Create. We Design.<br />
              <span className="text-indigo-600">We Build.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-slate-600 text-xs sm:text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed pt-1 px-2 sm:px-0"
            >
              We're a creative duo turning ideas into meaningful visual and digital experiences —
              from eye-catching creatives to modern, functional websites.
            </motion.p>
          </div>

          {/* Focus Area Cards — staggered */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 max-w-2xl mx-auto text-left w-full"
          >
            {[
              {
                icon: Palette,
                label: 'Creative Design',
                desc: 'Posters • Banners • Social Media • Event Creatives',
                bg: 'bg-indigo-50',
                text: 'text-indigo-600',
              },
              {
                icon: Code2,
                label: 'Website Development',
                desc: 'Portfolio • Business • Landing Pages • Custom Websites',
                bg: 'bg-sky-50',
                text: 'text-sky-600',
              },
            ].map(({ icon: Icon, label, desc, bg, text }) => (
              <motion.div
                key={label}
                variants={itemVariants}
                whileHover={{ y: -4, boxShadow: '0 16px 32px -8px rgba(79,70,229,0.13)' }}
                className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-indigo-200 transition-all cursor-default card-premium"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={`p-1.5 rounded-lg ${bg} ${text}`}>
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">{label}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">{desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs — counter-parallax foreground layer */}
          <motion.div
            variants={containerVariants}
            animate={{ x: layer3.x, y: layer3.y }}
            transition={{ type: 'spring', stiffness: 80, damping: 22 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 pt-1 w-full max-w-xs sm:max-w-none mx-auto"
          >
            <motion.button
              variants={itemVariants}
              onClick={() => onNavigate(4)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group btn-shine px-5 py-3 sm:px-7 sm:py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Have an idea? Let's create it.</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>

            <motion.button
              variants={itemVariants}
              onClick={() => onNavigate(2)}
              whileHover={{ scale: 1.02, borderColor: '#c7d2fe' }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm border border-slate-200 shadow-xs transition-all flex items-center justify-center"
            >
              Meet the Duo
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
