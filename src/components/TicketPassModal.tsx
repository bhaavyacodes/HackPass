import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Download, Printer, Copy, Check, ShieldCheck, MapPin, Calendar, Clock, Users, Sparkles, Building2 } from 'lucide-react';
import { Registration, EventItem } from '../types';

interface TicketPassModalProps {
  registration: Registration | null;
  event: EventItem | null;
  onClose: () => void;
}

export const TicketPassModal: React.FC<TicketPassModalProps> = ({
  registration,
  event,
  onClose,
}) => {
  if (!registration) return null;

  const [copied, setCopied] = React.useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  const activeEvent = event || registration.event;
  const isRavenX = activeEvent?.id.includes('ravenx') || activeEvent?.theme === 'gothic-purple';
  const isVisionX = activeEvent?.id.includes('visionx') || activeEvent?.theme === 'cyberpunk';

  // QR Payload: encoded JSON string with verification data
  const qrPayload = JSON.stringify({
    ticketId: registration.ticketId,
    eventId: registration.eventId,
    attendee: registration.leaderName,
    email: registration.leaderEmail,
    rollNo: registration.rollNo,
    type: registration.registrationType,
    team: registration.teamName,
    issuedAt: registration.createdAt,
    org: 'HACK4TECH GLAU'
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(registration.ticketId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[94vh] overflow-y-auto rounded-3xl bg-[#0a0d15] border border-gray-700/80 shadow-2xl text-gray-200">
        
        {/* Modal Controls Header */}
        <div className="no-print flex items-center justify-between p-4 sm:p-5 border-b border-gray-800 bg-[#0c101b]/95">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-mono font-bold uppercase text-emerald-400 tracking-wider">
              Official QR Event Pass
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 flex items-center gap-1.5 border border-gray-700 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-xs text-cyan-300 flex items-center gap-1.5 border border-cyan-500/30 transition-all font-semibold"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Pass</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE PASS CARD */}
        <div className="p-4 sm:p-6">
          <div
            ref={ticketRef}
            className="printable-pass-area relative overflow-hidden rounded-3xl border border-gray-700/90 bg-gradient-to-b from-[#101524] via-[#0c101a] to-[#080b12] p-6 shadow-2xl text-white"
          >
            {/* Background Holographic Glow */}
            <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none ${isRavenX ? 'bg-purple-600' : 'bg-cyan-500'}`}></div>

            {/* Top Pass Brand Header */}
            <div className="flex items-start justify-between border-b border-gray-800/90 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src="/images/logo.jpg"
                  alt="H4T Logo"
                  className="w-12 h-12 rounded-full border-2 border-cyan-400 p-0.5 bg-black"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-lg font-black font-display tracking-wider text-white">
                      HACK4TECH
                    </h3>
                    <span className="px-1.5 py-0.2 text-[9px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800 rounded font-bold">
                      VERIFIED PASS
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    GLA University • Office of Students' Welfare
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="text-right">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider ${
                    registration.status === 'CHECKED_IN'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/60'
                      : registration.status === 'LATE'
                      ? 'bg-amber-950 text-amber-300 border border-amber-500/60'
                      : 'bg-cyan-950 text-cyan-300 border border-cyan-500/60'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping"></span>
                  {registration.status === 'CHECKED_IN'
                    ? 'CHECKED IN'
                    : registration.status === 'LATE'
                    ? 'LATE ARRIVAL'
                    : 'PASS VALID'}
                </span>
                <p className="text-[10px] text-gray-500 font-mono mt-1">ID: {registration.id}</p>
              </div>
            </div>

            {/* Event Title & Subtitle Banner */}
            <div className="py-4 border-b border-gray-800/90">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                {activeEvent?.category || 'Hackathon Sprint'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white tracking-wide mt-0.5">
                {activeEvent?.title || 'VISIONX HACKATHON'}
              </h2>
              <p className="text-xs text-gray-400 font-medium">
                {activeEvent?.tagline || activeEvent?.subtitle}
              </p>
            </div>

            {/* Attendee Details & QR Grid */}
            <div className="py-5 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              
              {/* Attendee Info (2 Cols) */}
              <div className="sm:col-span-2 space-y-3">
                {registration.registrationType === 'team' && registration.teamName && (
                  <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-800/50">
                    <p className="text-[10px] font-mono text-purple-300 uppercase">Team Name</p>
                    <p className="text-base font-bold text-white font-display">
                      {registration.teamName}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-[10px] font-mono text-gray-400 uppercase">Participant / Leader</p>
                    <p className="font-semibold text-white text-sm">{registration.leaderName}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-gray-400 uppercase">University Roll No</p>
                    <p className="font-mono font-semibold text-cyan-300">{registration.rollNo}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-gray-400 uppercase">Department</p>
                    <p className="text-gray-300 truncate">{registration.department}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-gray-400 uppercase">Year / Cohort</p>
                    <p className="text-gray-300">{registration.year}</p>
                  </div>
                </div>

                {/* Team Members List if applicable */}
                {registration.members && registration.members.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-gray-800 text-[11px]">
                    <p className="text-[10px] font-mono text-gray-400 uppercase mb-1">
                      Teammates ({registration.members.length}):
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {registration.members.map((m, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-gray-800/80 text-gray-300 border border-gray-700"
                        >
                          {m.name} ({m.rollNo || 'Member'})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* QR Code Column (1 Col) */}
              <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white text-black shadow-lg">
                <QRCodeSVG
                  value={qrPayload}
                  size={150}
                  level="H"
                  includeMargin={false}
                  className="rounded-lg"
                />
                <div className="mt-2 text-center">
                  <span className="text-[11px] font-mono font-extrabold tracking-widest text-black block">
                    {registration.ticketId}
                  </span>
                  <span className="text-[8px] font-mono text-gray-500 uppercase">
                    Scan for Live Check-In
                  </span>
                </div>
              </div>

            </div>

            {/* Event Logistics Strip */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-black/40 border border-gray-800/80 text-center text-xs">
              <div>
                <Calendar className="w-3.5 h-3.5 text-cyan-400 mx-auto mb-0.5" />
                <p className="text-[9px] text-gray-400 font-mono uppercase">Date</p>
                <p className="font-semibold text-gray-200 text-[11px]">{activeEvent?.date || '20 April 2026'}</p>
              </div>
              <div>
                <Clock className="w-3.5 h-3.5 text-purple-400 mx-auto mb-0.5" />
                <p className="text-[9px] text-gray-400 font-mono uppercase">Time</p>
                <p className="font-semibold text-gray-200 text-[11px]">{activeEvent?.time || '9:00 AM'}</p>
              </div>
              <div>
                <MapPin className="w-3.5 h-3.5 text-pink-400 mx-auto mb-0.5" />
                <p className="text-[9px] text-gray-400 font-mono uppercase">Venue</p>
                <p className="font-semibold text-gray-200 text-[11px] truncate">{activeEvent?.venue || 'CSED Block'}</p>
              </div>
            </div>

            {/* Check-In History / Audit if already scanned */}
            {registration.checkedInAt && (
              <div className="mt-3 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Checked-in at {new Date(registration.checkedInAt).toLocaleTimeString()}</span>
                </span>
                <span className="font-mono text-[10px] text-emerald-400">{registration.checkedInBy}</span>
              </div>
            )}

            {/* Footer Barcode Simulation */}
            <div className="mt-4 pt-3 border-t border-dashed border-gray-800 flex items-center justify-between text-[10px] text-gray-400 font-mono">
              <span>H4T-AUTH-{registration.ticketId}</span>
              <span>SHOW THIS PASS AT GATE RECEPTION</span>
              <span>BYOD • LEAVE APPROVED</span>
            </div>

          </div>

          {/* Quick Guidance Note */}
          <p className="text-center text-xs text-gray-400 mt-4 no-print">
            💡 Take a screenshot or print this pass. You can also re-retrieve your pass anytime using the <strong className="text-cyan-400">"Find My Pass"</strong> page.
          </p>
        </div>

      </div>
    </div>
  );
};
