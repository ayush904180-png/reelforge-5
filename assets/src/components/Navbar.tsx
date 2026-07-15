/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scroll for visual activation and sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection
      const scrollPosition = window.scrollY + 150;
      for (const item of NAV_ITEMS) {
        const targetId = item.href.slice(1);
        const element = document.getElementById(targetId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(targetId);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.slice(1);
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // offset for floating navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
      setActiveSection(targetId);
    }
  };

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-50 rounded-2xl transition-all duration-300 ${
          isScrolled
            ? 'glass-navbar py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-white/10'
            : 'bg-transparent py-5 border border-transparent'
        }`}
      >
        <div className="px-6 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-accent to-accent-dark shadow-[0_0_15px_rgba(255,122,0,0.5)] group-hover:scale-110 transition-transform duration-300">
              <Flame className="w-5 h-5 text-white animate-pulse" />
              <div className="absolute inset-0 rounded-xl border border-white/20 scale-105 group-hover:scale-115 transition-transform duration-300"></div>
            </div>
            <span className="font-display font-black text-xl tracking-wider text-white">
              REEL<span className="text-accent transition-colors duration-300 group-hover:text-white">FORGE</span>
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 rounded-lg hover:text-white ${
                    isActive ? 'text-accent font-semibold' : 'text-bebebe/80'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavLine"
                      className="absolute bottom-1 left-4 right-4 h-[2px] bg-accent rounded-full shadow-[0_0_8px_#FF7A00]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Side Call to Action */}
          <div className="hidden lg:block">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="relative inline-flex items-center justify-center px-6 py-2.5 rounded-xl font-display font-semibold text-sm text-white overflow-hidden group transition-all duration-300 bg-accent hover:bg-accent-dark shadow-[0_4px_20px_rgba(255,122,0,0.3)] hover:shadow-[0_0_25px_rgba(255,122,0,0.65)] hover:-translate-y-0.5"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-accent-dark to-accent-light transition-transform duration-500 ease-out" />
            </a>
          </div>

          {/* Mobile Hamburguer Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white hover:text-accent hover:border-accent/40 transition-colors duration-300"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Overlay Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#050505]/98 z-40 lg:hidden flex flex-col justify-center px-8 md:px-16"
          >
            <div className="flex flex-col gap-6">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`font-display text-3xl font-bold tracking-tight py-2 border-b border-white/5 transition-colors ${
                    activeSection === item.href.slice(1) ? 'text-accent' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.05 }}
                className="mt-6"
              >
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="w-full text-center block py-4 rounded-xl bg-accent hover:bg-accent-dark font-display font-bold text-white shadow-[0_0_20px_rgba(255,122,0,0.4)] transition-all duration-300"
                >
                  Get Started
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
