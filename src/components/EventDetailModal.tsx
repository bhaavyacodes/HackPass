import React from 'react';
import { X, Calendar, Clock, MapPin, Trophy, Users, ShieldCheck, Gift, Check, Phone, FileText, ArrowRight } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { EventItem } from '../types';

interface EventDetailModalProps {
  event: EventItem | null;
  onClose: () => void;
  onRegister: (event: EventItem) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onRegister,
}) => {
  if (!event) return null;

  const isRavenX = event.id.includes('ravenx') || event.theme === 'gothic-purple';
  const isVisionX = event.id.includes('visionx') || event.theme === 'cyberpunk';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0c101a] border border-gray-700/80 shadow-2xl text-gray-200">
        
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-black text-gray-300 hover:text-white border border-gray-700 backdrop-blur-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Section with Poster */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-black">
          <img
            src={event.poster}
            alt={event.title}
            className="w-full h-full object-cover object-top opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c101a] via-[#0c101a]/50 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider uppercase bg-cyan-950/90 text-cyan-300 border border-cyan-700/80">
                  {event.category}
                </span>
                {event.genderRestriction === 'girls_only' && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-900/90 text-purple-200 border border-purple-500/80">
                    👑 Girls Only Hackathon
                  </span>
                )}
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {event.prizePool} Prize Pool
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-black text-white tracking-wide">
                {event.title}
              </h1>
              <p className="text-sm sm:text-base font-medium text-cyan-400 mt-1">
                {event.tagline || event.subtitle}
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                onRegister(event);
              }}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shrink-0 ${
                isRavenX
                  ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-neon-purple'
                  : 'bg-cyan-400 hover:bg-cyan-300 text-black shadow-neon-cyan'
              }`}
            >
              <span>Register Now ({event.feeText})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-gray-900/80 border border-gray-800">
              <Calendar className="w-4 h-4 text-cyan-400 mb-1.5" />
              <p className="text-[11px] text-gray-400 uppercase font-mono">Date</p>
              <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">{event.date}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-gray-900/80 border border-gray-800">
              <Clock className="w-4 h-4 text-purple-400 mb-1.5" />
              <p className="text-[11px] text-gray-400 uppercase font-mono">Timing</p>
              <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">{event.time}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-gray-900/80 border border-gray-800">
              <Users className="w-4 h-4 text-emerald-400 mb-1.5" />
              <p className="text-[11px] text-gray-400 uppercase font-mono">Team Size</p>
              <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                {event.teamType === 'individual_only' ? 'Solo' : `${event.minTeamSize}–${event.maxTeamSize} Members`}
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-gray-900/80 border border-gray-800">
              <MapPin className="w-4 h-4 text-pink-400 mb-1.5" />
              <p className="text-[11px] text-gray-400 uppercase font-mono">Venue</p>
              <p className="text-xs sm:text-sm font-semibold text-white mt-0.5 truncate">{event.venue}</p>
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              About the Event
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed bg-gray-900/40 p-4 rounded-2xl border border-gray-800">
              {event.description}
            </p>
          </div>

          {/* Tracks / Domains */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              Focus Domains & Challenge Tracks
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {event.domains.map((domain, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-900/60 border border-gray-800">
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-xs font-mono font-bold text-cyan-400">
                    {i + 1}
                  </div>
                  <span className="text-sm font-medium text-gray-200">{domain}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Perks & What's Included */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <Gift className="w-5 h-5 text-amber-400" />
              Attendee Perks & Goodies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {event.perks.map((perk, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs sm:text-sm text-amber-200">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Guidelines & Rules */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              Rules & Code of Conduct
            </h3>
            <ul className="space-y-2 bg-gray-900/40 p-4 rounded-2xl border border-gray-800 text-xs sm:text-sm text-gray-300">
              {event.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold shrink-0 mt-0.5">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Organizers & Coordinators Contact */}
          <div className="p-4 rounded-2xl bg-gray-900/90 border border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-mono text-cyan-400 uppercase">Have questions? Contact Student Leads</p>
              <div className="flex flex-wrap gap-4 mt-2">
                {event.coordinators.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-semibold text-white">{c.name}</span>
                    <a href={`tel:${c.phone}`} className="text-cyan-400 hover:underline">
                      +91 {c.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={`https://instagram.com/${event.instagram.replace('@', '')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-medium hover:bg-pink-500/20 transition-all shrink-0"
            >
              <InstagramIcon className="w-4 h-4 text-pink-400" />
              <span>{event.instagram}</span>
            </a>
          </div>

          {/* Bottom Action CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-800">
            <div className="text-center sm:text-left">
              <span className="text-xs text-gray-400">Registration Fee:</span>
              <p className="text-xl font-bold font-mono text-cyan-400">{event.feeText}</p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-gray-700 hover:bg-gray-800 text-sm font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onRegister(event);
                }}
                className={`flex-1 sm:flex-none px-7 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 ${
                  isRavenX
                    ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-neon-purple'
                    : 'bg-cyan-400 hover:bg-cyan-300 text-black shadow-neon-cyan'
                }`}
              >
                <span>Proceed to Register</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
