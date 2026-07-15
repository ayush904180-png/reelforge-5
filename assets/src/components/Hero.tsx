/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from 'react';
import { Play, Sparkles, Film, Sliders, Music, Video, Zap } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax physics using Framer Motion springs
  const xValue = useMotionValue(0);
  const yValue = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 120 };
  const parallaxX = useSpring(xValue, springConfig);
  const parallaxY = useSpring(yValue, springConfig);

  // Parallax transformations for background and floating elements
  const bgTranslateX = useTransform(parallaxX, [-1, 1], [-20, 20]);
  const bgTranslateY = useTransform(parallaxY, [-1, 1], [-20, 20]);
  
  const cardTranslateX = useTransform(parallaxX, [-1, 1], [-12, 12]);
  const cardTranslateY = useTransform(parallaxY, [-1, 1], [-12, 12]);

  const floatTranslateX = useTransform(parallaxX, [-1, 1], [-30, 30]);
  const floatTranslateY = useTransform(parallaxY, [-1, 1], [-30, 30]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5; // range [-0.5, 0.5]
      const y = (e.clientY - top) / height - 0.5; // range [-0.5, 0.5]
      
      setMousePosition({ x: e.clientX, y: e.clientY });
      xValue.set(x);
      yValue.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [xValue, yValue]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen pt-32 pb-24 overflow-hidden bg-bg-deep flex flex-col justify-center items-center"
    >
      {/* Animated Glowing Radial Gradient Behind Content */}
      <motion.div
        style={{ x: bgTranslateX, y: bgTranslateY }}
        className="absolute inset-0 radial-glow-hero pointer-events-none opacity-90 z-0"
      />

      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Main Content */}
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 text-center z-10 flex flex-col items-center">
        {/* Elite Agency Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider uppercase text-accent mb-8 shadow-[0_0_15px_rgba(255,122,0,0.1)]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Elite Video Post-Production
        </motion.div>

        {/* Headings */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[84px] leading-[1.05] tracking-tight text-white max-w-5xl"
        >
          Editing Stories <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#FF4D00] to-[#FF9A3C] text-glow-strong">
            That Inspire Audiences
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 font-sans text-lg sm:text-xl text-bebebe max-w-2xl leading-[1.6]"
        >
          We transform raw footage into premium, cinematic experiences. Scale your retention, hook your audience, and command high conversions.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          {/* Primary CTA */}
          <button
            onClick={() => handleScrollTo('portfolio')}
            className="px-8 py-4 bg-accent hover:bg-accent-dark text-white rounded-xl font-display font-bold text-base transition-all duration-300 shadow-[0_0_25px_rgba(255,122,0,0.4)] hover:shadow-[0_0_35px_rgba(255,122,0,0.65)] hover:-translate-y-1 cursor-pointer flex items-center gap-2 group"
          >
            Explore Our Work
            <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => handleScrollTo('contact')}
            className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/40 text-white rounded-xl font-display font-bold text-base transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            Book a Strategic Call
          </button>
        </motion.div>

        {/* Editing Workspace Mockup Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{ x: cardTranslateX, y: cardTranslateY }}
          className="relative w-full max-w-5xl mt-20 rounded-2xl glass-card p-1 md:p-2 shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden"
        >
          {/* Editor Window Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-white/2 rounded-t-xl border-b border-white/5 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>
            <div className="text-[11px] font-mono tracking-wider text-muted flex items-center gap-2 bg-black/40 px-4 py-1 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              REELFORGE_PRO_TIMELINE.prproj *
            </div>
            <div className="flex items-center gap-2 text-white/40">
              <Sliders className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Editor Grid Area */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 bg-[#080808]/40 p-2 text-left text-xs font-sans h-[320px] md:h-[450px] overflow-hidden backdrop-blur-md">
            {/* Sidebar / Files */}
            <div className="hidden md:flex flex-col gap-2 bg-white/2 border border-white/5 rounded-lg p-3 backdrop-blur-sm">
              <div className="font-semibold text-white/50 pb-2 uppercase tracking-wider text-[10px]">Project Panel</div>
              <div className="space-y-1.5 overflow-y-auto">
                <div className="flex items-center gap-2 bg-accent/10 text-accent p-2 rounded border border-accent/20">
                  <Film className="w-3.5 h-3.5 shrink-0" />
                  <div className="truncate font-mono">A_ROLL_CINEMATIC.mp4</div>
                </div>
                <div className="flex items-center gap-2 text-white/60 p-2 rounded hover:bg-white/5 transition-colors">
                  <Music className="w-3.5 h-3.5 shrink-0" />
                  <div className="truncate font-mono">BGM_CYBERPUNK_DRIVE.wav</div>
                </div>
                <div className="flex items-center gap-2 text-white/60 p-2 rounded hover:bg-white/5 transition-colors">
                  <Video className="w-3.5 h-3.5 shrink-0" />
                  <div className="truncate font-mono">B_ROLL_ESTABLISHING_SHOT.mov</div>
                </div>
                <div className="flex items-center gap-2 text-white/60 p-2 rounded hover:bg-white/5 transition-colors">
                  <Zap className="w-3.5 h-3.5 shrink-0" />
                  <div className="truncate font-mono">MOTION_OVERLAY_GLOW.sfx</div>
                </div>
              </div>
            </div>

            {/* Video Preview Canvas & Monitor */}
            <div className="md:col-span-3 flex flex-col gap-2 h-full">
              {/* Top half: Source & Program monitors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-2/3">
                {/* Waveform Sound Panel */}
                <div className="hidden md:flex flex-col bg-white/2 border border-white/5 rounded-lg p-3 backdrop-blur-sm justify-between">
                  <div className="font-semibold text-white/50 uppercase tracking-wider text-[10px]">Audio Spectrum</div>
                  <div className="flex items-end justify-center gap-1 h-3/4 px-4 pb-2">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [12, Math.random() * 80 + 10, 12] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1 + Math.random(),
                          ease: 'easeInOut',
                        }}
                        className="w-1.5 rounded-full bg-gradient-to-t from-accent to-accent-light"
                      />
                    ))}
                  </div>
                </div>

                {/* Video Monitor */}
                <div className="relative bg-[#020202]/60 rounded-lg border border-white/5 overflow-hidden h-full">
                  <img
                    src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80"
                    alt="Cinema workspace preview editing a scene of a young creator"
                    className="w-full h-full object-cover opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                  {/* Floating Action Overlay */}
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-red-600 text-[9px] font-bold text-white tracking-widest uppercase animate-pulse">
                    Live Render
                  </div>
                  <div className="absolute bottom-2 left-3 font-mono text-[10px] text-accent font-semibold tracking-wider">
                    00:04:12:15
                  </div>
                </div>
              </div>

              {/* Bottom half: Assembly Timeline track list */}
              <div className="bg-white/2 border border-white/5 rounded-lg p-3 backdrop-blur-sm flex-grow flex flex-col justify-between overflow-hidden">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <div className="font-semibold text-white/50 uppercase tracking-wider text-[10px]">Timeline Assembly</div>
                  <div className="flex items-center gap-3 text-white/40 text-[10px] font-mono">
                    <span>1/24 Resolution</span>
                    <span className="text-accent">4K ProRes</span>
                  </div>
                </div>

                {/* Track Layers */}
                <div className="space-y-1.5 mt-2 flex-grow overflow-hidden flex flex-col justify-center">
                  {/* V1 Video Layer */}
                  <div className="flex items-center gap-2">
                    <span className="w-6 text-[9px] text-white/40 font-mono">V1</span>
                    <div className="flex-grow grid grid-cols-12 gap-1">
                      <div className="col-span-3 h-5 rounded bg-[#3c5df2]/30 border border-[#3c5df2]/50 flex items-center px-2 text-[9px] text-blue-200 font-mono truncate">
                        A_ROLL_CUT_1.MP4
                      </div>
                      <div className="col-span-4 h-5 rounded bg-accent/20 border border-accent/40 flex items-center px-2 text-[9px] text-accent-light font-mono truncate relative overflow-hidden">
                        A_ROLL_MAIN_HOOK.MP4
                        <motion.div
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
                          className="absolute inset-y-0 w-8 bg-white/10 skew-x-12"
                        />
                      </div>
                      <div className="col-span-5 h-5 rounded bg-[#3c5df2]/30 border border-[#3c5df2]/50 flex items-center px-2 text-[9px] text-blue-200 font-mono truncate">
                        B_ROLL_OUTRO_CLIPS.MOV
                      </div>
                    </div>
                  </div>

                  {/* V2 Transitions Layer */}
                  <div className="flex items-center gap-2">
                    <span className="w-6 text-[9px] text-white/40 font-mono">V2</span>
                    <div className="flex-grow grid grid-cols-12 gap-1">
                      <div className="col-span-4" />
                      <div className="col-span-3 h-5 rounded bg-purple-600/30 border border-purple-500/50 flex items-center px-2 text-[9px] text-purple-200 font-mono truncate">
                        3D_GLOW_TRANSITION
                      </div>
                      <div className="col-span-5" />
                    </div>
                  </div>

                  {/* A1 Audio Layer */}
                  <div className="flex items-center gap-2">
                    <span className="w-6 text-[9px] text-white/40 font-mono">A1</span>
                    <div className="flex-grow grid grid-cols-12 gap-1">
                      <div className="col-span-12 h-5 rounded bg-[#2ccb70]/20 border border-[#2ccb70]/40 flex items-center justify-between px-2 text-[9px] text-green-200 font-mono truncate">
                        <span>MASTER_AUDIO_BOOST_99.WAV</span>
                        {/* Little Audio Bars Inside Track */}
                        <div className="flex items-center gap-0.5">
                          <span className="w-0.5 h-2 bg-green-400 animate-pulse" />
                          <span className="w-0.5 h-3 bg-green-400 animate-pulse" />
                          <span className="w-0.5 h-1.5 bg-green-400 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Orange Playhead Line Overlay */}
                <div className="absolute top-[15%] bottom-0 left-[48%] w-0.5 bg-accent shadow-[0_0_8px_#FF7A00] pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Creative Accent elements to add cinematic feel */}
        <motion.div
          style={{ x: floatTranslateX, y: floatTranslateY }}
          className="absolute inset-0 pointer-events-none z-20"
        >
          {/* Audio Waveform Float Badge */}
          <div className="absolute top-2/3 left-4 md:left-24 glass-frost-badge rounded-2xl p-4 flex items-center gap-3 shadow-2xl animate-bounce [animation-duration:6s]">
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
              <Music className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-muted font-mono tracking-wide uppercase">Sound FX Sync</div>
              <div className="text-xs font-bold text-white">Foley Overlay Pro</div>
            </div>
          </div>

          {/* Timeline Float Badge */}
          <div className="absolute top-[42%] right-4 md:right-16 glass-frost-badge rounded-2xl p-4 flex items-center gap-3 shadow-2xl animate-bounce [animation-duration:8s]">
            <div className="w-8 h-8 rounded-lg bg-[#FF4D00]/20 flex items-center justify-center text-accent-light">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-muted font-mono tracking-wide uppercase">Color Grade</div>
              <div className="text-xs font-bold text-white">Hollywood LUTs Active</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Ribbon Bar of editing focus tags below hero */}
      <div className="w-full mt-24 border-y border-white/5 bg-[#080808]/40 py-6 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-xs font-mono tracking-widest text-white/50 uppercase">
          <span className="flex items-center gap-2 text-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" /> YouTube Edits
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" /> Reels & Shorts
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" /> Color Grading
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" /> Sound Design
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" /> 3D Transitions
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" /> Motion Graphics
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" /> Thumbnails
          </span>
        </div>
      </div>
    </section>
  );
}
