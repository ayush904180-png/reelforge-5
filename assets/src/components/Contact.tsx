/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, ExternalLink, Calendar, Send, CheckCircle, Instagram, Linkedin, Youtube, Twitter, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    channelType: 'youtube',
    footageUrl: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.name || !formData.email) {
    alert("Please fill out the required Name and Email fields.");
    return;
  }

  setIsSubmitting(true);

  try {
    await fetch(
      "https://script.google.com/macros/s/AKfycbwbBafnYT99UtpstpA7D76fhD4lE7Mye9AK4oEnrbtThFPGLCNuxH-mcS9x1HIH4nY9/exec",
      {
        method: "POST",
        redirect: "follow",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formData),
      }
    );

    setIsSuccess(true);

    setFormData({
      name: "",
      email: "",
      channelType: "youtube",
      footageUrl: "",
      message: "",
    });
  } catch (error) {
    console.error(error);
    alert("Failed to submit form.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <section
      id="contact"
      className="relative py-28 md:py-36 bg-[#050505] border-t border-white/5 overflow-hidden"
    >
      {/* Intense Orange Background Glow behind Section */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-accent/15 via-accent-dark/5 to-transparent rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Main Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Column: Let's Build Something (Col 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              <div className="text-accent font-mono text-sm tracking-widest uppercase mb-3">
                // Scale Your Visual Brand
              </div>
              <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-[54px] tracking-tight text-white leading-[1.1] mb-6">
                Let&apos;s Build <br />
                Something <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#FF4D00] to-[#FF9A3C] text-glow-strong">
                  Amazing Together
                </span>
              </h2>
              
              <p className="font-sans text-bebebe text-base sm:text-lg leading-[1.7] max-w-md">
                We are ready to align with your production requirements. Send over your raw footage specs or book a call directly to outline your creative blueprint.
              </p>

              {/* Instant CTAs Grid */}
              <div className="mt-10 space-y-4">
                {/* Book Call CTA */}
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl bg-accent text-white font-display font-bold text-sm shadow-[0_4px_20px_rgba(255,122,0,0.3)] hover:shadow-[0_0_25px_rgba(255,122,0,0.55)] transition-all duration-300 hover:-translate-y-0.5 group"
                >
                  <span className="flex items-center gap-3">
                    <Calendar className="w-5 h-5" />
                    Book a Strategic Call
                  </span>
                  <ExternalLink className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                </a>

                {/* Email Direct CTA */}
                <a
                  href="mailto:coordinators@reelforge.com"
                  className="flex items-center gap-3 p-4 rounded-xl glass-frost-badge hover:border-accent/40 text-white hover:text-accent font-display font-semibold text-sm transition-all duration-300"
                >
                  <Mail className="w-5 h-5 text-accent" />
                  coordinators@reelforge.com
                </a>

                {/* WhatsApp Direct CTA */}
                <a
                  href="https://wa.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl glass-frost-badge hover:border-accent/40 text-white hover:text-accent font-display font-semibold text-sm transition-all duration-300"
                >
                  <Phone className="w-5 h-5 text-accent" />
                  Direct WhatsApp Chat
                </a>
              </div>
            </div>

            {/* Social Icons list */}
            <div className="mt-12">
              <div className="text-xs uppercase font-mono text-muted tracking-widest mb-4">
                Follow ReelForge Studios
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass-frost-badge text-muted hover:text-accent hover:border-accent/30 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-md"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass-frost-badge text-muted hover:text-accent hover:border-accent/30 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-md"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass-frost-badge text-muted hover:text-accent hover:border-accent/30 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-md"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass-frost-badge text-muted hover:text-accent hover:border-accent/30 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-md"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass-frost-badge text-muted hover:text-accent hover:border-accent/30 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-md"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Creative brief form (Col 7) */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-center">
            
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="brief-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6 text-left"
                >
                  <div>
                    <h3 className="font-display font-black text-2xl text-white tracking-tight">
                      Creative Project Brief
                    </h3>
                    <p className="text-xs text-muted font-sans mt-1">
                      Share some preliminary details and receive a custom estimate in 12 hours.
                    </p>
                  </div>

                  {/* Input Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono font-semibold uppercase text-muted tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="glass-frost-badge hover:border-white/15 text-white placeholder-muted/60 px-4 py-3.5 rounded-xl text-sm font-sans focus:outline-none focus:border-accent transition-all"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono font-semibold uppercase text-muted tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="glass-frost-badge hover:border-white/15 text-white placeholder-muted/60 px-4 py-3.5 rounded-xl text-sm font-sans focus:outline-none focus:border-accent transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Content Category Selector */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono font-semibold uppercase text-muted tracking-wider">
                        Deliverable Category
                      </label>
                      <select
                        value={formData.channelType}
                        onChange={(e) => setFormData({ ...formData, channelType: e.target.value })}
                        className="glass-frost-badge hover:border-white/15 text-white px-4 py-3.5 rounded-xl text-sm font-sans focus:outline-none focus:border-accent transition-all"
                      >
                        <option value="youtube">YouTube Longform</option>
                        <option value="reels">TikTok / Reels / Shorts</option>
                        <option value="gaming">Gaming Highlight</option>
                        <option value="documentary">Cinematic Documentary</option>
                        <option value="commercial">Commercial Campaign</option>
                        <option value="corporate">Corporate Promo</option>
                      </select>
                    </div>

                    {/* Footage Link */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono font-semibold uppercase text-muted tracking-wider">
                        Footage URL (Drive/Dropbox)
                      </label>
                      <input
                        type="url"
                        value={formData.footageUrl}
                        onChange={(e) => setFormData({ ...formData, footageUrl: e.target.value })}
                        className="glass-frost-badge hover:border-white/15 text-white placeholder-muted/60 px-4 py-3.5 rounded-xl text-sm font-sans focus:outline-none focus:border-accent transition-all"
                        placeholder="https://drive.google.com/..."
                      />
                    </div>
                  </div>

                  {/* Creative Scope Detail */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono font-semibold uppercase text-muted tracking-wider">
                      Narrative Vision & Details
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="glass-frost-badge hover:border-white/15 text-white placeholder-muted/60 p-4 rounded-xl text-sm font-sans focus:outline-none focus:border-accent transition-all resize-none"
                      placeholder="Tell us about your visual pacing goals, raw footage count, revision requirements, or timeline deadlines..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-accent hover:bg-accent-dark disabled:bg-accent/40 text-white rounded-xl font-display font-bold text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(255,122,0,0.3)] hover:shadow-[0_0_25px_rgba(255,122,0,0.55)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Syncing Brief Draft...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Project Brief
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                /* Submission Confirmation */
                <motion.div
                  key="confirm-box"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-8"
                >
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/15 border border-accent/20 text-accent mb-6 shadow-[0_0_20px_rgba(255,122,0,0.2)]">
                    <CheckCircle className="w-8 h-8 animate-pulse" />
                  </div>
                  
                  <h3 className="font-display font-black text-2xl text-white tracking-tight">
                    Brief Synced Successfully!
                  </h3>
                  
                  <p className="mt-4 text-bebebe text-base font-sans max-w-md mx-auto leading-[1.6]">
                    Thank you! Your creative onboarding brief has been received. Our senior post-production coordinator will review your raw assets and follow up via email within 12 hours.
                  </p>

                  <div className="mt-10">
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="px-6 py-3 rounded-xl border border-white/10 hover:border-accent text-xs font-semibold tracking-wide text-white hover:text-accent transition-all duration-300 bg-white/5 hover:bg-accent/5 cursor-pointer"
                    >
                      Submit Another Brief
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </div>
    </section>
  );
}
