import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Pause, Film, Clock, Award, Star, MessageSquare, Search, 
  ChevronRight, Calendar, ArrowLeft, Heart, Share2, CheckCircle2 
} from 'lucide-react';
import { PortfolioItem } from '../types';
import { initialPortfolio, getStoredData } from '../data';

interface PortfolioPageProps {
  onNavigate: (path: string) => void;
  selectedProjectId?: string;
}

export default function PortfolioPage({ onNavigate, selectedProjectId }: PortfolioPageProps) {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    const data = getStoredData<PortfolioItem[]>('reelforge_portfolio', initialPortfolio);
    setItems(data);

    if (selectedProjectId) {
      const found = data.find(p => p.id === selectedProjectId || p.title.toLowerCase().replace(/\s+/g, '-') === selectedProjectId);
      if (found) {
        setSelectedItem(found);
      } else {
        setSelectedItem(null);
      }
    } else {
      setSelectedItem(null);
    }
  }, [selectedProjectId]);

  const categories = ['All', 'gaming', 'business', 'finance', 'education', 'real_estate', 'podcast'];

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'gaming': return 'Gaming Highlights';
      case 'business': return 'Business Explainers';
      case 'finance': return 'Finance Analysis';
      case 'education': return 'Educational Series';
      case 'real_estate': return 'Luxury Real Estate';
      case 'podcast': return 'Podcast Clips';
      default: return 'Production';
    }
  };

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          getCategoryLabel(item.category).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (selectedItem) {
    return (
      <div className="py-24 md:py-32 bg-[#020202] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-muted mb-8">
            <button onClick={() => onNavigate('/portfolio')} className="hover:text-accent cursor-pointer transition-colors">Portfolio</button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-semibold">{selectedItem.title}</span>
          </div>

          <button 
            onClick={() => onNavigate('/portfolio')}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 text-xs font-display font-bold text-bebebe hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio grid
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Big Player & Description (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl">
                {selectedItem.videoUrl ? (
                  <video 
                    src={selectedItem.videoUrl} 
                    controls 
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img 
                    src={selectedItem.thumbnailUrl} 
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div>
                <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-2">// Creative Masterpiece Showcase</span>
                <h1 className="font-display font-black text-3xl sm:text-4xl text-white mb-4">{selectedItem.title}</h1>
                <p className="text-sm text-bebebe font-sans leading-relaxed">
                  This showcase asset was crafted with precision pacing, cinematic color science, and dense multichannel sound design. The pacing is engineered to retain viewer focus, with transitions and pattern interrupts calibrated at high-impact intervals.
                </p>
              </div>

              {/* Client feedback */}
              {selectedItem.clientFeedback && (
                <div className="p-8 rounded-3xl border border-white/5 bg-gradient-to-tr from-[#0a0a0a] to-[#040404] space-y-6">
                  <div className="flex gap-1 text-accent">
                    <Star className="w-4 h-4 fill-accent" />
                    <Star className="w-4 h-4 fill-accent" />
                    <Star className="w-4 h-4 fill-accent" />
                    <Star className="w-4 h-4 fill-accent" />
                    <Star className="w-4 h-4 fill-accent" />
                  </div>
                  <p className="text-sm italic text-bebebe leading-relaxed">
                    "{selectedItem.clientFeedback.comment}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img 
                      src={selectedItem.clientFeedback.avatar} 
                      alt={selectedItem.clientFeedback.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/15"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-xs font-display font-bold text-white">{selectedItem.clientFeedback.name}</h4>
                      <p className="text-[10px] text-muted font-sans uppercase font-semibold">Verified Creator Partner</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Project metadata sidebar (5 cols) */}
            <div className="lg:col-span-5 p-8 rounded-3xl border border-white/5 bg-[#070707] space-y-6">
              <h3 className="font-display font-bold text-base text-white uppercase tracking-wider border-b border-white/5 pb-4">
                Project Spec Worksheet
              </h3>

              <div className="space-y-4 text-xs font-sans">
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-muted">Creator Client:</span>
                  <span className="text-white font-bold">{selectedItem.creator}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-muted">Target Category:</span>
                  <span className="text-accent font-bold uppercase">{getCategoryLabel(selectedItem.category)}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-muted">Running Length:</span>
                  <span className="text-white font-mono">{selectedItem.duration} Mins</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-muted">Editing Pipeline:</span>
                  <span className="text-white font-mono font-bold">{selectedItem.editingTime}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-muted">Deliverable date:</span>
                  <span className="text-white font-mono">July 2026 (Completed)</span>
                </div>
              </div>

              {/* Software stack */}
              <div className="space-y-3">
                <h4 className="text-xs font-display font-bold text-white uppercase tracking-wider">Post-Production Software Pipeline:</h4>
                <div className="flex flex-wrap gap-2">
                  {(selectedItem.softwareUsed || []).map((sw, idx) => (
                    <span key={idx} className="bg-white/5 border border-white/5 text-[10px] text-white font-mono px-2.5 py-1 rounded-lg">
                      {sw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Results metrics */}
              <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-1.5">
                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider font-bold">ALGORITHMIC RESULT TARGET</span>
                <div className="text-white font-display font-black text-xl flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> {selectedItem.results}
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => onNavigate('/contact')}
                  className="w-full py-4 rounded-xl bg-accent hover:bg-accent-dark text-white font-display font-black text-xs uppercase tracking-wider text-center shadow-lg cursor-pointer transition-colors"
                >
                  Book Identical Visual Polish
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="py-24 md:py-32 bg-[#020202] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-3">// Handcrafted creator releases</span>
            <h1 className="font-display font-black text-4xl sm:text-5xl tracking-tight leading-[1.1] text-white">
              Sleek Deliverable Showcase
            </h1>
            <p className="font-sans text-bebebe text-xs sm:text-sm leading-relaxed mt-2">
              Browse through our live database of processed videos. Select filters to browse projects within specific digital niches.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search creator name or title..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-white focus:outline-none focus:border-accent font-sans"
            />
          </div>
        </div>

        {/* Categories select pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setPlayingVideoId(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                activeCategory === cat
                  ? 'bg-accent border-accent text-white shadow-lg'
                  : 'glass-frost-badge border-white/5 text-bebebe hover:text-white hover:border-accent/40'
              }`}
            >
              {cat === 'All' ? 'All Deliverables' : getCategoryLabel(cat)}
            </button>
          ))}
        </div>

        {/* Portfolio Masonry Standard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group rounded-3xl overflow-hidden glass-card border border-white/5 bg-gradient-to-b from-[#111] to-black flex flex-col justify-between"
              >
                {/* Media stage */}
                <div className="relative aspect-video overflow-hidden bg-black">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-80 group-hover:opacity-40 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => onNavigate(`/portfolio/${item.id}`)}
                      className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Play className="w-5 h-5 fill-white" />
                    </button>
                  </div>
                  <div className="absolute top-3 left-3 bg-black/80 px-2 py-0.5 rounded text-[8px] font-mono font-bold text-accent border border-white/5 uppercase">
                    {getCategoryLabel(item.category)}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 px-2.5 py-0.5 rounded text-[9px] font-mono text-white">
                    {item.duration} MINS
                  </div>
                </div>

                {/* Content details */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-muted uppercase">{item.creator}</span>
                    <h4 className="font-display font-black text-sm text-white leading-snug group-hover:text-accent transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-bebebe font-sans leading-relaxed line-clamp-2">
                      Precision color grading and multi-layered Foley sound effects engineered to maximize audience satisfaction and algorithm velocity.
                    </p>
                  </div>

                  {/* Software used and result indicators */}
                  <div className="mt-6 border-t border-white/5 pt-4 flex flex-col gap-3">
                    <div className="flex gap-1.5 flex-wrap">
                      {(item.softwareUsed || []).slice(0, 3).map((sw, idx) => (
                        <span key={idx} className="bg-white/3 text-[9px] text-muted font-mono px-2 py-0.5 rounded uppercase">
                          {sw}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-muted uppercase">Conversions</span>
                      <span className="text-xs text-emerald-400 font-bold font-display">{item.results}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
