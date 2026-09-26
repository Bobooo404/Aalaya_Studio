import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS_DATA } from '../data/portfolioData';
import { Star, Quote, ChevronLeft, ChevronRight, MapPin, Sparkles } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const current = TESTIMONIALS_DATA[currentIndex];

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [autoplay]);

  const handlePrev = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : TESTIMONIALS_DATA.length - 1));
  };

  const handleNext = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  return (
    <section id="testimonials" className="relative py-28 lg:py-36 bg-[#FBF9F5]/80 backdrop-blur-[2px] overflow-hidden">
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-architect-grid opacity-35 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5DFD5] text-xs uppercase tracking-widest text-[#B8620B] font-semibold mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B8620B]" />
            <span>What Clients Say</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] font-semibold tracking-tight leading-tight mb-4"
          >
            Spaces Our Clients <span className="italic text-[#B8620B]">Love Living In</span>
          </motion.h2>

          <p className="text-sm sm:text-base text-[#666]">
            Feedback from homeowners, business owners, and artists who live in our spaces.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-3xl p-8 sm:p-12 lg:p-14 border border-[#EBE5DA] shadow-xl relative overflow-hidden"
              id={`testimonial-slide-${current.id}`}
            >
              {/* Background Architectural Accent */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#B8620B]/10 to-transparent rounded-bl-full pointer-events-none" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                
                {/* Client Avatar & Project Badge */}
                <div className="shrink-0 flex flex-col items-center text-center">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-[#B8620B]/30 shadow-md mb-4">
                    <img
                      src={current.avatar}
                      alt={current.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <span className="text-xs font-semibold text-[#1A1A1A] leading-tight">
                    {current.name}
                  </span>
                  <span className="text-[11px] text-[#737373] mt-0.5">
                    {current.role}
                  </span>

                  {/* Pulsing Star Rating */}
                  <div className="flex items-center gap-1 mt-3">
                    {[...Array(current.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          scale: [1, 1.15, 1],
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.15,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <Star className="w-3.5 h-3.5 fill-[#B8620B] text-[#B8620B]" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="mb-6">
                    <Quote className="w-10 h-10 text-[#E8797A]/40 mb-3" />
                    <p className="font-serif text-lg sm:text-xl lg:text-2xl text-[#222] font-normal leading-relaxed italic">
                      "{current.quote}"
                    </p>
                  </div>

                  {/* Project Tag & Location */}
                  <div className="pt-6 border-t border-[#F5F1E8] flex flex-wrap items-center justify-between gap-3 text-xs text-[#737373]">
                    <div className="flex items-center gap-2 font-medium text-[#1A1A1A]">
                      <span className="w-2 h-2 rounded-full bg-[#B8620B]" />
                      <span>Project: {current.project}</span>
                    </div>

                    <div className="flex items-center gap-1 text-[#737373]">
                      <MapPin className="w-3.5 h-3.5 text-[#B8620B]" />
                      <span>{current.location}</span>
                    </div>
                  </div>

                </div>

              </div>

            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setAutoplay(false);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? 'w-8 bg-[#B8620B]' : 'w-2 bg-[#D5CDC0] hover:bg-[#B8620B]/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev/Next Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full bg-white border border-[#E5DFD5] text-[#1A1A1A] hover:bg-[#B8620B] hover:text-white transition-all shadow-xs"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-white border border-[#E5DFD5] text-[#1A1A1A] hover:bg-[#B8620B] hover:text-white transition-all shadow-xs"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
