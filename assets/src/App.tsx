/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import ScrollProgressBar from './components/ScrollProgressBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Portfolio from './components/Portfolio';
import FeaturedVideos from './components/FeaturedVideos';
import Process from './components/Process';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-bg-deep text-white font-sans overflow-x-hidden selection:bg-accent selection:text-white">
      {/* Decorative background glass glow orbs from the Frosted Glass Theme */}
      <div className="absolute top-[-5%] left-[-10%] w-[60vw] h-[60vw] max-w-[800px] rounded-full opacity-15 blur-[140px] pointer-events-none z-0" style={{ background: 'radial-gradient(circle, #FF7A00 0%, #FF4D00 100%)' }} />
      <div className="absolute top-[35%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] rounded-full opacity-10 blur-[120px] pointer-events-none z-0" style={{ background: 'radial-gradient(circle, #FF9A3C 0%, transparent 100%)' }} />
      <div className="absolute bottom-[15%] left-[-5%] w-[45vw] h-[45vw] max-w-[550px] rounded-full opacity-12 blur-[130px] pointer-events-none z-0" style={{ background: 'radial-gradient(circle, #FF4D00 0%, transparent 100%)' }} />

      {/* Scroll indicator bar at the very top */}
      <ScrollProgressBar />

      {/* Floating Header */}
      <Navbar />

      {/* Main Sections */}
      <main>
        {/* Hero spotlight workspace interface preview */}
        <Hero />

        {/* Customized card grids */}
        <Services />

        {/* Core philosophy & counting stats metrics */}
        <About />

        {/* Filterable projects and video lightbox overlay */}
        <Portfolio />

        {/* Integrated direct playback with switcher playlists */}
        <FeaturedVideos />

        {/* Five chronological step milestones */}
        <Process />

        {/* Tier packages standard/premium/agency switcher */}
        <Pricing />

        {/* Collapsible item help logs */}
        <FAQ />

        {/* Creative briefs and direct calendars */}
        <Contact />
      </main>

      {/* Minimal dark legal columns and newsletter subscription */}
      <Footer />
    </div>
  );
}
