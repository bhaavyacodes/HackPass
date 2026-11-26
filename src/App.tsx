import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { EventCard } from './components/EventCard';
import { EventRow } from './components/EventRow';
import { EventDetailModal } from './components/EventDetailModal';
import { RegistrationModal } from './components/RegistrationModal';
import { TicketPassModal } from './components/TicketPassModal';
import { PosterModal } from './components/PosterModal';
import { QRScannerView } from './components/QRScannerView';
import { FindMyPassView } from './components/FindMyPassView';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLoginModal } from './components/AdminLoginModal';
import { CustomCursor } from './components/CustomCursor';
import { PageLoader } from './components/PageLoader';
import { EventItem, Registration } from './types';
import { api } from './services/api';
import { Search, AlertCircle, LayoutGrid, List, Lock, QrCode, Shield } from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('events');
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loadingEvents, setLoadingEvents] = useState<boolean>(true);
  const [eventsError, setEventsError] = useState<string | null>(null);

  // View Mode: 'list' (Swiss Editorial) or 'grid' (Poster Showcase)
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Filters for Events Tab
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [eventSearch, setEventSearch] = useState<string>('');

  // Modals
  const [selectedEventForDetail, setSelectedEventForDetail] = useState<EventItem | null>(null);
  const [selectedEventForRegister, setSelectedEventForRegister] = useState<EventItem | null>(null);
  const [activePassData, setActivePassData] = useState<{ reg: Registration; event: EventItem | null } | null>(null);
  const [activePoster, setActivePoster] = useState<{ url: string; title: string } | null>(null);

  // Role-Based Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('h4t_admin_logged_in') === 'true';
  });
  const [isVolunteerLoggedIn, setIsVolunteerLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('h4t_volunteer_logged_in') === 'true';
  });
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  const fetchEvents = async () => {
    try {
      setLoadingEvents(true);
      setEventsError(null);
      const data = await api.getEvents();
      setEvents(data);
    } catch (err: any) {
      setEventsError(err.message || 'Failed to load events.');
    } finally {
      setLoadingEvents(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setIsVolunteerLoggedIn(false);
    localStorage.removeItem('h4t_admin_logged_in');
    localStorage.removeItem('h4t_volunteer_logged_in');
    localStorage.removeItem('h4t_user_role');
    setCurrentTab('events');
  };

  const handleLoginSuccess = (role: 'admin' | 'volunteer') => {
    if (role === 'admin') {
      setIsAdminLoggedIn(true);
      setIsVolunteerLoggedIn(false);
      setCurrentTab('admin');
    } else {
      setIsVolunteerLoggedIn(true);
      setIsAdminLoggedIn(false);
      setCurrentTab('scanner');
    }
  };

  // Handle successful registration -> directly display the generated ticket pass
  const handleRegistrationSuccess = (reg: Registration, event: EventItem) => {
    setSelectedEventForRegister(null);
    setActivePassData({ reg, event });
  };

  // Open pass modal from another component (e.g. FindMyPass or Scanner)
  const handleOpenPass = (reg: Registration) => {
    const matchedEvent = events.find((e) => e.id === reg.eventId) || reg.event || null;
    setActivePassData({ reg, event: matchedEvent });
  };

  // Open existing ticket from error message
  const handleViewExistingTicket = async (ticketId: string) => {
    try {
      const reg = await api.getRegistrationByTicket(ticketId);
      setSelectedEventForRegister(null);
      handleOpenPass(reg);
    } catch (e: any) {
      alert(e.message || 'Failed to fetch existing ticket.');
    }
  };

  // Filter events
  const filteredEvents = events.filter((ev) => {
    if (categoryFilter === 'Hackathon' && ev.category !== 'Hackathon') return false;
    if (categoryFilter === 'Workshop' && ev.category !== 'Workshop') return false;
    if (categoryFilter === 'Girls-Only' && ev.genderRestriction !== 'girls_only') return false;

    if (eventSearch.trim()) {
      const q = eventSearch.toLowerCase();
      const matchTitle = ev.title.toLowerCase().includes(q);
      const matchTagline = (ev.tagline || '').toLowerCase().includes(q);
      const matchDomain = ev.domains?.some((d) => d.toLowerCase().includes(q));
      if (!matchTitle && !matchTagline && !matchDomain) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7FD] text-slate-800 font-sans selection:bg-purple-200 selection:text-purple-900">
      
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Intro Splash Loader (H4T to HACK4TECH Transition) */}
      <PageLoader />

      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isAdminLoggedIn={isAdminLoggedIn}
        isVolunteerLoggedIn={isVolunteerLoggedIn}
        onOpenLoginModal={() => setShowLoginModal(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area based on Tab */}
      <main className="flex-1">
        
        {/* ======================================================== */}
        {/* TAB 1: EVENTS EXPLORATION & REGISTRATION */}
        {/* ======================================================== */}
        {currentTab === 'events' && (
          <div className="space-y-12">
            
            {/* Hero Section (Clean, no repeated center buttons) */}
            <HeroSection />

            {/* Events Explorer Section */}
            <div id="events-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-purple-200/90 pb-6">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-700 bg-purple-100/70 px-2.5 py-0.5 rounded-full border border-purple-200">
                    Official Flagship Lineup
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-purple-950 mt-2">
                    Featured Hackathons & Bootcamps
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Select an event to view full guidelines, track challenges, prize pools, or register to get your QR pass.
                  </p>
                </div>

                {/* Filter, View Switcher and Search Bar */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                  
                  {/* View Mode Toggle: Swiss List vs Cards Grid */}
                  <div className="flex items-center p-1 rounded-2xl bg-white border border-purple-200 text-xs shrink-0 shadow-sm">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
                        viewMode === 'list'
                          ? 'bg-purple-700 text-white shadow-sm'
                          : 'text-slate-600 hover:text-purple-900 hover:bg-purple-50'
                      }`}
                      title="Swiss List View"
                    >
                      <List className="w-3.5 h-3.5" />
                      <span>List</span>
                    </button>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
                        viewMode === 'grid'
                          ? 'bg-purple-700 text-white shadow-sm'
                          : 'text-slate-600 hover:text-purple-900 hover:bg-purple-50'
                      }`}
                      title="Cards Grid View"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      <span>Grid</span>
                    </button>
                  </div>

                  {/* Category Buttons */}
                  <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white border border-purple-200 text-xs w-full sm:w-auto overflow-x-auto shadow-sm">
                    {[
                      { id: 'all', label: 'All Events' },
                      { id: 'Hackathon', label: 'Hackathons' },
                      { id: 'Workshop', label: 'Workshops' },
                      { id: 'Girls-Only', label: '👑 Girls-Only' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setCategoryFilter(tab.id)}
                        className={`px-3 py-1.5 rounded-xl font-semibold transition-all shrink-0 ${
                          categoryFilter === tab.id
                            ? 'bg-purple-100 text-purple-900 font-bold border border-purple-300'
                            : 'text-slate-600 hover:text-purple-950 hover:bg-purple-50'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Search Box */}
                  <div className="relative w-full sm:w-56">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search events or tracks..."
                      value={eventSearch}
                      onChange={(e) => setEventSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-2xl bg-white border border-purple-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-600 shadow-sm transition-all"
                    />
                  </div>

                </div>
              </div>

              {/* Error Message */}
              {eventsError && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{eventsError}</span>
                </div>
              )}

              {/* Events Display: List or Grid */}
              {loadingEvents ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="h-28 rounded-2xl bg-white border border-purple-100 animate-pulse"></div>
                  ))}
                </div>
              ) : filteredEvents.length === 0 ? (
                <div className="p-12 rounded-3xl bg-white border border-purple-200 text-center space-y-3 shadow-sm">
                  <p className="text-slate-600 text-sm">No events found matching your search.</p>
                  <button
                    onClick={() => {
                      setCategoryFilter('all');
                      setEventSearch('');
                    }}
                    className="text-purple-700 font-bold text-xs hover:underline"
                  >
                    Reset filters
                  </button>
                </div>
              ) : viewMode === 'list' ? (
                /* Swiss Editorial Interactive List View */
                <div className="bg-white rounded-3xl p-2 sm:p-5 border border-purple-200 shadow-pastel-card divide-y divide-purple-100">
                  {filteredEvents.map((event, idx) => (
                    <EventRow
                      key={event.id}
                      event={event}
                      index={idx}
                      onSelectEvent={(ev) => setSelectedEventForDetail(ev)}
                      onRegisterClick={(ev) => setSelectedEventForRegister(ev)}
                      onViewPoster={(posterUrl, title) => setActivePoster({ url: posterUrl, title })}
                    />
                  ))}
                </div>
              ) : (
                /* Cards Grid View */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onSelectEvent={(ev) => setSelectedEventForDetail(ev)}
                      onRegisterClick={(ev) => setSelectedEventForRegister(ev)}
                      onViewPoster={(posterUrl, title) => setActivePoster({ url: posterUrl, title })}
                    />
                  ))}
                </div>
              )}

            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: FIND MY PASS (STUDENT RETRIEVAL) */}
        {/* ======================================================== */}
        {currentTab === 'find-pass' && (
          <FindMyPassView
            onOpenPass={handleOpenPass}
            onExploreEvents={() => setCurrentTab('events')}
          />
        )}

        {/* ======================================================== */}
        {/* TAB 3: LIVE QR SCANNER (GATE ATTENDANCE - ROLE PROTECTED) */}
        {/* ======================================================== */}
        {currentTab === 'scanner' && (
          (isAdminLoggedIn || isVolunteerLoggedIn) ? (
            <QRScannerView
              events={events}
              onOpenPassModal={handleOpenPass}
            />
          ) : (
            <div className="max-w-md mx-auto my-16 p-8 rounded-3xl bg-white border border-purple-200 shadow-pastel-card text-center space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-display text-purple-950">
                Gate Scanner Access Protected
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Attendance scanning is restricted to authorized Gate Volunteers and Admins to prevent unauthorized check-ins.
              </p>
              <button
                onClick={() => setShowLoginModal(true)}
                className="w-full py-3 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm shadow-pastel-purple transition-all flex items-center justify-center gap-2"
              >
                <QrCode className="w-4 h-4" />
                <span>Login as Volunteer or Admin</span>
              </button>
            </div>
          )
        )}

        {/* ======================================================== */}
        {/* TAB 4: ADMIN DASHBOARD (ADMIN PROTECTED) */}
        {/* ======================================================== */}
        {currentTab === 'admin' && (
          isAdminLoggedIn ? (
            <AdminDashboard
              events={events}
              onRefreshEvents={fetchEvents}
              onOpenPassModal={handleOpenPass}
              onLogout={handleLogout}
            />
          ) : (
            <div className="max-w-md mx-auto my-16 p-8 rounded-3xl bg-white border border-purple-200 shadow-pastel-card text-center space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-display text-purple-950">
                Administrator Access Required
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Please login with your Hack4Tech administrative credentials to view full activity data, attendee lists, manual check-ins, and university CSV exports.
              </p>
              <button
                onClick={() => setShowLoginModal(true)}
                className="w-full py-3 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm shadow-pastel-purple transition-all flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4" />
                <span>Login to Admin Portal</span>
              </button>
            </div>
          )
        )}

      </main>

      {/* Footer with Complete Social Links */}
      <Footer />

      {/* ======================================================== */}
      {/* MODALS */}
      {/* ======================================================== */}

      {/* Event Detail Modal */}
      <EventDetailModal
        event={selectedEventForDetail}
        onClose={() => setSelectedEventForDetail(null)}
        onRegister={(ev) => setSelectedEventForRegister(ev)}
      />

      {/* Registration Modal */}
      <RegistrationModal
        event={selectedEventForRegister}
        onClose={() => setSelectedEventForRegister(null)}
        onSuccess={handleRegistrationSuccess}
        onViewExistingTicket={handleViewExistingTicket}
      />

      {/* Generated Ticket Pass Modal */}
      <TicketPassModal
        registration={activePassData?.reg || null}
        event={activePassData?.event || null}
        onClose={() => setActivePassData(null)}
      />

      {/* Full Poster Viewer Modal */}
      <PosterModal
        posterUrl={activePoster?.url || null}
        title={activePoster?.title || null}
        onClose={() => setActivePoster(null)}
      />

      {/* Dual Portal Login Modal (Admin & Volunteer) */}
      <AdminLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />

    </div>
  );
}

export default App;
