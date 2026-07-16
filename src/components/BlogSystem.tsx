/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  Share2, 
  MessageSquare, 
  ChevronRight,
  Sparkles,
  Twitter,
  Linkedin,
  Copy,
  Check
} from 'lucide-react';
import { BlogPost } from '../types';
import { initialBlogs, getStoredData, saveStoredData } from '../data';

interface Comment {
  id: string;
  blogId: string;
  name: string;
  date: string;
  text: string;
}

export default function BlogSystem() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ name: '', text: '' });
  const [copiedLink, setCopiedLink] = useState(false);

  // Load blogs and comments
  useEffect(() => {
    const storedBlogs = getStoredData<BlogPost[]>('reelforge_blogs', initialBlogs);
    setBlogs(storedBlogs);
    
    const initialComments: Comment[] = [
      { id: 'c1', blogId: 'b1', name: 'Jake Pauler', date: '2026-07-11', text: 'This first-minute retention advice is literal gold. Adding pattern interrupts cut my viewer dropoff in half!' },
      { id: 'c2', blogId: 'b1', name: 'Mitch G.', date: '2026-07-13', text: 'Where can I download the Foley files mentioned here?' }
    ];
    const storedComments = getStoredData<Comment[]>('reelforge_blog_comments', initialComments);
    setComments(storedComments);
  }, []);

  const categories = [
    'All',
    'Video Editing',
    'AI Editing',
    'CapCut',
    'Premiere Pro',
    'DaVinci Resolve',
    'YouTube Growth',
    'Instagram Growth',
    'Content Strategy'
  ];

  // Filtering blogs
  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || b.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle adding comments
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBlog || !newComment.name || !newComment.text) return;

    const added: Comment = {
      id: `comm_${Date.now()}`,
      blogId: selectedBlog.id,
      name: newComment.name,
      date: new Date().toISOString().split('T')[0],
      text: newComment.text
    };

    const updated = [...comments, added];
    setComments(updated);
    saveStoredData('reelforge_blog_comments', updated);
    setNewComment({ name: '', text: '' });
  };

  const handleShareCopy = (blog: BlogPost) => {
    const shareUrl = `${window.location.origin}/blog/${blog.slug}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        
        {/* LIST VIEW */}
        {!selectedBlog ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-10"
          >
            {/* Search and Category filters panel */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/2 p-6 rounded-2xl border border-white/5">
              
              {/* Category tabs */}
              <div className="flex flex-wrap gap-1.5 order-2 md:order-1 justify-center md:justify-start">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-display font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                      activeCategory === cat
                        ? 'bg-accent border-accent text-white shadow-md'
                        : 'glass-frost-badge border-white/5 text-bebebe hover:text-white hover:border-accent/40'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72 order-1 md:order-2">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-white text-xs sm:text-sm focus:outline-none focus:border-accent"
                />
                <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

            </div>

            {/* Grid list display */}
            {filteredBlogs.length === 0 ? (
              <div className="text-center py-12 border border-white/5 rounded-2xl bg-white/2">
                <p className="text-bebebe text-sm">No articles matched your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((b) => (
                  <motion.article
                    layout
                    key={b.id}
                    onClick={() => setSelectedBlog(b)}
                    className="group rounded-2xl overflow-hidden glass-card border border-white/10 bg-gradient-to-b from-[#111] to-black cursor-pointer flex flex-col h-full"
                  >
                    
                    {/* Cover image banner */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={b.imageUrl}
                        alt={b.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-4 left-4 px-2.5 py-1 rounded bg-accent text-white font-mono text-[9px] uppercase font-black">
                        {b.category}
                      </span>
                    </div>

                    {/* Metadata summary */}
                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <div>
                        
                        <div className="flex items-center gap-3 text-muted text-[10px] font-mono mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {b.publishedDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {b.readTime}
                          </span>
                        </div>

                        <h4 className="font-display font-bold text-base text-white group-hover:text-accent transition-colors leading-tight mb-2">
                          {b.title}
                        </h4>

                        <p className="text-xs text-bebebe line-clamp-3 leading-relaxed">
                          {b.summary}
                        </p>

                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-mono text-accent font-bold uppercase mt-6 group-hover:gap-2 transition-all">
                        Read Story <ChevronRight className="w-3.5 h-3.5" />
                      </div>

                    </div>

                  </motion.article>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          
          /* DETAILED ARTICLE READER */
          <motion.article
            key="article"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            {/* Back to list button */}
            <button
              onClick={() => setSelectedBlog(null)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 text-xs text-bebebe hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog List
            </button>

            {/* Header section */}
            <div>
              <span className="inline-block px-2.5 py-1 rounded bg-accent text-white font-mono text-[10px] uppercase font-black mb-3">
                {selectedBlog.category}
              </span>
              <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight mb-4">
                {selectedBlog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 border-y border-white/5 py-4 text-xs font-mono text-muted">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-accent" /> {selectedBlog.publishedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-accent" /> {selectedBlog.readTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-accent" /> By {selectedBlog.author.name}
                </span>
              </div>
            </div>

            {/* Cover photo */}
            <div className="aspect-[21/9] rounded-2xl overflow-hidden border border-white/10">
              <img
                src={selectedBlog.imageUrl}
                alt={selectedBlog.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Rich Markdown style text body */}
            <div className="prose prose-invert max-w-none text-bebebe font-sans text-sm sm:text-base leading-relaxed space-y-6">
              {/* Splitting and parsing a simple representation of the content markdown */}
              {selectedBlog.content.split('\n\n').map((para, i) => {
                if (para.startsWith('# ')) {
                  return <h2 key={i} className="font-display font-black text-2xl text-white mt-8 mb-4">{para.replace('# ', '')}</h2>;
                }
                if (para.startsWith('## ')) {
                  return <h3 key={i} className="font-display font-bold text-xl text-white mt-6 mb-3">{para.replace('## ', '')}</h3>;
                }
                if (para.startsWith('- ')) {
                  return (
                    <ul key={i} className="list-disc pl-5 space-y-2 mb-4">
                      {para.split('\n').map((item, idx) => (
                        <li key={idx}>{item.replace('- ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={i} className="leading-relaxed">{para}</p>;
              })}
            </div>

            {/* Share panel & Social CTAs */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-white/2 rounded-xl border border-white/5">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-accent" />
                <span className="font-display font-bold text-xs text-white">Share this strategy blueprint:</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShareCopy(selectedBlog)}
                  className="p-2.5 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer relative"
                  title="Copy link"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedBlog.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 text-white transition-colors"
                >
                  <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                </a>
              </div>
            </div>

            {/* Author Profile Card */}
            <div className="p-6 bg-gradient-to-r from-white/3 to-transparent rounded-2xl border border-white/5 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <img
                src={selectedBlog.author.avatar}
                alt={selectedBlog.author.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-accent"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="text-[10px] font-mono text-accent uppercase tracking-widest block mb-0.5">{selectedBlog.author.role}</span>
                <h5 className="font-display font-bold text-base text-white">{selectedBlog.author.name}</h5>
                <p className="text-xs text-bebebe mt-1 leading-relaxed">
                  {selectedBlog.author.bio}
                </p>
              </div>
            </div>

            {/* Comments block */}
            <div className="border-t border-white/5 pt-8 space-y-6">
              <h4 className="font-display font-black text-xl text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-accent" /> Community Discussion ({comments.filter(c => c.blogId === selectedBlog.id).length})
              </h4>

              {/* Comment submission form */}
              <form onSubmit={handleCommentSubmit} className="p-5 bg-white/2 rounded-xl border border-white/5 space-y-3">
                <span className="text-[10px] text-muted uppercase tracking-wider font-mono block">Leave your thoughts</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={newComment.name}
                    onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-white text-xs sm:text-sm focus:outline-none focus:border-accent"
                  />
                </div>
                <textarea
                  required
                  rows={3}
                  placeholder="Leave an insightful question or strategic feedback..."
                  value={newComment.text}
                  onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-white text-xs sm:text-sm focus:outline-none focus:border-accent resize-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-accent hover:bg-accent-dark text-white font-display font-bold text-xs uppercase cursor-pointer"
                >
                  Submit Comment
                </button>
              </form>

              {/* Feed lists */}
              <div className="space-y-4">
                {comments
                  .filter((c) => c.blogId === selectedBlog.id)
                  .map((comm) => (
                    <div key={comm.id} className="p-5 rounded-xl bg-white/1 border border-white/5">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-display font-bold text-xs text-white">{comm.name}</span>
                        <span className="font-mono text-[9px] text-muted">{comm.date}</span>
                      </div>
                      <p className="text-xs text-bebebe font-sans leading-relaxed">
                        {comm.text}
                      </p>
                    </div>
                  ))}
              </div>

            </div>

            {/* Simulated SEO ld+json schema card */}
            <div className="p-4 bg-black rounded-lg border border-white/5 font-mono text-[10px] text-muted/60 relative overflow-hidden select-none">
              <span className="absolute top-2 right-2 text-[9px] px-1 bg-white/5 text-accent rounded uppercase font-bold">SEO SCHEMA ENABLED</span>
              <pre className="overflow-x-auto">
{`{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "${selectedBlog.title}",
  "datePublished": "${selectedBlog.publishedDate}",
  "author": { "@type": "Person", "name": "${selectedBlog.author.name}" },
  "publisher": { "@type": "Organization", "name": "ReelForge" }
}`}
              </pre>
            </div>

          </motion.article>
        )}

      </AnimatePresence>
    </div>
  );
}
