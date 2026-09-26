import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Calendar,
  Maximize2,
  Award,
  Layers,
  Sparkles,
  ArrowRight,
  Compass,
  CheckCircle2,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';

interface FeaturedProjectSectionProps {
  onInquireProject?: (projectTitle: string) => void;
}

export const FeaturedProjectSection: React.FC<FeaturedProjectSectionProps> = ({
  onInquireProject
}) => {
  // Keeping exactly 1 project as requested
  const project: Project = PROJECTS_DATA[0];

  const [activeTab, setActiveTab] = useState<'photos' | 'blueprint' | 'materials'>('photos');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [blueprintZoom, setBlueprintZoom] = useState(false);

  return (
    <section
      id="project"
      className="relative py-28 lg:py-36 bg-[#FBF9F5]/80 backdrop-blur-[2px] overflow-hidden border-t border-[#F0EBE1]"
    >
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B8620B]/10 border border-[#B8620B]/20 text-[#B8620B] text-xs font-mono uppercase tracking-widest mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>Featured Project</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1A1A1A] font-light tracking-tight">
              {project.title}
            </h2>
            <p className="mt-3 text-lg text-[#555] max-w-2xl font-light">
              {project.tagline}
            </p>
          </div>

          {/* Quick specs pill */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-[#666] font-mono">
            <span className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-lg border border-[#E8E2D5] shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-[#B8620B]" />
              {project.location}
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-lg border border-[#E8E2D5] shadow-xs">
              <Calendar className="w-3.5 h-3.5 text-[#B8620B]" />
              {project.year}
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-lg border border-[#E8E2D5] shadow-xs">
              <Maximize2 className="w-3.5 h-3.5 text-[#B8620B]" />
              {project.area}
            </span>
          </div>
        </div>

        {/* Main Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Top: Interactive Media Viewer (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* View Mode Switcher */}
            <div className="flex items-center justify-between bg-white p-1.5 rounded-xl border border-[#E8E2D5] shadow-xs">
              <div className="flex items-center gap-1">
                <button
                  id="tab-photos-btn"
                  onClick={() => setActiveTab('photos')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'photos'
                      ? 'bg-[#1A1A1A] text-white shadow-xs'
                      : 'text-[#666] hover:text-[#1A1A1A] hover:bg-[#F5F1E8]'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Photos</span>
                </button>
                <button
                  id="tab-blueprint-btn"
                  onClick={() => setActiveTab('blueprint')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'blueprint'
                      ? 'bg-[#1A1A1A] text-white shadow-xs'
                      : 'text-[#666] hover:text-[#1A1A1A] hover:bg-[#F5F1E8]'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Blueprint</span>
                </button>
                <button
                  id="tab-materials-btn"
                  onClick={() => setActiveTab('materials')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'materials'
                      ? 'bg-[#1A1A1A] text-white shadow-xs'
                      : 'text-[#666] hover:text-[#1A1A1A] hover:bg-[#F5F1E8]'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Materials</span>
                </button>
              </div>

              {project.award && (
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FAF5EE] text-[#B8620B] text-xs font-medium">
                  <Award className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[180px]">{project.award}</span>
                </div>
              )}
            </div>

            {/* Stage / Display Window */}
            <div className="relative aspect-4/3 sm:aspect-16/10 rounded-2xl overflow-hidden bg-[#111] border border-[#E8E2D5] shadow-lg group">
              <AnimatePresence mode="wait">
                {activeTab === 'photos' && (
                  <motion.div
                    key={`photo-${activeImageIndex}`}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full relative"
                  >
                    <img
                      src={project.galleryImages[activeImageIndex] || project.heroImage}
                      alt={`${project.title} - View ${activeImageIndex + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                      <span className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10">
                        View {activeImageIndex + 1} of {project.galleryImages.length}
                      </span>
                      <span className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10">
                        Elevation Ref: ELV-A04
                      </span>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'blueprint' && (
                  <motion.div
                    key="blueprint-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`relative w-full h-full bg-[#0D1F2D] flex items-center justify-center p-6 cursor-pointer ${
                      blueprintZoom ? 'overflow-auto' : ''
                    }`}
                    onClick={() => setBlueprintZoom(!blueprintZoom)}
                  >
                    <img
                      src={project.blueprintImage}
                      alt={`${project.title} Architectural Blueprint`}
                      className={`max-h-full object-contain filter invert contrast-125 transition-transform duration-300 ${
                        blueprintZoom ? 'scale-150' : 'scale-100'
                      }`}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-md border border-white/15 font-mono">
                      CAD DRAWING // SECTION B-B // SCALE 1:50
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md text-white/80 text-xs px-3 py-1.5 rounded-md font-mono">
                      Click to {blueprintZoom ? 'zoom out' : 'magnify'}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'materials' && (
                  <motion.div
                    key="materials-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full bg-[#FAF8F5] p-6 sm:p-8 flex flex-col justify-center"
                  >
                    <h4 className="text-sm font-mono uppercase tracking-widest text-[#B8620B] mb-4">
                      Materials Used
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {project.materials.map((mat, idx) => (
                        <div
                          key={idx}
                          className="bg-white p-4 rounded-xl border border-[#E8E2D5] shadow-xs flex flex-col justify-between"
                        >
                          <span className="text-xs font-mono text-[#888]">SPEC #{idx + 101}</span>
                          <span className="text-sm font-medium text-[#1A1A1A] mt-1">{mat}</span>
                          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#B8620B]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Local and Certified</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Thumbnail Row (when in photos tab) */}
            {activeTab === 'photos' && (
              <div className="grid grid-cols-4 gap-3">
                {project.galleryImages.map((img, i) => (
                  <button
                    key={i}
                    id={`thumb-${i}`}
                    onClick={() => setActiveImageIndex(i)}
                    className={`relative aspect-4/3 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === i
                        ? 'border-[#B8620B] ring-2 ring-[#B8620B]/20 shadow-md'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right / Bottom: Deep Architectural Narrative & Key Features (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Description Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E2D5] shadow-xs">
              <h3 className="text-lg font-serif text-[#1A1A1A] mb-3">About This Project</h3>
              <p className="text-sm sm:text-base text-[#555] leading-relaxed font-light">
                {project.description}
              </p>

              {/* Architectural Philosophy Quote */}
              <div className="mt-6 pl-4 border-l-2 border-[#B8620B] py-1 bg-[#FBF9F5] rounded-r-lg">
                <p className="text-xs sm:text-sm text-[#444] italic font-serif leading-relaxed">
                  "{project.architecturalPhilosophy}"
                </p>
                <span className="block mt-2 text-[11px] font-mono text-[#888] uppercase tracking-wider">
                  Note from the Lead Architect
                </span>
              </div>
            </div>

            {/* Key Engineering Innovations Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E2D5] shadow-xs">
              <h3 className="text-sm font-mono uppercase tracking-widest text-[#B8620B] mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Key Features</span>
              </h3>

              <ul className="space-y-3">
                {project.keyFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#333]">
                    <div className="w-5 h-5 rounded-full bg-[#FAF5EE] border border-[#E8E2D5] flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono text-[#B8620B]">
                      {idx + 1}
                    </div>
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Box */}
            <div className="bg-[#1A1A1A] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B8620B]/20 rounded-full filter blur-2xl pointer-events-none" />
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#E8797A]">
                  Made for You
                </span>
                <h4 className="text-xl font-serif text-white mt-1">
                  Plan a Similar Home
                </h4>
                <p className="mt-2 text-xs text-white/70 leading-relaxed font-light">
                  We design homes that suit your land, lifestyle, and local building rules.
                </p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  id="contact-project-btn"
                  onClick={() => {
                    if (onInquireProject) {
                      onInquireProject(project.title);
                    } else {
                      const contactEl = document.getElementById('contact');
                      contactEl?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-[#1A1A1A] text-sm font-medium hover:bg-[#F5F1E8] transition-all group"
                >
                  <span>Ask About This Project</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#B8620B]" />
                </button>

                <a
                  href={`https://wa.me/14158902800?text=${encodeURIComponent(
                    `Hello Aalaya Studios, I would like to talk about a project like ${project.title}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white text-sm font-medium transition-all"
                  title="WhatsApp"
                >
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
