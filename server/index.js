import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve presentation PDF
app.get('/download/presentation', (req, res) => {
  const pdfPath = path.join(__dirname, '..', 'Hack4Tech_EventHub_Presentation.pdf');
  if (fs.existsSync(pdfPath)) {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Hack4Tech_EventHub_Presentation.pdf"');
    res.sendFile(pdfPath);
  } else {
    res.status(404).send('PDF presentation not found.');
  }
});

// Serve static images
const publicImagesPath = path.join(__dirname, '..', 'public', 'images');
app.use('/images', express.static(publicImagesPath));

// Serve production frontend if built
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

const dbFilePath = path.join(__dirname, 'data', 'db.json');

// Helper to read DB
function readDb() {
  try {
    if (!fs.existsSync(dbFilePath)) {
      return { events: [], registrations: [], checkInLogs: [], adminUsers: [] };
    }
    const data = fs.readFileSync(dbFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading DB:', err);
    return { events: [], registrations: [], checkInLogs: [], adminUsers: [] };
  }
}

// Helper to write DB
function writeDb(data) {
  try {
    const dir = path.dirname(dbFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing DB:', err);
    return false;
  }
}

// Helper to generate ticket ID
function generateTicketId(eventTitle) {
  const prefix = (eventTitle || 'H4T')
    .replace(/[^A-Za-z0-9]/g, '')
    .substring(0, 3)
    .toUpperCase();
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `H4T-${prefix}-${randomNum}`;
}

// ==========================================
// ROUTES: EVENTS
// ==========================================

// Get all events
app.get('/api/events', (req, res) => {
  const db = readDb();
  res.json({ success: true, data: db.events });
});

// Get single event
app.get('/api/events/:id', (req, res) => {
  const db = readDb();
  const event = db.events.find(e => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }
  res.json({ success: true, data: event });
});

// Create new event
app.post('/api/events', (req, res) => {
  const db = readDb();
  const newEvent = {
    id: req.body.id || 'event-' + Date.now(),
    title: req.body.title || 'New Event',
    tagline: req.body.tagline || '',
    subtitle: req.body.subtitle || '',
    category: req.body.category || 'Hackathon',
    theme: req.body.theme || 'cyberpunk',
    status: req.body.status || 'open',
    organization: req.body.organization || "GLA University - Office of Students' Welfare & Hack4Tech (H4T)",
    poster: req.body.poster || '/images/visionx.jpg',
    date: req.body.date || '',
    dateIso: req.body.dateIso || '',
    time: req.body.time || '',
    duration: req.body.duration || '8 Hours',
    venue: req.body.venue || 'CSED Block, GLA University',
    prizePool: req.body.prizePool || '₹25,000+',
    prizePoolValue: Number(req.body.prizePoolValue) || 25000,
    registrationFee: Number(req.body.registrationFee) || 0,
    feeText: req.body.feeText || 'Free',
    teamType: req.body.teamType || 'individual_or_team',
    minTeamSize: Number(req.body.minTeamSize) || 1,
    maxTeamSize: Number(req.body.maxTeamSize) || 4,
    genderRestriction: req.body.genderRestriction || 'all',
    eligibility: req.body.eligibility || 'Open to all students',
    domains: req.body.domains || ['Web Dev', 'AI/ML', 'Cloud'],
    perks: req.body.perks || ['Certificates', 'Goodies', 'Refreshments'],
    coordinators: req.body.coordinators || [{ name: 'H4T Team', phone: '9368322158', role: 'Lead' }],
    instagram: req.body.instagram || '@Hack4Tech.GLAU',
    description: req.body.description || '',
    rules: req.body.rules || ['Bring your own device (BYOD)', 'Respect code of conduct']
  };

  db.events.unshift(newEvent);
  writeDb(db);
  res.status(201).json({ success: true, message: 'Event created successfully', data: newEvent });
});

// Update event
app.put('/api/events/:id', (req, res) => {
  const db = readDb();
  const index = db.events.findIndex(e => e.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }
  db.events[index] = { ...db.events[index], ...req.body, id: req.params.id };
  writeDb(db);
  res.json({ success: true, message: 'Event updated successfully', data: db.events[index] });
});

// Delete event
app.delete('/api/events/:id', (req, res) => {
  const db = readDb();
  const initialLength = db.events.length;
  db.events = db.events.filter(e => e.id !== req.params.id);
  if (db.events.length === initialLength) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }
  writeDb(db);
  res.json({ success: true, message: 'Event deleted successfully' });
});

// ==========================================
// ROUTES: REGISTRATIONS & TICKET PASSES
// ==========================================

// Register for an event
app.post('/api/register', (req, res) => {
  const db = readDb();
  const {
    eventId,
    registrationType,
    teamName,
    leaderName,
    leaderEmail,
    leaderPhone,
    rollNo,
    department,
    year,
    college,
    members,
    notes
  } = req.body;

  if (!eventId || !leaderName || !leaderEmail || !leaderPhone || !rollNo) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all mandatory fields (Name, Email, Phone, Roll Number, Event).'
    });
  }

  const event = db.events.find(e => e.id === eventId);
  if (!event) {
    return res.status(404).json({ success: false, message: 'Selected event not found.' });
  }

  // Prevent duplicate registration for the same email and event
  const normalizedEmail = leaderEmail.trim().toLowerCase();
  const existing = db.registrations.find(
    r => r.eventId === eventId && (
      r.leaderEmail.trim().toLowerCase() === normalizedEmail ||
      (r.members && r.members.some(m => m.email && m.email.trim().toLowerCase() === normalizedEmail))
    )
  );

  if (existing) {
    return res.status(409).json({
      success: false,
      code: 'ALREADY_REGISTERED',
      message: `You are already registered for ${event.title}! Your Pass ID is ${existing.ticketId}.`,
      data: existing
    });
  }

  const ticketId = generateTicketId(event.title);
  const newRegistration = {
    id: 'reg-' + Date.now(),
    ticketId,
    eventId,
    registrationType: registrationType || (teamName ? 'team' : 'individual'),
    teamName: teamName || null,
    leaderName: leaderName.trim(),
    leaderEmail: normalizedEmail,
    leaderPhone: leaderPhone.trim(),
    rollNo: rollNo.trim(),
    department: department || 'Computer Science & Engineering',
    year: year || '2nd Year',
    college: college || 'GLA University, Mathura',
    members: Array.isArray(members) ? members : [],
    status: 'REGISTERED',
    checkedInAt: null,
    checkedInBy: null,
    notes: notes || '',
    createdAt: new Date().toISOString()
  };

  db.registrations.unshift(newRegistration);
  writeDb(db);

  res.status(201).json({
    success: true,
    message: 'Registration successful! Your official event pass has been generated.',
    data: newRegistration,
    event
  });
});

