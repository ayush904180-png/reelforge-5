/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  startingPrice: number;
  deliveryTime: string;
  features: string[];
  iconName: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  creator: string;
  category: 'gaming' | 'business' | 'finance' | 'education' | 'real_estate' | 'podcast' | 'youtube' | 'instagram';
  duration: string;
  softwareUsed: string[];
  editingTime: string;
  results: string;
  clientFeedback: {
    name: string;
    avatar: string;
    comment: string;
  };
  thumbnailUrl: string;
  videoUrl?: string; // Simulated video preview URL (using an embed or placeholder video)
}

export interface CaseStudy {
  id: string;
  clientName: string;
  category: string;
  challenge: string;
  solution: string;
  results: {
    views: string;
    engagement: string;
    subscribers: string;
    chartData: { label: string; views: number }[];
  };
  thumbnailUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  profession: string;
  rating: number;
  comment: string;
  avatarUrl: string;
  isVideo?: boolean;
  videoUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'Video Editing' | 'AI Editing' | 'CapCut' | 'Premiere Pro' | 'DaVinci Resolve' | 'YouTube Growth' | 'Instagram Growth' | 'Content Strategy';
  summary: string;
  content: string; // Markdown formatted string
  imageUrl: string;
  publishedDate: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    bio: string;
  };
  featured?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  badge?: string;
  description: string;
  features: string[];
}
