import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types';
import { ProjectModal } from './ProjectModal';
import { ArrowUpRight, MapPin, Maximize, Award, Sparkles } from 'lucide-react';

export const PortfolioGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: { key: ProjectCategory; label: string }[] = [
    { key: 'all', label: 'All Projects' },
    { key: 'residential', label: 'Residential' },
    { key: 'commercial', label: 'Commercial' },
    { key: 'interior', label: 'Interior Architecture' },
    { key: 'landscape', label: 'Landscape & Gardens' },
    { key: 'sustainable', label: 'Carbon-Negative' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-28 lg:py-36 bg-[#FBF9F5]/80 backdrop-blur-[2px] overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-architect-grid opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5DFD5] text-[11px] uppercase tracking-widest text-[#B8620B] font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#B8620B]" />
              <span>Our Recent Work 2020 – 2024</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] font-semibold tracking-tight leading-tight">
              Selected <span className="italic text-[#B8620B]">Projects</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#666] max-w-md leading-relaxed">
            Every project is designed for its people, its place, and the local climate.
          </p>
        </div>

        {/* Category Filters with Smooth Transitions */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          <div className="p-1 rounded-full bg-white border border-[#E5DFD5] shadow-xs flex items-center gap-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`relative px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-[#4A4A4A] hover:text-[#1A1A1A]'
                  }`}
                  id={`filter-btn-${cat.key}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 rounded-full bg-[#B8620B] shadow-sm"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid: Scroll Trigger with Fade-in and Scale-up */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="group relative rounded-2xl overflow-hidden bg-white border border-[#EBE5DA] shadow-xs hover:shadow-2xl transition-all duration-500 flex flex-col cursor-pointer"
                onClick={() => setSelectedProject(project)}
                id={`project-card-${project.id}`}
              >
                {/* Image Container with Hover Overlay */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1A1E24]">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-semibold uppercase tracking-widest text-[#1A1A1A] shadow-xs">
                      {project.category}
                    </span>

                    {project.award && (
                      <span className="px-2.5 py-1 rounded-full bg-[#1A1A1A]/85 backdrop-blur-md text-[10px] font-semibold uppercase tracking-wider text-[#E8797A] border border-white/15 flex items-center gap-1">
                        <Award className="w-3 h-3 text-[#E8797A]" />
                        <span>Awarded</span>
                      </span>
                    )}
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-40 group-hover:opacity-85 transition-opacity duration-300" />

                  {/* Hover Details Overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white translate-y-3 group-hover:translate-y-0 transition-transform duration-300 z-10">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-3">
                      <p className="text-xs text-white/80 line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-white/90">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#E8797A]" />
                          {project.location}
                        </span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1">
                          <Maximize className="w-3 h-3 text-[#E8797A]" />
                          {project.area}
                        </span>
                      </div>

                      <div className="w-9 h-9 rounded-full bg-white text-[#1A1A1A] flex items-center justify-center transition-all duration-300 group-hover:bg-[#B8620B] group-hover:text-white group-hover:scale-105 shadow-md">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Bottom Content */}
                <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#1A1A1A] font-semibold group-hover:text-[#B8620B] transition-colors mb-1">
                      {project.title}
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-[#737373] font-medium">
                      {project.tagline}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#F5F1E8] flex items-center justify-between text-xs text-[#737373]">
                    <span>Completed {project.year}</span>
                    <span className="text-[#B8620B] font-semibold text-[11px] uppercase tracking-wider group-hover:underline">
                      View Project Specs &rarr;
                    </span>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal Lightbox */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
};
