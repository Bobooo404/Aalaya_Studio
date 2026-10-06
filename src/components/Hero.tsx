import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onExploreWork?: () => void;
  onBookConsultation?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork }) => {
  const headlineWords = "We Design Spaces You Love to Live In".split(" ");

  const handleExploreServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (onExploreWork) {
      onExploreWork();
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[80vh] pt-20 pb-12 lg:pt-24 lg:pb-16 flex flex-col justify-center overflow-hidden bg-[#FBF9F5]/70 backdrop-blur-[1px]"
    >
      {/* Dynamic Background: Architectural Blueprint Grid & Subtle Floating Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Architectural Grid */}
        <div className="absolute inset-0 bg-architect-grid opacity-60" />

        {/* Floating Geometric Architectural Shapes */}
        <motion.div
          animate={{
            y: [-15, 15, -15],
            rotate: [0, 8, 0],
            scale: [1, 1.04, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-24 -right-16 w-80 h-80 rounded-full border border-[#B8620B]/15 bg-gradient-to-br from-[#B8620B]/5 to-transparent blur-xs pointer-events-none"
        />

        <motion.div
          animate={{
            y: [20, -20, 20],
            rotate: [0, -12, 0],
            scale: [1, 1.08, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full border border-[#E8797A]/15 bg-gradient-to-tr from-[#E8797A]/5 to-transparent blur-xs pointer-events-none"
        />

        {/* Subtle Blueprint Reference Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
          <motion.line
            x1="0%"
            y1="38%"
            x2="100%"
            y2="38%"
            stroke="#B8620B"
            strokeWidth="0.75"
            strokeDasharray="6 8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
          <motion.line
            x1="61.8%"
            y1="0%"
            x2="61.8%"
            y2="100%"
            stroke="#C85A17"
            strokeWidth="0.75"
            strokeDasharray="4 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 2.5, delay: 0.4, ease: "easeInOut" }}
          />
        </svg>

        {/* Ambient Warm Gradient Wash */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-br from-[#B8620B]/10 via-[#E8797A]/8 to-transparent rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full z-10 my-auto py-8">
        <div className="flex flex-col justify-center">
          
          {/* Studio Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#F5F1E8] shadow-xs text-xs tracking-widest uppercase text-[#B8620B] font-semibold w-fit mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#B8620B] animate-pulse" />
            <span>Good Design, Simple Living</span>
            <span className="text-[#C85A17] font-normal">&bull; AALAYA AS STUDIOS</span>
          </motion.div>

          {/* Headline with Staggered Word Reveal */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl text-[#1A1A1A] font-semibold tracking-tight leading-[1.08] mb-6">
            {headlineWords.map((word, index) => (
              <span key={index} className="inline-block overflow-hidden mr-3">
                <motion.span
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.15 + index * 0.08,
                    ease: [0.215, 0.61, 0.355, 1]
                  }}
                  className={`inline-block ${
                    word === "Love" || word === "Live"
                      ? "italic font-serif text-[#B8620B] font-normal"
                      : ""
                  }`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subheading in simple, basic English */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-[#4A4A4A] font-normal tracking-wide leading-relaxed max-w-2xl mb-4 flex flex-wrap items-center gap-2"
          >
            <span className="text-[#1A1A1A] font-medium">Architectural Design</span>
            <span className="text-[#B8620B]">&bull;</span>
            <span className="text-[#1A1A1A] font-medium">Interior Design</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-[#666666] leading-relaxed max-w-2xl mb-8 font-normal"
          >
            We design homes and commercial spaces. We focus on smart layouts, good natural light, and strong materials that work well in daily life.
          </motion.p>

          {/* Call To Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 sm:gap-5"
          >
            <button
              onClick={handleExploreServices}
              id="hero-explore-services-btn"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:scale-105 hover:bg-[#B8620B] hover:shadow-xl hover:shadow-[#B8620B]/25 active:scale-100 cursor-pointer"
            >
              <span>Our Services</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
