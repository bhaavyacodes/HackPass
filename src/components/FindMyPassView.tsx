import React, { useState } from 'react';
import { Search, Ticket, Mail, Calendar, MapPin, ArrowRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Registration } from '../types';
import { api } from '../services/api';

interface FindMyPassViewProps {
  onOpenPass: (registration: Registration) => void;
  onExploreEvents: () => void;
}

export const FindMyPassView: React.FC<FindMyPassViewProps> = ({
  onOpenPass,
  onExploreEvents,
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<Registration[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e?: React.FormEvent, searchEmail?: string) => {
    if (e) e.preventDefault();
    const query = (searchEmail || email).trim();
    if (!query) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const data = await api.lookupPassesByEmail(query);
      setResults(data);
    } catch (err: any) {
      setError(err.message || 'Failed to search for passes.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLookup = (demoEmail: string) => {
    setEmail(demoEmail);
    handleSearch(undefined, demoEmail);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      
      {/* Title & Introduction Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-700/60">
          <Ticket className="w-3.5 h-3.5" />
          <span>STUDENT PASS RETRIEVAL PORTAL</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
          Find Your <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Event Passes</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
          Registered for a Hack4Tech event? Enter your registered college email below to retrieve your digital QR pass, check live attendance status, or print your ticket.
        </p>
      </div>

      {/* Search Box Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0c101a] border border-cyan-500/30 shadow-neon-cyan">
        <form onSubmit={handleSearch} className="space-y-4">
          <label className="text-xs font-mono uppercase text-gray-400 block font-semibold">
            Registered Email Address (Leader or Team Member)
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="e.g. aryan.sharma@gla.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-900/90 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 text-sm sm:text-base"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-bold text-sm sm:text-base shadow-neon-cyan transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 text-black" />
                  <span>Retrieve Passes</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Demo Pre-fills */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-gray-400">
            <span className="font-mono text-[11px] text-gray-500">Quick Demo Emails:</span>
            <button
              type="button"
              onClick={() => handleQuickLookup('aryan.sharma@gla.ac.in')}
              className="px-2.5 py-1 rounded-lg bg-gray-900 hover:bg-gray-800 text-cyan-300 border border-gray-800 transition-colors"
            >
              aryan.sharma@gla.ac.in (VisionX)
            </button>
            <button
              type="button"
              onClick={() => handleQuickLookup('ananya.joshi@gla.ac.in')}
              className="px-2.5 py-1 rounded-lg bg-gray-900 hover:bg-gray-800 text-purple-300 border border-gray-800 transition-colors"
            >
              ananya.joshi@gla.ac.in (RavenX)
            </button>
            <button
              type="button"
              onClick={() => handleQuickLookup('devansh.dixit@gla.ac.in')}
              className="px-2.5 py-1 rounded-lg bg-gray-900 hover:bg-gray-800 text-pink-300 border border-gray-800 transition-colors"
            >
              devansh.dixit@gla.ac.in (Ignix 2.0)
            </button>
          </div>
        </form>
      </div>

      {/* Error View */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-950/60 border border-red-800 text-red-200 text-sm flex items-center gap-2.5">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Results Section */}
      {hasSearched && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <span>Found Passes</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                {results.length}
              </span>
            </h3>
            {results.length > 0 && (
              <span className="text-xs text-gray-400">Click any pass to view full QR ticket</span>
            )}
          </div>

          {results.length === 0 ? (
            <div className="p-10 rounded-3xl bg-[#0c101a] border border-gray-800 text-center space-y-4">
              <Ticket className="w-12 h-12 text-gray-600 mx-auto" />
              <h4 className="text-lg font-bold text-white">No Registered Passes Found</h4>
              <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto">
                No active registrations were found for <span className="text-cyan-400 font-mono">{email}</span>. Please make sure you entered the exact email used during registration.
              </p>
              <button
                onClick={onExploreEvents}
                className="mt-2 px-6 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition-all inline-flex items-center gap-2"
              >
                <span>Browse Upcoming Events & Register</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {results.map((reg) => (
                <div
                  key={reg.id}
                  onClick={() => onOpenPass(reg)}
                  className="p-5 rounded-2xl bg-[#0c101a] hover:bg-[#111624] border border-gray-800 hover:border-cyan-500/50 transition-all cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-950/80 border border-cyan-800/80 flex flex-col items-center justify-center text-cyan-300 font-mono shrink-0 group-hover:scale-105 transition-transform">
                      <Ticket className="w-6 h-6 text-cyan-400" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-cyan-400">
                          {reg.ticketId}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                            reg.status === 'CHECKED_IN'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                              : reg.status === 'LATE'
                              ? 'bg-amber-950 text-amber-300 border border-amber-700'
                              : 'bg-blue-950 text-blue-300 border border-blue-700'
                          }`}
                        >
                          {reg.status}
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mt-0.5">
                        {reg.event?.title || 'Hack4Tech Event'}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mt-1">
                        <span>Lead: <strong className="text-gray-200">{reg.leaderName}</strong></span>
                        {reg.teamName && (
                          <>
                            <span>•</span>
                            <span>Team: <strong className="text-purple-300">{reg.teamName}</strong></span>
                          </>
                        )}
                        <span>•</span>
                        <span>Roll: <strong className="text-gray-200">{reg.rollNo}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-0 border-gray-800">
                    <div className="text-left sm:text-right text-xs">
                      <p className="text-gray-400">{reg.event?.date || 'Upcoming'}</p>
                      <p className="text-[11px] text-gray-500 truncate max-w-[140px]">{reg.event?.venue}</p>
                    </div>

                    <button className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm">
                      <span>View Pass</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
