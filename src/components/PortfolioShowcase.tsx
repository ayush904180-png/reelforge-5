/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Film, Clock, Award, Star, MessageSquare } from 'lucide-react';
import { PortfolioItem } from '../types';
import { initialPortfolio, getStoredData } from '../data';

export default function PortfolioShowcase() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  useEffect(() => {
    // Read live from storage to respect admin updates instantly
    setItems(getStoredData<PortfolioItem[]>('reelforge_portfolio', initialPortfolio));
  }, []);

  const categories = ['All', 'gaming', 'business', 'finance', 'education', 'real_estate', 'podcast'];

  const filteredItems = items.filter((item) => {
    return activeCategory === 'All' || item.category === activeCategory;
  });

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'gaming': return 'Gaming Highlight';
      case 'business': return 'Business Explainer';
      case 'finance': return 'Finance Analysis';
      case 'education': return 'Educational Series';
      case 'real_estate': return 'Luxury Real Estate';
      case 'podcast': return 'Podcast Clip';
      default: return 'Production';
    }
  };

  return (
    <div className="w-full space-y-10">
      
      {/* Categories select pills */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setPlayingVideoId(null); // stop playing when switching
            }}
            className={`px-4 py-2 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-all border cursor-pointer ${
              activeCategory === cat
                ? 'bg-accent border-accent text-white shadow-lg shadow-accent/25'
                : 'glass-frost-badge border-white/5 text-bebebe hover:text-white hover:border-accent/40'
            }`}
          >
            {cat === 'All' ? 'All Deliverables' : getCategoryLabel(cat)}
          </button>
        ))}
      </div>

      {/* Portfolio Grid layout */}
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
              className="group rounded-2xl overflow-hidden glass-card border border-white/10 bg-gradient-to-b from-[#111] to-black flex flex-col justify-between"
            >
              {/* Media stage */}
              <div className="relative aspect-[16/9] overflow-hidden bg-black">
                {playingVideoId === item.id && item.videoUrl ? (
                  <div className="absolute inset-0">
                    <video
                      src={item.videoUrl}
                      autoPlay
                      controls
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setPlayingVideoId(null)}
                      className="absolute top-3 right-3 bg-black/80 p-2 rounded-lg border border-white/10 text-white text-[10px] uppercase font-mono font-bold"
                    >
                      Close Player
                    </button>
                  </div>
                ) : (
                  <div className="absolute inset-0 cursor-pointer" onClick={() => setPlayingVideoId(item.id)}>
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Hover black curtain overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-accent/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </div>

                    <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-white font-mono text-[9px] uppercase">
                      Duration: {item.duration}
                    </span>
                  </div>
                )}
              </div>

              {/* Information body */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono text-accent uppercase font-bold tracking-wider">
                      {getCategoryLabel(item.category)}
                    </span>
                    <span className="text-[10px] font-mono text-muted">
                      {item.creator}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-base text-white leading-snug mb-3">
                    {item.title}
                  </h4>

                  {/* Spec pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="px-2 py-0.5 rounded bg-white/3 border border-white/5 text-[9px] font-mono text-bebebe flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 text-accent" /> {item.editingTime} Edit
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/3 border border-white/5 text-[9px] font-mono text-bebebe flex items-center gap-1">
                      <Award className="w-2.5 h-2.5 text-accent" /> {item.results}
                    </span>
                  </div>
                </div>

                {/* Testimonial bubble */}
                <div className="border-t border-white/5 pt-4 mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.clientFeedback.avatar}
                      alt={item.clientFeedback.name}
                      className="w-6 h-6 rounded-full object-cover border border-white/10"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[10px] font-display font-bold text-white">{item.clientFeedback.name}</span>
                    <div className="flex text-amber-400">
                      <Star className="w-2.5 h-2.5 fill-amber-400" />
                      <Star className="w-2.5 h-2.5 fill-amber-400" />
                      <Star className="w-2.5 h-2.5 fill-amber-400" />
                    </div>
                  </div>
                  <p className="text-[10px] text-muted leading-relaxed italic font-sans flex gap-1 items-start">
                    <MessageSquare className="w-3 h-3 text-accent shrink-0 mt-0.5" />
                    "{item.clientFeedback.comment}"
                  </p>
                </div>

              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
