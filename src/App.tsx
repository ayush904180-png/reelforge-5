/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Sparkles, 
  Film, 
  Sliders, 
  Volume2, 
  Layers, 
  Check, 
  ChevronDown, 
  Clock, 
  ArrowRight, 
  Shield, 
  Award, 
  Zap, 
  Tv,
  Star,
  Flame,
  MousePointerClick,
  Settings,
  Calendar,
  Sparkle,
  PhoneCall,
  User,
  ExternalLink,
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Sub-components
import BeforeAfterSlider from './components/BeforeAfterSlider';
import PricingCalculator from './components/PricingCalculator';
import AiQuoteGenerator from './components/AiQuoteGenerator';
import LeadMagnetPopup from './components/LeadMagnetPopup';
import BlogSystem from './components/BlogSystem';
import BookCall from './components/BookCall';
import AdminPanel from './components/AdminPanel';
import PortfolioShowcase from './components/PortfolioShowcase';
import CaseStudies from './components/CaseStudies';
import Contact from './components/Contact';

// Database core
import { Service, FAQItem, Testimonial, PricingPlan } from './types';
import { 
  initialServices, 
  initialFAQs, 
  initialTestimonials, 
  initialPricingPlans,
  getStoredData 
} from './data';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  
  // Data State managed and refreshed dynamically when Admin overrides local changes
  const [services, setServices] = useState<Service[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [selectedVideoReel, setSelectedVideoReel] = useState<boolean>(false);

  // Sync data function
  const refreshDatabase = () => {
    setServices(getStoredData<Service[]>('reelforge_services', initialServices));
    setFaqs(getStoredData<FAQItem[]>('reelforge_faqs', initialFAQs));
    setTestimonials(getStoredData<Testimonial[]>('reelforge_testimonials', initialTestimonials));
    setPricingPlans(getStoredData<PricingPlan[]>('reelforge_pricing', initialPricingPlans));
  };

  useEffect(() => {
    refreshDatabase();
  }, []);

  return (
    <div className="bg-[#020202] text-white min-h-screen selection:bg-accent selection:text-white font-sans antialiased overflow-x-hidden">
      
      {/* Dynamic Lead Magnet Loader (triggers checklist download popup after 20 seconds) */}
      <LeadMagnetPopup />

      {/* Database Admin Console Modal Overlay */}
      <AdminPanel 
        isOpen={adminOpen} 
        onClose={() => setAdminOpen(false)} 
        onDataRefresh={refreshDatabase}
      />

      {/* 1. FLOATING NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#020202]/70 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-accent to-[#FF4D00] flex items-center justify-center shadow-[0_0_15px_rgba(255,122,0,0.4)] group-hover:scale-105 transition-transform">
              <Film className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-black text-xl tracking-tight text-white group-hover:text-accent transition-colors">
              ReelForge<span className="text-accent">.</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8 text-xs font-display uppercase tracking-wider font-bold">
            <a href="#services" className="text-bebebe hover:text-white transition-all">Services</a>
            <a href="#sliders" className="text-bebebe hover:text-white transition-all">Editing Sliders</a>
            <a href="#portfolio" className="text-bebebe hover:text-white transition-all">Portfolio</a>
            <a href="#case-studies" className="text-bebebe hover:text-white transition-all">Case Studies</a>
            <a href="#pricing" className="text-bebebe hover:text-white transition-all">Pricing Plans</a>
            <a href="#gpt-blueprint" className="text-bebebe hover:text-white transition-all text-accent">ReelGPT AI</a>
            <a href="#blog" className="text-bebebe hover:text-white transition-all">SEO Blog</a>
            <a href="#faq" className="text-bebebe hover:text-white transition-all">FAQ</a>
          </div>

          {/* Call to Action CTA block */}
          <div className="hidden lg:flex items-center gap-4">
            <button 
              onClick={() => setAdminOpen(true)}
              className="px-3.5 py-2.5 rounded-xl border border-white/10 hover:border-accent/40 bg-white/2 text-bebebe hover:text-white transition-all text-xs font-display uppercase font-bold tracking-wider flex items-center gap-1.5 cursor-pointer"
              title="Admin Database Console"
            >
              <Settings className="w-4 h-4 animate-spin text-accent" /> Custom DB
            </button>
            <a 
              href="#book-call" 
              className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-dark text-white font-display font-black text-xs shadow-[0_4px_15px_rgba(255,122,0,0.25)] hover:shadow-[0_0_20px_rgba(255,122,0,0.45)] transition-all duration-300 hover:-translate-y-0.5"
            >
              Book Consult
            </a>
          </div>

          {/* Mobile navigation toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button 
              onClick={() => setAdminOpen(true)}
              className="px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs text-accent"
            >
              🛠️ DB
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>

        </div>

        {/* Mobile slide-out nav drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-white/5 bg-[#050505]/95 backdrop-blur-xl px-6 py-8 space-y-6"
            >
              <div className="flex flex-col gap-5 text-sm font-display font-bold uppercase tracking-wider">
                <a onClick={() => setMobileMenuOpen(false)} href="#services" className="text-bebebe hover:text-white">Services</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#sliders" className="text-bebebe hover:text-white">Editing Sliders</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#portfolio" className="text-bebebe hover:text-white">Portfolio</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#case-studies" className="text-bebebe hover:text-white">Case Studies</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#pricing" className="text-bebebe hover:text-white">Pricing Plans</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#blog" className="text-bebebe hover:text-white">SEO Blog</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#faq" className="text-bebebe hover:text-white">FAQ</a>
              </div>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAdminOpen(true);
                  }}
                  className="w-full py-3 bg-white/5 text-white font-display font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                >
                  🛠️ Launch Forge DB Admin
                </button>
                <a 
                  onClick={() => setMobileMenuOpen(false)} 
                  href="#book-call" 
                  className="block text-center w-full py-3.5 bg-accent text-white font-display font-bold text-xs rounded-xl shadow-lg"
                >
                  Schedule Consult
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 2. CINEMATIC HERO SECTION */}
      <header id="hero" className="relative pt-32 pb-24 md:pt-48 md:pb-36 bg-[#020202] overflow-hidden flex items-center justify-center min-h-[95vh]">
        
        {/* Animated grid layers and orange/red glow backdrops */}
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          
          {/* Luxury creative category badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-frost-badge text-accent font-mono text-[10px] font-bold uppercase tracking-widest mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            CRAFTING HIGH-CONVERSION DIGITAL MASS MEDIA
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-6xl md:text-[76px] tracking-tight leading-[1.05] max-w-5xl mx-auto text-white"
          >
            Professional Video Editing <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#FF4D00] to-[#FF9A3C] text-glow-strong">
              That Makes Content Go Viral.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-bebebe text-base sm:text-lg md:text-xl leading-[1.7] max-w-3xl mx-auto mt-8"
          >
            We help creators, brands, and businesses grow with premium short-form and long-form video editing. Align visual pacing, LUT grading, and sound sciences to dominate algorithmic retention.
          </motion.p>

          {/* Dynamic primary CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10"
          >
            <a 
              href="#book-call" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-tr from-accent to-[#FF4D00] hover:scale-[1.01] text-white font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_5px_25px_rgba(255,122,0,0.35)] hover:shadow-[0_0_30px_rgba(255,122,0,0.6)] transition-all duration-300"
            >
              <Calendar className="w-4 h-4 text-white" />
              Book Free Consultation
            </a>
            <button 
              onClick={() => setSelectedVideoReel(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-xl glass-frost-badge hover:border-accent/40 text-white font-display font-bold text-xs uppercase tracking-wider hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 text-accent fill-accent" />
              Watch Cinematic Reel (1:45)
            </button>
          </motion.div>

          {/* Statistical High-Impact Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 max-w-4xl mx-auto mt-20 p-8 rounded-2xl glass-card border border-white/5"
          >
            <div>
              <div className="font-display font-black text-3xl sm:text-4xl text-accent">240M+</div>
              <div className="font-sans text-[10px] text-muted uppercase tracking-wider mt-1.5 font-bold">Total Client Impressions</div>
            </div>
            <div>
              <div className="font-display font-black text-3xl sm:text-4xl text-accent">24-48h</div>
              <div className="font-sans text-[10px] text-muted uppercase tracking-wider mt-1.5 font-bold">Standard Turnaround</div>
            </div>
            <div>
              <div className="font-display font-black text-3xl sm:text-4xl text-accent">100%</div>
              <div className="font-sans text-[10px] text-muted uppercase tracking-wider mt-1.5 font-bold">Algorithmic Satisfaction</div>
            </div>
            <div>
              <div className="font-display font-black text-3xl sm:text-4xl text-accent">500+</div>
              <div className="font-sans text-[10px] text-muted uppercase tracking-wider mt-1.5 font-bold">Campaigns Executed</div>
            </div>
          </motion.div>

        </div>
      </header>

      {/* Cinematic trailer lightbox */}
      <AnimatePresence>
        {selectedVideoReel && (
          <div className="fixed inset-0 bg-black/95 z-[9000] flex items-center justify-center p-4 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-4xl aspect-video bg-[#0c0c0c] border border-white/10 rounded-2xl overflow-hidden relative"
            >
              <button 
                onClick={() => setSelectedVideoReel(false)}
                className="absolute top-4 right-4 bg-black/80 px-3 py-1.5 border border-white/5 text-[10px] uppercase font-mono font-bold text-white rounded-lg cursor-pointer"
              >
                Close Reel
              </button>
              <iframe 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                title="ReelForge Cinema Showreel" 
                className="w-full h-full border-0" 
                allow="autoplay; encrypted-media" 
                allowFullScreen
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. CAPABILITIES / SERVICES SECTION */}
      <section id="services" className="relative py-24 md:py-32 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-3">// Scientific Post Production</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-white">
              Surgical Precision Across Every Frame
            </h2>
            <p className="font-sans text-bebebe text-sm sm:text-base leading-relaxed mt-4">
              We analyze retention sciences, sound rumbles, and primary LUT color curves to build masterpieces that retain viewers through algorithmic waves.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((s, idx) => (
              <div 
                key={s.id || idx}
                className="p-8 rounded-2xl glass-card hover:border-accent/20 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/20 text-accent flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    {idx % 3 === 0 ? <Film className="w-6 h-6" /> : idx % 3 === 1 ? <Sliders className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                  </div>
                  <span className="text-[9px] font-mono text-accent uppercase tracking-wider block mb-1">{s.category}</span>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-3">{s.title}</h3>
                  <p className="font-sans text-bebebe text-xs sm:text-sm leading-relaxed mb-4">
                    {s.description}
                  </p>
                  <span className="inline-block bg-white/5 border border-white/5 px-2.5 py-1 rounded text-[10px] font-mono text-muted">
                    Target speed: {s.deliveryTime}
                  </span>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="text-[10px] font-mono text-muted">STARTING RATE</span>
                  <span className="text-white font-display font-black text-sm">${s.startingPrice}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. BEFORE / AFTER EDITING SLIDERS */}
      <section id="sliders" className="relative py-24 md:py-32 bg-[#020202] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-3">// Drag to Reveal Visual Power</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-white">
              Raw Footage vs. ReelForge Master
            </h2>
            <p className="font-sans text-bebebe text-sm sm:text-base leading-relaxed mt-4">
              Inspect our high-fidelity color grading, graphic overlay rendering, and raw-clip sequence alignment directly. Click on the project tabs below to switch timelines.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <BeforeAfterSlider />
          </div>

        </div>
      </section>

      {/* 5. PORTFOLIO SHOWCASE */}
      <section id="portfolio" className="relative py-24 md:py-32 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-3">// Curated Video Deliverables</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-white">
              Sleek Creator Highlights
            </h2>
          </div>

          <PortfolioShowcase />

        </div>
      </section>

      {/* 6. CASE STUDIES WITH GRAPHS */}
      <section id="case-studies" className="relative py-24 md:py-32 bg-[#020202] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-3">// Deep Strategic Diagnostics</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-white">
              Algorithmic Growth Archives
            </h2>
            <p className="font-sans text-bebebe text-sm sm:text-base leading-relaxed mt-4">
              We track retention curves and conversion benchmarks. Read through our real performance records and viewer response trends.
            </p>
          </div>

          <CaseStudies />

        </div>
      </section>

      {/* 7. INTERACTIVE PRICING CALCULATOR */}
      <section id="pricing" className="relative py-24 md:py-32 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-3">// Dynamic Production Planner</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-white">
              Interactive Post Quote Planner
            </h2>
            <p className="font-sans text-bebebe text-sm sm:text-base leading-relaxed mt-4">
              Calibrate your custom video budget instantly using our interactive budget slider widget. Request your contract with zero setup commitment.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <PricingCalculator />
          </div>

        </div>
      </section>

      {/* 8. REELGPT AI STRATEGY ENGINE */}
      <section id="gpt-blueprint" className="relative py-24 md:py-32 bg-[#020202] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-3">// Intelligent Content Architect</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-white">
              ReelGPT Strategy Blueprint
            </h2>
            <p className="font-sans text-bebebe text-sm sm:text-base leading-relaxed mt-4">
              Pitch your video project concept to our strategist engine. It will immediately synthesize high-retention cues, optimal sound profiles, and budget recommendations.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <AiQuoteGenerator onBookCallClick={() => {
              const element = document.getElementById('book-call');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }} />
          </div>

        </div>
      </section>

      {/* 9. THE ONBOARDING PROCESS (animated workflow timeline) */}
      <section className="relative py-24 md:py-32 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-3">// Flawless Onboarding</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-white">
              Our 5-Step Editorial Pipeline
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { num: '01', title: 'Asset Drop', text: 'Deliver your RAW footage, audio stems, and corporate style docs via our high-speed Google Drive channels.' },
              { num: '02', title: 'Director Brief', text: 'Our post coordinator aligns pacing hooks, visual themes, and LUT styles to fulfill your brief.' },
              { num: '03', title: 'Surgical Edit', text: 'Our professional lead editor cuts, normalizes vocals, blends foley tracks, and conducts grading.' },
              { num: '04', title: 'Revision Loop', text: 'Review master cuts frame-by-frame on Frame.io and pin timestamped notes directly.' },
              { num: '05', title: 'Ultra-HD Export', text: 'Receive your master file renders up to 4K resolution, perfectly scaled for algorithmic channels.' }
            ].map((step, idx) => (
              <div key={idx} className="p-6 rounded-2xl glass-card border border-white/5 relative">
                <span className="absolute top-4 right-4 font-display font-black text-3xl text-accent/10">{step.num}</span>
                <span className="text-[10px] font-mono text-accent uppercase tracking-wider block mb-4">Stage {idx + 1}</span>
                <h4 className="font-display font-bold text-base text-white mb-2">{step.title}</h4>
                <p className="text-xs text-bebebe leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. INTERACTIVE CALENDAR BOOKING SYSTEM */}
      <section id="book-call" className="relative py-24 md:py-32 bg-[#020202] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-3">// Direct Calendar Dispatch</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-white">
              Schedule Your Creative Sync
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <BookCall />
          </div>

        </div>
      </section>

      {/* 11. SEO BLOG COMPREHENSIVE ARCHIVE */}
      <section id="blog" className="relative py-24 md:py-32 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-3">// Algorithmic Education Hub</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-white">
              The Post-Production Playbook
            </h2>
            <p className="font-sans text-bebebe text-sm sm:text-base leading-relaxed mt-4">
              Read about premium video color grading techniques, Premiere Pro secrets, and viral retention tricks formulated by our post directors.
            </p>
          </div>

          <BlogSystem />

        </div>
      </section>

      {/* 12. TESTIMONIALS SLIDER SECTION */}
      <section className="relative py-24 md:py-32 bg-[#020202] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-3">// Elite Endorsements</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-white">
              What Our Long-term Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div 
                key={t.id || idx}
                className="p-8 rounded-2xl glass-card border border-white/5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-4 text-accent">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <Star className="w-4 h-4 fill-accent text-accent" />
                  </div>
                  <p className="font-sans text-bebebe text-xs sm:text-sm leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>
                <div className="mt-8 border-t border-white/5 pt-4 flex items-center gap-4">
                  <img
                    src={t.avatarUrl}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-display font-bold text-xs sm:text-sm text-white">{t.name}</h4>
                    <p className="font-sans text-[10px] text-muted">{t.profession}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 13. FAQ ACCORDION SECTION */}
      <section id="faq" className="relative py-24 md:py-32 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-3">// Frequently Asked Questions</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-white">
              Shedding Light on Production Details
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={faq.id || idx}
                  className="rounded-2xl glass-card border border-white/5 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 text-white hover:text-accent transition-colors cursor-pointer"
                  >
                    <span className="font-display font-bold text-sm sm:text-base flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-accent" /> {faq.question}
                    </span>
                    <ChevronDown className={`w-5 h-5 shrink-0 text-accent transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-6 pb-6 pt-1 border-t border-white/5 text-xs sm:text-sm text-bebebe font-sans leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 14. CONTACT BRIEF FORM */}
      <Contact />

      {/* 15. LUXURY FOOTER */}
      <footer className="relative bg-black border-t border-white/5 py-12 md:py-16 text-xs text-muted">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="space-y-4">
            <a href="#hero" className="flex items-center gap-3 group">
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-accent to-[#FF4D00] flex items-center justify-center shadow-[0_0_15px_rgba(255,122,0,0.4)] group-hover:scale-105 transition-transform">
                <Film className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-black text-lg tracking-tight text-white">
                ReelForge<span className="text-accent">.</span>
              </span>
            </a>
            <p className="font-sans leading-relaxed text-muted/80 max-w-xs">
              Elite next-gen video post-production studio scaling creative agencies, finance explainers, and high-pacing video narrative styles.
            </p>
          </div>

          <div>
            <h5 className="font-display font-bold text-xs uppercase tracking-wider text-white mb-4">Post Directories</h5>
            <ul className="space-y-2 font-sans text-bebebe">
              <li><a href="#services" className="hover:text-accent transition-colors">Capabilities</a></li>
              <li><a href="#sliders" className="hover:text-accent transition-colors">Before/After Timelines</a></li>
              <li><a href="#portfolio" className="hover:text-accent transition-colors">Case Portfolios</a></li>
              <li><a href="#pricing" className="hover:text-accent transition-colors">Pricing blueprints</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-display font-bold text-xs uppercase tracking-wider text-white mb-4">Strategic Assets</h5>
            <ul className="space-y-2 font-sans text-bebebe">
              <li><a href="#blog" className="hover:text-accent transition-colors">SEO Growth Articles</a></li>
              <li><a href="#gpt-blueprint" className="hover:text-accent transition-colors">ReelGPT Strategist</a></li>
              <li><a href="#book-call" className="hover:text-accent transition-colors">Book Consult Call</a></li>
              <li><button onClick={() => setAdminOpen(true)} className="hover:text-accent transition-colors font-mono text-[10px] text-accent">🛠️ Access Live Database Console</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-display font-bold text-xs uppercase tracking-wider text-white mb-4">Direct Offices</h5>
            <p className="leading-relaxed font-sans text-bebebe mb-2">
              ReelForge Agency Studios LLC<br />
              9440 Santa Monica Blvd, Suite 300<br />
              Beverly Hills, CA 90210
            </p>
            <span className="text-[10px] block font-mono text-accent">coordinators@reelforge.com</span>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[10px]">
          <p>© {new Date().getFullYear()} ReelForge. All master production rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Onboarding Guide</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
