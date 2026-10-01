import React, { useState } from 'react';
import { submitContactForm } from '../services/api';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';

export const ContactForm = ({ initialFounderName = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Web Development & Design',
    subject: initialFounderName ? `Project Inquiry for ${initialFounderName}` : 'New Website Project',
    message: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
    responseMsg: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status.error) {
      setStatus((prev) => ({ ...prev, error: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status.loading) return; // Prevent duplicate submissions

    if (!formData.name.trim()) {
      setStatus({ loading: false, success: false, error: 'Please enter your name.', responseMsg: '' });
      return;
    }

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus({ loading: false, success: false, error: 'Please enter a valid email address.', responseMsg: '' });
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      setStatus({ loading: false, success: false, error: 'Message must be at least 5 characters long.', responseMsg: '' });
      return;
    }

    setStatus({ loading: true, success: false, error: null, responseMsg: '' });

    try {
      const res = await submitContactForm(formData);
      if (res && res.success) {
        setStatus({
          loading: false,
          success: true,
          error: null,
          responseMsg: res.message || 'Message sent successfully!'
        });

        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.7 }
          });
        } catch (cErr) {
          // ignore canvas
        }

        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'Web Development & Design',
          subject: 'New Website Project',
          message: ''
        });
      } else {
        setStatus({
          loading: false,
          success: false,
          error: res.message || 'Unable to send your message. Please try again.',
          responseMsg: ''
        });
      }
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error: err.message || 'Unable to send your message. Please try again.',
        responseMsg: ''
      });
    }
  };

  return (
    <div className="rounded-2xl glass-panel p-4 sm:p-5 md:p-6 border border-slate-200 bg-white shadow-xs sm:shadow-sm">
      <div className="mb-3.5 sm:mb-4">
        <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 flex items-center gap-2">
          <span>Start a Conversation</span>
          <Sparkles className="w-4 h-4 text-indigo-600" />
        </h3>
      </div>

      {/* SUCCESS MESSAGE */}
      {status.success && (
        <div className="mb-3 sm:mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-emerald-900">Message Sent Successfully!</p>
            <p className="text-[11px] text-emerald-700 mt-0.5">{status.responseMsg}</p>
          </div>
        </div>
      )}

      {/* ERROR MESSAGE */}
      {status.error && (
        <div className="mb-3 sm:mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 font-sans">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-rose-900 font-sans">Unable to Send Message</p>
            <p className="text-[11px] text-rose-700 mt-0.5 font-sans">{status.error}</p>
          </div>
        </div>
      )}

      {/* CONTACT FORM */}
      <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          <div>
            <label className="block text-[10px] sm:text-[11px] font-mono uppercase text-slate-500 font-semibold mb-1">
              Your Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Sarah Jenkins"
              disabled={status.loading}
              className="w-full px-3 py-2.5 sm:py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] sm:text-[11px] font-mono uppercase text-slate-500 font-semibold mb-1">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. sarah@company.com"
              disabled={status.loading}
              className="w-full px-3 py-2.5 sm:py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          <div>
            <label className="block text-[10px] sm:text-[11px] font-mono uppercase text-slate-500 font-semibold mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +1 (555) 019-2834"
              disabled={status.loading}
              className="w-full px-3 py-2.5 sm:py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] sm:text-[11px] font-mono uppercase text-slate-500 font-semibold mb-1">
              Interested Service
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              disabled={status.loading}
              className="w-full px-3 py-2.5 sm:py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
            >
              <option value="Web Development & Design">Web Development & Design</option>
              <option value="Custom Web Applications">Custom Web Applications</option>
              <option value="UI/UX Design & Branding">UI/UX Design & Branding</option>
              <option value="E-Commerce Solutions">E-Commerce Solutions</option>
              <option value="Other Project Inquiry">Other Project Inquiry</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[10px] sm:text-[11px] font-mono uppercase text-slate-500 font-semibold mb-1">
            Message <span className="text-rose-500">*</span>
          </label>
          <textarea
            name="message"
            rows="2"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your project goals or custom website requirements..."
            disabled={status.loading}
            className="w-full px-3 py-2.5 sm:py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status.loading}
          className="w-full py-3 sm:py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.99]"
        >
          {status.loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Send Project Inquiry</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
