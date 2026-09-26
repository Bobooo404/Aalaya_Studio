import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="relative z-10 py-24 sm:py-28 bg-[#F7F3EB]/90 overflow-hidden">
      <div className="absolute inset-0 bg-architect-grid opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#B8620B] mb-3">Selected work</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1A1A1A] font-semibold">Projects</h2>
          </div>
          <p className="max-w-sm text-sm text-[#666] leading-relaxed">A few of our recent spaces, made with good light, strong materials, and comfort for daily life.</p>
        </div>

        <article className="overflow-hidden rounded-3xl bg-white border border-[#E8E2D5] shadow-xl shadow-[#6B4E2E]/8">
          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#B8620B] mb-4">Residential interior · 2026</p>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-semibold mb-4">The Courtyard Residence</h3>
            <p className="text-base text-[#5F5A53] leading-relaxed">Example: a bright home built around a quiet courtyard, with natural materials and an easy link to the outdoors.</p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#1A1A1A]">
              View project <ArrowUpRight className="w-4 h-4 text-[#B8620B]" />
            </span>
          </div>
        </article>
      </div>
    </section>
  );
};
