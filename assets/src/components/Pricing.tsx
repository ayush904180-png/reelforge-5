/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Check, Sparkles, AlertCircle, Calendar } from 'lucide-react';
import { PRICING_PLANS_MONTHLY, PRICING_PLANS_ONETIME } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<'onetime' | 'monthly'>('onetime');

  const activePlans = billingPeriod === 'onetime' ? PRICING_PLANS_ONETIME : PRICING_PLANS_MONTHLY;

  const handleCtaClick = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      const offsetTop = contactElement.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="pricing"
      className="relative py-28 md:py-36 bg-[#080808] border-t border-white/5"
    >
      {/* Background spotlights */}
      <div className="absolute left-[10%] top-[20%] w-[450px] h-[450px] radial-glow pointer-events-none opacity-20" />
      <div className="absolute right-[5%] bottom-[15%] w-[500px] h-[500px] radial-glow pointer-events-none opacity-15" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="text-accent font-mono text-sm tracking-widest uppercase mb-3">
            // Transparent Creative Investment
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-[54px] tracking-tight text-white leading-tight">
            Pricing Plans
          </h2>
          <p className="mt-4 text-muted text-base sm:text-lg font-sans">
            Choose a plan that fits your production pipeline. Switch between one-off flat-rates and monthly rolling retainers.
          </p>

          {/* Toggle Billing Selector */}
          <div className="inline-flex items-center gap-1.5 mt-10 glass-frost-badge rounded-full p-1.5">
            <button
              onClick={() => setBillingPeriod('onetime')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                billingPeriod === 'onetime'
                  ? 'bg-accent text-white shadow-[0_0_12px_rgba(255,122,0,0.35)]'
                  : 'text-bebebe/70 hover:text-white'
              }`}
            >
              One-time Flat Rate
            </button>
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                billingPeriod === 'monthly'
                  ? 'bg-accent text-white shadow-[0_0_12px_rgba(255,122,0,0.35)]'
                  : 'text-bebebe/70 hover:text-white'
              }`}
            >
              Monthly Subscription
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={billingPeriod}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
          >
            {activePlans.map((plan, index) => {
              const isMiddle = index === 1;
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-3xl flex flex-col justify-between p-8 sm:p-10 transition-luxury ${
                    isMiddle
                      ? 'glass-card border-accent glow-border scale-102 lg:scale-105 shadow-[0_15px_45px_rgba(255,122,0,0.2)] z-10'
                      : 'glass-card hover:border-accent/30 hover:shadow-[0_10px_30px_rgba(255,122,0,0.05)]'
                  }`}
                >
                  {/* POPULAR Highlight Tag (For Middle Plan) */}
                  {isMiddle && (
                    <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-accent to-[#FF4D00] text-[10px] font-bold text-white tracking-widest uppercase px-3.5 py-1.5 rounded-full shadow-[0_0_12px_rgba(255,122,0,0.5)] flex items-center gap-1">
                      <Sparkles className="w-3 h-3 animate-spin [animation-duration:4s]" />
                      POPULAR
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-display font-black text-2xl text-white tracking-tight">
                          {plan.name}
                        </h3>
                        <p className="text-xs text-muted font-mono mt-1 uppercase tracking-wider font-semibold">
                          Suite Scope
                        </p>
                      </div>
                    </div>

                    {/* Price Block */}
                    <div className="mt-8 flex items-baseline gap-2">
                      <span className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight">
                        {plan.price}
                      </span>
                      {plan.price !== 'Custom' && (
                        <span className="text-muted text-sm font-mono uppercase tracking-wide">
                          / {plan.period}
                        </span>
                      )}
                    </div>

                    <p className="mt-4 text-bebebe text-sm leading-[1.6]">
                      {plan.description}
                    </p>

                    {/* Features list */}
                    <div className="mt-8 border-t border-white/5 pt-8">
                      <h4 className="font-display font-bold text-xs uppercase text-muted tracking-wider mb-4">
                        Inclusions
                      </h4>
                      
                      <ul className="space-y-3.5">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-white text-sm">
                            <span className="w-5 h-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 text-accent mt-0.5">
                              <Check className="w-3.5 h-3.5" />
                            </span>
                            <span className="font-sans text-bebebe/90">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Pricing CTA Button */}
                  <div className="mt-10 pt-4">
                    <button
                      onClick={handleCtaClick}
                      className={`w-full py-4 rounded-xl font-display font-semibold text-sm transition-all duration-300 cursor-pointer text-center ${
                        isMiddle
                          ? 'bg-accent hover:bg-accent-dark text-white shadow-[0_4px_25px_rgba(255,122,0,0.4)] hover:shadow-[0_0_30px_rgba(255,122,0,0.6)]'
                          : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/40 text-white'
                      }`}
                    >
                      {plan.ctaText}
                    </button>
                  </div>

                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Retainer/Contract notes footer banner */}
        <div className="mt-16 text-center max-w-2xl mx-auto flex items-center justify-center gap-3 glass-card rounded-2xl px-6 py-4">
          <AlertCircle className="w-5 h-5 text-accent shrink-0" />
          <p className="text-xs text-muted leading-[1.6] font-sans">
            Need custom editing deliverables? We offer custom retainers tailored exactly to your active content output and multi-channel workflows.
          </p>
        </div>

      </div>
    </section>
  );
}
