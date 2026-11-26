import React from 'react';
import { Zap, ShieldCheck, CheckCircle2, Lock, Users, Sparkles, Building2, Flame, Award, ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <div className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-purple-100/80 overflow-hidden">
      
      {/* Background Soft Ambient Pastel Glows */}
      <div className="absolute top-10 left-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-pink-200/40 via-purple-200/30 to-transparent blur-[120px] pointer-events-none"></div>
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-purple-200/50 via-pink-100/40 to-transparent blur-[120px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* ======================================================== */}
        {/* TOP STATUS BAR PILL (MATCHING PDF PAGE 1) */}
        {/* ======================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 border-b border-purple-100 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-purple-700 text-white flex items-center justify-center p-0.5">
              <Zap className="w-3 h-3 fill-yellow-300 text-yellow-300" />
            </div>
            <span className="font-bold text-purple-950 font-display">Hack4Tech</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-medium">Core Developer Squad</span>
          </div>

          {/* Central Status Pill */}
          <div className="px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-900 font-mono text-[11px] font-bold tracking-widest uppercase flex items-center gap-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>ONLINE | CENTRALIZED SMART EVENT MANAGEMENT SYSTEM</span>
          </div>

          <div className="flex items-center gap-2 font-mono font-bold text-[11px] text-purple-900">
            <span className="text-pink-600">NAAC A+</span>
            <span className="text-slate-300">|</span>
            <span>GLA UNIVERSITY</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MAIN TITLE BLOCK (MATCHING PDF PAGE 1) */}
        {/* ======================================================== */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 pt-2">
          
          {/* Glowing Lightning Emblem Badge */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-purple-100 via-pink-50 to-purple-50 border-2 border-purple-300 shadow-pastel-purple flex items-center justify-center shrink-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-purple-200">
              <Zap className="w-9 h-9 sm:w-11 sm:h-11 fill-amber-400 text-amber-500" />
            </div>
          </div>

          {/* Headline and Subtitle Pill */}
          <div className="space-y-3">
            <div className="flex items-baseline flex-wrap gap-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-purple-950">
                HACK<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600">PASS</span>
              </h1>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-pink-100 text-pink-800 border border-pink-200">
                EMS 2.0
              </span>
            </div>

            {/* Dark Purple Pill Subtitle (Direct from PDF Page 1) */}
            <div className="inline-block px-5 py-2.5 rounded-2xl bg-[#3B0764] text-white font-mono text-xs sm:text-sm font-semibold tracking-wide shadow-md">
              Smart QR Event Passes & Real-Time Anti-Duplicate Attendance Terminal
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* PROBLEM STATEMENT & RELEVANCE CARD (EXACT LAYOUT FROM PDF PAGE 1) */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          
          {/* Left Column: Organization & University Info */}
          <div className="lg:col-span-4 space-y-3">
            
            <div className="p-4 rounded-2xl bg-white border border-purple-200 shadow-sm flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">CLUB / TEAM</span>
                <p className="font-bold text-sm text-purple-950">Hack4Tech</p>
                <p className="text-[11px] text-purple-700">Student Tech Community</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-purple-200 shadow-sm flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">UNIVERSITY</span>
                <p className="font-bold text-sm text-purple-950">GLA University, Mathura</p>
                <p className="text-[11px] text-pink-700 font-medium">Accredited A+ Grade by NAAC</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-purple-900 font-bold block">FLAGSHIP PORTFOLIO</span>
              <ul className="space-y-1 text-slate-700 font-medium">
                <li className="flex items-center gap-1.5 text-purple-950">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  <span><strong>VisionX</strong> (8-Hr Multi-Track Hackathon)</span>
                </li>
                <li className="flex items-center gap-1.5 text-purple-950">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-600"></span>
                  <span><strong>RavenX</strong> (Girls Only Tech Hackathon)</span>
                </li>
                <li className="flex items-center gap-1.5 text-purple-950">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                  <span><strong>Ignix 2.0</strong> (The Hackathon Playbook)</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column: Problem Statement & Impact Card (From PDF Page 1) */}
          <div className="lg:col-span-8 p-6 sm:p-7 rounded-3xl bg-white border border-purple-200 shadow-sm space-y-5">
            
            {/* Problem Statement Pill & Text */}
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900 text-white text-xs font-mono font-bold tracking-wide">
                <span>🎯</span>
                <span>PROBLEM STATEMENT</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                Collegiate hackathons and technical fests frequently suffer from <strong className="text-purple-950 font-bold">fragmented Google Form spreadsheets</strong>, chaotic WhatsApp links, and severe <strong className="text-pink-700 font-bold">45+ minute gate reception bottlenecks</strong>. Without dynamic cryptographic passes, events face pervasive proxy check-ins and screenshot forwarding for food/swag hoarding, while organizers spend 3–5 working days manually reconciling attendance for <strong className="text-purple-950 font-bold">university academic duty leave approvals</strong>.
              </p>
            </div>

            {/* Relevance & Impact Pill & Text */}
            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-950 font-mono">
                <span>🎯</span>
                <span className="uppercase">RELEVANCE & IMPACT:</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Directly elevates campus event governance, eliminates long physical queues with sub-second QR scanning, prevents ticket fraud via real-time single-entry locks, and supports <strong>Digital Campus & NAAC A+ Accreditation standards</strong>.
              </p>
            </div>

            {/* Key Outcomes Badges (From PDF Page 2) */}
            <div className="pt-2 border-t border-purple-100 flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-100/70 text-purple-900 border border-purple-200">
                🚀 Zero Entrance Lines (&lt;3s Scan)
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-100/70 text-pink-900 border border-pink-200">
                🔒 100% Anti-Fraud Lock
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-100/70 text-indigo-900 border border-indigo-200">
                📧 Self-Serve Email Pass Retrieval
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100/70 text-emerald-900 border border-emerald-200">
                🏛 NAAC A+ Duty Leave Export
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};