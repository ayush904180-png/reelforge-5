/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Sparkle,
  Cpu, 
  Terminal, 
  FileText, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  ListTodo, 
  ChevronRight, 
  Calendar,
  Layers,
  Activity
} from 'lucide-react';

interface AiQuoteInput {
  description: string;
  platform: 'youtube' | 'reels' | 'gaming' | 'commercial' | 'podcast';
  duration: string;
  deadline: string;
  budget: string;
}

export default function AiQuoteGenerator({ onBookCallClick }: { onBookCallClick: () => void }) {
  const [inputs, setInputs] = useState<AiQuoteInput>({
    description: '',
    platform: 'youtube',
    duration: '10 Mins',
    deadline: '5 Days',
    budget: '$500 - $1,000'
  });

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [generatedOutput, setGeneratedOutput] = useState<any | null>(null);

  const steps = [
    'Parsing project description & target demographic...',
    'Analyzing hook-retention requirements & visual cues...',
    'Drafting multi-camera sound design & Foley profiles...',
    'Selecting optimal LUT color spaces & vector layers...',
    'Synthesizing price matrix and delivery checkpoints...'
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputs.description) return;

    setLoading(true);
    setGeneratedOutput(null);
    setCurrentStep(0);

    // Simulate analysis timeline
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          // Generate final analysis
          setTimeout(() => {
            setGeneratedOutput(generateProposal(inputs));
            setLoading(false);
          }, 600);
          return prev;
        }
        return prev + 1;
      });
    }, 900);
  };

  const generateProposal = (data: AiQuoteInput) => {
    const d = data.description.toLowerCase();
    
    // Core AI parsing algorithm based on keywords
    let niche = 'General Agency Production';
    let designHooks: string[] = [];
    let customSoundscapes: string[] = [];
    let dynamicVfx: string[] = [];
    let recPackage = 'ReelForge Growth Retainer';
    let estPrice = '$450 - $750';
    let scopeDetails: string[] = [];

    if (d.includes('game') || d.includes('gaming') || d.includes('apex') || d.includes('minecraft') || d.includes('letplay')) {
      niche = 'Gaming Highlight / Livestream Streamline';
      designHooks = [
        'Comedic high-zoom tension scale in the first 4 seconds.',
        'High-octane game audio ducking to emphasize clutch clips.'
      ];
      customSoundscapes = [
        'Cinematic gameplay sound design layering (kill counters, weapon clicks, sub bass booms).',
        'Balanced, copyrighted-cleared energetic lo-fi synth tracks.'
      ];
      dynamicVfx = [
        'Animated kill tracking tags & zoom pop-ups.',
        'Neon border highlight cues on intense clutches.'
      ];
      recPackage = 'ReelForge Esports Growth';
      estPrice = '$390 - $550 per video';
      scopeDetails = [
        'Convert 3 hours of stream footage to 15-minute high-retention highlight.',
        'Deliver 3 TikTok/Reel clips with identical custom fonts.'
      ];
    } else if (d.includes('finance') || d.includes('money') || d.includes('stock') || d.includes('investing') || d.includes('crypto')) {
      niche = 'High-Value Finance & Wealth Explainer';
      designHooks = [
        'Intense chart overlay within 3 seconds to prove factual premise.',
        'Attention-grabbing hook questioning a well-known economic rule.'
      ];
      customSoundscapes = [
        'Typing machine audio sounds layered under graphic figures.',
        'Clean, motivational acoustic ambient backing soundtrack.'
      ];
      dynamicVfx = [
        'High-end vector graph animated pathways.',
        'Gold color accent LUT balance to establish wealth psychology.'
      ];
      recPackage = 'ReelForge Growth Tier (Finance Spec)';
      estPrice = '$490 - $690 per video';
      scopeDetails = [
        'High-retention editing focused on detailed statistics.',
        'Included matching A/B testable YouTube Thumbnails.'
      ];
    } else if (d.includes('real estate') || d.includes('house') || d.includes('home') || d.includes('villa') || d.includes('listing')) {
      niche = 'Luxury Real Estate Cinematic Drone Showcase';
      designHooks = [
        'Slow cinematic speed ramp revealing Malibu style beachfront villa on beat.',
        'High-end light flares paired with elegant typography logo overlay.'
      ];
      customSoundscapes = [
        'Foley-grade natural ambiance (waves crashing, warm fire crackles, birds chirping).',
        'Sophisticated classical orchestral or premium ambient track.'
      ];
      dynamicVfx = [
        'Elegant gold border labels and architectural specs tracking texts.',
        'Deep-level HDR Rec.2020 color matching across drone and gimbal clips.'
      ];
      recPackage = 'ReelForge Elite Cinematic Plan';
      estPrice = '$650 - $950 per Listing';
      scopeDetails = [
        'Full 4K HDR delivery with dedicated color balancing.',
        'Matching vertical Realtor TikTok and horizontal full home tour.'
      ];
    } else if (d.includes('podcast') || d.includes('interview') || d.includes('talk') || d.includes('show')) {
      niche = 'Multi-Cam Podcast Show';
      designHooks = [
        'Intense quote-bite opening selection immediately on load.',
        'Sleek multi-speaker split frame overlay.'
      ];
      customSoundscapes = [
        'Clean speech volume normalization, filler word removal, and de-essing.',
        'Subtle low-frequency hum dampening and sound gate leveling.'
      ];
      dynamicVfx = [
        'Minimalist indicator lights signaling active speakers.',
        'Custom social lower thirds and animated popups.'
      ];
      recPackage = 'ReelForge Podcast Retainer (Growth)';
      estPrice = '$550 - $850 per episode';
      scopeDetails = [
        'Synchronous edits for 3 camera angles.',
        'Delivery of 5 viral vertical subtitle clips.'
      ];
    } else {
      // Default fallback
      niche = 'Cinematic Corporate Brand Storytelling';
      designHooks = [
        'High-impact hook with vector typography explaining corporate mission.',
        'Dynamic audio transitions to retain retention rate.'
      ];
      customSoundscapes = [
        'Deep environmental sound design & Foley layering.',
        'Premium modern electronic or warm indie-pop soundtrack.'
      ];
      dynamicVfx = [
        'Corporate brand color-matching, high-end LUTs.',
        'Subtle 3D graphic overlays and clean slide wipes.'
      ];
      recPackage = 'ReelForge Elite Retainer';
      estPrice = '$490 - $800 per video';
      scopeDetails = [
        'Professional cinematic color correction.',
        'Full licensed SFX suite and 2 Free revision rounds.'
      ];
    }

    return {
      niche,
      designHooks,
      customSoundscapes,
      dynamicVfx,
      recPackage,
      estPrice,
      scopeDetails,
      targetPlatform: data.platform.toUpperCase(),
      estimatedDelivery: data.deadline
    };
  };

  return (
    <div className="w-full rounded-3xl glass-card border border-white/5 p-6 sm:p-8 md:p-10 relative overflow-hidden bg-gradient-to-br from-[#0c0c0c] to-[#040404]">
      
      {/* Absolute top grid glow */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-accent/50 to-accent" />
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-accent font-mono text-[10px] tracking-widest uppercase block mb-1">
            // ReelGPT Strategy Engine v2.0
          </span>
          <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
            Instant AI Production Blueprint
          </h3>
          <p className="text-xs text-bebebe mt-1">
            Pitch your concept. Our model will generate a high-retention editing timeline & pricing scope.
          </p>
        </div>
        <div className="flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 font-mono text-[10px] text-muted">
          <Cpu className="w-3.5 h-3.5 text-accent animate-pulse" /> ENGINE ONLINE
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Form Column */}
        <form onSubmit={handleGenerate} className="lg:col-span-5 space-y-4">
          
          <div>
            <label className="block text-[10px] text-muted uppercase tracking-wider font-mono mb-1.5">
              Pitch your Video Project Description
            </label>
            <textarea
              required
              rows={4}
              value={inputs.description}
              onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
              placeholder="e.g. I need gaming highlights edited with fast kinetic subtitles, funny zooms, and heavy sound effects like gamer soundboards. My streams are 3 hours."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white text-xs sm:text-sm focus:outline-none focus:border-accent resize-none placeholder:text-muted/60"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-muted uppercase tracking-wider font-mono mb-1.5">
                Target Platform
              </label>
              <select
                value={inputs.platform}
                onChange={(e) => setInputs({ ...inputs, platform: e.target.value as any })}
                className="w-full px-3 py-3 rounded-xl bg-white/5 border border-white/5 text-white text-xs sm:text-sm focus:outline-none focus:border-accent cursor-pointer"
              >
                <option value="youtube">YouTube Long</option>
                <option value="reels">TikTok / Reel / Shorts</option>
                <option value="gaming">Gaming highlight</option>
                <option value="commercial">Commercial Campaign</option>
                <option value="podcast">Podcast Episode</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-muted uppercase tracking-wider font-mono mb-1.5">
                Video Duration
              </label>
              <input
                type="text"
                value={inputs.duration}
                onChange={(e) => setInputs({ ...inputs, duration: e.target.value })}
                placeholder="e.g. 10 Mins"
                className="w-full px-3 py-3 rounded-xl bg-white/5 border border-white/5 text-white text-xs sm:text-sm focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-muted uppercase tracking-wider font-mono mb-1.5">
                Target Deadline
              </label>
              <select
                value={inputs.deadline}
                onChange={(e) => setInputs({ ...inputs, deadline: e.target.value })}
                className="w-full px-3 py-3 rounded-xl bg-white/5 border border-white/5 text-white text-xs sm:text-sm focus:outline-none focus:border-accent cursor-pointer"
              >
                <option value="24 Hours">Urgent (24h)</option>
                <option value="3 Days">3 Days</option>
                <option value="5 Days">5 Days</option>
                <option value="1 Week">1 Week</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-muted uppercase tracking-wider font-mono mb-1.5">
                Target Budget
              </label>
              <select
                value={inputs.budget}
                onChange={(e) => setInputs({ ...inputs, budget: e.target.value })}
                className="w-full px-3 py-3 rounded-xl bg-white/5 border border-white/5 text-white text-xs sm:text-sm focus:outline-none focus:border-accent cursor-pointer"
              >
                <option value="<$250">Under $250</option>
                <option value="$250 - $500">$250 - $500</option>
                <option value="$500 - $1,000">$500 - $1,000</option>
                <option value=">$1,000">Above $1,000</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-tr from-accent to-[#FF4D00] hover:scale-[1.01] text-white font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(255,122,0,0.2)] disabled:opacity-50 cursor-pointer transition-transform"
          >
            <Sparkles className="w-4 h-4 animate-pulse" /> Launch ReelGPT Blueprint
          </button>

        </form>

        {/* Output Column */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          {/* Default idle state */}
          {!loading && !generatedOutput && (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-6 border border-white/5 rounded-2xl bg-white/2 relative">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-bebebe mb-4 border border-white/5">
                <Terminal className="w-5 h-5 text-accent" />
              </div>
              <h4 className="font-display font-bold text-sm text-white mb-1">Awaiting Strategy Instructions</h4>
              <p className="text-xs text-muted max-w-sm">
                Provide project duration, description, and target platforms. Our AI Engine will generate pacing recommendations instantly.
              </p>
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center p-6 border border-white/5 rounded-2xl bg-black/40">
              <div className="relative mb-6">
                <Activity className="w-10 h-10 text-accent animate-spin" />
                <Sparkle className="w-4 h-4 text-white absolute -top-1 -right-1 animate-ping" />
              </div>
              <span className="text-[10px] font-mono text-accent uppercase tracking-widest mb-4">ReelGPT Synthesizer</span>
              <div className="w-full max-w-xs space-y-2">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <span className={`w-1.5 h-1.5 rounded-full ${idx < currentStep ? 'bg-emerald-400' : idx === currentStep ? 'bg-accent animate-ping' : 'bg-white/10'}`} />
                    <span className={idx === currentStep ? 'text-white font-semibold' : idx < currentStep ? 'text-muted line-through' : 'text-muted/60'}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Generated Result */}
          <AnimatePresence>
            {generatedOutput && !loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full rounded-2xl border border-white/10 p-6 bg-[#090909]/90 backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-4 mb-4">
                    <div>
                      <span className="px-2 py-0.5 rounded bg-accent/15 text-accent font-mono text-[9px] uppercase tracking-wider font-bold">
                        {generatedOutput.niche}
                      </span>
                      <h4 className="font-display font-black text-lg text-white mt-1">ReelForge Strategy Blueprint</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-muted block font-mono">ESTIMATED RATE</span>
                      <span className="font-display font-bold text-accent text-sm">{generatedOutput.estPrice}</span>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs font-sans">
                    
                    {/* Hook Pacing */}
                    <div>
                      <h5 className="font-display font-bold text-white flex items-center gap-1.5 mb-1.5 text-[11px] uppercase tracking-wider text-accent/80">
                        <TrendingUp className="w-3.5 h-3.5" /> 1. Psychological Hook Strategy
                      </h5>
                      <ul className="list-disc pl-4 space-y-1 text-bebebe">
                        {generatedOutput.designHooks.map((h: string, i: number) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Sound design */}
                    <div>
                      <h5 className="font-display font-bold text-white flex items-center gap-1.5 mb-1.5 text-[11px] uppercase tracking-wider text-accent/80">
                        <Layers className="w-3.5 h-3.5" /> 2. Multichannel Soundscape & LUT
                      </h5>
                      <ul className="list-disc pl-4 space-y-1 text-bebebe">
                        {generatedOutput.customSoundscapes.map((s: string, i: number) => (
                          <li key={i}>{s}</li>
                        ))}
                        {generatedOutput.dynamicVfx.map((v: string, i: number) => (
                          <li key={i}>{v}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Project Scope details */}
                    <div>
                      <h5 className="font-display font-bold text-white flex items-center gap-1.5 mb-1.5 text-[11px] uppercase tracking-wider text-accent/80">
                        <ListTodo className="w-3.5 h-3.5" /> 3. Formulated Scope & Retainer
                      </h5>
                      <div className="grid grid-cols-2 gap-3 text-bebebe bg-white/2 border border-white/5 p-3 rounded-xl">
                        <div>
                          <span className="text-muted block text-[10px] uppercase font-mono">Recommended Package</span>
                          <span className="text-white font-bold">{generatedOutput.recPackage}</span>
                        </div>
                        <div>
                          <span className="text-muted block text-[10px] uppercase font-mono">Turnaround Target</span>
                          <span className="text-white font-bold">{generatedOutput.estimatedDelivery}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Booking call direct link */}
                <div className="border-t border-white/5 pt-4 mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-[10px] text-muted max-w-xs text-center sm:text-left">
                    Our directors have reserved onboarding capacity for your {inputs.platform.toUpperCase()} campaign.
                  </p>
                  <button
                    onClick={onBookCallClick}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white hover:bg-white/95 text-black font-display font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-accent" /> Book Consultation Call
                  </button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
