import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, X, HelpCircle, Sliders, Zap, Tag, Clock, Sparkles, 
  ChevronDown, MessageSquare, Info, Star, Calendar, RefreshCw 
} from 'lucide-react';
import { PricingPlan, FAQItem } from '../types';
import { initialPricingPlans, getStoredData } from '../data';
import PricingCalculator from './PricingCalculator';

interface PricingPageProps {
  onNavigate: (path: string) => void;
}

export default function PricingPage({ onNavigate }: PricingPageProps) {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  useEffect(() => {
    const data = getStoredData<PricingPlan[]>('reelforge_pricing_plans', initialPricingPlans);
    setPlans(data);
  }, []);

  // Standard Comparison features across our 5 standard tiers
  const comparisonFeatures = [
    { name: 'Revision Cycles', starter: '2 Rounds', professional: '2 Rounds', business: '3 Rounds', enterprise: 'Unlimited', agency: 'Unlimited' },
    { name: 'Turnaround speed', starter: '72 Hours', professional: '48-72 Hours', business: '48 Hours', enterprise: '24-48 Hours Priority', agency: 'Dedicated Priority' },
    { name: 'Calibrated Color Science', starter: '✓ (Basic)', professional: '✓ (Rec.709)', business: '✓ (Cinematic)', enterprise: '✓ (Cinema RAW)', agency: '✓ (HDR / Dolby Vision)' },
    { name: 'Multichannel Sound Foley', starter: '✓', professional: '✓', business: '✓ (Dense)', enterprise: '✓ (Immersive Atmos)', agency: '✓ (Immersive Atmos)' },
    { name: 'Dedicated Lead Editor', starter: '✗', professional: '✗', business: '✓', enterprise: '✓', agency: '✓ (Full Team)' },
    { name: 'Dynamic Caption Cards', starter: '✗', professional: '✓ (Standard)', business: '✓ (Custom Vector)', enterprise: '✓ (Custom Vector)', agency: '✓ (Global Multilingual)' },
    { name: 'Raw Project Files Delivery', starter: '✗', professional: '✗', business: '✗', enterprise: '✓ (Consolidated)', agency: '✓ (Consolidated)' },
    { name: 'Brand Style Guide compilation', starter: '✗', professional: '✗', business: '✓', enterprise: '✓', agency: '✓' },
    { name: 'Priority Slack Channels', starter: '✗', professional: '✗', business: '✓', enterprise: '✓', agency: '✓' }
  ];

  const addOnsList = [
    { id: 'ao1', name: 'Psychological Thumbnail Card', price: 69, desc: '3D vector imagery engineered to maximize algorithmic click-through-rates (CTR).' },
    { id: 'ao2', name: 'Global Multilingual Captioning', price: 99, desc: 'Highly accurate speech translation and local subtitle styling in over 15 languages.' },
    { id: 'ao3', name: 'Script Writing & Storyboarding', price: 149, desc: 'Strategic script drafting pre-structured with psychological retention triggers.' },
    { id: 'ao4', name: 'Automated Channel Scheduling', price: 199, desc: 'Hands-off publishing workflow directly to YouTube, TikTok, and Instagram metadata pipelines.' }
  ];

  const getPlanPrice = (basePrice: number) => {
    if (billingCycle === 'annual') {
      return Math.round(basePrice * 0.8); // 20% Discount
    }
    return basePrice;
  };

  return (
    <div className="py-24 md:py-32 bg-[#020202] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-3">// Flexible Editorial Blueprints</span>
          <h1 className="font-display font-black text-4xl sm:text-5xl tracking-tight leading-[1.1] text-white">
            Calibrated Creator Retainers
          </h1>
          <p className="font-sans text-bebebe text-sm sm:text-base leading-relaxed mt-4">
            Select a subscription plan pre-optimized for your upload volume, or customize parameters dynamically using our budget planner. Save 20% with annual commitments.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="inline-flex items-center gap-3 p-1 rounded-full bg-white/5 border border-white/5 mt-8">
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={`px-4.5 py-1.5 rounded-full text-[11px] font-display font-bold uppercase tracking-wider transition-all cursor-pointer ${
                billingCycle === 'monthly' ? 'bg-accent text-white shadow' : 'text-bebebe hover:text-white'
              }`}
            >
              Billed Monthly
            </button>
            <button 
              onClick={() => setBillingCycle('annual')}
              className={`px-4.5 py-1.5 rounded-full text-[11px] font-display font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'annual' ? 'bg-accent text-white shadow' : 'text-bebebe hover:text-white'
              }`}
            >
              Billed Annually <span className="bg-emerald-500/20 text-emerald-400 text-[8px] font-mono px-1.5 py-0.5 rounded uppercase font-bold">-20%</span>
            </button>
          </div>
        </div>

        {/* 1. Pricing Cards (Starter, Pro, Business, Enterprise, Agency) */}
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6 mb-24">
          
          {/* Starter Plan */}
          <div className="p-6 rounded-2xl border border-white/5 bg-white/1 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
            <div>
              <span className="text-[9px] font-mono text-muted uppercase">CREATIVE STARTER</span>
              <h3 className="font-display font-bold text-base text-white mt-1">Starter Tier</h3>
              <p className="text-[10px] text-bebebe leading-relaxed mt-2 font-sans mb-6">Perfect for entry-level creators building initial visual paces.</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-display font-black text-2.5xl text-white">${getPlanPrice(299)}</span>
                <span className="text-[10px] text-muted font-sans">/mo</span>
              </div>
              <ul className="space-y-2.5 border-t border-white/5 pt-5 text-[11px] text-bebebe font-sans">
                <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" /> 4 Vertical Shorts / mo</li>
                <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" /> 2 Revisions / draft</li>
                <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" /> Basic Color LUTs</li>
                <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" /> 72-Hour Delivery SLA</li>
              </ul>
            </div>
            <button onClick={() => onNavigate('/contact')} className="w-full py-2.5 mt-8 rounded-xl bg-white/5 hover:bg-white/10 text-[10px] font-display font-bold uppercase tracking-wider text-white border border-white/10 transition-colors cursor-pointer">Lock In Starter</button>
          </div>

          {/* Professional Plan */}
          <div className="p-6 rounded-2xl border border-white/5 bg-white/1 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
            <div>
              <span className="text-[9px] font-mono text-accent uppercase font-bold">MOST POPULAR</span>
              <h3 className="font-display font-bold text-base text-white mt-1">Professional</h3>
              <p className="text-[10px] text-bebebe leading-relaxed mt-2 font-sans mb-6">Calibrated for consistent personal branding on YouTube/Reels.</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-display font-black text-2.5xl text-white">${getPlanPrice(499)}</span>
                <span className="text-[10px] text-muted font-sans">/mo</span>
              </div>
              <ul className="space-y-2.5 border-t border-white/5 pt-5 text-[11px] text-bebebe font-sans">
                <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" /> 4 Long-form edits / mo</li>
                <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" /> 2 Revisions / draft</li>
                <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" /> Rec.709 Color Grade</li>
                <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" /> 48-72h Turnaround</li>
              </ul>
            </div>
            <button onClick={() => onNavigate('/contact')} className="w-full py-2.5 mt-8 rounded-xl bg-accent hover:bg-accent-dark text-[10px] font-display font-bold uppercase tracking-wider text-white transition-colors cursor-pointer shadow-lg">Lock In Professional</button>
          </div>

          {/* Business Plan */}
          <div className="p-6 rounded-2xl border border-white/5 bg-white/1 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
            <div>
              <span className="text-[9px] font-mono text-muted uppercase">CREATIVE GROWTH</span>
              <h3 className="font-display font-bold text-base text-white mt-1">Business Tier</h3>
              <p className="text-[10px] text-bebebe leading-relaxed mt-2 font-sans mb-6">Strategic post production scaling active company media pipelines.</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-display font-black text-2.5xl text-white">${getPlanPrice(899)}</span>
                <span className="text-[10px] text-muted font-sans">/mo</span>
              </div>
              <ul className="space-y-2.5 border-t border-white/5 pt-5 text-[11px] text-bebebe font-sans">
                <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" /> 8 Long-form edits / mo</li>
                <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" /> 3 Revisions / draft</li>
                <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" /> Dedicated Editor</li>
                <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" /> 48-Hour Delivery SLA</li>
              </ul>
            </div>
            <button onClick={() => onNavigate('/contact')} className="w-full py-2.5 mt-8 rounded-xl bg-white/5 hover:bg-white/10 text-[10px] font-display font-bold uppercase tracking-wider text-white border border-white/10 transition-colors cursor-pointer">Lock In Business</button>
          </div>

          {/* Enterprise Plan */}
          <div className="p-6 rounded-2xl border border-accent/40 bg-gradient-to-b from-[#111] to-black flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl">
            <div>
              <span className="text-[9px] font-mono text-accent uppercase font-bold tracking-widest">ENTERPRISE GRADE</span>
              <h3 className="font-display font-bold text-base text-white mt-1">Enterprise</h3>
              <p className="text-[10px] text-bebebe leading-relaxed mt-2 font-sans mb-6">Dedicated priority suite with infinite revisions and consolidated raw handovers.</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-display font-black text-2.5xl text-white">${getPlanPrice(1499)}</span>
                <span className="text-[10px] text-muted font-sans">/mo</span>
              </div>
              <ul className="space-y-2.5 border-t border-white/5 pt-5 text-[11px] text-bebebe font-sans">
                <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" /> Unlimited Vertical Videos</li>
                <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" /> Infinite Revision loops</li>
                <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" /> Custom Vector Graphics</li>
                <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" /> 24-48h Delivery priority</li>
              </ul>
            </div>
            <button onClick={() => onNavigate('/contact')} className="w-full py-2.5 mt-8 rounded-xl bg-accent hover:bg-accent-dark text-[10px] font-display font-bold uppercase tracking-wider text-white transition-colors cursor-pointer shadow-lg">Lock In Enterprise</button>
          </div>

          {/* Agency Plan */}
          <div className="p-6 rounded-2xl border border-white/5 bg-white/1 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
            <div>
              <span className="text-[9px] font-mono text-muted uppercase">CREATIVE RETEAM</span>
              <h3 className="font-display font-bold text-base text-white mt-1">Agency Suite</h3>
              <p className="text-[10px] text-bebebe leading-relaxed mt-2 font-sans mb-6">Bespoke full-production reresentative pipeline for heavy multi-brands.</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-display font-black text-2.5xl text-white">${getPlanPrice(2999)}</span>
                <span className="text-[10px] text-muted font-sans">/mo</span>
              </div>
              <ul className="space-y-2.5 border-t border-white/5 pt-5 text-[11px] text-bebebe font-sans">
                <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" /> Multi-camera Sync support</li>
                <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" /> Dolby Vision Mastering</li>
                <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" /> Unlimited Revisions</li>
                <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" /> Dedicated SLA Coordinator</li>
              </ul>
            </div>
            <button onClick={() => onNavigate('/contact')} className="w-full py-2.5 mt-8 rounded-xl bg-white/5 hover:bg-white/10 text-[10px] font-display font-bold uppercase tracking-wider text-white border border-white/10 transition-colors cursor-pointer">Bespoke Quote</button>
          </div>

        </div>

        {/* 2. Feature Comparison Table */}
        <div className="mb-24 overflow-x-auto">
          <h2 className="font-display font-black text-2xl text-white text-center mb-10">Subscription Feature Comparison</h2>
          <table className="w-full border-collapse text-xs text-left font-sans min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10 text-muted uppercase tracking-wider font-mono">
                <th className="py-4 pr-4">Post Capabilities</th>
                <th className="py-4 px-4">Starter</th>
                <th className="py-4 px-4">Professional</th>
                <th className="py-4 px-4">Business</th>
                <th className="py-4 px-4">Enterprise</th>
                <th className="py-4 px-4">Agency</th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((feat, idx) => (
                <tr key={idx} className="border-b border-white/5 hover:bg-white/1 transition-all text-bebebe">
                  <td className="py-4 pr-4 font-display font-bold text-white">{feat.name}</td>
                  <td className="py-4 px-4 font-mono">{feat.starter}</td>
                  <td className="py-4 px-4 font-mono">{feat.professional}</td>
                  <td className="py-4 px-4 font-mono">{feat.business}</td>
                  <td className="py-4 px-4 font-mono text-accent font-bold">{feat.enterprise}</td>
                  <td className="py-4 px-4 font-mono text-accent font-bold">{feat.agency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 3. Pricing Slider Calculator */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-3">// Design Custom Parameters</span>
            <h3 className="font-display font-black text-2.5xl sm:text-3xl tracking-tight text-white">
              Interactive Custom Budget Planner
            </h3>
            <p className="font-sans text-bebebe text-xs sm:text-sm mt-2">
              Customize deliverables, motion tiers, turnaround speed, and custom add-ons instantly.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <PricingCalculator />
          </div>
        </div>

        {/* 4. Add-Ons Select Block */}
        <div className="mb-24">
          <h2 className="font-display font-black text-2xl text-white text-center mb-12">Custom Post-Production Add-Ons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {addOnsList.map((addon) => (
              <div 
                key={addon.id} 
                className="p-6 rounded-2xl border border-white/5 bg-gradient-to-tr from-[#0a0a0a] to-[#040404] flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-display font-bold text-sm text-white">{addon.name}</h4>
                    <span className="text-accent font-mono font-bold text-xs">${addon.price} <span className="text-[9px] text-muted font-normal lowercase">/video</span></span>
                  </div>
                  <p className="text-xs text-bebebe font-sans leading-relaxed">{addon.desc}</p>
                </div>
                <div className="mt-6 border-t border-white/5 pt-4 flex justify-between items-center">
                  <span className="text-[9px] font-mono text-muted uppercase">Integrates Instantly</span>
                  <button onClick={() => onNavigate('/contact')} className="text-[10px] font-display font-bold text-accent uppercase tracking-wider hover:text-white cursor-pointer transition-colors">Inquire Scope →</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Preview block */}
        <div className="text-center max-w-xl mx-auto p-8 rounded-3xl border border-white/5 bg-[#070707]">
          <h3 className="font-display font-bold text-white text-base uppercase tracking-wider mb-2">Need a bespoke multi-channel plan?</h3>
          <p className="text-xs text-bebebe leading-relaxed font-sans mb-6">
            We draft tailor-made agency packages for companies with complex workflows, multi-editor channels, or cinema pipelines.
          </p>
          <button 
            onClick={() => onNavigate('/contact')}
            className="px-6 py-3 rounded-xl bg-accent hover:bg-accent-dark text-white font-display font-black text-xs uppercase tracking-wider cursor-pointer shadow-lg transition-transform hover:scale-[1.01]"
          >
            Inquire Bespoke Agency Contract
          </button>
        </div>

      </div>
    </div>
  );
}
