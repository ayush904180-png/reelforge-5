/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Quote, Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { TESTIMONIALS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetAutoplay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      handleNext();
    }, 6000);
  };

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const active = TESTIMONIALS[activeIndex];

  // Framer Motion slide variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <section
      id="testimonials"
      className="relative py-28 md:py-36 bg-[#080808] border-t border-white/5 overflow-hidden"
    >
      {/* Background spotlights */}
      <div className="absolute right-[10%] top-[25%] w-[450px] h-[450px] radial-glow pointer-events-none opacity-20" />
      <div className="absolute left-[5%] bottom-[15%] w-[500px] h-[500px] radial-glow pointer-events-none opacity-15" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <div className="text-accent font-mono text-sm tracking-widest uppercase mb-3">
            // High-Retention Endorsements
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-[54px] tracking-tight text-white leading-tight">
            Client Testimonials
          </h2>
          <p className="mt-4 text-muted text-base sm:text-lg font-sans">
            Hear from leading YouTube creators, creative agencies, and global brands who scaled their reach with our edits.
          </p>
        </div>

        {/* Testimonial Active Display Panel */}
        <div className="relative min-h-[420px] md:min-h-[340px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-bg-card/60 border border-white/8 rounded-3xl p-6 sm:p-10 md:p-12 glass-card shadow-2xl relative overflow-hidden">
                {/* Decorative Giant Quote Accent */}
                <Quote className="absolute -top-6 -right-6 w-32 h-32 text-accent/5 pointer-events-none" />

                {/* Left side: Avatar Showcase (Col 4) */}
                <div className="md:col-span-4 flex flex-col items-center text-center md:border-r border-white/5 md:pr-8 py-2">
                  <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full p-1 bg-gradient-to-tr from-accent to-accent-dark shadow-[0_0_20px_rgba(255,122,0,0.35)] overflow-hidden">
                    <img
                      src={active.avatarUrl}
                      alt={`${active.name} Creator Avatar`}
                      className="w-full h-full object-cover rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <h3 className="font-display font-black text-lg text-white mt-4 tracking-tight">
                    {active.name}
                  </h3>
                  
                  <p className="text-xs font-mono text-accent mt-1 uppercase tracking-wider font-semibold">
                    {active.role}
                  </p>
                  
                  {active.company && (
                    <p className="text-xs text-muted font-medium mt-0.5">
                      {active.company}
                    </p>
                  )}
                </div>

                {/* Right side: Stars, Quotes & Inclusions (Col 8) */}
                <div className="md:col-span-8 flex flex-col justify-center pl-0 md:pl-6">
                  {/* Testimonial rating stars */}
                  <div className="flex items-center gap-1 text-accent mb-4">
                    {Array.from({ length: active.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial Quote Text */}
                  <p className="font-sans text-base sm:text-lg md:text-xl text-white font-medium leading-[1.6] relative italic">
                    <Quote className="inline-block w-6 h-6 text-accent shrink-0 transform -translate-y-2 mr-2 rotate-180" />
                    {active.content}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-xs font-mono text-muted uppercase">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    <span>Verified post-production client</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Sliders dots & Arrow selectors */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-12 px-2">
          {/* Slider indicators dots */}
          <div className="flex items-center gap-2.5 order-2 sm:order-1">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx ? 'w-8 bg-accent shadow-[0_0_8px_#FF7A00]' : 'w-2.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3 order-1 sm:order-2">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-xl bg-white/3 hover:bg-accent/10 border border-white/5 hover:border-accent/40 text-white hover:text-accent flex items-center justify-center transition-all cursor-pointer"
              aria-label="Previous Testimonial"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-xl bg-white/3 hover:bg-accent/10 border border-white/5 hover:border-accent/40 text-white hover:text-accent flex items-center justify-center transition-all cursor-pointer"
              aria-label="Next Testimonial"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
