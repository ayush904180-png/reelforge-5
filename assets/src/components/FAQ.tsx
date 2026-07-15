/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ChevronDown, Plus, Minus, HelpCircle } from 'lucide-react';
import { FAQS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative py-28 md:py-36 bg-bg-deep border-t border-white/5 overflow-hidden"
    >
      {/* Background spotlights */}
      <div className="absolute right-[5%] top-[10%] w-[500px] h-[500px] radial-glow pointer-events-none opacity-20" />
      <div className="absolute left-[10%] bottom-[15%] w-[450px] h-[450px] radial-glow pointer-events-none opacity-15" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <div className="text-accent font-mono text-sm tracking-widest uppercase mb-3">
            // Technical Support & Onboarding
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-[54px] tracking-tight text-white leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-muted text-base sm:text-lg font-sans">
            Find immediate answers regarding timelines, software ecosystems, master formatting, and project licensing.
          </p>
        </div>

        {/* FAQs List Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'glass-card border-accent shadow-[0_0_15px_rgba(255,122,0,0.08)]'
                    : 'glass-card hover:border-white/20'
                }`}
              >
                {/* Accordion trigger header button */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left px-6 sm:px-8 py-5 sm:py-6 flex justify-between items-center gap-4 cursor-pointer"
                >
                  <span className="font-display font-bold text-base sm:text-lg text-white group-hover:text-accent transition-colors">
                    {faq.question}
                  </span>
                  
                  {/* Rotating Indicator */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                    isOpen
                      ? 'bg-accent/10 border-accent text-accent'
                      : 'glass-frost-badge text-muted'
                  }`}>
                    {isOpen ? (
                      <Minus className="w-4 h-4 transition-transform duration-300" />
                    ) : (
                      <Plus className="w-4 h-4 transition-transform duration-300" />
                    )}
                  </div>
                </button>

                {/* Animated content expansion container */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-6 sm:pb-8 border-t border-white/5 pt-4 text-bebebe leading-[1.7] text-sm sm:text-base font-sans">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Quick helper contact banner below FAQs */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 glass-card rounded-2xl px-6 py-4">
            <HelpCircle className="w-5 h-5 text-accent shrink-0" />
            <span className="text-xs font-mono text-muted uppercase">Still have custom workflow inquiries?</span>
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
              className="px-4 py-2 rounded-lg bg-accent text-white text-xs font-display font-bold hover:bg-accent-dark transition-all duration-300 cursor-pointer shadow-md"
            >
              Ask Our Editors
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
