import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Minus, Search, ChevronDown, ChevronRight, HelpCircle, 
  MessageSquare, Sparkles, BookOpen, AlertCircle, ArrowUpRight 
} from 'lucide-react';
import { FAQItem } from '../types';
import { initialFAQs, getStoredData } from '../data';

interface FaqPageProps {
  onNavigate: (path: string) => void;
}

export default function FaqPage({ onNavigate }: FaqPageProps) {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const data = getStoredData<FAQItem[]>('reelforge_faqs', initialFAQs);
    setFaqs(data);

    // Schema.org FAQ Markup injection
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": data.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };

    const scriptId = 'faq-schema-jsonld';
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }
    scriptElement.text = JSON.stringify(faqSchema);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, []);

  const categories = ['All', ...Array.from(new Set(faqs.map(f => f.category)))];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="py-24 md:py-32 bg-[#020202] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-3">// Editorial FAQ Guide</span>
          <h1 className="font-display font-black text-4xl sm:text-5xl tracking-tight leading-[1.1] text-white">
            Calibrated Editorial FAQ
          </h1>
          <p className="font-sans text-bebebe text-sm sm:text-base leading-relaxed mt-4">
            Have questions about raw footage specs, review pipelines, or custom brand presets? Review our documented post-production workflows below.
          </p>
        </div>

        {/* Search & Category Filter bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/5 pb-8 mb-12">
          
          {/* Category Selector pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setExpandedId(null); }}
                className={`px-4 py-2 rounded-xl text-xs font-display font-bold uppercase tracking-wider cursor-pointer transition-all ${
                  activeCategory === cat 
                    ? 'bg-accent text-white shadow-md' 
                    : 'bg-white/5 hover:bg-white/10 text-bebebe hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help topics..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-white focus:outline-none focus:border-accent font-sans"
            />
          </div>

        </div>

        {/* FAQs Accordion Lists */}
        <div className="max-w-3xl mx-auto space-y-4 mb-24">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.map((faq) => {
              const isOpen = expandedId === faq.id;
              return (
                <motion.div 
                  layout
                  key={faq.id}
                  className={`rounded-2xl border transition-all ${
                    isOpen 
                      ? 'bg-white/3 border-accent/40 shadow-lg' 
                      : 'bg-[#050505] border-white/5 hover:border-white/10'
                  }`}
                >
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full p-6 text-left flex justify-between items-center gap-4 cursor-pointer"
                  >
                    <span className="font-display font-bold text-sm sm:text-base text-white leading-snug">
                      {faq.question}
                    </span>
                    <span className={`p-1.5 rounded-lg bg-white/5 text-bebebe shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent bg-accent/15' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-bebebe font-sans leading-relaxed border-t border-white/3">
                          <p className="mb-4">{faq.answer}</p>
                          <div className="flex items-center gap-2 text-[10px] font-mono text-accent uppercase tracking-wider mt-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Category Group: {faq.category}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-20 border border-dashed border-white/5 rounded-3xl font-mono text-xs text-muted">
              No matching help topics discovered. Try searching other keywords.
            </div>
          )}
        </div>

        {/* Secondary Contact CTA box */}
        <div className="max-w-xl mx-auto text-center p-8 rounded-3xl border border-white/5 bg-gradient-to-tr from-[#111] to-black space-y-4">
          <h3 className="font-display font-black text-lg text-white">Still Have Questions About Retainers?</h3>
          <p className="text-xs text-bebebe leading-relaxed font-sans">
            Our priority team is standing by. Speak with us via email, directly on WhatsApp, or book a free consult call with our post production strategists.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={() => onNavigate('/contact')}
              className="px-5 py-3 rounded-xl bg-accent hover:bg-accent-dark text-white font-display font-bold text-xs uppercase tracking-wider cursor-pointer transition-colors"
            >
              Ask Our Team
            </button>
            <button 
              onClick={() => onNavigate('/contact')}
              className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-bebebe hover:text-white text-xs font-display font-bold uppercase tracking-wider cursor-pointer border border-white/10 transition-colors"
            >
              Request WhatsApp chat
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
