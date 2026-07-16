/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Laptop, 
  Send, 
  Check, 
  User, 
  Building, 
  DollarSign, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface DateOption {
  dayName: string;
  dayNumber: number;
  monthName: string;
  fullDate: string;
}

// Helper to generate next 7 weekday options
const generateNextWeekdays = (): DateOption[] => {
  const result: DateOption[] = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  let current = new Date();
  // Jump to tomorrow
  current.setDate(current.getDate() + 1);

  while (result.length < 7) {
    const dayOfWeek = current.getDay();
    // Only add Monday to Friday (weekdays)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      result.push({
        dayName: days[dayOfWeek],
        dayNumber: current.getDate(),
        monthName: months[current.getMonth()],
        fullDate: current.toISOString().split('T')[0]
      });
    }
    current.setDate(current.getDate() + 1);
  }
  return result;
};

export default function BookCall() {
  const dateOptions = generateNextWeekdays();
  
  const [selectedDate, setSelectedDate] = useState<DateOption>(dateOptions[0]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    business: '',
    projectType: 'youtube',
    budget: '$500 - $1,000',
    platform: 'google_meet'
  });

  const [bookingState, setBookingState] = useState<'idle' | 'processing' | 'confirmed'>('idle');

  const timeSlots: TimeSlot[] = [
    { time: '10:00 AM EST', available: true },
    { time: '11:30 AM EST', available: true },
    { time: '01:00 PM EST', available: false }, // Already booked
    { time: '02:30 PM EST', available: true },
    { time: '04:00 PM EST', available: true },
    { time: '05:30 PM EST', available: true }
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTime) {
      alert("Please select a preferred meeting time slot.");
      return;
    }

    setBookingState('processing');

    // Simulate scheduling pipeline with automated email delivery triggers
    setTimeout(() => {
      setBookingState('confirmed');
    }, 2000);
  };

  return (
    <div className="w-full rounded-3xl glass-card border border-white/5 p-6 sm:p-8 md:p-10 relative overflow-hidden bg-gradient-to-br from-[#0c0c0c] to-[#040404]">
      
      {/* Visual top glowing indicator */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-[60px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {bookingState === 'idle' || bookingState === 'processing' ? (
          <motion.div
            key="booking-form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            <div className="text-center md:text-left max-w-xl">
              <span className="text-accent font-mono text-[10px] tracking-widest uppercase block mb-1">
                // Cal.com Interactive Sandbox
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                Book Your Post-Production Strategy
              </h3>
              <p className="text-xs text-bebebe mt-1.5 leading-relaxed">
                Choose an available slot. In this 15-minute consultation, we’ll map out your visual style, color profiles, and content scheduling workflows.
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column (Date & Time pickers) - 5 cols */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* 1. Date choice */}
                <div>
                  <label className="block text-[10px] text-muted uppercase tracking-wider font-mono mb-3 flex items-center gap-1">
                    <CalendarIcon className="w-3.5 h-3.5 text-accent" /> 1. Select Available Date
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-4 gap-2">
                    {dateOptions.map((d) => (
                      <button
                        key={d.fullDate}
                        type="button"
                        onClick={() => {
                          setSelectedDate(d);
                          setSelectedTime(''); // Reset selected time when date changes
                        }}
                        className={`p-2 rounded-xl text-center border cursor-pointer flex flex-col items-center justify-center transition-all ${
                          selectedDate.fullDate === d.fullDate 
                            ? 'bg-accent/15 border-accent text-white shadow-md' 
                            : 'bg-white/2 border-white/5 hover:border-white/20 text-bebebe'
                        }`}
                      >
                        <span className="text-[10px] font-mono text-muted uppercase">{d.dayName}</span>
                        <span className="font-display font-black text-sm text-white mt-0.5">{d.dayNumber}</span>
                        <span className="text-[9px] text-muted font-sans font-medium mt-0.5">{d.monthName}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Time Slot Choice */}
                <div>
                  <label className="block text-[10px] text-muted uppercase tracking-wider font-mono mb-3 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-accent" /> 2. Select Time Slot
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((s) => (
                      <button
                        key={s.time}
                        type="button"
                        disabled={!s.available}
                        onClick={() => setSelectedTime(s.time)}
                        className={`py-3 px-2 rounded-xl text-center border text-xs cursor-pointer transition-all ${
                          !s.available
                            ? 'bg-black/40 border-white/2 text-muted/40 line-through cursor-not-allowed'
                            : selectedTime === s.time
                            ? 'bg-accent border-accent text-white shadow-lg'
                            : 'bg-white/2 border-white/5 hover:border-white/20 text-white'
                        }`}
                      >
                        {s.time}
                        {!s.available && <span className="block text-[8px] text-muted/30 font-mono mt-0.5">(BOOKED)</span>}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column (Details forms) - 7 cols */}
              <div className="lg:col-span-7 space-y-4">
                
                <label className="block text-[10px] text-muted uppercase tracking-wider font-mono flex items-center gap-1 mb-2">
                  <Laptop className="w-3.5 h-3.5 text-accent" /> 3. Strategic Intake Questionnaire
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white text-xs sm:text-sm focus:outline-none focus:border-accent"
                    />
                    <User className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="Your Email *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white text-xs sm:text-sm focus:outline-none focus:border-accent"
                    />
                    <Clock className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Business / Channel Name"
                      value={formData.business}
                      onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                      className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white text-xs sm:text-sm focus:outline-none focus:border-accent"
                    />
                    <Building className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>

                  <div className="relative">
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white text-xs sm:text-sm focus:outline-none focus:border-accent cursor-pointer"
                    >
                      <option value="<$500">Budget: Under $500/mo</option>
                      <option value="$500 - $1,000">Budget: $500 - $1,000/mo</option>
                      <option value=">$1,000">Budget: Above $1,000/mo</option>
                    </select>
                    <DollarSign className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] text-muted uppercase font-mono mb-1">Deliverable Priority</label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-3 py-3 rounded-xl bg-white/5 border border-white/5 text-white text-xs sm:text-sm focus:outline-none focus:border-accent cursor-pointer"
                    >
                      <option value="youtube">YouTube Long Form</option>
                      <option value="reels">TikTok / Reels / Shorts</option>
                      <option value="commercial">Commercial Campaigns</option>
                      <option value="podcast">Podcast Multi-Camera</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[9px] text-muted uppercase font-mono mb-1">Preferred Conference Link</label>
                    <select
                      value={formData.platform}
                      onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                      className="w-full px-3 py-3 rounded-xl bg-white/5 border border-white/5 text-white text-xs sm:text-sm focus:outline-none focus:border-accent cursor-pointer"
                    >
                      <option value="google_meet">Google Meet (Auto-invite)</option>
                      <option value="zoom">Zoom Web Call</option>
                      <option value="phone">Standard Phone Call</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 mt-6">
                  <button
                    type="submit"
                    disabled={bookingState === 'processing'}
                    className="w-full py-4 rounded-xl bg-accent hover:bg-accent-dark text-white font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-accent/20 cursor-pointer disabled:opacity-50"
                  >
                    {bookingState === 'processing' ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Securing slot on Calendar...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Secure Meeting on {selectedDate.dayName} {selectedDate.monthName} {selectedDate.dayNumber}
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-muted text-center mt-3 flex items-center justify-center gap-1.5 leading-relaxed">
                    <AlertCircle className="w-3.5 h-3.5 text-accent" /> No Credit Card Required. Confirmation calendar link dispatches instantly.
                  </p>
                </div>

              </div>

            </form>
          </motion.div>
        ) : (
          
          /* BOOKED CONFIRMATION SCREEN */
          <motion.div
            key="confirmed-screen"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 text-center max-w-lg mx-auto"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h4 className="font-display font-black text-3xl text-white mb-2">Strategy Call Locked In!</h4>
            <p className="text-xs text-bebebe leading-relaxed max-w-sm mx-auto mb-8">
              Congratulations! Your post-production strategy session has been scheduled.
            </p>

            <div className="bg-white/3 border border-white/5 rounded-2xl p-6 text-left space-y-3.5 text-xs text-bebebe mb-8">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-muted">Host Agency:</span>
                <span className="text-white font-bold font-display">ReelForge Team</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-muted">Meeting Date:</span>
                <span className="text-white font-semibold font-mono">{selectedDate.dayName}, {selectedDate.monthName} {selectedDate.dayNumber}, 2026</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-muted">Time Slot:</span>
                <span className="text-white font-semibold font-mono">{selectedTime}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-muted">Conference Link:</span>
                <span className="text-accent font-semibold font-mono flex items-center gap-1 uppercase">
                  {formData.platform === 'google_meet' ? 'Google Meet (Auto-generated)' : formData.platform === 'zoom' ? 'Zoom Invite' : 'Phone Audio'}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] text-bebebe flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Dynamic Calendar invite dispatched to <strong>{formData.email}</strong>
              </p>
              <button
                onClick={() => setBookingState('idle')}
                className="text-xs text-muted hover:text-white underline cursor-pointer transition-colors"
              >
                Schedule another consult slot
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
