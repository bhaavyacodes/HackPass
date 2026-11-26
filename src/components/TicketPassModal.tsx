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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-pink-50/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[94vh] overflow-y-auto rounded-3xl bg-white border border-purple-200 shadow-2xl text-purple-950">
        
        {/* Modal Controls Header */}
        <div className="no-print flex items-center justify-between p-4 sm:p-5 border-b border-purple-200 bg-white/95">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-mono font-bold uppercase text-emerald-700 tracking-wider">
              Official QR Event Pass
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-xs text-purple-950 flex items-center gap-1.5 border border-purple-200 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-xs text-purple-800 flex items-center gap-1.5 border border-purple-200 transition-all font-semibold"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Pass</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-purple-50 text-slate-500 hover:text-purple-950 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE PASS CARD */}
        <div className="p-4 sm:p-6">
          <div
            ref={ticketRef}
            className="printable-pass-area relative overflow-hidden rounded-3xl border border-purple-200 bg-gradient-to-b from-pink-100 via-white to-pink-50 p-6 shadow-2xl text-purple-950"
          >
            {/* Background Holographic Glow */}
            <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none ${isRavenX ? 'bg-purple-600' : 'bg-cyan-500'}`}></div>

            {/* Top Pass Brand Header */}
            <div className="flex items-start justify-between border-b border-purple-200 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src="/images/logo.jpg"
                  alt="H4T Logo"
                  className="w-12 h-12 rounded-full border-2 border-cyan-400 p-0.5 bg-black"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-lg font-black font-display tracking-wider text-purple-950">
                      HACK4TECH
                    </h3>
                    <span className="px-1.5 py-0.2 text-[9px] font-mono bg-cyan-50 text-cyan-800 border border-cyan-200 rounded font-bold">
                      VERIFIED PASS
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    GLA University • Office of Students' Welfare
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="text-right">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider ${
                    registration.status === 'CHECKED_IN'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : registration.status === 'LATE'
                      ? 'bg-amber-100 text-amber-900 border border-amber-200'
                      : 'bg-purple-50 text-purple-800 border border-purple-200'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping"></span>
                  {registration.status === 'CHECKED_IN'
                    ? 'CHECKED IN'
                    : registration.status === 'LATE'
                    ? 'LATE ARRIVAL'
                    : 'PASS VALID'}
                </span>
                <p className="text-[10px] text-slate-500 font-mono mt-1">ID: {registration.id}</p>
              </div>
            </div>

            {/* Event Title & Subtitle Banner */}
            <div className="py-4 border-b border-purple-200">
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-700 font-bold">
                {activeEvent?.category || 'Hackathon Sprint'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-purple-950 tracking-wide mt-0.5">
                {activeEvent?.title || 'VISIONX HACKATHON'}
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                {activeEvent?.tagline || activeEvent?.subtitle}
              </p>
            </div>

            {/* Attendee Details & QR Grid */}
            <div className="py-5 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              
              {/* Attendee Info (2 Cols) */}
              <div className="sm:col-span-2 space-y-3">
                {registration.registrationType === 'team' && registration.teamName && (
                  <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200">
                    <p className="text-[10px] font-mono text-purple-700 uppercase">Team Name</p>
                    <p className="text-base font-bold text-purple-950 font-display">
                      {registration.teamName}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-[10px] font-mono text-slate-600 uppercase">Participant / Leader</p>
                    <p className="font-semibold text-purple-950 text-sm">{registration.leaderName}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-600 uppercase">University Roll No</p>
                    <p className="font-mono font-semibold text-purple-800">{registration.rollNo}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-600 uppercase">Department</p>
                    <p className="text-slate-700 truncate">{registration.department}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-600 uppercase">Year / Cohort</p>
                    <p className="text-slate-700">{registration.year}</p>
                  </div>
                </div>

                {/* Team Members List if applicable */}
                {registration.members && registration.members.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-purple-200 text-[11px]">
                    <p className="text-[10px] font-mono text-slate-600 uppercase mb-1">
                      Teammates ({registration.members.length}):
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {registration.members.map((m, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-pink-50 text-purple-900 border border-purple-200"
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
            <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-white/75 border border-purple-200 text-center text-xs">
              <div>
                <Calendar className="w-3.5 h-3.5 text-purple-700 mx-auto mb-0.5" />
                <p className="text-[9px] text-slate-600 font-mono uppercase">Date</p>
                <p className="font-semibold text-slate-800 text-[11px]">{activeEvent?.date || '20 April 2026'}</p>
              </div>
              <div>
                <Clock className="w-3.5 h-3.5 text-purple-700 mx-auto mb-0.5" />
                <p className="text-[9px] text-slate-600 font-mono uppercase">Time</p>
                <p className="font-semibold text-slate-800 text-[11px]">{activeEvent?.time || '9:00 AM'}</p>
              </div>
              <div>
                <MapPin className="w-3.5 h-3.5 text-pink-700 mx-auto mb-0.5" />
                <p className="text-[9px] text-slate-600 font-mono uppercase">Venue</p>
                <p className="font-semibold text-slate-800 text-[11px] truncate">{activeEvent?.venue || 'CSED Block'}</p>
              </div>
            </div>

            {/* Check-In History / Audit if already scanned */}
            {registration.checkedInAt && (
              <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Checked-in at {new Date(registration.checkedInAt).toLocaleTimeString()}</span>
                </span>
                <span className="font-mono text-[10px] text-emerald-900">{registration.checkedInBy}</span>
              </div>
            )}

            {/* Footer Barcode Simulation */}
            <div className="mt-4 pt-3 border-t border-dashed border-purple-200 flex items-center justify-between text-[10px] text-slate-600 font-mono">
              <span>H4T-AUTH-{registration.ticketId}</span>
              <span>SHOW THIS PASS AT GATE RECEPTION</span>
              <span>BYOD • LEAVE APPROVED</span>
            </div>

          </div>

          {/* Quick Guidance Note */}
          <p className="text-center text-xs text-slate-600 mt-4 no-print">
            💡 Take a screenshot or print this pass. You can also re-retrieve your pass anytime using the <strong className="text-purple-700">"Find My Pass"</strong> page.
          </p>
        </div>

      </div>
    </div>
  );
};
