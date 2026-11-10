import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface TopNavProps {
  onOpenResume: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onOpenResume }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Playground', href: '#playground' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#080808]/85 backdrop-blur-md border-b border-white/5 py-4'
            : 'bg-transparent py-6 md:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <a
            href="#"
            className="text-sm md:text-base font-bold font-heading tracking-widest text-[#F5F5F0] hover:text-[#C6FF00] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span className="w-2 h-2 bg-[#C6FF00] inline-block" />
            <span>{PORTFOLIO_DATA.personal.name}</span>
          </a>

          {/* Zone 2: 4-5 single-line clean nav links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider text-[#888888]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#F5F5F0] transition-colors whitespace-nowrap shrink-0 relative py-1 group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C6FF00] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <button
              onClick={onOpenResume}
              className="text-xs font-mono text-[#888888] hover:text-[#C6FF00] transition-colors whitespace-nowrap shrink-0 px-2 py-1 flex items-center gap-1"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
            <a
              href="#contact"
              className="px-4 py-2 text-xs font-mono font-medium text-black bg-[#C6FF00] rounded-none hover:bg-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-[0_0_20px_rgba(198,255,0,0.2)]"
            >
              <span>GET IN TOUCH</span>
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#F5F5F0] hover:text-[#C6FF00] transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#080808]/98 backdrop-blur-xl flex flex-col justify-between p-8 pt-28 md:hidden">
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-heading font-bold text-[#F5F5F0] hover:text-[#C6FF00] transition-colors flex items-baseline justify-between border-b border-white/10 pb-4"
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-[#888888]">0{idx + 1}</span>
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="text-2xl font-heading font-bold text-[#F5F5F0] hover:text-[#C6FF00] transition-colors text-left border-b border-white/10 pb-4 flex items-center justify-between"
            >
              <span>Curriculum Vitae</span>
              <ArrowUpRight className="w-5 h-5 text-[#C6FF00]" />
            </button>
          </nav>

          <div className="pt-6">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-4 text-center text-sm font-mono font-bold text-black bg-[#C6FF00] block"
            >
              INITIATE CONTACT
            </a>
            <p className="mt-4 text-xs font-mono text-[#888888] text-center">
              JAKARTA, INDONESIA (UTC+7)
            </p>
          </div>
        </div>
      )}
    </>
  );
};
