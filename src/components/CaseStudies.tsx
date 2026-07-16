/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Award, Users, CheckSquare, Sparkles } from 'lucide-react';
import { CaseStudy } from '../types';
import { initialCaseStudies, getStoredData } from '../data';

export default function CaseStudies() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const data = getStoredData<CaseStudy[]>('reelforge_case_studies', initialCaseStudies);
    setStudies(data);
    if (data.length > 0) {
      setActiveId(data[0].id);
    }
  }, []);

  const activeStudy = studies.find(s => s.id === activeId);

  // Helper to calculate height of graph bars
  const maxViews = activeStudy ? Math.max(...activeStudy.results.chartData.map(d => d.views)) : 1;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Case select sidebar columns - 4 cols */}
        <div className="lg:col-span-4 space-y-3">
          {studies.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className={`w-full p-5 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between h-full ${
                activeId === s.id
                  ? 'bg-gradient-to-r from-accent/15 to-transparent border-accent shadow-md'
                  : 'bg-white/2 border-white/5 hover:border-white/20'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono text-accent uppercase font-bold tracking-wider">{s.category}</span>
                <h4 className="font-display font-black text-sm sm:text-base text-white mt-1 leading-snug">
                  {s.clientName}
                </h4>
              </div>
              <div className="mt-4 flex items-center gap-1 text-[11px] font-mono text-accent font-bold uppercase">
                Analyze Strategy →
              </div>
            </button>
          ))}
        </div>

        {/* Detailed performance worksheet - 8 cols */}
        <div className="lg:col-span-8">
          {activeStudy && (
            <div className="rounded-3xl glass-card border border-white/10 p-6 sm:p-8 md:p-10 bg-gradient-to-br from-[#111] to-black h-full flex flex-col justify-between">
              
              {/* Top description */}
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-4">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-accent/15 text-accent font-mono text-[9px] uppercase tracking-wider font-bold">CASE FILE ANALYTICS</span>
                    <h3 className="font-display font-black text-xl sm:text-2xl text-white mt-1">{activeStudy.clientName}</h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-accent font-mono text-[11px] font-bold">
                    <Sparkles className="animate-pulse w-4 h-4" /> ENGINE OPTIMIZED
                  </div>
                </div>

                {/* Challenge & Solution row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs leading-relaxed">
                  <div className="p-4 rounded-xl bg-white/2 border border-white/5">
                    <h5 className="font-display font-bold text-white uppercase text-[10px] tracking-wider mb-2 text-red-400">The Growth Bottleneck</h5>
                    <p className="text-bebebe">{activeStudy.challenge}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
                    <h5 className="font-display font-bold text-white uppercase text-[10px] tracking-wider mb-2 text-accent">ReelForge Post Solution</h5>
                    <p className="text-bebebe">{activeStudy.solution}</p>
                  </div>
                </div>

                {/* Simulated engagement growth bars chart */}
                <div>
                  <h5 className="font-display font-bold text-white uppercase text-[10px] tracking-wider mb-4 flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5 text-accent" /> Audience Traffic Growth Timeline</h5>
                  
                  <div className="bg-black/60 border border-white/5 p-4 rounded-2xl space-y-4">
                    {/* Graphical grid */}
                    <div className="h-40 flex items-end justify-between gap-2 sm:gap-4 px-2 pt-4 relative">
                      
                      {/* Grid background guide lines */}
                      <div className="absolute inset-x-0 top-0 border-t border-white/5" />
                      <div className="absolute inset-x-0 top-[25%] border-t border-white/5" />
                      <div className="absolute inset-x-0 top-[50%] border-t border-white/5" />
                      <div className="absolute inset-x-0 top-[75%] border-t border-white/5" />

                      {activeStudy.results.chartData.map((data, index) => {
                        const pct = (data.views / maxViews) * 100;
                        return (
                          <div key={index} className="flex-grow flex flex-col items-center group relative z-10">
                            
                            {/* Hover info card */}
                            <div className="absolute bottom-full mb-1 bg-accent/90 backdrop-blur text-white font-mono text-[9px] px-1.5 py-0.5 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity">
                              {data.views.toLocaleString()} View impressions
                            </div>

                            {/* Solid graphic block */}
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${pct}%` }}
                              transition={{ delay: index * 0.1, duration: 0.8 }}
                              className="w-full max-w-[24px] sm:max-w-[40px] bg-gradient-to-t from-accent to-[#FF4D00] rounded-t-md relative shadow-lg shadow-accent/10"
                            />

                            <span className="text-[9px] font-mono text-muted mt-2 truncate max-w-full">
                              {data.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>

              {/* Numerical milestones footer */}
              <div className="grid grid-cols-3 gap-3 border-t border-white/5 pt-6 mt-6">
                <div className="text-center p-3 rounded-xl bg-white/2 border border-white/5">
                  <span className="text-[10px] text-muted font-mono block">VIEW CONVERSION</span>
                  <span className="font-display font-black text-sm sm:text-base text-white mt-1 block">{activeStudy.results.views}</span>
                </div>
                <div className="text-center p-3 rounded-xl bg-white/2 border border-white/5">
                  <span className="text-[10px] text-muted font-mono block">AUDIENCE RETENTION</span>
                  <span className="font-display font-black text-sm sm:text-base text-white mt-1 block">{activeStudy.results.engagement}</span>
                </div>
                <div className="text-center p-3 rounded-xl bg-white/2 border border-white/5">
                  <span className="text-[10px] text-muted font-mono block">RETAINER IMPACT</span>
                  <span className="font-display font-black text-sm sm:text-base text-white mt-1 block">{activeStudy.results.subscribers}</span>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
