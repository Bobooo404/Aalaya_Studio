import React from 'react';
import { motion } from 'motion/react';
import { Compass, Check } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-28 lg:py-36 bg-white/80 backdrop-blur-[2px] overflow-hidden">
      {/* Decorative Blueprint elements */}
      <div className="absolute inset-0 bg-architect-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Split Layout: Image on Left, Narrative on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Parallax Multi-layered Architectural Imagery */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Primary Architectural Portrait Image */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-[#EBE5DA] bg-[#1A1E24]">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80"
                  alt="AALAYA AS STUDIOS Architecture Studio"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Floating Architectural Philosophy Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 shadow-lg text-[#1A1A1A]">
                  <p className="font-serif italic text-lg leading-snug">
                    "We listen to the place first, then design a space that feels right for it."
                  </p>
                  <p className="text-xs uppercase tracking-widest text-[#B8620B] font-semibold mt-2">
                    Ar. Ananya S. Rao &bull; Founder
                  </p>
                </div>
              </div>

              {/* Secondary Overlapping Accent Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="hidden sm:block absolute -bottom-10 -right-8 w-56 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-[#2C2C2C]"
              >
                <img
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80"
                  alt="Architectural Drafting & Models"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Decorative Studio Seal */}
              <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-[#1A1A1A] text-white p-3 flex flex-col items-center justify-center text-center shadow-xl border border-[#B8620B]">
                <span className="text-[9px] font-mono tracking-widest text-[#E8797A]">EST.</span>
                <span className="font-serif text-sm font-bold">2006</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Studio Story & Mission Statement */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F1E8] border border-[#EBE5DA] text-xs uppercase tracking-widest text-[#B8620B] font-semibold mb-4">
                <Compass className="w-3.5 h-3.5 text-[#B8620B]" />
                <span>About Us</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] font-semibold tracking-tight leading-tight mb-6">
                Spaces that feel good to <span className="italic text-[#B8620B]">live in</span>
              </h2>

              <p className="text-base text-[#444] leading-relaxed mb-6">
                Since 2006, we have designed homes, offices, and outdoor spaces that are practical, comfortable, and built to last.
              </p>

              <p className="text-sm text-[#666] leading-relaxed mb-8">
                Our name, <strong className="text-[#1A1A1A]">AALAYA</strong>, comes from a Sanskrit word that means home. We start by learning about your needs, your site, and how you live. Then we make a clear, long-lasting design that works well with light, weather, and nature.
              </p>

              {/* Key Principles Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-10">
                {[
                  'Good daylight planning for every site',
                  'Careful engineering and clear details',
                  'Fresh air and quiet, comfortable rooms',
                  'Strong materials that last for years'
                ].map((principle, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2 text-xs text-[#333]">
                    <span className="w-4 h-4 rounded-full bg-[#B8620B]/15 text-[#B8620B] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>{principle}</span>
                  </div>
                ))}
              </div>

              {/* Signature & Credentials */}
              <div className="pt-6 border-t border-[#EBE5DA] flex items-center justify-between">
                <div>
                  <p className="font-serif text-2xl text-[#1A1A1A] italic">Ananya S. Rao</p>
                  <p className="text-xs uppercase tracking-widest text-[#737373] mt-0.5">
                    Harvard GSD &bull; AIA Member &bull; Lead Architect
                  </p>
                </div>

                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#F5F1E8] text-[11px] font-mono font-medium text-[#B8620B]">
                    Studio Practice #8578
                  </span>
                </div>
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
