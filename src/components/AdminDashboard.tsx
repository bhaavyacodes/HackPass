import React, { useState, useEffect, useRef } from 'react';
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
  Layers,
  MapPin,
  Trophy,
  Ticket
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
  const [loadError, setLoadError] = useState<string | null>(null);

  // Filters
  const [selectedEventId, setSelectedEventId] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const filtersRef = useRef({ selectedEventId, selectedStatus, searchQuery });
  const loadingRef = useRef(false);
  filtersRef.current = { selectedEventId, selectedStatus, searchQuery };

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
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const filters = filtersRef.current;
      const [statsData, regsData, logsData] = await Promise.all([
        api.getStats(),
        api.getRegistrations({
          eventId: filters.selectedEventId === 'all' ? undefined : filters.selectedEventId,
          status: filters.selectedStatus === 'all' ? undefined : filters.selectedStatus,
          search: filters.searchQuery || undefined,
        }),
        api.getAttendanceLogs(),
      ]);
      setStats(statsData);
      setRegistrations(regsData);
      setLogs(logsData);
      setLoadError(null);
    } catch (error) {
      console.error('Failed to refresh admin dashboard:', error);
      setLoadError(error instanceof Error ? error.message : 'Unable to load dashboard data.');
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  useEffect(() => {
    const refreshWhenVisible = () => {
      if (document.visibilityState === 'visible') {
        void loadData();
      }
    };

    refreshWhenVisible();
    const intervalId = window.setInterval(refreshWhenVisible, 5000);
    document.addEventListener('visibilitychange', refreshWhenVisible);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', refreshWhenVisible);
    };
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
    <div className="w-full px-4 sm:px-8 lg:px-12 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner & Tab Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-700 bg-purple-100/80 px-2.5 py-0.5 rounded-full border border-purple-200">
              Admin Control Center
            </span>
            <span className="text-purple-300">•</span>
            <span className="text-xs font-mono text-slate-500">Logged in as admin@hack4tech.com</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-purple-950 mt-1">
            Hack4Tech Command Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Real-time analytics, event coordination, registration management, and attendance verification.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={loadData}
            className="p-2.5 rounded-xl bg-white hover:bg-purple-50 border border-purple-200 text-slate-700 hover:text-purple-950 transition-all text-xs flex items-center gap-1.5 shadow-sm"
            title="Refresh All Data"
          >
            <RefreshCw className={`w-4 h-4 text-purple-600 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline font-semibold">Refresh</span>
          </button>

          <a
            href={api.getExportUrl(selectedEventId === 'all' ? undefined : selectedEventId, 'csv')}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
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
            className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-pink-600 text-white font-bold text-xs shadow-pastel-purple transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create Event</span>
          </button>

          <button
            onClick={onLogout}
            className="p-2.5 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 transition-all text-xs"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loadError && (
        <div role="alert" className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>Dashboard refresh failed: {loadError}. Retrying automatically.</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
            activeTab === 'overview'
              ? 'bg-pink-600 text-white shadow-pastel-purple'
              : 'bg-white text-slate-600 hover:text-purple-950 hover:bg-purple-50 border border-purple-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Analytics & Live Metrics</span>
        </button>

        <button
          onClick={() => setActiveTab('registrations')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
            activeTab === 'registrations'
              ? 'bg-pink-600 text-white shadow-pastel-purple'
              : 'bg-white text-slate-600 hover:text-purple-950 hover:bg-purple-50 border border-purple-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Registrations & Live Attendance ({registrations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
            activeTab === 'events'
              ? 'bg-pink-600 text-white shadow-pastel-purple'
              : 'bg-white text-slate-600 hover:text-purple-950 hover:bg-purple-50 border border-purple-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Manage Events ({events.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
            activeTab === 'logs'
              ? 'bg-pink-600 text-white shadow-pastel-purple'
              : 'bg-white text-slate-600 hover:text-purple-950 hover:bg-purple-50 border border-purple-200'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-pink-600" />
          <span>Audit Logs & Duplicate Alerts</span>
        </button>
      </div>

      {/* ========================================== */}
      {/* TAB 1: OVERVIEW ANALYTICS */}
      {/* ========================================== */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Top Metric Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="p-6 rounded-3xl bg-white border border-purple-200/90 shadow-pastel-card space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Total Registrations</span>
                <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <p className="text-3xl sm:text-4xl font-extrabold font-mono text-purple-950">
                {stats?.totalRegistrations || 0}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-purple-700 font-medium">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Across 3 Flagship Events</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-purple-200/90 shadow-pastel-card space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Checked In</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <p className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-700">
                {stats?.checkedInCount || 0}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <span>Late: <strong className="text-amber-700 font-mono font-bold">{stats?.lateCount || 0}</strong></span>
                <span>•</span>
                <span>Pending: <strong className="text-slate-800 font-mono font-bold">{stats?.pendingCount || 0}</strong></span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-purple-200/90 shadow-pastel-card space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Live Attendance Rate</span>
                <div className="w-8 h-8 rounded-xl bg-pink-100 flex items-center justify-center text-pink-700">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <p className="text-3xl sm:text-4xl font-extrabold font-mono text-purple-900">
                {stats?.attendanceRate || 0}%
              </p>
              <div className="w-full bg-purple-100 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-pink-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${stats?.attendanceRate || 0}%` }}
                ></div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-purple-200/90 shadow-pastel-card space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Est. Revenue Collected</span>
                <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                  <IndianRupee className="w-4 h-4" />
                </div>
              </div>
              <p className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-800">
                ₹{(stats?.totalRevenue || 0).toLocaleString()}
              </p>
              <p className="text-xs text-slate-500">From verified participant fee tiers</p>
            </div>

          </div>

          {/* Event Breakdown Cards */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-purple-950 font-display flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-700" />
              <span>Event-Wise Attendance Performance</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats?.eventBreakdown?.map((ev) => (
                <div
                  key={ev.eventId}
                  className="p-6 rounded-3xl bg-white border border-purple-200 shadow-pastel-card space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md border border-purple-200">
                        {ev.category}
                      </span>
                      <h4 className="text-xl font-bold text-purple-950 font-display mt-1.5">{ev.title}</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-xl bg-purple-50 border border-purple-200 font-mono text-xs font-bold text-purple-900">
                      {ev.totalRegistrations} Registered
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-600">
                      <span className="font-medium">Attendance Turnout</span>
                      <span className="font-mono text-purple-950 font-bold">{ev.attendanceRate}%</span>
                    </div>
                    <div className="w-full bg-purple-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-purple-600 h-full rounded-full"
                        style={{ width: `${ev.attendanceRate}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-purple-100">
                    <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-100 text-slate-700">
                      <span className="text-slate-500 block text-[10px] uppercase font-mono font-semibold">Present / Late</span>
                      <strong className="text-emerald-700 font-mono text-sm">{ev.attended}</strong> ({ev.late} Late)
                    </div>
                    <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-100 text-slate-700">
                      <span className="text-slate-500 block text-[10px] uppercase font-mono font-semibold">Revenue</span>
                      <strong className="text-amber-800 font-mono text-sm">₹{ev.revenue}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Activity Feed */}
          <div className="p-6 rounded-3xl bg-white border border-purple-200 shadow-pastel-card space-y-4">
            <h3 className="text-base font-bold text-purple-950 font-display flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-700" />
                <span>Live Check-in Stream & Action Log</span>
              </span>
              <span className="text-xs font-mono font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">Auto-updating</span>
            </h3>

            <div className="space-y-2.5">
              {stats?.recentLogs?.map((log) => (
                <div
                  key={log.id}
                  className={`p-3.5 rounded-2xl border text-xs flex items-center justify-between gap-4 ${
                    log.type === 'DUPLICATE_ATTEMPT'
                      ? 'bg-red-50 border-red-200 text-red-900'
                      : log.statusRecorded === 'LATE'
                      ? 'bg-amber-50 border-amber-200 text-amber-900'
                      : 'bg-purple-50/60 border-purple-100 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        log.type === 'DUPLICATE_ATTEMPT'
                          ? 'bg-red-500 animate-ping'
                          : log.statusRecorded === 'LATE'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                    ></span>
                    <div>
                      <p className="font-bold text-slate-900">{log.message}</p>
                      <p className="text-[11px] text-slate-500 font-mono">
                        Station: {log.station} • Pass: {log.ticketId}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-slate-500 shrink-0 font-medium">
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
          <div className="p-4 rounded-2xl bg-white border border-purple-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full md:w-auto">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, roll no, email, ticket ID, team..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-purple-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 transition-all"
              />
            </form>

            {/* Dropdowns */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <select
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                className="px-3 py-2 rounded-xl bg-white border border-purple-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-purple-600 shadow-sm"
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
                className="px-3 py-2 rounded-xl bg-white border border-purple-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-purple-600 shadow-sm"
              >
                <option value="all">All Statuses</option>
                <option value="REGISTERED">Pending (Registered)</option>
                <option value="CHECKED_IN">Checked In (Present)</option>
                <option value="LATE">Late Arrival</option>
                <option value="ABSENT">Absent</option>
              </select>

              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-purple-50 border border-purple-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                title="Print Attendee Sign-in Sheet"
              >
                <Printer className="w-4 h-4 text-purple-700" />
                <span className="hidden sm:inline">Print Sheet</span>
              </button>
            </div>

          </div>

          {/* Registrations Table */}
          <div className="rounded-3xl bg-white border border-purple-200 overflow-hidden shadow-pastel-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-purple-50/90 text-[11px] font-mono uppercase text-purple-900 font-bold border-b border-purple-200">
                  <tr>
                    <th className="px-5 py-4">Ticket ID</th>
                    <th className="px-5 py-4">Participant / Team</th>
                    <th className="px-5 py-4">Event</th>
                    <th className="px-5 py-4">Roll No & Dept</th>
                    <th className="px-5 py-4">Attendance Status</th>
                    <th className="px-5 py-4">Check-in Time</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-100">
                  {registrations.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-slate-500 font-medium">
                        No registrations found matching the filters.
                      </td>
                    </tr>
                  ) : (
                    registrations.map((reg) => (
                      <tr key={reg.id} className="hover:bg-purple-50/50 transition-colors">
                        
                        {/* Ticket Code */}
                        <td className="px-5 py-4 font-mono font-bold text-purple-700">
                          {reg.ticketId}
                        </td>

                        {/* Name & Team */}
                        <td className="px-5 py-4">
                          <p className="font-bold text-purple-950 text-sm">{reg.leaderName}</p>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                            <span>{reg.leaderEmail}</span>
                            {reg.teamName && (
                              <>
                                <span>•</span>
                                <span className="text-purple-700 font-semibold font-mono">
                                  {reg.teamName} ({1 + (reg.members?.length || 0)} members)
                                </span>
                              </>
                            )}
                          </div>
                        </td>

                        {/* Event */}
                        <td className="px-5 py-4">
                          <span className="font-semibold text-slate-800">
                            {reg.event?.title || reg.eventId}
                          </span>
                        </td>

                        {/* Roll & Dept */}
                        <td className="px-5 py-4">
                          <p className="font-mono text-slate-800 font-bold">{reg.rollNo}</p>
                          <p className="text-[10px] text-slate-500 truncate max-w-[150px]">{reg.department}</p>
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                              reg.status === 'CHECKED_IN'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : reg.status === 'LATE'
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : reg.status === 'ABSENT'
                                ? 'bg-red-100 text-red-800 border border-red-300'
                                : 'bg-purple-100 text-purple-800 border border-purple-200'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                            {reg.status}
                          </span>
                        </td>

                        {/* Checked In Time */}
                        <td className="px-5 py-4 font-mono text-[11px] text-slate-600">
                          {reg.checkedInAt ? (
                            <div>
                              <p className="text-emerald-700 font-bold">
                                {new Date(reg.checkedInAt).toLocaleTimeString()}
                              </p>
                              <p className="text-[10px] text-slate-500">{reg.checkedInBy}</p>
                            </div>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>

                        {/* Action Buttons */}
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => onOpenPassModal(reg)}
                              className="p-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 transition-colors"
                              title="View Event Pass"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* Mark Present */}
                            {reg.status !== 'CHECKED_IN' && (
                              <button
                                onClick={() => handleUpdateStatus(reg, 'CHECKED_IN')}
                                className="px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-300 text-[10px] font-bold transition-colors"
                                title="Mark Present"
                              >
                                Present
                              </button>
                            )}

                            {/* Mark Late */}
                            {reg.status !== 'LATE' && (
                              <button
                                onClick={() => handleUpdateStatus(reg, 'LATE')}
                                className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300 text-[10px] font-bold transition-colors"
                                title="Mark Late"
                              >
                                Late
                              </button>
                            )}

                            {/* Reset / Absent */}
                            {reg.status === 'CHECKED_IN' || reg.status === 'LATE' ? (
                              <button
                                onClick={() => handleUpdateStatus(reg, 'REGISTERED')}
                                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-[10px] font-medium transition-colors"
                                title="Reset Attendance"
                              >
                                Reset
                              </button>
                            ) : (
                              <button
                                onClick={() => handleUpdateStatus(reg, 'ABSENT')}
                                className="px-2.5 py-1 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 border border-red-300 text-[10px] font-bold transition-colors"
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
                className="p-6 rounded-3xl bg-white border border-purple-200 shadow-pastel-card flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="relative h-44 rounded-2xl overflow-hidden bg-purple-950/20 mb-3 border border-purple-100">
                    <img src={ev.poster} alt={ev.title} className="w-full h-full object-cover object-top" />
                    <div className="absolute top-2 right-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-white/95 text-purple-900 border border-purple-200 shadow-sm">
                        {ev.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-display text-purple-950">{ev.title}</h3>
                  <p className="text-xs text-purple-700 font-mono font-semibold mt-0.5">{ev.subtitle || ev.tagline}</p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">{ev.description}</p>

                  <div className="mt-4 space-y-1.5 text-xs text-slate-700 font-mono">
                    <p className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>{ev.date} ({ev.time})</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                      <span>{ev.venue}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{ev.prizePool} Prize Pool</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Ticket className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>Fee: {ev.feeText}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-purple-100 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Status: {ev.status.toUpperCase()}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditClick(ev)}
                      className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 transition-colors"
                      title="Edit Event"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(ev.id, ev.title)}
                      className="p-2 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 transition-colors"
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
          <div className="p-5 rounded-2xl bg-white border border-purple-200 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-purple-950 font-display">System Check-in Audit Log</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Full chronological ledger tracking verified entries, duplicate scan flags, and manual administrator overrides.
              </p>
            </div>
            <button
              onClick={loadData}
              className="px-3.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-xs text-purple-800 font-bold border border-purple-200 transition-colors"
            >
              Refresh Logs
            </button>
          </div>

          <div className="rounded-3xl bg-white border border-purple-200 overflow-hidden shadow-pastel-card">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-purple-50/90 text-[11px] font-mono uppercase text-purple-900 font-bold border-b border-purple-200">
                <tr>
                  <th className="px-5 py-4">Timestamp</th>
                  <th className="px-5 py-4">Log Type</th>
                  <th className="px-5 py-4">Ticket ID</th>
                  <th className="px-5 py-4">Attendee Name</th>
                  <th className="px-5 py-4">Station</th>
                  <th className="px-5 py-4">Message / System Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-purple-50/50">
                    <td className="px-5 py-4 font-mono text-slate-600">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                          log.type === 'DUPLICATE_ATTEMPT'
                            ? 'bg-red-100 text-red-800 border border-red-300'
                            : log.type === 'MANUAL_OVERRIDE'
                            ? 'bg-purple-100 text-purple-800 border border-purple-200'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        }`}
                      >
                        {log.type}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-mono font-bold text-purple-700">
                      {log.ticketId}
                    </td>
                    <td className="px-5 py-4 font-bold text-purple-950">
                      {log.attendeeName}
                    </td>
                    <td className="px-5 py-4 font-mono text-slate-600">
                      {log.station}
                    </td>
                    <td className="px-5 py-4 text-slate-700">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-purple-200 p-6 sm:p-8 space-y-6 text-slate-800 shadow-2xl">
            <div className="flex items-center justify-between border-b border-purple-100 pb-4">
              <h2 className="text-xl font-bold font-display text-purple-950">
                {editingEvent ? 'Edit Event Details' : 'Create New Event'}
              </h2>
              <button
                onClick={() => setShowEventModal(false)}
                className="p-1.5 rounded-full hover:bg-purple-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Event Title *</label>
                  <input
                    type="text"
                    required
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-purple-200 text-slate-900 focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">Category *</label>
                  <select
                    value={eventForm.category}
                    onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-purple-200 text-slate-900 focus:outline-none focus:border-purple-600"
                  >
                    <option value="Hackathon">Hackathon</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Masterclass">Masterclass</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Subtitle / Tagline *</label>
                <input
                  type="text"
                  required
                  value={eventForm.subtitle || eventForm.tagline}
                  onChange={(e) => setEventForm({ ...eventForm, subtitle: e.target.value, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-purple-200 text-slate-900 focus:outline-none focus:border-purple-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Date String *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nov 14, 2026"
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-purple-200 text-slate-900 focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">Prize Pool *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹25,000+"
                    value={eventForm.prizePool}
                    onChange={(e) => setEventForm({ ...eventForm, prizePool: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-purple-200 text-slate-900 focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">Registration Fee (₹) *</label>
                  <input
                    type="number"
                    required
                    value={eventForm.registrationFee}
                    onChange={(e) =>
                      setEventForm({
                        ...eventForm,
                        registrationFee: Number(e.target.value),
                        feeText: `₹${e.target.value} / Student`,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-purple-200 text-slate-900 focus:outline-none focus:border-purple-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Venue *</label>
                <input
                  type="text"
                  required
                  value={eventForm.venue}
                  onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-purple-200 text-slate-900 focus:outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-purple-200 text-slate-900 focus:outline-none focus:border-purple-600"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-purple-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-pink-600 text-white font-bold shadow-pastel-purple"
                >
                  {editingEvent ? 'Save Changes' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};