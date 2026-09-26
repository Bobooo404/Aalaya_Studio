import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Calendar, Maximize, Award, Check, Layers, Eye, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'photo' | 'blueprint'>('photo');

  // Reset image index when project changes
  useEffect(() => {
    setSelectedImageIndex(0);
    setViewMode('photo');
  }, [project]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const currentGallery = [project.heroImage, ...(project.galleryImages || [])];
  // Remove duplicates
  const uniqueImages = Array.from(new Set(currentGallery));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-[#EBE5DA] overflow-hidden flex flex-col z-10 my-auto"
          id="project-lightbox-modal"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#F0EBE1] flex items-center justify-between z-20">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B8620B]" />
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A] leading-tight">
                  {project.title}
                </h3>
                <p className="text-xs uppercase tracking-widest text-[#B8620B] font-medium">
                  {project.tagline}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Toggle Photo vs Blueprint */}
              <button
                onClick={() => setViewMode(viewMode === 'photo' ? 'blueprint' : 'photo')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold bg-[#F5F1E8] hover:bg-[#B8620B] hover:text-white transition-colors text-[#2C2C2C]"
              >
                {viewMode === 'photo' ? (
                  <>
                    <Layers className="w-3.5 h-3.5 text-[#B8620B]" />
                    <span>See Blueprint</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>See Photos</span>
                  </>
                )}
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-[#F5F1E8] hover:bg-[#1A1A1A] hover:text-white transition-colors text-[#1A1A1A]"
                aria-label="Close Project Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
            
            {/* Visual Media Viewer */}
            <div className="space-y-4">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#1A1E24] shadow-inner">
                {viewMode === 'photo' ? (
                  <img
                    src={uniqueImages[selectedImageIndex] || project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                ) : (
                  <div className="relative w-full h-full bg-[#161B22] p-8 flex flex-col justify-between">
                    <div className="absolute inset-0 bg-blueprint-dark opacity-90" />
                    <img
                      src={project.blueprintImage}
                      alt="Architectural Blueprint"
                      className="relative z-10 w-full h-full object-contain filter contrast-125"
                    />
                    <div className="relative z-10 flex justify-between text-xs font-mono text-[#E8797A]">
                      <span>TECHNICAL DRAWING &bull; PLAN 1:50</span>
                      <span>AALAYA DESIGN ARCHIVE</span>
                    </div>
                  </div>
                )}

                {/* Left / Right Quick Carousel Nav */}
                {viewMode === 'photo' && uniqueImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : uniqueImages.length - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex((prev) => (prev < uniqueImages.length - 1 ? prev + 1 : 0))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Award Badge Overlay */}
                {project.award && (
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md text-white border border-white/20 text-xs">
                    <Award className="w-4 h-4 text-[#E8797A]" />
                    <span>{project.award}</span>
                  </div>
                )}
              </div>

              {/* Gallery Thumbnails */}
              {viewMode === 'photo' && uniqueImages.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {uniqueImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 transition-all ${
                        selectedImageIndex === idx
                          ? 'ring-2 ring-[#B8620B] scale-105'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#FBF9F5] border border-[#EBE5DA]">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#B8620B] shrink-0" />
                <div>
                  <p className="text-[10px] uppercase font-mono text-[#737373]">Location</p>
                  <p className="text-xs sm:text-sm font-semibold text-[#1A1A1A]">{project.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Maximize className="w-5 h-5 text-[#C85A17] shrink-0" />
                <div>
                  <p className="text-[10px] uppercase font-mono text-[#737373]">Total Area</p>
                  <p className="text-xs sm:text-sm font-semibold text-[#1A1A1A]">{project.area}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#E8797A] shrink-0" />
                <div>
                  <p className="text-[10px] uppercase font-mono text-[#737373]">Year Built</p>
                  <p className="text-xs sm:text-sm font-semibold text-[#1A1A1A]">{project.year}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Compass className="w-5 h-5 text-[#B8620B] shrink-0" />
                <div>
                  <p className="text-[10px] uppercase font-mono text-[#737373]">Client Type</p>
                  <p className="text-xs sm:text-sm font-semibold text-[#1A1A1A] truncate">{project.clientType}</p>
                </div>
              </div>
            </div>

            {/* Narrative & Architectural Intent */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-7 space-y-4">
                <h4 className="text-xs uppercase tracking-widest font-semibold text-[#B8620B]">
                  Project Story
                </h4>
                <p className="text-base text-[#333] leading-relaxed">
                  {project.description}
                </p>

                <div className="p-4 rounded-xl bg-[#F5F1E8] border-l-4 border-[#B8620B]">
                  <p className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] mb-1">
                    Design Approach
                  </p>
                  <p className="text-xs sm:text-sm italic text-[#555] font-serif">
                    "{project.architecturalPhilosophy}"
                  </p>
                </div>
              </div>

              <div className="md:col-span-5 space-y-6">
                {/* Key Features */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] mb-3">
                    Key Features
                  </h4>
                  <ul className="space-y-2 text-xs text-[#555]">
                    {project.keyFeatures.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#B8620B] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Materials & Tectonics */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] mb-3">
                    Tactile Materiality
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.materials.map((mat, mIdx) => (
                      <span
                        key={mIdx}
                        className="px-2.5 py-1 rounded-md bg-[#FBF9F5] border border-[#EBE5DA] text-[11px] font-medium text-[#2C2C2C]"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Modal Footer CTA */}
          <div className="sticky bottom-0 bg-[#FBF9F5] px-6 py-4 border-t border-[#EBE5DA] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#737373]">
              Interested in creating a project like {project.title}?
            </p>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href="#contact"
                onClick={onClose}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#B8620B] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#C85A17] transition-all shadow-md"
              >
                <span>Ask About This Style</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
