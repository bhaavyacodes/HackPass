import React, { useState } from 'react';
import { QrCode, Ticket, Shield, Calendar, Menu, X, Sparkles, LogOut, Lock, UserCheck, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isAdminLoggedIn: boolean;
  isVolunteerLoggedIn: boolean;
  onOpenLoginModal: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  isAdminLoggedIn,
  isVolunteerLoggedIn,
  onOpenLoginModal,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* ======================================================== */}
          {/* LEFT SECTION: 1. GLA UNIVERSITY LOGO, 2. H4T LOGO */}
          {/* ======================================================== */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            
            {/* 1. Leftmost: Official GLA University NAAC A+ Logo */}
            <a 
              href="https://www.gla.ac.in" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center p-1 rounded-xl bg-purple-50/60 hover:bg-purple-100/60 border border-purple-200/80 transition-all duration-300"
              title="GLA University • Accredited with A+ Grade by NAAC"
            >
              <img 
                src="/images/gla_naac.jpg" 
                alt="GLA University NAAC A+ Crest" 
                className="h-10 sm:h-11 w-auto object-contain rounded-lg"
              />
            </a>

            {/* Subtle Divider */}
            <div className="h-8 w-px bg-purple-200"></div>

            {/* 2. Towards its immediate right: H4T Logo & HACKPASS Brand */}
            <div 
              onClick={() => setCurrentTab('events')} 
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
            >
              <div className="relative">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden p-0.5 bg-white border-2 border-purple-400 shadow-pastel-purple transition-transform duration-300 group-hover:scale-105">
                  <img 
                    src="/images/logo.jpg" 
                    alt="Hack4Tech Logo" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500 border border-white"></span>
                </span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-lg font-display font-extrabold tracking-tight text-purple-950 group-hover:text-purple-700 transition-colors">
                    HACKPASS
                  </span>
                  <span className="px-1.5 py-0.2 text-[9px] font-bold font-mono uppercase bg-purple-100 text-purple-700 border border-purple-200 rounded">
                    H4T
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-mono text-slate-500">
                  Smart Event Management
                </span>
              </div>
            </div>

          </div>

          {/* ======================================================== */}
          {/* MIDDLE: ENOUGH GAP / SPACER */}
          {/* ======================================================== */}
          <div className="flex-1"></div>

          {/* ======================================================== */}
          {/* RIGHT SECTION: OPTIONS + RIGHTMOST ADMIN / PORTAL */}
          {/* ======================================================== */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-3 shrink-0">
            
            {/* Immediate left of Admin Dashboard: "Explore Events" & "Find My Pass" */}
            <button
              onClick={() => setCurrentTab('events')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                currentTab === 'events'
                  ? 'bg-purple-100/90 text-purple-900 border border-purple-300 shadow-sm'
                  : 'text-slate-600 hover:text-purple-800 hover:bg-purple-50'
              }`}
            >
              <Calendar className="w-4 h-4 text-purple-600" />
              <span>Explore Events</span>
            </button>

            <button
              onClick={() => setCurrentTab('find-pass')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                currentTab === 'find-pass'
                  ? 'bg-pink-100/90 text-pink-900 border border-pink-300 shadow-sm'
                  : 'text-slate-600 hover:text-pink-800 hover:bg-pink-50'
              }`}
            >
              <Ticket className="w-4 h-4 text-pink-600" />
              <span>Find My Pass</span>
            </button>

            {/* Volunteer QR Scanner Link (Visible if volunteer or admin is logged in) */}
            {(isVolunteerLoggedIn || isAdminLoggedIn) && (
              <button
                onClick={() => setCurrentTab('scanner')}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  currentTab === 'scanner'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>QR Scanner</span>
                <span className="px-1.5 py-0.2 text-[9px] font-mono bg-white/20 rounded-full">Gate</span>
              </button>
            )}

            {/* RIGHTMOST: ADMIN DASHBOARD / PORTAL LOGIN */}
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-2 pl-1 border-l border-purple-200">
                <button
                  onClick={() => setCurrentTab('admin')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-pastel-purple ${
                    currentTab === 'admin'
                      ? 'bg-purple-900 text-white border border-purple-950'
                      : 'bg-purple-700 hover:bg-purple-800 text-white'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin Dashboard</span>
                </button>

                <button
                  onClick={onLogout}
                  title="Logout"
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : isVolunteerLoggedIn ? (
              <div className="flex items-center gap-2 pl-1 border-l border-purple-200">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-50 border border-pink-200 text-xs font-semibold text-pink-800">
                  <UserCheck className="w-3.5 h-3.5 text-pink-600" />
                  <span>Gate Volunteer</span>
                </span>
                
                <button
                  onClick={onLogout}
                  title="Logout Volunteer"
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLoginModal}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-purple-700 hover:bg-purple-800 text-white shadow-pastel-purple hover:shadow-pastel-hover transition-all duration-200 group"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin / Volunteer Portal</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            )}

          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-purple-900 hover:bg-purple-50 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-purple-200 bg-white/95 px-4 pt-3 pb-5 space-y-2">
          
          <button
            onClick={() => { setCurrentTab('events'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold ${
              currentTab === 'events' ? 'bg-purple-100 text-purple-900' : 'text-slate-700 hover:bg-purple-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-purple-600" />
              <span>Explore Events</span>
            </div>
          </button>

          <button
            onClick={() => { setCurrentTab('find-pass'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold ${
              currentTab === 'find-pass' ? 'bg-pink-100 text-pink-900' : 'text-slate-700 hover:bg-pink-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Ticket className="w-4 h-4 text-pink-600" />
              <span>Find My Pass</span>
            </div>
          </button>

          {(isVolunteerLoggedIn || isAdminLoggedIn) && (
            <button
              onClick={() => { setCurrentTab('scanner'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold ${
                currentTab === 'scanner' ? 'bg-purple-600 text-white' : 'text-purple-800 bg-purple-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <QrCode className="w-4 h-4" />
                <span>Live QR Scanner (Gate)</span>
              </div>
            </button>
          )}

          {isAdminLoggedIn ? (
            <div className="pt-2 border-t border-purple-100 flex items-center gap-2">
              <button
                onClick={() => { setCurrentTab('admin'); setMobileMenuOpen(false); }}
                className="flex-1 py-3 px-4 rounded-xl bg-purple-700 text-white font-bold text-sm text-center flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </button>
              <button
                onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                className="p-3 rounded-xl bg-red-50 text-red-600 border border-red-200"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : isVolunteerLoggedIn ? (
            <div className="pt-2 border-t border-purple-100 flex items-center justify-between px-2">
              <span className="text-xs font-semibold text-pink-800">Gate Volunteer Logged In</span>
              <button
                onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                className="text-xs text-red-600 font-bold hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => { onOpenLoginModal(); setMobileMenuOpen(false); }}
              className="w-full py-3 px-4 rounded-xl bg-purple-700 text-white font-bold text-sm text-center flex items-center justify-center gap-2 shadow-pastel-purple"
            >
              <Lock className="w-4 h-4" />
              <span>Login as Volunteer or Admin</span>
            </button>
          )}

        </div>
      )}
    </header>
  );
};