/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Settings, 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  FolderLock, 
  Eye, 
  RefreshCw, 
  Check, 
  Cpu, 
  Database,
  Terminal,
  Lock,
  Unlock,
  Key,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { Service, PortfolioItem, CaseStudy, Testimonial, BlogPost, FAQItem, PricingPlan } from '../types';
import { 
  initialServices, 
  initialPortfolio, 
  initialCaseStudies, 
  initialTestimonials, 
  initialBlogs, 
  initialFAQs, 
  initialPricingPlans,
  getStoredData, 
  saveStoredData 
} from '../data';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onDataRefresh: () => void;
}

type AdminTab = 'services' | 'portfolio' | 'case_studies' | 'testimonials' | 'blogs' | 'faqs' | 'pricing';

export default function AdminPanel({ isOpen, onClose, onDataRefresh }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('services');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Lists in state
  const [services, setServices] = useState<Service[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [pricing, setPricing] = useState<PricingPlan[]>([]);

  // Editing structures
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  // Passcode security states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcodeAttempt, setPasscodeAttempt] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [isPasscodeConfigOpen, setIsPasscodeConfigOpen] = useState(false);
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmNewPasscode, setConfirmNewPasscode] = useState('');
  const [passcodeConfigError, setPasscodeConfigError] = useState<string | null>(null);

  // Load all databases from storage
  useEffect(() => {
    if (isOpen) {
      setServices(getStoredData<Service[]>('reelforge_services', initialServices));
      setPortfolio(getStoredData<PortfolioItem[]>('reelforge_portfolio', initialPortfolio));
      setCaseStudies(getStoredData<CaseStudy[]>('reelforge_case_studies', initialCaseStudies));
      setTestimonials(getStoredData<Testimonial[]>('reelforge_testimonials', initialTestimonials));
      setBlogs(getStoredData<BlogPost[]>('reelforge_blogs', initialBlogs));
      setFaqs(getStoredData<FAQItem[]>('reelforge_faqs', initialFAQs));
      setPricing(getStoredData<PricingPlan[]>('reelforge_pricing', initialPricingPlans));
      setEditId(null);

      // Auto-lock the console for premium security
      setIsAuthenticated(false);
      setPasscodeAttempt('');
      setPasscodeError(false);
      setIsPasscodeConfigOpen(false);
      setPasscodeConfigError(null);

      // Smooth scroll down to the bottom console region
      setTimeout(() => {
        const consoleEl = document.getElementById('admin-console');
        if (consoleEl) {
          consoleEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
    }
  }, [isOpen]);

  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    const defaultPasscode = (((import.meta as any).env?.VITE_ADMIN_PASSCODE) || 'reelforge').trim();
    const correctPasscode = (localStorage.getItem('reelforge_admin_passcode') || defaultPasscode).trim();
    if (passcodeAttempt.trim() === correctPasscode) {
      setIsAuthenticated(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  const handleChangePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    setPasscodeConfigError(null);

    const trimmedPasscode = newPasscode.trim();
    const trimmedConfirm = confirmNewPasscode.trim();

    if (!trimmedPasscode) {
      setPasscodeConfigError("Passcode cannot be empty.");
      return;
    }
    if (trimmedPasscode !== trimmedConfirm) {
      setPasscodeConfigError("New passcodes do not match.");
      return;
    }
    localStorage.setItem('reelforge_admin_passcode', trimmedPasscode);
    triggerSaveNotification("Security access key updated.");
    setIsPasscodeConfigOpen(false);
    setNewPasscode('');
    setConfirmNewPasscode('');
  };

  const triggerSaveNotification = (message: string) => {
    setSaveStatus(message);
    setTimeout(() => setSaveStatus(null), 2500);
    onDataRefresh(); // Let parent reload datasets
  };

  const handleResetToDefault = () => {
    if (confirm("Are you sure you want to reset all data back to high-fidelity ReelForge agency factory defaults? This will overwrite local edits.")) {
      localStorage.removeItem('reelforge_admin_passcode');
      localStorage.removeItem('reelforge_services');
      localStorage.removeItem('reelforge_portfolio');
      localStorage.removeItem('reelforge_case_studies');
      localStorage.removeItem('reelforge_testimonials');
      localStorage.removeItem('reelforge_blogs');
      localStorage.removeItem('reelforge_faqs');
      localStorage.removeItem('reelforge_pricing');

      setServices(initialServices);
      setPortfolio(initialPortfolio);
      setCaseStudies(initialCaseStudies);
      setTestimonials(initialTestimonials);
      setBlogs(initialBlogs);
      setFaqs(initialFAQs);
      setPricing(initialPricingPlans);

      triggerSaveNotification("Database factory reset completed.");
    }
  };

  // ==========================================
  // TAB DATA MANAGERS
  // ==========================================
  
  const startEdit = (item: any) => {
    setEditId(item.id);
    setEditForm({ ...item });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditForm({});
  };

  // SERVICES CRUD
  const saveService = () => {
    let updated: Service[];
    if (editId === 'new') {
      const newService: Service = {
        ...editForm,
        id: `s_${Date.now()}`
      };
      updated = [...services, newService];
    } else {
      updated = services.map(s => s.id === editId ? { ...s, ...editForm } : s);
    }
    setServices(updated);
    saveStoredData('reelforge_services', updated);
    setEditId(null);
    triggerSaveNotification("Service configurations saved.");
  };

  const deleteService = (id: string) => {
    if (confirm("Delete this service?")) {
      const updated = services.filter(s => s.id !== id);
      setServices(updated);
      saveStoredData('reelforge_services', updated);
      triggerSaveNotification("Service removed.");
    }
  };

  // PORTFOLIO CRUD
  const savePortfolio = () => {
    let updated: PortfolioItem[];
    if (editId === 'new') {
      const newItem: PortfolioItem = {
        ...editForm,
        id: `p_${Date.now()}`,
        clientFeedback: {
          name: editForm.feedbackName || 'Anonymous',
          avatar: editForm.feedbackAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
          comment: editForm.feedbackComment || ''
        },
        softwareUsed: editForm.softwareString ? editForm.softwareString.split(',').map((s: string) => s.trim()) : ['Premiere Pro']
      };
      updated = [...portfolio, newItem];
    } else {
      const formatted = {
        ...editForm,
        clientFeedback: {
          name: editForm.feedbackName || editForm.clientFeedback?.name || 'Anonymous',
          avatar: editForm.feedbackAvatar || editForm.clientFeedback?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
          comment: editForm.feedbackComment || editForm.clientFeedback?.comment || ''
        },
        softwareUsed: editForm.softwareString ? editForm.softwareString.split(',').map((s: string) => s.trim()) : (editForm.softwareUsed || ['Premiere Pro'])
      };
      updated = portfolio.map(p => p.id === editId ? formatted : p);
    }
    setPortfolio(updated);
    saveStoredData('reelforge_portfolio', updated);
    setEditId(null);
    triggerSaveNotification("Portfolio asset locked in.");
  };

  const deletePortfolio = (id: string) => {
    if (confirm("Remove portfolio item?")) {
      const updated = portfolio.filter(p => p.id !== id);
      setPortfolio(updated);
      saveStoredData('reelforge_portfolio', updated);
      triggerSaveNotification("Portfolio item deleted.");
    }
  };

  // TESTIMONIALS CRUD
  const saveTestimonial = () => {
    let updated: Testimonial[];
    if (editId === 'new') {
      const newItem: Testimonial = {
        ...editForm,
        id: `t_${Date.now()}`,
        rating: 5,
        avatarUrl: editForm.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
      };
      updated = [...testimonials, newItem];
    } else {
      updated = testimonials.map(t => t.id === editId ? { ...t, ...editForm } : t);
    }
    setTestimonials(updated);
    saveStoredData('reelforge_testimonials', updated);
    setEditId(null);
    triggerSaveNotification("Testimonial updated.");
  };

  const deleteTestimonial = (id: string) => {
    if (confirm("Remove testimonial?")) {
      const updated = testimonials.filter(t => t.id !== id);
      setTestimonials(updated);
      saveStoredData('reelforge_testimonials', updated);
      triggerSaveNotification("Testimonial deleted.");
    }
  };

  // PRICING CRUD
  const savePricing = () => {
    const updated = pricing.map(p => p.id === editId ? { ...p, ...editForm } : p);
    setPricing(updated);
    saveStoredData('reelforge_pricing', updated);
    setEditId(null);
    triggerSaveNotification("Pricing tier calibrated.");
  };

  // FAQS CRUD
  const saveFaq = () => {
    let updated: FAQItem[];
    if (editId === 'new') {
      const newItem: FAQItem = {
        ...editForm,
        id: `faq_${Date.now()}`
      };
      updated = [...faqs, newItem];
    } else {
      updated = faqs.map(f => f.id === editId ? { ...f, ...editForm } : f);
    }
    setFaqs(updated);
    saveStoredData('reelforge_faqs', updated);
    setEditId(null);
    triggerSaveNotification("FAQ index updated.");
  };

  const deleteFaq = (id: string) => {
    if (confirm("Remove FAQ?")) {
      const updated = faqs.filter(f => f.id !== id);
      setFaqs(updated);
      saveStoredData('reelforge_faqs', updated);
      triggerSaveNotification("FAQ deleted.");
    }
  };

  // CASE STUDIES CRUD
  const saveCaseStudy = () => {
    let updated: CaseStudy[];
    if (editId === 'new') {
      const newItem: CaseStudy = {
        ...editForm,
        id: `cs_${Date.now()}`,
        results: {
          views: editForm.viewsText || '1.0M Views',
          engagement: editForm.engagementText || '+100% Growth',
          subscribers: editForm.subsText || '+10K Subscribers',
          chartData: [
            { label: 'Week 1', views: 10000 },
            { label: 'Week 2', views: 50000 },
            { label: 'Week 3', views: 200000 },
            { label: 'Week 4', views: 1000000 }
          ]
        }
      };
      updated = [...caseStudies, newItem];
    } else {
      const formatted = {
        ...editForm,
        results: {
          views: editForm.viewsText || editForm.results?.views || '1.0M Views',
          engagement: editForm.engagementText || editForm.results?.engagement || '+100% Growth',
          subscribers: editForm.subsText || editForm.results?.subscribers || '+10K Subscribers',
          chartData: editForm.results?.chartData || [
            { label: 'Week 1', views: 10000 },
            { label: 'Week 2', views: 50000 },
            { label: 'Week 3', views: 200000 },
            { label: 'Week 4', views: 1000000 }
          ]
        }
      };
      updated = caseStudies.map(cs => cs.id === editId ? formatted : cs);
    }
    setCaseStudies(updated);
    saveStoredData('reelforge_case_studies', updated);
    setEditId(null);
    triggerSaveNotification("Case study archived.");
  };

  const deleteCaseStudy = (id: string) => {
    if (confirm("Remove case study?")) {
      const updated = caseStudies.filter(cs => cs.id !== id);
      setCaseStudies(updated);
      saveStoredData('reelforge_case_studies', updated);
      triggerSaveNotification("Case study deleted.");
    }
  };

  // BLOGS CRUD
  const saveBlog = () => {
    let updated: BlogPost[];
    if (editId === 'new') {
      const newItem: BlogPost = {
        ...editForm,
        id: `b_${Date.now()}`,
        slug: editForm.title ? editForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'new-article',
        readTime: editForm.readTime || '5 min read',
        publishedDate: new Date().toISOString().split('T')[0],
        author: {
          name: 'Ryan Mercer',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
          role: 'Admin Editor',
          bio: 'ReelForge automated blog publisher.'
        }
      };
      updated = [...blogs, newItem];
    } else {
      updated = blogs.map(b => b.id === editId ? { ...b, ...editForm } : b);
    }
    setBlogs(updated);
    saveStoredData('reelforge_blogs', updated);
    setEditId(null);
    triggerSaveNotification("SEO article published.");
  };

  const deleteBlog = (id: string) => {
    if (confirm("Remove blog post?")) {
      const updated = blogs.filter(b => b.id !== id);
      setBlogs(updated);
      saveStoredData('reelforge_blogs', updated);
      triggerSaveNotification("Blog post removed.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99] bg-black/80 backdrop-blur-md flex items-end justify-center p-4 md:p-6 lg:p-10 font-sans">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="w-full max-w-7xl h-[85vh] rounded-3xl bg-gradient-to-br from-[#0c0c0c] to-[#040404] border border-accent/30 overflow-hidden flex flex-col justify-between relative shadow-[0_0_50px_rgba(255,122,0,0.35)]"
          >
            {!isAuthenticated ? (
              <div className="flex-grow flex flex-col items-center justify-center p-8 text-center relative h-full">
                {/* Beautiful close button */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="max-w-md w-full p-8 rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl relative overflow-hidden">
                  {/* Glowing backdrop circle */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl pointer-events-none" />

                  <div className="w-16 h-16 rounded-2xl bg-accent/15 border border-accent/20 text-accent flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(255,122,0,0.25)]">
                    <FolderLock className="w-8 h-8" />
                  </div>

                  <span className="text-[9px] font-mono text-accent uppercase tracking-widest block mb-2">// SECURE CORE GATEWAY</span>
                  <h3 className="font-display font-black text-2xl text-white mb-3">Forge Console Locked</h3>
                  <p className="text-xs text-bebebe leading-relaxed mb-6">
                    Enter administrative credentials to unlock content sheets and active subscription blueprints.
                  </p>

                  <form onSubmit={handleVerifyPasscode} className="space-y-4">
                    <div className="relative">
                      <input
                        type="password"
                        required
                        value={passcodeAttempt}
                        onChange={(e) => {
                          setPasscodeAttempt(e.target.value);
                          if (passcodeError) setPasscodeError(false);
                        }}
                        placeholder="••••••••••••"
                        className={`w-full px-4 py-3.5 pl-10 rounded-xl bg-white/5 border text-center text-white text-sm focus:outline-none focus:border-accent tracking-widest ${
                          passcodeError ? 'border-red-500/50 bg-red-500/5' : 'border-white/5 hover:border-white/15'
                        }`}
                      />
                      <Key className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>

                    {passcodeError && (
                      <div className="text-left space-y-1.5 p-3.5 rounded-xl bg-red-500/5 border border-red-500/20 animate-fade-in">
                        <p className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider text-center">
                          ACCESS DENIED: INVALID PASSCODE
                        </p>
                        <p className="text-[11px] text-bebebe leading-relaxed text-center">
                          If this is a newly uploaded/deployed site, your local passcode wasn't transferred.
                        </p>
                        <p className="text-[11px] text-accent font-mono text-center">
                          Try the default passcode: <span className="underline font-bold select-all bg-white/5 px-1.5 py-0.5 rounded text-white">reelforge</span>
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-accent hover:bg-accent-dark text-white font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_4px_15px_rgba(255,122,0,0.25)] hover:shadow-[0_0_20px_rgba(255,122,0,0.45)] hover:-translate-y-0.5"
                    >
                      <Lock className="w-4 h-4" /> Authenticate Access Key
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <>
                {/* Header tab section */}
                <div className="p-6 border-b border-white/5 bg-black/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                      <Settings className="w-5 h-5 animate-spin" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-xl text-white flex items-center gap-2">
                        Forge Admin Portal <span className="text-[10px] bg-accent/20 border border-accent/30 text-accent px-1.5 py-0.5 rounded uppercase font-mono">v2.0 Database</span>
                      </h3>
                      <p className="text-xs text-muted font-sans">Manage all agency content records with zero codebase overrides.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {/* Security Passcode Config Button */}
                    <button
                      onClick={() => setIsPasscodeConfigOpen(true)}
                      className="px-3 py-1.5 rounded-lg border border-accent/20 bg-accent/5 hover:bg-accent/15 text-[10px] font-mono text-accent cursor-pointer flex items-center gap-1.5 transition-all"
                    >
                      <Key className="w-3.5 h-3.5 text-accent" /> Change Passcode
                    </button>
                    <button
                      onClick={handleResetToDefault}
                      className="px-3 py-1.5 rounded-lg border border-red-500/20 bg-red-500/5 hover:bg-red-500/15 text-[10px] font-mono text-red-400 cursor-pointer flex items-center gap-1.5 transition-all"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Reset Factory Defaults
                    </button>
                    <button
                      onClick={onClose}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

            {/* Main Stage Grid (Left rail tabs, right forms) */}
            <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
              
              {/* Rail Sidebar tabs */}
              <div className="w-full md:w-56 border-r border-white/5 p-4 bg-black/20 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible gap-1 sticky top-0">
                {[
                  { id: 'services', label: 'Services List' },
                  { id: 'pricing', label: 'Pricing Plans' },
                  { id: 'portfolio', label: 'Portfolio Items' },
                  { id: 'case_studies', label: 'Case Studies' },
                  { id: 'testimonials', label: 'Testimonials' },
                  { id: 'blogs', label: 'SEO Blog Posts' },
                  { id: 'faqs', label: 'FAQ Accordion' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as AdminTab);
                      setEditId(null);
                    }}
                    className={`px-4 py-2.5 rounded-xl text-left text-xs font-display font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-accent/15 border-l-2 border-accent text-white'
                        : 'text-bebebe hover:text-white hover:bg-white/3'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Data Table Workspace */}
              <div className="flex-grow p-6 overflow-y-auto bg-[#070707]">
                
                {/* Editing Form Overlay */}
                {editId !== null ? (
                  <div className="bg-[#0f0f0f] p-6 rounded-2xl border border-white/10 space-y-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
                      <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider text-accent">
                        {editId === 'new' ? 'Create New Database Record' : `Edit Record ID: ${editId}`}
                      </h4>
                      <button onClick={cancelEdit} className="text-xs text-muted hover:text-white cursor-pointer">Cancel</button>
                    </div>

                    {/* SERVICES EDITOR FORM */}
                    {activeTab === 'services' && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] uppercase font-mono text-muted mb-1">Service Title</label>
                            <input 
                              type="text" 
                              value={editForm.title || ''} 
                              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                              className="w-full p-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] uppercase font-mono text-muted mb-1">Starting Price ($)</label>
                            <input 
                              type="number" 
                              value={editForm.startingPrice || 0} 
                              onChange={(e) => setEditForm({ ...editForm, startingPrice: parseInt(e.target.value) })}
                              className="w-full p-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] uppercase font-mono text-muted mb-1">Category Group</label>
                            <input 
                              type="text" 
                              value={editForm.category || ''} 
                              onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                              className="w-full p-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] uppercase font-mono text-muted mb-1">Standard Turnaround Time</label>
                            <input 
                              type="text" 
                              value={editForm.deliveryTime || ''} 
                              onChange={(e) => setEditForm({ ...editForm, deliveryTime: e.target.value })}
                              className="w-full p-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[9px] uppercase font-mono text-muted mb-1">Brief Description</label>
                          <textarea 
                            rows={3}
                            value={editForm.description || ''} 
                            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                            className="w-full p-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent resize-none"
                          />
                        </div>
                        <button onClick={saveService} className="w-full py-2.5 rounded-lg bg-accent text-white font-display font-bold text-xs uppercase cursor-pointer flex items-center justify-center gap-1">
                          <Save className="w-3.5 h-3.5" /> Save Configuration Record
                        </button>
                      </div>
                    )}

                    {/* PRICING PLANS EDITOR */}
                    {activeTab === 'pricing' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] uppercase font-mono text-muted mb-1">Plan Name</label>
                            <input 
                              type="text" 
                              value={editForm.name || ''} 
                              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                              className="w-full p-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] uppercase font-mono text-muted mb-1">Plan Price ($/mo)</label>
                            <input 
                              type="number" 
                              value={editForm.price || 0} 
                              onChange={(e) => setEditForm({ ...editForm, price: parseInt(e.target.value) })}
                              className="w-full p-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] uppercase font-mono text-muted mb-1">Plan Badge (e.g. "Most Popular")</label>
                            <input 
                              type="text" 
                              value={editForm.badge || ''} 
                              onChange={(e) => setEditForm({ ...editForm, badge: e.target.value })}
                              className="w-full p-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent"
                              placeholder="Optional badge label"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] uppercase font-mono text-muted mb-1">Billing Period (e.g. "month", "starting")</label>
                            <input 
                              type="text" 
                              value={editForm.period || 'month'} 
                              onChange={(e) => setEditForm({ ...editForm, period: e.target.value })}
                              className="w-full p-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[9px] uppercase font-mono text-muted mb-1">Plan Description</label>
                          <textarea 
                            rows={2}
                            value={editForm.description || ''} 
                            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                            className="w-full p-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent resize-none"
                          />
                        </div>

                        {/* PLAN DELIVERABLES AND FEATURES */}
                        <div className="border-t border-white/5 pt-4">
                          <label className="block text-[10px] uppercase font-mono text-accent mb-2 flex justify-between items-center">
                            <span>Plan Features & Deliverables List</span>
                            <span className="text-[9px] text-muted font-normal lowercase">drag-free interactive list</span>
                          </label>
                          
                          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                            {(editForm.features || []).map((feature: string, index: number) => (
                              <div key={index} className="flex items-center gap-2">
                                <input 
                                  type="text" 
                                  value={feature} 
                                  onChange={(e) => {
                                    const updatedFeatures = [...(editForm.features || [])];
                                    updatedFeatures[index] = e.target.value;
                                    setEditForm({ ...editForm, features: updatedFeatures });
                                  }}
                                  className="flex-grow p-2 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent"
                                />
                                {/* Move Up */}
                                <button 
                                  type="button"
                                  disabled={index === 0}
                                  onClick={() => {
                                    if (index > 0) {
                                      const updatedFeatures = [...editForm.features];
                                      const temp = updatedFeatures[index];
                                      updatedFeatures[index] = updatedFeatures[index - 1];
                                      updatedFeatures[index - 1] = temp;
                                      setEditForm({ ...editForm, features: updatedFeatures });
                                    }
                                  }}
                                  className="p-1.5 rounded-lg bg-white/3 hover:bg-white/10 text-bebebe hover:text-white disabled:opacity-30 cursor-pointer"
                                  title="Move Deliverable Up"
                                >
                                  <ArrowUp className="w-3.5 h-3.5" />
                                </button>
                                {/* Move Down */}
                                <button 
                                  type="button"
                                  disabled={index === editForm.features.length - 1}
                                  onClick={() => {
                                    if (index < editForm.features.length - 1) {
                                      const updatedFeatures = [...editForm.features];
                                      const temp = updatedFeatures[index];
                                      updatedFeatures[index] = updatedFeatures[index + 1];
                                      updatedFeatures[index + 1] = temp;
                                      setEditForm({ ...editForm, features: updatedFeatures });
                                    }
                                  }}
                                  className="p-1.5 rounded-lg bg-white/3 hover:bg-white/10 text-bebebe hover:text-white disabled:opacity-30 cursor-pointer"
                                  title="Move Deliverable Down"
                                >
                                  <ArrowDown className="w-3.5 h-3.5" />
                                </button>
                                {/* Delete feature */}
                                <button 
                                  type="button"
                                  onClick={() => {
                                    const updatedFeatures = editForm.features.filter((_: any, i: number) => i !== index);
                                    setEditForm({ ...editForm, features: updatedFeatures });
                                  }}
                                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 cursor-pointer"
                                  title="Delete Deliverable"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>

                          {/* Add New Feature Line */}
                          <div className="flex gap-2 mt-3">
                            <input 
                              type="text" 
                              id="new-feature-input"
                              placeholder="Insert a new premium deliverable..."
                              className="flex-grow p-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  const input = e.currentTarget;
                                  if (input.value.trim()) {
                                    const updatedFeatures = [...(editForm.features || []), input.value.trim()];
                                    setEditForm({ ...editForm, features: updatedFeatures });
                                    input.value = '';
                                  }
                                }
                              }}
                            />
                            <button 
                              type="button"
                              onClick={() => {
                                const input = document.getElementById('new-feature-input') as HTMLInputElement;
                                if (input && input.value.trim()) {
                                  const updatedFeatures = [...(editForm.features || []), input.value.trim()];
                                  setEditForm({ ...editForm, features: updatedFeatures });
                                  input.value = '';
                                }
                              }}
                              className="px-4 py-2 bg-accent/20 hover:bg-accent/30 text-accent font-display font-bold text-xs rounded-lg transition-colors cursor-pointer"
                            >
                              Add Line
                            </button>
                          </div>
                        </div>

                        <button onClick={savePricing} className="w-full py-2.5 rounded-lg bg-accent text-white font-display font-bold text-xs uppercase cursor-pointer flex items-center justify-center gap-1">
                          <Save className="w-3.5 h-3.5" /> Save Pricing Tier
                        </button>
                      </div>
                    )}

                    {/* PORTFOLIO EDITOR */}
                    {activeTab === 'portfolio' && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] uppercase font-mono text-muted mb-1">Project Title</label>
                            <input 
                              type="text" 
                              value={editForm.title || ''} 
                              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                              className="w-full p-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] uppercase font-mono text-muted mb-1">Creator / Brand Name</label>
                            <input 
                              type="text" 
                              value={editForm.creator || ''} 
                              onChange={(e) => setEditForm({ ...editForm, creator: e.target.value })}
                              className="w-full p-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[9px] uppercase font-mono text-muted mb-1">Category</label>
                            <select 
                              value={editForm.category || 'gaming'} 
                              onChange={(e) => setEditForm({ ...editForm, category: e.target.value as any })}
                              className="w-full p-2 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent cursor-pointer"
                            >
                              <option value="gaming">Gaming</option>
                              <option value="business">Business</option>
                              <option value="finance">Finance</option>
                              <option value="education">Education</option>
                              <option value="real_estate">Real Estate</option>
                              <option value="podcast">Podcast</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[9px] uppercase font-mono text-muted mb-1">Editing Hours</label>
                            <input 
                              type="text" 
                              value={editForm.editingTime || ''} 
                              onChange={(e) => setEditForm({ ...editForm, editingTime: e.target.value })}
                              className="w-full p-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] uppercase font-mono text-muted mb-1">Client View results</label>
                            <input 
                              type="text" 
                              value={editForm.results || ''} 
                              onChange={(e) => setEditForm({ ...editForm, results: e.target.value })}
                              className="w-full p-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] uppercase font-mono text-muted mb-1">Cover Image URL</label>
                            <input 
                              type="text" 
                              value={editForm.thumbnailUrl || ''} 
                              onChange={(e) => setEditForm({ ...editForm, thumbnailUrl: e.target.value })}
                              className="w-full p-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] uppercase font-mono text-muted mb-1">Video MP4 Preview Link</label>
                            <input 
                              type="text" 
                              value={editForm.videoUrl || ''} 
                              onChange={(e) => setEditForm({ ...editForm, videoUrl: e.target.value })}
                              className="w-full p-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent"
                            />
                          </div>
                        </div>
                        <button onClick={savePortfolio} className="w-full py-2.5 rounded-lg bg-accent text-white font-display font-bold text-xs uppercase cursor-pointer flex items-center justify-center gap-1">
                          <Save className="w-3.5 h-3.5" /> Lock In Portfolio Asset
                        </button>
                      </div>
                    )}

                    {/* TESTIMONIALS EDITOR */}
                    {activeTab === 'testimonials' && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] uppercase font-mono text-muted mb-1">Client Name</label>
                            <input 
                              type="text" 
                              value={editForm.name || ''} 
                              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                              className="w-full p-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] uppercase font-mono text-muted mb-1">Profession</label>
                            <input 
                              type="text" 
                              value={editForm.profession || ''} 
                              onChange={(e) => setEditForm({ ...editForm, profession: e.target.value })}
                              className="w-full p-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[9px] uppercase font-mono text-muted mb-1">Written Feedback Comment</label>
                          <textarea 
                            rows={3}
                            value={editForm.comment || ''} 
                            onChange={(e) => setEditForm({ ...editForm, comment: e.target.value })}
                            className="w-full p-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent resize-none"
                          />
                        </div>
                        <button onClick={saveTestimonial} className="w-full py-2.5 rounded-lg bg-accent text-white font-display font-bold text-xs uppercase cursor-pointer flex items-center justify-center gap-1">
                          <Save className="w-3.5 h-3.5" /> Save Client Review
                        </button>
                      </div>
                    )}

                    {/* CASE STUDIES EDITOR */}
                    {activeTab === 'case_studies' && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] uppercase font-mono text-muted mb-1">Client / Channel Name</label>
                            <input 
                              type="text" 
                              value={editForm.clientName || ''} 
                              onChange={(e) => setEditForm({ ...editForm, clientName: e.target.value })}
                              className="w-full p-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] uppercase font-mono text-muted mb-1">Core Category Spec</label>
                            <input 
                              type="text" 
                              value={editForm.category || ''} 
                              onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                              className="w-full p-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] uppercase font-mono text-muted mb-1">The Challenge</label>
                            <textarea 
                              rows={2}
                              value={editForm.challenge || ''} 
                              onChange={(e) => setEditForm({ ...editForm, challenge: e.target.value })}
                              className="w-full p-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent resize-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] uppercase font-mono text-muted mb-1">Our Solution</label>
                            <textarea 
                              rows={2}
                              value={editForm.solution || ''} 
                              onChange={(e) => setEditForm({ ...editForm, solution: e.target.value })}
                              className="w-full p-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent resize-none"
                            />
                          </div>
                        </div>
                        <button onClick={saveCaseStudy} className="w-full py-2.5 rounded-lg bg-accent text-white font-display font-bold text-xs uppercase cursor-pointer flex items-center justify-center gap-1">
                          <Save className="w-3.5 h-3.5" /> Archive Case Study
                        </button>
                      </div>
                    )}

                    {/* SEO BLOGS EDITOR */}
                    {activeTab === 'blogs' && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] uppercase font-mono text-muted mb-1">Article Title</label>
                            <input 
                              type="text" 
                              value={editForm.title || ''} 
                              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                              className="w-full p-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] uppercase font-mono text-muted mb-1">Category Topic</label>
                            <select 
                              value={editForm.category || 'Video Editing'} 
                              onChange={(e) => setEditForm({ ...editForm, category: e.target.value as any })}
                              className="w-full p-2 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent cursor-pointer"
                            >
                              <option value="Video Editing">Video Editing</option>
                              <option value="AI Editing">AI Editing</option>
                              <option value="CapCut">CapCut</option>
                              <option value="Premiere Pro">Premiere Pro</option>
                              <option value="DaVinci Resolve">DaVinci Resolve</option>
                              <option value="YouTube Growth">YouTube Growth</option>
                              <option value="Instagram Growth">Instagram Growth</option>
                              <option value="Content Strategy">Content Strategy</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[9px] uppercase font-mono text-muted mb-1">Summary snippet</label>
                          <input 
                            type="text" 
                            value={editForm.summary || ''} 
                            onChange={(e) => setEditForm({ ...editForm, summary: e.target.value })}
                            className="w-full p-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] uppercase font-mono text-muted mb-1">Full Content (Supports custom headings and formatting)</label>
                          <textarea 
                            rows={6}
                            value={editForm.content || ''} 
                            onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                            className="w-full p-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs font-mono focus:outline-none focus:border-accent resize-none"
                          />
                        </div>
                        <button onClick={saveBlog} className="w-full py-2.5 rounded-lg bg-accent text-white font-display font-bold text-xs uppercase cursor-pointer flex items-center justify-center gap-1">
                          <Save className="w-3.5 h-3.5" /> Publish SEO Article
                        </button>
                      </div>
                    )}

                    {/* FAQS EDITOR */}
                    {activeTab === 'faqs' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[9px] uppercase font-mono text-muted mb-1">Accordion Question</label>
                          <input 
                            type="text" 
                            value={editForm.question || ''} 
                            onChange={(e) => setEditForm({ ...editForm, question: e.target.value })}
                            className="w-full p-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] uppercase font-mono text-muted mb-1">Elaborate Answer</label>
                          <textarea 
                            rows={3}
                            value={editForm.answer || ''} 
                            onChange={(e) => setEditForm({ ...editForm, answer: e.target.value })}
                            className="w-full p-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent resize-none"
                          />
                        </div>
                        <button onClick={saveFaq} className="w-full py-2.5 rounded-lg bg-accent text-white font-display font-bold text-xs uppercase cursor-pointer flex items-center justify-center gap-1">
                          <Save className="w-3.5 h-3.5" /> Save FAQ Record
                        </button>
                      </div>
                    )}

                  </div>
                ) : (
                  
                  /* STANDARD LIST DISPLAY */
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-white/3 p-4 rounded-xl border border-white/5">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-accent" />
                        <span className="text-xs text-white font-mono uppercase font-black tracking-wider">
                          {activeTab.toUpperCase()} DATABASE SHEETS
                        </span>
                      </div>
                      {activeTab !== 'pricing' && (
                        <button
                          onClick={() => startEdit({ id: 'new' })}
                          className="px-3 py-1.5 rounded-lg bg-accent hover:bg-accent-dark text-white text-xs font-display font-bold uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer shadow"
                        >
                          <Plus className="w-3.5 h-3.5" /> Insert Row
                        </button>
                      )}
                    </div>

                    <div className="space-y-2">
                      {/* Services loop */}
                      {activeTab === 'services' && services.map(s => (
                        <div key={s.id} className="p-4 rounded-xl bg-white/2 border border-white/5 flex items-center justify-between text-xs hover:border-white/10 transition-colors">
                          <div>
                            <span className="font-display font-bold text-white block">{s.title}</span>
                            <span className="font-mono text-[10px] text-accent font-semibold">${s.startingPrice} Base Starting</span>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => startEdit(s)} className="p-2 bg-white/5 hover:bg-accent/15 rounded text-white hover:text-accent transition-colors cursor-pointer"><Edit2 className="w-3.5 h-3.5" /></button>
                            <button onClick={() => deleteService(s.id)} className="p-2 bg-white/5 hover:bg-red-500/15 rounded text-white hover:text-red-400 transition-colors cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      ))}

                      {/* Pricing loop */}
                      {activeTab === 'pricing' && pricing.map(p => (
                        <div key={p.id} className="p-4 rounded-xl bg-white/2 border border-white/5 flex items-center justify-between text-xs hover:border-white/10 transition-colors">
                          <div>
                            <span className="font-display font-bold text-white block">{p.name}</span>
                            <span className="font-mono text-[10px] text-accent font-semibold">${p.price} / {p.period}</span>
                          </div>
                          <button onClick={() => startEdit(p)} className="p-2 bg-white/5 hover:bg-accent/15 rounded text-white hover:text-accent transition-colors cursor-pointer"><Edit2 className="w-3.5 h-3.5" /></button>
                        </div>
                      ))}

                      {/* Portfolio loop */}
                      {activeTab === 'portfolio' && portfolio.map(p => (
                        <div key={p.id} className="p-4 rounded-xl bg-white/2 border border-white/5 flex items-center justify-between text-xs hover:border-white/10 transition-colors">
                          <div>
                            <span className="font-display font-bold text-white block">{p.title}</span>
                            <span className="font-mono text-[10px] text-muted">{p.creator} • {p.category.toUpperCase()}</span>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => startEdit(p)} className="p-2 bg-white/5 hover:bg-accent/15 rounded text-white hover:text-accent transition-colors cursor-pointer"><Edit2 className="w-3.5 h-3.5" /></button>
                            <button onClick={() => deletePortfolio(p.id)} className="p-2 bg-white/5 hover:bg-red-500/15 rounded text-white hover:text-red-400 transition-colors cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      ))}

                      {/* Case Studies loop */}
                      {activeTab === 'case_studies' && caseStudies.map(cs => (
                        <div key={cs.id} className="p-4 rounded-xl bg-white/2 border border-white/5 flex items-center justify-between text-xs hover:border-white/10 transition-colors">
                          <div>
                            <span className="font-display font-bold text-white block">{cs.clientName}</span>
                            <span className="font-mono text-[10px] text-muted">{cs.category}</span>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => startEdit(cs)} className="p-2 bg-white/5 hover:bg-accent/15 rounded text-white hover:text-accent transition-colors cursor-pointer"><Edit2 className="w-3.5 h-3.5" /></button>
                            <button onClick={() => deleteCaseStudy(cs.id)} className="p-2 bg-white/5 hover:bg-red-500/15 rounded text-white hover:text-red-400 transition-colors cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      ))}

                      {/* Testimonials loop */}
                      {activeTab === 'testimonials' && testimonials.map(t => (
                        <div key={t.id} className="p-4 rounded-xl bg-white/2 border border-white/5 flex items-center justify-between text-xs hover:border-white/10 transition-colors">
                          <div>
                            <span className="font-display font-bold text-white block">{t.name}</span>
                            <span className="font-mono text-[10px] text-muted">{t.profession}</span>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => startEdit(t)} className="p-2 bg-white/5 hover:bg-accent/15 rounded text-white hover:text-accent transition-colors cursor-pointer"><Edit2 className="w-3.5 h-3.5" /></button>
                            <button onClick={() => deleteTestimonial(t.id)} className="p-2 bg-white/5 hover:bg-red-500/15 rounded text-white hover:text-red-400 transition-colors cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      ))}

                      {/* Blogs loop */}
                      {activeTab === 'blogs' && blogs.map(b => (
                        <div key={b.id} className="p-4 rounded-xl bg-white/2 border border-white/5 flex items-center justify-between text-xs hover:border-white/10 transition-colors">
                          <div>
                            <span className="font-display font-bold text-white block">{b.title}</span>
                            <span className="font-mono text-[10px] text-muted">{b.publishedDate} • {b.category}</span>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => startEdit(b)} className="p-2 bg-white/5 hover:bg-accent/15 rounded text-white hover:text-accent transition-colors cursor-pointer"><Edit2 className="w-3.5 h-3.5" /></button>
                            <button onClick={() => deleteBlog(b.id)} className="p-2 bg-white/5 hover:bg-red-500/15 rounded text-white hover:text-red-400 transition-colors cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      ))}

                      {/* FAQs loop */}
                      {activeTab === 'faqs' && faqs.map(f => (
                        <div key={f.id} className="p-4 rounded-xl bg-white/2 border border-white/5 flex items-center justify-between text-xs hover:border-white/10 transition-colors">
                          <div className="max-w-[80%]">
                            <span className="font-display font-bold text-white block line-clamp-1">{f.question}</span>
                            <span className="font-mono text-[10px] text-muted line-clamp-1">{f.answer}</span>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => startEdit(f)} className="p-2 bg-white/5 hover:bg-accent/15 rounded text-white hover:text-accent transition-colors cursor-pointer"><Edit2 className="w-3.5 h-3.5" /></button>
                            <button onClick={() => deleteFaq(f.id)} className="p-2 bg-white/5 hover:bg-red-500/15 rounded text-white hover:text-red-400 transition-colors cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                )}

              </div>

            </div>

                {/* Bottom status bar */}
                <div className="p-4 border-t border-white/5 bg-[#030303] flex items-center justify-between text-[10px] font-mono text-muted">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-accent animate-pulse" /> Live storage pipeline connected. Overwrites active instantly.
                  </div>
                  <AnimatePresence>
                    {saveStatus && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="flex items-center gap-1 text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20"
                      >
                        <Check className="w-3.5 h-3.5" /> {saveStatus}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Passcode Configuration Modal */}
                {isPasscodeConfigOpen && (
                  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="w-full max-w-sm rounded-2xl bg-[#0f0f0f] border border-white/10 p-6 relative shadow-2xl">
                      <button
                        onClick={() => { setIsPasscodeConfigOpen(false); setPasscodeConfigError(null); }}
                        className="absolute top-4 right-4 text-bebebe hover:text-white cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/20 text-accent flex items-center justify-center mb-4">
                        <Key className="w-5 h-5 animate-pulse" />
                      </div>

                      <h4 className="font-display font-black text-lg text-white mb-2">Configure Console Access Key</h4>
                      <p className="text-[11px] text-bebebe leading-relaxed mb-4 font-sans">
                        Update the security passcode required to unlock the internal database sheet console in this browser session.
                      </p>

                      <form onSubmit={handleChangePasscode} className="space-y-4 font-sans">
                        <div>
                          <label className="block text-[9px] uppercase font-mono text-muted mb-1.5">New Administrative Key</label>
                          <input
                            type="password"
                            required
                            value={newPasscode}
                            onChange={(e) => setNewPasscode(e.target.value)}
                            placeholder="••••••••••••"
                            className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] uppercase font-mono text-muted mb-1.5">Confirm Key</label>
                          <input
                            type="password"
                            required
                            value={confirmNewPasscode}
                            onChange={(e) => setConfirmNewPasscode(e.target.value)}
                            placeholder="••••••••••••"
                            className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-accent"
                          />
                        </div>

                        {passcodeConfigError && (
                          <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-mono text-center">
                            ❌ {passcodeConfigError}
                          </div>
                        )}

                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-lg bg-accent hover:bg-accent-dark text-white font-display font-bold text-xs uppercase cursor-pointer transition-colors"
                        >
                          Update Access Passcode
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </>
            )}

            </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
