import { EventItem, Registration, StatsData, CheckInLog, AdminUser } from '../types';

const API_BASE = '/api';

export const api = {
  // Events
  async getEvents(): Promise<EventItem[]> {
    const res = await fetch(`${API_BASE}/events`);
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to fetch events');
    return json.data;
  },

  async getEventById(id: string): Promise<EventItem> {
    const res = await fetch(`${API_BASE}/events/${id}`);
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to fetch event');
    return json.data;
  },

  async createEvent(eventData: Partial<EventItem>): Promise<EventItem> {
    const res = await fetch(`${API_BASE}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to create event');
    return json.data;
  },

  async updateEvent(id: string, eventData: Partial<EventItem>): Promise<EventItem> {
    const res = await fetch(`${API_BASE}/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to update event');
    return json.data;
  },

  async deleteEvent(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/events/${id}`, {
      method: 'DELETE',
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to delete event');
  },

  // Registrations
  async register(registrationData: Partial<Registration>): Promise<{ registration: Registration; event: EventItem }> {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registrationData),
    });
    const json = await res.json();
    if (!json.success) {
      const err = new Error(json.message || 'Registration failed');
      (err as any).data = json.data;
      (err as any).code = json.code;
      throw err;
    }
    return { registration: json.data, event: json.event };
  },

  async lookupPassesByEmail(email: string): Promise<Registration[]> {
    const res = await fetch(`${API_BASE}/registrations/lookup?email=${encodeURIComponent(email)}`);
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Lookup failed');
    return json.data;
  },

  async getRegistrationByTicket(ticketId: string): Promise<Registration> {
    const res = await fetch(`${API_BASE}/registrations/ticket/${encodeURIComponent(ticketId)}`);
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Pass not found');
    return json.data;
  },

  async getRegistrations(params?: { eventId?: string; status?: string; search?: string }): Promise<Registration[]> {
    const query = new URLSearchParams();
    if (params?.eventId) query.set('eventId', params.eventId);
    if (params?.status) query.set('status', params.status);
    if (params?.search) query.set('search', params.search);

    const res = await fetch(`${API_BASE}/registrations?${query.toString()}`);
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to fetch registrations');
    return json.data;
  },

  // Scanning & Attendance
  async scanPass(payload: {
    ticketId: string;
    station?: string;
    forceMode?: 'mark_present' | 'mark_late';
    activeEventId?: string;
  }): Promise<{
    success: boolean;
    code: string;
    message: string;
    data: Registration;
    event?: EventItem;
    previousCheckIn?: { time: string; station: string; status: string };
    isLate?: boolean;
  }> {
    const res = await fetch(`${API_BASE}/attendance/scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok && !json.code) {
      throw new Error(json.message || 'Scan verification failed');
    }
    return json;
  },

  async updateRegistrationStatus(
    id: string,
    status: 'REGISTERED' | 'CHECKED_IN' | 'LATE' | 'ABSENT',
    notes?: string,
    station?: string
  ): Promise<Registration> {
    const res = await fetch(`${API_BASE}/registrations/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, notes, station }),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to update status');
    return json.data;
  },

  // Analytics & Logs
  async getStats(): Promise<StatsData> {
    const res = await fetch(`${API_BASE}/stats`);
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to fetch statistics');
    return json.data;
  },

  async getAttendanceLogs(): Promise<CheckInLog[]> {
    const res = await fetch(`${API_BASE}/attendance/logs`);
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to fetch logs');
    return json.data;
  },

  async sendChatMessage(payload: {
    message: string;
    history?: Array<{ role: 'user' | 'model'; text: string }>;
  }): Promise<{ reply: string; sources: string[] }> {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Chat service is unavailable.');
    if (typeof json.reply !== 'string') throw new Error('The chat service returned an invalid response.');
    return {
      reply: json.reply,
      sources: Array.isArray(json.sources) ? json.sources : [],
    };
  },

  // Admin Auth
  async adminLogin(credentials: { email: string; password: string }): Promise<{ token: string; user: AdminUser }> {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Login failed');
    return { token: json.token, user: json.user };
  },

  getExportUrl(eventId?: string, format: 'csv' | 'json' = 'csv'): string {
    const query = new URLSearchParams();
    if (eventId) query.set('eventId', eventId);
    query.set('format', format);
    return `${API_BASE}/export?${query.toString()}`;
  }
};
