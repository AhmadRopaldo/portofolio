import React, { lazy, Suspense, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Download, ArrowUpRight, Award, Compass, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import profilePhoto from '../assets/images/WhatsApp Image 2026-10-15 at 09.41.45.jpeg';

const ProfileModel3D = lazy(() => import('./ProfileModel3D'));

interface AboutSectionProps {
  onOpenResume: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenResume }) => {
  const [activeTab, setActiveTab] = useState<'manifesto' | 'awards' | 'trajectory'>('manifesto');
  const [language, setLanguage] = useState<'id' | 'en' | 'de' | 'ja'>('id');
  const [lensPosition, setLensPosition] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [showProfile3D, setShowProfile3D] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(-1);
  const reduceMotion = useReducedMotion();
  const swipeRef = useRef<{ id: number; x: number; y: number; dragging: boolean } | null>(null);
  const changeProfileView = (is3D: boolean, direction: 1 | -1 = -1) => {
    setSlideDirection(direction);
    setLensPosition(null);
    setSwipeOffset(0);
    setShowProfile3D(is3D);
  };
  const finishProfileSwipe = (event: React.PointerEvent<HTMLDivElement>) => {
    const swipe = swipeRef.current;
    if (!swipe || swipe.id !== event.pointerId) return;
    if (event.type !== 'pointercancel' && swipe.dragging && event.clientX - swipe.x > Math.max(45, event.currentTarget.clientWidth * 0.15)) changeProfileView(true);
    swipeRef.current = null;
    setSwipeOffset(0);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const aboutCopy = {
    id: {
      statement: '',
      paragraphs: [
        <>Sebagai seorang <strong className="font-semibold text-[#F5F5F0]">Web Developer dan 3D Designer</strong> dengan latar belakang pendidikan <strong className="font-semibold text-[#F5F5F0]">D3 Sistem Informasi di Telkom University</strong>, saya memiliki ketertarikan dalam menggabungkan kemampuan teknis dan kreativitas untuk menghasilkan pengalaman digital yang modern, interaktif, dan menarik secara visual.</>,
        <>Saya berfokus pada pengembangan website yang responsif, desain antarmuka yang intuitif, serta eksplorasi visualisasi 3D untuk menciptakan karya digital yang tidak hanya menarik, tetapi juga fungsional dan memberikan pengalaman terbaik bagi penggunanya.</>,
        <>Dengan semangat untuk terus belajar dan berkembang, saya percaya bahwa karya digital yang luar biasa lahir dari perpaduan <strong className="font-semibold text-[#F5F5F0]">inovasi, kreativitas, teknologi, dan perhatian terhadap setiap detail</strong>.</>
      ],
      expertise: 'KEAHLIAN UTAMA', skills: ['WEB DEVELOPMENT', '3D DESIGN', 'UI/UX DESIGN', 'CREATIVE TECHNOLOGY']
    },
    en: {
      statement: '',
      paragraphs: [
        <>As a <strong className="font-semibold text-[#F5F5F0]">Web Developer and 3D Designer</strong> with a <strong className="font-semibold text-[#F5F5F0]">Diploma in Information Systems from Telkom University</strong>, I’m passionate about combining technical skills and creativity to create digital experiences that are modern, interactive, and visually engaging.</>,
        <>I focus on responsive website development, intuitive interface design, and 3D visualization to create digital work that is not only compelling, but also functional and enjoyable to use.</>,
        <>Driven to keep learning and growing, I believe exceptional digital work comes from a blend of <strong className="font-semibold text-[#F5F5F0]">innovation, creativity, technology, and attention to every detail</strong>.</>
      ],
      expertise: 'CORE EXPERTISE', skills: ['WEB DEVELOPMENT', '3D DESIGN', 'UI/UX DESIGN', 'CREATIVE TECHNOLOGY']
    },
    de: {
      statement: '',
      paragraphs: [
        <>Als <strong className="font-semibold text-[#F5F5F0]">Webentwickler und 3D-Designer</strong> mit einem <strong className="font-semibold text-[#F5F5F0]">Diplom in Informationssystemen von der Telkom University</strong> verbinde ich technische Fähigkeiten und Kreativität, um moderne, interaktive und visuell ansprechende digitale Erlebnisse zu gestalten.</>,
        <>Mein Schwerpunkt liegt auf responsiver Webentwicklung, intuitivem Interface-Design und 3D-Visualisierung. So entstehen digitale Arbeiten, die nicht nur überzeugen, sondern auch funktional und angenehm zu bedienen sind.</>,
        <>Mit dem Wunsch, ständig dazuzulernen und mich weiterzuentwickeln, bin ich überzeugt: Herausragende digitale Arbeiten entstehen aus <strong className="font-semibold text-[#F5F5F0]">Innovation, Kreativität, Technologie und Liebe zum Detail</strong>.</>
      ],
      expertise: 'KERNKOMPETENZEN', skills: ['WEBENTWICKLUNG', '3D-DESIGN', 'UI/UX-DESIGN', 'KREATIVE TECHNOLOGIE']
    },
    ja: {
      statement: '',
      paragraphs: [
        <>私は<strong className="font-semibold text-[#F5F5F0]">ウェブ開発者兼3Dデザイナー</strong>として、<strong className="font-semibold text-[#F5F5F0]">テルコム大学の情報システム短期大学課程</strong>で学んだ知識を活かし、技術力と創造性を組み合わせて、現代的でインタラクティブ、そして視覚的にも魅力的なデジタル体験を作ることに取り組んでいます。</>,
        <>レスポンシブなウェブサイト開発、直感的なインターフェース設計、3Dビジュアライゼーションに注力し、魅力だけでなく機能性と優れた使い心地を備えたデジタル作品を目指しています。</>,
        <>学び成長し続ける姿勢を大切にし、素晴らしいデジタル作品は<strong className="font-semibold text-[#F5F5F0]">革新、創造性、テクノロジー、そして細部へのこだわり</strong>から生まれると信じています。</>
      ],
      expertise: '主なスキル', skills: ['ウェブ開発', '3Dデザイン', 'UI/UXデザイン', 'クリエイティブテクノロジー']
    }
  }[language];

  const headlineWords = [
    "I", "DON'T", "JUST", "BUILD", "WEBSITES.",
    "I", "CREATE", "DIGITAL", "EXPERIENCES."
  ];

  return (
    <section id="about" className="relative py-28 md:py-36 px-6 md:px-14 border-t border-white/5 bg-[#080808]">
      {/* Background Subtle Accent Texture */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6FF00]/3 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Index & Category Kicker */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-14 text-xs font-mono text-[#888888] tracking-widest">
          <div className="flex items-center gap-3">
            <span className="text-[#C6FF00]">01</span>
            <span>ABOUT & MANIFESTO</span>
          </div>
          <div className="hidden sm:block">
            <span>DISCIPLINE: CREATIVE COMPUTING & DIRECTION</span>
          </div>
        </div>

        {/* Huge Editorial Heading */}
        <div className="mb-20">
          <h2 className="text-editorial-giant font-extrabold font-heading text-[#F5F5F0] tracking-tight leading-[0.9] uppercase flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2">
            {headlineWords.map((word, i) => (
              <span
                key={i}
                className={`transition-colors duration-300 ${
                  word === 'EXPERIENCES.'
                    ? 'text-[#C6FF00]'
                    : 'hover:text-[#C6FF00]'
                }`}
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* 2-Column Split: Editorial Profile Media & Deep Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Portrait & Key Proof Frame */}
          <div className="lg:col-span-5 relative group">
            <div
              className="portrait-frame relative aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/10"
              data-cursor={showProfile3D ? 'drag' : 'hidden'}
              style={{ touchAction: 'pan-y' }}
              onPointerDown={(event) => {
                if ((event.target as HTMLElement).closest('button')) return;
                if (showProfile3D || !event.isPrimary || event.button !== 0) return;
                swipeRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY, dragging: false };
              }}
              onPointerMove={(event) => {
                const swipe = swipeRef.current;
                if (!swipe || swipe.id !== event.pointerId) return;
                const x = event.clientX - swipe.x;
                if (!swipe.dragging && x > 8 && x > Math.abs(event.clientY - swipe.y)) {
                  swipe.dragging = true;
                  event.currentTarget.setPointerCapture(event.pointerId);
                  setLensPosition(null);
                }
                if (swipe.dragging) setSwipeOffset(Math.max(0, Math.min(x, event.currentTarget.clientWidth)));
              }}
              onPointerUp={finishProfileSwipe}
              onPointerCancel={finishProfileSwipe}
              onLostPointerCapture={finishProfileSwipe}
              onPointerLeave={() => { if (!swipeRef.current?.dragging) swipeRef.current = null; }}
              onDragStart={(event) => event.preventDefault()}
              onMouseMove={(event) => {
                if ((event.target as HTMLElement).closest('button')) {
                  setLensPosition(null);
                  return;
                }
                if (showProfile3D || swipeRef.current?.dragging) return;
                const bounds = event.currentTarget.getBoundingClientRect();
                setLensPosition({
                  x: event.clientX - bounds.left,
                  y: event.clientY - bounds.top,
                  width: bounds.width,
                  height: bounds.height,
                });
              }}
              onMouseLeave={() => setLensPosition(null)}
            >
              <AnimatePresence initial={false} custom={slideDirection}>
              <motion.div
                key={showProfile3D ? 'profile-3d' : 'profile-photo'}
                custom={slideDirection}
                className="absolute inset-0 select-none"
                variants={{ enter: (direction: number) => ({ x: `${direction * 100}%` }), leave: (direction: number) => ({ x: `${-direction * 100}%` }) }}
                initial="enter"
                animate={{ x: showProfile3D ? 0 : swipeOffset }}
                exit="leave"
                transition={{ duration: reduceMotion || swipeRef.current?.dragging ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
              {showProfile3D ? <Suspense fallback={<div role="status" className="flex h-full items-center justify-center bg-[#0c0e0a] font-mono text-xs text-[#C6FF00]">MEMUAT VIEWER 3D…</div>}><ProfileModel3D /></Suspense> : <>
              <img
                src={profilePhoto}
                alt="Ahmad Ropaldo - Creative Technologist"
                className="w-full h-full object-cover transition-all duration-700 ease-out"
                loading="lazy"
                draggable={false}
                referrerPolicy="no-referrer"
              />
              {lensPosition && (
                <div
                  aria-hidden="true"
                  className="absolute z-10 h-[230px] w-[230px] pointer-events-none"
                  style={{ left: lensPosition.x - 75, top: lensPosition.y - 75 }}
                >
                  <div className="absolute left-[124px] top-[124px] z-0 h-7 w-[112px] origin-left rotate-45 rounded-full border border-black/80 bg-gradient-to-b from-[#303030] via-[#101010] to-black shadow-[0_5px_10px_rgba(0,0,0,0.5)]" />
                  <div className="absolute left-[107px] top-[105px] z-0 h-8 w-9 rotate-45 rounded-sm border border-[#f5c02a] bg-gradient-to-br from-[#f5c02a] to-[#b87900] shadow-md" />
                  <div className="absolute left-0 top-0 z-10 h-[150px] w-[150px] overflow-hidden rounded-full border-[9px] border-[#d99a00] bg-black/10 shadow-[0_0_0_4px_rgba(0,0,0,0.4),0_5px_24px_rgba(0,0,0,0.45)]">
                    <img
                      src={profilePhoto}
                      alt=""
                      className="absolute max-w-none"
                      style={{
                        width: lensPosition.width * 1.45,
                        height: lensPosition.height * 1.45,
                        left: 66 - lensPosition.x * 1.45,
                        top: 66 - lensPosition.y * 1.45,
                      }}
                    />
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_25%,rgba(255,255,255,0.25),transparent_42%)]" />
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 text-xs font-mono text-[#F5F5F0] flex items-center justify-between">
                <div>
                  <p className="font-bold tracking-wider">{PORTFOLIO_DATA.personal.name}</p>
                  <p className="text-[#888888] text-[11px]">{PORTFOLIO_DATA.personal.title}</p>
                </div>
                <div className="text-right">
                  <span className="text-[#C6FF00] font-bold">UTC+7</span>
                </div>
              </div>
              <div className="pointer-events-none absolute top-4 left-4 flex items-center gap-2 border border-white/20 bg-black/70 px-2.5 py-2 font-mono text-[9px] tracking-widest text-[#C6FF00]">
                GESER KANAN UNTUK 3D <ChevronRight className="h-3.5 w-3.5" />
              </div>
              </>}
              </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-x-3 top-1/2 z-30 flex -translate-y-1/2 items-center justify-between" role="group" aria-label="Navigasi tampilan profil">
                <button type="button" onClick={() => changeProfileView(!showProfile3D, -1)} data-cursor="hover" aria-label={showProfile3D ? 'Kembali ke foto profil' : 'Lihat model profil 3D'} className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  <ChevronLeft className="h-8 w-8 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]" />
                </button>
                <button type="button" onClick={() => changeProfileView(!showProfile3D, 1)} data-cursor="hover" aria-label={showProfile3D ? 'Lihat foto profil berikutnya' : 'Lihat model profil 3D berikutnya'} className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  <ChevronRight className="h-8 w-8 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]" />
                </button>
              </div>
            </div>

            {/* Quiet caption underneath image */}
            <div className="mt-4 flex items-center justify-between text-xs font-mono text-[#888888]">
              <span>{showProfile3D ? 'PORTRAIT / INTERACTIVE 3D' : 'PORTRAIT / 35MM'}</span>
              <span>STUDIO ATELIER</span>
            </div>
          </div>

          {/* Right Column: Bio Narrative, Segmented Tabs, and Actions */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            {/* Interactive Section Filter Tabs (Clean Segmented Buttons) */}
            <div className="flex items-center gap-2 p-1 bg-white/5 border border-white/10 w-fit">
              <button
                onClick={() => setActiveTab('manifesto')}
                className={`px-4 py-2 text-xs font-mono tracking-wider transition-colors ${
                  activeTab === 'manifesto'
                    ? 'bg-[#C6FF00] text-black font-bold'
                    : 'text-[#888888] hover:text-[#F5F5F0]'
                }`}
              >
                ABOUT
              </button>
              <button
                onClick={() => setActiveTab('awards')}
                className={`px-4 py-2 text-xs font-mono tracking-wider transition-colors ${
                  activeTab === 'awards'
                    ? 'bg-[#C6FF00] text-black font-bold'
                    : 'text-[#888888] hover:text-[#F5F5F0]'
                }`}
              >
                HONORS & AWARDS
              </button>
              <button
                onClick={() => setActiveTab('trajectory')}
                className={`px-4 py-2 text-xs font-mono tracking-wider transition-colors ${
                  activeTab === 'trajectory'
                    ? 'bg-[#C6FF00] text-black font-bold'
                    : 'text-[#888888] hover:text-[#F5F5F0]'
                }`}
              >
                TRAJECTORY
              </button>
            </div>

            {/* Tab 1: About copy with language selector */}
            {activeTab === 'manifesto' && (
              <div className="space-y-6 text-[#888888] text-base md:text-lg font-sans leading-relaxed">
                <div className="flex items-center gap-2" role="group" aria-label="Select language">
                  {(['id', 'en', 'de', 'ja'] as const).map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setLanguage(code)}
                      aria-pressed={language === code}
                      className={`px-3 py-1.5 text-[10px] font-mono tracking-widest border transition-colors ${language === code ? 'border-[#C6FF00] bg-[#C6FF00] text-black font-bold' : 'border-white/10 text-[#888888] hover:border-white/30 hover:text-[#F5F5F0]'}`}
                    >
                      {code.toUpperCase()}
                    </button>
                  ))}
                </div>
                {aboutCopy.statement && (
                  <p className="text-[#F5F5F0] font-medium text-xl md:text-2xl leading-snug">
                    {aboutCopy.statement}
                  </p>
                )}
                {aboutCopy.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                <div className="pt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-mono text-[#888888]">
                  <span className="text-[#F5F5F0] font-bold">{aboutCopy.expertise}</span>
                  {aboutCopy.skills.map((skill) => (
                    <React.Fragment key={skill}>
                      <span>·</span>
                      <span>{skill}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
            {/* Tab 2: Awards & Recognitions List */}
            {activeTab === 'awards' && (
              <div className="space-y-4">
                <div className="divide-y divide-white/10 border-y border-white/10">
                  {PORTFOLIO_DATA.recognitions.map((item, idx) => (
                    <div
                      key={idx}
                      className="py-3.5 flex items-center justify-between text-sm font-mono hover:bg-white/5 px-2 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Award className="w-4 h-4 text-[#C6FF00]" />
                        <span className="text-[#F5F5F0] font-semibold">{item.title}</span>
                      </div>
                      <div className="flex items-center gap-6 text-[#888888] text-xs">
                        <span>{item.org}</span>
                        <span className="text-[#C6FF00]">{item.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Trajectory & Focus */}
            {activeTab === 'trajectory' && (
              <div className="space-y-6 font-mono text-sm">
                <div className="space-y-4">
                  <div className="border border-white/10 p-5 bg-white/[0.02]">
                    <div className="flex items-center justify-between text-[#C6FF00] text-xs mb-1">
                      <span>2022 — PRESENT</span>
                      <span>INDEPENDENT ATELIER</span>
                    </div>
                    <h3 className="text-base font-bold text-[#F5F5F0]">Staff Creative Technologist & Director</h3>
                    <p className="text-[#888888] text-xs mt-2 leading-relaxed font-sans">
                      Consulting for luxury ateliers, high-growth technology companies, and global interactive design agencies. Directing WebGL graphics pipelines, interactive design systems, and bespoke micro-interactions.
                    </p>
                  </div>

                  <div className="border border-white/10 p-5 bg-white/[0.02]">
                    <div className="flex items-center justify-between text-[#C6FF00] text-xs mb-1">
                      <span>2019 — 2022</span>
                      <span>CREATIVE AGENCY</span>
                    </div>
                    <h3 className="text-base font-bold text-[#F5F5F0]">Senior Interactive Frontend Engineer</h3>
                    <p className="text-[#888888] text-xs mt-2 leading-relaxed font-sans">
                      Shipped 30+ bespoke campaigns, high-retention 3D product viewports, and custom GLSL shader interactions resulting in multiple Awwwards Site of the Day honors.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenResume}
                data-cursor="hover"
                className="px-6 py-3.5 bg-[#C6FF00] text-black font-mono text-xs font-bold tracking-wider hover:bg-white transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD RESUME (PDF)</span>
              </button>

              <a
                href="#contact"
                data-cursor="hover"
                className="px-6 py-3.5 border border-white/15 text-[#F5F5F0] font-mono text-xs tracking-wider hover:bg-white/5 hover:border-white/30 transition-colors flex items-center gap-2"
              >
                <span>INITIATE COLLABORATION</span>
                <ArrowUpRight className="w-4 h-4 text-[#C6FF00]" />
              </a>
            </div>
          </div>
        </div>

        {/* Full-width Metric Strip Below the 2-Column Split (Adhering to Domain Constitution) */}
        <div className="mt-20 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {PORTFOLIO_DATA.personal.stats.map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-3xl md:text-5xl font-extrabold font-heading text-[#F5F5F0] tabular-nums tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-mono text-[#888888] uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
