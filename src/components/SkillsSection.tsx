import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Terminal, Layers, Sparkles, Cpu, Code2 } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const activeCategory = PORTFOLIO_DATA.skills[selectedCategoryIdx];

  const techCloud = [
    { name: "Three.js", tag: "3D", level: "Mastery" },
    { name: "TypeScript", tag: "Core", level: "Advanced" },
    { name: "React 19", tag: "Framework", level: "Expert" },
    { name: "GLSL Shaders", tag: "Graphics", level: "Advanced" },
    { name: "WebGPU / TSL", tag: "Graphics", level: "Exploring" },
    { name: "GSAP / ScrollTrigger", tag: "Motion", level: "Mastery" },
    { name: "Lenis", tag: "Scroll", level: "Expert" },
    { name: "Tailwind CSS", tag: "Styling", level: "Expert" },
    { name: "Web Audio API", tag: "Sound", level: "Advanced" },
    { name: "Blender 3D", tag: "Asset Prep", level: "Proficient" },
    { name: "Vite & Node.js", tag: "Tooling", level: "Expert" },
    { name: "Figma Tokens", tag: "Design", level: "Expert" }
  ];

  return (
    <section id="skills" className="relative py-28 md:py-36 px-6 md:px-14 border-t border-white/5 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        {/* Header Kicker */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-14 text-xs font-mono text-[#888888] tracking-widest">
          <div className="flex items-center gap-3">
            <span className="text-[#C6FF00]">03</span>
            <span>CAPABILITIES & SYSTEM ARSENAL</span>
          </div>
          <div className="hidden sm:block">
            <span>METRIC: PRODUCTION VERIFIED</span>
          </div>
        </div>

        {/* Section Headline */}
        <div className="mb-14">
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-[#F5F5F0] uppercase tracking-tight">
            ENGINEERED WITH <span className="text-[#C6FF00]">SURGICAL PRECISION</span>.
          </h2>
          <p className="mt-3 text-sm md:text-base text-[#888888] max-w-2xl font-sans leading-relaxed">
            A battle-tested repertoire spanning low-level GPU shaders, fluid physics engines, high-order component architecture, and mathematical typography.
          </p>
        </div>

        {/* 2-Column Grid: Category Matrix & Interactive Tech Cloud */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Category Tabs & Detailed Skill Cards */}
          <div className="lg:col-span-7 space-y-6">
            {/* Category Navigation Pills */}
            <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
              {PORTFOLIO_DATA.skills.map((cat, idx) => (
                <button
                  key={cat.category}
                  onClick={() => setSelectedCategoryIdx(idx)}
                  data-cursor="hover"
                  className={`px-4 py-2 text-xs font-mono tracking-wider transition-colors border ${
                    selectedCategoryIdx === idx
                      ? 'bg-[#C6FF00] border-[#C6FF00] text-black font-bold'
                      : 'bg-white/5 border-white/10 text-[#888888] hover:text-[#F5F5F0] hover:border-white/30'
                  }`}
                >
                  0{idx + 1}. {cat.category.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Active Category Description */}
            <p className="text-xs font-mono text-[#888888]">
              {activeCategory.description}
            </p>

            {/* Skill Bars & Breakdown */}
            <div className="space-y-4 pt-2">
              {activeCategory.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-5 border border-white/10 bg-[#0e0e0e] hover:border-[#C6FF00]/40 transition-colors space-y-3 group"
                >
                  <div className="flex items-center justify-between text-sm font-mono">
                    <span className="text-[#F5F5F0] font-bold group-hover:text-[#C6FF00] transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-[#C6FF00] font-semibold tabular-nums text-xs">
                      {skill.level}
                    </span>
                  </div>

                  {/* Level Track Bar */}
                  <div className="w-full h-1 bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-[#C6FF00] transition-all duration-700 ease-out"
                      style={{ width: skill.level }}
                    />
                  </div>

                  <p className="text-xs text-[#888888] font-sans leading-relaxed">
                    {skill.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Technology Matrix & Tooling Constellation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border border-white/10 p-6 md:p-8 bg-[#0c0c0c]">
              <div className="flex items-center justify-between text-xs font-mono text-[#888888] pb-4 border-b border-white/10 mb-6">
                <span className="text-[#C6FF00] font-bold">TOOLING CONSTELLATION</span>
                <span>HOVER TO INSPECT</span>
              </div>

              {/* Kinetic Technology Grid Tags */}
              <div className="flex flex-wrap gap-2.5">
                {techCloud.map((tech) => (
                  <div
                    key={tech.name}
                    onMouseEnter={() => setHoveredTech(tech.name)}
                    onMouseLeave={() => setHoveredTech(null)}
                    data-cursor="hover"
                    className={`px-3.5 py-2 border text-xs font-mono transition-all duration-200 cursor-default flex items-center gap-2 ${
                      hoveredTech === tech.name
                        ? 'bg-[#C6FF00] text-black border-[#C6FF00] scale-105 shadow-[0_0_15px_rgba(198,255,0,0.3)]'
                        : 'bg-white/5 border-white/10 text-[#F5F5F0] hover:border-white/30'
                    }`}
                  >
                    <span>{tech.name}</span>
                    <span className={`text-[10px] ${hoveredTech === tech.name ? 'text-black/70' : 'text-[#888888]'}`}>
                      / {tech.tag}
                    </span>
                  </div>
                ))}
              </div>

              {/* Technical Manifesto Card */}
              <div className="mt-8 pt-6 border-t border-white/10 space-y-3 font-mono text-xs text-[#888888]">
                <div className="flex items-center gap-2 text-[#F5F5F0]">
                  <Terminal className="w-4 h-4 text-[#C6FF00]" />
                  <span className="font-bold">STANDARDS & INVARIANTS</span>
                </div>
                <p className="font-sans leading-relaxed">
                  Strict zero-garbage-collection rendering loops, sub-millisecond raycast spatial hashing, and graceful fallbacks for devices without discrete WebGL acceleration.
                </p>
                <div className="text-[11px] text-[#C6FF00] pt-2">
                  ✦ WCAG AA CONTRAST & ACCESSIBILITY COMPLIANT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
