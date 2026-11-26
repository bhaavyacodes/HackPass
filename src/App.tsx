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
import { PresentationView } from './components/PresentationView';
import { EventItem, Registration } from './types';
import { api } from './services/api';
import { Search, Filter, Sparkles, AlertCircle, LayoutGrid, List } from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('events');
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loadingEvents, setLoadingEvents] = useState<boolean>(true);
  const [eventsError, setEventsError] = useState<string | null>(null);

  // View Mode: 'list' (Swiss Minimalist Editorial) or 'grid' (Poster Showcase)
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Filters for Events Tab
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [eventSearch, setEventSearch] = useState<string>('');

  // Modals
  const [selectedEventForDetail, setSelectedEventForDetail] = useState<EventItem | null>(null);
  const [selectedEventForRegister, setSelectedEventForRegister] = useState<EventItem | null>(null);
  const [activePassData, setActivePassData] = useState<{ reg: Registration; event: EventItem | null } | null>(null);
  const [activePoster, setActivePoster] = useState<{ url: string; title: string } | null>(null);

  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('h4t_admin_logged_in') === 'true';
  });
  const [showAdminLogin, setShowAdminLogin] = useState<boolean>(false);

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
    <div className="min-h-screen flex flex-col bg-[#080A10] text-gray-100 font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdminLogin={() => setShowAdminLogin(true)}
      />

      {/* Main Content Area based on Tab */}
      <main className="flex-1">
        
        {/* ======================================================== */}
        {/* TAB 1: EVENTS EXPLORATION & REGISTRATION */}
        {/* ======================================================== */}
        {currentTab === 'events' && (
          <div className="space-y-12">
            
            {/* Hero Section */}
            <HeroSection
              onExploreClick={() => {
                const el = document.getElementById('events-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onFindPassClick={() => setCurrentTab('find-pass')}
              onScannerClick={() => setCurrentTab('scanner')}
            />

            {/* Events Explorer Section */}
            <div id="events-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-800 pb-6">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                    Official Flagship Lineup
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white mt-1">
                    Featured Hackathons & Bootcamps
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    Select an event to view full guidelines, track challenges, prize pools, or register to get your QR pass.
                  </p>
                </div>

                {/* Filter, View Switcher and Search Bar */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                  
                  {/* View Mode Toggle: Swiss List vs Cards Grid */}
                  <div className="flex items-center p-1 rounded-xl bg-gray-900 border border-gray-800 text-xs shrink-0">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                        viewMode === 'list'
                          ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                          : 'text-gray-400 hover:text-white'
                      }`}
                      title="Swiss List View"
                    >
                      <List className="w-3.5 h-3.5" />
                      <span>List</span>
                    </button>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                        viewMode === 'grid'
                          ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                          : 'text-gray-400 hover:text-white'
                      }`}
                      title="Cards Grid View"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      <span>Grid</span>
                    </button>
                  </div>

                  {/* Category Buttons */}
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-gray-900 border border-gray-800 text-xs w-full sm:w-auto overflow-x-auto">
                    {[
                      { id: 'all', label: 'All Events' },
                      { id: 'Hackathon', label: 'Hackathons' },
                      { id: 'Workshop', label: 'Workshops' },
                      { id: 'Girls-Only', label: '👑 Girls-Only' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setCategoryFilter(tab.id)}
                        className={`px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 ${
                          categoryFilter === tab.id
                            ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Search Box */}
                  <div className="relative w-full sm:w-56">
                    <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search events or tracks..."
                      value={eventSearch}
                      onChange={(e) => setEventSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-gray-900 border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                </div>
              </div>

              {/* Error Message */}
              {eventsError && (
                <div className="p-4 rounded-2xl bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{eventsError}</span>
                </div>
              )}

              {/* Events Display: List or Grid */}
              {loadingEvents ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="h-28 rounded-2xl bg-gray-900/50 border border-gray-800 animate-pulse"></div>
                  ))}
                </div>
              ) : filteredEvents.length === 0 ? (
                <div className="p-12 rounded-3xl bg-[#0c101a] border border-gray-800 text-center space-y-3">
                  <p className="text-gray-400 text-sm">No events found matching your search.</p>
                  <button
                    onClick={() => {
                      setCategoryFilter('all');
                      setEventSearch('');
                    }}
                    className="text-cyan-400 text-xs hover:underline"
                  >
                    Reset filters
                  </button>
                </div>
              ) : viewMode === 'list' ? (
                /* Swiss Editorial Interactive List View (Inspired by Dario Grigoletti) */
                <div className="border-t border-gray-800/80 divide-y divide-gray-800/60 bg-[#0c101a]/40 rounded-3xl p-2 sm:p-4 border border-gray-800">
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
        {/* TAB 3: LIVE QR SCANNER (GATE ATTENDANCE) */}
        {/* ======================================================== */}
        {currentTab === 'scanner' && (
          <QRScannerView
            events={events}
            onOpenPassModal={handleOpenPass}
          />
        )}

        {/* ======================================================== */}
        {/* TAB: PRESENTATION DECK */}
        {/* ======================================================== */}
        {currentTab === 'presentation' && (
          <PresentationView />
        )}

        {/* ======================================================== */}
        {/* TAB 4: ADMIN DASHBOARD */}
        {/* ======================================================== */}
        {currentTab === 'admin' && (
          <AdminDashboard
            events={events}
            onRefreshEvents={fetchEvents}
            onOpenPassModal={handleOpenPass}
            onLogout={() => {
              setIsAdminLoggedIn(false);
              localStorage.removeItem('h4t_admin_logged_in');
              setCurrentTab('events');
            }}
          />
        )}

      </main>

      {/* Footer */}
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

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onSuccess={() => {
          setIsAdminLoggedIn(true);
          localStorage.setItem('h4t_admin_logged_in', 'true');
          setCurrentTab('admin');
        }}
      />

    </div>
  );
}

export default App;
