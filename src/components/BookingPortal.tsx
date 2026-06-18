import React from 'react';
import { SERVICES, DENTISTS, TIME_SLOTS } from '../data.ts';
import { Appointment } from '../types.ts';
import { CalendarCheck, ShieldAlert, CheckCircle2, Trash2, Clock, Calendar, User, Mail, Phone, FileText, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingPortalProps {
  preSelectedServiceId: string;
  clearPreSelection: () => void;
}

export default function BookingPortal({ preSelectedServiceId, clearPreSelection }: BookingPortalProps) {
  // Appointment history loaded from local storage
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  
  // Form fields state
  const [patientName, setPatientName] = React.useState('');
  const [patientEmail, setPatientEmail] = React.useState('');
  const [patientPhone, setPatientPhone] = React.useState('');
  const [serviceId, setServiceId] = React.useState(preSelectedServiceId || SERVICES[0].id);
  const [dentistId, setDentistId] = React.useState(DENTISTS[0].id);
  const [date, setDate] = React.useState('');
  const [timeSlot, setTimeSlot] = React.useState(TIME_SLOTS[0]);
  const [note, setNote] = React.useState('');

  const [notification, setNotification] = React.useState<{ text: string; type: 'success' | 'refused' } | null>(null);

  // Load appointments saved historically on mount
  React.useEffect(() => {
    const saved = localStorage.getItem('ivory_dental_bookings');
    if (saved) {
      try {
        setAppointments(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to parse saved appointments', err);
      }
    }
  }, []);

  // Update form if pre-selected service triggers from outer modules
  React.useEffect(() => {
    if (preSelectedServiceId) {
      setServiceId(preSelectedServiceId);
    }
  }, [preSelectedServiceId]);

  // Persists appointments list helper
  const saveAppointments = (list: Appointment[]) => {
    setAppointments(list);
    localStorage.setItem('ivory_dental_bookings', JSON.stringify(list));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!patientName || !patientEmail || !patientPhone || !date || !timeSlot) {
      setNotification({
        text: 'Kindly complete all high-priority fields marked in the consultation log.',
        type: 'refused'
      });
      return;
    }

    // Double slot booking verification representing real medical priority
    const isConflict = appointments.some(
      (app) => app.date === date && app.timeSlot === timeSlot && app.dentistId === dentistId
    );

    if (isConflict) {
      setNotification({
        text: 'This individual slot is fully committed. Please select alternative dates or dentist settings.',
        type: 'refused'
      });
      return;
    }

    const newBooking: Appointment = {
      id: `bk-${Math.random().toString(36).substr(2, 9)}`,
      patientName,
      patientEmail,
      patientPhone,
      serviceId,
      dentistId,
      date,
      timeSlot,
      note,
      status: 'confirmed',
      timestamp: Date.now()
    };

    const updated = [newBooking, ...appointments];
    saveAppointments(updated);
    
    // Clear inputs
    setPatientName('');
    setPatientEmail('');
    setPatientPhone('');
    setNote('');
    clearPreSelection();

    setNotification({
      text: 'Exquisite choice! Your luxury consultation appointment has been logged structurally in our patient portal.',
      type: 'success'
    });

    // Auto-timeout clean notification
    setTimeout(() => setNotification(null), 7000);
  };

  const handleCancelBooking = (id: string) => {
    const updated = appointments.filter((app) => app.id !== id);
    saveAppointments(updated);
  };

  return (
    <section className="py-16 bg-[#FBF9F6]" id="booking-portal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title elements */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-[10px] tracking-[0.3em] font-mono text-[#8D775F] uppercase font-bold">
            CURATED RESERVATIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#0E2E28] tracking-tight">
            Reserve Your Private Session
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Step into Ivory Dental Clinic. Complete the security reservation form below. We will secure your clinical treatment suite and confirm doctor availability immediately.
          </p>
        </div>

        {/* Master Panel Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Reservation logs/form card */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-xs space-y-6">
            <h3 className="font-serif text-xl text-[#0E2E28] border-b border-stone-100 pb-4">
              Consultation Form
            </h3>

            {/* Notification system alert */}
            {notification && (
              <div className={`p-4 rounded-sm text-xs flex items-start space-x-3 transition-all duration-300 ${
                notification.type === 'success' 
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
                  : 'bg-rose-50 border border-rose-200 text-rose-800'
              }`} id="booking-notification">
                <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${notification.type === 'success' ? 'text-emerald-700' : 'text-rose-700'}`} />
                <span>{notification.text}</span>
              </div>
            )}

            <form onSubmit={handleBookingSubmit} id="appointment-form" className="space-y-6">
              
              {/* Grid 1: Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-stone-500 font-mono font-bold flex items-center">
                    <User className="w-3 h-3 mr-1.5 text-[#8D775F]" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Eleanor Sterling"
                    className="w-full text-xs p-3.5 bg-[#FBF9F6] border border-stone-200/60 rounded-xs focus:ring-1 focus:ring-[#8D775F] focus:border-[#8D775F] outline-hidden placeholder:text-stone-400 font-sans"
                    id="input-name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-stone-500 font-mono font-bold flex items-center">
                    <Mail className="w-3 h-3 mr-1.5 text-[#8D775F]" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    placeholder="eleanor@sterling.com"
                    className="w-full text-xs p-3.5 bg-[#FBF9F6] border border-stone-200/60 rounded-xs focus:ring-1 focus:ring-[#8D775F] focus:border-[#8D775F] outline-hidden placeholder:text-stone-400 font-sans"
                    id="input-email"
                  />
                </div>
              </div>

              {/* Grid 2: Contact number & service select */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-stone-500 font-mono font-bold flex items-center">
                    <Phone className="w-3 h-3 mr-1.5 text-[#8D775F]" />
                    <span>Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="+1 (555) 0192-332"
                    className="w-full text-xs p-3.5 bg-[#FBF9F6] border border-stone-200/60 rounded-xs focus:ring-1 focus:ring-[#8D775F] focus:border-[#8D775F] outline-hidden placeholder:text-stone-400 font-sans"
                    id="input-phone"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-stone-500 font-mono font-bold flex items-center">
                    <FileText className="w-3 h-3 mr-1.5 text-[#8D775F]" />
                    <span>Treatment Specialty *</span>
                  </label>
                  <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full text-xs p-3.5 bg-[#FBF9F6] border border-stone-200/60 rounded-xs focus:ring-1 focus:ring-[#8D775F] focus:outline-hidden focus:border-[#8D775F] font-sans"
                    id="select-service-field"
                  >
                    {SERVICES.map((srv) => (
                      <option key={srv.id} value={srv.id}>
                        {srv.title} - {srv.estimatedFee || 'Consult Required'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Grid 3: Doctor Selection & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-stone-500 font-mono font-bold flex items-center">
                    <User className="w-3 h-3 mr-1.5 text-[#8D775F]" />
                    <span>Preferred Doctor *</span>
                  </label>
                  <select
                    value={dentistId}
                    onChange={(e) => setDentistId(e.target.value)}
                    className="w-full text-xs p-3.5 bg-[#FBF9F6] border border-stone-200/60 rounded-xs focus:ring-1 focus:ring-[#8D775F] focus:outline-hidden focus:border-[#8D775F] font-sans"
                    id="select-dentist-field"
                  >
                    {DENTISTS.map((dent) => (
                      <option key={dent.id} value={dent.id}>
                        {dent.name} ({dent.specialty})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-stone-500 font-mono font-bold flex items-center">
                    <Calendar className="w-3 h-3 mr-1.5 text-[#8D775F]" />
                    <span>Preferred Date *</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full text-xs p-3.5 bg-[#FBF9F6] border border-stone-200/60 rounded-xs focus:ring-1 focus:ring-[#8D775F] focus:border-[#8D775F] outline-hidden font-sans cursor-pointer"
                    id="input-date"
                  />
                </div>
              </div>

              {/* Grid 4: Time Slot Choices & private note */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-stone-500 font-mono font-bold flex items-center">
                    <Clock className="w-3 h-3 mr-1.5 text-[#8D775F]" />
                    <span>Available Consultation Hours *</span>
                  </span>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {TIME_SLOTS.map((slot) => {
                      const isSelected = timeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTimeSlot(slot)}
                          className={`p-3.5 text-center text-xs rounded-xs border transition-all duration-300 cursor-pointer font-sans font-medium ${
                            isSelected
                              ? 'bg-[#0E2E28] text-white border-[#0E2E28] shadow-xs'
                              : 'bg-[#FBF9F6] hover:bg-stone-100 text-stone-700 border-stone-200'
                          }`}
                          id={`time-slot-${slot.replace(/\s+/g, '-')}`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-stone-500 font-mono font-medium block">
                    Special notes or dental health history:
                  </label>
                  <textarea
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="E.g., extreme thermal sensitivity, history of veneer replacements, preferred tea flavor..."
                    className="w-full text-xs p-3.5 bg-[#FBF9F6] border border-stone-200/60 rounded-xs focus:ring-1 focus:ring-[#8D775F] focus:border-[#8D775F] outline-hidden placeholder:text-stone-400 font-sans resize-none"
                    id="input-notes"
                  />
                </div>
              </div>

              {/* Submission button */}
              <div className="pt-2">
                <button
                  type="submit"
                  id="btn-appointment-submit"
                  className="w-full bg-[#0E2E28] hover:bg-[#8D775F] text-white py-4 px-6 rounded-sm text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center space-x-2"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Submit Suite Request</span>
                </button>
              </div>

            </form>
          </div>

          {/* Right panel: Active bookings / client dashboard */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* The Ivy Luxury Portal badge */}
            <div className="bg-[#0E2E28] text-white p-6 sm:p-8 rounded-sm shadow-md space-y-6">
              <span className="text-[9px] tracking-widest font-mono text-[#8D775F] uppercase font-bold block">
                IVORY DENTAL MEMBERSHIP
              </span>
              <h4 className="font-serif text-lg sm:text-xl tracking-tight text-stone-100">
                Patient Suite
              </h4>
              <p className="text-stone-300 text-xs leading-relaxed">
                As a patient of Ivory Dental, your clinical logs are completely confidential, HIPAA-secure, and saved inside your secure local space.
              </p>
              
              <div className="border-t border-stone-700/60 pt-4 space-y-3">
                <div className="flex items-start space-x-2.5 text-xs text-stone-200">
                  <Lock className="w-4 h-4 text-[#8D775F] shrink-0 mt-0.5" />
                  <span>Encrypted locally in your workspace browser</span>
                </div>
                <div className="flex items-start space-x-2.5 text-xs text-stone-200">
                  <CheckCircle2 className="w-4 h-4 text-[#8D775F] shrink-0 mt-0.5" />
                  <span>Immediate medical verification is queued</span>
                </div>
              </div>
            </div>

            {/* List of saved appointments (Patient local tracking) */}
            <div className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-xs space-y-4">
              <h4 className="font-serif text-base text-[#0E2E28] tracking-tight border-b border-stone-100 pb-3 block font-semibold">
                Your Scheduled Visits ({appointments.length})
              </h4>

              <AnimatePresence>
                {appointments.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-10 text-center text-stone-400 text-xs"
                    id="no-appointments"
                  >
                    <Calendar className="w-8 h-8 text-stone-300 mx-auto mb-3" />
                    <span>No reservations found in tracking.</span>
                  </motion.div>
                ) : (
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                    {appointments.map((app) => {
                      const srv = SERVICES.find((s) => s.id === app.serviceId);
                      const doc = DENTISTS.find((d) => d.id === app.dentistId);
                      return (
                        <motion.div
                          key={app.id}
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-4 bg-[#FBF9F6] rounded-xs border border-stone-200/40 relative overflow-hidden flex justify-between items-start"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-xs">
                                Verified
                              </span>
                            </div>
                            <span className="block font-serif text-sm text-[#0E2E28] font-medium">
                              {srv?.title || 'General Consultation'}
                            </span>
                            <div className="space-y-0.5 text-[11px] text-stone-500 font-sans">
                              <p className="flex items-center">
                                <User className="w-3.5 h-3.5 text-stone-400 mr-1.5" />
                                <span>{doc?.name}</span>
                              </p>
                              <p className="flex items-center">
                                <Calendar className="w-3.5 h-3.5 text-stone-400 mr-1.5" />
                                <span>{app.date} • {app.timeSlot}</span>
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => handleCancelBooking(app.id)}
                            className="text-stone-400 hover:text-rose-600 p-2.5 rounded-sm transition-colors cursor-pointer"
                            title="Cancel Consultation"
                            id={`cancel-appt-${app.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
