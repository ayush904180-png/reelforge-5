/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sliders, 
  HelpCircle, 
  Check, 
  Zap, 
  Tag, 
  Clock, 
  Sparkles, 
  Send,
  Video,
  FileSpreadsheet,
  X,
  Sparkle
} from 'lucide-react';

interface CalculatorState {
  videoType: 'youtube' | 'vertical' | 'corporate' | 'podcast';
  quantity: number;
  length: 'short' | 'medium' | 'long' | 'feature';
  motionGraphics: 'none' | 'basic' | 'complex';
  subtitles: boolean;
  thumbnail: boolean;
  urgent: boolean;
}

export default function PricingCalculator() {
  const [state, setState] = useState<CalculatorState>({
    videoType: 'youtube',
    quantity: 1,
    length: 'medium',
    motionGraphics: 'none',
    subtitles: false,
    thumbnail: false,
    urgent: false
  });

  const [pricing, setPricing] = useState({
    baseCost: 0,
    additions: 0,
    subtotal: 0,
    discountRate: 0,
    discountAmount: 0,
    finalPrice: 0,
    deliveryDays: 3
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForm, setModalForm] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Re-calculate pricing whenever inputs change
  useEffect(() => {
    // Base Rates per video
    let baseRate = 0;
    switch (state.videoType) {
      case 'youtube': baseRate = 180; break;
      case 'vertical': baseRate = 70; break;
      case 'corporate': baseRate = 300; break;
      case 'podcast': baseRate = 220; break;
    }

    // Length additions
    let lengthCost = 0;
    switch (state.length) {
      case 'short': lengthCost = 0; break;
      case 'medium': lengthCost = 40; break;
      case 'long': lengthCost = 100; break;
      case 'feature': lengthCost = 220; break;
    }

    // Motion Graphics additions
    let motionCost = 0;
    switch (state.motionGraphics) {
      case 'none': motionCost = 0; break;
      case 'basic': motionCost = 50; break;
      case 'complex': motionCost = 140; break;
    }

    // Custom thumbnail per video
    const thumbnailCost = state.thumbnail ? 35 : 0;

    // Subtitles per video
    const subtitleCost = state.subtitles ? 20 : 0;

    // Subtotal calculations before quantity and bulk discounts
    const singleVideoCost = baseRate + lengthCost + motionCost + thumbnailCost + subtitleCost;
    let totalBeforeDiscount = singleVideoCost * state.quantity;

    // Urgent speedup additions (+25% premium)
    if (state.urgent) {
      totalBeforeDiscount = totalBeforeDiscount * 1.25;
    }

    // Bulk discount scaling
    let discountRate = 0;
    if (state.quantity >= 2 && state.quantity <= 4) {
      discountRate = 0.10; // 10%
    } else if (state.quantity >= 5 && state.quantity <= 9) {
      discountRate = 0.15; // 15%
    } else if (state.quantity >= 10) {
      discountRate = 0.25; // 25% bulk savings
    }

    const discountAmount = totalBeforeDiscount * discountRate;
    const finalPrice = Math.round(totalBeforeDiscount - discountAmount);

    // Delivery duration estimation
    let deliveryDays = 3;
    if (state.quantity > 5) deliveryDays = 5;
    if (state.quantity > 15) deliveryDays = 7;
    if (state.urgent) {
      deliveryDays = Math.max(1, Math.round(deliveryDays * 0.5)); // Halved delivery days
    }

    setPricing({
      baseCost: baseRate * state.quantity,
      additions: Math.round(totalBeforeDiscount - (baseRate * state.quantity)),
      subtotal: Math.round(totalBeforeDiscount),
      discountRate: discountRate * 100,
      discountAmount: Math.round(discountAmount),
      finalPrice,
      deliveryDays
    });
  }, [state]);

  const handleQuoteRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate collection
    setFormSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setFormSubmitted(false);
      setModalForm({ name: '', email: '', message: '' });
    }, 2500);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Column (left 7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Video Type Choice */}
          <div className="rounded-2xl glass-card border border-white/5 p-6">
            <label className="block text-xs font-mono font-bold text-accent uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Video className="w-4 h-4" /> 1. Select Video Deliverable Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'youtube', label: 'YouTube Longform', base: '$180' },
                { id: 'vertical', label: 'TikTok / Reel / Short', base: '$70' },
                { id: 'corporate', label: 'Commercial / Corporate', base: '$300' },
                { id: 'podcast', label: 'Podcast Full Clip', base: '$220' }
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setState({ ...state, videoType: t.id as any })}
                  className={`p-4 rounded-xl text-left border cursor-pointer transition-all ${
                    state.videoType === t.id 
                      ? 'bg-accent/10 border-accent text-white shadow-lg' 
                      : 'bg-white/2 border-white/5 hover:border-white/20 text-bebebe'
                  }`}
                >
                  <span className="block font-display font-bold text-xs sm:text-sm text-white">{t.label}</span>
                  <span className="block font-mono text-[11px] text-muted mt-1">Starting from {t.base}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Slider */}
          <div className="rounded-2xl glass-card border border-white/5 p-6">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-xs font-mono font-bold text-accent uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-4 h-4" /> 2. Quantity of Videos
              </label>
              <span className="px-3 py-1 rounded-lg bg-accent/15 border border-accent/20 font-display font-black text-sm text-accent">
                {state.quantity} {state.quantity === 1 ? 'Video' : 'Videos'}
              </span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="20" 
              value={state.quantity}
              onChange={(e) => setState({ ...state, quantity: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent mb-2"
            />
            <div className="flex justify-between text-[10px] text-muted font-mono mt-1">
              <span>1 Video</span>
              <span>5 Videos (15% off)</span>
              <span>10+ Videos (25% bulk off!)</span>
            </div>
          </div>

          {/* Video Length & Motion Graphics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Length Option */}
            <div className="rounded-2xl glass-card border border-white/5 p-6">
              <label className="block text-xs font-mono font-bold text-accent uppercase tracking-wider mb-3">
                3. Video Duration Length
              </label>
              <div className="space-y-2">
                {[
                  { id: 'short', label: 'Short (<2 Mins)', add: '+$0' },
                  { id: 'medium', label: 'Medium (2-10 Mins)', add: '+$40' },
                  { id: 'long', label: 'Long (10-30 Mins)', add: '+$100' },
                  { id: 'feature', label: 'Feature (30m+ Full Episode)', add: '+$220' }
                ].map((l) => (
                  <label 
                    key={l.id} 
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                      state.length === l.id 
                        ? 'bg-accent/5 border-accent/40 text-white' 
                        : 'bg-transparent border-white/5 text-bebebe hover:bg-white/2'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="videoLength" 
                        checked={state.length === l.id}
                        onChange={() => setState({ ...state, length: l.id as any })}
                        className="accent-accent"
                      />
                      <span>{l.label}</span>
                    </div>
                    <span className="font-mono text-[10px] text-muted">{l.add}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Motion Graphics Tier */}
            <div className="rounded-2xl glass-card border border-white/5 p-6">
              <label className="block text-xs font-mono font-bold text-accent uppercase tracking-wider mb-3">
                4. Motion Graphics / VFX
              </label>
              <div className="space-y-2">
                {[
                  { id: 'none', label: 'Standard Cuts (No tracking)', add: '+$0' },
                  { id: 'basic', label: 'Basic overlays & lowerthirds', add: '+$50' },
                  { id: 'complex', label: 'Complex 3D tracking / infographic', add: '+$140' }
                ].map((m) => (
                  <label 
                    key={m.id} 
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                      state.motionGraphics === m.id 
                        ? 'bg-accent/5 border-accent/40 text-white' 
                        : 'bg-transparent border-white/5 text-bebebe hover:bg-white/2'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="motionTier" 
                        checked={state.motionGraphics === m.id}
                        onChange={() => setState({ ...state, motionGraphics: m.id as any })}
                        className="accent-accent"
                      />
                      <span>{m.label}</span>
                    </div>
                    <span className="font-mono text-[10px] text-muted">{m.add}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Add-ons Checklist */}
          <div className="rounded-2xl glass-card border border-white/5 p-6">
            <label className="block text-xs font-mono font-bold text-accent uppercase tracking-wider mb-4">
              5. Creative Add-ons & Fast SLA
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Thumbnail Checkbox */}
              <button
                type="button"
                onClick={() => setState({ ...state, thumbnail: !state.thumbnail })}
                className={`p-3.5 rounded-xl border cursor-pointer text-left transition-all flex items-center justify-between ${
                  state.thumbnail 
                    ? 'bg-accent/10 border-accent text-white shadow-md' 
                    : 'bg-white/2 border-white/5 hover:border-white/20 text-bebebe'
                }`}
              >
                <div>
                  <span className="block font-display font-bold text-xs">Custom Thumbnails</span>
                  <span className="block font-mono text-[10px] text-muted mt-0.5">+$35 per video</span>
                </div>
                {state.thumbnail && <Check className="w-4 h-4 text-accent" />}
              </button>

              {/* Subtitles Checkbox */}
              <button
                type="button"
                onClick={() => setState({ ...state, subtitles: !state.subtitles })}
                className={`p-3.5 rounded-xl border cursor-pointer text-left transition-all flex items-center justify-between ${
                  state.subtitles 
                    ? 'bg-accent/10 border-accent text-white shadow-md' 
                    : 'bg-white/2 border-white/5 hover:border-white/20 text-bebebe'
                }`}
              >
                <div>
                  <span className="block font-display font-bold text-xs">Stylized Subtitles</span>
                  <span className="block font-mono text-[10px] text-muted mt-0.5">+$20 per video</span>
                </div>
                {state.subtitles && <Check className="w-4 h-4 text-accent" />}
              </button>

              {/* Urgent Checkbox */}
              <button
                type="button"
                onClick={() => setState({ ...state, urgent: !state.urgent })}
                className={`p-3.5 rounded-xl border cursor-pointer text-left transition-all flex items-center justify-between ${
                  state.urgent 
                    ? 'bg-gradient-to-tr from-accent/15 to-[#FF4D00]/15 border-accent text-white shadow-[0_0_15px_rgba(255,122,0,0.15)]' 
                    : 'bg-white/2 border-white/5 hover:border-white/20 text-bebebe'
                }`}
              >
                <div>
                  <span className="block font-display font-bold text-xs text-white flex items-center gap-1">
                    Urgent (24h) <Zap className="w-3.5 h-3.5 text-accent animate-pulse" />
                  </span>
                  <span className="block font-mono text-[10px] text-muted mt-0.5">+25% Speed Premium</span>
                </div>
                {state.urgent && <Check className="w-4 h-4 text-accent" />}
              </button>

            </div>
          </div>

        </div>

        {/* Pricing Summary Side Card (right 5 cols) */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="rounded-3xl bg-gradient-to-b from-[#111] to-[#050505] border-2 border-white/10 p-8 shadow-2xl relative overflow-hidden">
            
            {/* Background glowing glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-accent/15 rounded-full blur-[40px] pointer-events-none" />

            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-4">// Instant Quote</span>
            <h3 className="font-display font-black text-2xl text-white mb-6">Price Blueprint</h3>

            {/* Line items details */}
            <div className="space-y-4 text-xs font-sans text-bebebe border-b border-white/5 pb-6 mb-6">
              
              <div className="flex justify-between">
                <span>Base Production Cost:</span>
                <span className="font-mono text-white font-semibold">${pricing.baseCost}</span>
              </div>

              <div className="flex justify-between">
                <span>Creative Add-ons / Enhancements:</span>
                <span className="font-mono text-white font-semibold">${pricing.additions}</span>
              </div>

              {pricing.discountRate > 0 && (
                <div className="flex justify-between text-accent font-bold">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" /> Bulk Quantity Savings ({pricing.discountRate}%):
                  </span>
                  <span className="font-mono">-${pricing.discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-accent" /> Estimated Lead Time:</span>
                <span className="font-mono text-white font-bold">{pricing.deliveryDays} {pricing.deliveryDays === 1 ? 'Business Day' : 'Business Days'}</span>
              </div>

            </div>

            {/* Total display */}
            <div className="mb-8">
              <div className="text-[10px] text-muted uppercase tracking-wider font-mono mb-1">Estimated Client Cost</div>
              <div className="flex items-baseline gap-1">
                <span className="font-display font-black text-5xl text-white tracking-tight text-glow-strong">
                  ${pricing.finalPrice}
                </span>
                <span className="text-xs text-muted font-sans font-medium">USD</span>
              </div>
              <p className="text-[10px] text-muted mt-2 leading-relaxed">
                *Estimated final rate. Bulk scales applied. Fast turnaround adjustments reflected instantly.
              </p>
            </div>

            {/* Quote actions */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-4 rounded-xl bg-accent hover:bg-accent-dark text-white font-display font-black text-xs text-center block transition-all shadow-[0_4px_20px_rgba(255,122,0,0.3)] hover:shadow-[0_0_30px_rgba(255,122,0,0.5)] cursor-pointer hover:-translate-y-0.5"
            >
              Request Contract & Secure Quote
            </button>

          </div>
        </div>

      </div>

      {/* Contract Request Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-lg rounded-2xl glass-card border border-white/10 p-8 relative overflow-hidden"
            >
              {/* Close button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-lg text-bebebe hover:text-white hover:bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-accent mb-2">
                <Sparkle className="w-5 h-5 animate-spin" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">Secure Quote Contract</span>
              </div>
              <h4 className="font-display font-black text-2xl text-white mb-4">Launch Your Project Pipeline</h4>
              
              <div className="bg-white/3 border border-white/5 rounded-xl p-4 text-xs text-bebebe space-y-1.5 mb-6">
                <div><strong>Project Type:</strong> {state.videoType.toUpperCase()} ({state.quantity} videos)</div>
                <div><strong>Specs:</strong> {state.length} Duration, {state.motionGraphics} VFX Level</div>
                <div><strong>Estimated Final Rate:</strong> <span className="text-accent font-bold">${pricing.finalPrice}</span></div>
              </div>

              {!formSubmitted ? (
                <form onSubmit={handleQuoteRequest} className="space-y-4">
                  <div>
                    <label className="block text-[10px] text-muted uppercase tracking-wider font-mono mb-1.5">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={modalForm.name}
                      onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                      placeholder="e.g. Sarah Connor"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white text-xs sm:text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-muted uppercase tracking-wider font-mono mb-1.5">Email Address *</label>
                    <input 
                      type="email" 
                      required
                      value={modalForm.email}
                      onChange={(e) => setModalForm({ ...modalForm, email: e.target.value })}
                      placeholder="e.g. sarah@skynet.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white text-xs sm:text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-muted uppercase tracking-wider font-mono mb-1.5">Additional Brief details</label>
                    <textarea 
                      rows={3}
                      value={modalForm.message}
                      onChange={(e) => setModalForm({ ...modalForm, message: e.target.value })}
                      placeholder="Tell us about your channels, design pacing reference, or specific camera models."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white text-xs sm:text-sm focus:outline-none focus:border-accent"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4.5 rounded-xl bg-accent hover:bg-accent-dark text-white font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <Send className="w-4 h-4" /> Finalize Details & Send to Forge
                  </button>
                </form>
              ) : (
                <div className="py-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <Check className="w-6 h-6" />
                  </div>
                  <h5 className="font-display font-bold text-lg text-white mb-2">Quote Details Locked In</h5>
                  <p className="text-xs text-bebebe max-w-sm mx-auto">
                    We have received your custom pricing blueprint! One of our post-production directors will follow up within 4 hours.
                  </p>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
