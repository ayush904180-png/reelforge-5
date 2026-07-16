/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
  MousePointerClick
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Contact from './components/Contact';

// High-fidelity portfolio items with luxury cinematic placeholders
interface PortfolioItem {
  id: string;
  title: string;
  creator: string;
  category: 'youtube' | 'documentary' | 'commercial';
  duration: string;
  views?: string;
  thumbnailUrl: string;
  tags: string[];
}

const portfolioData: PortfolioItem[] = [
  {
    id: '1',
    title: 'The Great Alpine Traverse',
    creator: 'Alex Honnold Fanpage / Alpine Collective',
    category: 'documentary',
    duration: '18:45',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    tags: ['Color Science', 'Sound Design', 'Storytelling']
  },
  {
    id: '2',
    title: 'Minimalist Workspaces: A Tokyo Tour',
    creator: 'Design & Space Magazine',
    category: 'commercial',
    duration: '02:15',
    thumbnailUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    tags: ['Sound FX', 'Seamless Transitions', 'VLOG Editing']
  },
  {
    id: '3',
    title: 'Retreat Into the Deep Void',
    creator: 'Midnight Odyssey (6.2M Subs)',
    category: 'youtube',
    duration: '12:30',
    views: '1.4M views',
    thumbnailUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=800&q=80',
    tags: ['Retention Hook', 'Sound Design', 'High-Octane Pacing']
  },
  {
    id: '4',
    title: 'Revitalizing Heritage: Classic 911 Resto',
    creator: 'Singer Vehicle Design',
    category: 'commercial',
    duration: '01:30',
    thumbnailUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    tags: ['Automotive Film', 'Custom Sound', 'Premium LUT']
  },
  {
    id: '5',
    title: 'The Hidden Artisans of Kyoto',
    creator: 'Worldly Documentaries',
    category: 'documentary',
    duration: '22:10',
    thumbnailUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    tags: ['Cultural Piece', 'Multi-Cam Alignment', 'Warm Grading']
  },
  {
    id: '6',
    title: 'How AI Rewrote Code In 24 Hours',
    creator: 'DevForge AI (1.1M Subs)',
    category: 'youtube',
    duration: '14:05',
    views: '840K views',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    tags: ['Graphic Overlays', 'Retention Mapping', 'Sound FX']
  }
];