// Lookup passes by Email
app.get('/api/registrations/lookup', (req, res) => {
  const email = (req.query.email || '').toString().trim().toLowerCase();
  if (!email) {
    return res.status(400).json({ success: false, message: 'Please provide an email address.' });
  }

  const db = readDb();
  const matches = db.registrations.filter(r => {
    const isLeader = r.leaderEmail && r.leaderEmail.toLowerCase() === email;
    const isMember = r.members && r.members.some(m => m.email && m.email.toLowerCase() === email);
    return isLeader || isMember;
  });

  // Attach event details to each pass
  const enriched = matches.map(reg => {
    const event = db.events.find(e => e.id === reg.eventId) || null;
    return { ...reg, event };
  });

  res.json({
    success: true,
    count: enriched.length,
    data: enriched
  });
});

// Get registration by ticket ID
app.get('/api/registrations/ticket/:ticketId', (req, res) => {
  const ticketId = req.params.ticketId.trim();
  const db = readDb();
  const reg = db.registrations.find(r => r.ticketId.toLowerCase() === ticketId.toLowerCase());
  if (!reg) {
    return res.status(404).json({ success: false, message: 'Pass not found with code: ' + ticketId });
  }
  const event = db.events.find(e => e.id === reg.eventId) || null;
  res.json({ success: true, data: { ...reg, event } });
});

