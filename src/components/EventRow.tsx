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
  const isRavenX = event.id.includes('ravenx') || event.theme === 'gothic-purple';
  const isVisionX = event.id.includes('visionx') || event.theme === 'cyberpunk';
  const isIgnix = event.id.includes('ignix') || event.theme === 'synth-glow';

  return (
    <div
      className="group relative border-b border-purple-100/90 transition-all duration-300 py-6 sm:py-7 px-4 sm:px-6 rounded-2xl hover:bg-purple-50/50 hover:border-purple-300"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Left Section: Index, Category Pill, Date */}
        <div className="flex items-center gap-4 sm:gap-6 min-w-[220px]">
          <span className="font-mono text-sm sm:text-base font-black text-purple-300 group-hover:text-purple-600 transition-colors">
            {String(index + 1).padStart(2, '0')}
          </span>
          
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-purple-100 text-purple-900 border border-purple-200">
                {event.category}
              </span>
              {event.genderRestriction === 'girls_only' && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-100 text-pink-800 border border-pink-200">
                  👑 Girls Only
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <Calendar className="w-3.5 h-3.5 text-purple-500" />
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
                className="text-2xl sm:text-4xl font-display font-black tracking-tight text-purple-950 uppercase group-hover:text-purple-700 cursor-pointer transition-colors"
              >
                {event.title}
              </h3>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-purple-100 text-purple-800 border border-purple-200">
                {event.feeText}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl line-clamp-1">
              {event.subtitle || event.tagline || event.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-mono font-bold text-amber-700">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span>{event.prizePool}</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{event.duration}</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5 truncate max-w-xs">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{event.venue}</span>
              </span>
            </div>
          </div>

          {/* Inline Hover Thumbnail Reveal */}
          <div 
            onClick={() => onViewPoster(event.poster, event.title)}
            className="hidden sm:block relative w-28 h-20 rounded-2xl overflow-hidden border border-purple-200 shrink-0 cursor-pointer shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-purple-400 group-hover:shadow-md"
          >
            <img 
              src={event.poster} 
              alt={event.title} 
              className="w-full h-full object-cover object-top filter brightness-95 group-hover:brightness-100 transition-all"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-950/70 via-transparent to-transparent flex items-end p-1.5">
              <span className="text-[9px] font-mono text-white truncate">Full Poster</span>
            </div>
          </div>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-2.5 shrink-0 pt-2 lg:pt-0">
          <button
            onClick={() => onSelectEvent(event)}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-purple-900 hover:text-purple-950 bg-white hover:bg-purple-50 border border-purple-200 transition-all shadow-sm"
          >
            Details
          </button>

          <button
            onClick={() => onRegisterClick(event)}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 transition-all flex items-center gap-1.5 shadow-md group/btn"
          >
            <span>Register</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </div>
  );
};