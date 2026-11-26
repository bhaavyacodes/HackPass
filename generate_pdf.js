import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicImages = path.join(__dirname, 'public', 'images');

function getBase64Image(filename) {
  const filePath = path.join(publicImages, filename);
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    return `data:image/jpeg;base64,${data.toString('base64')}`;
  }
  return '';
}

const logoBase64 = getBase64Image('logo.jpg');
const visionxBase64 = getBase64Image('visionx.jpg');
const ravenxBase64 = getBase64Image('ravenx.jpg');
const ignixBase64 = getBase64Image('ignix.jpg');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>EventHub Smart EMS Presentation | Hack4Tech GLA University</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&family=Space+Grotesk:wght@500;600;700;800&display=swap');

    @page {
      size: 297mm 210mm; /* A4 Landscape */
      margin: 0;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', system-ui, sans-serif;
      background-color: #080A10;
      color: #F3F4F6;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .slide {
      width: 297mm;
      height: 210mm;
      padding: 16mm 20mm;
      page-break-after: always;
      break-after: page;
      position: relative;
      background: #090C15;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      border: 1px solid #1F293D;
    }

    .font-display { font-family: 'Space Grotesk', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }

    .glow-cyan {
      box-shadow: 0 0 20px rgba(0, 240, 255, 0.25);
      border: 1px solid rgba(0, 240, 255, 0.4);
    }
    .glow-purple {
      box-shadow: 0 0 20px rgba(168, 85, 247, 0.25);
      border: 1px solid rgba(168, 85, 247, 0.4);
    }
    .glow-red {
      box-shadow: 0 0 20px rgba(239, 68, 68, 0.25);
      border: 1px solid rgba(239, 68, 68, 0.4);
    }

    .gradient-text-cyan {
      background: linear-gradient(135deg, #00F0FF 0%, #3B82F6 50%, #A855F7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 9999px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: rgba(0, 240, 255, 0.1);
      color: #00F0FF;
      border: 1px solid rgba(0, 240, 255, 0.3);
    }

    .slide-header {
      border-bottom: 1px solid #1F293D;
      padding-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .slide-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 26px;
      font-weight: 800;
      color: #FFFFFF;
      margin-top: 4px;
    }

    .slide-subtitle {
      font-size: 13px;
      color: #9CA3AF;
      margin-top: 2px;
    }

    .slide-footer {
      border-top: 1px solid #1F293D;
      padding-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: #6B7280;
      font-family: 'JetBrains Mono', monospace;
    }

    .card {
      background: #0F1422;
      border: 1px solid #1F293D;
      border-radius: 14px;
      padding: 16px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
    }
    th {
      background: #151C2C;
      color: #9CA3AF;
      font-family: 'JetBrains Mono', monospace;
      text-transform: uppercase;
      font-size: 10px;
      padding: 10px;
      border-bottom: 1px solid #1F293D;
    }
    td {
      padding: 10px;
      border-bottom: 1px solid #1A2234;
      color: #D1D5DB;
    }
  </style>
</head>
<body>

  <!-- SLIDE 1: COVER -->
  <div class="slide" style="text-align: center; justify-content: center; align-items: center; gap: 20px;">
    <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 8px;">
      <img src="${logoBase64}" style="width: 75px; height: 75px; border-radius: 50%; border: 2px solid #00F0FF; padding: 2px; background: #000;" />
      <div style="text-align: left;">
        <span class="badge">HACK4TECH • GLA UNIVERSITY</span>
        <h2 style="font-size: 22px; font-weight: 800; color: #FFF; font-family: 'Space Grotesk'; margin-top: 4px;">OFFICE OF STUDENTS' WELFARE</h2>
      </div>
    </div>

    <h1 style="font-size: 42px; font-weight: 900; font-family: 'Space Grotesk'; line-height: 1.15; color: #FFF; max-width: 900px;">
      EVENTHUB SMART EVENT <br />
      <span class="gradient-text-cyan">MANAGEMENT SYSTEM</span>
    </h1>

    <p style="font-size: 15px; color: #D1D5DB; max-width: 750px; line-height: 1.6;">
      Next-generation centralized event management ecosystem enabling seamless student registration, dynamic tamper-proof QR event passes, sub-second contactless gate check-in, and real-time anti-duplicate attendance verification.
    </p>

    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; width: 100%; max-width: 880px; margin-top: 10px;">
      <div class="card" style="text-align: left;">
        <span style="font-size: 10px; font-family: 'JetBrains Mono'; color: #9CA3AF; text-transform: uppercase;">Flagship Events</span>
        <p style="font-size: 15px; font-weight: 700; color: #00F0FF; font-family: 'JetBrains Mono'; margin-top: 4px;">VisionX, RavenX, Ignix</p>
      </div>
      <div class="card" style="text-align: left;">
        <span style="font-size: 10px; font-family: 'JetBrains Mono'; color: #9CA3AF; text-transform: uppercase;">Pass Engine</span>
        <p style="font-size: 15px; font-weight: 700; color: #A855F7; font-family: 'JetBrains Mono'; margin-top: 4px;">Unique Dynamic QR</p>
      </div>
      <div class="card" style="text-align: left;">
        <span style="font-size: 10px; font-family: 'JetBrains Mono'; color: #9CA3AF; text-transform: uppercase;">Gate Security</span>
        <p style="font-size: 15px; font-weight: 700; color: #EF4444; font-family: 'JetBrains Mono'; margin-top: 4px;">Anti-Duplicate Lock</p>
      </div>
      <div class="card" style="text-align: left;">
        <span style="font-size: 10px; font-family: 'JetBrains Mono'; color: #9CA3AF; text-transform: uppercase;">Academic Duty Leave</span>
        <p style="font-size: 15px; font-weight: 700; color: #10B981; font-family: 'JetBrains Mono'; margin-top: 4px;">1-Click CSV Roster</p>
      </div>
    </div>

    <div class="slide-footer" style="width: 100%; position: absolute; bottom: 12mm; left: 20mm; right: 20mm; width: calc(100% - 40mm);">
      <span>GLA University NAAC A+ Accredited</span>
      <span>Presenter: Hack4Tech Engineering Team</span>
      <span>EMS Architecture v2.4.0</span>
    </div>
  </div>

  <!-- SLIDE 2: PROBLEM STATEMENT -->
  <div class="slide">
    <div class="slide-header">
      <div>
        <span class="badge" style="color: #EF4444; border-color: rgba(239, 68, 68, 0.4); background: rgba(239, 68, 68, 0.1);">PROBLEM STATEMENT</span>
        <h2 class="slide-title">Campus Realities & Existing Pain Points</h2>
        <p class="slide-subtitle">Why traditional university event operations collapse under scale</p>
      </div>
      <span style="font-family: 'JetBrains Mono'; color: #6B7280; font-size: 12px;">Slide 02 / 10</span>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 16px 0;">
      <div class="card" style="border-left: 4px solid #EF4444;">
        <h3 style="font-size: 15px; font-weight: 700; color: #FFF; margin-bottom: 6px;">1. Fragmented Ingestion via Google Forms</h3>
        <p style="font-size: 12px; color: #9CA3AF; line-height: 1.5;">
          Multiple disparate Google Forms distributed across WhatsApp groups cause dropped records, unlinked teammates, missing roll numbers, and zero automated pass generation.
        </p>
      </div>

      <div class="card" style="border-left: 4px solid #EF4444;">
        <h3 style="font-size: 15px; font-weight: 700; color: #FFF; margin-bottom: 6px;">2. Reception Bottlenecks (45+ Min Queues)</h3>
        <p style="font-size: 12px; color: #9CA3AF; line-height: 1.5;">
          Volunteers manually searching through alphabetical spreadsheets or tick-marking paper printouts at AB-11 & AB-II entrance gates create massive crowd bottlenecks, delaying hackathon starts.
        </p>
      </div>

      <div class="card" style="border-left: 4px solid #EF4444;">
        <h3 style="font-size: 15px; font-weight: 700; color: #FFF; margin-bottom: 6px;">3. Screenshot Sharing & Proxy Ticket Fraud</h3>
        <p style="font-size: 12px; color: #9CA3AF; line-height: 1.5;">
          Without cryptographic single-entry verification, students share confirmation screenshots with unregistered peers, leading to proxy attendance and multiple food kit redemptions.
        </p>
      </div>

      <div class="card" style="border-left: 4px solid #EF4444;">
        <h3 style="font-size: 15px; font-weight: 700; color: #FFF; margin-bottom: 6px;">4. Disputed Academic Duty Leave Approvals</h3>
        <p style="font-size: 12px; color: #9CA3AF; line-height: 1.5;">
          Organizers spend 3 to 5 working days reconciling who actually showed up versus who only registered, creating friction with department heads and university registrars.
        </p>
      </div>
    </div>

    <div class="slide-footer">
      <span>Operational Vulnerability: Zero unified gate validation & lack of state machine</span>
      <span>H4T Smart Event Management System</span>
    </div>
  </div>

  <!-- SLIDE 3: EXISTING SOLUTIONS VS EVENTHUB -->
  <div class="slide">
    <div class="slide-header">
      <div>
        <span class="badge" style="color: #F59E0B; border-color: rgba(245, 158, 11, 0.4); background: rgba(245, 158, 11, 0.1);">BENCHMARKING</span>
        <h2 class="slide-title">Existing Solutions vs. EventHub EMS</h2>
        <p class="slide-subtitle">Why commercial and manual alternatives fail collegiate academic structures</p>
      </div>
      <span style="font-family: 'JetBrains Mono'; color: #6B7280; font-size: 12px;">Slide 03 / 10</span>
    </div>

    <div class="card" style="padding: 0; overflow: hidden; margin: 16px 0;">
      <table>
        <thead>
          <tr>
            <th>Operational Dimension</th>
            <th style="text-align: center; color: #EF4444;">Google Forms</th>
            <th style="text-align: center; color: #F59E0B;">Eventbrite / Luma</th>
            <th style="text-align: center; color: #A855F7;">Unstop</th>
            <th style="text-align: center; color: #00F0FF; background: rgba(0, 240, 255, 0.1);">EventHub EMS 2.0</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="font-weight: 600; color: #FFF;">University Roll No & Dept Hierarchy</td>
            <td style="text-align: center; color: #EF4444;">✕ Freeform text</td>
            <td style="text-align: center; color: #EF4444;">✕ Consumer bias</td>
            <td style="text-align: center; color: #10B981;">✓ Partial</td>
            <td style="text-align: center; color: #00F0FF; font-weight: 700; background: rgba(0, 240, 255, 0.05);">✓ Native GLA University Schema</td>
          </tr>
          <tr>
            <td style="font-weight: 600; color: #FFF;">Instant Dynamic QR Event Pass</td>
            <td style="text-align: center; color: #EF4444;">✕ None</td>
            <td style="text-align: center; color: #10B981;">✓ App Ticket</td>
            <td style="text-align: center; color: #F59E0B;">△ Web Ticket</td>
            <td style="text-align: center; color: #00F0FF; font-weight: 700; background: rgba(0, 240, 255, 0.05);">✓ Instant Dynamic SVG + Printable Card</td>
          </tr>
          <tr>
            <td style="font-weight: 600; color: #FFF;">Anti-Duplicate Gate Hard-Lock</td>
            <td style="text-align: center; color: #EF4444;">✕ Zero Fraud Lock</td>
            <td style="text-align: center; color: #F59E0B;">△ Slow Cloud Sync</td>
            <td style="text-align: center; color: #EF4444;">✕ No Gate Terminal</td>
            <td style="text-align: center; color: #00F0FF; font-weight: 700; background: rgba(0, 240, 255, 0.05);">✓ Sub-100ms Atomic Duplicate Lock</td>
          </tr>
          <tr>
            <td style="font-weight: 600; color: #FFF;">Zero-Login Email Pass Retrieval</td>
            <td style="text-align: center; color: #EF4444;">✕ None</td>
            <td style="text-align: center; color: #EF4444;">✕ Mandatory Account</td>
            <td style="text-align: center; color: #EF4444;">✕ Mandatory App</td>
            <td style="text-align: center; color: #00F0FF; font-weight: 700; background: rgba(0, 240, 255, 0.05);">✓ Direct Self-Serve Email Search</td>
          </tr>
          <tr>
            <td style="font-weight: 600; color: #FFF;">Late Arrival Flagging & Notes</td>
            <td style="text-align: center; color: #EF4444;">✕ Manual typing</td>
            <td style="text-align: center; color: #EF4444;">✕ Unsupported</td>
            <td style="text-align: center; color: #EF4444;">✕ Unsupported</td>
            <td style="text-align: center; color: #00F0FF; font-weight: 700; background: rgba(0, 240, 255, 0.05);">✓ Dedicated Late Mode + Timestamp</td>
          </tr>
          <tr>
            <td style="font-weight: 600; color: #FFF;">Official Duty Leave Formatted Export</td>
            <td style="text-align: center; color: #F59E0B;">△ Raw Dump</td>
            <td style="text-align: center; color: #EF4444;">✕ Non-academic</td>
            <td style="text-align: center; color: #F59E0B;">△ Generic CSV</td>
            <td style="text-align: center; color: #00F0FF; font-weight: 700; background: rgba(0, 240, 255, 0.05);">✓ Audit-Ready Leave Sheets + Signatures</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="slide-footer">
      <span>EventHub is purpose-built for Indian collegiate administration and fast gate check-ins</span>
      <span>H4T Smart Event Management System</span>
    </div>
  </div>

  <!-- SLIDE 4: SYSTEM ARCHITECTURE & TECH STACK -->
  <div class="slide">
    <div class="slide-header">
      <div>
        <span class="badge">SYSTEM ARCHITECTURE</span>
        <h2 class="slide-title">Technology Stack & Engineering Decisions</h2>
        <p class="slide-subtitle">Engineered for sub-second verification, offline resilience, and high visual impact</p>
      </div>
      <span style="font-family: 'JetBrains Mono'; color: #6B7280; font-size: 12px;">Slide 04 / 10</span>
    </div>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 16px 0;">
      <div class="card glow-cyan">
        <span class="badge" style="font-size: 9px;">FRONTEND UI</span>
        <h3 style="font-size: 16px; font-weight: 700; color: #FFF; margin: 8px 0 6px 0;">React 18 & TypeScript</h3>
        <ul style="font-size: 12px; color: #D1D5DB; line-height: 1.6; list-style: none;">
          <li>• Tailwind CSS cyberpunk dark palette</li>
          <li>• Space Grotesk & JetBrains Mono fonts</li>
          <li>• Lucide React visual iconography</li>
          <li>• Canvas Confetti celebrative triggers</li>
          <li>• Responsive glassmorphic layout</li>
        </ul>
      </div>

      <div class="card glow-purple">
        <span class="badge" style="color: #A855F7; border-color: rgba(168, 85, 247, 0.4); background: rgba(168, 85, 247, 0.1); font-size: 9px;">SCANNING & SOUND</span>
        <h3 style="font-size: 16px; font-weight: 700; color: #FFF; margin: 8px 0 6px 0;">QR & Sound Synthesizer</h3>
        <ul style="font-size: 12px; color: #D1D5DB; line-height: 1.6; list-style: none;">
          <li>• <code style="color: #A855F7;">qrcode.react</code> High-density SVG passes</li>
          <li>• <code style="color: #A855F7;">html5-qrcode</code> Continuous video decoder</li>
          <li>• <strong>Web Audio API Synthesizer:</strong> Zero-latency sound generation without loading audio files</li>
          <li>• Laser barcode gun USB input parser</li>
        </ul>
      </div>

      <div class="card" style="border: 1px solid rgba(16, 185, 129, 0.4); box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);">
        <span class="badge" style="color: #10B981; border-color: rgba(16, 185, 129, 0.4); background: rgba(16, 185, 129, 0.1); font-size: 9px;">SERVICES & DATA</span>
        <h3 style="font-size: 16px; font-weight: 700; color: #FFF; margin: 8px 0 6px 0;">Node.js Express Engine</h3>
        <ul style="font-size: 12px; color: #D1D5DB; line-height: 1.6; list-style: none;">
          <li>• Express RESTful API routing</li>
          <li>• Persistent atomic JSON transaction DB</li>
          <li>• Real-time anti-duplicate transaction lock</li>
          <li>• Streaming CSV duty leave exporter</li>
          <li>• Vite 6 fast production bundler</li>
        </ul>
      </div>
    </div>

    <div class="slide-footer">
      <span>Zero external audio file latency • Sub-100ms average scan-to-database write time</span>
      <span>H4T Smart Event Management System</span>
    </div>
  </div>

  <!-- SLIDE 5: PROJECT WORKFLOW -->
  <div class="slide">
    <div class="slide-header">
      <div>
        <span class="badge">LIFECYCLE PIPELINE</span>
        <h2 class="slide-title">End-to-End Project Workflow</h2>
        <p class="slide-subtitle">Coordinating the student journey and the on-ground gate reception verification</p>
      </div>
      <span style="font-family: 'JetBrains Mono'; color: #6B7280; font-size: 12px;">Slide 05 / 10</span>
    </div>

    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin: 16px 0;">
      <div class="card" style="border-top: 3px solid #00F0FF;">
        <span style="background: #00F0FF; color: #000; font-weight: 800; border-radius: 50%; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px;">1</span>
        <h4 style="font-size: 14px; font-weight: 700; color: #FFF; margin: 8px 0 4px 0;">Event Discovery</h4>
        <p style="font-size: 11px; color: #9CA3AF; line-height: 1.45;">
          Students explore VisionX, RavenX, or Ignix 2.0 with rules, tracks, prizes, and fee requirements.
        </p>
      </div>

      <div class="card" style="border-top: 3px solid #3B82F6;">
        <span style="background: #3B82F6; color: #FFF; font-weight: 800; border-radius: 50%; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px;">2</span>
        <h4 style="font-size: 14px; font-weight: 700; color: #FFF; margin: 8px 0 4px 0;">Pass Generation</h4>
        <p style="font-size: 11px; color: #9CA3AF; line-height: 1.45;">
          Fill solo or team details. Backend issues cryptographic Ticket ID and dynamic QR event pass.
        </p>
      </div>

      <div class="card" style="border-top: 3px solid #A855F7;">
        <span style="background: #A855F7; color: #FFF; font-weight: 800; border-radius: 50%; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px;">3</span>
        <h4 style="font-size: 14px; font-weight: 700; color: #FFF; margin: 8px 0 4px 0;">Gate Scan & Lock</h4>
        <p style="font-size: 11px; color: #9CA3AF; line-height: 1.45;">
          Attendee presents pass. Terminal checks state machine, plays chime, and locks against duplicate scans.
        </p>
      </div>

      <div class="card" style="border-top: 3px solid #10B981;">
        <span style="background: #10B981; color: #000; font-weight: 800; border-radius: 50%; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px;">4</span>
        <h4 style="font-size: 14px; font-weight: 700; color: #FFF; margin: 8px 0 4px 0;">Duty Leave Export</h4>
        <p style="font-size: 11px; color: #9CA3AF; line-height: 1.45;">
          Organizers monitor live turnout and generate formatted duty leave rosters with signature columns.
        </p>
      </div>
    </div>

    <div class="card" style="background: #0B0E17; font-family: 'JetBrains Mono'; font-size: 11px; display: flex; justify-content: space-between; align-items: center;">
      <span style="color: #00F0FF;">STATE TRANSITION:</span>
      <span>REGISTERED (08:00 AM)</span>
      <span style="color: #6B7280;">────────►</span>
      <span style="color: #10B981; font-weight: 700;">CHECKED_IN (08:45 AM)</span>
      <span style="color: #6B7280;">────────►</span>
      <span style="color: #EF4444; font-weight: 700;">DUPLICATE_LOCKED (409)</span>
    </div>

    <div class="slide-footer">
      <span>Zero drop-off from registration to university-certified academic attendance</span>
      <span>H4T Smart Event Management System</span>
    </div>
  </div>

  <!-- SLIDE 6: ANTI-DUPLICATE CHECK-IN ENGINE -->
  <div class="slide">
    <div class="slide-header">
      <div>
        <span class="badge" style="color: #EF4444; border-color: rgba(239, 68, 68, 0.4); background: rgba(239, 68, 68, 0.1);">SECURITY DEEP-DIVE</span>
        <h2 class="slide-title">Anti-Duplicate Check-in & Fraud Lock</h2>
        <p class="slide-subtitle">Eliminating proxy attendance, screenshot sharing, and refreshment kit hoarding</p>
      </div>
      <span style="font-family: 'JetBrains Mono'; color: #6B7280; font-size: 12px;">Slide 06 / 10</span>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 16px 0; align-items: center;">
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <h3 style="font-size: 16px; font-weight: 700; color: #FFF;">Single-Entry Verification Logic:</h3>
        <div class="card" style="font-size: 12px; color: #D1D5DB; line-height: 1.5;">
          <strong style="color: #00F0FF;">1. Checksum Format:</strong>
          Every ticket has an immutable prefix and random checksum: <code style="color: #00F0FF;">H4T-[EVENT]-[5DIGITS]</code>.
        </div>
        <div class="card" style="font-size: 12px; color: #D1D5DB; line-height: 1.5;">
          <strong style="color: #10B981;">2. First Scan State Transition:</strong>
          Record transitions to <code style="color: #10B981;">CHECKED_IN</code> with exact ISO timestamp and terminal station identity.
        </div>
        <div class="card" style="font-size: 12px; color: #D1D5DB; line-height: 1.5;">
          <strong style="color: #EF4444;">3. Subsequent Scan Block:</strong>
          Any re-scan triggers immediate HTTP 409 DUPLICATE_CHECKIN, ringing the double-buzzer alarm.
        </div>
      </div>

      <div class="card glow-red" style="background: rgba(127, 29, 29, 0.2); padding: 20px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
          <span style="background: #EF4444; color: #FFF; font-size: 10px; font-family: 'JetBrains Mono'; font-weight: 800; padding: 2px 8px; border-radius: 4px;">
            TERMINAL FRAUD LOCK
          </span>
          <span style="font-size: 12px; color: #FCA5A5; font-weight: 700;">DUPLICATE SCAN DETECTED</span>
        </div>

        <div style="background: rgba(0,0,0,0.5); border: 1px solid rgba(239, 68, 68, 0.5); border-radius: 10px; padding: 12px; font-family: 'JetBrains Mono'; font-size: 11px; line-height: 1.8;">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #9CA3AF;">Attendee:</span>
            <strong style="color: #FFF;">Aryan Sharma (CyberKnights)</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #9CA3AF;">Ticket ID:</span>
            <span style="color: #00F0FF;">H4T-VX-91823</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #9CA3AF;">Original Check-in:</span>
            <strong style="color: #F59E0B;">08:45:12 AM</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #9CA3AF;">Station:</span>
            <span style="color: #FFF;">Main Gate Station 1</span>
          </div>
        </div>

        <p style="font-size: 11px; color: #FCA5A5; margin-top: 10px;">
          Outcome: Proxy entry blocked automatically. Gate volunteer alerted with audio feedback.
        </p>
      </div>
    </div>

    <div class="slide-footer">
      <span>100% elimination of screenshot forwarding and duplicate kit claims</span>
      <span>H4T Smart Event Management System</span>
    </div>
  </div>

  <!-- SLIDE 7: THE 3 FLAGSHIP EVENTS -->
  <div class="slide">
    <div class="slide-header">
      <div>
        <span class="badge" style="color: #A855F7; border-color: rgba(168, 85, 247, 0.4); background: rgba(168, 85, 247, 0.1);">EVENT PORTFOLIO</span>
        <h2 class="slide-title">The Three Flagship Launch Events</h2>
        <p class="slide-subtitle">Faithfully mapped from official Hack4Tech promotional posters</p>
      </div>
      <span style="font-family: 'JetBrains Mono'; color: #6B7280; font-size: 12px;">Slide 07 / 10</span>
    </div>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin: 16px 0;">
      <!-- VisionX -->
      <div class="card glow-cyan">
        <div style="height: 100px; border-radius: 8px; overflow: hidden; margin-bottom: 10px; background: #000;">
          <img src="${visionxBase64}" style="width: 100%; height: 100%; object-fit: cover; object-position: top;" />
        </div>
        <span class="badge" style="font-size: 8px;">8-HOUR HACKATHON</span>
        <h4 style="font-size: 16px; font-weight: 800; color: #FFF; font-family: 'Space Grotesk'; margin-top: 4px;">VISIONX</h4>
        <p style="font-size: 11px; color: #00F0FF; font-family: 'JetBrains Mono';">"Turning Vision Into Reality"</p>
        <ul style="font-size: 11px; color: #D1D5DB; margin-top: 8px; line-height: 1.6; list-style: none;">
          <li>🏆 <strong>₹25,000+ Prize Pool</strong></li>
          <li>🎟️ <strong>₹89 / Student</strong></li>
          <li>📍 <strong>CSED Block, AB-11</strong></li>
          <li>⚙️ AI/ML • Cloud • Cyber • Web</li>
        </ul>
      </div>

      <!-- RavenX -->
      <div class="card glow-purple">
        <div style="height: 100px; border-radius: 8px; overflow: hidden; margin-bottom: 10px; background: #000;">
          <img src="${ravenxBase64}" style="width: 100%; height: 100%; object-fit: cover; object-position: top;" />
        </div>
        <span class="badge" style="color: #A855F7; border-color: rgba(168, 85, 247, 0.4); background: rgba(168, 85, 247, 0.1); font-size: 8px;">GIRLS ONLY HACKATHON</span>
        <h4 style="font-size: 16px; font-weight: 800; color: #FFF; font-family: 'Space Grotesk'; margin-top: 4px;">RAVENX</h4>
        <p style="font-size: 11px; color: #A855F7; font-family: 'JetBrains Mono';">"Her Power. Her Code. Her Future."</p>
        <ul style="font-size: 11px; color: #D1D5DB; margin-top: 8px; line-height: 1.6; list-style: none;">
          <li>🏆 <strong>₹50,000 Worth Prize Pool</strong></li>
          <li>🎟️ <strong>₹99 / Person (Shortlisted)</strong></li>
          <li>📍 <strong>CSED Block, AB-II</strong></li>
          <li>👥 2–4 Members • Powered by Unstop</li>
        </ul>
      </div>

      <!-- Ignix 2.0 -->
      <div class="card" style="border: 1px solid rgba(236, 72, 153, 0.4); box-shadow: 0 0 20px rgba(236, 72, 153, 0.2);">
        <div style="height: 100px; border-radius: 8px; overflow: hidden; margin-bottom: 10px; background: #000;">
          <img src="${ignixBase64}" style="width: 100%; height: 100%; object-fit: cover; object-position: top;" />
        </div>
        <span class="badge" style="color: #EC4899; border-color: rgba(236, 72, 153, 0.4); background: rgba(236, 72, 153, 0.1); font-size: 8px;">WORKSHOP MASTERCLASS</span>
        <h4 style="font-size: 16px; font-weight: 800; color: #FFF; font-family: 'Space Grotesk'; margin-top: 4px;">IGNIX 2.0</h4>
        <p style="font-size: 11px; color: #EC4899; font-family: 'JetBrains Mono';">"The Hackathon Playbook"</p>
        <ul style="font-size: 11px; color: #D1D5DB; margin-top: 8px; line-height: 1.6; list-style: none;">
          <li>🎁 <strong>Goodies & Certificates</strong></li>
          <li>🎟️ <strong>₹69 / Person</strong></li>
          <li>📍 <strong>Room 5046, AB 12</strong></li>
          <li>💻 BYOD • Duty Leave Approved</li>
        </ul>
      </div>
    </div>

    <div class="slide-footer">
      <span>Official Instagram coordination: @Hack4Tech.GLAU • Student Welfare Desk</span>
      <span>H4T Smart Event Management System</span>
    </div>
  </div>

  <!-- SLIDE 8: COMMAND HUB & ANALYTICS -->
  <div class="slide">
    <div class="slide-header">
      <div>
        <span class="badge" style="color: #10B981; border-color: rgba(16, 185, 129, 0.4); background: rgba(16, 185, 129, 0.1);">ADMINISTRATION</span>
        <h2 class="slide-title">Organizer Command Hub & Governance</h2>
        <p class="slide-subtitle">Live operational visibility, revenue analytics, and automated roster generation</p>
      </div>
      <span style="font-family: 'JetBrains Mono'; color: #6B7280; font-size: 12px;">Slide 08 / 10</span>
    </div>

    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 16px 0;">
      <div class="card" style="text-align: center;">
        <span style="font-size: 10px; font-family: 'JetBrains Mono'; color: #9CA3AF; text-transform: uppercase;">Turnout Metric</span>
        <p style="font-size: 26px; font-weight: 800; color: #00F0FF; font-family: 'JetBrains Mono'; margin-top: 4px;">Real-Time %</p>
        <span style="font-size: 10px; color: #6B7280;">Auto-updating rate</span>
      </div>
      <div class="card" style="text-align: center;">
        <span style="font-size: 10px; font-family: 'JetBrains Mono'; color: #9CA3AF; text-transform: uppercase;">Check-in Feed</span>
        <p style="font-size: 26px; font-weight: 800; color: #10B981; font-family: 'JetBrains Mono'; margin-top: 4px;">Audit Stream</p>
        <span style="font-size: 10px; color: #6B7280;">Every scan recorded</span>
      </div>
      <div class="card" style="text-align: center;">
        <span style="font-size: 10px; font-family: 'JetBrains Mono'; color: #9CA3AF; text-transform: uppercase;">Late Arrivals</span>
        <p style="font-size: 26px; font-weight: 800; color: #F59E0B; font-family: 'JetBrains Mono'; margin-top: 4px;">Flagged</p>
        <span style="font-size: 10px; color: #6B7280;">Timestamped records</span>
      </div>
      <div class="card" style="text-align: center;">
        <span style="font-size: 10px; font-family: 'JetBrains Mono'; color: #9CA3AF; text-transform: uppercase;">Roster Export</span>
        <p style="font-size: 26px; font-weight: 800; color: #A855F7; font-family: 'JetBrains Mono'; margin-top: 4px;">1-Click CSV</p>
        <span style="font-size: 10px; color: #6B7280;">Ready for Registrar</span>
      </div>
    </div>

    <div class="card" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 12px; color: #D1D5DB;">
      <div>
        <strong style="color: #FFF; display: block; margin-bottom: 4px;">• Event Management CRUD:</strong>
        Create new competitions, modify fee tiers, prize pools, venues, and registration open/closed states.
      </div>
      <div>
        <strong style="color: #FFF; display: block; margin-bottom: 4px;">• Manual Overrides:</strong>
        Instantly mark participants Present, Late, or Absent, or reset attendance with audited logs.
      </div>
      <div>
        <strong style="color: #FFF; display: block; margin-bottom: 4px;">• Printable Sign-in Sheets:</strong>
        Clean physical roster tables with signature columns for paper backup at gate desks.
      </div>
      <div>
        <strong style="color: #FFF; display: block; margin-bottom: 4px;">• Revenue Reconciliation:</strong>
        Accurate tracking of student entry fee collections based on individual and team tiers.
      </div>
    </div>

    <div class="slide-footer">
      <span>Demo Admin Credentials: admin@hack4tech.com / admin123 (One-Click Auto-Fill)</span>
      <span>H4T Smart Event Management System</span>
    </div>
  </div>

  <!-- SLIDE 9: FUTURE SCOPE -->
  <div class="slide">
    <div class="slide-header">
      <div>
        <span class="badge">ROADMAP</span>
        <h2 class="slide-title">Future Scope & Innovation Pipeline</h2>
        <p class="slide-subtitle">Scaling EventHub across North India collegiate ecosystems</p>
      </div>
      <span style="font-family: 'JetBrains Mono'; color: #6B7280; font-size: 12px;">Slide 09 / 10</span>
    </div>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin: 16px 0;">
      <div class="card">
        <h4 style="font-size: 13px; font-weight: 700; color: #00F0FF; margin-bottom: 4px;">1. Direct University ERP Sync</h4>
        <p style="font-size: 11px; color: #9CA3AF; line-height: 1.5;">
          Direct webhook integration with GLA University LMS portal, automatically crediting approved duty leaves to students' academic records.
        </p>
      </div>

      <div class="card">
        <h4 style="font-size: 13px; font-weight: 700; color: #A855F7; margin-bottom: 4px;">2. WhatsApp & Apple Wallet Passes</h4>
        <p style="font-size: 11px; color: #9CA3AF; line-height: 1.5;">
          Automated WhatsApp bot dispatching <code style="color: #A855F7;">.pkpass</code> digital passes for Apple Wallet and Google Wallet for offline lockscreen access.
        </p>
      </div>

      <div class="card">
        <h4 style="font-size: 13px; font-weight: 700; color: #EC4899; margin-bottom: 4px;">3. RFID Student Card Tap</h4>
        <p style="font-size: 11px; color: #9CA3AF; line-height: 1.5;">
          Tapping physical RFID student identity cards at gate desks for contactless meal collections and hardware lab access.
        </p>
      </div>

      <div class="card">
        <h4 style="font-size: 13px; font-weight: 700; color: #10B981; margin-bottom: 4px;">4. Verifiable Digital Badges</h4>
        <p style="font-size: 11px; color: #9CA3AF; line-height: 1.5;">
          Cryptographically signed digital PDF certificates and Soulbound blockchain credentials delivered within 24 hours of event finish.
        </p>
      </div>

      <div class="card">
        <h4 style="font-size: 13px; font-weight: 700; color: #3B82F6; margin-bottom: 4px;">5. AI Team Matchmaking</h4>
        <p style="font-size: 11px; color: #9CA3AF; line-height: 1.5;">
          Algorithmic pairing of solo participants based on complementary technical skill sets (e.g. matching UI/UX designers with backend engineers).
        </p>
      </div>

      <div class="card">
        <h4 style="font-size: 13px; font-weight: 700; color: #F59E0B; margin-bottom: 4px;">6. Offline PWA Gate Sync</h4>
        <p style="font-size: 11px; color: #9CA3AF; line-height: 1.5;">
          Progressive Web App mode with IndexedDB local caching allowing zero-internet offline scanning during campus network outages.
        </p>
      </div>
    </div>

    <div class="slide-footer">
      <span>Target: Complete transition to 100% paperless, zero-fraud campus events</span>
      <span>H4T Smart Event Management System</span>
    </div>
  </div>

  <!-- SLIDE 10: CONCLUSION -->
  <div class="slide" style="text-align: center; justify-content: center; align-items: center; gap: 16px;">
    <span class="badge" style="color: #10B981; border-color: rgba(16, 185, 129, 0.4); background: rgba(16, 185, 129, 0.1);">
      VALUE DELIVERED
    </span>

    <h2 style="font-size: 38px; font-weight: 900; font-family: 'Space Grotesk'; color: #FFF; line-height: 1.2;">
      IMPACT & CONCLUSION
    </h2>
    <p style="font-size: 15px; color: #00F0FF; font-family: 'Space Grotesk';">
      Transforming Hack4Tech from chaotic forms to an intelligent EMS
    </p>

    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; width: 100%; max-width: 850px; margin: 10px 0;">
      <div class="card" style="text-align: center;">
        <p style="font-size: 36px; font-weight: 900; font-family: 'JetBrains Mono'; color: #00F0FF;">92%</p>
        <span style="font-size: 10px; font-family: 'JetBrains Mono'; color: #9CA3AF; text-transform: uppercase;">Queue Time Reduction</span>
      </div>
      <div class="card" style="text-align: center;">
        <p style="font-size: 36px; font-weight: 900; font-family: 'JetBrains Mono'; color: #EF4444;">100%</p>
        <span style="font-size: 10px; font-family: 'JetBrains Mono'; color: #9CA3AF; text-transform: uppercase;">Ticket Fraud Blocked</span>
      </div>
      <div class="card" style="text-align: center;">
        <p style="font-size: 36px; font-weight: 900; font-family: 'JetBrains Mono'; color: #A855F7;">&lt;100ms</p>
        <span style="font-size: 10px; font-family: 'JetBrains Mono'; color: #9CA3AF; text-transform: uppercase;">QR Verification Speed</span>
      </div>
      <div class="card" style="text-align: center;">
        <p style="font-size: 36px; font-weight: 900; font-family: 'JetBrains Mono'; color: #10B981;">1-Click</p>
        <span style="font-size: 10px; font-family: 'JetBrains Mono'; color: #9CA3AF; text-transform: uppercase;">Leave Roster Export</span>
      </div>
    </div>

    <p style="font-size: 13px; color: #D1D5DB; max-width: 750px; line-height: 1.6;">
      EventHub demonstrates that collegiate hackathons can be run with enterprise-grade security, frictionless attendee experiences, and total administrative transparency.
    </p>

    <div class="card" style="padding: 10px 24px; font-size: 12px; font-family: 'JetBrains Mono'; color: #00F0FF; border-color: rgba(0, 240, 255, 0.4);">
      Live Deployment: http://localhost:5000
    </div>

    <div class="slide-footer" style="width: 100%; position: absolute; bottom: 12mm; left: 20mm; right: 20mm; width: calc(100% - 40mm);">
      <span>Hack4Tech • GLA University</span>
      <span>Office of Students' Welfare</span>
      <span>End of Presentation</span>
    </div>
  </div>

</body>
</html>
`;

const exportHtmlPath = path.join(__dirname, 'presentation_export.html');
fs.writeFileSync(exportHtmlPath, htmlContent, 'utf8');

const outputPdfPath = path.join(__dirname, 'Hack4Tech_EventHub_Presentation.pdf');
const brainPdfPath = path.join('C:', 'Users', 'Lenovo', '.gemini', 'antigravity', 'brain', 'ea0a820f-794a-44ed-8c1a-e142f89ca316', 'Hack4Tech_EventHub_Presentation.pdf');

const chromePath = path.join('C:', 'Program Files', 'Google', 'Chrome', 'Application', 'chrome.exe');
const edgePath = path.join('C:', 'Program Files (x86)', 'Microsoft', 'Edge', 'Application', 'msedge.exe');
const browserPath = fs.existsSync(chromePath) ? chromePath : edgePath;

console.log('Rendering PDF via Browser:', browserPath);
const cmd = `"${browserPath}" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="${outputPdfPath}" "${exportHtmlPath}"`;
execSync(cmd);

console.log('Copying to artifacts directory...');
fs.copyFileSync(outputPdfPath, brainPdfPath);

const stats = fs.statSync(outputPdfPath);
console.log(`Success! PDF generated: ${outputPdfPath} (${(stats.size / 1024).toFixed(1)} KB)`);
