import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { HeroSection } from './sections/HeroSection';
import { FoundersSection } from './sections/FoundersSection';
import { ServicesSection } from './sections/ServicesSection';
import { ContactSection } from './sections/ContactSection';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, RotateCcw } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = Next (left slide), -1 = Prev (right slide)
  const [targetFounder, setTargetFounder] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Touch Swipe Gesture State (horizontal with vertical intent check)
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const handleNavigate = (targetPage) => {
    if (targetPage < 1 || targetPage > 4 || targetPage === activeSection) return;
    setDirection(targetPage > activeSection ? 1 : -1);
    setActiveSection(targetPage);
  };

  const handleNext = () => {
    if (activeSection < 4) {
      handleNavigate(activeSection + 1);
    } else {
      handleNavigate(1);
    }
  };

  const handlePrev = () => {
    if (activeSection > 1) {
      handleNavigate(activeSection - 1);
    }
  };

  // Keyboard Navigation Support (ArrowRight = Next, ArrowLeft = Prev)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection]);

  // Touch Swipe Event Handlers (prevent triggering slide if user is scrolling vertically)
  const handleTouchStart = (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;

    // Only swipe if horizontal motion is significant and greater than vertical scroll
    if (Math.abs(diffX) > 60 && Math.abs(diffX) > Math.abs(diffY) * 1.4) {
      if (diffX > 0) {
        handleNext(); // Swipe Left -> Next Page
      } else {
        handlePrev(); // Swipe Right -> Prev Page
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Slide Animation Variants
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: '0%',
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  // Render current slide component (4 streamlined sections)
  const renderSlideContent = () => {
    switch (activeSection) {
      case 1:
        return <HeroSection onNavigate={handleNavigate} />;
      case 2:
        return (
          <FoundersSection
            onNavigate={handleNavigate}
            onContactFounder={(name) => {
              setTargetFounder(name);
              handleNavigate(4);
            }}
          />
        );
      case 3:
        return <ServicesSection onNavigate={handleNavigate} />;
      case 4:
        return <ContactSection onNavigate={handleNavigate} targetFounder={targetFounder} />;
      default:
        return <HeroSection onNavigate={handleNavigate} />;
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-screen h-[100dvh] overflow-hidden bg-[#f8fafc] text-slate-900 select-none"
    >
      {/* Fixed Left Vertical Sidebar Navigation */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
      />

      {/* Main Slide Container — margin adjusts with sidebar on desktop */}
      <main
        className={`h-full pt-14 md:pt-0 relative overflow-hidden transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
        }`}
      >
        {/* Floating Next / Previous Section Buttons */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-30 flex items-center gap-2">
          {activeSection > 1 && (
            <button
              onClick={handlePrev}
              className="p-2.5 sm:p-3 rounded-2xl bg-white/95 hover:bg-slate-100 text-slate-700 border border-slate-200/90 shadow-md hover:shadow-lg backdrop-blur-md transition-all duration-200 group active:scale-95"
              title="Previous Section"
              aria-label="Previous Section"
            >
              <ChevronRight className="w-4 h-4 text-slate-600 rotate-180 group-hover:-translate-x-0.5 transition-transform" />
            </button>
          )}
          <button
            onClick={() => handleNavigate(activeSection < 4 ? activeSection + 1 : 1)}
            className="flex items-center justify-between gap-2.5 sm:gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-white/95 hover:bg-indigo-600 text-slate-700 hover:text-white border border-slate-200/90 shadow-lg hover:shadow-xl backdrop-blur-md text-xs font-semibold transition-all duration-300 group active:scale-95"
            title={activeSection < 4 ? `Go to Section 0${activeSection + 1}` : 'Back to Intro'}
            aria-label={activeSection < 4 ? `Go to Section 0${activeSection + 1}` : 'Back to Intro'}
          >
            <span>
              {activeSection === 1 && 'Founders'}
              {activeSection === 2 && 'Services'}
              {activeSection === 3 && 'Contact'}
              {activeSection === 4 && 'Intro'}
            </span>
            {activeSection < 4 ? (
              <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:text-white group-hover:translate-x-1 transition-all ml-1" />
            ) : (
              <RotateCcw className="w-4 h-4 text-indigo-600 group-hover:text-white transition-colors ml-1" />
            )}
          </button>
        </div>

        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={activeSection}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 280, damping: 30 },
              opacity: { duration: 0.25 },
            }}
            className="w-full h-full absolute inset-0"
          >
            {renderSlideContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

