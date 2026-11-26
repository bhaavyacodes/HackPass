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

  const cardBorderClass = isRavenX
    ? 'border-purple-500/30 hover:border-purple-500/70 hover:shadow-neon-purple'
    : isVisionX
    ? 'border-cyan-500/30 hover:border-cyan-500/70 hover:shadow-neon-cyan'
    : 'border-pink-500/30 hover:border-pink-500/70 hover:shadow-neon-pink';

  const glowButtonClass = isRavenX
    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-900/40'
    : isVisionX
    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold shadow-lg shadow-cyan-900/40'
    : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white shadow-lg shadow-pink-900/40';

  return (
    <div
      className={`group relative rounded-2xl bg-[#0c101a] border transition-all duration-300 flex flex-col overflow-hidden ${cardBorderClass}`}
    >
      {/* Top Banner / Poster Thumbnail */}
      <div className="relative h-64 overflow-hidden bg-black/40">
        <img
          src={event.poster}
          alt={event.title}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c101a] via-[#0c101a]/40 to-transparent"></div>

        {/* Badges on Top of Poster */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider font-mono uppercase bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isRavenX ? 'bg-purple-400' : isVisionX ? 'bg-cyan-400' : 'bg-pink-400'} animate-pulse`}></span>
            {event.category}
          </span>

          <span className="px-2.5 py-1 rounded-full text-xs font-bold font-mono tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-600/60 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            OPEN
          </span>
        </div>

        {/* Quick Poster Preview Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewPoster(event.poster, event.title);
          }}
          className="absolute bottom-3 right-3 px-2.5 py-1 text-xs rounded-lg bg-black/75 hover:bg-black text-gray-200 border border-white/20 backdrop-blur-sm transition-all"
        >
          View Full Poster
        </button>

        {/* Team restriction badge if any */}
        {event.genderRestriction === 'girls_only' && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-purple-900/90 text-purple-200 border border-purple-400/50 shadow">
              👑 Girls Only Hackathon
            </span>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-xl font-display font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                {event.title}
              </h3>
              <p className="text-xs text-cyan-400 font-mono tracking-wide font-medium mt-0.5">
                {event.subtitle || event.tagline}
              </p>
            </div>
            {/* Fee Pill */}
            <div className="text-right shrink-0">
              <span className="px-2.5 py-1 text-xs font-bold font-mono rounded-lg bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                {event.feeText}
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-2.5 line-clamp-2 leading-relaxed">
            {event.description}
          </p>

          {/* Key Details Grid */}
          <div className="mt-4 grid grid-cols-2 gap-2.5 text-xs text-gray-300">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-900/70 border border-gray-800/80">
              <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">{event.date}</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-900/70 border border-gray-800/80">
              <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span className="truncate">{event.duration || event.time}</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-900/70 border border-gray-800/80 col-span-2">
              <MapPin className="w-3.5 h-3.5 text-pink-400 shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>

          {/* Prize Pool Highlight */}
          <div className="mt-3.5 flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Prize Pool:</span>
            </div>
            <span className="text-sm font-bold font-mono text-amber-300">
              {event.prizePool}
            </span>
          </div>

          {/* Domains / Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {event.domains.slice(0, 3).map((domain, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[10px] rounded bg-gray-800/80 text-gray-300 border border-gray-700/60 font-medium"
              >
                {domain}
              </span>
            ))}
            {event.domains.length > 3 && (
              <span className="px-1.5 py-0.5 text-[10px] rounded bg-gray-800 text-gray-400">
                +{event.domains.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-gray-800/80 flex items-center gap-2.5">
          <button
            onClick={() => onSelectEvent(event)}
            className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold text-gray-300 hover:text-white bg-gray-900/90 hover:bg-gray-800 border border-gray-700 transition-all text-center"
          >
            Details & Schedule
          </button>
          
          <button
            onClick={() => onRegisterClick(event)}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${glowButtonClass}`}
          >
            <span>Register Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
