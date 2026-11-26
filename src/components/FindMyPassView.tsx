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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-purple-100 text-purple-900 border border-purple-200">
          <Ticket className="w-3.5 h-3.5 text-purple-600" />
          <span>STUDENT SELF-SERVE PASS RETRIEVAL</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-purple-950 tracking-tight">
          Retrieve Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600">Event Passes</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          Registered for a Hack4Tech event? Enter your registered college email below to retrieve your tamper-proof QR pass, verify attendance status, or print your ticket pass.
        </p>
      </div>

      {/* Search Box Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-purple-200 shadow-pastel-card">
        <form onSubmit={handleSearch} className="space-y-4">
          <label className="text-xs font-mono uppercase text-slate-500 block font-bold">
            Registered Email Address (Leader or Team Member)
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="e.g. aryan.sharma@gla.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-purple-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white text-sm sm:text-base transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm sm:text-base shadow-pastel-purple transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 text-white" />
                  <span>Retrieve Passes</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Demo Pre-fills */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-mono text-[11px] font-bold text-slate-400">Quick Demo Emails:</span>
            <button
              type="button"
              onClick={() => handleQuickLookup('aryan.sharma@gla.ac.in')}
              className="px-3 py-1 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 transition-colors font-medium"
            >
              aryan.sharma@gla.ac.in (VisionX)
            </button>
            <button
              type="button"
              onClick={() => handleQuickLookup('ananya.joshi@gla.ac.in')}
              className="px-3 py-1 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-800 border border-pink-200 transition-colors font-medium"
            >
              ananya.joshi@gla.ac.in (RavenX)
            </button>
            <button
              type="button"
              onClick={() => handleQuickLookup('devansh.dixit@gla.ac.in')}
              className="px-3 py-1 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 transition-colors font-medium"
            >
              devansh.dixit@gla.ac.in (Ignix 2.0)
            </button>
          </div>
        </form>
      </div>

      {/* Error View */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center gap-2.5">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Results Section */}
      {hasSearched && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-purple-950 font-display flex items-center gap-2">
              <span>Found Passes</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-100 text-purple-900 border border-purple-200">
                {results.length}
              </span>
            </h3>
            {results.length > 0 && (
              <span className="text-xs text-slate-500">Click any pass to view full QR ticket</span>
            )}
          </div>

          {results.length === 0 ? (
            <div className="p-10 rounded-3xl bg-white border border-purple-200 text-center space-y-4 shadow-sm">
              <Ticket className="w-12 h-12 text-purple-300 mx-auto" />
              <h4 className="text-lg font-bold text-purple-950">No Registered Passes Found</h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                No active registrations were found for <span className="text-purple-700 font-mono font-semibold">{email}</span>. Please make sure you entered the exact email used during registration.
              </p>
              <button
                onClick={onExploreEvents}
                className="mt-2 px-6 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-bold transition-all inline-flex items-center gap-2"
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
                  className="p-5 rounded-3xl bg-white hover:bg-purple-50/40 border border-purple-200 hover:border-purple-300 transition-all cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-pastel-card"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-purple-100 border border-purple-200 flex flex-col items-center justify-center text-purple-800 font-mono shrink-0 group-hover:scale-105 transition-transform">
                      <Ticket className="w-6 h-6 text-purple-600" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-purple-700">
                          {reg.ticketId}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase ${
                            reg.status === 'CHECKED_IN'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : reg.status === 'LATE'
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-blue-100 text-blue-800 border border-blue-300'
                          }`}
                        >
                          {reg.status}
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-purple-950 group-hover:text-purple-700 transition-colors mt-0.5">
                        {reg.event?.title || 'Hack4Tech Event'}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-500 mt-1">
                        <span>Lead: <strong className="text-slate-800">{reg.leaderName}</strong></span>
                        {reg.teamName && (
                          <>
                            <span>•</span>
                            <span>Team: <strong className="text-pink-700">{reg.teamName}</strong></span>
                          </>
                        )}
                        <span>•</span>
                        <span>Roll: <strong className="text-slate-800">{reg.rollNo}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-0 border-purple-100">
                    <div className="text-left sm:text-right text-xs">
                      <p className="text-slate-600 font-medium">{reg.event?.date || 'Upcoming'}</p>
                      <p className="text-[11px] text-slate-400 truncate max-w-[140px]">{reg.event?.venue}</p>
                    </div>

                    <button className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm">
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