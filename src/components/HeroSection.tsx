import React from 'react';
import { ShieldCheck, CheckCircle2, Lock, Users, Sparkles, Building2, Award, ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <div className="relative pt-10 pb-12 sm:pt-16 sm:pb-20 border-b border-purple-100/80 overflow-hidden w-full text-center">
      
      {/* Background Soft Ambient Pastel Glows */}
      <div className="absolute top-10 left-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-pink-200/30 via-purple-200/20 to-transparent blur-[140px] pointer-events-none"></div>
      <div className="absolute top-20 right-1/3 w-[450px] h-[450px] rounded-full bg-gradient-to-bl from-purple-200/40 via-pink-100/30 to-transparent blur-[140px] pointer-events-none"></div>

      <div className="relative w-full px-4 sm:px-8 lg:px-12 space-y-7 max-w-5xl mx-auto">
        
        {/* Top Community Badge */}
        <div className="flex items-center justify-center gap-2">
          <span className="px-3.5 py-1 rounded-full bg-purple-100 text-purple-900 font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:bg-pink-600 hover:text-white cursor-pointer">
            Hack4Tech Community
          </span>
          <span className="text-slate-300">•</span>
          <span className="px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-pink-600 hover:text-white cursor-pointer">
            GLA University
          </span>
        </div>

        {/* ======================================================== */}
        {/* CENTERED BRAND TITLE WITH FUN PINK & WHITE HOVER EFFECT */}
        {/* ======================================================== */}
        <div className="space-y-3">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-black tracking-tight text-purple-950 inline-block transition-transform duration-300 hover:scale-105">
            <span className="inline-block transition-all duration-300 hover:bg-pink-600 hover:text-white px-3 py-1 rounded-3xl cursor-pointer">
              Hack
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600 hover:text-white hover:bg-pink-600 transition-all duration-300 px-2 py-1 rounded-3xl cursor-pointer inline-block">
              Pass
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Centralized Event Passes & Real-Time Attendance Verification
          </p>
        </div>

        {/* Feature Pills with Fun Color Exchange Hover */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-bold">
          
          <div className="px-4 py-2 rounded-2xl bg-white border border-purple-200 text-purple-900 shadow-sm transition-all duration-300 hover:bg-pink-600 hover:text-white hover:border-pink-600 cursor-pointer">
            Instant QR Event Passes
          </div>

          <div className="px-4 py-2 rounded-2xl bg-white border border-purple-200 text-purple-900 shadow-sm transition-all duration-300 hover:bg-pink-600 hover:text-white hover:border-pink-600 cursor-pointer">
            Anti-Duplicate Fraud Lock
          </div>

          <div className="px-4 py-2 rounded-2xl bg-white border border-purple-200 text-purple-900 shadow-sm transition-all duration-300 hover:bg-pink-600 hover:text-white hover:border-pink-600 cursor-pointer">
            Self-Serve Email Retrieval
          </div>

          <div className="px-4 py-2 rounded-2xl bg-white border border-purple-200 text-purple-900 shadow-sm transition-all duration-300 hover:bg-pink-600 hover:text-white hover:border-pink-600 cursor-pointer">
            Duty Leave CSV Export
          </div>

        </div>

      </div>
    </div>
  );
};