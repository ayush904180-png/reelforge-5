/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Play, X, Sliders, Calendar, User, Eye, Sparkles } from 'lucide-react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES = [
  { value: 'all', label: 'All Works' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'reels', label: 'Shorts & Reels' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'documentary', label: 'Documentary' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'corporate', label: 'Corporate' },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeLightbox, setActiveLightbox] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.category === activeFilter;
  });

  return (
    <section
      id="portfolio"
      className="relative py-28 md:py-36 bg-[#080808] border-t border-white/5"
    >
      {/* Background spotlights */}
      <div className="absolute right-[5%] bottom-[15%] w-[450px] h-[450px] radial-glow pointer-events-none opacity-20" />
      <div className="absolute left-[10%] top-[10%] w-[500px] h-[500px] radial-glow pointer-events-none opacity-25" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="text-accent font-mono text-sm tracking-widest uppercase mb-3">
            // Our Featured Masterpieces
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-[54px] tracking-tight text-white leading-tight">
            Featured Works
          </h2>
          <p className="mt-4 text-muted text-base sm:text-lg font-sans">
            A hand-picked collection of premium edits showing high narrative sync, color, sound, and motion integration.
          </p>
        </div>

        {/* Filter List */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 md:mb-16">
          {CATEGORIES.map((cat) => {
            const isSelected = activeFilter === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'text-white bg-accent shadow-[0_0_15px_rgba(255,122,0,0.35)]'
                    : 'text-bebebe/70 glass-frost-badge hover:text-white hover:border-white/20'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid with Masonry Vibe */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                onClick={() => setActiveLightbox(project)}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative rounded-2xl overflow-hidden aspect-[16/10] glass-card shadow-lg cursor-pointer"
              >
                {/* Thumbnail Image */}
                <img
                  src={project.thumbnailUrl}
                  alt={`${project.title} Video Thumbnail Preview`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Always-on Info (Bottom) */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-accent/20 text-accent-light border border-accent/20">
                      {project.category}
                    </span>
                    <span className="text-[11px] font-mono text-muted">
                      {project.duration}
                    </span>
                  </div>
                  
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight line-clamp-1 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <div className="text-xs text-muted mt-1 font-sans flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>Client: {project.clientName}</span>
                  </div>
                </div>

                {/* Hover Play State Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-[2px]">
                  <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-accent text-white shadow-[0_0_20px_rgba(255,122,0,0.6)] scale-90 group-hover:scale-100 transition-all duration-300">
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    <div className="absolute inset-0 rounded-full border border-white/20 scale-110 animate-ping pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Fullscreen Video Lightbox */}
      <AnimatePresence>
        {activeLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          >
            {/* Backdrop */}
            <div
              onClick={() => setActiveLightbox(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />

            {/* Lightbox container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-5xl glass-card rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col"
            >
              {/* Close Bar */}
              <div className="flex items-center justify-between px-6 py-4 bg-white/2 backdrop-blur-md border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-accent/20 text-accent">
                    {activeLightbox.category}
                  </span>
                  <span className="text-[11px] font-mono text-muted">
                    {activeLightbox.duration}
                  </span>
                </div>
                <button
                  onClick={() => setActiveLightbox(null)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:text-accent flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Video Player Area */}
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={activeLightbox.videoUrl}
                  title={activeLightbox.title}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Metadata Details Foot */}
              <div className="p-6 md:p-8 bg-white/1 backdrop-blur-md grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                    {activeLightbox.title}
                  </h3>
                  <p className="mt-3 text-sm text-bebebe leading-relaxed font-sans">
                    A cinematic video showcasing cutting-edge editing tricks, custom multi-layered grading, sound effects Foley integration, and precise retention cuts matching the musical audio timeline perfectly.
                  </p>
                </div>
                
                {/* Specific project attributes */}
                <div className="flex flex-col gap-4 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6 text-xs font-mono text-muted">
                  <div className="flex items-center gap-2.5">
                    <User className="w-4 h-4 text-accent" />
                    <div>
                      <div className="uppercase tracking-widest text-[9px]">Client Profile</div>
                      <div className="text-white font-sans text-sm font-semibold mt-0.5">{activeLightbox.clientName}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Eye className="w-4 h-4 text-accent" />
                    <div>
                      <div className="uppercase tracking-widest text-[9px]">Calculated Views</div>
                      <div className="text-white font-sans text-sm font-semibold mt-0.5">{activeLightbox.views || '1.2M Views'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <div>
                      <div className="uppercase tracking-widest text-[9px]">Technical Suite</div>
                      <div className="text-white font-sans text-sm font-semibold mt-0.5">Premiere Pro, DaVinci Resolve</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
