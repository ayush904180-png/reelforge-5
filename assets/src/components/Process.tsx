/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, UploadCloud, Video, Sliders, CheckCircle } from 'lucide-react';
import { PROCESS_STEPS } from '../data';
import { motion } from 'motion/react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Search,
  UploadCloud,
  Video,
  Sliders,
  CheckCircle,
};

export default function Process() {
  return (
    <section
      id="process"
      className="relative py-28 md:py-36 bg-bg-deep border-t border-white/5 overflow-hidden"
    >
      {/* Background radial spotlight */}
      <div className="absolute right-[5%] bottom-[15%] w-[450px] h-[450px] radial-glow pointer-events-none opacity-20" />
      <div className="absolute left-[10%] top-[10%] w-[500px] h-[500px] radial-glow pointer-events-none opacity-15" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 md:mb-28">
          <div className="text-accent font-mono text-sm tracking-widest uppercase mb-3">
            // How We Shape Masterpieces
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-[54px] tracking-tight text-white leading-tight">
            Our Editing Process
          </h2>
          <p className="mt-4 text-muted text-base sm:text-lg font-sans">
            From initial discovery raw clips sync down to final delivery master, we make post-production seamless.
          </p>
        </div>

        {/* Process Timeline Wrapper */}
        <div className="relative">
          
          {/* Horizontal Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-accent/20 via-accent/70 to-accent/20 z-0 shadow-[0_0_8px_rgba(255,122,0,0.3)]" />

          {/* Stepper items (Grid layout: 5 cols on lg, list on mobile) */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 relative z-10">
            {PROCESS_STEPS.map((step, index) => {
              const IconComponent = ICON_MAP[step.iconName] || Video;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Glowing Milestone Circle Badge */}
                  <div className="relative flex items-center justify-center w-20 h-20 rounded-full glass-frost-badge group-hover:border-accent group-hover:bg-accent/5 transition-all duration-300 shadow-xl z-10">
                    
                    {/* The Number badge */}
                    <div className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white font-display font-bold text-xs shadow-md">
                      {step.id}
                    </div>

                    <IconComponent className="w-8 h-8 text-white group-hover:text-accent group-hover:scale-110 transition-all duration-300" />
                    
                    {/* Pulsing light */}
                    <span className="absolute inset-0 rounded-full border border-accent/20 scale-100 group-hover:scale-115 transition-transform duration-300 animate-pulse pointer-events-none" />
                  </div>

                  {/* Connecting Line indicator for vertical/mobile layouts */}
                  {index < PROCESS_STEPS.length - 1 && (
                    <div className="lg:hidden w-0.5 h-12 bg-gradient-to-b from-accent to-transparent my-4" />
                  )}

                  {/* Copy details */}
                  <div className="mt-6">
                    <div className="text-[10px] font-mono text-accent uppercase tracking-widest font-bold">
                      {step.subtitle}
                    </div>
                    
                    <h3 className="mt-2 font-display font-bold text-xl text-white tracking-tight group-hover:text-accent transition-colors">
                      {step.title}
                    </h3>
                    
                    <p className="mt-3 text-sm text-bebebe leading-[1.6] max-w-xs mx-auto font-sans">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Floating Call to action block under process */}
        <div className="mt-24 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-4 glass-card rounded-2xl px-6 py-4">
            <span className="text-xs font-mono text-muted uppercase">Ready to synchronize clips?</span>
            <button
              onClick={() => {
                const contactElement = document.getElementById('contact');
                if (contactElement) {
                  window.scrollTo({
                    top: contactElement.offsetTop - 80,
                    behavior: 'smooth',
                  });
                }
              }}
              className="px-5 py-2 rounded-lg bg-accent text-white text-xs font-display font-bold hover:bg-accent-dark transition-all duration-300 cursor-pointer shadow-md"
            >
              Start Onboarding Setup
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
