import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sliders, Film, Play, Volume2, Sparkles, ZoomIn, Layers, Search, 
  Tv, Eye, Clock, Maximize2, X, CheckCircle, ArrowRight
} from 'lucide-react';
import BeforeAfterSlider from './BeforeAfterSlider';

interface VideoCompareItem {
  id: string;
  title: string;
  category: string;
  description: string;
  rawVideo: string;
  editedVideo: string;
  thumbnail: string;
  software: string[];
  metrics: string;
  duration: string;
}

const videoComparisons: VideoCompareItem[] = [
  {
    id: 'vc1',
    title: 'Finance Essay: The Inflation Curve',
    category: 'YouTube Essay',
    description: 'Transformed raw, slow-paced speaking head into a hyper-retention educational visual sequence.',
    rawVideo: 'https://www.w3schools.com/html/movie.mp4',
    editedVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    software: ['Premiere Pro', 'After Effects', 'Audition'],
    metrics: '+350% Viewer Retention Spike',
    duration: '02:15'
  },
  {
    id: 'vc2',
    title: 'Tech Sizzle Ad: Smart Ring 3D',
    category: 'Commercial Ad',
    description: 'Converted flat, raw product angles into a sleek, high-octane commercial with kinetic titles & sound FX.',
    rawVideo: 'https://www.w3schools.com/html/movie.mp4',
    editedVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    software: ['DaVinci Resolve', 'Cinema 4D', 'After Effects'],
    metrics: '4.8% Direct CTR Conversion',
    duration: '00:30'
  },
  {
    id: 'vc3',
    title: 'Podcast Highlights: AI Future',
    category: 'Vertical Clips',
    description: 'Extracted viral discussion points, cropped for vertical mobile viewports, and integrated custom dynamic caption tracks.',
    rawVideo: 'https://www.w3schools.com/html/movie.mp4',
    editedVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80',
    software: ['Premiere Pro', 'CapCut API', 'After Effects'],
    metrics: '1.2M Organic Views (Viral)',
    duration: '00:58'
  }
];

