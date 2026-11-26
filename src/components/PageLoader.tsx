import React, { useEffect, useState } from 'react';
import { Zap, Sparkles } from 'lucide-react';

interface PageLoaderProps {
  onComplete?: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'logo' | 'expand' | 'fadeout' | 'done'>('logo');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Phase 1: Logo pulse (0 - 600ms)
    const t1 = setTimeout(() => {
      setPhase('expand');
    }, 600);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 45);

    // Phase 2: Fadeout at 1500ms
    const t2 = setTimeout(() => {
      setPhase('fadeout');
    }, 1500);

    // Phase 3: Remove loader at 1900ms
    const t3 = setTimeout(() => {
      setPhase('done');
      if (onComplete) onComplete();
    }, 1900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#FAF7FD] transition-all duration-500 ${
        phase === 'fadeout' ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Background soft ambient radial gradient */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-200/40 via-pink-200/30 to-purple-300/40 blur-[100px] pointer-events-none animate-pulse-slow"></div>

      <div className="relative flex flex-col items-center text-center space-y-6 px-4">
        
        {/* Animated H4T Logo with pulsing glow rings */}
        <div className="relative group cursor-pointer" onClick={() => setPhase('fadeout')}>
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden p-1 bg-white border-2 border-purple-300 shadow-pastel-purple flex items-center justify-center transition-all duration-500 transform hover:scale-105">
            <img
              src="/images/logo.jpg"
              alt="H4T Lightning Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Glowing orbital rings */}
          <span className="absolute -inset-2 rounded-full border-2 border-purple-400/40 animate-ping pointer-events-none"></span>
          <span className="absolute -inset-4 rounded-full border border-pink-400/30 animate-pulse pointer-events-none"></span>
        </div>

        {/* Transition: H4T to HACK4TECH */}
        <div className="space-y-1.5 overflow-hidden">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs font-mono font-bold tracking-widest text-purple-600 uppercase bg-purple-100/70 px-2.5 py-0.5 rounded-full border border-purple-200">
              GLA UNIVERSITY
            </span>
            <span className="text-xs font-mono font-bold tracking-widest text-pink-600 uppercase bg-pink-100/70 px-2.5 py-0.5 rounded-full border border-pink-200">
              NAAC A+
            </span>
          </div>

          <div className="relative">
            {phase === 'logo' ? (
              <h1 className="text-3xl sm:text-5xl font-display font-black tracking-widest text-purple-950 transition-all duration-300 animate-pulse">
                H4T
              </h1>
            ) : (
              <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-600 animate-in fade-in zoom-in-95 duration-500">
                HACK4TECH
              </h1>
            )}
          </div>

          <p className="text-xs sm:text-sm font-mono tracking-wider text-slate-500 uppercase transition-opacity duration-300">
            {phase === 'logo' ? 'Initializing Ecosystem...' : 'Smart Event Management System • HackPass'}
          </p>
        </div>

        {/* Pastel Progress Bar */}
        <div className="w-48 sm:w-64 h-1.5 rounded-full bg-purple-100 overflow-hidden border border-purple-200 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 transition-all duration-100 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

      </div>
    </div>
  );
};