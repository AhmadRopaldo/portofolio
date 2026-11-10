import React, { useEffect, useState, useRef } from 'react';

export interface CursorState {
  text: string;
  variant: 'default' | 'hover' | 'project' | 'drag' | 'hidden';
}

export const CustomCursor: React.FC = () => {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<CursorState>({
    text: '',
    variant: 'default'
  });
  const [isTouch, setIsTouch] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Check if device has fine pointer (mouse/trackpad)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      setCursorPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check hovered element data-cursor attributes
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorEl = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorEl) {
        const text = cursorEl.getAttribute('data-cursor-text') || '';
        const variant = (cursorEl.getAttribute('data-cursor') || 'hover') as CursorState['variant'];
        setCursorState({ text, variant });
      } else if (target.closest('button, a, input, textarea, select')) {
        setCursorState({ text: '', variant: 'hover' });
      } else {
        setCursorState({ text: '', variant: 'default' });
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth trailing interpolation
    const render = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.18;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.18;
      setTrailingPos({ x: currentPos.current.x, y: currentPos.current.y });
      rafId.current = requestAnimationFrame(render);
    };
    rafId.current = requestAnimationFrame(render);

    document.documentElement.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [isVisible]);

  if (isTouch || !isVisible || cursorState.variant === 'hidden') return null;

  const isProject = cursorState.variant === 'project';
  const isDrag = cursorState.variant === 'drag';
  const isHover = cursorState.variant === 'hover';
  const hasText = cursorState.text.length > 0;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300">
      {/* Precision center dot */}
      <div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C6FF00] pointer-events-none transition-transform duration-75"
        style={{
          transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0) scale(${hasText ? 0 : 1})`,
          width: '6px',
          height: '6px',
        }}
      />

      {/* Trailing follower circle */}
      <div
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none flex items-center justify-center transition-all duration-300 ease-out font-mono font-medium tracking-widest text-[10px] ${
          hasText
            ? 'bg-[#C6FF00] text-black w-24 h-24 shadow-[0_0_35px_rgba(198,255,0,0.45)]'
            : isHover
            ? 'w-14 h-14 border border-[#C6FF00] bg-[#C6FF00]/10 backdrop-blur-[1px]'
            : isDrag
            ? 'w-20 h-20 bg-white text-black'
            : 'w-8 h-8 border border-white/40'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`,
        }}
      >
        {cursorState.text && (
          <span className="select-none uppercase font-bold animate-pulse">
            {cursorState.text}
          </span>
        )}
      </div>
    </div>
  );
};
