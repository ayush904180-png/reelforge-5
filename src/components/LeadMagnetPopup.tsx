/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, FileDown, X, Mail, Check, ArrowRight } from 'lucide-react';

export default function LeadMagnetPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadCompleted, setDownloadCompleted] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed or filled the checklist
    const hasSeen = localStorage.getItem('reelforge_checklist_subscribed');
    if (hasSeen) return;

    // Delay for 20 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 20000); // 20000 ms = 20 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    // Persist dismiss for this session to respect user space
    localStorage.setItem('reelforge_checklist_subscribed', 'dismissed');
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);

    // Simulate database delivery log
    setTimeout(() => {
      setIsSubmitting(false);
      setDownloadCompleted(true);
      triggerFileDownload(formData.name);

      // Save complete flag
      localStorage.setItem('reelforge_checklist_subscribed', 'completed');

      // Close modal after download display
      setTimeout(() => {
        setIsOpen(false);
      }, 3500);
    }, 1500);
  };

  const triggerFileDownload = (userName: string) => {
    // Generate actual high-value text/markdown checklist file content
    const checklistContent = `===========================================================
REELFORGE V2.0 - VIRAL VIDEO EDITING CHECKLIST
===========================================================
Prepared exclusively for: ${userName}
Generated at: ${new Date().toLocaleDateString()}
===========================================================

This checklist is engineered based on editing files generating 
10M+ collective views on YouTube, TikTok, and Instagram.

-----------------------------------------------------------
PHASE 1: PRE-EDITING & STRUCTURE
-----------------------------------------------------------
[ ] 1. AUDIO SYNCING: Align dual-system audio with scratch audio.
       Master vocal levels to -14 LUFS (standard).
[ ] 2. LOG GRADING BASIS: Convert Log (S-Log3, D-Log) to Rec.709.
       Verify whites do not exceed 95 IRE to avoid mobile clipping.
[ ] 3. HOOK SELECTION: Locate the absolute highest emotional peak 
       in the first 45 seconds of raw footage. Place it in the 
       first 3 seconds.

-----------------------------------------------------------
PHASE 2: THE CRITICAL FIRST 10 SECONDS
-----------------------------------------------------------
[ ] 4. PATTERN INTERRUPT: Ensure a zoom, subtitle pop, B-roll cut,
       or graphic transition triggers every 3.2 seconds.
[ ] 5. SOUND TRIGGER: Layer at least 3 distinct sound effects 
       (e.g., whoosh transition + typewriter + bass rumble) 
       in the first 5 seconds.
[ ] 6. TITLE CARD: Add highly visible stylized text outlining 
       the video objective in space-grotesk typography.

-----------------------------------------------------------
PHASE 3: SUSTAINING THE BULK MIDDLE
-----------------------------------------------------------
[ ] 7. BRoll INJECTION: Place illustrative context images 
       whenever the host explains complex abstract rules.
[ ] 8. SILENCE COMPRESSION: Apply tight ripple cuts to eliminate 
       filler breaths, pauses, and repeating syllables.
[ ] 9. VOCAL EQ: Level host audio using a high-pass filter at 80Hz 
       and compress dynamics to keep voices intimate.

-----------------------------------------------------------
PHASE 4: CONVERSION OUTRO
-----------------------------------------------------------
[ ] 10. SPEED RAMP: Quicken pacing 1.25x in the last 15 seconds 
        to reduce drop-offs prior to Call To Action.
[ ] 11. ENDSCREEN CARD: Leave a 10-second end card containing 
        clickable playlists, with no host audio pause.

-----------------------------------------------------------
For bespoke high-retention video production scaling, 
schedule your strategy session at: https://reelforge.agency
-----------------------------------------------------------`;

    const blob = new Blob([checklistContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'ReelForge_Viral_Editing_Checklist.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 50 }}
            className="w-full max-w-md rounded-2xl bg-gradient-to-br from-[#111] to-[#040404] border-2 border-white/10 p-6 sm:p-8 relative overflow-hidden shadow-[0_0_50px_rgba(255,122,0,0.25)]"
          >
            {/* Background absolute graphic */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-1 rounded-lg text-bebebe hover:text-white hover:bg-white/5 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {!downloadCompleted ? (
              <div>
                <div className="flex items-center gap-1.5 text-accent font-mono text-[10px] uppercase tracking-wider mb-2 font-black">
                  <Sparkles className="w-4 h-4 animate-pulse" /> FREE SCALE ASSET DELIVERED
                </div>
                
                <h4 className="font-display font-black text-xl sm:text-2xl text-white leading-tight mb-2">
                  Get the Viral Video Editing Checklist
                </h4>
                
                <p className="text-xs text-bebebe leading-relaxed mb-6">
                  Join 1,200+ elite creators. We packaged our exact retention, pacing, sound FX, and color science steps into a single checkable guide.
                </p>

                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your First Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white text-xs sm:text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="Your Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white text-xs sm:text-sm focus:outline-none focus:border-accent"
                    />
                    <Mail className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-accent hover:bg-accent-dark text-white font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    {isSubmitting ? 'Transmitting guide...' : 'Download Checklist File'} <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <p className="text-[9px] text-muted text-center mt-3 font-sans">
                  *Completely free resource. File downloads immediately upon click. No subscription locked.
                </p>
              </div>
            ) : (
              <div className="py-8 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <Check className="w-5 h-5" />
                </div>
                <h5 className="font-display font-black text-lg text-white mb-2">Checklist Compiled!</h5>
                <p className="text-xs text-bebebe mb-4">
                  Check your browser downloads tray. Your bespoke checklist text file was delivered directly.
                </p>
                <div className="inline-flex items-center gap-1.5 text-accent font-mono text-[10px] font-bold uppercase">
                  <FileDown className="w-4 h-4 animate-bounce" /> File Downloaded Safely
                </div>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
