import React from 'react';
import { CONCERNS, SERVICES } from '../data.ts';
import { DentalConcern, Service } from '../types.ts';
import { Sparkles, HelpCircle, CheckCircle2, ArrowRight, CornerDownRight, ThumbsUp, Sparkle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SmileArchitectProps {
  onPreFillBooking: (serviceId: string) => void;
}

export default function SmileArchitect({ onPreFillBooking }: SmileArchitectProps) {
  const [selectedConcernId, setSelectedConcernId] = React.useState<string>(CONCERNS[0].id);

  const activeConcern = CONCERNS.find((c) => c.id === selectedConcernId) || CONCERNS[0];
  
  // Find recommended services fully populated
  const recommendedServices: Service[] = activeConcern.recommendedServiceIds
    .map((id) => SERVICES.find((s) => s.id === id))
    .filter((s): s is Service => s !== undefined);

  return (
    <section className="py-16 bg-[#F5EFEB]/30" id="smile-architect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Area */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="inline-flex items-center space-x-2 bg-[#8D775F]/15 px-3 py-1 rounded-full border border-[#8D775F]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#8D775F] animate-pulse" />
            <span className="text-[10px] tracking-widest font-mono text-[#8D775F] uppercase font-bold">
              AI CLINICAL ASSISTANT
            </span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#0E2E28] tracking-tight">
            Consult the Smile Architect
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Unsure of which procedures match your aesthetic and biological goals? Select your primary dental profile below. Our custom matrix will map your symptoms directly to verified treatments.
          </p>
        </div>

        {/* Master Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Concern Tabs */}
          <div className="lg:col-span-5 space-y-4">
            <span className="block text-xs font-mono uppercase text-stone-500 tracking-wider mb-2">
              Select Your Primary Sensation or Concern:
            </span>
            <div className="space-y-3">
              {CONCERNS.map((concern) => {
                const isSelected = concern.id === selectedConcernId;
                return (
                  <button
                    key={concern.id}
                    onClick={() => setSelectedConcernId(concern.id)}
                    id={`concern-btn-${concern.id}`}
                    className={`block w-full text-left p-4 rounded-sm border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                      isSelected
                        ? 'bg-white border-[#8D775F] shadow-sm'
                        : 'bg-white/40 border-stone-200/50 hover:bg-white hover:border-[#8D775F]/55'
                    }`}
                  >
                    {/* Left golden highlight border */}
                    {isSelected && (
                      <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#8D775F]" />
                    )}
                    
                    <div className="flex items-start pl-2">
                      <div className={`mt-0.5 mr-3.5 shrink-0 rounded-full w-5 h-5 flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-[#8D775F]/10 text-[#8D775F]' : 'bg-stone-100 text-stone-400 group-hover:text-stone-600'
                      }`}>
                        {isSelected ? <CheckCircle2 className="w-4 h-4 ml-0.5" /> : <Sparkle className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <h3 className={`text-sm tracking-wide font-medium transition-colors ${
                          isSelected ? 'text-[#0E2E28] font-semibold' : 'text-stone-700'
                        }`}>
                          {concern.title}
                        </h3>
                        <p className="text-stone-500 text-[11px] leading-relaxed mt-1 line-clamp-1">
                          {concern.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Micro disclaimer */}
            <div className="p-4 bg-white/50 border border-stone-200/40 rounded-sm flex items-start space-x-3 text-stone-500 text-[10px] leading-relaxed">
              <HelpCircle className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
              <span>
                Note: This virtual assessment provides directional paths. A formal clinical, 3D bio-scan is required during your first physical consultation to diagnose optimal medical structures.
              </span>
            </div>
          </div>

          {/* Right panel: dynamic analysis outputs */}
          <div className="lg:col-span-7 bg-white rounded-sm border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedConcernId}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#8D775F] uppercase font-bold block mb-1">
                    CLINICAL ARCHITECTURE ANALYSIS
                  </span>
                  <h3 className="font-serif text-2xl text-[#0E2E28] tracking-tight">
                    {activeConcern.title}
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mt-2.5">
                    {activeConcern.description} Our primary goal is to address the underlying root bio-mechanics of this concern while ensuring an exceptionally aesthetic, life-like symmetry.
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 space-y-5">
                  <span className="block text-[10px] font-mono tracking-widest text-stone-500 uppercase font-bold">
                    RECOMMENDED CUSTOM TREATMENTS
                  </span>

                  <div className="space-y-4">
                    {recommendedServices.map((service) => (
                      <div 
                        key={service.id} 
                        className="p-5 bg-[#FBF9F6] rounded-sm border border-stone-200/50 hover:border-[#8D775F]/40 transition-colors group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                      >
                        <div className="space-y-1.5 max-w-md">
                          <h4 className="font-serif text-base text-[#0E2E28] tracking-tight font-semibold flex items-center">
                            <CornerDownRight className="w-4 h-4 text-[#8D775F] mr-2 shrink-0" />
                            <span>{service.title}</span>
                          </h4>
                          <p className="text-stone-500 text-xs pl-6">
                            {service.description}
                          </p>
                          <div className="flex gap-4 text-[10px] pl-6 text-[#8D775F] font-mono uppercase font-bold tracking-wider">
                            <span>{service.duration}</span>
                            {service.estimatedFee && <span>• {service.estimatedFee}</span>}
                          </div>
                        </div>

                        <button
                          onClick={() => onPreFillBooking(service.id)}
                          id={`select-prefill-${service.id}`}
                          className="w-full sm:w-auto bg-[#0E2E28] text-white hover:bg-[#8D775F] px-4.5 py-2.5 rounded-sm text-[10px] font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2 shrink-0 shadow-xs"
                        >
                          <span>Pre-Fill Booking</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-5 border-t border-stone-100 bg-[#8D775F]/5 p-4 rounded-sm">
                  <div className="p-2 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center">
                    <ThumbsUp className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-[#0E2E28]">
                      Optimal Dental Preservation guaranteed
                    </span>
                    <span className="block text-[10px] text-stone-500 font-sans">
                      All procedures run biomimetically—maximizing tooth integrity without unnecessary root damage.
                    </span>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
