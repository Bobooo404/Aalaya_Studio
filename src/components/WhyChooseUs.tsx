import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Maximize2, ShieldCheck, Check, Compass } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/portfolioData';

export const WhyChooseUs: React.FC = () => {
  const getCardIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-7 h-7 text-[#B8620B]" />;
      case 'Maximize2':
        return <Maximize2 className="w-7 h-7 text-[#C85A17]" />;
      case 'ShieldCheck':
      default:
        return <ShieldCheck className="w-7 h-7 text-[#E8797A]" />;
    }
  };

  return (
    <section id="why-us" className="relative py-28 lg:py-36 bg-white/80 backdrop-blur-[2px] overflow-hidden">
      {/* Dynamic Background: Architectural Crosshatch Pattern moving at subtle speeds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [-20, 20, -20],
            y: [-10, 10, -10]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-architect-grid opacity-30"
        />

        {/* Floating architectural ring */}
        <motion.div
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-32 right-12 w-96 h-96 rounded-full border border-dashed border-[#B8620B]/15 pointer-events-none"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Intro */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F1E8] border border-[#EBE5DA] text-xs uppercase tracking-widest text-[#B8620B] font-semibold mb-4"
          >
            <Compass className="w-3.5 h-3.5 text-[#B8620B]" />
            <span>Why Choose Us</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] font-semibold tracking-tight leading-tight mb-6"
          >
            Why People Choose Us
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base text-[#666] leading-relaxed"
          >
            We focus on three simple things: spaces that suit your life, layouts that are easy to use, and natural materials that last.
          </motion.p>
        </div>

        {/* 3 Feature Cards with Morphing/Pulsing Animated Icons & Hover Lift */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WHY_CHOOSE_US.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: idx * 0.15,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="relative bg-[#FBF9F5] rounded-2xl p-8 lg:p-10 border border-[#EBE5DA] shadow-xs hover:shadow-xl hover:border-[#B8620B]/40 transition-all duration-300 flex flex-col justify-between group"
              id={`why-us-card-${idx}`}
            >
              <div>
                {/* Pulsing & Morphing Animated Icon Container */}
                <div className="relative w-16 h-16 rounded-2xl bg-white border border-[#E5DFD5] flex items-center justify-center mb-8 shadow-xs group-hover:scale-110 transition-transform duration-300">
                  {/* Subtle pulsing background ring */}
                  <motion.div
                    animate={{
                      scale: [1, 1.25, 1],
                      opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{
                      duration: 3 + idx,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 rounded-2xl bg-[#B8620B]/15 pointer-events-none"
                  />
                  {getCardIcon(feature.iconName)}
                </div>

                {/* Subtitle & Title */}
                <p className="text-xs uppercase tracking-widest text-[#B8620B] font-semibold mb-2">
                  {feature.subtitle}
                </p>
                
                <h3 className="font-serif text-2xl text-[#1A1A1A] font-semibold mb-4 group-hover:text-[#B8620B] transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#666] leading-relaxed mb-6">
                  {feature.description}
                </p>
              </div>

              {/* Bottom Feature Metric Badge */}
              <div className="pt-6 border-t border-[#EBE5DA] flex items-center justify-between">
                <span className="text-xs font-medium text-[#2C2C2C] flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#B8620B]" />
                  <span>{feature.stats}</span>
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#737373]">
                  Point 0{idx + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Studio Commitment Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 rounded-2xl bg-[#1A1E24] p-8 sm:p-10 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="absolute inset-0 bg-blueprint-dark opacity-50 pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="text-[11px] uppercase tracking-widest text-[#E8797A] font-semibold">
              Our Promise To You
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl text-white font-medium mt-1">
              "We give you a clear plan, a fixed price, and the exact materials we promised. We never change them without asking you first."
            </h4>
          </div>

          <div className="relative z-10 shrink-0">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#B8620B] hover:bg-[#C85A17] text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-lg hover:shadow-[#B8620B]/30 hover:scale-105"
            >
              <span>Talk to Our Team</span>
              <span>&rarr;</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
