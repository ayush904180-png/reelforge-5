import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Film, Sliders, Volume2, Youtube, Tv, Radio, Sparkles, Layers, Zap, Star, 
  ArrowRight, Check, Clock, ShieldCheck, ChevronRight, Play, User, Award, ArrowLeft
} from 'lucide-react';
import { Service, FAQItem } from '../types';
import { initialServices, getStoredData } from '../data';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
  selectedServiceId?: string;
}

export default function ServicesPage({ onNavigate, selectedServiceId }: ServicesPageProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    const data = getStoredData<Service[]>('reelforge_services', initialServices);
    setServices(data);
    
    if (selectedServiceId) {
      const found = data.find(s => s.id === selectedServiceId || s.title.toLowerCase().replace(/\s+/g, '-') === selectedServiceId);
      if (found) {
        setSelectedService(found);
      } else {
        setSelectedService(null);
      }
    } else {
      setSelectedService(null);
    }
  }, [selectedServiceId]);

  const categories = ['All', ...Array.from(new Set(services.map(s => s.category)))];

  const filteredServices = activeCategory === 'All' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Youtube': return <Youtube className="w-6 h-6" />;
      case 'Tv': return <Tv className="w-6 h-6" />;
      case 'Sliders': return <Sliders className="w-6 h-6" />;
      case 'Volume2': return <Volume2 className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'Layers': return <Layers className="w-6 h-6" />;
      case 'Radio': return <Radio className="w-6 h-6" />;
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'Star': return <Star className="w-6 h-6" />;
      default: return <Film className="w-6 h-6" />;
    }
  };

  const getWorkflow = (service: Service) => {
    return [
      { step: '01', title: 'Creative Briefing', desc: 'Aligning with your brand guideline, hook strategy, and style template.' },
      { step: '02', title: 'Footage Ingest', desc: 'Your raw files are securely ingested into our 10Gbps fiber pipeline.' },
      { step: '03', title: 'Surgical Cut', desc: 'Crafting the hook sequence, multi-cam trimming, and pacing balance.' },
      { step: '04', title: 'Cinematic Pass', desc: 'Primary Rec.709 balancing, custom grading, sound science, and foley.' },
      { step: '05', title: 'Frame.io Delivery', desc: 'Review, timestamp revisions, and obtain your master render file.' }
    ];
  };

  if (selectedService) {
    const workflow = getWorkflow(selectedService);
    const related = services.filter(s => s.category === selectedService.category && s.id !== selectedService.id).slice(0, 2);

    return (
      <div className="py-24 md:py-32 bg-[#020202] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-muted mb-8">
            <button onClick={() => onNavigate('/services')} className="hover:text-accent cursor-pointer transition-colors">Services</button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-semibold">{selectedService.title}</span>
          </div>

          {/* Service Detail Back Button */}
          <button 
            onClick={() => onNavigate('/services')}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 text-xs font-display font-bold text-bebebe hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Capabilities
          </button>

          {/* Hero Banner Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
            <div className="lg:col-span-7">
              <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-3">// Elite Service Blueprint</span>
              <h1 className="font-display font-black text-3.5xl sm:text-5xl tracking-tight leading-[1.1] text-white mb-6">
                {selectedService.title}
              </h1>
              <p className="font-sans text-bebebe text-base sm:text-lg leading-relaxed mb-8">
                {selectedService.description}
              </p>

              {/* Core Features list */}
              <div className="space-y-4 mb-8">
                <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">Features Included:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(selectedService.features || []).map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3 text-sm text-bebebe">
                      <div className="w-5 h-5 rounded-full bg-accent/15 border border-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scope deliverables */}
              <div className="p-6 rounded-2xl glass-card border border-white/5 space-y-3.5 bg-white/1">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-accent flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Enterprise Quality Deliverable Spec:
                </h4>
                <ul className="text-xs text-bebebe leading-relaxed space-y-2 font-sans">
                  <li>• High-bitrate master exports (Apple ProRes / H.264 up to 4K resolution)</li>
                  <li>• Fully mixed multi-channel stereo / surround WAV sound exports</li>
                  <li>• Consolidated project files, raw assets, and grading LUT profile parameters</li>
                  <li>• Full compliance clearance for commercial broadcasting and viral digital uploads</li>
                </ul>
              </div>
            </div>

            {/* Price Cards & Call CTAs */}
            <div className="lg:col-span-5 p-8 rounded-3xl border border-accent bg-gradient-to-br from-[#121212] to-[#060606] relative shadow-[0_0_40px_rgba(255,122,0,0.15)]">
              <div className="absolute top-4 right-4 bg-accent/20 border border-accent/30 text-accent text-[9px] font-mono uppercase px-2 py-0.5 rounded font-bold tracking-widest">
                Active Tier
              </div>

              <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/20 text-accent flex items-center justify-center mb-6">
                {getIcon(selectedService.iconName)}
              </div>

              <h3 className="font-display font-bold text-xl text-white mb-1">Standard Package Rate</h3>
              <p className="text-xs text-muted font-sans mb-6">Billed transparently with clear delivery schedules.</p>

              <div className="flex items-baseline gap-1.5 mb-6">
                <span className="text-muted font-display text-lg">$</span>
                <span className="font-display font-black text-5xl text-white tracking-tight">{selectedService.startingPrice}</span>
                <span className="text-xs text-muted font-mono uppercase ml-2">Starting Base</span>
              </div>

              <div className="space-y-3 border-t border-white/5 pt-6 mb-8 text-xs text-bebebe font-mono">
                <div className="flex justify-between">
                  <span>Turnaround speed:</span>
                  <span className="text-white font-bold">{selectedService.deliveryTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Revision cycles:</span>
                  <span className="text-white font-bold">2 full rounds</span>
                </div>
                <div className="flex justify-between">
                  <span>Sound design:</span>
                  <span className="text-emerald-400 font-bold">Included</span>
                </div>
                <div className="flex justify-between">
                  <span>Color grading:</span>
                  <span className="text-emerald-400 font-bold">Included</span>
                </div>
              </div>

              <button 
                onClick={() => onNavigate('/pricing')}
                className="w-full py-4 rounded-xl bg-accent hover:bg-accent-dark text-white font-display font-black text-xs uppercase tracking-wider text-center shadow-lg cursor-pointer hover:scale-[1.01] transition-transform"
              >
                Secure Booking Session
              </button>
              
              <button 
                onClick={() => onNavigate('/contact')}
                className="w-full py-3 mt-3 rounded-xl border border-white/10 hover:border-white/20 text-bebebe hover:text-white font-display font-bold text-xs uppercase tracking-wider text-center bg-white/2 cursor-pointer transition-colors"
              >
                Inquire For Custom Scope
              </button>
            </div>
          </div>

          {/* Workflow Map */}
          <div className="mb-20">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white text-center mb-12">
              Surgical Project Delivery Workflow
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {workflow.map((step, idx) => (
                <div key={idx} className="p-6 rounded-2xl glass-card border border-white/5 relative bg-white/1">
                  <span className="absolute top-4 right-4 font-display font-black text-3xl text-accent/10">{step.step}</span>
                  <span className="text-[9px] font-mono text-accent uppercase tracking-wider block mb-4">Stage {idx + 1}</span>
                  <h4 className="font-display font-bold text-base text-white mb-2">{step.title}</h4>
                  <p className="text-xs text-bebebe leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Services */}
          {related.length > 0 && (
            <div>
              <h3 className="font-display font-black text-xl text-white mb-6">Related Post-Production Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((service) => (
                  <div 
                    key={service.id} 
                    className="p-6 rounded-2xl glass-card border border-white/5 hover:border-accent/20 transition-all duration-300 flex justify-between items-center bg-white/1 cursor-pointer"
                    onClick={() => onNavigate(`/services/${service.id}`)}
                  >
                    <div>
                      <span className="text-[9px] font-mono text-accent uppercase tracking-wider block mb-1">{service.category}</span>
                      <h4 className="font-display font-bold text-base text-white">{service.title}</h4>
                    </div>
                    <ArrowRight className="w-5 h-5 text-accent shrink-0 ml-4" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }

  return (
    <div className="py-24 md:py-32 bg-[#020202] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-3">// Scientific Post Production capabilities</span>
          <h1 className="font-display font-black text-4xl sm:text-5xl tracking-tight leading-[1.1] text-white">
            Surgical Precision Across Every Frame
          </h1>
          <p className="font-sans text-bebebe text-sm sm:text-base leading-relaxed mt-4">
            We analyze retention curves, acoustic wave distributions, and color science to deliver broadcast-quality video assets designed to dominate digital pipelines.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4.5 py-2 rounded-full text-xs font-display font-bold uppercase tracking-wider cursor-pointer transition-all ${
                activeCategory === cat 
                  ? 'bg-accent text-white shadow-md' 
                  : 'bg-white/5 hover:bg-white/10 text-bebebe hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((s, idx) => (
            <div 
              key={s.id || idx}
              className="p-8 rounded-3xl glass-card hover:border-accent/20 hover:bg-[#070707] transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/20 text-accent flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  {getIcon(s.iconName)}
                </div>
                <span className="text-[9px] font-mono text-accent uppercase tracking-wider block mb-1">{s.category}</span>
                <h3 className="font-display font-bold text-lg text-white mb-3">{s.title}</h3>
                <p className="font-sans text-bebebe text-xs sm:text-sm leading-relaxed mb-6">
                  {s.description}
                </p>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {s.features.slice(0, 2).map((feat, fidx) => (
                    <span key={fidx} className="bg-white/3 text-muted border border-white/5 px-2 py-0.5 rounded text-[9px] font-mono uppercase">
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 border-t border-white/5 pt-5 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-muted block">STARTING AT</span>
                  <span className="text-white font-display font-black text-lg">${s.startingPrice}</span>
                </div>
                <button 
                  onClick={() => onNavigate(`/services/${s.id}`)}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-accent hover:text-white text-xs font-display font-bold text-bebebe uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer"
                >
                  Briefing <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
