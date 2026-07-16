/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, PortfolioItem, CaseStudy, Testimonial, BlogPost, FAQItem, PricingPlan } from './types';

// ==========================================
// 1. SERVICES DATA
// ==========================================
export const initialServices: Service[] = [
  {
    id: 's1',
    title: 'YouTube Long Form Editing',
    category: 'YouTube',
    description: 'Hook-driven, high-retention structural editing for essays, vlogs, documentary-style videos, and tutorials.',
    startingPrice: 399,
    deliveryTime: '48-72 Hours',
    features: ['Retention Audit & Hooks', 'Sound Design & Mastering', 'Color Correction', '2 Revision Rounds'],
    iconName: 'Youtube'
  },
  {
    id: 's2',
    title: 'Instagram Reels & TikToks',
    category: 'Short Form',
    description: 'Sleek, high-octane vertical edits with kinetic typography, pop-ins, and trending audio triggers.',
    startingPrice: 99,
    deliveryTime: '24-48 Hours',
    features: ['Subtitles & Captions', 'Zoom effects & Emojis', 'Licensed SFX', 'Viral Hook Design'],
    iconName: 'Tv'
  },
  {
    id: 's3',
    title: 'Show-Stopping Color Grading',
    category: 'Production',
    description: 'Professional cinema-grade primary balancing, color matching across multiple cams, and personalized custom LUTs.',
    startingPrice: 249,
    deliveryTime: '48 Hours',
    features: ['Rec.709 Space Mapping', 'HDR Mastering', 'Skin-Tone Optimization', 'Match Cut Science'],
    iconName: 'Sliders'
  },
  {
    id: 's4',
    title: 'Immersive Sound Design',
    category: 'Production',
    description: 'Custom acoustic layering, multichannel sound effects, voiceovers leveling, and licensed backing soundtracks.',
    startingPrice: 199,
    deliveryTime: '24-48 Hours',
    features: ['Advanced Vocal EQ', 'Backing Track Ducking', 'Cinematic Foley FX', 'Noise Reduction'],
    iconName: 'Volume2'
  },
  {
    id: 's5',
    title: 'High-Impact Thumbnails',
    category: 'YouTube',
    description: 'Psychologically engineered title card imagery with 3D elements, bold styling, and maximum click-through rates.',
    startingPrice: 69,
    deliveryTime: '24 Hours',
    features: ['CTR Optimization', 'Source PSD Included', 'A/B Test Ready', 'Premium Color Mapping'],
    iconName: 'Sparkles'
  },
  {
    id: 's6',
    title: 'Sleek Motion Graphics',
    category: 'Production',
    description: 'Custom animated lower-thirds, clean logo intros, 2D infographic breakdowns, and high-quality title transitions.',
    startingPrice: 299,
    deliveryTime: '3-5 Days',
    features: ['Lottie / JSON Support', 'Vector Rendering', 'Social Media Handles', 'Transparent Channel Output'],
    iconName: 'Layers'
  },
  {
    id: 's7',
    title: 'Podcast Full Suite',
    category: 'Podcast',
    description: 'Multi-camera synchronous alignment, vocal level mastering, and clean commercial-ready exports.',
    startingPrice: 499,
    deliveryTime: '3-5 Days',
    features: ['Vocal Mastering', 'Filler Word Cleaning', 'Video Clip Exports', 'Full RSS-ready Audio'],
    iconName: 'Radio'
  },
  {
    id: 's8',
    title: 'YouTube Channel Automation',
    category: 'YouTube',
    description: 'Complete hands-off publishing workflows: script integration, premium voiceover, editing, and scheduling.',
    startingPrice: 899,
    deliveryTime: '5-7 Days',
    features: ['Niche Research', 'Custom Video Assets', 'Pro Voice Artist Voice', 'Thumbnail + Title Cards'],
    iconName: 'Zap'
  },
  {
    id: 's9',
    title: 'Personal Brand Retainer',
    category: 'Short Form',
    description: 'Rebrand your social footprint. We repurpose your podcasts, lives, or presentations into 15 vertical hooks.',
    startingPrice: 1199,
    deliveryTime: 'Monthly Retainer',
    features: ['15 Custom Verticals', 'Channel Management', 'Content Strategy Audit', 'Priority SLA Chat'],
    iconName: 'Star'
  },
  {
    id: 's10',
    title: 'Commercial Ads',
    category: 'Production',
    description: 'Convert viewers into paying clients. High-fidelity product sizzles, promo trailers, and social proof clips.',
    startingPrice: 699,
    deliveryTime: '5-7 Days',
    features: ['Conversion Strategy', 'UGC Pacing Structure', 'Custom Sound SFX', 'Multi-Ratio Delivery'],
    iconName: 'Film'
  }
];

