import React, { useRef, useState } from 'react';
import { Hero3DCanvas } from './Hero3DCanvas';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ArrowDown, Sparkles, MoveRight } from 'lucide-react';

interface HeroSectionProps {
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [headingOffset, setHeadingOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 22;
    const y = (clientY / innerHeight - 0.5) * 22;
    setHeadingOffset({ x, y });
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 md:pt-32 pb-8 md:pb-12 px-6 md:px-14 overflow-hidden select-none"
    >
      {/* Background 3D Three.js PBR Sculpture Canvas */}
      <Hero3DCanvas />

      {/* Background Ambient Glow & Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#C6FF00]/4 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-fine-grid opacity-25" />
      </div>

      {/* Top Meta Indicator Row */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#888888] tracking-widest pt-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#C6FF00]" />
          <span className="text-[#F5F5F0]">{PORTFOLIO_DATA.personal.availability}</span>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <span>LAT: -6.2088° S, 106.8456° E</span>
          <span>·</span>
          <span>DEV EDITION '26</span>
        </div>
      </div>

      {/* Center Giant Typographic Statement */}
      <div className="relative z-20 my-auto py-8 text-center flex flex-col items-center justify-center">
        {/* Subtle upper kicker */}
        <div className="mb-4 md:mb-6 overflow-hidden">
          <p className="text-xs md:text-sm font-mono tracking-[0.35em] text-[#C6FF00] uppercase font-semibold flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C6FF00]" />
            <span>AESTHETIC CODING & 3D WEB ARCHITECTURE</span>
          </p>
        </div>

        {/* Primary Giant Kinetic Headline */}
        <div
          className="transition-transform duration-300 ease-out will-change-transform"
          style={{
            transform: `translate3d(${headingOffset.x}px, ${headingOffset.y}px, 0)`,
          }}
        >
          <h1 className="text-hero-giant font-extrabold font-heading text-[#F5F5F0] tracking-tighter uppercase drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
            <span className="block hover:text-[#C6FF00] transition-colors duration-300">
              CREATIVE
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F5F5F0] via-[#F5F5F0] to-[#888888]">
              DEVELOPER.
            </span>
          </h1>
        </div>

        {/* Lead subcopy with refined measure and balanced text */}
        <p className="mt-6 md:mt-8 max-w-xl text-sm md:text-base text-[#888888] font-sans leading-relaxed text-balance text-center">
          Building bespoke WebGL worlds, fluid motion systems, and award-winning digital experiences that bridge sculptural minimalism with technical supremacy.
        </p>

        {/* Interactive Action CTAs */}
        <div className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#work"
            data-cursor="hover"
            className="group px-7 py-3.5 bg-[#C6FF00] text-black font-mono text-xs font-bold tracking-wider hover:bg-white transition-all duration-200 flex items-center gap-2 shadow-[0_0_30px_rgba(198,255,0,0.25)]"
          >
            <span>EXPLORE WORK</span>
            <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>

          <button
            onClick={onOpenResume}
            data-cursor="hover"
            className="px-6 py-3.5 bg-white/5 border border-white/15 text-[#F5F5F0] font-mono text-xs tracking-wider hover:bg-white/10 hover:border-white/30 transition-all duration-200 flex items-center gap-2"
          >
            <span>VIEW CURRICULUM VITAE</span>
          </button>
        </div>
      </div>

      {/* Bottom Row: Vertical Text & Scroll Indicator */}
      <div className="relative z-20 flex items-end justify-between text-xs font-mono text-[#888888] pt-4">
        {/* Left: Location & Studio Signature */}
        <div className="hidden sm:block">
          <div className="text-[#F5F5F0] font-medium">{PORTFOLIO_DATA.personal.location}</div>
          <div className="text-[11px] text-[#888888] mt-0.5">EST. 2018 · COMMISSIONS OPEN</div>
        </div>

        {/* Center: Scroll Down Indicator */}
        <a
          href="#about"
          data-cursor="hover"
          className="mx-auto sm:mx-0 flex flex-col items-center gap-2 group cursor-pointer text-[#888888] hover:text-[#C6FF00] transition-colors"
        >
          <span className="text-[10px] tracking-widest uppercase">SCROLL TO DISCOVER</span>
          <div className="w-[1px] h-8 bg-white/20 relative overflow-hidden">
            <div className="w-full h-1/2 bg-[#C6FF00] animate-bounce" />
          </div>
        </a>

        {/* Right: Technical Stats Quick Read */}
        <div className="hidden md:flex items-center gap-5 text-right">
          <div>
            <div className="text-[#F5F5F0] font-bold tabular-nums">0.016s</div>
            <div className="text-[10px] text-[#888888]">TARGET FRAME TIME</div>
          </div>
          <div>
            <div className="text-[#C6FF00] font-bold tabular-nums">100%</div>
            <div className="text-[10px] text-[#888888]">GPU ACCELERATED</div>
          </div>
        </div>
      </div>
    </section>
  );
};