// Admin get registrations (filterable)
app.get('/api/registrations', (req, res) => {
  const { eventId, status, search } = req.query;
  const db = readDb();
  let results = [...db.registrations];

  if (eventId && eventId !== 'all') {
    results = results.filter(r => r.eventId === eventId);
  }

  if (status && status !== 'all') {
    results = results.filter(r => r.status === status);
  }

  if (search) {
    const q = search.toString().toLowerCase();
    results = results.filter(r =>
      r.ticketId.toLowerCase().includes(q) ||
      r.leaderName.toLowerCase().includes(q) ||
      r.leaderEmail.toLowerCase().includes(q) ||
      r.rollNo.toLowerCase().includes(q) ||
      (r.teamName && r.teamName.toLowerCase().includes(q))
    );
  }

  // Attach event details
  const enriched = results.map(reg => {
    const event = db.events.find(e => e.id === reg.eventId) || null;
    return { ...reg, event };
  });

  res.json({ success: true, count: enriched.length, data: enriched });
});

// ==========================================
// ROUTES: ATTENDANCE & QR SCANNING
// ==========================================

// Verify & Scan QR Pass
app.post('/api/attendance/scan', (req, res) => {
  const { ticketId, station, forceMode, activeEventId } = req.body;
  if (!ticketId) {
    return res.status(400).json({ success: false, message: 'Ticket ID is required' });
  }

  const cleanTicketId = ticketId.trim();
  const db = readDb();
  const regIndex = db.registrations.findIndex(r => r.ticketId.toLowerCase() === cleanTicketId.toLowerCase());

  if (regIndex === -1) {
    return res.status(404).json({
      success: false,
      code: 'INVALID_TICKET',
      message: `Invalid Pass! Ticket ID "${cleanTicketId}" was not found in the Hack4Tech system.`
    });
  }

  const reg = db.registrations[regIndex];
  const event = db.events.find(e => e.id === reg.eventId);

  // Optional event mismatch check if scanner is locked to a specific event
  if (activeEventId && activeEventId !== 'all' && reg.eventId !== activeEventId) {
    const expectedEvent = db.events.find(e => e.id === activeEventId);
    return res.status(400).json({
      success: false,
      code: 'EVENT_MISMATCH',
      message: `Event Mismatch! This pass is registered for "${event?.title || reg.eventId}", but current station is checking into "${expectedEvent?.title || activeEventId}".`,
      data: reg,
      event
    });
  }

  // DUPLICATE CHECK-IN DETECTION
  if ((reg.status === 'CHECKED_IN' || reg.status === 'LATE') && !forceMode) {
    // Log duplicate attempt
    const duplicateLog = {
      id: 'log-' + Date.now(),
      ticketId: reg.ticketId,
      eventId: reg.eventId,
      attendeeName: reg.leaderName + (reg.teamName ? ` (${reg.teamName})` : ''),
      teamName: reg.teamName,
      type: 'DUPLICATE_ATTEMPT',
      statusRecorded: 'BLOCKED',
      timestamp: new Date().toISOString(),
      station: station || 'Gate Scanner',
      message: `Warning: Duplicate scan attempt for ${reg.ticketId} (${reg.leaderName}). Originally checked in at ${reg.checkedInAt}.`
    };
    db.checkInLogs.unshift(duplicateLog);
    writeDb(db);

    return res.status(409).json({
      success: false,
      code: 'DUPLICATE_CHECKIN',
      message: `DUPLICATE PASS DETECTED! ${reg.leaderName} has already checked in!`,
      previousCheckIn: {
        time: reg.checkedInAt,
        station: reg.checkedInBy,
        status: reg.status
      },
      data: reg,
      event
    });
  }

  // Record valid check-in
  const newStatus = forceMode === 'mark_late' ? 'LATE' : 'CHECKED_IN';
  const now = new Date().toISOString();
  const stationName = station || 'Gate Scanner Station';

  db.registrations[regIndex].status = newStatus;
  db.registrations[regIndex].checkedInAt = now;
  db.registrations[regIndex].checkedInBy = stationName;

  // Add audit log
  const successLog = {
    id: 'log-' + Date.now(),
    ticketId: reg.ticketId,
    eventId: reg.eventId,
    attendeeName: reg.leaderName + (reg.teamName ? ` (${reg.teamName})` : ''),
    teamName: reg.teamName,
    type: forceMode ? 'MANUAL_OVERRIDE' : 'FIRST_SCAN',
    statusRecorded: newStatus,
    timestamp: now,
    station: stationName,
    message: `${newStatus === 'LATE' ? 'Late arrival recorded' : 'Check-in verified'}: ${reg.leaderName} (${reg.ticketId})`
  };

  db.checkInLogs.unshift(successLog);
  writeDb(db);

  res.json({
    success: true,
    code: 'CHECK_IN_SUCCESS',
    message: newStatus === 'LATE'
      ? `Late Arrival Recorded: Welcome ${reg.leaderName}!`
      : `Verified! Check-in successful for ${reg.leaderName}.`,
    isLate: newStatus === 'LATE',
    data: db.registrations[regIndex],
    event
  });
});

