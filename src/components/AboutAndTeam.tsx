import { DENTISTS } from '../data.ts';
import { Award, GraduationCap, Sparkles, Scan, Waves, Star, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutAndTeam() {
  const technologies = [
    {
      title: 'Precision 3D CT Imaging',
      description: 'Generates low-dose three-dimensional duplicates of jaw structures for micrometric implants and root alignments.',
      icon: Scan
    },
    {
      title: 'AirFlow® Thermal Hygiene',
      description: 'Gentle temperature-regulated warm water spray removes bio-films without discomfort or scraping.',
      icon: Waves
    },
    {
      title: 'Digital Mockup Aesthetics',
      description: 'Previews your porcelain veneers heights and vertical tooth dimensions computationally prior to prep.',
      icon: Sparkles
    }
  ];

  return (
    <section className="py-16 bg-[#FBF9F6]" id="about-and-team">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Clinicians Section */}
        <div>
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-[10px] tracking-[0.3em] font-mono text-[#8D775F] uppercase font-bold">
              ESTEEMED PROFESSORATE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0E2E28] tracking-tight">
              Our Visionary Specialists
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Ivory Dental is directed by dual board-certified clinical pioneers dedicated to the intersection of dental health, natural facial aesthetics, and painless technical precision.
            </p>
          </div>

          {/* Clinicians Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {DENTISTS.map((dentist, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                key={dentist.id}
                className="bg-white rounded-sm border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-md transition-shadow group flex flex-col"
                id={`dentist-bio-${dentist.id}`}
              >
                {/* Visual Avatar */}
                <div className="relative aspect-square overflow-hidden bg-stone-100 shrink-0">
                  <img
                    src={dentist.avatar}
                    alt={dentist.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-5 left-5 text-white">
                    <span className="block text-[10px] tracking-widest font-mono text-[#8D775F] uppercase font-bold">
                      {dentist.role}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-semibold">
                      {dentist.name}
                    </h3>
                  </div>
                </div>

                {/* bio and training */}
                <div className="p-6 sm:p-8 space-y-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-start text-stone-600 text-xs sm:text-sm italic leading-relaxed">
                      &ldquo;{dentist.bio}&rdquo;
                    </div>

                    <div className="space-y-3 pt-4 border-t border-stone-100">
                      <span className="text-[10px] uppercase font-mono text-stone-500 tracking-wider font-bold block flex items-center">
                        <GraduationCap className="w-3.5 h-3.5 text-[#8D775F] mr-2" />
                        <span>Academic credentials & Fellowships</span>
                      </span>
                      <ul className="space-y-2">
                        {dentist.education.map((edu, eIdx) => (
                          <li key={eIdx} className="text-xs text-stone-600 leading-relaxed flex items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8D775F] mt-1.5 mr-2.5 shrink-0" />
                            <span>{edu}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-stone-100">
                    <div className="flex items-center space-x-2 text-[#0E2E28] text-xs font-semibold">
                      <Award className="w-4 h-4 text-[#8D775F]" />
                      <span>{dentist.specialty}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Holistic technology suites section */}
        <div className="border-t border-stone-200/50 pt-16 max-w-5xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between border-b border-stone-100 pb-6">
            <div className="space-y-1.5 max-w-xl">
              <span className="text-[10px] tracking-widest font-mono text-[#8D775F] uppercase font-bold block">
                IN-CLINIC CAPABILITIES
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#0E2E28] tracking-tight">
                Our Technology Paradigm
              </h3>
            </div>
            <p className="text-stone-500 text-xs sm:text-sm max-w-sm leading-relaxed">
              We scout and invest in the absolute premium health technology systems globally. High-precision tools achieve minimal prep boundaries and eliminate biological irritation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {technologies.map((tech, tIdx) => {
              const Icon = tech.icon;
              return (
                <div 
                  key={tIdx} 
                  className="bg-white rounded-sm border border-stone-200/50 p-6 space-y-4 shadow-2xs hover:border-[#8D775F]/35 transition-all"
                  id={`tech-item-${tIdx}`}
                >
                  <div className="p-2.5 bg-[#8D775F]/10 rounded-full inline-flex text-[#8D775F]">
                    <Icon className="w-5 h-5 focus:animate-bounce" />
                  </div>
                  <h4 className="font-serif text-base text-[#0E2E28] tracking-tight font-semibold">
                    {tech.title}
                  </h4>
                  <p className="text-stone-500 text-xs leading-relaxed">
                    {tech.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
