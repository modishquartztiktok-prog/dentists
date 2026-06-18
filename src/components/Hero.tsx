import { Calendar, Sparkles, Star, Award, ShieldCheck, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onBookClick: () => void;
  onExploreServicesClick: () => void;
  onSmileArchitectClick: () => void;
}

export default function Hero({ onBookClick, onExploreServicesClick, onSmileArchitectClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#FBF9F6] py-12 lg:py-20" id="hero-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero text presentation */}
          <div className="lg:col-span-7 space-y-8 z-10">
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-stone-100/80 px-3.5 py-1.5 rounded-full border border-stone-200/50"
            >
              <Sparkles className="w-4 h-4 text-[#8D775F]" />
              <span className="text-[11px] tracking-widest font-mono text-stone-600 uppercase font-medium">
                A NEW STANDARD OF DENTISTRY
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0E2E28] leading-[1.1]"
            >
              Exceptional care, <br />
              <span className="font-serif italic text-[#8D775F] font-light">artisan precision</span> <br />
              for natural beauty.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-stone-600 max-w-xl text-base sm:text-lg leading-relaxed font-sans"
            >
              At Ivory Dental, we harmonize biological excellence with artistic cosmetic reconstruction. Step inside a peaceful sanctuary crafted to deliver painless, luxurious, and highly personalized dental transformations.
            </motion.p>

            {/* Micro Interaction Cards */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-xl"
            >
              <button 
                onClick={onBookClick}
                id="hero-cta-book-suite"
                className="bg-[#0E2E28] text-white hover:bg-[#8D775F] px-8 py-4 rounded-sm text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer text-center flex items-center justify-center space-x-2.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Consultation</span>
              </button>

              <button 
                onClick={onSmileArchitectClick}
                id="hero-cta-smile-architect"
                className="bg-white hover:bg-stone-50 text-[#0E2E28] border border-stone-200 px-8 py-4 rounded-sm text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:border-[#8D775F] cursor-pointer text-center flex items-center justify-center space-x-2.5"
              >
                <Sparkles className="w-4 h-4 text-[#8D775F]" />
                <span>Custom Smile Architect</span>
              </button>
            </motion.div>

            {/* Trust and Rating indications */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 border-t border-stone-200/65 flex flex-col sm:flex-row sm:items-center gap-6"
            >
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=64&h=64" alt="Client" className="w-8 h-8 rounded-full border-2 border-[#FBF9F6]" referrerPolicy="no-referrer" />
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=64&h=64" alt="Client" className="w-8 h-8 rounded-full border-2 border-[#FBF9F6]" referrerPolicy="no-referrer" />
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=64&h=64" alt="Client" className="w-8 h-8 rounded-full border-2 border-[#FBF9F6]" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <div className="flex items-center text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-xs font-semibold text-stone-800 ml-1.5 font-mono">5.0</span>
                  </div>
                  <p className="text-[11px] font-medium text-stone-500 font-sans">
                    Over 1,200 verified 5-star ratings.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-stone-600 text-xs">
                <Award className="w-4 h-4 text-[#8D775F]" />
                <span className="font-mono text-stone-500 uppercase tracking-wider font-semibold">AACD Accredited Excellence</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Visual Image Content */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
              className="relative w-full aspect-square max-w-[450px]"
            >
              {/* Decorative Frame */}
              <div className="absolute -inset-2 rounded-sm border border-stone-200/60 pointer-events-none" />
              
              {/* Back ambient card */}
              <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-stone-200/50 rounded-sm z-0" />
              
              {/* Generated Hero Image */}
              <div className="relative w-full h-full rounded-sm overflow-hidden border-4 border-white shadow-xl z-10 group">
                <motion.img 
                  src="/src/assets/images/ivory_dental_hero_1781823287596.jpg" 
                  alt="Ivory Dental Clinic Wellness Lobby"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  whileHover={{ scale: 1.03 }}
                />
                
                {/* Floating Micro-Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-sm border border-stone-100/50 flex items-center space-x-3.5 shadow-md">
                  <div className="p-2 bg-[#0E2E28]/10 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-[#0E2E28]" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-[#0E2E28] tracking-wide uppercase font-mono">
                      Safe Sanctuary
                    </span>
                    <span className="block text-[10px] text-stone-500 font-sans">
                      Advanced HEPA Clean Air & Biological Safety
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
