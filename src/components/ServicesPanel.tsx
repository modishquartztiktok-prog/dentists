import React from 'react';
import { SERVICES } from '../data.ts';
import { Service } from '../types.ts';
import { Sparkles, Activity, ShieldAlert, Check, ChevronRight, Clock, DollarSign, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ServicesPanelProps {
  onBookServiceClick: (serviceId: string) => void;
}

export default function ServicesPanel({ onBookServiceClick }: ServicesPanelProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<'all' | 'cosmetic' | 'restorative' | 'preventive' | 'orthodontics'>('all');
  const [expandedService, setExpandedService] = React.useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Specialties' },
    { id: 'cosmetic', label: 'Cosmetic Artistry', icon: Sparkles },
    { id: 'restorative', label: 'Restorative Excellence', icon: Activity },
    { id: 'preventive', label: 'Preventive Mastery', icon: ShieldCheckIcon },
    { id: 'orthodontics', label: 'Advanced Ortho', icon: Sparkles }
  ];

  function ShieldCheckIcon({ className }: { className?: string }) {
    return <Activity className={className} />;
  }

  const filteredServices = SERVICES.filter(s => 
    selectedCategory === 'all' ? true : s.category === selectedCategory
  );

  return (
    <section className="py-16 bg-[#FBF9F6]" id="services-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Summary */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-[10px] tracking-[0.3em] font-mono text-[#8D775F] uppercase font-bold">
            CONCURRENCE OF ART & SCIENCE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#0E2E28] tracking-tight">
            Our Dental Masteries
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Every smile is a personal signature. Choose from our curated spectrum of elite preventative wellness programs, biological fillings, and high-prestige aesthetic corrections.
          </p>
        </div>

        {/* Category Selection Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12 border-b border-stone-200/50 pb-6">
          {categories.map((cat) => {
            const Icon = cat.icon || Activity;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id as any);
                  setExpandedService(null);
                }}
                id={`service-cat-${cat.id}`}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-sm text-xs font-semibold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0E2E28] text-white shadow-xs'
                    : 'bg-white hover:bg-stone-100 text-stone-600 border border-stone-200'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Services Listings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, idx) => {
                const isExpanded = expandedService === service.id;
                return (
                  <motion.div
                    layout
                    key={service.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className={`bg-white rounded-sm border border-stone-200/70 p-6 cursor-pointer hover:border-[#8D775F] transition-all duration-300 shadow-xs ${
                      isExpanded ? 'ring-1 ring-[#8D775F]/30 border-[#8D775F]' : ''
                    }`}
                    onClick={() => setExpandedService(isExpanded ? null : service.id)}
                    id={`service-item-${service.id}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <span className="inline-block text-[9px] tracking-widest font-mono text-[#8D775F] uppercase font-bold bg-[#8D775F]/10 px-2.5 py-1 rounded-xs">
                          {service.category}
                        </span>
                        <h3 className="font-serif text-lg sm:text-xl text-[#0E2E28] tracking-tight hover:text-[#8D775F] transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-stone-500 text-xs sm:text-sm line-clamp-2">
                          {service.description}
                        </p>
                      </div>
                      <div className="p-1 rounded-full group-hover:bg-stone-100">
                        <ChevronRight className={`w-5 h-5 text-stone-400 transform transition-transform duration-300 ${
                          isExpanded ? 'rotate-90 text-[#8D775F]' : ''
                        }`} />
                      </div>
                    </div>

                    {isExpanded && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 pt-6 border-t border-stone-100 space-y-6"
                        onClick={(e) => e.stopPropagation()} // Stop bubble-up trigger
                      >
                        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed italic">
                          {service.longDescription}
                        </p>

                        <div className="space-y-3">
                          <h4 className="text-[10px] tracking-widest font-mono text-stone-800 uppercase font-bold">
                            Exclusive Clinical Benefits:
                          </h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {service.benefits.map((benefit, bIdx) => (
                              <li key={bIdx} className="flex items-start text-xs text-stone-600">
                                <Check className="w-4 h-4 text-[#8D775F] shrink-0 mr-2 mt-0.5" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#FBF9F6] p-4 rounded-sm border border-stone-200/50">
                          <div className="flex flex-wrap gap-4 text-xs font-medium text-stone-600">
                            <div className="flex items-center text-stone-500">
                              <Clock className="w-3.5 h-3.5 text-stone-400 mr-1.5" />
                              <span>{service.duration}</span>
                            </div>
                            {service.estimatedFee && (
                              <div className="flex items-center text-[#0E2E28] font-semibold">
                                <DollarSign className="w-3.5 h-3.5 text-stone-400 mr-0.5" />
                                <span>{service.estimatedFee}</span>
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => onBookServiceClick(service.id)}
                            id={`book-service-${service.id}`}
                            className="w-full sm:w-auto bg-[#0E2E28] text-white hover:bg-[#8D775F] px-4 py-2 rounded-sm text-[10px] font-semibold tracking-widest uppercase transition-all duration-300 cursor-pointer text-center"
                          >
                            Reserve Selection
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Aesthetic bento visual layout on the right side */}
          <div className="sticky top-24 bg-white p-6 sm:p-8 rounded-sm border border-stone-200/70 shadow-sm space-y-6">
            <div className="relative aspect-video rounded-sm overflow-hidden group shadow-xs">
              <img
                src="/src/assets/images/ivory_dental_consult_1781823307178.jpg"
                alt="Elite dental clinical consultation"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-85 transition-opacity" />
              <div className="absolute bottom-4 left-4 text-white">
                <span className="block text-[10px] tracking-widest font-mono text-[#8D775F] uppercase font-bold">
                  Bespoke Consultations
                </span>
                <span className="block font-serif text-base sm:text-lg">
                  Dr. Thorne & Dr. Vance consulting
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-lg text-[#0E2E28] tracking-tight">
                Our Non-Compromise Biological Principles
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                We believe standard modern dentistry relies too heavily on aggressive drilling and toxic synthetic composites. Our clinic implements exclusive <strong>biomimetic procedures</strong> designed to conserve 90% more natural tooth structure while utilizing zero toxic materials, BPA, or harmful silver amalgams.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="border border-stone-100 p-3 rounded-xs text-[#0E2E28]">
                  <span className="block font-serif text-lg font-semibold text-[#8D775F]">100%</span>
                  <span className="text-[10px] uppercase font-mono text-stone-500 tracking-wider">Metal-Free Ceramic</span>
                </div>
                <div className="border border-stone-100 p-3 rounded-xs text-[#0E2E28]">
                  <span className="block font-serif text-lg font-semibold text-[#8D775F]">90%</span>
                  <span className="text-[10px] uppercase font-mono text-stone-500 tracking-wider">Structure Preserved</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
