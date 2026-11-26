import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Workflow, 
  ShieldAlert, 
  TrendingUp, 
  Rocket, 
  QrCode, 
  Ticket, 
  Clock, 
  Award,
  Zap,
  Building2,
  Users,
  Database,
  ArrowRight,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';

export const PresentationView: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // SLIDE 1: TITLE SLIDE
    {
      id: 'title',
      badge: 'OFFICIAL PROJECT PRESENTATION',
      title: 'EVENTHUB SMART EVENT MANAGEMENT SYSTEM',
      subtitle: 'Next-Generation Centralized Tech Event Ecosystem for Hack4Tech (H4T)',
      tagline: 'GLA University • Office of Students\' Welfare • NAAC A+ Accredited',
      render: () => (
        <div className="space-y-8 text-center max-w-4xl mx-auto py-6">
          <div className="flex items-center justify-center gap-4">
            <div className="w-20 h-20 rounded-full border-2 border-cyan-400 p-1 bg-black shadow-neon-cyan">
              <img src="/images/logo.jpg" alt="H4T Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="text-left">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                GLA UNIVERSITY EMS 2.0
              </span>
              <h3 className="text-2xl font-black font-display text-white mt-1">HACK4TECH</h3>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight leading-tight">
            CENTRALIZED EVENT <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              MANAGEMENT & ATTENDANCE
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Eliminating fragmented registrations, gate congestion, ticket fraud, and manual attendance tracking through tamper-proof QR event passes and a real-time anti-duplicate command terminal.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-4 text-left">
            <div className="p-3.5 rounded-2xl bg-gray-900/80 border border-gray-800">
              <span className="text-[10px] font-mono text-gray-400 uppercase">Live Flagship Events</span>
              <p className="text-base font-bold text-cyan-400 font-mono mt-0.5">VisionX, RavenX, Ignix</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-gray-900/80 border border-gray-800">
              <span className="text-[10px] font-mono text-gray-400 uppercase">Verification Engine</span>
              <p className="text-base font-bold text-purple-400 font-mono mt-0.5">Instant QR Pass Passcode</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-gray-900/80 border border-gray-800">
              <span className="text-[10px] font-mono text-gray-400 uppercase">Gate Security</span>
              <p className="text-base font-bold text-red-400 font-mono mt-0.5">100% Anti-Duplicate Lock</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-gray-900/80 border border-gray-800">
              <span className="text-[10px] font-mono text-gray-400 uppercase">Campus Sync</span>
              <p className="text-base font-bold text-emerald-400 font-mono mt-0.5">Official Duty Leave</p>
            </div>
          </div>
        </div>
      )
    },

    // SLIDE 2: THE PROBLEM STATEMENT
    {
      id: 'problem',
      badge: 'BACKGROUND & PAIN POINTS',
      title: 'THE PROBLEM STATEMENT',
      subtitle: 'Why University Event Management Breaks Down at Scale',
      tagline: 'Traditional campus events suffer from severe operational friction and fraud vulnerability.',
      render: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto py-2">
          <div className="p-5 rounded-2xl bg-red-950/30 border border-red-800/60 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-900/80 text-red-300 flex items-center justify-center font-bold">1</div>
              <h4 className="text-base font-bold text-white font-display">Fragmented Google Forms Chaos</h4>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Events rely on arbitrary Google Forms scattered across WhatsApp groups. Responses get lost, data schemas are inconsistent, and team leaders cannot easily update teammate details.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-red-950/30 border border-red-800/60 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-900/80 text-red-300 flex items-center justify-center font-bold">2</div>
              <h4 className="text-base font-bold text-white font-display">Gate Congestion & Manual Tick-off</h4>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Volunteers scroll through 500+ spreadsheet rows or tick paper lists at the entrance. Attendees wait 30-45 minutes in lines, delaying hackathon commencement and causing chaos.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-red-950/30 border border-red-800/60 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-900/80 text-red-300 flex items-center justify-center font-bold">3</div>
              <h4 className="text-base font-bold text-white font-display">Ticket Fraud & Proxy Refreshment Claims</h4>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Without cryptographic passes, students share screenshot confirmations, claim multiple food coupons and swags, or check in multiple times across different entrance gates.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-red-950/30 border border-red-800/60 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-900/80 text-red-300 flex items-center justify-center font-bold">4</div>
              <h4 className="text-base font-bold text-white font-display">Disconnected Duty Leave Approvals</h4>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Organizers spend days cross-referencing who actually attended versus who just registered, causing friction with the academic registrar and delayed duty leave approvals.
            </p>
          </div>
        </div>
      )
    },

    // SLIDE 3: EXISTING SOLUTIONS VS EVENTHUB
    {
      id: 'comparison',
      badge: 'MARKET & ALTERNATIVES ANALYSIS',
      title: 'EXISTING SOLUTIONS VS. EVENTHUB',
      subtitle: 'Why Off-The-Shelf Platforms Fail Collegiate Realities',
      tagline: 'Generic commercial tools do not fit Indian university academic structures.',
      render: () => (
        <div className="max-w-5xl mx-auto py-2">
          <div className="rounded-2xl border border-gray-800 overflow-hidden bg-[#0c101a] shadow-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-900 text-gray-400 font-mono uppercase text-[11px] border-b border-gray-800">
                <tr>
                  <th className="p-3.5">Capability / Feature</th>
                  <th className="p-3.5 text-center">Google Forms</th>
                  <th className="p-3.5 text-center">Eventbrite / Luma</th>
                  <th className="p-3.5 text-center">Unstop</th>
                  <th className="p-3.5 text-center text-cyan-400 bg-cyan-950/40">EventHub EMS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/80 text-gray-300">
                <tr>
                  <td className="p-3.5 font-semibold text-white">Dynamic Team & Roll No Ingestion</td>
                  <td className="p-3.5 text-center text-red-400">Manual / Clunky</td>
                  <td className="p-3.5 text-center text-red-400">No (Solo bias)</td>
                  <td className="p-3.5 text-center text-emerald-400">Yes</td>
                  <td className="p-3.5 text-center text-cyan-300 font-bold bg-cyan-950/20">Native GLA Hierarchy</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Instant QR Pass with Digital Card</td>
                  <td className="p-3.5 text-center text-red-400">None</td>
                  <td className="p-3.5 text-center text-emerald-400">Yes</td>
                  <td className="p-3.5 text-center text-amber-400">In-App Only</td>
                  <td className="p-3.5 text-center text-cyan-300 font-bold bg-cyan-950/20">Instant QR + Print Sheet</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Real-Time Anti-Duplicate Gate Lock</td>
                  <td className="p-3.5 text-center text-red-400">Zero Protection</td>
                  <td className="p-3.5 text-center text-amber-400">App-dependent</td>
                  <td className="p-3.5 text-center text-red-400">No Gate Scanner</td>
                  <td className="p-3.5 text-center text-cyan-300 font-bold bg-cyan-950/20">Real-Time Hard Lock + Alarm</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Self-Serve Pass Retrieval by Email</td>
                  <td className="p-3.5 text-center text-red-400">None</td>
                  <td className="p-3.5 text-center text-amber-400">Requires Account</td>
                  <td className="p-3.5 text-center text-amber-400">Requires Account</td>
                  <td className="p-3.5 text-center text-cyan-300 font-bold bg-cyan-950/20">Zero-Login Email Lookup</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Late Arrival Tracking & Notes</td>
                  <td className="p-3.5 text-center text-red-400">No</td>
                  <td className="p-3.5 text-center text-red-400">No</td>
                  <td className="p-3.5 text-center text-red-400">No</td>
                  <td className="p-3.5 text-center text-cyan-300 font-bold bg-cyan-950/20">Dedicated Late Mode</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Official Duty Leave Export (CSV/Roster)</td>
                  <td className="p-3.5 text-center text-amber-400">Raw dump only</td>
                  <td className="p-3.5 text-center text-red-400">No</td>
                  <td className="p-3.5 text-center text-amber-400">Generic CSV</td>
                  <td className="p-3.5 text-center text-cyan-300 font-bold bg-cyan-950/20">Audit-Ready Leave Sheets</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    },

    // SLIDE 4: THE SOLUTION - EVENTHUB
    {
      id: 'solution',
      badge: 'ARCHITECTURAL INNOVATION',
      title: 'THE EVENTHUB SOLUTION',
      subtitle: 'A Purpose-Built Centralized EMS for Hack4Tech',
      tagline: 'Bridging the gap between students, organizers, and university administration.',
      render: () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto py-2">
          <div className="p-6 rounded-3xl bg-[#0c101a] border border-cyan-500/30 shadow-neon-cyan space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
              <Ticket className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white font-display">1. Unified Student Experience</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Explore flagship events with dedicated rich detail pages, accurate fee rules, and dynamic solo/team forms. Get an instant cryptographic pass card with one-click print or self-serve email retrieval.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0c101a] border border-purple-500/30 shadow-neon-purple space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/40 text-purple-400 flex items-center justify-center">
              <QrCode className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white font-display">2. High-Speed Gate Terminal</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Webcam, mobile back camera, or laser barcode gun integration. Sub-second QR decode with instant audio-visual chime, confetti, or double-buzzer alarm preventing duplicate gate entry.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0c101a] border border-amber-500/30 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-amber-400 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white font-display">3. Live Organizer Command Hub</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Real-time turnout percentage, check-in stream, manual overrides (Present, Late, Absent), full event CRUD, and instant CSV / printable duty leave attendance rosters.
            </p>
          </div>
        </div>
      )
    },

    // SLIDE 5: SYSTEM ARCHITECTURE & TECH STACK
    {
      id: 'techstack',
      badge: 'ENGINEERING & INFRASTRUCTURE',
      title: 'SYSTEM ARCHITECTURE & TECH STACK',
      subtitle: 'Modern, High-Performance, Zero-Latency Stack',
      tagline: 'Engineered for sub-second verification, offline resilience, and cross-platform capability.',
      render: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto py-2">
          <div className="p-5 rounded-2xl bg-[#0c101a] border border-gray-800 space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase font-bold">
              <Layers className="w-4 h-4" />
              <span>Frontend Architecture</span>
            </div>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>React 18 & TypeScript:</strong> Type-safe component architecture with instant reactivity.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>Tailwind CSS & Glassmorphism:</strong> Cyber-neon aesthetic matching Hack4Tech branding.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>QR Rendering (qrcode.react):</strong> High-density SVG generation for high scan accuracy.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>Continuous Video Scanner (html5-qrcode):</strong> High-FPS barcode & QR decoding across laptops and phones.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>Web Audio API Synthesizer:</strong> Native sound generation without loading external audio assets.</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-[#0c101a] border border-gray-800 space-y-4">
            <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase font-bold">
              <Cpu className="w-4 h-4" />
              <span>Backend & Data Pipeline</span>
            </div>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">•</span>
                <span><strong>Node.js & Express REST API:</strong> High-throughput asynchronous routing and check-in endpoints.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">•</span>
                <span><strong>Persistent JSON Database:</strong> Atomic reads and writes with instant audit logging for every scan.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">•</span>
                <span><strong>Anti-Duplicate Transaction Lock:</strong> Prevents multiple check-in requests for identical ticket codes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">•</span>
                <span><strong>Vite 6 Fast Bundler:</strong> 3-second production compilation and optimized asset delivery.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">•</span>
                <span><strong>Streaming CSV / Sheet Generator:</strong> On-the-fly CSV generation for university attendance submission.</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },

    // SLIDE 6: END-TO-END PROJECT WORKFLOW
    {
      id: 'workflow',
      badge: 'END-TO-END JOURNEY',
      title: 'PROJECT WORKFLOW & LIFECYCLE',
      subtitle: 'From Student Registration to Gate Check-In & Duty Leave Export',
      tagline: 'A seamless pipeline connecting students and organizers.',
      render: () => (
        <div className="space-y-6 max-w-5xl mx-auto py-2">
          {/* Workflow Sequence */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-gray-900/80 border border-cyan-500/30 text-xs space-y-2">
              <span className="w-6 h-6 rounded-full bg-cyan-400 text-black font-bold flex items-center justify-center font-mono">1</span>
              <h5 className="font-bold text-white text-sm">Event Discovery</h5>
              <p className="text-gray-400 leading-relaxed">
                Students browse VisionX, RavenX, or Ignix 2.0 with rules, tracks, prizes, and fees.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-900/80 border border-blue-500/30 text-xs space-y-2">
              <span className="w-6 h-6 rounded-full bg-blue-400 text-black font-bold flex items-center justify-center font-mono">2</span>
              <h5 className="font-bold text-white text-sm">Pass Generation</h5>
              <p className="text-gray-400 leading-relaxed">
                Fill solo/team form with Roll No. System generates unique Ticket ID and cryptographic QR pass.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-900/80 border border-purple-500/30 text-xs space-y-2">
              <span className="w-6 h-6 rounded-full bg-purple-400 text-black font-bold flex items-center justify-center font-mono">3</span>
              <h5 className="font-bold text-white text-sm">Gate QR Scan</h5>
              <p className="text-gray-400 leading-relaxed">
                Scan pass at AB-11 or AB-II reception. Terminal validates ticket in &lt;100ms.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-900/80 border border-emerald-500/30 text-xs space-y-2">
              <span className="w-6 h-6 rounded-full bg-emerald-400 text-black font-bold flex items-center justify-center font-mono">4</span>
              <h5 className="font-bold text-white text-sm">Audit & Leave Sync</h5>
              <p className="text-gray-400 leading-relaxed">
                Instant audit ledger update. Organizers export certified attendance rosters for duty leave.
              </p>
            </div>
          </div>

          {/* Logic flow diagram */}
          <div className="p-4 rounded-2xl bg-[#0c101a] border border-gray-800 text-xs font-mono flex flex-wrap items-center justify-between gap-3 text-gray-300">
            <span className="px-2.5 py-1 rounded bg-gray-800 text-cyan-400">QR Code Input</span>
            <ArrowRight className="w-4 h-4 text-gray-600 hidden sm:inline" />
            <span className="px-2.5 py-1 rounded bg-gray-800 text-white">Database Verification</span>
            <ArrowRight className="w-4 h-4 text-gray-600 hidden sm:inline" />
            <span className="px-2.5 py-1 rounded bg-red-950 text-red-300 border border-red-800">Duplicate Check</span>
            <ArrowRight className="w-4 h-4 text-gray-600 hidden sm:inline" />
            <span className="px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-800">Late Flag Check</span>
            <ArrowRight className="w-4 h-4 text-gray-600 hidden sm:inline" />
            <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">Check-in Logged</span>
          </div>
        </div>
      )
    },

    // SLIDE 7: ANTI-DUPLICATE & FRAUD PREVENTION
    {
      id: 'duplicate-prevention',
      badge: 'SECURITY & FRAUD PROTECTION',
      title: 'ANTI-DUPLICATE CHECK-IN ENGINE',
      subtitle: 'Eliminating Proxy Attendance, Screenshot Sharing & Kit Hoarding',
      tagline: 'Guaranteed 100% enforcement of single-entry integrity per registration pass.',
      render: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto py-2 items-center">
          <div className="space-y-4">
            <h4 className="text-xl font-bold font-display text-white">The Duplicate Vulnerability</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              At large hackathons, participants frequently take screenshots of their passes and send them to friends to let unregistered students into the hall, or re-scan at food counters to claim multiple refreshment kits.
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-gray-900/80 border border-gray-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Stateful Transaction Transition:</strong>
                  <span className="text-gray-400 block">Pass status transitions from <code className="text-cyan-400">REGISTERED</code> to <code className="text-emerald-400">CHECKED_IN</code> upon initial scan.</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-gray-900/80 border border-gray-800 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Hard Stop on Subsequent Scans:</strong>
                  <span className="text-gray-400 block">Any re-scan attempt is rejected with HTTP 409 DUPLICATE_CHECKIN, ringing the double warning buzzer.</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-gray-900/80 border border-gray-800 flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Tamper Evidence & Audit Trail:</strong>
                  <span className="text-gray-400 block">The terminal displays the exact timestamp and station where the pass was originally claimed.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-red-950/40 border-2 border-red-500 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center font-bold">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-900 text-red-200">
                  REAL-TIME TERMINAL ALERT
                </span>
                <h5 className="text-lg font-bold text-white mt-0.5">DUPLICATE PASS DETECTED!</h5>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-red-900/30 border border-red-700/60 text-xs font-mono space-y-2 text-red-200">
              <div className="flex justify-between">
                <span>Attendee:</span>
                <strong className="text-white">Aryan Sharma (CyberKnights)</strong>
              </div>
              <div className="flex justify-between">
                <span>Pass Code:</span>
                <span className="text-white font-bold">H4T-VX-91823</span>
              </div>
              <div className="flex justify-between">
                <span>Original Check-in:</span>
                <strong className="text-amber-300">08:45:12 AM</strong>
              </div>
              <div className="flex justify-between">
                <span>Verified At:</span>
                <span className="text-white">Main Gate Station 1</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-300">
              Action: Gate volunteer is instantly alerted with audio feedback. Duplicate kit collection is blocked automatically.
            </p>
          </div>
        </div>
      )
    },

    // SLIDE 8: THE 3 FLAGSHIP EVENTS
    {
      id: 'events',
      badge: 'FLAGSHIP LAUNCH PORTFOLIO',
      title: 'THE THREE FLAGSHIP EVENTS',
      subtitle: 'Active Hack4Tech Competitions Integrated into EventHub',
      tagline: 'Each event has dedicated tracks, guidelines, and fees.',
      render: () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto py-2">
          {/* VisionX */}
          <div className="p-5 rounded-3xl bg-[#0c101a] border border-cyan-500/40 shadow-neon-cyan flex flex-col justify-between space-y-3">
            <div>
              <div className="h-32 rounded-xl overflow-hidden bg-black mb-3">
                <img src="/images/visionx.jpg" alt="VisionX" className="w-full h-full object-cover object-top" />
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                8-HOUR HACKATHON
              </span>
              <h4 className="text-xl font-bold font-display text-white mt-1">VISIONX</h4>
              <p className="text-xs text-cyan-400 font-mono">"Turning Vision Into Reality"</p>
              <ul className="mt-3 space-y-1 text-xs text-gray-300">
                <li>🏆 <strong>₹25,000+ Prize Pool</strong></li>
                <li>🎟️ <strong>₹89 / Student</strong></li>
                <li>📍 <strong>CSED Block, AB-11</strong></li>
                <li>⚙️ AI/ML • Cloud • Cyber • Web</li>
              </ul>
            </div>
            <p className="text-[11px] text-gray-400 pt-2 border-t border-gray-800">
              Leads: Manish Chaudhary & Ankit Saraswat
            </p>
          </div>

          {/* RavenX */}
          <div className="p-5 rounded-3xl bg-[#0c101a] border border-purple-500/40 shadow-neon-purple flex flex-col justify-between space-y-3">
            <div>
              <div className="h-32 rounded-xl overflow-hidden bg-black mb-3">
                <img src="/images/ravenx.jpg" alt="RavenX" className="w-full h-full object-cover object-top" />
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-950 text-purple-300 border border-purple-800">
                👑 GIRLS ONLY HACKATHON
              </span>
              <h4 className="text-xl font-bold font-display text-white mt-1">RAVENX</h4>
              <p className="text-xs text-purple-400 font-mono">"Her Power. Her Code. Her Future."</p>
              <ul className="mt-3 space-y-1 text-xs text-gray-300">
                <li>🏆 <strong>₹50,000 Worth Pool</strong></li>
                <li>🎟️ <strong>₹99 / Person (Shortlisted)</strong></li>
                <li>📍 <strong>CSED Block, AB-II</strong></li>
                <li>👥 2–4 Members • Powered by Unstop</li>
              </ul>
            </div>
            <p className="text-[11px] text-gray-400 pt-2 border-t border-gray-800">
              Exclusive Gothic Edition Swag & Badges
            </p>
          </div>

          {/* Ignix 2.0 */}
          <div className="p-5 rounded-3xl bg-[#0c101a] border border-pink-500/40 shadow-neon-pink flex flex-col justify-between space-y-3">
            <div>
              <div className="h-32 rounded-xl overflow-hidden bg-black mb-3">
                <img src="/images/ignix.jpg" alt="Ignix" className="w-full h-full object-cover object-top" />
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-pink-950 text-pink-300 border border-pink-800">
                WORKSHOP MASTERCLASS
              </span>
              <h4 className="text-xl font-bold font-display text-white mt-1">IGNIX 2.0</h4>
              <p className="text-xs text-pink-400 font-mono">"The Hackathon Playbook"</p>
              <ul className="mt-3 space-y-1 text-xs text-gray-300">
                <li>🎁 <strong>Goodies & Fast-Track</strong></li>
                <li>🎟️ <strong>₹69 / Person</strong></li>
                <li>📍 <strong>Room 5046, AB 12</strong></li>
                <li>💻 BYOD • Leave Approved</li>
              </ul>
            </div>
            <p className="text-[11px] text-gray-400 pt-2 border-t border-gray-800">
              Ideation, MVP Architecture & Pitching
            </p>
          </div>
        </div>
      )
    },

    // SLIDE 9: FUTURE SCOPE & EXPANSION
    {
      id: 'future-scope',
      badge: 'FUTURE ROADMAP',
      title: 'FUTURE SCOPE & INNOVATION ROADMAP',
      subtitle: 'Scaling EventHub from Campus to Inter-Collegiate Ecosystem',
      tagline: 'Planned enhancements to extend functionality beyond hackathons.',
      render: () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto py-2">
          <div className="p-5 rounded-3xl bg-[#0c101a] border border-gray-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
              <Rocket className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white font-display">1. University ERP Direct Sync</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Automated webhook integration with GLA University's student attendance portal, automatically crediting approved duty leaves directly to verified attendees' LMS profiles.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-[#0c101a] border border-gray-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white font-display">2. WhatsApp & Apple Wallet Passes</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Automated WhatsApp bot that delivers .pkpass digital passes for Apple Wallet / Google Wallet immediately upon registration for instant offline lockscreen access.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-[#0c101a] border border-gray-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white font-display">3. Smart RFID & NFC Wristbands</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Pairing student RFID university ID cards at gate reception for contactless meal redemptions, lab entry, and real-time live participant location tracking across AB-11 & AB-II.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-[#0c101a] border border-gray-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white font-display">4. Verifiable Digital Certificates</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Cryptographically signed PDF certificates and Soulbound blockchain tokens delivered to verified attendees within 24 hours of event completion.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-[#0c101a] border border-gray-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white font-display">5. Automated Team Matchmaking</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              AI-driven matchmaking connecting solo participants based on complementary technical skill sets (e.g., matching a backend developer with a UI/UX designer).
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-[#0c101a] border border-gray-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white font-display">6. Offline PWA Terminal</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Progressive Web App mode with IndexedDB local cache that allows continuous scanning even during Wi-Fi dropouts, auto-syncing when network reconnects.
            </p>
          </div>
        </div>
      )
    },

    // SLIDE 10: CONCLUSION & IMPACT
    {
      id: 'conclusion',
      badge: 'MEASURABLE OUTCOMES',
      title: 'IMPACT & CONCLUSION',
      subtitle: 'Transforming Campus Event Operations for GLA University',
      tagline: 'Delivering transparency, speed, and elevated student experiences.',
      render: () => (
        <div className="space-y-8 max-w-4xl mx-auto py-6 text-center">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-[#0c101a] border border-cyan-500/30">
              <p className="text-3xl sm:text-4xl font-extrabold font-mono text-cyan-400">92%</p>
              <p className="text-xs text-gray-400 mt-1 uppercase font-mono">Queue Time Reduction</p>
            </div>
            <div className="p-5 rounded-3xl bg-[#0c101a] border border-red-500/30">
              <p className="text-3xl sm:text-4xl font-extrabold font-mono text-red-400">100%</p>
              <p className="text-xs text-gray-400 mt-1 uppercase font-mono">Fraud / Proxy Elimination</p>
            </div>
            <div className="p-5 rounded-3xl bg-[#0c101a] border border-purple-500/30">
              <p className="text-3xl sm:text-4xl font-extrabold font-mono text-purple-400">&lt;100ms</p>
              <p className="text-xs text-gray-400 mt-1 uppercase font-mono">QR Verification Speed</p>
            </div>
            <div className="p-5 rounded-3xl bg-[#0c101a] border border-emerald-500/30">
              <p className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400">1-Click</p>
              <p className="text-xs text-gray-400 mt-1 uppercase font-mono">Duty Leave Export</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-purple-950/40 to-blue-950/40 border border-gray-800 text-left space-y-3">
            <h4 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>Summary of Value Delivered</span>
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              EventHub successfully converts chaotic, manual event registration and gate verification into a professional, automated, and tamper-proof technological experience. Built specifically around Hack4Tech's flagship events (VisionX, RavenX, Ignix 2.0), EventHub positions GLA University at the forefront of smart campus innovation.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs font-mono text-gray-400">
            <span>Hack4Tech GLA University</span>
            <span>•</span>
            <span className="text-cyan-400 font-bold">EventHub EMS v2.4.0</span>
            <span>•</span>
            <span>Office of Students' Welfare</span>
          </div>
        </div>
      )
    }
  ];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  const active = slides[currentSlide];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Deck Controls Bar */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0c101a] border border-gray-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              {active.badge}
            </span>
          </div>
          <span className="text-gray-600 hidden sm:inline">•</span>
          <span className="text-xs font-mono text-gray-400 hidden sm:inline">
            Slide {currentSlide + 1} of {slides.length}
          </span>
        </div>

        {/* Slide Selector & Navigation Buttons */}
        <div className="flex items-center gap-2">
          <a
            href="/download/presentation"
            download="Hack4Tech_EventHub_Presentation.pdf"
            className="px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
            title="Download Full 10-Slide PDF Presentation"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download PDF</span>
          </a>

          <select
            value={currentSlide}
            onChange={(e) => setCurrentSlide(Number(e.target.value))}
            className="px-2.5 py-1.5 rounded-xl bg-gray-900 border border-gray-700 text-xs text-gray-200 focus:outline-none focus:border-cyan-400 hidden sm:block"
          >
            {slides.map((s, idx) => (
              <option key={s.id} value={idx}>
                Slide {idx + 1}: {s.title}
              </option>
            ))}
          </select>

          <button
            onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
            disabled={currentSlide === 0}
            className="p-2 rounded-xl bg-gray-900 hover:bg-gray-800 disabled:opacity-30 border border-gray-700 text-gray-300 transition-all"
            title="Previous Slide (Left Arrow)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono font-bold text-white px-2">
            {currentSlide + 1}/{slides.length}
          </span>

          <button
            onClick={() => setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1))}
            disabled={currentSlide === slides.length - 1}
            className="p-2 rounded-xl bg-gray-900 hover:bg-gray-800 disabled:opacity-30 border border-gray-700 text-gray-300 transition-all"
            title="Next Slide (Right Arrow or Space)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slide Canvas */}
      <div className="relative min-h-[600px] rounded-3xl bg-[#090c14] border border-gray-800/90 p-6 sm:p-12 shadow-2xl flex flex-col justify-between overflow-hidden">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Slide Header */}
        <div className="space-y-1 border-b border-gray-800/80 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
              {active.badge}
            </span>
            <span className="text-[11px] font-mono text-gray-500 uppercase">
              Hack4Tech Presentation Deck
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            {active.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-medium">
            {active.subtitle}
          </p>
        </div>

        {/* Slide Dynamic Body */}
        <div className="my-auto py-4">
          {active.render()}
        </div>

        {/* Slide Footer */}
        <div className="pt-4 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
          <p className="font-mono">{active.tagline}</p>
          <div className="flex items-center gap-3">
            <span className="text-cyan-400 font-mono font-semibold">Press ← / → Arrow Keys to Navigate</span>
            <span>•</span>
            <span className="text-gray-400">Slide {currentSlide + 1} of {slides.length}</span>
          </div>
        </div>

      </div>

      {/* Slide Thumbnails strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {slides.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlide(idx)}
            className={`px-3 py-2 rounded-xl text-left text-xs font-mono transition-all shrink-0 border ${
              currentSlide === idx
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm'
                : 'bg-gray-900/60 text-gray-500 border-gray-800 hover:text-gray-300'
            }`}
          >
            <span className="block font-bold text-white text-[11px] truncate max-w-[130px]">
              {idx + 1}. {s.title}
            </span>
          </button>
        ))}
      </div>

    </div>
  );
};
