import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Mail, Copy, Check, ArrowUpRight, Send, MessageSquare, MapPin, Clock } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: '3D Web Experience',
    budget: '$15k - $30k',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Jakarta is UTC+7
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Jakarta',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSending(true);
    // Simulate instantaneous, reliable delivery
    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="relative py-28 md:py-36 px-6 md:px-14 border-t border-white/5 bg-[#080808] overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#C6FF00]/4 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-14 text-xs font-mono text-[#888888] tracking-widest">
          <div className="flex items-center gap-3">
            <span className="text-[#C6FF00]">05</span>
            <span>GET IN TOUCH // GLOBAL COLLABORATIONS</span>
          </div>
          <div className="flex items-center gap-2 text-[#C6FF00]">
            <Clock className="w-3.5 h-3.5" />
            <span className="tabular-nums">JAKARTA {currentTime} (UTC+7)</span>
          </div>
        </div>

        {/* Huge Typographic Headline */}
        <div className="mb-16">
          <h2 className="text-editorial-giant font-extrabold font-heading text-[#F5F5F0] uppercase tracking-tight leading-[0.9]">
            LET'S MAKE<br />
            SOMETHING<br />
            <span className="text-[#C6FF00]">AMAZING.</span>
          </h2>
        </div>

        {/* 2-Column Grid: Direct Actions & Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          {/* Left Column: Direct Links & Instant Copy */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-mono uppercase tracking-widest text-[#888888]">
                DIRECT CORRESPONDENCE
              </p>
              
              {/* Primary Email Card */}
              <div className="p-6 border border-white/10 bg-[#0e0e0e] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#C6FF00]">PRIMARY INBOX</span>
                  <span className="text-xs font-mono text-[#888888]">REPLY WITHIN 24H</span>
                </div>

                <a
                  href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                  data-cursor="hover"
                  className="text-xl sm:text-2xl font-bold font-heading text-[#F5F5F0] hover:text-[#C6FF00] transition-colors block break-all"
                >
                  {PORTFOLIO_DATA.personal.email}
                </a>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={handleCopyEmail}
                    data-cursor="hover"
                    className="px-4 py-2 bg-white/5 border border-white/15 text-xs font-mono text-[#F5F5F0] hover:bg-white/10 hover:border-white/30 transition-colors flex items-center gap-2"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#C6FF00]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? 'COPIED TO CLIPBOARD' : 'COPY EMAIL'}</span>
                  </button>

                  <a
                    href={`https://wa.me/${PORTFOLIO_DATA.personal.whatsapp.replace('+', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="px-4 py-2 bg-[#C6FF00] text-black font-mono text-xs font-bold hover:bg-white transition-colors flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WHATSAPP</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="space-y-4">
              <p className="text-xs font-mono uppercase tracking-widest text-[#888888]">
                DIGITAL FOOTPRINT
              </p>

              <div className="divide-y divide-white/10 border-y border-white/10">
                {[
                  { name: 'GitHub', url: PORTFOLIO_DATA.personal.github, handle: '@yourusername' },
                  { name: 'LinkedIn', url: PORTFOLIO_DATA.personal.linkedin, handle: 'in/yourusername' },
                  { name: 'Instagram', url: PORTFOLIO_DATA.personal.instagram, handle: '@yourusername' },
                  { name: 'Twitter / X', url: PORTFOLIO_DATA.personal.twitter, handle: '@yourusername' }
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="py-3 flex items-center justify-between text-sm font-mono text-[#888888] hover:text-[#C6FF00] group transition-colors px-1"
                  >
                    <span className="font-semibold text-[#F5F5F0] group-hover:text-[#C6FF00]">{s.name}</span>
                    <div className="flex items-center gap-2 text-xs">
                      <span>{s.handle}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-[#C6FF00] transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Project Inquiry Form */}
          <div className="lg:col-span-7 border border-white/10 p-6 md:p-10 bg-[#0c0c0c]">
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
              <h3 className="text-base font-bold font-heading text-[#F5F5F0] uppercase tracking-wider">
                INITIATE COMMISSION / PROJECT INQUIRY
              </h3>
              <span className="text-xs font-mono text-[#C6FF00]">Q3/Q4 SLOTS</span>
            </div>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 bg-[#C6FF00]/10 border border-[#C6FF00] text-[#C6FF00] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold font-heading text-[#F5F5F0]">
                  TRANSMISSION RECEIVED
                </h4>
                <p className="text-sm text-[#888888] font-sans max-w-md mx-auto">
                  Thank you for reaching out, {formState.name}. I review all project proposals personally and will respond within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 border border-white/20 text-xs font-mono text-[#F5F5F0] hover:bg-white/10 transition-colors"
                >
                  SEND ANOTHER TRANSMISSION
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-[#888888] uppercase tracking-wider block">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Elena Rostova"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 text-[#F5F5F0] placeholder-neutral-600 font-sans text-sm focus:outline-none focus:border-[#C6FF00] transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-[#888888] uppercase tracking-wider block">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. elena@atelier.com"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 text-[#F5F5F0] placeholder-neutral-600 font-sans text-sm focus:outline-none focus:border-[#C6FF00] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Project Type */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-[#888888] uppercase tracking-wider block">
                      PROJECT CATEGORY
                    </label>
                    <select
                      value={formState.projectType}
                      onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                      className="w-full px-4 py-3 bg-[#111111] border border-white/10 text-[#F5F5F0] font-sans text-sm focus:outline-none focus:border-[#C6FF00] transition-colors"
                    >
                      <option value="3D Web Experience">3D Web Experience / WebGL</option>
                      <option value="Creative Direction & Branding">Creative Direction & Branding</option>
                      <option value="High-Impact Frontend Engineering">High-Impact Frontend Engineering</option>
                      <option value="Custom Shader & Generative Visuals">Custom Shader & Generative Visuals</option>
                      <option value="Technical Advisory">Technical Advisory</option>
                    </select>
                  </div>

                  {/* Budget Scope */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-[#888888] uppercase tracking-wider block">
                      ESTIMATED BUDGET
                    </label>
                    <select
                      value={formState.budget}
                      onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                      className="w-full px-4 py-3 bg-[#111111] border border-white/10 text-[#F5F5F0] font-sans text-sm focus:outline-none focus:border-[#C6FF00] transition-colors"
                    >
                      <option value="$10k - $20k">$10k — $20k</option>
                      <option value="$20k - $40k">$20k — $40k</option>
                      <option value="$40k - $80k">$40k — $80k</option>
                      <option value="$80k+">$80k+</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-[#888888] uppercase tracking-wider block">
                    PROJECT OBJECTIVE & TIMELINE *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Briefly describe your vision, deliverables, and timeline..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-[#F5F5F0] placeholder-neutral-600 font-sans text-sm focus:outline-none focus:border-[#C6FF00] transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSending}
                  data-cursor="hover"
                  className="w-full py-4 bg-[#C6FF00] text-black font-mono text-xs font-bold tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(198,255,0,0.25)]"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSending ? 'DISPATCHING PROPOSAL...' : 'DISPATCH TRANSMISSION'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Minimal Editorial Footer Strip */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#888888]">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-[#C6FF00] inline-block" />
            <span>© 2026 {PORTFOLIO_DATA.personal.name}. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>DESIGNED & ENGINEERED FOR MAXIMUM RETENTION</span>
            <span>·</span>
            <span>THREE.JS PBR</span>
            <span>·</span>
            <a href="#root" className="text-[#C6FF00] hover:underline">
              BACK TO TOP ↑
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
