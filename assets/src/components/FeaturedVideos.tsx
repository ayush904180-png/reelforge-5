/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Play, Eye, Film, Award, CheckCircle } from 'lucide-react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { motion } from 'motion/react';

export default function FeaturedVideos() {
  // Grab a subset of projects to act as in-page playlist
  const playlist: Project[] = PROJECTS.slice(2, 6);
  const [activeVideo, setActiveVideo] = useState<Project>(playlist[0]);

  return (
    <section
      id="featured-videos"
      className="relative py-28 md:py-36 bg-bg-deep border-t border-white/5 overflow-hidden"
    >
      {/* Background spotlights */}
      <div className="absolute left-[5%] top-[10%] w-[500px] h-[500px] radial-glow pointer-events-none opacity-20" />
      <div className="absolute right-[10%] bottom-[10%] w-[450px] h-[450px] radial-glow pointer-events-none opacity-15" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
          <div>
            <div className="text-accent font-mono text-sm tracking-widest uppercase mb-3">
              // Immersive Experience
            </div>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-[54px] tracking-tight text-white leading-tight">
              Featured Showcase
            </h2>
            <p className="mt-4 text-muted text-base sm:text-lg max-w-xl font-sans">
              Watch our high-end edits directly. Switch between projects in the sidebar playlist to experience true pacing, dynamic audio syncing, and color precision.
            </p>
          </div>
          <div className="flex items-center gap-3 glass-frost-badge rounded-xl px-4 py-2.5 self-start">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white">4K Cine-Streaming Live</span>
          </div>
        </div>

        {/* Dynamic Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Main Cinematic Video Player Spotlight (Col 7) */}
          <motion.div
            key={activeVideo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-between glass-card rounded-2xl overflow-hidden p-2 shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
          >
            {/* The actual Embed Frame */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black glow-border">
              <iframe
                src={activeVideo.videoUrl}
                title={activeVideo.title}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Details */}
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-accent/20 text-accent border border-accent/20">
                  {activeVideo.category}
                </span>
                <span className="text-xs text-muted font-mono flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-accent-light" />
                  {activeVideo.views || '1.2M Views'}
                </span>
                <span className="text-xs text-muted font-mono">
                  {activeVideo.duration} mins
                </span>
              </div>
              
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
                {activeVideo.title}
              </h3>
              
              <p className="mt-2 text-sm text-bebebe font-sans leading-relaxed">
                Featuring cinema-grade color LUTs matching natural skin tones, deep sound effects mixing, and high-retention zoom effects to retain active visual metrics.
              </p>
            </div>
          </motion.div>

          {/* Selector Sidebar Playlist (Col 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="font-display font-black text-lg text-white mb-2 uppercase tracking-wider text-xs font-mono text-muted flex items-center gap-2">
              <Film className="w-4 h-4 text-accent" />
              Spotlight Playlist
            </div>

            <div className="space-y-3 flex-grow overflow-y-auto max-h-[480px] pr-2">
              {playlist.map((video) => {
                const isActive = activeVideo.id === video.id;
                return (
                  <button
                    key={video.id}
                    onClick={() => setActiveVideo(video)}
                    className={`w-full text-left p-4 rounded-xl border flex items-center gap-4 transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-accent/10 border-accent shadow-[0_0_15px_rgba(255,122,0,0.15)]'
                        : 'glass-frost-badge hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    {/* Tiny Thumbnail */}
                    <div className="relative w-20 sm:w-24 aspect-video rounded-lg overflow-hidden shrink-0 bg-black">
                      <img
                        src={video.thumbnailUrl}
                        alt={`${video.title} Small Thumbnail`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {isActive ? (
                        <div className="absolute inset-0 bg-accent/40 flex items-center justify-center">
                          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                        </div>
                      ) : (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20">
                          <Play className="w-4 h-4 text-white fill-current" />
                        </div>
                      )}
                    </div>

                    {/* Metadata brief */}
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-accent">
                          {video.category}
                        </span>
                        <span className="text-[10px] font-mono text-muted">
                          {video.duration}
                        </span>
                      </div>
                      
                      <h4 className={`font-display font-bold text-sm truncate leading-snug ${isActive ? 'text-accent' : 'text-white'}`}>
                        {video.title}
                      </h4>
                      
                      <div className="text-[11px] text-muted truncate mt-0.5 font-sans">
                        Client: {video.clientName}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick trust metrics panel */}
            <div className="glass-card rounded-xl p-4 flex items-center gap-4">
              <Award className="w-10 h-10 text-accent shrink-0" />
              <div>
                <h4 className="font-display font-semibold text-sm text-white">Full Copyright Cleared</h4>
                <p className="text-xs text-muted mt-0.5">
                  All audio tracks, licensed visual overlays, and SFX are fully royalty-cleared prior to final handoff.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
