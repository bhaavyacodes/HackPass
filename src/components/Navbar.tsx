import React, { useState } from 'react';
import { QrCode, Ticket, Shield, Calendar, Menu, X, Sparkles, University, Presentation, Activity } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isAdminLoggedIn: boolean;
  onOpenAdminLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  isAdminLoggedIn,
  onOpenAdminLogin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'events', label: 'Explore Events', icon: Calendar },
    { id: 'find-pass', label: 'Find My Pass', icon: Ticket },
    { id: 'scanner', label: 'Live QR Scanner', icon: QrCode, badge: 'Gate' },
    { id: 'presentation', label: 'Presentation Deck', icon: Presentation, badge: 'Deck' },
    { id: 'admin', label: 'Admin Dashboard', icon: Shield, isProtected: true },
  ];

  const handleNavClick = (id: string, isProtected?: boolean) => {
    if (isProtected && !isAdminLoggedIn) {
      onOpenAdminLogin();
    } else {
      setCurrentTab(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#080A10]/95 backdrop-blur-md border-b border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => setCurrentTab('events')} 
            className="flex items-center gap-3 sm:gap-4 cursor-pointer group"
          >
            {/* Hack4Tech Logo */}
            <div className="relative">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-cyan-400/60 shadow-neon-cyan p-0.5 bg-black transition-transform duration-300 group-hover:scale-105">
                <img 
                  src="/images/logo.jpg" 
                  alt="Hack4Tech Logo" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500 border-2 border-black"></span>
              </span>
            </div>

            {/* University Crest / NAAC Badge */}
            <div className="hidden lg:flex items-center h-10 px-2.5 py-1 rounded-xl bg-gray-900/90 border border-emerald-500/30">
              <img 
                src="/images/gla_naac.jpg" 
                alt="GLA University NAAC A+" 
                className="h-7 w-auto object-contain rounded"
              />
            </div>

            {/* Text branding */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-display font-extrabold tracking-wider bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  HACK4TECH
                </span>
                <span className="px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold font-mono tracking-widest uppercase bg-cyan-950/80 text-cyan-400 border border-cyan-800/80 rounded">
                  EMS 2.0
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-400 font-medium">
                <span>GLA University</span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-400">Office of Students' Welfare</span>
                <span className="px-1.5 py-0.2 text-[9px] bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 rounded font-mono font-bold">
                  NAAC A+
                </span>
              </div>
            </div>
          </div>

          {/* Center: Live Server Pulse Status Pill */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>SYSTEM ONLINE • LOCALHOST ACTIVE</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.isProtected)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  {item.isProtected && isAdminLoggedIn && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-800 bg-[#0c0f18]/95 px-4 pt-2 pb-4 space-y-1">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-800 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-mono text-emerald-300 text-[11px]">System Online (Port 5000 / 3000)</span>
            </div>
            <span className="font-mono text-[10px] text-gray-500">GLA NAAC A+</span>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.isProtected)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};