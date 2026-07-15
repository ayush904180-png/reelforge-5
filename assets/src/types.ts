/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  details?: string[];
}

export interface Project {
  id: string;
  title: string;
  clientName: string;
  category: 'youtube' | 'reels' | 'gaming' | 'documentary' | 'commercial' | 'corporate';
  thumbnailUrl: string;
  videoUrl: string; // YouTube or Vimeo embed url / watch url
  duration: string;
  views?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatarUrl: string;
  rating: number;
  content: string;
}

export interface ProcessStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular: boolean;
  ctaText: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
