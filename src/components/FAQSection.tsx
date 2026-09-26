import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_DATA } from '../data/portfolioData';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-28 lg:py-36 bg-white/80 backdrop-blur-[2px] overflow-hidden border-t border-[#F0EBE1]">
      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F1E8] text-xs uppercase tracking-widest text-[#B8620B] font-semibold mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#B8620B]" />
            <span>Good to Know</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1A1A1A] mb-4">
            Common Questions
          </h2>

          <p className="text-sm text-[#666]">
            Simple answers about how we work, where we work, and how we care for the environment.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#B8620B] bg-[#FBF9F5] shadow-sm'
                    : 'border-[#EBE5DA] bg-white hover:border-stone-400'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 sm:px-8 py-5 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg sm:text-xl font-medium text-[#1A1A1A] pr-4">
                    {item.question}
                  </span>

                  <span className="w-8 h-8 rounded-full bg-[#F5F1E8] flex items-center justify-center shrink-0 text-[#B8620B]">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 sm:px-8 pb-6 pt-2 text-sm text-[#555] leading-relaxed border-t border-[#F0EBE1]">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
