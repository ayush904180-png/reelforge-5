/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { Sparkles, Trophy, Video, Users } from 'lucide-react';
import { motion, useInView } from 'motion/react';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STATS: StatItem[] = [
  { value: 700, suffix: '+', label: 'Projects Completed', icon: Video },
  { value: 120, suffix: '+', label: 'Happy Clients', icon: Users },
  { value: 6, suffix: '+', label: 'Years Experience', icon: Trophy },
  { value: 99, suffix: '%', label: 'Client Satisfaction', icon: Sparkles },
];

interface StatCounterProps {
  key?: React.Key;
  stat: StatItem;
  isInView: boolean;
}

function StatCounter({ stat, isInView }: StatCounterProps) {
  const { value, suffix, label, icon: Icon } = stat;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const duration = 1.5; // seconds
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 12);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, isInView]);

  return (
    <div className="flex flex-col glass-card glass-card-hover rounded-2xl p-6">
      <div className="flex items-center gap-3 text-accent mb-3">
        <Icon className="w-5 h-5" />
        <span className="text-xs uppercase tracking-widest font-mono text-muted">Stat</span>
      </div>
      <div className="font-display font-black text-3xl sm:text-4xl text-white">
        {count}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="mt-1 font-sans text-sm text-bebebe font-medium">{label}</div>
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="process" // Map with Navbar links / Portfolio showcase
      ref={ref}
      className="relative py-28 md:py-36 bg-bg-deep overflow-hidden border-t border-white/5"
    >
      {/* Background elements */}
      <div className="absolute left-[10%] top-[30%] w-[450px] h-[450px] radial-glow pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with cinematic overlay */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-white/10 group">
              <img
                src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80"
                alt="Elite workspace edit timeline editor room"
                className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              {/* Cinematic vignetting and orange lighting glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              {/* Floating element in image */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-frost-badge flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-muted font-mono tracking-widest uppercase">Workspace setup</div>
                  <div className="text-sm font-bold text-white font-display mt-0.5">Dual DaVinci 18 Panel</div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] animate-pulse" />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Copy & Statistics */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div className="text-accent font-mono text-sm tracking-widest uppercase mb-3">
              // Creative Legacy & philosophy
            </div>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-[54px] tracking-tight text-white leading-[1.1] mb-6">
              Turning Raw Footage <br />
              Into <span className="text-accent text-glow">Pure Art</span>
            </h2>
            
            <div className="space-y-4 font-sans text-bebebe text-base sm:text-lg leading-[1.7]">
              <p>
                At ReelForge, we believe every frame holds a story. Raw footage is just a canvas; post-production is where the narrative gathers soul, momentum, and impact.
              </p>
              <p className="text-muted">
                Our approach blends highly complex editing blueprints with pristine pacing and sound designs. Whether it is an executive marketing campaign or high-velocity content for millions of online subscribers, our editors build retaining sequences that keep viewers hooked till the final render.
              </p>
            </div>

            {/* Stats list */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-12">
              {STATS.map((stat, idx) => (
                <StatCounter
                  key={idx}
                  stat={stat}
                  isInView={isInView}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
