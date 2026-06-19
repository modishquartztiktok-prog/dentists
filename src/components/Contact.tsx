import React from 'react';
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck, CheckCircle, Volume2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [notification, setNotification] = React.useState<string | null>(null);
  const [honeyValue, setHoneyValue] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setNotification('Kindly complete all required elements prior to transmission.');
      return;
    }

    if (honeyValue) {
      // Quietly ignore the bot submission but show a mock success message
      setNotification('Transmission receipted! Our private concierge will reach out to you within the next 2 hours.');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setHoneyValue('');
      return;
    }

    setIsSubmitting(true);
    setNotification(null);

    try {
      const response = await fetch('https://formsubmit.co/ajax/dddc714929026666821fef31552e95fb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          _honey: honeyValue,
          _captcha: 'false'
        })
      });

      if (response.ok) {
        setNotification('Transmission receipted! Our private concierge will reach out to you within the next 2 hours.');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setHoneyValue('');
      } else {
        setNotification('An error occurred. Please verify your details or attempt direct contact.');
      }
    } catch (err) {
      setNotification('There was an issue initiating connection. Please check your internet connectivity and try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setNotification(null), 8000);
    }
  };

  const offices = [
    {
      suite: 'Beverly Hills Suite',
      address: '9454 Wilshire Boulevard, Suite 400, Beverly Hills, CA 90212',
      phone: '+1 (310) 555-5201',
      email: 'beverly@ivorydentistry.com',
      hours: 'Mon – Fri: 08:30 AM – 06:00 PM',
      highlight: 'Complimentary private underground valet parking available'
    },
    {
      suite: 'Manhattan Suite',
      address: '730 Fifth Avenue, 12th Floor, New York, NY 10019',
      phone: '+1 (212) 555-9018',
      email: 'manhattan@ivorydentistry.com',
      hours: 'Mon – Fri: 08:30 AM – 06:00 PM',
      highlight: 'Direct pent-house elevator access with secure private exit code'
    }
  ];

  return (
    <section className="py-16 bg-[#FBF9F6]" id="contact-us-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Title area */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center space-x-2 bg-[#8D775F]/15 px-3 py-1 rounded-full border border-[#8D775F]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#8D775F]" />
            <span className="text-[10px] tracking-widest font-mono text-[#8D775F] uppercase font-bold">
              Direct Concierge Lines
            </span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#0E2E28] tracking-tight">
            Initiate Your Transformation
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Connect with our dedicated intake coordinators. Whether you are arranging custom travel configurations from abroad or requesting an immediate biomimetic case evaluation, our staff welcomes you.
          </p>
        </div>

        {/* Suites & Contacts breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {offices.map((office, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-2xs relative overflow-hidden text-left flex flex-col justify-between"
              id={`office-${idx}`}
            >
              {/* Highlight bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#8D775F]" />
              
              <div className="space-y-6">
                <div>
                  <span className="text-[#8D775F] text-[10px] font-mono tracking-widest uppercase font-bold block mb-1">
                    SUITE CODES
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#0E2E28] tracking-tight font-semibold">
                    {office.suite}
                  </h3>
                </div>

                <div className="space-y-4 text-stone-600 text-xs sm:text-sm">
                  <p className="flex items-start">
                    <MapPin className="w-4 h-4 text-[#8D775F] mr-3 mt-0.5 shrink-0" />
                    <span>{office.address}</span>
                  </p>
                  <p className="flex items-center">
                    <Phone className="w-4 h-4 text-[#8D775F] mr-3 shrink-0" />
                    <a href={`tel:${office.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-[#8D775F] transition-colors">{office.phone}</a>
                  </p>
                  <p className="flex items-center">
                    <Mail className="w-4 h-4 text-[#8D775F] mr-3 shrink-0" />
                    <a href={`mailto:${office.email}`} className="hover:text-[#8D775F] transition-colors">{office.email}</a>
                  </p>
                  <p className="flex items-center">
                    <Clock className="w-4 h-4 text-[#8D775F] mr-3 shrink-0" />
                    <span>{office.hours}</span>
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-100 flex items-start space-x-2 text-[11px] text-stone-500 italic bg-[#8D775F]/5 p-3 rounded-xs">
                <Volume2 className="w-4 h-4 text-[#8D775F] shrink-0 mt-0.5" />
                <span>{office.highlight}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Form and Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-xs space-y-6 text-left">
            <h3 className="font-serif text-xl text-[#0E2E28] border-b border-stone-100 pb-4">
              Send an Encrypted Message
            </h3>

            {notification && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-sm flex items-start space-x-3" id="contact-alert">
                <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>{notification}</span>
              </div>
            )}

            <form onSubmit={handleMessageSubmit} className="space-y-4" id="contact-concierge-form">
              {/* Honeypot field for anti-spam protection */}
              <input
                type="text"
                name="_honey"
                value={honeyValue}
                onChange={(e) => setHoneyValue(e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Disable standard reCAPTCHA */}
              <input type="hidden" name="_captcha" value="false" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono font-bold text-stone-500 tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Winston Sterling"
                    className="w-full text-xs p-3.5 bg-[#FBF9F6] border border-stone-200/60 rounded-xs focus:ring-1 focus:ring-[#8D775F] focus:border-[#8D775F] outline-hidden placeholder:text-stone-400 font-sans"
                    id="contact-name"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono font-bold text-stone-500 tracking-wider">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="winston@sterling.com"
                    className="w-full text-xs p-3.5 bg-[#FBF9F6] border border-stone-200/60 rounded-xs focus:ring-1 focus:ring-[#8D775F] focus:border-[#8D775F] outline-hidden placeholder:text-stone-400 font-sans"
                    id="contact-email"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono font-bold text-stone-500 tracking-wider">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (310) 555-5201"
                  className="w-full text-xs p-3.5 bg-[#FBF9F6] border border-stone-200/60 rounded-xs focus:ring-1 focus:ring-[#8D775F] focus:border-[#8D775F] outline-hidden placeholder:text-stone-400 font-sans"
                  id="contact-phone"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono font-bold text-stone-500 tracking-wider">
                  How may we elevate your smile coordinates? *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="E.g. requesting Dr. Amelia Thorne diagnostic slots, custom travel support details required..."
                  className="w-full text-xs p-3.5 bg-[#FBF9F6] border border-stone-200/60 rounded-xs focus:ring-1 focus:ring-[#8D775F] focus:border-[#8D775F] outline-hidden placeholder:text-stone-400 font-sans resize-none"
                  id="contact-message"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  id="btn-contact-submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0E2E28] hover:bg-[#8D775F] disabled:bg-stone-400 disabled:cursor-not-allowed text-white py-3.5 px-6 rounded-sm text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Send className={`w-3.5 h-3.5 ${isSubmitting ? 'animate-pulse' : ''}`} />
                  <span>{isSubmitting ? 'Transmitting...' : 'Transmit Information'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Luxury FAQ/Advisors on side (5 columns) */}
          <div className="lg:col-span-5 bg-[#0E2E28] text-white p-6 sm:p-8 rounded-sm shadow-md space-y-6 text-left">
            <span className="text-[9px] tracking-widest font-mono text-[#8D775F] uppercase font-bold block">
              PRIVACY ASSURANCE
            </span>
            <h4 className="font-serif text-lg sm:text-xl tracking-tight text-white">
              Sovereign Clinical Security
            </h4>
            <p className="text-stone-300 text-xs leading-relaxed">
              Every virtual consultation mapping, image upload, and medical chat log remains strictly protected under our local HIPAA framework parameters.
            </p>

            <div className="border-t border-stone-800/80 pt-6 space-y-5">
              <span className="block text-[10px] tracking-widest font-mono text-[#8D775F] uppercase font-bold">
                COMMONLY ADJUDICATED REQUESTS
              </span>

              <div className="space-y-4">
                <div className="space-y-1">
                  <h5 className="text-stone-200 text-xs font-semibold">Do you support international clients?</h5>
                  <p className="text-stone-400 text-[11px] leading-relaxed">We accommodate global travelers regularly, providing dedicated airport logistics transfers and premium local hotel booking partnerships.</p>
                </div>
                <div className="space-y-1">
                  <h5 className="text-stone-200 text-xs font-semibold">How long must I wait for veneer mockups?</h5>
                  <p className="text-stone-400 text-[11px] leading-relaxed">Our in-house 3D designers construct high-resolution smile Trajectory previews within 48 hours of initial CT diagnostic uploads.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 text-stone-400 text-[11px] pt-4 border-t border-stone-800/80 font-mono">
              <ShieldCheck className="w-4 h-4 text-[#8D775F]" />
              <span>Sovereign local secure workspace.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