// Admin manual status change
app.patch('/api/registrations/:id/status', (req, res) => {
  const { status, notes, station } = req.body;
  const db = readDb();
  const index = db.registrations.findIndex(r => r.id === req.params.id || r.ticketId === req.params.id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Registration not found' });
  }

  const validStatuses = ['REGISTERED', 'CHECKED_IN', 'LATE', 'ABSENT'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status code' });
  }

  const reg = db.registrations[index];
  const previousStatus = reg.status;
  const now = new Date().toISOString();

  reg.status = status;
  if (status === 'CHECKED_IN' || status === 'LATE') {
    if (!reg.checkedInAt) reg.checkedInAt = now;
    reg.checkedInBy = station || 'Admin Manual Override';
  } else if (status === 'REGISTERED' || status === 'ABSENT') {
    reg.checkedInAt = null;
    reg.checkedInBy = null;
  }

  if (notes !== undefined) {
    reg.notes = notes;
  }

  // Log action
  db.checkInLogs.unshift({
    id: 'log-' + Date.now(),
    ticketId: reg.ticketId,
    eventId: reg.eventId,
    attendeeName: reg.leaderName + (reg.teamName ? ` (${reg.teamName})` : ''),
    teamName: reg.teamName,
    type: 'MANUAL_OVERRIDE',
    statusRecorded: status,
    timestamp: now,
    station: station || 'Admin Console',
    message: `Admin manually updated status from ${previousStatus} to ${status} for ${reg.ticketId}`
  });

  writeDb(db);

  res.json({
    success: true,
    message: `Status updated to ${status}`,
    data: reg
  });
});

// Check-in audit logs
app.get('/api/attendance/logs', (req, res) => {
  const db = readDb();
  res.json({ success: true, data: db.checkInLogs.slice(0, 50) });
});

// ==========================================
// ROUTES: ANALYTICS & STATS
// ==========================================

app.get('/api/stats', (req, res) => {
  const db = readDb();
  const totalEvents = db.events.length;
  const totalRegistrations = db.registrations.length;
  const checkedInCount = db.registrations.filter(r => r.status === 'CHECKED_IN').length;
  const lateCount = db.registrations.filter(r => r.status === 'LATE').length;
  const absentCount = db.registrations.filter(r => r.status === 'ABSENT').length;
  const pendingCount = db.registrations.filter(r => r.status === 'REGISTERED').length;

  const totalAttended = checkedInCount + lateCount;
  const attendanceRate = totalRegistrations > 0 ? Math.round((totalAttended / totalRegistrations) * 100) : 0;

  // Calculate estimated revenue
  let totalRevenue = 0;
  db.registrations.forEach(reg => {
    const event = db.events.find(e => e.id === reg.eventId);
    if (event && event.registrationFee) {
      const attendees = 1 + (reg.members?.length || 0);
      totalRevenue += event.registrationFee * attendees;
    }
  });

  // Per-event statistics
  const eventBreakdown = db.events.map(event => {
    const eventRegs = db.registrations.filter(r => r.eventId === event.id);
    const attended = eventRegs.filter(r => r.status === 'CHECKED_IN' || r.status === 'LATE').length;
    const lates = eventRegs.filter(r => r.status === 'LATE').length;
    let eventRevenue = 0;
    eventRegs.forEach(r => {
      const count = 1 + (r.members?.length || 0);
      eventRevenue += (event.registrationFee || 0) * count;
    });

    return {
      eventId: event.id,
      title: event.title,
      category: event.category,
      totalRegistrations: eventRegs.length,
      attended,
      late: lates,
      attendanceRate: eventRegs.length > 0 ? Math.round((attended / eventRegs.length) * 100) : 0,
      revenue: eventRevenue
    };
  });

  res.json({
    success: true,
    data: {
      totalEvents,
      totalRegistrations,
      checkedInCount,
      lateCount,
      absentCount,
      pendingCount,
      totalAttended,
      attendanceRate,
      totalRevenue,
      eventBreakdown,
      recentLogs: db.checkInLogs.slice(0, 10)
    }
  });
});

