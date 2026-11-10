import React, { useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { X, Printer, Download, Mail, MapPin, Globe, Check } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[#111111] border border-white/20 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#F5F5F0]">
        {/* Modal Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161616] shrink-0">
          <div className="flex items-center gap-3 text-xs font-mono text-[#888888]">
            <span className="text-[#C6FF00] font-bold">CURRICULUM VITAE</span>
            <span>·</span>
            <span className="text-[#F5F5F0]">AHMAD ROPALDO</span>
            <span>·</span>
            <span>2026 EDITION</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              data-cursor="hover"
              className="p-1.5 text-[#888888] hover:text-[#C6FF00] transition-colors"
              title="Print / Save as PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              data-cursor="hover"
              className="p-1.5 text-[#888888] hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div className="overflow-y-auto p-6 md:p-10 space-y-8 font-sans">
          {/* Header Identity Block */}
          <div className="border-b border-white/10 pb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold font-heading text-[#F5F5F0] tracking-tight">
                  {PORTFOLIO_DATA.personal.name}
                </h1>
                <p className="text-[#C6FF00] font-mono text-sm tracking-wider mt-1">
                  {PORTFOLIO_DATA.personal.title}
                </p>
              </div>

              <div className="text-xs font-mono text-[#888888] space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C6FF00]" />
                  <span>{PORTFOLIO_DATA.personal.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#C6FF00]" />
                  <span>{PORTFOLIO_DATA.personal.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-[#C6FF00]" />
                  <span>PORTFOLIO '26 ONLINE</span>
                </div>
              </div>
            </div>

            <p className="mt-6 text-sm text-[#888888] leading-relaxed max-w-3xl">
              Creative technologist with 8+ years specializing in WebGL 3D graphics, procedural shader engineering, and high-retention interactive web platforms. Proven track record directing technical architecture for global brands, winning multiple Awwwards Site of the Day, FWA, and CSSDA honors.
            </p>
          </div>

          {/* Professional Experience */}
          <div className="space-y-6">
            <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-[#C6FF00] font-bold">
              EXPERIENCE & TECHNICAL LEADERSHIP
            </h2>

            <div className="space-y-6">
              <div className="border-l border-white/20 pl-4 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono">
                  <span className="text-base font-bold text-[#F5F5F0]">Staff Creative Technologist & Director</span>
                  <span className="text-[#888888]">2022 — PRESENT · INDEPENDENT ATELIER</span>
                </div>
                <p className="text-xs text-[#C6FF00] font-mono">Global Remote (Zurich, Tokyo, Paris, New York)</p>
                <ul className="list-disc list-inside text-xs text-[#888888] space-y-1 font-sans leading-relaxed">
                  <li>Direct WebGL shader pipelines and interactive 3D web applications for luxury fashion, generative audio, and architecture.</li>
                  <li>Achieved 60fps continuous render loops on constrained mobile hardware using custom GLSL shaders and GPU instancing.</li>
                  <li>Received 4× Awwwards Site of the Day and 3× FWA of the Day honors for pioneering procedural web typography and immersive 3D realms.</li>
                </ul>
              </div>

              <div className="border-l border-white/20 pl-4 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono">
                  <span className="text-base font-bold text-[#F5F5F0]">Senior Interactive Web Engineer</span>
                  <span className="text-[#888888]">2019 — 2022 · APEX DIGITAL LABS</span>
                </div>
                <p className="text-xs text-[#C6FF00] font-mono">Full-Time · Jakarta / Singapore</p>
                <ul className="list-disc list-inside text-xs text-[#888888] space-y-1 font-sans leading-relaxed">
                  <li>Engineered over 35 campaign websites and product launches using React, TypeScript, GSAP ScrollTrigger, and Three.js.</li>
                  <li>Spearheaded internal micro-interaction design system reducing build cycle times by 40%.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Core Competencies Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#C6FF00] mb-3">
                TECHNICAL ARSENAL
              </h3>
              <p className="text-xs text-[#888888] leading-relaxed font-mono">
                TypeScript, React 19, Three.js, WebGL, GLSL Shaders, WebGPU (TSL), GSAP, ScrollTrigger, Lenis, Web Audio API, Tailwind CSS, Vite, Node.js, Next.js, Git, Blender pipeline.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#C6FF00] mb-3">
                HONORS & COMMENDATIONS
              </h3>
              <p className="text-xs text-[#888888] leading-relaxed font-mono">
                Awwwards Site of the Day (×4), Developer Award (2025), FWA of the Day (×3), CSSDA Best UI / UX / Innovation, Codrops Collective feature.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Bottom CTA Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-[#161616] shrink-0">
          <button
            onClick={handleCopyEmail}
            data-cursor="hover"
            className="text-xs font-mono text-[#888888] hover:text-[#C6FF00] transition-colors flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#C6FF00]" /> : <Mail className="w-3.5 h-3.5" />}
            <span>{copied ? 'EMAIL COPIED TO CLIPBOARD' : 'COPY EMAIL ADDRESS'}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              data-cursor="hover"
              className="px-4 py-2 bg-[#C6FF00] text-black font-mono text-xs font-bold hover:bg-white transition-colors flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PRINT / SAVE PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
