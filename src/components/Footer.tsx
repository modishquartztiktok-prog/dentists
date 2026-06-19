import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
  onBookClick: () => void;
}

export default function Footer({ onNavigateTab, onBookClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0E2E28] text-white border-t border-stone-800" id="footer-section">
      
      {/* Prime content grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* Col 1: Brand positioning Statement (4 columns) */}
          <div className="md:col-span-4 space-y-6">
            <button 
              onClick={() => onNavigateTab('home')}
              className="flex items-center space-x-3 text-left cursor-pointer group"
              id="footer-logo-brand"
            >
              <div className="w-10 h-10 rounded-full bg-[#8D775F] flex items-center justify-center transition-all duration-300 group-hover:bg-white text-white group-hover:text-[#0E2E28] shadow-xs">
                <span className="font-serif font-semibold text-lg tracking-wider">I</span>
              </div>
              <div>
                <span className="block font-serif text-lg tracking-wider font-semibold text-white uppercase transition-colors group-hover:text-[#8D775F]">
                  Ivory
                </span>
                <span className="block text-[10px] tracking-[0.25em] font-mono text-stone-300 uppercase -mt-1 font-medium">
                  Dental Clinic
                </span>
              </div>
            </button>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              An elite medical sanctuary delivering painless dental architecture, biomimetics, and state-of-the-art porcelain art. Built to redefine the standard of luxury oral healthcare.
            </p>

            <div className="flex items-center space-x-2.5 text-stone-400 text-xs font-mono">
              <ShieldCheck className="w-4 h-4 text-[#8D775F]" />
              <span>Full ADA & HIPAA compliance certified.</span>
            </div>
          </div>

          {/* Col 2: Suite 1 Location Contacts (3 columns) */}
          <div className="md:col-span-3 space-y-4">
            <span className="block text-[10px] font-mono tracking-widest text-[#8D775F] uppercase font-bold">
              BEVERLY HILLS SUITE
            </span>
            <div className="space-y-3.5 text-xs sm:text-sm text-stone-300">
              <p className="flex items-start">
                <MapPin className="w-4 h-4 text-stone-400 mr-2.5 mt-0.5 shrink-0" />
                <span>9454 Wilshire Boulevard, Suite 400<br />Beverly Hills, CA 90212</span>
              </p>
              <p className="flex items-center">
                <Phone className="w-4 h-4 text-stone-400 mr-2.5 shrink-0" />
                <span>+1 (310) 555-5201</span>
              </p>
              <p className="flex items-center">
                <Mail className="w-4 h-4 text-stone-400 mr-2.5 shrink-0" />
                <span>beverly@ivorydentistry.com</span>
              </p>
            </div>
          </div>

          {/* Col 3: Suite 2 Location Contacts (3 columns) */}
          <div className="md:col-span-3 space-y-4">
            <span className="block text-[10px] font-mono tracking-widest text-[#8D775F] uppercase font-bold">
              MANHATTAN SUITE
            </span>
            <div className="space-y-3.5 text-xs sm:text-sm text-stone-300">
              <p className="flex items-start">
                <MapPin className="w-4 h-4 text-stone-400 mr-2.5 mt-0.5 shrink-0" />
                <span>730 Fifth Avenue, 12th Floor<br />New York, NY 10019</span>
              </p>
              <p className="flex items-center">
                <Phone className="w-4 h-4 text-stone-400 mr-2.5 shrink-0" />
                <span>+1 (212) 555-9018</span>
              </p>
              <p className="flex items-center">
                <Mail className="w-4 h-4 text-stone-400 mr-2.5 shrink-0" />
                <span>manhattan@ivorydentistry.com</span>
              </p>
            </div>
          </div>

          {/* Col 4: Rapid Navigation links (2 columns) */}
          <div className="md:col-span-2 space-y-4 text-left">
            <span className="block text-[10px] font-mono tracking-widest text-[#8D775F] uppercase font-bold">
              RAPID LINKS
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button 
                  onClick={() => onNavigateTab('services')}
                  id="footer-lnk-services"
                  className="text-stone-300 hover:text-white cursor-pointer transition-colors"
                >
                  Treatments Spectrum
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab('smile-architect')}
                  id="footer-lnk-architect"
                  className="text-stone-300 hover:text-white cursor-pointer transition-colors"
                >
                  Smile Architect
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab('team')}
                  id="footer-lnk-team"
                  className="text-stone-300 hover:text-white cursor-pointer transition-colors"
                >
                  Clinician Staffs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab('reviews')}
                  id="footer-lnk-reviews"
                  className="text-stone-300 hover:text-white cursor-pointer transition-colors"
                >
                  Client Diaries
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab('contact')}
                  id="footer-lnk-contact"
                  className="text-stone-300 hover:text-white cursor-pointer transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li className="pt-2">
                <button 
                  onClick={onBookClick}
                  id="footer-lnk-book"
                  className="text-[#8D775F] hover:text-white font-semibold flex items-center cursor-pointer transition-colors"
                >
                  <span>Book Consult suite</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Operating Hours and secondary parameters panel */}
        <div className="border-t border-stone-800/80 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center space-x-3.5 text-xs text-stone-300 font-sans">
            <Clock className="w-4 text-[#8D775F] h-4 shrink-0" />
            <span>Consultation Hours: Mon – Fri: 08:30 AM – 06:00 PM | Sat by special invitation only</span>
          </div>

          <div className="flex items-center space-x-2 text-[10px] uppercase font-mono tracking-wider text-stone-400">
            <span>99.8% Perfect Biological Care Rating</span>
          </div>
        </div>

      </div>

      {/* Extreme Bottom footer credits strip */}
      <div className="bg-[#0B2520] py-6 border-t border-stone-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-stone-400 font-mono">
          <span>&copy; {currentYear} Ivory Dental Clinic. All Sovereign Rights Reserved.</span>
          <div className="flex space-x-4">
            <span className="hover:text-white cursor-pointer">Privacy Treaty</span>
            <span>|</span>
            <span className="hover:text-white cursor-pointer">HIPAA Disclosures</span>
            <span>|</span>
            <button 
              onClick={() => onNavigateTab('admin')}
              id="link-footer-staff-portal"
              className="hover:text-white font-semibold cursor-pointer underline decoration-[#8D775F] underline-offset-4"
            >
              Staff Portal
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
}
