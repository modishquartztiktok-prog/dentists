import React from 'react';
import { Menu, X, Calendar, Sparkles, Locate, BookOpen, UserCheck, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openBooking: () => void;
}

export default function Navbar({ activeTab, setActiveTab, openBooking }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'smile-architect', label: 'Smile Architect', icon: Sparkles },
    { id: 'team', label: 'Our Specialists' },
    { id: 'reviews', label: 'Client Diaries' }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#FBF9F6]/90 backdrop-blur-md border-b border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo Brand section */}
          <div className="flex items-center">
            <button 
              onClick={() => { setActiveTab('home'); setIsOpen(false); }}
              className="flex items-center space-x-3 cursor-pointer group text-left"
              id="brand-logo"
            >
              <div className="w-10 h-10 rounded-full bg-[#0E2E28] flex items-center justify-center transition-all duration-300 group-hover:bg-[#8D775F] shadow-sm">
                <span className="font-serif text-white font-semibold text-lg tracking-wider">I</span>
              </div>
              <div>
                <span className="block font-serif text-lg tracking-wider font-semibold text-[#0E2E28] uppercase transition-colors group-hover:text-[#8D775F]">
                  Ivory
                </span>
                <span className="block text-[10px] tracking-[0.25em] font-mono text-stone-500 uppercase -mt-1 font-medium">
                  Dental Clinic
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  id={`nav-link-${item.id}`}
                  className={`relative py-2 text-sm tracking-wide font-medium transition-all duration-300 cursor-pointer flex items-center space-x-1 ${
                    isActive 
                      ? 'text-[#0E2E28] font-semibold' 
                      : 'text-stone-600 hover:text-[#0E2E28]'
                  }`}
                >
                  {Icon && <Icon className={`w-3.5 h-3.5 mr-0.5 ${isActive ? 'text-[#8D775F] animate-pulse' : 'text-stone-400'}`} />}
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8D775F] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* CTA Reservation Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={openBooking}
              id="cta-reserve-consultation-desktop"
              className="bg-[#0E2E28] text-white hover:bg-[#8D775F] px-5 py-2.5 rounded-sm text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex items-center space-x-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve Suite</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-navigation-toggle"
              className="inline-flex items-center justify-center p-2 rounded-md text-[#0E2E28] hover:text-[#8D775F] hover:bg-stone-100 focus:outline-hidden cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu panel */}
      {isOpen && (
        <div className="md:hidden bg-[#FBF9F6] border-b border-stone-200 shadow-lg animate-fadeIn">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  id={`nav-link-mobile-${item.id}`}
                  className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium transition-all duration-200 flex items-center ${
                    isActive 
                      ? 'bg-[#0E2E28]/5 text-[#0E2E28] font-semibold border-l-4 border-[#8D775F]' 
                      : 'text-stone-600 hover:bg-stone-50 hover:text-[#0E2E28]'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 mr-2 text-[#8D775F]" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="pt-4 pb-2 px-3">
              <button
                onClick={() => {
                  openBooking();
                  setIsOpen(false);
                }}
                id="cta-reserve-consultation-mobile"
                className="w-full bg-[#0E2E28] text-white hover:bg-[#8D775F] py-3 px-4 rounded-sm text-center text-sm font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Consultation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
