import React, { useEffect, useState } from 'react';

interface CinematicPreloaderProps {
  onComplete: () => void;
}

export const CinematicPreloader: React.FC<CinematicPreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1400; // 1.4 seconds total for snappy, polished feel

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      
      // Easing curve (ease-out quintic)
      const easedProgress = Math.round((1 - Math.pow(1 - rawProgress, 4)) * 100);
      setProgress(easedProgress);

      if (rawProgress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        // Trigger exit shutter animation
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 700);
        }, 150);
      }
    };

    const animFrame = requestAnimationFrame(updateCounter);

    return () => cancelAnimationFrame(animFrame);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#080808] flex flex-col justify-between p-8 md:p-14 select-none transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isExiting ? '-translate-y-full opacity-90' : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Background ambient gradient flare */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C6FF00]/5 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-fine-grid opacity-30" />
      </div>

      {/* Top Preloader Row */}
      <div className="relative z-10 flex items-center justify-between text-xs font-mono tracking-widest text-[#888888]">
        <div className="flex items-center gap-3">
          <span className="text-[#C6FF00] font-bold">●</span>
          <span>INITIALIZING CORE ENGINE</span>
        </div>
        <div className="hidden sm:block">
          <span>SYSTEM V8.4.2 // THREE.JS PBR</span>
        </div>
        <div>
          <span>JAKARTA / UTC+7</span>
        </div>
      </div>

      {/* Center Preloader Brand Display */}
      <div className="relative z-10 my-auto text-center md:text-left max-w-5xl">
        <div className="overflow-hidden mb-3">
          <p className="text-xs md:text-sm font-mono tracking-[0.3em] text-[#C6FF00] uppercase">
            Creative Portfolio 2026
          </p>
        </div>
        <div className="overflow-hidden">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold font-heading tracking-tighter text-[#F5F5F0] leading-none">
            AHMAD ROPALDO
          </h1>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs md:text-sm text-[#888888] font-mono">
          <span>CREATIVE CODE</span>
          <span>/</span>
          <span>3D SPATIAL EXPERIENCES</span>
          <span>/</span>
          <span>INTERACTION DESIGN</span>
        </div>
      </div>

      {/* Bottom Progress Bar & Percentage */}
      <div className="relative z-10 w-full space-y-4">
        <div className="flex items-end justify-between font-mono">
          <div className="text-xs tracking-widest text-[#888888]">
            LOADING SHADERS & GEOMETRY
          </div>
          <div className="text-4xl md:text-6xl font-bold text-[#C6FF00] tabular-nums tracking-tighter">
            {progress < 10 ? `00${progress}` : progress < 100 ? `0${progress}` : progress}%
          </div>
        </div>

        {/* Horizontal Progress Track */}
        <div className="w-full h-[2px] bg-white/10 overflow-hidden relative">
          <div
            className="h-full bg-[#C6FF00] transition-all duration-75 ease-out shadow-[0_0_12px_#C6FF00]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
