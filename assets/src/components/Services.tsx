/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Video, Sparkles, Palette, Music, Layers, Wand, ArrowUpRight, CheckCircle, X } from 'lucide-react';
import { SERVICES } from '../data';
import { Service } from '../types';
import { motion, AnimatePresence } from 'motion/react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Video,
  Sparkles,
  Palette,
  Music,
  Layers,
  Wand,
};

export default function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleScrollToContact = () => {
    setSelectedService(null);
    const element = document.getElementById('contact');
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="services"
      className="relative py-28 md:py-36 bg-bg-deep overflow-hidden"
    >
      {/* Background Radial Glow Spotlight */}
      <div className="absolute right-[10%] top-[20%] w-[500px] h-[500px] radial-glow pointer-events-none opacity-40" />
      <div className="absolute left-[5%] bottom-[10%] w-[500px] h-[500px] radial-glow pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div>
            <div className="text-accent font-mono text-sm tracking-widest uppercase mb-3">
              // Custom Creative Services
            </div>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-[54px] tracking-tight text-white leading-tight">
              Featured Services
            </h2>
            <p className="mt-4 text-muted text-base sm:text-lg max-w-xl font-sans">
              End-to-end post-production solutions designed for creators, agencies, and high-end brands looking to scale engagement.
            </p>
          </div>
          <button
            onClick={() => handleScrollToContact()}
            className="self-start md:self-end px-6 py-3 rounded-xl border border-white/10 hover:border-accent text-sm font-semibold tracking-wide text-white hover:text-accent transition-all duration-300 bg-white/5 hover:bg-accent/5 flex items-center gap-2 group cursor-pointer"
          >
            View Tailored Scope
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((service, index) => {
            const IconComponent = ICON_MAP[service.iconName] || Video;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedService(service)}
                className="group glass-card glass-card-hover p-8 rounded-2xl flex flex-col justify-between h-[360px] cursor-pointer"
              >
                <div>
                  {/* Glowing Icon Wrapper */}
                  <div className="relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:text-accent group-hover:border-accent/30 group-hover:bg-accent/5 transition-all duration-300 shadow-md">
                    <IconComponent className="w-6 h-6 transition-transform duration-500 group-hover:rotate-12" />
                    {/* Tiny decorative light */}
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-accent animate-ping" />
                  </div>

                  <h3 className="mt-8 font-display font-bold text-2xl text-white tracking-tight group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="mt-4 text-bebebe leading-[1.6] text-sm md:text-base line-clamp-4">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-6 font-display font-semibold text-sm text-accent group-hover:text-white transition-colors duration-300">
                  <span>Learn More</span>
                  <ArrowUpRight className="w-4 h-4 translate-y-0.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal (AnimatePresence) */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <div
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-lg glass-card rounded-2xl p-8 shadow-2xl z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:text-accent flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  {(() => {
                    const IconComponent = ICON_MAP[selectedService.iconName] || Video;
                    return <IconComponent className="w-6 h-6" />;
                  })()}
                </div>
                <h3 className="font-display font-bold text-2xl text-white">
                  {selectedService.title}
                </h3>
              </div>

              <p className="mt-6 text-bebebe text-base leading-[1.6]">
                {selectedService.description}
              </p>

              {/* Service inclusions */}
              {selectedService.details && (
                <div className="mt-8 border-t border-white/5 pt-6">
                  <h4 className="font-display font-semibold text-sm uppercase text-muted tracking-wider mb-4">
                    Key Deliverables
                  </h4>
                  <ul className="space-y-3">
                    {selectedService.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-white text-sm">
                        <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action */}
              <div className="mt-8 pt-4 flex gap-4">
                <button
                  onClick={() => handleScrollToContact()}
                  className="flex-grow py-3.5 bg-accent hover:bg-accent-dark text-white rounded-xl font-display font-semibold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(255,122,0,0.3)] hover:shadow-[0_0_25px_rgba(255,122,0,0.5)] cursor-pointer"
                >
                  Consult on this Service
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
