import React from 'react';
import { Mail, Phone, MapPin, Award, ExternalLink, ShieldCheck, Globe, MessageSquare } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';

// Inline SVGs for social platforms
const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.76-1.75 1.76m1.39 9.74v-8.37H5.07v8.37h2.78z" />
  </svg>
);

const DiscordIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-purple-200 bg-white/95 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Col 1: Brand & GLA University NAAC A+ */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <img src="/images/logo.jpg" alt="H4T Logo" className="w-11 h-11 rounded-full border-2 border-purple-300 shadow-sm" />
              <div>
                <h4 className="text-lg font-bold text-purple-950 font-display">HACKPASS</h4>
                <p className="text-xs text-purple-700 font-mono font-semibold">Hack4Tech • GLA University</p>
              </div>
            </div>
            
            <p className="text-xs text-slate-600 leading-relaxed">
              Centralized Smart Event Management System empowering students at GLA University to explore hackathons, obtain unique cryptographic QR passes, and ensure verified gate attendance.
            </p>

            {/* Official NAAC Badge Display */}
            <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 flex items-center gap-3">
              <img src="/images/gla_naac.jpg" alt="GLA University NAAC A+" className="h-9 w-auto object-contain rounded-lg" />
              <div className="text-[11px]">
                <p className="font-bold text-purple-950">GLA University, Mathura</p>
                <p className="text-pink-700 font-mono font-semibold">Accredited A+ Grade by NAAC</p>
              </div>
            </div>
          </div>

          {/* Col 2: Featured Events Lineup */}
          <div>
            <h5 className="text-xs font-bold text-purple-950 uppercase tracking-widest mb-4 font-mono">
              Flagship Portfolio
            </h5>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-600 mt-1 shrink-0"></span>
                <div>
                  <p className="font-bold text-purple-950">VISIONX 2026</p>
                  <p className="text-slate-500 text-[11px]">8-Hour Multi-Track Hackathon • ₹25K+ Pool</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-600 mt-1 shrink-0"></span>
                <div>
                  <p className="font-bold text-purple-950">RAVENX 2026</p>
                  <p className="text-slate-500 text-[11px]">Girls Only Tech Hackathon • ₹50K Worth</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600 mt-1 shrink-0"></span>
                <div>
                  <p className="font-bold text-purple-950">IGNIX 2.0</p>
                  <p className="text-slate-500 text-[11px]">The Hackathon Playbook Masterclass</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 3: Campus Coordinates & Team Leads */}
          <div>
            <h5 className="text-xs font-bold text-purple-950 uppercase tracking-widest mb-4 font-mono">
              Venue & Coordinates
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">CSED Block (AB-11 & AB-12), GLA University, 17km Stone, NH-19, Mathura - 281406</span>
              </li>
              <li className="flex items-center gap-2">
                <Award className="w-4 h-4 text-pink-600 shrink-0" />
                <span>Office of Students' Welfare, GLA University</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-600 shrink-0" />
                <a href="mailto:hack4tech@gla.ac.in" className="hover:underline text-purple-800 font-medium">hack4tech@gla.ac.in</a>
              </li>
            </ul>

            <div className="mt-4 pt-3 border-t border-purple-100 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Lead Organizer:</span>
                <span className="font-semibold text-purple-950">Manish Chaudhary (+91 9368322158)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Technical Lead:</span>
                <span className="font-semibold text-purple-950">Ankit Saraswat (+91 7906820322)</span>
              </div>
            </div>
          </div>

          {/* Col 4: All Social Links & Official Web Portal */}
          <div>
            <h5 className="text-xs font-bold text-purple-950 uppercase tracking-widest mb-4 font-mono">
              Connect With Hack4Tech
            </h5>
            <div className="space-y-2.5 text-xs">
              
              {/* Official Website */}
              <a
                href="https://hack4tech.tech"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 transition-all font-semibold"
              >
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-purple-600" />
                  <span>hack4tech.tech</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-purple-500" />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/hack4tech.glau"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-900 transition-all font-semibold"
              >
                <div className="flex items-center gap-2.5">
                  <InstagramIcon className="w-4 h-4 text-pink-600" />
                  <span>@hack4tech.glau</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-pink-500" />
              </a>

              {/* GitHub & LinkedIn & Discord grid */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <a
                  href="https://github.com/Hack4Tech-GLAU"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition-all text-[11px] font-medium"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4 text-slate-800 mb-1" />
                  <span>GitHub</span>
                </a>

                <a
                  href="https://linkedin.com/company/hack4tech-glau"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center p-2 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 transition-all text-[11px] font-medium"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4 text-purple-700 mb-1" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href="https://discord.gg/hack4tech"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-800 transition-all text-[11px] font-medium"
                  title="Discord"
                >
                  <DiscordIcon className="w-4 h-4 text-indigo-600 mb-1" />
                  <span>Discord</span>
                </a>
              </div>

            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-purple-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Hack4Tech (H4T). GLA University, Mathura. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="text-emerald-700 flex items-center gap-1 font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Local Server Active (Ports 5000 & 3000)
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-purple-700 font-mono font-bold">HackPass EMS 2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};