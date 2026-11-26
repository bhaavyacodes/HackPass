import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { 
  Camera, 
  CameraOff, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Search, 
  ShieldAlert, 
  Volume2, 
  User, 
  Users, 
  RefreshCw, 
  Ticket, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EventItem, Registration } from '../types';
import { api } from '../services/api';
import { playSuccessSound, playDuplicateWarningSound, playLateWarningSound } from '../utils/sound';

interface QRScannerViewProps {
  events: EventItem[];
  onOpenPassModal: (reg: Registration) => void;
}

export const QRScannerView: React.FC<QRScannerViewProps> = ({
  events,
  onOpenPassModal,
}) => {
  const [selectedEventId, setSelectedEventId] = useState<string>('all');
  const [stationName, setStationName] = useState<string>('Gate Scanner Station 1');
  const [scannerActive, setScannerActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  // Scanning modes
  const [markAsLate, setMarkAsLate] = useState<boolean>(false);

  // Manual code input
  const [manualCode, setManualCode] = useState<string>('');
  const [processing, setProcessing] = useState<boolean>(false);

  // Scan result state
  const [lastScanResult, setLastScanResult] = useState<{
    type: 'SUCCESS' | 'DUPLICATE' | 'LATE' | 'ERROR';
    message: string;
    registration?: Registration;
    event?: EventItem;
    previousCheckIn?: { time: string; station: string; status: string };
    timestamp: string;
  } | null>(null);

  // Quick search & manual list
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [recentRegistrations, setRecentRegistrations] = useState<Registration[]>([]);
  const [filteredList, setFilteredList] = useState<Registration[]>([]);
  const [loadingList, setLoadingList] = useState<boolean>(false);

  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const isScanningRef = useRef<boolean>(false);
  const lastScannedCodeRef = useRef<string>('');
  const lastScannedTimeRef = useRef<number>(0);

  // Load registrations for quick manual marking
  const loadRecentRegistrations = async () => {
    try {
      setLoadingList(true);
      const data = await api.getRegistrations({
        eventId: selectedEventId === 'all' ? undefined : selectedEventId,
      });
      setRecentRegistrations(data);
      setFilteredList(data.slice(0, 8));
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    loadRecentRegistrations();
  }, [selectedEventId]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredList(recentRegistrations.slice(0, 8));
      return;
    }
    const q = searchTerm.toLowerCase();
    const filtered = recentRegistrations.filter(
      r =>
        r.ticketId.toLowerCase().includes(q) ||
        r.leaderName.toLowerCase().includes(q) ||
        r.rollNo.toLowerCase().includes(q) ||
        (r.teamName && r.teamName.toLowerCase().includes(q))
    );
    setFilteredList(filtered.slice(0, 10));
  }, [searchTerm, recentRegistrations]);

  // Handle verification of a code (from QR or manual entry)
  const handleVerifyTicket = async (rawCode: string) => {
    if (!rawCode || processing) return;

    let ticketId = rawCode.trim();

    // If QR payload contains JSON, parse out ticketId
    if (ticketId.startsWith('{') && ticketId.includes('ticketId')) {
      try {
        const parsed = JSON.parse(ticketId);
        if (parsed.ticketId) {
          ticketId = parsed.ticketId;
        }
      } catch (e) {}
    }

    // Debounce duplicate scans of the exact same code within 3 seconds
    const now = Date.now();
    if (lastScannedCodeRef.current === ticketId && now - lastScannedTimeRef.current < 2500) {
      return;
    }
    lastScannedCodeRef.current = ticketId;
    lastScannedTimeRef.current = now;

    setProcessing(true);

    try {
      const res = await api.scanPass({
        ticketId,
        station: stationName,
        forceMode: markAsLate ? 'mark_late' : undefined,
        activeEventId: selectedEventId !== 'all' ? selectedEventId : undefined,
      });

      if (res.code === 'CHECK_IN_SUCCESS') {
        if (res.isLate) {
          playLateWarningSound();
          setLastScanResult({
            type: 'LATE',
            message: res.message,
            registration: res.data,
            event: res.event,
            timestamp: new Date().toLocaleTimeString(),
          });
        } else {
          playSuccessSound();
          try {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.6 },
            });
          } catch (e) {}
          setLastScanResult({
            type: 'SUCCESS',
            message: res.message,
            registration: res.data,
            event: res.event,
            timestamp: new Date().toLocaleTimeString(),
          });
        }
      } else if (res.code === 'DUPLICATE_CHECKIN') {
        playDuplicateWarningSound();
        setLastScanResult({
          type: 'DUPLICATE',
          message: res.message,
          registration: res.data,
          event: res.event,
          previousCheckIn: res.previousCheckIn,
          timestamp: new Date().toLocaleTimeString(),
        });
      }

      loadRecentRegistrations();
    } catch (err: any) {
      playDuplicateWarningSound();
      setLastScanResult({
        type: 'ERROR',
        message: err.message || 'Pass verification failed.',
        timestamp: new Date().toLocaleTimeString(),
      });
    } finally {
      setProcessing(false);
      setManualCode('');
    }
  };

  // Start Camera QR Scanner
  const startScanner = async () => {
    setCameraError(null);
    try {
      const qrScanner = new Html5Qrcode('qr-reader-container');
      html5QrCodeRef.current = qrScanner;

      await qrScanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        (decodedText) => {
          handleVerifyTicket(decodedText);
        },
        (errorMessage) => {
          // Normal frame scan tick (ignore noise)
        }
      );

      setScannerActive(true);
      isScanningRef.current = true;
    } catch (err: any) {
      console.error('Camera start error:', err);
      setCameraError(
        'Unable to access camera. Please allow camera permissions or use the manual code entry input.'
      );
      setScannerActive(false);
    }
  };

  // Stop Camera QR Scanner
  const stopScanner = async () => {
    if (html5QrCodeRef.current && isScanningRef.current) {
      try {
        await html5QrCodeRef.current.stop();
        html5QrCodeRef.current.clear();
      } catch (e) {
        console.error(e);
      }
      html5QrCodeRef.current = null;
      isScanningRef.current = false;
      setScannerActive(false);
    }
  };

  useEffect(() => {
    return () => {
      if (html5QrCodeRef.current && isScanningRef.current) {
        html5QrCodeRef.current.stop().catch(() => {});
      }
    };
  }, []);

  // Manual Status Override (Mark Present, Late, Absent)
  const handleManualStatusChange = async (
    reg: Registration,
    newStatus: 'REGISTERED' | 'CHECKED_IN' | 'LATE' | 'ABSENT'
  ) => {
    try {
      const updated = await api.updateRegistrationStatus(
        reg.id,
        newStatus,
        `Manual status updated to ${newStatus}`,
        stationName
      );
      if (newStatus === 'CHECKED_IN') playSuccessSound();
      else if (newStatus === 'LATE') playLateWarningSound();

      setLastScanResult({
        type: newStatus === 'LATE' ? 'LATE' : newStatus === 'CHECKED_IN' ? 'SUCCESS' : 'ERROR',
        message: `Manually marked ${reg.leaderName} as ${newStatus}`,
        registration: updated,
        timestamp: new Date().toLocaleTimeString(),
      });

      loadRecentRegistrations();
    } catch (e: any) {
      alert(e.message || 'Status change failed');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              Live Gate Attendance & QR Verification
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white mt-1">
            Real-Time QR Attendance Terminal
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Scan attendee QR passes with camera or barcode scanner. Automatically verifies passes and prevents duplicate entry.
          </p>
        </div>

        {/* Station Name & Event Filter */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-900 border border-gray-800 text-xs text-gray-300">
            <span className="text-gray-500 font-mono">Gate:</span>
            <input
              type="text"
              value={stationName}
              onChange={(e) => setStationName(e.target.value)}
              className="bg-transparent text-white focus:outline-none font-semibold w-36"
            />
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-900 border border-gray-800 text-xs">
            <span className="text-gray-500 font-mono">Event:</span>
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="bg-transparent text-cyan-300 font-semibold focus:outline-none"
            >
              <option value="all" className="bg-[#0c101a] text-white">All Active Events</option>
              {events.map((ev) => (
                <option key={ev.id} value={ev.id} className="bg-[#0c101a] text-white">
                  {ev.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Scanner Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Camera Viewfinder & Manual Barcode Input (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Camera Card */}
          <div className="p-6 rounded-3xl bg-[#0c101a] border border-gray-800 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white font-display">
                  Live Camera Scanner
                </h3>
              </div>

              {/* Late Arrival Toggle */}
              <label className="flex items-center gap-2 px-3 py-1 rounded-xl bg-gray-900 border border-gray-800 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={markAsLate}
                  onChange={(e) => setMarkAsLate(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-amber-400 h-3.5 w-3.5 bg-gray-800 border-gray-700"
                />
                <span className={markAsLate ? 'text-amber-300 font-bold' : 'text-gray-400'}>
                  Mark as Late Arrival
                </span>
              </label>
            </div>

            {/* Viewfinder Container */}
            <div className="relative w-full aspect-video rounded-2xl bg-black/80 border border-gray-800 flex flex-col items-center justify-center overflow-hidden">
              <div id="qr-reader-container" className="w-full h-full"></div>

              {!scannerActive && (
                <div className="text-center p-6 space-y-3 z-10">
                  <div className="w-16 h-16 rounded-full bg-cyan-950/80 border border-cyan-800/80 flex items-center justify-center mx-auto text-cyan-400">
                    <Camera className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Camera is currently inactive</p>
                    <p className="text-xs text-gray-500 max-w-xs mx-auto mt-1">
                      Start webcam or mobile back camera for rapid continuous QR code scanning.
                    </p>
                  </div>
                  <button
                    onClick={startScanner}
                    className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs shadow-neon-cyan transition-all inline-flex items-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Activate Camera</span>
                  </button>
                </div>
              )}

              {scannerActive && (
                <div className="absolute top-3 left-3 z-20 flex items-center gap-2 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-emerald-500/40 text-[11px] font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>LIVE SCANNING ACTIVE</span>
                </div>
              )}
            </div>

            {/* Camera Controls */}
            {scannerActive && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-gray-400">
                  Align QR pass within the viewfinder box.
                </p>
                <button
                  onClick={stopScanner}
                  className="px-4 py-1.5 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <CameraOff className="w-3.5 h-3.5" />
                  <span>Stop Camera</span>
                </button>
              </div>
            )}

            {cameraError && (
              <div className="mt-3 p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-xs">
                {cameraError}
              </div>
            )}

          </div>

          {/* Manual Barcode / Ticket Code Input */}
          <div className="p-6 rounded-3xl bg-[#0c101a] border border-gray-800 space-y-3">
            <h4 className="text-sm font-bold text-white font-display flex items-center gap-2">
              <Ticket className="w-4 h-4 text-cyan-400" />
              <span>Manual Code Lookup / Barcode Gun Input</span>
            </h4>
            <p className="text-xs text-gray-400">
              Type or scan ticket ID with a USB barcode reader (e.g. <span className="font-mono text-cyan-300">H4T-VX-91823</span>).
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleVerifyTicket(manualCode);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="Enter Ticket ID (e.g. H4T-VX-91823)"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-gray-900/80 border border-gray-700 text-white placeholder-gray-500 font-mono text-sm focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                disabled={processing || !manualCode.trim()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-bold text-xs sm:text-sm shadow-neon-cyan transition-all disabled:opacity-50 flex items-center gap-1.5"
              >
                <span>Verify</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Right Column: Scan Result Alert Banner & Attendee Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Scan Status Feedback Screen */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-gray-400">
              Instant Verification Result
            </h3>

            {!lastScanResult && (
              <div className="p-8 rounded-3xl bg-[#0c101a] border border-dashed border-gray-800 text-center space-y-3">
                <Camera className="w-10 h-10 text-gray-600 mx-auto" />
                <p className="text-sm font-medium text-gray-400">
                  Ready to scan passes. Results and duplicate warnings will appear here instantly.
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-cyan-400 font-mono">
                  <span>Audio Feedback Enabled</span>
                  <Volume2 className="w-3.5 h-3.5" />
                </div>
              </div>
            )}

            {/* DUPLICATE CHECK-IN ALERT */}
            {lastScanResult?.type === 'DUPLICATE' && (
              <div className="p-6 rounded-3xl bg-red-950/70 border-2 border-red-500 shadow-lg shadow-red-900/50 space-y-4 animate-bounce-short">
                <div className="flex items-center gap-3 text-red-200">
                  <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-lg">
                    <ShieldAlert className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black uppercase bg-red-900 text-red-200 border border-red-700">
                      DUPLICATE BLOCKED
                    </span>
                    <h3 className="text-lg font-black font-display text-white mt-0.5">
                      ALREADY CHECKED IN!
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-red-200 leading-relaxed">
                  {lastScanResult.message}
                </p>

                {lastScanResult.previousCheckIn && (
                  <div className="p-3.5 rounded-2xl bg-red-900/40 border border-red-700/60 text-xs space-y-1.5 font-mono">
                    <div className="flex justify-between text-red-300">
                      <span>Prior Check-in:</span>
                      <strong className="text-white">
                        {new Date(lastScanResult.previousCheckIn.time).toLocaleTimeString()}
                      </strong>
                    </div>
                    <div className="flex justify-between text-red-300">
                      <span>Verified Station:</span>
                      <strong className="text-white">
                        {lastScanResult.previousCheckIn.station}
                      </strong>
                    </div>
                  </div>
                )}

                {lastScanResult.registration && (
                  <div className="pt-2 border-t border-red-800/80 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">{lastScanResult.registration.leaderName}</p>
                      <p className="text-[11px] text-red-300 font-mono">{lastScanResult.registration.ticketId}</p>
                    </div>
                    <button
                      onClick={() => onOpenPassModal(lastScanResult.registration!)}
                      className="px-3 py-1.5 rounded-xl bg-red-900/80 hover:bg-red-800 text-xs font-semibold text-white border border-red-700"
                    >
                      Inspect Pass
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* SUCCESS CHECK-IN CARD */}
            {lastScanResult?.type === 'SUCCESS' && (
              <div className="p-6 rounded-3xl bg-emerald-950/70 border-2 border-emerald-500 shadow-neon-cyan space-y-4">
                <div className="flex items-center gap-3 text-emerald-200">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-black flex items-center justify-center shrink-0 shadow-lg">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black uppercase bg-emerald-900 text-emerald-200 border border-emerald-700">
                      PASS VERIFIED
                    </span>
                    <h3 className="text-lg font-black font-display text-white mt-0.5">
                      WELCOME TO {lastScanResult.event?.title || 'HACK4TECH'}!
                    </h3>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-900/30 border border-emerald-700/60 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-emerald-300 font-mono">Participant:</span>
                    <strong className="text-white text-sm">{lastScanResult.registration?.leaderName}</strong>
                  </div>
                  {lastScanResult.registration?.teamName && (
                    <div className="flex justify-between">
                      <span className="text-emerald-300 font-mono">Team:</span>
                      <strong className="text-purple-300 font-bold">{lastScanResult.registration.teamName}</strong>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-emerald-300 font-mono">Roll Number:</span>
                    <span className="text-white font-mono">{lastScanResult.registration?.rollNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300 font-mono">Event:</span>
                    <span className="text-cyan-300">{lastScanResult.event?.title}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-emerald-800/80">
                    <span className="text-emerald-300 font-mono">Timestamp:</span>
                    <span className="text-emerald-200 font-mono">{lastScanResult.timestamp}</span>
                  </div>
                </div>

                {lastScanResult.registration && (
                  <button
                    onClick={() => onOpenPassModal(lastScanResult.registration!)}
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow transition-all flex items-center justify-center gap-2"
                  >
                    <span>View Digital Event Pass</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            {/* LATE ARRIVAL CARD */}
            {lastScanResult?.type === 'LATE' && (
              <div className="p-6 rounded-3xl bg-amber-950/70 border-2 border-amber-500 shadow-lg shadow-amber-900/50 space-y-4">
                <div className="flex items-center gap-3 text-amber-200">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-black flex items-center justify-center shrink-0 shadow-lg">
                    <Clock className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black uppercase bg-amber-900 text-amber-200 border border-amber-700">
                      FLAGGED LATE
                    </span>
                    <h3 className="text-lg font-black font-display text-white mt-0.5">
                      LATE ARRIVAL CHECK-IN
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-amber-200">
                  Attendee checked in after scheduled commencement time. Logged with late arrival timestamp.
                </p>

                <div className="p-4 rounded-2xl bg-amber-900/30 border border-amber-700/60 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-amber-300 font-mono">Participant:</span>
                    <strong className="text-white text-sm">{lastScanResult.registration?.leaderName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-300 font-mono">Arrival Time:</span>
                    <span className="text-amber-200 font-mono">{lastScanResult.timestamp}</span>
                  </div>
                </div>

                {lastScanResult.registration && (
                  <button
                    onClick={() => onOpenPassModal(lastScanResult.registration!)}
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow transition-all flex items-center justify-center gap-2"
                  >
                    <span>View Digital Event Pass</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            {/* GENERIC ERROR */}
            {lastScanResult?.type === 'ERROR' && (
              <div className="p-6 rounded-3xl bg-red-950/60 border border-red-800 space-y-2">
                <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <span>Invalid or Unrecognized Pass</span>
                </div>
                <p className="text-xs text-red-200">{lastScanResult.message}</p>
              </div>
            )}

          </div>

          {/* Quick Participant Search & Manual Overrides */}
          <div className="p-6 rounded-3xl bg-[#0c101a] border border-gray-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white font-display flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>Quick Manual Attendance Override</span>
              </h4>
              <button
                onClick={loadRecentRegistrations}
                className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Refresh</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search attendee by name, roll no, or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-gray-900/80 border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Attendee List */}
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {filteredList.map((reg) => (
                <div
                  key={reg.id}
                  className="p-3 rounded-xl bg-gray-900/60 border border-gray-800/80 flex items-center justify-between text-xs gap-3 hover:bg-gray-900 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-white">{reg.leaderName}</span>
                      {reg.teamName && (
                        <span className="text-[10px] text-purple-300 font-mono">
                          ({reg.teamName})
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-0.5">
                      <span className="font-mono text-cyan-400">{reg.ticketId}</span>
                      <span>•</span>
                      <span>Roll: {reg.rollNo}</span>
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {reg.status !== 'CHECKED_IN' ? (
                      <button
                        onClick={() => handleManualStatusChange(reg, 'CHECKED_IN')}
                        className="px-2 py-1 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 text-[10px] font-bold"
                        title="Mark Present"
                      >
                        Present
                      </button>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-700">
                        Present ✓
                      </span>
                    )}

                    {reg.status !== 'LATE' && (
                      <button
                        onClick={() => handleManualStatusChange(reg, 'LATE')}
                        className="px-2 py-1 rounded bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-700 text-[10px] font-bold"
                        title="Mark Late"
                      >
                        Late
                      </button>
                    )}

                    {reg.status !== 'ABSENT' && (
                      <button
                        onClick={() => handleManualStatusChange(reg, 'ABSENT')}
                        className="px-2 py-1 rounded bg-red-950 hover:bg-red-900 text-red-300 border border-red-700 text-[10px]"
                        title="Mark Absent"
                      >
                        Absent
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
