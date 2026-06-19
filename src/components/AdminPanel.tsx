import React from 'react';
import { 
  Lock, Key, Users, Calendar, DollarSign, AlertCircle, CheckCircle2, 
  Trash2, Clock, Eye, Sparkles, RefreshCw, Phone, Mail, 
  Search, ShieldCheck, CheckSquare, Clipboard, ArrowLeft, LogOut, Check 
} from 'lucide-react';
import { SERVICES, DENTISTS } from '../data.ts';
import { Appointment } from '../types.ts';
import { motion, AnimatePresence } from 'motion/react';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  status: 'unread' | 'contacted' | 'resolved';
  timestamp: number;
}

export default function AdminPanel() {
  // Login Authentication Form
  const [password, setPassword] = React.useState('');
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loginError, setLoginError] = React.useState<string | null>(null);

  // Core Data Lists
  const [bookings, setBookings] = React.useState<Appointment[]>([]);
  const [contacts, setContacts] = React.useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedContact, setSelectedContact] = React.useState<ContactSubmission | null>(null);

  // Administrative Filters & Controls
  const [activeSubTab, setActiveSubTab] = React.useState<'bookings' | 'contacts'>('bookings');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<string>('all');

  // Success Notification
  const [adminNotification, setAdminNotification] = React.useState<string | null>(null);

  // Access check on mount or changes
  const checkToken = () => {
    const isAuth = sessionStorage.getItem('ivory_admin_session') === 'true';
    if (isAuth) {
      setIsAuthenticated(true);
      fetchBackendData();
    }
  };

  React.useEffect(() => {
    checkToken();
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'ivory2026') {
      setIsAuthenticated(true);
      setLoginError(null);
      sessionStorage.setItem('ivory_admin_session', 'true');
      fetchBackendData();
    } else {
      setLoginError('Sovereign passphrase invalid. Please enter credential parameters authorized for Ivory Clinic.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('ivory_admin_session');
    setIsAuthenticated(false);
    setPassword('');
  };

  const fetchBackendData = async () => {
    setIsLoading(true);
    try {
      const [bookingsRes, contactsRes] = await Promise.all([
        fetch('/api/bookings'),
        fetch('/api/contacts')
      ]);

      if (bookingsRes.ok && contactsRes.ok) {
        const bookingsData = await bookingsRes.json();
        const contactsData = await contactsRes.json();
        setBookings(bookingsData);
        setContacts(contactsData);
      }
    } catch (err) {
      console.error('Failed fetching administrator profiles backend data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Status Modifiers
  const handleUpdateBookingStatus = async (id: string, newStatus: 'confirmed' | 'pending') => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setBookings(prev => 
          prev.map(b => b.id === id ? { ...b, status: newStatus } : b)
        );
        triggerNotification(`Appointment status transitioned successfully to ${newStatus}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateContactStatus = async (id: string, newStatus: 'unread' | 'contacted' | 'resolved') => {
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setContacts(prev => 
          prev.map(c => c.id === id ? { ...c, status: newStatus } : c)
        );
        if (selectedContact?.id === id) {
          setSelectedContact(prev => prev ? { ...prev, status: newStatus } : null);
        }
        triggerNotification(`Enquiry flagged as "${newStatus}"`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Deletion mechanics
  const handleDeleteBooking = async (id: string) => {
    if (!window.confirm('Are you certain you wish to purge this clinician reservation logs permanently from server memory?')) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setBookings(prev => prev.filter(b => b.id !== id));
        triggerNotification('Appointment deleted from back-end registry');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!window.confirm('Permanently purge this guest communication details?')) return;
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setContacts(prev => prev.filter(c => c.id !== id));
        if (selectedContact?.id === id) setSelectedContact(null);
        triggerNotification('Inquiry deleted from registry');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const triggerNotification = (text: string) => {
    setAdminNotification(text);
    setTimeout(() => {
      setAdminNotification(null);
    }, 4000);
  };

  // Calculate estimated projected revenue
  const calculateEstRevenue = () => {
    return bookings.reduce((sum, b) => {
      const srv = SERVICES.find(s => s.id === b.serviceId);
      if (!srv?.estimatedFee) return sum + 150; // default consult
      const match = srv.estimatedFee.replace(/[^0-9]/g, '');
      const parsed = parseInt(match, 10);
      return sum + (isNaN(parsed) ? 150 : parsed);
    }, 0);
  };

  // Filter lists dynamically
  const filteredBookings = bookings.filter(b => {
    const srv = SERVICES.find(s => s.id === b.serviceId);
    const doc = DENTISTS.find(d => d.id === b.dentistId);
    const searchLower = searchTerm.toLowerCase();
    
    const matchesSearch = 
      b.patientName.toLowerCase().includes(searchLower) ||
      b.patientPhone.toLowerCase().includes(searchLower) ||
      b.patientEmail.toLowerCase().includes(searchLower) ||
      (srv?.title || '').toLowerCase().includes(searchLower) ||
      (doc?.name || '').toLowerCase().includes(searchLower);

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const filteredContacts = contacts.filter(c => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      c.name.toLowerCase().includes(searchLower) ||
      c.email.toLowerCase().includes(searchLower) ||
      c.phone.toLowerCase().includes(searchLower) ||
      c.message.toLowerCase().includes(searchLower);

    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Login Form Screen View
  if (!isAuthenticated) {
    return (
      <section className="py-24 bg-[#FBF9F6] min-h-[75vh] flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="bg-white p-8 rounded-sm border border-stone-200 shadow-xl space-y-6 text-center">
            
            <div className="w-14 h-14 rounded-full bg-[#0E2E28] text-white flex items-center justify-center mx-auto shadow-sm">
              <Lock className="w-6 h-6 text-[#8D775F]" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] tracking-widest font-mono text-[#8D775F] uppercase font-bold block">
                Security Gateway
              </span>
              <h2 className="font-serif text-2xl text-[#0E2E28] tracking-tight">
                Staff Authentication
              </h2>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Authorized Ivory Dental Clinician portal. Enter clinical suite passphrase to verify credentials.
              </p>
            </div>

            {loginError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xs flex items-start space-x-2 text-left animate-pulse">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-stone-400">
                  Secure Access Passphrase
                </label>
                <div className="relative">
                  <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-xs p-3.5 pl-10 bg-[#FBF9F6] border border-stone-200 rounded-xs focus:ring-1 focus:ring-[#8D775F] focus:border-[#8D775F] outline-hidden placeholder:text-stone-300 font-mono tracking-widest"
                  />
                </div>
                <div className="text-[9px] text-stone-400 font-serif leading-relaxed mt-1 text-center">
                  Hint password: <code className="font-mono bg-stone-100 px-1 py-0.5 rounded-sm">ivory2026</code>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0E2E28] hover:bg-[#8D775F] text-white py-3 px-6 rounded-xs text-xs font-semibold tracking-widest uppercase transition-all shadow-sm cursor-pointer"
              >
                Unlock Administrator Suite
              </button>
            </form>

            <div className="text-[10px] font-mono text-stone-400 pt-2 border-t border-stone-100 flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8D775F]" />
              <span>Session encrypted under Sovereign security treaty</span>
            </div>

          </div>
        </div>
      </section>
    );
  }

  // Dashboard Main View
  return (
    <section className="py-12 bg-[#FBF9F6] min-h-[80vh]" id="admin-dashboard-root">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Ribbon bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-stone-200 pb-6">
          <div className="space-y-1 text-left">
            <span className="inline-flex items-center space-x-1.5 bg-[#0E2E28]/10 text-[#0E2E28] py-0.5 px-2 rounded-xs font-mono text-[9px] tracking-wider uppercase font-bold">
              <ShieldCheck className="w-3 h-3 text-[#8D775F]" />
              <span>Secure Executive Access</span>
            </span>
            <div className="flex items-center space-x-3">
              <h2 className="font-serif text-3xl text-[#0E2E28] tracking-tight">
                Staff Workspace
              </h2>
              <button 
                onClick={fetchBackendData}
                disabled={isLoading}
                title="Synchronize Data Store"
                className="p-1 text-stone-400 hover:text-[#0E2E28] hover:scale-105 transition-all cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-emerald-600' : ''}`} />
              </button>
            </div>
            <p className="text-stone-500 text-xs">
              Management and compliance dashboard. Real-time patient coordinates.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="text-[10px] font-mono tracking-widest font-bold uppercase text-rose-700 bg-rose-50 hover:bg-rose-100 px-4 py-2.5 rounded-sm transition-all border border-rose-200/50 flex items-center space-x-2 cursor-pointer self-stretch md:self-auto justify-center"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Terminate Sovereign Session</span>
          </button>
        </div>

        {/* Global Key Vitals stats blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-sm border border-stone-200/80 shadow-2xs flex items-center justify-between">
            <div className="space-y-1 text-left">
              <span className="block text-[10px] font-mono tracking-wider font-bold text-stone-400 uppercase">
                Active Consults
              </span>
              <span className="block text-3xl font-serif text-[#0E2E28] font-semibold">
                {bookings.length}
              </span>
            </div>
            <div className="w-11 h-11 rounded-full bg-[#0E2E28]/5 flex items-center justify-center text-[#0E2E28]">
              <Calendar className="w-5 h-5 text-[#8D775F]" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-sm border border-stone-200/80 shadow-2xs flex items-center justify-between">
            <div className="space-y-1 text-left">
              <span className="block text-[10px] font-mono tracking-wider font-bold text-stone-400 uppercase">
                Awaiting Approval
              </span>
              <span className={`block text-3xl font-serif font-semibold ${bookings.some(b => b.status === 'pending') ? 'text-amber-750' : 'text-[#0E2E28]'}`}>
                {bookings.filter(b => b.status === 'pending').length}
              </span>
            </div>
            <div className="w-11 h-11 rounded-full bg-amber-500/5 flex items-center justify-center text-amber-600">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-sm border border-stone-200/80 shadow-2xs flex items-center justify-between">
            <div className="space-y-1 text-left">
              <span className="block text-[10px] font-mono tracking-wider font-bold text-stone-400 uppercase">
                Patient Inquiries
              </span>
              <span className={`block text-3xl font-serif font-semibold ${contacts.some(c => c.status === 'unread') ? 'text-blue-750 font-bold' : 'text-[#0E2E28]'}`}>
                {contacts.filter(c => c.status === 'unread').length} Unread
              </span>
            </div>
            <div className="w-11 h-11 rounded-full bg-blue-500/5 flex items-center justify-center text-blue-600">
              <Mail className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-sm border border-stone-200/80 shadow-2xs flex items-center justify-between">
            <div className="space-y-1 text-left">
              <span className="block text-[10px] font-mono tracking-wider font-bold text-stone-400 uppercase">
                Projected Value
              </span>
              <span className="block text-3xl font-serif text-[#0E2E28] font-semibold">
                ${calculateEstRevenue().toLocaleString()}
              </span>
            </div>
            <div className="w-11 h-11 rounded-full bg-emerald-500/5 flex items-center justify-center text-emerald-600">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>

        </div>

        {/* Global system banner alerts */}
        <AnimatePresence>
          {adminNotification && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-[#0E2E28] border-l-4 border-[#8D775F] text-white rounded-xs text-xs flex items-center space-x-2.5 shadow-md text-left"
            >
              <CheckSquare className="w-4 h-4 text-[#8D775F]" />
              <span className="font-sans font-medium">{adminNotification}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Workspace controls */}
        <div className="bg-white border border-stone-200/80 rounded-sm shadow-xs overflow-hidden">
          
          {/* Sub menu selector bar */}
          <div className="flex border-b border-stone-200 bg-[#FBF9F6]">
            <button
              onClick={() => { setActiveSubTab('bookings'); setStatusFilter('all'); setSearchTerm(''); }}
              className={`px-6 py-4 text-xs font-mono font-bold tracking-wider uppercase transition-all border-r border-[#EBE8E3] cursor-pointer flex items-center space-x-2 ${
                activeSubTab === 'bookings'
                  ? 'bg-white text-[#0E2E28] border-t-2 border-t-[#8D775F]'
                  : 'text-stone-450 hover:bg-stone-50 hover:text-stone-800'
              }`}
            >
              <Clipboard className="w-4 h-4 shrink-0" />
              <span>Curated Reservations ({bookings.length})</span>
            </button>
            <button
              onClick={() => { setActiveSubTab('contacts'); setStatusFilter('all'); setSearchTerm(''); }}
              className={`px-6 py-4 text-xs font-mono font-bold tracking-wider uppercase transition-all border-r border-[#EBE8E3] cursor-pointer flex items-center space-x-2 ${
                activeSubTab === 'contacts'
                  ? 'bg-white text-[#0E2E28] border-t-2 border-t-[#8D775F]'
                  : 'text-stone-450 hover:bg-stone-50 hover:text-stone-800'
              }`}
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span>Concierge Enquiries ({contacts.length})</span>
            </button>
          </div>

          {/* Table Filters header */}
          <div className="p-4 sm:p-6 border-b border-stone-100 flex flex-col sm:flex-row gap-4 justify-between items-stretch">
            
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder={activeSubTab === 'bookings' ? "Search by patient, phone, doctor or diagnostic..." : "Search by name, email, query, phone..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs p-3.5 pl-10 bg-[#FBF9F6] border border-stone-200 rounded-sm focus:ring-1 focus:ring-[#8D775F] focus:border-[#8D775F] outline-hidden placeholder:text-stone-400"
              />
            </div>

            <div className="flex gap-3 items-stretch">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs p-3.5 bg-white border border-stone-200 rounded-sm focus:ring-1 focus:ring-[#8D775F] focus:outline-hidden focus:border-[#8D775F]"
              >
                <option value="all">Status: All Records</option>
                {activeSubTab === 'bookings' ? (
                  <>
                    <option value="confirmed">Confirmed Logs</option>
                    <option value="pending">Awaiting Approval</option>
                  </>
                ) : (
                  <>
                    <option value="unread">Unread Queries</option>
                    <option value="contacted">In Communication</option>
                    <option value="resolved">Resolved Consults</option>
                  </>
                )}
              </select>
              
              <button 
                onClick={fetchBackendData}
                className="p-3.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-700 rounded-sm text-xs font-semibold cursor-pointer transition-colors"
                title="Refresh logs"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* TABLE VIEWS */}
          {isLoading ? (
            <div className="py-24 text-center text-stone-400 text-xs">
              <RefreshCw className="w-8 h-8 text-[#8D775F] mx-auto animate-spin mb-3" />
              <span>Retrieving databases from clinical server...</span>
            </div>
          ) : activeSubTab === 'bookings' ? (
            // RESERVATIONS LOG LIST
            <div className="overflow-x-auto">
              {filteredBookings.length === 0 ? (
                <div className="py-16 text-center text-stone-400 text-xs">
                  <span>No reservations align with current filtration parameters.</span>
                </div>
              ) : (
                <table className="w-full text-left font-sans border-collapse">
                  <thead>
                    <tr className="bg-[#FBF9F6] border-b border-stone-200/60 text-[9px] uppercase tracking-wider font-mono font-bold text-stone-600">
                      <th className="p-4 sm:p-5">Patient & Contact</th>
                      <th className="p-4 sm:p-5">Selected Treatment</th>
                      <th className="p-4 sm:p-5">Target Doctor</th>
                      <th className="p-4 sm:p-5">Schedule Date & Time</th>
                      <th className="p-4 sm:p-5">Current Status</th>
                      <th className="p-4 sm:p-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-xs text-stone-700">
                    {filteredBookings.map((b) => {
                      const srv = SERVICES.find(s => s.id === b.serviceId);
                      const doc = DENTISTS.find(d => d.id === b.dentistId);
                      
                      return (
                        <tr key={b.id} className="hover:bg-stone-50/40 transition-colors">
                          <td className="p-4 sm:p-5 text-left">
                            <span className="block font-semibold text-stone-900 font-serif text-sm">
                              {b.patientName}
                            </span>
                            <span className="block text-stone-500 text-[11px] font-mono mt-0.5">
                              {b.patientEmail} • {b.patientPhone}
                            </span>
                            {b.note && (
                              <p className="mt-1.5 p-2 bg-[#FBF9F6] border border-stone-200/40 rounded-xs text-[10px] text-stone-600 italic">
                                "{b.note}"
                              </p>
                            )}
                          </td>
                          <td className="p-4 sm:p-5">
                            <span className="bg-[#0E2E28]/5 text-[#0E2E28] px-2 py-0.5 rounded-sm font-semibold tracking-wide text-[10px] uppercase font-mono">
                              {srv?.title || b.serviceId}
                            </span>
                            <span className="block text-[10px] text-stone-400 mt-0.5 font-mono">
                              {srv?.estimatedFee || 'Consult Required'}
                            </span>
                          </td>
                          <td className="p-4 sm:p-5">
                            <span className="block font-medium">{doc?.name || b.dentistId}</span>
                            <span className="block text-[10px] text-stone-400">{doc?.specialty}</span>
                          </td>
                          <td className="p-4 sm:p-5 font-mono text-[11px]">
                            <span className="block font-semibold text-stone-900">{b.date}</span>
                            <span className="block text-stone-500 mt-0.5">{b.timeSlot}</span>
                          </td>
                          <td className="p-4 sm:p-5">
                            {b.status === 'confirmed' ? (
                              <span className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-mono">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span>Confirmed</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center space-x-1 bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full text-[10px] font-mono">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                <span>Awaiting Approval</span>
                              </span>
                            )}
                          </td>
                          <td className="p-4 sm:p-5 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end space-x-2">
                              {b.status === 'pending' ? (
                                <button
                                  onClick={() => handleUpdateBookingStatus(b.id, 'confirmed')}
                                  className="bg-emerald-500 hover:bg-emerald-600 text-white p-1.5 rounded-xs transition-colors cursor-pointer"
                                  title="Approve / Confirm appointment"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleUpdateBookingStatus(b.id, 'pending')}
                                  className="bg-amber-400 hover:bg-amber-500 text-stone-850 p-1.5 rounded-xs transition-colors cursor-pointer"
                                  title="Revert to Awaiting Approval status"
                                >
                                  <Clock className="w-3.5 h-3.5" />
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteBooking(b.id)}
                                className="bg-rose-50 hover:bg-rose-100 text-rose-600 p-1.5 rounded-xs border border-rose-200/50 transition-colors cursor-pointer"
                                title="Delete appointment record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          ) : (
            // CONCIERGE ENQUIRIES LOG LIST
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-stone-200">
              
              {/* Left Column: Messages List (7/12 cols) */}
              <div className="lg:col-span-6 overflow-y-auto max-h-[550px]">
                {filteredContacts.length === 0 ? (
                  <div className="py-16 text-center text-stone-400 text-xs">
                    <span>No guest inquiries found inside filter parameters.</span>
                  </div>
                ) : (
                  <div className="divide-y divide-stone-100">
                    {filteredContacts.map((c) => {
                      const isSelected = selectedContact?.id === c.id;
                      return (
                        <div
                          key={c.id}
                          onClick={() => setSelectedContact(c)}
                          className={`p-4 sm:p-5 text-left transition-all cursor-pointer relative ${
                            isSelected ? 'bg-[#0E2E28]/5 border-l-4 border-l-[#8D775F]' : 'hover:bg-stone-50/50'
                          }`}
                        >
                          <div className="flex justify-between items-start gap-2">
                            <span className="block font-serif text-sm font-bold text-stone-950">
                              {c.name}
                            </span>
                            <span className="text-[10px] text-stone-400 font-mono">
                              {c.date}
                            </span>
                          </div>
                          
                          <span className="block text-stone-500 text-[11px] font-mono mt-0.5">
                            {c.email}
                          </span>

                          <p className="text-stone-600 text-xs mt-2 line-clamp-2">
                            {c.message}
                          </p>

                          <div className="mt-3.5 flex items-center justify-between">
                            <div>
                              {c.status === 'unread' && (
                                <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                                  Unread Message
                                </span>
                              )}
                              {c.status === 'contacted' && (
                                <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                                  In Communication
                                </span>
                              )}
                              {c.status === 'resolved' && (
                                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                                  Resolved Enquiry
                                </span>
                              )}
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteContact(c.id);
                              }}
                              className="text-stone-400 hover:text-rose-600 p-1 rounded-sm transition-colors cursor-pointer"
                              title="Purge Enquiry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Column: Active Inquire Details Panel (5/12 cols) */}
              <div className="lg:col-span-6 p-6 bg-stone-50/50 min-h-[400px]">
                <AnimatePresence mode="wait">
                  {!selectedContact ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center py-20 text-stone-400 text-xs"
                    >
                      <Eye className="w-8 h-8 text-stone-300 mb-3" />
                      <span>Select a guests concierge submission on the left to review communication logs.</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={selectedContact.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6 text-left"
                    >
                      <div className="border-b border-stone-200 pb-4">
                        <span className="text-[10px] font-mono text-[#8D775F] uppercase font-bold tracking-widest block mb-1">
                          Active Guest Log
                        </span>
                        <h4 className="font-serif text-lg text-[#0E2E28] font-bold">
                          {selectedContact.name}
                        </h4>
                        <span className="text-[11px] font-mono text-stone-500 mt-1 block">
                          Submitted on {selectedContact.date}
                        </span>
                      </div>

                      <div className="space-y-3.5 bg-white p-4 rounded-sm border border-stone-250/50 shadow-2xs">
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase tracking-wider font-mono font-bold text-stone-400">
                            Preferred Contact Parameters
                          </label>
                          <div className="space-y-2 text-xs">
                            <a href={`mailto:${selectedContact.email}`} className="flex items-center text-[#8D775F] hover:underline">
                              <Mail className="w-3.5 h-3.5 mr-2 text-stone-450 shrink-0" />
                              <span>{selectedContact.email}</span>
                            </a>
                            {selectedContact.phone && (
                              <a href={`tel:${selectedContact.phone}`} className="flex items-center text-[#8D775F] hover:underline">
                                <Phone className="w-3.5 h-3.5 mr-2 text-stone-450 shrink-0" />
                                <span>{selectedContact.phone}</span>
                              </a>
                            )}
                          </div>
                        </div>

                        <div className="space-y-1.5 pt-2.5 border-t border-stone-100">
                          <label className="text-[9px] uppercase tracking-wider font-mono font-bold text-stone-400">
                            Sent Inquire Profile
                          </label>
                          <p className="text-stone-850 text-xs leading-relaxed italic bg-stone-50 p-3 rounded-xs border border-stone-150/50 font-sans">
                            "{selectedContact.message}"
                          </p>
                        </div>
                      </div>

                      {/* Modify Status Controls */}
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-stone-500 block">
                          Update Coordination State
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            onClick={() => handleUpdateContactStatus(selectedContact.id, 'unread')}
                            className={`p-2.5 text-center text-xs font-mono rounded-sm border transition-all cursor-pointer ${
                              selectedContact.status === 'unread'
                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm font-bold'
                                : 'bg-white text-stone-700 hover:bg-stone-50 border-stone-200'
                            }`}
                          >
                            Unread
                          </button>
                          <button
                            onClick={() => handleUpdateContactStatus(selectedContact.id, 'contacted')}
                            className={`p-2.5 text-center text-xs font-mono rounded-sm border transition-all cursor-pointer ${
                              selectedContact.status === 'contacted'
                                ? 'bg-amber-500 text-white border-amber-500 shadow-sm font-bold'
                                : 'bg-white text-stone-700 hover:bg-stone-50 border-stone-200'
                            }`}
                          >
                            Contacted
                          </button>
                          <button
                            onClick={() => handleUpdateContactStatus(selectedContact.id, 'resolved')}
                            className={`p-2.5 text-center text-xs font-mono rounded-sm border transition-all cursor-pointer ${
                              selectedContact.status === 'resolved'
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm font-bold'
                                : 'bg-white text-stone-700 hover:bg-stone-50 border-stone-200'
                            }`}
                          >
                            Resolved
                          </button>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                        <button
                          onClick={() => handleDeleteContact(selectedContact.id)}
                          className="text-xs text-rose-600 hover:text-rose-800 font-mono flex items-center space-x-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Submission</span>
                        </button>
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