// Interactive FAQ Component
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is your turnaround time for a draft?",
      a: "Our standard turnaround is 48-72 hours depending on the package. Commercial campaigns and extensive documentaries can be scheduled on custom production timelines."
    },
    {
      q: "How do we collaborate on revisions?",
      a: "We use Frame.io, allowing you to leave frame-by-frame comments directly on the video. This creates a transparent and ultra-fast revision feedback loop."
    },
    {
      q: "What camera files do you accept?",
      a: "We accept all professional formats including RED RAW, ARRI ProRes, Blackmagic RAW, S-Log3, D-Log, and standard 10-bit H.264/H.265 footage."
    },
    {
      q: "Do you supply licensed soundtrack music?",
      a: "Yes! Every project includes custom licensing for premium royalty-free music from platforms like Musicbed, Artlist, and Epidemic Sound, safe for YouTube, TV, and socials."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index}
            className="rounded-2xl glass-card border border-white/5 overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full p-6 text-left flex items-center justify-between gap-4 text-white hover:text-accent transition-colors"
            >
              <span className="font-display font-bold text-sm sm:text-base">{faq.q}</span>
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
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'youtube' | 'documentary' | 'commercial'>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredPortfolio = activeCategory === 'all' 
    ? portfolioData 
    : portfolioData.filter(item => item.category === activeCategory);

  return (
    <div className="bg-[#020202] text-white min-h-screen selection:bg-accent selection:text-white font-sans antialiased overflow-x-hidden">
      
      {/* 1. Floating Premium Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#020202]/70 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-accent to-[#FF4D00] flex items-center justify-center shadow-[0_0_15px_rgba(255,122,0,0.4)] group-hover:scale-105 transition-transform">
              <Film className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-black text-xl tracking-tight text-white group-hover:text-accent transition-colors">
              ReelForge<span className="text-accent">.</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#services" className="text-bebebe hover:text-white hover:text-glow-subtle transition-all">Services</a>
            <a href="#portfolio" className="text-bebebe hover:text-white hover:text-glow-subtle transition-all">Portfolio</a>
            <a href="#process" className="text-bebebe hover:text-white hover:text-glow-subtle transition-all">Process</a>
            <a href="#pricing" className="text-bebebe hover:text-white hover:text-glow-subtle transition-all">Pricing</a>
            <a href="#faq" className="text-bebebe hover:text-white hover:text-glow-subtle transition-all">FAQ</a>
            <a 
              href="#contact" 
              className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-dark text-white font-display font-bold text-xs shadow-[0_4px_15px_rgba(255,122,0,0.25)] hover:shadow-[0_0_20px_rgba(255,122,0,0.45)] transition-all duration-300 hover:-translate-y-0.5"
            >
              Start Project
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/5 bg-[#050505]/95 backdrop-blur-xl px-6 py-8 space-y-6"
            >
              <div className="flex flex-col gap-5 text-base font-semibold">
                <a onClick={() => setMobileMenuOpen(false)} href="#services" className="text-bebebe hover:text-white">Services</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#portfolio" className="text-bebebe hover:text-white">Portfolio</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#process" className="text-bebebe hover:text-white">Process</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#pricing" className="text-bebebe hover:text-white">Pricing</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#faq" className="text-bebebe hover:text-white">FAQ</a>
              </div>
              <a 
                onClick={() => setMobileMenuOpen(false)} 
                href="#contact" 
                className="block text-center w-full py-3.5 bg-accent text-white font-display font-bold text-sm rounded-xl shadow-lg"
              >
                Start Free Trial / Project
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 2. Hero Section */}
      <header id="hero" className="relative pt-32 pb-24 md:pt-48 md:pb-36 bg-[#020202] overflow-hidden flex items-center justify-center min-h-[90vh]">
        {/* Decorative lighting background blobs */}
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          
          {/* Accent badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-frost-badge text-accent font-mono text-xs font-semibold uppercase tracking-wider mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Next-Gen Post-Production Studio
          </motion.div>

          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-6xl md:text-[80px] tracking-tight leading-[1.05] max-w-5xl mx-auto"
          >
            We Turn Raw Footage Into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#FF4D00] to-[#FF9A3C] text-glow-strong">
              Cinematic Masterworks
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-bebebe text-base sm:text-lg md:text-xl leading-[1.7] max-w-2xl mx-auto mt-8"
          >
            High-octane video editing, flawless color grading, and immersive sound architecture designed for elite creators, corporate innovators, and film directors.
          </motion.p>

          {/* Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10"
          >
            <a 
              href="#contact" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-accent hover:bg-accent-dark text-white font-display font-black text-sm shadow-[0_5px_25px_rgba(255,122,0,0.35)] hover:shadow-[0_0_30px_rgba(255,122,0,0.6)] transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Flame className="w-4 h-4 text-white" />
              Claim Creative Blueprint
            </a>
            <a 
              href="#portfolio" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl glass-frost-badge hover:border-accent/40 text-white font-display font-bold text-sm hover:text-accent hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 text-accent fill-accent" />
              Watch Reel (2:15)
            </a>
          </motion.div>

          {/* Core Metrics Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 max-w-4xl mx-auto mt-20 p-8 rounded-2xl glass-card border border-white/5"
          >
            <div>
              <div className="font-display font-black text-2xl sm:text-3xl text-accent">150M+</div>
              <div className="font-sans text-xs text-bebebe uppercase tracking-wider mt-1.5">Aggregate Views Generated</div>
            </div>
            <div>
              <div className="font-display font-black text-2xl sm:text-3xl text-accent">48 Hrs</div>
              <div className="font-sans text-xs text-bebebe uppercase tracking-wider mt-1.5">Average Draft Speed</div>
            </div>
            <div>
              <div className="font-display font-black text-2xl sm:text-3xl text-accent">100%</div>
              <div className="font-sans text-xs text-bebebe uppercase tracking-wider mt-1.5">Satisfaction Rating</div>
            </div>
            <div>
              <div className="font-display font-black text-2xl sm:text-3xl text-accent">9+ Years</div>
              <div className="font-sans text-xs text-bebebe uppercase tracking-wider mt-1.5">Industry Experience</div>
            </div>
          </motion.div>

        </div>
      </header>

      {/* 3. Services Section */}
      <section id="services" className="relative py-28 md:py-36 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-3">// Capabilities</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-white">
              Surgical Precision Across Every Frame
            </h2>
            <p className="font-sans text-bebebe text-sm sm:text-base leading-relaxed mt-4">
              We treat video editing as an engineering process combined with fine art. Every cut, transition, and color grade serves to keep viewers locked.
            </p>
          </div>

          {/* Bento-grid Capabilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Service 1 */}
            <div className="p-8 rounded-2xl glass-card hover:border-accent/20 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/20 text-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Film className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-3">Long-form Narrative Structuring</h3>
                <p className="font-sans text-bebebe text-xs sm:text-sm leading-relaxed">
                  We shape documentaries, high-end YouTube video essays, and corporate timelines with exceptional storytelling pacing that captures human emotion.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-xs font-mono font-bold text-accent group-hover:gap-3 transition-all">
                Learn more <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Service 2 */}
            <div className="p-8 rounded-2xl glass-card hover:border-accent/20 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/20 text-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sliders className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-3">Hollywood-Grade Color Science</h3>
                <p className="font-sans text-bebebe text-xs sm:text-sm leading-relaxed">
                  Advanced primary/secondary balancing, color matching across cameras, and custom cinematic LUT curves tailored to make your visuals pop.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-xs font-mono font-bold text-accent group-hover:gap-3 transition-all">
                Learn more <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Service 3 */}
            <div className="p-8 rounded-2xl glass-card hover:border-accent/20 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/20 text-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Volume2 className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-3">Immersive Sound Landscapes</h3>
                <p className="font-sans text-bebebe text-xs sm:text-sm leading-relaxed">
                  Multichannel foley integration, vocal mastering, audio ducking, sound effects styling, and custom soundtrack licensing that drives emotional impact.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-xs font-mono font-bold text-accent group-hover:gap-3 transition-all">
                Learn more <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Service 4 */}
            <div className="p-8 rounded-2xl glass-card hover:border-accent/20 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/20 text-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-3">Retention Auditing & Hooks</h3>
                <p className="font-sans text-bebebe text-xs sm:text-sm leading-relaxed">
                  We design high-retention visual hooks for the first 10 seconds of social videos, leveraging pacing tricks, graphics, and custom title cards.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-xs font-mono font-bold text-accent group-hover:gap-3 transition-all">
                Learn more <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Service 5 */}
            <div className="p-8 rounded-2xl glass-card hover:border-accent/20 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/20 text-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Tv className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-3">Sleek Short-form Pacing</h3>
                <p className="font-sans text-bebebe text-xs sm:text-sm leading-relaxed">
                  Optimized for TikTok, Instagram Reels, and YouTube Shorts. Punchy zoom-ins, typography animations, and engaging sound design.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-xs font-mono font-bold text-accent group-hover:gap-3 transition-all">
                Learn more <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Service 6 */}
            <div className="p-8 rounded-2xl glass-card hover:border-accent/20 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/20 text-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-3">VFX & 3D Integration</h3>
                <p className="font-sans text-bebebe text-xs sm:text-sm leading-relaxed">
                  Incorporate dynamic text callouts, tracked 3D elements, clean screen replacements, rotoscoping, and subtle motion design flourishes.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-xs font-mono font-bold text-accent group-hover:gap-3 transition-all">
                Learn more <ArrowRight className="w-4 h-4" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Portfolio Section */}
      <section id="portfolio" className="relative py-28 md:py-36 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-3">// Selected Cuts</span>
              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-white">
                Our Editing Showcases
              </h2>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2.5">
              {(['all', 'youtube', 'documentary', 'commercial'] as const).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-xl font-display font-bold text-xs uppercase tracking-wide transition-all border cursor-pointer ${
                    activeCategory === category 
                      ? 'bg-accent border-accent text-white shadow-lg' 
                      : 'glass-frost-badge border-white/5 hover:border-accent/40 text-bebebe hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredPortfolio.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  className="rounded-2xl glass-card overflow-hidden group hover:border-accent/20 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Thumbnail Cover */}
                  <div className="relative aspect-video overflow-hidden bg-black flex items-center justify-center">
                    <img 
                      src={item.thumbnailUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient overlap */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Left top category badge */}
                    <span className="absolute top-4 left-4 text-[10px] font-mono font-bold bg-black/60 border border-white/10 text-accent px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {item.category}
                    </span>

                    {/* Right bottom duration badge */}
                    <span className="absolute bottom-4 right-4 text-[10px] font-mono bg-black/80 px-2 py-0.5 rounded text-white flex items-center gap-1.5 font-medium">
                      <Clock className="w-3 h-3 text-accent" />
                      {item.duration}
                    </span>

                    {/* Play Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/35 transition-all duration-300">
                      <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono text-accent/80 font-semibold uppercase tracking-wider mb-2">
                        {item.creator}
                      </div>
                      <h3 className="font-display font-bold text-base sm:text-lg text-white mb-4 line-clamp-1 group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    <div>
                      {/* Tags list */}
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span key={tag} className="text-[10px] font-sans bg-white/5 text-bebebe px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* 5. Production Flow (Process) */}
      <section id="process" className="relative py-28 md:py-36 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-3">// Seamless Delivery</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-white">
              Your Onboarding Blueprint
            </h2>
            <p className="font-sans text-bebebe text-sm sm:text-base leading-relaxed mt-4">
              We eliminate friction from creative production. Direct file pipelines and crystal-clear communication mean drafts are always on target.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            
            {/* Step 1 */}
            <div className="p-8 rounded-2xl glass-card border border-white/5 relative">
              <div className="absolute top-6 right-6 font-display font-black text-4xl text-accent/15">01</div>
              <div className="text-accent font-mono font-bold text-xs uppercase tracking-wider mb-6">Pipeline Start</div>
              <h3 className="font-display font-bold text-base sm:text-lg text-white mb-3">Upload Footage</h3>
              <p className="font-sans text-bebebe text-xs sm:text-sm leading-relaxed">
                Drop your raw clips, voice tracks, brand style guidelines, and scripts into our secure high-speed Google Drive or Dropbox shared folder.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-2xl glass-card border border-white/5 relative">
              <div className="absolute top-6 right-6 font-display font-black text-4xl text-accent/15">02</div>
              <div className="text-accent font-mono font-bold text-xs uppercase tracking-wider mb-6">Strategy Alignment</div>
              <h3 className="font-display font-bold text-base sm:text-lg text-white mb-3">Creative Briefing</h3>
              <p className="font-sans text-bebebe text-xs sm:text-sm leading-relaxed">
                Our post-production coordinator maps out key retention pacing goals, visual styling cues, and timeline structures based on your brief.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-2xl glass-card border border-white/5 relative">
              <div className="absolute top-6 right-6 font-display font-black text-4xl text-accent/15">03</div>
              <div className="text-accent font-mono font-bold text-xs uppercase tracking-wider mb-6">Expert Forge</div>
              <h3 className="font-display font-bold text-base sm:text-lg text-white mb-3">Professional Edit</h3>
              <p className="font-sans text-bebebe text-xs sm:text-sm leading-relaxed">
                Our professional editor works key sequences, constructs dialog flow, builds foley tracks, and conducts color correction.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-8 rounded-2xl glass-card border border-white/5 relative">
              <div className="absolute top-6 right-6 font-display font-black text-4xl text-accent/15">04</div>
              <div className="text-accent font-mono font-bold text-xs uppercase tracking-wider mb-6">Feedback Loop</div>
              <h3 className="font-display font-bold text-base sm:text-lg text-white mb-3">Frame Review</h3>
              <p className="font-sans text-bebebe text-xs sm:text-sm leading-relaxed">
                Receive a private Frame.io preview link. Review your edit and place timestamped revision cues directly onto our video timeline.
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-8 rounded-2xl glass-card border border-white/5 relative">
              <div className="absolute top-6 right-6 font-display font-black text-4xl text-accent/15">05</div>
              <div className="text-accent font-mono font-bold text-xs uppercase tracking-wider mb-6">Master Delivery</div>
              <h3 className="font-display font-bold text-base sm:text-lg text-white mb-3">Polished Export</h3>
              <p className="font-sans text-bebebe text-xs sm:text-sm leading-relaxed">
                Your editor applies changes and exports master copies up to 4K resolution, pre-optimized for social platforms or broadcast distribution.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Premium Pricing Section */}
      <section id="pricing" className="relative py-28 md:py-36 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-3">// Pricing blueprints</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-white">
              Transparent Production Packages
            </h2>
            <p className="font-sans text-bebebe text-sm sm:text-base leading-relaxed mt-4">
              Choose the package that aligns with your timeline, channel velocity, or commercial campaign scope. Custom quotes available.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            
            {/* Plan 1 */}
            <div className="p-8 rounded-2xl glass-card flex flex-col justify-between border border-white/5 relative">
              <div>
                <span className="text-xs font-mono font-semibold text-accent uppercase tracking-wider block mb-2">Starter Forge</span>
                <h3 className="font-display font-black text-2xl text-white mb-4">Growth Tier</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-display font-black text-4xl text-white">$499</span>
                  <span className="text-xs text-muted font-sans font-medium">/ per month</span>
                </div>
                <p className="text-xs text-bebebe font-sans leading-relaxed mb-6 border-b border-white/5 pb-6">
                  Perfect for growth creators producing up to 4 short videos or 1 medium-length YouTube video every month.
                </p>

                <ul className="space-y-4 text-xs font-sans text-bebebe mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    Up to 15 mins raw footage/vid
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    Color correction (Rec. 709)
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    Basic foley & licensed music
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    2 revision rounds per draft
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    72-hour turnaround time
                  </li>
                </ul>
              </div>

              <a 
                href="#contact" 
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-display font-bold text-xs border border-white/10 hover:border-accent text-center block transition-all"
              >
                Secure Growth Tier
              </a>
            </div>

            {/* Plan 2: Highly Recommended */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-[#111] to-[#080808] flex flex-col justify-between border-2 border-accent relative shadow-2xl">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-white font-mono font-black text-[10px] uppercase tracking-widest px-4 py-1 rounded-full shadow-[0_4px_10px_rgba(255,122,0,0.35)]">
                Most Popular
              </span>

              <div>
                <span className="text-xs font-mono font-semibold text-accent uppercase tracking-wider block mb-2 mt-2">Elite Production</span>
                <h3 className="font-display font-black text-2xl text-white mb-4">Elite Retainer</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-display font-black text-4xl text-white">$1,499</span>
                  <span className="text-xs text-muted font-sans font-medium">/ per month</span>
                </div>
                <p className="text-xs text-bebebe font-sans leading-relaxed mb-6 border-b border-white/5 pb-6">
                  Designed for heavy upload workflows, corporate marketing campaigns, and high-pacing content creators.
                </p>

                <ul className="space-y-4 text-xs font-sans text-bebebe mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    <strong>Unlimited</strong> short-form OR 4 long-form videos
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    Advanced primary & secondary color science
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    Dynamic text typography overlays & sound design
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    <strong>Unlimited</strong> revisions via Frame.io
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    Fast 48-hour priority draft delivery
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    Dedicated coordinator communication channel
                  </li>
                </ul>
              </div>

              <a 
                href="#contact" 
                className="w-full py-4 rounded-xl bg-accent hover:bg-accent-dark text-white font-display font-black text-xs text-center block transition-all shadow-[0_4px_20px_rgba(255,122,0,0.3)]"
              >
                Claim Priority Slots
              </a>
            </div>

            {/* Plan 3 */}
            <div className="p-8 rounded-2xl glass-card flex flex-col justify-between border border-white/5 relative">
              <div>
                <span className="text-xs font-mono font-semibold text-accent uppercase tracking-wider block mb-2">Bespoke Filmmaking</span>
                <h3 className="font-display font-black text-2xl text-white mb-4">Studio Premium</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-display font-black text-4xl text-white">$2,999</span>
                  <span className="text-xs text-muted font-sans font-medium">/ starting price</span>
                </div>
                <p className="text-xs text-bebebe font-sans leading-relaxed mb-6 border-b border-white/5 pb-6">
                  Bespoke post-production mapping, high-fidelity documentaries, full-scale brand commercials, or theatrical trailers.
                </p>

                <ul className="space-y-4 text-xs font-sans text-bebebe mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    Multi-cam RED/ARRI alignment support
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    Bespoke soundscapes, licensed tracks, custom foley
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    HDR mastering & Dolby Atmos mixing support
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    Infinite revision pipeline
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    Direct production lead collaboration
                  </li>
                </ul>
              </div>

              <a 
                href="#contact" 
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-display font-bold text-xs border border-white/10 hover:border-accent text-center block transition-all"
              >
                Inquire Studio Contract
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* 7. Interactive Testimonials Section */}
      <section className="relative py-28 md:py-36 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-3">// Reel Results</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-white">
              Endorsed by Top Producers & Creators
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="p-8 rounded-2xl glass-card border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-4 text-accent">
                  <Star className="w-4 h-4 fill-accent" />
                  <Star className="w-4 h-4 fill-accent" />
                  <Star className="w-4 h-4 fill-accent" />
                  <Star className="w-4 h-4 fill-accent" />
                  <Star className="w-4 h-4 fill-accent" />
                </div>
                <p className="font-sans text-bebebe text-sm leading-relaxed italic">
                  &quot;The pacing and sound design from ReelForge are absolutely flawless. They took our documentary rushes and sculpted a beautiful story that has now reached over 3 million views.&quot;
                </p>
              </div>
              <div className="mt-8 border-t border-white/5 pt-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center font-display font-bold text-accent text-sm">
                  KH
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white">Kenneth H.</h4>
                  <p className="font-sans text-[11px] text-muted">Creative Director, Worldly Documentaries</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl glass-card border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-4 text-accent">
                  <Star className="w-4 h-4 fill-accent" />
                  <Star className="w-4 h-4 fill-accent" />
                  <Star className="w-4 h-4 fill-accent" />
                  <Star className="w-4 h-4 fill-accent" />
                  <Star className="w-4 h-4 fill-accent" />
                </div>
                <p className="font-sans text-bebebe text-sm leading-relaxed italic">
                  &quot;I have doubled my channel subscription count since moving my edits to the ReelForge retainer. They know how to edit the first 10 seconds of a video to keep eyes on the screen.&quot;
                </p>
              </div>
              <div className="mt-8 border-t border-white/5 pt-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center font-display font-bold text-accent text-sm">
                  MD
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white">Midnight Odyssey</h4>
                  <p className="font-sans text-[11px] text-muted">6.2M Subscriber Creator</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl glass-card border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-4 text-accent">
                  <Star className="w-4 h-4 fill-accent" />
                  <Star className="w-4 h-4 fill-accent" />
                  <Star className="w-4 h-4 fill-accent" />
                  <Star className="w-4 h-4 fill-accent" />
                  <Star className="w-4 h-4 fill-accent" />
                </div>
                <p className="font-sans text-bebebe text-sm leading-relaxed italic">
                  &quot;Their automotive color science is incredible. ReelForge edited singer classic Porsche promotions and completely nailed the elite luxury aesthetic our brand demands.&quot;
                </p>
              </div>
              <div className="mt-8 border-t border-white/5 pt-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center font-display font-bold text-accent text-sm">
                  SV
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white">Singer Vehicles Team</h4>
                  <p className="font-sans text-[11px] text-muted">Marketing Director</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. FAQ Section */}
      <section id="faq" className="relative py-28 md:py-36 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-3">// Knowledge Base</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-white">
              Onboarding & Workflow Questions
            </h2>
          </div>

          <FAQSection />

        </div>
      </section>

      {/* 9. Connected Lead Collection Google Apps Script Contact Form */}
      <Contact />

      {/* 10. Sleek Cinematic Footer */}
      <footer className="relative py-16 bg-[#020202] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <Film className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-black text-lg tracking-tight text-white">
                ReelForge<span className="text-accent">.</span>
              </span>
            </div>
            <p className="text-[11px] text-muted font-sans mt-3">
              © {new Date().getFullYear()} ReelForge Studios. All production rights reserved.
            </p>
          </div>

          <div className="flex gap-8 text-xs font-mono text-muted">
            <a href="#services" className="hover:text-accent transition-colors">Services</a>
            <a href="#portfolio" className="hover:text-accent transition-colors">Portfolio</a>
            <a href="#pricing" className="hover:text-accent transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-accent transition-colors">FAQ</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
