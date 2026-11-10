import React, { useEffect, useRef, useState } from 'react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { ArrowUpRight, ChevronLeft, ChevronRight, Grid, Orbit } from 'lucide-react';

interface SelectedWorkProps {
  onSelectProject: (project: Project) => void;
  isDetailOpen?: boolean;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onSelectProject, isDetailOpen = false }) => {
  const [viewMode, setViewMode] = useState<'circular' | 'grid'>('circular');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const categories = ['all', 'Creative Coding / WebGL', 'E-Commerce / 3D Experience', 'Spatial Web / Architecture', 'Generative Art & Sound'];

  const filteredProjects = activeFilter === 'all'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === activeFilter);

  const activeProject = filteredProjects[activeProjectIndex] ?? filteredProjects[0];
  const rotorRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const targetRef = useRef<number | null>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    lastX: number;
    lastTime: number;
    dragging: boolean;
  } | null>(null);
  const velocityRef = useRef(0);
  const suppressClickRef = useRef(false);
  const detailOpenRef = useRef(isDetailOpen);
  const frontIndexRef = useRef(0);
  const projectCount = filteredProjects.length;
  const selectProject = (index: number) => {
    velocityRef.current = 0;
    const step = 360 / projectCount;
    const desired = -index * step;
    const current = rotationRef.current;
    targetRef.current = current + ((desired - current + 540) % 360 + 360) % 360 - 180;
    setActiveProjectIndex(index);
  };
  const moveSelection = (direction: -1 | 1) => {
    selectProject((activeProjectIndex + direction + projectCount) % projectCount);
  };

  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0 || detailOpenRef.current) return;
    velocityRef.current = 0;
    suppressClickRef.current = false;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastTime: event.timeStamp,
      dragging: false,
    };
  };

  const dragCarousel = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    if (!drag.dragging) {
      const x = event.clientX - drag.startX;
      const y = event.clientY - drag.startY;
      if (Math.abs(x) < 6 || Math.abs(x) <= Math.abs(y)) return;
      drag.dragging = true;
      suppressClickRef.current = true;
      targetRef.current = null;
      setIsDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    const distance = event.clientX - drag.lastX;
    const elapsed = Math.max(event.timeStamp - drag.lastTime, 8) / 1000;
    rotationRef.current += distance * 0.3;
    velocityRef.current = Math.max(-120, Math.min(120, distance * 0.3 / elapsed));
    drag.lastX = event.clientX;
    drag.lastTime = event.timeStamp;
    if (rotorRef.current) rotorRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    if (event.type === 'pointercancel' || event.timeStamp - drag.lastTime > 100) velocityRef.current = 0;
    dragRef.current = null;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  useEffect(() => {
    detailOpenRef.current = isDetailOpen;
  }, [isDetailOpen]);

  useEffect(() => {
    rotationRef.current = 0;
    targetRef.current = null;
    frontIndexRef.current = 0;
    dragRef.current = null;
    velocityRef.current = 0;
    setIsDragging(false);
    setActiveProjectIndex(0);
    if (viewMode !== 'circular' || !projectCount) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let previous = 0;
    const animate = (time: number) => {
      const delta = previous ? Math.min((time - previous) / 1000, 0.05) : 0;
      previous = time;
      const target = targetRef.current;
      if (!detailOpenRef.current && !dragRef.current && target !== null) {
        const remaining = target - rotationRef.current;
        rotationRef.current += motion.matches ? remaining : remaining * (1 - Math.exp(-5 * delta));
        if (Math.abs(remaining) < 0.05) targetRef.current = null;
      } else if (!detailOpenRef.current && !dragRef.current && !motion.matches && projectCount > 1 && !document.hidden) {
        rotationRef.current += delta * (velocityRef.current - 8);
        velocityRef.current *= Math.exp(-4 * delta);
      }
      const angle = rotationRef.current;
      if (rotorRef.current) rotorRef.current.style.transform = `rotateY(${angle}deg)`;
      const front = ((Math.round(-angle / (360 / projectCount)) % projectCount) + projectCount) % projectCount;
      if (targetRef.current === null && front !== frontIndexRef.current) {
        frontIndexRef.current = front;
        setActiveProjectIndex(front);
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [activeFilter, viewMode, projectCount]);

  return (
    <section id="work" className="relative py-28 md:py-36 px-6 md:px-14 border-t border-white/5 bg-[#080808]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#C6FF00]/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header & Subtitle */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-10 text-xs font-mono text-[#888888] tracking-widest">
          <div className="flex items-center gap-3">
            <span className="text-[#C6FF00]">02</span>
            <span>SELECTED REPERTOIRE (2024 - 2026)</span>
          </div>
          <div className="hidden sm:block">
            <span>TOTAL ARCHIVES: {PORTFOLIO_DATA.projects.length} CASE STUDIES</span>
          </div>
        </div>

        {/* Top Control Bar: Category Filter & Layout Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          {/* Category Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveFilter(cat);
                  setActiveProjectIndex(0);
                }}
                data-cursor="hover"
                className={`px-3.5 py-1.5 text-xs font-mono tracking-wider transition-colors border ${
                  activeFilter === cat
                    ? 'bg-[#C6FF00] border-[#C6FF00] text-black font-bold'
                    : 'bg-white/5 border-white/10 text-[#888888] hover:text-[#F5F5F0] hover:border-white/30'
                }`}
              >
                {cat === 'all' ? 'ALL WORK' : cat.split('/')[0].trim().toUpperCase()}
              </button>
            ))}
          </div>

          {/* Showcase View Toggle & Circular Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center bg-white/5 border border-white/10 p-0.5">
              <button
                onClick={() => setViewMode('circular')}
                data-cursor="hover"
                className={`p-2 transition-colors ${
                  viewMode === 'circular' ? 'bg-[#C6FF00] text-black' : 'text-[#888888] hover:text-white'
                }`}
                title="Circular Showcase"
              >
                <Orbit className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                data-cursor="hover"
                className={`p-2 transition-colors ${
                  viewMode === 'grid' ? 'bg-[#C6FF00] text-black' : 'text-[#888888] hover:text-white'
                }`}
                title="Bento Grid"
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>

            {viewMode === 'circular' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => moveSelection(-1)}
                  data-cursor="hover"
                  className="p-2 border border-white/15 text-[#888888] hover:text-[#C6FF00] hover:border-[#C6FF00] transition-colors"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveSelection(1)}
                  data-cursor="hover"
                  className="p-2 border border-white/15 text-[#888888] hover:text-[#C6FF00] hover:border-[#C6FF00] transition-colors"
                  aria-label="Next project"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Upright cards revolve around a horizontal 3D ring. */}
        {viewMode === 'circular' && activeProject && (
          <div className="project-carousel relative isolate mx-auto w-full max-w-6xl overflow-hidden border border-white/[0.04] bg-[radial-gradient(ellipse_at_center,rgba(198,255,0,0.055),transparent_65%)]">
            <div aria-hidden="true" className="project-carousel-floor" />
            <div
              className={`project-carousel-scene select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{ '--carousel-radius': projectCount === 1 ? '0px' : undefined, touchAction: 'pan-y' } as React.CSSProperties}
              data-cursor="drag"
              data-cursor-text={isDragging ? 'DRAGGING' : 'DRAG'}
              onPointerDown={startDrag}
              onPointerMove={dragCarousel}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onLostPointerCapture={endDrag}
              onPointerLeave={(event) => {
                if (dragRef.current && !dragRef.current.dragging) endDrag(event);
              }}
              onDragStart={(event) => event.preventDefault()}
              onClickCapture={(event) => {
                if (suppressClickRef.current && event.detail !== 0) {
                  event.preventDefault();
                  event.stopPropagation();
                  suppressClickRef.current = false;
                }
              }}
            >
              <div ref={rotorRef} className="project-carousel-rotor">
                {filteredProjects.map((project, index) => {
                  const selected = index === activeProjectIndex;
                  return (
                    <div
                      key={project.id}
                      className="project-carousel-slot"
                      style={{ transform: `translate(-50%, -50%) rotateY(${index * 360 / projectCount}deg) translateZ(var(--carousel-radius))` }}
                    >
                      <article className={`project-carousel-front relative border bg-[#0c0c0c] text-left transition-colors duration-500 hover:border-[#C6FF00] focus-within:border-[#C6FF00] ${selected ? 'border-[#C6FF00]/80 shadow-[0_0_35px_rgba(198,255,0,0.12)]' : 'border-white/20'}`}>
                        <div className="relative block aspect-[16/10] w-full overflow-hidden bg-neutral-950 text-left">
                          <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          <span className="absolute right-3 top-3 bg-black/80 px-2 py-1 font-mono text-[10px] text-[#C6FF00]">{String(index + 1).padStart(2, '0')} // {project.year}</span>
                          <span className="absolute bottom-3 left-4 font-mono text-[9px] tracking-widest text-white/70">CLICK TO VIEW DETAILS</span>
                        </div>
                        <div className="space-y-3 p-4 sm:p-5">
                          <div className="flex justify-between gap-3 font-mono text-[9px] text-[#888888] sm:text-[10px]">
                            <span>{project.category}</span>
                            <span className="text-right text-[#F5F5F0]">{project.client}</span>
                          </div>
                          <h3 className="font-heading text-xl font-bold text-[#F5F5F0] sm:text-2xl">{project.title}</h3>
                          <p className="line-clamp-2 text-xs leading-relaxed text-[#888888] sm:text-sm">{project.summary}</p>
                          <div className="flex items-center justify-between gap-2 border-t border-white/10 pt-3 font-mono text-[9px] sm:text-[10px]">
                            <span className="text-[#888888]">{project.tags.slice(0, 2).join(' · ')}</span>
                            <span className="flex shrink-0 items-center gap-1 py-1 font-bold text-[#C6FF00]">
                              INSPECT CASE <ArrowUpRight className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            selectProject(index);
                            onSelectProject(project);
                          }}
                          aria-label={`View details of ${project.title}`}
                          aria-haspopup="dialog"
                          data-cursor={isDragging ? 'drag' : 'project'}
                          data-cursor-text={isDragging ? 'DRAGGING' : 'VIEW / DRAG'}
                          className="absolute inset-0 z-10 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6FF00]"
                        />
                      </article>
                      <div aria-hidden="true" className="project-carousel-back flex flex-col items-center justify-center gap-4 border border-[#C6FF00]/20 bg-[#10120b] p-6 text-center">
                        <Orbit className="h-12 w-12 text-[#C6FF00]/40" />
                        <span className="font-heading text-2xl font-bold tracking-wider text-[#C6FF00]/60">SELECTED WORK</span>
                        <span className="font-mono text-[10px] tracking-[0.2em] text-white/30">CREATIVE TECHNOLOGY / 3D</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap font-mono text-[10px] tracking-[0.16em] text-[#888888] sm:text-xs">
              <span className="h-px w-8 bg-[#C6FF00]/60" />
              ORBITAL ARCHIVE
              <span className="text-[#C6FF00]">{String(activeProjectIndex + 1).padStart(2, '0')} / {String(projectCount).padStart(2, '0')}</span>
              <span className="h-px w-8 bg-[#C6FF00]/60" />
            </div>
            <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[8px] tracking-widest text-white/35 sm:text-[9px]">DRAG TO ROTATE · CLICK A CARD FOR DETAILS</p>
          </div>
        )}
        {/* View Mode 2 / Mobile: Vertical Bento Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${viewMode === 'circular' ? 'hidden' : ''}`}>
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              data-cursor="project"
              data-cursor-text="VIEW"
              className="group cursor-pointer border border-white/10 hover:border-[#C6FF00]/60 transition-all duration-500 bg-[#0c0c0c] flex flex-col justify-between overflow-hidden"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="absolute top-4 right-4 text-xs font-mono bg-black/70 backdrop-blur-md px-2.5 py-1 border border-white/10 text-[#C6FF00]">
                  0{idx + 1} // {project.year}
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#888888]">
                  <span>{project.category}</span>
                  <span className="text-[#F5F5F0]">{project.client}</span>
                </div>

                <h3 className="text-2xl font-bold font-heading text-[#F5F5F0] group-hover:text-[#C6FF00] transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-[#888888] font-sans line-clamp-2 leading-relaxed">
                  {project.summary}
                </p>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#888888]">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag}>&middot; {tag}</span>
                    ))}
                  </div>

                  <span className="text-xs font-mono font-bold text-[#C6FF00] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>EXPLORE</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