// ==========================================
// ROUTES: EXPORT DATA
// ==========================================

app.get('/api/export', (req, res) => {
  const { eventId, format } = req.query;
  const db = readDb();
  let list = db.registrations;

  if (eventId && eventId !== 'all') {
    list = list.filter(r => r.eventId === eventId);
  }

  if (format === 'json') {
    return res.json(list);
  }

  // Generate CSV
  const headers = [
    'Ticket ID',
    'Event ID',
    'Event Title',
    'Registration Type',
    'Team Name',
    'Leader Name',
    'Leader Email',
    'Leader Phone',
    'Roll Number',
    'Department',
    'Year',
    'College',
    'Member Count',
    'Member Details',
    'Status',
    'Checked-In At',
    'Checked-In By',
    'Registered At'
  ];

  const rows = list.map(reg => {
    const event = db.events.find(e => e.id === reg.eventId);
    const memberDetails = (reg.members || [])
      .map(m => `${m.name} (${m.rollNo || ''}, ${m.email || ''})`)
      .join(' | ');

    return [
      `"${reg.ticketId}"`,
      `"${reg.eventId}"`,
      `"${event?.title || ''}"`,
      `"${reg.registrationType}"`,
      `"${reg.teamName || ''}"`,
      `"${reg.leaderName}"`,
      `"${reg.leaderEmail}"`,
      `"${reg.leaderPhone}"`,
      `"${reg.rollNo}"`,
      `"${reg.department}"`,
      `"${reg.year}"`,
      `"${reg.college}"`,
      `"${(reg.members || []).length}"`,
      `"${memberDetails.replace(/"/g, '""')}"`,
      `"${reg.status}"`,
      `"${reg.checkedInAt || ''}"`,
      `"${reg.checkedInBy || ''}"`,
      `"${reg.createdAt}"`
    ].join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=H4T_Registrations_${Date.now()}.csv`);
  res.send(csvContent);
});

// ==========================================
// ROUTES: AUTHENTICATION
// ==========================================

app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  const db = readDb();
  const user = db.adminUsers.find(
    u => u.email.toLowerCase() === (email || '').toLowerCase() && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password. Default demo credentials: admin@hack4tech.com / admin123'
    });
  }

  res.json({
    success: true,
    message: 'Authentication successful',
    token: 'h4t_jwt_simulated_token_' + Date.now(),
    user: {
      email: user.email,
      name: user.name,
      role: user.role
    }
  });
});

// SPA fallback
if (fs.existsSync(distPath)) {
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/images')) {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

const PRIMARY_PORT = parseInt(PORT, 10);
const ALT_PORT = 3000;

const server5000 = app.listen(PRIMARY_PORT, '0.0.0.0', () => {
  console.log(`[H4T Server] EventHub API running smoothly on port ${PRIMARY_PORT}`);
  console.log(`[H4T Server] Open in your browser: http://localhost:${PRIMARY_PORT} or http://127.0.0.1:${PRIMARY_PORT}`);
});

// Also bind port 3000 if different and available so localhost:3000 also works seamlessly
if (PRIMARY_PORT !== ALT_PORT) {
  try {
    const server3000 = app.listen(ALT_PORT, '0.0.0.0', () => {
      console.log(`[H4T Server] Also listening on port ${ALT_PORT}: http://localhost:${ALT_PORT}`);
    });
    server3000.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`[H4T Server] Note: Port ${ALT_PORT} is in use by another tool, primary port ${PRIMARY_PORT} is active.`);
      } else {
        console.log(`[H4T Server] Port ${ALT_PORT} notice: ${err.message}`);
      }
    });
  } catch (err) {
    console.log(`[H4T Server] Alt port note: ${err.message}`);
  }
}
