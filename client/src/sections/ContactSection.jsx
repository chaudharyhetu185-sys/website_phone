import React from 'react';
import { ContactForm } from '../components/ContactForm';
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { ContactVectors } from '../components/AmbientVectors';

const FOUNDER_EMAILS = [
  { name: 'Jyoti Judal',  email: 'jyotijudal2006@gmail.com' },
  { name: 'Hina Patel',   email: 'chaudharyhetvi158@gmail.com' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const emailCardVariants = {
  hidden:  { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export const ContactSection = ({ targetFounder = '' }) => {
  return (
    <section className="h-full w-full px-3.5 py-6 sm:px-8 sm:py-6 flex flex-col items-center justify-start md:justify-center overflow-y-auto overflow-x-hidden md:overflow-hidden bg-[#f8fafc] relative select-none pb-24 md:pb-6">
      {/* Unique decorative vectors for contact (arcs + scan line) */}
      <ContactVectors />

      {/* Background Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-200/40 rounded-full blur-3xl pointer-events-none"
        style={{ animation: 'spotlightPulse 10s ease-in-out infinite 0.5s' }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-xl mx-auto w-full z-10 flex flex-col gap-3.5 sm:gap-4 my-auto py-2 sm:py-0"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Contact <span className="text-indigo-600">Us</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-500 font-medium px-2 sm:px-0">
            Have a project or question? Let's build something exceptional together.
          </p>
        </motion.div>

        {/* Direct Email Cards — slide-in from left */}
        <motion.div
          variants={containerVariants}
          className="flex flex-col sm:flex-row gap-2 w-full"
        >
          {FOUNDER_EMAILS.map(({ name, email }) => (
            <motion.a
              key={email}
              variants={emailCardVariants}
              href={`mailto:${email}`}
              whileHover={{ y: -3, borderColor: '#a5b4fc', boxShadow: '0 8px 24px -6px rgba(99,102,241,0.18)' }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center gap-2.5 sm:gap-3 px-3 py-2.5 sm:px-3.5 sm:py-3 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50 transition-all group shadow-xs"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0 group-hover:bg-indigo-200 transition-colors">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-400">{name}</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors truncate">{email}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Contact Form — delayed reveal */}
        <motion.div variants={itemVariants} className="w-full">
          <ContactForm initialFounderName={targetFounder} />
        </motion.div>
      </motion.div>
    </section>
  );
};
