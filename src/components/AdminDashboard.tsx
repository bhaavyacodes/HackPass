import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Download, 
  Plus, 
  Search, 
  ShieldAlert, 
  Trash2, 
  Edit3, 
  Printer, 
  RefreshCw, 
  FileSpreadsheet, 
  LogOut, 
  Eye, 
  Check, 
  X,
  TrendingUp,
  AlertTriangle,
  IndianRupee,
  Layers
} from 'lucide-react';
import { EventItem, Registration, StatsData, CheckInLog } from '../types';
import { api } from '../services/api';

interface AdminDashboardProps {
  events: EventItem[];
  onRefreshEvents: () => void;
  onOpenPassModal: (reg: Registration) => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  events,
  onRefreshEvents,
  onOpenPassModal,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'registrations' | 'events' | 'logs'>('overview');
  const [stats, setStats] = useState<StatsData | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [logs, setLogs] = useState<CheckInLog[]>([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [selectedEventId, setSelectedEventId] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected registration for details modal
  const [inspectReg, setInspectReg] = useState<Registration | null>(null);

  // Event modal (Create / Edit)
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);

  // New Event Form State
  const [eventForm, setEventForm] = useState<Partial<EventItem>>({
    title: '',
    tagline: '',
    subtitle: '',
    category: 'Hackathon',
    theme: 'cyberpunk',
    date: '',
    dateIso: '',
    time: '09:00 AM – 05:00 PM',
    duration: '8 Hours',
    venue: 'CSED Block, GLA University',
    prizePool: '₹25,000+',
    prizePoolValue: 25000,
    registrationFee: 89,
    feeText: '₹89 / Student',
    teamType: 'individual_or_team',
    minTeamSize: 1,
    maxTeamSize: 4,
    genderRestriction: 'all',
    poster: '/images/visionx.jpg',
    description: '',
    domains: ['AI / ML', 'Web Dev', 'Cyber Security'],
    perks: ['Certificates', 'Goodies', 'Refreshments', 'Academic Leave Approved'],
    rules: ['BYOD: Bring your own device', 'Respect code of conduct'],
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsData, regsData, logsData] = await Promise.all([
        api.getStats(),
        api.getRegistrations({
          eventId: selectedEventId === 'all' ? undefined : selectedEventId,
          status: selectedStatus === 'all' ? undefined : selectedStatus,
          search: searchQuery || undefined,
        }),
        api.getAttendanceLogs(),
      ]);
      setStats(statsData);
      setRegistrations(regsData);
      setLogs(logsData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedEventId, selectedStatus]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
  };

  // Status updates
  const handleUpdateStatus = async (
    reg: Registration,
    newStatus: 'REGISTERED' | 'CHECKED_IN' | 'LATE' | 'ABSENT'
  ) => {
    try {
      await api.updateRegistrationStatus(reg.id, newStatus, `Admin set status to ${newStatus}`);
      loadData();
    } catch (e: any) {
      alert(e.message || 'Update failed');
    }
  };

  // Save Event (Create or Update)
  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await api.updateEvent(editingEvent.id, eventForm);
      } else {
        await api.createEvent(eventForm);
      }
      setShowEventModal(false);
      setEditingEvent(null);
      onRefreshEvents();
      loadData();
    } catch (e: any) {
      alert(e.message || 'Failed to save event');
    }
  };

  // Delete Event
  const handleDeleteEvent = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete event "${title}"?`)) {
      try {
        await api.deleteEvent(id);
        onRefreshEvents();
        loadData();
      } catch (e: any) {
        alert(e.message || 'Failed to delete event');
      }
    }
  };

  // Open Edit Event Modal
  const handleEditClick = (ev: EventItem) => {
    setEditingEvent(ev);
    setEventForm(ev);
    setShowEventModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner & Tab Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              Admin Control Center
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-xs font-mono text-gray-400">Logged in as admin@hack4tech.com</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white mt-1">
            Hack4Tech Command Hub
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={loadData}
            className="p-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white transition-all text-xs flex items-center gap-1.5"
            title="Refresh All Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <a
            href={api.getExportUrl(selectedEventId === 'all' ? undefined : selectedEventId, 'csv')}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </a>

          <button
            onClick={() => {
              setEditingEvent(null);
              setEventForm({
                title: '',
                tagline: '',
                subtitle: '',
                category: 'Hackathon',
                theme: 'cyberpunk',
                date: '',
                dateIso: '',
                time: '09:00 AM – 05:00 PM',
                duration: '8 Hours',
                venue: 'CSED Block, GLA University',
                prizePool: '₹25,000+',
                prizePoolValue: 25000,
                registrationFee: 89,
                feeText: '₹89 / Student',
                teamType: 'individual_or_team',
                minTeamSize: 1,
                maxTeamSize: 4,
                genderRestriction: 'all',
                poster: '/images/visionx.jpg',
                description: '',
                domains: ['AI / ML', 'Web Dev', 'Cyber Security'],
                perks: ['Certificates', 'Goodies', 'Refreshments', 'Academic Leave Approved'],
                rules: ['BYOD: Bring your own device', 'Respect code of conduct'],
              });
              setShowEventModal(true);
            }}
            className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs shadow-neon-cyan transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create Event</span>
          </button>

          <button
            onClick={onLogout}
            className="p-2.5 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-200 transition-all text-xs"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
            activeTab === 'overview'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-gray-400 hover:text-white hover:bg-gray-900'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Analytics & Live Metrics</span>
        </button>

        <button
          onClick={() => setActiveTab('registrations')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
            activeTab === 'registrations'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-gray-400 hover:text-white hover:bg-gray-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Registrations & Live Attendance ({registrations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
            activeTab === 'events'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-gray-400 hover:text-white hover:bg-gray-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Manage Events ({events.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
            activeTab === 'logs'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-gray-400 hover:text-white hover:bg-gray-900'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-purple-400" />
          <span>Audit Logs & Duplicate Alerts</span>
        </button>
      </div>

      {/* ========================================== */}
      {/* TAB 1: OVERVIEW ANALYTICS */}
      {/* ========================================== */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Top Metric Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-3xl bg-[#0c101a] border border-gray-800 space-y-2">
              <div className="flex items-center justify-between text-gray-400">
                <span className="text-xs font-mono uppercase">Total Registrations</span>
                <Users className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                {stats?.totalRegistrations || 0}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-cyan-400">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Across 3 Flagship Events</span>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-[#0c101a] border border-gray-800 space-y-2">
              <div className="flex items-center justify-between text-gray-400">
                <span className="text-xs font-mono uppercase">Checked In</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
                {stats?.checkedInCount || 0}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>Late: <strong className="text-amber-400">{stats?.lateCount || 0}</strong></span>
                <span>•</span>
                <span>Pending: <strong className="text-gray-300">{stats?.pendingCount || 0}</strong></span>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-[#0c101a] border border-gray-800 space-y-2">
              <div className="flex items-center justify-between text-gray-400">
                <span className="text-xs font-mono uppercase">Live Attendance Rate</span>
                <Clock className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-400">
                {stats?.attendanceRate || 0}%
              </p>
              <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${stats?.attendanceRate || 0}%` }}
                ></div>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-[#0c101a] border border-gray-800 space-y-2">
              <div className="flex items-center justify-between text-gray-400">
                <span className="text-xs font-mono uppercase">Est. Revenue Collected</span>
                <IndianRupee className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400">
                ₹{(stats?.totalRevenue || 0).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">From verified participant fee tiers</p>
            </div>

          </div>

          {/* Event Breakdown Cards */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              <span>Event-Wise Attendance Performance</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats?.eventBreakdown?.map((ev) => (
                <div
                  key={ev.eventId}
                  className="p-5 rounded-3xl bg-[#0c101a] border border-gray-800 space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase font-bold text-cyan-400">
                        {ev.category}
                      </span>
                      <h4 className="text-lg font-bold text-white font-display">{ev.title}</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-gray-900 border border-gray-800 font-mono text-xs font-bold text-gray-200">
                      {ev.totalRegistrations} Registered
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Attendance Turnout</span>
                      <span className="font-mono text-white font-bold">{ev.attendanceRate}%</span>
                    </div>
                    <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-cyan-400 h-full rounded-full"
                        style={{ width: `${ev.attendanceRate}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-gray-800/80">
                    <div className="p-2 rounded-xl bg-gray-900/60 text-gray-300">
                      <span className="text-gray-500 block text-[10px] uppercase font-mono">Present / Late</span>
                      <strong className="text-emerald-400 font-mono">{ev.attended}</strong> ({ev.late} Late)
                    </div>
                    <div className="p-2 rounded-xl bg-gray-900/60 text-gray-300">
                      <span className="text-gray-500 block text-[10px] uppercase font-mono">Revenue</span>
                      <strong className="text-amber-400 font-mono">₹{ev.revenue}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Activity Feed */}
          <div className="p-6 rounded-3xl bg-[#0c101a] border border-gray-800 space-y-4">
            <h3 className="text-base font-bold text-white font-display flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Live Check-in Stream & Action Log</span>
              </span>
              <span className="text-xs font-mono text-gray-500">Auto-updating</span>
            </h3>

            <div className="space-y-2">
              {stats?.recentLogs?.map((log) => (
                <div
                  key={log.id}
                  className={`p-3 rounded-2xl border text-xs flex items-center justify-between gap-4 ${
                    log.type === 'DUPLICATE_ATTEMPT'
                      ? 'bg-red-950/40 border-red-800 text-red-200'
                      : log.statusRecorded === 'LATE'
                      ? 'bg-amber-950/40 border-amber-800 text-amber-200'
                      : 'bg-gray-900/60 border-gray-800 text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        log.type === 'DUPLICATE_ATTEMPT'
                          ? 'bg-red-500 animate-ping'
                          : log.statusRecorded === 'LATE'
                          ? 'bg-amber-400'
                          : 'bg-emerald-400'
                      }`}
                    ></span>
                    <div>
                      <p className="font-semibold text-white">{log.message}</p>
                      <p className="text-[10px] text-gray-400 font-mono">
                        Station: {log.station} • Pass: {log.ticketId}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-gray-500 shrink-0">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================== */}
      {/* TAB 2: REGISTRATIONS & ATTENDANCE TABLE */}
      {/* ========================================== */}
      {activeTab === 'registrations' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Filter Bar */}
          <div className="p-4 rounded-2xl bg-[#0c101a] border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full md:w-auto">
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, roll no, email, ticket ID, team..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-gray-900 border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
              />
            </form>

            {/* Dropdowns */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <select
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                className="px-3 py-2 rounded-xl bg-gray-900 border border-gray-700 text-xs text-gray-200 focus:outline-none focus:border-cyan-400"
              >
                <option value="all">All Events</option>
                {events.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.title}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 rounded-xl bg-gray-900 border border-gray-700 text-xs text-gray-200 focus:outline-none focus:border-cyan-400"
              >
                <option value="all">All Statuses</option>
                <option value="REGISTERED">Pending (Registered)</option>
                <option value="CHECKED_IN">Checked In (Present)</option>
                <option value="LATE">Late Arrival</option>
                <option value="ABSENT">Absent</option>
              </select>

              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
                title="Print Attendee Sign-in Sheet"
              >
                <Printer className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">Print Sheet</span>
              </button>
            </div>

          </div>

          {/* Registrations Table */}
          <div className="rounded-3xl bg-[#0c101a] border border-gray-800 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-gray-900/90 text-[11px] font-mono uppercase text-gray-400 border-b border-gray-800">
                  <tr>
                    <th className="px-5 py-3.5">Ticket ID</th>
                    <th className="px-5 py-3.5">Participant / Team</th>
                    <th className="px-5 py-3.5">Event</th>
                    <th className="px-5 py-3.5">Roll No & Dept</th>
                    <th className="px-5 py-3.5">Attendance Status</th>
                    <th className="px-5 py-3.5">Check-in Time</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/80">
                  {registrations.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                        No registrations found matching the filters.
                      </td>
                    </tr>
                  ) : (
                    registrations.map((reg) => (
                      <tr key={reg.id} className="hover:bg-gray-900/50 transition-colors">
                        
                        {/* Ticket Code */}
                        <td className="px-5 py-4 font-mono font-bold text-cyan-400">
                          {reg.ticketId}
                        </td>

                        {/* Name & Team */}
                        <td className="px-5 py-4">
                          <p className="font-bold text-white text-sm">{reg.leaderName}</p>
                          <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5">
                            <span>{reg.leaderEmail}</span>
                            {reg.teamName && (
                              <>
                                <span>•</span>
                                <span className="text-purple-300 font-semibold font-mono">
                                  {reg.teamName} ({1 + (reg.members?.length || 0)} members)
                                </span>
                              </>
                            )}
                          </div>
                        </td>

                        {/* Event */}
                        <td className="px-5 py-4">
                          <span className="font-semibold text-gray-200">
                            {reg.event?.title || reg.eventId}
                          </span>
                        </td>

                        {/* Roll & Dept */}
                        <td className="px-5 py-4">
                          <p className="font-mono text-gray-200">{reg.rollNo}</p>
                          <p className="text-[10px] text-gray-400 truncate max-w-[150px]">{reg.department}</p>
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                              reg.status === 'CHECKED_IN'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                                : reg.status === 'LATE'
                                ? 'bg-amber-950 text-amber-300 border border-amber-700'
                                : reg.status === 'ABSENT'
                                ? 'bg-red-950 text-red-300 border border-red-700'
                                : 'bg-gray-800 text-gray-300 border border-gray-700'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                            {reg.status}
                          </span>
                        </td>

                        {/* Checked In Time */}
                        <td className="px-5 py-4 font-mono text-[11px] text-gray-400">
                          {reg.checkedInAt ? (
                            <div>
                              <p className="text-emerald-300 font-bold">
                                {new Date(reg.checkedInAt).toLocaleTimeString()}
                              </p>
                              <p className="text-[10px] text-gray-500">{reg.checkedInBy}</p>
                            </div>
                          ) : (
                            <span className="text-gray-600">—</span>
                          )}
                        </td>

                        {/* Action Buttons */}
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => onOpenPassModal(reg)}
                              className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-cyan-400 transition-colors"
                              title="View Event Pass"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* Mark Present */}
                            {reg.status !== 'CHECKED_IN' && (
                              <button
                                onClick={() => handleUpdateStatus(reg, 'CHECKED_IN')}
                                className="px-2 py-1 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 text-[10px] font-bold"
                                title="Mark Present"
                              >
                                Present
                              </button>
                            )}

                            {/* Mark Late */}
                            {reg.status !== 'LATE' && (
                              <button
                                onClick={() => handleUpdateStatus(reg, 'LATE')}
                                className="px-2 py-1 rounded-lg bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-700 text-[10px] font-bold"
                                title="Mark Late"
                              >
                                Late
                              </button>
                            )}

                            {/* Reset / Absent */}
                            {reg.status === 'CHECKED_IN' || reg.status === 'LATE' ? (
                              <button
                                onClick={() => handleUpdateStatus(reg, 'REGISTERED')}
                                className="px-2 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-[10px]"
                                title="Reset Attendance"
                              >
                                Reset
                              </button>
                            ) : (
                              <button
                                onClick={() => handleUpdateStatus(reg, 'ABSENT')}
                                className="px-2 py-1 rounded-lg bg-red-950 hover:bg-red-900 text-red-300 border border-red-700 text-[10px]"
                                title="Mark Absent"
                              >
                                Absent
                              </button>
                            )}
                          </div>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ========================================== */}
      {/* TAB 3: MANAGE EVENTS */}
      {/* ========================================== */}
      {activeTab === 'events' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="p-5 rounded-3xl bg-[#0c101a] border border-gray-800 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="relative h-44 rounded-2xl overflow-hidden bg-black mb-3">
                    <img src={ev.poster} alt={ev.title} className="w-full h-full object-cover object-top" />
                    <div className="absolute top-2 right-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-black/80 text-cyan-300 border border-cyan-800">
                        {ev.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-display text-white">{ev.title}</h3>
                  <p className="text-xs text-cyan-400 font-mono mt-0.5">{ev.subtitle || ev.tagline}</p>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2">{ev.description}</p>

                  <div className="mt-3 space-y-1 text-xs text-gray-300 font-mono">
                    <p>📅 {ev.date} ({ev.time})</p>
                    <p>📍 {ev.venue}</p>
                    <p>💰 {ev.prizePool} Prize Pool</p>
                    <p>🎟️ Fee: {ev.feeText}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-800 flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-700">
                    Status: {ev.status.toUpperCase()}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditClick(ev)}
                      className="p-2 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-700 text-cyan-400 transition-colors"
                      title="Edit Event"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(ev.id, ev.title)}
                      className="p-2 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 transition-colors"
                      title="Delete Event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 4: AUDIT LOGS & DUPLICATE ATTEMPTS */}
      {/* ========================================== */}
      {activeTab === 'logs' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-4 rounded-2xl bg-[#0c101a] border border-gray-800 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white font-display">System Check-in Audit Log</h3>
              <p className="text-xs text-gray-400">
                Full chronological ledger tracking verified entries, duplicate scan flags, and manual administrator overrides.
              </p>
            </div>
            <button
              onClick={loadData}
              className="px-3 py-1.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-xs text-cyan-400 border border-gray-800"
            >
              Refresh Logs
            </button>
          </div>

          <div className="rounded-3xl bg-[#0c101a] border border-gray-800 overflow-hidden shadow-2xl">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-gray-900/90 text-[11px] font-mono uppercase text-gray-400 border-b border-gray-800">
                <tr>
                  <th className="px-5 py-3.5">Timestamp</th>
                  <th className="px-5 py-3.5">Log Type</th>
                  <th className="px-5 py-3.5">Ticket ID</th>
                  <th className="px-5 py-3.5">Attendee Name</th>
                  <th className="px-5 py-3.5">Station</th>
                  <th className="px-5 py-3.5">Message / System Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/80">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-900/50">
                    <td className="px-5 py-3.5 font-mono text-gray-400">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          log.type === 'DUPLICATE_ATTEMPT'
                            ? 'bg-red-950 text-red-300 border border-red-700'
                            : log.type === 'MANUAL_OVERRIDE'
                            ? 'bg-purple-950 text-purple-300 border border-purple-700'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                        }`}
                      >
                        {log.type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-mono font-bold text-cyan-400">
                      {log.ticketId}
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-white">
                      {log.attendeeName}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-gray-400">
                      {log.station}
                    </td>
                    <td className="px-5 py-3.5 text-gray-300">
                      {log.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* MODAL: CREATE / EDIT EVENT */}
      {/* ========================================== */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0c101a] border border-gray-700 p-6 sm:p-8 space-y-6 text-gray-200">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <h2 className="text-xl font-bold font-display text-white">
                {editingEvent ? 'Edit Event Details' : 'Create New Event'}
              </h2>
              <button
                onClick={() => setShowEventModal(false)}
                className="p-1.5 rounded-full hover:bg-gray-800 text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1">Event Title *</label>
                  <input
                    type="text"
                    required
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Category</label>
                  <select
                    value={eventForm.category}
                    onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Hackathon">Hackathon</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Coding Sprint">Coding Sprint</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Subtitle / Sub-theme</label>
                  <input
                    type="text"
                    value={eventForm.subtitle}
                    onChange={(e) => setEventForm({ ...eventForm, subtitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Tagline</label>
                  <input
                    type="text"
                    value={eventForm.tagline}
                    onChange={(e) => setEventForm({ ...eventForm, tagline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Date String (e.g. 20 April, 2026)</label>
                  <input
                    type="text"
                    required
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Time (e.g. 09:00 AM – 05:00 PM)</label>
                  <input
                    type="text"
                    required
                    value={eventForm.time}
                    onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Venue</label>
                  <input
                    type="text"
                    required
                    value={eventForm.venue}
                    onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Prize Pool Display (e.g. ₹25,000+)</label>
                  <input
                    type="text"
                    value={eventForm.prizePool}
                    onChange={(e) => setEventForm({ ...eventForm, prizePool: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Fee Display (e.g. ₹89 / Student)</label>
                  <input
                    type="text"
                    value={eventForm.feeText}
                    onChange={(e) => setEventForm({ ...eventForm, feeText: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Registration Fee Amount (INR)</label>
                  <input
                    type="number"
                    value={eventForm.registrationFee}
                    onChange={(e) => setEventForm({ ...eventForm, registrationFee: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Poster Image URL</label>
                  <input
                    type="text"
                    value={eventForm.poster}
                    onChange={(e) => setEventForm({ ...eventForm, poster: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Team Requirement</label>
                  <select
                    value={eventForm.teamType}
                    onChange={(e) => setEventForm({ ...eventForm, teamType: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="individual_or_team">Individual or Team</option>
                    <option value="team_only">Team Only (2-4 Members)</option>
                    <option value="individual_only">Solo Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-cyan-400"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 rounded-xl border border-gray-700 hover:bg-gray-800 text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold shadow-neon-cyan"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
