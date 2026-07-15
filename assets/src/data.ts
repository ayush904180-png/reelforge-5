/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, Project, Testimonial, ProcessStep, PricingPlan, FAQItem } from './types';

export const SERVICES: Service[] = [
  {
    id: 'video-editing',
    title: 'Video Editing',
    description: 'Professional cuts, seamless transitions, and immaculate pacing that bring your cinematic vision to life.',
    iconName: 'Video',
    details: ['4K Render Outputs', 'Multi-cam Syncing', 'Dynamic Pacing', 'Advanced Retime Effects']
  },
  {
    id: 'shorts-reels',
    title: 'Shorts & Reels Editing',
    description: 'High-retention, fast-paced edits optimized for YouTube Shorts, Instagram Reels, and TikTok virality.',
    iconName: 'Sparkles',
    details: ['Hook Optimizations', 'Dynamic Auto-Captions', 'Sound Effects (SFX)', 'Viral Formatting']
  },
  {
    id: 'color-grading',
    title: 'Color Grading',
    description: 'Cinema-quality color correction and color grading (LUTs) to give your footage a stunning Hollywood look.',
    iconName: 'Palette',
    details: ['Color Correction', 'Shot Matching', 'HDR Look Design', 'Skin Tone Optimization']
  },
  {
    id: 'sound-design',
    title: 'Sound Design',
    description: 'Crisp audio enhancement, noise reduction, Foley, custom sound effects, and professional audio mixing.',
    iconName: 'Music',
    details: ['Voice Enhancement', 'SFX & Ambient Foley', 'Audio Ducking', 'Stereo/5.1 Mastering']
  },
  {
    id: 'motion-graphics',
    title: 'Motion Graphics',
    description: 'Custom animated titles, smooth dynamic lower-thirds, modern overlay transitions, and infographics.',
    iconName: 'Layers',
    details: ['3D Lower Thirds', 'Kinetic Typography', 'Logo Animations', 'Explainer Elements']
  },
  {
    id: 'thumbnail-design',
    title: 'Thumbnail Design',
    description: 'High-CTR, high-contrast custom YouTube thumbnails styled to maximize click-through rates instantly.',
    iconName: 'Wand',
    details: ['Click-Through Optimization', 'High Contrast Text', 'Custom 3D Depth Cutouts', 'Color pop adjustments']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Scout X Dominance - Valorant Highlights',
    clientName: 'ScoutX Gaming',
    category: 'gaming',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder embed link
    duration: '4:20',
    views: '1.2M Views'
  },
  {
    id: 'proj-2',
    title: 'Clutch Master - Fortnite Seasonal Montage',
    clientName: 'ESL Esports',
    category: 'reels',
    thumbnailUrl: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '1:00',
    views: '840K Views'
  },
  {
    id: 'proj-3',
    title: 'Mr Beast\'s Secret Virality Strategy Analyzed',
    clientName: 'Creator Science',
    category: 'youtube',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '12:45',
    views: '3.4M Views'
  },
  {
    id: 'proj-4',
    title: 'Into the Wild - Patagonia Documentary',
    clientName: 'Patagonia Explorers',
    category: 'documentary',
    thumbnailUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '18:15',
    views: '450K Views'
  },
  {
    id: 'proj-5',
    title: 'Porsche 911 - Luxury Cinematic Launch',
    clientName: 'Porsche Dubai',
    category: 'commercial',
    thumbnailUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '1:30',
    views: '2.1M Views'
  },
  {
    id: 'proj-6',
    title: 'SaaS Platform Automated Workflows Promo',
    clientName: 'Flowstate App',
    category: 'corporate',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '2:15',
    views: '120K Views'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Sarah Johnson',
    role: 'YouTube Creator (2.5M Subscribers)',
    company: 'Sarah Tech',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    content: 'ReelForge took my raw A-roll and turned it into an absolute masterpiece. The editing is razor-sharp, the sound effects are pristine, and my audience retention immediately jumped by 35%!'
  },
  {
    id: 't-2',
    name: 'Marcus Brody',
    role: 'Creative Director',
    company: 'Apex Marketing Agency',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    content: 'Finding editors who understand premium brand storytelling is incredibly rare. ReelForge acts like our in-house premium post-production team. Flawless grading, lighting-fast delivery.'
  },
  {
    id: 't-3',
    name: 'Kenji Sato',
    role: 'Lead Esports Coordinator',
    company: 'Vanguard Gaming',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    content: 'Our Valorant and Warzone montages look like pure art now. The visual syncing to the audio waveforms is hypnotic, and their motion graphics are super slick. Worth every single penny.'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: 'Understand Your Vision',
    subtitle: 'Discovery & Creative Brief',
    description: 'We connect via call to discuss your narrative goals, visual references, brand guidelines, and review your raw footage requirements.',
    iconName: 'Search'
  },
  {
    id: 2,
    title: 'Share & Review Footage',
    subtitle: 'High-speed Media Sync',
    description: 'Upload raw assets safely to our high-speed cloud drive. We organize, tag, and synchronize audio/multi-cam assets immediately.',
    iconName: 'UploadCloud'
  },
  {
    id: 3,
    title: 'Creative Editing',
    subtitle: 'The Cinematic Assembly',
    description: 'Our top-tier editors piece together the narrative, build custom sound design, craft motion transitions, and apply color grading magic.',
    iconName: 'Video'
  },
  {
    id: 4,
    title: 'Refining Revisions',
    subtitle: 'Polishing & Framing',
    description: 'You review the draft via our precise frame-by-frame commenting platform. We implement revisions with swift 24-hour turnarounds.',
    iconName: 'Sliders'
  },
  {
    id: 5,
    title: 'Final Delivery',
    subtitle: 'Cinema-Ready Render',
    description: 'Receive your master file rendered in 4K ProRes or optimized web H.264 formats, complete with raw project files if requested.',
    iconName: 'CheckCircle'
  }
];

