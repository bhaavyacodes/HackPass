import React from 'react';
import { Sparkles, QrCode, Ticket, ShieldCheck, Trophy, Flame, ChevronRight, Zap, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onFindPassClick: () => void;
  onScannerClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onFindPassClick,
  onScannerClick,
}) => {
  return (
    <div className="relative overflow-hidden pt-8 pb-12 sm:pt-16 sm:pb-20 text-center border-b border-gray-800/60">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[300px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 space-y-7">
        
        {/* Top Badges / Accreditation Strip */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 shadow-neon-cyan text-xs font-mono font-bold text-cyan-300">
            <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
            <span>HACK4TECH OFFICIAL EMS</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-xs font-mono font-bold text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>GLA UNIVERSITY • NAAC A+ ACCREDITED</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/40 text-xs font-mono font-bold text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>OFFICE OF STUDENTS' WELFARE</span>
          </div>
        </div>

        {/* Main Headline - Swiss Brutalist Condensed Grotesque Style */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-7xl lg:text-8xl font-display font-black tracking-tighter text-white uppercase leading-[0.9]">
            SMART EVENT <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              MANAGEMENT
            </span>
          </h1>
          <p className="text-xs sm:text-sm font-mono tracking-widest text-cyan-400 uppercase pt-2">
            Centralized Hackathon Ecosystem • GLA University Mathura
          </p>
        </div>

        {/* Sub-headline description */}
        <p className="text-sm sm:text-lg text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Explore upcoming hackathons, register individually or in teams, obtain unique tamper-proof QR event passes, and experience contactless gate attendance verification.
        </p>

        {/* Action CTAs */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onExploreClick}
            className="px-7 py-3.5 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-sm sm:text-base shadow-neon-cyan transition-all flex items-center gap-2 group"
          >
            <span>Explore Lineup</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onFindPassClick}
            className="px-6 py-3.5 rounded-2xl bg-gray-900/90 hover:bg-gray-800 border border-gray-700 text-white font-bold text-sm sm:text-base transition-all flex items-center gap-2"
          >
            <Ticket className="w-4 h-4 text-cyan-400" />
            <span>Find My Pass</span>
          </button>

          <button
            onClick={onScannerClick}
            className="px-6 py-3.5 rounded-2xl bg-purple-950/50 hover:bg-purple-900/50 border border-purple-500/50 text-purple-200 font-bold text-sm sm:text-base transition-all flex items-center gap-2 shadow-neon-purple"
          >
            <QrCode className="w-4 h-4 text-purple-400" />
            <span>Live Gate Scanner</span>
          </button>
        </div>

        {/* Live System Metric Highlights (Dario Grigoletti / Swiss Data Tiles) */}
        <div className="pt-8 grid grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-4xl mx-auto text-left">
          
          <div className="p-4 rounded-2xl bg-gray-900/70 border border-gray-800 hover:border-amber-500/40 transition-colors">
            <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">Total Prize Pools</span>
            <p className="text-lg sm:text-xl font-bold font-mono text-amber-300 mt-1">₹75,000+ Worth</p>
            <span className="text-[11px] text-gray-500 mt-0.5 block">VisionX + RavenX</span>
          </div>

          <div className="p-4 rounded-2xl bg-gray-900/70 border border-gray-800 hover:border-cyan-500/40 transition-colors">
            <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">Pass Generation</span>
            <p className="text-lg sm:text-xl font-bold font-mono text-cyan-300 mt-1">Dynamic QR Code</p>
            <span className="text-[11px] text-gray-500 mt-0.5 block">Unique H4T-XXX Pass</span>
          </div>

          <div className="p-4 rounded-2xl bg-gray-900/70 border border-gray-800 hover:border-emerald-500/40 transition-colors">
            <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">Attendance & Leave</span>
            <p className="text-lg sm:text-xl font-bold font-mono text-emerald-300 mt-1">Duty Leave Export</p>
            <span className="text-[11px] text-gray-500 mt-0.5 block">Official CSV Generated</span>
          </div>

          <div className="p-4 rounded-2xl bg-gray-900/70 border border-gray-800 hover:border-purple-500/40 transition-colors">
            <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">Gate Security</span>
            <p className="text-lg sm:text-xl font-bold font-mono text-purple-300 mt-1">Anti-Duplicate Lock</p>
            <span className="text-[11px] text-gray-500 mt-0.5 block">409 Conflict Prevention</span>
          </div>

        </div>

      </div>
    </div>
  );
};