export default function EditingShowcasePage() {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeVideoCompare, setActiveVideoCompare] = useState<VideoCompareItem | null>(null);
  const [activeComparisonSide, setActiveComparisonSide] = useState<'edited' | 'raw'>('edited');
  
  // Interactive Timeline state toggles
  const [timelineTracks, setTimelineTracks] = useState({
    rawAudio: true,
    soundDesign: true,
    colorGrade: true,
    motionGraphics: true,
    pacingCuts: true
  });

  const categories = ['All', 'YouTube Essay', 'Commercial Ad', 'Vertical Clips'];

  const filteredComparisons = videoComparisons.filter(vc => {
    const matchesCategory = activeTab === 'All' || vc.category === activeTab;
    const matchesSearch = vc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          vc.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-24 md:py-32 bg-[#020202] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-3">// Drag & Toggle Showcase</span>
          <h1 className="font-display font-black text-4xl sm:text-5xl tracking-tight leading-[1.1] text-white">
            Raw Footage vs. ReelForge Master
          </h1>
          <p className="font-sans text-bebebe text-sm sm:text-base leading-relaxed mt-4">
            Take full control of the post-production stage. Slide to compare color tones, toggle sound & graphics layers, or watch raw vs. edited drafts side-by-side.
          </p>
        </div>

        {/* 1. Before/After Slide Section */}
        <div className="mb-24">
          <div className="p-8 rounded-3xl border border-white/5 bg-white/1 mb-10">
            <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-accent" /> High-Fidelity Color & Graphic Slider
            </h3>
            <p className="text-xs text-bebebe max-w-2xl mb-8 font-sans">
              Drag the floating center handle left and right to inspect raw camera LOG captures (left side) alongside our calibrated final Rec.709 color master curves (right side).
            </p>
            <BeforeAfterSlider />
          </div>
        </div>

        {/* 2. Interactive Audio & Video Track Stacker */}
        <div className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-3xl border border-white/5 bg-[#070707] relative">
            <div>
              <span className="text-accent font-mono text-[10px] tracking-widest uppercase block mb-1">
                // Timeline Track Deconstruction
              </span>
              <h3 className="font-display font-black text-xl sm:text-2xl text-white mb-4">
                Interactive Layer Sandbox
              </h3>
              <p className="text-xs text-bebebe leading-relaxed mb-6 font-sans">
                A video project is built of independent structural elements. Toggle each post-production timeline track below to see (and imagine) how we build the final master.
              </p>

              <div className="space-y-3">
                {[
                  { key: 'rawAudio', label: 'V1: Raw Dialogue Audio', icon: <Volume2 className="w-4 h-4 text-white" />, desc: 'Primary spoken words, un-equalized.' },
                  { key: 'soundDesign', label: 'A2: Immersive Foley & SFX', icon: <Volume2 className="w-4 h-4 text-accent" />, desc: 'Acoustic background pads, wooshes, swooshes.' },
                  { key: 'colorGrade', label: 'C1: Hollywood Color Calibration', icon: <Sliders className="w-4 h-4 text-accent" />, desc: 'Primary balancing and thematic grading LUTs.' },
                  { key: 'motionGraphics', label: 'G2: Custom Vector Graphics', icon: <Layers className="w-4 h-4 text-accent" />, desc: 'Pop-ins, icons, subtitles, and animated graphics.' },
                  { key: 'pacingCuts', label: 'S1: Retention Hook Cuts', icon: <Film className="w-4 h-4 text-accent" />, desc: 'Eliminating filler words, dynamic zoom steps.' }
                ].map((track) => {
                  const active = (timelineTracks as any)[track.key];
                  return (
                    <button
                      key={track.key}
                      onClick={() => setTimelineTracks({ ...timelineTracks, [track.key]: !active })}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-start gap-3 cursor-pointer transition-all ${
                        active 
                          ? 'bg-accent/10 border-accent/40 text-white' 
                          : 'bg-white/2 border-white/5 text-muted hover:border-white/10'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg shrink-0 ${active ? 'bg-accent/20 text-accent' : 'bg-white/5 text-muted'}`}>
                        {track.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-display font-bold">{track.label}</span>
                          <span className={`text-[8px] font-mono font-bold px-1 rounded uppercase ${active ? 'bg-accent/25 text-accent' : 'bg-white/10 text-muted'}`}>
                            {active ? 'ON' : 'BYPASSED'}
                          </span>
                        </div>
                        <p className="text-[10px] text-muted leading-tight mt-0.5 font-sans">{track.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 p-8 rounded-3xl border border-white/5 bg-[#050505] flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
              <span className="text-xs font-mono text-muted uppercase">Timeline Active Canvas Preview</span>
              <span className="text-[10px] font-mono text-accent animate-pulse uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent" /> Draft Sync Rendering
              </span>
            </div>

            {/* Video Preview Canvas based on active layers */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-[#000] flex items-center justify-center">
              
              {/* If Color Grading is OFF, apply a CSS grayscale/sepia/filter effect! */}
              <div className={`absolute inset-0 transition-all duration-500 overflow-hidden ${
                timelineTracks.colorGrade ? 'contrast-110 saturate-105 filter-none' : 'grayscale saturate-[20%] brightness-[80%] contrast-90'
              }`}>
                <img 
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80" 
                  alt="Video Canvas background"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* If Motion Graphics is ON, render graphic layers on top! */}
              <AnimatePresence>
                {timelineTracks.motionGraphics && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none z-10"
                  >
                    <div className="flex justify-between items-start">
                      <div className="bg-accent text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded shadow">
                        // DYNAMIC POP-IN METRIC
                      </div>
                      <div className="bg-black/80 border border-white/10 p-2 rounded-xl text-[10px] font-mono text-accent uppercase">
                        +124% Retention Loop
                      </div>
                    </div>

                    <div className="w-full text-center">
                      <span className="inline-block bg-black/85 text-white border border-white/15 px-4 py-1.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider shadow-2xl">
                        🔥 PACING IS THE ENTIRE SECRET
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* If Sound Design is ON, show visual sound waves popping up */}
              <AnimatePresence>
                {timelineTracks.soundDesign && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-4 left-4 z-10 flex gap-0.5 items-end pointer-events-none bg-black/50 px-3 py-1.5 rounded-lg backdrop-blur-sm"
                  >
                    <span className="text-[8px] font-mono text-emerald-400 mr-1 uppercase">Foley Master:</span>
                    {[2, 4, 1, 3, 5, 2, 6, 3, 1, 4, 5, 2].map((val, idx) => (
                      <motion.div 
                        key={idx}
                        className="w-1 bg-emerald-400 rounded-sm"
                        animate={{ height: [4, val * 3, 4] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: idx * 0.05 }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* If Pacing Cuts are ON, show crop overlays */}
              {timelineTracks.pacingCuts && (
                <div className="absolute inset-0 border-2 border-dashed border-accent/20 pointer-events-none z-0">
                  <div className="absolute top-2 left-2 text-[8px] font-mono text-accent/40 font-bold uppercase">Dynamic Zoom Crop Guide [1.15x]</div>
                </div>
              )}

              {/* Overlay play button indicating draft view */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent">
                  <Play className="w-6 h-6 fill-accent" />
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-white/2 border border-white/5 text-[11px] text-bebebe font-sans leading-relaxed">
              <strong>Interactive Demo Result:</strong> Toggle off <strong>Hollywood Color Calibration</strong> or <strong>Custom Vector Graphics</strong> above to see how dramatically flat the unpolished video looks! Reels with flat raw log curves and un-equalized vocals get skipped in less than 2 seconds.
            </div>
          </div>
        </div>

        {/* 3. Side-by-Side Video Players comparison */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-3">// Compare Video Drafts</span>
              <h2 className="font-display font-black text-2.5xl sm:text-3.5xl text-white">
                Sleek Side-by-Side Playbacks
              </h2>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search project types..."
                  className="pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs text-white focus:outline-none focus:border-accent w-48 font-sans"
                />
              </div>
            </div>
          </div>

          {/* Videos Grid list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredComparisons.map((vc) => (
              <div 
                key={vc.id}
                className="group rounded-2xl border border-white/5 bg-[#050505] overflow-hidden hover:border-accent/30 transition-all duration-300"
              >
                <div className="relative aspect-video bg-black overflow-hidden cursor-pointer" onClick={() => setActiveVideoCompare(vc)}>
                  <img 
                    src={vc.thumbnail} 
                    alt={vc.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-80 group-hover:opacity-40 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/85 border border-white/10 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase text-white">
                    Compare Drafts
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] font-mono text-accent uppercase tracking-wider block mb-1">{vc.category}</span>
                    <h4 className="font-display font-bold text-base text-white">{vc.title}</h4>
                    <p className="text-xs text-bebebe font-sans leading-relaxed mt-2">{vc.description}</p>
                  </div>

                  <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-muted uppercase">RESULT RECORD</span>
                    <span className="text-xs text-emerald-400 font-bold font-display">{vc.metrics}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Video Lightbox Comparison */}
      <AnimatePresence>
        {activeVideoCompare && (
          <div className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-5xl bg-[#0c0c0c] border border-white/10 rounded-3xl overflow-hidden relative p-6 space-y-6"
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveVideoCompare(null)}
                className="absolute top-4 right-4 p-2 bg-black/80 hover:bg-white/10 border border-white/10 text-white rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="text-[10px] font-mono text-accent uppercase tracking-widest">{activeVideoCompare.category} Comparison</span>
                <h3 className="font-display font-black text-xl text-white mt-1">{activeVideoCompare.title}</h3>
                <p className="text-xs text-bebebe mt-1 font-sans">{activeVideoCompare.description}</p>
              </div>

              {/* Player Canvas switcher */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Unedited RAW draft */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-xs font-mono text-muted uppercase">1. Unedited Raw Cam Log Draft</span>
                    <span className="text-[9px] font-mono text-red-400 uppercase bg-red-500/10 px-1.5 py-0.5 rounded">Unpolished</span>
                  </div>
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-white/5 bg-black">
                    <video 
                      src={activeVideoCompare.rawVideo}
                      controls
                      autoPlay
                      muted
                      loop
                      className="w-full h-full object-cover grayscale saturate-[20%] brightness-75 blur-[0.5px]"
                    />
                  </div>
                </div>

                {/* ReelForge POLISHED Master draft */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-xs font-mono text-accent uppercase">2. ReelForge Final Rec.709 Master</span>
                    <span className="text-[9px] font-mono text-emerald-400 uppercase bg-emerald-500/10 px-1.5 py-0.5 rounded font-bold">Polished</span>
                  </div>
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-accent bg-black shadow-[0_0_20px_rgba(255,122,0,0.15)]">
                    <video 
                      src={activeVideoCompare.editedVideo}
                      controls
                      autoPlay
                      muted
                      loop
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

              </div>

              {/* Details & Metrics */}
              <div className="p-4 rounded-xl bg-white/2 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] font-mono text-muted uppercase">Software pipelines:</span>
                  {activeVideoCompare.software.map((sw, idx) => (
                    <span key={idx} className="bg-white/5 border border-white/5 px-2 py-0.5 rounded text-[10px] text-white font-mono">{sw}</span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs text-emerald-400 font-bold font-display">
                  <CheckCircle className="w-4 h-4" /> Result: {activeVideoCompare.metrics}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
