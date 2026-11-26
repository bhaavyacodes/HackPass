import React from 'react';
import { Calendar, MapPin, Trophy, Users, ArrowRight, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { EventItem } from '../types';

interface EventCardProps {
  event: EventItem;
  onSelectEvent: (event: EventItem) => void;
  onRegisterClick: (event: EventItem) => void;
  onViewPoster: (posterUrl: string, title: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onSelectEvent,
  onRegisterClick,
  onViewPoster,
}) => {
  const isRavenX = event.id.includes('ravenx') || event.theme === 'gothic-purple';
  const isVisionX = event.id.includes('visionx') || event.theme === 'cyberpunk';
  const isIgnix = event.id.includes('ignix') || event.theme === 'synth-glow';

  return (
    <div className="group relative rounded-3xl bg-white border border-purple-200/90 hover:border-purple-400 transition-all duration-300 flex flex-col overflow-hidden shadow-pastel-card hover:shadow-pastel-hover hover:-translate-y-1">
      
      {/* Top Banner / Poster Thumbnail */}
      <div className="relative h-64 overflow-hidden bg-purple-950/20">
        <img
          src={event.poster}
          alt={event.title}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {/* Badges on Top of Poster */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider font-mono uppercase bg-white/95 backdrop-blur-md border border-purple-200 text-purple-900 flex items-center gap-1.5 shadow-sm">
            <span className={`w-2 h-2 rounded-full ${isRavenX ? 'bg-purple-600' : isVisionX ? 'bg-indigo-600' : 'bg-pink-600'} animate-pulse`}></span>
            {event.category}
          </span>

          <span className="px-2.5 py-1 rounded-full text-xs font-bold font-mono tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            REGISTRATION OPEN
          </span>
        </div>

        {/* Quick Poster Preview Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewPoster(event.poster, event.title);
          }}
          className="absolute bottom-3 right-3 px-2.5 py-1 text-xs rounded-lg bg-black/75 hover:bg-black text-white border border-white/30 backdrop-blur-sm transition-all"
        >
          View Full Poster
        </button>

        {/* Team restriction badge if any */}
        {event.genderRestriction === 'girls_only' && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-pink-600 text-white border border-pink-400 shadow-md">
              👑 Girls Only Hackathon
            </span>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-extrabold text-purple-950 group-hover:text-purple-700 transition-colors">
                {event.title}
              </h3>
              <p className="text-xs text-purple-700 font-mono tracking-wide font-semibold mt-0.5">
                {event.subtitle || event.tagline}
              </p>
            </div>
            {/* Fee Pill */}
            <div className="text-right shrink-0">
              <span className="px-2.5 py-1 text-xs font-bold font-mono rounded-xl bg-purple-100 text-purple-900 border border-purple-200">
                {event.feeText}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
            {event.description}
          </p>

          {/* Key Details Grid */}
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-700">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-purple-50/70 border border-purple-100">
              <Calendar className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span className="truncate font-medium">{event.date}</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-purple-50/70 border border-purple-100">
              <Clock className="w-3.5 h-3.5 text-pink-600 shrink-0" />
              <span className="truncate font-medium">{event.duration || event.time}</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-purple-50/70 border border-purple-100 col-span-2">
              <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span className="truncate font-medium">{event.venue}</span>
            </div>
          </div>

          {/* Prize Pool Highlight */}
          <div className="mt-3.5 flex items-center justify-between p-2.5 rounded-2xl bg-gradient-to-r from-amber-50 to-purple-50 border border-amber-200">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>Prize Pool:</span>
            </div>
            <span className="text-sm font-bold font-mono text-amber-800">
              {event.prizePool}
            </span>
          </div>

          {/* Domains / Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {event.domains.slice(0, 3).map((domain, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[10px] rounded-lg bg-slate-100 text-slate-700 border border-slate-200 font-medium"
              >
                {domain}
              </span>
            ))}
            {event.domains.length > 3 && (
              <span className="px-1.5 py-0.5 text-[10px] rounded-lg bg-slate-100 text-slate-500 font-medium">
                +{event.domains.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-purple-100 flex items-center gap-2.5">
          <button
            onClick={() => onSelectEvent(event)}
            className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold text-purple-900 hover:text-purple-950 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-all text-center"
          >
            Guidelines
          </button>
          
          <button
            onClick={() => onRegisterClick(event)}
            className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 transition-all flex items-center justify-center gap-1.5 shadow-md"
          >
            <span>Register Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};