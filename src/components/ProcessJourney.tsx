import React from 'react';
import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../data/portfolioData';
import { Search, PenTool, Box, FileCheck, KeyRound, Sparkles, CheckCircle, Clock } from 'lucide-react';

export const ProcessJourney: React.FC = () => {
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search':
        return <Search className="w-5 h-5 text-[#B8620B]" />;
      case 'PenTool':
        return <PenTool className="w-5 h-5 text-[#C85A17]" />;
      case 'Box':
        return <Box className="w-5 h-5 text-[#E8797A]" />;
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-[#D84C4C]" />;
      case 'KeyRound':
      default:
        return <KeyRound className="w-5 h-5 text-[#B8620B]" />;
    }
  };

  return (
    <section id="process" className="relative py-28 lg:py-36 bg-[#F5F1E8]/50 overflow-hidden">
      {/* Blueprint grid */}
      <div className="absolute inset-0 bg-architect-grid opacity-35 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5DFD5] text-xs uppercase tracking-widest text-[#B8620B] font-semibold mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B8620B]" />
            <span>How We Work</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] font-semibold tracking-tight leading-tight mb-6"
          >
            From First Ideas to <span className="italic text-[#B8620B]">Move-In Day</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base text-[#666] leading-relaxed"
          >
            A clear five-step process that keeps your ideas, timeline, and budget easy to follow.
          </motion.p>
        </div>

        {/* Timeline with SVG Line Drawing and Sequential Phasing */}
        <div className="relative">
          
          {/* Vertical Architectural Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 -translate-x-1/2 w-[2px]">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <motion.line
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                stroke="#B8620B"
                strokeWidth="2"
                strokeDasharray="6 6"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>
          </div>

          <div className="space-y-12 lg:space-y-16">
            {PROCESS_STEPS.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`relative flex flex-col lg:flex-row items-center ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                  id={`process-step-${index}`}
                >
                  {/* Content Card (Half Width) */}
                  <div className="w-full lg:w-1/2 lg:px-10">
                    <div className="bg-white rounded-2xl p-8 border border-[#EBE5DA] shadow-sm hover:shadow-xl transition-all duration-300 group">
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-bold tracking-widest text-[#B8620B] uppercase">
                          {step.step}
                        </span>
                        
                        <div className="flex items-center gap-1.5 text-xs text-[#737373] bg-[#F5F1E8] px-3 py-1 rounded-full">
                          <Clock className="w-3.5 h-3.5 text-[#B8620B]" />
                          <span>{step.duration}</span>
                        </div>
                      </div>

                      <h3 className="font-serif text-2xl text-[#1A1A1A] font-semibold mb-3 group-hover:text-[#B8620B] transition-colors">
                        {step.title}
                      </h3>

                      <p className="text-sm text-[#666] leading-relaxed mb-6">
                        {step.description}
                      </p>

                      {/* Deliverables */}
                      <div className="pt-4 border-t border-[#F5F1E8]">
                        <p className="text-[11px] uppercase tracking-wider text-[#1A1A1A] font-semibold mb-3">
                          What you get:
                        </p>
                        <div className="space-y-1.5">
                          {step.deliverables.map((item, dIdx) => (
                            <div key={dIdx} className="flex items-center gap-2 text-xs text-[#555]">
                              <CheckCircle className="w-3.5 h-3.5 text-[#B8620B] shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Center Node / Icon with Pulse Effect */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-2 border-[#B8620B] items-center justify-center shadow-lg z-10">
                    {/* Animated pulse ring */}
                    <motion.div
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.3, 0.7, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 rounded-full bg-[#B8620B]/20 pointer-events-none"
                    />
                    {getStepIcon(step.iconName)}
                  </div>

                  {/* Empty spacer for the opposite side */}
                  <div className="hidden lg:block w-1/2" />

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
