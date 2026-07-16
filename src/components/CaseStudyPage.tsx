import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Award, Users, CheckSquare, Sparkles, ChevronRight, ArrowLeft, ArrowUpRight, BarChart2, Star } from 'lucide-react';
import { CaseStudy } from '../types';
import { initialCaseStudies, getStoredData } from '../data';

interface CaseStudyPageProps {
  onNavigate: (path: string) => void;
  selectedCaseStudyId?: string;
}

export default function CaseStudyPage({ onNavigate, selectedCaseStudyId }: CaseStudyPageProps) {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const data = getStoredData<CaseStudy[]>('reelforge_case_studies', initialCaseStudies);
    setStudies(data);
    
    if (selectedCaseStudyId) {
      const found = data.find(s => s.id === selectedCaseStudyId || s.clientName.toLowerCase().replace(/[^a-z0-9]+/g, '-') === selectedCaseStudyId);
      if (found) {
        setActiveId(found.id);
      } else if (data.length > 0) {
        setActiveId(data[0].id);
      }
    } else if (data.length > 0) {
      setActiveId(data[0].id);
    }
  }, [selectedCaseStudyId]);

  const activeStudy = studies.find(s => s.id === activeId);

  // Helper to calculate height of graph bars
  const maxViews = activeStudy ? Math.max(...activeStudy.results.chartData.map(d => d.views)) : 1;

  return (
    <div className="py-24 md:py-32 bg-[#020202] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-mono text-muted mb-8">
          <button onClick={() => onNavigate('/')} className="hover:text-accent cursor-pointer transition-colors">Home</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white font-semibold">Case Studies</span>
        </div>

        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-3">// Scientific Growth Diagnostics</span>
          <h1 className="font-display font-black text-4xl sm:text-5xl tracking-tight leading-[1.1] text-white">
            Algorithmic Growth Archives
          </h1>
          <p className="font-sans text-bebebe text-sm sm:text-base leading-relaxed mt-4">
            We don't just edit; we engineer retention. Look through our audit reports below to inspect verified performance metrics across active channels.
          </p>
        </div>

        {/* Main Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
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

            <div className="p-6 rounded-2xl bg-white/2 border border-white/5 mt-8 text-xs text-bebebe leading-relaxed space-y-3">
              <h5 className="font-display font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5 text-accent">
                <Sparkles className="w-4 h-4" /> Audit Method
              </h5>
              <p>
                Metrics are synced directly from YouTube Studio, TikTok Creator Analytics, and partner CRM databases. Turnaround times were standard 48h SLA retianers.
              </p>
            </div>
          </div>

          {/* Detailed performance worksheet - 8 cols */}
          <div className="lg:col-span-8">
            {activeStudy ? (
              <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#070707] space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

                {/* Header segment */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-6">
                  <div>
                    <span className="text-[10px] font-mono text-accent uppercase tracking-widest">{activeStudy.category}</span>
                    <h3 className="font-display font-black text-2xl text-white mt-1">{activeStudy.clientName}</h3>
                  </div>
                  <div className="bg-accent/10 border border-accent/20 px-3.5 py-1.5 rounded-xl text-accent font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4" /> Verified Metric
                  </div>
                </div>

                {/* Challenge vs Solution layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-2xl bg-white/2 border border-white/5 space-y-2">
                    <h4 className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                      ❌ THE CAMPAIGN CHALLENGE:
                    </h4>
                    <p className="text-xs text-bebebe leading-relaxed font-sans">{activeStudy.challenge}</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-accent/5 border border-accent/15 space-y-2">
                    <h4 className="text-[10px] font-mono font-bold text-accent uppercase tracking-wider flex items-center gap-1.5">
                      ✓ THE REELFORGE STRATEGY:
                    </h4>
                    <p className="text-xs text-bebebe leading-relaxed font-sans">{activeStudy.solution}</p>
                  </div>
                </div>

                {/* SVG/HTML high quality growth performance graph */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-mono font-bold text-muted uppercase tracking-wider flex items-center gap-1.5">
                    <BarChart2 className="w-4 h-4 text-accent" /> VIEWERSHIP VELOCITY GROWTH TIMELINE
                  </h4>

                  <div className="p-6 rounded-2xl bg-black border border-white/5 space-y-6">
                    {/* Graph bar stackers */}
                    <div className="h-44 flex items-end justify-between gap-2.5 sm:gap-4 pt-4 border-b border-white/5">
                      {activeStudy.results.chartData.map((dataPoint, idx) => {
                        const heightPct = Math.max(8, (dataPoint.views / maxViews) * 100);
                        return (
                          <div key={idx} className="flex-grow flex flex-col items-center group relative h-full justify-end">
                            {/* Hover tooltip */}
                            <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-accent px-2 py-0.5 rounded text-[9px] font-mono text-white font-bold whitespace-nowrap shadow-md z-10 pointer-events-none">
                              {(dataPoint.views / 1000).toFixed(0)}k Views
                            </div>
                            
                            {/* Animated column bar */}
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: `${heightPct}%` }}
                              transition={{ duration: 0.8, delay: idx * 0.05 }}
                              className="w-full rounded-t-lg bg-gradient-to-t from-accent to-[#FF4D00] shadow-[0_0_15px_rgba(255,122,0,0.15)] group-hover:from-white group-hover:to-accent transition-all cursor-pointer relative"
                            />
                            
                            <span className="text-[8px] font-mono text-muted group-hover:text-white uppercase tracking-wider mt-2.5 text-center truncate w-full">
                              {dataPoint.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="flex items-center justify-between text-[9px] font-mono text-muted">
                      <span>BASELINE PLATFORM BENCHMARK</span>
                      <span>+1200% VELOCITY ACCELERATION RATIO</span>
                    </div>
                  </div>
                </div>

                {/* High Impact Results KPI box */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-mono font-bold text-muted uppercase tracking-wider flex items-center gap-1.5">
                    🏆 ALGORITHMIC KEY PERFORMANCE INDICATORS (KPIs):
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-white/2 border border-white/5">
                      <span className="text-[9px] font-mono text-muted uppercase">TOTAL ENGAGEMENT</span>
                      <div className="text-accent font-display font-black text-lg mt-1">{activeStudy.results.engagement}</div>
                    </div>
                    <div className="flex flex-col justify-center p-4 rounded-xl bg-white/2 border border-white/5">
                      <span className="text-[9px] font-mono text-muted uppercase">SUBSCRIBERS GAINED</span>
                      <div className="text-white font-display font-black text-lg mt-1">{activeStudy.results.subscribers}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                      <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider font-bold">AUDIENCE SCALE</span>
                      <div className="text-white font-display font-black text-lg mt-1">{activeStudy.results.views}</div>
                    </div>
                  </div>
                </div>

                {/* Strategy Testimonial */}
                <div className="p-6 rounded-2xl border border-white/5 bg-gradient-to-tr from-[#111] to-black space-y-4">
                  <div className="flex gap-0.5 text-accent">
                    <Star className="w-3.5 h-3.5 fill-accent" />
                    <Star className="w-3.5 h-3.5 fill-accent" />
                    <Star className="w-3.5 h-3.5 fill-accent" />
                    <Star className="w-3.5 h-3.5 fill-accent" />
                    <Star className="w-3.5 h-3.5 fill-accent" />
                  </div>
                  <p className="text-xs italic text-bebebe leading-relaxed font-sans">
                    "ReelForge took our raw recordings and transformed them into high-conversion master files. Our audience watch times literally doubled in less than 30 days of consistent retainer delivery."
                  </p>
                  <div className="text-[10px] font-mono text-muted uppercase font-bold text-right">
                    — Creative Director, {activeStudy.clientName}
                  </div>
                </div>

                {/* Consultation Booking CTA */}
                <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-white/5">
                  <span className="text-xs text-muted font-sans text-center sm:text-left">
                    Ready to scale your content channel with equivalent algorithmic precision?
                  </span>
                  <button
                    onClick={() => onNavigate('/contact')}
                    className="px-6 py-3 rounded-xl bg-accent hover:bg-accent-dark text-white font-display font-black text-xs uppercase tracking-wider cursor-pointer shadow-lg transition-transform hover:scale-[1.01] shrink-0"
                  >
                    Request Channel Audit <ArrowUpRight className="w-4 h-4 inline-block ml-1" />
                  </button>
                </div>

              </div>
            ) : (
              <div className="py-20 text-center text-muted font-mono text-xs border border-dashed border-white/10 rounded-3xl">
                Select a Case Study from the sidebar to inspect strategy parameters.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
