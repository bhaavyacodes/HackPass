import React, { useState } from 'react';
import { X, Shield, QrCode, Lock, Mail, ArrowRight, KeyRound, Sparkles, UserCheck } from 'lucide-react';
import { api } from '../services/api';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (role: 'admin' | 'volunteer') => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'admin' | 'volunteer'>('admin');

  // Admin form
  const [adminEmail, setAdminEmail] = useState('admin@hack4tech.com');
  const [adminPassword, setAdminPassword] = useState('admin123');

  // Volunteer form
  const [volunteerEmail, setVolunteerEmail] = useState('volunteer@hack4tech.com');
  const [volunteerPasscode, setVolunteerPasscode] = useState('gate2026');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.adminLogin({ email: adminEmail, password: adminPassword });
      localStorage.setItem('h4t_user_role', 'admin');
      localStorage.setItem('h4t_admin_logged_in', 'true');
      onSuccess('admin');
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Use admin@hack4tech.com / admin123');
    } finally {
      setLoading(false);
    }
  };

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Volunteer passcode verification (gate2026 or 2026)
    if (
      volunteerPasscode === 'gate2026' ||
      volunteerPasscode === '2026' ||
      volunteerPasscode === 'h4t2026'
    ) {
      localStorage.setItem('h4t_user_role', 'volunteer');
      localStorage.setItem('h4t_volunteer_logged_in', 'true');
      onSuccess('volunteer');
      onClose();
    } else {
      setError('Invalid Volunteer Passcode. Enter "gate2026" or "2026".');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-white border border-purple-200 p-6 sm:p-8 shadow-2xl text-slate-800 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-purple-50 text-slate-400 hover:text-purple-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center mx-auto text-white shadow-pastel-purple">
            {activeTab === 'admin' ? <Shield className="w-7 h-7" /> : <QrCode className="w-7 h-7" />}
          </div>
          <h2 className="text-2xl font-black font-display text-purple-950 tracking-tight">
            Organizer Portal Login
          </h2>
          <p className="text-xs text-slate-500">
            {activeTab === 'admin' 
              ? 'Administrator access to live turnout, registrations, duty leave CSV & scanner.' 
              : 'Gate volunteer access authorized exclusively for Live QR Scanner.'}
          </p>
        </div>

        {/* Role Tabs: Admin vs Volunteer */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-purple-50 border border-purple-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setActiveTab('admin'); setError(null); }}
            className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'admin'
                ? 'bg-purple-700 text-white shadow-md'
                : 'text-purple-900 hover:text-purple-700'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin Portal</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('volunteer'); setError(null); }}
            className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'volunteer'
                ? 'bg-pink-600 text-white shadow-md'
                : 'text-pink-900 hover:text-pink-700'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Volunteer Scanner</span>
          </button>
        </div>

        {/* Demo Credentials Pill */}
        <div 
          onClick={() => {
            if (activeTab === 'admin') {
              setAdminEmail('admin@hack4tech.com');
              setAdminPassword('admin123');
            } else {
              setVolunteerEmail('volunteer@hack4tech.com');
              setVolunteerPasscode('gate2026');
            }
          }}
          className="p-3 rounded-2xl bg-purple-50/70 border border-purple-200 cursor-pointer hover:bg-purple-100/60 transition-all flex items-center justify-between text-xs text-purple-900"
        >
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-purple-600" />
            <div>
              <p className="font-bold text-purple-950">
                {activeTab === 'admin' ? 'Demo Admin Credentials' : 'Demo Volunteer Credentials'}
              </p>
              <p className="text-[11px] text-purple-700 font-mono">
                {activeTab === 'admin' ? 'admin@hack4tech.com / admin123' : 'Passcode: gate2026'}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-200 text-purple-800 font-bold">
            Auto Fill
          </span>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Form: Admin Login */}
        {activeTab === 'admin' && (
          <form onSubmit={handleAdminSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-600 mb-1 font-mono uppercase text-[11px] font-semibold">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-purple-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 mb-1 font-mono uppercase text-[11px] font-semibold">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-purple-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm shadow-pastel-purple transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <span>Login to Full Admin Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Form: Volunteer Login */}
        {activeTab === 'volunteer' && (
          <form onSubmit={handleVolunteerSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-600 mb-1 font-mono uppercase text-[11px] font-semibold">
                Volunteer Gate ID / Email
              </label>
              <div className="relative">
                <UserCheck className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={volunteerEmail}
                  onChange={(e) => setVolunteerEmail(e.target.value)}
                  placeholder="e.g. volunteer@hack4tech.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-pink-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:bg-white text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 mb-1 font-mono uppercase text-[11px] font-semibold">
                Gate Passcode
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={volunteerPasscode}
                  onChange={(e) => setVolunteerPasscode(e.target.value)}
                  placeholder="Enter Passcode (gate2026)"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-pink-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:bg-white text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-sm shadow-pastel-pink transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              <span>Unlock Live QR Scanner</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
};