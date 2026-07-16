import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Send, Copy, Check, RefreshCw, Film, Volume2, HelpCircle, 
  Layers, Sliders, Play, Trash2, BookmarkCheck, Calendar, Zap, Lightbulb 
} from 'lucide-react';

interface SavedAiAsset {
  id: string;
  type: string;
  title: string;
  content: string;
  timestamp: string;
}

export default function ReelGptPage() {
  const [activeModule, setActiveModule] = useState<'hook' | 'caption' | 'prompt' | 'script'>('hook');
  const [inputs, setInputs] = useState({
    hookNiche: 'finance',
    hookTone: 'aggressive',
    captionTopic: '',
    captionTone: 'hype',
    promptVisual: '',
    promptVibe: 'cinematic',
    scriptTopic: '',
    scriptFormat: 'short'
  });

  const [aiOutput, setAiOutput] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [savedAssets, setSavedAssets] = useState<SavedAiAsset[]>([]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const saveToLibrary = (title: string, content: string) => {
    const newAsset: SavedAiAsset = {
      id: Math.random().toString(),
      type: activeModule,
      title,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setSavedAssets([newAsset, ...savedAssets]);
  };

  const deleteAsset = (id: string) => {
    setSavedAssets(savedAssets.filter(a => a.id !== id));
  };

  const runAiEngine = () => {
    setIsGenerating(true);
    setAiOutput('');

    setTimeout(() => {
      setIsGenerating(false);
      let outputText = '';

      if (activeModule === 'hook') {
        const tonePrefix = inputs.hookTone === 'aggressive' ? '🔥 WARNING: ' : inputs.hookTone === 'curious' ? '🤔 Wait, ' : '💡 Fact: ';
        switch (inputs.hookNiche) {
          case 'finance':
            outputText = `${tonePrefix}Most creators lose 90% of their money on this exact editing trap.\n\nHere is the exact formula we use at ReelForge to balance client budgets while scaling organic views. No gatekeeping, just pure color & sound science. Let\'s unpack why pacing is everything.`;
            break;
          case 'gaming':
            outputText = `${tonePrefix}This is exactly why your high-quality streams get 0 viewer retention.\n\nIt is not the gameplay—it is your track layers! In this outline, I am demonstrating how dynamic pattern interrupts every 3.5 seconds completely override the scroll finger.`;
            break;
          case 'business':
            outputText = `${tonePrefix}99% of digital agencies are lying to you about video production pipelines.\n\nHere is how we automate Rec.709 color grading and multi-channel sound mixing to deliver broadcast masters in 48 hours without burning out.`;
            break;
          default:
            outputText = `${tonePrefix}You are completely ignoring the core psychological hook curve.\n\nIn this video, we are analyzing the precise mathematical formulas behind retention vectors, color science, and audio pacing.`;
        }
      } 
      else if (activeModule === 'caption') {
        const topicStr = inputs.captionTopic || 'Scaling Creator Brands';
        const toneStr = inputs.captionTone === 'hype' ? '🔥 LFG! ' : inputs.captionTone === 'professional' ? '💼 Executive Summary: ' : '🧠 Deep Dive: ';
        outputText = `${toneStr}Here is the ultimate blueprint to master "${topicStr}" without drowning in post-production hell.\n\n⚡ KEY RETENTION METRICS:\n1️⃣ The 3-second hook is your lock\n2️⃣ Pattern interrupts maintain velocity\n3️⃣ Multichannel Foley sound science builds immerse atmospheres\n\n💬 What editing traps are stalling your channel growth? Let me know below!\n\n#videoediting #contentmarketing #reelforge #creatoreconomy`;
      } 
      else if (activeModule === 'prompt') {
        const visualStr = inputs.promptVisual || 'cinematic real estate tracking shot';
        outputText = `Prompt: a masterfully crafted, high-dynamic-range ${visualStr}, captured in ultra-sharp ${inputs.promptVibe} S-Log3 grading. Ambient neon relighting, dramatic dark shadows, smoke effects, and sharp volumetric lens flares. Photorealistic, 8k resolution, cinematic tracking pace, cinematic aspect ratios --ar 16:9`;
      } 
      else if (activeModule === 'script') {
        const topicStr = inputs.scriptTopic || 'Why Editing Matters';
        if (inputs.scriptFormat === 'short') {
          outputText = `[0:00 - 0:03] HOOK (Visual: Rapid pattern interrupt zoom): "This single editing mistake is costing you thousands of potential followers..."\n\n[0:03 - 0:15] BODY (Visual: Toggle on-screen graphics stack): "It is not your topic. It is your visual density. When you leave vocals flat and color uncalibrated, scroll metrics collapse."\n\n[0:15 - 0:25] VALUE (Visual: Animated growth chart): "By grading in S-Log3 and mixing in 3D Foley sound effects, you override attention span locks."\n\n[0:25 - 0:30] CALL-TO-ACTION (Visual: Overlay ReelForge branding): "Ready to scale? Book a professional channel audit at the link in our bio."`;
        } else {
          outputText = `[0:00 - 0:15] INTRODUCTION:\n- Visual: Deep cinematic tracking shot of empty corporate boardrooms.\n- Audio: Low, ambient synth pad building tension.\n- Script: "In the creator economy, the currency isn't views. It's attention velocity..."\n\n[0:15 - 1:00] THE PROBLEM (The Flatness Trap):\n- Visual: Multi-cam split showing raw LOG camera profiles versus uncalibrated timelines.\n- Script: "Most brands believe filming is the bottleneck. The real leak is in post production. Flat color curves get skipped instantly."\n\n[1:00 - 2:00] THE REELFORGE METHOD:\n- Visual: Rapid on-screen overlay of soundwave foley graphs and timeline graphics.\n- Script: "Our engineering pipeline isolates frequency channels, balances dynamic ranges, and injects custom visual anchors."`;
        }
      }

      setAiOutput(outputText);
    }, 1200);
  };

  return (
    <div className="py-24 md:py-32 bg-[#020202] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-3">// ReelGPT Coprocessor Engine</span>
          <h1 className="font-display font-black text-4xl sm:text-5xl tracking-tight leading-[1.1] text-white">
            Algorithmic Ideation Hub
          </h1>
          <p className="font-sans text-bebebe text-sm sm:text-base leading-relaxed mt-4">
            Leverage our calibrated content structures. Input parameters below to generate high-converting captions, hooks, mid-journey prompt parameters, and script guides instantly.
          </p>
        </div>

        {/* Main Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left Column: Module selector & inputs (5 cols) */}
          <div className="lg:col-span-5 p-8 rounded-3xl border border-white/5 bg-[#070707] flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Module select pills */}
              <div className="grid grid-cols-2 gap-2 border-b border-white/5 pb-6">
                {[
                  { id: 'hook', label: 'Viral Hooks' },
                  { id: 'caption', label: 'Caption Styler' },
                  { id: 'prompt', label: 'Prompt Engine' },
                  { id: 'script', label: 'Script Blueprint' }
                ].map((mod) => (
                  <button
                    key={mod.id}
                    onClick={() => { setActiveModule(mod.id as any); setAiOutput(''); }}
                    className={`py-2 px-3 rounded-xl text-xs font-display font-bold uppercase tracking-wider text-center cursor-pointer transition-all ${
                      activeModule === mod.id 
                        ? 'bg-accent text-white shadow' 
                        : 'bg-white/3 border border-white/5 text-bebebe hover:text-white'
                    }`}
                  >
                    {mod.label}
                  </button>
                ))}
              </div>

              {/* Dynamic Inputs Area */}
              <div className="space-y-4">
                
                {/* Viral Hooks Inputs */}
                {activeModule === 'hook' && (
                  <>
                    <div>
                      <label className="block text-[10px] uppercase font-mono text-muted mb-2">Target Audience Niche</label>
                      <select 
                        value={inputs.hookNiche}
                        onChange={(e) => setInputs({ ...inputs, hookNiche: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-white focus:outline-none focus:border-accent"
                      >
                        <option value="finance" className="bg-[#0f0f0f]">Finance & Day Trading</option>
                        <option value="gaming" className="bg-[#0f0f0f]">Gaming Highlights & Streamers</option>
                        <option value="business" className="bg-[#0f0f0f]">SaaS & Agency Business</option>
                        <option value="education" className="bg-[#0f0f0f]">Educational Essays</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-mono text-muted mb-2">Psychological Tone</label>
                      <select 
                        value={inputs.hookTone}
                        onChange={(e) => setInputs({ ...inputs, hookTone: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-white focus:outline-none focus:border-accent"
                      >
                        <option value="aggressive" className="bg-[#0f0f0f]">High Hype / Pattern Interrupt</option>
                        <option value="curious" className="bg-[#0f0f0f]">Mind Bending Question</option>
                        <option value="fact" className="bg-[#0f0f0f]">Bold Historical Stat</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Caption Inputs */}
                {activeModule === 'caption' && (
                  <>
                    <div>
                      <label className="block text-[10px] uppercase font-mono text-muted mb-2">Primary Topic or Keyword</label>
                      <input 
                        type="text"
                        value={inputs.captionTopic}
                        onChange={(e) => setInputs({ ...inputs, captionTopic: e.target.value })}
                        placeholder="e.g. why 99% of podcasts fail"
                        className="w-full p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-white focus:outline-none focus:border-accent font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-mono text-muted mb-2">Output Mood</label>
                      <select 
                        value={inputs.captionTone}
                        onChange={(e) => setInputs({ ...inputs, captionTone: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-white focus:outline-none focus:border-accent"
                      >
                        <option value="hype" className="bg-[#0f0f0f]">Viral Hype (Emojis & Hooks)</option>
                        <option value="professional" className="bg-[#0f0f0f]">Polished Professional Insight</option>
                        <option value="educational" className="bg-[#0f0f0f]">Deep Retention Essay Structure</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Prompt visual inputs */}
                {activeModule === 'prompt' && (
                  <>
                    <div>
                      <label className="block text-[10px] uppercase font-mono text-muted mb-2">Describe the Core Visual Action</label>
                      <textarea 
                        rows={3}
                        value={inputs.promptVisual}
                        onChange={(e) => setInputs({ ...inputs, promptVisual: e.target.value })}
                        placeholder="e.g. overhead camera tracking shot of an editing workstation with neon backlights..."
                        className="w-full p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-white focus:outline-none focus:border-accent resize-none font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-mono text-muted mb-2">Target Grade Preset</label>
                      <select 
                        value={inputs.promptVibe}
                        onChange={(e) => setInputs({ ...inputs, promptVibe: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-white focus:outline-none focus:border-accent"
                      >
                        <option value="cinematic" className="bg-[#0f0f0f]">Hollywood Cinematic (Warm Gold)</option>
                        <option value="neon" className="bg-[#0f0f0f]">Cyberpunk Neon Contrast</option>
                        <option value="documentary" className="bg-[#0f0f0f]">Realistic Documentary (S-Log3)</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Script inputs */}
                {activeModule === 'script' && (
                  <>
                    <div>
                      <label className="block text-[10px] uppercase font-mono text-muted mb-2">Video Script Theme</label>
                      <input 
                        type="text"
                        value={inputs.scriptTopic}
                        onChange={(e) => setInputs({ ...inputs, scriptTopic: e.target.value })}
                        placeholder="e.g. why color science matters..."
                        className="w-full p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-white focus:outline-none focus:border-accent font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-mono text-muted mb-2">Target Running Length Format</label>
                      <select 
                        value={inputs.scriptFormat}
                        onChange={(e) => setInputs({ ...inputs, scriptFormat: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-white focus:outline-none focus:border-accent"
                      >
                        <option value="short" className="bg-[#0f0f0f]">Vertical Short Format (under 60s)</option>
                        <option value="long" className="bg-[#0f0f0f]">YouTube Long-form Intro Sequence</option>
                      </select>
                    </div>
                  </>
                )}

              </div>
            </div>

            <button
              onClick={runAiEngine}
              disabled={isGenerating}
              className="w-full py-3.5 rounded-xl bg-accent hover:bg-accent-dark text-white font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 mt-8 shadow-lg cursor-pointer disabled:opacity-50 transition-all"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Synthesizing Structures...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Trigger AI Blueprint
                </>
              )}
            </button>
          </div>

          {/* Right Column: Preview Stage & Saved presets (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Active Output preview */}
            <div className="flex-grow p-8 rounded-3xl border border-white/5 bg-[#050505] flex flex-col justify-between relative overflow-hidden min-h-[350px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6 z-10">
                <span className="text-xs font-mono text-muted uppercase">Active Generated Master Preview</span>
                <span className="text-[10px] font-mono text-accent uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> ReelGPT v2.4
                </span>
              </div>

              {/* Text content area */}
              <div className="flex-grow flex items-center justify-center z-10">
                {isGenerating ? (
                  <div className="text-center space-y-3 font-mono text-xs text-muted">
                    <RefreshCw className="w-6 h-6 animate-spin text-accent mx-auto" />
                    <p>Aligning narrative anchors, pacing indices, and subtitle metadata...</p>
                  </div>
                ) : aiOutput ? (
                  <pre className="w-full h-full text-xs text-bebebe whitespace-pre-wrap leading-relaxed font-mono bg-black/40 p-5 rounded-2xl border border-white/5 overflow-y-auto max-h-[300px]">
                    {aiOutput}
                  </pre>
                ) : (
                  <div className="text-center text-muted font-mono text-xs py-12">
                    <Lightbulb className="w-8 h-8 text-accent/30 mx-auto mb-3" />
                    Configure parameters and click <strong>Trigger AI Blueprint</strong> on the left.
                  </div>
                )}
              </div>

              {/* Save/Copy actions */}
              {aiOutput && !isGenerating && (
                <div className="mt-6 border-t border-white/5 pt-5 flex justify-end gap-3 z-10">
                  <button
                    onClick={() => saveToLibrary(inputs.captionTopic || inputs.scriptTopic || 'Bespoke Structure', aiOutput)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[10px] font-display font-bold uppercase tracking-wider text-bebebe hover:text-white border border-white/10 flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <BookmarkCheck className="w-4 h-4 text-emerald-400" /> Save Draft Locally
                  </button>
                  <button
                    onClick={() => handleCopy(aiOutput)}
                    className="px-4 py-2 rounded-xl bg-accent hover:bg-accent-dark text-[10px] font-display font-black uppercase tracking-wider text-white flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" /> Copied Master
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Copy To Clipboard
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Saved Library Area */}
        <AnimatePresence>
          {savedAssets.length > 0 && (
            <div className="p-8 rounded-3xl border border-white/5 bg-[#050505]">
              <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
                <h3 className="font-display font-bold text-base text-white uppercase tracking-wider flex items-center gap-2">
                  <BookmarkCheck className="w-5 h-5 text-accent" /> Your Saved Structure Library
                </h3>
                <span className="text-xs font-mono text-muted">{savedAssets.length} Assets Stored</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedAssets.map((asset) => (
                  <div key={asset.id} className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 relative group">
                    <button
                      onClick={() => deleteAsset(asset.id)}
                      className="absolute top-4 right-4 p-1.5 bg-white/2 hover:bg-red-500/15 border border-white/5 text-muted hover:text-red-400 rounded-lg cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="mb-4">
                      <span className="text-[9px] font-mono text-accent uppercase font-bold bg-accent/15 px-2 py-0.5 rounded mr-2">{asset.type}</span>
                      <span className="text-[10px] font-mono text-muted">{asset.timestamp}</span>
                      <h4 className="font-display font-bold text-sm text-white mt-2 leading-tight">{asset.title}</h4>
                    </div>

                    <pre className="text-[10px] text-bebebe whitespace-pre-wrap leading-relaxed font-mono bg-black/40 p-4 rounded-xl border border-white/5 max-h-[140px] overflow-y-auto mb-4">
                      {asset.content}
                    </pre>

                    <button
                      onClick={() => handleCopy(asset.content)}
                      className="text-[10px] font-display font-bold text-accent uppercase tracking-wider hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" /> Re-copy Master
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
