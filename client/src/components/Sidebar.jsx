import React from 'react';
import { BRAND_CONFIG } from '../config/brandConfig';
import { Sparkles, Menu, X, ArrowUpRight, Home, Users, Layers, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { id: 1, label: 'Intro',    num: '01', icon: Home },
  { id: 2, label: 'Founders', num: '02', icon: Users },
  { id: 3, label: 'Services', num: '03', icon: Layers },
  { id: 4, label: 'Contact',  num: '04', icon: Mail },
];

export const Sidebar = ({ activeSection, onNavigate, isCollapsed, onToggleCollapse }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [hoveredId, setHoveredId] = React.useState(null);

  return (
    <>
      {/* Desktop Fixed Left Sidebar */}
      <aside
        className={`hidden md:flex flex-col justify-between h-screen fixed top-0 left-0 z-40 bg-white border-r border-slate-200/80 select-none shadow-sm transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {/* Top: Logo + Nav */}
        <div className={`flex flex-col ${isCollapsed ? 'items-center px-0 pt-4' : 'p-6'}`}>

          {/* Brand Logo */}
          <motion.button
            onClick={() => onNavigate(1)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center group text-left focus:outline-none mb-8 ${
              isCollapsed ? 'justify-center w-full px-2' : 'gap-3 w-full'
            }`}
          >
            <motion.div
              whileHover={{ rotate: 8, scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20 shrink-0"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            {!isCollapsed && (
              <div>
                <span className="text-xl font-black font-display text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                  {BRAND_CONFIG.name}
                </span>
              </div>
            )}
          </motion.button>

          {/* Vertical Navigation Links */}
          <nav className={`w-full ${isCollapsed ? 'space-y-1 px-2' : 'space-y-1'}`}>
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              const isHovered = hoveredId === item.id;
              const Icon = item.icon;
              return (
                <div key={item.id} className="relative">
                  {/* Moving active background pill */}
                  {isActive && !isCollapsed && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-indigo-50/90 rounded-xl border-l-4 border-indigo-600"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {isActive && isCollapsed && (
                    <motion.div
                      layoutId="activeNavPillCollapsed"
                      className="absolute inset-0 bg-indigo-600 rounded-xl"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <button
                    onClick={() => onNavigate(item.id)}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    title={isCollapsed ? item.label : undefined}
                    className={`relative w-full flex items-center rounded-xl text-xs font-medium transition-colors duration-150 text-left ${
                      isCollapsed ? 'justify-center p-3' : 'gap-3.5 px-4 py-3'
                    } ${
                      isActive
                        ? isCollapsed
                          ? 'text-white'
                          : 'text-indigo-600 font-semibold'
                        : isHovered
                        ? 'text-slate-900 bg-slate-50'
                        : 'text-slate-500'
                    }`}
                  >
                    <motion.span
                      animate={{ x: isHovered && !isActive ? 2 : 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center"
                    >
                      <Icon className={`shrink-0 ${isCollapsed ? 'w-5 h-5' : 'w-4 h-4'} ${isActive && !isCollapsed ? 'text-indigo-600' : ''}`} />
                    </motion.span>
                    {!isCollapsed && (
                      <motion.span
                        animate={{ x: isHovered && !isActive ? 2 : 0 }}
                        transition={{ duration: 0.15 }}
                        className="text-sm font-medium"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </button>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Bottom: CTA + Collapse Toggle */}
        <div className={`border-t border-slate-100 ${isCollapsed ? 'p-2 flex flex-col items-center gap-3 py-4' : 'p-6 space-y-3'}`}>

          {/* Collapse Toggle Button */}
          <motion.button
            onClick={onToggleCollapse}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className={`flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-all duration-200 ${
              isCollapsed ? 'w-10 h-10' : 'w-full py-2.5 px-3 gap-2 text-xs font-medium'
            }`}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : (
              <>
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Collapse</span>
              </>
            )}
          </motion.button>

          {/* CTA button */}
          {!isCollapsed && (
            <motion.button
              onClick={() => onNavigate(4)}
              whileHover={{ scale: 1.02, backgroundColor: '#4f46e5' }}
              whileTap={{ scale: 0.97 }}
              className="btn-shine w-full py-2.5 px-3 rounded-xl bg-slate-900 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <span>Start a Project</span>
              <motion.span
                animate={{ x: 0 }}
                whileHover={{ x: 2 }}
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </motion.span>
            </motion.button>
          )}

          {isCollapsed && (
            <motion.button
              onClick={() => onNavigate(4)}
              whileHover={{ scale: 1.08, backgroundColor: '#4f46e5' }}
              whileTap={{ scale: 0.96 }}
              title="Start a Project"
              className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm transition-colors"
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </aside>

      {/* Mobile Topbar */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 flex items-center justify-between shadow-xs">
        <button
          onClick={() => {
            onNavigate(1);
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-2.5 focus:outline-none"
          aria-label="Go to Intro"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold font-display text-slate-900 tracking-tight">
            {BRAND_CONFIG.name}
          </span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">
            0{activeSection}/04
          </span>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:text-slate-900 focus:outline-none transition-colors"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu & Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40"
              aria-hidden="true"
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="md:hidden fixed inset-x-0 top-14 z-50 bg-white border-b border-slate-200/90 p-4 shadow-2xl space-y-3"
            >
              <div className="grid grid-cols-2 gap-2">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        onNavigate(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-2.5 p-3 rounded-xl text-xs font-medium text-left transition-colors ${
                        isActive
                          ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                      <span>{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Mobile CTA Button */}
              <div className="pt-2 border-t border-slate-100">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    onNavigate(4);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