export const PRICING_PLANS_MONTHLY: PricingPlan[] = [
  {
    id: 'p-1',
    name: 'Starter Creator',
    price: '$899',
    period: 'month',
    description: 'Perfect for creators dropping 4-6 high-quality short/long form videos per month.',
    features: [
      '4 x Long-Form Videos (Up to 10 mins)',
      'Basic Transitions & Lower Thirds',
      'Standard Color Correction',
      'Professional Audio Mixing',
      '2 Rounds of Revisions per video',
      '4-Day Delivery Timeline'
    ],
    isPopular: false,
    ctaText: 'Get Started'
  },
  {
    id: 'p-2',
    name: 'Professional Studio',
    price: '$1,899',
    period: 'month',
    description: 'Our flagship subscription for high-growth channels and modern premium brands.',
    features: [
      '8 x Long-Form Videos (Up to 20 mins)',
      'Uncapped Shorts & Reels (Up to 8)',
      'Cinema-Grade Color Grading',
      'Advanced Custom Sound Design & Foley',
      'Custom 3D Titles & Motion Graphics',
      'Unlimited Revisions',
      'Priority 48-Hour Delivery',
      'Dedicated Discord Channel'
    ],
    isPopular: true,
    ctaText: 'Start Premium Studio'
  },
  {
    id: 'p-3',
    name: 'Custom Agency',
    price: 'Custom',
    period: 'tailored',
    description: 'Designed for production studios, marketing agencies, and high-volume corporate campaigns.',
    features: [
      'Uncapped Monthly Deliverables',
      'Custom Multi-Editor Setup',
      'Bespoke Visual Asset Library',
      'Raw Source File Delivery',
      'Vimeo Review Collaboration Integration',
      'Dedicated Account Producer',
      'Ultra-fast 24h Emergency Delivery',
      'SLA Contracts & Non-Disclosure'
    ],
    isPopular: false,
    ctaText: 'Book a Custom Consultation'
  }
];

export const PRICING_PLANS_ONETIME: PricingPlan[] = [
  {
    id: 'p-1-ot',
    name: 'Standard Package',
    price: '$49',
    period: 'video',
    description: 'Perfect single project launch edit with clean professional adjustments.',
    features: [
      'Up to 10 minutes finished video',
      'Basic Editing & Sound Mixing',
      'Essential Transitions',
      'Background Soundscape Audio',
      '2 Rounds of Revisions',
      '48-Hour Standard Delivery'
    ],
    isPopular: false,
    ctaText: 'Order Standard'
  },
  {
    id: 'p-2-ot',
    name: 'Premium Cinematic',
    price: '$99',
    period: 'video',
    description: 'Best-selling high-engagement edit featuring custom assets and high-end grade.',
    features: [
      'Up to 20 minutes finished video',
      'Advanced Professional Cuts',
      'Cinema-quality Color Grading',
      'Full SFX and Custom Sound design',
      'Custom CTR YouTube Thumbnail',
      'Unlimited Revision Rounds',
      'Priority 24-Hour Express Delivery'
    ],
    isPopular: true,
    ctaText: 'Order Premium'
  },
  {
    id: 'p-3-ot',
    name: 'Custom Enterprise',
    price: 'Custom',
    period: 'project',
    description: 'Tailored pricing for commercial production, documentaries, and campaigns.',
    features: [
      'Custom Requirements & Scripting',
      'Dedicated Cinematic Editor',
      'Advanced Motion Graphics Vibe',
      'Full Copyright Clearance Assistance',
      'ProRes Master File Handover',
      'Priority Support Line'
    ],
    isPopular: false,
    ctaText: 'Request Callback'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What professional editing software do you use?',
    answer: 'Our editing engineers work primarily in Adobe Premiere Pro, DaVinci Resolve Studio (for top-tier color grading), and Adobe After Effects (for complex motion design and typography animations).'
  },
  {
    id: 'faq-2',
    question: 'What is your standard turnaround / delivery time?',
    answer: 'For individual videos under our One-time packages, our Standard turnaround is 48 hours, while our Premium package includes priority 24-hour delivery. For custom enterprise and monthly subscribers, we deliver videos on a regular pre-scheduled calendar basis.'
  },
  {
    id: 'faq-3',
    question: 'How do you handle revisions?',
    answer: 'We use Frame.io, a collaborative frame-accurate review platform. You will receive a secure review link where you can click anywhere on the video player and leave timestamped feedback. We refine the edit based on these pins and upload revision drafts within hours.'
  },
  {
    id: 'faq-4',
    question: 'Can you work with raw footage from any device?',
    answer: 'Absolutely! We work with files from mobile smartphones, mirrorless cameras (Sony, Canon, Panasonic), cinematic platforms (RED, ARRI, Blackmagic RAW), and screen recorders (OBS, Riverside.fm) in logs, flat profiles, or standard gamma.'
  },
  {
    id: 'faq-5',
    question: 'What is your billing / pricing structure?',
    answer: 'We offer flexible models depending on your needs. For single video projects, we offer One-time flat-rate packages. For ongoing monthly production, we offer predictable Subscription plans with dedicated bandwidth. No hidden fees or surprise hourly invoices.'
  },
  {
    id: 'faq-6',
    question: 'Do you offer long-term editing support and contract plans?',
    answer: 'Yes! Many of our clients are long-term partners, including established creators and production houses. We offer custom monthly SLAs, dedicated editors, and discounted retainer rates for partnerships lasting 6 months or longer.'
  }
];
