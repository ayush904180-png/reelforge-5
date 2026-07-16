/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Film, Sliders, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface ComparisonProject {
  id: string;
  name: string;
  description: string;
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
  improvementText: string;
}

const comparisonProjects: ComparisonProject[] = [
  {
    id: 'c1',
    name: 'Luxury Real Estate',
    description: 'Balancing extreme exposure & restoring rich dynamic colors.',
    beforeImg: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=50&sat=-50&brightness=60&contrast=80', // Dull, flat RAW
    afterImg: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=90&sat=120&contrast=110', // Vibrant cinematic
    beforeLabel: 'Flat Camera Log (S-Log3)',
    afterLabel: 'ReelForge Rec.709 Master',
    improvementText: '+45% Color Separation & Light Contrast Balanced'
  },
  {
    id: 'c2',
    name: 'Corporate Workspace',
    description: 'Transforming flat, under-exposed office lighting into warm professional branding.',
    beforeImg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=50&sat=-40&brightness=70',
    afterImg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=90&sat=100&brightness=100&contrast=110',
    beforeLabel: 'Raw Phone Interview Clip',
    afterLabel: 'Studio Grade Relighting',
    improvementText: 'Restored Dynamic Range & Cinematic Skin Tone Mapping'
  },
  {
    id: 'c3',
    name: 'Gaming Cinematic',
    description: 'Intensifying game atmospheres with heavy contrast curves & neon color grades.',
    beforeImg: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=50&sat=-60&brightness=50',
    afterImg: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=90&sat=140&brightness=110&contrast=120',
    beforeLabel: 'Unedited Gameplay Stream',
    afterLabel: 'High-Octane Color Science',
    improvementText: 'Vibrant Neon Highlights & 3D VFX Pop-ins Added'
  }
];

export default function BeforeAfterSlider() {
  const [activeProj, setActiveProj] = useState<ComparisonProject>(comparisonProjects[0]);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0-100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    handleMove(clientX);
  };

  return (
    <div className="w-full">
      {/* Category selector tabs */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {comparisonProjects.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setActiveProj(p);
              setSliderPosition(50);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-all border cursor-pointer ${
              activeProj.id === p.id
                ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20'
                : 'glass-frost-badge border-white/5 text-bebebe hover:text-white hover:border-accent/40'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Comparison description card */}
      <div className="text-center mb-6 max-w-2xl mx-auto">
        <p className="text-sm text-bebebe font-sans leading-relaxed">
          {activeProj.description}
        </p>
        <span className="inline-block mt-2.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-[11px] font-semibold">
          {activeProj.improvementText}
        </span>
      </div>

      {/* Interactive slider stage */}
      <div 
        ref={containerRef}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        onMouseMove={(e) => isDragging.current && handleMove(e.clientX)}
        onTouchMove={(e) => isDragging.current && handleMove(e.touches[0].clientX)}
        className="relative w-full max-w-4xl mx-auto aspect-[16/9] rounded-2xl overflow-hidden glass-card border border-white/10 select-none cursor-ew-resize group"
      >
        {/* BEFORE IMAGE (Bottom Layer) */}
        <div className="absolute inset-0">
          <img 
            src={activeProj.beforeImg} 
            alt="Before editing"
            className="w-full h-full object-cover pointer-events-none"
            referrerPolicy="no-referrer"
          />
          {/* Label */}
          <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/5 text-white font-mono text-[10px] uppercase tracking-wider">
            {activeProj.beforeLabel}
          </div>
        </div>

        {/* AFTER IMAGE (Top Layer, clipped based on sliderPosition) */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <img 
            src={activeProj.afterImg} 
            alt="After ReelForge editing"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            referrerPolicy="no-referrer"
          />
          {/* Label */}
          <div className="absolute top-4 right-4 bg-accent/95 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-white font-mono text-[10px] uppercase tracking-wider font-bold shadow-lg">
            {activeProj.afterLabel}
          </div>
        </div>

        {/* SLIDER LINE & HANDLE */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-accent pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shadow-2xl shadow-accent/50 group-hover:scale-110 transition-transform duration-200">
            <Sliders className="w-4 h-4 rotate-90" />
          </div>
          {/* Assist arrows */}
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 flex gap-12 text-white/50 text-xs font-mono select-none pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity">
            <span className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded border border-white/5"><ChevronLeft className="w-3 h-3 text-accent" /> Drag</span>
            <span className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded border border-white/5">Reveal <ChevronRight className="w-3 h-3 text-accent" /></span>
          </div>
        </div>
      </div>
      <div className="text-center mt-3 text-[10px] text-muted font-sans flex items-center justify-center gap-1.5">
        <Eye className="w-3.5 h-3.5 text-accent" /> Drag the orange center handle to see real-time color mapping & detail restoral.
      </div>
    </div>
  );
}
