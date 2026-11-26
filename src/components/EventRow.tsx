import React, { useState } from 'react';
import { ArrowUpRight, Trophy, Calendar, MapPin, Clock, CheckCircle2, Ticket, Sparkles } from 'lucide-react';
import { EventItem } from '../types';

interface EventRowProps {
  event: EventItem;
  index: number;
  onSelectEvent: (event: EventItem) => void;
  onRegisterClick: (event: EventItem) => void;
  onViewPoster: (posterUrl: string, title: string) => void;
}

export const EventRow: React.FC<EventRowProps> = ({
  event,
  index,
  onSelectEvent,
  onRegisterClick,
  onViewPoster,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const isRavenX = event.id.includes('ravenx') || event.theme === 'gothic-purple';
  const isVisionX = event.id.includes('visionx') || event.theme === 'cyberpunk';
  const isIgnix = event.id.includes('ignix') || event.theme === 'synth-glow';

  const accentColor = isRavenX
    ? 'text-purple-400 border-purple-500/40 bg-purple-950/30'
    : isVisionX
    ? 'text-cyan-400 border-cyan-500/40 bg-cyan-950/30'
    : 'text-pink-400 border-pink-500/40 bg-pink-950/30';

  const hoverBorder = isRavenX
    ? 'group-hover:border-purple-500/60'
    : isVisionX
    ? 'group-hover:border-cyan-500/60'
    : 'group-hover:border-pink-500/60';

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative border-b border-gray-800/80 transition-all duration-300 py-6 sm:py-8 px-4 sm:px-6 rounded-2xl hover:bg-white/[0.02] ${hoverBorder}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Left Section: Index, Category Pill, Date */}
        <div className="flex items-center gap-4 sm:gap-6 min-w-[220px]">
          <span className="font-mono text-sm sm:text-base font-bold text-gray-500 group-hover:text-gray-300 transition-colors">
            {String(index + 1).padStart(2, '0')}
          </span>
          
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border ${accentColor}`}>
                {event.category}
              </span>
              {event.genderRestriction === 'girls_only' && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-900/80 text-purple-200 border border-purple-400/50">
                  👑 Girls Only
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <span>{event.date}</span>
            </div>
          </div>
        </div>

        {/* Center Section: Oversized Title, Tagline & Details */}
        <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-3">
              <h3 
                onClick={() => onSelectEvent(event)}
                className="text-2xl sm:text-4xl font-display font-black tracking-tight text-white uppercase group-hover:text-cyan-300 cursor-pointer transition-colors"
              >
                {event.title}
              </h3>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-gray-900 border border-gray-700 text-cyan-400">
                {event.feeText}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl line-clamp-1">
              {event.subtitle || event.tagline || event.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-400">
              <span className="flex items-center gap-1.5 font-mono text-amber-300">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>{event.prizePool}</span>
              </span>
              <span className="text-gray-600">•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-500" />
                <span>{event.duration}</span>
              </span>
              <span className="text-gray-600">•</span>
              <span className="flex items-center gap-1.5 truncate max-w-xs">
                <MapPin className="w-3.5 h-3.5 text-gray-500" />
                <span>{event.venue}</span>
              </span>
            </div>
          </div>

          {/* Inline Hover Thumbnail Reveal (Swiss Framer Style) */}
          <div 
            onClick={() => onViewPoster(event.poster, event.title)}
            className="hidden sm:block relative w-28 h-20 rounded-xl overflow-hidden border border-gray-700/80 shrink-0 cursor-pointer shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:border-cyan-400/60"
          >
            <img 
              src={event.poster} 
              alt={event.title} 
              className="w-full h-full object-cover object-top filter brightness-90 group-hover:brightness-100 transition-all"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5">
              <span className="text-[9px] font-mono text-gray-300 truncate">Preview Poster</span>
            </div>
          </div>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-2.5 shrink-0 pt-2 lg:pt-0">
          <button
            onClick={() => onSelectEvent(event)}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white bg-gray-900/90 hover:bg-gray-800 border border-gray-700 transition-all"
          >
            Details
          </button>

          <button
            onClick={() => onRegisterClick(event)}
            className="px-5 py-2 rounded-xl text-xs font-extrabold text-black bg-cyan-400 hover:bg-cyan-300 transition-all flex items-center gap-1.5 shadow-neon-cyan group/btn"
          >
            <span>Register</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </div>
  );
};