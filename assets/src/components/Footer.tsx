/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Flame, Mail, Send, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    // Simulate newsletter subscription
    setTimeout(() => {
      setSubscribed(true);
      setNewsletterEmail('');
    }, 800);
  };

  const handleFooterLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(href.slice(1));
      if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <footer className="relative bg-[#050505] border-t border-white/5 pt-20 pb-8 overflow-hidden">
      {/* Decorative background grid and spotlight */}
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-accent/5 to-transparent pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Grid Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/5">
          
          {/* Column 1: Studio Bio (Col 4) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <a href="#home" onClick={(e) => handleFooterLinkClick(e, '#home')} className="flex items-center gap-2 group cursor-pointer">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-accent to-accent-dark shadow-md group-hover:scale-105 transition-transform">
                <Flame className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="font-display font-black text-lg tracking-wider text-white">
                REEL<span className="text-accent">FORGE</span>
              </span>
            </a>
            
            <p className="text-sm text-bebebe font-sans leading-[1.6] max-w-sm">
              We edit stories that inspire audiences. Premium post-production combining cinema color grading, Foley sound, and custom motion timelines designed to optimize client retention.
            </p>
            
            <div className="text-xs text-muted font-mono flex items-center gap-2 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>Coordinators active in all timezones</span>
            </div>
          </div>

          {/* Column 2: Quick Links (Col 2) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm font-sans">
              <li>
                <a href="#home" onClick={(e) => handleFooterLinkClick(e, '#home')} className="text-muted hover:text-accent transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleFooterLinkClick(e, '#services')} className="text-muted hover:text-accent transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#portfolio" onClick={(e) => handleFooterLinkClick(e, '#portfolio')} className="text-muted hover:text-accent transition-colors">
                  Work Portfolio
                </a>
              </li>
              <li>
                <a href="#pricing" onClick={(e) => handleFooterLinkClick(e, '#pricing')} className="text-muted hover:text-accent transition-colors">
                  Pricing Plans
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleFooterLinkClick(e, '#contact')} className="text-muted hover:text-accent transition-colors">
                  Contact Brief
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Help & Support (Col 2) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">
              Help & Support
            </h4>
            <ul className="space-y-2.5 text-sm font-sans">
              <li>
                <a href="#faq" onClick={(e) => handleFooterLinkClick(e, '#faq')} className="text-muted hover:text-accent transition-colors">
                  FAQ Accordion
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => handleFooterLinkClick(e, '#faq')} className="text-muted hover:text-accent transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => handleFooterLinkClick(e, '#faq')} className="text-muted hover:text-accent transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => handleFooterLinkClick(e, '#faq')} className="text-muted hover:text-accent transition-colors">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Form (Col 4) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">
              Stay Connected
            </h4>
            
            <p className="text-xs text-bebebe font-sans leading-relaxed">
              Subscribe to get modern post-production blueprints, pacing tips, and exclusive subscriber slots.
            </p>

            <form onSubmit={handleSubscribe} className="relative mt-3 flex items-center">
              {!subscribed ? (
                <>
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full glass-frost-badge hover:border-white/12 text-white placeholder-muted/60 px-4 py-3 rounded-xl text-xs font-sans focus:outline-none focus:border-accent transition-all pr-12"
                    placeholder="Enter your email address..."
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 w-9 h-9 rounded-lg bg-accent hover:bg-accent-dark text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </>
              ) : (
                <div className="w-full flex items-center gap-2.5 p-3 rounded-xl bg-accent/10 border border-accent/20 text-accent text-xs font-sans">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Subscribed Successfully!</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom copyright column */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 text-xs font-mono text-muted">
          <div>
            &copy; {new Date().getFullYear()} ReelForge Studios. All rights reserved.
          </div>
          
          <div className="flex items-center gap-1.5">
            <span>Crafted in Cloud Workspace</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>Ayush Vibe Code</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
