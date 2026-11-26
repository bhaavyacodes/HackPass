import React from 'react';
import { Mail, Phone, MapPin, Award, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-gray-800/80 bg-[#06080d] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Col 1: Brand & GLA University NAAC A+ */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <img src="/images/logo.jpg" alt="H4T Logo" className="w-10 h-10 rounded-full border border-cyan-500/40" />
              <div>
                <h4 className="text-lg font-bold text-white font-display">HACK4TECH</h4>
                <p className="text-xs text-cyan-400 font-mono">EMS 2.0 • GLA UNIVERSITY</p>
              </div>
            </div>
            
            <p className="text-xs text-gray-400 leading-relaxed">
              Empowering students at GLA University to ideate, build, and lead the future of technology through hackathons, workshops, and innovation sprints.
            </p>

            {/* Official NAAC Badge Display */}
            <div className="p-2.5 rounded-xl bg-gray-900/80 border border-emerald-500/30 flex items-center gap-3">
              <img src="/images/gla_naac.jpg" alt="GLA University NAAC A+" className="h-8 w-auto object-contain rounded" />
              <div className="text-[11px]">
                <p className="font-bold text-white">GLA University</p>
                <p className="text-emerald-400 font-mono">Accredited A+ Grade by NAAC</p>
              </div>
            </div>
          </div>

          {/* Col 2: Featured Events */}
          <div>
            <h5 className="text-xs font-semibold text-white uppercase tracking-widest mb-4 font-mono text-cyan-400">
              Featured Lineup
            </h5>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2 text-gray-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1 shrink-0"></span>
                <div>
                  <p className="font-semibold text-white">VISIONX</p>
                  <p className="text-gray-400 text-[11px]">8-Hour Hackathon • ₹25K+ Prize Pool</p>
                </div>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <span className="w-2 h-2 rounded-full bg-purple-400 mt-1 shrink-0"></span>
                <div>
                  <p className="font-semibold text-white">RAVENX</p>
                  <p className="text-gray-400 text-[11px]">Girls-Only Hackathon • ₹50K Worth</p>
                </div>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <span className="w-2 h-2 rounded-full bg-pink-400 mt-1 shrink-0"></span>
                <div>
                  <p className="font-semibold text-white">IGNIX 2.0</p>
                  <p className="text-gray-400 text-[11px]">The Hackathon Playbook • Certificates</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 3: Campus Coordinates */}
          <div>
            <h5 className="text-xs font-semibold text-white uppercase tracking-widest mb-4 font-mono text-cyan-400">
              Venue & Coordinates
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">CSED Block (AB-11 & AB-12), GLA University, NH-19, Mathura, UP - 281406</span>
              </li>
              <li className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Office of Students' Welfare, GLA University</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="mailto:hack4tech@gla.ac.in" className="hover:underline text-cyan-300">hack4tech@gla.ac.in</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contacts & Instagram */}
          <div>
            <h5 className="text-xs font-semibold text-white uppercase tracking-widest mb-4 font-mono text-cyan-400">
              Team Leads & Connect
            </h5>
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-gray-900/60 border border-gray-800">
                <p className="text-gray-200 font-semibold">Manish Chaudhary</p>
                <p className="text-gray-400 text-[11px] font-mono">Lead Organizer: +91 9368322158</p>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-900/60 border border-gray-800">
                <p className="text-gray-200 font-semibold">Ankit Saraswat</p>
                <p className="text-gray-400 text-[11px] font-mono">Technical Lead: +91 7906820322</p>
              </div>
              <a
                href="https://instagram.com/Hack4Tech.GLAU"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 border border-purple-500/40 text-purple-200 rounded-xl transition-all text-xs font-semibold"
              >
                <InstagramIcon className="w-4 h-4 text-pink-400" />
                <span>@Hack4Tech.GLAU</span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
              </a>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 Hack4Tech (H4T). GLA University, Mathura. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 flex items-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Local Server Active (Ports 5000 & 3000)
            </span>
            <span className="text-gray-700">•</span>
            <span className="text-cyan-400 font-mono">v2.4.0 Production Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};