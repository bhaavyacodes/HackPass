export interface Coordinator {
  name: string;
  phone: string;
  role?: string;
}

export interface EventItem {
  id: string;
  title: string;
  tagline: string;
  subtitle: string;
  theme?: 'cyberpunk' | 'gothic-purple' | 'synth-glow' | string;
  category: 'Hackathon' | 'Workshop' | 'Seminar' | string;
  status: 'open' | 'closed' | 'completed';
  organization: string;
  poster: string;
  date: string;
  dateIso: string;
  time: string;
  duration: string;
  venue: string;
  prizePool: string;
  prizePoolValue: number;
  registrationFee: number;
  feeText: string;
  teamType: 'individual_or_team' | 'team_only' | 'individual_only';
  minTeamSize: number;
  maxTeamSize: number;
  genderRestriction: 'all' | 'girls_only';
  eligibility: string;
  domains: string[];
  perks: string[];
  coordinators: Coordinator[];
  instagram: string;
  description: string;
  rules: string[];
}

export interface TeamMember {
  name: string;
  email: string;
  phone: string;
  rollNo?: string;
  branch?: string;
  year?: string;
}

export interface Registration {
  id: string;
  ticketId: string;
  eventId: string;
  registrationType: 'individual' | 'team';
  teamName: string | null;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  rollNo: string;
  department: string;
  year: string;
  college: string;
  members: TeamMember[];
  status: 'REGISTERED' | 'CHECKED_IN' | 'LATE' | 'ABSENT';
  checkedInAt: string | null;
  checkedInBy: string | null;
  notes?: string;
  createdAt: string;
  event?: EventItem;
}

export interface CheckInLog {
  id: string;
  ticketId: string;
  eventId: string;
  attendeeName: string;
  teamName: string | null;
  type: 'FIRST_SCAN' | 'DUPLICATE_ATTEMPT' | 'MANUAL_OVERRIDE';
  statusRecorded: 'CHECKED_IN' | 'LATE' | 'BLOCKED' | 'REGISTERED' | 'ABSENT';
  timestamp: string;
  station: string;
  message: string;
}

export interface EventBreakdown {
  eventId: string;
  title: string;
  category: string;
  totalRegistrations: number;
  attended: number;
  late: number;
  attendanceRate: number;
  revenue: number;
}

export interface StatsData {
  totalEvents: number;
  totalRegistrations: number;
  checkedInCount: number;
  lateCount: number;
  absentCount: number;
  pendingCount: number;
  totalAttended: number;
  attendanceRate: number;
  totalRevenue: number;
  eventBreakdown: EventBreakdown[];
  recentLogs: CheckInLog[];
}

export interface AdminUser {
  email: string;
  name: string;
  role: string;
}
