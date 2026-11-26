# ⚡ EVENTHUB — Smart Event Management System (EMS 2.0)
### Official Centralized Event Ecosystem for **HACK4TECH (H4T)**
#### GLA University (NAAC A+ Accredited) • Office of Students' Welfare

---

## 🌟 Overview
**EVENTHUB** is a high-performance, real-time Event Management System engineered specifically for **Hack4Tech** at GLA University. It empowers students to explore flagship tech events, register individually or in multi-member teams, generate cryptographically signed QR-based event passes, and enables event organizers and volunteers to manage registrations and verify live gate attendance through a cyber-themed administrative terminal with automated duplicate check-in prevention.

---

## 🚀 Key Features

### 1. 🎯 Flagship Events Lineup & Dedicated Detail Pages
Accurately mirrors official posters and university guidelines for all 3 flagship events:
- **VISIONX ("Turning Vision Into Reality")**: 8-Hour Multi-Track Hackathon (AI/ML, Cloud, Cyber Security, Web Dev) with ₹25,000+ prize pool, ₹89 entry fee, goodies, certificates, refreshments, and official duty leave at CSED Block, AB-11.
- **RAVENX ("Her Power. Her Code. Her Future.")**: Powered by Unstop. Girls-Only Hackathon with ₹50,000 worth prize pool, 2–4 members, gothic-purple aesthetic, and mentorship at CSED Block, AB-II.
- **IGNIX 2.0 ("The Hackathon Playbook")**: Strategy, Ideation & Prototyping Masterclass with ₹69 entry fee, BYOD sprint, and certificates at Room 5046, AB 12.

### 2. 🎟️ Instant QR Event Pass Generation & Pass Retrieval
- Generates a unique **Ticket ID** (e.g. `H4T-VX-91823`, `H4T-RX-48201`) upon individual or team registration.
- Dynamic high-contrast QR code generated in real time encoding attendee details, roll number, team name, and verification tokens.
- **Find My Pass Portal**: Students can enter their registered college email anytime to retrieve and re-download their active passes.
- High-tech holographic digital pass card with one-click **Print Pass** (optimized print stylesheet) and copy code functionality.

### 3. 📷 Live QR Attendance Scanner with Duplicate Prevention
- **Camera Viewfinder**: Continuous scanning using webcams or smartphone cameras.
- **Barcode Reader Support**: Instant manual or USB barcode scanner input.
- **Strict Anti-Duplicate Lock**: When an already checked-in ticket is scanned, the terminal immediately rings an audible alarm and flashes a bright red alert showing previous check-in time and station, preventing duplicate entry and fraud.
- **Late Arrival Controls**: Dedicated toggle to mark late arrivals with real-time arrival timestamps and notes.
- **Manual Attendance Overrides**: Search attendees by name or roll number to mark them Present, Late, or Absent with one click.

### 4. 📊 Secure Real-Time Admin Dashboard
- **Live Metrics**: Total registrations, real-time attendance turnout %, late arrivals count, and estimated revenue.
- **Live Check-in Stream**: Chronological ledger of all scans, manual overrides, and duplicate attempt blocks.
- **Event Management**: Create new events, update dates/venues/prizes, toggle status (Open/Closed), or delete events.
- **Data Export**: Export attendee rosters to **CSV** or **JSON** with one click.
- **Printable Attendance Sheet**: Generates clean physical roster tables formatted with signature columns for gate backups.

---

## 🛠️ Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React, QR Code SVG, Canvas Confetti.
- **Audio Feedback**: Custom Web Audio API synthesizer for instantaneous scanner chimes and warning buzzers.
- **Backend**: Node.js & Express REST API with persistent JSON database (`server/data/db.json`).
- **Build Tool**: Vite 6.

---

## 🏁 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Application
To run both backend API and Vite dev server:
```bash
npm run dev
```

Or run the production server (serves frontend + API on port 5000):
```bash
npm run build
npm start
```

Open **`http://localhost:5000`** in your browser.

### 3. Configure the chatbot
The chatbot uses Gemini on the server. Set `GEMINI_API_KEY` in the server environment; never put the key in frontend code or commit it to GitHub. The model defaults to `gemini-3.8-flash`; override it with `GEMINI_MODEL` if needed.

In PowerShell, set the key before starting the development server:
```powershell
$env:GEMINI_API_KEY = "your-gemini-api-key"
npm run dev
```

For Render, add `GEMINI_API_KEY` as a secret environment variable in the web service settings. The chat endpoint returns a setup message until the key is configured.

### 4. Demo Credentials
- **Admin Email**: `admin@hack4tech.com`
- **Admin Password**: `admin123`
- Pre-registered student demo emails for "Find My Pass":
  - `aryan.sharma@gla.ac.in` (VisionX)
  - `ananya.joshi@gla.ac.in` (RavenX)
  - `devansh.dixit@gla.ac.in` (Ignix 2.0)
