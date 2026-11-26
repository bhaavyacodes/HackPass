import React, { useState } from 'react';
import { X, Users, User, Mail, Phone, Hash, Building2, Plus, Trash2, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EventItem, Registration, TeamMember } from '../types';
import { api } from '../services/api';

interface RegistrationModalProps {
  event: EventItem | null;
  onClose: () => void;
  onSuccess: (registration: Registration, event: EventItem) => void;
  onViewExistingTicket?: (ticketId: string) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  event,
  onClose,
  onSuccess,
  onViewExistingTicket,
}) => {
  if (!event) return null;

  const isRavenX = event.id.includes('ravenx') || event.genderRestriction === 'girls_only';
  const defaultRegType = event.teamType === 'team_only' ? 'team' : 'individual';

  const [registrationType, setRegistrationType] = useState<'individual' | 'team'>(defaultRegType);
  const [teamName, setTeamName] = useState('');
  const [leaderName, setLeaderName] = useState('');
  const [leaderEmail, setLeaderEmail] = useState('');
  const [leaderPhone, setLeaderPhone] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [year, setYear] = useState('2nd Year');
  const [college, setCollege] = useState('GLA University, Mathura');
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [girlsOnlyConfirmed, setGirlsOnlyConfirmed] = useState(false);
  const [byodAgreement, setByodAgreement] = useState(true);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [existingPassData, setExistingPassData] = useState<Registration | null>(null);

  // Add team member
  const handleAddMember = () => {
    const currentTotal = 1 + members.length;
    if (currentTotal >= event.maxTeamSize) {
      alert(`Maximum team size for ${event.title} is ${event.maxTeamSize} members.`);
      return;
    }
    setMembers([
      ...members,
      { name: '', email: '', phone: '', rollNo: '', branch: department, year: year },
    ]);
  };

  const handleRemoveMember = (idx: number) => {
    setMembers(members.filter((_, i) => i !== idx));
  };

  const handleMemberChange = (idx: number, field: keyof TeamMember, val: string) => {
    const updated = [...members];
    updated[idx] = { ...updated[idx], [field]: val };
    setMembers(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setExistingPassData(null);

    // Validations
    if (!leaderName || !leaderEmail || !leaderPhone || !rollNo) {
      setErrorMessage('Please fill in all required team leader / attendee fields.');
      return;
    }

    if (registrationType === 'team' && !teamName.trim()) {
      setErrorMessage('Please enter a team name.');
      return;
    }

    const totalCount = registrationType === 'team' ? 1 + members.length : 1;
    if (registrationType === 'team' && totalCount < event.minTeamSize) {
      setErrorMessage(`Minimum team size for ${event.title} is ${event.minTeamSize} members. Please add at least ${event.minTeamSize - 1} more member(s).`);
      return;
    }

    if (isRavenX && !girlsOnlyConfirmed) {
      setErrorMessage('Please confirm that all registered team members identify as female for this Girls Only Hackathon.');
      return;
    }

    // Validate member details if any
    for (let i = 0; i < members.length; i++) {
      const m = members[i];
      if (!m.name.trim() || !m.email.trim() || !m.phone.trim()) {
        setErrorMessage(`Please complete all details for Member #${i + 2}.`);
        return;
      }
    }

    setLoading(true);

    try {
      const result = await api.register({
        eventId: event.id,
        registrationType,
        teamName: registrationType === 'team' ? teamName : null,
        leaderName,
        leaderEmail,
        leaderPhone,
        rollNo,
        department,
        year,
        college,
        members: registrationType === 'team' ? members : [],
      });

      // Fire confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      onSuccess(result.registration, result.event);
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration failed');
      if (err.data && err.code === 'ALREADY_REGISTERED') {
        setExistingPassData(err.data);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white border border-purple-200 shadow-2xl text-slate-800">
        
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-white/95 backdrop-blur-md border-b border-purple-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-100 text-purple-900 border border-purple-200">
                {event.category}
              </span>
              <span className="text-xs text-slate-500 font-mono font-medium">Official Registration Pass Generator</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-purple-950 mt-1">
              Register for {event.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-purple-50 text-slate-400 hover:text-purple-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          
          {/* Error Message */}
          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-950/70 border border-red-800 text-red-200 text-xs sm:text-sm flex flex-col gap-2">
              <div className="flex items-center gap-2 font-semibold">
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
              {existingPassData && onViewExistingTicket && (
                <button
                  type="button"
                  onClick={() => onViewExistingTicket(existingPassData.ticketId)}
                  className="mt-1 self-start px-3 py-1.5 rounded-lg bg-red-900/60 hover:bg-red-800 text-xs font-semibold text-white border border-red-700 transition-all"
                >
                  View My Existing Event Pass ({existingPassData.ticketId}) →
                </button>
              )}
            </div>
          )}

          {/* Registration Type Selector (if both individual & team allowed) */}
          {event.teamType === 'individual_or_team' && (
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-slate-500 font-mono">
                Participation Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setRegistrationType('individual');
                    setMembers([]);
                  }}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold transition-all ${
                    registrationType === 'individual'
                      ? 'bg-purple-100 text-purple-900 border-purple-400 font-bold shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-purple-200 hover:bg-purple-50'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Solo / Individual</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRegistrationType('team')}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold transition-all ${
                    registrationType === 'team'
                      ? 'bg-purple-100 text-purple-900 border-purple-400 font-bold shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-purple-200 hover:bg-purple-50'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Team ({event.minTeamSize}–{event.maxTeamSize} Members)</span>
                </button>
              </div>
            </div>
          )}

          {/* Team Name (if team) */}
          {registrationType === 'team' && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300 flex items-center justify-between">
                <span>Team Name *</span>
                <span className="text-[11px] text-cyan-400 font-mono">
                  {1 + members.length} / {event.maxTeamSize} Members
                </span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Nexus Innovators, CyberKnights"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-900/80 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>
          )}

          {/* Section: Leader / Primary Contact Details */}
          <div className="space-y-4 pt-2 border-t border-gray-800">
            <h4 className="text-sm font-bold text-white font-display flex items-center gap-2">
              <User className="w-4 h-4 text-cyan-400" />
              <span>{registrationType === 'team' ? 'Team Leader Details' : 'Participant Details'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Aryan Sharma"
                  value={leaderName}
                  onChange={(e) => setLeaderName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-900/80 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 text-sm"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">College Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name.rollno@gla.ac.in"
                  value={leaderEmail}
                  onChange={(e) => setLeaderEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-900/80 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 text-sm"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">WhatsApp / Contact Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="9876543210"
                  value={leaderPhone}
                  onChange={(e) => setLeaderPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-900/80 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 text-sm"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">University Roll Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2115000101"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-900/80 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 text-sm"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Department / Branch</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-900/80 border border-gray-700 text-white focus:outline-none focus:border-cyan-400 text-sm"
                >
                  <option value="Computer Science & Engineering">Computer Science & Engineering (CSE)</option>
                  <option value="CSE - Artificial Intelligence & ML">CSE - AI & ML</option>
                  <option value="CSE - Cyber Security">CSE - Cyber Security</option>
                  <option value="CSE - Cloud Computing & DevOps">CSE - Cloud Computing</option>
                  <option value="Information Technology (IT)">Information Technology (IT)</option>
                  <option value="Computer Applications (BCA/MCA)">Computer Applications (BCA / MCA)</option>
                  <option value="Electronics & Communication (ECE)">Electronics & Communication (ECE)</option>
                  <option value="Electrical Engineering (EE)">Electrical Engineering (EE)</option>
                  <option value="Mechanical / Civil">Mechanical / Civil</option>
                  <option value="Management / Others">Management / Others</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Academic Year</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-900/80 border border-gray-700 text-white focus:outline-none focus:border-cyan-400 text-sm"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs text-gray-400 block mb-1">University / Institute</label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-900/80 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section: Dynamic Additional Team Members */}
          {registrationType === 'team' && (
            <div className="space-y-4 pt-2 border-t border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white font-display flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span>Additional Team Members</span>
                  </h4>
                  <p className="text-xs text-gray-400">
                    Add between {event.minTeamSize - 1} and {event.maxTeamSize - 1} additional members.
                  </p>
                </div>

                {1 + members.length < event.maxTeamSize && (
                  <button
                    type="button"
                    onClick={handleAddMember}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 text-xs font-semibold transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Member</span>
                  </button>
                )}
              </div>

              {members.length === 0 && (
                <div className="p-4 rounded-xl bg-gray-900/40 border border-dashed border-gray-800 text-center text-xs text-gray-400">
                  No additional members added yet. Click "+ Add Member" to include teammates.
                </div>
              )}

              {members.map((member, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800 relative space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                      Member #{idx + 2}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(idx)}
                      className="p-1 text-gray-500 hover:text-red-400 transition-colors"
                      title="Remove member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Member Full Name *"
                        value={member.name}
                        onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-gray-800/80 border border-gray-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Member Email *"
                        value={member.email}
                        onChange={(e) => handleMemberChange(idx, 'email', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-gray-800/80 border border-gray-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="Member Phone *"
                        value={member.phone}
                        onChange={(e) => handleMemberChange(idx, 'phone', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-gray-800/80 border border-gray-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="University Roll Number"
                        value={member.rollNo || ''}
                        onChange={(e) => handleMemberChange(idx, 'rollNo', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-gray-800/80 border border-gray-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Acknowledgments & Restrictions */}
          <div className="space-y-3 pt-2 border-t border-gray-800 text-xs">
            {isRavenX && (
              <label className="flex items-start gap-2.5 p-3 rounded-xl bg-purple-950/40 border border-purple-800/60 cursor-pointer">
                <input
                  type="checkbox"
                  checked={girlsOnlyConfirmed}
                  onChange={(e) => setGirlsOnlyConfirmed(e.target.checked)}
                  className="mt-0.5 rounded text-purple-500 focus:ring-purple-400 h-4 w-4 bg-gray-900 border-gray-700"
                />
                <span className="text-purple-200">
                  <strong className="text-white font-semibold">RavenX Eligibility:</strong> I confirm that all team members are female students eligible for this Girls-Only Hackathon.
                </span>
              </label>
            )}

            <label className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-900/60 border border-gray-800 cursor-pointer">
              <input
                type="checkbox"
                checked={byodAgreement}
                onChange={(e) => setByodAgreement(e.target.checked)}
                className="mt-0.5 rounded text-cyan-500 focus:ring-cyan-400 h-4 w-4 bg-gray-900 border-gray-700"
              />
              <span className="text-gray-300">
                I agree to the Hack4Tech code of conduct, bring my own device (BYOD), and show the QR Pass at AB-11/AB-II reception.
              </span>
            </label>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Registration Fee: <span className="font-mono text-purple-700 font-bold text-sm">{event.feeText}</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-purple-200 hover:bg-purple-50 text-slate-700 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm shadow-pastel-purple transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Generating Pass...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-white" />
                    <span>Confirm & Get QR Pass</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
