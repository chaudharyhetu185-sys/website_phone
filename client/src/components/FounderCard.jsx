import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Globe, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Object-position tuned per founder photo for best face framing
const FOUNDER_IMAGE_POSITIONS = {
  jyoti: 'center 20%',
  hina:  'center 25%',
};

const getObjectPosition = (name = '', avatar = '') => {
  const key = name.toLowerCase();
  if (key.includes('hina') || avatar.includes('hina')) return FOUNDER_IMAGE_POSITIONS.hina;
  if (key.includes('jyoti') || avatar.includes('jyoti')) return FOUNDER_IMAGE_POSITIONS.jyoti;
  return 'center 15%';
};

export const FounderCard = ({ founder }) => {
  const { name, photo, image, email, phone, portfolio, socials, socialLinks } = founder;

  const [hovered, setHovered] = useState(false);

  const avatar       = photo || image || '/images/placeholder.jpg';
  const contactEmail = email || socials?.email || socialLinks?.email || '';
  const contactPhone = phone || socials?.phone || socialLinks?.phone || '';
  const linkedinUrl  = socials?.linkedin || socialLinks?.linkedin || '';
  const portfolioUrl = portfolio || socials?.portfolio || socialLinks?.portfolio || '';
  const objectPos    = getObjectPosition(name, avatar);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        y: hovered ? -5 : 0,
        boxShadow: hovered
          ? '0 24px 48px -10px rgba(79,70,229,0.18), 0 8px 20px -6px rgba(79,70,229,0.10)'
          : '0 4px 16px -4px rgba(15,23,42,0.08)',
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      className={`group relative w-full bg-white rounded-2xl overflow-hidden flex flex-col transition-colors duration-300 ${
        hovered ? 'border-2 border-indigo-300' : 'border border-slate-200'
      }`}
    >
      {/* ── PHOTO with zoom on hover ── */}
      <div className="w-full h-44 sm:h-52 md:h-60 lg:h-64 overflow-hidden bg-slate-100 shrink-0 relative">
        <motion.img
          src={avatar}
          alt={name}
          style={{ objectPosition: objectPos }}
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800';
          }}
        />
        {/* Hover overlay gradient */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-indigo-600/10 to-transparent pointer-events-none"
        />
      </div>

      {/* ── INFO ── */}
      <div className="p-3.5 sm:p-4 md:p-5 flex flex-col gap-2.5 sm:gap-3.5 flex-1">

        {/* Name — shifts slightly up on hover */}
        <motion.h3
          animate={{ y: hovered ? -2 : 0, color: hovered ? '#4f46e5' : '#0f172a' }}
          transition={{ duration: 0.22 }}
          className="text-lg sm:text-xl md:text-2xl font-extrabold font-display tracking-tight text-center leading-tight"
        >
          {name}
        </motion.h3>

        {/* Contact rows */}
        <div className="space-y-1.5 sm:space-y-2">
          {contactPhone && (
            <a
              href={`tel:${contactPhone}`}
              className="flex items-center gap-2.5 sm:gap-3 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 text-slate-700 hover:text-emerald-700 transition-all group/call"
            >
              <span className="p-1 sm:p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 group-hover/call:bg-emerald-500 group-hover/call:text-white transition-colors shrink-0">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </span>
              <span className="text-xs sm:text-sm font-semibold font-mono tracking-wide">{contactPhone}</span>
            </a>
          )}

          {contactEmail && (
            <a
              href={`mailto:${contactEmail}`}
              className="flex items-center gap-2.5 sm:gap-3 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-slate-700 hover:text-indigo-700 transition-all group/email"
            >
              <span className="p-1 sm:p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 group-hover/email:bg-indigo-500 group-hover/email:text-white transition-colors shrink-0">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </span>
              <span className="text-xs sm:text-sm font-semibold truncate">{contactEmail}</span>
            </a>
          )}
        </div>

        {/* Link buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5 pt-1 mt-auto">
          {linkedinUrl && (
            <motion.a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all btn-shine"
            >
              <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          )}

          {portfolioUrl ? (
            <motion.a
              href={portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all btn-shine"
            >
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Portfolio</span>
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-80" />
            </motion.a>
          ) : (
            <div className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-slate-100 text-slate-400 text-xs sm:text-sm font-semibold border border-slate-200 cursor-not-allowed select-none">
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-40" />
              <span>Portfolio Soon</span>
            </div>
          )}
        </div>

      </div>
    </motion.div>
  );
};
