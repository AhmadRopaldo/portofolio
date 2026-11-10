import React, { useEffect, useState } from 'react';
import { useLenis } from './hooks/useLenis';
import { CustomCursor } from './components/CustomCursor';
import { CinematicPreloader } from './components/CinematicPreloader';
import { TopNav } from './components/TopNav';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SelectedWork } from './components/SelectedWork';
import { SkillsSection } from './components/SkillsSection';
import { InteractivePlayground3D } from './components/InteractivePlayground3D';
import { ContactSection } from './components/ContactSection';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ResumeModal } from './components/ResumeModal';
import { Project } from './data/portfolioData';

export default function App() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const revealTargets = document.querySelectorAll<HTMLElement>(
      'main > section > div, main > section > article, main > section > header'
    );
    revealTargets.forEach((element, index) => {
      element.classList.add('scroll-reveal');
      element.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 170}ms`);
      element.style.setProperty('--reveal-offset', index % 2 === 0 ? '72px' : '-72px');
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });

    revealTargets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  // Initialize Lenis smooth inertial scrolling once preloader is finished
  useLenis(hasLoaded);

  return (
    <div className="relative min-h-screen bg-[#080808] text-[#F5F5F0] selection:bg-[#C6FF00] selection:text-black">
      {/* Cinematic Initial Preloader */}
      {!hasLoaded && (
        <CinematicPreloader onComplete={() => setHasLoaded(true)} />
      )}

      {/* Custom Desktop Interactive Cursor */}
      <CustomCursor />

      {/* Top Navigation Bar adhering to Top Bar Contract */}
      <TopNav onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Page Flow */}
      <main className="relative z-10">
        <HeroSection onOpenResume={() => setIsResumeOpen(true)} />
        <AboutSection onOpenResume={() => setIsResumeOpen(true)} />
        <SelectedWork onSelectProject={(p) => setSelectedProject(p)} isDetailOpen={selectedProject !== null} />
        <SkillsSection />
        <InteractivePlayground3D />
        <ContactSection />
      </main>

      {/* Fullscreen Detailed Project Case Study Lightbox */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Curriculum Vitae Viewer Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
