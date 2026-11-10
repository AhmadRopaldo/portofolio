import React, { useEffect } from 'react';
import { Project } from '../data/portfolioData';
import { X, ExternalLink, Github, ArrowRight, Layers, CheckCircle, Cpu, Calendar } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-md overflow-y-auto">
      {/* Backdrop click to dismiss */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div role="dialog" aria-modal="true" aria-labelledby="project-detail-title" className="relative w-full max-w-5xl bg-[#0e0e0e] border border-white/15 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#121212] shrink-0">
          <div className="flex items-center gap-3 text-xs font-mono text-[#888888]">
            <span className="text-[#C6FF00] font-bold">CASE STUDY</span>
            <span>·</span>
            <span className="text-[#F5F5F0]">{project.year}</span>
            <span>·</span>
            <span>{project.category}</span>
          </div>

          <button
            onClick={onClose}
            data-cursor="hover"
            className="p-1.5 text-[#888888] hover:text-white hover:bg-white/10 transition-colors rounded-none focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Pane */}
        <div className="overflow-y-auto p-6 md:p-10 space-y-8">
          {/* Title and Subtitle */}
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#C6FF00] mb-2">
              CLIENT: {project.client}
            </p>
            <h2 id="project-detail-title" className="text-3xl md:text-5xl font-bold font-heading text-[#F5F5F0] tracking-tight">
              {project.title}
            </h2>
            <p className="text-base md:text-lg text-[#888888] mt-2 font-sans">
              {project.subtitle}
            </p>
          </div>

          {/* Hero Project Image Display */}
          <div className="relative aspect-[16/9] w-full overflow-hidden border border-white/10 bg-neutral-950">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Quick Stats Grid */}
          {project.stats && (
            <div className="grid grid-cols-3 gap-4 border-y border-white/10 py-6">
              {project.stats.map((s, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-2xl md:text-4xl font-extrabold font-heading text-[#C6FF00] tabular-nums">
                    {s.value}
                  </div>
                  <div className="text-xs font-mono text-[#888888] uppercase tracking-wider">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Narrative Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed">
            <div className="space-y-4">
              <h3 className="text-xs font-mono tracking-widest text-[#C6FF00] uppercase font-bold flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                <span>THE ARCHITECTURAL CHALLENGE</span>
              </h3>
              <p className="text-[#888888] font-sans text-sm md:text-base leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-mono tracking-widest text-[#C6FF00] uppercase font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>ENGINEERED SOLUTION & OUTCOME</span>
              </h3>
              <p className="text-[#888888] font-sans text-sm md:text-base leading-relaxed">
                {project.solution}
              </p>
              <p className="text-[#F5F5F0] font-sans text-sm leading-relaxed font-medium">
                {project.outcome}
              </p>
            </div>
          </div>

          {/* Tech Stack Chips (Functional tags without pill sandwiches) */}
          <div className="border-t border-white/10 pt-6">
            <p className="text-xs font-mono text-[#888888] uppercase tracking-widest mb-3">
              TECHNOLOGY MATRIX
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-[#F5F5F0]">
              {project.tags.map((tag, i) => (
                <span key={tag} className="flex items-center gap-2">
                  <span className="text-[#C6FF00]">■</span>
                  <span>{tag}</span>
                  {i < project.tags.length - 1 && <span className="text-white/20">/</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-[#121212] shrink-0">
          <div className="flex items-center gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="px-5 py-2.5 bg-[#C6FF00] text-black font-mono text-xs font-bold hover:bg-white transition-colors flex items-center gap-2"
              >
                <span>LAUNCH EXPERIENCE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="px-5 py-2.5 border border-white/20 text-[#F5F5F0] font-mono text-xs hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <Github className="w-3.5 h-3.5" />
                <span>SOURCE CODE</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs font-mono text-[#888888] hover:text-white transition-colors"
          >
            CLOSE [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
