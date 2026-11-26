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
  <title>EventHub Descriptive Presentation | Hack4Tech GLA University</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700;800&family=Space+Grotesk:wght@500;600;700;800;900&display=swap');

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
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      background-color: #080A10;
      color: #F3F4F6;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .slide {
      width: 297mm;
      height: 210mm;
      padding: 14mm 18mm;
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
      box-shadow: 0 0 16px rgba(0, 240, 255, 0.25);
      border: 1px solid rgba(0, 240, 255, 0.4);
    }
    .glow-purple {
      box-shadow: 0 0 16px rgba(168, 85, 247, 0.25);
      border: 1px solid rgba(168, 85, 247, 0.4);
    }
    .glow-red {
      box-shadow: 0 0 16px rgba(239, 68, 68, 0.25);
      border: 1px solid rgba(239, 68, 68, 0.4);
    }
    .glow-emerald {
      box-shadow: 0 0 16px rgba(16, 185, 129, 0.25);
      border: 1px solid rgba(16, 185, 129, 0.4);
    }

    .gradient-text-cyan {
      background: linear-gradient(135deg, #00F0FF 0%, #3B82F6 50%, #A855F7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .badge {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 9999px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: rgba(0, 240, 255, 0.1);
      color: #00F0FF;
      border: 1px solid rgba(0, 240, 255, 0.3);
    }

    .slide-header {
      border-bottom: 1px solid #1F293D;
      padding-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .slide-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 24px;
      font-weight: 800;
      color: #FFFFFF;
      margin-top: 3px;
    }

    .slide-subtitle {
      font-size: 12px;
      color: #9CA3AF;
      margin-top: 1px;
    }

    .slide-footer {
      border-top: 1px solid #1F293D;
      padding-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 10.5px;
      color: #6B7280;
      font-family: 'JetBrains Mono', monospace;
    }

    .card {
      background: #0F1422;
      border: 1px solid #1F293D;
      border-radius: 12px;
      padding: 14px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11.5px;
    }
    th {
      background: #151C2C;
      color: #9CA3AF;
      font-family: 'JetBrains Mono', monospace;
      text-transform: uppercase;
      font-size: 9.5px;
      padding: 8px 10px;
      border-bottom: 1px solid #1F293D;
    }
    td {
      padding: 8px 10px;
      border-bottom: 1px solid #1A2234;
      color: #D1D5DB;
    }

    /* SVG diagram styling */
    .diagram-box {
      fill: #0F1422;
      stroke: #1F293D;
      stroke-width: 1.5;
      rx: 8;
    }
    .diagram-text-title {
      fill: #FFFFFF;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 12px;
      font-weight: 700;
    }
    .diagram-text-desc {
      fill: #9CA3AF;
      font-family: 'Inter', sans-serif;
      font-size: 9.5px;
    }
    .diagram-arrow {
      stroke: #00F0FF;
      stroke-width: 2;
      fill: none;
      marker-end: url(#arrow-cyan);
    }
    .diagram-arrow-purple {
      stroke: #A855F7;
      stroke-width: 2;
      fill: none;
      marker-end: url(#arrow-purple);
    }
    .diagram-arrow-emerald {
      stroke: #10B981;
      stroke-width: 2;
      fill: none;
      marker-end: url(#arrow-emerald);
    }
  </style>
</head>
<body>

  <!-- ========================================== -->
  <!-- SLIDE 1: COVER -->
  <!-- ========================================== -->
  <div class="slide" style="text-align: center; justify-content: center; align-items: center; gap: 16px;">
    <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 6px;">
      <img src="${logoBase64}" style="width: 80px; height: 80px; border-radius: 50%; border: 2px solid #00F0FF; padding: 2px; background: #000; box-shadow: 0 0 25px rgba(0, 240, 255, 0.4);" />
      <div style="text-align: left;">
        <span class="badge">HACK4TECH • GLA UNIVERSITY</span>
        <h2 style="font-size: 22px; font-weight: 800; color: #FFF; font-family: 'Space Grotesk'; margin-top: 4px;">OFFICE OF STUDENTS' WELFARE</h2>
        <span style="font-size: 11px; color: #F59E0B; font-family: 'JetBrains Mono'; font-weight: 600;">★ NAAC A+ ACCREDITED UNIVERSITY ★</span>
      </div>
    </div>

    <h1 style="font-size: 40px; font-weight: 900; font-family: 'Space Grotesk'; line-height: 1.15; color: #FFF; max-width: 950px;">
      EVENTHUB SMART EVENT <br />
      <span class="gradient-text-cyan">MANAGEMENT SYSTEM (EMS 2.0)</span>
    </h1>

    <p style="font-size: 14.5px; color: #D1D5DB; max-width: 800px; line-height: 1.6;">
      Comprehensive architectural pitch deck detailing centralized collegiate event discovery, dynamic cryptographic QR event pass issuance, sub-second contactless gate check-in, real-time anti-duplicate security, and automated duty leave compliance.
    </p>

    <!-- Key Metrics Ribbon -->
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; width: 100%; max-width: 920px; margin-top: 10px;">
      <div class="card glow-cyan" style="text-align: left;">
        <span style="font-size: 9.5px; font-family: 'JetBrains Mono'; color: #9CA3AF; text-transform: uppercase;">Flagship Competitions</span>
        <p style="font-size: 15px; font-weight: 800; color: #00F0FF; font-family: 'JetBrains Mono'; margin-top: 3px;">VisionX, RavenX, Ignix</p>
        <span style="font-size: 10px; color: #6B7280;">₹75,000+ Prize Pools</span>
      </div>
      <div class="card glow-purple" style="text-align: left;">
        <span style="font-size: 9.5px; font-family: 'JetBrains Mono'; color: #9CA3AF; text-transform: uppercase;">Verification Passcode</span>
        <p style="font-size: 15px; font-weight: 800; color: #A855F7; font-family: 'JetBrains Mono'; margin-top: 3px;">Dynamic High-Density QR</p>
        <span style="font-size: 10px; color: #6B7280;">Zero-login self retrieval</span>
      </div>
      <div class="card glow-red" style="text-align: left;">
        <span style="font-size: 9.5px; font-family: 'JetBrains Mono'; color: #9CA3AF; text-transform: uppercase;">Entrance Integrity</span>
        <p style="font-size: 15px; font-weight: 800; color: #EF4444; font-family: 'JetBrains Mono'; margin-top: 3px;">Anti-Duplicate Hard Lock</p>
        <span style="font-size: 10px; color: #6B7280;">Instant audible buzzer</span>
      </div>
      <div class="card glow-emerald" style="text-align: left;">
        <span style="font-size: 9.5px; font-family: 'JetBrains Mono'; color: #9CA3AF; text-transform: uppercase;">Campus ERP Sync</span>
        <p style="font-size: 15px; font-weight: 800; color: #10B981; font-family: 'JetBrains Mono'; margin-top: 3px;">1-Click Duty Leave Export</p>
        <span style="font-size: 10px; color: #6B7280;">Automated audit ledger</span>
      </div>
    </div>

    <div class="slide-footer" style="width: 100%; position: absolute; bottom: 10mm; left: 18mm; right: 18mm; width: calc(100% - 36mm);">
      <span>GLA University • Mathura, NH-19</span>
      <span>Engineered by Hack4Tech Core Team</span>
      <span>Comprehensive Technical & Workflow Presentation</span>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- SLIDE 2: DETAILED PROBLEM STATEMENT & ILLUSTRATION -->
  <!-- ========================================== -->
  <div class="slide">
    <div class="slide-header">
      <div>
        <span class="badge" style="color: #EF4444; border-color: rgba(239, 68, 68, 0.4); background: rgba(239, 68, 68, 0.1);">PROBLEM STATEMENT</span>
        <h2 class="slide-title">Campus Event Bottlenecks & Operational Chaos</h2>
        <p class="slide-subtitle">Why manual tools and fragmented spreadsheets fail during high-density collegiate hackathons</p>
      </div>
      <span style="font-family: 'JetBrains Mono'; color: #6B7280; font-size: 11px;">Slide 02 / 16</span>
    </div>

    <!-- Illustrated Pain Points Flow -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin: 12px 0;">
      <div class="card" style="border-left: 4px solid #EF4444; display: flex; gap: 12px; align-items: flex-start;">
        <div style="background: rgba(239, 68, 68, 0.2); color: #EF4444; width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-family: 'JetBrains Mono'; shrink-0;">
          01
        </div>
        <div>
          <h4 style="font-size: 13.5px; font-weight: 700; color: #FFF; margin-bottom: 3px;">Fragmented Google Forms Chaos</h4>
          <p style="font-size: 11px; color: #9CA3AF; line-height: 1.5;">
            Separate Google Forms circulated across class WhatsApp groups cause lost submissions, duplicate team registrations, typos in university roll numbers, and lack a single unified student identity database.
          </p>
        </div>
      </div>

      <div class="card" style="border-left: 4px solid #F59E0B; display: flex; gap: 12px; align-items: flex-start;">
        <div style="background: rgba(245, 158, 11, 0.2); color: #F59E0B; width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-family: 'JetBrains Mono'; shrink-0;">
          02
        </div>
        <div>
          <h4 style="font-size: 13.5px; font-weight: 700; color: #FFF; margin-bottom: 3px;">Severe Gate Reception Bottlenecks (45+ Min Lines)</h4>
          <p style="font-size: 11px; color: #9CA3AF; line-height: 1.5;">
            Volunteers manually scrolling 500+ spreadsheet rows or tick-marking paper printouts at AB-11 & AB-II entrance desks creates massive queues, delaying the hackathon start schedule by over an hour.
          </p>
        </div>
      </div>

      <div class="card" style="border-left: 4px solid #EF4444; display: flex; gap: 12px; align-items: flex-start;">
        <div style="background: rgba(239, 68, 68, 0.2); color: #EF4444; width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-family: 'JetBrains Mono'; shrink-0;">
          03
        </div>
        <div>
          <h4 style="font-size: 13.5px; font-weight: 700; color: #FFF; margin-bottom: 3px;">Ticket Forwarding & Food Coupon Fraud</h4>
          <p style="font-size: 11px; color: #9CA3AF; line-height: 1.5;">
            Without single-entry state locks, attendees forward confirmation screenshots to unregistered friends, enabling unauthorized hall entries, proxy attendance, and multi-redemptions of limited refreshment kits.
          </p>
        </div>
      </div>

      <div class="card" style="border-left: 4px solid #F59E0B; display: flex; gap: 12px; align-items: flex-start;">
        <div style="background: rgba(245, 158, 11, 0.2); color: #F59E0B; width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-family: 'JetBrains Mono'; shrink-0;">
          04
        </div>
        <div>
          <h4 style="font-size: 13.5px; font-weight: 700; color: #FFF; margin-bottom: 3px;">Friction in Academic Duty Leave Approvals</h4>
          <p style="font-size: 11px; color: #9CA3AF; line-height: 1.5;">
            Organizers spend 3 to 5 business days reconciling paper lists with faculty registrars. Students who skipped the hackathon falsely claim attendance, creating administrative disputes.
          </p>
        </div>
      </div>
    </div>

    <!-- Impact Barometer -->
    <div class="card glow-red" style="background: rgba(239, 68, 68, 0.08); display: flex; justify-content: space-around; align-items: center; padding: 10px 16px;">
      <div style="text-align: center;">
        <span style="font-size: 10px; color: #FCA5A5; font-family: 'JetBrains Mono';">AVG GATE DELAY</span>
        <p style="font-size: 18px; font-weight: 800; color: #EF4444; font-family: 'JetBrains Mono';">42 Minutes</p>
      </div>
      <div style="height: 30px; width: 1px; background: rgba(239, 68, 68, 0.3);"></div>
      <div style="text-align: center;">
        <span style="font-size: 10px; color: #FCA5A5; font-family: 'JetBrains Mono';">PROXY CHECK-IN RISK</span>
        <p style="font-size: 18px; font-weight: 800; color: #EF4444; font-family: 'JetBrains Mono';">15–20% of entrants</p>
      </div>
      <div style="height: 30px; width: 1px; background: rgba(239, 68, 68, 0.3);"></div>
      <div style="text-align: center;">
        <span style="font-size: 10px; color: #FCA5A5; font-family: 'JetBrains Mono';">DUTY LEAVE AUDIT TIME</span>
        <p style="font-size: 18px; font-weight: 800; color: #EF4444; font-family: 'JetBrains Mono';">3–5 Days of Cross-checking</p>
      </div>
    </div>

    <div class="slide-footer">
      <span>Root Cause: Absence of real-time state machine & cryptographic verification</span>
      <span>H4T Smart Event Management System</span>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- SLIDE 3: EXISTING SOLUTIONS BENCHMARKING -->
  <!-- ========================================== -->
  <div class="slide">
    <div class="slide-header">
      <div>
        <span class="badge" style="color: #F59E0B; border-color: rgba(245, 158, 11, 0.4); background: rgba(245, 158, 11, 0.1);">MARKET BENCHMARKING</span>
        <h2 class="slide-title">Existing Solutions vs. EventHub EMS</h2>
        <p class="slide-subtitle">Why commercial and manual alternatives fail collegiate academic structures</p>
      </div>
      <span style="font-family: 'JetBrains Mono'; color: #6B7280; font-size: 11px;">Slide 03 / 16</span>
    </div>

    <div class="card" style="padding: 0; overflow: hidden; margin: 12px 0;">
      <table>
        <thead>
          <tr>
            <th>Operational Capability</th>
            <th style="text-align: center; color: #EF4444;">Google Forms + Sheets</th>
            <th style="text-align: center; color: #F59E0B;">Eventbrite / Luma</th>
            <th style="text-align: center; color: #A855F7;">Unstop Competitions</th>
            <th style="text-align: center; color: #00F0FF; background: rgba(0, 240, 255, 0.12);">EventHub EMS 2.0</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="font-weight: 700; color: #FFF;">University Roll No & Dept Hierarchy</td>
            <td style="text-align: center; color: #EF4444;">✕ Freeform text typos</td>
            <td style="text-align: center; color: #EF4444;">✕ Corporate bias</td>
            <td style="text-align: center; color: #10B981;">✓ Partial College Tag</td>
            <td style="text-align: center; color: #00F0FF; font-weight: 700; background: rgba(0, 240, 255, 0.05);">✓ Native GLA University Schema</td>
          </tr>
          <tr>
            <td style="font-weight: 700; color: #FFF;">Instant Dynamic QR Event Pass</td>
            <td style="text-align: center; color: #EF4444;">✕ Zero Pass Generation</td>
            <td style="text-align: center; color: #10B981;">✓ Mobile In-App Pass</td>
            <td style="text-align: center; color: #F59E0B;">△ Web View Only</td>
            <td style="text-align: center; color: #00F0FF; font-weight: 700; background: rgba(0, 240, 255, 0.05);">✓ Cryptographic SVG + Print Sheet</td>
          </tr>
          <tr>
            <td style="font-weight: 700; color: #FFF;">Anti-Duplicate Gate Hard-Lock</td>
            <td style="text-align: center; color: #EF4444;">✕ Zero Fraud Protection</td>
            <td style="text-align: center; color: #F59E0B;">△ Slow Cloud Latency</td>
            <td style="text-align: center; color: #EF4444;">✕ No Gate Terminal</td>
            <td style="text-align: center; color: #00F0FF; font-weight: 700; background: rgba(0, 240, 255, 0.05);">✓ Sub-100ms Atomic Duplicate Lock</td>
          </tr>
          <tr>
            <td style="font-weight: 700; color: #FFF;">Zero-Login Self-Serve Pass Retrieval</td>
            <td style="text-align: center; color: #EF4444;">✕ Lost in WhatsApp/Spam</td>
            <td style="text-align: center; color: #EF4444;">✕ Mandatory Account Creation</td>
            <td style="text-align: center; color: #EF4444;">✕ Mandatory Mobile App</td>
            <td style="text-align: center; color: #00F0FF; font-weight: 700; background: rgba(0, 240, 255, 0.05);">✓ Direct College Email Lookup</td>
          </tr>
          <tr>
            <td style="font-weight: 700; color: #FFF;">Dual Gate Mode (Camera & Laser Barcode)</td>
            <td style="text-align: center; color: #EF4444;">✕ None</td>
            <td style="text-align: center; color: #F59E0B;">△ Mobile Camera Only</td>
            <td style="text-align: center; color: #EF4444;">✕ None</td>
            <td style="text-align: center; color: #00F0FF; font-weight: 700; background: rgba(0, 240, 255, 0.05);">✓ Continuous Camera + USB Gun</td>
          </tr>
          <tr>
            <td style="font-weight: 700; color: #FFF;">Late Arrival Audit & Flagging</td>
            <td style="text-align: center; color: #EF4444;">✕ Manual Notes</td>
            <td style="text-align: center; color: #EF4444;">✕ Not Supported</td>
            <td style="text-align: center; color: #EF4444;">✕ Not Supported</td>
            <td style="text-align: center; color: #00F0FF; font-weight: 700; background: rgba(0, 240, 255, 0.05);">✓ Dedicated Late Mode + Timestamp</td>
          </tr>
          <tr>
            <td style="font-weight: 700; color: #FFF;">Official Academic Duty Leave Export</td>
            <td style="text-align: center; color: #F59E0B;">△ Raw Unfiltered Dump</td>
            <td style="text-align: center; color: #EF4444;">✕ Non-academic generic</td>
            <td style="text-align: center; color: #F59E0B;">△ Generic Table Dump</td>
            <td style="text-align: center; color: #00F0FF; font-weight: 700; background: rgba(0, 240, 255, 0.05);">✓ Formatted Leave Rosters + Signature Pad</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="slide-footer">
      <span>EventHub is purpose-built for Indian collegiate administration and fast gate check-ins</span>
      <span>H4T Smart Event Management System</span>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- SLIDE 4: SYSTEM ARCHITECTURE (DETAILED DIAGRAM) -->
  <!-- ========================================== -->
  <div class="slide">
    <div class="slide-header">
      <div>
        <span class="badge">SYSTEM ARCHITECTURE</span>
        <h2 class="slide-title">End-to-End Technical Stack & Architecture</h2>
        <p class="slide-subtitle">Multi-tier decoupled architecture engineered for sub-second verification and zero downtime</p>
      </div>
      <span style="font-family: 'JetBrains Mono'; color: #6B7280; font-size: 11px;">Slide 04 / 16</span>
    </div>

    <!-- Visual Architecture Diagram via SVG -->
    <div style="margin: 8px 0; background: #080A12; border: 1px solid #1F293D; border-radius: 12px; padding: 10px;">
      <svg viewBox="0 0 850 280" style="width: 100%; height: auto;">
        <defs>
          <marker id="arrow-cyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#00F0FF" />
          </marker>
          <marker id="arrow-purple" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#A855F7" />
          </marker>
          <marker id="arrow-emerald" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#10B981" />
          </marker>
        </defs>

        <!-- Tier 1: Client Layer -->
        <rect x="20" y="20" width="240" height="240" class="diagram-box" stroke="#00F0FF" stroke-dasharray="4 2" />
        <text x="35" y="42" fill="#00F0FF" font-family="JetBrains Mono" font-size="11" font-weight="700">TIER 1: CLIENT PRESENTATION</text>
        
        <rect x="35" y="55" width="210" height="36" rx="6" fill="#131B2E" stroke="#1F293D" />
        <text x="45" y="73" class="diagram-text-title">React 18 & TypeScript</text>
        <text x="45" y="84" class="diagram-text-desc">Vite 6 SPA • Glassmorphic Cyber-Neon UI</text>

        <rect x="35" y="98" width="210" height="36" rx="6" fill="#131B2E" stroke="#1F293D" />
        <text x="45" y="116" class="diagram-text-title">QR Scanner Engine</text>
        <text x="45" y="127" class="diagram-text-desc">html5-qrcode (Camera) + Laser Barcode Gun</text>

        <rect x="35" y="141" width="210" height="36" rx="6" fill="#131B2E" stroke="#1F293D" />
        <text x="45" y="159" class="diagram-text-title">Web Audio Synthesizer</text>
        <text x="45" y="170" class="diagram-text-desc">0ms Latency Audio Feedback (Chime/Buzzer)</text>

        <rect x="35" y="184" width="210" height="36" rx="6" fill="#131B2E" stroke="#1F293D" />
        <text x="45" y="202" class="diagram-text-title">QR Vector Pass Generator</text>
        <text x="45" y="213" class="diagram-text-desc">qrcode.react SVG + Print Stylesheet Layout</text>

        <!-- Connection Arrow 1 to 2 -->
        <path d="M 260 140 L 305 140" class="diagram-arrow" />
        <text x="264" y="132" fill="#00F0FF" font-family="JetBrains Mono" font-size="9">REST / JSON</text>

        <!-- Tier 2: Application API Layer -->
        <rect x="310" y="20" width="250" height="240" class="diagram-box" stroke="#A855F7" stroke-dasharray="4 2" />
        <text x="325" y="42" fill="#A855F7" font-family="JetBrains Mono" font-size="11" font-weight="700">TIER 2: NODE.JS & EXPRESS SERVICES</text>

        <rect x="325" y="55" width="220" height="36" rx="6" fill="#1A1528" stroke="#2D1F47" />
        <text x="335" y="73" class="diagram-text-title">Event Registration Router</text>
        <text x="335" y="84" class="diagram-text-desc">Individual/Team Ingestion & Roll No Validator</text>

        <rect x="325" y="98" width="220" height="36" rx="6" fill="#1A1528" stroke="#2D1F47" />
        <text x="335" y="116" class="diagram-text-title" fill="#F43F5E">Anti-Duplicate Transaction Lock</text>
        <text x="335" y="127" class="diagram-text-desc">Single-entry state machine enforcement</text>

        <rect x="325" y="141" width="220" height="36" rx="6" fill="#1A1528" stroke="#2D1F47" />
        <text x="335" y="159" class="diagram-text-title">Gate Terminal Controller</text>
        <text x="335" y="170" class="diagram-text-desc">Scan verification, Late arrival & Audit logging</text>

        <rect x="325" y="184" width="220" height="36" rx="6" fill="#1A1528" stroke="#2D1F47" />
        <text x="335" y="202" class="diagram-text-title">Streaming CSV & Leave Exporter</text>
        <text x="335" y="213" class="diagram-text-desc">Dynamic CSV streaming & Physical sign-in sheet</text>

        <!-- Connection Arrow 2 to 3 -->
        <path d="M 560 140 L 605 140" class="diagram-arrow-purple" />
        <text x="562" y="132" fill="#A855F7" font-family="JetBrains Mono" font-size="9">Atomic I/O</text>

        <!-- Tier 3: Data & Audit Layer -->
        <rect x="610" y="20" width="220" height="240" class="diagram-box" stroke="#10B981" stroke-dasharray="4 2" />
        <text x="625" y="42" fill="#10B981" font-family="JetBrains Mono" font-size="11" font-weight="700">TIER 3: PERSISTENT STORAGE</text>

        <rect x="625" y="55" width="190" height="42" rx="6" fill="#11221B" stroke="#1A3B2F" />
        <text x="635" y="73" class="diagram-text-title">db.json Atomic Store</text>
        <text x="635" y="86" class="diagram-text-desc">Events, Registrations, Admin Auth</text>

        <rect x="625" y="105" width="190" height="42" rx="6" fill="#11221B" stroke="#1A3B2F" />
        <text x="635" y="123" class="diagram-text-title">Audit Ledger Logs</text>
        <text x="635" y="136" class="diagram-text-desc">CheckInLogs: First Scans, Duplicates</text>

        <rect x="625" y="155" width="190" height="42" rx="6" fill="#11221B" stroke="#1A3B2F" />
        <text x="635" y="173" class="diagram-text-title">Static Public Assets</text>
        <text x="635" y="186" class="diagram-text-desc">Posters, Logos, PDF Exports</text>
      </svg>
    </div>

    <div class="slide-footer">
      <span>Performance Benchmark: Sub-100ms average scan-to-database write time</span>
      <span>H4T Smart Event Management System</span>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- SLIDE 5: END-TO-END PROJECT WORKFLOW DIAGRAM -->
  <!-- ========================================== -->
  <div class="slide">
    <div class="slide-header">
      <div>
        <span class="badge">WORKFLOW PIPELINE</span>
        <h2 class="slide-title">End-to-End System Workflow Diagram</h2>
        <p class="slide-subtitle">Visual mapping of the student journey and the organizer gate check-in pipeline</p>
      </div>
      <span style="font-family: 'JetBrains Mono'; color: #6B7280; font-size: 11px;">Slide 05 / 16</span>
    </div>

    <!-- Complete Workflow Diagram SVG -->
    <div style="margin: 8px 0; background: #080A12; border: 1px solid #1F293D; border-radius: 12px; padding: 10px;">
      <svg viewBox="0 0 850 280" style="width: 100%; height: auto;">
        <!-- Track 1: Student Flow -->
        <rect x="15" y="15" width="820" height="110" rx="10" fill="#0C101B" stroke="#00F0FF" stroke-width="1.2" />
        <text x="30" y="34" fill="#00F0FF" font-family="JetBrains Mono" font-size="11" font-weight="700">TRACK A: STUDENT PARTICIPATION JOURNEY</text>

        <!-- Step 1 -->
        <rect x="30" y="45" width="135" height="68" rx="8" fill="#131B2E" stroke="#1F293D" />
        <text x="40" y="65" class="diagram-text-title">1. Event Discovery</text>
        <text x="40" y="78" class="diagram-text-desc">Browse VisionX /</text>
        <text x="40" y="90" class="diagram-text-desc">RavenX / Ignix tracks</text>

        <path d="M 165 79 L 195 79" class="diagram-arrow" />

        <!-- Step 2 -->
        <rect x="195" y="45" width="145" height="68" rx="8" fill="#131B2E" stroke="#1F293D" />
        <text x="205" y="65" class="diagram-text-title">2. Solo / Team Ingestion</text>
        <text x="205" y="78" class="diagram-text-desc">Roll No, Email, Dept,</text>
        <text x="205" y="90" class="diagram-text-desc">Dynamic teammate fields</text>

        <path d="M 340 79 L 370 79" class="diagram-arrow" />

        <!-- Step 3 -->
        <rect x="370" y="45" width="145" height="68" rx="8" fill="#131B2E" stroke="#1F293D" />
        <text x="380" y="65" class="diagram-text-title">3. Instant Pass Generation</text>
        <text x="380" y="78" class="diagram-text-desc">Unique Ticket ID +</text>
        <text x="380" y="90" class="diagram-text-desc">Encrypted QR SVG pass</text>

        <path d="M 515 79 L 545 79" class="diagram-arrow" />

        <!-- Step 4 -->
        <rect x="545" y="45" width="135" height="68" rx="8" fill="#131B2E" stroke="#1F293D" />
        <text x="555" y="65" class="diagram-text-title">4. Find My Pass</text>
        <text x="555" y="78" class="diagram-text-desc">Zero-login pass lookup</text>
        <text x="555" y="90" class="diagram-text-desc">via registered email</text>

        <path d="M 680 79 L 710 79" class="diagram-arrow" />

        <!-- Step 5 -->
        <rect x="710" y="45" width="115" height="68" rx="8" fill="#10251C" stroke="#10B981" />
        <text x="720" y="65" class="diagram-text-title" fill="#10B981">5. Gate Arrival</text>
        <text x="720" y="78" class="diagram-text-desc">Show pass on</text>
        <text x="720" y="90" class="diagram-text-desc">phone at AB-11/AB-II</text>

        <!-- Vertical Sync Arrow -->
        <path d="M 767 113 L 767 145" stroke="#A855F7" stroke-width="2" stroke-dasharray="3 3" />

        <!-- Track 2: Organizer Flow -->
        <rect x="15" y="145" width="820" height="110" rx="10" fill="#0C101B" stroke="#A855F7" stroke-width="1.2" />
        <text x="30" y="164" fill="#A855F7" font-family="JetBrains Mono" font-size="11" font-weight="700">TRACK B: GATE RECEPTION & UNIVERSITY GOVERNANCE</text>

        <!-- Step 1 Org -->
        <rect x="30" y="175" width="135" height="68" rx="8" fill="#1A1528" stroke="#2D1F47" />
        <text x="40" y="195" class="diagram-text-title">1. Camera / Gun Scan</text>
        <text x="40" y="208" class="diagram-text-desc">Scan QR at Gate 1 /</text>
        <text x="40" y="220" class="diagram-text-desc">Station 2 reception</text>

        <path d="M 165 209 L 195 209" class="diagram-arrow-purple" />

        <!-- Step 2 Org -->
        <rect x="195" y="175" width="145" height="68" rx="8" fill="#1A1528" stroke="#2D1F47" />
        <text x="205" y="195" class="diagram-text-title" fill="#F43F5E">2. Anti-Duplicate Lock</text>
        <text x="205" y="208" class="diagram-text-desc">If already scanned:</text>
        <text x="205" y="220" class="diagram-text-desc" fill="#EF4444">409 BUZZER ALARM</text>

        <path d="M 340 209 L 370 209" class="diagram-arrow-purple" />

        <!-- Step 3 Org -->
        <rect x="370" y="175" width="145" height="68" rx="8" fill="#1A1528" stroke="#2D1F47" />
        <text x="380" y="195" class="diagram-text-title">3. Late Flag / Override</text>
        <text x="380" y="208" class="diagram-text-desc">Mark late arrivals or</text>
        <text x="380" y="220" class="diagram-text-desc">manual pass overrides</text>

        <path d="M 515 209 L 545 209" class="diagram-arrow-purple" />

        <!-- Step 4 Org -->
        <rect x="545" y="175" width="135" height="68" rx="8" fill="#1A1528" stroke="#2D1F47" />
        <text x="555" y="195" class="diagram-text-title">4. Real-Time Stream</text>
        <text x="555" y="208" class="diagram-text-desc">Turnout analytics &</text>
        <text x="555" y="220" class="diagram-text-desc">check-in ledger log</text>

        <path d="M 680 209 L 710 209" class="diagram-arrow-purple" />

        <!-- Step 5 Org -->
        <rect x="710" y="175" width="115" height="68" rx="8" fill="#10251C" stroke="#10B981" />
        <text x="720" y="195" class="diagram-text-title" fill="#10B981">5. Duty Leave</text>
        <text x="720" y="208" class="diagram-text-desc">1-Click CSV export</text>
        <text x="720" y="220" class="diagram-text-desc">for Registrar sync</text>
      </svg>
    </div>

    <div class="slide-footer">
      <span>Zero drop-off from registration form to certified university academic attendance</span>
      <span>H4T Smart Event Management System</span>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- SLIDE 6: REGISTRATION & CRYPTOGRAPHIC PASS ISSUANCE -->
  <!-- ========================================== -->
  <div class="slide">
    <div class="slide-header">
      <div>
        <span class="badge">PASS GENERATOR</span>
        <h2 class="slide-title">Registration Engine & Cryptographic Pass Data</h2>
        <p class="slide-subtitle">Structured collegiate data ingestion and tamper-evident payload encoding</p>
      </div>
      <span style="font-family: 'JetBrains Mono'; color: #6B7280; font-size: 11px;">Slide 06 / 16</span>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 12px 0;">
      <!-- Left: Ingestion Logic -->
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <div class="card" style="border-left: 3px solid #00F0FF;">
          <h4 style="font-size: 13px; font-weight: 700; color: #FFF;">• Dynamic Solo vs Team Engine:</h4>
          <p style="font-size: 11px; color: #9CA3AF; margin-top: 2px;">
            Supports solo registration (Ignix) and multi-member team formation (VisionX 1–4, RavenX 2–4). Dynamically adds Member 2, 3, and 4 with full name, email, phone, and roll number.
          </p>
        </div>

        <div class="card" style="border-left: 3px solid #A855F7;">
          <h4 style="font-size: 13px; font-weight: 700; color: #FFF;">• Unique Pass Prefix Generator:</h4>
          <p style="font-size: 11px; color: #9CA3AF; margin-top: 2px;">
            Constructs human-readable, scan-safe codes: <code style="color: #00F0FF;">H4T-VX-91823</code> (VisionX), <code style="color: #A855F7;">H4T-RX-48201</code> (RavenX), <code style="color: #EC4899;">H4T-IX-30219</code> (Ignix).
          </p>
        </div>

        <div class="card" style="border-left: 3px solid #10B981;">
          <h4 style="font-size: 13px; font-weight: 700; color: #FFF;">• Pre-Registration Duplicate Guard:</h4>
          <p style="font-size: 11px; color: #9CA3AF; margin-top: 2px;">
            Scans existing database records to block the same student email from double-registering for the same event, displaying their existing pass code instantly.
          </p>
        </div>
      </div>

      <!-- Right: QR Payload Schema & Digital Pass -->
      <div class="card glow-purple" style="background: #0B0E18;">
        <span class="badge" style="color: #A855F7; border-color: rgba(168, 85, 247, 0.4); font-size: 9px;">TAMPER-EVIDENT QR PAYLOAD JSON</span>
        <pre style="background: #06080F; border: 1px solid #1F293D; border-radius: 8px; padding: 10px; font-family: 'JetBrains Mono'; font-size: 10px; color: #00F0FF; margin-top: 8px; line-height: 1.5; overflow: hidden;">
{
  "ticketId": "H4T-VX-91823",
  "eventId": "visionx-2026",
  "attendee": "Aryan Sharma",
  "email": "aryan.sharma@gla.ac.in",
  "rollNo": "2115000101",
  "type": "team",
  "team": "CyberKnights",
  "members": 3,
  "issuedAt": "2026-11-20T10:30:00Z",
  "org": "HACK4TECH GLAU"
}</pre>
        <div style="margin-top: 8px; font-size: 10.5px; color: #D1D5DB; line-height: 1.4;">
          <strong style="color: #FFF;">Security Note:</strong> The payload encodes team composition, event scope, and roll numbers, allowing the gate terminal to verify attendees even during temporary network latency.
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span>Pass incorporates digital barcode, hologram effect, and print stylesheet for gate entry</span>
      <span>H4T Smart Event Management System</span>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- SLIDE 7: SELF-SERVE "FIND MY PASS" ARCHITECTURE -->
  <!-- ========================================== -->
  <div class="slide">
    <div class="slide-header">
      <div>
        <span class="badge">STUDENT ACCESSIBILITY</span>
        <h2 class="slide-title">Self-Serve "Find My Pass" Portal</h2>
        <p class="slide-subtitle">Zero-login pass retrieval architecture empowering students to access tickets anywhere</p>
      </div>
      <span style="font-family: 'JetBrains Mono'; color: #6B7280; font-size: 11px;">Slide 07 / 16</span>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 14px 0; align-items: center;">
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <h3 style="font-size: 16px; font-weight: 700; color: #FFF;">Eliminating the "I Lost My Pass" Problem</h3>
        <p style="font-size: 11.5px; color: #9CA3AF; line-height: 1.6;">
          Students frequently delete emails, drop WhatsApp chats, or swap phones on the morning of a hackathon. Traditional systems require frantic email requests to organizers.
        </p>

        <div class="card" style="border-left: 3px solid #00F0FF; font-size: 11.5px; color: #D1D5DB; line-height: 1.5;">
          <strong style="color: #00F0FF;">1. Zero-Password Email Verification:</strong>
          Attendee inputs their registered college email (e.g. <code style="color: #00F0FF;">aryan.sharma@gla.ac.in</code>).
        </div>

        <div class="card" style="border-left: 3px solid #A855F7; font-size: 11.5px; color: #D1D5DB; line-height: 1.5;">
          <strong style="color: #A855F7;">2. Dual Leader & Member Indexing:</strong>
          Backend search queries match both the team leader's email and all dynamic teammates' emails inside <code style="color: #A855F7;">members[].email</code>.
        </div>

        <div class="card" style="border-left: 3px solid #10B981; font-size: 11.5px; color: #D1D5DB; line-height: 1.5;">
          <strong style="color: #10B981;">3. Instant Digital Card Modal:</strong>
          Returns all active passes with live status (<code style="color: #00F0FF;">REGISTERED</code>, <code style="color: #10B981;">CHECKED_IN</code>, <code style="color: #F59E0B;">LATE</code>) and a 1-click print trigger.
        </div>
      </div>

      <div class="card glow-cyan" style="padding: 16px; background: #0B0E18;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <span style="font-size: 11px; font-family: 'JetBrains Mono'; color: #00F0FF; font-weight: 700;">LIVE LOOKUP API FLOW</span>
          <span class="badge" style="font-size: 9px;">GET /api/registrations/lookup</span>
        </div>

        <div style="background: #06080F; border: 1px solid #1F293D; border-radius: 8px; padding: 12px; font-family: 'JetBrains Mono'; font-size: 10.5px; line-height: 1.6;">
          <p style="color: #6B7280;">// Query: ?email=ananya.joshi@gla.ac.in</p>
          <p style="color: #10B981;">HTTP/1.1 200 OK</p>
          <p style="color: #FFF;">{</p>
          <p style="color: #D1D5DB; padding-left: 10px;">"success": true,</p>
          <p style="color: #D1D5DB; padding-left: 10px;">"count": 1,</p>
          <p style="color: #D1D5DB; padding-left: 10px;">"data": [{</p>
          <p style="color: #00F0FF; padding-left: 20px;">"ticketId": "H4T-RX-48201",</p>
          <p style="color: #A855F7; padding-left: 20px;">"event": "RAVENX GIRLS HACKATHON",</p>
          <p style="color: #D1D5DB; padding-left: 20px;">"teamName": "ByteQueens",</p>
          <p style="color: #10B981; padding-left: 20px;">"status": "REGISTERED"</p>
          <p style="color: #D1D5DB; padding-left: 10px;">}]</p>
          <p style="color: #FFF;">}</p>
        </div>

        <p style="font-size: 10.5px; color: #9CA3AF; margin-top: 8px;">
          ✓ Allows any team member to retrieve their team pass without needing the leader.
        </p>
      </div>
    </div>

    <div class="slide-footer">
      <span>Zero registration drop-out due to lost or misplaced emails</span>
      <span>H4T Smart Event Management System</span>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- SLIDE 8: GATE TERMINAL & SCANNING ARCHITECTURE -->
  <!-- ========================================== -->
  <div class="slide">
    <div class="slide-header">
      <div>
        <span class="badge">GATE OPERATIONS</span>
        <h2 class="slide-title">Live QR Scanner & Gate Reception Terminal</h2>
        <p class="slide-subtitle">Hardware-agnostic scanning with continuous camera stream and Web Audio feedback</p>
      </div>
      <span style="font-family: 'JetBrains Mono'; color: #6B7280; font-size: 11px;">Slide 08 / 16</span>
    </div>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin: 14px 0;">
      <!-- Driver 1 -->
      <div class="card glow-cyan">
        <h4 style="font-size: 13.5px; font-weight: 700; color: #FFF; margin-bottom: 6px;">1. Continuous Camera Stream</h4>
        <p style="font-size: 11px; color: #9CA3AF; line-height: 1.5;">
          Powered by <code style="color: #00F0FF;">html5-qrcode</code>. Continuous 10 FPS video decoding with custom viewfinder constraints. Works on laptop webcams and phone rear cameras.
        </p>
        <div style="margin-top: 10px; padding: 6px; background: rgba(0, 240, 255, 0.08); border-radius: 6px; font-size: 10px; font-family: 'JetBrains Mono'; color: #00F0FF;">
          Auto-debounces identical frames
        </div>
      </div>

      <!-- Driver 2 -->
      <div class="card glow-purple">
        <h4 style="font-size: 13.5px; font-weight: 700; color: #FFF; margin-bottom: 6px;">2. Laser Barcode Gun Driver</h4>
        <p style="font-size: 11px; color: #9CA3AF; line-height: 1.5;">
          Physical USB barcode scanners simulate keyboard inputs. Dedicated barcode capture listener handles high-speed laser scans with automatic enter-key dispatching.
        </p>
        <div style="margin-top: 10px; padding: 6px; background: rgba(168, 85, 247, 0.08); border-radius: 6px; font-size: 10px; font-family: 'JetBrains Mono'; color: #A855F7;">
          Sub-50ms hardware input capture
        </div>
      </div>

      <!-- Driver 3 -->
      <div class="card" style="border: 1px solid rgba(16, 185, 129, 0.4);">
        <h4 style="font-size: 13.5px; font-weight: 700; color: #FFF; margin-bottom: 6px;">3. Web Audio Synthesizer</h4>
        <p style="font-size: 11px; color: #9CA3AF; line-height: 1.5;">
          Synthesizes audio frequencies dynamically via native AudioContext oscillators. Eliminates audio file HTTP requests for instantaneous audio feedback.
        </p>
        <div style="margin-top: 10px; padding: 6px; background: rgba(16, 185, 129, 0.08); border-radius: 6px; font-size: 10px; font-family: 'JetBrains Mono'; color: #10B981;">
          880Hz Chime • 220Hz Buzzer Alarm
        </div>
      </div>
    </div>

    <!-- Station Tagging Strip -->
    <div class="card" style="background: #0B0E18; font-family: 'JetBrains Mono'; font-size: 11px; display: flex; justify-content: space-between; align-items: center;">
      <span><strong style="color: #00F0FF;">GATE TAGGING:</strong> Every scan captures station identity (e.g. "Main Gate Station 1", "Room 5046 Desk")</span>
      <span style="color: #10B981; font-weight: 700;">✓ Audit Compliant</span>
    </div>

    <div class="slide-footer">
      <span>Handles 40+ scans per minute per volunteer station without queue stalls</span>
      <span>H4T Smart Event Management System</span>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- SLIDE 9: ANTI-DUPLICATE SECURITY STATE MACHINE -->
  <!-- ========================================== -->
  <div class="slide">
    <div class="slide-header">
      <div>
        <span class="badge" style="color: #EF4444; border-color: rgba(239, 68, 68, 0.4); background: rgba(239, 68, 68, 0.1);">SECURITY STATE MACHINE</span>
        <h2 class="slide-title">Anti-Duplicate Transaction Lock Sequence</h2>
        <p class="slide-subtitle">Mathematical enforcement of single-entry integrity per registration ticket</p>
      </div>
      <span style="font-family: 'JetBrains Mono'; color: #6B7280; font-size: 11px;">Slide 09 / 16</span>
    </div>

    <!-- State Machine Sequence Diagram via SVG -->
    <div style="margin: 8px 0; background: #080A12; border: 1px solid #1F293D; border-radius: 12px; padding: 10px;">
      <svg viewBox="0 0 850 240" style="width: 100%; height: auto;">
        <!-- State 1 -->
        <circle cx="100" cy="120" r="50" fill="#131B2E" stroke="#00F0FF" stroke-width="2" />
        <text x="100" y="115" text-anchor="middle" fill="#00F0FF" font-family="JetBrains Mono" font-size="11" font-weight="700">STATE 1</text>
        <text x="100" y="132" text-anchor="middle" fill="#FFF" font-family="Space Grotesk" font-size="10" font-weight="600">REGISTERED</text>

        <!-- Arrow 1 to 2 -->
        <path d="M 155 120 L 275 120" class="diagram-arrow" />
        <text x="165" y="112" fill="#00F0FF" font-family="JetBrains Mono" font-size="9.5">Scan Pass (First Time)</text>

        <!-- State 2 -->
        <circle cx="330" cy="120" r="50" fill="#11241C" stroke="#10B981" stroke-width="2" />
        <text x="330" y="115" text-anchor="middle" fill="#10B981" font-family="JetBrains Mono" font-size="11" font-weight="700">STATE 2</text>
        <text x="330" y="132" text-anchor="middle" fill="#FFF" font-family="Space Grotesk" font-size="10" font-weight="600">CHECKED_IN</text>

        <!-- Arrow Success Branch -->
        <path d="M 385 120 L 505 80" class="diagram-arrow-emerald" />
        <text x="395" y="90" fill="#10B981" font-family="JetBrains Mono" font-size="9.5">Success (200 OK)</text>

        <!-- Node Success -->
        <rect x="510" y="55" width="220" height="50" rx="8" fill="#11241C" stroke="#10B981" />
        <text x="520" y="75" fill="#10B981" font-family="Space Grotesk" font-size="11" font-weight="700">✓ GATE ENTRY GRANTED</text>
        <text x="520" y="90" class="diagram-text-desc">Success Chime + Confetti + Swag Issued</text>

        <!-- Arrow Duplicate Reject Branch -->
        <path d="M 385 130 L 505 170" stroke="#EF4444" stroke-width="2" fill="none" marker-end="url(#arrow-red)" />
        <text x="395" y="165" fill="#EF4444" font-family="JetBrains Mono" font-size="9.5">Re-Scan / Screenshot</text>

        <!-- Node Duplicate -->
        <rect x="510" y="150" width="220" height="55" rx="8" fill="#2A1014" stroke="#EF4444" />
        <text x="520" y="170" fill="#EF4444" font-family="Space Grotesk" font-size="11" font-weight="700">⚠️ 409 DUPLICATE BLOCKED</text>
        <text x="520" y="184" class="diagram-text-desc">Double Buzzer + Flash Red Banner</text>
        <text x="520" y="196" fill="#FCA5A5" font-family="JetBrains Mono" font-size="8.5">Prior check-in: 08:45 AM at Gate 1</text>
      </svg>
    </div>

    <div class="card" style="font-size: 11px; color: #D1D5DB; line-height: 1.5;">
      <strong style="color: #FFF;">Zero Bypass Guarantee:</strong> Even if an attendee presents a forwarded QR code screenshot at Gate 2 while their teammate entered through Gate 1, the terminal detects the timestamp collision and rejects entry.
    </div>

    <div class="slide-footer">
      <span>100% elimination of proxy check-ins and duplicate refreshment kit claims</span>
      <span>H4T Smart Event Management System</span>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- SLIDE 10: LATE ARRIVAL MANAGEMENT & OVERRIDES -->
  <!-- ========================================== -->
  <div class="slide">
    <div class="slide-header">
      <div>
        <span class="badge" style="color: #F59E0B; border-color: rgba(245, 158, 11, 0.4); background: rgba(245, 158, 11, 0.1);">OPERATIONAL CONTROLS</span>
        <h2 class="slide-title">Late Arrival Tracking & Manual Overrides</h2>
        <p class="slide-subtitle">Managing campus edge cases with automated timestamping and administrator overrides</p>
      </div>
      <span style="font-family: 'JetBrains Mono'; color: #6B7280; font-size: 11px;">Slide 10 / 16</span>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 14px 0;">
      <!-- Mode 1: Late Flagging -->
      <div class="card" style="border-left: 4px solid #F59E0B; space-y: 8px;">
        <span class="badge" style="color: #F59E0B; border-color: rgba(245, 158, 11, 0.4); background: rgba(245, 158, 11, 0.1);">LATE ARRIVAL TOGGLE</span>
        <h4 style="font-size: 15px; font-weight: 700; color: #FFF; margin: 6px 0 4px 0;">Automated Late Audit Flagging</h4>
        <p style="font-size: 11.5px; color: #9CA3AF; line-height: 1.5;">
          Students frequently arrive after the 9:00 AM kickoff due to prior university morning lectures or lab practicals.
        </p>
        <ul style="font-size: 11px; color: #D1D5DB; line-height: 1.6; margin-top: 6px; list-style: none;">
          <li>• Dedicated <strong style="color: #F59E0B;">"Mark as Late Arrival"</strong> toggle in the scanner terminal.</li>
          <li>• Transitions pass to <code style="color: #F59E0B;">LATE</code> status with arrival timestamp.</li>
          <li>• Synthesizes distinctive warning chime (587Hz-880Hz triangle wave).</li>
          <li>• Permits entry while flagging student record for leave reconciliation.</li>
        </ul>
      </div>

      <!-- Mode 2: Manual Overrides -->
      <div class="card" style="border-left: 4px solid #00F0FF; space-y: 8px;">
        <span class="badge" style="font-size: 9px;">MANUAL ADMIN CONTROLS</span>
        <h4 style="font-size: 15px; font-weight: 700; color: #FFF; margin: 6px 0 4px 0;">Instant Attendee Search & Status Overrides</h4>
        <p style="font-size: 11.5px; color: #9CA3AF; line-height: 1.5;">
          For situations where an attendee's phone battery died or their screen is cracked, volunteers have real-time manual search controls:
        </p>
        <ul style="font-size: 11px; color: #D1D5DB; line-height: 1.6; margin-top: 6px; list-style: none;">
          <li>• <strong>Instant Search:</strong> Search by Student Name, Roll No, or Ticket ID.</li>
          <li>• <strong>Present:</strong> Manually marks attendee Checked-In with audit log.</li>
          <li>• <strong>Absent:</strong> Flags no-shows to free up waitlist seats.</li>
          <li>• <strong>Reset:</strong> Clears accidental scans with administrator credential lock.</li>
        </ul>
      </div>
    </div>

    <!-- Audit Strip -->
    <div class="card" style="background: #0B0E18; font-size: 11px; color: #9CA3AF; display: flex; justify-content: space-between;">
      <span>Every status alteration creates an immutable entry in <code style="color: #A855F7;">checkInLogs</code></span>
      <span style="color: #00F0FF; font-family: 'JetBrains Mono';">Admin Action Traceability</span>
    </div>

    <div class="slide-footer">
      <span>Balances high security with pragmatic on-ground college flexibility</span>
      <span>H4T Smart Event Management System</span>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- SLIDE 11: FLAGSHIP EVENT 1 - VISIONX -->
  <!-- ========================================== -->
  <div class="slide">
    <div class="slide-header">
      <div>
        <span class="badge">EVENT SHOWCASE 01</span>
        <h2 class="slide-title">VISIONX — 8-Hour Multi-Track Hackathon</h2>
        <p class="slide-subtitle">"Turning Vision Into Reality" • Flagship Software & Hardware Sprint</p>
      </div>
      <span style="font-family: 'JetBrains Mono'; color: #6B7280; font-size: 11px;">Slide 11 / 16</span>
    </div>

    <div style="display: grid; grid-template-columns: 200px 1fr; gap: 18px; margin: 12px 0; align-items: center;">
      <div style="height: 250px; border-radius: 12px; overflow: hidden; background: #000; border: 1px solid rgba(0, 240, 255, 0.4); box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);">
        <img src="${visionxBase64}" style="width: 100%; height: 100%; object-fit: cover; object-position: top;" />
      </div>

      <div style="display: flex; flex-direction: column; gap: 10px;">
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
          <div class="card" style="padding: 10px;">
            <span style="font-size: 9.5px; font-family: 'JetBrains Mono'; color: #9CA3AF;">PRIZE POOL</span>
            <p style="font-size: 15px; font-weight: 800; color: #F59E0B; font-family: 'JetBrains Mono';">₹25,000+ Worth</p>
          </div>
          <div class="card" style="padding: 10px;">
            <span style="font-size: 9.5px; font-family: 'JetBrains Mono'; color: #9CA3AF;">REGISTRATION FEE</span>
            <p style="font-size: 15px; font-weight: 800; color: #00F0FF; font-family: 'JetBrains Mono';">₹89 / Student</p>
          </div>
          <div class="card" style="padding: 10px;">
            <span style="font-size: 9.5px; font-family: 'JetBrains Mono'; color: #9CA3AF;">VENUE</span>
            <p style="font-size: 13px; font-weight: 700; color: #FFF;">CSED Block, AB-11</p>
          </div>
        </div>

        <div class="card" style="font-size: 11.5px; color: #D1D5DB; line-height: 1.5;">
          <strong style="color: #00F0FF; display: block; margin-bottom: 2px;">Focus Domains & Tracks:</strong>
          AI / Machine Learning • Cloud Computing & DevOps • Cyber Security & Ethical Hacking • Web & Mobile Application Development.
        </div>

        <div class="card" style="font-size: 11px; color: #9CA3AF; line-height: 1.5;">
          <strong style="color: #FFF;">Inclusions:</strong> Goodies, Certificates, Gourmet Refreshments, Academic Duty Leave approved for all college branches. Team Size: 1 to 4 Members.
          <br /><strong style="color: #FFF;">Coordinators:</strong> Manish Chaudhary (+91 9368322158) & Ankit Saraswat (+91 7906820322).
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span>Instagram: @Hack4Tech.GLAU • GLA University Office of Students' Welfare</span>
      <span>H4T Smart Event Management System</span>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- SLIDE 12: FLAGSHIP EVENT 2 - RAVENX -->
  <!-- ========================================== -->
  <div class="slide">
    <div class="slide-header">
      <div>
        <span class="badge" style="color: #A855F7; border-color: rgba(168, 85, 247, 0.4); background: rgba(168, 85, 247, 0.1);">EVENT SHOWCASE 02</span>
        <h2 class="slide-title">RAVENX — Girls Only Hackathon (Powered by Unstop)</h2>
        <p class="slide-subtitle">"Her Power. Her Code. Her Future." • Empowering Women in Technology</p>
      </div>
      <span style="font-family: 'JetBrains Mono'; color: #6B7280; font-size: 11px;">Slide 12 / 16</span>
    </div>

    <div style="display: grid; grid-template-columns: 200px 1fr; gap: 18px; margin: 12px 0; align-items: center;">
      <div style="height: 250px; border-radius: 12px; overflow: hidden; background: #000; border: 1px solid rgba(168, 85, 247, 0.4); box-shadow: 0 0 20px rgba(168, 85, 247, 0.2);">
        <img src="${ravenxBase64}" style="width: 100%; height: 100%; object-fit: cover; object-position: top;" />
      </div>

      <div style="display: flex; flex-direction: column; gap: 10px;">
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
          <div class="card" style="padding: 10px;">
            <span style="font-size: 9.5px; font-family: 'JetBrains Mono'; color: #9CA3AF;">PRIZE POOL</span>
            <p style="font-size: 15px; font-weight: 800; color: #A855F7; font-family: 'JetBrains Mono';">₹50,000 Worth</p>
          </div>
          <div class="card" style="padding: 10px;">
            <span style="font-size: 9.5px; font-family: 'JetBrains Mono'; color: #9CA3AF;">ENTRY FEE</span>
            <p style="font-size: 14px; font-weight: 800; color: #A855F7; font-family: 'JetBrains Mono';">₹99 / Person</p>
            <span style="font-size: 8px; color: #6B7280;">Only for shortlisted teams</span>
          </div>
          <div class="card" style="padding: 10px;">
            <span style="font-size: 9.5px; font-family: 'JetBrains Mono'; color: #9CA3AF;">VENUE</span>
            <p style="font-size: 13px; font-weight: 700; color: #FFF;">CSED Block, AB-II</p>
          </div>
        </div>

        <div class="card" style="font-size: 11.5px; color: #D1D5DB; line-height: 1.5;">
          <strong style="color: #A855F7; display: block; margin-bottom: 2px;">Format & Eligibility:</strong>
          Exclusively for female participants. Teams of 2 to 4 members. Inter-college and cross-department participation encouraged. Mentorship sessions with leading women in engineering.
        </div>

        <div class="card" style="font-size: 11px; color: #9CA3AF; line-height: 1.5;">
          <strong style="color: #FFF;">Perks & Inclusions:</strong> RavenX Gothic-Edition Swag Kits, NAAC A+ Certified Participation Credentials, Free Meals & Midnight Energy Refreshments, Career Opportunities via Unstop.
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span>Official Unstop Partnership • Office of Students' Welfare GLA University</span>
      <span>H4T Smart Event Management System</span>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- SLIDE 13: FLAGSHIP EVENT 3 - IGNIX 2.0 -->
  <!-- ========================================== -->
  <div class="slide">
    <div class="slide-header">
      <div>
        <span class="badge" style="color: #EC4899; border-color: rgba(236, 72, 153, 0.4); background: rgba(236, 72, 153, 0.1);">EVENT SHOWCASE 03</span>
        <h2 class="slide-title">IGNIX 2.0 — The Hackathon Playbook Masterclass</h2>
        <p class="slide-subtitle">"The world is full of possibilities — bring your ideas, curiosity, and courage to build"</p>
      </div>
      <span style="font-family: 'JetBrains Mono'; color: #6B7280; font-size: 11px;">Slide 13 / 16</span>
    </div>

    <div style="display: grid; grid-template-columns: 200px 1fr; gap: 18px; margin: 12px 0; align-items: center;">
      <div style="height: 250px; border-radius: 12px; overflow: hidden; background: #000; border: 1px solid rgba(236, 72, 153, 0.4); box-shadow: 0 0 20px rgba(236, 72, 153, 0.2);">
        <img src="${ignixBase64}" style="width: 100%; height: 100%; object-fit: cover; object-position: top;" />
      </div>

      <div style="display: flex; flex-direction: column; gap: 10px;">
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
          <div class="card" style="padding: 10px;">
            <span style="font-size: 9.5px; font-family: 'JetBrains Mono'; color: #9CA3AF;">TIMING</span>
            <p style="font-size: 14px; font-weight: 800; color: #EC4899; font-family: 'JetBrains Mono';">01:00 PM – 05:00 PM</p>
          </div>
          <div class="card" style="padding: 10px;">
            <span style="font-size: 9.5px; font-family: 'JetBrains Mono'; color: #9CA3AF;">REGISTRATION FEE</span>
            <p style="font-size: 15px; font-weight: 800; color: #EC4899; font-family: 'JetBrains Mono';">₹69 / Person</p>
          </div>
          <div class="card" style="padding: 10px;">
            <span style="font-size: 9.5px; font-family: 'JetBrains Mono'; color: #9CA3AF;">VENUE</span>
            <p style="font-size: 13px; font-weight: 700; color: #FFF;">Room 5046, AB 12</p>
          </div>
        </div>

        <div class="card" style="font-size: 11.5px; color: #D1D5DB; line-height: 1.5;">
          <strong style="color: #EC4899; display: block; margin-bottom: 2px;">Hands-On Sprint Curriculum:</strong>
          Rapid MVP Architecture • Winning Hackathon Pitch Frameworks • Git Collaborative Branching • UI/UX Prototyping Under Deadline.
        </div>

        <div class="card" style="font-size: 11px; color: #9CA3AF; line-height: 1.5;">
          <strong style="color: #FFF;">Features & Guidelines:</strong> Bring Your Own Device (BYOD), official university duty leaves provided for afternoon class hours, training certificates, and H4T developer resource starter packs.
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span>Official Hack4Tech Masterclass Series • GLA University</span>
      <span>H4T Smart Event Management System</span>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- SLIDE 14: ORGANIZER COMMAND HUB & DUTY LEAVE -->
  <!-- ========================================== -->
  <div class="slide">
    <div class="slide-header">
      <div>
        <span class="badge" style="color: #10B981; border-color: rgba(16, 185, 129, 0.4); background: rgba(16, 185, 129, 0.1);">GOVERNANCE & AUDIT</span>
        <h2 class="slide-title">Organizer Command Hub & Duty Leave Compliance</h2>
        <p class="slide-subtitle">Real-time attendance intelligence, revenue reconciliation, and automated registrar exports</p>
      </div>
      <span style="font-family: 'JetBrains Mono'; color: #6B7280; font-size: 11px;">Slide 14 / 16</span>
    </div>

    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 12px 0;">
      <div class="card" style="text-align: center;">
        <span style="font-size: 9.5px; font-family: 'JetBrains Mono'; color: #9CA3AF; text-transform: uppercase;">Live Turnout Rate</span>
        <p style="font-size: 26px; font-weight: 900; color: #00F0FF; font-family: 'JetBrains Mono'; margin-top: 3px;">Dynamic %</p>
        <span style="font-size: 9.5px; color: #6B7280;">Auto-computes vs registrations</span>
      </div>

      <div class="card" style="text-align: center;">
        <span style="font-size: 9.5px; font-family: 'JetBrains Mono'; color: #9CA3AF; text-transform: uppercase;">Real-Time Activity</span>
        <p style="font-size: 26px; font-weight: 900; color: #10B981; font-family: 'JetBrains Mono'; margin-top: 3px;">Audit Stream</p>
        <span style="font-size: 9.5px; color: #6B7280;">Instant scan log updates</span>
      </div>

      <div class="card" style="text-align: center;">
        <span style="font-size: 9.5px; font-family: 'JetBrains Mono'; color: #9CA3AF; text-transform: uppercase;">Revenue Tracking</span>
        <p style="font-size: 26px; font-weight: 900; color: #F59E0B; font-family: 'JetBrains Mono'; margin-top: 3px;">₹ Reconciled</p>
        <span style="font-size: 9.5px; color: #6B7280;">Automated per-event fee sum</span>
      </div>

      <div class="card" style="text-align: center;">
        <span style="font-size: 9.5px; font-family: 'JetBrains Mono'; color: #9CA3AF; text-transform: uppercase;">Compliance Roster</span>
        <p style="font-size: 26px; font-weight: 900; color: #A855F7; font-family: 'JetBrains Mono'; margin-top: 3px;">1-Click CSV</p>
        <span style="font-size: 9.5px; color: #6B7280;">Ready for Registrar upload</span>
      </div>
    </div>

    <!-- Features Grid -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; font-size: 11.5px; color: #D1D5DB;">
      <div class="card">
        <strong style="color: #00F0FF; display: block; margin-bottom: 4px;">• Formatted Duty Leave Rosters:</strong>
        Generates clean CSV files with all 18 mandatory collegiate fields: Ticket ID, Student Name, Roll Number, Department, Academic Year, Check-in Time, and Gate Station Name.
      </div>
      <div class="card">
        <strong style="color: #A855F7; display: block; margin-bottom: 4px;">• Printable Sign-in Sheets:</strong>
        One-click print button formatted for physical clipboards with participant names, roll numbers, and official sign-off boxes for on-ground paper backup.
      </div>
    </div>

    <div class="slide-footer">
      <span>Admin Security: Authenticated session with demo credentials (admin@hack4tech.com / admin123)</span>
      <span>H4T Smart Event Management System</span>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- SLIDE 15: FUTURE SCOPE & EXPANSION ROADMAP -->
  <!-- ========================================== -->
  <div class="slide">
    <div class="slide-header">
      <div>
        <span class="badge">LONG-TERM ROADMAP</span>
        <h2 class="slide-title">Future Scope & Technology Evolution</h2>
        <p class="slide-subtitle">Four-phase expansion plan to scale EventHub across North India collegiate ecosystems</p>
      </div>
      <span style="font-family: 'JetBrains Mono'; color: #6B7280; font-size: 11px;">Slide 15 / 16</span>
    </div>

    <!-- Visual Timeline SVG -->
    <div style="margin: 8px 0; background: #080A12; border: 1px solid #1F293D; border-radius: 12px; padding: 10px;">
      <svg viewBox="0 0 850 120" style="width: 100%; height: auto;">
        <!-- Timeline Baseline -->
        <line x1="80" y1="60" x2="770" y2="60" stroke="#1F293D" stroke-width="4" />
        <line x1="80" y1="60" x2="250" y2="60" stroke="#00F0FF" stroke-width="4" />

        <!-- Milestone 1 -->
        <circle cx="100" cy="60" r="14" fill="#00F0FF" stroke="#000" stroke-width="2" />
        <text x="100" y="64" text-anchor="middle" fill="#000" font-family="JetBrains Mono" font-size="10" font-weight="900">P1</text>
        <text x="100" y="30" text-anchor="middle" fill="#00F0FF" font-family="Space Grotesk" font-size="11" font-weight="700">CORE EMS (DEPLOYED)</text>
        <text x="100" y="90" text-anchor="middle" class="diagram-text-desc">QR Pass, Anti-Duplicate</text>
        <text x="100" y="102" text-anchor="middle" class="diagram-text-desc">Terminal & CSV Leave</text>

        <!-- Milestone 2 -->
        <circle cx="320" cy="60" r="14" fill="#A855F7" stroke="#000" stroke-width="2" />
        <text x="320" y="64" text-anchor="middle" fill="#000" font-family="JetBrains Mono" font-size="10" font-weight="900">P2</text>
        <text x="320" y="30" text-anchor="middle" fill="#A855F7" font-family="Space Grotesk" font-size="11" font-weight="700">MESSAGING & WALLETS</text>
        <text x="320" y="90" text-anchor="middle" class="diagram-text-desc">WhatsApp Ticket Bot</text>
        <text x="320" y="102" text-anchor="middle" class="diagram-text-desc">Apple / Google Wallet .pkpass</text>

        <!-- Milestone 3 -->
        <circle cx="540" cy="60" r="14" fill="#EC4899" stroke="#000" stroke-width="2" />
        <text x="540" y="64" text-anchor="middle" fill="#000" font-family="JetBrains Mono" font-size="10" font-weight="900">P3</text>
        <text x="540" y="30" text-anchor="middle" fill="#EC4899" font-family="Space Grotesk" font-size="11" font-weight="700">SMART HARDWARE</text>
        <text x="540" y="90" text-anchor="middle" class="diagram-text-desc">RFID Student Card Tap</text>
        <text x="540" y="102" text-anchor="middle" class="diagram-text-desc">Automated Turnstiles & Meals</text>

        <!-- Milestone 4 -->
        <circle cx="750" cy="60" r="14" fill="#10B981" stroke="#000" stroke-width="2" />
        <text x="750" y="64" text-anchor="middle" fill="#000" font-family="JetBrains Mono" font-size="10" font-weight="900">P4</text>
        <text x="750" y="30" text-anchor="middle" fill="#10B981" font-family="Space Grotesk" font-size="11" font-weight="700">ENTERPRISE ERP</text>
        <text x="750" y="90" text-anchor="middle" class="diagram-text-desc">Direct GLA LMS Webhook</text>
        <text x="750" y="102" text-anchor="middle" class="diagram-text-desc">Soulbound Blockchain Certs</text>
      </svg>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; font-size: 11px; color: #D1D5DB; margin-top: 4px;">
      <div class="card">
        <strong style="color: #00F0FF;">• AI Team Matchmaker:</strong> Algorithmic pairing of solo participants based on complementary technical skill sets (e.g. Frontend developer paired with Machine Learning researcher).
      </div>
      <div class="card">
        <strong style="color: #10B981;">• Offline PWA Gate Sync:</strong> IndexedDB local storage enabling gate verification even during total campus Wi-Fi network dropouts, auto-syncing when internet restores.
      </div>
    </div>

    <div class="slide-footer">
      <span>Vision: Complete transition to 100% paperless, zero-fraud collegiate hackathons</span>
      <span>H4T Smart Event Management System</span>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- SLIDE 16: CONCLUSION & MEASURABLE IMPACT -->
  <!-- ========================================== -->
  <div class="slide" style="text-align: center; justify-content: center; align-items: center; gap: 14px;">
    <span class="badge" style="color: #10B981; border-color: rgba(16, 185, 129, 0.4); background: rgba(16, 185, 129, 0.1);">
      MEASURED IMPACT & CONCLUSION
    </span>

    <h2 style="font-size: 36px; font-weight: 900; font-family: 'Space Grotesk'; color: #FFF; line-height: 1.2;">
      SUMMARY OF VALUE DELIVERED
    </h2>
    <p style="font-size: 14px; color: #00F0FF; font-family: 'Space Grotesk';">
      Transforming Hack4Tech from chaotic forms to an intelligent, automated EMS
    </p>

    <!-- Impact Cards -->
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; width: 100%; max-width: 900px; margin: 8px 0;">
      <div class="card glow-cyan" style="text-align: center;">
        <p style="font-size: 34px; font-weight: 900; font-family: 'JetBrains Mono'; color: #00F0FF;">92%</p>
        <span style="font-size: 10px; font-family: 'JetBrains Mono'; color: #9CA3AF; text-transform: uppercase;">Queue Time Reduction</span>
      </div>
      <div class="card glow-red" style="text-align: center;">
        <p style="font-size: 34px; font-weight: 900; font-family: 'JetBrains Mono'; color: #EF4444;">100%</p>
        <span style="font-size: 10px; font-family: 'JetBrains Mono'; color: #9CA3AF; text-transform: uppercase;">Ticket Fraud Blocked</span>
      </div>
      <div class="card glow-purple" style="text-align: center;">
        <p style="font-size: 34px; font-weight: 900; font-family: 'JetBrains Mono'; color: #A855F7;">&lt;100ms</p>
        <span style="font-size: 10px; font-family: 'JetBrains Mono'; color: #9CA3AF; text-transform: uppercase;">QR Verification Latency</span>
      </div>
      <div class="card glow-emerald" style="text-align: center;">
        <p style="font-size: 34px; font-weight: 900; font-family: 'JetBrains Mono'; color: #10B981;">1-Click</p>
        <span style="font-size: 10px; font-family: 'JetBrains Mono'; color: #9CA3AF; text-transform: uppercase;">Duty Leave Roster Export</span>
      </div>
    </div>

    <p style="font-size: 12.5px; color: #D1D5DB; max-width: 800px; line-height: 1.6;">
      EventHub establishes that university technology events can be orchestrated with enterprise-grade cryptographic security, frictionless participant journeys, and complete administrative transparency.
    </p>

    <div class="card" style="padding: 10px 24px; font-size: 12px; font-family: 'JetBrains Mono'; color: #00F0FF; border-color: rgba(0, 240, 255, 0.4);">
      Live Production Deployment: <strong>http://localhost:5000</strong>
    </div>

    <div class="slide-footer" style="width: 100%; position: absolute; bottom: 10mm; left: 18mm; right: 18mm; width: calc(100% - 36mm);">
      <span>Hack4Tech • GLA University</span>
      <span>Office of Students' Welfare</span>
      <span>Thank You!</span>
    </div>
  </div>

</body>
</html>
`;

const exportHtmlPath = path.join(__dirname, 'presentation_descriptive_export.html');
fs.writeFileSync(exportHtmlPath, htmlContent, 'utf8');

const outputPdfPath = path.join(__dirname, 'Hack4Tech_EventHub_Presentation_Descriptive.pdf');
const defaultPdfPath = path.join(__dirname, 'Hack4Tech_EventHub_Presentation.pdf');
const publicPdfPath = path.join(__dirname, 'public', 'Hack4Tech_EventHub_Presentation.pdf');
const distPdfPath = path.join(__dirname, 'dist', 'Hack4Tech_EventHub_Presentation.pdf');

const brainPdfPath = 'C:\\Users\\Lenovo\\.gemini\\antigravity\\brain\\ea0a820f-794a-44ed-8c1a-e142f89ca316\\Hack4Tech_EventHub_Presentation.pdf';
const brainDescPdfPath = 'C:\\Users\\Lenovo\\.gemini\\antigravity\\brain\\ea0a820f-794a-44ed-8c1a-e142f89ca316\\Hack4Tech_EventHub_Presentation_Descriptive.pdf';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const browserPath = fs.existsSync(chromePath) ? chromePath : edgePath;

console.log('Rendering Descriptive 16-Slide PDF via Headless Browser:', browserPath);
const cmd = `"${browserPath}" --headless=new --no-sandbox --disable-gpu --no-pdf-header-footer --print-to-pdf="${outputPdfPath}" "file:///${exportHtmlPath.replace(/\\\\/g, '/')}"`;

execSync(cmd);

console.log('Distributing generated PDF to all endpoints...');
fs.copyFileSync(outputPdfPath, defaultPdfPath);
fs.copyFileSync(outputPdfPath, publicPdfPath);
fs.copyFileSync(outputPdfPath, distPdfPath);
fs.copyFileSync(outputPdfPath, brainPdfPath);
fs.copyFileSync(outputPdfPath, brainDescPdfPath);

const stats = fs.statSync(outputPdfPath);
console.log(`Success! Enhanced PDF generated: ${outputPdfPath} (${(stats.size / 1024).toFixed(1)} KB, 16 Detailed Slides)`);
