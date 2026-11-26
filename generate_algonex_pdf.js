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
  <title>HackPass - Smart Event Management System</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;600;700;800&family=Space+Grotesk:wght@600;700;800&display=swap');

    @page {
      size: 297mm 210mm; /* A4 Landscape (16:9 ratio feel) */
      margin: 0;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      background-color: #FAF5FB;
      color: #1F1528;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .slide {
      width: 297mm;
      height: 210mm;
      padding: 9mm 14mm 10mm 14mm;
      page-break-after: always;
      break-after: page;
      position: relative;
      background: #FAF5FB;
      background-image: 
        radial-gradient(circle at 100% 0%, rgba(244, 114, 182, 0.12) 0%, transparent 40%),
        radial-gradient(circle at 0% 100%, rgba(192, 132, 252, 0.12) 0%, transparent 45%),
        radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8) 0%, transparent 80%);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }

    /* Top Navigation / Branding Header on every slide */
    .top-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 7px;
      border-bottom: 1.5px solid rgba(192, 132, 252, 0.35);
      margin-bottom: 7px;
    }

    .top-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .team-badge-logo {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1.5px solid #8B2C78;
      background: #000;
      padding: 1px;
    }

    .team-name {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 15px;
      font-weight: 800;
      color: #4A154B;
      letter-spacing: -0.02em;
    }

    .team-sub {
      font-size: 9.5px;
      color: #7E4A7D;
      font-weight: 600;
    }

    .top-center {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 0.12em;
      color: #4A154B;
      text-transform: uppercase;
      background: rgba(243, 232, 255, 0.7);
      padding: 4px 14px;
      border-radius: 9999px;
      border: 1px solid rgba(192, 132, 252, 0.4);
    }

    .top-right {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 13.5px;
      font-weight: 800;
      color: #9D174D;
      letter-spacing: -0.01em;
    }

    /* Title section & pill banners */
    .main-title-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 6px;
    }

    .brand-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 32px;
      font-weight: 900;
      letter-spacing: -0.03em;
      color: #380C3B;
      line-height: 1;
      display: flex;
      align-items: center;
      gap: 3px;
    }

    .brand-title-accent {
      color: #C026D3;
      background: linear-gradient(135deg, #BE185D 0%, #9333EA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .header-pill {
      background: #4A154B;
      color: #FFFFFF;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 800;
      font-size: 12.5px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      padding: 6px 14px;
      border-radius: 9999px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 2px 6px rgba(74, 21, 75, 0.25);
    }

    .header-desc {
      font-size: 11.5px;
      color: #6B21A8;
      font-weight: 600;
      margin-left: 8px;
    }

    /* Algonex style section pill banners */
    .section-pill-dark {
      background: #4A154B;
      color: #FFFFFF;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 800;
      font-size: 11.5px;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      padding: 4px 13px;
      border-radius: 9999px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .section-pill-green {
      background: #047857;
      color: #FFFFFF;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 800;
      font-size: 11.5px;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      padding: 4px 13px;
      border-radius: 9999px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .section-pill-soft {
      background: #F3E8FF;
      color: #4A154B;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 800;
      font-size: 11px;
      letter-spacing: 0.02em;
      padding: 4px 12px;
      border-radius: 9999px;
      border: 1px solid #DDD6FE;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }

    /* Cards */
    .white-card {
      background: #FFFFFF;
      border: 1.5px solid #F0DAEC;
      border-radius: 14px;
      padding: 12px 14px;
      box-shadow: 0 4px 12px -2px rgba(112, 26, 117, 0.06);
    }

    .purple-card {
      background: #FAF5FF;
      border: 1.5px solid #E9D5FF;
      border-radius: 14px;
      padding: 12px 14px;
      box-shadow: 0 4px 12px -2px rgba(112, 26, 117, 0.06);
    }

    .pink-card {
      background: #FFF5F8;
      border: 1.5px solid #FBCFE8;
      border-radius: 14px;
      padding: 12px 14px;
      box-shadow: 0 4px 12px -2px rgba(190, 24, 93, 0.06);
    }

    /* Highlights & typography */
    .hl-green {
      color: #047857;
      font-weight: 700;
    }
    .hl-purple {
      color: #6B21A8;
      font-weight: 700;
    }
    .hl-pink {
      color: #BE185D;
      font-weight: 700;
    }

    /* Flow step arrow cards */
    .flow-step {
      background: #FFFFFF;
      border: 1.5px solid #F0DAEC;
      border-radius: 12px;
      padding: 10px 12px;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 2px 6px rgba(74, 21, 75, 0.04);
      flex: 1;
    }

    .flow-icon {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      shrink-0: 0;
    }

    .flow-arrow {
      color: #BE185D;
      font-size: 20px;
      font-weight: 800;
      margin: 0 4px;
    }

    /* Table styling matching Algonex */
    table.algonex-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      font-size: 11px;
      border: 1px solid #E9D5FF;
      border-radius: 10px;
      overflow: hidden;
      background: #FFF;
    }

    table.algonex-table th {
      background: #4A154B;
      color: #FFF;
      font-weight: 800;
      font-size: 10.5px;
      padding: 7px 10px;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    table.algonex-table td {
      padding: 7px 10px;
      border-bottom: 1px solid #F3E8FF;
      color: #374151;
      font-weight: 500;
    }

    table.algonex-table tr:last-child td {
      border-bottom: none;
    }

    table.algonex-table tr:nth-child(even) td {
      background: #FDFAFF;
    }

    /* Bottom Decorative Wave */
    .bottom-wave {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 18px;
      background: linear-gradient(90deg, #FCE7F3 0%, #EDE9FE 50%, #FCE7F3 100%);
      opacity: 0.6;
      border-top-left-radius: 100% 18px;
      border-top-right-radius: 100% 18px;
      pointer-events-none;
    }
  </style>
</head>
<body>

  <!-- ========================================== -->
  <!-- PAGE 1: TITLE & PROBLEM STATEMENT -->
  <!-- ========================================== -->
  <div class="slide">
    <!-- Top Bar -->
    <div class="top-header">
      <div class="top-left">
        <img src="${logoBase64}" class="team-badge-logo" />
        <div>
          <div class="team-name">Hack4Tech</div>
          <div class="team-sub">Core Developer Squad</div>
        </div>
      </div>
      <div class="top-center">
        OFFLINE &nbsp;|&nbsp; CENTRALIZED SMART EVENT MANAGEMENT SYSTEM
      </div>
      <div class="top-right">
        <span>GLA UNIVERSITY</span>
        <span style="font-size: 10px; background: #9D174D; color: #FFF; padding: 2px 6px; border-radius: 4px;">NAAC A+</span>
      </div>
    </div>

    <!-- Big Project Title -->
    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 4px; margin-bottom: 8px;">
      <div style="display: flex; align-items: center; gap: 14px;">
        <div style="width: 60px; height: 60px; border-radius: 14px; background: linear-gradient(135deg, #FDF2F8 0%, #F3E8FF 100%); border: 2px solid #C084FC; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(192, 132, 252, 0.25);">
          <span style="font-size: 32px;">⚡</span>
        </div>
        <div>
          <div class="brand-title">
            HACK<span class="brand-title-accent">PASS</span>
            <span style="font-size: 13px; font-family: 'JetBrains Mono'; background: #FCE7F3; color: #BE185D; padding: 3px 8px; border-radius: 6px; margin-left: 8px; border: 1px solid #FBCFE8; font-weight: 700;">EMS 2.0</span>
          </div>
          <div style="display: inline-block; background: #4A154B; color: #FFF; font-size: 11px; font-weight: 700; padding: 3px 12px; border-radius: 9999px; margin-top: 4px;">
            Smart QR Event Passes & Real-Time Anti-Duplicate Attendance Terminal
          </div>
        </div>
      </div>

      <div style="text-align: right; font-family: 'JetBrains Mono'; font-size: 10px; color: #7E4A7D;">
        <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #10B981; margin-right: 4px;"></span>
        SYSTEM OPERATIONAL &nbsp;|&nbsp; LOCAL PORT 5000
      </div>
    </div>

    <!-- Main Content Layout (Algonex Page 1 style) -->
    <div style="display: grid; grid-template-columns: 240px 1fr; gap: 14px; margin-top: 6px;">
      
      <!-- Left Column: Team and University info cards -->
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <!-- Card 1: Team Name -->
        <div class="white-card" style="display: flex; align-items: center; gap: 12px; border-left: 4px solid #C026D3;">
          <div style="width: 44px; height: 44px; border-radius: 12px; background: #FDF2F8; border: 1px solid #FBCFE8; display: flex; align-items: center; justify-content: center; font-size: 22px;">
            👥
          </div>
          <div>
            <div style="font-size: 10.5px; font-weight: 700; color: #7E4A7D; font-family: 'JetBrains Mono'; text-transform: uppercase;">
              Club / Team
            </div>
            <div style="font-size: 16px; font-weight: 800; color: #047857; font-family: 'Plus Jakarta Sans';">
              Hack4Tech
            </div>
            <div style="font-size: 9.5px; color: #9CA3AF;">Student Tech Community</div>
          </div>
        </div>

        <!-- Card 2: University -->
        <div class="white-card" style="display: flex; align-items: center; gap: 12px; border-left: 4px solid #9D174D;">
          <div style="width: 44px; height: 44px; border-radius: 12px; background: #FDF2F8; border: 1px solid #FBCFE8; display: flex; align-items: center; justify-content: center; font-size: 22px;">
            🏛️
          </div>
          <div>
            <div style="font-size: 10.5px; font-weight: 700; color: #7E4A7D; font-family: 'JetBrains Mono'; text-transform: uppercase;">
              University
            </div>
            <div style="font-size: 14.5px; font-weight: 800; color: #4A154B; font-family: 'Plus Jakarta Sans'; line-height: 1.2;">
              GLA University, Mathura
            </div>
            <div style="font-size: 9.5px; color: #6B7280;">Office of Students' Welfare</div>
          </div>
        </div>

        <!-- Card 3: Active Flagship Events Pill -->
        <div class="purple-card" style="padding: 10px 12px;">
          <div style="font-size: 10px; font-weight: 800; color: #4A154B; text-transform: uppercase; font-family: 'JetBrains Mono'; margin-bottom: 4px;">
            Flagship Portfolio
          </div>
          <div style="font-size: 11px; font-weight: 700; color: #6B21A8; line-height: 1.5;">
            • VisionX (8-Hr Hackathon)<br />
            • RavenX (Girls Only Hackathon)<br />
            • Ignix 2.0 (The Playbook)
          </div>
        </div>
      </div>

      <!-- Right Column: Problem Statement Card -->
      <div class="white-card" style="border: 2px solid #E9D5FF; display: flex; flex-direction: column; justify-content: space-between; padding: 16px 20px;">
        <div>
          <div style="margin-bottom: 12px;">
            <div class="section-pill-dark">
              <span>🎯</span> PROBLEM STATEMENT
            </div>
          </div>

          <p style="font-size: 13.5px; color: #1F1528; line-height: 1.65; margin-bottom: 14px;">
            Collegiate hackathons and technical fests frequently suffer from <span class="hl-purple">fragmented Google Form spreadsheets</span>, chaotic WhatsApp links, and <span class="hl-pink">severe 45+ minute gate reception bottlenecks</span>. Without dynamic cryptographic passes, events face pervasive <span class="hl-green">proxy check-ins</span> and screenshot forwarding for food/swag hoarding, while organizers spend 3–5 working days manually reconciling attendance for <span class="hl-purple">university academic duty leave approvals</span>.
          </p>
        </div>

        <!-- Relevance Banner -->
        <div style="background: #FAF5FF; border: 1.5px solid #DDD6FE; border-radius: 12px; padding: 12px 16px; display: flex; align-items: flex-start; gap: 12px;">
          <div style="background: #4A154B; color: #FFF; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; shrink-0: 0;">
            🎯
          </div>
          <div>
            <span style="font-size: 11px; font-weight: 800; color: #BE185D; font-family: 'JetBrains Mono'; text-transform: uppercase; margin-right: 6px;">
              RELEVANCE & IMPACT:
            </span>
            <span style="font-size: 12px; color: #374151; font-weight: 500; line-height: 1.5;">
              Directly elevates campus event governance, eliminates long physical queues with sub-second QR scanning, prevents ticket fraud via real-time single-entry locks, and supports <strong style="color: #047857;">Digital Campus & NAAC A+ Accreditation</strong> standards.
            </span>
          </div>
        </div>
      </div>

    </div>

    <!-- Decorative Wave Bottom -->
    <div class="bottom-wave"></div>
  </div>

  <!-- ========================================== -->
  <!-- PAGE 2: PROPOSED SOLUTION & HOW IT WORKS -->
  <!-- ========================================== -->
  <div class="slide">
    <!-- Top Bar -->
    <div class="top-header">
      <div class="top-left">
        <img src="${logoBase64}" class="team-badge-logo" />
        <div>
          <div class="team-name">Hack4Tech</div>
          <div class="team-sub">Core Developer Squad</div>
        </div>
      </div>
      <div class="top-center">
        OFFLINE &nbsp;|&nbsp; CENTRALIZED SMART EVENT MANAGEMENT SYSTEM
      </div>
      <div class="top-right">
        <span>GLA UNIVERSITY</span>
        <span style="font-size: 10px; background: #9D174D; color: #FFF; padding: 2px 6px; border-radius: 4px;">NAAC A+</span>
      </div>
    </div>

    <!-- Slide Header Row -->
    <div class="main-title-row">
      <div class="brand-title" style="font-size: 24px;">
        HACK<span class="brand-title-accent">PASS</span>
      </div>
      <div class="header-pill">
        PROPOSED SOLUTION
      </div>
      <div class="header-desc">
        Centralized Registration, Cryptographic Event Passes & Real-Time Anti-Duplicate Gate Terminal
      </div>
    </div>

    <!-- Problem vs Solution Two-Column Row -->
    <div style="display: grid; grid-template-columns: 1fr 1.3fr; gap: 12px; margin-top: 2px;">
      
      <!-- The Problem Box -->
      <div class="white-card" style="border-left: 4px solid #BE185D; padding: 10px 14px;">
        <div style="margin-bottom: 6px;">
          <span class="section-pill-dark" style="font-size: 10.5px; padding: 3px 10px;">
            <span>🎯</span> THE PROBLEM
          </span>
        </div>
        <ul style="font-size: 11px; color: #374151; line-height: 1.55; list-style: none;">
          <li style="margin-bottom: 4px;">• Registration data lost across multiple <span class="hl-pink">uncoordinated Google Forms</span> and WhatsApp chats.</li>
          <li style="margin-bottom: 4px;">• <span class="hl-pink">45+ minute entrance lines</span> at AB-11 & AB-II while staff scroll through 500-row spreadsheets.</li>
          <li>• <span class="hl-pink">Proxy screenshot sharing</span> allows unregistered peers to enter and hoard limited refreshment kits.</li>
        </ul>
      </div>

      <!-- Our Proposed Solution Box -->
      <div class="white-card" style="border-left: 4px solid #047857; padding: 10px 14px;">
        <div style="margin-bottom: 6px;">
          <span class="section-pill-green" style="font-size: 10.5px; padding: 3px 10px;">
            <span>💡</span> OUR PROPOSED SOLUTION
          </span>
        </div>
        <p style="font-size: 11px; color: #374151; line-height: 1.5; margin-bottom: 8px;">
          <strong style="color: #4A154B;">HackPass</strong> is an end-to-end, high-performance web platform that takes a student from <span class="hl-green">event discovery</span> → <span class="hl-green">dynamic team registration</span> → <span class="hl-green">cryptographic QR pass generation</span> → <span class="hl-green">sub-second gate verification</span> with automated duplicate locking.
        </p>

        <!-- 5 Feature Mini Pills matching Algonex -->
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; text-align: center;">
          <div style="background: #FDF2F8; border: 1px solid #FBCFE8; border-radius: 8px; padding: 4px 2px;">
            <div style="font-size: 14px;">🎫</div>
            <div style="font-size: 8.5px; font-weight: 700; color: #9D174D; margin-top: 2px;">Dynamic Pass</div>
          </div>
          <div style="background: #F5F3FF; border: 1px solid #DDD6FE; border-radius: 8px; padding: 4px 2px;">
            <div style="font-size: 14px;">👥</div>
            <div style="font-size: 8.5px; font-weight: 700; color: #6B21A8; margin-top: 2px;">Team Engine</div>
          </div>
          <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; padding: 4px 2px;">
            <div style="font-size: 14px;">📷</div>
            <div style="font-size: 8.5px; font-weight: 700; color: #047857; margin-top: 2px;">QR Scanner</div>
          </div>
          <div style="background: #FFF1F2; border: 1px solid #FECDD3; border-radius: 8px; padding: 4px 2px;">
            <div style="font-size: 14px;">🔒</div>
            <div style="font-size: 8.5px; font-weight: 700; color: #BE185D; margin-top: 2px;">Anti-Duplicate</div>
          </div>
          <div style="background: #FAF5FF; border: 1px solid #E9D5FF; border-radius: 8px; padding: 4px 2px;">
            <div style="font-size: 14px;">📊</div>
            <div style="font-size: 8.5px; font-weight: 700; color: #7E22CE; margin-top: 2px;">Duty Leave</div>
          </div>
        </div>
      </div>

    </div>

    <!-- HOW IT WORKS Row (3 Arrow Connected Steps matching Algonex) -->
    <div style="margin-top: 8px;">
      <div style="text-align: center; margin-bottom: 6px;">
        <span class="section-pill-dark" style="font-size: 11px; padding: 3px 16px;">
          HOW IT WORKS
        </span>
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
        <!-- Step 1 -->
        <div class="flow-step" style="border-top: 3px solid #3B82F6;">
          <div class="flow-icon" style="background: #EFF6FF; color: #2563EB;">💻</div>
          <div>
            <div style="font-size: 11px; font-weight: 800; color: #1E40AF; text-transform: uppercase; font-family: 'JetBrains Mono';">
              1. REGISTRATION
            </div>
            <div style="font-size: 10px; color: #4B5563; line-height: 1.4;">
              Select solo/team, enter roll numbers & dept <strong style="color: #1E40AF;">→ Instant QR Pass Issued</strong>
            </div>
          </div>
        </div>

        <div class="flow-arrow">➔</div>

        <!-- Step 2 -->
        <div class="flow-step" style="border-top: 3px solid #BE185D;">
          <div class="flow-icon" style="background: #FDF2F8; color: #BE185D;">📷</div>
          <div>
            <div style="font-size: 11px; font-weight: 800; color: #9D174D; text-transform: uppercase; font-family: 'JetBrains Mono';">
              2. GATE VERIFICATION
            </div>
            <div style="font-size: 10px; color: #4B5563; line-height: 1.4;">
              Point webcam or USB laser gun <strong style="color: #9D174D;">→ Sub-100ms lock, chime & duplicate alarm</strong>
            </div>
          </div>
        </div>

        <div class="flow-arrow">➔</div>

        <!-- Step 3 -->
        <div class="flow-step" style="border-top: 3px solid #047857;">
          <div class="flow-icon" style="background: #ECFDF5; color: #047857;">📈</div>
          <div>
            <div style="font-size: 11px; font-weight: 800; color: #065F46; text-transform: uppercase; font-family: 'JetBrains Mono';">
              3. COMPLIANCE & SAAS
            </div>
            <div style="font-size: 10px; color: #4B5563; line-height: 1.4;">
              Real-time turnout % & revenue <strong style="color: #065F46;">→ 1-Click duty leave CSV for Registrar</strong>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- KEY OUTCOMES Bottom Strip (matching Algonex Page 2) -->
    <div style="background: #FFFFFF; border: 1.5px solid #F0DAEC; border-radius: 12px; padding: 8px 14px; display: flex; align-items: center; justify-content: space-between; margin-top: 8px;">
      <div style="display: flex; align-items: center; gap: 6px;">
        <span class="section-pill-dark" style="font-size: 9.5px; padding: 3px 8px;">KEY OUTCOMES</span>
      </div>

      <div style="display: flex; align-items: center; gap: 18px; font-size: 10px; font-weight: 700;">
        <span style="color: #BE185D;">🚀 Zero Entrance Lines (&lt;3s Scan)</span>
        <span style="color: #4A154B;">🔒 100% Anti-Fraud Lock</span>
        <span style="color: #047857;">📧 Self-Serve Email Pass Retrieval</span>
        <span style="color: #9333EA;">👑 RavenX Girls-Only Support</span>
        <span style="color: #1E40AF;">🏛️ NAAC A+ Verified Compliance</span>
      </div>
    </div>

    <div class="bottom-wave"></div>
  </div>

  <!-- ========================================== -->
  <!-- PAGE 3: TECHNOLOGY STACK & ARCHITECTURE -->
  <!-- ========================================== -->
  <div class="slide">
    <!-- Top Bar -->
    <div class="top-header">
      <div class="top-left">
        <img src="${logoBase64}" class="team-badge-logo" />
        <div>
          <div class="team-name">Hack4Tech</div>
          <div class="team-sub">Core Developer Squad</div>
        </div>
      </div>
      <div class="top-center">
        OFFLINE &nbsp;|&nbsp; CENTRALIZED SMART EVENT MANAGEMENT SYSTEM
      </div>
      <div class="top-right">
        <span>GLA UNIVERSITY</span>
        <span style="font-size: 10px; background: #9D174D; color: #FFF; padding: 2px 6px; border-radius: 4px;">NAAC A+</span>
      </div>
    </div>

    <!-- Slide Header Row -->
    <div class="main-title-row">
      <div style="background: #4A154B; color: #FFF; padding: 4px 10px; border-radius: 8px; font-family: 'JetBrains Mono'; font-weight: 800; font-size: 14px;">
        &lt; / &gt;
      </div>
      <div class="brand-title" style="font-size: 26px;">
        TECHNOLOGY <span class="brand-title-accent">STACK</span>
      </div>
      <div class="header-desc">
        Tools, frameworks and resilient services powering HackPass EMS 2.0
      </div>
    </div>

    <!-- Main 2-Column Content (Architecture vs Tech Stack Categories) -->
    <div style="display: grid; grid-template-columns: 1.15fr 1fr; gap: 14px; margin-top: 4px;">
      
      <!-- Left Column: Architecture Flow matching Algonex -->
      <div class="white-card" style="padding: 10px 14px; border: 1.5px solid #E9D5FF;">
        <div style="margin-bottom: 8px;">
          <span class="section-pill-dark" style="font-size: 10px; padding: 3px 10px;">
            ⚙️ SYSTEM ARCHITECTURE (HIGH LEVEL)
          </span>
        </div>

        <!-- Actor layer -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; text-align: center; margin-bottom: 8px;">
          <div style="background: #FAF5FF; border: 1px solid #E9D5FF; border-radius: 8px; padding: 4px;">
            <div style="font-size: 12px;">👤</div>
            <div style="font-size: 9px; font-weight: 700; color: #4A154B;">Student / Leader</div>
          </div>
          <div style="background: #FDF2F8; border: 1px solid #FBCFE8; border-radius: 8px; padding: 4px;">
            <div style="font-size: 12px;">📱</div>
            <div style="font-size: 9px; font-weight: 700; color: #9D174D;">Web App / QR Pass</div>
          </div>
          <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; padding: 4px;">
            <div style="font-size: 12px;">📷</div>
            <div style="font-size: 9px; font-weight: 700; color: #047857;">Gate Volunteer Gun</div>
          </div>
        </div>

        <!-- Middle Core Engine Box -->
        <div style="background: #4A154B; color: #FFF; border-radius: 10px; padding: 8px; text-align: center; margin-bottom: 8px; box-shadow: 0 4px 10px rgba(74, 21, 75, 0.2);">
          <div style="font-size: 11.5px; font-weight: 800; font-family: 'Plus Jakarta Sans';">
            ⚡ HackPass Central Node & Express REST API
          </div>
          <div style="font-size: 9px; color: #E9D5FF; margin-top: 1px;">
            Anti-Duplicate Lock Middleware • Real-Time State Controller • Audit Logger
          </div>
        </div>

        <!-- 3 Connected Micro-services -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; text-align: center; margin-bottom: 8px;">
          <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 8px; padding: 6px;">
            <div style="font-size: 9.5px; font-weight: 800; color: #1E40AF;">Pass Generator</div>
            <div style="font-size: 8px; color: #60A5FA;">Vector SVG Engine</div>
          </div>
          <div style="background: #FFF1F2; border: 1px solid #FECDD3; border-radius: 8px; padding: 6px;">
            <div style="font-size: 9.5px; font-weight: 800; color: #BE185D;">Anti-Fraud Lock</div>
            <div style="font-size: 8px; color: #F43F5E;">Sub-100ms Guard</div>
          </div>
          <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; padding: 6px;">
            <div style="font-size: 9.5px; font-weight: 800; color: #047857;">Leave Exporter</div>
            <div style="font-size: 8px; color: #10B981;">CSV Roster Stream</div>
          </div>
        </div>

        <!-- Data Layer Box -->
        <div style="background: #FAF5FF; border: 1.5px dashed #C084FC; border-radius: 8px; padding: 6px 10px; display: flex; align-items: center; justify-content: space-between;">
          <span style="font-size: 9.5px; font-weight: 800; color: #6B21A8; font-family: 'JetBrains Mono';">DATA STORE:</span>
          <span style="font-size: 9.5px; color: #374151;">Atomic db.json &nbsp;|&nbsp; CheckInLogs Ledger &nbsp;|&nbsp; Static Asset Store</span>
        </div>
      </div>

      <!-- Right Column: Tech Stack & Tools list matching Algonex -->
      <div style="display: flex; flex-direction: column; gap: 8px;">
        
        <!-- Tech Stack Table -->
        <div class="white-card" style="padding: 10px 14px; border: 1.5px solid #F0DAEC;">
          <div style="margin-bottom: 6px;">
            <span class="section-pill-dark" style="font-size: 10px; padding: 3px 10px;">
              💻 TECHNOLOGY STACK
            </span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 5px; font-size: 10.5px;">
            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #F3E8FF; padding-bottom: 4px;">
              <span style="font-weight: 700; color: #7E4A7D;">Frontend</span>
              <span style="font-weight: 600; color: #4A154B;">⚛️ React 18 &nbsp;•&nbsp; 📘 TypeScript &nbsp;•&nbsp; 🎨 Tailwind CSS</span>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #F3E8FF; padding-bottom: 4px;">
              <span style="font-weight: 700; color: #7E4A7D;">Backend</span>
              <span style="font-weight: 600; color: #4A154B;">🟢 Node.js &nbsp;•&nbsp; ⚡ Express REST API</span>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #F3E8FF; padding-bottom: 4px;">
              <span style="font-weight: 700; color: #7E4A7D;">QR & Video</span>
              <span style="font-weight: 600; color: #4A154B;">📷 html5-qrcode (10 FPS) &nbsp;•&nbsp; 🎫 qrcode.react</span>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #F3E8FF; padding-bottom: 4px;">
              <span style="font-weight: 700; color: #7E4A7D;">Audio Synth</span>
              <span style="font-weight: 600; color: #4A154B;">🔊 Web Audio API (0ms Chimes & Buzzers)</span>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-weight: 700; color: #7E4A7D;">Database</span>
              <span style="font-weight: 600; color: #4A154B;">📂 Persistent Atomic JSON DB + Audit Trail</span>
            </div>
          </div>
        </div>

        <!-- Tools & Platforms Box -->
        <div class="white-card" style="padding: 10px 14px; border: 1.5px solid #F0DAEC;">
          <div style="margin-bottom: 6px;">
            <span class="section-pill-dark" style="font-size: 10px; padding: 3px 10px;">
              🛠️ TOOLS & PLATFORMS
            </span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; text-align: center;">
            <div style="background: #FDF2F8; border: 1px solid #FBCFE8; border-radius: 8px; padding: 4px;">
              <div style="font-size: 14px;">🐙</div>
              <div style="font-size: 8.5px; font-weight: 700; color: #4A154B;">GitHub</div>
            </div>
            <div style="background: #F5F3FF; border: 1px solid #DDD6FE; border-radius: 8px; padding: 4px;">
              <div style="font-size: 14px;">⚡</div>
              <div style="font-size: 8.5px; font-weight: 700; color: #6B21A8;">Vite 6</div>
            </div>
            <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 8px; padding: 4px;">
              <div style="font-size: 14px;">🌐</div>
              <div style="font-size: 8.5px; font-weight: 700; color: #1E40AF;">Express Srv</div>
            </div>
            <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; padding: 4px;">
              <div style="font-size: 14px;">📑</div>
              <div style="font-size: 8.5px; font-weight: 700; color: #047857;">Headless PDF</div>
            </div>
          </div>
        </div>

      </div>

    </div>

    <div class="bottom-wave"></div>
  </div>

  <!-- ========================================== -->
  <!-- PAGE 4: INNOVATION & UNIQUENESS -->
  <!-- ========================================== -->
  <div class="slide">
    <!-- Top Bar -->
    <div class="top-header">
      <div class="top-left">
        <img src="${logoBase64}" class="team-badge-logo" />
        <div>
          <div class="team-name">Hack4Tech</div>
          <div class="team-sub">Core Developer Squad</div>
        </div>
      </div>
      <div class="top-center">
        OFFLINE &nbsp;|&nbsp; CENTRALIZED SMART EVENT MANAGEMENT SYSTEM
      </div>
      <div class="top-right">
        <span>GLA UNIVERSITY</span>
        <span style="font-size: 10px; background: #9D174D; color: #FFF; padding: 2px 6px; border-radius: 4px;">NAAC A+</span>
      </div>
    </div>

    <!-- Slide Header Row -->
    <div class="main-title-row">
      <div style="background: #BE185D; color: #FFF; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px;">
        💡
      </div>
      <div class="brand-title" style="font-size: 26px;">
        INNOVATION & <span class="brand-title-accent">UNIQUENESS</span>
      </div>
      <div class="header-desc">
        What makes HackPass decisively superior to conventional Google Forms or Eventbrite?
      </div>
    </div>

    <!-- 2 Columns: Key Innovations vs Alternatives Table -->
    <div style="display: grid; grid-template-columns: 1fr 1.35fr; gap: 12px; margin-top: 4px;">
      
      <!-- Key Innovations Column -->
      <div class="white-card" style="padding: 10px 14px; border: 1.5px solid #F0DAEC; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="margin-bottom: 8px;">
            <span class="section-pill-dark" style="font-size: 10px; padding: 3px 10px;">
              🎯 OUR KEY INNOVATIONS
            </span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 7px;">
            <div style="display: flex; align-items: flex-start; gap: 8px;">
              <span style="font-size: 14px;">🔒</span>
              <div>
                <strong style="font-size: 11px; color: #4A154B;">Single-Entry Anti-Duplicate Lock:</strong>
                <p style="font-size: 9.5px; color: #4B5563; line-height: 1.4;">
                  Re-scans trigger instant 409 conflict, double warning buzzer, and display previous check-in time/gate.
                </p>
              </div>
            </div>

            <div style="display: flex; align-items: flex-start; gap: 8px;">
              <span style="font-size: 14px;">📧</span>
              <div>
                <strong style="font-size: 11px; color: #4A154B;">Zero-Login Self-Serve Pass Retrieval:</strong>
                <p style="font-size: 9.5px; color: #4B5563; line-height: 1.4;">
                  Students find active tickets instantly by entering their registered email, matching leader and member records.
                </p>
              </div>
            </div>

            <div style="display: flex; align-items: flex-start; gap: 8px;">
              <span style="font-size: 14px;">🔊</span>
              <div>
                <strong style="font-size: 11px; color: #4A154B;">Algorithmic Web Audio Synthesizer:</strong>
                <p style="font-size: 9.5px; color: #4B5563; line-height: 1.4;">
                  Synthesizes immediate 880Hz chimes and 220Hz buzzers without loading external audio files over the network.
                </p>
              </div>
            </div>

            <div style="display: flex; align-items: flex-start; gap: 8px;">
              <span style="font-size: 14px;">🏛️</span>
              <div>
                <strong style="font-size: 11px; color: #4A154B;">1-Click Academic Duty Leave Export:</strong>
                <p style="font-size: 9.5px; color: #4B5563; line-height: 1.4;">
                  Auto-generates official rosters containing student roll numbers, branches, years, and verified check-in stamps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Alternatives Table Column -->
      <div class="white-card" style="padding: 10px 14px; border: 1.5px solid #E9D5FF;">
        <div style="margin-bottom: 6px;">
          <span class="section-pill-dark" style="font-size: 10px; padding: 3px 10px;">
            ⚖️ EXISTING ALTERNATIVES vs HACKPASS
          </span>
        </div>

        <table class="algonex-table">
          <thead>
            <tr>
              <th>Aspect</th>
              <th>Existing Alternatives</th>
              <th style="color: #FDF2F8; background: #6B21A8;">HackPass (Our Solution)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="font-weight: 700; color: #4A154B;">Gate Verification</td>
              <td>Manual paper checklist or spreadsheet scrolling</td>
              <td style="color: #047857; font-weight: 700;">✓ Sub-second camera & laser QR scanning</td>
            </tr>
            <tr>
              <td style="font-weight: 700; color: #4A154B;">Fraud Prevention</td>
              <td>Screenshots shared easily across WhatsApp</td>
              <td style="color: #047857; font-weight: 700;">✓ Automated hard-lock on duplicate scans</td>
            </tr>
            <tr>
              <td style="font-weight: 700; color: #4A154B;">Team Management</td>
              <td>Messy multi-row entries in Google Forms</td>
              <td style="color: #047857; font-weight: 700;">✓ Dynamic leader + member schema linkage</td>
            </tr>
            <tr>
              <td style="font-weight: 700; color: #4A154B;">Duty Leave Sync</td>
              <td>Days of manual reconciliation with Registrar</td>
              <td style="color: #047857; font-weight: 700;">✓ Instant certified CSV attendance export</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

    <!-- UVP and Measurable Benefits Bottom Strip -->
    <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 10px; margin-top: 8px;">
      
      <!-- UVP -->
      <div class="pink-card" style="display: flex; align-items: center; gap: 10px; padding: 8px 12px;">
        <span style="font-size: 24px;">⭐</span>
        <div>
          <span style="font-size: 10px; font-weight: 800; color: #BE185D; font-family: 'JetBrains Mono'; text-transform: uppercase;">
            UNIQUE VALUE PROPOSITION (UVP):
          </span>
          <p style="font-size: 10.5px; color: #1F1528; line-height: 1.4; font-weight: 500;">
            A unified, collegiate-first event management system that takes Hack4Tech from <strong style="color: #4A154B;">chaotic Google Forms</strong> → <strong style="color: #BE185D;">instant digital passes</strong> → <strong style="color: #047857;">zero-queue, zero-fraud gate check-in</strong>.
          </p>
        </div>
      </div>

      <!-- Measurable Outcomes -->
      <div class="purple-card" style="display: flex; align-items: center; justify-content: space-around; padding: 6px 10px;">
        <div style="text-align: center;">
          <div style="font-size: 15px; font-weight: 800; color: #BE185D; font-family: 'JetBrains Mono';">92%</div>
          <div style="font-size: 8px; color: #7E4A7D; font-weight: 700;">Faster Entry</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 15px; font-weight: 800; color: #047857; font-family: 'JetBrains Mono';">100%</div>
          <div style="font-size: 8px; color: #7E4A7D; font-weight: 700;">Fraud Block</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 15px; font-weight: 800; color: #6B21A8; font-family: 'JetBrains Mono';">&lt;3 sec</div>
          <div style="font-size: 8px; color: #7E4A7D; font-weight: 700;">Scan Latency</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 15px; font-weight: 800; color: #2563EB; font-family: 'JetBrains Mono';">1-Click</div>
          <div style="font-size: 8px; color: #7E4A7D; font-weight: 700;">Duty Leave</div>
        </div>
      </div>

    </div>

    <div class="bottom-wave"></div>
  </div>

  <!-- ========================================== -->
  <!-- PAGE 5: FEASIBILITY & FLAGSHIP DEPLOYMENT -->
  <!-- ========================================== -->
  <div class="slide">
    <!-- Top Bar -->
    <div class="top-header">
      <div class="top-left">
        <img src="${logoBase64}" class="team-badge-logo" />
        <div>
          <div class="team-name">Hack4Tech</div>
          <div class="team-sub">Core Developer Squad</div>
        </div>
      </div>
      <div class="top-center">
        OFFLINE &nbsp;|&nbsp; CENTRALIZED SMART EVENT MANAGEMENT SYSTEM
      </div>
      <div class="top-right">
        <span>GLA UNIVERSITY</span>
        <span style="font-size: 10px; background: #9D174D; color: #FFF; padding: 2px 6px; border-radius: 4px;">NAAC A+</span>
      </div>
    </div>

    <!-- Slide Header Row -->
    <div class="main-title-row">
      <div style="background: #047857; color: #FFF; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px;">
        ✓
      </div>
      <div class="brand-title" style="font-size: 26px;">
        FEASIBILITY & <span class="brand-title-accent">IMPLEMENTATION</span>
      </div>
      <div class="header-desc">
        How practical the solution is and our active deployment for Hack4Tech flagship hackathons
      </div>
    </div>

    <!-- Feasibility Analysis vs Roadmap Row -->
    <div style="display: grid; grid-template-columns: 1fr 1.3fr; gap: 12px; margin-top: 4px;">
      
      <!-- Feasibility Analysis -->
      <div class="white-card" style="padding: 10px 14px; border: 1.5px solid #F0DAEC;">
        <div style="margin-bottom: 6px;">
          <span class="section-pill-dark" style="font-size: 10px; padding: 3px 10px;">
            ☑️ FEASIBILITY ANALYSIS
          </span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 6px; font-size: 10.5px;">
          <div style="display: flex; align-items: flex-start; gap: 8px;">
            <span style="color: #047857; font-weight: 800;">✓ Technical:</span>
            <span style="color: #374151;">Built with lightweight open-source stack (React, Node, Express, Web Audio) running smoothly on port 5000.</span>
          </div>
          <div style="display: flex; align-items: flex-start; gap: 8px;">
            <span style="color: #047857; font-weight: 800;">✓ Operational:</span>
            <span style="color: #374151;">Compatible with any student smartphone browser and volunteer laptops without software installs.</span>
          </div>
          <div style="display: flex; align-items: flex-start; gap: 8px;">
            <span style="color: #047857; font-weight: 800;">✓ Financial:</span>
            <span style="color: #374151;">Zero external API fees; utilizes browser Web Audio synthesis and local persistent JSON storage.</span>
          </div>
          <div style="display: flex; align-items: flex-start; gap: 8px;">
            <span style="color: #047857; font-weight: 800;">✓ Adoption:</span>
            <span style="color: #374151;">Zero-learning curve for students with self-serve email pass retrieval.</span>
          </div>
        </div>
      </div>

      <!-- Implementation Roadmap (4 Phases with hours matching Algonex) -->
      <div class="white-card" style="padding: 10px 14px; border: 1.5px solid #E9D5FF;">
        <div style="margin-bottom: 6px;">
          <span class="section-pill-dark" style="font-size: 10px; padding: 3px 10px;">
            🚀 IMPLEMENTATION ROADMAP
          </span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; text-align: center;">
          <div style="background: #FDF2F8; border: 1px solid #FBCFE8; border-radius: 8px; padding: 6px 4px;">
            <div style="font-size: 9px; font-weight: 800; color: #BE185D; font-family: 'JetBrains Mono';">Phase 1</div>
            <div style="font-size: 10px; font-weight: 700; color: #4A154B; margin-top: 2px;">Ingestion Engine</div>
            <div style="font-size: 8px; color: #6B7280; margin-top: 2px;">Solo/Team Ingestion & Roll No Schema</div>
          </div>
          <div style="background: #F5F3FF; border: 1px solid #DDD6FE; border-radius: 8px; padding: 6px 4px;">
            <div style="font-size: 9px; font-weight: 800; color: #7C3AED; font-family: 'JetBrains Mono';">Phase 2</div>
            <div style="font-size: 10px; font-weight: 700; color: #4A154B; margin-top: 2px;">QR Generator</div>
            <div style="font-size: 8px; color: #6B7280; margin-top: 2px;">Tamper-proof SVG & Printable Card</div>
          </div>
          <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; padding: 6px 4px;">
            <div style="font-size: 9px; font-weight: 800; color: #047857; font-family: 'JetBrains Mono';">Phase 3</div>
            <div style="font-size: 10px; font-weight: 700; color: #4A154B; margin-top: 2px;">Gate Terminal</div>
            <div style="font-size: 8px; color: #6B7280; margin-top: 2px;">Camera + Gun Scan & Anti-Duplicate Lock</div>
          </div>
          <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 8px; padding: 6px 4px;">
            <div style="font-size: 9px; font-weight: 800; color: #2563EB; font-family: 'JetBrains Mono';">Phase 4</div>
            <div style="font-size: 10px; font-weight: 700; color: #4A154B; margin-top: 2px;">Duty Leave Sync</div>
            <div style="font-size: 8px; color: #6B7280; margin-top: 2px;">1-Click CSV Roster for Registrar</div>
          </div>
        </div>
      </div>

    </div>

    <!-- Active Flagship Events Cards (VisionX, RavenX, Ignix 2.0) -->
    <div style="margin-top: 8px;">
      <div style="text-align: center; margin-bottom: 6px;">
        <span class="section-pill-dark" style="font-size: 10.5px; padding: 3px 16px;">
          DEPLOYMENT ON ACTIVE HACK4TECH COMPETITIONS
        </span>
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
        <!-- VisionX -->
        <div class="white-card" style="display: flex; gap: 10px; align-items: center; padding: 8px 10px; border-left: 3px solid #00F0FF;">
          <img src="${visionxBase64}" style="width: 48px; height: 58px; object-fit: cover; border-radius: 6px; shrink-0: 0;" />
          <div>
            <div style="font-size: 12px; font-weight: 800; color: #4A154B;">VISIONX HACKATHON</div>
            <div style="font-size: 9.5px; color: #047857; font-weight: 700;">8-Hour Multi-Track • ₹25K+ Pool</div>
            <div style="font-size: 8.5px; color: #6B7280;">Venue: CSED Block, AB-11 • Fee: ₹89</div>
          </div>
        </div>

        <!-- RavenX -->
        <div class="white-card" style="display: flex; gap: 10px; align-items: center; padding: 8px 10px; border-left: 3px solid #BE185D;">
          <img src="${ravenxBase64}" style="width: 48px; height: 58px; object-fit: cover; border-radius: 6px; shrink-0: 0;" />
          <div>
            <div style="font-size: 12px; font-weight: 800; color: #BE185D;">RAVENX GIRLS HACKATHON</div>
            <div style="font-size: 9.5px; color: #7C3AED; font-weight: 700;">Powered by Unstop • ₹50K Pool</div>
            <div style="font-size: 8.5px; color: #6B7280;">Venue: CSED Block, AB-II • Fee: ₹99</div>
          </div>
        </div>

        <!-- Ignix 2.0 -->
        <div class="white-card" style="display: flex; gap: 10px; align-items: center; padding: 8px 10px; border-left: 3px solid #EC4899;">
          <img src="${ignixBase64}" style="width: 48px; height: 58px; object-fit: cover; border-radius: 6px; shrink-0: 0;" />
          <div>
            <div style="font-size: 12px; font-weight: 800; color: #4A154B;">IGNIX 2.0 PLAYBOOK</div>
            <div style="font-size: 9.5px; color: #BE185D; font-weight: 700;">Strategy Masterclass • Goodies</div>
            <div style="font-size: 8.5px; color: #6B7280;">Venue: Room 5046, AB 12 • Fee: ₹69</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Implementation Approach & Resources Strip -->
    <div style="display: grid; grid-template-columns: 1.3fr 1fr; gap: 10px; margin-top: 8px;">
      <div class="white-card" style="padding: 6px 12px; display: flex; align-items: center; justify-content: space-between; font-size: 10px; color: #4A154B; font-weight: 700;">
        <span>Schema Validation ➔</span>
        <span>Pass Encryption ➔</span>
        <span>Gate Reception Pilot ➔</span>
        <span style="color: #047857;">Academic Sign-off</span>
      </div>

      <div class="purple-card" style="padding: 6px 12px; display: flex; align-items: center; justify-content: space-around; font-size: 10px; color: #4A154B; font-weight: 700;">
        <span>👥 Core Team (H4T Leads)</span>
        <span>📍 AB-11 & AB-II</span>
        <span>🎯 1000+ Students</span>
      </div>
    </div>

    <div class="bottom-wave"></div>
  </div>

  <!-- ========================================== -->
  <!-- PAGE 6: EXPECTED IMPACT & LONG-TERM VISION -->
  <!-- ========================================== -->
  <div class="slide">
    <!-- Top Bar -->
    <div class="top-header">
      <div class="top-left">
        <img src="${logoBase64}" class="team-badge-logo" />
        <div>
          <div class="team-name">Hack4Tech</div>
          <div class="team-sub">Core Developer Squad</div>
        </div>
      </div>
      <div class="top-center">
        OFFLINE &nbsp;|&nbsp; CENTRALIZED SMART EVENT MANAGEMENT SYSTEM
      </div>
      <div class="top-right">
        <span>GLA UNIVERSITY</span>
        <span style="font-size: 10px; background: #9D174D; color: #FFF; padding: 2px 6px; border-radius: 4px;">NAAC A+</span>
      </div>
    </div>

    <!-- Slide Header Row -->
    <div class="main-title-row">
      <div style="background: #9D174D; color: #FFF; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px;">
        📈
      </div>
      <div class="brand-title" style="font-size: 26px;">
        EXPECTED <span class="brand-title-accent">IMPACT</span>
      </div>
      <div class="header-desc">
        Measurable benefits, campus stakeholder value, and long-term expansion of HackPass
      </div>
    </div>

    <!-- 3 Columns: Quantitative vs Stakeholder vs Broader Impact (matching Algonex Page 6) -->
    <div style="display: grid; grid-template-columns: 1fr 1.3fr 1fr; gap: 12px; margin-top: 4px;">
      
      <!-- Column 1: Quantitative Outcomes -->
      <div class="white-card" style="padding: 10px 12px; border: 1.5px solid #F0DAEC;">
        <div style="margin-bottom: 8px;">
          <span class="section-pill-dark" style="font-size: 9.5px; padding: 3px 8px;">
            📊 QUANTITATIVE TARGETS
          </span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 6px;">
          <div>
            <div style="font-size: 16px; font-weight: 800; color: #047857; font-family: 'JetBrains Mono';">1,000+</div>
            <div style="font-size: 9.5px; color: #4B5563;">Students verified per hackathon sprint</div>
          </div>
          <div>
            <div style="font-size: 16px; font-weight: 800; color: #BE185D; font-family: 'JetBrains Mono';">92%</div>
            <div style="font-size: 9.5px; color: #4B5563;">Reduction in gate queue wait times</div>
          </div>
          <div>
            <div style="font-size: 16px; font-weight: 800; color: #6B21A8; font-family: 'JetBrains Mono';">100%</div>
            <div style="font-size: 9.5px; color: #4B5563;">Elimination of proxy ticket sharing</div>
          </div>
          <div>
            <div style="font-size: 16px; font-weight: 800; color: #2563EB; font-family: 'JetBrains Mono';">3-5 Days ➔ 1 Click</div>
            <div style="font-size: 9.5px; color: #4B5563;">Duty leave reconciliation turnaround</div>
          </div>
        </div>
      </div>

      <!-- Column 2: Stakeholder Impact -->
      <div class="white-card" style="padding: 10px 12px; border: 1.5px solid #E9D5FF;">
        <div style="margin-bottom: 8px;">
          <span class="section-pill-dark" style="font-size: 9.5px; padding: 3px 8px;">
            👥 STAKEHOLDER IMPACT
          </span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 6px; font-size: 10px;">
          <div style="display: flex; align-items: flex-start; gap: 6px;">
            <span style="font-size: 12px;">🎓</span>
            <div>
              <strong style="color: #4A154B;">Students:</strong>
              <span style="color: #4B5563;"> Instant passes, zero waiting in morning lines, guaranteed academic duty leaves.</span>
            </div>
          </div>
          <div style="display: flex; align-items: flex-start; gap: 6px;">
            <span style="font-size: 12px;">📋</span>
            <div>
              <strong style="color: #BE185D;">Event Organizers:</strong>
              <span style="color: #4B5563;"> Real-time attendance velocity, zero duplicate claims, stress-free gate management.</span>
            </div>
          </div>
          <div style="display: flex; align-items: flex-start; gap: 6px;">
            <span style="font-size: 12px;">🏛️</span>
            <div>
              <strong style="color: #047857;">University Administration:</strong>
              <span style="color: #4B5563;"> Tamper-proof audit trail for legitimate duty leaves, NAAC A+ compliance.</span>
            </div>
          </div>
          <div style="display: flex; align-items: flex-start; gap: 6px;">
            <span style="font-size: 12px;">🤝</span>
            <div>
              <strong style="color: #2563EB;">Corporate Sponsors (Unstop):</strong>
              <span style="color: #4B5563;"> Accurate, verified attendee metrics and female participation data.</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Column 3: Broader Campus Impact -->
      <div class="white-card" style="padding: 10px 12px; border: 1.5px solid #FBCFE8;">
        <div style="margin-bottom: 8px;">
          <span class="section-pill-dark" style="font-size: 9.5px; padding: 3px 8px;">
            🌱 BROADER IMPACT
          </span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 6px; font-size: 10px;">
          <div style="background: #FDF2F8; border-radius: 6px; padding: 6px;">
            <strong style="color: #9D174D;">Paperless Campus:</strong>
            <p style="font-size: 9px; color: #4B5563; margin-top: 1px;">Eliminates paper passes, forms, and printed checklists across departments.</p>
          </div>
          <div style="background: #F5F3FF; border-radius: 6px; padding: 6px;">
            <strong style="color: #6B21A8;">Inclusivity in Tech:</strong>
            <p style="font-size: 9px; color: #4B5563; margin-top: 1px;">Guaranteed female verification for RavenX Girls-Only hackathon.</p>
          </div>
          <div style="background: #ECFDF5; border-radius: 6px; padding: 6px;">
            <strong style="color: #047857;">Digital Governance:</strong>
            <p style="font-size: 9px; color: #4B5563; margin-top: 1px;">Adherence to Digital India and institutional excellence frameworks.</p>
          </div>
        </div>
      </div>

    </div>

    <!-- Bottom Long-Term Vision Box (matching Algonex Page 6) -->
    <div class="purple-card" style="padding: 10px 14px; margin-top: 8px; display: flex; align-items: center; justify-content: space-between;">
      <div style="max-w: 320px;">
        <div style="display: flex; align-items: center; gap: 6px;">
          <span style="font-size: 14px;">🚩</span>
          <span style="font-size: 11px; font-weight: 800; color: #4A154B; text-transform: uppercase; font-family: 'JetBrains Mono';">
            LONG-TERM VISION
          </span>
        </div>
        <p style="font-size: 10.5px; color: #1F1528; line-height: 1.4; margin-top: 2px;">
          To become the standardized digital event operating system across <strong style="color: #BE185D;">all universities in North India</strong>.
        </p>
      </div>

      <!-- 3 Phase Progression Boxes matching Algonex -->
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="background: #FFF; border: 1px solid #DDD6FE; border-radius: 8px; padding: 4px 10px; text-align: center;">
          <div style="font-size: 10px; font-weight: 800; color: #BE185D;">Pilot (0–1 Mo)</div>
          <div style="font-size: 8.5px; color: #4B5563;">Deploy VisionX, RavenX</div>
        </div>
        <div style="color: #9D174D; font-weight: 800;">➔</div>
        <div style="background: #FFF; border: 1px solid #DDD6FE; border-radius: 8px; padding: 4px 10px; text-align: center;">
          <div style="font-size: 10px; font-weight: 800; color: #7C3AED;">Scale (1–6 Mos)</div>
          <div style="font-size: 8.5px; color: #4B5563;">WhatsApp Bot & Wallets</div>
        </div>
        <div style="color: #9D174D; font-weight: 800;">➔</div>
        <div style="background: #4A154B; color: #FFF; border-radius: 8px; padding: 4px 10px; text-align: center;">
          <div style="font-size: 10px; font-weight: 800; color: #FBCFE8;">Campus (12+ Mos)</div>
          <div style="font-size: 8.5px; color: #E9D5FF;">Direct GLA ERP Webhooks</div>
        </div>
      </div>
    </div>

    <div class="bottom-wave"></div>
  </div>

</body>
</html>
`;

const exportHtmlPath = path.join(__dirname, 'presentation_algonex_style.html');
fs.writeFileSync(exportHtmlPath, htmlContent, 'utf8');

const outputPdfPath = path.join(__dirname, 'HackPass_Algonex_Style_Presentation.pdf');
const defaultPdfPath = path.join(__dirname, 'Hack4Tech_EventHub_Presentation.pdf');
const publicPdfPath = path.join(__dirname, 'public', 'Hack4Tech_EventHub_Presentation.pdf');
const distPdfPath = path.join(__dirname, 'dist', 'Hack4Tech_EventHub_Presentation.pdf');

const brainPdfPath = 'C:\\Users\\Lenovo\\.gemini\\antigravity\\brain\\ea0a820f-794a-44ed-8c1a-e142f89ca316\\HackPass_Algonex_Style_Presentation.pdf';
const brainDefaultPdfPath = 'C:\\Users\\Lenovo\\.gemini\\antigravity\\brain\\ea0a820f-794a-44ed-8c1a-e142f89ca316\\Hack4Tech_EventHub_Presentation.pdf';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const browserPath = fs.existsSync(chromePath) ? chromePath : edgePath;

console.log('Rendering Algonex-Style Light Pastel PDF via Headless Browser:', browserPath);
const cmd = `"${browserPath}" --headless=new --no-sandbox --disable-gpu --no-pdf-header-footer --print-to-pdf="${outputPdfPath}" "file:///${exportHtmlPath.replace(/\\\\/g, '/')}"`;

execSync(cmd);

console.log('Distributing generated PDF to all endpoints...');
fs.copyFileSync(outputPdfPath, defaultPdfPath);
fs.copyFileSync(outputPdfPath, publicPdfPath);
fs.copyFileSync(outputPdfPath, distPdfPath);
fs.copyFileSync(outputPdfPath, brainPdfPath);
fs.copyFileSync(outputPdfPath, brainDefaultPdfPath);

const stats = fs.statSync(outputPdfPath);
console.log(`Success! Algonex-Style PDF generated: ${outputPdfPath} (${(stats.size / 1024).toFixed(1)} KB, 6 Pages)`);