// ==========================================
// 2. PORTFOLIO DATA
// ==========================================
export const initialPortfolio: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'Apex Legends Ultimate Solo Squads',
    creator: 'GamerGlow (2.1M Subs)',
    category: 'gaming',
    duration: '12:45',
    softwareUsed: ['Premiere Pro', 'After Effects', 'Audition'],
    editingTime: '16 Hours',
    results: '1.2M Views (+45% Retention)',
    clientFeedback: {
      name: 'Tyler Johnson',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      comment: 'ReelForge tripled my average watch time. The kinetic pacing is insane.'
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: 'p2',
    title: 'The Hidden Psychology of Luxury Hotels',
    creator: 'Design Decoded',
    category: 'business',
    duration: '18:12',
    softwareUsed: ['DaVinci Resolve', 'After Effects'],
    editingTime: '24 Hours',
    results: '890K Views (Ranked #1 on Category)',
    clientFeedback: {
      name: 'Sarah Kim',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      comment: 'The color science is absolute Hollywood standards. Our community was in awe.'
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4'
  },
  {
    id: 'p3',
    title: 'How Central Banks Secretly Control Interest',
    creator: 'Capitalize Finance',
    category: 'finance',
    duration: '15:30',
    softwareUsed: ['After Effects', 'Premiere Pro'],
    editingTime: '32 Hours',
    results: '2.4M Views (Viral Spike)',
    clientFeedback: {
      name: 'Marcus Brody',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      comment: 'ReelForge took a dry economic topic and made it as exciting as a thriller movie.'
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: 'p4',
    title: 'Unlocking the Genius of Quantum Cryptography',
    creator: 'OmniScience',
    category: 'education',
    duration: '22:45',
    softwareUsed: ['DaVinci Resolve', 'Cinema 4D', 'After Effects'],
    editingTime: '48 Hours',
    results: '1.5M Views (High Audience Engagement)',
    clientFeedback: {
      name: 'Dr. Linda Ross',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      comment: 'Stunning 3D infographic animations that explained highly complex topics flawlessly.'
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4'
  },
  {
    id: 'p5',
    title: 'Modernist Beachfront Villa: Malibu Showcase',
    creator: 'Apex Real Estate',
    category: 'real_estate',
    duration: '03:15',
    softwareUsed: ['DaVinci Resolve', 'Premiere Pro'],
    editingTime: '8 Hours',
    results: '$12M Listing Sold in 14 Days',
    clientFeedback: {
      name: 'Christian Vander',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      comment: 'Elite real estate cinematic video editing that converted directly to the buyer.'
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: 'p6',
    title: 'The Future of AI Coding Agents',
    creator: 'The Tech Nexus Podcast',
    category: 'podcast',
    duration: '58:40',
    softwareUsed: ['Premiere Pro', 'Audition', 'After Effects'],
    editingTime: '12 Hours',
    results: '450K Views & 40 TikTok Clips Exported',
    clientFeedback: {
      name: 'Amir Patel',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
      comment: 'They edit the full hour then generate viral vertical highlights with identical polish.'
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4'
  }
];

// ==========================================
// 3. CASE STUDIES DATA
// ==========================================
export const initialCaseStudies: CaseStudy[] = [
  {
    id: 'cs1',
    clientName: 'The Financial Mind (800K Subs)',
    category: 'Finance Agency Client',
    challenge: 'Struggling with low first-minute retention (dropping to 35% in first 20 seconds). Views plateaued around 40K.',
    solution: 'Re-engineered the content hook structure. Replaced static intros with sound-designed cinematic dynamic graphic explainers and an intense pacing framework.',
    results: {
      views: '5.4M Total Views',
      engagement: '+350% Engagement Rate',
      subscribers: '+124,000 Subscribers',
      chartData: [
        { label: 'Week 1', views: 40000 },
        { label: 'Week 2', views: 95000 },
        { label: 'Week 3', views: 250000 },
        { label: 'Week 4', views: 750000 },
        { label: 'Week 5', views: 1800000 },
        { label: 'Week 6', views: 5400000 }
      ]
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cs2',
    clientName: 'ZenSpace Design Collective',
    category: 'Corporate Lifestyle Campaign',
    challenge: 'Promotional video ads was generating low conversions (less than 0.8% CTR) and felt bland and flat.',
    solution: 'Engineered a highly targeted storytelling arc, implemented custom high-contrast warm cinematic LUT grading, and built a detailed layered ASMR soundscape.',
    results: {
      views: '1.8M Video Impressions',
      engagement: '+410% CTR Spike',
      subscribers: '$45K Generated Sales',
      chartData: [
        { label: 'Campaign Start', views: 20000 },
        { label: 'Launch Day', views: 120000 },
        { label: 'Optimization', views: 480000 },
        { label: 'Scaling', views: 1100000 },
        { label: 'Final Push', views: 1800000 }
      ]
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80'
  }
];

// ==========================================
// 4. TESTIMONIALS DATA
// ==========================================
export const initialTestimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Graham Stephan Fanpage',
    country: 'United States',
    profession: 'Finance Content Creator',
    rating: 5,
    comment: 'The editing is extremely dynamic. The sound effects feel deep and premium, and our retention graphs on YouTube literally shot up. Booking a retainer slots with ReelForge was the best investment we made this year.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    isVideo: true,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: 't2',
    name: 'Linus B.',
    country: 'Canada',
    profession: 'Creative Lead, TechMedia',
    rating: 5,
    comment: 'I am so impressed by their speed. They delivered our draft within 36 hours. The color grading on S-Log3 files matches our reference frames perfectly. Flawless communication through Frame.io!',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    isVideo: false
  },
  {
    id: 't3',
    name: 'Sophia Laurent',
    country: 'France',
    profession: 'Luxury Real Estate Broker',
    rating: 5,
    comment: 'High-end properties demand cinematic elegance. ReelForge nailed the tempo, sound spacing, and lighting corrections. They have handled 5 listings for us, all sold over asking price!',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    isVideo: true,
    videoUrl: 'https://www.w3schools.com/html/movie.mp4'
  },
  {
    id: 't4',
    name: 'Devon Carter',
    country: 'United Kingdom',
    profession: 'Self-Improvement Coach',
    rating: 5,
    comment: 'They took my podcast rushes, edited the entire hour-long video, and delivered 10 incredible TikTok/Reels with trending zoom structures and caption cards. My IG page grew by 50K followers in a month.',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    isVideo: false
  }
];

// ==========================================
// 5. BLOG POSTS DATA
// ==========================================
export const initialBlogs: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Viral Pacing Secret: How We Keep Millions Glued to YouTube vids',
    slug: 'viral-pacing-secret-youtube-retention',
    category: 'YouTube Growth',
    summary: 'Analyze the psychological timing pattern behind 10-second hooks, patterns interrupt, and sonic triggers that maximize video watch times.',
    content: `
# The Viral Pacing Secret: How We Keep Millions Glued to YouTube

Have you ever wondered why you can watch a 20-minute video essay on a dry topic, while you click away from a standard tutorial in 15 seconds? The secret is not just the topic; it's **pacing architecture**.

In modern digital content, the first 10 seconds of your video dictates the entire algorithm curve. If your retention drops below 60% in the first minute, the YouTube recommender system halts promotion.

## 1. The Power of "Pattern Interrupts"

A pattern interrupt is any change in the visual or sonic field that forces the human brain to re-focus. As editors, we apply these rules:
- **Visual shift** every 3.2 seconds (either a zoom step, a text callout, or a crop alignment).
- **Sound Effect Cue** every 6 seconds (a whoosh, riser, mechanical click, or ambient drop).
- **Extreme Contrast Contrast**: Transitioning from quiet narrative space to heavy high-octane sequences.

## 2. Multi-Layer Sound Design

Sound design is 50% of the viewing experience.
- **Foley integration**: If a creator mentions typing, we insert low mechanical keys.
- **Vocal compression**: Making sure the voiceover feels intimate, clean, and elevated.
- **Rhythmic backing**: Speeding or slowing background scores based on narrative stress.

Implement these pacing tools on your next edit and watch your retention graphs soar!
`,
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    publishedDate: '2026-07-10',
    readTime: '5 min read',
    author: {
      name: 'Ryan Mercer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      role: 'Head of Storytelling',
      bio: 'Former documentary director turned viral creator strategist. Ryan has mapped retention layouts generating 100M+ views.'
    },
    featured: true
  },
  {
    id: 'b2',
    title: 'Color Grading Masterclass: Grading Rec.709 for High-Contrast Screens',
    slug: 'color-grading-masterclass-rec709',
    category: 'Premiere Pro',
    summary: 'A step-by-step framework to color correct and grade S-Log3, D-Log, and ProRes footage for OLED and bright mobile screens.',
    content: `
# Color Grading Masterclass: Grading for Mobile Screens

Most of your viewers are watching your content on smartphones with bright HDR OLED screens. Grading your video on a dim editing monitor without targeting mobile outputs will make your end-result look washed out and flat.

## Step 1: Mapping the Camera Gamma Space

When working with S-Log3 (Sony) or D-Log (DJI), the baseline import is extremely flat. Avoid applying preset LUTs immediately.
1. Perform basic primary adjustments (luminance levels, mapping blacks to 0 IRE and whites below 95 IRE).
2. Balance color channels to ensure skin-tones lie directly on the vectorscope skin-tone line.

## Step 2: High-Contrast Visual Separation

Mobile viewers scroll through brightly lit environments. To make your imagery pop:
- Apply a custom S-Curve to increase mid-tone contrasts.
- Isolate the subject and increase tracking exposure by +0.15 stops to draw attention.

Mastering these grading details separates amateur uploads from premium agency-level cinematic video releases.
`,
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    publishedDate: '2026-07-12',
    readTime: '4 min read',
    author: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      role: 'Director of Color Science',
      bio: 'Elena worked at a leading Los Angeles grading house before designing the ReelForge cinematic color science team.'
    },
    featured: false
  },
  {
    id: 'b3',
    title: 'Short-Form Domination: CapCut vs DaVinci Resolve in 2026',
    slug: 'short-form-capcut-vs-davinci',
    category: 'Content Strategy',
    summary: 'Discover the ultimate tools for vertical clips and how to automate captions without looking cheap or uninspired.',
    content: `
# Short-Form Domination: CapCut vs DaVinci Resolve

The vertical content landscape has shifted. Viewers are tired of cookie-cutter, neon-green captions bouncing uncontrollably in the middle of the screen. They want authentic, polished, highly stylized typography.

## CapCut: Speed and Trend-matching
CapCut remains an exceptional tool for ultra-fast trend adaptation. Its strengths lie in:
- Fast auto-captioning engines.
- Built-in trending stickers and template effects.
- Direct-to-TikTok publishing pipelines.

## DaVinci Resolve: Cinematic Mastery
If you are building an elite personal brand or agency channel, Resolve is unmatched:
- Infinite keyframe controls for typography.
- Professional multi-band audio leveling.
- Studio-grade node-based visual layouts.

## The ReelForge Strategy
We utilize Resolve for its unmatched precision, and combine it with vector motion designs to deliver unique, high-retention vertical clips.
`,
    imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
    publishedDate: '2026-07-14',
    readTime: '6 min read',
    author: {
      name: 'Ryan Mercer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      role: 'Head of Storytelling',
      bio: 'Former documentary director turned viral creator strategist.'
    },
    featured: false
  }
];

// ==========================================
// 6. FAQs DATA (15+ FAQs)
// ==========================================
export const initialFAQs: FAQItem[] = [
  {
    id: 'faq1',
    question: 'What is your standard turnaround time for a video draft?',
    answer: 'Our standard delivery is 48-72 hours for long-form YouTube edits and 24-48 hours for short-form clips. Custom timelines apply to high-end commercial campaigns.'
  },
  {
    id: 'faq2',
    question: 'How do we collaborate and leave revision requests?',
    answer: 'We use Frame.io. You will receive a private review link where you can leave timestamped, drawing-annotated feedback directly on our video frame.'
  },
  {
    id: 'faq3',
    question: 'Are revisions included in the pricing packages?',
    answer: 'Yes! Our Growth tier includes 2 robust revision rounds, and our Elite Retainer includes unlimited revisions so your final edit is exactly what you envisioned.'
  },
  {
    id: 'faq4',
    question: 'Do you provide fully licensed backing music and sound effects?',
    answer: 'Absolutely. We license all soundtrack tracks through platforms like Musicbed, Artlist, and Epidemic Sound, safe for YouTube, corporate broadcasts, and ads.'
  },
  {
    id: 'faq5',
    question: 'What raw video formats and cameras do you support?',
    answer: 'We support all professional files, including RED RAW, ARRI ProRes, Blackmagic RAW, S-Log3 (Sony), D-Log (DJI), Canon C-Log, and high-quality smartphone footage.'
  },
  {
    id: 'faq6',
    question: 'How do I upload massive raw media footage files to ReelForge?',
    answer: 'Upon onboarding, we create a secure, high-speed shared Google Drive or Dropbox folder for your project, allowing you to drag-and-drop raw clips directly.'
  },
  {
    id: 'faq7',
    question: 'Who will edit my videos? Can I get a dedicated editor?',
    answer: 'Yes! Under our Elite Retainer and Studio plans, you are paired with a dedicated editor who matches your brand aesthetic and a post-production coordinator.'
  },
  {
    id: 'faq8',
    question: 'Can you edit vertical shorts out of my long horizontal podcasts?',
    answer: 'Yes, this is one of our most popular workflows. We scan your raw podcast, extract the absolute highest-impact hooks, color grade, and add modern kinetic typography.'
  },
  {
    id: 'faq9',
    question: 'Do you handle custom intro and outro motion graphics?',
    answer: 'Yes, we design sleek vector logo intros, animated subscriber triggers, follow overlays, and clean custom title lower-thirds.'
  },
  {
    id: 'faq10',
    question: 'What if I want a completely custom package?',
    answer: 'We offer bespoke plans for clients with unique upload schedules, dual-channel priorities, or cinematic film needs. Simply book a free call to get started.'
  },
  {
    id: 'faq11',
    question: 'Do you offer translation and multilingual subtitling services?',
    answer: 'Yes, we can generate highly accurate captions in over 15 languages, pre-optimized for local country algorithms and global reach.'
  },
  {
    id: 'faq12',
    question: 'Will editing styles remain consistent over multiple videos?',
    answer: 'Always. We compile a dedicated Brand Style Guide for your channel, detailing your exact choice of fonts, color schemes, audio volume, and pacing triggers.'
  },
  {
    id: 'faq13',
    question: 'What are the payment terms and refund policies?',
    answer: 'Our retianers are processed monthly with no lock-in contracts. You can cancel, upgrade, or downgrade at any time. We also offer a 14-day refund policy.'
  },
  {
    id: 'faq14',
    question: 'Do you edit gaming and livestream highlight packages?',
    answer: 'Yes, we edit high-energy stream highlights, gaming letplays, reaction compilations, and esports trailers with advanced zoom and sound layouts.'
  },
  {
    id: 'faq15',
    question: 'Is my raw footage and unreleased content kept strictly confidential?',
    answer: '100%. We sign standard NDAs with all our corporate clients, filmmakers, and creators, ensuring your unreleased clips and strategy remain completely safe.'
  }
];

// ==========================================
// 7. PRICING PLANS DATA
// ==========================================
export const initialPricingPlans: PricingPlan[] = [
  {
    id: 'p_growth',
    name: 'Growth Tier',
    price: 499,
    period: 'month',
    description: 'Perfect for growing creators looking to establish consistent pacing and high-retention uploads.',
    features: [
      'Up to 4 Long-form edits per month',
      'Pacing hooks optimization',
      'Sleek Rec. 709 Color Correction',
      'Premium Licensed Audio & Foley',
      '2 Frame.io Revision Rounds',
      '72-Hour Delivery Turnaround'
    ]
  },
  {
    id: 'p_elite',
    name: 'Elite Retainer',
    price: 1499,
    period: 'month',
    badge: 'Most Popular',
    description: 'Our flagship plan designed for heavy publishers, podcasts, and premium corporate networks.',
    features: [
      'Unlimited Vertical Shorts OR 4 Long-forms',
      'Dedicated Professional Editor & Lead',
      'Cinematic Hollywood-Grade Color Grading',
      'Complex tracking 3D overlays & animations',
      'Unlimited Revisions via Frame.io',
      'Priority 48-Hour SLA Delivery',
      'Brand Style Guide compilation'
    ]
  },
  {
    id: 'p_studio',
    name: 'Studio Premium',
    price: 2999,
    period: 'starting',
    description: 'Bespoke custom solutions for films, documentary sequences, national ad campaigns, and cinema production.',
    features: [
      'Multi-camera RED/ARRI alignment support',
      'HDR Mastering & Atmos sound science',
      'Bespoke visual graphics & 3D rendering',
      'Infinite revision pipeline priority',
      'Direct call sync with production lead',
      'Raw project file package delivery'
    ]
  }
];

// ==========================================
// LOCAL STORAGE MANAGEMENT UTILITIES
// ==========================================
export const getStoredData = <T>(key: string, initialData: T): T => {
  if (typeof window === 'undefined') return initialData;
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(initialData));
    return initialData;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return initialData;
  }
};

export const saveStoredData = <T>(key: string, data: T): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
};
