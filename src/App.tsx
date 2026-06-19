import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, ArrowRight, ShieldCheck, PhoneCall, Gift, CheckCircle, HelpCircle, MessageCircle, Phone } from 'lucide-react';

// Data and Types
import { SERVICES, DENTISTS } from './data.ts';

// Layout Components
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import ServicesPanel from './components/ServicesPanel.tsx';
import SmileArchitect from './components/SmileArchitect.tsx';
import BookingPortal from './components/BookingPortal.tsx';
import AboutAndTeam from './components/AboutAndTeam.tsx';
import Reviews from './components/Reviews.tsx';
import Contact from './components/Contact.tsx';
import Footer from './components/Footer.tsx';
import AdminPanel from './components/AdminPanel.tsx';

export default function App() {
  const [activeTab, setActiveTab] = React.useState<string>('home');
  const [preSelectedServiceId, setPreSelectedServiceId] = React.useState<string>('');
  const [showConcierge, setShowConcierge] = React.useState(false);

  // Handle pre-filled selections coming from outer buttons
  const handlePreFillBooking = (serviceId: string) => {
    setPreSelectedServiceId(serviceId);
    setActiveTab('booking');
    
    // Smooth scroll straight to active form block
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearPreSelection = () => {
    setPreSelectedServiceId('');
  };

  return (
    <div className="min-h-screen bg-[#FBF9F6] text-stone-900 font-sans selection:bg-[#8D775F]/30 selection:text-[#0E2E28]" id="app-viewport">
      
      {/* Top Luxury Announcement/Warning bar */}
      <div className="bg-[#0E2E28] text-white py-2.5 px-4 text-center text-[10px] tracking-widest font-mono uppercase border-b border-stone-800/80 flex flex-col sm:flex-row items-center justify-center gap-2 z-50 relative">
        <div className="flex items-center space-x-1.5 font-bold">
          <Gift className="w-3.5 h-3.5 text-[#8D775F] animate-bounce shrink-0" />
          <span>FIRST SEASON SPECIAL:</span>
        </div>
        <span className="text-stone-300">New patients receive a complimentary Digital Smile Design mapping ($150 value)</span>
        <button 
          onClick={() => setActiveTab('booking')}
          id="promo-accept-btn" 
          className="underline hover:text-[#8D775F] cursor-pointer ml-1 font-bold tracking-wider"
        >
          Reserve Complimentary Consult
        </button>
      </div>

      {/* Floating Concierge Assistant Widget with WhatsApp & Call */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
        {/* Expanded menu */}
        <AnimatePresence>
          {showConcierge && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0E2E28] border border-stone-850/80 text-white rounded-lg p-4 shadow-2xl w-64 text-left space-y-3 mr-1"
              id="concierge-popup-panel"
            >
              <div className="border-b border-stone-800 pb-2.5">
                <span className="block text-[9px] tracking-widest font-mono text-[#8D775F] uppercase font-bold">
                  Ivory Dental Concierge
                </span>
                <span className="block text-xs text-stone-300 font-serif mt-0.5">
                  How may we elevate your coordinates?
                </span>
              </div>
              
              <div className="space-y-2">
                <a
                  href="https://wa.me/923341854356"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 bg-[#25D366] hover:bg-[#128C7E] text-white p-2.5 rounded-sm transition-all duration-300 shadow-sm"
                  id="link-whatsapp-chat"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <div className="text-left">
                    <span className="block text-[11px] font-bold tracking-wide uppercase font-mono">WhatsApp Chat</span>
                    <span className="block text-[10px] text-white/90">0334 1854356</span>
                  </div>
                </a>

                <a
                  href="tel:03341854356"
                  className="flex items-center space-x-3 bg-[#8D775F] hover:bg-[#725F4B] text-white p-2.5 rounded-sm transition-all duration-300 shadow-sm"
                  id="link-voice-call"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <div className="text-left">
                    <span className="block text-[11px] font-bold tracking-wide uppercase font-mono">Call Clinic</span>
                    <span className="block text-[10px] text-white/90">0334 1854356</span>
                  </div>
                </a>
              </div>

              <div className="text-[9px] font-mono text-stone-400 text-center pt-1 border-t border-stone-800/80 flex items-center justify-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-[#8D775F]" />
                <span>Encrypted secure channel</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Toggle Button */}
        <button
          onClick={() => setShowConcierge(!showConcierge)}
          className={`h-14 w-14 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 relative outline-none border ${
            showConcierge 
              ? 'bg-[#0E2E28] border-stone-800 text-[#8D775F]' 
              : 'bg-[#25D366] border-emerald-400 text-white hover:bg-[#128C7E]'
          }`}
          title="Connect with Ivory Concierge"
          id="btn-concierge-toggle"
        >
          {showConcierge ? (
            <span className="text-lg font-mono font-bold leading-none">×</span>
          ) : (
            <>
              {/* WhatsApp Pulsing Notification Dot */}
              <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 text-[8px] font-mono text-white items-center justify-center font-bold">1</span>
              </span>
              <MessageCircle className="w-6 h-6 animate-pulse" />
            </>
          )}
        </button>
      </div>

      {/* Main Nav header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        openBooking={() => { setPreSelectedServiceId(''); setActiveTab('booking'); }} 
      />

      {/* Dynamic Main Body with smooth slide-fade slide tab animations */}
      <main className="relative overflow-hidden min-h-[60vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            {/* HOME VIEW CONTROLLER */}
            {activeTab === 'home' && (
              <div id="home-view" className="space-y-20">
                <Hero 
                  onBookClick={() => { setPreSelectedServiceId(''); setActiveTab('booking'); }} 
                  onExploreServicesClick={() => setActiveTab('services')}
                  onSmileArchitectClick={() => setActiveTab('smile-architect')}
                />

                {/* Concept Highlights Bento teaser */}
                <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    <div className="lg:col-span-4 space-y-6">
                      <span className="text-[10px] tracking-[0.3em] font-mono text-[#8D775F] uppercase font-bold">
                        CLINICAL METHODOLOGY
                      </span>
                      <h2 className="font-serif text-3xl text-[#0E2E28] tracking-tight">
                        Redefining the standard of clinical excellence.
                      </h2>
                      <p className="text-stone-600 text-sm leading-relaxed">
                        We blend master ceramic artistry with low-prep, natural veneers and biological bone care. Experience pristine wellness calibrated to your lifestyle.
                      </p>
                      
                      <button 
                        onClick={() => setActiveTab('services')}
                        id="bento-explore-services"
                        className="text-xs font-semibold uppercase tracking-widest text-[#0E2E28] hover:text-[#8D775F] flex items-center space-x-2 transition-colors cursor-pointer group"
                      >
                        <span>Explore Treatments spectrum</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                      </button>
                    </div>

                    <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      <div 
                        onClick={() => handlePreFillBooking('porcelain-veneers')}
                        className="bg-white p-6 rounded-sm border border-stone-200/60 hover:border-[#8D775F] transition-all cursor-pointer group shadow-2xs text-left"
                        id="teasercard-veneers"
                      >
                        <span className="text-[10px] font-mono tracking-widest text-[#8D775F] uppercase font-bold block mb-4">
                          01 • COSMETIC ARTISTRY
                        </span>
                        <h3 className="font-serif text-lg text-[#0E2E28] tracking-tight group-hover:text-[#8D775F]">
                          Artisan Porcelain Veneers
                        </h3>
                        <p className="text-stone-500 text-xs mt-2.5 line-clamp-2 leading-relaxed">
                          Sculpted micro-thin to replicate natural translucency, light reflectivity, and color dynamics.
                        </p>
                        <div className="text-[10px] text-stone-400 font-mono mt-4 flex items-center justify-between">
                          <span>From $1,800 per tooth</span>
                          <span className="underline group-hover:text-[#8D775F] font-bold">Book Treatment</span>
                        </div>
                      </div>

                      <div 
                        onClick={() => handlePreFillBooking('laser-whitening')}
                        className="bg-white p-6 rounded-sm border border-stone-200/60 hover:border-[#8D775F] transition-all cursor-pointer group shadow-2xs text-left"
                        id="teasercard-whitening"
                      >
                        <span className="text-[10px] font-mono tracking-widest text-[#8D775F] uppercase font-bold block mb-4">
                          02 • CLINICAL WHITENING
                        </span>
                        <h3 className="font-serif text-lg text-[#0E2E28] tracking-tight group-hover:text-[#8D775F]">
                          Atelier Zoom Whitening
                        </h3>
                        <p className="text-stone-500 text-xs mt-2.5 line-clamp-2 leading-relaxed">
                          Sapphire cold-laser stimulation dissolving deep stains up to 8 shades in a single cozy hour.
                        </p>
                        <div className="text-[10px] text-stone-400 font-mono mt-4 flex items-center justify-between">
                          <span>From $650 per session</span>
                          <span className="underline group-hover:text-[#8D775F] font-bold">Book Treatment</span>
                        </div>
                      </div>

                      <div 
                        onClick={() => handlePreFillBooking('dental-implants')}
                        className="bg-white p-6 rounded-sm border border-stone-200/60 hover:border-[#8D775F] transition-all cursor-pointer group shadow-2xs text-left"
                        id="teasercard-implants"
                      >
                        <span className="text-[10px] font-mono tracking-widest text-[#8D775F] uppercase font-bold block mb-4">
                          03 • BIOMIMETIC IMPLANTS
                        </span>
                        <h3 className="font-serif text-lg text-[#0E2E28] tracking-tight group-hover:text-[#8D775F]">
                          Elite Implants & Crowns
                        </h3>
                        <p className="text-stone-500 text-xs mt-2.5 line-clamp-2 leading-relaxed">
                          Titanium biomechanical roots finished with customized hand-glazed ceramic crowns for natural chewing.
                        </p>
                        <div className="text-[10px] text-stone-400 font-mono mt-4 flex items-center justify-between">
                          <span>From $3,200 total</span>
                          <span className="underline group-hover:text-[#8D775F] font-bold">Book Treatment</span>
                        </div>
                      </div>

                      <div 
                        onClick={() => handlePreFillBooking('invisalign-precision')}
                        className="bg-white p-6 rounded-sm border border-stone-200/60 hover:border-[#8D775F] transition-all cursor-pointer group shadow-2xs text-left"
                        id="teasercard-aligners"
                      >
                        <span className="text-[10px] font-mono tracking-widest text-[#8D775F] uppercase font-bold block mb-4">
                          04 • ORTHODONTIC EXCELLENCE
                        </span>
                        <h3 className="font-serif text-lg text-[#0E2E28] tracking-tight group-hover:text-[#8D775F]">
                          Invisalign Clear Trays
                        </h3>
                        <p className="text-stone-500 text-xs mt-2.5 line-clamp-2 leading-relaxed">
                          Advanced alignment software calculating precision dental transitions and jaw trajectory pathings safely.
                        </p>
                        <div className="text-[10px] text-stone-400 font-mono mt-4 flex items-center justify-between">
                          <span>From $4,500 total</span>
                          <span className="underline group-hover:text-[#8D775F] font-bold">Book Treatment</span>
                        </div>
                      </div>

                    </div>

                  </div>
                </section>

                {/* Quick Doctor Profile Teaser section */}
                <section className="bg-stone-100/50 py-16 border-y border-stone-200/50">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <div className="space-y-6">
                        <span className="text-[10px] tracking-[0.3em] font-mono text-[#8D775F] uppercase font-bold block">
                          MEET THE MASTER ARTISANS
                        </span>
                        <h2 className="font-serif text-3xl sm:text-4xl text-[#0E2E28] tracking-tight leading-[1.2]">
                          Painless dentistry. <br />
                          Ivy League craftsmanship.
                        </h2>
                        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                          Directed by <strong>Dr. Amelia Thorne (Columbia University)</strong> and <strong>Dr. Marcus Vance (Tufts Prosthodontics)</strong>, our clinic has earned a pristine international reputation for minimal preps, zero metal composites, and ultra-comfortable patient service.
                        </p>
                        <div className="pt-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                          <button 
                            onClick={() => setActiveTab('team')}
                            id="home-learn-dentists"
                            className="bg-[#0E2E28] text-white hover:bg-[#8D775F] px-6 py-3.5 rounded-sm text-xs font-semibold tracking-widest uppercase transition-all cursor-pointer text-center"
                          >
                            Read Physician Credentials
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative aspect-3/4 rounded-sm overflow-hidden border border-stone-200 bg-white group shadow-2xs">
                          <img 
                            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=350" 
                            alt="Dr. Amelia Thorne" 
                            className="w-full h-full object-cover transition-transform group-hover:scale-103 duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-3 left-3 text-white">
                            <span className="block text-[9px] uppercase tracking-wider font-mono text-[#8D775F]">Co-Founder</span>
                            <span className="block text-xs font-serif font-bold">Dr. Amelia Thorne</span>
                          </div>
                        </div>

                        <div className="relative aspect-3/4 rounded-sm overflow-hidden border border-stone-200 bg-white group shadow-2xs mt-6">
                          <img 
                            src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=350" 
                            alt="Dr. Marcus Vance" 
                            className="w-full h-full object-cover transition-transform group-hover:scale-103 duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-3 left-3 text-white">
                            <span className="block text-[9px] uppercase tracking-wider font-mono text-[#8D775F]">Restorative Director</span>
                            <span className="block text-xs font-serif font-bold">Dr. Marcus Vance</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Testimonials short teaser carousel */}
                <Reviews />

                {/* Final Booking Call-to-Action segment */}
                <section className="bg-[#0E2E28] text-white py-16 text-center overflow-hidden relative">
                  <div className="absolute -top-12 -left-12 w-48 h-48 bg-stone-800/20 rounded-full blur-xl" />
                  <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#8D775F]/15 rounded-full blur-xl" />
                  
                  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
                    <span className="text-[10px] tracking-[0.3em] font-mono text-[#8D775F] uppercase font-bold block">
                      BEGIN YOUR RECONSTRUCTION TODAY
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl text-stone-100 tracking-tight">
                      Experience the Ivory Standard of Oral Health.
                    </h3>
                    <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                      Accepting a selected number of discerning new clients this season. Reserve your custom diagnostic consultation, 3D bio-scan mapping, and smile alignment mockup today.
                    </p>
                    <div className="pt-2">
                      <button 
                        onClick={() => { setPreSelectedServiceId(''); setActiveTab('booking'); }}
                        id="home-final-cta-book"
                        className="bg-white text-[#0E2E28] hover:bg-[#8D775F] hover:text-white px-8 py-4 rounded-sm text-xs font-semibold tracking-widest uppercase transition-all shadow-md cursor-pointer"
                      >
                        Reserve Consultation Suite
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* TREATMENTS VIEW CONTROLLER */}
            {activeTab === 'services' && (
              <ServicesPanel onBookServiceClick={handlePreFillBooking} />
            )}

            {/* SMILE ARCHITECT VIEW CONTROLLER */}
            {activeTab === 'smile-architect' && (
              <SmileArchitect onPreFillBooking={handlePreFillBooking} />
            )}

            {/* DENTISTS VIEW CONTROLLER */}
            {activeTab === 'team' && (
              <AboutAndTeam />
            )}

            {/* REVIEWS VIEW CONTROLLER */}
            {activeTab === 'reviews' && (
              <Reviews />
            )}

            {/* RESERVATION VIEW CONTROLLER */}
            {activeTab === 'booking' && (
              <BookingPortal 
                preSelectedServiceId={preSelectedServiceId} 
                clearPreSelection={clearPreSelection} 
              />
            )}

            {/* CONTACT VIEW CONTROLLER */}
            {activeTab === 'contact' && (
              <Contact />
            )}

            {/* ADMIN STAFF PANEL VIEW CONTROLLER */}
            {activeTab === 'admin' && (
              <AdminPanel />
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer component */}
      <Footer 
        onNavigateTab={(tab) => { setActiveTab(tab); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
        onBookClick={() => { setPreSelectedServiceId(''); setActiveTab('booking'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
      />

    </div>
  );
}
